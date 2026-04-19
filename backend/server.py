from fastapi import FastAPI, APIRouter, HTTPException, Depends, Query, Request
from fastapi.responses import RedirectResponse, Response
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
import logging
import secrets
import httpx
import io
import csv
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ============== Configuration ==============

CANONICAL_DOMAIN = os.environ.get('CANONICAL_DOMAIN', 'patriotes-israel.com')

# PayPal configuration
PAYPAL_CLIENT_ID = os.environ.get('PAYPAL_CLIENT_ID', '')
PAYPAL_CLIENT_SECRET = os.environ.get('PAYPAL_CLIENT_SECRET', '')
PAYPAL_WEBHOOK_ID = os.environ.get('PAYPAL_WEBHOOK_ID', '')
PAYPAL_MODE = os.environ.get('PAYPAL_MODE', 'live').lower()
PAYPAL_API_BASE = (
    "https://api-m.paypal.com" if PAYPAL_MODE == "live"
    else "https://api-m.sandbox.paypal.com"
)

# Kill-switch: hide donation flow entirely
DONATIONS_ENABLED = os.environ.get('DONATIONS_ENABLED', 'true').lower() == 'true'

# Mandataire financier (CNCCFP compliance)
MANDATAIRE_NOM = os.environ.get('MANDATAIRE_NOM', '').strip()
MANDATAIRE_ADRESSE = os.environ.get('MANDATAIRE_ADRESSE', '').strip()

# Donation limits (CNCCFP: 4600 EUR max per year per donor)
# Per-donation limits (we can't enforce per-year without KYC, so per-donation caps)
LIMITS = {
    "EUR": {"min": 1, "max": 4600},
    "USD": {"min": 1, "max": 4600},
    "ILS": {"min": 1, "max": 20000},
}

ALLOWED_PRESETS = [18, 50, 100, 200]  # Chai, flyers, perm, SMS

# ============== Logging ==============

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
donation_logger = logging.getLogger("donations")

# Startup warnings
if not PAYPAL_CLIENT_ID:
    logger.warning("PAYPAL_CLIENT_ID not set — PayPal flow will fail.")
if not PAYPAL_CLIENT_SECRET:
    logger.warning("PAYPAL_CLIENT_SECRET not set — order creation/capture will fail until configured in Railway.")
if not PAYPAL_WEBHOOK_ID:
    logger.warning("Webhook signature not verified — PAYPAL_WEBHOOK_ID missing")
if not MANDATAIRE_NOM or not MANDATAIRE_ADRESSE:
    logger.warning("MANDATAIRE_NOM/ADRESSE not set — /soutenir page will show a red legal warning until filled.")

# ============== Middleware ==============

class CanonicalDomainMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        host = request.headers.get('host', '').split(':')[0]
        if host == CANONICAL_DOMAIN:
            return await call_next(request)
        path = request.url.path
        if path.startswith('/api') or path == '/health' or path == '/healthz':
            return await call_next(request)
        if host in ('localhost', '127.0.0.1', '') or host.endswith('.preview.emergentagent.com'):
            return await call_next(request)
        canonical_url = f"https://{CANONICAL_DOMAIN}{request.url.path}"
        if request.url.query:
            canonical_url += f"?{request.url.query}"
        return RedirectResponse(url=canonical_url, status_code=301)

# ============== Database ==============

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# ============== App & Rate Limiter ==============

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Avec les Patriotes d'Israël - API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(CanonicalDomainMiddleware)

api_router = APIRouter(prefix="/api")
security = HTTPBasic()

ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'patriotes2026')

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Identifiants incorrects",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# ============== Models ==============

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactCreate(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    supportList: bool = False
    helpRegister: bool = False

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    firstName: str
    lastName: str
    email: str
    phone: Optional[str] = None
    message: str
    supportList: bool = False
    helpRegister: bool = False
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    read: bool = False

# PayPal / Donation models
class DonorIdentity(BaseModel):
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    address: str = Field(..., min_length=2, max_length=200)
    city: str = Field(..., min_length=1, max_length=100)
    postalCode: str = Field(..., min_length=1, max_length=20)
    country: str = Field(..., min_length=2, max_length=80)

class CreateOrderInput(BaseModel):
    amount: float = Field(..., gt=0)
    currency: Literal["EUR", "USD", "ILS"]
    impactPreset: Optional[int] = None  # 18, 50, 100, 200, or None for custom
    donor: DonorIdentity
    acceptPhysicalPerson: bool
    acceptPersonalFunds: bool
    acceptDataCollection: bool

    @field_validator("acceptPhysicalPerson", "acceptPersonalFunds", "acceptDataCollection")
    @classmethod
    def must_be_true(cls, v):
        if not v:
            raise ValueError("Toutes les mentions CNCCFP doivent être acceptées.")
        return v

class CaptureOrderInput(BaseModel):
    orderID: str = Field(..., min_length=1, max_length=64)

# ============== PayPal helpers ==============

async def get_paypal_access_token() -> str:
    """Fetch OAuth2 access token from PayPal."""
    if not PAYPAL_CLIENT_ID or not PAYPAL_CLIENT_SECRET:
        raise HTTPException(
            status_code=503,
            detail="PayPal non configuré. Le service sera disponible après configuration Railway."
        )
    async with httpx.AsyncClient(timeout=15.0) as http:
        resp = await http.post(
            f"{PAYPAL_API_BASE}/v1/oauth2/token",
            auth=(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET),
            data={"grant_type": "client_credentials"},
            headers={"Accept": "application/json", "Accept-Language": "en_US"},
        )
    if resp.status_code != 200:
        logger.error(f"PayPal token error: {resp.status_code} {resp.text[:200]}")
        raise HTTPException(status_code=502, detail="Erreur d'authentification PayPal.")
    return resp.json()["access_token"]

def validate_donation_amount(amount: float, currency: str, preset: Optional[int]):
    """Strict server-side validation: never trust the client."""
    limits = LIMITS.get(currency)
    if not limits:
        raise HTTPException(status_code=400, detail="Devise non supportée.")
    # Preset consistency (if preset given, amount must match and currency must be EUR)
    if preset is not None:
        if preset not in ALLOWED_PRESETS:
            raise HTTPException(status_code=400, detail="Preset invalide.")
        # Presets are expressed in EUR — if currency is different, reject
        if currency != "EUR":
            raise HTTPException(
                status_code=400,
                detail="Les montants symboliques (18/50/100/200) sont en EUR uniquement."
            )
        if int(amount) != preset:
            raise HTTPException(status_code=400, detail="Montant preset incohérent.")
    # Numeric bounds
    if amount < limits["min"]:
        raise HTTPException(
            status_code=400,
            detail=f"Montant minimum : {limits['min']} {currency}."
        )
    if amount > limits["max"]:
        raise HTTPException(
            status_code=400,
            detail=f"Montant maximum autorisé : {limits['max']} {currency} (plafond CNCCFP)."
        )

# ============== Public Routes ==============

@api_router.get("/")
async def root():
    return {"message": "Avec les Patriotes d'Israël - API"}

@api_router.get("/config/public")
async def public_config():
    """Public runtime config for the frontend (kill-switch + mandataire display)."""
    return {
        "donations_enabled": DONATIONS_ENABLED,
        "paypal_client_id": PAYPAL_CLIENT_ID,
        "paypal_mode": PAYPAL_MODE,
        "mandataire_nom": MANDATAIRE_NOM,
        "mandataire_adresse": MANDATAIRE_ADRESSE,
        "limits": LIMITS,
        "presets": ALLOWED_PRESETS,
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=Contact)
async def submit_contact(input: ContactCreate):
    contact_obj = Contact(**input.model_dump())
    doc = contact_obj.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.contacts.insert_one(doc)
    return contact_obj

# ============== PayPal routes ==============

@api_router.post("/paypal/create-order")
@limiter.limit("5/hour")
async def paypal_create_order(request: Request, payload: CreateOrderInput):
    """Create a PayPal order after strict server-side validation."""
    client_ip = get_remote_address(request)
    user_agent = request.headers.get("user-agent", "")[:300]

    # Kill-switch
    if not DONATIONS_ENABLED:
        donation_logger.info(
            f"[BLOCKED_KILLSWITCH] ip={client_ip} email={payload.donor.email} "
            f"amount={payload.amount}{payload.currency}"
        )
        raise HTTPException(status_code=503, detail="Les dons sont temporairement désactivés.")

    # Mandataire must be configured to accept donations legally
    if not MANDATAIRE_NOM or not MANDATAIRE_ADRESSE:
        donation_logger.warning(
            f"[BLOCKED_NO_MANDATAIRE] ip={client_ip} email={payload.donor.email} "
            f"amount={payload.amount}{payload.currency}"
        )
        raise HTTPException(
            status_code=503,
            detail="Mandataire financier non configuré — les dons sont indisponibles."
        )

    # Strict amount validation
    validate_donation_amount(payload.amount, payload.currency, payload.impactPreset)

    # Pre-persist donation in pending state (useful for reconciliation)
    donation_id = str(uuid.uuid4())
    amount_str = f"{payload.amount:.2f}"

    donation_logger.info(
        f"[CREATE_ATTEMPT] ip={client_ip} email={payload.donor.email} "
        f"amount={amount_str}{payload.currency} preset={payload.impactPreset}"
    )

    # Get PayPal token & create order
    try:
        token = await get_paypal_access_token()
    except HTTPException as e:
        donation_logger.error(f"[CREATE_FAIL_TOKEN] ip={client_ip} {e.detail}")
        raise

    order_payload = {
        "intent": "CAPTURE",
        "purchase_units": [{
            "reference_id": donation_id,
            "description": "Don — Avec les Patriotes d'Israël — Liste N°6",
            "custom_id": donation_id,
            "amount": {
                "currency_code": payload.currency,
                "value": amount_str,
            },
        }],
        "application_context": {
            "brand_name": "Patriotes d'Israël",
            "locale": "fr-FR",
            "shipping_preference": "NO_SHIPPING",
            "user_action": "PAY_NOW",
        },
    }

    async with httpx.AsyncClient(timeout=20.0) as http:
        resp = await http.post(
            f"{PAYPAL_API_BASE}/v2/checkout/orders",
            json=order_payload,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "PayPal-Request-Id": donation_id,
            },
        )

    if resp.status_code not in (200, 201):
        donation_logger.error(
            f"[CREATE_FAIL_PAYPAL] ip={client_ip} status={resp.status_code} body={resp.text[:300]}"
        )
        raise HTTPException(status_code=502, detail="Erreur lors de la création de l'ordre PayPal.")

    order = resp.json()
    paypal_order_id = order["id"]

    # Persist as pending
    doc = {
        "id": donation_id,
        "paypal_order_id": paypal_order_id,
        "paypal_capture_id": None,
        "status": "pending",
        "amount": payload.amount,
        "currency": payload.currency,
        "impact_preset": payload.impactPreset,
        "donor": payload.donor.model_dump(),
        "acceptPhysicalPerson": payload.acceptPhysicalPerson,
        "acceptPersonalFunds": payload.acceptPersonalFunds,
        "acceptDataCollection": payload.acceptDataCollection,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "completed_at": None,
        "ip_address": client_ip,
        "user_agent": user_agent,
    }
    await db.donations.insert_one(doc)

    donation_logger.info(
        f"[CREATE_OK] ip={client_ip} donation_id={donation_id} paypal_order_id={paypal_order_id}"
    )
    return {"orderID": paypal_order_id, "donationID": donation_id}


@api_router.post("/paypal/capture-order")
async def paypal_capture_order(request: Request, payload: CaptureOrderInput):
    """Capture an approved PayPal order and mark donation as completed."""
    client_ip = get_remote_address(request)

    if not DONATIONS_ENABLED:
        raise HTTPException(status_code=503, detail="Les dons sont temporairement désactivés.")

    # Fetch pending donation
    donation = await db.donations.find_one({"paypal_order_id": payload.orderID}, {"_id": 0})
    if not donation:
        donation_logger.warning(f"[CAPTURE_NOT_FOUND] ip={client_ip} order={payload.orderID}")
        raise HTTPException(status_code=404, detail="Don non trouvé.")

    try:
        token = await get_paypal_access_token()
    except HTTPException as e:
        donation_logger.error(f"[CAPTURE_FAIL_TOKEN] ip={client_ip} {e.detail}")
        raise

    async with httpx.AsyncClient(timeout=20.0) as http:
        resp = await http.post(
            f"{PAYPAL_API_BASE}/v2/checkout/orders/{payload.orderID}/capture",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
        )

    if resp.status_code not in (200, 201):
        donation_logger.error(
            f"[CAPTURE_FAIL_PAYPAL] ip={client_ip} order={payload.orderID} "
            f"status={resp.status_code} body={resp.text[:300]}"
        )
        await db.donations.update_one(
            {"paypal_order_id": payload.orderID},
            {"$set": {"status": "failed"}}
        )
        raise HTTPException(status_code=502, detail="Capture PayPal échouée.")

    capture_data = resp.json()
    status = capture_data.get("status", "UNKNOWN")
    capture_id = None
    try:
        capture_id = capture_data["purchase_units"][0]["payments"]["captures"][0]["id"]
    except (KeyError, IndexError):
        capture_id = None

    new_status = "completed" if status == "COMPLETED" else "pending"
    await db.donations.update_one(
        {"paypal_order_id": payload.orderID},
        {"$set": {
            "status": new_status,
            "paypal_capture_id": capture_id,
            "completed_at": datetime.now(timezone.utc).isoformat() if new_status == "completed" else None,
        }}
    )

    donation_logger.info(
        f"[CAPTURE_OK] ip={client_ip} order={payload.orderID} "
        f"capture_id={capture_id} status={new_status} "
        f"amount={donation['amount']}{donation['currency']}"
    )

    return {
        "status": new_status,
        "orderID": payload.orderID,
        "captureID": capture_id,
        "donationID": donation["id"],
    }


@api_router.post("/paypal/webhook")
async def paypal_webhook(request: Request):
    """Receive and verify PayPal webhook notifications."""
    headers = {k.lower(): v for k, v in request.headers.items()}
    try:
        event = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON.")

    event_type = event.get("event_type", "UNKNOWN")
    verified = False

    if PAYPAL_WEBHOOK_ID and PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET:
        try:
            token = await get_paypal_access_token()
            verify_payload = {
                "auth_algo": headers.get("paypal-auth-algo"),
                "cert_url": headers.get("paypal-cert-url"),
                "transmission_id": headers.get("paypal-transmission-id"),
                "transmission_sig": headers.get("paypal-transmission-sig"),
                "transmission_time": headers.get("paypal-transmission-time"),
                "webhook_id": PAYPAL_WEBHOOK_ID,
                "webhook_event": event,
            }
            async with httpx.AsyncClient(timeout=15.0) as http:
                resp = await http.post(
                    f"{PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature",
                    json=verify_payload,
                    headers={
                        "Authorization": f"Bearer {token}",
                        "Content-Type": "application/json",
                    },
                )
            if resp.status_code == 200 and resp.json().get("verification_status") == "SUCCESS":
                verified = True
            else:
                logger.warning(f"Webhook verification FAILED: {resp.status_code} {resp.text[:200]}")
        except Exception as e:
            logger.error(f"Webhook verification error: {e}")
    else:
        logger.warning("Webhook signature not verified — PAYPAL_WEBHOOK_ID missing")

    # Handle capture-completed event (idempotent)
    if event_type == "PAYMENT.CAPTURE.COMPLETED":
        resource = event.get("resource", {})
        capture_id = resource.get("id")
        supplementary = resource.get("supplementary_data", {}).get("related_ids", {})
        order_id = supplementary.get("order_id")
        if order_id:
            await db.donations.update_one(
                {"paypal_order_id": order_id},
                {"$set": {
                    "status": "completed",
                    "paypal_capture_id": capture_id,
                    "completed_at": datetime.now(timezone.utc).isoformat(),
                    "webhook_verified": verified,
                }}
            )
            donation_logger.info(
                f"[WEBHOOK_CAPTURE] order={order_id} capture={capture_id} verified={verified}"
            )

    return {"received": True, "verified": verified, "event_type": event_type}


# ============== Admin Routes ==============

@api_router.get("/admin/contacts")
async def get_all_contacts(
    admin: str = Depends(verify_admin),
    limit: int = Query(100, le=500),
    skip: int = Query(0, ge=0),
    unread_only: bool = Query(False)
):
    query = {"read": False} if unread_only else {}
    contacts = await db.contacts.find(query, {"_id": 0}).sort("createdAt", -1).skip(skip).limit(limit).to_list(limit)
    return contacts

@api_router.get("/admin/contacts/stats")
async def get_contacts_stats(admin: str = Depends(verify_admin)):
    total = await db.contacts.count_documents({})
    unread = await db.contacts.count_documents({"read": False})
    want_to_support = await db.contacts.count_documents({"supportList": True})
    need_help_register = await db.contacts.count_documents({"helpRegister": True})
    return {
        "total": total,
        "unread": unread,
        "wantToSupport": want_to_support,
        "needHelpRegister": need_help_register,
    }

@api_router.patch("/admin/contacts/{contact_id}/read")
async def mark_contact_read(contact_id: str, admin: str = Depends(verify_admin)):
    result = await db.contacts.update_one({"id": contact_id}, {"$set": {"read": True}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Contact non trouvé")
    return {"message": "Marqué comme lu"}

@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, admin: str = Depends(verify_admin)):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact non trouvé")
    return {"message": "Contact supprimé"}

@api_router.get("/admin/donations")
async def get_all_donations(
    admin: str = Depends(verify_admin),
    limit: int = Query(200, le=1000),
    skip: int = Query(0, ge=0),
    status: Optional[str] = Query(None),
):
    query = {"status": status} if status else {}
    donations = await db.donations.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return donations

@api_router.get("/admin/donations/stats")
async def get_donations_stats(admin: str = Depends(verify_admin)):
    total = await db.donations.count_documents({})
    completed = await db.donations.count_documents({"status": "completed"})
    pending = await db.donations.count_documents({"status": "pending"})
    failed = await db.donations.count_documents({"status": "failed"})

    pipeline = [
        {"$match": {"status": "completed"}},
        {"$group": {
            "_id": "$currency",
            "total": {"$sum": "$amount"},
            "count": {"$sum": 1},
        }}
    ]
    by_currency = {doc["_id"]: {"total": doc["total"], "count": doc["count"]}
                   async for doc in db.donations.aggregate(pipeline)}

    return {
        "totalDonations": total,
        "completedDonations": completed,
        "pendingDonations": pending,
        "failedDonations": failed,
        "byCurrency": by_currency,
    }

@api_router.get("/admin/donations/export.csv")
async def export_donations_csv(admin: str = Depends(verify_admin)):
    """CSV export for CNCCFP reporting."""
    donations = await db.donations.find({"status": "completed"}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    buffer = io.StringIO()
    writer = csv.writer(buffer, delimiter=";")
    writer.writerow([
        "ID", "PayPal_Order", "PayPal_Capture", "Date",
        "Montant", "Devise", "Preset",
        "Prenom", "Nom", "Email", "Telephone",
        "Adresse", "Ville", "CodePostal", "Pays",
        "PersonnePhysique", "FondsPersonnels", "CollecteDonnees", "IP"
    ])
    for d in donations:
        donor = d.get("donor", {})
        writer.writerow([
            d.get("id", ""),
            d.get("paypal_order_id", ""),
            d.get("paypal_capture_id", ""),
            d.get("completed_at") or d.get("created_at", ""),
            d.get("amount", ""),
            d.get("currency", ""),
            d.get("impact_preset") or "",
            donor.get("firstName", ""),
            donor.get("lastName", ""),
            donor.get("email", ""),
            donor.get("phone") or "",
            donor.get("address", ""),
            donor.get("city", ""),
            donor.get("postalCode", ""),
            donor.get("country", ""),
            "oui" if d.get("acceptPhysicalPerson") else "non",
            "oui" if d.get("acceptPersonalFunds") else "non",
            "oui" if d.get("acceptDataCollection") else "non",
            d.get("ip_address", ""),
        ])
    return Response(
        content=buffer.getvalue(),
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f"attachment; filename=dons-cncccfp-{datetime.now(timezone.utc).date().isoformat()}.csv"
        },
    )

@api_router.delete("/admin/donations/{donation_id}")
async def delete_donation(donation_id: str, admin: str = Depends(verify_admin)):
    result = await db.donations.delete_one({"id": donation_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Don non trouvé")
    return {"message": "Don supprimé"}

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

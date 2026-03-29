from fastapi import FastAPI, APIRouter, HTTPException, Depends, Query, Request
from fastapi.responses import RedirectResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Canonical domain configuration
CANONICAL_DOMAIN = os.environ.get('CANONICAL_DOMAIN', 'patriotes-israel.com')

# Canonical domain redirect middleware
class CanonicalDomainMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        host = request.headers.get('host', '').split(':')[0]  # Remove port if present
        
        # Skip redirect if already on canonical domain
        if host == CANONICAL_DOMAIN:
            return await call_next(request)
        
        # Skip redirect for API routes and health checks
        path = request.url.path
        if path.startswith('/api') or path == '/health' or path == '/healthz':
            return await call_next(request)
        
        # Skip for localhost/development
        if host in ('localhost', '127.0.0.1', '') or host.endswith('.preview.emergentagent.com'):
            return await call_next(request)
        
        # Build canonical URL preserving path and query string
        canonical_url = f"https://{CANONICAL_DOMAIN}{request.url.path}"
        if request.url.query:
            canonical_url += f"?{request.url.query}"
        
        # Return 301 permanent redirect
        return RedirectResponse(url=canonical_url, status_code=301)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Avec les Patriotes d'Israël - API")

# Add canonical domain redirect middleware (runs before other middleware)
app.add_middleware(CanonicalDomainMiddleware)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security for admin
security = HTTPBasic()

# Admin credentials (in production, use environment variables)
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

# Contact Form Models
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

# Donation Models
class DonationCreate(BaseModel):
    amount: int
    currency: str = "ILS"
    email: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None

class Donation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    amount: int
    currency: str
    amountILS: int  # Amount converted to ILS
    email: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    status: str = "pending"  # pending, completed, failed
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    paymentReference: Optional[str] = None

# ============== Public Routes ==============

@api_router.get("/")
async def root():
    return {"message": "Avec les Patriotes d'Israël - API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Contact Form Submission
@api_router.post("/contact", response_model=Contact)
async def submit_contact(input: ContactCreate):
    contact_obj = Contact(**input.model_dump())
    doc = contact_obj.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.contacts.insert_one(doc)
    return contact_obj

# Donation Recording
@api_router.post("/donations", response_model=Donation)
async def create_donation(input: DonationCreate):
    # Convert EUR to ILS if needed (approximate rate)
    amount_ils = input.amount if input.currency == "ILS" else input.amount * 4
    
    donation_obj = Donation(
        **input.model_dump(),
        amountILS=amount_ils,
        paymentReference=f"DON-{uuid.uuid4().hex[:8].upper()}"
    )
    doc = donation_obj.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.donations.insert_one(doc)
    return donation_obj

# Update donation status (for payment callback)
@api_router.patch("/donations/{donation_id}/status")
async def update_donation_status(donation_id: str, status: str = Query(...)):
    if status not in ["pending", "completed", "failed"]:
        raise HTTPException(status_code=400, detail="Status invalide")
    
    result = await db.donations.update_one(
        {"id": donation_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Don non trouvé")
    return {"message": "Statut mis à jour", "status": status}

# ============== Admin Routes ==============

@api_router.get("/admin/contacts", response_model=List[Contact])
async def get_all_contacts(
    admin: str = Depends(verify_admin),
    limit: int = Query(100, le=500),
    skip: int = Query(0, ge=0),
    unread_only: bool = Query(False)
):
    query = {"read": False} if unread_only else {}
    contacts = await db.contacts.find(query, {"_id": 0}).sort("createdAt", -1).skip(skip).limit(limit).to_list(limit)
    for contact in contacts:
        if isinstance(contact['createdAt'], str):
            contact['createdAt'] = datetime.fromisoformat(contact['createdAt'])
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
        "needHelpRegister": need_help_register
    }

@api_router.patch("/admin/contacts/{contact_id}/read")
async def mark_contact_read(contact_id: str, admin: str = Depends(verify_admin)):
    result = await db.contacts.update_one(
        {"id": contact_id},
        {"$set": {"read": True}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Contact non trouvé")
    return {"message": "Marqué comme lu"}

@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, admin: str = Depends(verify_admin)):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact non trouvé")
    return {"message": "Contact supprimé"}

@api_router.get("/admin/donations", response_model=List[Donation])
async def get_all_donations(
    admin: str = Depends(verify_admin),
    limit: int = Query(100, le=500),
    skip: int = Query(0, ge=0),
    status: Optional[str] = Query(None)
):
    query = {"status": status} if status else {}
    donations = await db.donations.find(query, {"_id": 0}).sort("createdAt", -1).skip(skip).limit(limit).to_list(limit)
    for donation in donations:
        if isinstance(donation['createdAt'], str):
            donation['createdAt'] = datetime.fromisoformat(donation['createdAt'])
    return donations

@api_router.get("/admin/donations/stats")
async def get_donations_stats(admin: str = Depends(verify_admin)):
    total_count = await db.donations.count_documents({})
    completed_count = await db.donations.count_documents({"status": "completed"})
    
    # Calculate total amount
    pipeline = [
        {"$match": {"status": "completed"}},
        {"$group": {"_id": None, "total": {"$sum": "$amountILS"}}}
    ]
    result = await db.donations.aggregate(pipeline).to_list(1)
    total_amount = result[0]["total"] if result else 0
    
    return {
        "totalDonations": total_count,
        "completedDonations": completed_count,
        "totalAmountILS": total_amount,
        "totalAmountEUR": round(total_amount / 4, 2)
    }

@api_router.get("/admin/donations/{donation_id}", response_model=Donation)
async def get_donation(donation_id: str, admin: str = Depends(verify_admin)):
    donation = await db.donations.find_one({"id": donation_id}, {"_id": 0})
    if not donation:
        raise HTTPException(status_code=404, detail="Don non trouvé")
    if isinstance(donation['createdAt'], str):
        donation['createdAt'] = datetime.fromisoformat(donation['createdAt'])
    return donation

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

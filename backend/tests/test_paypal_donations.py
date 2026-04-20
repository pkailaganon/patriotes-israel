"""
Session 3/3 — Backend tests for PayPal donation endpoints + CNCCFP compliance.
Notes:
 - PAYPAL_CLIENT_SECRET empty and MANDATAIRE_NOM empty in current env.
 - Expected: create-order returns 503 (mandataire not configured) BEFORE hitting PayPal.
 - Validation layer (amount/CNCCFP) runs BEFORE mandataire guard only for pydantic
   model-level checks (checkboxes). Amount bounds are AFTER mandataire check.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://consul-2026.preview.emergentagent.com').rstrip('/')
ADMIN = ("admin", "patriotes2026")


def _valid_donor():
    return {
        "firstName": "TEST_John",
        "lastName": "Doe",
        "email": "test_donor@example.com",
        "phone": "+33612345678",
        "address": "1 rue de Test",
        "city": "Paris",
        "postalCode": "75001",
        "country": "France",
    }


def _valid_payload(amount=50, currency="EUR", preset=50,
                   p=True, f=True, d=True):
    return {
        "amount": amount,
        "currency": currency,
        "impactPreset": preset,
        "donor": _valid_donor(),
        "acceptPhysicalPerson": p,
        "acceptPersonalFunds": f,
        "acceptDataCollection": d,
    }


# ---------------- /api/config/public ----------------
class TestPublicConfig:
    def test_public_config_returns_expected_fields(self):
        r = requests.get(f"{BASE_URL}/api/config/public", timeout=10)
        assert r.status_code == 200
        data = r.json()
        for key in ["donations_enabled", "paypal_client_id", "paypal_mode",
                   "mandataire_nom", "mandataire_adresse", "limits", "presets"]:
            assert key in data, f"Missing {key}"
        assert data["donations_enabled"] is True
        assert data["presets"] == [18, 50, 100, 200]
        assert set(data["limits"].keys()) == {"EUR", "USD", "ILS"}
        assert data["limits"]["EUR"]["max"] == 4600
        assert data["limits"]["ILS"]["max"] == 20000
        # Mandataire is intentionally empty in current env
        assert data["mandataire_nom"] == ""
        assert data["mandataire_adresse"] == ""


# ---------------- /api/paypal/create-order ----------------
class TestCreateOrder:
    def test_missing_cnccfp_checkbox_returns_422(self):
        """Pydantic validator runs before mandataire guard → 422."""
        payload = _valid_payload(p=False)
        r = requests.post(f"{BASE_URL}/api/paypal/create-order", json=payload, timeout=10)
        assert r.status_code == 422, f"expected 422, got {r.status_code}: {r.text[:200]}"

    def test_mandataire_not_configured_returns_503(self):
        """With mandataire empty, expect 503 — NOT a PayPal call."""
        payload = _valid_payload()
        r = requests.post(f"{BASE_URL}/api/paypal/create-order", json=payload, timeout=10)
        assert r.status_code == 503
        assert "mandataire" in r.text.lower() or "Mandataire" in r.text

    def test_invalid_currency_returns_422(self):
        payload = _valid_payload(currency="GBP", preset=None)
        r = requests.post(f"{BASE_URL}/api/paypal/create-order", json=payload, timeout=10)
        assert r.status_code == 422  # Literal validator rejects

    def test_preset_with_non_eur_blocked_by_mandataire_first(self):
        """Currently mandataire guard fires first (503). Still covers pipeline."""
        payload = _valid_payload(currency="USD", amount=50, preset=50)
        r = requests.post(f"{BASE_URL}/api/paypal/create-order", json=payload, timeout=10)
        # Either 503 (mandataire first) or 400 (preset rejected) is acceptable
        assert r.status_code in (400, 503)

    def test_rate_limit_kicks_in(self):
        """6th request from same IP should return 429."""
        payload = _valid_payload()
        statuses = []
        # Use same session → same IP
        s = requests.Session()
        for i in range(7):
            r = s.post(f"{BASE_URL}/api/paypal/create-order", json=payload, timeout=10)
            statuses.append(r.status_code)
        # At least one 429 after the 5th successful/handled request
        assert 429 in statuses, f"No 429 in responses: {statuses}"


# ---------------- /api/paypal/webhook ----------------
class TestWebhook:
    def test_webhook_accepts_valid_json(self):
        r = requests.post(
            f"{BASE_URL}/api/paypal/webhook",
            json={"event_type": "TEST.EVENT", "resource": {}},
            timeout=10,
        )
        assert r.status_code == 200
        data = r.json()
        assert data["received"] is True
        assert data["event_type"] == "TEST.EVENT"
        # Webhook ID empty → verified should be False
        assert data["verified"] is False

    def test_webhook_rejects_invalid_json(self):
        r = requests.post(
            f"{BASE_URL}/api/paypal/webhook",
            data="not-json",
            headers={"Content-Type": "application/json"},
            timeout=10,
        )
        assert r.status_code == 400


# ---------------- Admin donations endpoints ----------------
class TestAdminDonations:
    def test_admin_donations_requires_auth(self):
        r = requests.get(f"{BASE_URL}/api/admin/donations", timeout=10)
        assert r.status_code == 401

    def test_admin_donations_list_ok(self):
        r = requests.get(f"{BASE_URL}/api/admin/donations", auth=ADMIN, timeout=10)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_admin_donations_stats(self):
        r = requests.get(f"{BASE_URL}/api/admin/donations/stats", auth=ADMIN, timeout=10)
        assert r.status_code == 200
        data = r.json()
        for key in ["totalDonations", "completedDonations", "pendingDonations",
                   "failedDonations", "byCurrency"]:
            assert key in data

    def test_admin_donations_stats_requires_auth(self):
        r = requests.get(f"{BASE_URL}/api/admin/donations/stats", timeout=10)
        assert r.status_code == 401

    def test_admin_donations_csv_export(self):
        r = requests.get(f"{BASE_URL}/api/admin/donations/export.csv", auth=ADMIN, timeout=10)
        assert r.status_code == 200
        assert "text/csv" in r.headers.get("content-type", "")
        # Verify CNCCFP columns present in CSV header
        first_line = r.text.splitlines()[0] if r.text else ""
        for col in ["Prenom", "Nom", "Email", "Adresse", "PersonnePhysique",
                   "FondsPersonnels", "CollecteDonnees"]:
            assert col in first_line, f"Missing CSV column: {col}"

    def test_admin_donations_csv_requires_auth(self):
        r = requests.get(f"{BASE_URL}/api/admin/donations/export.csv", timeout=10)
        assert r.status_code == 401

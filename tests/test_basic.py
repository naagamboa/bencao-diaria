import os
import pathlib

os.environ["DATABASE_URL"] = "sqlite:///./test.db"
os.environ["APP_ENV"] = "testing"
os.environ["WHATSAPP_ACCESS_TOKEN"] = ""
os.environ["MP_ACCESS_TOKEN"] = ""

p = pathlib.Path("test.db")
if p.exists():
    p.unlink()

import asyncio
from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

from fastapi.testclient import TestClient

from app.main import app
from app.config import settings
from app.db import SessionLocal
from app.models import User, Content
from app.scheduler import run_daily_broadcast, service_window_open

client = TestClient(app)

PHONE_RAW = "(51) 99999-8888"
PHONE_E164 = "+5551999998888"
WA_ID = "5551999998888"


def admin_token() -> str:
    r = client.post("/auth/admin/login", json={"email": settings.ADMIN_EMAIL, "password": settings.ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


def wa_payload(text: str, msg_id: str = "wamid.TEST1") -> dict:
    return {
        "object": "whatsapp_business_account",
        "entry": [{
            "id": "123",
            "changes": [{
                "field": "messages",
                "value": {
                    "messaging_product": "whatsapp",
                    "metadata": {"phone_number_id": "1"},
                    "contacts": [{"profile": {"name": "Maria"}, "wa_id": WA_ID}],
                    "messages": [{"from": WA_ID, "id": msg_id, "timestamp": "1700000000",
                                  "type": "text", "text": {"body": text}}],
                },
            }],
        }],
    }


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_pages_load():
    for path in ["/", "/obrigado", "/privacidade", "/admin"]:
        r = client.get(path)
        assert r.status_code == 200, path
        assert "text/html" in r.headers["content-type"]


def test_subscribe_invalid_phone():
    r = client.post("/users/subscribe", json={"name": "Teste", "phone": "12345678", "plan": "basic", "consent": True})
    assert r.status_code == 400
    assert "WhatsApp inválido" in r.json()["detail"]

    r2 = client.post("/users/subscribe", json={"name": "Teste", "phone": "123", "plan": "basic", "consent": True})
    assert r2.status_code == 422

    r3 = client.post("/users/subscribe", json={"name": "Teste", "phone": "(00) 99999-8888", "plan": "basic", "consent": True})
    assert r3.status_code == 400


def test_subscribe_without_consent():
    body = {"name": "Teste", "phone": PHONE_RAW, "plan": "basic", "consent": False}
    r = client.post("/users/subscribe", json=body)
    assert r.status_code == 400


def test_subscribe_flow():
    body = {"name": "Maria", "phone": PHONE_RAW, "plan": "premium", "consent": True}
    r = client.post("/users/subscribe", json=body)
    assert r.status_code == 200, r.text
    data = r.json()
    uid = data["user"]["id"]
    assert data["user"]["status"] == "trial"
    assert data["user"]["phone"] == PHONE_E164
    assert data["user"]["referral_code"]
    assert data["payment"]["status"] == "pending"
    assert data["payment"]["pix_copy_paste"]

    r2 = client.get(f"/users/{uid}/status")
    assert r2.status_code == 200
    d2 = r2.json()
    assert d2["status"] == "trial"
    assert d2["payment"]["amount"] == settings.PRICE_PREMIUM

    r3 = client.post(f"/users/{uid}/optout")
    assert r3.json()["ok"] is True
    r4 = client.post(f"/users/{uid}/optin")
    assert r4.json()["ok"] is True


def test_webhook_verify():
    params = {"hub.mode": "subscribe", "hub.verify_token": settings.WHATSAPP_VERIFY_TOKEN, "hub.challenge": "12345"}
    r = client.get("/webhooks/whatsapp", params=params)
    assert r.status_code == 200
    assert r.text == "12345"

    bad = {"hub.mode": "subscribe", "hub.verify_token": "errado", "hub.challenge": "12345"}
    assert client.get("/webhooks/whatsapp", params=bad).status_code == 403


def test_whatsapp_amen_streak_and_optout():
    r = client.post("/webhooks/whatsapp", json=wa_payload("Amém 🙏", "wamid.A1"))
    assert r.status_code == 200
    assert r.json() == {"ok": True}

    db = SessionLocal()
    try:
        u = db.query(User).filter(User.phone == PHONE_E164).first()
        assert u is not None
        assert u.streak_count == 1
        assert u.last_reply_at is not None
    finally:
        db.close()

    r2 = client.post("/webhooks/whatsapp", json=wa_payload("PARAR", "wamid.A2"))
    assert r2.status_code == 200
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.phone == PHONE_E164).first()
        assert u.opted_out is True
    finally:
        db.close()

    r3 = client.post("/webhooks/whatsapp", json=wa_payload("VOLTAR", "wamid.A3"))
    assert r3.status_code == 200
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.phone == PHONE_E164).first()
        assert u.opted_out is False
    finally:
        db.close()


def test_whatsapp_unknown_number_gets_funnel():
    payload = wa_payload("Oi", "wamid.B1")
    payload["entry"][0]["changes"][0]["value"]["messages"][0]["from"] = "5511888887777"
    payload["entry"][0]["changes"][0]["value"]["contacts"] = [{"profile": {"name": "Zé"}, "wa_id": "5511888887777"}]
    r = client.post("/webhooks/whatsapp", json=payload)
    assert r.status_code == 200
    assert r.json() == {"ok": True}


def test_admin_login_stats_and_users():
    token = admin_token()
    h = {"Authorization": f"Bearer {token}"}

    r = client.get("/admin/stats", headers=h)
    assert r.status_code == 200
    s = r.json()
    for key in ["users_total", "active", "trial", "mrr", "amen_rate_7d", "content_count"]:
        assert key in s
    assert s["users_total"] >= 1

    r2 = client.get("/admin/users?q=Maria", headers=h)
    assert r2.status_code == 200
    users = r2.json()
    assert any(u["phone"] == PHONE_E164 for u in users)

    uid = users[0]["id"]
    r3 = client.post(f"/admin/users/{uid}/extend", json={"days": 30}, headers=h)
    assert r3.status_code == 200
    assert r3.json()["ok"] is True

    r4 = client.post(f"/admin/users/{uid}/message", json={"text": "Teste de mensagem 🙏"}, headers=h)
    assert r4.status_code == 200

    r5 = client.get("/admin/users", headers={"Authorization": "Bearer invalido"})
    assert r5.status_code == 401


def test_admin_manual_payment_approval():
    token = admin_token()
    h = {"Authorization": f"Bearer {token}"}
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.phone == PHONE_E164).first()
        uid = u.id
    finally:
        db.close()

    st = client.get(f"/users/{uid}/status").json()
    pid = st["payment"]["id"]
    assert st["payment"]["status"] == "pending"

    r = client.post(f"/admin/payments/{pid}/approve", headers=h)
    assert r.status_code == 200
    assert r.json()["ok"] is True

    st2 = client.get(f"/users/{uid}/status").json()
    assert st2["payment"]["status"] == "approved"
    assert st2["status"] == "active"
    assert st2["subscription_ends_at"] is not None

    r2 = client.post(f"/admin/payments/{pid}/approve", headers=h)
    assert r2.json().get("already") is True


def test_service_window_logic():
    now = datetime.now(timezone.utc)
    open_user = SimpleNamespace(last_reply_at=now - timedelta(hours=1))
    closed_user = SimpleNamespace(last_reply_at=now - timedelta(hours=25))
    none_user = SimpleNamespace(last_reply_at=None)
    assert service_window_open(open_user) is True
    assert service_window_open(closed_user) is False
    assert service_window_open(none_user) is False


def test_broadcast_and_content():
    db = SessionLocal()
    try:
        if not db.query(Content).filter(Content.day_index == 900).first():
            db.add(Content(day_index=900, title="Teste", verse_ref="Jo 1:1",
                           verse_text="No princípio era o Verbo.", reflection="r", prayer="p"))
            db.commit()
    finally:
        db.close()

    result = asyncio.run(run_daily_broadcast(force=True))
    assert "sent" in result and "skipped" in result
    assert result["sent"] >= 1


def test_content_create_and_list():
    token = admin_token()
    h = {"Authorization": f"Bearer {token}"}
    body = {"day_index": 999, "title": "T", "verse_ref": "Jo 1:1", "verse_text": "No principio",
            "reflection": "r", "prayer": "p"}
    r = client.post("/content", json=body, headers=h)
    assert r.status_code == 200, r.text
    cid = r.json()["id"]
    r2 = client.get("/content")
    assert r2.status_code == 200
    assert any(c["id"] == cid for c in r2.json())
    r3 = client.delete(f"/content/{cid}", headers=h)
    assert r3.json()["ok"] is True


def test_mp_webhook_ignores_unknown():
    r = client.post("/webhooks/mercadopago", json={})
    assert r.status_code == 200
    assert r.json() == {"ok": True}

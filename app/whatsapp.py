import hmac
import hashlib
import json
import logging
import uuid
from typing import Optional

import httpx

from app.config import settings

logger = logging.getLogger("bencao.whatsapp")

BASE = "https://graph.facebook.com/v20.0"


def dev_mode() -> bool:
    return not settings.WHATSAPP_ACCESS_TOKEN


def _headers() -> dict:
    return {"Authorization": f"Bearer {settings.WHATSAPP_ACCESS_TOKEN}", "Content-Type": "application/json"}


def _dev_send(to: str, kind: str, preview: str) -> dict:
    fake_id = f"dev-{uuid.uuid4().hex[:12]}"
    logger.warning("[DEV WHATSAPP %s -> %s] %s", kind.upper(), to, preview.replace("\n", " | ")[:400])
    return {"messaging_product": "whatsapp", "messages": [{"id": fake_id}]}


async def send_text(phone: str, text: str, preview_url: bool = False) -> dict:
    if dev_mode():
        return _dev_send(phone, "text", text)
    url = f"{BASE}/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
    payload = {
        "messaging_product": "whatsapp",
        "to": phone.lstrip("+"),
        "type": "text",
        "text": {"body": text, "preview_url": preview_url},
    }
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.post(url, headers=_headers(), json=payload)
        data = r.json()
        if r.status_code >= 400:
            raise RuntimeError(f"WhatsApp send failed: {r.status_code} {data}")
        return data


async def send_template(phone: str, template_name: str, params: Optional[list] = None, lang: str = "pt_BR") -> dict:
    if dev_mode():
        return _dev_send(phone, f"template:{template_name}", f"params={params}")
    url = f"{BASE}/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
    components = []
    if params:
        components.append({"type": "body", "parameters": [{"type": "text", "text": str(p)} for p in params]})
    payload = {
        "messaging_product": "whatsapp",
        "to": phone.lstrip("+"),
        "type": "template",
        "template": {"name": template_name, "language": {"code": lang}, "components": components},
    }
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.post(url, headers=_headers(), json=payload)
        data = r.json()
        if r.status_code >= 400:
            raise RuntimeError(f"WhatsApp send failed: {r.status_code} {data}")
        return data


async def mark_read(message_id: str) -> None:
    if dev_mode() or not message_id:
        return
    url = f"{BASE}/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
    payload = {"messaging_product": "whatsapp", "status": "read", "message_id": message_id}
    try:
        async with httpx.AsyncClient(timeout=15) as c:
            await c.post(url, headers=_headers(), json=payload)
    except Exception:
        logger.exception("mark_read falhou")


def verify_signature(raw_body: bytes, signature_header: Optional[str]) -> bool:
    if dev_mode() or not settings.WHATSAPP_APP_SECRET:
        return True
    if not signature_header:
        return False
    expected = "sha256=" + hmac.new(settings.WHATSAPP_APP_SECRET.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header)


def parse_webhook(payload: dict) -> list:
    events = []
    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            value = change.get("value", {})
            contacts = {c.get("wa_id"): c.get("profile", {}).get("name") for c in value.get("contacts", [])}
            for msg in value.get("messages", []):
                sender = msg.get("from")
                text = ""
                msg_type = msg.get("type")
                if msg_type == "text":
                    text = (msg.get("text") or {}).get("body", "")
                elif msg_type == "button":
                    text = (msg.get("button") or {}).get("text", "")
                elif msg_type == "interactive":
                    interactive = msg.get("interactive") or {}
                    text = ((interactive.get("button_reply") or {}).get("title")
                            or (interactive.get("list_reply") or {}).get("title") or "")
                events.append({
                    "type": "message",
                    "from": sender,
                    "id": msg.get("id"),
                    "text": text,
                    "message_type": msg_type,
                    "profile_name": contacts.get(sender),
                    "timestamp": msg.get("timestamp"),
                })
            for st in value.get("statuses", []):
                events.append({
                    "type": "status",
                    "id": st.get("id"),
                    "status": st.get("status"),
                    "recipient": st.get("recipient_id"),
                    "timestamp": st.get("timestamp"),
                })
    return events


def build_daily_message(name: str, content) -> str:
    first_name = (name or "amigo(a)").split(" ")[0]
    return (
        f"🌅 *Bênção Diária* — {first_name}, bom dia!\n\n"
        f"📖 *{content.verse_ref}*\n"
        f"_{content.verse_text}_\n\n"
        f"💭 *Reflexão:* {content.reflection}\n\n"
        f"🙏 *Oração:* {content.prayer}\n\n"
        f"Responda *AMÉM* 🙌 para confirmar que você recebeu sua bênção de hoje e liberar a de amanhã. "
        f"Deus te abençoe! 💚"
    )


def build_welcome_message(name: str, plan: str) -> str:
    first_name = (name or "amigo(a)").split(" ")[0]
    plan_name = "Premium" if plan == "premium" else "Essencial"
    return (
        f"🙏 *Bem-vindo(a) à Bênção Diária, {first_name}!*\n\n"
        f"Seu plano *{plan_name}* está ativo. Todos os dias, de manhã, você receberá aqui:\n"
        f"• Um versículo 📖\n• Uma reflexão 💭\n• Uma oração 🙏\n\n"
        f"➊ Para confirmar que quer receber, responda *AMÉM*\n"
        f"➋ Para escolher outro horário: *1* = 6h, *2* = 12h, *3* = 20h\n"
        f"➌ Para indicar um amigo e ganhar 1 mês grátis: responda *INDICAR*\n\n"
        f"Que Deus abençoe sua caminhada! 💚"
    )

import uuid
from datetime import datetime, timedelta, timezone
from sqlalchemy import (
    Column, String, Float, Integer, Boolean, DateTime, Text, ForeignKey, Enum as SAEnum,
)
from sqlalchemy.orm import relationship
from app.db import Base


def now_utc():
    return datetime.now(timezone.utc)


def new_uuid():
    return str(uuid.uuid4())


PLAN_BASIC = "basic"
PLAN_PREMIUM = "premium"
STATUS_TRIAL = "trial"
STATUS_ACTIVE = "active"
STATUS_PAST_DUE = "past_due"
STATUS_CANCELLED = "cancelled"


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=new_uuid)
    phone = Column(String, unique=True, index=True, nullable=False)  # E.164 with +
    name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    plan = Column(String, default=PLAN_BASIC)
    status = Column(String, default=STATUS_TRIAL)
    trial_ends_at = Column(DateTime, nullable=True)
    subscription_ends_at = Column(DateTime, nullable=True)
    referral_code = Column(String, unique=True, index=True)
    referred_by = Column(String, ForeignKey("users.id"), nullable=True)
    consent_at = Column(DateTime, nullable=True)
    opted_out = Column(Boolean, default=False)
    preferred_hour = Column(Integer, default=7)
    last_reply_at = Column(DateTime, nullable=True)
    last_daily_sent_at = Column(DateTime, nullable=True)
    streak_count = Column(Integer, default=0)
    streak_last_at = Column(DateTime, nullable=True)
    last_renewal_reminder_at = Column(DateTime, nullable=True)
    welcome_sent_at = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now_utc)
    updated_at = Column(DateTime, default=now_utc, onupdate=now_utc)

    payments = relationship("Payment", back_populates="user", cascade="all, delete-orphan")
    messages = relationship("MessageLog", back_populates="user", cascade="all, delete-orphan")


class Payment(Base):
    __tablename__ = "payments"
    id = Column(String, primary_key=True, default=new_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    mp_payment_id = Column(String, unique=True, nullable=True)
    mp_preapproval_id = Column(String, nullable=True)
    amount = Column(Float, nullable=False)
    plan = Column(String, nullable=False)
    method = Column(String, default="pix")  # pix, card
    status = Column(String, default="pending")  # pending, approved, rejected, refunded, cancelled
    pix_qr = Column(Text, nullable=True)
    pix_copy_paste = Column(Text, nullable=True)
    checkout_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now_utc)
    paid_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="payments")


class Content(Base):
    __tablename__ = "content"
    id = Column(String, primary_key=True, default=new_uuid)
    day_index = Column(Integer, unique=True, index=True)  # 1..365 rotation
    title = Column(String, nullable=False)
    verse_ref = Column(String, nullable=False)
    verse_text = Column(Text, nullable=False)
    reflection = Column(Text, nullable=False)
    prayer = Column(Text, nullable=False)
    premium_audio_url = Column(String, nullable=True)
    tags = Column(String, nullable=True)
    created_at = Column(DateTime, default=now_utc)


class MessageLog(Base):
    __tablename__ = "message_logs"
    id = Column(String, primary_key=True, default=new_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    content_id = Column(String, ForeignKey("content.id"), nullable=True)
    wa_message_id = Column(String, nullable=True, index=True)
    direction = Column(String, default="outbound")  # outbound / inbound
    category = Column(String, default="marketing")  # marketing, utility, service
    body = Column(Text, nullable=True)
    status = Column(String, default="queued")  # queued, sent, delivered, read, failed
    error = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now_utc)

    user = relationship("User", back_populates="messages")


class Referral(Base):
    __tablename__ = "referrals"
    id = Column(String, primary_key=True, default=new_uuid)
    referrer_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    referred_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    rewarded = Column(Boolean, default=False)
    created_at = Column(DateTime, default=now_utc)

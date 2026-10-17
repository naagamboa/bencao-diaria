from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class SubscribeIn(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=8, max_length=24)
    email: Optional[str] = None
    plan: str = "basic"
    referral_code: Optional[str] = None
    consent: bool


class UserOut(BaseModel):
    id: str
    phone: str
    name: Optional[str]
    plan: str
    status: str
    trial_ends_at: Optional[datetime]
    subscription_ends_at: Optional[datetime]
    referral_code: Optional[str]
    opted_out: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PaymentOut(BaseModel):
    id: str
    amount: float
    plan: str
    status: str
    pix_copy_paste: Optional[str]
    pix_qr: Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ContentIn(BaseModel):
    day_index: int
    title: str
    verse_ref: str
    verse_text: str
    reflection: str
    prayer: str
    premium_audio_url: Optional[str] = None
    tags: Optional[str] = None


class AdminLoginIn(BaseModel):
    email: str
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ManualMessageIn(BaseModel):
    text: str = Field(min_length=1, max_length=2000)


class ExtendIn(BaseModel):
    days: int = Field(ge=1, le=3650)

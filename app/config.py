from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    APP_NAME: str = "Bênção Diária"
    APP_ENV: str = "development"
    APP_URL: str = "http://localhost:8000"
    SECRET_KEY: str = "dev-secret-change-me"
    ADMIN_EMAIL: str = "admin@exemplo.com"
    ADMIN_PASSWORD: str = "admin123"

    DATABASE_URL: str = "sqlite:///./data.db"

    WHATSAPP_PHONE_NUMBER_ID: str = ""
    WHATSAPP_BUSINESS_ACCOUNT_ID: str = ""
    WHATSAPP_ACCESS_TOKEN: str = ""
    WHATSAPP_VERIFY_TOKEN: str = "verify-token"
    WHATSAPP_APP_SECRET: str = ""
    WHATSAPP_TEMPLATE_DAILY: str = "daily_blessing"
    WHATSAPP_TEMPLATE_WELCOME: str = "welcome_blessing"

    MP_ACCESS_TOKEN: str = ""
    MP_WEBHOOK_SECRET: str = ""
    MP_PIX_KEY: str = ""

    PRICE_BASIC: float = 49.90
    PRICE_PREMIUM: float = 79.00
    TRIAL_DAYS: int = 3

    DAILY_SEND_HOUR: int = 7
    DAILY_SEND_MINUTE: int = 0
    TIMEZONE: str = "America/Sao_Paulo"

    REFERRAL_REWARD_DAYS: int = 30
    RENEWAL_REMINDER_DAYS: int = 3
    SERVICE_WINDOW_HOURS: int = 24
    AMEN_STREAK_BONUS_DAYS: int = 1

    SUPPORT_WHATSAPP: str = ""


settings = Settings()

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def ensure_schema() -> None:
    if not settings.DATABASE_URL.startswith("sqlite"):
        return
    migrations = {
        "users": {
            "preferred_hour": "INTEGER DEFAULT 7",
            "last_reply_at": "DATETIME",
            "last_daily_sent_at": "DATETIME",
            "streak_count": "INTEGER DEFAULT 0",
            "streak_last_at": "DATETIME",
            "last_renewal_reminder_at": "DATETIME",
            "welcome_sent_at": "DATETIME",
            "notes": "TEXT",
        },
        "payments": {
            "mp_preapproval_id": "VARCHAR",
            "method": "VARCHAR DEFAULT 'pix'",
            "checkout_url": "TEXT",
        },
        "message_logs": {
            "category": "VARCHAR DEFAULT 'marketing'",
            "body": "TEXT",
        },
    }
    with engine.begin() as conn:
        for table, columns in migrations.items():
            existing = {row[1] for row in conn.execute(text(f"PRAGMA table_info({table})"))}
            for column, ddl in columns.items():
                if column not in existing:
                    conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {column} {ddl}"))

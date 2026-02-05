from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/primedrive"
    frontend_url: str = "http://localhost:5173"
    jwt_secret: str = "change-me"
    stripe_secret_key: str | None = None
    stripe_webhook_secret: str | None = None

settings = Settings()

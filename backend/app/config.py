from functools import lru_cache

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    mailchimp_api_key: SecretStr = SecretStr("")
    mailchimp_audience_id: str = ""
    mailchimp_server_prefix: str = ""
    allowed_origins: str = "http://127.0.0.1:5173"

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    @property
    def mailchimp_configured(self) -> bool:
        return bool(
            self.mailchimp_api_key.get_secret_value()
            and self.mailchimp_audience_id
            and self.mailchimp_server_prefix
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()

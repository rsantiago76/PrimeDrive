from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class Addon(Base):
    __tablename__ = "addons"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    pricing_model: Mapped[str] = mapped_column(String(20), nullable=False)
    price_cents: Mapped[int] = mapped_column(Integer, nullable=False)

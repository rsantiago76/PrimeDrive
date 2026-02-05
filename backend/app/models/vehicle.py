from sqlalchemy import String, Integer, JSON, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class Vehicle(Base):
    __tablename__ = "vehicles"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    owner_id: Mapped[str] = mapped_column(String, ForeignKey("user_profiles.id"), nullable=False)
    
    make: Mapped[str] = mapped_column(String(80), nullable=False)
    model: Mapped[str] = mapped_column(String(120), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    
    location_city: Mapped[str] = mapped_column(String(120), nullable=False)
    location_state: Mapped[str] = mapped_column(String(20), nullable=False)
    
    daily_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    weekly_discount_pct: Mapped[int] = mapped_column(Integer, default=0)
    mileage_limit_per_day: Mapped[int] = mapped_column(Integer, default=200)
    
    features: Mapped[list] = mapped_column(JSON, default=list)
    images: Mapped[list] = mapped_column(JSON, default=list)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # Relationships
    owner = relationship("UserProfile", backref="vehicles")

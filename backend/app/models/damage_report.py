from sqlalchemy import String, Text, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class DamageReport(Base):
    __tablename__ = "damage_reports"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    booking_id: Mapped[str] = mapped_column(String, ForeignKey("bookings.id"), index=True, nullable=False)
    # vehicle_id is accessible via booking.vehicle
    
    reporter_user_id: Mapped[str] = mapped_column(String, ForeignKey("user_profiles.id"), nullable=False)
    
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    photo_urls: Mapped[list] = mapped_column(JSON, default=list)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="OPEN")

    # Relationships
    booking = relationship("Booking", backref="damage_reports")
    reporter = relationship("UserProfile", backref="damage_reports")

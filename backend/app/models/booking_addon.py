from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class BookingAddon(Base):
    __tablename__ = "booking_addons"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    booking_id: Mapped[str] = mapped_column(String, ForeignKey("bookings.id"), index=True, nullable=False)
    addon_id: Mapped[str] = mapped_column(String, ForeignKey("addons.id"), nullable=False)
    
    qty: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    price_cents: Mapped[int] = mapped_column(Integer, nullable=False) # Snapshot price
    pricing_model: Mapped[str] = mapped_column(String(20), nullable=False) # SNAPSHOT: FLAT or PER_DAY

    # Relationships
    booking = relationship("Booking", backref="booking_addons")
    addon = relationship("Addon", backref="booking_usages")

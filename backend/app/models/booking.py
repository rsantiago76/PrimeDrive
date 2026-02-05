from sqlalchemy import String, Integer, Date, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base
import datetime

class Booking(Base):
    __tablename__ = "bookings"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    vehicle_id: Mapped[str] = mapped_column(String, ForeignKey("vehicles.id"), index=True, nullable=False)
    renter_user_id: Mapped[str] = mapped_column(String, ForeignKey("user_profiles.id"), nullable=False, index=True)
    
    start_date: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    end_date: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="PENDING_PAYMENT")
    total_cents: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    deposit_cents: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    payment_status: Mapped[str] = mapped_column(String(30), nullable=False, default="REQUIRES_PAYMENT")
    
    add_ons: Mapped[list] = mapped_column(JSON, default=list)

    # Relationships
    vehicle = relationship("Vehicle", backref="bookings")
    renter = relationship("UserProfile", backref="bookings")

from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class Payment(Base):
    __tablename__ = "payments"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    booking_id: Mapped[str] = mapped_column(String, ForeignKey("bookings.id"), index=True, nullable=False)
    
    stripe_payment_intent_id: Mapped[str] = mapped_column(String, nullable=True)
    amount_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="CREATED")
    idempotency_key: Mapped[str] = mapped_column(String(64), nullable=False)
    
    type: Mapped[str] = mapped_column(String(30), nullable=False, default="FINAL") # DEPOSIT or FINAL

    # Relationships
    booking = relationship("Booking", backref="payments")

from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class Refund(Base):
    __tablename__ = "refunds"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    booking_id: Mapped[str] = mapped_column(String, index=True, nullable=False)
    payment_id: Mapped[str] = mapped_column(String, nullable=False)
    stripe_refund_id: Mapped[str] = mapped_column(String, nullable=True)
    amount_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="CREATED")
    reason: Mapped[str] = mapped_column(String(200), nullable=False, default="Cancellation")

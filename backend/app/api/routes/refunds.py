import secrets
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.refund import Refund

router = APIRouter()

@router.post("")
async def refund(payload: dict, db: AsyncSession = Depends(get_db)):
    booking = await db.get(Booking, payload["booking_id"])
    if not booking: raise HTTPException(status_code=404, detail="Booking not found")

    pay_res = await db.execute(select(Payment).where(Payment.booking_id == booking.id))
    payment = pay_res.scalars().first()
    if not payment: raise HTTPException(status_code=404, detail="Payment not found")

    amount = int(payload["amount_cents"])
    if amount > payment.amount_cents:
        raise HTTPException(status_code=400, detail="Refund exceeds deposit paid")

    r = Refund(
        id=f"rf_{secrets.token_hex(6)}",
        booking_id=booking.id,
        payment_id=payment.id,
        stripe_refund_id=f"re_{secrets.token_hex(10)}",
        amount_cents=amount,
        status="SUCCEEDED",
        reason=payload.get("reason", "Cancellation"),
    )
    db.add(r)
    booking.payment_status = "REFUNDED"
    booking.status = "CANCELLED"
    await db.commit()
    return {"refund_id": r.id, "status": r.status}

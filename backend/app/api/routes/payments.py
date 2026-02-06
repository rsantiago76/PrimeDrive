from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.payment import Payment

router = APIRouter()

@router.post("/deposit/{booking_id}")
async def get_deposit_secret(
    booking_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve the client secret for the deposit payment of a specific booking.
    """
    stmt = select(Payment).where(
        Payment.booking_id == booking_id,
        Payment.type == "DEPOSIT",
        Payment.status != "SUCCEEDED" # Only get if not paid? Or allow retry.
    )
    result = await db.execute(stmt)
    payment = result.scalars().first()
    
    if not payment:
         raise HTTPException(status_code=404, detail="Payment not found")
    
    # In a real app we might need to retrieve the secret from Stripe if not stored (we don't store secret usually).
    # But wait, we returned it from Service but didn't store it.
    # We stored 'stripe_payment_intent_id'.
    # We can retrieve the intent from Stripe to get the secret again.
    
    from app.services.payment import PaymentService
    # We need a retrieve method in PaymentService or use the library directly here.
    # For MVP mock mode:
    if payment.stripe_payment_intent_id.startswith("pi_mock"):
        return {"client_secret": f"seti_mock_{payment.amount_cents}"}
    
    # Real Stripe retrieve
    import stripe
    stripe.api_key = PaymentService._get_api_key()
    intent = stripe.PaymentIntent.retrieve(payment.stripe_payment_intent_id)
    return {"client_secret": intent.client_secret}

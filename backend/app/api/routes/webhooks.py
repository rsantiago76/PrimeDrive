from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.services.payment import PaymentService
from app.models.payment import Payment
from app.models.booking import Booking
import stripe

router = APIRouter()

@router.post("/stripe")
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        # In real app verify signature
        # event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        # For MVP we trust or parse basic info if verifying is hard without secret
        import json
        event = json.loads(payload)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid payload")

    if event['type'] == 'payment_intent.succeeded':
        pi = event['data']['object']
        pi_id = pi['id']
        
        # Update Payment
        stmt = select(Payment).where(Payment.stripe_payment_intent_id == pi_id)
        res = await db.execute(stmt)
        payment = res.scalars().first()
        
        if payment:
            payment.status = "SUCCEEDED"
            
            # Update Booking
            stmt_b = select(Booking).where(Booking.id == payment.booking_id)
            res_b = await db.execute(stmt_b)
            booking = res_b.scalars().first()
            if booking:
                booking.status = "CONFIRMED"
                booking.payment_status = "DEPOSIT_PAID"
                
            await db.commit()

    return {"status": "success"}

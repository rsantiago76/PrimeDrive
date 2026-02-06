import stripe
import os
from typing import Optional, Tuple

class PaymentService:
    @staticmethod
    def _get_api_key():
        # Ideally using settings, but env var direct access for now
        return os.getenv("STRIPE_SECRET_KEY", "sk_test_mock_key")

    @staticmethod
    def create_deposit_intent(amount_cents: int, currency: str = "usd", metadata: dict = {}) -> Tuple[str, str]:
        """
        Creates a Stripe PaymentIntent.
        Returns (payment_intent_id, client_secret).
        """
        stripe.api_key = PaymentService._get_api_key()
        
        # In a real app we'd handle Stripe errors roughly here
        try:
            intent = stripe.PaymentIntent.create(
                amount=amount_cents,
                currency=currency,
                metadata=metadata,
                automatic_payment_methods={"enabled": True},
            )
            return intent.id, intent.client_secret
        except Exception as e:
            # Fallback for when no real key is present or net error in dev
            if stripe.api_key == "sk_test_mock_key":
                return f"pi_mock_{amount_cents}", f"seti_mock_{amount_cents}"
            raise e

    @staticmethod
    def refund_payment(payment_intent_id: str, amount_cents: Optional[int] = None) -> str:
        """
        Refunds a payment.
        Returns refund_id.
        """
        stripe.api_key = PaymentService._get_api_key()
        try:
            refund = stripe.Refund.create(
                payment_intent=payment_intent_id,
                amount=amount_cents, # If None, full refund
            )
            return refund.id
        except Exception as e:
             if stripe.api_key == "sk_test_mock_key":
                 return f"re_mock_{amount_cents}"
             raise e

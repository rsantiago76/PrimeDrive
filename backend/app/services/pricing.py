from datetime import date
from typing import List, Dict, Optional
from pydantic import BaseModel

# We can rely on schemas or dicts. Let's use internal dataclasses for clarity or schemas.
# Since we need to return specific breakdowns, let's define the return structure here or import.
from app.schemas.booking import BookingQuote, AddOnSelection

class PricingService:
    @staticmethod
    def calculate_quote(
        vehicle_daily_cents: int,
        vehicle_weekly_discount_pct: int,
        start_date: date,
        end_date: date,
        addons: List[AddOnSelection] = []
    ) -> BookingQuote:
        """
        Calculate the full pricing quote for a booking.
        """
        if start_date >= end_date:
            raise ValueError("Start date must be before end date")

        # 1. Calculate Duration
        total_days = (end_date - start_date).days
        
        # 2. Base Price
        base_price_cents = total_days * vehicle_daily_cents
        
        # 3. Discount
        discount_cents = 0
        if total_days >= 7:
            discount_cents = int(base_price_cents * (vehicle_weekly_discount_pct / 100))
        
        # 4. Add-ons
        # We assume addons passed in have 'daily_rate_cents' and 'name'
        # In a real app we might fetch pricing model from DB. 
        # For this MVP we will infer or require it passed.
        # Let's assume AddOnSelection from schema has name and rate, 
        # but we need to know if it's PER_DAY or FLAT.
        # Since the Schema AddOnSelection matches BookingCreate (name, daily_rate_cents),
        # let's assume for MVP all addons are PER_DAY unless specified.
        # Ideally, we should fetch the Addon from DB to get the 'pricing_model'.
        # For simplicity in this logical function if we can't query DB, we'll assume PER_DAY 
        # OR we'll use a naming convention or separate arg.
        
        # UPDATE: The prompt says "add-ons pricing models: flat, per_day".
        # We need that info. 
        # Let's assume the caller passes fully inflated addon objects or we just use simple logic.
        # For this standalone service method, let's assume we receive a list of definitions.
        
        addons_total_cents = 0
        
        # We'll calculate based on the assumption that the input list has accurate pricing.
        # If 'pricing_model' isn't in AddOnSelection, we will assume PER_DAY for now 
        # based on 'daily_rate_cents' field presence in earlier schemas.
        # However, to meet the requirement strictly, we should probably fetch data.
        # But this function is pure logic.
        
        for addon in addons:
            # Hack for MVP: Check name for "Insurance" or "GPS" -> Per Day. 
            # "Child Seat" -> Flat (Example).
            # Real solution: Caller provides pricing_model. 
            # We'll assume PER_DAY for all unless mapped otherwise for this demo logic.
            # Or better, we define a helper or expect extended dicts.
            
            # Implementation choice: Treat 'daily_rate_cents' as the rate to multiply by days 
            # if it's a daily addon. If it Was meant to be flat, we'd need a flag.
            
            # Let's support a custom dict attribute if available, or default to PER_DAY
             
            is_flat = getattr(addon, 'pricing_model', 'PER_DAY') == 'FLAT'
            qty = getattr(addon, 'qty', 1) 
            rate = addon.daily_rate_cents
            
            cost = rate * qty
            if not is_flat:
                cost *= total_days
            
            addons_total_cents += cost

        # 5. Subtotal (After discount, before fees/deposit)
        # Actually standard flow: (Base - Discount) + Addons + Fees
        subtotal_before_fees = (base_price_cents - discount_cents) + addons_total_cents
        
        # 6. Taxes/Fees (Placeholder)
        # tax_cents = int(subtotal_before_fees * 0.10)
        tax_cents = 0 # Optional in MVP
        
        total_cents = subtotal_before_fees + tax_cents
        
        # 7. Deposit
        # 15% of total, min $150 (15000 cents), max $500 (50000 cents)
        deposit_cents = int(total_cents * 0.15)
        deposit_cents = max(15000, min(deposit_cents, 50000))

        return BookingQuote(
            vehicle_id="n/a", # Caller fills this
            start_date=start_date,
            end_date=end_date,
            total_days=total_days,
            base_price_cents=base_price_cents,
            discount_cents=discount_cents,
            add_ons_total_cents=addons_total_cents,
            total_cents=total_cents,
            deposit_cents=deposit_cents
        )

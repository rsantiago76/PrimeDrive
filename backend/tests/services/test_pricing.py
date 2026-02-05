import pytest
from datetime import date
from app.services.pricing import PricingService
from app.schemas.booking import AddOnSelection

class MockAddon:
    def __init__(self, name, rate, pricing_model="PER_DAY", qty=1):
        self.name = name
        self.daily_rate_cents = rate
        self.pricing_model = pricing_model
        self.qty = qty

def test_pricing_3_days_no_addons():
    # 3 days * $100 = $300. No discount.
    quote = PricingService.calculate_quote(
        vehicle_daily_cents=10000,
        vehicle_weekly_discount_pct=10,
        start_date=date(2024, 1, 1),
        end_date=date(2024, 1, 4), # 3 days
        addons=[]
    )
    assert quote.total_days == 3
    assert quote.base_price_cents == 30000
    assert quote.discount_cents == 0
    assert quote.total_cents == 30000
    # Deposit: 15% of 300 = 45. Min is 150.
    assert quote.deposit_cents == 15000

def test_pricing_8_days_with_discount():
    # 8 days * $100 = $800. 10% discount = $80. Total $720.
    quote = PricingService.calculate_quote(
        vehicle_daily_cents=10000,
        vehicle_weekly_discount_pct=10,
        start_date=date(2024, 1, 1),
        end_date=date(2024, 1, 9), # 8 days
        addons=[]
    )
    assert quote.total_days == 8
    assert quote.base_price_cents == 80000
    assert quote.discount_cents == 8000
    assert quote.total_cents == 72000
    # Deposit: 15% of 720 = 108. Min 150.
    assert quote.deposit_cents == 15000

def test_pricing_addons_mixed():
    # 5 days * $100 = $500.
    # GPS (Per Day) $10 * 5 = $50.
    # Seat (Flat) $20 * 1 = $20.
    # Total = 570.
    
    addons = [
        MockAddon("GPS", 1000, "PER_DAY"),
        MockAddon("Seat", 2000, "FLAT")
    ]
    
    quote = PricingService.calculate_quote(
        vehicle_daily_cents=10000,
        vehicle_weekly_discount_pct=10,
        start_date=date(2024, 1, 1),
        end_date=date(2024, 1, 6), # 5 days
        addons=addons
    )
    
    assert quote.total_days == 5
    assert quote.base_price_cents == 50000
    assert quote.add_ons_total_cents == 7000 # 5000 + 2000
    assert quote.total_cents == 57000
    # Deposit: 15% of 570 = 85.5 -> 8550 cents. Min 15000.
    assert quote.deposit_cents == 15000

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

type Addon = { id: string; name: string; pricing_model: 'flat' | 'per_day'; price_cents: number }
type Quote = {
  days: number
  base_total_cents: number
  discount_cents: number
  addons_total_cents: number
  fees_cents: number
  total_cents: number
  deposit_cents: number
  addons_breakdown: { addon_id: string; name: string; qty: number; line_total_cents: number }[]
}

export default function VehiclePage() {
  const { id } = useParams()
  const nav = useNavigate()
  const [vehicle, setVehicle] = useState<any>(null)
  const [addons, setAddons] = useState<Addon[]>([])
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [quote, setQuote] = useState<Quote | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const v = await api.get(`/api/v1/vehicles/${id}`)
      setVehicle(v)
      const a = await api.get<Addon[]>(`/api/v1/addons`)
      setAddons(a)
    })()
  }, [id])

  const toggleAddon = (addonId: string) => {
    setSelected(prev => {
      const next = { ...prev }
      if (next[addonId]) delete next[addonId]
      else next[addonId] = 1
      return next
    })
  }

  const getQuote = async () => {
    setError(null)
    try {
      const payload = {
        vehicle_id: id,
        start_date: checkIn,
        end_date: checkOut,
        addons: Object.entries(selected).map(([addon_id, qty]) => ({ addon_id, qty })),
      }
      const q = await api.post<Quote>(`/api/v1/vehicles/${id}/quote`, payload)
      setQuote(q)
    } catch (e: any) {
      setQuote(null)
      setError(e?.message || 'Unable to quote')
    }
  }

  const book = async () => {
    setError(null)
    try {
      const payload = {
        vehicle_id: id,
        start_date: checkIn,
        end_date: checkOut,
        addons: Object.entries(selected).map(([addon_id, qty]) => ({ addon_id, qty })),
      }
      const res = await api.post<{ booking_id: string }>(`/api/v1/bookings`, payload)
      nav(`/checkout/${res.booking_id}`)
    } catch (e: any) {
      setError(e?.message || 'Booking failed')
    }
  }

  if (!vehicle) return <div>Loading vehicle…</div>

  return (
    <div>
      <h1>{vehicle.make} {vehicle.model}</h1>
      <p className="muted">{vehicle.category} • {vehicle.year} • {vehicle.location_city}, {vehicle.location_state}</p>

      <div className="card">
        <div className="muted">Daily rate</div>
        <div className="price">${(vehicle.daily_cents / 100).toFixed(0)}/day</div>
        <div className="muted">Mileage limit: {vehicle.mileage_limit_per_day} mi/day</div>
      </div>

      <h3>Dates</h3>
      <div className="filters">
        <label className="label">Start
          <input value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="YYYY-MM-DD" />
        </label>
        <label className="label">End
          <input value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="YYYY-MM-DD" />
        </label>
      </div>

      <h3>Add-ons</h3>
      <div className="grid">
        {addons.map(a => (
          <button key={a.id} className={selected[a.id] ? 'card selected' : 'card'} onClick={() => toggleAddon(a.id)}>
            <div className="cardTitle">{a.name}</div>
            <div className="muted">{a.pricing_model === 'per_day' ? 'Per day' : 'Flat'}</div>
            <div className="price">${(a.price_cents / 100).toFixed(0)}</div>
          </button>
        ))}
      </div>

      <div className="spacer" />
      <button className="btn" onClick={getQuote}>Get quote</button>

      {error && <div className="error">{error}</div>}

      {quote && (
        <div className="card">
          <div className="cardTitle">Quote</div>
          <div className="muted">Days: {quote.days}</div>
          <div className="muted">Base: ${(quote.base_total_cents/100).toFixed(2)}</div>
          <div className="muted">Discount: -${(quote.discount_cents/100).toFixed(2)}</div>
          <div className="muted">Add-ons: ${(quote.addons_total_cents/100).toFixed(2)}</div>
          <div className="muted">Fees: ${(quote.fees_cents/100).toFixed(2)}</div>
          <div className="price">Total: ${(quote.total_cents/100).toFixed(2)}</div>
          <div className="muted">Deposit due now: ${(quote.deposit_cents/100).toFixed(2)}</div>
          <div className="spacer" />
          <button className="btn" onClick={book}>Book & pay deposit</button>
        </div>
      )}
    </div>
  )
}

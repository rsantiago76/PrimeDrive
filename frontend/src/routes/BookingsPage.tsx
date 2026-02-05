import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function BookingsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get<any[]>('/api/v1/bookings')
        setItems(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading rentals…</div>

  return (
    <div>
      <h1>My Rentals</h1>
      {items.length === 0 ? <p className="muted">No rentals yet.</p> : (
        <div className="grid">
          {items.map(b => (
            <div key={b.id} className="card">
              <div className="cardTitle">{b.vehicle_title}</div>
              <div className="muted">{b.start_date} → {b.end_date}</div>
              <div className="muted">Status: {b.status}</div>
              <div className="muted">Deposit: ${(b.deposit_cents/100).toFixed(2)} • Paid: {b.payment_status}</div>
              <div className="spacer" />
              <Link to={`/damage-report/${b.id}`} className="btnLink">Report Damage</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function CheckoutPage() {
  const { bookingId } = useParams()
  const [state, setState] = useState<{ loading: boolean; client_secret?: string; deposit_cents?: number; status?: string; error?: string }>({ loading: true })

  useEffect(() => {
    (async () => {
      try {
        const res = await api.post<{ client_secret: string; deposit_cents: number; status: string }>(`/api/v1/payments/deposit`, { booking_id: bookingId })
        setState({ loading: false, ...res })
      } catch (e: any) {
        setState({ loading: false, error: e?.message || 'Unable to start checkout' })
      }
    })()
  }, [bookingId])

  if (state.loading) return <div>Starting checkout…</div>
  if (state.error) return <div className="error">{state.error}</div>

  return (
    <div>
      <h1>Checkout (Deposit)</h1>
      <p className="muted">Demo scaffold: deposit intent created. Wire Stripe Elements + webhook for production.</p>
      <div className="card">
        <div className="muted">Deposit</div>
        <div className="price">${((state.deposit_cents || 0) / 100).toFixed(2)}</div>
        <div className="muted">Payment status: {state.status}</div>
        <div className="muted">client_secret (placeholder): {state.client_secret}</div>
      </div>
      <div className="spacer" />
      <Link to="/bookings" className="btnLink">Go to My Rentals</Link>
    </div>
  )
}

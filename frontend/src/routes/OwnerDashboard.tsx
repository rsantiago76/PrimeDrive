import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function OwnerDashboard() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const v = await api.get<any[]>('/api/v1/owner/vehicles')
      setVehicles(v)
      const b = await api.get<any[]>('/api/v1/owner/bookings')
      setBookings(b)
      const r = await api.get<any[]>('/api/v1/owner/damage-reports')
      setReports(r)
    })()
  }, [])

  return (
    <div>
      <h1>Fleet Owner Dashboard</h1>
      <div className="grid">
        <div className="card"><div className="cardTitle">Vehicles</div><div className="price">{vehicles.length}</div></div>
        <div className="card"><div className="cardTitle">Confirmed bookings</div><div className="price">{bookings.filter(b => b.status === 'CONFIRMED').length}</div></div>
        <div className="card"><div className="cardTitle">Open damage reports</div><div className="price">{reports.filter(r => r.status !== 'RESOLVED').length}</div></div>
      </div>

      <h3>Vehicles</h3>
      <div className="grid">
        {vehicles.map(v => (
          <div key={v.id} className="card">
            <div className="cardTitle">{v.make} {v.model}</div>
            <div className="muted">{v.location_city}, {v.location_state}</div>
            <div className="price">${(v.daily_cents/100).toFixed(0)}/day</div>
          </div>
        ))}
      </div>
    </div>
  )
}

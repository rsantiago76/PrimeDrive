import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../services/api'

type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  category: string
  location_city: string
  location_state: string
  daily_cents: number
  mileage_limit_per_day: number
  features: string[]
  images: string[]
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [items, setItems] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  const city = params.get('city') || ''
  const state = params.get('state') || ''

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const q = new URLSearchParams()
        if (city) q.set('city', city)
        if (state) q.set('state', state)
        const data = await api.get<Vehicle[]>(`/api/v1/vehicles?${q.toString()}`)
        setItems(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [city, state])

  const update = (k: string, v: string) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next)
  }

  return (
    <div>
      <h1>Rent the future</h1>
      <p className="muted">Search Prime Drive’s futuristic fleet by location.</p>

      <div className="filters">
        <label className="label">
          City
          <input value={city} onChange={e => update('city', e.target.value)} placeholder="e.g., Austin" />
        </label>
        <label className="label">
          State
          <input value={state} onChange={e => update('state', e.target.value)} placeholder="e.g., TX" />
        </label>
      </div>

      {loading ? <div>Loading…</div> : (
        <div className="grid">
          {items.map(v => (
            <Link key={v.id} to={`/vehicle/${v.id}`} className="card linkCard">
              <img
                src={v.images?.[0] ? `/images/${v.images[0]}` : '/images/placeholder.jpg'}
                alt={`${v.make} ${v.model}`}
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.jpg'
                }}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px 4px 0 0', marginBottom: '12px' }}
              />
              <div className="cardTitle">{v.make} {v.model}</div>
              <div className="muted">{v.category} • {v.year}</div>
              <div className="muted">{v.location_city}, {v.location_state}</div>
              <div className="price">${(v.daily_cents / 100).toFixed(0)}/day</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

interface OwnerMetrics {
    active_vehicles: number
    upcoming_bookings: number
    active_rentals: number
    total_earnings_cents: number
    open_damage_reports: number
}

export default function OwnerOverview() {
    const [metrics, setMetrics] = useState<OwnerMetrics | null>(null)

    useEffect(() => {
        api.get<OwnerMetrics>('/api/v1/owner/metrics')
            .then(setMetrics)
            .catch(console.error)
    }, [])

    if (!metrics) return <div>Loading metrics...</div>

    return (
        <div>
            <h1>Dashboard Overview</h1>
            <div className="grid">
                <div className="card">
                    <div className="cardTitle">Active Vehicles</div>
                    <div className="price">{metrics.active_vehicles}</div>
                </div>
                <div className="card">
                    <div className="cardTitle">Active Rentals</div>
                    <div className="price">{metrics.active_rentals}</div>
                </div>
                <div className="card">
                    <div className="cardTitle">Upcoming Bookings</div>
                    <div className="price">{metrics.upcoming_bookings}</div>
                </div>
                <div className="card">
                    <div className="cardTitle">Total Earnings</div>
                    <div className="price">${(metrics.total_earnings_cents / 100).toFixed(2)}</div>
                </div>
                <div className="card" style={{ borderColor: metrics.open_damage_reports > 0 ? 'red' : '#ddd' }}>
                    <div className="cardTitle">Open Reports</div>
                    <div className="price">{metrics.open_damage_reports}</div>
                </div>
            </div>
        </div>
    )
}

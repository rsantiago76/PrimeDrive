import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function OwnerVehicles() {
    const [vehicles, setVehicles] = useState<any[]>([])
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        make: '', model: '', year: 2024, category: 'SEDAN',
        location_city: 'Los Angeles', location_state: 'CA',
        daily_cents: 5000
    })

    const fetchVehicles = () => {
        api.get<any[]>('/api/v1/owner/my-vehicles').then(setVehicles)
    }

    useEffect(() => {
        fetchVehicles()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post('/api/v1/owner/vehicles', formData)
            setShowForm(false)
            fetchVehicles()
        } catch (error) {
            alert('Failed to create vehicle')
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>My Vehicles</h1>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add Vehicle'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: 20, marginBottom: 20 }}>
                    <h3>Add New Vehicle</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <input placeholder="Make" value={formData.make} onChange={e => setFormData({ ...formData, make: e.target.value })} required />
                        <input placeholder="Model" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} required />
                        <input type="number" placeholder="Year" value={formData.year} onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })} required />
                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option value="SEDAN">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="LUXURY">Luxury</option>
                            <option value="SPORTS">Sports</option>
                            <option value="TRUCK">Truck</option>
                        </select>
                        <input placeholder="City" value={formData.location_city} onChange={e => setFormData({ ...formData, location_city: e.target.value })} required />
                        <input placeholder="State" value={formData.location_state} onChange={e => setFormData({ ...formData, location_state: e.target.value })} required />
                        <div>
                            <label>Daily Price (Cents)</label>
                            <input type="number" value={formData.daily_cents} onChange={e => setFormData({ ...formData, daily_cents: parseInt(e.target.value) })} required />
                        </div>
                    </div>
                    <button type="submit" style={{ marginTop: 10 }}>Save Vehicle</button>
                </form>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Location</th>
                        <th>Price/Day</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(v => (
                        <tr key={v.id}>
                            <td>{v.year} {v.make} {v.model}</td>
                            <td>{v.location_city}, {v.location_state}</td>
                            <td>${(v.daily_cents / 100).toFixed(2)}</td>
                            <td>{v.is_active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button disabled>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

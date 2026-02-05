import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'

export default function DamageReportPage() {
  const { bookingId } = useParams()
  const [notes, setNotes] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const createReport = async () => {
    setMsg(null)
    const res = await api.post<{ report_id: string }>(`/api/v1/damage-reports`, { booking_id: bookingId, notes })
    setMsg(`Damage report created: ${res.report_id}`)
  }

  return (
    <div>
      <h1>Damage Report</h1>
      <p className="muted">Demo flow: create a report and upload photos (signed URL scaffold).</p>
      <div className="card">
        <label className="label">
          Notes
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Describe the issue..." />
        </label>
        <div className="spacer" />
        <button className="btn" onClick={createReport}>Submit report</button>
        {msg && <p className="muted">{msg}</p>}
      </div>
    </div>
  )
}

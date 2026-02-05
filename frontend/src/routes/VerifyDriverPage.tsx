import React, { useState } from 'react'
import { api } from '../services/api'

export default function VerifyDriverPage() {
  const [status] = useState('PENDING')
  const [msg, setMsg] = useState<string | null>(null)

  const createUpload = async () => {
    setMsg(null)
    const res = await api.post<{ upload_url: string; file_key: string }>(`/api/v1/driver-documents/upload-url`, { doc_type: 'LICENSE_FRONT' })
    setMsg(`Upload URL generated (placeholder): ${res.upload_url}`)
  }

  return (
    <div>
      <h1>Driver Verification</h1>
      <p className="muted">Placeholder workflow: upload documents → pending review.</p>
      <div className="card">
        <div className="muted">Current status</div>
        <div className="price">{status}</div>
        <div className="spacer" />
        <button className="btn" onClick={createUpload}>Generate upload link</button>
        {msg && <p className="muted">{msg}</p>}
      </div>
    </div>
  )
}

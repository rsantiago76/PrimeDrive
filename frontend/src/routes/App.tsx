import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import VehiclePage from './VehiclePage'
import CheckoutPage from './CheckoutPage'
import BookingsPage from './BookingsPage'
import OwnerDashboard from './OwnerDashboard'
import VerifyDriverPage from './VerifyDriverPage'
import DamageReportPage from './DamageReportPage'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/search" className="brand">Prime Drive</Link>
        <nav className="nav">
          <Link to="/search">Vehicles</Link>
          <Link to="/bookings">My Rentals</Link>
          <Link to="/verify">Verify Driver</Link>
          <Link to="/owner">Fleet Owner</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/vehicle/:id" element={<VehiclePage />} />
          <Route path="/checkout/:bookingId" element={<CheckoutPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/verify" element={<VerifyDriverPage />} />
          <Route path="/damage-report/:bookingId" element={<DamageReportPage />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Prime Drive</small>
      </footer>
    </div>
  )
}

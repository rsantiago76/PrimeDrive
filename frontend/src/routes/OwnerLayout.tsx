import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function OwnerLayout() {
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path ? 'active-link' : ''

    return (
        <div className="owner-layout">
            <aside className="owner-sidebar">
                <h3>Fleet Manager</h3>
                <nav>
                    <Link to="/owner" className={isActive('/owner')}>Overview</Link>
                    <Link to="/owner/vehicles" className={isActive('/owner/vehicles')}>Vehicles</Link>
                    <Link to="/owner/bookings" className={isActive('/owner/bookings')}>Bookings</Link>
                    <Link to="/owner/reports" className={isActive('/owner/reports')}>Reports</Link>
                    <Link to="/owner/finance" className={isActive('/owner/finance')}>Finance</Link>
                </nav>
            </aside>
            <div className="owner-content">
                <Outlet />
            </div>
            <style>{`
        .owner-layout { display: flex; gap: 20px; min-height: 80vh; }
        .owner-sidebar { width: 200px; border-right: 1px solid #eee; padding-right: 20px; }
        .owner-sidebar nav { display: flex; flex-direction: column; gap: 10px; }
        .owner-sidebar a { padding: 8px; border-radius: 4px; text-decoration: none; color: #333; }
        .owner-sidebar a:hover { background: #f5f5f5; }
        .owner-sidebar .active-link { background: #eef; font-weight: bold; color: #007bff; }
        .owner-content { flex: 1; }
      `}</style>
        </div>
    )
}

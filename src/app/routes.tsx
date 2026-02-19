import React from 'react';
import { Routes, Route } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { OverviewPage } from './pages/OverviewPage';
import { FleetPage } from './pages/FleetPage';
import { RentalsPage } from './pages/RentalsPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { CustomersPage } from './pages/CustomersPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<OverviewPage />} />
        <Route path="fleet" element={<FleetPage />} />
        <Route path="fleet/:id" element={<VehicleDetailPage />} />
        <Route path="rentals" element={<RentalsPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
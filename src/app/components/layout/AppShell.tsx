import React from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BackgroundGrid } from '../BackgroundGrid';

export function AppShell() {
  return (
    <div 
      className="min-h-screen bg-[#0A0F1E] text-white relative overflow-hidden"
      style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}
    >
      <BackgroundGrid />
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 relative z-10">
        {/* Top Bar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
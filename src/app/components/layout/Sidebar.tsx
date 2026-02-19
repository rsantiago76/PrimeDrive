import React from 'react';
import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Wrench, 
  BarChart3, 
  Settings,
  Users,
  Zap,
  CalendarCheck
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: Car, label: 'Fleet', path: '/fleet' },
  { icon: Calendar, label: 'Rentals', path: '/rentals' },
  { icon: CalendarCheck, label: 'Reservations', path: '/reservations' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 backdrop-blur-md bg-[#111827]/80 border-r border-white/10 z-40">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.4)]">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">Prime-Drive</h1>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Fleet Command</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#22D3EE]/20 to-[#10B981]/20 border border-[#22D3EE]/30 text-white shadow-[0_0_16px_rgba(34,211,238,0.2)]'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#22D3EE]' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Status */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs text-[#9CA3AF]">System Status</span>
          </div>
          <p className="text-white font-semibold text-sm">All Systems Operational</p>
          <p className="text-[10px] text-[#22D3EE] mt-1">✓ UI Updated</p>
        </div>
      </div>
    </aside>
  );
}
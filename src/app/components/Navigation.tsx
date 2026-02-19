import React from 'react';
import { BarChart3, Users, Car, MapPin, Settings, Bell } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

function NavItem({ icon, label, active = false, badge }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active
          ? 'bg-[#22D3EE]/10 text-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.1)]'
          : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className={active ? 'text-[#22D3EE]' : ''}>{icon}</div>
      <span className="flex-1 text-left font-medium text-sm">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 rounded-full bg-[#EF4444] text-white text-xs font-medium">
          {badge}
        </span>
      )}
    </button>
  );
}

export function Navigation() {
  return (
    <nav className="w-64 h-screen fixed left-0 top-0 bg-[#111827]/60 backdrop-blur-md border-r border-white/10 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Prime-Drive</span>
        </div>
        <p className="text-xs text-[#9CA3AF] ml-10">Autonomous Mobility</p>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 space-y-1">
        <NavItem icon={<BarChart3 className="w-5 h-5" />} label="Dashboard" active={true} />
        <NavItem icon={<Car className="w-5 h-5" />} label="Fleet" />
        <NavItem icon={<MapPin className="w-5 h-5" />} label="Routes" />
        <NavItem icon={<Users className="w-5 h-5" />} label="Passengers" />
        <NavItem icon={<Bell className="w-5 h-5" />} label="Alerts" badge={3} />
        <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
      </div>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">John Doe</p>
            <p className="text-[#9CA3AF] text-xs">Fleet Manager</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

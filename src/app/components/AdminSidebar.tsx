import React from 'react';
import { BarChart3, Car, Users, MapPin, Settings, Bell, Calendar, Wrench, TrendingUp, Search } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function AdminSidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'fleet', label: 'Fleet', icon: Car },
    { id: 'rentals', label: 'Rentals', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-[#111827]/80 backdrop-blur-md border-r border-white/10 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Prime-Drive</h1>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Fleet Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#22D3EE]/20 to-[#10B981]/20 text-[#22D3EE] border border-[#22D3EE]/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                    : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#22D3EE]' : ''}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        <div className="backdrop-blur-md bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-xs font-medium text-[#22D3EE]">System Status</span>
          </div>
          <p className="text-xs text-[#9CA3AF] mb-2">All systems operational</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs text-white">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}

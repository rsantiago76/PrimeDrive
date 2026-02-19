import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export function AdminTopBar() {
  return (
    <div className="h-20 border-b border-white/10 bg-[#0A0F1E]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search vehicles, rentals, customers..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#111827]/60 border border-white/10 text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
            <Bell className="w-5 h-5 text-[#9CA3AF]" />
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] border-2 border-[#0A0F1E] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">3</span>
            </div>
          </button>

          {/* Admin Profile */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AD</span>
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-[#9CA3AF] text-xs">Fleet Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
          </button>
        </div>
      </div>
    </div>
  );
}

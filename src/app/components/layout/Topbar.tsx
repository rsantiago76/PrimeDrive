import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { NotificationsPanel } from '../NotificationsPanel';

export function Topbar() {
  return (
    <header className="h-20 backdrop-blur-md bg-[#111827]/80 border-b border-white/10 sticky top-0 z-30">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            <input
              type="text"
              placeholder="Search vehicles, customers, or locations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#22D3EE]/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-6">
          {/* Notifications */}
          <NotificationsPanel />

          {/* User Menu */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-[#9CA3AF]">System Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

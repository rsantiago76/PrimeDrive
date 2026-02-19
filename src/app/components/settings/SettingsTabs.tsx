import React from 'react';
import { User, Bell, Shield, Zap, Settings } from 'lucide-react';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'profile', label: 'Profile', icon: User, description: 'Personal information' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alert preferences' },
  { id: 'security', label: 'Security', icon: Shield, description: 'Privacy & access' },
  { id: 'integrations', label: 'Integrations', icon: Zap, description: 'Connected apps' },
  { id: 'system', label: 'System', icon: Settings, description: 'General settings' },
];

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div
      className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-4"
      style={{
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
      }}
    >
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 px-2">Settings</h3>
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#22D3EE] to-[#10B981] text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                  : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>{tab.label}</p>
                <p className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-[#9CA3AF]'}`}>
                  {tab.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

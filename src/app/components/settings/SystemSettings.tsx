import React, { useState } from 'react';
import { Globe, Palette, Zap, Database, Bell } from 'lucide-react';

interface SystemSettingsProps {
  onChanges: () => void;
}

export function SystemSettings({ onChanges }: SystemSettingsProps) {
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    theme: 'dark',
    autoBackup: true,
    dataRetention: '90',
    analyticsTracking: true,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setSettings({ ...settings, [field]: value });
    onChanges();
  };

  return (
    <div className="space-y-6">
      {/* Localization */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#22D3EE]" />
          Localization
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            >
              <option value="en">English (US)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CAD">CAD ($)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#10B981]" />
          Appearance
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-[#9CA3AF] mb-3">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleChange('theme', 'dark')}
              className={`p-4 rounded-xl border-2 transition-all ${
                settings.theme === 'dark'
                  ? 'border-[#22D3EE] bg-[#22D3EE]/10 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="w-full h-20 rounded-lg bg-gradient-to-br from-[#0A0F1E] to-[#111827] mb-3 border border-white/10"></div>
              <p className="text-sm font-medium text-white">Dark</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Current theme</p>
            </button>

            <button
              onClick={() => handleChange('theme', 'light')}
              className={`p-4 rounded-xl border-2 transition-all opacity-50 cursor-not-allowed ${
                settings.theme === 'light'
                  ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                  : 'border-white/10 bg-white/5'
              }`}
              disabled
            >
              <div className="w-full h-20 rounded-lg bg-gradient-to-br from-white to-gray-100 mb-3 border border-gray-200"></div>
              <p className="text-sm font-medium text-white">Light</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Coming soon</p>
            </button>

            <button
              onClick={() => handleChange('theme', 'auto')}
              className={`p-4 rounded-xl border-2 transition-all opacity-50 cursor-not-allowed ${
                settings.theme === 'auto'
                  ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                  : 'border-white/10 bg-white/5'
              }`}
              disabled
            >
              <div className="w-full h-20 rounded-lg bg-gradient-to-r from-[#0A0F1E] to-white mb-3 border border-white/10"></div>
              <p className="text-sm font-medium text-white">Auto</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Coming soon</p>
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-[#F59E0B]" />
          Data Management
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#22D3EE]" />
              <div>
                <p className="text-sm font-semibold text-white">Automatic Backups</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Daily backups at 2:00 AM</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => handleChange('autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Data Retention Period</label>
            <select
              value={settings.dataRetention}
              onChange={(e) => handleChange('dataRetention', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            >
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
              <option value="unlimited">Unlimited</option>
            </select>
            <p className="text-xs text-[#9CA3AF] mt-2">
              How long to keep historical data and logs
            </p>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#EF4444]" />
          Privacy & Analytics
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div>
              <p className="text-sm font-medium text-white">Usage Analytics</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Help improve Prime-Drive with usage data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.analyticsTracking}
                onChange={(e) => handleChange('analyticsTracking', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

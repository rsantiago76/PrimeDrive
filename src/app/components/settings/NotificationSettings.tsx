import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NotificationSettingsProps {
  onChanges: () => void;
}

export function NotificationSettings({ onChanges }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    rentalUpdates: true,
    maintenanceAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
    marketingEmails: false,
    criticalAlerts: true,
    fleetStatus: true,
  });

  const handleToggle = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
    onChanges();
  };

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">Notification Channels</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Email Notifications</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Push Notifications</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Browser and mobile alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">SMS Notifications</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Text message alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#22D3EE]" />
              <div>
                <p className="text-sm font-medium text-white">Rental Updates</p>
                <p className="text-xs text-[#9CA3AF]">Bookings, returns, and modifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.rentalUpdates}
                onChange={() => handleToggle('rentalUpdates')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
              <div>
                <p className="text-sm font-medium text-white">Maintenance Alerts</p>
                <p className="text-xs text-[#9CA3AF]">Vehicle service and repairs</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceAlerts}
                onChange={() => handleToggle('maintenanceAlerts')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#10B981]" />
              <div>
                <p className="text-sm font-medium text-white">System Updates</p>
                <p className="text-xs text-[#9CA3AF]">Platform changes and new features</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.systemUpdates}
                onChange={() => handleToggle('systemUpdates')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#22D3EE]" />
              <div>
                <p className="text-sm font-medium text-white">Weekly Reports</p>
                <p className="text-xs text-[#9CA3AF]">Fleet performance summaries</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={() => handleToggle('weeklyReports')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <div>
                <p className="text-sm font-medium text-white">Critical Alerts</p>
                <p className="text-xs text-[#9CA3AF]">Urgent issues and emergencies</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.criticalAlerts}
                onChange={() => handleToggle('criticalAlerts')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              <div>
                <p className="text-sm font-medium text-white">Fleet Status</p>
                <p className="text-xs text-[#9CA3AF]">Vehicle availability changes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.fleetStatus}
                onChange={() => handleToggle('fleetStatus')}
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

import React, { useState } from 'react';
import { Shield, Key, Lock, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface SecuritySettingsProps {
  onChanges: () => void;
}

export function SecuritySettings({ onChanges }: SecuritySettingsProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">Password & Authentication</h3>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
                  <Key className="w-6 h-6 text-[#22D3EE]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Password</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Last changed 45 days ago</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Change Password
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                <span>Strong password</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Extra layer of security for your account</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    onChanges();
                  }}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22D3EE]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#22D3EE] peer-checked:to-[#10B981]"></div>
              </label>
            </div>
            {twoFactorEnabled && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20">
                <Shield className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs text-[#10B981] font-medium">2FA is currently active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">Session Management</h3>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF] mb-3">
              <Clock className="w-4 h-4" />
              Session Timeout
            </label>
            <select
              value={sessionTimeout}
              onChange={(e) => {
                setSessionTimeout(e.target.value);
                onChanges();
              }}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="never">Never</option>
            </select>
            <p className="text-xs text-[#9CA3AF] mt-2">
              Automatically log out after period of inactivity
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white mb-2">Active Sessions</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <div>
                      <p className="text-sm text-white">Chrome on MacOS</p>
                      <p className="text-xs text-[#9CA3AF]">San Francisco, CA • Current session</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#22D3EE]"></div>
                    <div>
                      <p className="text-sm text-white">Safari on iPhone</p>
                      <p className="text-xs text-[#9CA3AF]">San Francisco, CA • 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="destructive" size="sm">
                End All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">Recent Security Activity</h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">Successful login from Chrome</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Today at 9:42 AM • San Francisco, CA</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-[#22D3EE]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">Password changed successfully</p>
              <p className="text-xs text-[#9CA3AF] mt-1">45 days ago</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">2FA verification code used</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Yesterday at 6:15 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

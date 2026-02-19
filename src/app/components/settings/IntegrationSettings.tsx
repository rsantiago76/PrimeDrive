import React from 'react';
import { Zap, CheckCircle2, Link as LinkIcon, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

interface IntegrationSettingsProps {
  onChanges: () => void;
}

const integrations = [
  {
    name: 'Slack',
    description: 'Team communication and notifications',
    icon: '💬',
    connected: true,
    status: 'Active',
    lastSync: '2 minutes ago',
    color: 'text-[#10B981]',
    bgColor: 'bg-[#10B981]/10',
    borderColor: 'border-[#10B981]/20',
  },
  {
    name: 'Google Calendar',
    description: 'Sync rental schedules and bookings',
    icon: '📅',
    connected: true,
    status: 'Active',
    lastSync: '5 minutes ago',
    color: 'text-[#22D3EE]',
    bgColor: 'bg-[#22D3EE]/10',
    borderColor: 'border-[#22D3EE]/20',
  },
  {
    name: 'Stripe',
    description: 'Payment processing and billing',
    icon: '💳',
    connected: true,
    status: 'Active',
    lastSync: '1 hour ago',
    color: 'text-[#10B981]',
    bgColor: 'bg-[#10B981]/10',
    borderColor: 'border-[#10B981]/20',
  },
  {
    name: 'Zapier',
    description: 'Workflow automation and integrations',
    icon: '⚡',
    connected: false,
    status: 'Not Connected',
    lastSync: 'Never',
    color: 'text-[#9CA3AF]',
    bgColor: 'bg-white/5',
    borderColor: 'border-white/10',
  },
  {
    name: 'Salesforce',
    description: 'CRM and customer management',
    icon: '☁️',
    connected: false,
    status: 'Not Connected',
    lastSync: 'Never',
    color: 'text-[#9CA3AF]',
    bgColor: 'bg-white/5',
    borderColor: 'border-white/10',
  },
  {
    name: 'Twilio',
    description: 'SMS and voice communications',
    icon: '📱',
    connected: false,
    status: 'Not Connected',
    lastSync: 'Never',
    color: 'text-[#9CA3AF]',
    bgColor: 'bg-white/5',
    borderColor: 'border-white/10',
  },
];

export function IntegrationSettings({ onChanges }: IntegrationSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Connected Apps */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Connected Apps</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-medium text-[#10B981]">
              {integrations.filter((i) => i.connected).length} Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border ${integration.bgColor} ${integration.borderColor} hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{integration.name}</h4>
                    <p className="text-xs text-[#9CA3AF] mt-1">{integration.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {integration.connected ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                      <span className="text-xs text-[#9CA3AF]">
                        Synced {integration.lastSync}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-[#9CA3AF]"></div>
                      <span className="text-xs text-[#9CA3AF]">Not connected</span>
                    </>
                  )}
                </div>
                {integration.connected ? (
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-all">
                      <Settings className="w-4 h-4" />
                    </button>
                    <Button variant="danger" size="sm">
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button variant="primary" size="sm">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Access */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">API Access</h3>
        
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#22D3EE]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">API Key</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Use this key to access Prime-Drive API</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Regenerate
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-[#22D3EE] text-sm font-mono">
                pd_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
              </code>
              <Button variant="ghost" size="sm">
                Copy
              </Button>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Webhook URL</p>
                <p className="text-xs text-[#9CA3AF] mt-1 mb-3">
                  Receive real-time updates for fleet events
                </p>
                <input
                  type="url"
                  placeholder="https://your-domain.com/webhooks/primedrive"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button variant="primary" size="sm">
                Save Webhook
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">API Usage</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20">
            <p className="text-sm text-[#9CA3AF] mb-1">Requests Today</p>
            <p className="text-2xl font-bold text-[#22D3EE]">12,847</p>
            <p className="text-xs text-[#9CA3AF] mt-2">of 50,000 limit</p>
          </div>
          <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
            <p className="text-sm text-[#9CA3AF] mb-1">Success Rate</p>
            <p className="text-2xl font-bold text-[#10B981]">99.8%</p>
            <p className="text-xs text-[#9CA3AF] mt-2">Last 24 hours</p>
          </div>
          <div className="p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
            <p className="text-sm text-[#9CA3AF] mb-1">Avg Response</p>
            <p className="text-2xl font-bold text-[#F59E0B]">142ms</p>
            <p className="text-xs text-[#9CA3AF] mt-2">Last 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

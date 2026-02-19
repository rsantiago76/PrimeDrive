import React from 'react';
import { Battery, Gauge, Thermometer, Zap, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DiagnosticItem {
  label: string;
  value: string;
  percentage?: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const diagnostics: DiagnosticItem[] = [
  {
    label: 'Battery Health',
    value: '94%',
    percentage: 94,
    status: 'excellent',
    icon: <Battery className="w-5 h-5" />,
  },
  {
    label: 'Motor Efficiency',
    value: '97%',
    percentage: 97,
    status: 'excellent',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    label: 'Tire Pressure',
    value: '35 PSI',
    percentage: 88,
    status: 'good',
    icon: <Gauge className="w-5 h-5" />,
  },
  {
    label: 'Brake System',
    value: '89%',
    percentage: 89,
    status: 'good',
    icon: <Activity className="w-5 h-5" />,
  },
  {
    label: 'Coolant Level',
    value: '92%',
    percentage: 92,
    status: 'excellent',
    icon: <Thermometer className="w-5 h-5" />,
  },
  {
    label: 'Software Version',
    value: 'v4.2.1',
    percentage: 100,
    status: 'excellent',
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

export function DiagnosticsSummary() {
  const getStatusConfig = (status: DiagnosticItem['status']) => {
    switch (status) {
      case 'excellent':
        return { color: '#10B981', bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', label: 'Excellent' };
      case 'good':
        return { color: '#22D3EE', bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', label: 'Good' };
      case 'warning':
        return { color: '#F59E0B', bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', label: 'Warning' };
      case 'critical':
        return { color: '#EF4444', bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', label: 'Critical' };
    }
  };

  const overallHealth = Math.round(
    diagnostics.reduce((acc, item) => acc + (item.percentage || 0), 0) / diagnostics.length
  );

  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">System Diagnostics</h3>
        <p className="text-[#9CA3AF] text-sm">Real-time vehicle health monitoring</p>
      </div>

      {/* Overall Health Score */}
      <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-[#22D3EE]/10 to-[#10B981]/10 border border-[#22D3EE]/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-1">Overall Health</p>
            <p className="text-4xl font-bold text-white">{overallHealth}%</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
          </div>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#22D3EE] to-[#10B981] rounded-full transition-all duration-1000"
            style={{ width: `${overallHealth}%` }}
          />
        </div>
      </div>

      {/* Diagnostic Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {diagnostics.map((item, index) => {
          const statusConfig = getStatusConfig(item.status);

          return (
            <div
              key={index}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#22D3EE]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${statusConfig.bg} flex items-center justify-center ${statusConfig.text}`}>
                  {item.icon}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium`}>
                  {statusConfig.label}
                </span>
              </div>

              <div className="mb-2">
                <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>

              {item.percentage && (
                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: statusConfig.color,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* System Alerts */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30">
          <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white text-sm font-medium">All systems operational</p>
            <p className="text-[#9CA3AF] text-xs">Last diagnostic scan: 2 minutes ago</p>
          </div>
        </div>

        <button className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
          <Activity className="w-4 h-4" />
          Run Full Diagnostic Scan
        </button>
      </div>
    </div>
  );
}

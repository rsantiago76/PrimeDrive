import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

const maintenanceData = [
  { month: 'Aug', scheduled: 45, emergency: 8, preventive: 52, total: 105 },
  { month: 'Sep', scheduled: 52, emergency: 6, preventive: 48, total: 106 },
  { month: 'Oct', scheduled: 48, emergency: 12, preventive: 55, total: 115 },
  { month: 'Nov', scheduled: 61, emergency: 9, preventive: 58, total: 128 },
  { month: 'Dec', scheduled: 58, emergency: 7, preventive: 62, total: 127 },
  { month: 'Jan', scheduled: 64, emergency: 11, preventive: 68, total: 143 },
];

export function MaintenanceFrequencyAnalysis() {
  const totalMaintenance = maintenanceData.reduce((acc, item) => acc + item.total, 0);
  const avgPerMonth = Math.round(totalMaintenance / maintenanceData.length);
  const emergencyPercentage = Math.round(
    (maintenanceData.reduce((acc, item) => acc + item.emergency, 0) / totalMaintenance) * 100
  );

  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Maintenance Frequency Analysis</h3>
            <p className="text-[#9CA3AF] text-sm">Service patterns and maintenance trends</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#9CA3AF] hover:text-white text-xs transition-all">
              View Details
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={maintenanceData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="scheduledGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="emergencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="preventiveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#10B981" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="month" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 0 24px rgba(34,211,238,0.1)'
            }}
            labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
          />
          <Bar 
            dataKey="scheduled" 
            stackId="a" 
            fill="url(#scheduledGradient)" 
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="preventive" 
            stackId="a" 
            fill="url(#preventiveGradient)" 
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="emergency" 
            stackId="a" 
            fill="url(#emergencyGradient)" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Maintenance Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#22D3EE]/10 to-[#22D3EE]/5 border border-[#22D3EE]/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
            </div>
            <span className="text-xs text-[#9CA3AF]">Scheduled</span>
          </div>
          <p className="text-white font-bold text-2xl mb-1">328</p>
          <p className="text-[#9CA3AF] text-xs">Services completed</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-[#10B981]" />
            </div>
            <span className="text-xs text-[#9CA3AF]">Preventive</span>
          </div>
          <p className="text-white font-bold text-2xl mb-1">343</p>
          <p className="text-[#9CA3AF] text-xs">Proactive maintenance</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-[#EF4444]/10 to-[#EF4444]/5 border border-[#EF4444]/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444]/20 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            </div>
            <span className="text-xs text-[#9CA3AF]">Emergency</span>
          </div>
          <p className="text-white font-bold text-2xl mb-1">53</p>
          <p className="text-[#9CA3AF] text-xs">{emergencyPercentage}% of total</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22D3EE]" />
          <span className="text-xs text-[#9CA3AF]">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          <span className="text-xs text-[#9CA3AF]">Preventive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="text-xs text-[#9CA3AF]">Emergency</span>
        </div>
      </div>
    </div>
  );
}

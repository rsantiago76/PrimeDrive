import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { date: 'Jan 1', utilization: 72 },
  { date: 'Jan 8', utilization: 75 },
  { date: 'Jan 15', utilization: 78 },
  { date: 'Jan 22', utilization: 81 },
  { date: 'Jan 29', utilization: 79 },
  { date: 'Feb 5', utilization: 83 },
  { date: 'Feb 12', utilization: 87 },
  { date: 'Feb 19', utilization: 85 },
];

export function UtilizationTrendChart() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Fleet Utilization Trend</h3>
            <p className="text-[#9CA3AF] text-sm">Weekly utilization rate over time</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#10B981] text-xs font-medium">+8.3% vs last period</span>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="utilizationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            domain={[60, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(34,211,238,0.3)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 0 24px rgba(34,211,238,0.2)'
            }}
            formatter={(value: number) => [`${value}%`, 'Utilization']}
            labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
          />
          <Area 
            type="monotone" 
            dataKey="utilization" 
            stroke="#22D3EE" 
            strokeWidth={3}
            fill="url(#utilizationGradient)"
            filter="url(#glow)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Utilization Stats */}
      <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-[#9CA3AF] text-xs mb-1">Current</p>
          <p className="text-white font-bold text-xl">87%</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-[#9CA3AF] text-xs mb-1">Average</p>
          <p className="text-white font-bold text-xl">80%</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-[#9CA3AF] text-xs mb-1">Peak</p>
          <p className="text-white font-bold text-xl">87%</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-[#9CA3AF] text-xs mb-1">Target</p>
          <p className="text-white font-bold text-xl">85%</p>
        </div>
      </div>
    </div>
  );
}

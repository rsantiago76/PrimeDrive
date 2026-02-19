import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { type: 'Sedan', revenue: 284500, vehicles: 324, color: '#22D3EE' },
  { type: 'SUV', revenue: 342800, vehicles: 289, color: '#10B981' },
  { type: 'Truck', revenue: 231600, vehicles: 156, color: '#F59E0B' },
  { type: 'Van', revenue: 77220, vehicles: 78, color: '#EF4444' },
];

export function RevenueByVehicleChart() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Revenue by Vehicle Type</h3>
            <p className="text-[#9CA3AF] text-sm">Monthly revenue breakdown by category</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#22D3EE]/50 cursor-pointer">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            {data.map((entry, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={entry.color} stopOpacity={0.8}/>
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.3}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="type" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 0 24px rgba(34,211,238,0.1)'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
          />
          <Bar 
            dataKey="revenue" 
            radius={[8, 8, 0, 0]}
            maxBarSize={80}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#gradient-${index})`}
                style={{ filter: `drop-shadow(0 0 8px ${entry.color}40)` }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
        {data.map((item, index) => (
          <div key={index} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[#9CA3AF] text-xs font-medium">{item.type}</span>
            </div>
            <p className="text-white font-bold text-lg mb-1">${(item.revenue / 1000).toFixed(1)}k</p>
            <p className="text-[#9CA3AF] text-xs">{item.vehicles} vehicles</p>
          </div>
        ))}
      </div>
    </div>
  );
}

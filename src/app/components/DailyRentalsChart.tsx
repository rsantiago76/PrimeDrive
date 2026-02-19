import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', rentals: 45 },
  { name: 'Tue', rentals: 52 },
  { name: 'Wed', rentals: 48 },
  { name: 'Thu', rentals: 61 },
  { name: 'Fri', rentals: 78 },
  { name: 'Sat', rentals: 92 },
  { name: 'Sun', rentals: 85 },
];

export function DailyRentalsChart() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">Daily Rentals</h3>
        <p className="text-[#9CA3AF] text-sm">Last 7 days performance</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
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
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="rentals" 
            stroke="#22D3EE" 
            strokeWidth={3}
            dot={{ fill: '#22D3EE', r: 5 }}
            activeDot={{ r: 7, fill: '#22D3EE' }}
            fill="url(#colorRentals)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

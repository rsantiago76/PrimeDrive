import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Sedan', value: 324, color: '#22D3EE' },
  { name: 'SUV', value: 289, color: '#10B981' },
  { name: 'Truck', value: 156, color: '#F59E0B' },
  { name: 'Van', value: 78, color: '#EF4444' },
];

export function VehicleDistributionChart() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">Vehicle Type Distribution</h3>
        <p className="text-[#9CA3AF] text-sm">Current fleet composition</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value) => <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-white text-sm">{item.name}</span>
            </div>
            <span className="text-white font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

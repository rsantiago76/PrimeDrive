import React from 'react';
import { DollarSign, Car, Clock, AlertTriangle } from 'lucide-react';

export function RentalStats() {
  const stats = [
    {
      label: 'Active Rentals',
      value: '342',
      change: '+8.2%',
      trend: 'up' as const,
      icon: <Car className="w-6 h-6" />,
      iconBg: 'bg-[#22D3EE]/10',
      iconColor: 'text-[#22D3EE]',
    },
    {
      label: 'Revenue Today',
      value: '$47.2K',
      change: '+15.3%',
      trend: 'up' as const,
      icon: <DollarSign className="w-6 h-6" />,
      iconBg: 'bg-[#10B981]/10',
      iconColor: 'text-[#10B981]',
    },
    {
      label: 'Pending Returns',
      value: '28',
      change: '-4.1%',
      trend: 'down' as const,
      icon: <Clock className="w-6 h-6" />,
      iconBg: 'bg-[#F59E0B]/10',
      iconColor: 'text-[#F59E0B]',
    },
    {
      label: 'Overdue Rentals',
      value: '5',
      change: '+2',
      trend: 'up' as const,
      icon: <AlertTriangle className="w-6 h-6" />,
      iconBg: 'bg-[#EF4444]/10',
      iconColor: 'text-[#EF4444]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-5 hover:border-[#22D3EE]/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg`}>
              <div className={stat.iconColor}>{stat.icon}</div>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                stat.trend === 'up'
                  ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                  : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
              }`}
            >
              <span className="text-xs font-medium">{stat.change}</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
          <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

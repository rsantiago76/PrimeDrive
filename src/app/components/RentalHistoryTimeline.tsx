import React from 'react';
import { Clock, User, MapPin, CheckCircle2 } from 'lucide-react';

interface RentalHistoryItem {
  id: string;
  customer: string;
  startDate: string;
  endDate: string;
  duration: string;
  pickup: string;
  dropoff: string;
  revenue: string;
  status: 'completed' | 'active';
}

const rentalHistory: RentalHistoryItem[] = [
  {
    id: 'RNT-8472',
    customer: 'Sarah Johnson',
    startDate: 'Feb 15, 2026',
    endDate: 'Feb 19, 2026',
    duration: '4 days',
    pickup: 'Downtown District',
    dropoff: 'Airport Terminal',
    revenue: '$476',
    status: 'active',
  },
  {
    id: 'RNT-8391',
    customer: 'Michael Chen',
    startDate: 'Feb 10, 2026',
    endDate: 'Feb 14, 2026',
    duration: '4 days',
    pickup: 'Tech Park Hub',
    dropoff: 'Tech Park Hub',
    revenue: '$476',
    status: 'completed',
  },
  {
    id: 'RNT-8204',
    customer: 'Emily Davis',
    startDate: 'Feb 3, 2026',
    endDate: 'Feb 9, 2026',
    duration: '6 days',
    pickup: 'Central Station',
    dropoff: 'Marina Bay',
    revenue: '$714',
    status: 'completed',
  },
  {
    id: 'RNT-8115',
    customer: 'David Park',
    startDate: 'Jan 28, 2026',
    endDate: 'Feb 2, 2026',
    duration: '5 days',
    pickup: 'Airport Terminal',
    dropoff: 'Downtown District',
    revenue: '$595',
    status: 'completed',
  },
];

export function RentalHistoryTimeline() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">Rental History</h3>
        <p className="text-[#9CA3AF] text-sm">Complete rental timeline and customer activity</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/10" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {rentalHistory.map((rental, index) => (
            <div key={rental.id} className="relative pl-12 group">
              {/* Timeline Dot */}
              <div className={`absolute left-0 top-2 w-10 h-10 rounded-full flex items-center justify-center ${
                rental.status === 'active'
                  ? 'bg-[#22D3EE]/20 border-2 border-[#22D3EE]'
                  : 'bg-[#10B981]/20 border-2 border-[#10B981]'
              }`}>
                {rental.status === 'active' ? (
                  <Clock className="w-5 h-5 text-[#22D3EE]" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                )}
              </div>

              {/* Content Card */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#22D3EE]/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{rental.id}</span>
                      {rental.status === 'active' && (
                        <span className="px-2 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-medium">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <User className="w-3.5 h-3.5" />
                      <span>{rental.customer}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{rental.revenue}</p>
                    <p className="text-[#9CA3AF] text-xs">{rental.duration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-1">Start Date</p>
                    <p className="text-white text-sm">{rental.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-1">End Date</p>
                    <p className="text-white text-sm">{rental.endDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                    <span className="text-xs text-[#9CA3AF]">{rental.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[#9CA3AF]" />
                  </div>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-xs text-[#9CA3AF]">{rental.dropoff}</span>
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#9CA3AF] hover:text-white text-sm transition-all">
          Load More History
        </button>
      </div>
    </div>
  );
}

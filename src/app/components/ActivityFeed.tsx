import React from 'react';

export function ActivityFeed() {
  const activities = [
    { id: 1, type: 'trip-completed', vehicle: 'PD-2847', time: '2 min ago', details: 'Trip completed: Downtown → Airport' },
    { id: 2, type: 'alert', vehicle: 'PD-2891', time: '5 min ago', details: 'Low battery warning: 15% remaining' },
    { id: 3, type: 'trip-started', vehicle: 'PD-2903', time: '8 min ago', details: 'Trip started: Marina Bay → City Center' },
    { id: 4, type: 'maintenance', vehicle: 'PD-2812', time: '15 min ago', details: 'Scheduled maintenance completed' },
    { id: 5, type: 'trip-completed', vehicle: 'PD-2756', time: '22 min ago', details: 'Trip completed: Suburb → Shopping District' },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'trip-completed':
        return 'bg-[#10B981]';
      case 'alert':
        return 'bg-[#EF4444]';
      case 'trip-started':
        return 'bg-[#22D3EE]';
      case 'maintenance':
        return 'bg-[#F59E0B]';
      default:
        return 'bg-[#9CA3AF]';
    }
  };

  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[14px] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Activity Feed</h3>
        <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Live</span>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 items-start group hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors">
            <div className="relative">
              <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mt-2`} />
              {activity.id !== activities[activities.length - 1].id && (
                <div className="absolute top-3 left-[3px] w-px h-8 bg-white/5" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm mb-0.5">{activity.details}</p>
              <div className="flex items-center gap-2">
                <span className="text-[#9CA3AF] text-xs">{activity.vehicle}</span>
                <span className="text-[#9CA3AF] text-xs">•</span>
                <span className="text-[#9CA3AF] text-xs">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Wrench, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface MaintenanceLog {
  id: string;
  date: string;
  type: string;
  description: string;
  technician: string;
  cost: string;
  status: 'completed' | 'scheduled' | 'urgent';
  priority: 'low' | 'medium' | 'high';
}

const maintenanceLogs: MaintenanceLog[] = [
  {
    id: 'MNT-1847',
    date: 'Feb 22, 2026',
    type: 'Scheduled Service',
    description: 'Battery health check and software update',
    technician: 'Scheduled',
    cost: '$180',
    status: 'scheduled',
    priority: 'medium',
  },
  {
    id: 'MNT-1803',
    date: 'Feb 1, 2026',
    type: 'Tire Rotation',
    description: 'All-wheel tire rotation and alignment check',
    technician: 'James Wilson',
    cost: '$120',
    status: 'completed',
    priority: 'low',
  },
  {
    id: 'MNT-1756',
    date: 'Jan 15, 2026',
    type: 'Software Update',
    description: 'Autonomous driving system firmware v4.2.1',
    technician: 'Auto-deployed',
    cost: '$0',
    status: 'completed',
    priority: 'medium',
  },
  {
    id: 'MNT-1698',
    date: 'Dec 28, 2025',
    type: 'Brake Service',
    description: 'Brake pad replacement and fluid check',
    technician: 'Maria Garcia',
    cost: '$340',
    status: 'completed',
    priority: 'high',
  },
];

export function MaintenanceLogs() {
  const getStatusConfig = (status: MaintenanceLog['status']) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', icon: CheckCircle2, label: 'Completed' };
      case 'scheduled':
        return { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', icon: Calendar, label: 'Scheduled' };
      case 'urgent':
        return { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', icon: AlertCircle, label: 'Urgent' };
    }
  };

  const getPriorityColor = (priority: MaintenanceLog['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-[#EF4444]';
      case 'medium':
        return 'bg-[#F59E0B]';
      case 'low':
        return 'bg-[#10B981]';
    }
  };

  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-lg mb-1">Maintenance Logs</h3>
          <p className="text-[#9CA3AF] text-sm">Service history and scheduled maintenance</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-all flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          Schedule Service
        </button>
      </div>

      <div className="space-y-3">
        {maintenanceLogs.map((log) => {
          const statusConfig = getStatusConfig(log.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={log.id}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#22D3EE]/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-xl ${statusConfig.bg} flex items-center justify-center flex-shrink-0`}>
                    <StatusIcon className={`w-5 h-5 ${statusConfig.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{log.type}</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(log.priority)}`} />
                    </div>
                    <p className="text-[#9CA3AF] text-sm mb-2">{log.description}</p>
                    <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                      <span>ID: {log.id}</span>
                      <span>•</span>
                      <span>{log.date}</span>
                      <span>•</span>
                      <span>Tech: {log.technician}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} mb-2`}>
                    <span className="text-xs font-medium">{statusConfig.label}</span>
                  </div>
                  <p className="text-white font-semibold">{log.cost}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold mb-1">Next Scheduled Service</p>
            <p className="text-[#9CA3AF] text-sm">February 22, 2026 at 9:00 AM</p>
          </div>
          <Calendar className="w-5 h-5 text-[#22D3EE]" />
        </div>
      </div>
    </div>
  );
}

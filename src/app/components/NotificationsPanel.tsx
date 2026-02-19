import React from 'react';
import { Bell, X, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Vehicle Deployed',
    message: 'Neon Rover NR-2041 successfully deployed to Airport Terminal',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Maintenance Due',
    message: 'Prime Astra PA-1234 requires scheduled maintenance in 2 days',
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New Booking',
    message: 'Sarah Johnson booked Terra Hauler for 5 days',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Rental Completed',
    message: 'Michael Chen returned CargoX CX-5834 on time',
    time: '3 hours ago',
    read: true,
  },
];

export function NotificationsPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#10B981]" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
      case 'info':
        return <Info className="w-5 h-5 text-[#22D3EE]" />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group"
      >
        <Bell className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] border-2 border-[#111827] flex items-center justify-center text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div className="absolute right-0 top-14 w-96 backdrop-blur-md bg-[#111827]/95 border border-white/10 rounded-[16px] shadow-[0_0_48px_rgba(34,211,238,0.2)] z-50 max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#EF4444]/10 text-[#EF4444] text-xs font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[#22D3EE] hover:text-[#10B981] transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-white/10">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-white/5 transition-all cursor-pointer ${
                        !notification.read ? 'bg-white/[0.02]' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-white font-semibold text-sm">{notification.title}</p>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-[#22D3EE] flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-[#9CA3AF] text-sm mb-2">{notification.message}</p>
                          <p className="text-[#9CA3AF] text-xs">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3 opacity-50" />
                  <p className="text-[#9CA3AF] text-sm">No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <button className="w-full px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white text-sm font-medium transition-all">
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import React from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/button';
import { Select } from './ui/select';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId?: string;
  vehicleName?: string;
}

export function BookingModal({ isOpen, onClose, vehicleId, vehicleName }: BookingModalProps) {
  const [formData, setFormData] = React.useState({
    customerName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book ${vehicleName || 'Vehicle'}`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50"
                  placeholder="john@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div>
          <h3 className="text-white font-semibold mb-4">Rental Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Pickup Location"
                value={formData.pickupLocation}
                onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
                options={[
                  { value: 'downtown', label: 'Downtown District' },
                  { value: 'airport', label: 'Airport Terminal' },
                  { value: 'techpark', label: 'Tech Park Hub' },
                  { value: 'marina', label: 'Marina Bay' },
                ]}
                placeholder="Select location"
              />
              <Select
                label="Dropoff Location"
                value={formData.dropoffLocation}
                onChange={(value) => setFormData({ ...formData, dropoffLocation: value })}
                options={[
                  { value: 'downtown', label: 'Downtown District' },
                  { value: 'airport', label: 'Airport Terminal' },
                  { value: 'techpark', label: 'Tech Park Hub' },
                  { value: 'marina', label: 'Marina Bay' },
                ]}
                placeholder="Select location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#22D3EE]/10 to-[#10B981]/10 border border-[#22D3EE]/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9CA3AF] text-sm">Daily Rate</span>
            <span className="text-white font-semibold">$119/day</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9CA3AF] text-sm">Estimated Days</span>
            <span className="text-white font-semibold">3 days</span>
          </div>
          <div className="h-px bg-white/10 my-3" />
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">Estimated Total</span>
            <span className="text-[#22D3EE] font-bold text-xl">$357</span>
          </div>
        </div>
      </form>
    </Modal>
  );
}

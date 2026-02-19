import React, { useState, useMemo } from 'react';
import { X, Calendar, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useReservations } from '../../contexts/ReservationsContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
  vehicleName: string;
  fleetId: string;
  dailyRate: number;
}

const LOCATION_OPTIONS = [
  'Prime-Drive HQ - San Francisco',
  'Prime-Drive Marina District',
  'Prime-Drive Silicon Valley',
  'Prime-Drive Oakland Airport',
  'Prime-Drive Downtown LA',
  'Prime-Drive Seattle Center',
];

function parseLocalDateTime(input: string) {
  // input is "YYYY-MM-DDTHH:mm" from <input type="datetime-local">
  // Browser interprets it in local time. Convert to ISO safely:
  const dt = new Date(input);
  return dt;
}

function diffDays(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  return Math.max(0, ms / (1000 * 60 * 60 * 24));
}

export function BookingModal({ isOpen, onClose, vehicleId, vehicleName, fleetId, dailyRate }: BookingModalProps) {
  const { addReservation } = useReservations();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [reservationId, setReservationId] = useState('');

  // Form state
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [returnDateTime, setReturnDateTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Calculate total
  const estimate = useMemo(() => {
    if (!pickupDateTime || !returnDateTime) return { days: 0, total: 0 };
    const start = parseLocalDateTime(pickupDateTime);
    const end = parseLocalDateTime(returnDateTime);
    const days = diffDays(start, end);
    const billedDays = Math.max(1, Math.ceil(days)); // minimum 1 day
    return { days: billedDays, total: billedDays * dailyRate };
  }, [pickupDateTime, returnDateTime, dailyRate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!pickupDateTime || !returnDateTime) {
      setError('Please select pickup and return date/time.');
      return;
    }

    if (!pickupLocation || !dropoffLocation) {
      setError('Please select pickup and dropoff locations.');
      return;
    }

    const start = parseLocalDateTime(pickupDateTime);
    const end = parseLocalDateTime(returnDateTime);

    if (!(end.getTime() > start.getTime())) {
      setError('Return date/time must be after pickup date/time.');
      return;
    }

    const reservation = addReservation({
      fleetId,
      vehicleName,
      pickupLocation,
      dropoffLocation,
      pickupISO: start.toISOString(),
      returnISO: end.toISOString(),
      dailyRate,
      estTotal: estimate.total,
    });

    setReservationId(reservation.id);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setPickupDateTime('');
    setReturnDateTime('');
    setPickupLocation('');
    setDropoffLocation('');
    setError(null);
    onClose();
  };

  const handleReset = () => {
    setPickupDateTime('');
    setReturnDateTime('');
    setPickupLocation('');
    setDropoffLocation('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#0A0F1E] border border-[#22D3EE]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0A0F1E] border-b border-[#22D3EE]/20 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {step === 'form' ? 'Book Vehicle' : 'Booking Confirmed'}
            </h2>
            <p className="text-gray-400 mt-1">{vehicleName} • {fleetId}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
                className="w-full bg-[#111827] border border-[#22D3EE]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22D3EE] transition-colors"
              >
                <option value="">Select location...</option>
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Dropoff Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Dropoff Location
              </label>
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                required
                className="w-full bg-[#111827] border border-[#22D3EE]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22D3EE] transition-colors"
              >
                <option value="">Select location...</option>
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Pickup Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Pickup Date & Time
              </label>
              <input
                type="datetime-local"
                value={pickupDateTime}
                onChange={(e) => setPickupDateTime(e.target.value)}
                required
                className="w-full bg-[#111827] border border-[#22D3EE]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22D3EE] transition-colors"
              />
            </div>

            {/* Return Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Return Date & Time
              </label>
              <input
                type="datetime-local"
                value={returnDateTime}
                onChange={(e) => setReturnDateTime(e.target.value)}
                min={pickupDateTime}
                required
                className="w-full bg-[#111827] border border-[#22D3EE]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22D3EE] transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Price Summary */}
            {estimate.days > 0 && (
              <div className="bg-[#111827] border border-[#22D3EE]/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Daily Rate</span>
                  <span className="text-white font-medium">${dailyRate}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Estimated Days</span>
                  <span className="text-white font-medium">{estimate.days} days</span>
                </div>
                <div className="border-t border-[#22D3EE]/20 pt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">
                    <DollarSign className="w-5 h-5 inline mr-1" />
                    Estimated Total
                  </span>
                  <span className="text-2xl font-bold text-[#22D3EE]">${estimate.total.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                className="flex-1"
              >
                Reset
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={!pickupDateTime || !returnDateTime || !pickupLocation || !dropoffLocation}
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#10B981]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-400 mb-6">
              Your reservation has been created successfully.
            </p>
            <div className="bg-[#111827] border border-[#22D3EE]/20 rounded-xl p-6 mb-6 text-left">
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reservation ID</span>
                  <span className="text-white font-mono font-bold">{reservationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle</span>
                  <span className="text-white">{vehicleName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total</span>
                  <span className="text-[#22D3EE] font-bold">${estimate.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Button onClick={handleClose} variant="primary" className="w-full">
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
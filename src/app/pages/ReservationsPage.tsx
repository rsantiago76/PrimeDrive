import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchInput } from '../components/ui/SearchInput';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import { useReservations } from '../contexts/ReservationsContext';
import { Calendar, MapPin, DollarSign, Clock, X, CheckCircle2 } from 'lucide-react';

export function ReservationsPage() {
  const { reservations, cancelReservation } = useReservations();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Format date helper
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Determine reservation status
  const getReservationStatus = (pickupISO: string, returnISO: string) => {
    const now = new Date();
    const pickup = new Date(pickupISO);
    const returnDate = new Date(returnISO);

    if (now < pickup) return 'upcoming';
    if (now >= pickup && now <= returnDate) return 'active';
    return 'completed';
  };

  // Filter reservations
  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      !search ||
      r.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
      r.fleetId.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.pickupLocation.toLowerCase().includes(search.toLowerCase());

    const status = getReservationStatus(r.pickupISO, r.returnISO);
    const matchesStatus = !statusFilter || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Group by status
  const upcomingCount = reservations.filter((r) => getReservationStatus(r.pickupISO, r.returnISO) === 'upcoming').length;
  const activeCount = reservations.filter((r) => getReservationStatus(r.pickupISO, r.returnISO) === 'active').length;
  const completedCount = reservations.filter((r) => getReservationStatus(r.pickupISO, r.returnISO) === 'completed').length;

  return (
    <>
      <PageHeader
        title="Reservations"
        subtitle="Manage vehicle bookings and reservations"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
          <div className="text-[#9CA3AF] text-sm mb-2">Total Reservations</div>
          <div className="text-3xl font-bold text-white">{reservations.length}</div>
        </div>
        <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
          <div className="text-[#9CA3AF] text-sm mb-2">Upcoming</div>
          <div className="text-3xl font-bold text-[#22D3EE]">{upcomingCount}</div>
        </div>
        <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
          <div className="text-[#9CA3AF] text-sm mb-2">Active</div>
          <div className="text-3xl font-bold text-[#10B981]">{activeCount}</div>
        </div>
        <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
          <div className="text-[#9CA3AF] text-sm mb-2">Completed</div>
          <div className="text-3xl font-bold text-[#9CA3AF]">{completedCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchInput
            placeholder="Search reservations..."
            value={search}
            onChange={setSearch}
          />
          <Select
            placeholder="All Statuses"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
        </div>
      </div>

      {/* Reservations List */}
      {filteredReservations.length === 0 ? (
        <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-12 text-center">
          <Calendar className="w-16 h-16 text-[#22D3EE]/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Reservations Found</h3>
          <p className="text-[#9CA3AF]">
            {reservations.length === 0
              ? 'Start by booking a vehicle from the Fleet page.'
              : 'Try adjusting your search or filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((reservation) => {
            const status = getReservationStatus(reservation.pickupISO, reservation.returnISO);
            const statusColors = {
              upcoming: { bg: 'bg-[#22D3EE]/10', border: 'border-[#22D3EE]/30', text: 'text-[#22D3EE]' },
              active: { bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/30', text: 'text-[#10B981]' },
              completed: { bg: 'bg-[#9CA3AF]/10', border: 'border-[#9CA3AF]/30', text: 'text-[#9CA3AF]' },
            };

            const statusConfig = statusColors[status];

            return (
              <div
                key={reservation.id}
                className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6 hover:border-[#22D3EE]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{reservation.vehicleName}</h3>
                      <Badge variant={status === 'active' ? 'success' : status === 'upcoming' ? 'primary' : 'default'}>
                        {status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                      <span className="font-mono">{reservation.id}</span>
                      <span>•</span>
                      <span>{reservation.fleetId}</span>
                    </div>
                  </div>
                  {status === 'upcoming' && (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (confirm(`Cancel reservation ${reservation.id}?`)) {
                          cancelReservation(reservation.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Pickup Info */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#9CA3AF] mb-1">Pickup</div>
                      <div className="text-white font-medium">{formatDate(reservation.pickupISO)}</div>
                      <div className="text-xs text-[#22D3EE] mt-1">{reservation.pickupLocation}</div>
                    </div>
                  </div>

                  {/* Return Info */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#9CA3AF] mb-1">Return</div>
                      <div className="text-white font-medium">{formatDate(reservation.returnISO)}</div>
                      <div className="text-xs text-[#10B981] mt-1">{reservation.dropoffLocation}</div>
                    </div>
                  </div>

                  {/* Daily Rate */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#9CA3AF] mb-1">Daily Rate</div>
                      <div className="text-white font-medium">${reservation.dailyRate}/day</div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#9CA3AF]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {reservation.pickupLocation === reservation.dropoffLocation
                        ? 'Same location pickup & return'
                        : 'Different pickup & return locations'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#9CA3AF] mb-1">Total</div>
                    <div className="text-2xl font-bold text-[#22D3EE]">${reservation.estTotal.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
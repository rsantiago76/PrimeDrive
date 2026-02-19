import React, { useState } from 'react';
import { MoreVertical, Eye, Phone, Mail, MapPin, Calendar, CreditCard, XCircle } from 'lucide-react';

interface RentalTableProps {
  searchQuery: string;
  statusFilter: string;
}

interface Rental {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  vehicle: {
    name: string;
    model: string;
    plateNumber: string;
  };
  startDate: string;
  endDate: string;
  duration: string;
  status: 'active' | 'pending' | 'completed' | 'overdue';
  totalAmount: string;
  paymentStatus: 'paid' | 'pending' | 'partial';
  location: string;
}

const mockRentals: Rental[] = [
  {
    id: 'RNT-2024-001',
    customer: {
      name: 'Sarah Mitchell',
      email: 'sarah.m@techcorp.io',
      phone: '+1 (555) 123-4567',
      avatar: 'SM',
    },
    vehicle: {
      name: 'Prime Astra',
      model: 'Executive Sedan',
      plateNumber: 'PD-4892-X',
    },
    startDate: '2024-02-15',
    endDate: '2024-02-22',
    duration: '7 days',
    status: 'active',
    totalAmount: '$2,450',
    paymentStatus: 'paid',
    location: 'San Francisco, CA',
  },
  {
    id: 'RNT-2024-002',
    customer: {
      name: 'Marcus Chen',
      email: 'mchen@innovate.com',
      phone: '+1 (555) 234-5678',
      avatar: 'MC',
    },
    vehicle: {
      name: 'Quantum X',
      model: 'Sport Coupe',
      plateNumber: 'PD-7821-Q',
    },
    startDate: '2024-02-18',
    endDate: '2024-02-20',
    duration: '2 days',
    status: 'active',
    totalAmount: '$890',
    paymentStatus: 'paid',
    location: 'Los Angeles, CA',
  },
  {
    id: 'RNT-2024-003',
    customer: {
      name: 'Elena Rodriguez',
      email: 'elena.r@venture.co',
      phone: '+1 (555) 345-6789',
      avatar: 'ER',
    },
    vehicle: {
      name: 'Nexus GT',
      model: 'Performance SUV',
      plateNumber: 'PD-3456-N',
    },
    startDate: '2024-02-10',
    endDate: '2024-02-19',
    duration: '9 days',
    status: 'overdue',
    totalAmount: '$3,150',
    paymentStatus: 'partial',
    location: 'Seattle, WA',
  },
  {
    id: 'RNT-2024-004',
    customer: {
      name: 'James Anderson',
      email: 'j.anderson@global.com',
      phone: '+1 (555) 456-7890',
      avatar: 'JA',
    },
    vehicle: {
      name: 'Velocity Pro',
      model: 'Business Class',
      plateNumber: 'PD-9012-V',
    },
    startDate: '2024-02-20',
    endDate: '2024-02-25',
    duration: '5 days',
    status: 'pending',
    totalAmount: '$1,750',
    paymentStatus: 'pending',
    location: 'Austin, TX',
  },
  {
    id: 'RNT-2024-005',
    customer: {
      name: 'Olivia Thompson',
      email: 'olivia.t@startup.io',
      phone: '+1 (555) 567-8901',
      avatar: 'OT',
    },
    vehicle: {
      name: 'Prime Astra',
      model: 'Executive Sedan',
      plateNumber: 'PD-2345-P',
    },
    startDate: '2024-02-14',
    endDate: '2024-02-18',
    duration: '4 days',
    status: 'completed',
    totalAmount: '$1,400',
    paymentStatus: 'paid',
    location: 'Boston, MA',
  },
  {
    id: 'RNT-2024-006',
    customer: {
      name: 'David Kim',
      email: 'dkim@enterprise.net',
      phone: '+1 (555) 678-9012',
      avatar: 'DK',
    },
    vehicle: {
      name: 'Quantum X',
      model: 'Sport Coupe',
      plateNumber: 'PD-6789-Q',
    },
    startDate: '2024-02-19',
    endDate: '2024-02-26',
    duration: '7 days',
    status: 'active',
    totalAmount: '$2,800',
    paymentStatus: 'paid',
    location: 'Miami, FL',
  },
];

export function RentalTable({ searchQuery, statusFilter }: RentalTableProps) {
  const [selectedRental, setSelectedRental] = useState<string | null>(null);

  // Filter rentals based on search and status
  const filteredRentals = mockRentals.filter((rental) => {
    const matchesSearch =
      rental.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || rental.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Rental['status']) => {
    const styles = {
      active: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
      pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
      completed: 'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20',
      overdue: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
    };

    const labels = {
      active: 'Active',
      pending: 'Pending',
      completed: 'Completed',
      overdue: 'Overdue',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getPaymentBadge = (status: Rental['paymentStatus']) => {
    const styles = {
      paid: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
      pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
      partial: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
    };

    const labels = {
      paid: 'Paid',
      pending: 'Pending',
      partial: 'Partial',
    };

    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div
      className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
      }}
    >
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">Active Rentals ({filteredRentals.length})</h3>
        <p className="text-sm text-[#9CA3AF] mt-1">Manage and monitor all rental transactions</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Rental ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredRentals.map((rental) => (
              <tr
                key={rental.id}
                className="hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setSelectedRental(rental.id === selectedRental ? null : rental.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    <span className="text-sm font-mono font-medium text-white">{rental.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {rental.customer.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{rental.customer.name}</p>
                      <p className="text-xs text-[#9CA3AF]">{rental.customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-white">{rental.vehicle.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{rental.vehicle.model}</p>
                    <p className="text-xs text-[#22D3EE] mt-1 font-mono">{rental.vehicle.plateNumber}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-white">{rental.duration}</p>
                    <p className="text-xs text-[#9CA3AF]">{rental.startDate}</p>
                    <p className="text-xs text-[#9CA3AF]">to {rental.endDate}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(rental.status)}</td>
                <td className="px-6 py-4">{getPaymentBadge(rental.paymentStatus)}</td>
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-white">{rental.totalAmount}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20 text-[#22D3EE] transition-all hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredRentals.length === 0 && (
        <div className="px-6 py-16 text-center">
          <XCircle className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-white mb-2">No rentals found</h3>
          <p className="text-sm text-[#9CA3AF]">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Pagination */}
      {filteredRentals.length > 0 && (
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-sm text-[#9CA3AF]">
            Showing <span className="text-white font-medium">{filteredRentals.length}</span> of{' '}
            <span className="text-white font-medium">{mockRentals.length}</span> rentals
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#10B981] text-white text-sm font-medium shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
              1
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all">
              2
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all">
              3
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

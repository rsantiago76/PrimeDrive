import React from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Plus, Mail, Phone, MapPin, Calendar, UserPlus } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalRentals: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastRental: string;
  memberSince: string;
}

const mockCustomers: Customer[] = [
  {
    id: 'CST-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    totalRentals: 24,
    totalSpent: 3240,
    status: 'active',
    lastRental: '2 days ago',
    memberSince: 'Jan 2024',
  },
  {
    id: 'CST-002',
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    totalRentals: 18,
    totalSpent: 2680,
    status: 'active',
    lastRental: '1 week ago',
    memberSince: 'Mar 2024',
  },
  {
    id: 'CST-003',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    totalRentals: 31,
    totalSpent: 4870,
    status: 'active',
    lastRental: '3 days ago',
    memberSince: 'Dec 2023',
  },
  {
    id: 'CST-004',
    name: 'David Park',
    email: 'david.p@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    totalRentals: 12,
    totalSpent: 1920,
    status: 'inactive',
    lastRental: '2 months ago',
    memberSince: 'Jun 2024',
  },
  {
    id: 'CST-005',
    name: 'Jessica Martinez',
    email: 'jessica.m@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Miami, FL',
    totalRentals: 27,
    totalSpent: 3890,
    status: 'active',
    lastRental: '1 day ago',
    memberSince: 'Feb 2024',
  },
];

export function CustomersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title="Customer Management"
        subtitle="Manage customer accounts and rental history"
        action={
          <Button variant="primary" size="md" icon={<UserPlus />}>
            Add Customer
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <SearchInput
          placeholder="Search customers by name or email..."
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Customer Table */}
      {filteredCustomers.length > 0 ? (
        <DataTable
          data={filteredCustomers}
          keyExtractor={(c) => c.id}
          onRowClick={(c) => navigate(`/customers/${c.id}`)}
          columns={[
            {
              key: 'name',
              header: 'Customer',
              sortable: true,
              render: (c) => (
                <div>
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{c.id}</p>
                </div>
              ),
            },
            {
              key: 'email',
              header: 'Contact',
              render: (c) => (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-[#9CA3AF]" />
                    <span className="text-sm">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#9CA3AF]" />
                    <span className="text-sm">{c.phone}</span>
                  </div>
                </div>
              ),
            },
            {
              key: 'location',
              header: 'Location',
              render: (c) => (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-[#9CA3AF]" />
                  <span>{c.location}</span>
                </div>
              ),
            },
            {
              key: 'totalRentals',
              header: 'Rentals',
              sortable: true,
              render: (c) => (
                <div>
                  <p className="font-semibold text-white">{c.totalRentals}</p>
                  <p className="text-xs text-[#9CA3AF]">{c.lastRental}</p>
                </div>
              ),
            },
            {
              key: 'totalSpent',
              header: 'Total Spent',
              sortable: true,
              render: (c) => (
                <span className="font-semibold text-white">${c.totalSpent.toLocaleString()}</span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              sortable: true,
              render: (c) => <StatusBadge status={c.status} showDot />,
            },
            {
              key: 'memberSince',
              header: 'Member Since',
              render: (c) => (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                  <span>{c.memberSince}</span>
                </div>
              ),
            },
          ]}
        />
      ) : (
        <EmptyState
          icon={<UserPlus className="w-8 h-8" />}
          title="No customers found"
          description="Try adjusting your search or add a new customer"
          action={{
            label: 'Add Customer',
            onClick: () => console.log('Add customer'),
          }}
        />
      )}
    </>
  );
}
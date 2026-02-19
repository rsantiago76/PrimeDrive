import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/button';
import { RentalTable } from '../components/RentalTable';
import { RentalFilters } from '../components/RentalFilters';
import { RentalStats } from '../components/RentalStats';
import { Download, Plus, Search } from 'lucide-react';

export function RentalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <>
      <PageHeader
        title="Rental Management"
        subtitle="Monitor and manage all active and upcoming rentals"
        action={
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="default">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="default" size="default">
              <Plus className="mr-2 h-4 w-4" />
              New Rental
            </Button>
          </div>
        }
      />

      {/* Stats Overview */}
      <RentalStats />

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
          }}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search by rental ID, customer name, or vehicle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <RentalFilters
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>
        </div>
      </div>

      {/* Rentals Table */}
      <RentalTable searchQuery={searchQuery} statusFilter={statusFilter} />
    </>
  );
}

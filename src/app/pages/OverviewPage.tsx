import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Button } from '../components/ui/Button';
import { FleetStatusTable } from '../components/FleetStatusTable';
import { VehicleShowcase } from '../components/VehicleShowcase';
import { DollarSign, Car, Activity, AlertTriangle, Download } from 'lucide-react';

export function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Fleet Overview"
        subtitle="Real-time fleet performance and operational metrics"
        action={
          <Button variant="primary" size="md" icon={<Download />}>
            Export Report
          </Button>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Total Revenue"
          value="$936K"
          delta={{ value: 12.4, trend: 'up' }}
          icon={<DollarSign className="w-6 h-6" />}
          iconBg="bg-[#22D3EE]/10"
          iconColor="text-[#22D3EE]"
        />
        <MetricCard
          label="Active Vehicles"
          value="847"
          delta={{ value: 5.2, trend: 'up' }}
          icon={<Car className="w-6 h-6" />}
          iconBg="bg-[#10B981]/10"
          iconColor="text-[#10B981]"
        />
        <MetricCard
          label="Fleet Utilization"
          value="87%"
          delta={{ value: 8.3, trend: 'up' }}
          icon={<Activity className="w-6 h-6" />}
          iconBg="bg-[#F59E0B]/10"
          iconColor="text-[#F59E0B]"
        />
        <MetricCard
          label="Maintenance Alerts"
          value="23"
          delta={{ value: 2.1, trend: 'down' }}
          icon={<AlertTriangle className="w-6 h-6" />}
          iconBg="bg-[#EF4444]/10"
          iconColor="text-[#EF4444]"
        />
      </div>

      {/* Vehicle Showcase */}
      <VehicleShowcase />

      {/* Fleet Status Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Live Fleet Status</h2>
        <FleetStatusTable />
      </div>
    </>
  );
}
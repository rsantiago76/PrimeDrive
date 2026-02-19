import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/button';
import { MetricCard } from '../components/ui/MetricCard';
import { RevenueByVehicleChart } from '../components/RevenueByVehicleChart';
import { UtilizationTrendChart } from '../components/UtilizationTrendChart';
import { MaintenanceFrequencyAnalysis } from '../components/MaintenanceFrequencyAnalysis';
import { TopPerformingLocations } from '../components/TopPerformingLocations';
import { TrendingUp, DollarSign, Activity, Target, Download, Calendar } from 'lucide-react';

export function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Fleet Analytics"
        subtitle="Comprehensive performance metrics and business intelligence"
        action={
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" icon={<Calendar />}>
              Date Range
            </Button>
            <Button variant="primary" size="md" icon={<Download />}>
              Export Report
            </Button>
          </div>
        }
      />

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Total Revenue"
          value="$936K"
          delta={{ value: 12.4, trend: 'up' }}
          icon={<DollarSign className="w-6 h-6" />}
          iconBg="bg-gradient-to-br from-[#22D3EE]/20 to-[#10B981]/20"
          iconColor="text-[#22D3EE]"
        />
        <MetricCard
          label="Fleet Utilization"
          value="87%"
          delta={{ value: 8.3, trend: 'up' }}
          icon={<Activity className="w-6 h-6" />}
          iconBg="bg-[#10B981]/10"
          iconColor="text-[#10B981]"
        />
        <MetricCard
          label="Active Rentals"
          value="4,894"
          delta={{ value: 5.7, trend: 'up' }}
          icon={<Target className="w-6 h-6" />}
          iconBg="bg-[#F59E0B]/10"
          iconColor="text-[#F59E0B]"
        />
        <MetricCard
          label="Avg Revenue/Vehicle"
          value="$191"
          delta={{ value: 9.2, trend: 'up' }}
          icon={<DollarSign className="w-6 h-6" />}
          iconBg="bg-[#EF4444]/10"
          iconColor="text-[#EF4444]"
        />
      </div>

      {/* Charts Grid */}
      <div className="space-y-8">
        {/* Revenue & Utilization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueByVehicleChart />
          <UtilizationTrendChart />
        </div>

        {/* Maintenance Analysis */}
        <MaintenanceFrequencyAnalysis />

        {/* Top Performing Locations */}
        <TopPerformingLocations />
      </div>
    </>
  );
}

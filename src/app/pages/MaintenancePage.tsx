import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/button';
import { MaintenanceFrequencyAnalysis } from '../components/MaintenanceFrequencyAnalysis';
import { Calendar, Download } from 'lucide-react';

export function MaintenancePage() {
  return (
    <>
      <PageHeader
        title="Maintenance Center"
        subtitle="Schedule and track vehicle maintenance operations"
        action={
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="default">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Service
            </Button>
            <Button variant="default" size="default">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        }
      />

      <MaintenanceFrequencyAnalysis />
    </>
  );
}

# Prime-Drive Component Library

A comprehensive, production-ready component library for the Prime-Drive autonomous mobility platform.

## Design System

**Colors:**
- Background: `#0A0F1E` (midnight navy), `#111827` (deep space blue)
- Accents: `#22D3EE` (electric cyan), `#10B981` (neon green)
- Status: `#F59E0B` (amber), `#EF4444` (red)
- Text: `#FFFFFF` (white), `#9CA3AF` (muted gray)

**Typography:**
- Font: Space Grotesk
- Scale: text-xs to text-3xl
- Uppercase labels: tracking-wider

**Effects:**
- Glassmorphism: `backdrop-blur-md bg-[#111827]/60`
- Borders: `border-white/10`
- Glows: `shadow-[0_0_24px_rgba(34,211,238,0.4)]`
- Rounded: `rounded-[16px]` for cards, `rounded-xl` for buttons

## Component Checklist

### Layout & Navigation ✅
- [x] AppShell (AdminSidebar + AdminTopBar + content)
- [x] SidebarNav (AdminSidebar)
- [x] Topbar (AdminTopBar)
- [x] Breadcrumbs
- [x] PageHeader
- [x] Responsive layout
- [ ] Keyboard navigation (partial)

### Data Display ✅
- [x] MetricCard
- [x] StatusBadge
- [x] ProgressBar
- [x] DataTable (sortable, sticky header)
- [x] EmptyState
- [x] Skeleton (Card, Table, Page)
- [ ] Tooltip / Popover

### Fleet Operations ✅
- [x] FleetStatusTable
- [x] VehicleCard
- [x] VehicleControlHeader
- [x] RentalHistoryTimeline
- [x] MaintenanceLogs
- [x] DiagnosticsSummary
- [x] VehicleLocationMap
- [x] QuickActionsBar

### Charts ✅
- [x] RevenueByVehicleChart (Bar)
- [x] UtilizationTrendChart (Area)
- [x] MaintenanceFrequencyAnalysis (Stacked Bar)
- [x] TopPerformingLocations

### Filters & Inputs ✅
- [x] SearchInput (debounced)
- [x] Select
- [x] Toggle
- [ ] FilterBar (composite)
- [ ] DateRangePicker
- [ ] Slider
- [ ] MultiSelect

### Feedback & State ✅
- [x] Toast notifications
- [x] Modal
- [x] AlertBanner
- [x] Button (with loading state)
- [ ] Drawer
- [ ] Error boundary

### Auth & Roles ❌
- [ ] Login screen
- [ ] Role badge
- [ ] Route guard

## Usage Examples

### MetricCard
```tsx
import { MetricCard } from './components/ui/MetricCard';
import { DollarSign } from 'lucide-react';

<MetricCard
  label="Total Revenue"
  value="$936K"
  delta={{ value: 12.4, trend: 'up' }}
  icon={<DollarSign className="w-6 h-6" />}
  iconBg="bg-[#22D3EE]/10"
  iconColor="text-[#22D3EE]"
/>
```

### StatusBadge
```tsx
import { StatusBadge } from './components/ui/StatusBadge';

<StatusBadge status="available" showDot size="md" />
<StatusBadge status="rented" label="Custom Label" />
```

### ProgressBar
```tsx
import { ProgressBar } from './components/ui/ProgressBar';

<ProgressBar 
  value={87} 
  label="Utilization"
  showPercentage
  color="gradient"
  glow
/>
```

### SearchInput
```tsx
import { SearchInput } from './components/ui/SearchInput';

<SearchInput
  placeholder="Search vehicles..."
  value={search}
  onChange={setSearch}
  debounceMs={300}
/>
```

### Select
```tsx
import { Select } from './components/ui/Select';

<Select
  label="Vehicle Type"
  value={type}
  onChange={setType}
  options={[
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
  ]}
/>
```

### Toggle
```tsx
import { Toggle } from './components/ui/Toggle';

<Toggle
  checked={available}
  onChange={setAvailable}
  label="Available Now"
/>
```

### Modal
```tsx
import { Modal } from './components/ui/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary">Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

### Toast
```tsx
import { ToastProvider, useToast } from './components/ui/Toast';

// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// In your component
const { showToast } = useToast();
showToast('success', 'Vehicle deployed successfully!');
```

### Button
```tsx
import { Button } from './components/ui/Button';
import { Rocket } from 'lucide-react';

<Button variant="primary" size="md" loading={loading} icon={<Rocket />}>
  Deploy Vehicle
</Button>
```

### DataTable
```tsx
import { DataTable } from './components/ui/DataTable';

<DataTable
  data={vehicles}
  columns={[
    { key: 'name', header: 'Vehicle', sortable: true },
    { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v.status} /> },
  ]}
  keyExtractor={(v) => v.id}
  onRowClick={(v) => navigate(`/vehicle/${v.id}`)}
/>
```

### EmptyState
```tsx
import { EmptyState } from './components/ui/EmptyState';
import { Car } from 'lucide-react';

<EmptyState
  icon={<Car className="w-8 h-8" />}
  title="No vehicles found"
  description="Try adjusting your filters or add a new vehicle"
  action={{ label: 'Add Vehicle', onClick: handleAdd }}
/>
```

### Skeleton
```tsx
import { SkeletonCard, SkeletonTable, SkeletonPage } from './components/ui/Skeleton';

{loading ? <SkeletonPage /> : <Content />}
```

### Breadcrumbs
```tsx
import { Breadcrumbs } from './components/ui/Breadcrumbs';

<Breadcrumbs
  items={[
    { label: 'Dashboard', onClick: () => navigate('/') },
    { label: 'Fleet', onClick: () => navigate('/fleet') },
    { label: 'Neon Rover' },
  ]}
/>
```

### AlertBanner
```tsx
import { AlertBanner } from './components/ui/AlertBanner';

<AlertBanner
  type="warning"
  message="Scheduled maintenance required for 3 vehicles"
  action={{ label: 'View Details', onClick: handleView }}
  onDismiss={() => setShowAlert(false)}
/>
```

## Installation

This is a custom component library built for Prime-Drive. All components are self-contained and use:

- React 18+
- Tailwind CSS v4
- Lucide React (icons)
- Recharts (charts)

## Contributing

When adding new components:
1. Follow the existing design patterns
2. Use the Prime-Drive color palette
3. Include TypeScript types
4. Add to this README with usage examples
5. Ensure accessibility (ARIA labels, keyboard nav)

## License

Proprietary - Prime-Drive Autonomous Mobility Platform

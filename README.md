# Prime-Drive Fleet Management Dashboard

A production-ready, enterprise-grade fleet management platform for autonomous mobility operations.

## 🚀 Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon system

## 📁 Project Structure

```
prime-drive-dashboard/
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Root app with providers
│   │   ├── routes.tsx              # Route configuration
│   │   ├── components/
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── AppShell.tsx    # Main layout wrapper
│   │   │   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   │   │   ├── Topbar.tsx      # Top navigation bar
│   │   │   │   └── PageHeader.tsx  # Page title component
│   │   │   ├── ui/                 # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── StatusBadge.tsx
│   │   │   │   ├── MetricCard.tsx
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── SearchInput.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Toggle.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   └── AlertBanner.tsx
│   │   │   └── [feature components]
│   │   │       ├── FleetStatusTable.tsx
│   │   │       ├── VehicleControlHeader.tsx
│   │   │       ├── RevenueByVehicleChart.tsx
│   │   │       └── ...
│   │   └── pages/
│   │       ├── OverviewPage.tsx     # Dashboard home
│   │       ├── FleetPage.tsx        # Vehicle management
│   │       ├── VehicleDetailPage.tsx # Single vehicle view
│   │       ├── RentalsPage.tsx      # Rental management
│   │       ├── MaintenancePage.tsx  # Maintenance center
│   │       ├── AnalyticsPage.tsx    # Fleet analytics
│   │       └── SettingsPage.tsx     # System settings
│   ├── styles/
│   │   ├── theme.css               # Design tokens
│   │   └── fonts.css               # Font imports
│   └── main.tsx                    # Entry point
├── COMPONENT_LIBRARY.md            # Component documentation
├── package.json
└── README.md
```

## 🎨 Design System

**Color Palette:**
- Primary: `#22D3EE` (Electric Cyan), `#10B981` (Neon Green)
- Background: `#0A0F1E` (Midnight Navy), `#111827` (Deep Space Blue)
- Status: `#F59E0B` (Amber), `#EF4444` (Red)
- Text: `#FFFFFF` (White), `#9CA3AF` (Muted Gray)

**Typography:**
- Font Family: Space Grotesk
- Scale: text-xs (10px) → text-3xl (30px)
- Uppercase labels with tracking-wider

**Visual Effects:**
- Glassmorphism: `backdrop-blur-md bg-[#111827]/60`
- Borders: `border-white/10`
- Glows: `shadow-[0_0_24px_rgba(34,211,238,0.4)]`
- Rounded corners: 16px (cards), 12px (buttons)

## 🧩 Key Features

### Routing & Navigation
- ✅ React Router v6 with nested routes
- ✅ NavLink with active states
- ✅ Programmatic navigation
- ✅ URL parameters for detail views

### Pages
- **Overview** - Dashboard with KPIs and live fleet status
- **Fleet** - Vehicle list with filters, search, and detail drilldown
- **Analytics** - Charts for revenue, utilization, maintenance, locations
- **Maintenance** - Service tracking and maintenance analytics
- **Rentals** - Booking management (placeholder)
- **Settings** - System configuration (placeholder)
- **Vehicle Detail** - Single vehicle control center with diagnostics

### Components
- **Layout**: AppShell, Sidebar, Topbar, PageHeader
- **Data Display**: MetricCard, StatusBadge, ProgressBar, DataTable
- **Inputs**: SearchInput, Select, Toggle, Button
- **Feedback**: Toast, Modal, AlertBanner, EmptyState, Skeleton
- **Charts**: Revenue, Utilization, Maintenance, Top Locations

## 🚦 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📖 Usage Examples

### Creating a New Page
```tsx
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export function MyPage() {
  return (
    <>
      <PageHeader
        title="Page Title"
        subtitle="Description"
        action={<Button variant="primary">Action</Button>}
      />
      <div>{/* Page content */}</div>
    </>
  );
}
```

### Adding a New Route
```tsx
// In routes.tsx
<Route path="my-page" element={<MyPage />} />
```

### Using Toast Notifications
```tsx
import { useToast } from '../components/ui/Toast';

const { showToast } = useToast();
showToast('success', 'Action completed!');
```

### Building Data Tables
```tsx
<DataTable
  data={items}
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> }
  ]}
  keyExtractor={(item) => item.id}
  onRowClick={(item) => navigate(`/detail/${item.id}`)}
/>
```

## 🎯 Component Patterns

### Standard Page Layout
```tsx
<PageHeader title="..." subtitle="..." action={<Button />} />
<FilterSection />
<DataDisplay />
```

### Filter Bar Pattern
```tsx
<SearchInput />
<Select options={...} />
<Toggle label="..." />
```

### Metric Display
```tsx
<div className="grid grid-cols-4 gap-6">
  <MetricCard label="..." value="..." delta={{...}} />
</div>
```

## 🔧 Customization

### Adding New Status Types
Edit `StatusBadge.tsx` statusConfig object:
```tsx
mynewstatus: { 
  bg: 'bg-[#COLOR]/10', 
  text: 'text-[#COLOR]', 
  dot: 'bg-[#COLOR]', 
  label: 'Label' 
}
```

### Theming
All design tokens are in `/src/styles/theme.css`

## 📦 Dependencies

- `react` - UI framework
- `react-dom` - React renderer
- `react-router-dom` - Routing
- `recharts` - Charts
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `vite` - Build tool

## 🏗️ Architecture Decisions

1. **File-based Routing**: Clear separation between routes and components
2. **Component Library**: Reusable UI primitives in `/ui` folder
3. **Layout Components**: AppShell pattern with Sidebar + Topbar
4. **Context for Global State**: Toast notifications via Context API
5. **Type Safety**: Full TypeScript throughout
6. **Responsive Design**: Mobile-first with Tailwind breakpoints

## 📝 License

Proprietary - Prime-Drive Autonomous Mobility Platform

## 🤝 Contributing

1. Follow the component patterns in COMPONENT_LIBRARY.md
2. Maintain design system consistency
3. Add TypeScript types for all props
4. Include usage examples in component files
5. Test routing and navigation flows

---

Built with ⚡ by Prime-Drive Engineering Team

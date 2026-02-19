# Prime-Drive Dashboard - Migration Guide

## 📋 Complete Migration to Local Vite Project

This guide will help you migrate the entire Prime-Drive dashboard from Figma Make to a local Vite development environment.

---

## Step 1: Create New Vite Project

```bash
# Create new Vite + React + TypeScript project
npm create vite@latest prime-drive-dashboard -- --template react-ts

# Navigate to project
cd prime-drive-dashboard
```

---

## Step 2: Install Dependencies

```bash
# Install base dependencies
npm install

# Install routing & UI libraries
npm install react-router-dom lucide-react recharts

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

**Final `package.json` should include:**
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.13.0",
    "lucide-react": "^0.487.0",
    "recharts": "^2.15.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.7.0",
    "tailwindcss": "^4.1.12",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "typescript": "^5.7.2",
    "vite": "^6.3.5"
  }
}
```

---

## Step 3: Configure Tailwind CSS

**Replace `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prime': {
          'navy': '#0A0F1E',
          'blue': '#111827',
          'cyan': '#22D3EE',
          'green': '#10B981',
          'amber': '#F59E0B',
          'red': '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(34, 211, 238, 0.4)',
        'glow-green': '0 0 24px rgba(16, 185, 129, 0.4)',
        'glow-amber': '0 0 24px rgba(245, 158, 11, 0.4)',
      },
    },
  },
  plugins: [],
}
```

---

## Step 4: Configure Vite

**Replace `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/app/components'),
      '@pages': path.resolve(__dirname, './src/app/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
```

---

## Step 5: Update TypeScript Config

**Replace `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/app/components/*"],
      "@pages/*": ["./src/app/pages/*"]
    }
  },
  "include": ["src"]
}
```

---

## Step 6: Set Up Project Structure

**Delete default Vite files:**
```bash
rm -rf src/App.tsx src/App.css src/index.css
```

**Create folder structure:**
```bash
mkdir -p src/app/components/layout
mkdir -p src/app/components/ui
mkdir -p src/app/pages
mkdir -p src/styles
```

**Your structure should look like:**
```
prime-drive-dashboard/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   └── [feature components]
│   │   └── pages/
│   ├── styles/
│   │   ├── theme.css
│   │   └── fonts.css
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## Step 7: Copy Files from Figma Make

Copy these files from the Figma Make project:

### Core Files
- ✅ `/src/app/App.tsx`
- ✅ `/src/app/routes.tsx`
- ✅ `/src/main.tsx`
- ✅ `/index.html`

### Layout Components (`/src/app/components/layout/`)
- ✅ `AppShell.tsx`
- ✅ `Sidebar.tsx`
- ✅ `Topbar.tsx`
- ✅ `PageHeader.tsx`

### UI Components (`/src/app/components/ui/`)
- ✅ `Button.tsx`
- ✅ `MetricCard.tsx`
- ✅ `StatusBadge.tsx`
- ✅ `ProgressBar.tsx`
- ✅ `SearchInput.tsx`
- ✅ `Select.tsx`
- ✅ `Toggle.tsx`
- ✅ `Modal.tsx`
- ✅ `Toast.tsx`
- ✅ `DataTable.tsx`
- ✅ `EmptyState.tsx`
- ✅ `Skeleton.tsx`
- ✅ `Breadcrumbs.tsx`
- ✅ `AlertBanner.tsx`

### Feature Components (`/src/app/components/`)
- ✅ `BackgroundGrid.tsx`
- ✅ `FleetStatusTable.tsx`
- ✅ `VehicleControlHeader.tsx`
- ✅ `VehicleStatusOverview.tsx`
- ✅ `VehicleLocationMap.tsx`
- ✅ `RentalHistoryTimeline.tsx`
- ✅ `MaintenanceLogs.tsx`
- ✅ `DiagnosticsSummary.tsx`
- ✅ `RevenueByVehicleChart.tsx`
- ✅ `UtilizationTrendChart.tsx`
- ✅ `MaintenanceFrequencyAnalysis.tsx`
- ✅ `TopPerformingLocations.tsx`

### Pages (`/src/app/pages/`)
- ✅ `OverviewPage.tsx`
- ✅ `FleetPage.tsx`
- ✅ `VehicleDetailPage.tsx`
- ✅ `AnalyticsPage.tsx`
- ✅ `MaintenancePage.tsx`
- ✅ `RentalsPage.tsx`
- ✅ `SettingsPage.tsx`

### Styles (`/src/styles/`)
- ✅ `theme.css`
- ✅ `fonts.css`

---

## Step 8: Update main.tsx

**Replace `/src/main.tsx`:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/theme.css'
import './styles/fonts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## Step 9: Update index.html

**Replace `/index.html`:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prime-Drive Fleet Command</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Step 10: Add CSS Files

**Create `/src/styles/theme.css`:**
```css
@import 'tailwindcss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Create `/src/styles/fonts.css`:**
```css
/* Space Grotesk font is loaded via Google Fonts in index.html */
```

---

## Step 11: Run Development Server

```bash
npm run dev
```

Your app should now be running at `http://localhost:3000` 🎉

---

## Step 12: Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔧 Troubleshooting

### Issue: Module not found errors
**Solution:** Check that all imports use relative paths correctly:
```typescript
// ✅ Correct
import { Button } from '../components/ui/Button'

// ❌ Incorrect (unless you set up path aliases)
import { Button } from '@/components/ui/Button'
```

### Issue: Tailwind classes not working
**Solution:** 
1. Make sure `theme.css` imports tailwind: `@import 'tailwindcss';`
2. Verify `tailwind.config.js` content array includes all files
3. Restart dev server

### Issue: React Router not navigating
**Solution:** Make sure you're using `<BrowserRouter>` in App.tsx, not `<HashRouter>`

### Issue: Charts not rendering
**Solution:** Recharts requires explicit width/height. Use `<ResponsiveContainer>`:
```tsx
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={data}>
    {/* ... */}
  </BarChart>
</ResponsiveContainer>
```

---

## 📦 Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### GitHub Pages
1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/prime-drive-dashboard/',
  // ... rest of config
})
```
2. Build: `npm run build`
3. Deploy `dist` folder to `gh-pages` branch

---

## ✅ Verification Checklist

- [ ] Project compiles without errors
- [ ] All routes navigate correctly
- [ ] Sidebar active states work
- [ ] Charts render properly
- [ ] Filters on Fleet page work
- [ ] Vehicle detail page loads
- [ ] Toast notifications can be triggered
- [ ] Modal opens and closes
- [ ] Responsive design works on mobile
- [ ] Production build completes successfully

---

## 🚀 Next Steps

1. **Add Environment Variables** - Create `.env` for API endpoints
2. **Set Up API Layer** - Add API client with axios/fetch
3. **Add Authentication** - Implement login/logout flow
4. **Connect to Backend** - Replace mock data with real API calls
5. **Add Tests** - Set up Vitest for unit tests
6. **Set Up CI/CD** - GitHub Actions for automated deployment

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router v6 Guide](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Recharts Examples](https://recharts.org/)

---

**Need Help?** Check `/COMPONENT_LIBRARY.md` for component usage examples and `/README.md` for project overview.
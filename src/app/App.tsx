import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes';
import { ToastProvider } from './components/ui/Toast';
import { FeaturedVehiclesProvider } from './contexts/FeaturedVehiclesContext';
import '../styles/index.css';

export default function App() {
  console.log('✓ Prime-Drive App Loaded - All Routes Active');
  
  return (
    <BrowserRouter>
      <ToastProvider>
        <FeaturedVehiclesProvider>
          <AppRoutes />
        </FeaturedVehiclesProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
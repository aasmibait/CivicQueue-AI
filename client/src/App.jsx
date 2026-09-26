import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AlertBanner from './components/AlertBanner';
import ReportQueueModal from './components/Modals/ReportQueueModal';
import SetAlertModal from './components/Modals/SetAlertModal';
import DirectionsModal from './components/Modals/DirectionsModal';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import OfficesPage from './pages/OfficesPage';
import OfficeDetailPage from './pages/OfficeDetailPage';
import SmartTimePage from './pages/SmartTimePage';
import AlertsPage from './pages/AlertsPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

function ScreenRenderer() {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'home':
      return <HomePage />;
    case 'services':
      return <ServicesPage />;
    case 'service-detail':
      return <ServiceDetailPage />;
    case 'offices':
      return <OfficesPage />;
    case 'office-detail':
      return <OfficeDetailPage />;
    case 'smart-time':
      return <SmartTimePage />;
    case 'alerts':
      return <AlertsPage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'admin':
      return <AdminPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--surface-subtle)' }}>
        {/* Real-Time Queue Alert Banner */}
        <AlertBanner />

        {/* Global Navigation */}
        <Navbar />

        {/* Screen Content */}
        <main style={{ flex: 1 }}>
          <ScreenRenderer />
        </main>

        {/* Global Modals */}
        <ReportQueueModal />
        <SetAlertModal />
        <DirectionsModal />

        {/* Footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}

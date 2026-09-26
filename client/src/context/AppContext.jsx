import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchServices,
  fetchServiceById,
  fetchOffices,
  fetchOfficeById,
  submitQueueReport,
  fetchAlerts,
  createAlert as apiCreateAlert,
  deleteAlert as apiDeleteAlert,
  fetchPrediction,
  fetchDashboardStats,
  adminSimulateQueue,
  adminResetData
} from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & selection
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);

  // Data cache
  const [servicesList, setServicesList] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [officesList, setOfficesList] = useState([]);
  const [currentOffice, setCurrentOffice] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Checklists state: { [serviceId]: { [docId]: boolean } }
  const [checklists, setChecklists] = useState(() => {
    try {
      const saved = localStorage.getItem('civicqueue_checklists');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active notification toast/banner
  const [activeNotification, setActiveNotification] = useState(null);

  // Modals state
  const [modalState, setModalState] = useState({
    reportQueue: false,
    setAlert: false,
    directions: false,
    targetOffice: null,
    targetService: null
  });

  // Geolocation state
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
    status: 'idle', // 'idle' | 'loading' | 'success' | 'denied'
    message: ''
  });

  // Search & filter state
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [officeFilterService, setOfficeFilterService] = useState('all');
  const [officeFilterStatus, setOfficeFilterStatus] = useState('all');

  // Initial load
  useEffect(() => {
    loadServices();
    loadOffices();
    loadAlerts();
    loadStats();
  }, []);

  // Save checklists to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('civicqueue_checklists', JSON.stringify(checklists));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [checklists]);

  // Loaders
  async function loadServices(search = '', category = 'All') {
    const data = await fetchServices(search, category);
    if (data) setServicesList(data);
  }

  async function loadOffices(filters = {}) {
    const data = await fetchOffices({
      ...filters,
      lat: userLocation.lat,
      lng: userLocation.lng
    });
    if (data) setOfficesList(data);
  }

  async function loadAlerts() {
    const data = await fetchAlerts();
    if (data) setAlerts(data);
  }

  async function loadStats() {
    const data = await fetchDashboardStats();
    if (data) setDashboardStats(data);
  }

  // Navigation helper
  function navigate(screen, params = {}) {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (params.serviceId) {
      setSelectedServiceId(params.serviceId);
      loadServiceDetail(params.serviceId);
    }
    if (params.officeId) {
      setSelectedOfficeId(params.officeId);
      loadOfficeDetail(params.officeId);
      loadPredictionForOffice(params.officeId);
    }
    if (params.category) {
      setSelectedCategory(params.category);
    }
    if (params.search) {
      setServiceSearchQuery(params.search);
    }
  }

  async function loadServiceDetail(id) {
    const data = await fetchServiceById(id);
    if (data) setCurrentService(data);
  }

  async function loadOfficeDetail(id) {
    const data = await fetchOfficeById(id);
    if (data) setCurrentOffice(data);
  }

  async function loadPredictionForOffice(id) {
    const data = await fetchPrediction(id);
    if (data) setPredictionData(data);
  }

  // Document checklist toggle
  function toggleDocument(serviceId, docId) {
    setChecklists(prev => {
      const serviceChecklist = prev[serviceId] || {};
      const updated = {
        ...serviceChecklist,
        [docId]: !serviceChecklist[docId]
      };
      return {
        ...prev,
        [serviceId]: updated
      };
    });
  }

  function getChecklistProgress(service) {
    if (!service || !service.documents) return { checkedCount: 0, totalCount: 0, percentage: 0 };
    const serviceChecklist = checklists[service.id] || {};
    const totalCount = service.documents.length;
    const checkedCount = service.documents.filter(d => serviceChecklist[d.id]).length;
    const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
    return { checkedCount, totalCount, percentage };
  }

  // Location request handler
  function requestUserLocation() {
    setUserLocation(prev => ({ ...prev, status: 'loading', message: 'Requesting device location...' }));

    if (!navigator.geolocation) {
      setUserLocation({
        lat: null,
        lng: null,
        status: 'denied',
        message: 'Location access unavailable in browser. Showing demo offices.'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({
          lat: latitude,
          lng: longitude,
          status: 'success',
          message: 'Location detected. Distances updated!'
        });
        loadOffices({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.warn('Geolocation denied or error:', err.message);
        setUserLocation({
          lat: null,
          lng: null,
          status: 'denied',
          message: 'Location access unavailable. Showing demo offices.'
        });
      },
      { timeout: 7000 }
    );
  }

  // Submit queue report
  async function submitReport(officeId, queueNumber, waitTime) {
    const res = await submitQueueReport(officeId, {
      queue: queueNumber,
      waitTime
    });

    // Refresh state
    await loadOffices();
    if (selectedOfficeId === officeId || currentOffice?.id === officeId) {
      await loadOfficeDetail(officeId);
    }
    await loadAlerts();
    await loadStats();

    // Check if triggered alerts returned
    if (res.data?.triggeredAlerts && res.data.triggeredAlerts.length > 0) {
      const topAlert = res.data.triggeredAlerts[0];
      setActiveNotification({
        id: Date.now(),
        type: 'alert-triggered',
        title: '🔔 Queue Alert Triggered!',
        message: topAlert.message,
        officeName: topAlert.officeName,
        queue: topAlert.currentQueue
      });
    }

    return res;
  }

  // Create alert
  async function createNewAlert(officeId, threshold, serviceName) {
    const res = await apiCreateAlert({ officeId, threshold, serviceName });
    await loadAlerts();

    if (res.isTriggered) {
      setActiveNotification({
        id: Date.now(),
        type: 'alert-triggered',
        title: '🔔 Immediate Queue Alert',
        message: `The queue is already ${res.data.currentQueue} (below your threshold of ${threshold})! You can visit now.`,
        officeName: res.data.officeName,
        queue: res.data.currentQueue
      });
    }

    return res;
  }

  // Remove alert
  async function removeAlert(id) {
    await apiDeleteAlert(id);
    await loadAlerts();
  }

  // Fast simulation for hackathon demo
  async function simulateQueueChange(officeId, newQueue) {
    const res = await adminSimulateQueue(officeId, newQueue);
    await loadOffices();
    if (currentOffice?.id === officeId) {
      await loadOfficeDetail(officeId);
    }
    await loadAlerts();
    await loadStats();

    if (res.data?.triggeredAlerts && res.data.triggeredAlerts.length > 0) {
      const topAlert = res.data.triggeredAlerts[0];
      setActiveNotification({
        id: Date.now(),
        type: 'alert-triggered',
        title: '🔔 Queue Alert',
        message: topAlert.message,
        officeName: topAlert.officeName,
        queue: topAlert.currentQueue
      });
    }

    return res;
  }

  // Reset to demo defaults
  async function resetAllDemoData() {
    await adminResetData();
    await loadServices();
    await loadOffices();
    await loadAlerts();
    await loadStats();
    if (selectedOfficeId) await loadOfficeDetail(selectedOfficeId);
    if (selectedServiceId) await loadServiceDetail(selectedServiceId);
    setActiveNotification({
      id: Date.now(),
      type: 'info',
      title: 'Demo Reset',
      message: 'All queues, alerts, and reports restored to default hackathon values.'
    });
  }

  // Modal open helpers
  function openReportModal(office) {
    setModalState(prev => ({
      ...prev,
      reportQueue: true,
      targetOffice: office || currentOffice
    }));
  }

  function openAlertModal(office, service) {
    setModalState(prev => ({
      ...prev,
      setAlert: true,
      targetOffice: office || currentOffice,
      targetService: service || currentService
    }));
  }

  function openDirectionsModal(office) {
    setModalState(prev => ({
      ...prev,
      directions: true,
      targetOffice: office || currentOffice
    }));
  }

  function closeModal(name) {
    setModalState(prev => ({
      ...prev,
      [name]: false
    }));
  }

  const value = {
    currentScreen,
    setCurrentScreen,
    navigate,
    servicesList,
    currentService,
    selectedServiceId,
    officesList,
    currentOffice,
    selectedOfficeId,
    predictionData,
    dashboardStats,
    alerts,
    checklists,
    toggleDocument,
    getChecklistProgress,
    userLocation,
    requestUserLocation,
    serviceSearchQuery,
    setServiceSearchQuery,
    selectedCategory,
    setSelectedCategory,
    officeFilterService,
    setOfficeFilterService,
    officeFilterStatus,
    setOfficeFilterStatus,
    modalState,
    openReportModal,
    openAlertModal,
    openDirectionsModal,
    closeModal,
    submitReport,
    createNewAlert,
    removeAlert,
    simulateQueueChange,
    resetAllDemoData,
    activeNotification,
    setActiveNotification,
    loadOfficeDetail,
    loadServiceDetail,
    loadPredictionForOffice
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// CivicQueue AI - API Client Service with Automatic Backend Sync & Offline Fallback

const BASE_URL = '/api';

export async function fetchServices(search = '', category = '') {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);
    const res = await fetch(`${BASE_URL}/services?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API fetchServices fallback to direct data:', err);
    return null;
  }
}

export async function fetchServiceById(id) {
  try {
    const res = await fetch(`${BASE_URL}/services/${id}`);
    if (!res.ok) throw new Error('Failed to fetch service detail');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API fetchServiceById error:', err);
    return null;
  }
}

export async function fetchOffices(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.service && filters.service !== 'all') params.append('service', filters.service);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.lat && filters.lng) {
      params.append('lat', filters.lat);
      params.append('lng', filters.lng);
    }
    const res = await fetch(`${BASE_URL}/offices?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch offices');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API fetchOffices error:', err);
    return null;
  }
}

export async function fetchOfficeById(id) {
  try {
    const res = await fetch(`${BASE_URL}/offices/${id}`);
    if (!res.ok) throw new Error('Failed to fetch office detail');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API fetchOfficeById error:', err);
    return null;
  }
}

export async function submitQueueReport(officeId, reportData) {
  try {
    const res = await fetch(`${BASE_URL}/offices/${officeId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to submit report');
    return json;
  } catch (err) {
    console.error('API submitQueueReport error:', err);
    throw err;
  }
}

export async function fetchAlerts() {
  try {
    const res = await fetch(`${BASE_URL}/alerts`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API fetchAlerts error:', err);
    return [];
  }
}

export async function createAlert(alertData) {
  try {
    const res = await fetch(`${BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create alert');
    return json;
  } catch (err) {
    console.error('API createAlert error:', err);
    throw err;
  }
}

export async function deleteAlert(id) {
  try {
    const res = await fetch(`${BASE_URL}/alerts/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    console.error('API deleteAlert error:', err);
    return { success: false };
  }
}

export async function fetchPrediction(officeId) {
  try {
    const res = await fetch(`${BASE_URL}/prediction/${officeId}`);
    if (!res.ok) throw new Error('Failed to fetch prediction');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API fetchPrediction error:', err);
    return null;
  }
}

export async function fetchDashboardStats() {
  try {
    const res = await fetch(`${BASE_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API fetchDashboardStats error:', err);
    return null;
  }
}

export async function adminSimulateQueue(officeId, newQueue) {
  try {
    const res = await fetch(`${BASE_URL}/admin/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ officeId, newQueue })
    });
    return await res.json();
  } catch (err) {
    console.error('Admin simulate error:', err);
    throw err;
  }
}

export async function adminResetData() {
  try {
    const res = await fetch(`${BASE_URL}/admin/reset`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.error('Admin reset error:', err);
    throw err;
  }
}

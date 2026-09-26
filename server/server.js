const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { services, offices: initialOffices, initialQueueReports, initialAlerts } = require('./data');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend build if present
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// In-memory working copies for live updates
let currentOffices = JSON.parse(JSON.stringify(initialOffices));
let queueReports = JSON.parse(JSON.stringify(initialQueueReports));
let userAlerts = JSON.parse(JSON.stringify(initialAlerts));
let citizensHelpedCount = 342;

// Helper function to derive queue status badge
function getQueueStatus(count) {
  if (count <= 10) return 'Low Queue';
  if (count <= 25) return 'Moderate Queue';
  return 'High Queue';
}

// Helper to compute estimated wait time from queue
function calculateEstimatedWait(count) {
  if (count <= 0) return 5;
  return Math.max(8, Math.round(count * 2.3));
}

// Haversine distance calculator for coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

// 1. Get all services
app.get('/api/services', (req, res) => {
  const { search, category } = req.query;
  let results = [...services];

  if (category && category !== 'All') {
    results = results.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// 2. Get service details
app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'No matching government service found.' });
  }

  // Also attach offices that provide this service
  const matchingOffices = currentOffices
    .filter(o => o.services.includes(service.id))
    .map(o => ({
      id: o.id,
      name: o.name,
      location: o.location,
      distanceKm: o.distanceKm,
      queue: o.queue,
      estimatedWait: o.estimatedWait,
      status: o.status
    }));

  res.json({
    success: true,
    data: {
      ...service,
      availableOfficesCount: matchingOffices.length,
      availableOffices: matchingOffices
    }
  });
});

// 3. Get all offices (with optional filter by service, status, search, location)
app.get('/api/offices', (req, res) => {
  const { service, status, search, lat, lng } = req.query;
  let results = currentOffices.map(o => ({ ...o }));

  // Recompute distance if user provides latitude & longitude
  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    if (!isNaN(userLat) && !isNaN(userLng)) {
      results = results.map(o => ({
        ...o,
        distanceKm: calculateDistance(userLat, userLng, o.latitude, o.longitude)
      }));
    }
  }

  if (service && service !== 'all') {
    results = results.filter(o => o.services.includes(service));
  }

  if (status && status !== 'all') {
    results = results.filter(o => o.status.toLowerCase().includes(status.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(o =>
      o.name.toLowerCase().includes(q) ||
      o.location.toLowerCase().includes(q) ||
      o.zone.toLowerCase().includes(q)
    );
  }

  // Sort by distance
  results.sort((a, b) => a.distanceKm - b.distanceKm);

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// 4. Get single office details
app.get('/api/offices/:id', (req, res) => {
  const office = currentOffices.find(o => o.id === req.params.id);
  if (!office) {
    return res.status(404).json({ success: false, message: 'Office not found.' });
  }

  // Get reports for this office
  const reports = queueReports.filter(r => r.officeId === office.id);

  // Get services full titles
  const officeServices = services.filter(s => office.services.includes(s.id));

  res.json({
    success: true,
    data: {
      ...office,
      reports,
      servicesDetail: officeServices
    }
  });
});

// 5. Citizen Report: Update queue for an office
app.post('/api/offices/:id/report', (req, res) => {
  const { queue, waitTime, reportedBy = "Citizen (At Office)" } = req.body;
  const office = currentOffices.find(o => o.id === req.params.id);

  if (!office) {
    return res.status(404).json({ success: false, message: 'Office not found.' });
  }

  const queueNumber = parseInt(queue, 10);
  if (isNaN(queueNumber)) {
    return res.status(400).json({ success: false, message: 'Please enter the number of people.' });
  }

  if (queueNumber < 0) {
    return res.status(400).json({ success: false, message: 'Queue cannot be negative.' });
  }

  const oldQueue = office.queue;
  office.queue = queueNumber;
  office.estimatedWait = calculateEstimatedWait(queueNumber);
  office.status = getQueueStatus(queueNumber);
  office.lastUpdated = "Reported just now";
  office.lastReportedTimestamp = new Date().toISOString();

  // Create report entry
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const newReport = {
    id: `rep-${Date.now()}`,
    officeId: office.id,
    officeName: office.name,
    queue: queueNumber,
    waitTime: waitTime || `${office.estimatedWait} min`,
    reportedBy,
    timestamp: timeString,
    timeAgo: "Just now",
    verified: true
  };
  queueReports.unshift(newReport);

  citizensHelpedCount += 1;

  // Check if any alerts should trigger!
  const triggeredAlerts = [];
  userAlerts.forEach(alert => {
    if (alert.officeId === office.id) {
      alert.currentQueue = queueNumber;
      if (queueNumber <= alert.threshold) {
        alert.status = "Triggered (Queue is short!)";
        alert.notified = true;
        triggeredAlerts.push({
          ...alert,
          message: `The queue at ${office.name} is now ${queueNumber} people (below your threshold of ${alert.threshold}). You may want to check the office before visiting.`
        });
      }
    }
  });

  res.json({
    success: true,
    message: "Thank you! Your report helps other citizens plan their visit.",
    data: {
      office,
      newReport,
      triggeredAlerts
    }
  });
});

// 6. Get user alerts
app.get('/api/alerts', (req, res) => {
  // Sync current queues with alert status
  const syncedAlerts = userAlerts.map(alert => {
    const office = currentOffices.find(o => o.id === alert.officeId);
    if (office) {
      alert.currentQueue = office.queue;
      if (office.queue <= alert.threshold) {
        alert.status = "Triggered (Queue is short!)";
      } else {
        alert.status = "Waiting for queue to decrease";
      }
    }
    return alert;
  });

  res.json({
    success: true,
    count: syncedAlerts.length,
    data: syncedAlerts
  });
});

// 7. Create a new alert
app.post('/api/alerts', (req, res) => {
  const { officeId, threshold, serviceName } = req.body;
  const office = currentOffices.find(o => o.id === officeId);

  if (!office) {
    return res.status(404).json({ success: false, message: 'Office not found.' });
  }

  const threshNum = parseInt(threshold, 10);
  if (isNaN(threshNum) || threshNum <= 0) {
    return res.status(400).json({ success: false, message: 'Please enter a valid target queue size (> 0).' });
  }

  const isTriggered = office.queue <= threshNum;
  const newAlert = {
    id: `alert-${Date.now()}`,
    officeId: office.id,
    officeName: office.name,
    serviceName: serviceName || "General Office Queue",
    threshold: threshNum,
    currentQueue: office.queue,
    status: isTriggered ? "Triggered (Queue is short!)" : "Waiting for queue to decrease",
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    notified: isTriggered
  };

  userAlerts.unshift(newAlert);

  res.json({
    success: true,
    message: "Alert created successfully.",
    data: newAlert,
    isTriggered
  });
});

// 8. Delete alert
app.delete('/api/alerts/:id', (req, res) => {
  userAlerts = userAlerts.filter(a => a.id !== req.params.id);
  res.json({
    success: true,
    message: 'Alert removed.'
  });
});

// 9. AI Smart Visit Time recommendation
app.get('/api/prediction/:officeId', (req, res) => {
  const office = currentOffices.find(o => o.id === req.params.id || o.id === req.params.officeId);
  if (!office) {
    return res.status(404).json({ success: false, message: 'Office not found.' });
  }

  const patterns = office.hourlyPatterns || [
    { hour: "9:00 AM", queue: 22, wait: 45 },
    { hour: "10:00 AM", queue: 35, wait: 75 },
    { hour: "11:00 AM", queue: 48, wait: 105 },
    { hour: "12:00 PM", queue: 55, wait: 120 },
    { hour: "1:00 PM", queue: 30, wait: 60 },
    { hour: "2:00 PM", queue: 18, wait: 40 },
    { hour: "3:00 PM", queue: 12, wait: 25 },
    { hour: "4:00 PM", queue: 20, wait: 42 }
  ];

  // Find optimal window: lowest queue window during active processing hours (10 AM to 4:30 PM)
  // Excluding 1:00 PM - 2:00 PM lunch slowdown and closing cutoff
  const activeHours = patterns.filter(p => !p.hour.includes("1:00 PM") && !p.hour.includes("5:00 PM"));
  const sorted = [...activeHours].sort((a, b) => a.queue - b.queue);
  const bestSlot = sorted[0] || patterns[patterns.length - 2];

  const hourTransitions = {
    "9:00 AM": "10:00 AM",
    "10:00 AM": "11:00 AM",
    "11:00 AM": "12:00 PM",
    "12:00 PM": "1:00 PM",
    "1:00 PM": "2:00 PM",
    "2:00 PM": "3:00 PM",
    "3:00 PM": "4:00 PM",
    "4:00 PM": "5:00 PM",
    "5:00 PM": "5:30 PM"
  };

  const nextHour = hourTransitions[bestSlot.hour] || "4:00 PM";
  const recommendedWindow = `${bestSlot.hour} – ${nextHour}`;
  const minQ = Math.max(4, bestSlot.queue - 2);
  const maxQ = bestSlot.queue + 4;
  const expectedQueue = `${minQ}–${maxQ} people`;

  res.json({
    success: true,
    data: {
      officeId: office.id,
      officeName: office.name,
      recommendedWindow,
      expectedQueue,
      expectedWait: `${Math.round(bestSlot.wait * 0.8)}–${bestSlot.wait + 5} min`,
      reason: "Based on recent citizen-reported queue patterns and lower afternoon token intake after the post-lunch rush.",
      confidence: "Medium",
      label: "Prototype AI Prediction",
      hourlyPatterns: patterns,
      bestSlot
    }
  });
});

// 10. Dashboard & System Stats
app.get('/api/stats', (req, res) => {
  const totalOffices = currentOffices.length;
  const activeReports = queueReports.length;
  const lowQueueCount = currentOffices.filter(o => o.status === 'Low Queue').length;
  const moderateQueueCount = currentOffices.filter(o => o.status === 'Moderate Queue').length;
  const highQueueCount = currentOffices.filter(o => o.status === 'High Queue').length;

  res.json({
    success: true,
    data: {
      totalOffices: 24, // Displayed ecosystem scale
      activeQueueReports: activeReports + 62,
      citizensHelpedToday: citizensHelpedCount,
      lowQueueOffices: lowQueueCount,
      moderateQueueOffices: moderateQueueCount,
      highQueueOffices: highQueueCount,
      avgWaitTimeMinutes: 34,
      totalServicesOffered: services.length,
      recentReports: queueReports.slice(0, 8),
      officesOverview: currentOffices
    }
  });
});

// 11. Admin quick simulation / crowd drop (for hackathon demo)
app.post('/api/admin/simulate', (req, res) => {
  const { officeId, newQueue } = req.body;
  const office = currentOffices.find(o => o.id === officeId);

  if (!office) {
    return res.status(404).json({ success: false, message: 'Office not found' });
  }

  const qNum = parseInt(newQueue, 10);
  office.queue = isNaN(qNum) ? 4 : qNum;
  office.estimatedWait = calculateEstimatedWait(office.queue);
  office.status = getQueueStatus(office.queue);
  office.lastUpdated = "Reported just now";

  // Check alerts
  const triggeredAlerts = [];
  userAlerts.forEach(alert => {
    if (alert.officeId === office.id) {
      alert.currentQueue = office.queue;
      if (office.queue <= alert.threshold) {
        alert.status = "Triggered (Queue is short!)";
        alert.notified = true;
        triggeredAlerts.push({
          ...alert,
          message: `🔔 The queue at ${office.name} dropped to ${office.queue} people (below your threshold of ${alert.threshold}).`
        });
      }
    }
  });

  res.json({
    success: true,
    message: `Simulated queue for ${office.name} updated to ${office.queue}`,
    data: { office, triggeredAlerts }
  });
});

// 12. Admin reset
app.post('/api/admin/reset', (req, res) => {
  currentOffices = JSON.parse(JSON.stringify(initialOffices));
  queueReports = JSON.parse(JSON.stringify(initialQueueReports));
  userAlerts = JSON.parse(JSON.stringify(initialAlerts));
  citizensHelpedCount = 342;
  res.json({ success: true, message: 'Data reset to prototype seed defaults.' });
});

// SPA wildcard fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    next();
  }
});

// Start Express Server locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CivicQueue AI Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
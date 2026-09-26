// Client-side fallback seed data for offline / instantaneous UI loading

export const CATEGORIES = [
  "All",
  "Revenue & Certificates",
  "Civic Records & Municipal",
  "Social Welfare",
  "Food & Civil Supplies",
  "Identity & UIDAI",
  "Transport & RTO",
  "Education & Welfare"
];

export const DEMO_PREDICTIONS = {
  defaultHours: [
    { hour: "9:00 AM", queue: 10, wait: 20 },
    { hour: "10:00 AM", queue: 24, wait: 50 },
    { hour: "11:00 AM", queue: 38, wait: 80 },
    { hour: "12:00 PM", queue: 45, wait: 95 },
    { hour: "1:00 PM", queue: 32, wait: 65 },
    { hour: "2:00 PM", queue: 20, wait: 45 },
    { hour: "3:00 PM", queue: 14, wait: 30 },
    { hour: "4:00 PM", queue: 18, wait: 40 },
    { hour: "5:00 PM", queue: 8, wait: 15 }
  ]
};

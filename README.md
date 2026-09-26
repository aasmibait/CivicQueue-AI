# CivicQueue AI
> **Tagline:** *"Know the queue. Carry the right documents. Save your time."*  
> **Subtext:** *"Find government services, check required documents, see live crowd updates, and choose a better time to visit."*

---

## 🏛️ Project Overview
**CivicQueue AI** is a citizen-first civic-technology platform designed to eliminate the unpredictability, wasted visits, and frustration of dealing with government offices. 

By unifying **interactive document readiness checklists**, **real-time citizen-crowdsourced queue intelligence**, **threshold alerts**, and **heuristic visit-time recommendations**, citizens can confidently plan their visits before leaving home.

---

## 🚀 Quick Start (Run Locally in VS Code)

### Prerequisites
- **Node.js** (v18+ recommended; tested on Node.js v20+)
- **npm** (included with Node.js)

### 1. Installation
Open a terminal in the project root directory (`govt/`):
```bash
# Install backend dependencies
npm --prefix server install

# Install frontend dependencies
npm --prefix client install
```
*(Or run `npm run install:all`)*

### 2. Build Frontend (Production Bundle)
```bash
npm --prefix client run build
```

### 3. Run the Application
```bash
npm start
```
*The Express server will launch on port **5000** and automatically serve the full React application.*

### 4. Open in Browser
Open your browser and navigate to:
```
http://localhost:5000
```

> **Developer Mode (Optional with Hot Reload):**  
> If you want to develop with Vite live reload:  
> - Terminal 1: `node server/server.js`  
> - Terminal 2: `npm --prefix client run dev` (Opens on `http://localhost:5173` with proxy to backend)

---

## 📁 Project Folder Structure
```
govt/
├── package.json                 # Root unified npm scripts
├── README.md                    # Project documentation & demo guide
│
├── server/                      # Node.js + Express Backend
│   ├── package.json             # Express, CORS dependencies
│   ├── server.js                # REST API, Queue state, Alert engine, SPA static server
│   └── data.js                  # 18 government services & 10 demo offices seed data
│
└── client/                      # React + Vite Frontend
    ├── package.json             # React, Vite, Lucide-react
    ├── vite.config.js           # Vite dev config with API proxy
    ├── index.html               # Semantic HTML entry with metadata & favicon
    └── src/
        ├── main.jsx             # React DOM root entry
        ├── App.jsx              # Main routing & application shell
        ├── index.css            # Custom modern civic-tech design system & typography
        ├── data.js              # Shared client constants & categories
        ├── context/
        │   └── AppContext.jsx   # State management (navigation, checklists, alerts)
        ├── services/
        │   └── api.js           # Backend API connector with graceful fallbacks
        ├── components/
        │   ├── Navbar.jsx       # Header, navigation links, alert counter, mobile drawer
        │   ├── Footer.jsx       # Statutory notice, platform links, reset button
        │   ├── StatusBadge.jsx  # Standardized Low / Moderate / High queue badge
        │   ├── AlertBanner.jsx  # Real-time in-app notification banner
        │   └── Modals/
        │       ├── ReportQueueModal.jsx   # "Help Citizens Like You" crowdsource form
        │       ├── SetAlertModal.jsx      # "Set Queue Alert" threshold modal
        │       └── DirectionsModal.jsx    # Transit routes, working hours, Google Maps
        └── pages/
            ├── HomePage.jsx          # Hero section, feature cards, 5-step guide
            ├── ServicesPage.jsx      # Searchable directory of 18 public services
            ├── ServiceDetailPage.jsx  # Interactive checklist & before-you-visit tips
            ├── OfficesPage.jsx       # Nearby office search & geolocation fallback
            ├── OfficeDetailPage.jsx  # Queue gauge, citizen reports, action buttons
            ├── SmartTimePage.jsx     # AI visit recommendations & hourly histogram
            ├── AlertsPage.jsx        # Active watchlist & instant crowd trigger
            ├── DashboardPage.jsx     # Live city-wide civic metrics & telemetry
            └── AdminPage.jsx         # Demo control room & one-click judging triggers
```

---

## ⏱️ 2-Minute Hackathon Demo Script (Judge Walkthrough)

Follow this exact story to demonstrate the core value proposition in under 2 minutes:

| Step | Action | What to Say / Point Out |
|---|---|---|
| **1. The Problem** | Start on the **Home Page** (`/`) | *"Citizens waste hours in lines or get rejected at the counter because they missed one document. CivicQueue AI solves this."* |
| **2. Discover Service** | Click **"Find a Government Service"** or search `"Non Creamy Layer"` | *"A citizen searching for 'Non-Creamy Layer Certificate' instantly finds the exact issuing requirements across 18 public services."* |
| **3. Interactive Checklist** | Open **Non-Creamy Layer Certificate** | *"Show the interactive document checklist. Check off 4 documents to demonstrate the live progress bar ('4 / 8 documents ready'). Note the transparent legal disclaimer."* |
| **4. Compare Nearby Queues** | Click **"Find Nearby Offices"** | *"Instead of guessing, the citizen compares nearby offices: Tehsil Andheri (18 waiting), Revenue Office Bandra (7 waiting), and Taluka Kurla (42 waiting)."* |
| **5. Inspect Office & Set Alert** | Click **"View Queue"** on **Revenue Office - Bandra** | *"The citizen opens Bandra (Low Queue, 7 people). They click 'Notify Me When Queue Is Short' and set a threshold of 5 people."* |
| **6. Citizen Crowdsourcing** | Click **"Report Current Queue"** | *"A citizen physically at the counter reports that the line just shortened to 4 people. Hit Submit."* |
| **7. Instant Alert Trigger** | Watch the screen | *"Instantly, an in-app banner fires: 🔔 'The queue at Revenue Office - Bandra is now 4 people (below your threshold of 5).' The citizen can now visit!"* |
| **8. Smart Visit Time (AI)** | Navigate to **"Smart Visit Time"** | *"If they can't visit right now, our prototype AI engine forecasts the lowest crowd window: '3:00 PM – 4:00 PM' based on hourly trends."* |
| **9. Admin Demo Simulator** | Click **"Admin Demo"** in header | *"Judges can test any scenario in real time using the 1-click simulation buttons to surge or drop queues instantly."* |

---

## 🌟 Implemented Features

1. **Service Search & Directory:**
   - 18 realistic government certificates and citizen workflows (Non-Creamy Layer, Caste, Income, Domicile, Birth, Death, Marriage, Disability, Character, EWS, Scholarship, Ration Card, Aadhaar, PAN, Driving Licence, Vehicle Registration).
   - Real-time search by keyword and category filters.

2. **Interactive Document Readiness Checklist:**
   - Checkbox-by-checkbox verification for mandatory originals, copies, and affidavits.
   - Dynamic readiness counter (e.g. `4 / 8 documents ready`) and animated progress bar.
   - Persistent in browser storage (`localStorage`).
   - Prominent statutory disclaimer: *"Requirements can vary by state, authority, and category. Verify with the relevant authority before visiting."*

3. **Nearby Offices & Geolocation:**
   - Realistic facilities (Tahsildar offices, Taluka centers, BMC Ward, RTO, UIDAI Aadhaar Seva Kendra).
   - Browser geolocation via `[Use My Location]`.
   - Graceful fallback with user notice if location is blocked: *"Location access unavailable. Showing demo offices."* (Zero app crashes).

4. **Live Queue Tracking & Status Badges:**
   - Real-time queue headcounts and calculated wait estimates (~2.3 min per person).
   - Dynamic status badges:
     - 🟢 **Low Queue** (0–10 people)
     - 🟡 **Moderate Queue** (11–25 people)
     - 🔴 **High Queue** (26+ people)
   - Visual crowd density gauge and citizen report timeline.

5. **"Help Citizens Like You" (Queue Crowdsourcing):**
   - Quick headcount submitter with `[ - ] count [ + ]` controls.
   - Waiting duration dropdown (0–15m, 15–30m, 30–60m, 60+m).
   - Instant dynamic update across all pages with timestamp: *"Reported just now"*.

6. **Smart Queue Alerts ("My Alerts"):**
   - User sets custom threshold: *"Notify me when fewer than X people"*.
   - Watchlist dashboard showing target vs. current queue.
   - In-app notification banner and sound trigger when condition is met.

7. **Smart Visit Time (AI Heuristic Prediction):**
   - Analyzes historical footfall patterns, lunch hour pauses, and afternoon intake cycles.
   - Recommends optimal arrival window (e.g. `3:00 PM – 4:00 PM`, expected `4–10 people`).
   - Interactive 9 AM – 5 PM crowd histogram.
   - Clearly labeled as *"Prototype AI Prediction"*.

8. **Admin Demo Control Center:**
   - 1-click simulation buttons for live demonstrations.
   - Direct numerical overrides for any office queue.
   - Reset button to restore seed defaults at any time.

9. **Zero Dead Buttons:**
   - Every button performs an action, opens a modal, navigates, or links directly to official resources.

---

## 🔒 Accuracy & Prototype Disclaimers
- **Prototype Status:** CivicQueue AI is an independent hackathon civic-tech prototype. Real government offices are not directly connected to this database.
- **Queue Estimates:** Crowd figures are either citizen-reported or simulated heuristics.
- **Checklists:** Document requirements represent standard administrative practice but may vary across jurisdictions and sub-categories.

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, Lucide-react, Vanilla CSS design system
- **Backend:** Node.js, Express, CORS
- **Storage:** In-memory state synchronized with local fallback

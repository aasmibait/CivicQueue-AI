import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import {
  MapPin,
  Clock,
  Users,
  Bell,
  ArrowLeft,
  PlusCircle,
  Navigation,
  Sparkles,
  CheckCircle2,
  Calendar,
  Phone,
  Building2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function OfficeDetailPage() {
  const {
    currentOffice,
    officesList,
    navigate,
    openReportModal,
    openAlertModal,
    openDirectionsModal
  } = useApp();

  const office = currentOffice || officesList[0];

  if (!office) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <p>Loading office queue intelligence...</p>
      </div>
    );
  }

  // Visual queue gauge percentage (capped at 50 people = 100%)
  const gaugePercent = Math.min(100, Math.round((office.queue / 50) * 100));

  // Determine queue bar color
  let gaugeColor = '#10b981';
  if (office.queue > 25) gaugeColor = '#ef4444';
  else if (office.queue > 10) gaugeColor = '#f59e0b';

  // Demo reports timeline
  const reports = office.reports && office.reports.length > 0 ? office.reports : [
    { timestamp: "11:28 AM", queue: office.queue, waitTime: `${office.estimatedWait} min`, reportedBy: "Citizen (At Office)", verified: true },
    { timestamp: "11:05 AM", queue: Math.max(2, office.queue - 2), waitTime: "25 min", reportedBy: "Citizen", verified: true },
    { timestamp: "10:42 AM", queue: Math.max(1, office.queue - 6), waitTime: "20 min", reportedBy: "Citizen", verified: true }
  ];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      {/* Back button */}
      <button
        onClick={() => navigate('offices')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          color: '#64748b',
          fontWeight: 600,
          marginBottom: '1.25rem'
        }}
      >
        <ArrowLeft size={16} /> Back to Government Offices
      </button>

      {/* Main Office Hero Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <StatusBadge status={office.status} queueCount={office.queue} />
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                • Updated {office.lastUpdated}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
              OFFICE FACILITY
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.15rem' }}>
              {office.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              <MapPin size={16} color="#ef4444" />
              <span>{office.location}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>{office.distanceKm} km away</span>
            </div>
          </div>

          {/* Core Metric Highlight Pill */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-light)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Current Queue</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                {office.queue} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>people</span>
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Estimated Wait</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb', lineHeight: 1.1 }}>
                {office.estimatedWait} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Queue Indicator Gauge (Required Feature) */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--border-light)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
              Real-Time Crowd Density Gauge
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: gaugeColor }}>
              {office.status} ({office.queue} waiting)
            </span>
          </div>

          <div style={{ height: '14px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
            <div
              style={{
                width: `${gaugePercent}%`,
                height: '100%',
                backgroundColor: gaugeColor,
                transition: 'width 0.4s ease',
                borderRadius: '9999px'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.45rem' }}>
            <span style={{ color: '#059669', fontWeight: 600 }}>0–10: LOW</span>
            <span style={{ color: '#d97706', fontWeight: 600 }}>11–25: MODERATE</span>
            <span style={{ color: '#dc2626', fontWeight: 600 }}>26+: HIGH</span>
          </div>
        </div>

        {/* 3 Most Important Action Buttons from requirements */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => openReportModal(office)}
            className="btn btn-primary"
          >
            <PlusCircle size={18} /> Report Current Queue
          </button>

          <button
            onClick={() => openAlertModal(office)}
            className="btn btn-secondary"
          >
            <Bell size={18} color="#2563eb" /> Notify Me When Queue Is Short
          </button>

          <button
            onClick={() => openDirectionsModal(office)}
            className="btn btn-outline"
          >
            <Navigation size={18} /> Get Directions
          </button>

          <button
            onClick={() => navigate('smart-time', { officeId: office.id })}
            className="btn btn-secondary"
          >
            <Sparkles size={16} color="#d97706" /> Smart Visit Time
          </button>
        </div>
      </div>

      {/* Two Columns: Citizen Reports History (Left) & Operational Info (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1.4fr)', gap: '2rem' }} className="office-details-layout">
        {/* Left Column: Citizen Reports Timeline */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                Crowdsourced Field Activity
              </span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                Citizen Reports
              </h2>
            </div>
            <button
              onClick={() => openReportModal(office)}
              className="btn btn-outline btn-sm"
            >
              + Add Report
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {reports.map((rep, idx) => (
              <div
                key={rep.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {rep.timestamp} — <span style={{ color: '#2563eb' }}>{rep.queue} people</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Reported by {rep.reportedBy || 'Citizen'} • Wait {rep.waitTime || '15-30 min'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
                  <CheckCircle2 size={15} /> Verified
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1.25rem',
            padding: '0.75rem',
            backgroundColor: '#eff6ff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #bfdbfe',
            fontSize: '0.8rem',
            color: '#1e40af'
          }}>
            👥 <strong>Citizen Power:</strong> Have you joined the queue at this office? Help fellow citizens by submitting the current headcount.
          </div>
        </div>

        {/* Right Column: Working Hours & Services Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Facility Hours & Contact */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={18} color="#2563eb" /> Hours & Counter Schedule
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: '#64748b' }}>Public Counter Hours</span>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>{office.operatingHours}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: '#64748b' }}>Official Lunch Break</span>
                <span style={{ fontWeight: 600, color: '#d97706' }}>{office.lunchTime || '1:30 PM - 2:00 PM'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Helpdesk Telephone</span>
                <span style={{ fontWeight: 600, color: '#2563eb' }}>{office.contactPhone || '+91 22 2683 4100'}</span>
              </div>
            </div>
          </div>

          {/* Services Handled at This Office */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={18} color="#2563eb" /> Services Handled Here
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {office.services && office.services.map(srvId => (
                <button
                  key={srvId}
                  onClick={() => navigate('service-detail', { serviceId: srvId })}
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                >
                  {srvId.replace(/-/g, ' ').toUpperCase()} ➜
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .office-details-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

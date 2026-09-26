import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import {
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Users,
  Bell,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export default function AdminPage() {
  const {
    officesList,
    alerts,
    dashboardStats,
    simulateQueueChange,
    resetAllDemoData,
    navigate
  } = useApp();

  const [simulatedInputs, setSimulatedInputs] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  function handleInputChange(officeId, val) {
    setSimulatedInputs(prev => ({ ...prev, [officeId]: val }));
  }

  async function handleUpdateQueue(officeId) {
    const val = simulatedInputs[officeId];
    if (val === undefined || val === '') return;
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      await simulateQueueChange(officeId, num);
      setSuccessMsg(`Updated queue for office to ${num}`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  }

  // Find most crowded offices
  const sortedCrowded = [...officesList].sort((a, b) => b.queue - a.queue);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Admin Demo Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            <ShieldCheck size={16} /> Operational Supervision
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Admin Control Center & Demo Simulator
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', marginTop: '0.35rem' }}>
            Manage and test real-time queue states, observe alert triggers, and supervise citizen crowd reports.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={resetAllDemoData}
            className="btn btn-secondary btn-sm"
            style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: '#fef2f2' }}
          >
            <RefreshCw size={14} /> Reset Demo Data
          </button>
        </div>
      </div>

      {successMsg && (
        <div style={{
          backgroundColor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem'
        }}>
          <CheckCircle2 size={16} /> {successMsg}
        </div>
      )}

      {/* Hackathon Demo Quick Trigger Showcase */}
      <div style={{
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={20} color="#93c5fd" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
            Hackathon One-Click Presentation Triggers
          </h3>
        </div>
        <p style={{ color: '#bfdbfe', fontSize: '0.9rem', maxWidth: '680px', marginBottom: '1.25rem' }}>
          Instantly simulate queue changes during your live judging demo to showcase dynamic recalculations and triggered alerts without waiting for physical pedestrians.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => simulateQueueChange('office-bandra', 4)}
            className="btn btn-primary"
            style={{ backgroundColor: '#2563eb' }}
          >
            Trigger Bandra Drop ➜ 4 people (Low Queue Alert)
          </button>

          <button
            onClick={() => simulateQueueChange('office-kurla', 15)}
            className="btn btn-secondary"
            style={{ color: '#1e3a8a', backgroundColor: '#ffffff' }}
          >
            Drop Kurla Crowd ➜ 15 people
          </button>

          <button
            onClick={() => simulateQueueChange('office-andheri', 32)}
            className="btn btn-outline"
            style={{ borderColor: '#93c5fd', color: '#ffffff' }}
          >
            Surge Andheri Crowd ➜ 32 people (High Queue)
          </button>
        </div>
      </div>

      {/* Grid: Office Management & Alert Supervision */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)', gap: '2rem' }} className="admin-layout">
        {/* Left Column: Office Queue Overrides */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              Manual Queue Adjustments ({officesList.length} Offices)
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Real-Time Push Enabled
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {officesList.map(office => {
              const currentInput = simulatedInputs[office.id] !== undefined ? simulatedInputs[office.id] : office.queue;
              return (
                <div
                  key={office.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#f8fafc',
                    border: '1px solid var(--border-light)',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ minWidth: '220px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                      {office.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <StatusBadge status={office.status} queueCount={office.queue} size="small" />
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Wait: {office.estimatedWait} min</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Queue:</label>
                      <input
                        type="number"
                        min="0"
                        max="300"
                        value={currentInput}
                        onChange={e => handleInputChange(office.id, e.target.value)}
                        style={{
                          width: '70px',
                          padding: '0.35rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-medium)',
                          fontWeight: 700,
                          textAlign: 'center'
                        }}
                      />
                    </div>

                    <button
                      onClick={() => handleUpdateQueue(office.id)}
                      className="btn btn-primary btn-sm"
                      style={{ padding: '0.4rem 0.75rem' }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Alerts & Most Crowded Centers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Active Citizen Alerts */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bell size={16} color="#2563eb" /> Active Watchlist Alerts ({alerts.length})
              </h4>
            </div>

            {alerts.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No active alerts set by users.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {alerts.map(a => (
                  <div key={a.id} style={{ padding: '0.65rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{a.officeName}</div>
                    <div style={{ color: '#475569', marginTop: '0.15rem' }}>
                      Target: ≤ {a.threshold} | Current: {a.currentQueue}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: a.status?.includes('Triggered') ? '#059669' : '#d97706', fontWeight: 600, marginTop: '0.2rem' }}>
                      {a.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Most Crowded Offices */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={16} color="#dc2626" /> Most Crowded Offices
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {sortedCrowded.slice(0, 4).map((off, idx) => (
                <div key={off.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{off.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{off.zone}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: off.queue > 25 ? '#dc2626' : '#d97706' }}>
                      {off.queue}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>waiting</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

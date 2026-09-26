import React from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import {
  BarChart3,
  Building2,
  Users,
  Clock,
  Heart,
  ArrowRight,
  TrendingDown,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const { dashboardStats, officesList, navigate } = useApp();

  const stats = dashboardStats || {
    totalOffices: 24,
    activeQueueReports: 67,
    citizensHelpedToday: 342,
    lowQueueOffices: 8
  };

  const lowOffices = officesList.filter(o => o.status === 'Low Queue').length;
  const modOffices = officesList.filter(o => o.status === 'Moderate Queue').length;
  const highOffices = officesList.filter(o => o.status === 'High Queue').length;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          <BarChart3 size={16} /> Civic Telemetry & Transparency
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          CivicQueue AI Live Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', marginTop: '0.35rem' }}>
          Real-time aggregated indicators across government offices, citizen participation metrics, and queue conditions across metropolitan hubs.
        </p>
      </div>

      {/* 4 Stat Cards from requirements */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {/* Card 1: Total Offices */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Total Offices
            </span>
            <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}>
              <Building2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
            {stats.totalOffices}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '0.25rem' }}>
            ✓ 10 currently live reporting
          </div>
        </div>

        {/* Card 2: Active Queue Reports */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Active Queue Reports
            </span>
            <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
            {stats.activeQueueReports}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, marginTop: '0.25rem' }}>
            +14 submitted in last 2 hours
          </div>
        </div>

        {/* Card 3: Citizens Helped Today */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Citizens Helped Today
            </span>
            <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}>
              <Heart size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
            {stats.citizensHelpedToday}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '0.25rem' }}>
            Saved ~45 mins avg per trip
          </div>
        </div>

        {/* Card 4: Low Queue Offices */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Low Queue Offices
            </span>
            <div style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}>
              <TrendingDown size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#059669' }}>
            {lowOffices || stats.lowQueueOffices}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '0.25rem' }}>
            Short wait (&lt; 15 mins) right now
          </div>
        </div>
      </div>

      {/* Queue Level Visual Distribution */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
          Queue Distribution Across Network
        </h3>
        <div style={{ display: 'flex', height: '14px', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
          <div style={{ width: `${(lowOffices / officesList.length) * 100}%`, backgroundColor: '#10b981' }} title="Low Queue" />
          <div style={{ width: `${(modOffices / officesList.length) * 100}%`, backgroundColor: '#f59e0b' }} title="Moderate Queue" />
          <div style={{ width: `${(highOffices / officesList.length) * 100}%`, backgroundColor: '#ef4444' }} title="High Queue" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
          <span style={{ color: '#059669', fontWeight: 600 }}>● {lowOffices} Low Queue Offices</span>
          <span style={{ color: '#d97706', fontWeight: 600 }}>● {modOffices} Moderate Queue Offices</span>
          <span style={{ color: '#dc2626', fontWeight: 600 }}>● {highOffices} High Queue Offices</span>
        </div>
      </div>

      {/* "Live Office Queue Overview" Table from Requirements */}
      <div className="card" style={{ padding: '1.75rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
              Real-Time Feed
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              Live Office Queue Overview
            </h3>
          </div>
          <button onClick={() => navigate('offices')} className="btn btn-outline btn-sm">
            View Map / Cards
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Office</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Zone / Area</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Queue</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Wait</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Last Updated</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {officesList.map(office => (
              <tr
                key={office.id}
                style={{
                  borderBottom: '1px solid var(--border-light)',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '1rem 0.5rem', fontWeight: 700, color: '#0f172a' }}>
                  {office.name}
                </td>
                <td style={{ padding: '1rem 0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                  {office.zone}
                </td>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 700 }}>
                  {office.queue} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>people</span>
                </td>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 700, color: '#2563eb' }}>
                  {office.estimatedWait}m
                </td>
                <td style={{ padding: '1rem 0.5rem' }}>
                  <StatusBadge status={office.status} queueCount={office.queue} size="small" />
                </td>
                <td style={{ padding: '1rem 0.5rem', color: '#64748b', fontSize: '0.8rem' }}>
                  {office.lastUpdated}
                </td>
                <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                  <button
                    onClick={() => navigate('office-detail', { officeId: office.id })}
                    className="btn btn-secondary btn-sm"
                  >
                    View Queue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

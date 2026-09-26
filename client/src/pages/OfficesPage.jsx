import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import {
  MapPin,
  Search,
  Navigation,
  Compass,
  Filter,
  Users,
  Clock,
  ArrowRight,
  PlusCircle,
  FileCheck2,
  X,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function OfficesPage() {
  const {
    officesList,
    servicesList,
    navigate,
    officeFilterService,
    setOfficeFilterService,
    officeFilterStatus,
    setOfficeFilterStatus,
    userLocation,
    requestUserLocation,
    openReportModal,
    openDirectionsModal
  } = useApp();

  const [searchLocation, setSearchLocation] = useState('');

  // Selected service object if any
  const activeService = servicesList.find(s => s.id === officeFilterService);

  // Filtering
  const filteredOffices = officesList.filter(office => {
    // Service filter
    if (officeFilterService !== 'all' && !office.services.includes(officeFilterService)) {
      return false;
    }
    // Status filter
    if (officeFilterStatus !== 'all' && !office.status.toLowerCase().includes(officeFilterStatus.toLowerCase())) {
      return false;
    }
    // Search query
    if (searchLocation) {
      const q = searchLocation.toLowerCase().trim();
      const match = office.name.toLowerCase().includes(q) ||
                    office.location.toLowerCase().includes(q) ||
                    office.zone.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Top Banner & Title */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          <MapPin size={16} /> Official Facilities & Live Queues
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Find Government Offices
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', marginTop: '0.35rem' }}>
          Compare live wait times and crowd sizes across issuing offices. Pick low-queue centers to save hours in transit and processing.
        </p>
      </div>

      {/* Selected Service Context Bar (Highlighted Requirement) */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            padding: '0.65rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex'
          }}>
            <FileCheck2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Selected Service Filter
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              {activeService ? activeService.name : 'All Government Services (18 Available)'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {activeService && (
            <button
              onClick={() => setOfficeFilterService('all')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              Clear Service Filter <X size={14} />
            </button>
          )}

          <select
            value={officeFilterService}
            onChange={e => setOfficeFilterService(e.target.value)}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              backgroundColor: '#f8fafc',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <option value="all">-- Filter By Service --</option>
            {servicesList.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Geolocation & Filter Controls */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          {/* Location search input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem 1rem'
          }}>
            <Search size={18} color="#64748b" />
            <input
              type="text"
              placeholder="Search area (e.g. Andheri, Bandra, Kurla)..."
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                width: '100%',
                outline: 'none',
                color: '#0f172a'
              }}
            />
            {searchLocation && (
              <button onClick={() => setSearchLocation('')} style={{ color: '#94a3b8' }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Queue Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="#64748b" />
            <select
              value={officeFilterStatus}
              onChange={e => setOfficeFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: '#f8fafc',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#334155'
              }}
            >
              <option value="all">All Queue Levels</option>
              <option value="low">Low Queue (0–10 people)</option>
              <option value="moderate">Moderate Queue (11–25 people)</option>
              <option value="high">High Queue (26+ people)</option>
            </select>
          </div>

          {/* Geolocation Button - Required Feature */}
          <div>
            <button
              onClick={requestUserLocation}
              disabled={userLocation.status === 'loading'}
              className="btn btn-secondary"
              style={{
                width: '100%',
                border: '1px solid #bfdbfe',
                backgroundColor: userLocation.status === 'success' ? '#eff6ff' : '#ffffff',
                color: '#1d4ed8'
              }}
            >
              <Compass size={17} className={userLocation.status === 'loading' ? 'live-indicator' : ''} />
              {userLocation.status === 'loading' ? 'Detecting Location...' : 'Use My Location'}
            </button>
          </div>
        </div>

        {/* Location Status Notice (Graceful fallback) */}
        {userLocation.message && (
          <div style={{
            marginTop: '0.85rem',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: userLocation.status === 'denied' ? '#fffbeb' : '#ecfdf5',
            color: userLocation.status === 'denied' ? '#92400e' : '#065f46',
            border: userLocation.status === 'denied' ? '1px solid #fde68a' : '1px solid #a7f3d0'
          }}>
            {userLocation.status === 'denied' ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
            <span>{userLocation.message}</span>
          </div>
        )}
      </div>

      {/* Offices Grid */}
      {filteredOffices.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <MapPin size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
            No offices match your search criteria.
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Try expanding your search query, clearing service filters, or viewing all queue levels.
          </p>
          <button
            onClick={() => {
              setSearchLocation('');
              setOfficeFilterService('all');
              setOfficeFilterStatus('all');
            }}
            className="btn btn-secondary"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {filteredOffices.map(office => (
            <div
              key={office.id}
              className="card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header: Status and Distance */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <StatusBadge status={office.status} queueCount={office.queue} />
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {office.distanceKm} km away
                  </span>
                </div>

                {/* Office Name & Location */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                  {office.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  <MapPin size={16} color="#94a3b8" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{office.location}</span>
                </div>

                {/* Live Queue & Est Wait Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.85rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Users size={13} /> Current Queue
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '0.15rem' }}>
                      {office.queue} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>waiting</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> Estimated Wait
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb', marginTop: '0.15rem' }}>
                      {office.estimatedWait} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>min</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  ⏱️ Last updated: <span style={{ color: '#475569', fontWeight: 600 }}>{office.lastUpdated}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => navigate('office-detail', { officeId: office.id })}
                    className="btn btn-primary btn-sm"
                  >
                    View Queue
                  </button>
                  <button
                    onClick={() => openDirectionsModal(office)}
                    className="btn btn-secondary btn-sm"
                  >
                    Get Directions
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => openReportModal(office)}
                    className="btn btn-outline btn-sm"
                  >
                    <PlusCircle size={14} /> Report Queue
                  </button>
                  <button
                    onClick={() => navigate('smart-time', { officeId: office.id })}
                    className="btn btn-secondary btn-sm"
                  >
                    Smart Visit Time
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Clock, Phone, X, ExternalLink } from 'lucide-react';

export default function DirectionsModal() {
  const { modalState, closeModal, currentOffice } = useApp();
  const office = modalState.targetOffice || currentOffice;

  if (!modalState.directions || !office) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.name + ' ' + office.location)}`;

  return (
    <div className="modal-overlay" onClick={() => closeModal('directions')}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
              Transit & Navigation
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
              Directions to Office
            </h3>
          </div>
          <button onClick={() => closeModal('directions')} style={{ color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.35rem' }}>
              {office.name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
              <MapPin size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>{office.location}</span>
            </div>
          </div>

          {/* Mock Interactive Map Representation */}
          <div style={{
            height: '170px',
            backgroundColor: '#e2e8f0',
            borderRadius: 'var(--radius-md)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, rgba(219, 234, 254, 0.4) 0%, rgba(241, 245, 249, 0.6) 100%)'
            }} />
            <div style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Navigation size={18} color="#2563eb" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                Distance: {office.distanceKm} km from your current hub
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                <Clock size={14} /> Working Hours
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginTop: '0.2rem' }}>
                {office.operatingHours || '10:00 AM - 5:00 PM'}
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                <Phone size={14} /> Public Counter Helpdesk
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginTop: '0.2rem' }}>
                {office.contactPhone || '+91 22 2683 4100'}
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: '#475569',
            backgroundColor: '#eff6ff',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #bfdbfe'
          }}>
            💡 <strong>Transit Note:</strong> Metro Line 1 & Western Railway stations are within 500m walking distance from this facility.
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => closeModal('directions')} className="btn btn-secondary">
            Close
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none' }}
          >
            Open in Google Maps <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

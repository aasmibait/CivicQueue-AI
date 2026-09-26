import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ShieldAlert, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const { navigate, resetAllDemoData } = useApp();

  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#cbd5e1',
      borderTop: '1px solid #1e293b',
      marginTop: '4rem',
      padding: '3rem 0 2rem 0',
      fontSize: '0.85rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid #1e293b'
        }}>
          {/* Brand & mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <div style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '0.4rem',
                borderRadius: '6px',
                display: 'flex'
              }}>
                <Building2 size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>CivicQueue AI</span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.85rem' }}>
              Know the queue. Carry the right documents. Save your time. An intelligent citizen platform bridging transparency in civic services.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#1e293b',
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              color: '#60a5fa'
            }}>
              <Sparkles size={13} /> Civic Hackathon MVP Edition
            </div>
          </div>

          {/* Quick navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <button
                  onClick={() => navigate('services')}
                  style={{ color: '#94a3b8', transition: 'color 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  Government Services Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('services', { search: 'Non Creamy Layer' })}
                  style={{ color: '#94a3b8', transition: 'color 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  Non-Creamy Layer Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('offices')}
                  style={{ color: '#94a3b8', transition: 'color 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  Nearby Government Offices
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('smart-time')}
                  style={{ color: '#94a3b8', transition: 'color 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  Smart Visit Time (AI Recommendation)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('alerts')}
                  style={{ color: '#94a3b8', transition: 'color 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  My Queue Alerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('dashboard')}
                  style={{ color: '#94a3b8', transition: 'color 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  Live Crowd Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Prototype Disclaimer Box */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldAlert size={16} color="#f59e0b" /> Statutory & Accuracy Notice
            </h4>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.75rem',
              lineHeight: 1.5,
              color: '#94a3b8',
              border: '1px solid #334155'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Prototype Notice:</strong> CivicQueue AI is an independent civic-technology prototype. Live crowd numbers reflect citizen submissions and heuristic simulations.
              </p>
              <p>
                <strong>Checklist Guidance:</strong> Document checklists are demonstrative. Requirements may vary by jurisdiction and applicant category. Always verify with the relevant authority.
              </p>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <button
                onClick={resetAllDemoData}
                style={{
                  color: '#f87171',
                  fontSize: '0.75rem',
                  textDecoration: 'underline',
                  fontWeight: 500
                }}
              >
                Reset Demo Data to Defaults
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <div>
            © 2026 CivicQueue AI • Built for Civic Innovation & Public Service Transparency
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy-Safe Architecture</span>
            <span>Zero Tracking</span>
            <span>Open Civic Data Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

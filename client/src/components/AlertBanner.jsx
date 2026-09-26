import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AlertBanner() {
  const { activeNotification, setActiveNotification, navigate } = useApp();

  if (!activeNotification) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '1.25rem',
      right: '1.25rem',
      maxWidth: '460px',
      width: 'calc(100% - 2.5rem)',
      zIndex: 9999,
      backgroundColor: '#ffffff',
      borderLeft: '5px solid #2563eb',
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #bfdbfe',
      padding: '1rem 1.25rem',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={20} className="live-indicator" />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.2rem' }}>
              {activeNotification.title || '🔔 Queue Alert'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>
              {activeNotification.message}
            </p>
            {activeNotification.officeName && (
              <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    navigate('alerts');
                    setActiveNotification(null);
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                >
                  View in My Alerts <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setActiveNotification(null)}
          style={{
            color: '#94a3b8',
            padding: '0.25rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Dismiss notification"
        >
          <X size={18} />
        </button>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import {
  Bell,
  Trash2,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  Building2,
  PlusCircle,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';

export default function AlertsPage() {
  const {
    alerts,
    removeAlert,
    navigate,
    openAlertModal,
    officesList,
    simulateQueueChange
  } = useApp();

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            <Bell size={16} /> Notification Watchlist
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            My Queue Alerts
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '680px', marginTop: '0.35rem' }}>
            Get notified in-app the moment citizen crowds drop below your chosen headcount so you can step out at the perfect time.
          </p>
        </div>

        <button
          onClick={() => openAlertModal(officesList[0])}
          className="btn btn-primary"
        >
          <PlusCircle size={16} /> Create New Alert
        </button>
      </div>

      {/* Demo Hackathon Trigger Callout */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1.5px solid #bfdbfe',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a' }}>
              Hackathon Live Demo Helper
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#3b82f6' }}>
              Test how alerts fire when a crowd drops: click the simulate button on any active alert.
            </p>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <Bell size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
            No queue alerts currently active
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            You haven't set any queue alerts yet. Visit any government office page and click "Notify Me When Queue Is Short".
          </p>
          <button
            onClick={() => navigate('offices')}
            className="btn btn-primary"
          >
            Browse Government Offices
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alerts.map(alert => {
            const isTriggered = alert.status && alert.status.includes('Triggered');
            const targetOffice = officesList.find(o => o.id === alert.officeId);
            const currentQueue = targetOffice ? targetOffice.queue : alert.currentQueue;

            return (
              <div
                key={alert.id}
                className="card"
                style={{
                  padding: '1.5rem',
                  borderLeft: isTriggered ? '6px solid #10b981' : '6px solid #2563eb',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                      {alert.serviceName || 'Civic Service'}
                    </span>
                    <span style={{ color: '#cbd5e1' }}>•</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Created at {alert.createdAt || '10:00 AM'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                    {alert.officeName}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#475569' }}>
                    <div>
                      Target Condition: <strong>Notify when queue ≤ {alert.threshold} people</strong>
                    </div>
                    <div>
                      Current Live Queue: <strong style={{ color: isTriggered ? '#10b981' : '#0f172a' }}>{currentQueue} people</strong>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isTriggered ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: '#ecfdf5',
                        color: '#065f46',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #a7f3d0'
                      }}>
                        <CheckCircle2 size={14} /> Triggered! Queue is now short — ideal time to visit.
                      </span>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)'
                      }}>
                        <Clock size={14} /> Waiting for queue to decrease below {alert.threshold}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {/* Quick simulation button for hackathon demonstration */}
                  <button
                    onClick={() => simulateQueueChange(alert.officeId, Math.max(2, alert.threshold - 2))}
                    className="btn btn-secondary btn-sm"
                    title="Simulate queue dropping below target for demonstration"
                    style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}
                  >
                    <Sparkles size={14} /> Simulate Queue Drop (≤ {alert.threshold - 1})
                  </button>

                  <button
                    onClick={() => navigate('office-detail', { officeId: alert.officeId })}
                    className="btn btn-primary btn-sm"
                  >
                    View Office
                  </button>

                  <button
                    onClick={() => removeAlert(alert.id)}
                    style={{
                      color: '#94a3b8',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                    title="Delete alert"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

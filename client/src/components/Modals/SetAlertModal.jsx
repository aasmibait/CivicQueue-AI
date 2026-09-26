import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';

export default function SetAlertModal() {
  const { modalState, closeModal, createNewAlert, currentOffice, currentService } = useApp();
  const office = modalState.targetOffice || currentOffice;
  const service = modalState.targetService || currentService;

  const [threshold, setThreshold] = useState(10);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (modalState.setAlert && office) {
      // Pick a reasonable threshold lower than current queue
      const suggested = office.queue > 8 ? Math.max(5, Math.floor(office.queue * 0.6)) : 5;
      setThreshold(suggested);
      setErrorMsg('');
      setSubmittedSuccess(false);
    }
  }, [modalState.setAlert, office]);

  if (!modalState.setAlert || !office) return null;

  async function handleCreateAlert(e) {
    e.preventDefault();
    const tNum = parseInt(threshold, 10);
    if (isNaN(tNum) || tNum <= 0) {
      setErrorMsg('Please specify a valid queue threshold (greater than 0).');
      return;
    }

    try {
      setIsSubmitting(true);
      await createNewAlert(office.id, tNum, service ? service.name : 'General Office Services');
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        closeModal('setAlert');
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Failed to create alert');
    }
  }

  return (
    <div className="modal-overlay" onClick={() => closeModal('setAlert')}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ backgroundColor: '#f8fafc' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Crowd Notification
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
              Set Queue Alert
            </h3>
          </div>
          <button onClick={() => closeModal('setAlert')} style={{ color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="modal-body" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#ecfdf5',
              color: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#065f46', marginBottom: '0.5rem' }}>
              Alert Active!
            </h4>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>
              We'll notify you as soon as the queue at <strong>{office.name}</strong> drops to <strong>{threshold} people</strong> or fewer.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreateAlert}>
            <div className="modal-body">
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 600 }}>Target Facility:</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1e3a8a' }}>{office.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#3b82f6', marginTop: '0.2rem' }}>
                  Current Queue: <strong>{office.queue} people</strong> ({office.status})
                </div>
              </div>

              {errorMsg && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#991b1b',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                  Notify me when fewer than:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={threshold}
                    onChange={e => setThreshold(e.target.value)}
                    style={{
                      width: '120px',
                      padding: '0.65rem 1rem',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--accent-blue)',
                      textAlign: 'center',
                      color: '#0f172a'
                    }}
                  />
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>
                    people waiting
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                  {[5, 10, 15].map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setThreshold(preset)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
                    >
                      ≤ {preset} people
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-medium)',
                fontSize: '0.8rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <Bell size={16} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Prototype Alert:</strong> You will receive an instantaneous in-app alert banner & notification sound when crowd drops. (No SMS/email setup required).
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => closeModal('setAlert')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ minWidth: '140px' }}
              >
                {isSubmitting ? 'Saving...' : 'Create Alert'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

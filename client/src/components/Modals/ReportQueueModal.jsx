import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Clock, CheckCircle2, AlertCircle, X, ShieldAlert } from 'lucide-react';

export default function ReportQueueModal() {
  const { modalState, closeModal, submitReport, currentOffice } = useApp();
  const office = modalState.targetOffice || currentOffice;

  const [queueCount, setQueueCount] = useState(15);
  const [waitTime, setWaitTime] = useState('15-30 min');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (modalState.reportQueue && office) {
      setQueueCount(office.queue || 15);
      setErrorMsg('');
      setSubmittedSuccess(false);
    }
  }, [modalState.reportQueue, office]);

  if (!modalState.reportQueue || !office) return null;

  function handleDecrement() {
    if (queueCount > 0) {
      setQueueCount(prev => prev - 1);
      setErrorMsg('');
    }
  }

  function handleIncrement() {
    setQueueCount(prev => prev + 1);
    setErrorMsg('');
  }

  function handleInputChange(e) {
    const val = e.target.value;
    if (val === '') {
      setQueueCount('');
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setQueueCount(num);
      setErrorMsg('');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (queueCount === '' || queueCount === null || queueCount === undefined) {
      setErrorMsg('Please enter the number of people.');
      return;
    }
    if (queueCount < 0) {
      setErrorMsg('Queue cannot be negative.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitReport(office.id, queueCount, waitTime);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        closeModal('reportQueue');
      }, 1800);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Failed to submit report. Please try again.');
    }
  }

  return (
    <div className="modal-overlay" onClick={() => closeModal('reportQueue')}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ backgroundColor: '#f8fafc' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Citizen Crowdsourcing
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
              Help Citizens Like You
            </h3>
          </div>
          <button onClick={() => closeModal('reportQueue')} style={{ color: '#64748b' }}>
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
              Thank you!
            </h4>
            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '340px', margin: '0 auto' }}>
              Your report helps other citizens plan their visit and updates live crowd alerts.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
              ✓ Updated live queue to {queueCount} people
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Users size={20} color="#2563eb" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#1d4ed8', fontWeight: 600 }}>Are you currently at this office?</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a' }}>{office.name}</div>
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
                  How many people are currently waiting?
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handleDecrement}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid var(--border-medium)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={queueCount}
                    onChange={handleInputChange}
                    style={{
                      flex: 1,
                      height: '48px',
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--border-medium)',
                      color: '#0f172a'
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleIncrement}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid var(--border-medium)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    +
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
                  <span>0 - 10: Low</span>
                  <span>11 - 25: Moderate</span>
                  <span>26+: High</span>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                  How long have you been waiting? (Optional)
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={waitTime}
                    onChange={e => setWaitTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: '#ffffff',
                      color: '#1e293b',
                      fontWeight: 500
                    }}
                  >
                    <option value="0–15 min">0–15 min (Fast counter)</option>
                    <option value="15–30 min">15–30 min (Normal flow)</option>
                    <option value="30–60 min">30–60 min (Slow token processing)</option>
                    <option value="60+ min">60+ min (Heavy rush)</option>
                  </select>
                </div>
              </div>

              <div style={{
                fontSize: '0.75rem',
                color: '#64748b',
                backgroundColor: '#f8fafc',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed var(--border-light)'
              }}>
                ℹ️ Reports are marked as citizen-contributed and help calculate the best visiting hours for the community.
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => closeModal('reportQueue')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ minWidth: '160px' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Queue Update'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Clock,
  Users,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Building2,
  Calendar,
  Info
} from 'lucide-react';

export default function SmartTimePage() {
  const {
    officesList,
    selectedOfficeId,
    currentOffice,
    navigate,
    openAlertModal,
    predictionData,
    loadPredictionForOffice
  } = useApp();

  const [activeOfficeId, setActiveOfficeId] = useState(
    selectedOfficeId || (currentOffice ? currentOffice.id : 'office-andheri')
  );

  useEffect(() => {
    if (activeOfficeId) {
      loadPredictionForOffice(activeOfficeId);
    }
  }, [activeOfficeId]);

  const activeOffice = officesList.find(o => o.id === activeOfficeId) || officesList[0];

  // Default fallback patterns if prediction is loading
  const hourlyData = (predictionData && predictionData.hourlyPatterns) || activeOffice?.hourlyPatterns || [
    { hour: "9:00 AM", queue: 22, wait: 45 },
    { hour: "10:00 AM", queue: 35, wait: 75 },
    { hour: "11:00 AM", queue: 48, wait: 105 },
    { hour: "12:00 PM", queue: 55, wait: 120 },
    { hour: "1:00 PM", queue: 30, wait: 60 },
    { hour: "2:00 PM", queue: 18, wait: 40 },
    { hour: "3:00 PM", queue: 12, wait: 25 },
    { hour: "4:00 PM", queue: 20, wait: 42 }
  ];

  const maxQueue = Math.max(...hourlyData.map(d => d.queue), 1);

  const recommendation = predictionData || {
    recommendedWindow: "3:00 PM – 4:00 PM",
    expectedQueue: "12–18 people",
    expectedWait: "20–30 min",
    confidence: "Medium",
    reason: "Based on recent citizen-reported queue patterns and afternoon intake cycles.",
    label: "Prototype AI Prediction"
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          <Sparkles size={16} /> Intelligent Citizen Planning Engine
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Smart Visit Time (AI Recommendation)
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', marginTop: '0.35rem' }}>
          Avoid peak rush hours. Our prototype AI heuristic models footfall transitions, token cycles, and lunch slowdowns to forecast the best arrival window.
        </p>
      </div>

      {/* Office Selector Dropdown */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
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
            <Building2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Select Facility To Analyze
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              {activeOffice ? activeOffice.name : 'Choose Government Office'}
            </div>
          </div>
        </div>

        <select
          value={activeOfficeId}
          onChange={e => setActiveOfficeId(e.target.value)}
          style={{
            padding: '0.65rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--border-medium)',
            backgroundColor: '#f8fafc',
            fontWeight: 600,
            color: '#1e293b',
            minWidth: '280px'
          }}
        >
          {officesList.map(o => (
            <option key={o.id} value={o.id}>
              {o.name} ({o.status})
            </option>
          ))}
        </select>
      </div>

      {/* Main Grid: AI Recommendation Card (Left) & Hourly Pattern Distribution (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.8fr)', gap: '2rem' }} className="smart-time-layout">
        {/* Left Column: AI Recommendation Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{
            padding: '2rem',
            background: 'linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)',
            border: '2px solid #bfdbfe'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Sparkles size={13} /> AI Visit Recommendation
              </span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1e40af',
                backgroundColor: '#dbeafe',
                padding: '0.2rem 0.55rem',
                borderRadius: '4px'
              }}>
                Confidence: {recommendation.confidence || 'Medium'}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
                Recommended Arrival Window:
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#1e3a8a', letterSpacing: '-0.02em', margin: '0.35rem 0' }}>
                {recommendation.recommendedWindow}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <TrendingDown size={16} /> Expected Queue: {recommendation.expectedQueue}
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #bfdbfe',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Reasoning Model
              </div>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                "{recommendation.reason}"
              </p>
            </div>

            <button
              onClick={() => openAlertModal(activeOffice)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Set Queue Alert for This Window
            </button>
          </div>

          {/* Prototype Disclosure Notice */}
          <div style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem'
          }}>
            <ShieldAlert size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.8rem', color: '#92400e', lineHeight: 1.4 }}>
              <strong>Prototype AI Prediction:</strong> Predictions are generated using a heuristic algorithm analyzing citizen report timestamps, typical lunch slowdowns, and token issuance cycles. It is not an official government dispatch system.
            </div>
          </div>
        </div>

        {/* Right Column: Hourly Footfall Histogram */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                Historical Queue Pattern
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                Hourly Crowd Distribution
              </h3>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Facility: <strong>{activeOffice ? activeOffice.name : ''}</strong>
            </div>
          </div>

          {/* Interactive CSS Bar Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {hourlyData.map((slot, idx) => {
              const barWidth = Math.max(12, Math.round((slot.queue / maxQueue) * 100));
              const isBest = recommendation.recommendedWindow.includes(slot.hour);

              let barColor = '#3b82f6';
              if (isBest) barColor = '#10b981';
              else if (slot.queue > 40) barColor = '#ef4444';
              else if (slot.queue > 25) barColor = '#f59e0b';

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '85px', fontSize: '0.85rem', fontWeight: isBest ? 700 : 500, color: isBest ? '#10b981' : '#334155' }}>
                    {slot.hour}
                  </div>

                  <div style={{ flex: 1, height: '24px', backgroundColor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div
                      style={{
                        width: `${barWidth}%`,
                        height: '100%',
                        backgroundColor: barColor,
                        borderRadius: '6px',
                        transition: 'width 0.5s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '0.5rem',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {slot.queue > 15 ? `${slot.queue} waiting` : ''}
                    </div>
                  </div>

                  <div style={{ width: '80px', textAlign: 'right', fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                    {slot.wait}m wait
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-light)',
            fontSize: '0.8rem',
            color: '#64748b'
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '2px' }} /> Recommended
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '2px' }} /> Moderate
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '2px' }} /> High Peak
              </span>
            </div>
            <span>Based on 67+ citizen entries</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .smart-time-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  Bell,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  Users
} from 'lucide-react';

export default function ServiceDetailPage() {
  const {
    currentService,
    servicesList,
    navigate,
    checklists,
    toggleDocument,
    getChecklistProgress,
    openAlertModal,
    setOfficeFilterService,
    officesList
  } = useApp();

  // Fallback to first service if none selected (e.g. Non-Creamy Layer)
  const service = currentService || servicesList.find(s => s.id === 'non-creamy-layer') || servicesList[0];

  if (!service) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <p>Loading government service specifications...</p>
      </div>
    );
  }

  const { checkedCount, totalCount, percentage } = getChecklistProgress(service);
  const serviceChecklist = checklists[service.id] || {};

  // Offices that provide this service
  const matchingOffices = officesList.filter(o => o.services.includes(service.id));

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      {/* Back button */}
      <button
        onClick={() => navigate('services')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          color: '#64748b',
          fontWeight: 600,
          marginBottom: '1.25rem'
        }}
      >
        <ArrowLeft size={16} /> Back to Government Services Directory
      </button>

      {/* Header Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
          <div>
            <span className="badge badge-neutral" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              {service.category}
            </span>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              SERVICE NAME
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.15rem' }}>
              {service.name}
            </h1>
          </div>

          <div style={{
            display: 'flex',
            gap: '1.25rem',
            backgroundColor: '#f8fafc',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Official Fee</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{service.officialFee || '₹50'}</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Standard Processing</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>{service.estimatedProcessingDays || '15-21 days'}</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            DESCRIPTION
          </div>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '850px' }}>
            {service.description}
          </p>
        </div>

        {/* 3 Main Required Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          <button
            onClick={() => {
              setOfficeFilterService(service.id);
              navigate('offices', { service: service.id });
            }}
            className="btn btn-primary"
          >
            <MapPin size={17} /> Find Nearby Offices
          </button>

          <button
            onClick={() => {
              setOfficeFilterService(service.id);
              navigate('offices', { service: service.id });
            }}
            className="btn btn-secondary"
          >
            <Users size={17} color="#2563eb" /> Check Queue
          </button>

          <button
            onClick={() => {
              const targetOffice = matchingOffices[0] || officesList[0];
              openAlertModal(targetOffice, service);
            }}
            className="btn btn-outline"
          >
            <Bell size={17} /> Set Reminder / Queue Alert
          </button>
        </div>
      </div>

      {/* Main Grid: Checklist (Left) & Before You Visit Guide (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)', gap: '2rem' }} className="service-details-layout">
        {/* Left Column: Interactive Document Checklist */}
        <div>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Citizen Readiness Verification
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  DOCUMENT CHECKLIST
                </h2>
              </div>
              <div style={{
                backgroundColor: percentage === 100 ? '#ecfdf5' : '#eff6ff',
                color: percentage === 100 ? '#065f46' : '#1e40af',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: percentage === 100 ? '1px solid #a7f3d0' : '1px solid #bfdbfe'
              }}>
                {checkedCount} / {totalCount} documents ready ({percentage}%)
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: percentage === 100 ? '#10b981' : '#2563eb'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.75rem', color: '#64748b' }}>
                <span>Incomplete</span>
                <span>{percentage === 100 ? '🎉 All documents verified!' : `${totalCount - checkedCount} items remaining`}</span>
                <span>100% Ready</span>
              </div>
            </div>

            {/* Statutory Disclaimer - Highlighted Requirement */}
            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.8rem', color: '#92400e', lineHeight: 1.5 }}>
                <strong>Statutory Notice:</strong> "Requirements can vary by state, authority and applicant category. Verify the latest requirements with the relevant government authority before visiting."
                <div style={{ marginTop: '0.2rem', color: '#b45309', fontSize: '0.75rem' }}>
                  Prototype Checklist • Non-Authoritative Demo Guide
                </div>
              </div>
            </div>

            {/* Checkbox List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {service.documents && service.documents.map((doc, idx) => {
                const isChecked = !!serviceChecklist[doc.id];
                return (
                  <div
                    key={doc.id || idx}
                    onClick={() => toggleDocument(service.id, doc.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isChecked ? '#f8fafc' : '#ffffff',
                      border: isChecked ? '1.5px solid #2563eb' : '1px solid var(--border-light)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: isChecked ? 'none' : '2px solid var(--border-medium)',
                      backgroundColor: isChecked ? '#2563eb' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {isChecked && <CheckCircle2 size={16} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: isChecked ? '#1e293b' : '#0f172a',
                          textDecoration: isChecked ? 'line-through' : 'none'
                        }}>
                          {doc.title}
                        </span>
                        {doc.mandatory ? (
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#dc2626', backgroundColor: '#fee2e2', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                            Mandatory
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', backgroundColor: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                            If Applicable
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.2rem' }}>
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: "Before You Visit" Guide & Nearest Offices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Before You Visit Box */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="#2563eb" /> Before You Visit
            </h3>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { title: 'Check office working hours', desc: 'Typical public dealing windows close at 2:30 PM for fresh token issuance.' },
                { title: 'Carry originals where required', desc: 'Officer needs original Aadhaar, Caste certificate, and 10th marksheet for spot stamp.' },
                { title: 'Carry photocopies where required', desc: 'Minimum 2 self-attested sets are retained in the physical file record.' },
                { title: 'Verify latest requirements', desc: 'State annual creamy-layer income ceiling rules vary periodically.' },
                { title: 'Check current queue', desc: 'Check CivicQueue AI live status to avoid peak token rush hours.' }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                      {item.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby Issuing Offices for this Service */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                Offices Issuing This Certificate
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                {matchingOffices.length} Locations
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {matchingOffices.slice(0, 3).map(office => (
                <div
                  key={office.id}
                  onClick={() => navigate('office-detail', { officeId: office.id })}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#2563eb'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                      {office.name}
                    </div>
                    <StatusBadge status={office.status} queueCount={office.queue} size="small" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                    <span>{office.distanceKm} km away</span>
                    <span><strong>{office.queue} people</strong> in queue</span>
                    <span>~{office.estimatedWait} min wait</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setOfficeFilterService(service.id);
                navigate('offices', { service: service.id });
              }}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Compare All Nearby Offices <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-details-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import {
  Search,
  FileCheck2,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  TrendingDown,
  Building2,
  ChevronRight,
  Compass,
  AlertTriangle
} from 'lucide-react';

export default function HomePage() {
  const { navigate, officesList, servicesList, setServiceSearchQuery } = useApp();
  const [searchInput, setSearchInput] = useState('');

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchInput.trim()) {
      setServiceSearchQuery(searchInput.trim());
      navigate('services', { search: searchInput.trim() });
    } else {
      navigate('services');
    }
  }

  // Pick top 3 demo offices for the quick glance
  const featuredOffices = officesList.slice(0, 3);

  return (
    <div>
      {/* Interactive Hackathon Guided Demo Callout */}
      <div style={{
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        padding: '0.65rem 0',
        borderBottom: '1px solid #2563eb'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              backgroundColor: '#3b82f6',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}>
              DEMO STORY
            </span>
            <span>Recommended Judge Flow: Non-Creamy Layer Certificate ➜ Bandra Office ➜ Set Alert ➜ Crowd Report</span>
          </div>
          <button
            onClick={() => navigate('services', { search: 'Non Creamy Layer' })}
            style={{
              color: '#93c5fd',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem'
            }}
          >
            Launch Demo Flow <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
        padding: '4rem 0 3.5rem 0',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.25rem',
            border: '1px solid #bfdbfe'
          }}>
            <Sparkles size={15} /> Citizen-First Government Service Intelligence
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#0f172a',
            lineHeight: 1.15,
            marginBottom: '1rem'
          }}>
            CivicQueue AI
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
            fontWeight: 600,
            color: '#2563eb',
            marginBottom: '1rem'
          }}>
            “Know the queue. Carry the right documents. Save your time.”
          </p>

          {/* Subtext */}
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.6,
            maxWidth: '700px',
            margin: '0 auto 2.25rem'
          }}>
            Find government services, check required documents, see live crowd updates, and choose a better time to visit. Avoid closed desks and wasted trips.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} style={{ maxWidth: '640px', margin: '0 auto 2rem' }}>
            <div style={{
              display: 'flex',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '0.4rem 0.5rem 0.4rem 1.25rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-medium)',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Search size={20} color="#64748b" />
              <input
                type="text"
                placeholder="Search services (e.g., Non-Creamy Layer, Caste, Domicile, DL)..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem',
                  color: '#0f172a'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                Search Services
              </button>
            </div>
            {/* Quick search chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', alignSelf: 'center' }}>Popular:</span>
              {['Non-Creamy Layer', 'Caste Certificate', 'Income Certificate', 'Aadhaar', 'Driving Licence'].map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setSearchInput(chip);
                    setServiceSearchQuery(chip);
                    navigate('services', { search: chip });
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.2rem 0.65rem',
                    fontSize: '0.75rem',
                    color: '#334155',
                    fontWeight: 500
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </form>

          {/* 3 Main Action Buttons from requirements */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => navigate('services')}
              className="btn btn-primary btn-lg"
              style={{ minWidth: '220px' }}
            >
              <FileCheck2 size={18} /> Find a Government Service
            </button>

            <button
              onClick={() => navigate('offices')}
              className="btn btn-secondary btn-lg"
              style={{ minWidth: '200px' }}
            >
              <MapPin size={18} color="#2563eb" /> Find Nearby Offices
            </button>

            <button
              onClick={() => navigate('offices')}
              className="btn btn-outline btn-lg"
              style={{ minWidth: '170px' }}
            >
              <Users size={18} /> Check Queue
            </button>
          </div>
        </div>
      </section>

      {/* Live Crowd Snapshot / Instant Comparison */}
      <section style={{ padding: '3rem 0', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#16a34a', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <span className="live-indicator" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                Real-Time Citizen Intel
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                Live Government Office Queues
              </h2>
            </div>
            <button
              onClick={() => navigate('offices')}
              className="btn btn-outline btn-sm"
            >
              View All 10 Tracked Facilities <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {featuredOffices.map(office => (
              <div
                key={office.id}
                className="card"
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <StatusBadge status={office.status} queueCount={office.queue} />
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                      {office.distanceKm} km away
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    {office.name}
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1rem', lineHeight: 1.4 }}>
                    {office.location}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                    backgroundColor: '#f8fafc',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Current Queue</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                        {office.queue} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>people</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Est. Wait Time</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#2563eb' }}>
                        {office.estimatedWait} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>min</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => navigate('office-detail', { officeId: office.id })}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Queue
                  </button>
                  <button
                    onClick={() => navigate('smart-time', { officeId: office.id })}
                    className="btn btn-secondary btn-sm"
                  >
                    Best Time
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Core Feature Cards from Requirements */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Why CivicQueue AI
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
              Solving the 3 Biggest Friction Points in Citizen Services
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Card 1 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <FileCheck2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                1. Document Checklist
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                "Know exactly what documents you need before leaving home." Complete interactive checklists for 18 core certificates, affidavits, and identification requirements.
              </p>
              <button
                onClick={() => navigate('services')}
                style={{
                  color: '#2563eb',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                Browse Document Checklists <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                backgroundColor: '#ecfdf5',
                color: '#10b981',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                2. Queue Intelligence
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                "See citizen-reported queue conditions before visiting." Real-time crowdsourced reports from fellow citizens at the counter with Low, Moderate, and High live tags.
              </p>
              <button
                onClick={() => navigate('offices')}
                style={{
                  color: '#10b981',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                Explore Live Queues <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 3 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                3. Smart Visit Time
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                "Get a recommended time based on queue patterns." Prototype AI engine analyzes historical footfall trends to give you the golden visiting window.
              </p>
              <button
                onClick={() => navigate('smart-time')}
                style={{
                  color: '#d97706',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                View Smart Visit Recommendations <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* "How CivicQueue AI Works" - 5 Steps */}
      <section style={{ padding: '4rem 0', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Simple 5-Step Workflow
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
              How CivicQueue AI Works
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Designed to eliminate multiple round-trips and hours spent waiting at government counters.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            position: 'relative'
          }}>
            {[
              {
                step: 'Step 1',
                title: 'Choose Service',
                desc: 'Select from 18 verified government certificates and citizen workflows.',
                action: () => navigate('services')
              },
              {
                step: 'Step 2',
                title: 'Check Documents',
                desc: 'Check off required originals, affidavits, and photocopies.',
                action: () => navigate('services', { search: 'Non Creamy Layer' })
              },
              {
                step: 'Step 3',
                title: 'Find Office',
                desc: 'Locate designated Sub-Collectorate, Taluka, or RTO offices near you.',
                action: () => navigate('offices')
              },
              {
                step: 'Step 4',
                title: 'Check Queue',
                desc: 'See live waiting headcount and citizen reports before stepping out.',
                action: () => navigate('offices')
              },
              {
                step: 'Step 5',
                title: 'Visit at Better Time',
                desc: 'Pick the recommended low-traffic window or set a short-queue alert.',
                action: () => navigate('smart-time')
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={item.action}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem 1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#2563eb',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem'
                }}>
                  {item.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Civic Trust & Call to Action Banner */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#eff6ff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.75rem' }}>
            Empowering Citizens with Queue Transparency
          </h3>
          <p style={{ color: '#3b82f6', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Contribute a 10-second queue headcount while waiting at your local desk, or set an alert to be notified as soon as the line clears.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('services')}
              className="btn btn-primary"
            >
              Start Exploring Services
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="btn btn-secondary"
            >
              View Crowd Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

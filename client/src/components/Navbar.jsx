import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  FileCheck2,
  MapPin,
  Clock,
  Bell,
  BarChart3,
  ShieldCheck,
  PlusCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { currentScreen, navigate, alerts, openReportModal, officesList } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeAlertsCount = alerts.length;

  function handleNav(screen, params) {
    navigate(screen, params);
    setMobileMenuOpen(false);
  }

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 500,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Civic Trust Ribbon */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        fontSize: '0.75rem',
        padding: '0.35rem 0',
        fontWeight: 500
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981'
            }} />
            <span>Civic-Tech Citizen Initiative • Open Government Services Intelligence</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#cbd5e1' }}>Prototype Demo v1.0</span>
            <button
              onClick={() => handleNav('admin')}
              style={{
                color: '#60a5fa',
                fontWeight: 600,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <ShieldCheck size={13} /> Admin Controls
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNav('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            backgroundColor: '#1e3a8a',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.3)'
          }}>
            <Building2 size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                CivicQueue
              </span>
              <span style={{
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                border: '1px solid #bfdbfe'
              }}>
                AI
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500, lineHeight: 1.1 }}>
              Know the queue. Carry the right documents.
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '0.5rem', alignItems: 'center' }} className="desktop-nav">
          <button
            onClick={() => handleNav('home')}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: currentScreen === 'home' ? '#2563eb' : '#475569',
              backgroundColor: currentScreen === 'home' ? '#eff6ff' : 'transparent'
            }}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('services')}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: currentScreen === 'services' || currentScreen === 'service-detail' ? '#2563eb' : '#475569',
              backgroundColor: currentScreen === 'services' || currentScreen === 'service-detail' ? '#eff6ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FileCheck2 size={16} /> Services
          </button>

          <button
            onClick={() => handleNav('offices')}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: currentScreen === 'offices' || currentScreen === 'office-detail' ? '#2563eb' : '#475569',
              backgroundColor: currentScreen === 'offices' || currentScreen === 'office-detail' ? '#eff6ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <MapPin size={16} /> Offices
          </button>

          <button
            onClick={() => handleNav('smart-time')}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: currentScreen === 'smart-time' ? '#2563eb' : '#475569',
              backgroundColor: currentScreen === 'smart-time' ? '#eff6ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={15} color="#2563eb" /> Smart Visit Time
          </button>

          <button
            onClick={() => handleNav('alerts')}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: currentScreen === 'alerts' ? '#2563eb' : '#475569',
              backgroundColor: currentScreen === 'alerts' ? '#eff6ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative'
            }}
          >
            <Bell size={16} /> My Alerts
            {activeAlertsCount > 0 && (
              <span style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                padding: '0.1rem 0.4rem',
                marginLeft: '0.2rem'
              }}>
                {activeAlertsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('dashboard')}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: currentScreen === 'dashboard' ? '#2563eb' : '#475569',
              backgroundColor: currentScreen === 'dashboard' ? '#eff6ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <BarChart3 size={16} /> Dashboard
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => {
              const defaultOffice = officesList[0] || null;
              openReportModal(defaultOffice);
            }}
            className="btn btn-outline btn-sm"
            style={{ display: 'none' }}
            id="desktop-report-btn"
          >
            <PlusCircle size={15} /> Report Queue
          </button>

          <button
            onClick={() => handleNav('admin')}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem', border: '1px solid #cbd5e1' }}
          >
            <ShieldCheck size={14} color="#2563eb" /> Admin Demo
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              color: '#334155'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-light)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => handleNav('home')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('services')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <FileCheck2 size={16} /> Services & Checklist
          </button>
          <button
            onClick={() => handleNav('offices')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <MapPin size={16} /> Find Nearby Offices
          </button>
          <button
            onClick={() => handleNav('smart-time')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <Sparkles size={16} color="#2563eb" /> Smart Visit Time (AI)
          </button>
          <button
            onClick={() => handleNav('alerts')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <Bell size={16} /> My Alerts ({activeAlertsCount})
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <BarChart3 size={16} /> Live Dashboard
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openReportModal(officesList[0] || null);
            }}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem' }}
          >
            <PlusCircle size={16} /> Report Current Queue
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          #desktop-report-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

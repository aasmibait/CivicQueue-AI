import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data';
import { Search, FileCheck2, ArrowRight, MapPin, CheckCircle, Clock, X } from 'lucide-react';

export default function ServicesPage() {
  const {
    servicesList,
    navigate,
    serviceSearchQuery,
    setServiceSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setOfficeFilterService
  } = useApp();

  const [inputVal, setInputVal] = useState(serviceSearchQuery);

  function handleSearchChange(e) {
    const val = e.target.value;
    setInputVal(val);
    setServiceSearchQuery(val);
  }

  function handleClearSearch() {
    setInputVal('');
    setServiceSearchQuery('');
    setSelectedCategory('All');
  }

  // Filter services
  const filteredServices = servicesList.filter(service => {
    const matchCategory = selectedCategory === 'All' || service.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const query = (serviceSearchQuery || '').toLowerCase().trim();
    const matchQuery = !query ||
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          <FileCheck2 size={16} /> Official Citizen Services Directory
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Government Services & Document Checklists
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '750px', marginTop: '0.35rem' }}>
          Select any public certificate or welfare service to see the verified document readiness checklist, processing times, and nearby issuing offices.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            flex: 1,
            minWidth: '280px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem 1rem'
          }}>
            <Search size={18} color="#64748b" />
            <input
              type="text"
              placeholder="Search by name (e.g. Non Creamy Layer, Caste, Ration, Driving Licence)..."
              value={inputVal}
              onChange={handleSearchChange}
              style={{
                border: 'none',
                background: 'transparent',
                width: '100%',
                outline: 'none',
                color: '#0f172a'
              }}
            />
            {inputVal && (
              <button onClick={handleClearSearch} style={{ color: '#94a3b8' }}>
                <X size={16} />
              </button>
            )}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
            Showing {filteredServices.length} of {servicesList.length} services
          </div>
        </div>

        {/* Categories Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  backgroundColor: isSelected ? '#1e3a8a' : '#f1f5f9',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1px solid #1e3a8a' : '1px solid var(--border-light)',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Search size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
            No matching government service found.
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            We couldn't find any service matching "<strong>{inputVal}</strong>". Try clearing your search or browsing all categories.
          </p>
          <button onClick={handleClearSearch} className="btn btn-secondary">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filteredServices.map(service => {
            const docCount = service.documents ? service.documents.length : 0;
            return (
              <div
                key={service.id}
                className="card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                      {service.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle size={13} /> {docCount} Required Docs
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {service.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {service.description}
                  </p>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#64748b',
                    padding: '0.6rem 0',
                    borderTop: '1px solid var(--border-light)',
                    marginBottom: '1rem'
                  }}>
                    <span>Fee: <strong>{service.officialFee || 'Free / Nominal'}</strong></span>
                    <span>Tatkal/Regular: <strong>{service.estimatedProcessingDays || '7-15 days'}</strong></span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      onClick={() => navigate('service-detail', { serviceId: service.id })}
                      className="btn btn-primary btn-sm"
                    >
                      <FileCheck2 size={15} /> View Checklist
                    </button>
                    <button
                      onClick={() => {
                        setOfficeFilterService(service.id);
                        navigate('offices', { service: service.id });
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      <MapPin size={15} color="#2563eb" /> Find Offices
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

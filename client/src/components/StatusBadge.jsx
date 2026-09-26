import React from 'react';

export default function StatusBadge({ status, queueCount, showDot = true, size = 'normal' }) {
  let badgeClass = 'badge-neutral';
  let dotClass = '';
  let label = status || 'Moderate Queue';

  const normalized = (status || '').toLowerCase();
  if (normalized.includes('low') || (queueCount !== undefined && queueCount <= 10)) {
    badgeClass = 'badge-low';
    dotClass = 'dot-low';
    label = 'Low Queue';
  } else if (normalized.includes('high') || (queueCount !== undefined && queueCount >= 26)) {
    badgeClass = 'badge-high';
    dotClass = 'dot-high';
    label = 'High Queue';
  } else {
    badgeClass = 'badge-moderate';
    dotClass = 'dot-moderate';
    label = 'Moderate Queue';
  }

  const paddingStyle = size === 'small' ? { padding: '0.2rem 0.5rem', fontSize: '0.7rem' } : {};

  return (
    <span className={`badge ${badgeClass}`} style={paddingStyle}>
      {showDot && <span className={`status-dot ${dotClass}`} />}
      {label}
    </span>
  );
}

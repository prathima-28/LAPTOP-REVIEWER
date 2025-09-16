import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({ label, value, reason }) {
  const color = value >= 80 ? '#16a34a' : (value >= 60 ? '#f59e0b' : '#ef4444');
  return (
    <div className="progress-row card" style={{ padding: '10px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div style={{ fontWeight: 700 }}>{value}%</div>
      </div>
      <div className="bar" style={{ marginTop: 8 }}>
        <div className="fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <div className="reason" style={{ marginTop: 6, color: '#374151' }}>{reason}</div>
    </div>
  );
}

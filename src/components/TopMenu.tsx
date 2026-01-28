import React from 'react'

export default function TopMenu() {
  const items = ['Tech', 'Healthcare', 'Finance', 'Consumer']
  return (
    <div className="top-menu" style={{ backdropFilter: 'blur(20px) saturate(120%)', WebkitBackdropFilter: 'blur(20px) saturate(120%)', background: 'linear-gradient(180deg, rgba(255,255,255,0.66), rgba(255,255,255,0.46))', border: '1px solid rgba(255,255,255,0.6)' }}>
      <div className="left">
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginRight: 8 }}>Mimosa</div>
        {items.map((it, idx) => (
          <div key={it} className={`menu-item ${idx === 0 ? 'active' : ''}`} style={{ background: idx === 0 ? 'rgba(255,255,255,0.4)' : 'transparent' }}>{it}{idx === 0 && <span className="menu-indicator" />}</div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ fontWeight: 600, color: 'var(--muted)' }}>USD</div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.76))', boxShadow: '0 6px 20px rgba(15,23,36,0.06)' }} />
      </div>
    </div>
  )
}

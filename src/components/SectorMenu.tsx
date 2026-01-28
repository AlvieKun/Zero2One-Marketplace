import React from 'react'

function useWindowWidth() {
  const [w, setW] = React.useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024)
  React.useEffect(() => {
    const onR = () => setW(window.innerWidth)
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [])
  return w
}

export default function SectorMenu({ sectors, activeIndex, onSelect }: { sectors: { id: number; name: string }[]; activeIndex: number; onSelect: (i: number) => void }) {
  const icons: Record<string, JSX.Element> = {
    Technology: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2"/></svg>
    ),
    Healthcare: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    Financials: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 10h18M6 15h12M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    Consumer: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 7h12l-1.5 9h-9L6 7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 4a2 2 0 1 1 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    Energy: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    )
  }

  const winW = useWindowWidth()
  const activeWidth = winW < 640 ? 120 : 160

  return (
    <div className="top-menu sector-menu">
      <div className="top-menu-center">
        <div className="top-menu-inner">
          <div className="left" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', display: 'flex', gap: 8, alignItems: 'center', padding: '6px' }}>
        {sectors.map((s, idx) => {
          const active = idx === activeIndex
          return (
            <button
              key={s.id}
              onClick={() => onSelect(idx)}
              className={`menu-item ${active ? 'active' : ''}`}
              style={{
                transition: 'all 260ms cubic-bezier(.2,.9,.2,1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                overflow: 'hidden',
                padding: active ? '8px 14px' : '6px',
                width: active ? activeWidth : 44,
                minWidth: active ? activeWidth : 44,
                height: 48,
                borderRadius: 999,
                background: active ? 'rgba(255,255,255,0.46)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--muted)'
              }}
            >
              <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icons[s.name as keyof typeof icons]}</div>
              <div style={{ opacity: active ? 1 : 0, transition: 'opacity 220ms ease', whiteSpace: 'nowrap', fontWeight: 700 }}>{s.name}</div>
              {active && <div className="menu-indicator" />}
            </button>
          )
        })}
          </div>
        </div>
      </div>
      {/* compact nav - no extra right label */}
    </div>
  )
}

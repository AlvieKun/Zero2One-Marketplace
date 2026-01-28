import React from 'react'

type GlassCardProps = {
  ticker: string
  company: string
  price: string
  change: number
  isActive?: boolean
  style?: React.CSSProperties
}

export default function GlassCard({ ticker, company, price, change, isActive, style }: GlassCardProps) {
  const activeBg = isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.62)'
  const border = isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.5)'
  const accent = 'var(--accent)'
  const changeColor = change > 0 ? '#16a34a' : change < 0 ? '#ef4444' : 'rgba(15,23,36,0.72)'

  return (
    <div
      className={`relative w-72 h-44 glass-card-root transform-gpu ${isActive ? 'shadow-active' : ''}`}
      style={{ background: `linear-gradient(180deg, ${isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.86)'}, rgba(255,255,255,0.78))`, border: `1px solid ${border}`, boxShadow: isActive ? '0 20px 50px rgba(255,160,110,0.10), 0 0 90px rgba(255,68,0,0.10)' : '0 8px 24px rgba(15,23,36,0.04)', backdropFilter: 'blur(28px) saturate(140%) contrast(102%)', WebkitBackdropFilter: 'blur(28px) saturate(140%) contrast(102%)', ...style }}
    >
      {/* top sheen */}
      <div className="glass-card-sheen" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01) 34%, transparent 60%)' }} />

      {/* inner frosted plate that distorts background */}
      <div className="glass-inner-plate" style={{ background: isActive ? 'linear-gradient(180deg, rgba(255,255,255,0.36), rgba(250,250,250,0.22))' : 'linear-gradient(180deg, rgba(255,255,255,0.28), rgba(250,250,250,0.16))', backdropFilter: 'blur(22px) saturate(140%)', WebkitBackdropFilter: 'blur(22px) saturate(140%)' }} />

      {/* small orange dot accent for active */}
      {isActive && <div className="accent-dot" style={{ background: accent }} />}

      {/* active glow layer */}
      {isActive && (
        <div className="active-glow" style={{ background: 'radial-gradient(60% 50% at 50% 40%, rgba(255,68,0,0.18), rgba(200,160,255,0.06), transparent 60%)', filter: 'blur(28px)', zIndex: 2 }} />
      )}

      {/* subtle inner glow */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, boxShadow: isActive ? 'inset 0 1px 40px rgba(255,255,255,0.03)' : 'inset 0 1px 30px rgba(255,255,255,0.02)', borderRadius: 18, pointerEvents: 'none' }} />

      <div className="relative p-4 h-full flex flex-col justify-between z-10">
        <div className="flex items-start justify-between">
          <div>
            <div className={isActive ? 'text-xl' : 'text-lg'} style={{ color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '-0.02em' }}>{ticker}</div>
            <div className="text-sm mt-1" style={{ color: 'var(--muted)', fontWeight: 500 }}>{company}</div>
          </div>

          <div className="text-right">
            <div className="font-medium" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{price}</div>
            <div className="text-sm mt-1" style={{ color: changeColor, fontWeight: 600 }}>{change > 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs mimosa-subtle">Market</div>
          <div className="text-xs mimosa-subtle">Vol: —</div>
        </div>
      </div>
    </div>
  )
}

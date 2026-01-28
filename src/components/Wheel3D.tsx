import React, { useEffect, useRef, useState } from 'react'
import GlassCard from './GlassCard'

type Item = { id: number; ticker: string; company: string; price: string; change: number }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

export default function Wheel3D({ items, resetSignal }: { items: Item[]; resetSignal?: number }) {
  // card sizing and spacing constants
  const CARD_HEIGHT = 220 // base card height in px (visual content area)
  const GAP = 20
  const MAX_SCALE = 1.22 // should match the max scale used below
  const STEP_Y = CARD_HEIGHT * MAX_SCALE + GAP // ensure spacing accounts for scaled active card

  const containerRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef(0)
  const animatedRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [, force] = useState(0)

  // animation loop: lerp animatedRef toward targetRef
  useEffect(() => {
    // when resetSignal changes, nudge the wheel back to the first card smoothly
    if (typeof resetSignal !== 'undefined') {
      targetRef.current = 0
    }
    const tick = () => {
      const t = targetRef.current
      const a = animatedRef.current
      // ease more aggressively when moving, but keep smooth when close
      const ease = 0.12
      const next = a + (t - a) * ease
      animatedRef.current = Math.abs(t - next) < 0.0001 ? t : next
      force((s) => s + 1) // trigger render
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // wheel handler: change targetRef by delta
  useEffect(() => {
    const el = containerRef.current!
    if (!el) return

    let lastY = 0
    let isDown = false
    let wheelTimeout: any = null

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()

      const delta = e.deltaY
      // dampen mouse wheel heavily, allow small smooth trackpad movement
      let step = 0
      if (Math.abs(delta) > 50) {
        // conventional mouse wheel notch -> move about one card
        step = Math.sign(delta) * 0.9
      } else {
        // trackpad / small movement -> fractional movement but slow
        step = Math.sign(delta) * Math.min(0.45, Math.abs(delta) / 900)
      }

      // apply step but clamp per event and overall bounds
      targetRef.current = clamp(targetRef.current + step, 0, items.length - 1)

      // debounce end of wheel: snap to nearest card when user stops
      if (wheelTimeout) clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        // snap targetIndex to nearest integer smoothly
        targetRef.current = Math.round(targetRef.current)
      }, 140)
    }

    const onPointerDown = (e: PointerEvent) => {
      // handle mouse and touch; prevent default so touch doesn't scroll the page
      try { e.preventDefault() } catch {}

      lastY = e.clientY
      isDown = true
      try { (e.target as Element).setPointerCapture?.((e as any).pointerId) } catch (err) {}
      document.documentElement.style.cursor = 'grabbing'
      document.documentElement.style.userSelect = 'none'
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return
      try { e.preventDefault() } catch {}
      // drag to scroll; dampen the drag effect
      // use slightly different sensitivity for touch vs mouse
      const isTouch = (e as any).pointerType === 'touch'
      const sensitivity = isTouch ? 48 : 60
      const dy = (e.clientY - lastY) / sensitivity
      lastY = e.clientY
      targetRef.current = clamp(targetRef.current - dy, 0, items.length - 1)
      // debounce snap while dragging
      if (wheelTimeout) clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => (targetRef.current = Math.round(targetRef.current)), 160)
    }
    const onPointerUp = (e: PointerEvent) => {
      isDown = false
      try { (e.target as Element).releasePointerCapture?.((e as any).pointerId) } catch (err) {}
      document.documentElement.style.cursor = ''
      document.documentElement.style.userSelect = ''
      // snap to nearest card when pointer release
      targetRef.current = Math.round(targetRef.current)
    }
    const onPointerCancel = () => {
      isDown = false
      document.documentElement.style.cursor = ''
      document.documentElement.style.userSelect = ''
      targetRef.current = Math.round(targetRef.current)
    }

    // disable default touch-action on container so pointer events are fully handled
    try { (el as HTMLElement).style.touchAction = 'none' } catch {}
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerCancel)

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerCancel)
      try { (el as HTMLElement).style.touchAction = '' } catch {}
      if (wheelTimeout) clearTimeout(wheelTimeout)
    }
  }, [items.length])

  const activeFloat = animatedRef.current
  const activeIndex = Math.round(activeFloat)

  // render a window of indices to keep at least 5 visible (active ±2)
  const visibleRange = 3
  const minIndex = Math.max(0, Math.floor(activeFloat) - visibleRange)
  const maxIndex = Math.min(items.length - 1, Math.ceil(activeFloat) + visibleRange)

  return (
    <div className="w-full h-full flex items-start justify-center relative">
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl flex items-start justify-center"
        style={{ perspective: '1200px', height: 'calc(100vh - 96px)', paddingTop: STEP_Y }}
      >
        <div style={{ transformStyle: 'preserve-3d' }} className="w-full h-full flex items-start justify-center">
          {items.slice(minIndex, maxIndex + 1).map((it, idx) => {
            const i = idx + minIndex
            const offset = i - activeFloat
            const absOff = Math.abs(offset)

            // use STEP_Y so cards never overlap vertically even when scaled
            const translateY = offset * STEP_Y
            const rotateX = clamp(offset * 14, -55, 55) // slightly reduced rotateX to avoid edge collisions
            const translateZ = -absOff * 140
            const scale = clamp(MAX_SCALE - absOff * 0.12, 0.72, MAX_SCALE)
            const opacity = clamp(1 - absOff * 0.18, 0.28, 1)
            const blur = clamp(absOff * 1.2, 0, 6)

            const transform = `translate3d(0px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`

            const isActive = Math.abs(i - activeFloat) < 0.5

            const style: React.CSSProperties = {
              transform,
              transition: 'transform 220ms cubic-bezier(.2,.9,.2,1), opacity 200ms ease, filter 120ms ease-out',
              opacity: isActive ? 1 : opacity * 0.95,
              filter: `blur(${blur}px) saturate(${isActive ? 1.06 : 0.86})`,
              zIndex: isActive ? 2000 : Math.round(1000 - absOff * 10),
              pointerEvents: isActive ? 'auto' : 'none'
            }

            return (
              <div
                key={it.id}
                className="absolute flex items-center justify-center"
                style={{ willChange: 'transform, opacity, filter', ...style }}
              >
                <GlassCard ticker={it.ticker} company={it.company} price={it.price} change={it.change} isActive={isActive} />
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-6 text-sm text-white/60 select-none">Scroll to explore</div>
      </div>
    </div>
  )
}

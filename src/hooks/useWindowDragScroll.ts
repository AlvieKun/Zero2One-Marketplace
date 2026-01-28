import { useEffect, useRef } from 'react'

type Options = {
  enabled?: boolean
}

export default function useWindowDragScroll(options: Options = {}) {
  const { enabled = true } = options
  const state = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    scrollX: 0,
    scrollY: 0
  })

  useEffect(() => {
    if (!enabled) return

    const onPointerDown = (e: PointerEvent) => {
      // only enable for mouse (desktop) to avoid interfering with touch native scrolling
      if (e.pointerType === 'touch') return

      state.current.isDown = true
      state.current.startX = e.clientX
      state.current.startY = e.clientY
      state.current.scrollX = window.scrollX || window.scrollLeft || 0
      state.current.scrollY = window.scrollY || window.scrollTop || 0
      // capture the pointer to continue receiving move/up events
      try {
        // @ts-ignore - may not exist on document
        (e.target as Element).setPointerCapture?.(e.pointerId)
      } catch {}
      document.documentElement.style.cursor = 'grabbing'
      document.documentElement.style.userSelect = 'none'
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!state.current.isDown) return
      const dx = e.clientX - state.current.startX
      const dy = e.clientY - state.current.startY
      window.scrollTo({ left: Math.max(0, state.current.scrollX - dx), top: Math.max(0, state.current.scrollY - dy) })
    }

    const endDrag = (e: PointerEvent) => {
      if (!state.current.isDown) return
      state.current.isDown = false
      try {
        (e.target as Element).releasePointerCapture?.(e.pointerId)
      } catch {}
      document.documentElement.style.cursor = ''
      document.documentElement.style.userSelect = ''
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
      document.documentElement.style.cursor = ''
      document.documentElement.style.userSelect = ''
    }
  }, [enabled])
}

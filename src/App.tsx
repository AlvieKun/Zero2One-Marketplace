import React from 'react'
import Wheel3D from './components/Wheel3D'
import SectorMenu from './components/SectorMenu'
import sectors from './data'

const sample = [
  { id: 0, ticker: 'AAPL', company: 'Apple Inc.', price: '$174.55', change: 1.24 },
  { id: 1, ticker: 'MSFT', company: 'Microsoft Corp.', price: '$386.12', change: -0.42 },
  { id: 2, ticker: 'GOOGL', company: 'Alphabet Inc.', price: '$132.04', change: 0.88 },
  { id: 3, ticker: 'AMZN', company: 'Amazon.com, Inc.', price: '$146.20', change: -1.12 },
  { id: 4, ticker: 'TSLA', company: 'Tesla, Inc.', price: '$245.33', change: 2.18 },
  { id: 5, ticker: 'NVDA', company: 'NVIDIA Corp.', price: '$980.12', change: 0.67 },
  { id: 6, ticker: 'NFLX', company: 'Netflix, Inc.', price: '$473.88', change: -0.33 },
  { id: 7, ticker: 'META', company: 'Meta Platforms', price: '$315.44', change: 1.05 },
  { id: 8, ticker: 'INTC', company: 'Intel Corp.', price: '$32.21', change: -0.77 },
  { id: 9, ticker: 'DIS', company: 'Walt Disney Co.', price: '$95.12', change: 0.12 },
  { id: 10, ticker: 'UBER', company: 'Uber Technologies', price: '$39.88', change: -0.05 }
]

import useWindowDragScroll from './hooks/useWindowDragScroll'

export default function App() {
  const [activeSector, setActiveSector] = React.useState(0)
  const [isSwitching, setIsSwitching] = React.useState(false)
  const [resetSignal, setResetSignal] = React.useState(0)
  const [prevSector, setPrevSector] = React.useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeSector) return
    // start transition
    setPrevSector(activeSector)
    setIsSwitching(true)

    setTimeout(() => {
      setActiveSector(index)
      // reset wheel to first card
      setResetSignal((s) => s + 1)
      // finish transition after crossfade
      setTimeout(() => {
        setIsSwitching(false)
        setPrevSector(null)
      }, 340)
    }, 180)
  }
  // enable mouse drag-to-scroll for desktop; mobile keeps native touch scrolling
  useWindowDragScroll()

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      {/* global full-bleed background blobs (single environment for all sectors) */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      <div className="nav-fixed-wrapper">
        <SectorMenu sectors={sectors} activeIndex={activeSector} onSelect={handleSelect} />
      </div>

      <div className="w-full max-w-4xl relative" style={{ paddingTop: 96 }}>
        <div className={`wheel-wrapper ${isSwitching ? 'fading' : ''} main-content`}>
          <Wheel3D items={sectors[activeSector].stocks} resetSignal={resetSignal} />
        </div>
      </div>
    </div>
  )
}

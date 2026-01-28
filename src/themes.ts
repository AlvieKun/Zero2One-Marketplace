export type Blob = {
  id: string
  left?: string
  top?: string
  width: string
  height: string
  gradient: string
  blur?: number
  opacity?: number
}

export type SectorTheme = {
  id: number
  name: string
  base: string
  blobs: Blob[]
}

export const sectorThemes: SectorTheme[] = [
  {
    id: 0,
    name: 'Technology',
    base: 'linear-gradient(180deg, rgba(224,242,255,0.9), rgba(245,240,255,0.9))',
    blobs: [
      { id: 't1', left: '-320px', top: '-200px', width: '920px', height: '720px', gradient: 'radial-gradient(60% 60% at 30% 35%, rgba(176,222,255,0.85), rgba(200,190,255,0.55), rgba(255,210,190,0.08))', blur: 100, opacity: 0.7 },
      { id: 't2', left: '160px', top: '-160px', width: '820px', height: '820px', gradient: 'radial-gradient(60% 60% at 60% 60%, rgba(220,200,255,0.78), rgba(200,240,255,0.44))', blur: 120, opacity: 0.6 },
      { id: 't3', left: '80px', top: '220px', width: '760px', height: '660px', gradient: 'radial-gradient(60% 60% at 40% 30%, rgba(255,230,210,0.24), rgba(200,230,255,0.18))', blur: 100, opacity: 0.5 },
      { id: 't4', left: '420px', top: '120px', width: '520px', height: '520px', gradient: 'radial-gradient(60% 60% at 40% 40%, rgba(255,68,0,0.12), rgba(255,160,120,0.06))', blur: 120, opacity: 0.45 }
    ]
  },
  {
    id: 1,
    name: 'Healthcare',
    base: 'linear-gradient(180deg, rgba(255,245,250,0.95), rgba(245,250,255,0.95))',
    blobs: [
      { id: 'h1', left: '-260px', top: '-180px', width: '860px', height: '700px', gradient: 'radial-gradient(60% 60% at 30% 35%, rgba(220,240,255,0.84), rgba(230,220,255,0.6))', blur: 110, opacity: 0.68 },
      { id: 'h2', left: '200px', top: '-120px', width: '780px', height: '760px', gradient: 'radial-gradient(60% 60% at 60% 60%, rgba(255,220,240,0.6), rgba(210,230,255,0.36))', blur: 120, opacity: 0.58 },
      { id: 'h3', left: '60px', top: '240px', width: '700px', height: '600px', gradient: 'radial-gradient(60% 60% at 40% 30%, rgba(255,235,220,0.22), rgba(220,240,255,0.14))', blur: 90, opacity: 0.52 },
      { id: 'h4', left: '420px', top: '100px', width: '500px', height: '500px', gradient: 'radial-gradient(60% 60% at 40% 40%, rgba(255,68,0,0.08), rgba(255,160,120,0.04))', blur: 110, opacity: 0.4 }
    ]
  },
  {
    id: 2,
    name: 'Financials',
    base: 'linear-gradient(180deg, rgba(255,250,235,0.95), rgba(245,255,250,0.95))',
    blobs: [
      { id: 'f1', left: '-300px', top: '-200px', width: '900px', height: '710px', gradient: 'radial-gradient(60% 60% at 30% 35%, rgba(255,245,220,0.85), rgba(230,220,255,0.48))', blur: 110, opacity: 0.7 },
      { id: 'f2', left: '180px', top: '-140px', width: '820px', height: '800px', gradient: 'radial-gradient(60% 60% at 60% 60%, rgba(220,230,255,0.7), rgba(200,240,255,0.36))', blur: 120, opacity: 0.62 },
      { id: 'f3', left: '120px', top: '220px', width: '740px', height: '640px', gradient: 'radial-gradient(60% 60% at 40% 30%, rgba(255,225,215,0.26), rgba(200,230,255,0.16))', blur: 96, opacity: 0.52 },
      { id: 'f4', left: '440px', top: '140px', width: '520px', height: '520px', gradient: 'radial-gradient(60% 60% at 40% 40%, rgba(255,68,0,0.12), rgba(255,160,120,0.05))', blur: 110, opacity: 0.46 }
    ]
  },
  {
    id: 3,
    name: 'Consumer',
    base: 'linear-gradient(180deg, rgba(240,255,250,0.95), rgba(255,250,255,0.95))',
    blobs: [
      { id: 'c1', left: '-280px', top: '-160px', width: '860px', height: '660px', gradient: 'radial-gradient(60% 60% at 30% 35%, rgba(220,240,255,0.8), rgba(255,230,240,0.5))', blur: 100, opacity: 0.66 },
      { id: 'c2', left: '200px', top: '-140px', width: '800px', height: '760px', gradient: 'radial-gradient(60% 60% at 60% 60%, rgba(255,220,235,0.6), rgba(210,230,255,0.34))', blur: 120, opacity: 0.58 },
      { id: 'c3', left: '80px', top: '200px', width: '700px', height: '600px', gradient: 'radial-gradient(60% 60% at 40% 30%, rgba(255,235,220,0.22), rgba(200,240,255,0.14))', blur: 92, opacity: 0.54 },
      { id: 'c4', left: '420px', top: '120px', width: '520px', height: '520px', gradient: 'radial-gradient(60% 60% at 40% 40%, rgba(255,68,0,0.09), rgba(255,160,120,0.04))', blur: 110, opacity: 0.42 }
    ]
  },
  {
    id: 4,
    name: 'Energy',
    base: 'linear-gradient(180deg, rgba(255,250,240,0.95), rgba(255,245,255,0.95))',
    blobs: [
      { id: 'e1', left: '-320px', top: '-220px', width: '940px', height: '740px', gradient: 'radial-gradient(60% 60% at 30% 35%, rgba(255,240,220,0.85), rgba(200,220,255,0.48))', blur: 112, opacity: 0.7 },
      { id: 'e2', left: '200px', top: '-160px', width: '820px', height: '800px', gradient: 'radial-gradient(60% 60% at 60% 60%, rgba(220,230,255,0.7), rgba(240,220,255,0.36))', blur: 120, opacity: 0.6 },
      { id: 'e3', left: '100px', top: '240px', width: '720px', height: '640px', gradient: 'radial-gradient(60% 60% at 40% 30%, rgba(255,230,210,0.24), rgba(200,230,255,0.18))', blur: 96, opacity: 0.5 },
      { id: 'e4', left: '440px', top: '140px', width: '520px', height: '520px', gradient: 'radial-gradient(60% 60% at 40% 40%, rgba(255,68,0,0.14), rgba(255,160,120,0.06))', blur: 120, opacity: 0.46 }
    ]
  }
]

export default sectorThemes

'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useAnimationFrame, useReducedMotion } from 'motion/react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STAGES } from '@/lib/capability-map'

// The lifecycle wheel: a port of the handoff in wheel/ (Concept D v2). A
// 25.5 s looping motion graphic on a 1920×1080 artboard, scaled to fit its
// container. Seven equal segments, stage 4 at three o'clock; three rings
// (designed hands-on, led as design manager, set platform strategy) draw
// their filled segments in turn while the legend and the products around
// the wheel appear; a summary title closes the loop. Geometry, cues and
// easings follow concept-wheel-v2.jsx exactly. Colours and type are the
// site's own tokens (the handoff's hex values are within a shade of them).
//
// Reduced motion shows the summary frame still. Below 1024px the caller's
// fallback (the cards and matrix) renders instead, as the handoff asks.

// The handoff's cue sheet, shifted by the 2.5 s estate opener added in
// front of it (see Estate below). Scene starts in seconds.
const OPENER = 2.5
const TOTAL = 25.5 + OPENER
const CUES = {
  Estate: 0,
  Lifecycle: 2.5 + OPENER,
  Designed: 5.5 + OPENER,
  Manager: 10.5 + OPENER,
  Strategy: 16 + OPENER,
  Summary: 20.5 + OPENER,
}
/** The frame shown under reduced motion: everything in, before the loop fades. */
const STILL_T = CUES.Summary + 2.9

// Scale, each kind encoded once and never in the ring geometry.
// Estate: 320,000 tables in the lake (public, AWS re:Invent 2025), drawn as
// an isotype of 320 dots, one per 1,000 tables, that resolves into the
// wheel's empty track. Reach: people using the platform each month, a
// sourced series (FY24 review; analytics dashboard captured May 22, 2026),
// shown as a date-stamped counter in the centre. Organisational scale: one
// line per legend ring. Outcomes stay on the cards and case study pages.
const ESTATE = { dots: 320, perDot: 1000, label: '320,000 tables in the data lake', note: 'each dot is 1,000 tables' }
const REACH = {
  caption: 'people using the platform each month',
  designed: { from: 1886, to: 2664, by: 'by Jul 2024' },
  manager: { from: 2664, to: 6673, by: 'by Mar 2026' },
}
const SUMMARY_LINE = 'Across 320,000 tables, for 6,673 people a month.'

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const prog = (T: number, s: number, d: number) => clamp((T - s) / d, 0, 1)
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3)
const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
const enter = (T: number, s: number, d = 0.6) => easeOutCubic(prog(T, s, d))
const draw = (T: number, s: number, d = 0.6) => easeInOutCubic(prog(T, s, d))
const windowed = (T: number, s: number, e: number, d = 0.5) => enter(T, s, d) * (1 - enter(T, e - d * 0.5, d))

const GREEN = 'var(--track-ic)'
const PURPLE = 'var(--track-management)'
const ORANGE = 'var(--track-strategy)'
const EMPTY = 'var(--stripe-a)'

interface Ring {
  label: string
  tag: string | null
  /** Organisational scale for this ring, one line, shown with the legend item. */
  scale: string | null
  color: string
  f: boolean[]
  rad: number
  s: number
  e: number
}

const RINGS: Ring[] = [
  { label: 'Designed hands-on', tag: '2021–24', scale: null, color: GREEN, f: STAGES.map((s) => s.mine === 'ic'), rad: 170, s: CUES.Designed + 0.8, e: CUES.Manager },
  { label: 'Led as design manager', tag: '2024–26', scale: 'One designer for every 85 engineers', color: PURPLE, f: STAGES.map((s) => s.mine !== 'none'), rad: 225, s: CUES.Manager + 0.8, e: CUES.Strategy },
  { label: 'Set platform strategy', tag: null, scale: '7 of 7 stages · 1,600 data products certified in FY24', color: ORANGE, f: STAGES.map(() => true), rad: 280, s: CUES.Strategy + 0.6, e: CUES.Summary },
]
const INITIATIVES = [
  { name: 'Clean-data standard', s: CUES.Strategy + 1.4 },
  { name: 'Fine-grained access control', s: CUES.Strategy + 1.7 },
]
const TITLE_A = 'Led design and strategy for Intuit’s data platform'  // text alternative only
const TITLE_B = 'Designed it. Led it. Set the strategy.'

const CX = 760
const CY = 600
const SEG = (Math.PI * 2) / 7
const GAP = 0.035
const START = -3 * SEG - SEG / 2

function arc(r: number, a0: number, a1: number) {
  const p = (a: number) => [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1}`
}

/** 0 = designed hands-on, 1 = led as manager, -1 = outside design's scope. */
const owner = (i: number) => (RINGS[0].f[i] ? 0 : RINGS[1].f[i] ? 1 : -1)

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

function useScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1920))
    ro.observe(el)
    setScale(el.clientWidth / 1920)
    return () => ro.disconnect()
  }, [ref])
  return scale
}

// The estate isotype: a 20 by 16 grid of dots centred on the wheel. Each dot
// later travels to a point on one of the three empty tracks and fades as
// the tracks fade in, so the estate becomes the lifecycle.
const GRID_COLS = 20
const GRID_STEP = 20
const DOTS = Array.from({ length: ESTATE.dots }, (_, i) => {
  const col = i % GRID_COLS
  const row = Math.floor(i / GRID_COLS)
  const rows = ESTATE.dots / GRID_COLS
  const gx = CX - ((GRID_COLS - 1) * GRID_STEP) / 2 + col * GRID_STEP
  const gy = CY - ((rows - 1) * GRID_STEP) / 2 + row * GRID_STEP
  const angle = START + (i / ESTATE.dots) * Math.PI * 2
  const radius = [170, 225, 280][i % 3]
  return { gx, gy, tx: CX + radius * Math.cos(angle), ty: CY + radius * Math.sin(angle) }
})

function Estate({ T }: { T: number }) {
  const labelIn = enter(T, 0.9, 0.6)
  const labelOut = enter(T, CUES.Lifecycle - 0.6, 0.4)
  if (T > CUES.Lifecycle + 1.2) return null
  return (
    <>
      <svg width="1920" height="1080" className="absolute inset-0">
        {DOTS.map((d, i) => {
          const appear = enter(T, 0.2 + i * 0.003, 0.4)
          const travel = draw(T, CUES.Lifecycle - 0.7 + i * 0.0015, 1.0)
          const gone = enter(T, CUES.Lifecycle + 0.1 + i * 0.0015, 0.5)
          const x = d.gx + (d.tx - d.gx) * travel
          const y = d.gy + (d.ty - d.gy) * travel
          const o = appear * (1 - gone)
          if (o <= 0) return null
          return <circle key={i} cx={x} cy={y} r="4" fill="var(--muted-foreground)" opacity={0.55 * o} />
        })}
      </svg>
      <div
        className="absolute w-[520px] text-center"
        style={{ left: CX - 260, top: CY + 190, opacity: labelIn * (1 - labelOut), transform: `translateY(${(1 - labelIn) * 10}px)` }}
      >
        <div className="font-heading text-[28px] font-bold leading-tight text-foreground">{ESTATE.label}</div>
        <div className="mt-1 font-mono text-[15px] uppercase tracking-[0.08em] text-muted-foreground">{ESTATE.note}</div>
      </div>
    </>
  )
}

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

/** The centre: the lifecycle label while the wheel builds, then the reach
 *  counter, date-stamped, counting through the designed and manager scenes. */
function Centre({ T }: { T: number }) {
  const lifecycleIn = enter(T, CUES.Lifecycle + 1.6, 0.6)
  const counterIn = enter(T, CUES.Designed + 0.8, 0.6)
  const stage = T < CUES.Manager + 0.8 ? REACH.designed : REACH.manager
  const start = T < CUES.Manager + 0.8 ? CUES.Designed + 0.8 : CUES.Manager + 0.8
  const n = stage.from + (stage.to - stage.from) * enter(T, start, 1.6)
  return (
    <>
      <div
        className="absolute w-[220px] text-center text-[22px] text-muted-foreground"
        style={{ left: CX - 110, top: CY - 30, opacity: lifecycleIn * (1 - counterIn) }}
      >
        The data lifecycle
      </div>
      <div className="absolute w-[240px] text-center" style={{ left: CX - 120, top: CY - 44, opacity: counterIn }}>
        <div className="font-heading text-[44px] font-extrabold leading-none tabular-nums tracking-tight text-foreground">{fmt(n)}</div>
        <div className="mt-1.5 text-[15px] leading-tight text-muted-foreground">{REACH.caption}</div>
        <div className="mt-1 font-mono text-[13px] uppercase tracking-[0.08em] text-muted-foreground">{stage.by}</div>
      </div>
    </>
  )
}

/** The artboard at time T. Pure of time: everything derives from T. */
function Artboard({ T }: { T: number }) {
  const fade = 1 - enter(T, TOTAL - 0.9, 0.8)
  const bIn = enter(T, CUES.Summary + 0.6, 0.8)
  const lineIn = enter(T, CUES.Summary + 1.2, 0.8)
  const summary = enter(T, CUES.Summary + 0.2, 0.6)
  const wheelIn = (i: number) => enter(T, CUES.Lifecycle + i * 0.2, 0.6)
  const focus = (k: number) => Math.max(windowed(T, RINGS[k].s - 0.8, RINGS[k].e), summary)
  const title = 'absolute left-[100px] right-[100px] top-[70px] font-heading text-[46px] font-extrabold tracking-[-0.01em] leading-tight text-foreground'

  return (
    <div className="absolute inset-0 overflow-hidden font-sans text-foreground" style={{ opacity: fade }} aria-hidden="true">
      {/* No opening title: the section heading outside the artboard names
          the piece. The summary line is the only title moment. */}
      <div className={title} style={{ opacity: bIn, transform: `translateY(${(1 - bIn) * 18}px)` }}>
        {TITLE_B}
        <div
          className="mt-3 font-sans text-[26px] font-normal tracking-normal text-muted-foreground"
          style={{ opacity: lineIn, transform: `translateY(${(1 - lineIn) * 10}px)` }}
        >
          {SUMMARY_LINE}
        </div>
      </div>

      <Estate T={T} />
      <svg width="1920" height="1080" className="absolute inset-0">
        {STAGES.map((_, i) => {
          const a0 = START + i * SEG + GAP
          const a1 = START + (i + 1) * SEG - GAP
          return RINGS.map((g, k) => (
            <path key={`${i}-${k}`} d={arc(g.rad, a0, a1)} stroke={EMPTY} strokeWidth="38" fill="none" opacity={wheelIn(i)} />
          ))
        })}
        {RINGS.map((g, k) => {
          let n = 0
          return STAGES.map((_, i) => {
            if (!g.f[i]) return null
            const a0 = START + i * SEG + GAP
            const a1 = START + (i + 1) * SEG - GAP
            const p = draw(T, g.s + n++ * 0.16, 0.5)
            if (p <= 0) return null
            return (
              <path
                key={`${k}-${i}`}
                d={arc(g.rad, a0, a0 + (a1 - a0) * Math.max(p, 0.001))}
                stroke={g.color}
                strokeWidth="38"
                fill="none"
                opacity={0.35 + 0.65 * focus(k)}
              />
            )
          })
        })}
      </svg>

      {STAGES.map((s, i) => {
        const a = START + (i + 0.5) * SEG
        const R = 330
        const cs = Math.cos(a)
        const sn = Math.sin(a)
        const hx = cs > 0.3 ? 0 : cs < -0.3 ? -100 : -50
        const vy = sn < -0.6 ? -100 : sn > 0.6 ? 0 : -50
        const align = cs > 0.3 ? 'left' : cs < -0.3 ? 'right' : 'center'
        const o = owner(i)
        const ps = o === 0 ? CUES.Designed + 1.4 : o === 1 ? CUES.Manager + 1.6 : null
        const col = o === 0 ? GREEN : PURPLE
        return (
          <div
            key={s.n}
            className="absolute flex w-[310px] flex-col gap-1"
            style={{
              left: CX + R * cs,
              top: CY + R * sn,
              transform: `translate(${hx}%, ${vy}%)`,
              textAlign: align,
              alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
              opacity: wheelIn(i),
            }}
          >
            <div className="mb-1 font-heading text-[22px] font-extrabold leading-[1.2]">
              <span className="mr-2 font-mono text-[16px] font-normal text-muted-foreground">{s.n}</span>
              {s.wheelName}
            </div>
            {s.products.length === 0 && <div className="text-[17px] leading-[1.3] text-muted-foreground">{s.what}</div>}
            {s.products.map((pr, k) => {
              const q = ps == null ? 0 : enter(T, ps + k * 0.1, 0.5)
              return (
                <div
                  key={pr}
                  className={cn('flex items-center gap-2 text-[17px] leading-[1.3]', align === 'right' && 'flex-row-reverse')}
                  style={{ opacity: q, transform: `translateY(${(1 - q) * 8}px)` }}
                >
                  <span className="size-2 shrink-0 rounded-[2px]" style={{ background: col }} />
                  {pr}
                </div>
              )
            })}
          </div>
        )
      })}

      <Centre T={T} />

      <div className="absolute flex w-[400px] flex-col gap-10" style={{ left: 1450, top: 330 }}>
        {RINGS.map((g, k) => {
          const shown = enter(T, g.s - 0.8, 0.6)
          const f = focus(k)
          return (
            <div
              key={g.label}
              className="flex items-start gap-[18px]"
              style={{ opacity: shown * (0.4 + 0.6 * f), transform: `translateX(${(1 - shown) * 24}px)` }}
            >
              <span className="mt-[9px] size-5 shrink-0 rounded-[5px]" style={{ background: g.color }} />
              <div>
                <div className="font-heading text-[32px] font-bold leading-[1.15]">{g.label}</div>
                {g.tag && <div className="mt-1.5 font-mono text-[17px] uppercase tracking-[0.08em] text-muted-foreground">{g.tag}</div>}
                {g.scale && (
                  <div
                    className="mt-2 text-[20px] leading-snug text-foreground"
                    style={{ opacity: enter(T, g.s - 0.2, 0.6), transform: `translateY(${(1 - enter(T, g.s - 0.2, 0.6)) * 8}px)` }}
                  >
                    {g.scale}
                  </div>
                )}
                {k === 2 && (
                  <div className="mt-4 flex flex-col gap-2.5">
                    {INITIATIVES.map((n) => {
                      const q = enter(T, n.s, 0.5)
                      return (
                        <div key={n.name} className="text-[22px] font-semibold" style={{ opacity: q, transform: `translateY(${(1 - q) * 10}px)` }}>
                          {n.name}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function LifecycleWheel({ className, fallback }: { className?: string; fallback: ReactNode }) {
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()
  const still = reduce === true
  const frameRef = useRef<HTMLDivElement>(null)
  const scale = useScale(frameRef)
  const [playing, setPlaying] = useState(true)
  const [T, setT] = useState(0)
  const origin = useRef<number | null>(null)

  useAnimationFrame((time) => {
    if (still || !playing || !wide) return
    if (origin.current === null) origin.current = time - T * 1000
    setT(((time - origin.current) / 1000) % TOTAL)
  })
  const toggle = () => {
    origin.current = null
    setPlaying((p) => !p)
  }
  const replay = () => {
    origin.current = null
    setT(0)
    setPlaying(true)
  }

  if (!wide) return <>{fallback}</>

  const t = still ? STILL_T : T
  return (
    <section className={className} aria-label="What I led design and strategy for, as an animated wheel">
      {/* The text alternative: the same facts as a list. */}
      <div className="sr-only">
        <p>{TITLE_A}. {TITLE_B} {SUMMARY_LINE}</p>
        <p>{ESTATE.label}. People using the platform each month: 1,886 in July 2023, 2,664 in July 2024, 6,673 in March 2026. One designer for every 85 engineers. 1,600 data products certified in FY24.</p>
        <ul>
          {STAGES.map((s, i) => (
            <li key={s.n}>
              Stage {s.n}, {s.wheelName}: {owner(i) === 0 ? 'designed hands-on, 2021 to 2024, then led' : owner(i) === 1 ? 'led as design manager, 2024 to 2026' : 'outside design’s scope'}.
              {s.products.length > 0 ? ` Products: ${s.products.join(', ')}.` : ''} Strategy set across every stage: the clean-data standard and fine-grained access control.
            </li>
          ))}
        </ul>
      </div>

      <div ref={frameRef} className="relative w-full overflow-hidden rounded-[14px]" style={{ aspectRatio: '16 / 9' }}>
        <div className="absolute left-0 top-0 h-[1080px] w-[1920px] origin-top-left" style={{ transform: `scale(${scale})` }}>
          <Artboard T={t} />
        </div>
      </div>

      {!still && (
        <div className="mt-2 flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={!playing}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 label-micro text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={replay}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 label-micro text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Replay
          </button>
        </div>
      )}
    </section>
  )
}

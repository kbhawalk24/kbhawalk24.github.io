'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion-primitives'

// "By the numbers": six stat tiles under the hero's about text, each with a
// small chart that plays when the strip scrolls into view and replays when
// a tile is hovered or clicked. Every figure is sourced in the tile's
// title. Reduced motion shows the finished frames.

type Chart =
  | { kind: 'bar'; before: number; after: number }
  | { kind: 'spark'; points: { label: string; value: number }[] }
  | { kind: 'waffle'; before: number; after: number }
  | { kind: 'dots'; engineers: number; pms: number; designers: number }

interface Tile {
  id: string
  value: number
  format: (n: number) => string
  label: string
  source: string
  chart: Chart
}

const TILES: Tile[] = [
  {
    id: 'discover',
    value: 9.4,
    format: (n) => `${n.toFixed(1)} hrs`,
    label: 'to discover and access data, from 20 days',
    source: 'Public figure, AWS re:Invent 2025 (2023 → 2025)',
    chart: { kind: 'bar', before: 480, after: 9.4 },
  },
  {
    id: 'answer',
    value: 4,
    format: (n) => `${Math.round(n)} min`,
    label: 'from a question to an answer, from 45',
    source: 'Observed-task study, agent in Cursor and Claude, Mar 2026',
    chart: { kind: 'bar', before: 45, after: 4 },
  },
  {
    id: 'users',
    value: 6673,
    format: (n) => Math.round(n).toLocaleString('en-US'),
    label: 'monthly users of the catalog, from 1,886',
    source: 'FY24 review · Amplitude dashboard, Mar 2026',
    chart: {
      kind: 'spark',
      points: [
        { label: 'Jul 2023', value: 1886 },
        { label: 'Jul 2024', value: 2664 },
        { label: 'Mar 2026', value: 6673 },
      ],
    },
  },
  {
    id: 'clicks',
    value: 96,
    format: (n) => `${Math.round(n)}%`,
    label: 'of searches get a click in the top five, from 68%',
    source: 'FY23 year-end review (Apr 2022 → Apr 2023)',
    chart: { kind: 'waffle', before: 68, after: 96 },
  },
  {
    id: 'clean',
    value: 80,
    format: (n) => `${Math.round(n)}%`,
    label: 'of the data estate is clean, from under 1%',
    source: 'Public figure, Dec 2025',
    chart: { kind: 'waffle', before: 1, after: 80 },
  },
  {
    id: 'ratio',
    value: 85,
    format: (n) => `1 : ${Math.round(n)}`,
    label: 'designers to engineers, three designers on my team',
    source: '~550 engineers, 16 product managers, 3 designers (2025)',
    chart: { kind: 'dots', engineers: 85, pms: 2, designers: 1 },
  },
]

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeOutBack = (t: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/** Progress 0 → 1 over `duration` ms, restarted whenever `play` changes.
 *  Reduced motion jumps straight to 1. */
function useProgress(play: number, duration: number, delay: number, instant: boolean) {
  const [p, setP] = useState(instant ? 1 : 0)
  useEffect(() => {
    if (play === 0) return
    if (instant) {
      setP(1)
      return
    }
    let raf = 0
    let start: number | null = null
    setP(0)
    const tick = (now: number) => {
      if (start === null) start = now + delay
      const t = clamp01((now - start) / duration)
      setP(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [play, duration, delay, instant])
  return p
}

function Bar({ chart, p }: { chart: Extract<Chart, { kind: 'bar' }>; p: number }) {
  const target = (chart.after / chart.before) * 100
  // Shrinks from full with a little overshoot, then settles.
  const width = Math.max(1.5, 100 - (100 - target) * easeOutBack(p))
  return (
    <div className="relative mt-4 h-2.5 rounded-r-[4px] bg-accent-brand/10" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 rounded-r-[4px] bg-accent-brand" style={{ width: `${width}%` }} />
    </div>
  )
}

function Spark({ chart, p }: { chart: Extract<Chart, { kind: 'spark' }>; p: number }) {
  const W = 160
  const H = 48
  const max = Math.max(...chart.points.map((d) => d.value))
  const xs = (i: number) => 6 + (i / (chart.points.length - 1)) * (W - 12)
  const ys = (v: number) => H - 6 - (v / max) * (H - 12)
  const d = chart.points.map((pt, i) => `${i ? 'L' : 'M'}${xs(i)} ${ys(pt.value)}`).join(' ')
  const drawn = easeOutExpo(p)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-12 w-full overflow-visible" aria-hidden="true">
      <path
        d={d}
        pathLength={1}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent-brand"
        style={{ strokeDasharray: 1, strokeDashoffset: 1 - drawn }}
      />
      {chart.points.map((pt, i) => {
        const at = i / (chart.points.length - 1)
        const on = drawn >= at - 0.02
        const last = i === chart.points.length - 1
        return (
          <circle
            key={pt.label}
            cx={xs(i)}
            cy={ys(pt.value)}
            r={last && p >= 1 ? 5 : 4}
            className="fill-accent-brand stroke-card transition-[r] duration-300"
            strokeWidth={2}
            style={{ opacity: on ? 1 : 0, transition: 'opacity .2s' }}
          />
        )
      })}
    </svg>
  )
}

/** Fill order for the waffle: a diagonal wave from the top-left, so the
 *  new squares sweep across instead of filling row by row. */
function waffleOrder(before: number, after: number) {
  const cells = []
  for (let k = before; k < after; k++) cells.push(k)
  return cells.sort((a, b) => {
    const da = Math.floor(a / 10) + (a % 10)
    const db = Math.floor(b / 10) + (b % 10)
    return da - db || a - b
  })
}

function Waffle({ chart, p }: { chart: Extract<Chart, { kind: 'waffle' }>; p: number }) {
  const order = waffleOrder(chart.before, chart.after)
  const n = Math.round(order.length * easeOutExpo(p))
  const lit = new Set(order.slice(0, n))
  return (
    <div className="mt-3 grid grid-cols-10 gap-[3px]" aria-hidden="true">
      {Array.from({ length: 100 }, (_, k) => (
        <i
          key={k}
          className={cn(
            'block aspect-square rounded-[2px] transition-colors duration-200',
            lit.has(k) ? 'bg-accent-brand' : k < chart.before ? 'bg-accent-brand/40' : 'bg-accent-brand/10',
          )}
        />
      ))}
    </div>
  )
}

function Dots({ chart, p }: { chart: Extract<Chart, { kind: 'dots' }>; p: number }) {
  const total = chart.engineers + chart.pms + chart.designers
  const shown = Math.round(total * easeOutExpo(p))
  return (
    <div className="mt-3 flex flex-wrap content-start items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: total }, (_, k) => {
        const kind = k < chart.engineers ? 'eng' : k < chart.engineers + chart.pms ? 'pm' : 'ds'
        const on = k < shown
        return (
          <i
            key={k}
            className={cn(
              'block rounded-full transition-transform duration-300',
              kind === 'eng' && 'size-[6px] bg-foreground/20',
              kind === 'pm' && 'size-2 bg-track-strategy',
              kind === 'ds' && 'size-3 bg-accent-brand ring-2 ring-card',
              on ? 'scale-100' : 'scale-0',
            )}
            style={{ transitionTimingFunction: kind === 'ds' ? 'cubic-bezier(.34,1.56,.64,1)' : undefined }}
          />
        )
      })}
    </div>
  )
}

function StatTile({ tile, play, index, instant }: { tile: Tile; play: number; index: number; instant: boolean }) {
  const [local, setLocal] = useState(0)
  const key = play + local
  const p = useProgress(key, 1500, instant ? 0 : index * 110, instant)
  const replay = useCallback(() => setLocal((n) => n + 1), [])
  const shown = tile.value * easeOutExpo(p)

  return (
    <li
      title={tile.source}
      tabIndex={0}
      onPointerEnter={replay}
      onClick={replay}
      onFocus={replay}
      className="group flex min-w-0 cursor-default flex-col rounded-[14px] bg-card p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-accent-brand"
    >
      <p className="font-heading text-[28px] font-semibold leading-none tracking-tight">
        {tile.format(p >= 1 ? tile.value : shown)}
      </p>
      <p className="mt-2 text-pretty font-sans text-sm leading-snug text-muted-foreground">{tile.label}</p>
      {/* Charts sit at the foot of the tile so the row reads as one baseline. */}
      <div className="mt-auto">
        {tile.chart.kind === 'bar' && <Bar chart={tile.chart} p={p} />}
        {tile.chart.kind === 'spark' && <Spark chart={tile.chart} p={p} />}
        {tile.chart.kind === 'waffle' && <Waffle chart={tile.chart} p={p} />}
        {tile.chart.kind === 'dots' && <Dots chart={tile.chart} p={p} />}
      </div>
      <span className="sr-only">{tile.source}</span>
    </li>
  )
}

export function NumbersStrip() {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const [play, setPlay] = useState(0)

  // Plays each time the strip comes back into view, so scrolling past and
  // returning replays it.
  useEffect(() => {
    if (inView) setPlay((n) => n + 1)
  }, [inView])

  return (
    <section ref={ref} id="numbers" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-10 md:px-10 md:pt-14 lg:px-14">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="label-micro text-muted-foreground">By the numbers · each one plays as you scroll</p>
          <button
            type="button"
            onClick={() => setPlay((n) => n + 1)}
            className="label-micro text-accent-brand underline-offset-4 hover:underline"
          >
            Play again
          </button>
        </Reveal>
        <ol className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {TILES.map((tile, i) => (
            <StatTile key={tile.id} tile={tile} play={play} index={i} instant={reduced} />
          ))}
        </ol>
      </div>
    </section>
  )
}

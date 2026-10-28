'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAnimationFrame, useInView, useReducedMotion } from 'motion/react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { event } from '@/lib/analytics'
import { STAGES } from '@/lib/capability-map'

// The lifecycle wheel on the Management page: a port of Concept D Wheel v4
// from the Claude Design project "Data Platform Ownership Animation"
// (source fetched 27 Oct 2026; the v2 handoff is in wheel/). Seven equal
// segments, stage 4 at three o'clock; three rings (designed hands-on, led
// as design manager, set platform strategy) draw their filled segments in
// turn while the legend, the products around the wheel and the reach
// counter in the centre appear. Geometry, cues and easings follow
// concept-wheel-v4.jsx; two scenes of the original are left out on
// purpose: the opening headline and the 320-dot estate (petabytes) opener.
// The section heading outside the artboard names the piece.
//
// It plays once when scrolled into view and holds the final frame, with
// pause and replay. Hovering a ring, on the wheel or in the legend, brings
// that ring forward; hovering a stage brings that stage forward. Colours
// and type are the site's own tokens. Under reduced motion the final frame
// shows still. Below 1024px the same facts render as a list.

// Cue sheet, in seconds. The v4 cues minus its opening and estate scenes.
const CUES = { Lifecycle: 0, Designed: 3, Manager: 8, Strategy: 13.5, Summary: 18.5 }
const TOTAL = 20

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const prog = (T: number, s: number, d: number) => clamp((T - s) / d, 0, 1)
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3)
const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
const enter = (T: number, s: number, d = 0.6) => easeOutCubic(prog(T, s, d))
const draw = (T: number, s: number, d = 0.6) => easeInOutCubic(prog(T, s, d))
const windowed = (T: number, s: number, e: number, d = 0.5) => enter(T, s, d) * (1 - enter(T, e - d * 0.5, d))
const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

const GREEN = 'var(--track-ic)'
const PURPLE = 'var(--track-management)'
const ORANGE = 'var(--track-strategy)'
const EMPTY = 'var(--stripe-a)'

// People using the platform each month: a sourced series (FY24 review;
// analytics dashboard, Mar 2026), counted through the designed and manager
// scenes. The one number in the centre. The 1:85 ratio is not repeated
// here: it is for the whole data design group and lives in the stat card.
const REACH = { start: 1886, designed: 2664, manager: 6673 }

// One sourced line under a product, where there is one (docs/source-kit.md).
const METRIC: Record<string, string> = {
  'Catalog and search': '10,000 data products searchable',
  'Plain-language assistant': '500+ people a month, 2023 to 2024',
  Lineage: '450–500 people a month, Jul 2024',
}

interface Ring {
  label: string
  tag: string
  color: string
  f: boolean[]
  rad: number
  s: number
  e: number
}

const RINGS: Ring[] = [
  { label: 'Designed hands-on', tag: '2021 to 2024 · founding designer', color: GREEN, f: STAGES.map((s) => s.mine === 'ic'), rad: 170, s: CUES.Designed + 0.8, e: CUES.Manager },
  { label: 'Led as design manager', tag: '2024 to 2026 · three designers, nine product areas', color: PURPLE, f: STAGES.map((s) => s.mine !== 'none'), rad: 225, s: CUES.Manager + 0.8, e: CUES.Strategy },
  { label: 'Set platform strategy', tag: 'Every stage, 2023 to 2026', color: ORANGE, f: STAGES.map(() => true), rad: 280, s: CUES.Strategy + 0.6, e: CUES.Summary },
]
const INITIATIVES: { name: string; m: string[]; s: number }[] = [
  { name: 'Clean-data standard', m: ['1,600 three-star data products made discoverable, FY24', 'Clean data under 1% → 80% of the estate, Nov 2025 · shared'], s: CUES.Strategy + 1.4 },
  { name: 'Fine-grained access control', m: [], s: CUES.Strategy + 1.7 },
]

/** 0 = designed hands-on, then led; 1 = led as design manager; -1 = outside design's scope. */
const owner = (i: number) => (RINGS[0].f[i] ? 0 : RINGS[1].f[i] ? 1 : -1)
const OWNER_TEXT = ['Designed hands-on 2021 to 2024, led 2024 to 2026', 'Led as design manager, 2024 to 2026', 'Outside design’s scope']

// The artboard: 1640 by 980, scaled to the container's width.
const W = 1640
const H = 980
const CX = 640
const CY = 470
const SEG = (Math.PI * 2) / 7
const GAP = 0.035
const START = -3 * SEG - SEG / 2
const LABEL_R = 320

function arc(r: number, a0: number, a1: number) {
  const p = (a: number) => [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1}`
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
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
    const ro = new ResizeObserver(() => setScale(el.clientWidth / W))
    ro.observe(el)
    setScale(el.clientWidth / W)
    return () => ro.disconnect()
  }, [ref])
  return scale
}

interface Hover {
  ring: number | null
  stage: number | null
}

/** The artboard at time T, with the pointer's focus laid over it. */
function Artboard({ T, hover, setHover, settled }: { T: number; hover: Hover; setHover: (h: Hover) => void; settled: boolean }) {
  const summary = enter(T, CUES.Summary + 0.2, 0.6)
  const wheelIn = (i: number) => enter(T, CUES.Lifecycle + 0.3 + i * 0.15, 0.6)
  const timed = (k: number) => Math.max(windowed(T, RINGS[k].s - 0.8, RINGS[k].e), summary)
  const focus = (k: number) => (hover.ring == null ? timed(k) : hover.ring === k ? 1 : 0.12)
  const stageO = (i: number) => (hover.stage == null || hover.stage === i ? 1 : 0.3)
  const ease = settled ? 'transition-opacity duration-150 ease-out' : undefined

  const designedCount = draw(T, CUES.Designed + 2.0, 2.2)
  const managerCount = draw(T, CUES.Manager + 1.0, 3.5)
  const reach = REACH.start + (REACH.designed - REACH.start) * designedCount + (REACH.manager - REACH.designed) * managerCount
  const reachDate = managerCount >= 1 ? 'Mar 2026' : managerCount > 0 ? 'Jul 2024 → Mar 2026' : designedCount >= 1 ? 'Jul 2024' : designedCount > 0 ? 'Jul 2023 → Jul 2024' : 'Jul 2023'
  const reachIn = enter(T, CUES.Designed + 0.2, 0.6)
  const lifecycleLabel = windowed(T, CUES.Lifecycle + 1.6, CUES.Designed + 0.3)

  const ringEnter = (k: number) => () => setHover({ ring: k, stage: null })
  const stageEnter = (i: number) => () => setHover({ ring: null, stage: i })
  const leave = () => setHover({ ring: null, stage: null })

  return (
    <div className="absolute inset-0 overflow-hidden font-sans text-foreground" aria-hidden="true">
      <svg width={W} height={H} className="absolute inset-0">
        {STAGES.map((_, i) => {
          const a0 = START + i * SEG + GAP
          const a1 = START + (i + 1) * SEG - GAP
          return RINGS.map((g, k) => (
            <path key={`${i}-${k}`} d={arc(g.rad, a0, a1)} stroke={EMPTY} strokeWidth="38" fill="none" opacity={wheelIn(i)} className={ease} onPointerEnter={stageEnter(i)} onPointerLeave={leave} />
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
                opacity={(0.35 + 0.65 * focus(k)) * stageO(i)}
                className={cn(ease, 'cursor-default')}
                onPointerEnter={ringEnter(k)}
                onPointerLeave={leave}
              />
            )
          })
        })}
      </svg>

      {STAGES.map((s, i) => {
        const a = START + (i + 0.5) * SEG
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
            className={cn('absolute flex w-[300px] flex-col gap-1.5', ease)}
            style={{
              left: CX + LABEL_R * cs,
              top: CY + LABEL_R * sn,
              transform: `translate(${hx}%, ${vy}%)`,
              textAlign: align,
              alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
              opacity: wheelIn(i) * stageO(i),
            }}
            onPointerEnter={stageEnter(i)}
            onPointerLeave={leave}
          >
            <div className="mb-1 font-heading text-[27px] font-extrabold leading-[1.2]">
              <span className="mr-2 font-mono text-[18px] font-normal text-muted-foreground">{s.n}</span>
              {s.wheelName}
            </div>
            {s.products.length === 0 && <div className="text-[21px] leading-[1.3] text-muted-foreground">{s.what}</div>}
            {s.products.map((pr, k) => {
              const q = ps == null ? 0 : enter(T, ps + k * 0.1, 0.5)
              const m = METRIC[pr]
              const mq = m && ps != null ? enter(T, ps + 1.2 + k * 0.1, 0.5) : 0
              return (
                <div
                  key={pr}
                  className={cn('flex items-start gap-2.5 text-[21px] leading-[1.3]', align === 'right' && 'flex-row-reverse', align === 'center' && 'text-left')}
                  style={{ opacity: q, transform: `translateY(${(1 - q) * 8}px)` }}
                >
                  <span className="mt-[9px] size-2.5 shrink-0 rounded-[3px]" style={{ background: col }} />
                  <span>
                    {pr}
                    {m && (
                      <span className="block font-mono text-[16px] leading-snug" style={{ color: col, opacity: mq }}>
                        {m}
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}

      {/* The centre: the lifecycle label while the wheel builds, then the reach counter. */}
      <div className="absolute flex items-center justify-center text-center" style={{ left: CX - 130, top: CY - 70, width: 260, height: 140 }}>
        <div className="absolute text-[24px] text-muted-foreground" style={{ opacity: lifecycleLabel }}>
          The data lifecycle
        </div>
        <div className="absolute flex flex-col items-center gap-1" style={{ opacity: reachIn, transform: `translateY(${(1 - reachIn) * 10}px)` }}>
          <div className="font-mono text-[16px] uppercase tracking-[0.08em] text-muted-foreground">{reachDate}</div>
          <div className="font-heading text-[56px] font-extrabold leading-none tabular-nums tracking-tight">{fmt(reach)}</div>
          <div className="text-[20px] text-muted-foreground">people a month</div>
        </div>
      </div>

      {/* The legend: one line of organisational scale per ring. */}
      <div className="absolute flex w-[330px] flex-col gap-9" style={{ left: 1300, top: 230 }}>
        {RINGS.map((g, k) => {
          const shown = enter(T, g.s - 0.8, 0.6)
          const f = focus(k)
          return (
            <div
              key={g.label}
              className={cn('flex cursor-default items-start gap-4', ease)}
              style={{ opacity: shown * (0.4 + 0.6 * f), transform: `translateX(${(1 - shown) * 24}px)` }}
              onPointerEnter={ringEnter(k)}
              onPointerLeave={leave}
            >
              <span className="mt-[9px] size-5 shrink-0 rounded-[5px]" style={{ background: g.color }} />
              <div>
                <div className="font-heading text-[32px] font-bold leading-[1.15]">{g.label}</div>
                <div className="mt-1.5 text-[20px] leading-[1.3] text-muted-foreground">{g.tag}</div>
                {k === 2 && (
                  <div className="mt-4 flex flex-col gap-2.5">
                    {INITIATIVES.map((n) => {
                      const q = enter(T, n.s, 0.5)
                      return (
                        <div key={n.name} style={{ opacity: q, transform: `translateY(${(1 - q) * 10}px)` }}>
                          <div className="text-[23px] font-semibold leading-tight">{n.name}</div>
                          {n.m.map((line) => (
                            <div key={line} className="mt-0.5 font-mono text-[16px] leading-snug" style={{ color: ORANGE }}>
                              {line}
                            </div>
                          ))}
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

/** The same facts as a list, for narrow screens and for screen readers. */
function WheelList({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-8', className)}>
      <ul className="grid gap-4">
        {RINGS.map((g) => (
          <li key={g.label} className="flex items-start gap-3">
            <span className="mt-1.5 size-3.5 shrink-0 rounded-[4px]" style={{ background: g.color }} />
            <div>
              <p className="font-heading text-base font-semibold leading-tight">{g.label}</p>
              <p className="mt-0.5 font-sans text-sm leading-snug text-muted-foreground">{g.tag}</p>
            </div>
          </li>
        ))}
      </ul>
      <ol className="grid gap-5">
        {STAGES.map((s, i) => {
          const o = owner(i)
          const col = o === 0 ? GREEN : PURPLE
          return (
            <li key={s.n} className="flex gap-3">
              <span className="w-5 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground">{s.n}</span>
              <div className="min-w-0">
                <p className="font-heading text-base font-semibold leading-tight">{s.wheelName}</p>
                <p className="mt-0.5 font-sans text-sm leading-snug text-muted-foreground">{OWNER_TEXT[o === -1 ? 2 : o]} · strategy set here</p>
                {s.products.length === 0 && <p className="mt-2 font-sans text-[15px] leading-snug">{s.what}</p>}
                {s.products.length > 0 && (
                  <ul className="mt-2 grid gap-1.5">
                    {s.products.map((pr) => (
                      <li key={pr} className="flex items-start gap-2 font-sans text-[15px] leading-snug">
                        <span className="mt-[7px] size-2 shrink-0 rounded-[2px]" style={{ background: col }} />
                        <span>
                          {pr}
                          {METRIC[pr] && (
                            <span className="block font-mono text-[12px] leading-snug" style={{ color: col }}>
                              {METRIC[pr]}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          )
        })}
      </ol>
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        People using the platform each month: 1,886 in July 2023, 2,664 in July 2024, 6,673 in March 2026. Strategy across every stage, 2023 to 2026: the clean-data standard (1,600 three-star data products made discoverable in FY24; clean data under 1% → 80% of the estate by November 2025, a shared result) and fine-grained access control.
      </p>
    </div>
  )
}

export function LifecycleWheel({ className }: { className?: string }) {
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()
  // Reduced motion applies only after mount, so the first client render
  // matches the static HTML (the empty wheel) and nothing mismatches.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const still = mounted && reduce === true
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { once: true, amount: 0.35 })
  const scale = useScale(frameRef)
  const [playing, setPlaying] = useState(true)
  const [T, setT] = useState(0)
  const [hover, setHover] = useState<Hover>({ ring: null, stage: null })
  const origin = useRef<number | null>(null)

  const running = wide && inView && playing && !still && T < TOTAL
  useAnimationFrame((time) => {
    if (!running) return
    if (origin.current === null) origin.current = time - T * 1000
    const next = (time - origin.current) / 1000
    if (next >= TOTAL) {
      setT(TOTAL)
      setPlaying(false)
      origin.current = null
    } else {
      setT(next)
    }
  })
  const toggle = () => {
    origin.current = null
    if (T >= TOTAL) {
      setT(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }
  const replay = () => {
    origin.current = null
    setT(0)
    setPlaying(true)
  }

  const t = still ? TOTAL : T
  const settled = still || !running
  const ended = T >= TOTAL

  return (
    <section className={className} aria-label="What I designed, led and set the strategy for, stage by stage">
      <div className="lg:hidden">
        <WheelList />
      </div>
      <div className="hidden lg:block">
        <WheelList className="sr-only" />
        <div ref={frameRef} className="relative w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
            <Artboard T={t} hover={hover} setHover={setHover} settled={settled} />
          </div>
        </div>
        {!still && (
          <div className="mt-2 flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={!playing}
              {...event('wheel', { button: ended ? 'play' : playing ? 'pause' : 'play' })}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 label-micro text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              {playing && !ended ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
              {playing && !ended ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              onClick={replay}
              {...event('wheel', { button: 'replay' })}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 label-micro text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Replay
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

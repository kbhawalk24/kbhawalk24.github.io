'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'
import { STAGES } from '@/lib/capability-map'

// The lifecycle wheel in the hero: the same seven stages and three rings as
// the /timeline wheel, drawn small and still, with the labels in a legend
// underneath instead of around it. The rings draw in once on load; after
// that the wheel answers the pointer. Hover or focus a stage and its cells
// light up while the centre names the stage and the readout lists its
// products; hover a legend item and only that ring stays full. A tap pins a
// stage, a second tap releases it.

const RINGS = [
  { id: 'ic', label: 'Designed hands-on', tag: '2021–2024', color: 'var(--track-ic)', rad: 150, f: STAGES.map((s) => s.mine === 'ic'), at: 0.2 },
  { id: 'management', label: 'Led as design manager', tag: '2024–2026', color: 'var(--track-management)', rad: 205, f: STAGES.map((s) => s.mine !== 'none'), at: 1.0 },
  { id: 'strategy', label: 'Set platform strategy', tag: 'Clean-data standard & access control', color: 'var(--track-strategy)', rad: 260, f: STAGES.map(() => true), at: 1.9 },
]
const EMPTY = 'var(--stripe-a)'
const C = 320
const W = 40
const SEG = (Math.PI * 2) / 7
const GAP = 0.035
const START = -3 * SEG - SEG / 2 // stage 4 at three o'clock
const R_IN = 125
const R_OUT = 285

const pt = (r: number, a: number) => `${C + r * Math.cos(a)} ${C + r * Math.sin(a)}`
const arc = (r: number, a0: number, a1: number) => `M${pt(r, a0)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${pt(r, a1)}`
const wedge = (a0: number, a1: number) =>
  `M${pt(R_OUT, a0)} A${R_OUT} ${R_OUT} 0 0 1 ${pt(R_OUT, a1)} L${pt(R_IN, a1)} A${R_IN} ${R_IN} 0 0 0 ${pt(R_IN, a0)} Z`

export function HeroWheel({ className }: { className?: string }) {
  const reduce = useReducedMotion() === true
  const [hover, setHover] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const [ring, setRing] = useState<number | null>(null)
  const stage = pinned ?? hover
  const active = stage === null ? null : STAGES[stage]

  const cellOpacity = (k: number, i: number) => {
    if (ring !== null && ring !== k) return 0.22
    if (stage !== null && stage !== i) return 0.28
    return 1
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <svg viewBox="0 0 640 640" className="block h-full w-full" aria-hidden="true">
          {STAGES.map((_, i) => {
            const a0 = START + i * SEG + GAP
            const a1 = START + (i + 1) * SEG - GAP
            return RINGS.map((g, k) => (
              <path
                key={`e-${i}-${k}`}
                d={arc(g.rad, a0, a1)}
                stroke={EMPTY}
                strokeWidth={W}
                fill="none"
                className="transition-opacity duration-200 ease-out"
                opacity={stage !== null && stage !== i ? 0.5 : 1}
              />
            ))
          })}
          {RINGS.map((g, k) => {
            let n = 0
            return STAGES.map((_, i) => {
              if (!g.f[i]) return null
              const a0 = START + i * SEG + GAP
              const a1 = START + (i + 1) * SEG - GAP
              const delay = g.at + n++ * 0.12
              return (
                <motion.path
                  key={`f-${k}-${i}`}
                  d={arc(g.rad, a0, a1)}
                  stroke={g.color}
                  strokeWidth={W}
                  fill="none"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
                  className="transition-opacity duration-200 ease-out"
                  opacity={cellOpacity(k, i)}
                />
              )
            })
          })}
          {/* Hit areas, one wedge per stage, over the three rings. */}
          {STAGES.map((s, i) => {
            const a0 = START + i * SEG + GAP
            const a1 = START + (i + 1) * SEG - GAP
            return (
              <path
                key={`h-${i}`}
                d={wedge(a0, a1)}
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-pressed={pinned === i}
                aria-label={`Stage ${s.n}, ${s.wheelName}`}
                className="cursor-pointer outline-none focus-visible:stroke-foreground/60 focus-visible:[stroke-width:3]"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setPinned((p) => (p === i ? null : i))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setPinned((p) => (p === i ? null : i))
                  }
                }}
              />
            )
          })}
        </svg>

        {/* The centre, in HTML so the type is the site's own. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[36%] text-center">
            {active ? (
              <>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Stage {active.n}</div>
                <div className="mt-1 font-heading text-base font-bold leading-tight text-foreground sm:text-lg">{active.wheelName}</div>
              </>
            ) : (
              <div className="font-sans text-sm text-muted-foreground sm:text-[15px]">The data lifecycle</div>
            )}
          </div>
        </div>
      </div>

      {/* The readout: what the pointer is on. Fixed height so the legend never jumps. */}
      <p className="mx-auto mt-3 min-h-[3.25rem] max-w-[460px] text-pretty text-center font-sans text-sm leading-relaxed text-muted-foreground" aria-live="polite">
        {active ? (
          active.products.length ? (
            <>
              <span className="font-semibold text-foreground">{active.wheelName}.</span> {active.products.join(' · ')}
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">{active.wheelName}.</span> Outside design’s scope.
            </>
          )
        ) : ring !== null ? (
          <>
            <span className="font-semibold text-foreground">{RINGS[ring].label}.</span>{' '}
            {RINGS[ring].f.filter(Boolean).length} of 7 stages.
          </>
        ) : (
          <>Seven stages of the data lifecycle. Grey cells are outside design’s scope.</>
        )}
      </p>

      <ul className="mx-auto mt-4 grid max-w-[520px] gap-x-4 gap-y-3 sm:grid-cols-3">
        {RINGS.map((g, k) => (
          <li key={g.id} className="min-w-0">
            <button
              type="button"
              className={cn(
                'flex w-full items-start gap-2.5 rounded-md text-left transition-opacity duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40',
                ring !== null && ring !== k && 'opacity-40',
              )}
              onMouseEnter={() => setRing(k)}
              onMouseLeave={() => setRing(null)}
              onFocus={() => setRing(k)}
              onBlur={() => setRing(null)}
            >
              <span className="mt-[5px] size-3 shrink-0 rounded-[3px]" style={{ background: g.color }} />
              <span>
                <span className="block font-sans text-[13px] font-semibold leading-snug text-foreground">{g.label}</span>
                <span className="block font-sans text-xs leading-snug text-muted-foreground">{g.tag}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ul className="sr-only">
        {STAGES.map((s) => (
          <li key={s.n}>
            Stage {s.n}, {s.wheelName}: {s.mine === 'ic' ? 'designed hands-on, 2021 to 2024, then led' : s.mine === 'management' ? 'led as design manager, 2024 to 2026' : 'outside design’s scope'}.
            {s.products.length > 0 ? ` ${s.products.join(', ')}.` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

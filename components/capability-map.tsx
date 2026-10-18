'use client'

import { useEffect, useState } from 'react'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackStyles } from '@/lib/track-styles'
import {
  BAND,
  FOCUS,
  INITIATIVES,
  INVOLVEMENT_LABEL,
  STAGES,
  type InitiativeId,
  type Involvement,
} from '@/lib/capability-map'

// The lifecycle band in the hero (data in lib/capability-map.ts), in three
// layouts that share the data, for review:
//   8 (default)  stage four as a large card, the other six narrow
//   ?map=3       a row of chevrons, a pipeline left to right
//   ?map=4       a subway map: one line, seven stations, two branch lines
// Under 8 and 3 the two initiatives are rails aligned to the stage columns.
// Identity is never colour alone: a legend names the tints, the two rails
// differ in shape, and every stage carries its words. The switch comes out
// once a layout is chosen.

const FILL: Record<Involvement, string> = {
  ic: 'bg-track-ic/10 ring-1 ring-track-ic/60',
  management: 'bg-track-management/10 ring-1 ring-track-management/40',
  strategy: 'bg-track-strategy/10 ring-1 ring-track-strategy/40',
  none: 'ring-1 ring-foreground/15',
}
const DOT: Record<Involvement, string> = {
  ic: 'bg-track-ic',
  management: 'bg-track-management',
  strategy: 'bg-track-strategy',
  none: 'ring-1 ring-inset ring-foreground/25',
}
const SOLID: Record<Involvement, string> = {
  ic: 'bg-track-ic text-track-ic-foreground',
  management: 'bg-track-management text-track-management-foreground',
  strategy: 'bg-track-strategy text-track-strategy-foreground',
  none: 'bg-foreground/10 text-foreground',
}

function Header() {
  return (
    <header className="flex items-center gap-2.5">
      <span className={cn('inline-flex size-8 items-center justify-center rounded-full', trackStyles.strategy.badgeFlat)}>
        <Compass className="size-4" aria-hidden="true" />
      </span>
      <div>
        <p className="label-micro text-foreground">{BAND.heading}</p>
        <p className="font-sans text-xs text-muted-foreground">{BAND.sub}</p>
      </div>
    </header>
  )
}

function Legend() {
  const items: Involvement[] = ['ic', 'management', 'none']
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="How each stage was mine">
      {items.map((m) => (
        <li key={m} className="flex items-center gap-1.5 label-micro text-muted-foreground">
          <span aria-hidden="true" className={cn('size-2 rounded-full', DOT[m])} />
          {INVOLVEMENT_LABEL[m]}
        </li>
      ))}
    </ul>
  )
}

function span(id: InitiativeId) {
  const idx = STAGES.map((s, i) => (s.initiatives.includes(id) ? i : -1)).filter((i) => i >= 0)
  return { from: idx[0], to: idx[idx.length - 1] }
}

/** One initiative as a horizontal rail: a line through the stages it
 *  spanned, a mark at each stage it touched. `cols` matches the stage grid. */
function Rail({ id, cols }: { id: InitiativeId; cols: string }) {
  const init = INITIATIVES.find((i) => i.id === id)!
  const { from, to } = span(id)
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 label-micro text-muted-foreground">
        <span
          aria-hidden="true"
          className={cn('size-2 bg-track-strategy', init.shape === 'circle' ? 'rounded-full' : 'rounded-[2px]')}
        />
        {init.label}
      </p>
      <ol className={cn('grid gap-x-1.5', cols)} aria-label={`${init.label}: stages it touched`}>
        {STAGES.map((s, i) => {
          const inSpan = i >= from && i <= to
          const touched = s.initiatives.includes(id)
          return (
            <li key={s.n} className="relative flex h-3.5 items-center justify-center">
              {inSpan && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-1/2 h-px -translate-y-1/2 bg-track-strategy/40',
                    i === from ? 'left-1/2' : 'left-0',
                    i === to ? 'right-1/2' : 'right-0',
                  )}
                />
              )}
              {touched && (
                <span
                  className={cn('relative size-2 bg-track-strategy', init.shape === 'circle' ? 'rounded-full' : 'rounded-[2px]')}
                >
                  <span className="sr-only">{s.name}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Rails({ cols }: { cols: string }) {
  return (
    <div className="mt-4 grid gap-2.5">
      <Rail id="clean" cols={cols} />
      <Rail id="access" cols={cols} />
    </div>
  )
}

/* ── 08: stage four emphasised ─────────────────────────────────────────── */

const COLS_8 = 'grid-cols-2 md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,2.4fr)_repeat(3,minmax(0,1fr))]'

function StageCards() {
  return (
    <>
      <ol className={cn('mt-3 grid gap-1.5', COLS_8)}>
        {STAGES.map((s, i) => {
          const big = i === FOCUS.index
          return (
            <li
              key={s.n}
              className={cn('rounded-[10px] px-3 py-2.5', FILL[s.mine], big && 'col-span-2 md:col-span-1 md:row-start-1 md:py-3')}
            >
              <p className="label-micro text-muted-foreground">
                {big ? FOCUS.eyebrow : s.n}
                <span className="sr-only">{big ? '' : `, ${INVOLVEMENT_LABEL[s.mine]}`}</span>
              </p>
              <p className={cn('mt-1 font-sans font-semibold leading-tight text-foreground', big ? 'text-[15px]' : 'text-[13px]')}>
                {big ? s.name : s.short}
              </p>
              <p className={cn('mt-1 font-sans text-[11px] leading-snug', big ? trackStyles.ic.accentText : 'text-muted-foreground')}>
                {big ? FOCUS.owned : s.tail}
              </p>
            </li>
          )
        })}
      </ol>
      <Rails cols={COLS_8} />
    </>
  )
}

/* ── 03: chevron flow ──────────────────────────────────────────────────── */

const COLS_3 = 'grid-cols-4 md:grid-cols-7'
const CHEVRON = {
  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)',
}

function Chevrons() {
  return (
    <>
      <ol className={cn('mt-3 grid gap-x-1 gap-y-1.5', COLS_3)}>
        {STAGES.map((s) => (
          <li key={s.n} className={cn('px-4 py-2 text-center', SOLID[s.mine])} style={CHEVRON}>
            <p className="font-sans text-[12px] font-semibold leading-tight">
              {s.short}
              <span className="sr-only">{` ${s.tail}, ${INVOLVEMENT_LABEL[s.mine]}`}</span>
            </p>
            <p aria-hidden="true" className="font-sans text-[10px] leading-tight opacity-80">
              {s.tail}
            </p>
          </li>
        ))}
      </ol>
      <Rails cols={COLS_3} />
    </>
  )
}

/* ── 04: subway map ────────────────────────────────────────────────────── */

const STROKE: Record<Involvement, string> = {
  ic: 'var(--track-ic)',
  management: 'var(--track-management)',
  strategy: 'var(--track-strategy)',
  none: 'var(--stripe-b)',
}

function Subway() {
  const xs = [40, 140, 240, 330, 440, 540, 640]
  const y = 80
  const clean = STAGES.map((s, i) => (s.initiatives.includes('clean') ? xs[i] : null))
  const access = STAGES.map((s, i) => (s.initiatives.includes('access') ? xs[i] : null))
  return (
    <div className="mt-2 overflow-x-auto">
      <svg
        viewBox="0 0 680 170"
        className="block h-auto w-full min-w-[640px]"
        role="img"
        aria-label="Seven stations on one line, from produce to consume. The clean-data standard line runs under stages one to seven and stops at one, four, six and seven. The fine-grained access control line runs above stages four to seven and stops at four, five and seven."
      >
        <line x1={xs[0]} y1={y} x2={xs[6]} y2={y} stroke="var(--stripe-b)" strokeWidth="4" strokeLinecap="round" />
        <path d={`M${xs[0]} 112H318Q330 112 330 100V${y}`} fill="none" stroke="var(--track-strategy)" strokeWidth="3" strokeLinecap="round" />
        <path d={`M330 ${y}V100Q330 112 342 112H${xs[6]}`} fill="none" stroke="var(--track-strategy)" strokeWidth="3" strokeLinecap="round" />
        <path d={`M330 ${y}V60Q330 48 342 48H${xs[6]}`} fill="none" stroke="var(--track-strategy)" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
        {STAGES.map((s, i) => (
          <g key={s.n}>
            <circle cx={xs[i]} cy={y} r={s.mine === 'ic' ? 9 : 7} fill="var(--card)" stroke={STROKE[s.mine]} strokeWidth={s.mine === 'ic' ? 3 : 2.5} />
            <text x={xs[i]} y={28} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--foreground)" fontFamily="var(--font-sans)">
              {s.short}
            </text>
            <text x={xs[i]} y={41} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily="var(--font-sans)">
              {s.tail}
            </text>
          </g>
        ))}
        {clean.map((x, i) => x !== null && i !== 3 && <circle key={`c${i}`} cx={x} cy={112} r="4" fill="var(--track-strategy)" />)}
        {access.map((x, i) => x !== null && i !== 3 && <rect key={`a${i}`} x={x - 4} y={44} width="8" height="8" rx="1.5" fill="var(--track-strategy)" />)}
        <text x={xs[0]} y={136} fontSize="11" fill="var(--track-strategy)" fontFamily="var(--font-mono)">
          Clean-data standard
        </text>
        <text x={xs[6]} y={160} textAnchor="end" fontSize="11" fill="var(--track-strategy)" fontFamily="var(--font-mono)">
          Fine-grained access control
        </text>
      </svg>
    </div>
  )
}

/* ── the hero slot ─────────────────────────────────────────────────────── */

type Variant = '3' | '4' | '8'

export function CapabilityMap({ className }: { className?: string }) {
  const [variant, setVariant] = useState<Variant>('8')
  useEffect(() => {
    try {
      const v = new URLSearchParams(window.location.search).get('map')
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after mount
      if (v === '3' || v === '4') setVariant(v)
    } catch {
      /* keep the default */
    }
  }, [])
  return (
    <section className={className} aria-label="What I led design and strategy for, at a glance">
      <Header />
      <div className="mt-3">
        <Legend />
      </div>
      {variant === '8' && <StageCards />}
      {variant === '3' && <Chevrons />}
      {variant === '4' && <Subway />}
    </section>
  )
}

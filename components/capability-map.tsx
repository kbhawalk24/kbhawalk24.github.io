'use client'

import { useEffect, useState } from 'react'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackStyles } from '@/lib/track-styles'
import {
  BAND,
  FOCUS,
  INITIATIVES,
  INITIATIVES_LEGEND,
  INVOLVEMENT_LABEL,
  STAGES,
  type InitiativeId,
  type Involvement,
} from '@/lib/capability-map'

// The lifecycle band in the hero (data in lib/capability-map.ts), in three
// layouts that share the data, for review:
//   8 (default)  stage four as a large card, the other six narrow
//   ?map=4       a subway map: one line, seven stations, two branch lines
// Under 8 the two initiatives are rails aligned to the stage columns.
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
      <li className="flex items-center gap-1.5 label-micro text-muted-foreground">
        <span aria-hidden="true" className="flex items-center gap-0.5">
          <span className="size-2 rounded-full bg-track-strategy" />
          <span className="size-2 rounded-[2px] bg-track-strategy" />
        </span>
        {INITIATIVES_LEGEND}
      </li>
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
              className={cn(
                'rounded-[10px] px-3 py-2.5',
                FILL[s.mine],
                // The big card is pinned to its own column so the others
                // flow around it in stage order: 1 2 3 [4] 5 6 7.
                big && 'col-span-2 md:col-span-1 md:col-start-4 md:row-start-1 md:py-3',
              )}
            >
              <p className="label-micro text-muted-foreground">
                {big ? FOCUS.eyebrow : s.n}
                <span className="sr-only">{big ? '' : `, ${INVOLVEMENT_LABEL[s.mine]}`}</span>
              </p>
              <p className={cn('mt-1 font-sans font-semibold leading-tight text-foreground', big ? 'text-[15px]' : 'text-[13px]')}>
                {big ? s.name : s.short}
              </p>
              {!big && <p className="font-sans text-[11px] leading-snug text-muted-foreground">{s.tail}</p>}
              {s.products && (
                <p
                  className={cn(
                    'mt-2 font-sans text-[11px] leading-snug',
                    s.mine === 'ic' ? trackStyles.ic.accentText : trackStyles.management.accentText,
                  )}
                >
                  {s.products}
                </p>
              )}
            </li>
          )
        })}
      </ol>
      <Rails cols={COLS_8} />
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

/** Wraps a station's product list into short lines (about 17 characters)
 *  so neighbouring stations never collide; at most four lines. */
function rows(text?: string): string[] {
  if (!text) return []
  const out: string[] = []
  let line = ''
  for (const word of text.replace(/ · /g, ', ').split(' ')) {
    if (line && (line + ' ' + word).length > 17) {
      out.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) out.push(line)
  return out.slice(0, 4)
}

function Subway() {
  const xs = [52, 148, 244, 340, 436, 532, 628]
  const main = 78
  const access = 56
  const clean = 100
  const first = (id: InitiativeId) => STAGES.findIndex((s) => s.initiatives.includes(id))
  const last = (id: InitiativeId) => STAGES.length - 1 - [...STAGES].reverse().findIndex((s) => s.initiatives.includes(id))
  return (
    <div className="mt-2 overflow-x-auto">
      <svg
        viewBox="0 0 680 190"
        className="block h-auto w-full min-w-[640px]"
        role="img"
        aria-label="Seven stations on one line, from produce to consume, with the products at each. The fine-grained access control line runs above all seven stations. The clean-data standard line runs below and stops at produce, discover, test and consume."
      >
        <line x1={xs[0]} y1={main} x2={xs[6]} y2={main} stroke="var(--stripe-b)" strokeWidth="4" strokeLinecap="round" />
        <line x1={xs[first('access')]} y1={access} x2={xs[last('access')]} y2={access} stroke="var(--track-strategy)" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
        <line x1={xs[first('clean')]} y1={clean} x2={xs[last('clean')]} y2={clean} stroke="var(--track-strategy)" strokeWidth="3" strokeLinecap="round" />
        {STAGES.map((s, i) => (
          <g key={s.n} fontFamily="var(--font-sans)">
            <text x={xs[i]} y={22} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--foreground)">
              {s.short}
            </text>
            <text x={xs[i]} y={35} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
              {s.tail}
            </text>
            {s.initiatives.includes('access') && <rect x={xs[i] - 4} y={access - 4} width="8" height="8" rx="1.5" fill="var(--track-strategy)" />}
            <circle cx={xs[i]} cy={main} r={s.mine === 'ic' ? 9 : 7} fill="var(--card)" stroke={STROKE[s.mine]} strokeWidth={s.mine === 'ic' ? 3 : 2.5} />
            {s.initiatives.includes('clean') && <circle cx={xs[i]} cy={clean} r="4" fill="var(--track-strategy)" />}
            {rows(s.productsShort ?? s.products).map((row, r) => (
              <text key={r} x={xs[i]} y={122 + r * 11} textAnchor="middle" fontSize="9.5" fill={s.mine === 'ic' ? 'var(--track-ic)' : 'var(--track-management)'}>
                {row}
              </text>
            ))}
          </g>
        ))}
        <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--track-strategy)">
          <rect x={xs[0] - 4} y={162} width="8" height="8" rx="1.5" />
          <text x={xs[0] + 10} y={170}>Fine-grained access control, across every stage · strategy mine</text>
          <circle cx={xs[0]} cy={184} r="4" />
          <text x={xs[0] + 10} y={188}>Clean-data standard · strategy mine</text>
        </g>
      </svg>
    </div>
  )
}

/* ── the hero slot ─────────────────────────────────────────────────────── */

type Variant = '4' | '8'

export function CapabilityMap({ className }: { className?: string }) {
  const [variant, setVariant] = useState<Variant>('8')
  useEffect(() => {
    try {
      const v = new URLSearchParams(window.location.search).get('map')
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after mount
      if (v === '4') setVariant(v)
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
      {variant === '4' && <Subway />}
    </section>
  )
}

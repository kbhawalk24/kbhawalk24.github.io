'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackStyles } from '@/lib/track-styles'
import {
  BAND,
  FOCUS,
  INITIATIVES,
  INITIATIVES_LABEL,
  INVOLVEMENT_LABEL,
  STAGES,
  type InitiativeId,
  type Involvement,
} from '@/lib/capability-map'

// The lifecycle band in the hero (data in lib/capability-map.ts): the seven
// stages of the data lifecycle inside one frame labelled as the data
// platform, stage four large because it is the one I designed myself for
// five years, and under the stages two rails for the horizontal
// initiatives I set the strategy for. Each rail's label is a toggle: press
// it and the stages it touched stay lit while the rest fade.
//
// Motion, per the build sequence: the cards fade and rise in once on
// first view (rare event, delight budget: opacity + translate, ease-out,
// 240 ms, 40 ms stagger, off under reduced motion); a card lifts 2px on
// hover (occasional, feedback: CSS transition on transform and shadow,
// 150 ms ease-out, hover-gated by Tailwind, transform off under reduced
// motion); the toggle fades the other cards (state indication: opacity,
// 150 ms). No layout properties animate.

const FILL: Record<Involvement, string> = {
  ic: 'bg-track-ic/10',
  management: 'bg-track-management/10',
  strategy: 'bg-track-strategy/10',
  none: 'bg-card-soft/80',
}
const DOT: Record<Involvement, string> = {
  ic: 'bg-track-ic',
  management: 'bg-track-management',
  strategy: 'bg-track-strategy',
  none: 'ring-1 ring-inset ring-foreground/25',
}
const PRODUCTS: Record<Involvement, string> = {
  ic: trackStyles.ic.accentText,
  management: trackStyles.management.accentText,
  strategy: trackStyles.strategy.accentText,
  none: 'text-muted-foreground',
}

// Three tiers: two columns on phones, three equal columns from tablet up
// with the big card on its own row, and from 1280px the single row of
// seven with the big card twice as wide and the rails under it.
const COLS = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,2fr)_repeat(3,minmax(0,1fr))]'
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1]

function Mark({ shape, className }: { shape: 'circle' | 'square'; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block size-2 shrink-0 bg-track-strategy', shape === 'circle' ? 'rounded-full' : 'rounded-[2px]', className)}
    />
  )
}

function Header() {
  return (
    <header className="flex items-start gap-3">
      <span className={cn('mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full', trackStyles.strategy.badgeFlat)}>
        <Compass className="size-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-balance font-heading text-lg font-semibold leading-tight tracking-tight text-foreground">
          {BAND.heading}
        </p>
        <p className="mt-1 font-sans text-xs text-muted-foreground">{BAND.sub}</p>
      </div>
    </header>
  )
}

function Legend() {
  const items: Involvement[] = ['ic', 'management', 'none']
  return (
    <ul className="flex flex-wrap gap-x-3.5 gap-y-1" aria-label="How to read the stages">
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

/** One initiative: a toggle label, then a rail aligned to the stage
 *  columns, a line through the span with a mark at every touched stage. */
function Rail({
  id,
  active,
  onToggle,
}: {
  id: InitiativeId
  active: InitiativeId | null
  onToggle: (id: InitiativeId) => void
}) {
  const init = INITIATIVES.find((i) => i.id === id)!
  const { from, to } = span(id)
  const on = active === id
  const dimmed = active !== null && !on
  return (
    <div className={cn('transition-opacity duration-150 ease-out', dimmed && 'opacity-40')}>
      <button
        type="button"
        aria-pressed={on}
        onClick={() => onToggle(id)}
        className={cn(
          'group -mx-1.5 flex min-h-8 items-center gap-1.5 rounded-md px-1.5 label-micro transition-colors duration-150 ease-out',
          'text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40',
          on && 'text-foreground',
        )}
      >
        <Mark shape={init.shape} />
        {init.label}
        <span className="sr-only">{on ? ', showing the stages it touched' : ', press to show the stages it touched'}</span>
      </button>
      <ol className={cn('grid gap-x-2', COLS)} aria-hidden="true">
        {STAGES.map((s, i) => {
          const inSpan = i >= from && i <= to
          const touched = s.initiatives.includes(id)
          return (
            <li key={s.n} className="relative flex h-3 items-center justify-center">
              {inSpan && (
                <span
                  className={cn(
                    'absolute top-1/2 h-px -translate-y-1/2 bg-track-strategy transition-opacity duration-150 ease-out',
                    on ? 'opacity-70' : 'opacity-30',
                    i === from ? 'left-1/2' : 'left-0',
                    i === to ? 'right-1/2' : 'right-0',
                  )}
                />
              )}
              {touched && <Mark shape={init.shape} className="relative" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** The hero slot. */
export function CapabilityMap({ className }: { className?: string }) {
  const [active, setActive] = useState<InitiativeId | null>(null)
  const reduce = useReducedMotion()
  const toggle = (id: InitiativeId) => setActive((a) => (a === id ? null : id))

  return (
    <section className={className} aria-label="What I led design and strategy for, at a glance">
      <Header />
      <div className="mt-3">
        <Legend />
      </div>

      {/* The platform frame: one tinted surface around the seven stages,
          captioned so the diagram reads as one data platform. */}
      <div className="mt-4 rounded-[14px] bg-card/60 p-3 md:p-4">
        <ol className={cn('grid gap-2', COLS)}>
          {STAGES.map((s, i) => {
            const big = i === FOCUS.index
            const touched = active !== null && s.initiatives.includes(active)
            const dimmed = active !== null && !touched
            return (
              <motion.li
                key={s.n}
                initial={reduce ? false : { opacity: 0, transform: 'translateY(8px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.24, ease: EASE_OUT_QUART, delay: reduce ? 0 : i * 0.04 }}
                className={cn('flex', big && 'col-span-2 md:col-span-3 xl:col-span-1 xl:col-start-4 xl:row-start-1')}
              >
                {/* The entrance animates the list item; the card itself
                    carries the tint, the hover lift and the toggle's dim,
                    so the two never write the same opacity. */}
                <div
                  className={cn(
                    'flex w-full flex-col rounded-[12px] px-3.5 py-3 transition-[opacity,transform,box-shadow] duration-150 ease-out',
                    'motion-safe:hover:-translate-y-0.5 hover:shadow-soft',
                    FILL[s.mine],
                    big && 'xl:py-3.5',
                    dimmed && 'opacity-40',
                  )}
                >
                  <p className="label-micro text-muted-foreground">
                    {s.n}
                    <span className="sr-only">, {INVOLVEMENT_LABEL[s.mine]}</span>
                  </p>
                  <p
                    className={cn(
                      'mt-1.5 text-balance font-heading font-semibold leading-tight tracking-tight text-foreground',
                      big ? 'text-lg' : 'text-[15px]',
                    )}
                  >
                    {s.name}
                  </p>
                  <p className="mt-1 font-sans text-xs leading-snug text-muted-foreground">{s.what}</p>
                  {s.products.length > 0 && (
                    <ul className={cn('mt-2.5 grid gap-1 font-sans text-xs leading-snug', PRODUCTS[s.mine])}>
                      {s.products.map((pr) => (
                        <li key={pr}>{pr}</li>
                      ))}
                    </ul>
                  )}
                  {/* Below the seven-column tier there are no rails, so each
                      card shows the marks of the initiatives that touched it. */}
                  {s.initiatives.length > 0 && (
                    <p className="mt-auto flex items-center gap-1 pt-2 xl:hidden" aria-label="Initiatives that touched this stage">
                      {s.initiatives.map((id) => (
                        <Mark key={id} shape={INITIATIVES.find((x) => x.id === id)!.shape} />
                      ))}
                    </p>
                  )}
                </div>
              </motion.li>
            )
          })}
        </ol>

        <div className="mt-5 hidden gap-2.5 xl:grid">
          <p className="label-micro text-foreground">{INITIATIVES_LABEL}</p>
          {INITIATIVES.map((i) => (
            <Rail key={i.id} id={i.id} active={active} onToggle={toggle} />
          ))}
        </div>
      </div>

      {/* The toggles live in the rails, which only the widest tier shows;
          everything narrower gets the same two toggles as chips. */}
      <div className="mt-3 xl:hidden">
        <p className="mb-2 label-micro text-foreground">{INITIATIVES_LABEL}</p>
        <div className="flex flex-wrap gap-2">
        {INITIATIVES.map((i) => {
          const on = active === i.id
          return (
            <button
              key={i.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(i.id)}
              className={cn(
                'inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 label-micro transition-colors duration-150 ease-out',
                on ? 'bg-primary text-primary-foreground' : 'bg-card-soft text-foreground ring-1 ring-foreground/10',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40',
              )}
            >
              <Mark shape={i.shape} className={cn(on && 'bg-primary-foreground')} />
              {i.label}
            </button>
          )
        })}
        </div>
      </div>
    </section>
  )
}

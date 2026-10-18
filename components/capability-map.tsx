'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { LifecycleWheel } from '@/components/lifecycle-wheel'
import { cn } from '@/lib/utils'
import { BAND, MATRIX_ROWS, STAGES, type Stage } from '@/lib/capability-map'
import type { Track } from '@/lib/timeline-data'

// The lifecycle section in the hero (data in lib/capability-map.ts).
// Two parts, kept apart on purpose: the seven stages as a plain table of
// cards (number, name, what it covers, products), and under them a matrix
// of four yes-or-no rows (designed myself, owned as manager, the two
// initiatives) with one encoding only, a filled cell. Ownership lives in
// the matrix and nowhere else; the cards carry no tint, size or marker.
//
// From 1280px the matrix sits on the same seven columns as the cards.
// Narrower, the cards wrap, so the matrix turns on its side: a row per
// stage, a column per question, which lines up at any width.
//
// Motion: the cards fade and rise in once when the list comes into view
// (opacity and translate, 240 ms ease-out, 40 ms stagger, off under
// reduced motion).

const FILL: Record<Track, string> = {
  ic: 'bg-track-ic',
  management: 'bg-track-management',
  strategy: 'bg-track-strategy',
}
const EMPTY = 'bg-foreground/[0.05]'
const COLS = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-7'
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1]

// The list, not each card, is what comes into view: a single card can be
// jumped over in one frame (an anchor link, a fast scroll) and would then
// never trigger, staying invisible. The list is too tall to skip.
const LIST = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }
const ITEM = {
  hidden: { opacity: 0, transform: 'translateY(8px)' },
  show: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.24, ease: EASE_OUT_QUART } },
}

function Card({ stage }: { stage: Stage }) {
  return (
    <motion.li variants={ITEM} className="flex flex-col rounded-[12px] bg-card px-3.5 py-3 shadow-soft">
      <p className="label-micro text-muted-foreground">{stage.n}</p>
      <p className="mt-1.5 text-balance font-heading text-[15px] font-semibold leading-tight tracking-tight text-foreground">
        {stage.name}
      </p>
      <p className="mt-1 font-sans text-xs leading-snug text-muted-foreground">{stage.what}</p>
      {stage.products.length > 0 && (
        <ul className="mt-3 grid gap-1 font-sans text-xs leading-snug text-foreground">
          {stage.products.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
    </motion.li>
  )
}

function Cell({ on, tone, label }: { on: boolean; tone: Track; label: string }) {
  return (
    <span className={cn('block h-6 rounded-[5px]', on ? FILL[tone] : EMPTY)}>
      <span className="sr-only">{label}</span>
    </span>
  )
}

/** Wide: a row per question, cells on the cards' seven columns. */
function MatrixWide() {
  return (
    <div className="mt-5 hidden xl:block" role="table" aria-label="Which stages each row applies to">
      {MATRIX_ROWS.map((row) => (
        <div key={row.id} role="row" className="mt-2.5 first:mt-0">
          <p className="mb-1.5 flex items-baseline gap-2 font-sans text-[13px] text-foreground">
            <span aria-hidden="true" className={cn('relative top-px inline-block size-2.5 rounded-[3px]', FILL[row.tone])} />
            <span role="rowheader">{row.label}</span>
            <span className="label-micro text-muted-foreground">{row.note}</span>
          </p>
          <div className={cn('grid gap-2', COLS)}>
            {STAGES.map((s) => (
              <span key={s.n} role="cell">
                <Cell on={row.applies(s)} tone={row.tone} label={`${row.applies(s) ? 'Yes' : 'No'}: ${s.name}`} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Narrow: a row per stage, a column per question. */
function MatrixNarrow() {
  return (
    <div className="mt-5 xl:hidden" role="table" aria-label="Which rows apply to each stage">
      <div role="row" className="grid grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] items-end gap-2">
        <span />
        {MATRIX_ROWS.map((row) => (
          <span key={row.id} role="columnheader" className="flex flex-col items-center gap-1 text-center label-micro text-muted-foreground">
            <span aria-hidden="true" className={cn('inline-block size-2.5 rounded-[3px]', FILL[row.tone])} />
            {row.label}
          </span>
        ))}
      </div>
      {STAGES.map((s) => (
        <div key={s.n} role="row" className="mt-1.5 grid grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] items-center gap-2">
          <span role="rowheader" className="font-sans text-xs leading-snug text-foreground">
            <span className="label-micro text-muted-foreground">{s.n}</span> {s.name}
          </span>
          {MATRIX_ROWS.map((row) => (
            <span key={row.id} role="cell">
              <Cell on={row.applies(s)} tone={row.tone} label={`${row.applies(s) ? 'Yes' : 'No'}: ${row.label}`} />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

/** The cards and the matrix. */
function CardsAndMatrix({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  // Driven by `animate` from an in-view flag rather than `whileInView`, so
  // the variant label reliably propagates to the staggered children.
  const listRef = useRef<HTMLOListElement>(null)
  const inView = useInView(listRef, { once: true, margin: '-40px' })
  const show = reduce || inView
  return (
    <section className={className} aria-label="What I led design and strategy for, at a glance">
      <h2 className="text-balance font-heading text-lg font-semibold leading-tight tracking-tight text-foreground md:text-xl">
        {BAND.heading}
      </h2>
      <p className="mt-1.5 max-w-[70ch] font-sans text-xs leading-relaxed text-muted-foreground">{BAND.sub}</p>

      <motion.ol
        ref={listRef}
        variants={LIST}
        initial={reduce ? false : 'hidden'}
        animate={show ? 'show' : 'hidden'}
        className={cn('mt-4 grid gap-2', COLS)}
      >
        {STAGES.map((s) => (
          <Card key={s.n} stage={s} />
        ))}
      </motion.ol>

      <MatrixWide />
      <MatrixNarrow />
    </section>
  )
}

/** The hero slot. `?viz=wheel` shows the lifecycle wheel (wheel/README.md)
 *  as the alternative, with the cards and matrix as its narrow fallback;
 *  the cards and matrix are the default. Remove the switch once chosen. */
export function CapabilityMap({ className }: { className?: string }) {
  const [wheel, setWheel] = useState(false)
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after mount
      if (new URLSearchParams(window.location.search).get('viz') === 'wheel') setWheel(true)
    } catch {
      /* keep the default */
    }
  }, [])
  if (wheel) return <LifecycleWheel className={className} fallback={<CardsAndMatrix className={className} />} />
  return <CardsAndMatrix className={className} />
}

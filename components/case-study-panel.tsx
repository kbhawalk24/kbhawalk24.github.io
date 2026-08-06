'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  TRACKS,
  type Track,
  type TimelineEntry,
  type TimelineRole,
} from '@/lib/timeline-data'
import { CASE_STUDIES } from '@/lib/case-studies'

const trackStyles: Record<
  Track,
  { badge: string; dot: string; accentText: string; accentBorder: string }
> = {
  management: {
    badge:
      'bg-track-management/10 text-track-management border-track-management/25',
    dot: 'bg-track-management',
    accentText: 'text-track-management',
    accentBorder: 'border-track-management',
  },
  strategy: {
    badge: 'bg-track-strategy/10 text-track-strategy border-track-strategy/25',
    dot: 'bg-track-strategy',
    accentText: 'text-track-strategy',
    accentBorder: 'border-track-strategy',
  },
  ic: {
    badge: 'bg-track-ic/10 text-track-ic border-track-ic/25',
    dot: 'bg-track-ic',
    accentText: 'text-track-ic',
    accentBorder: 'border-track-ic',
  },
}

export interface SelectedCase {
  entry: TimelineEntry
  role: TimelineRole
}

export function CaseStudyPanel({
  selected,
  onClose,
}: {
  selected: SelectedCase
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  // Stable ref so the keydown effect never needs to re-register when the
  // parent re-renders with a new inline arrow for onClose.
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose })

  // Escape to close + focus the close button on open
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // Reset the panel's internal scroll when switching case studies
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [selected])

  const study = CASE_STUDIES[selected.entry.headline]
  if (!study) return null

  return (
    <motion.aside
      key={selected.entry.headline}
      role="region"
      aria-label={`Case study: ${selected.entry.headline}`}
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 48 }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      className="flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg md:sticky md:top-[128px] md:max-h-[calc(100vh-148px)] md:w-4/5"
    >
      {/* Panel header */}
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 md:px-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-widest',
                trackStyles[selected.entry.track].badge,
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'size-1.5 rounded-full',
                  trackStyles[selected.entry.track].dot,
                )}
              />
              {TRACKS[selected.entry.track].label}
            </span>
            <span className="font-sans text-xs text-muted-foreground">
              {selected.role.title} · {selected.role.company} ·{' '}
              {selected.role.period}
            </span>
          </div>
          <h2 className="mt-2 text-balance font-serif text-2xl tracking-tight md:text-3xl">
            {selected.entry.headline}
          </h2>
          <p className="mt-1 text-pretty text-sm text-muted-foreground md:text-base">
            {study.subtitle}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full border border-border bg-background p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Close case study</span>
        </button>
      </header>

      {/* Scrollable body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="grid gap-10 px-5 py-8 md:px-8 md:py-10">
          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className={cn(
                  'rounded-lg border-l-2 bg-background p-4',
                  trackStyles[selected.entry.track].accentBorder,
                )}
              >
                <p className="font-serif text-xl tracking-tight md:text-2xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Context */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h3 className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Context
            </h3>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed">
              {study.context}
            </p>
          </motion.section>

          {/* Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <h3 className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
              The challenge
            </h3>
            <p
              className={cn(
                'mt-3 max-w-2xl border-l-2 pl-4 text-pretty text-lg font-medium leading-relaxed',
                trackStyles[selected.entry.track].accentBorder,
              )}
            >
              {study.challenge}
            </p>
          </motion.section>

          {/* Approach */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Approach
            </h3>
            <ol className="mt-4 grid gap-4">
              {study.approach.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-lg border border-border bg-background p-4 md:p-5"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'font-sans text-sm font-semibold tabular-nums',
                      trackStyles[selected.entry.track].accentText,
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-medium leading-snug">{step.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.section>

          {/* Outcomes */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <h3 className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Outcomes
            </h3>
            <ul className="mt-4 grid max-w-2xl gap-3">
              {study.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-2 size-1.5 shrink-0 rounded-full',
                      trackStyles[selected.entry.track].dot,
                    )}
                  />
                  <p className="text-pretty leading-relaxed">{outcome}</p>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </motion.aside>
  )
}

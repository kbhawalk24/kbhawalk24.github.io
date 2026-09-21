'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TimelineMetric, Track } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import type { Chapter, PortfolioPage } from '@/lib/site-content'
import { EASE_OUT } from '@/components/motion-primitives'

// Inline preview that opens next to the timeline card that triggered it —
// a teaser pulled from the chapter it links to, not a duplicate of the
// full case-study page.
export function InlineCasePreview({
  track,
  page,
  chapter,
  metricFallback,
  onClose,
}: {
  track: Track
  page: PortfolioPage
  chapter: Chapter
  metricFallback?: TimelineMetric
  onClose: () => void
}) {
  const metrics = chapter.metrics?.length
    ? chapter.metrics
    : metricFallback
      ? [metricFallback]
      : []

  return (
    /* Opens on grid-template-rows 0fr→1fr rather than a JS-measured
       height:auto — the browser resolves the size itself, so there's no
       per-frame measure/write cycle driving the reflow.
       A div, not an li: on the timeline this panel mounts inside the role's
       own <li>, and an <li> nested directly in an <li> is invalid HTML (React
       flagged it as a hydration error). It's a disclosure panel, not a list
       item. */
    <motion.div
      layout
      initial={{ opacity: 0, gridTemplateRows: '0fr' }}
      animate={{ opacity: 1, gridTemplateRows: '1fr' }}
      exit={{ opacity: 0, gridTemplateRows: '0fr' }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="col-span-full grid"
    >
      <div className="min-h-0 overflow-hidden">
      <div className="mt-1 rounded-[14px] bg-panel">
        <div className="relative p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-card p-3.5 text-muted-foreground ring-1 ring-foreground/10 transition-colors hover:bg-secondary hover:text-foreground hover:ring-foreground/30"
          >
            <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
            <span className="sr-only">Close preview</span>
          </button>

          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 label-micro font-semibold',
              trackStyles[track].badge,
            )}
          >
            <span aria-hidden="true" className={cn('size-1.5 rounded-full', trackStyles[track].dot)} />
            {page.eyebrow}
          </span>

          <h4 className="mt-3 max-w-xl text-balance pr-10 font-heading text-xl font-semibold leading-snug">{chapter.title}</h4>
          <p className="mt-1 font-sans text-xs tabular-nums text-muted-foreground">{chapter.period}</p>

          {chapter.body[0] && (
            <p className="mt-4 max-w-[52ch] text-pretty leading-relaxed text-foreground/90">{chapter.body[0]}</p>
          )}

          {metrics.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="flex flex-col-reverse rounded-[10px] bg-card p-3">
                    <dt className="mt-1 text-[11px] leading-snug text-muted-foreground">{m.label}</dt>
                    <dd className="font-heading text-lg font-semibold tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <Link
            href={`${page.href}#${chapter.id}`}
            className={cn(
              'mt-5 -mb-2 inline-flex min-h-11 items-center gap-1.5 py-2 font-sans text-sm font-medium underline-offset-4 hover:underline',
              trackStyles[track].accentText,
            )}
          >
            Read the full story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      </div>
    </motion.div>
  )
}

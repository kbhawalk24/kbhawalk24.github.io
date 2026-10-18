'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'
import { useInViewOnce } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useTimeline } from '@/components/impact/use-timeline'
import { HeadingDot } from '@/components/heading-dot'

/**
 * The clock every impact viz runs on. Plays once when the element scrolls
 * into view, again on Replay, never loops. Until it has played (the server
 * render, and readers without JavaScript) the end state renders, so the
 * page makes its point without motion; reduced motion keeps the end state.
 */
export function useImpactClock(total: number) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInViewOnce(ref, 0.25)
  const reduced = useReducedMotion()
  const [replays, setReplays] = useState(0)
  // Scrolling into view is play 1; each Replay is one more.
  const play = (inView ? 1 : 0) + replays
  const replay = useCallback(() => setReplays((n) => n + 1), [])
  const elapsed = useTimeline(play, total, reduced)
  const e = play === 0 && !reduced ? total : elapsed
  return { ref, elapsed: e, reduced, replay, settled: e >= total }
}

export function ImpactFrame({
  id,
  heading,
  summary,
  source,
  frameRef,
  reduced,
  settled,
  onReplay,
  children,
}: {
  id: string
  heading: string
  summary: string
  source: string
  frameRef: React.RefObject<HTMLElement | null>
  reduced: boolean
  settled: boolean
  onReplay: () => void
  children: ReactNode
}) {
  return (
    <section
      ref={frameRef}
      id={id}
      data-impact-viz={id}
      data-settled={settled ? 'true' : 'false'}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-summary`}
      className="mt-10 scroll-mt-28 rounded-[20px] bg-card p-5 shadow-soft sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <h2 id={`${id}-heading`} className="text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {heading}
          <HeadingDot />
        </h2>
        {!reduced && (
          <button
            type="button"
            onClick={onReplay}
            className="label-micro inline-flex min-h-9 items-center rounded-full px-3 text-accent-brand ring-1 ring-accent-brand/20 transition-colors hover:bg-accent-brand/10"
          >
            Replay
          </button>
        )}
      </div>
      <div className="mt-6">{children}</div>
      <p id={`${id}-summary`} className="prose-measure mt-6 font-sans text-sm leading-relaxed text-foreground">
        {summary}
      </p>
      <p className="mt-2 font-sans text-xs text-muted-foreground">{source}</p>
    </section>
  )
}

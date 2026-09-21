'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Chapter } from '@/lib/site-content'

/** Which chapter the reader is in, from an IntersectionObserver band just
 *  under the header (no scroll listeners). Several sections can straddle the
 *  band at once, so the active one is the first in document order. */
function useActiveChapter(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target.id)
          else seen.delete(e.target.id)
        }
        const first = ids.find((id) => seen.has(id))
        if (first) setActive(first)
      },
      // Band runs from just below the dock to 45% up from the bottom.
      { rootMargin: '-160px 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}

/** Compact chapter rail that sticks under the header pill once the overview
 *  strip has scrolled away. One horizontally scrolling row of chips at every
 *  size: on a phone it scrolls inside its own track, so the page itself never
 *  scrolls sideways. */
export function ChapterRail({
  chapters,
  containerId,
}: {
  chapters: Chapter[]
  containerId: string
}) {
  const ids = chapters.map((c) => c.id)
  const active = useActiveChapter(ids)
  const [inRange, setInRange] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // The rail belongs to the chapters: it fades in when the first chapter
  // reaches the top of the page and leaves with the last one. Observing the
  // chapters container itself (not a `display: contents` sentinel, which has
  // no box for IntersectionObserver to measure).
  useEffect(() => {
    const el = document.getElementById(containerId)
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setInRange(e.isIntersecting),
      { rootMargin: '-160px 0px -30% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [containerId])

  // Keep the active chip in view inside the track, without scrolling the page
  // (which is what scrollIntoView would do).
  useEffect(() => {
    const track = trackRef.current
    if (!track || !active) return
    const chip = track.querySelector<HTMLElement>(`[data-chip="${active}"]`)
    if (!chip) return
    const left = chip.offsetLeft - track.clientWidth / 2 + chip.clientWidth / 2
    track.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [active])

  // Unmounted until the reader is actually among the chapters: the dock is
  // fixed, so mounting it costs no layout shift, and nothing invisible is
  // left in the accessibility tree or the tab order.
  if (!inRange) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[5.5rem] z-40 flex justify-center px-6 md:px-10 lg:px-14">
      <nav
        aria-label="Chapters"
        className="pointer-events-auto w-full max-w-6xl rounded-full bg-background/85 p-1 shadow-float ring-1 ring-foreground/[7%] backdrop-blur-xl"
      >
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chapters.map((c, i) => {
            const isActive = c.id === active
            return (
              <a
                key={c.id}
                data-chip={c.id}
                href={`#${c.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full px-4 font-sans text-sm transition-colors',
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-panel-soft hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'label-micro tabular-nums',
                    isActive ? 'text-background/70' : 'text-muted-foreground',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="max-w-[15rem] truncate">{c.title}</span>
              </a>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

/** Previous / next chapter at the foot of a chapter, so the page can be read
 *  straight through without scrolling back to the rail. */
export function ChapterPager({ prev, next }: { prev?: Chapter; next?: Chapter }) {
  if (!prev && !next) return null
  return (
    <nav
      aria-label="Chapter"
      className="mt-10 flex flex-wrap items-start justify-between gap-x-8 gap-y-3 border-t border-border pt-5"
    >
      {prev ? (
        <a href={`#${prev.id}`} className="group -my-2 max-w-[20rem] py-2">
          <span className="label-micro text-muted-foreground">Previous</span>
          <span className="mt-1 flex items-baseline gap-1.5 font-sans text-sm font-medium text-foreground">
            <span aria-hidden="true" className="text-muted-foreground transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="group-hover:underline">{prev.title}</span>
          </span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a href={`#${next.id}`} className="group -my-2 max-w-[20rem] py-2 sm:text-right">
          <span className="label-micro text-muted-foreground">Next</span>
          <span className="mt-1 flex items-baseline gap-1.5 font-sans text-sm font-medium text-foreground sm:justify-end">
            <span className="group-hover:underline">{next.title}</span>
            <span aria-hidden="true" className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </a>
      ) : (
        <span />
      )}
    </nav>
  )
}

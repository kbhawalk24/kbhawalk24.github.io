'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Chapter } from '@/lib/site-content'

/** Which chapter the reader is in, from an IntersectionObserver band just
 *  under the header (no scroll listeners). Several sections can straddle the
 *  band at once, so the active one is the first in document order. */
export function useActiveChapter(ids: string[]) {
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
      { rootMargin: '-120px 0px -55% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}

/** Chapter rail: a vertical list pinned in the page's left column on large
 *  screens. It lives in the layout rather than floating over it, so it can
 *  never collide with the header pill the way a second floating bar did.
 *  Below lg there is no room for a column, and the chapters fold into the
 *  header pill's menu instead. */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const active = useActiveChapter(chapters.map((c) => c.id))

  return (
    <nav aria-label="Chapters" className="hidden lg:block">
      <ol className="sticky top-28 border-l border-border">
        {chapters.map((c, i) => {
          const isActive = c.id === active
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  '-ml-px flex gap-2.5 border-l-2 py-2 pl-4 pr-2 font-sans text-sm leading-snug transition-colors',
                  isActive
                    ? 'border-accent-brand text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'label-micro pt-0.5 tabular-nums',
                    isActive ? 'text-accent-brand' : 'text-muted-foreground/70',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-balance">{c.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Previous / next chapter at the foot of a chapter, so the page can be read
 *  straight through without going back to the rail. */
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
              &larr;
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
              &rarr;
            </span>
          </span>
        </a>
      ) : (
        <span />
      )}
    </nav>
  )
}

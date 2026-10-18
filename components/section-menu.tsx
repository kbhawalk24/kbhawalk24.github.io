'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface SectionMenuItem {
  id: string
  label: string
}

/** The sticky section menu on the long pages: a left rail from `lg` up, a
 *  jump `<select>` bar below that. The current section is tracked with an
 *  IntersectionObserver; the links are plain anchors so they work without it. */
export function SectionMenu({ items, label = 'On this page' }: { items: SectionMenuItem[]; label?: string }) {
  const [current, setCurrent] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return
    const visible = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top)
          else visible.delete(e.target.id)
        }
        if (visible.size === 0) return
        // The visible section nearest the top of the viewport is current.
        const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0]
        setCurrent(top)
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: [0, 0.1] },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [items])

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
    setCurrent(id)
  }

  return (
    <>
      {/* Phones and tablets: one select, stuck under the floating header. */}
      <div className="sticky top-16 z-30 -mx-4 mb-6 bg-background/85 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6 md:top-[4.5rem] lg:hidden">
        <label className="flex items-center gap-3">
          <span className="label-micro shrink-0 text-muted-foreground">{label}</span>
          <select
            value={current}
            onChange={(e) => jump(e.target.value)}
            className="min-h-11 w-full min-w-0 rounded-[10px] bg-card px-3 font-sans text-sm shadow-soft"
          >
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Wide screens: the rail. */}
      <nav aria-label={label} className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
        <p className="label-micro text-muted-foreground">{label}</p>
        <ol className="mt-3 space-y-1 border-l border-foreground/10">
          {items.map((i) => {
            const active = i.id === current
            return (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  aria-current={active ? 'location' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    jump(i.id)
                  }}
                  className={cn(
                    '-ml-px block border-l-2 py-1 pl-4 pr-2 font-sans text-sm leading-snug transition-colors',
                    active
                      ? 'border-accent-brand text-foreground'
                      : 'border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                  )}
                >
                  {i.label}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

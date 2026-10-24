'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// On-page section navigation. The rail sits beside the content from 1024px
// up and stays put while the page scrolls; the row is a line of pills under
// the title for narrower screens, or for pages whose content needs the full
// width. Both highlight the section currently under the header.

export interface Chapter {
  id: string
  title: string
}

const HEADER_OFFSET = 140

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= HEADER_OFFSET) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return active
}

export function SectionNav({
  chapters,
  variant = 'rail',
  label = 'On this page',
  className,
}: {
  chapters: Chapter[]
  variant?: 'rail' | 'row'
  label?: string
  className?: string
}) {
  const active = useActiveSection(chapters.map((c) => c.id))
  if (chapters.length === 0) return null

  if (variant === 'row') {
    return (
      <nav aria-label={label} className={cn('w-full max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none]', className)} style={{ contain: 'inline-size' }}>
        <ol className="flex w-max gap-2">
          {chapters.map((c) => {
            const isActive = c.id === active
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-sm transition-colors',
                    isActive ? 'bg-primary font-semibold text-primary-foreground' : 'bg-card-soft text-foreground hover:bg-card',
                  )}
                >
                  {c.title}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  return (
    <nav aria-label={label} className={className}>
      <p className="label-micro text-muted-foreground">{label}</p>
      <ol className="mt-3 border-l border-foreground/10">
        {chapters.map((c) => {
          const isActive = c.id === active
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  '-ml-px block border-l-2 py-1.5 pl-4 pr-2 font-sans text-sm leading-snug transition-colors',
                  isActive
                    ? 'border-accent-brand font-semibold text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-foreground/25 hover:text-foreground',
                )}
              >
                {c.title}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Two-column page body: the content, with the rail on the right from 1024px up and the row above the content below that. */
export function WithSectionNav({ chapters, children }: { chapters: Chapter[]; children: React.ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_11rem] lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <SectionNav chapters={chapters} variant="row" className="mb-8 lg:hidden" />
        {children}
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-[14px] bg-card p-5 shadow-soft">
          <SectionNav chapters={chapters} variant="rail" label="Contents" />
        </div>
      </aside>
    </div>
  )
}

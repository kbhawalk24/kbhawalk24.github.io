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
  label = 'Contents',
  className,
}: {
  chapters: Chapter[]
  label?: string
  className?: string
}) {
  const active = useActiveSection(chapters.map((c) => c.id))
  if (chapters.length === 0) return null

  // One nav in the HTML: a scrolling row of pills below 1024px, a labelled rail
  // with a left rule from 1024px up. Rendering it once keeps text readers and
  // screen readers from meeting the contents list twice.
  return (
    <nav
      aria-label={label}
      className={cn('w-full max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] lg:overflow-visible', className)}
    >
      <p className="label-micro hidden text-muted-foreground lg:block">{label}</p>
      <ol className="flex w-max gap-2 lg:mt-3 lg:block lg:w-auto lg:border-l lg:border-foreground/10">
        {chapters.map((c) => {
          const isActive = c.id === active
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-sm transition-colors',
                  'lg:-ml-px lg:block lg:min-h-0 lg:whitespace-normal lg:rounded-none lg:border-l-2 lg:bg-transparent lg:py-1.5 lg:pl-4 lg:pr-2 lg:leading-snug lg:hover:bg-transparent',
                  isActive
                    ? 'bg-primary font-semibold text-primary-foreground lg:border-accent-brand lg:text-foreground'
                    : 'bg-card-soft text-foreground hover:bg-card lg:border-transparent lg:text-muted-foreground lg:hover:border-foreground/25 lg:hover:text-foreground',
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

/** Two-column page body: the content, with the contents nav as a row above it below 1024px and as a sticky rail on the right from 1024px up. The nav is rendered once and placed by the grid. */
export function WithSectionNav({ chapters, children }: { chapters: Chapter[]; children: React.ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_11rem] lg:gap-12 xl:gap-16">
      <aside className="mb-8 lg:col-start-2 lg:row-start-1 lg:mb-0">
        <div className="lg:sticky lg:top-28 lg:rounded-[14px] lg:bg-card lg:p-5 lg:shadow-soft">
          <SectionNav chapters={chapters} />
        </div>
      </aside>
      <div className="min-w-0 lg:col-start-1 lg:row-start-1">{children}</div>
    </div>
  )
}

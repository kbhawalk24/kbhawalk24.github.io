'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/components/motion-primitives'
import type { Chapter } from '@/lib/site-content'
import { useLens, withLens } from '@/components/lens'

/** Floating pill nav, on every page from load: Case studies / Experience /
 *  Contact. (The IC/Manager lens switch and the A/B/C layout switch used to
 *  sit here; see previous-experiments/. The lens still rides along in links
 *  if a URL carries it, but has no control.)
 *
 *  On a case study the pill also carries the chapter list, but only below
 *  `lg`, where the page has no room for the left-hand chapter rail. One
 *  floating object at every width: a second bar under this one collided
 *  with it. */
export function SiteHeader({
  onHome = true,
  chapters = [],
}: {
  onHome?: boolean
  chapters?: Chapter[]
}) {
  const { lens } = useLens()
  const home = onHome ? '' : '/'

  const links: NavItem[] = [
    { label: 'Case studies', href: `${home}#case-studies` },
    { label: 'Experience', href: `${home}#experience` },
    { label: 'Resume', href: '/kanchi-bhawalkar-resume.pdf', external: true },
    { label: 'Contact', href: `${home}#contact` },
  ]
  const chapterItems = chapters.map((c) => ({ label: c.title, href: `#${c.id}` }))

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <motion.nav
        aria-label="Site"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: EASE_OUT }}
        className="pointer-events-auto flex w-max max-w-full items-center gap-1 rounded-full bg-card/80 py-1.5 pl-4 pr-1.5 shadow-float ring-1 ring-foreground/[7%] backdrop-blur-xl sm:gap-2 sm:pl-5"
      >
        <Link
          href={withLens('/', lens)}
          translate="no"
          className="-my-2 mr-1 rounded-full py-2 font-sans text-sm font-semibold tracking-tight transition-colors hover:text-accent-brand"
        >
          Kanchi Bhawalkar
        </Link>

        <div className="hidden items-center sm:flex">
          {links.map((l) => (
            <NavLink key={l.label} href={l.external ? l.href : withLens(l.href, lens)} external={l.external}>
              {l.label}
            </NavLink>
          ))}
          {chapters.length > 0 && (
            <div className="lg:hidden">
              <NavMenu label="Chapters" items={chapterItems} />
            </div>
          )}
        </div>

        {/* Phone: everything folds into one menu. */}
        <div className="sm:hidden">
          <NavMenu items={links} groupLabel={chapters.length > 0 ? 'Chapters' : undefined} group={chapterItems} />
        </div>
      </motion.nav>
    </header>
  )
}

type NavItem = { label: string; href: string; external?: boolean }

const externalProps = (external?: boolean) =>
  external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

function NavLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) {
  const className =
    'inline-flex min-h-9 items-center rounded-full px-3 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground'
  // A file or an outside site gets a plain anchor; <Link> would try to
  // prefetch it as a route.
  if (external) {
    return (
      <a href={href} {...externalProps(true)} className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function NavMenu({
  items,
  label = 'Menu',
  groupLabel,
  group = [],
}: {
  items: NavItem[]
  label?: string
  groupLabel?: string
  group?: { label: string; href: string }[]
}) {
  const { lens } = useLens()
  const [open, setOpen] = useState(false)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex min-h-9 items-center gap-1 rounded-full px-3 font-sans text-sm transition-colors hover:text-foreground',
          open ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: EASE_OUT }}
            className="absolute left-1/2 top-[calc(100%+10px)] max-h-[70vh] w-60 -translate-x-1/2 overflow-y-auto rounded-[14px] bg-card p-1.5 shadow-float ring-1 ring-foreground/[7%]"
          >
            {items.map((l) => (
              <li key={l.href}>
                <MenuItem
                  href={l.external ? l.href : withLens(l.href, lens)}
                  external={l.external}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </MenuItem>
              </li>
            ))}
            {groupLabel && group.length > 0 && (
              <li aria-hidden="true" className="mx-2 my-1 border-t border-border" />
            )}
            {groupLabel && group.length > 0 && (
              <li className="px-3 pb-1 pt-1.5">
                <span className="label-micro text-muted-foreground">{groupLabel}</span>
              </li>
            )}
            {group.map((l) => (
              <li key={l.href}>
                <MenuItem href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </MenuItem>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuItem({
  href,
  external,
  onClick,
  children,
}: {
  href: string
  external?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  const className =
    'block rounded-[10px] px-3 py-2 font-sans text-sm text-foreground transition-colors hover:bg-card-soft'
  if (external) {
    return (
      <a href={href} {...externalProps(true)} onClick={onClick} className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  )
}

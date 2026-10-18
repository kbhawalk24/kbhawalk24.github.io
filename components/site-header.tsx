'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/routes'
import { ExternalGlyph } from '@/components/external-link'

/** Floating pill nav on every page: Work · About · Timeline · Resume ↗ · LinkedIn ↗.
 *  The last two open in a new tab. On phones everything folds into one menu. */
export function SiteHeader() {
  const pathname = usePathname()

  const links: NavItem[] = [
    { label: 'Work', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Timeline', href: '/timeline' },
    { label: 'Resume', href: SITE.resume, external: true },
    { label: 'LinkedIn', href: SITE.linkedin, external: true },
  ]

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <nav
        aria-label="Site"
        className="nav-enter pointer-events-auto flex w-max max-w-full items-center gap-1 rounded-full bg-card/80 py-1.5 pl-4 pr-1.5 shadow-float ring-1 ring-foreground/[7%] backdrop-blur-xl sm:gap-2 sm:pl-5"
      >
        <Link
          href="/"
          translate="no"
          className="-my-2 mr-1 rounded-full py-2 font-sans text-sm font-semibold tracking-tight transition-colors hover:text-accent-brand"
        >
          {SITE.name}
        </Link>

        <div className="hidden items-center sm:flex">
          {links.map((l) => (
            <NavLink key={l.label} item={l} current={isCurrent(pathname, l)} />
          ))}
        </div>

        <div className="sm:hidden">
          <NavMenu items={links} pathname={pathname} />
        </div>
      </nav>
    </header>
  )
}

type NavItem = { label: string; href: string; external?: boolean }

function isCurrent(pathname: string | null, item: NavItem) {
  if (item.external || !pathname) return false
  if (item.href === '/') return pathname === '/' || pathname.startsWith('/work')
  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

function NavLink({ item, current }: { item: NavItem; current: boolean }) {
  const className = cn(
    'inline-flex min-h-9 items-center gap-1 rounded-full px-3 font-sans text-sm transition-colors hover:text-foreground',
    current ? 'text-foreground' : 'text-muted-foreground',
  )
  // A file or an outside site gets a plain anchor; <Link> would try to
  // prefetch it as a route.
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
        <ExternalGlyph />
      </a>
    )
  }
  return (
    <Link href={item.href} aria-current={current ? 'page' : undefined} className={className}>
      {item.label}
    </Link>
  )
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}

function NavMenu({ items, pathname }: { items: NavItem[]; pathname: string | null }) {
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
        Menu
        <Chevron className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          id={id}
          className="menu-enter absolute right-0 top-[calc(100%+10px)] w-56 rounded-[14px] bg-card p-1.5 shadow-float ring-1 ring-foreground/[7%]"
        >
          {items.map((l) => {
            const className = cn(
              'flex items-center gap-1 rounded-[10px] px-3 py-2 font-sans text-sm transition-colors hover:bg-card-soft',
              isCurrent(pathname, l) ? 'font-semibold text-foreground' : 'text-foreground',
            )
            return (
              <li key={l.href}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={className}>
                    {l.label}
                    <ExternalGlyph />
                  </a>
                ) : (
                  <Link href={l.href} onClick={() => setOpen(false)} className={className}>
                    {l.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

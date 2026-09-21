'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Track } from '@/lib/timeline-data'
import type { ChapterRole } from '@/lib/site-content'

/** The reader's lens: which kind of role they're hiring for. It changes
 *  emphasis, never content — which entry a role features first, which
 *  chapter badges are lit. Both halves stay on the page; that they coexist
 *  is the argument. Held in the URL (`?lens=ic|manager`) so a link carries
 *  it, and in localStorage so it survives navigation. */
export type Lens = 'ic' | 'manager' | null

export const LENS_LABEL: Record<Exclude<Lens, null>, string> = {
  ic: 'IC',
  manager: 'Manager',
}

/** Timeline tracks each lens puts first. */
export const LENS_TRACKS: Record<Exclude<Lens, null>, Track[]> = {
  ic: ['ic'],
  manager: ['management', 'strategy'],
}

/** Chapter roles each lens lights up (the rest stay, dimmed). */
export const LENS_ROLES: Record<Exclude<Lens, null>, ChapterRole[]> = {
  ic: ['IC', 'Both'],
  manager: ['Team', 'Both'],
}

const LensContext = createContext<{ lens: Lens; setLens: (l: Lens) => void }>({
  lens: null,
  setLens: () => {},
})

const KEY = 'lens'
const parse = (v: string | null): Lens => (v === 'ic' || v === 'manager' ? v : null)

export function LensProvider({ children }: { children: React.ReactNode }) {
  const [lens, setLensState] = useState<Lens>(null)

  useEffect(() => {
    const fromUrl = parse(new URLSearchParams(window.location.search).get(KEY))
    let stored: Lens = null
    try {
      stored = parse(window.localStorage.getItem(KEY))
    } catch {}
    setLensState(fromUrl ?? stored)
  }, [])

  const setLens = (next: Lens) => {
    setLensState(next)
    try {
      if (next) window.localStorage.setItem(KEY, next)
      else window.localStorage.removeItem(KEY)
    } catch {}
    const url = new URL(window.location.href)
    if (next) url.searchParams.set(KEY, next)
    else url.searchParams.delete(KEY)
    window.history.replaceState(null, '', url)
  }

  return <LensContext.Provider value={{ lens, setLens }}>{children}</LensContext.Provider>
}

export const useLens = () => useContext(LensContext)

/** Append the current lens to an internal href so it survives the hop. */
export function withLens(href: string, lens: Lens) {
  if (!lens) return href
  const [path, hash] = href.split('#')
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}lens=${lens}${hash ? `#${hash}` : ''}`
}

/** Two toggles, either one on or neither: "IC" / "Manager". Clicking the
 *  active one clears the lens. */
export function LensSwitch({ className }: { className?: string }) {
  const { lens, setLens } = useLens()
  return (
    <div
      role="group"
      aria-label="Show the work for"
      className={cn('flex items-center gap-0.5 rounded-full bg-foreground/[6%] p-0.5', className)}
    >
      {(['ic', 'manager'] as const).map((l) => {
        const active = lens === l
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            onClick={() => setLens(active ? null : l)}
            className={cn(
              'min-h-9 rounded-full px-3 font-sans text-xs font-semibold transition-colors',
              active
                ? 'bg-background text-foreground shadow-float'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {LENS_LABEL[l]}
          </button>
        )
      })}
    </div>
  )
}

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** Which shape the home page takes. Two layouts, same content and the same
 *  visual system, selectable from the header so they can be compared side
 *  by side on the live site:
 *
 *  A · the career timeline: roles as rows, each with its featured case study
 *      card and a carousel of the remaining highlights.
 *  B · case studies first, as four editorial entries, then an Experience
 *      section where each role lists its highlights as a compact list.
 *
 *  Held in the URL (`?layout=a|b`) so a link carries it, and in localStorage
 *  so it survives navigation. */
export type LayoutMode = 'a' | 'b'

export const LAYOUT_LABEL: Record<LayoutMode, string> = { a: 'A', b: 'B' }

const LayoutModeContext = createContext<{
  mode: LayoutMode
  setMode: (m: LayoutMode) => void
}>({
  mode: 'a',
  setMode: () => {},
})

const KEY = 'layout'
const parse = (v: string | null): LayoutMode | null => (v === 'a' || v === 'b' ? v : null)

export function LayoutModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<LayoutMode>('a')

  useEffect(() => {
    const fromUrl = parse(new URLSearchParams(window.location.search).get(KEY))
    let stored: LayoutMode | null = null
    try {
      stored = parse(window.localStorage.getItem(KEY))
    } catch {}
    setModeState(fromUrl ?? stored ?? 'a')
  }, [])

  const setMode = (next: LayoutMode) => {
    setModeState(next)
    try {
      window.localStorage.setItem(KEY, next)
    } catch {}
    const url = new URL(window.location.href)
    url.searchParams.set(KEY, next)
    window.history.replaceState(null, '', url)
  }

  return (
    <LayoutModeContext.Provider value={{ mode, setMode }}>{children}</LayoutModeContext.Provider>
  )
}

export const useLayoutMode = () => useContext(LayoutModeContext)

/** Two-way toggle, "A" / "B", one always on. */
export function LayoutSwitch({ className }: { className?: string }) {
  const { mode, setMode } = useLayoutMode()
  return (
    <div
      role="group"
      aria-label="Home page layout"
      className={cn('flex items-center gap-0.5 rounded-full bg-foreground/[6%] p-0.5', className)}
    >
      {(['a', 'b'] as const).map((m) => {
        const active = mode === m
        return (
          <button
            key={m}
            type="button"
            aria-pressed={active}
            aria-label={`Layout ${LAYOUT_LABEL[m]}`}
            onClick={() => setMode(m)}
            className={cn(
              'min-h-9 min-w-9 rounded-full px-2.5 font-sans text-xs font-semibold transition-colors',
              active
                ? 'bg-card text-foreground shadow-float'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {LAYOUT_LABEL[m]}
          </button>
        )
      })}
    </div>
  )
}

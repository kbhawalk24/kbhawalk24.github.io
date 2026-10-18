'use client'

import { useLayoutEffect, useState } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import data from '@/content/stat-strip.json'
import { useTimeline } from '@/components/impact/use-timeline'
import { AFTER_MS, AFTER_START_MS, TOTAL_MS, formatCount, mix, phase } from '@/components/impact/timing'

interface Side {
  value: string
  n: number
  prefix?: string
  suffix?: string
}
interface Tile {
  id: string
  before: Side
  after: Side
  caption: string
  note: string
}

const TILES = data.tiles as Tile[]
const SESSION_KEY = 'kb-stat-strip-played'

/** The four homepage tiles. Each counts from its "before" value to its
 *  "after" value once per session (sessionStorage); reduced motion and later
 *  visits show the end values. The server renders the end values too, so
 *  the figures are in the HTML. */
export function StatStrip() {
  const reduced = useReducedMotion()
  const [play, setPlay] = useState(0)

  // Before first paint: decide whether this visit animates. A layout effect
  // on purpose, so the first client frame already shows the "before"
  // values instead of a flash of the end state; the server render must
  // still carry the end values, so this cannot be a state initializer.
  useLayoutEffect(() => {
    if (reduced) return
    let played = false
    try {
      played = window.sessionStorage.getItem(SESSION_KEY) === '1'
      if (!played) window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      played = false
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one synchronous set before paint, see above
    if (!played) setPlay(1)
  }, [reduced])

  const elapsed = useTimeline(play, TOTAL_MS, reduced)
  const p = phase(elapsed, AFTER_START_MS, AFTER_MS)
  // Not started (server render, later visits, reduced motion): end state.
  const settled = play === 0 || reduced || p >= 1

  return (
    <section aria-label="Four results" className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-14">
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((tile) => (
          <li key={tile.id} className="flex flex-col rounded-[14px] bg-card p-5 shadow-soft">
            <p className="font-heading text-2xl font-semibold leading-tight tracking-tight tabular-nums">
              <span className="text-muted-foreground">{tile.before.value}</span>
              <span aria-hidden="true" className="mx-1.5 text-muted-foreground">
                →
              </span>
              <span className="text-accent-brand">
                {settled ? tile.after.value : counting(tile, p)}
              </span>
            </p>
            <p className="mt-2 text-pretty font-sans text-sm leading-snug text-foreground">{tile.caption}</p>
            <p className="mt-auto pt-3 text-pretty font-sans text-xs leading-snug text-muted-foreground">{tile.note}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** The after side while it moves: the after value's prefix and suffix
 *  around the number as it counts from before.n to after.n. */
function counting(tile: Tile, p: number) {
  const n = mix(tile.before.n, tile.after.n, p)
  return `${tile.after.prefix ?? ''}${formatCount(n, tile.after.n)}${tile.after.suffix ?? ''}`
}

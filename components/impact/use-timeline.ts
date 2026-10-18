'use client'

import { useEffect, useState } from 'react'

/**
 * Milliseconds elapsed on a one-shot clock. The clock restarts from 0 each
 * time `play` changes to a non-zero value and stops at `total`; it never
 * loops. With `instant` (reduced motion) it reads `total` from the first
 * render, so the end state is what renders.
 */
export function useTimeline(play: number, total: number, instant: boolean) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (instant || play === 0) return
    let raf = 0
    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      const e = Math.min(total, now - start)
      setElapsed(e)
      if (e < total) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [play, total, instant])

  return instant ? total : elapsed
}

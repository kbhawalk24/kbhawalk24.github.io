'use client'

import { useEffect, useState, type RefObject } from 'react'

/** True once the element has been at least `amount` visible; stays true. */
export function useInViewOnce(ref: RefObject<Element | null>, amount = 0.25) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: amount },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, amount, seen])
  return seen
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

// A small butterfly that trails the pointer across the home page: springs
// toward the cursor with a little lag, faces the direction it is moving,
// flaps while in flight, and rests (wings still, faded) when the cursor
// stops. Decorative only: aria-hidden, no pointer events, and absent on
// touch devices and for readers who prefer reduced motion.

const IDLE_MS = 1400

export function CursorButterfly() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [flying, setFlying] = useState(false)
  const [seen, setSeen] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 120, damping: 16, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 16, mass: 0.6 })
  // Face the way it is flying: flip when the target is to the left.
  const facing = useMotionValue(1)
  const scaleX = useSpring(facing, { stiffness: 200, damping: 20 })
  // Bank a little into the turn.
  const tilt = useTransform(() => (x.get() - sx.get()) * 0.08)
  const rotate = useSpring(tilt, { stiffness: 150, damping: 18 })

  const idle = useRef<number | null>(null)

  useEffect(() => {
    if (reduced || typeof window.matchMedia !== 'function') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      // Sit just above and behind the cursor rather than under it.
      const tx = e.clientX + 18
      const ty = e.clientY - 22
      if (tx < x.get()) facing.set(-1)
      else if (tx > x.get()) facing.set(1)
      x.set(tx)
      y.set(ty)
      setSeen(true)
      setFlying(true)
      if (idle.current) window.clearTimeout(idle.current)
      idle.current = window.setTimeout(() => setFlying(false), IDLE_MS)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (idle.current) window.clearTimeout(idle.current)
    }
  }, [reduced, x, y, facing])

  if (!enabled || !seen) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy, rotate }}
      animate={{ opacity: flying ? 1 : 0.55 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none fixed left-0 top-0 z-40 -ml-5 -mt-5 size-10"
    >
      <motion.svg
        viewBox="0 0 32 32"
        style={{ scaleX }}
        className={flying ? 'butterfly-flying size-10' : 'size-10'}
      >
        <g className="wing wing-l">
          <path d="M15 16C11 9 5 6 3 9c-2 3 2 8 10 9-7 1-10 5-8 8 2 2 7 0 10-7z" fill="#c4b5fd" />
          <path d="M15 16C11 9 5 6 3 9c-2 3 2 8 10 9" fill="none" stroke="#7c3aed" strokeWidth=".8" />
          <circle cx="7" cy="12" r="1.4" fill="#f472b6" />
        </g>
        <g className="wing wing-r">
          <path d="M17 16c4-7 10-10 12-7 2 3-2 8-10 9 7 1 10 5 8 8-2 2-7 0-10-7z" fill="#c4b5fd" />
          <path d="M17 16c4-7 10-10 12-7 2 3-2 8-10 9" fill="none" stroke="#7c3aed" strokeWidth=".8" />
          <circle cx="25" cy="12" r="1.4" fill="#f472b6" />
        </g>
        <path d="M16 9v15" stroke="#3b2a6b" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M16 9l-2-3M16 9l2-3" stroke="#3b2a6b" strokeWidth=".9" strokeLinecap="round" fill="none" />
      </motion.svg>
    </motion.div>
  )
}

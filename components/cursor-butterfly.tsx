'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

// A small butterfly that trails the pointer across the home page: springs
// toward the cursor with a little lag, faces the direction it is moving,
// flaps while in flight, and rests (wings still, faded) when the cursor
// stops. Leave it resting long enough and a lion trots in from the nearer
// edge, eats it, and trots off; the next mouse move brings a new one.
// Decorative only: aria-hidden, no pointer events, and absent on touch
// devices and for readers who prefer reduced motion. Remove <CursorButterfly />
// from app/page.tsx to drop the whole act.

const IDLE_MS = 1400
const LION_AFTER_MS = 5000

type LionPhase = 'away' | 'approach' | 'chomp' | 'leave'

export function CursorButterfly() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [flying, setFlying] = useState(false)
  const [seen, setSeen] = useState(false)
  const [eaten, setEaten] = useState(false)
  const [lion, setLion] = useState<{ phase: LionPhase; from: number; x: number; y: number }>({
    phase: 'away',
    from: -160,
    x: -160,
    y: 0,
  })

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
  const hunger = useRef<number | null>(null)

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
      setEaten(false)
      setFlying(true)
      if (idle.current) window.clearTimeout(idle.current)
      if (hunger.current) window.clearTimeout(hunger.current)
      idle.current = window.setTimeout(() => setFlying(false), IDLE_MS)
      // The lion only comes for a butterfly that has been still a while,
      // and only if it is not already on its way.
      hunger.current = window.setTimeout(() => {
        setLion((l) => {
          if (l.phase !== 'away') return l
          const bx = sx.get()
          const by = sy.get()
          const fromLeft = bx < window.innerWidth / 2
          const from = fromLeft ? -160 : window.innerWidth + 160
          return { phase: 'approach', from, x: bx + (fromLeft ? -46 : 46), y: by - 6 }
        })
      }, LION_AFTER_MS)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (idle.current) window.clearTimeout(idle.current)
      if (hunger.current) window.clearTimeout(hunger.current)
    }
  }, [reduced, x, y, facing, sx, sy])

  if (!enabled || !seen) return null

  const lionFacing = lion.from < 0 ? 1 : -1
  const lionTarget = lion.phase === 'approach' || lion.phase === 'chomp' ? lion.x : lion.from
  const walking = lion.phase === 'approach' || lion.phase === 'leave'

  return (
    <>
      <AnimatePresence>
        {!eaten && (
          <motion.div
            key="butterfly"
            aria-hidden="true"
            style={{ x: sx, y: sy, rotate }}
            initial={{ opacity: 0 }}
            animate={{ opacity: flying ? 1 : 0.55 }}
            exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.18 } }}
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
        )}
      </AnimatePresence>

      {lion.phase !== 'away' && (
        <motion.div
          aria-hidden="true"
          initial={{ x: lion.from, y: lion.y }}
          animate={{ x: lionTarget, y: lion.y }}
          transition={{ duration: lion.phase === 'chomp' ? 0 : 1.6, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (lion.phase === 'approach') {
              setLion((l) => ({ ...l, phase: 'chomp' }))
              window.setTimeout(() => {
                setEaten(true)
                window.setTimeout(() => setLion((l) => ({ ...l, phase: 'leave' })), 350)
              }, 260)
            } else if (lion.phase === 'leave') {
              setLion((l) => ({ ...l, phase: 'away' }))
            }
          }}
          className="pointer-events-none fixed left-0 top-0 z-40 -ml-8 -mt-8 size-16"
        >
          <motion.svg
            viewBox="0 0 64 64"
            className={walking ? 'lion-walking size-16' : 'size-16'}
            style={{ scaleX: lionFacing }}
            animate={
              lion.phase === 'chomp' ? { scale: [1, 1.18, 1], rotate: [0, -8, 0] } : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* body and tail */}
            <path
              d="M20 40c-8 0-9 8-4 10 3 1 5-2 3-4"
              fill="none"
              stroke="#b45309"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <ellipse cx="34" cy="42" rx="16" ry="10" fill="#f59e0b" />
            <g className="leg">
              <rect x="24" y="46" width="5" height="10" rx="2.5" fill="#d97706" />
            </g>
            <g className="leg leg-b">
              <rect x="40" y="46" width="5" height="10" rx="2.5" fill="#d97706" />
            </g>
            {/* mane and head */}
            <circle cx="46" cy="30" r="15" fill="#b45309" />
            <circle cx="46" cy="30" r="10.5" fill="#f59e0b" />
            <circle cx="42" cy="28" r="1.4" fill="#3b2a6b" />
            <circle cx="50" cy="28" r="1.4" fill="#3b2a6b" />
            <path d="M46 31l-1.6 2h3.2z" fill="#3b2a6b" />
            <path
              d={lion.phase === 'chomp' ? 'M42 35q4 5 8 0' : 'M43 34q3 2 6 0'}
              fill={lion.phase === 'chomp' ? '#7f1d1d' : 'none'}
              stroke="#3b2a6b"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      )}
    </>
  )
}

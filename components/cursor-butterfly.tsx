'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

// A small butterfly on the home page. Left alone, it flies loops around the
// hero illustration (the element marked data-butterfly-home) and now and
// then perches on it with its wings still. When the cursor moves it breaks
// off and trails the pointer with a little lag; once the cursor has been
// still for a moment it flies back to the illustration. If the illustration
// is scrolled away or faded out, it loops near the top-right of the screen
// instead. Decorative only: aria-hidden, no pointer events, absent for
// readers who prefer reduced motion.

const HOME_SELECTOR = '[data-butterfly-home]'
const IDLE_MS = 1600
const WANDER_MIN_MS = 900
const WANDER_MAX_MS = 1700
const REST_MIN_MS = 2200
const REST_MAX_MS = 3400
const REST_CHANCE = 0.25

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** Where the butterfly should loop: an ellipse around the illustration when
 *  it is on screen and visible, otherwise a patch near the top-right. */
function homeRegion() {
  const el = document.querySelector<HTMLElement>(HOME_SELECTOR)
  if (el) {
    const r = el.getBoundingClientRect()
    const opacity = Number(getComputedStyle(el).opacity)
    // Only the part of the illustration that is actually on screen; the
    // hero lets it hang above the top edge.
    const top = Math.max(r.top, 24)
    const bottom = Math.min(r.bottom, window.innerHeight - 24)
    const h = bottom - top
    if (h > 120 && r.width > 0 && opacity > 0.3) {
      return {
        cx: r.left + r.width * 0.5,
        cy: top + h * 0.45,
        rx: r.width * 0.55,
        ry: h * 0.38,
        perch: { x: r.left + r.width * 0.6, y: top + h * 0.12 },
      }
    }
  }
  return {
    cx: window.innerWidth * 0.78,
    cy: window.innerHeight * 0.26,
    rx: 150,
    ry: 80,
    perch: null,
  }
}

export function CursorButterfly() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [resting, setResting] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 70, damping: 14, mass: 0.8 })
  const sy = useSpring(y, { stiffness: 70, damping: 14, mass: 0.8 })
  // A gentle up-and-down flutter on top of the spring, stilled when perched.
  const bob = useMotionValue(0)
  const yOut = useTransform(() => sy.get() + bob.get())
  // Face the way it is flying: flip when the target is to the left.
  const facing = useMotionValue(1)
  const scaleX = useSpring(facing, { stiffness: 200, damping: 20 })
  // Bank a little into the turn.
  const tilt = useTransform(() => (x.get() - sx.get()) * 0.08)
  const rotate = useSpring(tilt, { stiffness: 150, damping: 18 })

  const restingRef = useRef(false)
  useAnimationFrame((t) => {
    bob.set(restingRef.current ? 0 : Math.sin(t / 170) * 4)
  })

  const wanderTimer = useRef<number | null>(null)
  const idleTimer = useRef<number | null>(null)

  useEffect(() => {
    if (reduced || typeof window.matchMedia !== 'function') return
    setEnabled(true)

    const goTo = (tx: number, ty: number) => {
      if (tx < x.get() - 2) facing.set(-1)
      else if (tx > x.get() + 2) facing.set(1)
      x.set(tx)
      y.set(ty)
    }
    const setRest = (value: boolean) => {
      restingRef.current = value
      setResting(value)
    }
    const clearWander = () => {
      if (wanderTimer.current) window.clearTimeout(wanderTimer.current)
      wanderTimer.current = null
    }

    // One step of the idle flight: either a new point on the loop around the
    // illustration, or a landing on it for a few seconds.
    const wander = () => {
      const home = homeRegion()
      if (home.perch && Math.random() < REST_CHANCE) {
        goTo(home.perch.x, home.perch.y)
        wanderTimer.current = window.setTimeout(() => {
          setRest(true)
          wanderTimer.current = window.setTimeout(() => {
            setRest(false)
            wander()
          }, rand(REST_MIN_MS, REST_MAX_MS))
        }, 700)
        return
      }
      setRest(false)
      const a = rand(0, Math.PI * 2)
      const r = rand(0.45, 1)
      goTo(home.cx + Math.cos(a) * home.rx * r, home.cy + Math.sin(a) * home.ry * r)
      wanderTimer.current = window.setTimeout(wander, rand(WANDER_MIN_MS, WANDER_MAX_MS))
    }

    // Start on the illustration, then take off.
    const start = homeRegion()
    x.jump(start.cx)
    y.jump(start.cy - 40)
    wander()

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      clearWander()
      setRest(false)
      // Sit just above and behind the cursor rather than under it.
      goTo(e.clientX + 18, e.clientY - 22)
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
      idleTimer.current = window.setTimeout(wander, IDLE_MS)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      clearWander()
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
    }
  }, [reduced, x, y, facing])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: yOut, rotate }}
      className="pointer-events-none fixed left-0 top-0 z-40 -ml-5 -mt-5 size-10"
    >
      <motion.svg
        viewBox="0 0 32 32"
        style={{ scaleX }}
        className={resting ? 'size-10' : 'butterfly-flying size-10'}
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

'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
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
// instead.
//
// Perch for long enough and a shark swims in from the nearer edge and eats
// it; a new butterfly turns up a few seconds later. Move the mouse while the
// shark is on its way and the butterfly escapes to the cursor, so the shark
// snaps at nothing and swims off.
//
// Decorative only: aria-hidden, no pointer events, absent for readers who
// prefer reduced motion. Remove <CursorButterfly /> from app/page.tsx to
// drop the whole act.

const HOME_SELECTOR = '[data-butterfly-home]'
const IDLE_MS = 1600
const WANDER_MIN_MS = 900
const WANDER_MAX_MS = 1700
const REST_MIN_MS = 2200
const REST_MAX_MS = 3400
const REST_CHANCE = 0.25

const SHARK_CHANCE = 0.5 // of any given perch, once the cooldown has passed
const SHARK_COOLDOWN_MS = 25_000
const SHARK_FIRST_AFTER_MS = 6_000
const SHARK_DELAY_MS = 900 // after landing, before the shark sets off
const SHARK_SWIM_S = 1.8
const SHARK_REACH_PX = 70 // how close the butterfly must still be to get eaten
const RESPAWN_MS = 4_000

const rand = (min: number, max: number) => min + Math.random() * (max - min)

type SharkPhase = 'away' | 'approach' | 'chomp' | 'leave'
interface SharkState {
  phase: SharkPhase
  from: number
  x: number
  y: number
}

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
  const [eaten, setEaten] = useState(false)
  const [shark, setShark] = useState<SharkState>({ phase: 'away', from: -200, x: -200, y: 0 })

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
  const eatenRef = useRef(false)
  const sharkPhaseRef = useRef<SharkPhase>('away')
  const lastSharkRef = useRef(0)
  useAnimationFrame((t) => {
    bob.set(restingRef.current ? 0 : Math.sin(t / 170) * 4)
  })

  const wanderTimer = useRef<number | null>(null)
  const idleTimer = useRef<number | null>(null)
  const sharkTimer = useRef<number | null>(null)
  const respawnTimer = useRef<number | null>(null)

  // The wander loop lives in a ref so the shark's animation callbacks (which
  // render later) can restart it.
  const wanderRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (reduced || typeof window.matchMedia !== 'function') return
    setEnabled(true)
    lastSharkRef.current = Date.now() - SHARK_COOLDOWN_MS + SHARK_FIRST_AFTER_MS

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

    // The shark comes for a butterfly that has just landed, from whichever
    // screen edge is nearer, aiming for where the butterfly is sitting.
    const sendShark = () => {
      if (sharkPhaseRef.current !== 'away' || eatenRef.current) return
      lastSharkRef.current = Date.now()
      const bx = sx.get()
      const by = sy.get()
      const fromLeft = bx < window.innerWidth / 2
      const from = fromLeft ? -200 : window.innerWidth + 200
      sharkPhaseRef.current = 'approach'
      setShark({ phase: 'approach', from, x: bx + (fromLeft ? -34 : 34), y: by + 6 })
    }

    // One step of the idle flight: either a new point on the loop around the
    // illustration, or a landing on it for a few seconds.
    const wander = () => {
      if (eatenRef.current) return
      const home = homeRegion()
      if (home.perch && Math.random() < REST_CHANCE) {
        goTo(home.perch.x, home.perch.y)
        wanderTimer.current = window.setTimeout(() => {
          setRest(true)
          const hungry =
            Date.now() - lastSharkRef.current > SHARK_COOLDOWN_MS && Math.random() < SHARK_CHANCE
          if (hungry) sharkTimer.current = window.setTimeout(sendShark, SHARK_DELAY_MS)
          wanderTimer.current = window.setTimeout(() => {
            setRest(false)
            wander()
          }, rand(REST_MIN_MS, REST_MAX_MS) + (hungry ? SHARK_SWIM_S * 1000 : 0))
        }, 700)
        return
      }
      setRest(false)
      const a = rand(0, Math.PI * 2)
      const r = rand(0.45, 1)
      goTo(home.cx + Math.cos(a) * home.rx * r, home.cy + Math.sin(a) * home.ry * r)
      wanderTimer.current = window.setTimeout(wander, rand(WANDER_MIN_MS, WANDER_MAX_MS))
    }
    wanderRef.current = wander

    // Start on the illustration, then take off.
    const start = homeRegion()
    x.jump(start.cx)
    y.jump(start.cy - 40)
    wander()

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || eatenRef.current) return
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
      for (const t of [idleTimer, sharkTimer, respawnTimer]) {
        if (t.current) window.clearTimeout(t.current)
      }
    }
  }, [reduced, x, y, facing, sx, sy])

  if (!enabled) return null

  const sharkFacing = shark.from < 0 ? 1 : -1
  const sharkTarget = shark.phase === 'approach' || shark.phase === 'chomp' ? shark.x : shark.from
  const swimming = shark.phase === 'approach' || shark.phase === 'leave'

  const onSharkArrived = () => {
    if (shark.phase === 'approach') {
      sharkPhaseRef.current = 'chomp'
      setShark((s) => ({ ...s, phase: 'chomp' }))
      // Still within reach? Then it is lunch. Otherwise the jaws close on air.
      const caught =
        Math.abs(sx.get() - shark.x) < SHARK_REACH_PX && Math.abs(sy.get() - shark.y) < SHARK_REACH_PX
      window.setTimeout(() => {
        if (caught) {
          eatenRef.current = true
          setEaten(true)
          if (wanderTimer.current) window.clearTimeout(wanderTimer.current)
          if (idleTimer.current) window.clearTimeout(idleTimer.current)
          respawnTimer.current = window.setTimeout(() => {
            const home = homeRegion()
            x.jump(home.cx)
            y.jump(home.cy - 40)
            eatenRef.current = false
            setEaten(false)
            wanderRef.current()
          }, RESPAWN_MS)
        }
        window.setTimeout(() => {
          sharkPhaseRef.current = 'leave'
          setShark((s) => ({ ...s, phase: 'leave' }))
        }, 420)
      }, 220)
    } else if (shark.phase === 'leave') {
      sharkPhaseRef.current = 'away'
      setShark((s) => ({ ...s, phase: 'away' }))
    }
  }

  return (
    <>
      <AnimatePresence>
        {!eaten && (
          <motion.div
            key="butterfly"
            aria-hidden="true"
            style={{ x: sx, y: yOut, rotate }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.18 } }}
            transition={{ duration: 0.6 }}
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
        )}
      </AnimatePresence>

      {shark.phase !== 'away' && (
        <motion.div
          key="shark"
          data-shark={shark.phase}
          aria-hidden="true"
          initial={{ x: shark.from, y: shark.y }}
          animate={{ x: sharkTarget, y: shark.y }}
          transition={{ duration: shark.phase === 'chomp' ? 0 : SHARK_SWIM_S, ease: 'easeInOut' }}
          onAnimationComplete={onSharkArrived}
          className="pointer-events-none fixed left-0 top-0 z-40 -ml-12 -mt-12 size-24"
        >
          <motion.svg
            viewBox="0 0 96 64"
            className={swimming ? 'shark-swimming size-24' : 'size-24'}
            style={{ scaleX: sharkFacing }}
            animate={shark.phase === 'chomp' ? { scale: [1, 1.14, 1], rotate: [0, -6, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {/* tail, hinged at the body */}
            <g className="shark-tail">
              <path d="M18 32 L4 16 L10 32 L4 48 Z" fill="#4a6683" />
            </g>
            {/* body */}
            <path d="M14 32 C22 18 46 14 66 22 L88 32 L66 42 C46 50 22 46 14 32 Z" fill="#5b7a99" />
            {/* belly */}
            <path d="M22 38 C36 46 54 46 72 40 L66 42 C46 50 22 46 14 32 Z" fill="#dbe4ee" />
            {/* dorsal fin */}
            <path d="M40 20 L48 4 L58 20 Z" fill="#4a6683" />
            {/* pectoral fin */}
            <path d="M44 40 L38 54 L56 42 Z" fill="#4a6683" />
            {/* gills */}
            <path d="M58 26q-2 4 0 8M62 25q-2 5 0 10" fill="none" stroke="#4a6683" strokeWidth="1.3" strokeLinecap="round" />
            {/* eye */}
            <circle cx="74" cy="27" r="2.2" fill="#fff" />
            <circle cx="74.6" cy="27.4" r="1.3" fill="#0f172a" />
            {/* mouth: a line at rest, open jaws with teeth on the chomp */}
            {shark.phase === 'chomp' ? (
              <g>
                <path d="M70 34 L90 32 L84 46 Z" fill="#7f1d1d" />
                <path d="M72 34 l2.5 3.5 2.5-3.5 2.5 3.5 2.5-3.5 2.5 3.5 2.5-3.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
              </g>
            ) : (
              <path d="M72 35q7 2 14-1" fill="none" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
            )}
          </motion.svg>
        </motion.div>
      )}
    </>
  )
}

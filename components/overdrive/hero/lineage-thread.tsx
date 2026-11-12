'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { motion, useReducedMotion, type MotionValue } from 'motion/react'
import { EASE_OUT } from '@/components/motion-primitives'

// Overdrive C (12 Nov 2026): the Management graph's language in the hero.
// Once the name has landed, one blue line draws from a port on the name node
// to the photo: straight while the node is level with the photo, one rounded
// elbow on a grid column once the name rises above it. A packet runs along it
// and the node at the photo rings on arrival; it repeats every few seconds.
// Desktop only (on phones the photo sits above the words). SVG, measured
// from the real label and photo, re-measured as the name rises on scroll.

const DRAW_DELAY = 1.0
const DRAW = 1.1
const PACKET_EVERY = 7000

export function LineageThread({
  stageRef,
  fromRef,
  toRef,
  fade,
}: {
  stageRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  /** Optional 0 to 1 opacity driven from outside (the hero fades it out). */
  fade?: MotionValue<number>
}) {
  const reduced = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const [geo, setGeo] = useState<{ d: string; a: [number, number]; b: [number, number] } | null>(null)

  const measure = useCallback(() => {
    const s = stageRef.current?.getBoundingClientRect()
    const a = fromRef.current?.getBoundingClientRect()
    const b = toRef.current?.getBoundingClientRect()
    if (!s || !a || !b || !b.width) return
    // `from` is the name node: the thread leaves a port mid-way down its right edge.
    const ax = a.right - s.left
    const ay = a.top + a.height / 2 - s.top
    const bx = b.left - s.left - 10
    // Enter the photo well clear of its rounded corners.
    const top = b.top - s.top + b.height * 0.22
    const bottom = b.bottom - s.top - b.height * 0.22
    // Level with the photo: a straight leader line. Above or below it: one
    // rounded right angle on a dot-grid column (dots sit at multiples of 30px),
    // entering the photo as near the name's height as it can.
    const by = Math.min(bottom, Math.max(top, ay))
    let d = `M${ax},${ay} H${bx}`
    if (Math.abs(by - ay) > 1) {
      // The bend sits half-way between the card and the photo, on a grid column.
      const cx = Math.min(bx - 30, Math.max(ax + 30, Math.round((ax + bx) / 2 / 30) * 30))
      const rad = Math.min(14, Math.abs(by - ay) / 2)
      const dir = by > ay ? 1 : -1
      d = `M${ax},${ay} H${cx - rad} Q${cx},${ay} ${cx},${ay + dir * rad} V${by - dir * rad} Q${cx},${by} ${cx + rad},${by} H${bx}`
    }
    // Only re-render when the route actually moved (scrolling past the
    // settled name changes nothing).
    setGeo((prev) => (prev?.d === d ? prev : { d, a: [ax, ay], b: [bx, by] }))
  }, [stageRef, fromRef, toRef])

  useLayoutEffect(() => {
    measure()
    document.fonts?.ready.then(measure)
    // The name is still rising out of its mask (and the web font may swap)
    // for the first moments: follow it every frame until the entrance ends.
    const until = performance.now() + (DRAW_DELAY + 0.8) * 1000
    let follow = requestAnimationFrame(function tick(now) {
      measure()
      if (now < until) follow = requestAnimationFrame(tick)
    })
    if (typeof ResizeObserver === 'undefined') return () => cancelAnimationFrame(follow)
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    return () => {
      cancelAnimationFrame(follow)
      ro.disconnect()
    }
  }, [measure, stageRef])
  // The label rises with the name as the page scrolls: re-measure once per
  // frame while scrolling (outside React's render, unlike a motion-value event).
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        measure()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [measure])

  // The packet: a dot run along the path with getPointAtLength.
  useEffect(() => {
    if (reduced || !geo) return
    let raf = 0
    let timer = 0
    const run = () => {
      const path = pathRef.current
      const dot = dotRef.current
      if (!path || !dot) return
      const len = path.getTotalLength()
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1100)
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        const p = path.getPointAtLength(e * len)
        dot.setAttribute('cx', String(p.x))
        dot.setAttribute('cy', String(p.y))
        dot.style.opacity = String(Math.min(1, t * 6) * (t < 0.9 ? 1 : (1 - t) / 0.1))
        if (t < 1) raf = requestAnimationFrame(step)
        // Arrival: the node at the photo gives off one ring.
        else
          ringRef.current?.animate(
            [
              { transform: 'scale(1)', opacity: 0.55 },
              { transform: 'scale(3.2)', opacity: 0 },
            ],
            { duration: 750, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          )
      }
      raf = requestAnimationFrame(step)
    }
    const first = window.setTimeout(run, (DRAW_DELAY + DRAW - 0.2) * 1000)
    timer = window.setInterval(run, PACKET_EVERY)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(timer)
      cancelAnimationFrame(raf)
    }
    // Only restart the loop when the thread first appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, !!geo])

  if (!geo) return null
  const t = (duration: number, delay: number) => (reduced ? { duration: 0 } : { duration, delay, ease: EASE_OUT })
  return (
    <motion.svg aria-hidden="true" style={fade ? { opacity: fade } : undefined} className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
      <motion.path
        ref={pathRef}
        d={geo.d}
        fill="none"
        stroke="var(--accent-brand)"
        strokeWidth={1.75}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ pathLength: t(DRAW, DRAW_DELAY), opacity: t(0.8, DRAW_DELAY + DRAW + 0.6) }}
      />
      <motion.circle
        cx={geo.a[0]}
        cy={geo.a[1]}
        r={4.5}
        fill="var(--accent-brand)"
        stroke="var(--card)"
        strokeWidth={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={t(0.3, DRAW_DELAY - 0.1)}
      />
      <motion.circle
        cx={geo.b[0]}
        cy={geo.b[1]}
        r={4.5}
        fill="var(--accent-brand)"
        stroke="var(--card)"
        strokeWidth={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={t(0.3, DRAW_DELAY + DRAW - 0.1)}
      />
      <circle
        ref={ringRef}
        cx={geo.b[0]}
        cy={geo.b[1]}
        r={5}
        fill="none"
        stroke="var(--accent-brand)"
        strokeWidth={1.5}
        style={{ opacity: 0, transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <circle ref={dotRef} r={4} cx={geo.a[0]} cy={geo.a[1]} fill="var(--accent-brand)" style={{ opacity: 0 }} />
    </motion.svg>
  )
}

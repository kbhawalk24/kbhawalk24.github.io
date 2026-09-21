'use client'

import { useEffect, useMemo, useRef, type MouseEvent, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'motion/react'

// Sitewide entrance curve — a soft ease-out. Every Motion transition that
// needs a custom (non-spring) curve should import this rather than
// retyping the array, so there is one place to retune the site's feel.
export const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'p' | 'h2' | 'h3'
}) {
  const Component = motion[as]
  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </Component>
  )
}

/**
 * Animates the first number found in a string (e.g. "6,000+" or "$20M+")
 * while preserving any prefix/suffix characters.
 */
export function AnimatedStat({ value }: { value: string }) {
  const match = useMemo(() => value.match(/([\d,]+(?:\.\d+)?)/), [value])
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const target = match ? Number(match[1].replaceAll(',', '')) : 0
  const hasSeparator = match ? match[1].includes(',') : false
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.5,
  })

  useEffect(() => {
    if (inView) motionValue.set(target)
  }, [inView, motionValue, target])

  useEffect(() => {
    if (!match) return
    return spring.on('change', (latest) => {
      const node = ref.current
      if (!node) return
      const rounded = Math.round(latest)
      const formatted = hasSeparator
        ? rounded.toLocaleString('en-US')
        : String(rounded)
      node.textContent = formatted
    })
  }, [spring, match, hasSeparator])

  if (!match) {
    return <span>{value}</span>
  }

  const [prefix, suffix] = [
    value.slice(0, match.index),
    value.slice((match.index ?? 0) + match[1].length),
  ]

  return (
    <span>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}

/**
 * Wraps its child in a magnetic-pull hover effect: the element nudges
 * toward the cursor within `strength`, then springs back on mouseleave.
 * Driven entirely through motion values (never `useState`) so tracking the
 * cursor doesn't re-render React on every pixel of movement. Inert when
 * the visitor prefers reduced motion, or on touch (no mousemove to drive it).
 */
export function MagneticWrap({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * 3D tilt that tracks the cursor across the card (Parallax Tilt Card).
 * Same motion-value-only, reduced-motion-gated approach as MagneticWrap.
 */
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const reducedMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 22 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 22 })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * max)
    rotateX.set(py * -max)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

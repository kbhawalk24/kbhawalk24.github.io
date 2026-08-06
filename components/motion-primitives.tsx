'use client'

import { useEffect, useMemo, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from 'motion/react'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
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
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
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

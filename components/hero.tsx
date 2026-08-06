'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const reducedMotionPref = useReducedMotion()
  const reducedMotion = reducedMotionPref !== false
  const [viewportH, setViewportH] = useState(0)
  // Once the bio has fully revealed, lock it in place so it never fades
  // out as the user continues scrolling.
  const [bioLocked, setBioLocked] = useState(false)

  useLayoutEffect(() => {
    setViewportH(window.innerHeight)
    const onResize = () => setViewportH(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // Lock bio once fully revealed scrolling down.
  // Unlock it when scrolling back up past the reveal start so it hides
  // before the name travels back down through it.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.78) setBioLocked(true)
    if (v < 0.50) setBioLocked(false)
  })

  // ── Name: rises from bottom to heading position ─────────────────────────
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.50],
    reducedMotion ? [0, 0] : [viewportH * 0.44, 0],
  )

  // ── Illustration: drifts down (counter-parallax) ────────────────────────
  const illustrationY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, viewportH * 0.28],
  )

  // ── Illustration: blurs out completely BEFORE bio appears, then fades ───
  const illustrationBlurPx = useTransform(scrollYProgress, [0.28, 0.50], [0, 20])
  const illustrationFilter = useMotionTemplate`blur(${illustrationBlurPx}px)`
  const illustrationOpacity = useTransform(scrollYProgress, [0.78, 1.0], [1, 0])

  // ── Bio: blurs in after illustration is fully blurred ───────────────────
  const bioOpacity = useTransform(scrollYProgress, [0.52, 0.80], [0, 1])
  const bioBlurPx  = useTransform(scrollYProgress, [0.52, 0.80], [14, 0])
  const bioFilter  = useMotionTemplate`blur(${bioBlurPx}px)`

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[200vh] overflow-clip border-b border-border"
    >
      <div className="sticky top-0 flex min-h-screen overflow-hidden bg-background">
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-start px-6 py-8 md:px-14">

          {/* Dot-grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-45 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-position-x:24px] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)] md:[background-position-x:0px]"
          />

          {/* Illustration — drifts down, blurs before bio, fades at end */}
          <motion.div
            style={{
              y: illustrationY,
              opacity: illustrationOpacity,
              filter: illustrationFilter,
            }}
            className="pointer-events-none absolute right-2 top-[6%] z-10 w-[62vw] max-w-[460px] md:right-14 md:top-[7%] md:w-[42vw] md:max-w-[520px]"
          >
            <Image
              src="/images/designer-illustration.png"
              alt="Designer shaping product and data interfaces"
              width={1196}
              height={1228}
              priority
              className="h-auto w-full object-contain"
            />
          </motion.div>

          {/* Content — left-aligned, full width */}
          <div className="relative z-20 flex min-h-screen w-full flex-col items-start justify-start pt-[9vh]">

            {/* Name — left-aligned, parallax rise */}
            <motion.h1
              style={{ y: nameY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-left font-sans text-[clamp(4rem,12vw,10rem)] font-semibold leading-[0.82] tracking-[-0.04em] text-foreground"
            >
              Kanchi
              <br />
              Bhawalkar
            </motion.h1>

            {/* Bio — blurs in, then locked visible. Never fades out. */}
            <motion.div
              style={
                bioLocked
                  ? { opacity: 1, filter: 'blur(0px)' }
                  : { opacity: bioOpacity, filter: bioFilter }
              }
              className="mt-8 w-full text-left md:max-w-[70vw]"
            >
              <p className="text-balance font-serif text-2xl leading-tight tracking-tight text-foreground md:text-4xl">
                I am a Strategic Design Leader with 12+ years of experience
                transforming complex enterprise infrastructure into intuitive
                products.
              </p>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                For the past 5 years, I have led design for Intuit&apos;s data
                platform, scaling it from a localized discovery tool into
                company-wide infrastructure that 6,000+ people now use monthly
                to find, access, govern, move, and act on data. Before this, I
                was a lead designer at 605, shipping 3 analytics products that
                contributed to $20M+ in revenue, following my early career as a
                Software Developer at TIBCO.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/kanchi-bhawalkar-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
                >
                  Resume <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#timeline"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-secondary"
                >
                  Work <span aria-hidden="true">↓</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

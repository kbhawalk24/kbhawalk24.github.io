'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { BackgroundViz } from '@/components/background-viz'

import Image from 'next/image'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

export function mapClamp(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (v - inMin) / (inMax - inMin)))
  return outMin + t * (outMax - outMin)
}

// Scroll-progress thresholds driving the hero's illustration → bio crossfade.
// Illustration fully fades out right as the bio starts fading in, so the
// handoff reads as one continuous motion instead of two independent fades.
export const ILLUSTRATION_FADE_RANGE = { start: 0.2, end: 0.4 }
export const BIO_OPACITY_RANGE = { start: 0.4, end: 0.62 }
export const BIO_BLUR_RANGE = { start: 0.4, end: 0.52 }

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const reducedMotionPref = useReducedMotion()
  const reducedMotion = reducedMotionPref !== false
  const [viewportH, setViewportH] = useState(0)

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

  // ── Name rises from bottom to heading position ──────────────────────────
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.62],
    reducedMotion ? [0, 0] : [viewportH * 0.44, 0],
  )

  // ── Illustration drifts down (counter-parallax) ─────────────────────────
  const illustrationY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, viewportH * 0.28],
  )

  // Opacity/blur for the illustration and bio are driven through plain React
  // state (not raw MotionValues in `style`) because Motion offloads clamped
  // opacity/filter transforms to the browser's native scroll-timeline, which
  // does not respect the input-range clamp and snaps back to 1 past it.
  const [illustrationFade, setIllustrationFade] = useState({ opacity: 1, blurPx: 0 })
  const [bioFade, setBioFade] = useState({ opacity: 0, blurPx: 14 })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIllustrationFade({
      opacity: mapClamp(v, ILLUSTRATION_FADE_RANGE.start, ILLUSTRATION_FADE_RANGE.end, 1, 0),
      blurPx:  mapClamp(v, ILLUSTRATION_FADE_RANGE.start, ILLUSTRATION_FADE_RANGE.end, 0, 20),
    })
    setBioFade({
      opacity: mapClamp(v, BIO_OPACITY_RANGE.start, BIO_OPACITY_RANGE.end, 0, 1),
      blurPx:  mapClamp(v, BIO_BLUR_RANGE.start, BIO_BLUR_RANGE.end, 14, 0),
    })
  })

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[200vh] overflow-clip border-b border-border"
    >
      <div className="sticky top-0 flex min-h-screen overflow-hidden bg-background">
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-start px-6 py-8 md:px-14">

          {/* Data viz background */}
          <BackgroundViz />

          {/* Light-blue circle behind the name */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-[2] rounded-full"
            style={{
              width:  'min(110vh, 1000px)',
              height: 'min(110vh, 1000px)',
              top:    '-5%',
              left:   '-5%',
              background: 'radial-gradient(circle, #d0ecf6 0%, #dff3f9 62%, transparent 100%)',
            }}
          />

          {/* Illustration */}
          <motion.div
            style={{
              y:       illustrationY,
              opacity: illustrationFade.opacity,
              filter:  `blur(${illustrationFade.blurPx}px)`,
            }}
            className="pointer-events-none absolute right-4 top-[33%] z-10 w-[60vw] max-w-[420px] -translate-y-1/2 md:right-36 md:top-[44%] md:w-[40vw] md:max-w-[490px]"
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

          {/* Content column */}
          <div className="relative z-20 flex min-h-screen w-full flex-col items-start justify-start pt-[9vh]">

            {/* Name — parallax rise */}
            <motion.h1
              style={{ y: nameY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="ml-[13%] mt-[8vh] text-left font-sans text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground"
            >
              Kanchi
              <br />
              Bhawalkar
            </motion.h1>

            {/* Bio — blurs in as scroll progresses */}
            <div
              style={{ opacity: bioFade.opacity, filter: `blur(${bioFade.blurPx}px)` }}
              className="mt-8 w-full ml-[13%] text-left md:max-w-[70vw]"
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
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

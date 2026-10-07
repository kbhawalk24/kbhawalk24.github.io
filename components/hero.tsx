'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import Image from 'next/image'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

import { EASE_OUT, MagneticWrap } from '@/components/motion-primitives'

export function mapClamp(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (v - inMin) / (inMax - inMin)))
  return outMin + t * (outMax - outMin)
}

// Scroll-progress thresholds driving the hero's illustration → bio crossfade.
// Illustration blurs first, then fades — finishing right as the bio starts
// fading in, so the handoff reads as one continuous motion.
export const ILLUSTRATION_BLUR_RANGE = { start: 0.12, end: 0.3 }
export const ILLUSTRATION_FADE_RANGE = { start: 0.2, end: 0.4 }
export const BIO_OPACITY_RANGE = { start: 0.4, end: 0.62 }
export const BIO_BLUR_RANGE = { start: 0.4, end: 0.52 }

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const reducedMotionPref = useReducedMotion()
  const reducedMotion = reducedMotionPref !== false
  const [viewportH, setViewportH] = useState(0)

  // Gates every viewportH/reducedMotion-dependent transform below so the
  // first client render matches SSR exactly (both render the "off" [0, 0]
  // range) — the real offsets only apply once mounted, avoiding a hydration
  // mismatch warning.
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setViewportH(window.innerHeight)
    const onResize = () => setViewportH(window.innerHeight)
    window.addEventListener('resize', onResize)
    setMounted(true)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const animationsEnabled = mounted && !reducedMotion

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // ── Name rises from bottom to heading position ──────────────────────────
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.62],
    animationsEnabled ? [viewportH * 0.12, 0] : [0, 0],
  )

  // ── Name + tagline sit a little lower at rest, then settle into the same
  //    resting position as the rest of the hero once scrolled ─────────────
  const nameTaglineY = useTransform(
    scrollYProgress,
    [0, 0.62],
    animationsEnabled ? [viewportH * 0.12 + 40, 0] : [0, 0],
  )

  // ── Content holds its centered position, then rises out of view right
  //    before the hero releases into the next section ─────────────────────
  const contentExitY = useTransform(
    scrollYProgress,
    [0.78, 1],
    animationsEnabled ? [0, -viewportH * 0.22] : [0, 0],
  )

  // Opacity/blur are driven through plain React state (not a raw MotionValue
  // in `style`) because Motion offloads clamped opacity/filter transforms to
  // the browser's native scroll-timeline, which does not respect the
  // input-range clamp and snaps back to 1 past it.
  const [fade, setFade] = useState({
    illustrationOpacity: 1,
    illustrationBlurPx: 0,
    bioOpacity: 0,
    bioBlurPx: 14,
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setFade({
      illustrationOpacity: mapClamp(v, ILLUSTRATION_FADE_RANGE.start, ILLUSTRATION_FADE_RANGE.end, 1, 0),
      illustrationBlurPx: mapClamp(v, ILLUSTRATION_BLUR_RANGE.start, ILLUSTRATION_BLUR_RANGE.end, 0, 16),
      bioOpacity: mapClamp(v, BIO_OPACITY_RANGE.start, BIO_OPACITY_RANGE.end, 0, 1),
      bioBlurPx:  mapClamp(v, BIO_BLUR_RANGE.start, BIO_BLUR_RANGE.end, 14, 0),
    })
  })

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[200vh] overflow-clip"
    >
      <div className="sticky top-0 flex min-h-dvh overflow-hidden">
        <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col items-start px-6 py-8 md:px-10 lg:px-14">

          {/* Content column */}
          <motion.div
            style={{ y: contentExitY }}
            className="relative z-20 flex min-h-dvh w-full flex-col items-start justify-center pt-[14vh]"
          >

            {/* Name (lower-left) + illustration (upper-right) — a diagonal
                composition; the illustration fades out via scroll (state
                above) right as the bio below finishes fading in. */}
            <div className="relative flex min-h-[48vh] w-full flex-col items-start justify-between gap-10 md:block">
              <div
                style={{
                  opacity: fade.illustrationOpacity,
                  filter: `blur(${fade.illustrationBlurPx}px)`,
                }}
                className="w-full max-w-md shrink-0 md:absolute md:-top-64 md:right-0 md:w-96 md:max-w-none lg:w-[28rem] xl:w-[32rem]"
              >
                <motion.div
                  style={{ y: nameY }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
                >
                  <Image
                    src="/images/eye-frames/c.webp"
                    alt=""
                    width={1089}
                    height={1444}
                    priority
                    className="h-auto w-full"
                  />
                </motion.div>
              </div>

              <div className="w-full shrink-0 md:absolute md:-bottom-8 md:left-0 md:w-auto">
                <motion.h1
                  style={{ y: nameTaglineY }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
                  translate="no"
                  className="text-left font-heading text-[clamp(3.25rem,7.5vw,6.75rem)] font-extrabold leading-[0.98] tracking-tight text-foreground"
                >
                  Kanchi
                  <br />
                  Bhawalkar
                </motion.h1>

                <motion.div
                  style={{ y: nameTaglineY }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
                  className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-left font-sans text-lg tracking-wide text-foreground md:text-xl"
                >
                  <span>Product Design Manager / Principal Designer for Data Platform at</span>
                  <Image
                    src="/images/intuit-logo.jpg"
                    alt="Intuit"
                    width={160}
                    height={90}
                    className="h-7 w-auto md:h-9"
                  />
                </motion.div>
              </div>
            </div>

            {/* Bio — blurs in as scroll progresses */}
            <div
              style={{ opacity: fade.bioOpacity, filter: `blur(${fade.bioBlurPx}px)` }}
              className="mt-14 w-full text-left"
            >
              <p className="max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-foreground md:text-xl">
                <span className="font-semibold text-foreground">
                  Design leader for enterprise data: ten years shipping the
                  work, two years leading the team that ships it, still in the
                  codebase.
                </span>{' '}
                For the past 5&nbsp;years, I have led design for{' '}
                <span translate="no">Intuit</span>&rsquo;s data
                platform, scaling it from a localized discovery tool into
                company-wide infrastructure that{' '}
                <span className="font-semibold">6,000+</span>{' '}
                people now use monthly to find, access, govern, move, and act
                on data. Before this, I was a lead designer at{' '}
                <span translate="no">605</span>, shipping 3
                analytics products that contributed to{' '}
                <span className="font-semibold">$20M+</span> in
                revenue, following my early career as a Software Developer at{' '}
                <span translate="no">TIBCO</span>.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <MagneticWrap className="inline-block">
                  <a
                    href="/kanchi-bhawalkar-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-primary-foreground shadow-cta transition-[box-shadow,transform] hover:shadow-cta-hover active:scale-[0.98]"
                  >
                    Resume
                    <span className="sr-only"> (opens in a new tab)</span>
                    <span
                      aria-hidden="true"
                      className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </MagneticWrap>
                <a
                  href="#timeline"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25"
                >
                  Work <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

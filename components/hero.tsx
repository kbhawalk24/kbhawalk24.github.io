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
  const [viewportW, setViewportW] = useState(0)

  // Gates every viewportH/reducedMotion-dependent transform below so the
  // first client render matches SSR exactly (both render the "off" [0, 0]
  // range) — the real offsets only apply once mounted, avoiding a hydration
  // mismatch warning.
  const [mounted, setMounted] = useState(false)
  // The pin-and-crossfade only runs from `md` up. Below that the column is
  // taller than the viewport (illustration stacked above the text), so a
  // pinned stage would clip the about text; phones get a plain hero.
  const [isDesktop, setIsDesktop] = useState(true)

  useLayoutEffect(() => {
    setViewportH(window.innerHeight)
    setViewportW(window.innerWidth)
    // jsdom has no matchMedia; treat that as desktop.
    const mq = typeof window.matchMedia === 'function' ? window.matchMedia('(min-width: 768px)') : null
    setIsDesktop(mq ? mq.matches : true)
    const onResize = () => {
      setViewportH(window.innerHeight)
      setViewportW(window.innerWidth)
      setIsDesktop(mq ? mq.matches : true)
    }
    window.addEventListener('resize', onResize)
    setMounted(true)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const animationsEnabled = mounted && !reducedMotion && isDesktop
  // With no choreography (phones, reduced motion before the first scroll
  // event) everything is simply visible.
  const still = mounted && !animationsEnabled

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // ── Name rises from bottom to heading position ──────────────────────────
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.62],
    animationsEnabled ? [viewportH * 0.24, 0] : [0, 0],
  )

  // ── Name + tagline sit a little lower at rest, then settle into the same
  //    resting position as the rest of the hero once scrolled ─────────────
  const nameTaglineY = useTransform(
    scrollYProgress,
    [0, 0.62],
    animationsEnabled ? [viewportH * 0.24 + 40, 0] : [0, 0],
  )

  // ── Content holds its centered position, then rises out of view right
  //    before the hero releases into the next section ─────────────────────
  const contentExitY = useTransform(
    scrollYProgress,
    [0.78, 1],
    animationsEnabled ? [0, -viewportH * 0.22] : [0, 0],
  )

  // ── The name block is tall at rest, so the illustration (absolute, hanging
  //    above it) has room and the title line clears it, then shrinks as the
  //    illustration fades, so the about text fits under it in one screen ──
  //    Driven through state in the scroll handler below, like the fades: a
  //    useTransform here only recomputes when scroll moves, so a range set
  //    after mount never reaches the element at rest.
  const nameBlockRest = isDesktop ? viewportH * 0.48 : 0
  const [nameBlockMinH, setNameBlockMinH] = useState<number | null>(null)
  useLayoutEffect(() => {
    if (mounted) setNameBlockMinH(nameBlockRest)
  }, [mounted, nameBlockRest])

  // ── The name is display-sized at rest (the class clamp, here in px) and
  //    settles to a heading as the about text arrives ───────────────────────
  const nameRestPx = Math.min(108, Math.max(52, viewportW * 0.075))
  const nameSize = useTransform(
    scrollYProgress,
    [0, 0.62],
    animationsEnabled ? [nameRestPx, 60] : [nameRestPx, nameRestPx],
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
    if (animationsEnabled) {
      setNameBlockMinH(mapClamp(v, 0, 0.62, viewportH * 0.48, viewportH * 0.14))
    }
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
      className="relative overflow-clip md:min-h-[200vh]"
    >
      <div className="flex md:sticky md:top-0 md:min-h-dvh md:overflow-hidden">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start px-6 py-8 md:min-h-dvh md:px-10 lg:px-14">

          {/* Content column */}
          <motion.div
            style={{ y: contentExitY }}
            className="relative z-20 flex w-full flex-col items-start justify-center pt-24 md:min-h-dvh md:pt-[2vh]"
          >

            {/* Name (lower-left) + illustration (upper-right) — a diagonal
                composition; the illustration fades out via scroll (state
                above) right as the bio below finishes fading in. */}
            <div
              style={nameBlockMinH === null ? undefined : { minHeight: nameBlockMinH }}
              className="relative flex w-full flex-col items-start justify-between gap-10 md:block md:min-h-[48vh]"
            >
              <div
                style={
                  still
                    ? undefined
                    : { opacity: fade.illustrationOpacity, filter: `blur(${fade.illustrationBlurPx}px)` }
                }
                className="w-full max-w-md shrink-0 md:absolute md:-top-64 md:right-0 md:w-96 md:max-w-none lg:w-[28rem] xl:w-[30rem]"
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
                  style={animationsEnabled ? { y: nameTaglineY, fontSize: nameSize } : { y: nameTaglineY }}
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
                  className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-left font-sans text-lg tracking-wide text-foreground"
                >
                  <span>Product Design Manager / Principal Designer for Data Platform at</span>
                  <Image
                    src="/images/intuit-logo.jpg"
                    alt="Intuit"
                    width={160}
                    height={90}
                    className="h-7 w-auto mix-blend-multiply md:h-9"
                  />
                </motion.div>
              </div>
            </div>

            {/* About: blurs in as scroll progresses. Two paragraphs of prose
                and the expertise line, then a hairline, then the ask with the
                buttons on its right. */}
            <div
              style={still ? undefined : { opacity: fade.bioOpacity, filter: `blur(${fade.bioBlurPx}px)` }}
              className="mt-12 w-full text-left"
            >
              <p className="text-pretty font-sans text-lg leading-[1.6] text-foreground">
                I&rsquo;m a design manager who works on data and AI tools. For the last two
                years I led the design team for <span translate="no">Intuit</span>&rsquo;s
                data platform, across{' '}
                <span className="font-heading text-[19px] font-semibold text-foreground">
                  data discovery, governance, lineage, observability,
                </span>{' '}
                and <span className="font-heading text-[19px] font-semibold text-foreground">pipeline authoring</span>.
                Before <span translate="no">Intuit</span> I was at{' '}
                <span translate="no">605</span>, a TV advertising analytics company, where I
                designed three products that generated more than $20M in revenue. I was a
                software engineer before I became a designer. I spent three years at{' '}
                <span translate="no">TIBCO</span> writing back-end Java for its enterprise
                integration platform.
              </p>
              <p className="mt-6 text-pretty font-heading text-[19px] font-semibold leading-[1.6] text-foreground">
                Expertise in agentic AI experience design, data visualization, and design
                strategy for complex data environments.
              </p>

              <div className="mt-10 border-t border-border pt-10">
                <p className="text-balance font-sans text-lg leading-[1.6] text-foreground">
                  I&rsquo;m looking for my next role in the Bay Area, either as a principal
                  designer or leading a design team, at a company building AI, data, or
                  developer tools.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
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
                    href="#case-studies"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25"
                  >
                    Work <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/kanchib"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25"
                  >
                    LinkedIn <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { event } from '@/lib/analytics'
import { useLayoutEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

import { EASE_OUT, MagneticWrap } from '@/components/motion-primitives'
import { HERO } from '@/lib/home-content'
import { PhotoDevelop } from '@/components/overdrive/hero/photo-develop'
import { CursorField, usePhotoTilt } from '@/components/overdrive/hero/cursor-field'
import { LineageThread } from '@/components/overdrive/hero/lineage-thread'

// The lineage thread (from a port on the name node to the photo, desktop) is part of the live hero since
// 12 Nov 2026; the homepage passes no fx and gets it. The other overdrive
// variants live only on /overdrive/hero/[fx]: develop (the photo resolves out
// of the dot grid) and cursor (the grid swells under the pointer and the
// photo leans toward it); those pages show their effect without the thread.
export type HeroFx = 'develop' | 'cursor' | 'thread'

// The hero (11 Nov 2026, from Kanchi's split mock): the left half holds the
// name and the title on white; the dot grid and a pale blue fade
// in from the middle toward the right, where the right half holds the headshot on an offset ledger-blue block. The scroll reveal is
// kept: the stage pins, the name rises from low on the page and settles to a
// smaller size, and the intro and buttons blur in under it. The photo stays.
// Phones and reduced motion get the settled state with no pinning.

const OUTLINE_BUTTON =
  'inline-flex min-h-11 items-center gap-2 rounded-full bg-card px-5 text-sm font-semibold text-foreground ring-1 ring-border transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25'

export function mapClamp(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (v - inMin) / (inMax - inMin)))
  return outMin + t * (outMax - outMin)
}

// Scroll-progress thresholds for the reveal. The name finishes rising at
// NAME_SETTLE; the intro starts fading in before that, so the two read as one
// motion, and is sharp before it is fully opaque.
export const NAME_SETTLE = 0.55
export const BIO_OPACITY_RANGE = { start: 0.3, end: 0.55 }
export const BIO_BLUR_RANGE = { start: 0.3, end: 0.46 }

function Intro() {
  return (
    <>
      {HERO.intro.map((para, i) => (
        <p key={i} className={`${i > 0 ? 'mt-4 ' : ''}text-pretty font-sans text-[17px] leading-[1.6] text-foreground lg:text-lg`}>
          {/* One style throughout: no colour, highlight or underline on any phrase. */}
          {para.map((part) => part.text).join('')}
        </p>
      ))}
    </>
  )
}

function Buttons() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2.5">
      <MagneticWrap className="inline-block">
        <a
          href="#work"
          {...event('hero-button', { button: 'work' })}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-cta transition-[box-shadow,transform] hover:shadow-cta-hover active:scale-[0.98]"
        >
          Design work <span aria-hidden="true">↓</span>
        </a>
      </MagneticWrap>
      <a href="#management" className={OUTLINE_BUTTON} {...event('hero-button', { button: 'management' })}>
        Management <span aria-hidden="true">↓</span>
      </a>
      <a href="/kanchi-bhawalkar-resume.pdf" target="_blank" rel="noopener noreferrer" className={OUTLINE_BUTTON} {...event('hero-button', { button: 'resume' })}>
        Resume <span aria-hidden="true">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href="https://linkedin.com/in/kanchib" target="_blank" rel="noopener noreferrer" className={OUTLINE_BUTTON} {...event('hero-button', { button: 'linkedin' })}>
        LinkedIn <span aria-hidden="true">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  )
}

export function Hero({ fx }: { fx?: HeroFx } = {}) {
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const columnRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  // How far the name block sits below its settled place at rest, so it
  // starts in the lower left of the stage (measured from layout offsets,
  // which transforms do not affect).
  const [restOffset, setRestOffset] = useState(0)
  const reducedMotion = useReducedMotion() !== false
  const [viewportH, setViewportH] = useState(0)
  const [viewportW, setViewportW] = useState(0)
  // First client render matches SSR (no offsets); real values once mounted.
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useLayoutEffect(() => {
    const mq = typeof window.matchMedia === 'function' ? window.matchMedia('(min-width: 768px)') : null
    const sync = () => {
      setViewportH(window.innerHeight)
      setViewportW(window.innerWidth)
      setIsDesktop(mq ? mq.matches : true)
    }
    sync()
    window.addEventListener('resize', sync)
    setMounted(true)
    return () => window.removeEventListener('resize', sync)
  }, [])

  const animate = mounted && !reducedMotion && isDesktop

  useLayoutEffect(() => {
    const col = columnRef.current
    const name = nameRef.current
    if (!animate || !col || !name) return
    const bottomGap = Math.round(viewportH * 0.1)
    setRestOffset(Math.max(0, col.clientHeight - bottomGap - (name.offsetTop + name.offsetHeight)))
  }, [animate, viewportH, viewportW])
  const still = mounted && !animate
  // The load-in: initial states always render (so SSR and hydration agree);
  // reduced motion gets a zero-length transition instead of the choreography.
  const tilt = usePhotoTilt(photoRef, fx === 'cursor')
  const develop = fx === 'develop'
  const enter = (duration: number, delay = 0) => (reducedMotion ? { duration: 0 } : { duration, delay, ease: EASE_OUT })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] })

  // The name block starts in the lower left and rises to its settled place.
  const nameY = useTransform(scrollYProgress, [0, NAME_SETTLE], animate ? [restOffset, 0] : [0, 0])
  // Display size at rest, a heading once the intro is in.
  const restPx = Math.min(92, Math.max(52, viewportW * 0.062))
  const settledPx = Math.min(68, restPx)
  const nameSize = useTransform(scrollYProgress, [0, NAME_SETTLE], animate ? [restPx, settledPx] : [restPx, restPx])
  // The blue block behind the photo slides out to its offset as you scroll.
  const blockShift = useTransform(scrollYProgress, [0, NAME_SETTLE], animate ? [10, 28] : [28, 28])

  // The intro blurs in as motion values, so scrolling never re-renders the
  // hero; it is hidden outright while fully transparent.
  const bioOpacity = useTransform(scrollYProgress, (v) => mapClamp(v, BIO_OPACITY_RANGE.start, BIO_OPACITY_RANGE.end, 0, 1))
  const bioFilter = useTransform(scrollYProgress, (v) => `blur(${mapClamp(v, BIO_BLUR_RANGE.start, BIO_BLUR_RANGE.end, 14, 0)}px)`)
  const bioVisibility = useTransform(bioOpacity, (o) => (o <= 0.01 ? 'hidden' : 'visible'))
  // The node's chrome and the thread hand over to the intro: as one fades in,
  // the other fades out. Without the scroll reveal (phones, reduced motion)
  // the intro is always in, so the plain name shows.
  const nodeChrome = useTransform(bioOpacity, (o) => 1 - o)

  return (
    <section id="hero" ref={heroRef} className="relative md:min-h-[180vh]">
      <div ref={stageRef} className="relative md:sticky md:top-0 md:h-dvh md:overflow-hidden">
        {/* The ground: white under the words, easing to a pale blue on the
            right, with the dot grid fading in from the middle of the page. */}
        <div aria-hidden="true" className="hero-ground pointer-events-none absolute inset-0">
          {fx === 'cursor' && <CursorField stageRef={stageRef} />}
        </div>
        {(!fx || fx === 'thread') && animate && <LineageThread stageRef={stageRef} fromRef={nodeRef} toRef={photoRef} fade={nodeChrome} />}
        <div className="relative flex flex-col-reverse md:grid md:h-full md:grid-cols-[56fr_44fr]">
          {/* Left: name, title, then the intro and buttons. */}
          <div ref={columnRef} className="relative flex flex-col justify-center px-6 pb-12 pt-10 md:pb-8 md:pl-10 md:pr-10 md:pt-24 lg:pl-[max(3.5rem,calc((100vw-72rem)/2+3.5rem))]">
            <motion.div ref={nameRef} style={{ y: nameY }}>
              {/* The name as a lineage node, like the boxes in the Management
                  graph: a card with the name as its title and the role as its
                  meta row. It spans the column, so its edges line up with
                  the intro and buttons; the thread leaves from a port on its
                  right edge. The card's chrome (fill, ring, shadow, divider)
                  and the thread fade out as the intro fades in, so the name
                  and role are left standing on the page. */}
              <motion.div
                ref={nodeRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={enter(0.5)}
                className="relative w-full px-6 pb-5 pt-6 md:px-7"
              >
              <motion.div
                aria-hidden="true"
                style={{ opacity: still ? 0 : nodeChrome }}
                className="pointer-events-none absolute inset-0 rounded-[22px] bg-card shadow-soft ring-1 ring-foreground/10"
              />
              <motion.h1
                style={animate ? { fontSize: nameSize } : undefined}
                translate="no"
                className="relative font-heading text-[clamp(3.25rem,6.2vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.025em] text-foreground"
              >
                {/* Each line rises out of its own mask, the second a beat
                    behind the first. The padding keeps descenders unclipped. */}
                {['Kanchi', 'Bhawalkar'].map((line, i) => (
                  <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                    <motion.span
                      className="block"
                      initial={{ transform: 'translateY(105%)' }}
                      animate={{ transform: 'translateY(0%)' }}
                      transition={enter(0.9, 0.08 + i * 0.09)}
                    >
                      {line}
                      {i === 0 && ' '}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
              <motion.span aria-hidden="true" style={{ opacity: still ? 0 : nodeChrome }} className="relative mt-5 block h-px bg-foreground/10" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={enter(0.6, 0.45)}
                className="relative pt-4 font-sans text-lg tracking-[0.01em] text-foreground"
              >
                Product Design Manager and Principal Designer
              </motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              style={still ? undefined : { opacity: bioOpacity, filter: bioFilter, visibility: bioVisibility }}
              // Inset by the card's padding, so the intro and buttons start on
              // the same line as the name above them.
              className="mt-6 pl-6 md:pl-7"
            >
              <Intro />
              <Buttons />
            </motion.div>
          </div>

          {/* Right: the photo on its offset blue block. */}
          <div className="relative flex h-[25rem] items-center justify-center overflow-hidden pt-16 md:h-full md:pt-0">
            <motion.div ref={photoRef} style={tilt} className="relative w-56 md:mt-10 md:w-[min(26rem,70%,52vh)]">
              {/* The blue block waits behind the photo, then slides out to
                  its offset; scrolling carries it further (blockShift). */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, transform: 'translate(-10px, -10px)' }}
                animate={{ opacity: 1, transform: 'translate(0px, 0px)' }}
                transition={enter(0.8, develop ? 1.35 : 0.55)}
                className="absolute inset-0"
              >
                <motion.div style={{ x: blockShift, y: blockShift }} className="absolute inset-0 rounded-[28px] bg-accent-brand" />
              </motion.div>
              {/* The photo is uncovered from the bottom up while it settles
                  from a slight zoom. */}
              <motion.div
                initial={develop ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
                animate={develop ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
                transition={develop ? enter(0.7, 1.15) : enter(1, 0.15)}
                className="relative overflow-hidden rounded-[28px] shadow-[0_24px_48px_-28px_rgb(var(--shadow-ink)/0.45)]"
              >
                <motion.div
                  initial={{ transform: 'scale(1.08)' }}
                  animate={{ transform: 'scale(1)' }}
                  transition={enter(1.4, 0.15)}
                >
                  <Image
                    src="/images/kanchi.jpeg"
                    alt="Portrait of Kanchi Bhawalkar"
                    width={1024}
                    height={1024}
                    priority
                    sizes="(min-width: 768px) 26rem, 14rem"
                    className="block h-auto w-full"
                  />
                </motion.div>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/[0.06]" />
              </motion.div>
              {develop && mounted && !reducedMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={enter(0.8, 1.2)}
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
                >
                  <PhotoDevelop src="/images/kanchi.jpeg" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

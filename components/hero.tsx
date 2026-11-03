'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

import { event } from '@/lib/analytics'
import { EASE_OUT, MagneticWrap, fadeUp, stagger } from '@/components/motion-primitives'
import { HERO } from '@/lib/home-content'

export const OUTLINE_BUTTON =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25'

// The hero, one screen tall at most: the illustration small on a tinted
// disc, the name as an eyebrow, a headline that says what she designs, one
// sentence of background and scale, two buttons. Entrance only, no scroll
// choreography, so the first work card sits inside the first screen on a
// laptop. Retired on 3 November 2026: the pinned 200vh stage with the name
// rising and the illustration crossfading into the about text.

export function Hero() {
  return (
    <section id="hero" className="relative overflow-clip">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-10 pt-24 text-center md:px-10 md:pb-10 md:pt-20 lg:px-14"
      >
        {/* The illustration on its disc. The drawing is portrait, so it is
            sized by height and keeps its own proportions. */}
        <motion.div
          variants={fadeUp}
          className="relative flex size-40 items-center justify-center rounded-full md:size-44"
          style={{
            background: 'radial-gradient(circle at 50% 40%, var(--card) 0%, var(--wash-bloom-far) 55%, var(--wash-bloom) 100%)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <motion.div
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="flex h-[84%] items-center justify-center"
          >
            <Image
              src="/images/eye-frames/c.webp"
              alt=""
              width={1089}
              height={1444}
              priority
              sizes="(min-width: 768px) 150px, 140px"
              className="h-full w-auto"
            />
          </motion.div>
        </motion.div>

        <motion.p variants={fadeUp} className="label-micro mt-6 text-muted-foreground">
          {HERO.eyebrow} <span translate="no">{HERO.name}</span>
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-4 font-heading text-[clamp(2.375rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-foreground"
        >
          <span className="font-extrabold">{HERO.headline.lead}</span> {HERO.headline.rest}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-4 font-sans text-lg leading-[1.6] text-muted-foreground">
          {HERO.subtitle.before}
          <span className="font-medium text-foreground">{HERO.subtitle.figures}</span>
          {HERO.subtitle.after}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <MagneticWrap className="inline-block">
            <a
              href="#work"
              {...event('hero-button', { button: 'work' })}
              className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-primary-foreground shadow-cta transition-[box-shadow,transform] hover:shadow-cta-hover active:scale-[0.98]"
            >
              {HERO.buttons.work}
              <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-150 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </MagneticWrap>
          <a
            href="/kanchi-bhawalkar-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={OUTLINE_BUTTON}
            {...event('hero-button', { button: 'resume' })}
          >
            {HERO.buttons.resume} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

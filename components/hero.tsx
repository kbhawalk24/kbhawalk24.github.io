'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

import { EASE_OUT, MagneticWrap } from '@/components/motion-primitives'
import { useLayoutMode } from '@/components/layout-mode'

// One beat, no scroll choreography: name, the resume's one-line title, one
// bold expertise line in the accent, three buttons, and the illustration
// held on the right. The narrative moved to the Overview section below
// (components/overview.tsx), so the right half never empties out.

const LINKEDIN = 'https://linkedin.com/in/kanchib'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
})

export function Hero() {
  const { mode } = useLayoutMode()
  const workHref = mode === 'a' ? '#timeline' : '#case-studies'

  const secondary =
    'inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25'

  return (
    <section id="hero" className="relative overflow-clip">
      <div className="mx-auto grid min-h-dvh max-w-6xl items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-14 md:px-10 md:pt-32 lg:px-14">
        <motion.div {...enter(0.1)} className="order-2 md:order-1">
          <h1
            translate="no"
            className="font-heading text-[clamp(3.25rem,7.5vw,6.75rem)] font-extrabold leading-[0.98] tracking-tight text-foreground"
          >
            Kanchi
            <br />
            Bhawalkar
          </h1>

          <p className="mt-6 max-w-[36ch] text-pretty font-sans text-xl leading-snug text-foreground md:text-2xl">
            Product Design Manager with 12+ years of experience transforming complex
            enterprise infrastructure into intuitive products.
          </p>
          <p className="mt-4 max-w-[52ch] text-pretty font-sans text-base font-semibold leading-relaxed text-accent-brand md:text-lg">
            Expertise in agentic AI experience design, data visualization, and design
            strategy for complex data environments.
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
            <a href={workHref} className={secondary}>
              Work <span aria-hidden="true">↓</span>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={secondary}>
              LinkedIn <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </motion.div>

        <motion.div {...enter(0.2)} className="order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-none">
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
    </section>
  )
}

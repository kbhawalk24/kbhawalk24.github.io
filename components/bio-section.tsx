'use client'

import { motion } from 'motion/react'

export function BioSection() {
  return (
    <section
      id="bio"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0a]"
    >
      {/* Dot-grid — white lines at low opacity on dark background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-position-x:24px] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black_50%,transparent)]"
      />

      {/* Content wrapper — same max-width and horizontal padding as hero */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-16 md:px-14 md:py-20">

        {/* Bio text — top of section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-2xl"
        >
          <p className="text-balance font-serif text-2xl leading-tight tracking-tight text-white md:text-4xl">
            I am a Strategic Design Leader with 12+ years of experience
            transforming complex enterprise infrastructure into intuitive
            products.
          </p>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-white/55 md:text-lg">
            For the past 5 years, I have led design for Intuit&apos;s data
            platform, scaling it from a localized discovery tool into
            company-wide infrastructure that 6,000+ people now use monthly to
            find, access, govern, move, and act on data. Before this, I was a
            lead designer at 605, shipping 3 analytics products that contributed
            to $20M+ in revenue, following my early career as a Software
            Developer at TIBCO.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/kanchi-bhawalkar-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Resume <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/60 hover:text-white"
            >
              Work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>

        {/* Name — pushed to the bottom, muted so it reads as a visual anchor
            rather than competing with the bio text above it */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          aria-hidden="true"
          className="mt-auto select-none font-sans text-[clamp(4rem,12vw,10rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white/20"
        >
          Kanchi
          <br />
          Bhawalkar
        </motion.p>
      </div>
    </section>
  )
}

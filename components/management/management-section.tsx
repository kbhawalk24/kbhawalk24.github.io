'use client'

import Link from 'next/link'
import { event } from '@/lib/analytics'
import { MANAGEMENT } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'
import { StageGraph } from './stage-graph'

// The homepage Management section (since 11 Nov 2026): a lineage graph read
// left to right in stages, Me → The platform → The seven areas → What
// changed (./stage-graph.tsx). Replaces the three-tab version
// (components/leadership-section.tsx).
// Heading, sentence and the case-study link are the homepage's own.


export function ManagementSection() {
  const M = MANAGEMENT
  return (
    <section
      id="management"
      className="relative z-10 scroll-mt-20 bg-band"
      style={{
        backgroundImage: 'radial-gradient(circle, color-mix(in oklab, var(--accent-brand) 22%, transparent) 1.3px, transparent 1.6px)',
        backgroundSize: '30px 30px',
      }}
    >
      <div className="mx-auto max-w-6xl px-6 pt-16 md:px-10 lg:px-14">
        <Reveal className="flex flex-col gap-3">
          <h2 className="font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-4xl">{M.heading}</h2>
          <p className="font-sans text-lg leading-[1.55] text-[#3a3a37]">{M.text}</p>
        </Reveal>
        <div className="mt-14 md:mt-20">
          <StageGraph />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16 md:px-10 lg:px-14">
        <Link
          href={M.link.href}
          className="mt-2 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand hover:underline"
          {...event('leadership', { via: 'home' })}
        >
          {M.link.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

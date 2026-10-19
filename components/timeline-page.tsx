'use client'

import { MotionConfig } from 'motion/react'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { CareerLineage } from '@/components/career-lineage'
import { CapabilityMap } from '@/components/capability-map'
import { ContactFooter } from '@/components/contact-footer'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'
import { SectionNav } from '@/components/section-nav'

// The timeline page: the career as a lineage graph, then what the Intuit
// years covered, at a glance (the lifecycle wheel from 1024px up, the cards
// and matrix below that).

const CHAPTERS = [
  { id: 'timeline', title: 'Career timeline' },
  { id: 'at-a-glance', title: 'At a glance' },
]

export function TimelinePage() {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <SiteHeader onHome={false} />
      <main id="main" className="pb-20 pt-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
          <SectionNav chapters={CHAPTERS} variant="row" />
        </div>
        <CareerLineage heading="h1" />
        <section
          id="at-a-glance"
          aria-labelledby="at-a-glance-heading"
          className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-6 pt-20 md:px-10 md:pt-28 lg:px-14"
        >
          <Reveal className="mb-8">
            <h2 id="at-a-glance-heading" className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Work done in the last five years, at a glance
              <HeadingDot />
            </h2>
          </Reveal>
          <CapabilityMap />
        </section>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

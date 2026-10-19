'use client'

import { MotionConfig } from 'motion/react'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { CapabilityMap } from '@/components/capability-map'
import { WorkArcs } from '@/components/work-arcs'
import { HowILead } from '@/components/how-i-lead'
import { CareerLineage } from '@/components/career-lineage'
import { ContactFooter } from '@/components/contact-footer'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        {/* What the work entails, at a glance: the lifecycle wheel from 1024px
            up, the cards and matrix below that. */}
        <section id="at-a-glance" aria-labelledby="at-a-glance-heading" className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-6 pt-16 md:px-10 md:pt-24 lg:px-14">
          <Reveal className="mb-8">
            <h2 id="at-a-glance-heading" className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Work done in the last five years, at a glance
              <HeadingDot />
            </h2>
          </Reveal>
          <CapabilityMap />
        </section>
        <WorkArcs />
        <HowILead />
        <CareerLineage />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

'use client'

import { MotionConfig } from 'motion/react'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { LensProvider } from '@/components/lens'
import { Hero } from '@/components/hero'
import { CapabilityMap } from '@/components/capability-map'
import { WorkArcs } from '@/components/work-arcs'
import { HowILead } from '@/components/how-i-lead'
import { CareerTimeline } from '@/components/career-timeline'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <LensProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        {/* What the work entails, at a glance: the lifecycle wheel from 1024px
            up, the cards and matrix below that. */}
        <div id="at-a-glance" className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-6 pt-16 md:px-10 md:pt-24 lg:px-14">
          <CapabilityMap />
        </div>
        <WorkArcs />
        <HowILead />
        <CareerTimeline />
      </main>
      <ContactFooter />
      </LensProvider>
    </MotionConfig>
  )
}

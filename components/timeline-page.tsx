'use client'

import { MotionConfig } from 'motion/react'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { CareerTimeline } from '@/components/career-timeline'
import { ContactFooter } from '@/components/contact-footer'

// The timeline page: the career as a list of roles and highlights.

export function TimelinePage() {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <SiteHeader onHome={false} />
      <main id="main" className="pb-20 pt-32">
        <CareerTimeline heading="h1" />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

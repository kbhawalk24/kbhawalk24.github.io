'use client'

import { MotionConfig } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { ImpactSection } from '@/components/impact-section'
import { CareerTimeline } from '@/components/career-timeline'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main>
        <Hero />
        <ImpactSection />
        <CareerTimeline />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

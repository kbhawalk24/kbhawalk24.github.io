'use client'

import { MotionConfig } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { CareerTimeline } from '@/components/career-timeline'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main>
        <Hero />
        <CareerTimeline />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

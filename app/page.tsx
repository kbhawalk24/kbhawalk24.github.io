'use client'

import { MotionConfig } from 'motion/react'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { LensProvider } from '@/components/lens'
import { Hero } from '@/components/hero'
import { CareerTimeline } from '@/components/career-timeline'
import { ContactFooter } from '@/components/contact-footer'
import { CursorButterfly } from '@/components/cursor-butterfly'

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <LensProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        <CareerTimeline />
      </main>
      <ContactFooter />
      <CursorButterfly />
      </LensProvider>
    </MotionConfig>
  )
}

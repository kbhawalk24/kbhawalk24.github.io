'use client'

import { MotionConfig } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { WorkArcs } from '@/components/work-arcs'
import { AboutSection } from '@/components/about-section'
import { ContactFooter } from '@/components/contact-footer'

// The landing page: the hero, Selected work and About. The lineage graph and
// the lifecycle wheel have pages of their own.

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main id="main">
        <Hero />
        <WorkArcs />
        <AboutSection />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

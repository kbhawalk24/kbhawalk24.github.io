'use client'

import { MotionConfig } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { WorkArcs } from '@/components/work-arcs'
import { TalksRow } from '@/components/talks-row'
import { ManagementSection } from '@/components/management/management-section'
import { ContactFooter } from '@/components/contact-footer'

// The landing page (rebuilt 11 Nov 2026 from the tabbed landing mock): the
// static hero, Design work, the talks row (placeholders), Management as a lineage graph on its
// blue band, then the contact footer. (Experience and About removed 11 Nov.)

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main id="main">
        <Hero />
        <WorkArcs />
        <TalksRow />
        <ManagementSection />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

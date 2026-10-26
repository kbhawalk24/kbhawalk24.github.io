'use client'

import { MotionConfig } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { WorkArcs } from '@/components/work-arcs'
import { ContactFooter } from '@/components/contact-footer'

// The landing page: the hero and Selected work. About, the lineage graph and
// the lifecycle wheel have pages of their own.

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main id="main">
        <Hero />
        <WorkArcs />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

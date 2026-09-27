'use client'

import { MotionConfig } from 'motion/react'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { LensProvider } from '@/components/lens'
import { LayoutModeProvider, useLayoutMode } from '@/components/layout-mode'
import { Hero } from '@/components/hero'
import { CareerTimeline } from '@/components/career-timeline'
import { CaseStudyIndex } from '@/components/case-study-index'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <LensProvider>
        <LayoutModeProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main">
            <Hero />
            <HomeBody />
          </main>
          <ContactFooter />
        </LayoutModeProvider>
      </LensProvider>
    </MotionConfig>
  )
}

/** A: the career timeline. B: case studies first, then the roles as an
 *  experience list. C: the same, with the list as one-line rows grouped by
 *  track. Picked from the header (components/layout-mode.tsx). */
function HomeBody() {
  const { mode } = useLayoutMode()
  if (mode === 'a') return <CareerTimeline />
  return (
    <>
      <CaseStudyIndex />
      <CareerTimeline variant={mode === 'c' ? 'experience-rows' : 'experience'} />
    </>
  )
}

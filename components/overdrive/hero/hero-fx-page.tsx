'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { event } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { Hero, type HeroFx } from '@/components/hero'
import { WorkArcs } from '@/components/work-arcs'
import { TalksRow } from '@/components/talks-row'
import { ManagementSection } from '@/components/management/management-section'
import { ContactFooter } from '@/components/contact-footer'

// The homepage with one overdrive hero effect (12 Nov 2026), for comparing
// the three side by side. A small switcher, fixed bottom right, moves between
// them and back to the live homepage.

export const HERO_FX: { id: HeroFx; label: string }[] = [
  { id: 'develop', label: 'Develop' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'thread', label: 'Thread' },
]

function Switcher({ current }: { current: HeroFx }) {
  return (
    <nav
      aria-label="Hero variants"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-full bg-card p-1 font-sans text-sm shadow-float ring-1 ring-foreground/10"
    >
      {HERO_FX.map((v) => (
        <Link
          key={v.id}
          href={`/overdrive/hero/${v.id}/`}
          aria-current={v.id === current ? 'page' : undefined}
          {...event('overdrive', { page: 'hero', item: v.id })}
          className={cn(
            'inline-flex min-h-10 items-center rounded-full px-4 font-semibold transition-colors',
            v.id === current ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
          )}
        >
          {v.label}
        </Link>
      ))}
      <Link
        href="/"
        {...event('overdrive', { page: 'hero', item: 'live' })}
        className="inline-flex min-h-10 items-center rounded-full px-4 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        Live
      </Link>
    </nav>
  )
}

export function HeroFxPage({ fx }: { fx: HeroFx }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main id="main">
        <Hero fx={fx} />
        <WorkArcs />
        <TalksRow />
        <ManagementSection />
      </main>
      <ContactFooter />
      <Switcher current={fx} />
    </MotionConfig>
  )
}

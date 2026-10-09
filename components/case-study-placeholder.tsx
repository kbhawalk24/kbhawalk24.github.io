'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { ROLES } from '@/lib/timeline-data'
import { ContactFooter } from '@/components/contact-footer'
import { HeadingDot } from '@/components/heading-dot'
import { LensProvider } from '@/components/lens'
import { SiteHeader } from '@/components/site-header'
import { SkipLink } from '@/components/skip-link'

/** The page a case study's URL shows while its write-up is in progress:
 *  the title, the company, "Coming soon", and the way back. It makes no
 *  claims. The title comes from the role's `caseStudy` in timeline-data. */
export function CaseStudyPlaceholder({ roleId }: { roleId: string }) {
  const role = ROLES.find((r) => r.id === roleId)
  if (!role?.caseStudy) throw new Error(`No case study is set for role "${roleId}"`)

  return (
    <MotionConfig reducedMotion="user">
      <LensProvider>
        <SkipLink />
        <SiteHeader onHome={false} />

        <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-10 md:pb-32 lg:px-14">
          <p className="label-micro text-muted-foreground">Case study &middot; {role.company}</p>
          <h1 className="mt-3 max-w-3xl text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {role.caseStudy.title}
            <HeadingDot />
          </h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center rounded-full bg-card-soft px-3 py-1.5 label-micro text-foreground ring-1 ring-foreground/10">
              Coming soon
            </span>
            <span className="font-sans text-sm text-muted-foreground">The write-up is in progress.</span>
          </p>
          <p className="mt-10">
            <Link
              href={`/#${role.id}`}
              className="-my-2 inline-flex min-h-11 items-center gap-2 py-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
            >
              <span aria-hidden="true">&larr;</span> Back to work highlights
            </Link>
          </p>
        </main>
        <ContactFooter />
      </LensProvider>
    </MotionConfig>
  )
}

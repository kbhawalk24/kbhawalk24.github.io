'use client'

import { Reveal } from '@/components/motion-primitives'

// The narrative beat under the hero, on every layout: eyebrow, one headline
// with the domain nouns in the accent, one paragraph with the numbers bold.
// Facts match the resume and lib/timeline-data.ts.

export function Overview() {
  return (
    <section id="overview" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pb-4 pt-8 md:px-10 md:pb-8 md:pt-12 lg:px-14">
        <Reveal>
          <p className="label-micro text-accent-brand">Overview</p>
          <h2 className="mt-4 max-w-[30ch] text-balance font-heading text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">
            Leading UX strategy and a team of three for <span translate="no">Intuit</span>
            &rsquo;s enterprise data platform, spanning{' '}
            <em className="not-italic text-accent-brand">
              data discovery, governance, lineage, observability,
            </em>{' '}
            and <em className="not-italic text-accent-brand">pipeline authoring</em>.
          </h2>
          <p className="mt-6 max-w-[74ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
            Ten years shipping the work, two years leading the team that ships it, still in
            the codebase. Scaled the platform from a localized discovery tool into
            company-wide infrastructure used by{' '}
            <b className="font-semibold text-foreground">6,000+ people monthly</b>. Directed
            the redesign of data-access workflows, taking provisioning from{' '}
            <b className="font-semibold text-foreground">9 to 3 days</b>. Shipped agentic data
            search with Cursor and Claude MCP servers, cutting time to insight to{' '}
            <b className="font-semibold text-foreground">under 4 minutes</b>. Before{' '}
            <span translate="no">Intuit</span>, a lead designer at{' '}
            <span translate="no">605</span>, shipping three analytics products that
            contributed to <b className="font-semibold text-foreground">$20M+</b> in revenue,
            after an early career as a software developer at <span translate="no">TIBCO</span>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

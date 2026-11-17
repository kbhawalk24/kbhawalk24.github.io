'use client'

import Link from 'next/link'
import { event } from '@/lib/analytics'
import { MANAGEMENT } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'
import { StageGraph } from './stage-graph'
import { HowIManage } from './how-i-manage'

// The homepage Management section (since 11 Nov 2026): a lineage graph read
// left to right in stages, Me → The platform → The seven areas → What
// changed (./stage-graph.tsx). Replaces the three-tab version
// (components/leadership-section.tsx).
// Heading, sentence and the case-study link are the homepage's own.


/** `parts` (the catalog homepage, 16 Nov 2026) puts "How I manage" under the
 *  heading: four parts in place, with the lineage graph as its Impact part.
 *  Without it the section is the heading and the graph, as before. */
export function ManagementSection({ parts = false }: { parts?: boolean }) {
  const M = MANAGEMENT
  return (
    <section
      id="management"
      // On the catalog homepage the tab sits on the page's own ground, like the
      // other tabs: no band, so no edge under the tab row.
      className={`relative z-10 scroll-mt-20 ${parts ? '' : 'bg-band'}`}
      // No dot grid on the catalog homepage (16 Nov 2026); the experimental
      // pages that reuse this section keep it.
      style={
        parts
          ? undefined
          : {
              backgroundImage: 'radial-gradient(circle, color-mix(in oklab, var(--accent-brand) 22%, transparent) 1.3px, transparent 1.6px)',
              backgroundSize: '30px 30px',
            }
      }
    >
      <div className={`mx-auto max-w-6xl px-6 md:px-10 lg:px-14 ${parts ? 'pb-20 pt-4 md:pb-28' : 'pt-16'}`}>
        {!parts && (
          <Reveal className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-4xl">{M.heading}</h2>
            <p className="font-sans text-lg leading-[1.55] text-[#3a3a37]">{M.text}</p>
          </Reveal>
        )}
        <div className={parts ? '' : 'mt-14 md:mt-20'}>{parts ? <HowIManage /> : <StageGraph />}</div>
      </div>

      {/* The story is the whole case; only the short versions link on to it. */}
      <div className={parts ? 'pb-16' : 'mx-auto max-w-6xl px-6 pb-16 md:px-10 lg:px-14'} hidden={parts}>
        <Link
          href={M.link.href}
          className={`${parts ? 'mt-8' : 'mt-2'} inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand hover:underline`}
          {...event('leadership', { via: 'home' })}
        >
          {M.link.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

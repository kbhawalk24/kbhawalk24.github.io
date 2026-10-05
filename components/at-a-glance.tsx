'use client'

import Image from 'next/image'
import { Reveal } from '@/components/motion-primitives'

// The platform at a glance: Kanchi's own five-panel illustration of the
// work (catalog, trust, the agent, access, data hygiene) with its numbers.
// It sits directly under the hero, first thing after the pinned stage
// releases, so the first scroll past the about text lands on it. The alt
// text carries the figures for anyone not seeing the image.

const ALT =
  'Five panels of the data platform work. 1, Foundation and discovery, the unified catalog: 96% top-5 search click-through, 89% semantic search precision. ' +
  '2, Operational trust, scorecards and interactive lineage: 7,000+ verified clean-data products, about 30,000 tables and 7,000 pipelines in four weeks. ' +
  '3, The agentic future, Data Copilot and MCP integration: 500+ monthly users, 2x faster SQL authoring, CTO Investor Day showcase. ' +
  '4, Governance and access, self-serve provisioning: 9 to 3 days access approval latency, 85% fewer restricted-data denials. ' +
  '5, Data hygiene and maturity, AI-powered quality and context: 7,000+ verified clean-data products.'

export function AtAGlance() {
  return (
    <section id="at-a-glance" aria-label="The platform at a glance" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-4 md:px-10 md:pt-8 lg:px-14">
        <Reveal>
          <figure className="overflow-hidden rounded-[14px] bg-card shadow-soft">
            <Image
              src="/images/platform-at-a-glance.webp"
              alt={ALT}
              width={1960}
              height={658}
              sizes="(min-width: 1280px) 1040px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

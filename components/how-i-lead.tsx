'use client'

import Link from 'next/link'
import { HOW_I_LEAD } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// "How I lead" on the homepage is a pointer: the framing sentence and two
// links into the About page, where the principles live in full.

export function HowILead() {
  return (
    <section id="how-i-lead" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-10 md:pt-28 lg:px-14">
        <Reveal className="max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {HOW_I_LEAD.heading}
            <HeadingDot />
          </h2>
          <p className="mt-6 max-w-[62ch] text-pretty font-sans text-lg leading-[1.6] text-foreground">
            {HOW_I_LEAD.framing}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {HOW_I_LEAD.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
              >
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

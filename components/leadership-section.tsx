'use client'

import Link from 'next/link'
import { event } from '@/lib/analytics'
import { LEADERSHIP } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Leadership on the homepage: its own section after Selected work, kept
// apart from the case studies. A paragraph, two figures and one link to the
// Leadership page. No screenshot card.

export function LeadershipSection() {
  const l = LEADERSHIP
  return (
    <section id="leadership" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-32 lg:px-14">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {l.heading}
            <HeadingDot />
          </h2>
          <p className="mt-4 text-pretty font-sans text-lg leading-relaxed text-muted-foreground">{l.text}</p>
        </Reveal>
        <Reveal className="mt-8 grid gap-4 sm:grid-cols-2">
          {l.stats.map((s) => (
            <div key={s.value} className="rounded-[18px] bg-card p-6 shadow-soft">
              <p className="font-heading text-3xl font-semibold leading-tight tracking-tight text-accent-brand tabular-nums">{s.value}</p>
              <p className="mt-2 font-sans text-sm leading-snug text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </Reveal>
        <Link
          href={l.link.href}
          className="mt-6 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors duration-300 ease-out hover:underline"
          {...event('leadership', { via: 'home' })}
        >
          {l.link.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

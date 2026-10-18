'use client'

import Link from 'next/link'
import { ARCS, type Arc, type WorkCard } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Selected work: three strategic arcs, each with a thesis sentence and its
// cards. Card format, stacked: cover placeholder on top, role tag, title,
// an optional line, the outcome as one or two stats, then the status chip.
// A card links only once its page exists (status 'live' with an href).

const DIAGONAL_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, var(--stripe-a) 0, var(--stripe-a) 10px, var(--stripe-b) 10px, var(--stripe-b) 20px)',
}

function Cover({ card }: { card: WorkCard }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${card.visualNote}`}
      className="aspect-[16/10] w-full"
      style={DIAGONAL_STRIPES}
    />
  )
}

function Status({ card }: { card: WorkCard }) {
  if (card.status === 'coming-soon') {
    return (
      <p className="mt-5 flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center rounded-full bg-card-soft px-3 py-1.5 label-micro text-foreground ring-1 ring-foreground/10">
          Coming soon
        </span>
        <span className="font-sans text-sm text-muted-foreground">The write-up is in progress.</span>
      </p>
    )
  }
  if (!card.href) return null
  return (
    <Link
      href={card.href}
      className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
    >
      Read the case study <span aria-hidden="true">→</span>
    </Link>
  )
}

function Card({ card }: { card: WorkCard }) {
  return (
    <>
      <Cover card={card} />
      <div className="px-6 pb-6 pt-6 sm:px-7">
        <p className="label-micro text-accent-brand">
          {card.roleTag} <span className="text-muted-foreground">· {card.period}</span>
        </p>
        <h4 className="mt-3 text-balance font-heading text-xl font-semibold leading-tight tracking-tight">
          {card.title}
        </h4>
        {card.line && (
          <p className="mt-2 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
            {card.line}
          </p>
        )}
        <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-foreground/10 pt-4 sm:grid-cols-2">
          {card.stats.map((s) => (
            <li key={s.label}>
              <p className="font-heading text-2xl font-semibold leading-tight tracking-tight tabular-nums text-accent-brand">
                {s.value}
              </p>
              <p className="mt-1 label-micro text-muted-foreground">{s.label}</p>
            </li>
          ))}
        </ul>
        <Status card={card} />
      </div>
    </>
  )
}

function ArcSection({ arc, index }: { arc: Arc; index: number }) {
  return (
    <div className={index === 0 ? undefined : 'mt-16 md:mt-20'}>
      <Reveal className="mb-8 max-w-3xl">
        <p className="label-micro text-muted-foreground">
          Arc {index + 1} · {arc.period}
        </p>
        <h3 className="mt-3 text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {arc.heading}
        </h3>
        {arc.thesis && (
          <p className="mt-4 max-w-[62ch] text-pretty font-sans text-lg leading-[1.6] text-foreground">
            {arc.thesis}
          </p>
        )}
      </Reveal>
      <ol className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {arc.cards.map((card, i) => (
          <Reveal
            key={card.slug}
            as="li"
            delay={Math.min(i, 3) * 0.06}
            className="overflow-hidden rounded-[14px] bg-card shadow-soft"
          >
            <Card card={card} />
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export function WorkArcs() {
  return (
    <section id="work" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-24 lg:px-14">
        <Reveal className="mb-10 md:mb-12">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Selected work
            <HeadingDot />
          </h2>
        </Reveal>
        {ARCS.map((arc, i) => (
          <ArcSection key={arc.id} arc={arc} index={i} />
        ))}
      </div>
    </section>
  )
}

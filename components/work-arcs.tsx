'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { FEATURED, MORE, type WorkCard } from '@/lib/home-content'
import { TRACKS } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Selected work: three case studies as cards, then a one-line list of the
// other pages, which stay live. Card format, stacked: cover on top, a track
// pill with the period, title, one line, one measured outcome in the track's
// colour, then the link.

const DIAGONAL_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, var(--stripe-a) 0, var(--stripe-a) 10px, var(--stripe-b) 10px, var(--stripe-b) 20px)',
}

function Cover({ card }: { card: WorkCard }) {
  return (
    <div
      role="img"
      aria-label={`Image to come: ${card.visualNote}`}
      className="relative aspect-[16/10] w-full"
      style={DIAGONAL_STRIPES}
    >
      <span className="absolute right-4 top-4 rounded-full bg-card px-3 py-1 label-micro text-muted-foreground shadow-soft">
        Image to come
      </span>
    </div>
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
      className="mt-2 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
    >
      Read the case study <span aria-hidden="true">→</span>
    </Link>
  )
}

function Card({ card }: { card: WorkCard }) {
  const stat = card.stats[0]
  return (
    <>
      <Cover card={card} />
      <div className="px-6 pb-6 pt-5 sm:px-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className={cn('inline-block rounded-full px-2.5 py-1 label-micro', trackStyles[card.track].badgeFlat)}>
            {TRACKS[card.track].label}
          </span>
          <span className="label-micro text-muted-foreground">{card.period}</span>
        </p>
        <h4 className="mt-3 text-balance font-heading text-xl font-semibold leading-tight tracking-tight">
          {card.title}
        </h4>
        <p className="mt-2 text-pretty font-sans text-base leading-relaxed text-muted-foreground">{card.line}</p>
        <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={cn('font-heading text-2xl font-semibold leading-tight tracking-tight tabular-nums', trackStyles[card.track].accentText)}>
            {stat.value}
          </span>
          <span className="label-micro text-muted-foreground">{stat.label}</span>
        </p>
        <div className="mt-5 border-t border-foreground/10 pt-1">
          <Status card={card} />
        </div>
      </div>
    </>
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
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED.map((card, i) => (
            <Reveal key={card.slug} as="li" delay={Math.min(i, 3) * 0.06} className="overflow-hidden rounded-[14px] bg-card shadow-soft">
              <Card card={card} />
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 md:mt-16">
          <p className="label-micro text-muted-foreground">Also</p>
          <ul className="mt-3 divide-y divide-border">
            {MORE.map((card) => (
              <li key={card.slug} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  {card.href ? (
                    <Link href={card.href} className="font-sans text-base font-semibold text-foreground underline-offset-4 hover:underline">
                      {card.title}
                    </Link>
                  ) : (
                    <span className="font-sans text-base font-semibold text-foreground">{card.title}</span>
                  )}
                  <span className="label-micro text-muted-foreground">{card.period}</span>
                </span>
                <span className="font-sans text-sm text-muted-foreground">
                  <span className={cn('font-heading text-base font-semibold tabular-nums', trackStyles[card.track].accentText)}>{card.stats[0].value}</span>{' '}
                  {card.stats[0].label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

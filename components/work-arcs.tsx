'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ARCS, type Arc, type WorkCard } from '@/lib/home-content'
import { TRACKS } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Selected work: three arcs, each with a heading and a thesis to ground the
// reader, then the arc's case study as one full-width card. The card holds a
// thumbnail on the left: a soft tinted panel inset in the card, with the
// product screenshot shown whole on it as a framed window. The text sits beside it: where and when, the track
// pill, the title, one line, one measured outcome and the link.

const PANEL = {
  backgroundImage:
    'linear-gradient(160deg, color-mix(in oklab, var(--accent-brand) 5%, var(--card)) 0%, color-mix(in oklab, var(--accent-brand) 15%, var(--card)) 100%)',
}

function Thumbnail({ card }: { card: WorkCard }) {
  return (
    <Link
      href={card.href ?? '#work'}
      tabIndex={-1}
      aria-hidden="true"
      className="group flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[12px] p-[7%] md:aspect-auto md:min-h-[440px]"
      style={PANEL}
    >
      {card.cover && (
        <div className="w-full overflow-hidden rounded-[8px] bg-card shadow-[0_24px_48px_-16px_rgb(20_20_20/0.28)] ring-1 ring-foreground/10 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.cover.src} alt="" loading="lazy" decoding="async" className="block h-auto w-full" />
        </div>
      )}
    </Link>
  )
}

function Card({ card }: { card: WorkCard }) {
  const stat = card.stats[0]
  return (
    <article className="grid gap-2 rounded-[18px] bg-card p-3 shadow-soft md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-0 md:p-4">
      <Thumbnail card={card} />
      <div className="flex flex-col justify-center px-3 pb-4 pt-4 sm:px-5 md:px-10 md:py-10">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label-micro text-muted-foreground">
            {card.org} · {card.period}
          </span>
          <span className={cn('inline-block rounded-full px-2.5 py-1 label-micro', trackStyles[card.track].badgeFlat)}>
            {TRACKS[card.track].label}
          </span>
        </p>
        <h4 className="mt-4 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
          {card.href ? (
            <Link href={card.href} className="underline-offset-4 hover:underline">
              {card.title}
            </Link>
          ) : (
            card.title
          )}
        </h4>
        {card.cover && <span className="sr-only">{card.cover.alt}</span>}
        <p className="mt-3 text-pretty font-sans text-base leading-relaxed text-muted-foreground">{card.line}</p>
        <p className="mt-5">
          <span className={cn('block font-heading text-2xl font-semibold leading-tight tracking-tight tabular-nums', trackStyles[card.track].accentText)}>
            {stat.value}
          </span>
          <span className="mt-1 block label-micro text-muted-foreground">{stat.label}</span>
        </p>
        {card.href && (
          <Link
            href={card.href}
            className="mt-4 inline-flex min-h-11 items-center gap-2 self-start font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
          >
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}

function ArcSection({ arc, index }: { arc: Arc; index: number }) {
  return (
    <div className={index === 0 ? undefined : 'mt-16 md:mt-24'}>
      <Reveal className="mb-8">
        <p className="label-micro text-muted-foreground">
          Arc {index + 1} · {arc.period}
        </p>
        <h3 className="mt-3 text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">{arc.heading}</h3>
        {arc.thesis && <p className="mt-4 max-w-4xl text-pretty font-sans text-lg leading-[1.6] text-foreground">{arc.thesis}</p>}
      </Reveal>
      <ol className="grid gap-6">
        {arc.cards.map((card) => (
          <Reveal key={card.slug} as="li">
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

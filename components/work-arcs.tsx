'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ARCS, type Arc, type WorkCard } from '@/lib/home-content'
import { TRACKS } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Selected work: three arcs, each with a heading and a thesis to ground the
// reader, then the arc's case study as one full-width card: a wide cover on
// top, then the track pill, period, title and one line on the left, and one
// measured outcome in the track's colour with the link on the right.

function Cover({ card }: { card: WorkCard }) {
  return (
    <Link href={card.href ?? '#work'} tabIndex={-1} aria-hidden="true" className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-card-soft md:aspect-[2/1]">
        {card.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.cover.src}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: card.cover.position ?? 'left top' }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.015]"
          />
        )}
      </div>
    </Link>
  )
}

function Card({ card }: { card: WorkCard }) {
  const stat = card.stats[0]
  return (
    <article className="overflow-hidden rounded-[14px] bg-card shadow-soft">
      <Cover card={card} />
      <div className="grid gap-6 px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:items-end md:gap-10">
        <div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={cn('inline-block rounded-full px-2.5 py-1 label-micro', trackStyles[card.track].badgeFlat)}>
              {TRACKS[card.track].label}
            </span>
            <span className="label-micro text-muted-foreground">{card.period}</span>
          </p>
          <h4 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {card.href ? (
              <Link href={card.href} className="underline-offset-4 hover:underline">
                {card.title}
              </Link>
            ) : (
              card.title
            )}
          </h4>
          {card.cover && <span className="sr-only">{card.cover.alt}</span>}
          <p className="mt-2 max-w-2xl text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg">{card.line}</p>
        </div>
        <div className="border-t border-foreground/10 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p>
            <span className={cn('block font-heading text-2xl font-semibold leading-tight tracking-tight tabular-nums md:text-3xl', trackStyles[card.track].accentText)}>
              {stat.value}
            </span>
            <span className="mt-1 block label-micro text-muted-foreground">{stat.label}</span>
          </p>
          {card.href && (
            <Link
              href={card.href}
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
            >
              Read the case study <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
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

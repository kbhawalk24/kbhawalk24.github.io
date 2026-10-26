'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ARCS, type Arc, type WorkCard } from '@/lib/home-content'
import { TRACKS } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { tintPanel, tintPill, tintText } from '@/lib/tint'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Selected work: three arcs, each with a heading and a thesis to ground the
// reader, then the arc's case study as one full-width card. The card holds a
// thumbnail on the left: a soft panel in the prototype's own colour, inset in the card, with the
// product screenshot shown whole on it as a framed window, or a muted clip
// that plays while the card is on screen. The text sits beside it: where and when, the track
// pill, the title, one line, one measured outcome and the link.

// A muted clip that plays only while its card is on screen. Visitors who
// prefer reduced motion see the poster; the button pauses it either way.
function ThumbVideo({ cover }: { cover: NonNullable<WorkCard['cover']> }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || reduce || userPaused) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduce, userPaused])

  function toggle() {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      setUserPaused(false)
      v.play().catch(() => {})
    } else {
      setUserPaused(true)
      v.pause()
    }
  }

  return (
    <>
      <video
        ref={ref}
        src={cover.video}
        poster={cover.src}
        width={cover.width}
        height={cover.height}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause the preview' : 'Play the preview'}
        className="pointer-events-auto absolute bottom-2.5 right-2.5 inline-flex size-9 items-center justify-center rounded-full bg-foreground/75 text-background shadow-soft transition-[background-color,transform] duration-150 ease-out hover:bg-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2"
      >
        {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5 translate-x-px" aria-hidden="true" />}
      </button>
    </>
  )
}

function Thumbnail({ card }: { card: WorkCard }) {
  const cover = card.cover
  return (
    <div className="relative">
      {/* The screenshot sits inset on the panel and runs off its bottom edge,
          so every cover crops the same way whatever its aspect. */}
      <div className="group relative aspect-[4/3] overflow-hidden rounded-[18px]" style={cover ? tintPanel(cover.tint) : undefined}>
        {/* The whole panel opens the case study; the title link carries the name. */}
        <Link href={card.href ?? '#work'} tabIndex={-1} aria-hidden="true" className="absolute inset-0 z-10" />
        {cover && (
          <div className="pointer-events-none absolute inset-x-[5%] top-[7%] overflow-hidden rounded-t-[10px] bg-card shadow-[0_24px_48px_-16px_rgb(20_20_20/0.28)] ring-1 ring-foreground/10 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1.5">
            {cover.video ? (
              <ThumbVideo cover={cover} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover.src} alt="" loading="lazy" decoding="async" className="block h-auto w-full" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Card({ card }: { card: WorkCard }) {
  const stat = card.stats[0]
  const tint = card.cover?.tint
  return (
    <article id={card.slug} className="grid scroll-mt-36 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-center md:gap-16 lg:gap-24">
      <div className="order-2 md:order-1">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label-micro text-muted-foreground">
            {card.org} · {card.period}
          </span>
          <span
            className={cn('inline-block rounded-full px-2.5 py-1 label-micro', !tint && trackStyles[card.track].badgeFlat)}
            style={tint ? tintPill(tint) : undefined}
          >
            {TRACKS[card.track].label}
          </span>
        </p>
        <h4 className="mt-4 text-balance font-heading text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
          {card.href ? (
            <Link href={card.href} className="underline-offset-4 hover:underline">
              {card.title}
            </Link>
          ) : (
            card.title
          )}
        </h4>
        {card.cover && <span className="sr-only">{card.cover.alt}</span>}
        <p className="mt-4 text-pretty font-sans text-lg leading-[1.6] text-muted-foreground">{card.line}</p>
        <p className="mt-6 inline-block rounded-[14px] bg-card px-6 py-5 shadow-soft">
          <span
            className={cn('block font-heading text-3xl font-semibold leading-none tracking-tight tabular-nums md:text-4xl', !tint && trackStyles[card.track].accentText)}
            style={tint ? tintText(tint) : undefined}
          >
            {stat.value}
          </span>
          <span className="mt-2.5 block label-micro text-muted-foreground">{stat.label}</span>
        </p>
        {card.href && (
          <Link
            href={card.href}
            className={cn('mt-5 flex min-h-11 w-fit items-center gap-2 font-sans text-lg font-semibold transition-colors hover:underline', !tint && 'text-accent-brand')}
            style={tint ? tintText(tint) : undefined}
          >
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <div className="order-1 md:order-2">
        <Thumbnail card={card} />
      </div>
    </article>
  )
}

function ArcSection({ arc, index }: { arc: Arc; index: number }) {
  return (
    <div className={index === 0 ? undefined : 'mt-16 md:mt-24'}>
      <Reveal className="mb-12">
        <p className="label-micro text-muted-foreground">
          Arc {index + 1} · {arc.period}
        </p>
        <h3 className="mt-3 text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">{arc.heading}</h3>
        {arc.thesis && <p className="mt-4 max-w-4xl text-pretty font-sans text-lg leading-[1.6] text-foreground">{arc.thesis}</p>}
      </Reveal>
      <ol className="grid gap-12">
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
      {/* Full width, with the page gutters: each entry runs edge to edge. */}
      <div className="mx-auto w-full px-6 pt-16 md:px-10 md:pt-24 lg:px-14">
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

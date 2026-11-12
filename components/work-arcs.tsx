'use client'

import { event } from '@/lib/analytics'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ARCS, type WorkCard } from '@/lib/home-content'
import { tintPanel } from '@/lib/tint'
import { Reveal } from '@/components/motion-primitives'

// Selected work: the case studies as one run of full-width cards (the arc
// headings went with the 11 Nov landing rebuild). The card holds a
// thumbnail on the left: a soft panel in the prototype's own colour, inset in the card, with the
// product screenshot shown whole on it as a framed window, or a muted clip
// that plays while the card is on screen. The text sits beside it: where and when, the track
// pill, the title, one line, one measured outcome and the link.

// A muted clip that plays only while its card is on screen. Visitors who
// prefer reduced motion see the poster; the button pauses it either way.
function ThumbVideo({ cover, slug }: { cover: NonNullable<WorkCard['cover']>; slug: string }) {
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
        {...event('clip', { card: slug, action: playing ? 'pause' : 'play' })}
        className="pointer-events-auto absolute bottom-2.5 right-2.5 inline-flex size-9 items-center justify-center rounded-full bg-foreground/75 text-background shadow-soft transition-[background-color,transform] duration-200 ease-out hover:bg-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2"
      >
        {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5 translate-x-px" aria-hidden="true" />}
      </button>
    </>
  )
}

function Thumbnail({ card }: { card: WorkCard }) {
  const cover = card.cover
  return (
    <div
      className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[12px] p-[7%] md:aspect-auto md:min-h-[440px]"
      style={cover ? tintPanel(cover.tint) : undefined}
    >
      {/* The whole panel opens the case study; the title link carries the name. */}
      <Link href={card.href ?? '#work'} tabIndex={-1} aria-hidden="true" className="absolute inset-0" {...event('work-card', { card: card.slug, via: 'panel' })} />
      {cover && (
        <div className="pointer-events-none relative w-full overflow-hidden rounded-[8px] bg-card shadow-[0_24px_48px_-16px_rgb(20_20_20/0.28)] ring-1 ring-foreground/10 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1.5">
          {cover.video ? (
            <ThumbVideo cover={cover} slug={card.slug} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover.src} alt="" loading="lazy" decoding="async" className="block h-auto w-full" />
          )}
        </div>
      )}
    </div>
  )
}

function Card({ card }: { card: WorkCard }) {
  const stat = card.stats[0]
  return (
    <article id={card.slug} className="relative grid scroll-mt-36 gap-2 rounded-[18px] bg-card p-3 shadow-soft md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-0 md:p-4">
      <Thumbnail card={card} />
      <div className="flex flex-col justify-center px-3 pb-4 pt-4 sm:px-5 md:px-10 md:py-10">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label-micro text-muted-foreground">
            {card.org} · {card.period}
          </span>
          <span className="inline-block rounded-full bg-foreground/[0.06] px-2.5 py-1 label-micro text-muted-foreground">
            {card.role}
          </span>
        </p>
        <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
          {card.href ? (
            <Link href={card.href} className="underline-offset-4 hover:underline" {...event('work-card', { card: card.slug, via: 'title' })}>
              {card.title}
            </Link>
          ) : (
            card.title
          )}
        </h3>
        {card.cover && <span className="sr-only">{card.cover.alt}</span>}
        <p className="mt-3 text-pretty font-sans text-base leading-relaxed text-muted-foreground">{card.line}</p>
        <p className="mt-5">
          <span
            className="block font-heading text-2xl font-semibold leading-tight tracking-tight tabular-nums text-accent-brand"
          >
            {stat.value}
          </span>
          <span className="mt-1 block font-sans text-sm leading-snug text-muted-foreground">{stat.label}</span>
        </p>
        {card.href && (
          <Link
            href={card.href}
            className="mt-4 inline-flex min-h-11 items-center gap-2 self-start font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
            {...event('work-card', { card: card.slug, via: 'read' })}
          >
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}

export function WorkArcs() {
  // The arcs stay in the data for order; the page shows one run of cards.
  const cards = ARCS.flatMap((arc) => arc.cards)
  return (
    <section id="work" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-20 md:px-10 lg:px-14">
        <Reveal className="mb-8">
          <p className="label-micro text-muted-foreground">Individual design · 2017–2026</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-4xl">Design work</h2>
        </Reveal>
        <ol className="grid gap-8">
          {cards.map((card) => (
            <Reveal key={card.slug} as="li">
              <Card card={card} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

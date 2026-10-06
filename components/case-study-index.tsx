'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PAGES, type PortfolioPage } from '@/lib/site-content'
import { useLens, withLens } from '@/components/lens'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// The four case studies as editorial entries, one white card each, in one
// of two styles picked from the section header (URL `?cards=1|2`, kept in
// localStorage) so they can be compared on the live site:
//
//  1 · image on the left (5/12), claim and two stats on the right.
//  2 · claim and stats on top, then the cover in a browser frame at the
//      full card width, bleeding off the card's bottom edge. Built for a
//      large screenshot or a short video loop.
//
// Covers come from each page's `cover`; until one exists the slot shows the
// striped placeholder at the right aspect ratio.

const DIAGONAL_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, var(--stripe-a) 0, var(--stripe-a) 10px, var(--stripe-b) 10px, var(--stripe-b) 20px)',
}

type CardStyle = '1' | '2'
const KEY = 'cards'
const parse = (v: string | null): CardStyle | null => (v === '1' || v === '2' ? v : null)

function useCardStyle(): [CardStyle, (s: CardStyle) => void] {
  const [style, setStyleState] = useState<CardStyle>('1')
  useEffect(() => {
    const fromUrl = parse(new URLSearchParams(window.location.search).get(KEY))
    let stored: CardStyle | null = null
    try {
      stored = parse(window.localStorage.getItem(KEY))
    } catch {}
    setStyleState(fromUrl ?? stored ?? '1')
  }, [])
  const setStyle = (next: CardStyle) => {
    setStyleState(next)
    try {
      window.localStorage.setItem(KEY, next)
    } catch {}
    const url = new URL(window.location.href)
    url.searchParams.set(KEY, next)
    window.history.replaceState(null, '', url)
  }
  return [style, setStyle]
}

function Stats({ page, className }: { page: PortfolioPage; className?: string }) {
  const stats = page.metrics.slice(0, 2)
  if (stats.length === 0) return null
  return (
    <dl className={cn('flex flex-wrap gap-x-8 gap-y-3', className)}>
      {stats.map((m) => (
        <div key={m.label} className="flex flex-col-reverse">
          <dt className="mt-1.5 label-micro text-muted-foreground">{m.label}</dt>
          <dd className="font-heading text-xl font-semibold leading-tight tabular-nums text-accent-brand">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function ReadLink({ page }: { page: PortfolioPage }) {
  const { lens } = useLens()
  return (
    <Link
      href={withLens(page.href, lens)}
      className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
    >
      Read the case study <span aria-hidden="true">→</span>
    </Link>
  )
}

/** The cover: a real image or video once the page has one, the striped
 *  placeholder until then. `aspect` is the box's ratio class. */
function Cover({ page, aspect }: { page: PortfolioPage; aspect: string }) {
  const cover = page.cover
  if (cover?.src && cover.kind === 'video') {
    return (
      <video
        src={cover.src}
        poster={cover.poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label={cover.caption}
        className={cn('w-full object-cover', aspect)}
      />
    )
  }
  if (cover?.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={cover.src} alt={cover.caption} className={cn('w-full object-cover', aspect)} />
  }
  return <div className={cn('w-full', aspect)} style={DIAGONAL_STRIPES} />
}

/** Style 1: image left, text right. */
function SideCard({ page }: { page: PortfolioPage }) {
  return (
    <>
      <div className="md:min-h-full">
        <Cover page={page} aspect="aspect-[16/10] md:aspect-auto md:h-full" />
      </div>
      <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7">
        <p className="label-micro text-accent-brand">{page.eyebrow}</p>
        <h3 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">
          {page.title}
        </h3>
        <p className="mt-2 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
          {page.claim}
        </p>
        <Stats page={page} className="mt-5 border-t border-foreground/10 pt-4" />
        <ReadLink page={page} />
      </div>
    </>
  )
}

/** Style 2: text on top, the cover in a browser frame bleeding off the
 *  bottom of the card at full width. */
function WideCard({ page }: { page: PortfolioPage }) {
  return (
    <>
      <div className="grid gap-6 px-6 pt-6 sm:px-8 sm:pt-7 md:grid-cols-[minmax(0,1fr)_280px] md:gap-12">
        <div>
          <p className="label-micro text-accent-brand">{page.eyebrow}</p>
          <h3 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">
            {page.title}
          </h3>
          <p className="mt-2 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
            {page.claim}
          </p>
          <ReadLink page={page} />
        </div>
        <Stats page={page} className="md:flex-col md:gap-y-4 md:pt-7" />
      </div>
      <div className="px-6 pt-5 sm:px-8 sm:pt-6">
        {/* The frame: a title bar and the cover, rounded only at the top
            because the card's edge clips the bottom. */}
        <div className="overflow-hidden rounded-t-[10px] bg-card shadow-float">
          <div aria-hidden="true" className="flex h-7 items-center gap-1.5 bg-card-soft px-3">
            <span className="size-2 rounded-full bg-foreground/10" />
            <span className="size-2 rounded-full bg-foreground/10" />
            <span className="size-2 rounded-full bg-foreground/10" />
          </div>
          <Cover page={page} aspect="aspect-[16/9] sm:aspect-[2/1]" />
        </div>
      </div>
    </>
  )
}

export function CaseStudyIndex() {
  const [style, setStyle] = useCardStyle()

  return (
    <section id="case-studies" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-12 md:px-10 md:pt-16 lg:px-14">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Case studies
              <HeadingDot />
            </h2>
            <p className="mt-3 max-w-[52ch] font-sans text-base leading-relaxed text-muted-foreground">
              Four stories, 2017 to now. Each one links to the full write-up.
            </p>
          </div>
          <div
            role="group"
            aria-label="Case study card style"
            className="flex items-center gap-0.5 rounded-full bg-foreground/[6%] p-0.5"
          >
            {(['1', '2'] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={style === s}
                aria-label={`Card style ${s}`}
                onClick={() => setStyle(s)}
                className={cn(
                  'min-h-9 min-w-9 rounded-full px-2.5 font-sans text-xs font-semibold transition-colors',
                  style === s
                    ? 'bg-card text-foreground shadow-float'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </Reveal>

        <ol className={cn('grid', style === '2' ? 'gap-10' : 'gap-6')}>
          {PAGES.map((page, i) => (
            <Reveal
              key={`${style}-${page.slug}`}
              as="li"
              delay={Math.min(i, 3) * 0.06}
              className={cn(
                'overflow-hidden rounded-[14px] bg-card shadow-soft',
                style === '1' && 'md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]',
              )}
            >
              {style === '2' ? <WideCard page={page} /> : <SideCard page={page} />}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

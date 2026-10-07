'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PAGES, type PortfolioPage } from '@/lib/site-content'
import { useLens, withLens } from '@/components/lens'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// The four case studies as editorial entries, one white card each: the
// cover on the left (5/12), the claim and two stats on the right. A second
// style with the cover in a browser frame at full width is kept in
// previous-experiments/case-study-index-two-styles.tsx for when real
// screenshots exist.
//
// Covers come from each page's `cover`; until one exists the slot shows the
// striped placeholder.

const DIAGONAL_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, var(--stripe-a) 0, var(--stripe-a) 10px, var(--stripe-b) 10px, var(--stripe-b) 20px)',
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
  if (page.status === 'coming-soon') {
    return (
      <p className="mt-5 flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center rounded-full bg-card-soft px-3 py-1.5 label-micro text-foreground ring-1 ring-foreground/10">
          Coming soon
        </span>
        <span className="font-sans text-sm text-muted-foreground">The write-up is in progress.</span>
      </p>
    )
  }
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

/** Image left, text right. */
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

export function CaseStudyIndex() {
  return (
    <section id="case-studies" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-12 md:px-10 md:pt-16 lg:px-14">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Case studies
            <HeadingDot />
          </h2>
        </Reveal>

        <ol className="grid gap-6">
          {PAGES.map((page, i) => (
            <Reveal
              key={page.slug}
              as="li"
              delay={Math.min(i, 3) * 0.06}
              className="overflow-hidden rounded-[14px] bg-card shadow-soft md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            >
              <SideCard page={page} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

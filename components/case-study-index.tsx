'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PAGES, type PortfolioPage } from '@/lib/site-content'
import { useLens, withLens } from '@/components/lens'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// The Work section: the four case studies, one white card each, with the
// cover on the left and the role, title, claim, and one line of verified
// outcomes on the right. Covers come from each page's `cover`; until one
// exists the slot shows the striped placeholder. A page marked coming-soon
// says so instead of linking.

const DIAGONAL_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, var(--stripe-a) 0, var(--stripe-a) 10px, var(--stripe-b) 10px, var(--stripe-b) 20px)',
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
 *  placeholder until then. */
function Cover({ page }: { page: PortfolioPage }) {
  const cover = page.cover
  const box = 'aspect-[16/10] w-full object-cover md:aspect-auto md:h-full'
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
        className={box}
      />
    )
  }
  if (cover?.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={cover.src} alt={cover.caption} className={box} />
  }
  return <div className={cn(box, 'min-h-full')} style={DIAGONAL_STRIPES} />
}

function CaseStudyCard({ page }: { page: PortfolioPage }) {
  return (
    <>
      <div className="md:min-h-full">
        <Cover page={page} />
      </div>
      <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7">
        <p className="label-micro text-accent-brand">{page.roleTag}</p>
        <h3 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">
          {page.title}
        </h3>
        <p className="mt-2 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
          {page.claim}
        </p>
        <p className="mt-5 border-t border-foreground/10 pt-4 font-sans text-sm leading-relaxed text-foreground/90">
          {page.outcome}
        </p>
        <ReadLink page={page} />
      </div>
    </>
  )
}

export function CaseStudyIndex() {
  return (
    <section id="work" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-24 lg:px-14">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Work
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
              <CaseStudyCard page={page} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

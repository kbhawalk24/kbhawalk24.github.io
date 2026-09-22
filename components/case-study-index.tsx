'use client'

import Link from 'next/link'
import { PAGES } from '@/lib/site-content'
import { useLens, withLens } from '@/components/lens'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Layout B's first section: the four case studies as editorial entries,
// one white card each. Image on the left with the headline stat floating on
// it, the claim and two more stats on the right. Same card language as the
// timeline's featured card (white fill, soft shadow, 14px radius).

const DIAGONAL_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, var(--stripe-a) 0, var(--stripe-a) 10px, var(--stripe-b) 10px, var(--stripe-b) 20px)',
}

export function CaseStudyIndex() {
  const { lens } = useLens()

  return (
    <section id="case-studies" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-10 md:pt-28 lg:px-14">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Case studies
            <HeadingDot />
          </h2>
          <p className="mt-3 max-w-[52ch] font-sans text-base leading-relaxed text-muted-foreground">
            Four stories, 2017 to now. Each one links to the full write-up.
          </p>
        </Reveal>

        <ol className="grid gap-6">
          {PAGES.map((page, i) => {
            const [headline, ...rest] = page.metrics
            const stats = rest.slice(0, 2)
            return (
              <Reveal
                key={page.slug}
                as="li"
                delay={Math.min(i, 3) * 0.06}
                className="overflow-hidden rounded-[14px] bg-card shadow-soft md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
              >
                <div
                  className="relative aspect-[16/10] w-full md:aspect-auto md:min-h-full"
                  style={DIAGONAL_STRIPES}
                >
                  {headline && (
                    <span className="absolute bottom-5 left-5 right-5 rounded-[8px] bg-accent-brand px-4 py-2.5 font-heading text-base font-semibold tabular-nums text-white sm:right-auto">
                      {headline.value} · {headline.label}
                    </span>
                  )}
                </div>

                <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7">
                  <p className="label-micro text-accent-brand">{page.eyebrow}</p>
                  <h3 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">
                    {page.title}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
                    {page.claim}
                  </p>

                  {stats.length > 0 && (
                    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-foreground/10 pt-4">
                      {stats.map((m) => (
                        <div key={m.label} className="flex flex-col-reverse">
                          <dt className="mt-1.5 label-micro text-muted-foreground">{m.label}</dt>
                          <dd className="font-heading text-xl font-semibold leading-tight tabular-nums text-accent-brand">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <Link
                    href={withLens(page.href, lens)}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
                  >
                    Read the case study <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

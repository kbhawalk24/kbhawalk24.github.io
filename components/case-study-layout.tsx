'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { cn } from '@/lib/utils'
import { CHAPTER_ROLE_LABEL, CHAPTER_ROLE_STYLE, PAGES, type Chapter, type PortfolioPage } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import { ContactFooter } from '@/components/contact-footer'
import { HeadingDot } from '@/components/heading-dot'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { LENS_ROLES, LensProvider, useLens } from '@/components/lens'
import { VisualSlot } from '@/components/visual-slot'
import { ChapterPager, ChapterRail } from '@/components/chapter-nav'
import { withLens } from '@/components/lens'

function ChapterSection({
  chapter,
  prev,
  next,
}: {
  chapter: Chapter
  prev?: Chapter
  next?: Chapter
}) {
  const { lens } = useLens()
  // The lens lights the chapters that speak to the reader's role and dims
  // the badge on the rest. Content is never hidden.
  const lit = !lens || LENS_ROLES[lens].includes(chapter.role)
  return (
    <Reveal as="section" className="border-t border-border py-12 md:py-16">
      {/* id and scroll-margin must sit on the SAME element, or an anchor
          lands the heading under the fixed header pill. */}
      <div id={chapter.id} className="scroll-mt-28">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="label-micro tabular-nums text-muted-foreground">{chapter.period}</p>
          <span
            className={cn(
              'inline-flex rounded-full px-2 py-0.5 label-micro font-semibold transition-opacity',
              CHAPTER_ROLE_STYLE[chapter.role],
              !lit && 'opacity-40',
            )}
          >
            {CHAPTER_ROLE_LABEL[chapter.role]}
          </span>
          {chapter.draft && <span className="label-micro text-destructive">Draft</span>}
        </div>

        <div className="min-w-0">
          <h2 className="mt-3 text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {chapter.title}
          </h2>
          <div className="mt-4 grid max-w-2xl gap-4">
            {chapter.body.map((p, i) => (
              <p key={i} className="text-pretty leading-relaxed text-foreground/90">{p}</p>
            ))}
          </div>

          {chapter.decision && (
            <aside className="mt-6 max-w-2xl rounded-[14px] border-l-2 border-track-strategy bg-card shadow-soft p-4 md:p-5">
              <p className="label-micro text-muted-foreground">The decision</p>
              <p className="mt-1 font-medium">{chapter.decision.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{chapter.decision.detail}</p>
            </aside>
          )}

          {chapter.metrics && chapter.metrics.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
              {chapter.metrics.map((m) => (
                /* dt before dd in source (the dl content model requires it);
                   flex-col-reverse keeps the value visually on top. */
                <div key={m.label} className="flex flex-col-reverse rounded-[14px] bg-card shadow-soft p-4">
                    <dt className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.label}</dt>
                    <dd className="font-heading text-xl font-semibold tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {chapter.visuals.length > 0 && (
            <div className={cn('mt-8 grid gap-4', chapter.visuals.length > 1 && 'md:grid-cols-2')}>
              {chapter.visuals.map((v) => (
                <VisualSlot key={v.caption} visual={v} />
              ))}
            </div>
          )}

          <ChapterPager prev={prev} next={next} />
        </div>
      </div>
    </Reveal>
  )
}

/** The story that follows this one, in the narrative order of PAGES. The
 *  last page has none; its readers get the "Keep reading" grid instead. */
export function nextStory(page: PortfolioPage): PortfolioPage | null {
  return PAGES[PAGES.findIndex((p) => p.slug === page.slug) + 1] ?? null
}

export function CaseStudyLayout({ page }: { page: PortfolioPage }) {
  return (
    <LensProvider>
      <CaseStudyPage page={page} />
    </LensProvider>
  )
}

/** Inside the provider so the lens can be read for outbound links. */
function CaseStudyPage({ page }: { page: PortfolioPage }) {
  const { lens } = useLens()
  const others = PAGES.filter((p) => p.slug !== page.slug)
  const next = nextStory(page)

  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <SiteHeader onHome={false} chapters={page.chapters} />

      <main id="main" className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 lg:px-14">
        <Reveal>
          <p className="label-micro text-muted-foreground">{page.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {page.title}
            <HeadingDot />
          </h1>
          <p className="mt-5 max-w-[52ch] text-pretty font-heading text-xl leading-relaxed text-foreground/90 md:text-2xl">{page.claim}</p>
          <p className="mt-4 font-sans text-sm text-muted-foreground">{page.role}</p>
        </Reveal>

        {/* Timeline strip — the shape of the whole story before you scroll */}
        <Reveal className="mt-10">
          <ol className="flex gap-3 overflow-x-auto pb-2">
            {page.chapters.map((c, i) => (
              <li key={c.id} className="min-w-[160px] flex-1">
                <a href={`#${c.id}`} className="block rounded-[14px] bg-card shadow-soft transition-transform hover:-translate-y-0.5">
                  <div className="p-3">
                    <p className="label-micro tabular-nums text-muted-foreground">
                      {c.period}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug">{c.title}</p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-8">
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {page.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse rounded-[14px] bg-card shadow-soft p-5">
                  <dt className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">{m.label}</dt>
                  <dd className="font-heading text-2xl font-semibold tabular-nums md:text-3xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {page.insight && (
          <Reveal className="mt-12">
            <blockquote className="max-w-[54ch] border-l-2 border-track-strategy pl-5 font-heading text-xl font-semibold leading-snug text-foreground md:text-2xl">
              {page.insight}
            </blockquote>
            <p className="mt-3 label-micro text-muted-foreground">The insight this page is built on</p>
          </Reveal>
        )}

        <div className="mt-12 lg:grid lg:grid-cols-[190px_1fr] lg:gap-14">
          <ChapterRail chapters={page.chapters} />

          <div id="chapters" className="min-w-0">
          {page.chapters.map((c, i) => (
            <ChapterSection
              key={c.id}
              chapter={c}
              prev={page.chapters[i - 1]}
              next={page.chapters[i + 1]}
            />
          ))}
          </div>
        </div>

        {page.reflection && (
          <Reveal as="section" className="border-t border-border py-12 md:py-16">
            <div>
              <h2 className="text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                What I&rsquo;d do differently
              </h2>
              <div className="mt-4 grid max-w-[52ch] gap-4">
                {page.reflection.map((p, i) => (
                  <p key={i} className="text-pretty font-heading text-lg leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {next && (
          <Reveal as="section" className="border-t border-border pt-10">
            <Link
              href={withLens(next.href, lens)}
              className="group block rounded-[14px] bg-card shadow-soft p-6 transition-transform hover:-translate-y-0.5 md:p-8"
            >
              <span className="label-micro text-muted-foreground">Next story</span>
              <span className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-heading text-2xl font-semibold tracking-tight group-hover:underline md:text-3xl">
                  {next.title}
                </span>
                <span aria-hidden="true" className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </span>
              <span className="mt-2 block max-w-[52ch] text-pretty font-sans text-sm leading-relaxed text-muted-foreground">
                {next.claim}
              </span>
            </Link>
          </Reveal>
        )}

        <Reveal as="section" className="border-t border-border pt-10">
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Keep reading</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={withLens(p.href, lens)} className="block h-full rounded-[14px] bg-card shadow-soft transition-transform hover:-translate-y-0.5">
                  <div className="h-full p-5">
                    <p className="label-micro text-muted-foreground">{p.eyebrow}</p>
                    <p className="mt-2 font-heading text-xl font-semibold">{p.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

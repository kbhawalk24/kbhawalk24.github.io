'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { cn } from '@/lib/utils'
import type { Block, InlineLink, PageFact, PageVisual, ShortPage, SystemContext } from '@/lib/pages/types'
import { Reveal } from '@/components/motion-primitives'
import { ContactFooter } from '@/components/contact-footer'
import { HeadingDot } from '@/components/heading-dot'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { WithSectionNav } from '@/components/section-nav'
import { VideoEmbed } from '@/components/video-embed'
import { HeroVideo } from '@/components/hero-video'
import { PrototypeEmbed } from '@/components/prototype-embed'

// The short case study page. Top to bottom: role line, title, the System
// Context Bar (what this is part of, and where in the sequence the reader
// is), the outcome stats, four short sections, the handoff to the next
// page, then credits and sources.

function ContextSteps({ context }: { context: SystemContext }) {
  return (
    <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
      {context.steps.map((step, i) => {
        const current = i === context.current
        const pill = cn(
          'inline-flex min-h-8 items-center gap-2 rounded-full px-3 py-1 label-micro',
          current
            ? 'bg-primary text-primary-foreground'
            : 'bg-card-soft text-foreground ring-1 ring-foreground/10',
        )
        const body = (
          <>
            <span className="tabular-nums">{i + 1}.</span> {step.label}
            {current && <span className="hidden normal-case tracking-normal opacity-80 sm:inline">(you are here)</span>}
          </>
        )
        return (
          <li key={step.label} className="flex items-center gap-x-2">
            {step.href && !current ? (
              <Link href={step.href} className={cn(pill, 'hover:ring-foreground/25')}>
                {body}
              </Link>
            ) : (
              <span className={pill} aria-current={current ? 'page' : undefined}>
                {body}
              </span>
            )}
            {i < context.steps.length - 1 && (
              <span aria-hidden="true" className="text-muted-foreground">
                →
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function ContextBar({ context }: { context: SystemContext }) {
  return (
    <aside aria-label="System context" className="rounded-[14px] bg-card p-5 shadow-soft md:p-6">
      <p className="font-sans text-sm leading-relaxed text-foreground">
        <span className="label-micro text-muted-foreground">System context</span>
        <span className="mx-2 text-muted-foreground" aria-hidden="true">
          ·
        </span>
        {context.system}
      </p>
      <ContextSteps context={context} />
    </aside>
  )
}

/** Text with its inline links, each phrase linked at its first occurrence
 *  and opening in a new tab (they point at public videos and pages). */
function Linked({ text, links }: { text: string; links?: InlineLink[] }) {
  if (!links?.length) return <>{text}</>
  const out: React.ReactNode[] = []
  let rest = text
  links.forEach((l, i) => {
    const at = rest.indexOf(l.text)
    if (at < 0) return
    out.push(rest.slice(0, at))
    out.push(
      <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline decoration-foreground/40 underline-offset-[3px] hover:decoration-foreground">
        {l.text}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>,
    )
    rest = rest.slice(at + l.text.length)
  })
  out.push(rest)
  return <>{out}</>
}

function BlockView({ block }: { block: Block }) {
  if (block.type === 'video') {
    return (
      <figure className="rounded-[14px] bg-card p-2 shadow-soft">
        <VideoEmbed id={block.youtube} start={block.start} title={block.title} />
        <figcaption className="px-2 pb-2 pt-3 text-pretty font-sans text-sm leading-relaxed text-muted-foreground">
          {block.caption}{' '}
          <a href={block.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
            Watch on YouTube<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>
    )
  }
  if (block.type === 'table') {
    return (
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[560px] border-collapse text-left font-sans text-sm">
          {block.caption && <caption className="mb-2 text-left label-micro text-muted-foreground">{block.caption}</caption>}
          <thead>
            <tr>
              {block.head.map((h) => (
                <th key={h} className="border-b border-foreground/15 py-2 pr-4 align-bottom label-micro font-medium text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="border-b border-border">
                {row.map((cell, j) => (
                  <td key={j} className={cn('py-3 pr-4 align-top leading-relaxed', j === 0 ? 'text-muted-foreground' : 'text-foreground/90', j === 2 && 'font-semibold tabular-nums text-foreground')}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (block.type === 'list') {
    return (
      <ul className="grid gap-3 pl-5">
        {block.items.map((item) => (
          <li key={item.lead} className="list-disc text-pretty leading-relaxed text-foreground/90">
            <span className="font-semibold text-foreground">{item.lead}</span> {item.text}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p className="text-pretty leading-relaxed text-foreground/90">
      <Linked text={block.text} links={block.links} />
    </p>
  )
}

export function ShortPageLayout({ page }: { page: ShortPage }) {
  return (
    <MotionConfig reducedMotion="user">
        <SkipLink />
        <SiteHeader onHome={false} />

        <main id="main" className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 lg:px-14">
          <WithSectionNav chapters={page.sections.map((s) => ({ id: s.id, title: s.heading }))}>
          <article className="max-w-3xl">
            <header>
              <p className="label-micro text-accent-brand">
                {page.roleTag} <span className="text-muted-foreground">· {page.period}</span>
              </p>
              <h1 className="mt-4 text-balance font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                {page.title}
              </h1>
              <p className="mt-4 text-pretty font-sans text-lg leading-[1.6] text-muted-foreground">
                {page.description}
              </p>
            </header>

            {page.hero && <HeroVideo hero={page.hero} className="mt-8" />}

            <div className="mt-8">
              <ContextBar context={page.context} />
            </div>

            {page.facts && page.facts.length > 0 && <Facts facts={page.facts} />}

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {page.stats.map((s) => (
                <li key={s.label} className="rounded-[14px] bg-card p-4 shadow-soft">
                  <p className="font-heading text-2xl font-semibold leading-tight tracking-tight tabular-nums text-accent-brand">
                    {s.value}
                  </p>
                  <p className="mt-1 label-micro text-muted-foreground">{s.label}</p>
                </li>
              ))}
            </ul>

            <Visuals visuals={visualsAfter(page, undefined)} className="mt-8" />

            {page.sections.map((section) => (
              <Reveal key={section.id} as="section" className="border-t border-border py-10 md:py-12">
                <div id={section.id} className="scroll-mt-28">
                  <h2 className="text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                    {section.heading}
                    <HeadingDot />
                  </h2>
                  <div className="mt-4 grid max-w-2xl gap-4">
                    {section.blocks.map((block, i) => (
                      <BlockView key={i} block={block} />
                    ))}
                  </div>
                  <Visuals visuals={visualsAfter(page, section.id)} className="mt-8" />
                </div>
              </Reveal>
            ))}

            <Reveal as="section" className="border-t border-border pt-10 md:pt-12">
              <aside aria-label="What this unlocked next" className="rounded-[14px] bg-card p-5 shadow-soft md:p-6">
                <p className="label-micro text-muted-foreground">What this unlocked next</p>
                <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-foreground/90">{page.next.text}</p>
                {page.next.href ? (
                  <Link
                    href={page.next.href}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
                  >
                    {page.next.label} <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <p className="mt-4 flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-sans text-base font-semibold text-foreground">
                      {page.next.label} <span aria-hidden="true">→</span>
                    </span>
                    <span className="inline-flex items-center rounded-full bg-card-soft px-3 py-1.5 label-micro text-foreground ring-1 ring-foreground/10">
                      Coming soon
                    </span>
                  </p>
                )}
              </aside>
            </Reveal>

            <footer className="mt-10 grid gap-2 border-t border-border pt-6 font-sans text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Credits.</span> {page.credits}
              </p>
              <p>
                <span className="font-semibold text-foreground">Sources.</span> {page.sources}
              </p>
            </footer>
          </article>
          </WithSectionNav>
        </main>
        <ContactFooter />
      </MotionConfig>
  )
}

function visualsAfter(page: ShortPage, after: string | undefined) {
  return (page.visuals ?? []).filter((v) => v.after === after)
}

// Diagonal hatching for a slot whose file has not landed yet.
const STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(135deg, transparent 0 10px, color-mix(in oklab, var(--foreground) 7%, transparent) 10px 11px)',
}

// Figures with captions. One visual spans the measure; two or more sit in a
// two-column grid from 768px up, with the first spanning both columns when the
// count is odd so nothing is left hanging.
function Visuals({ visuals, className }: { visuals: PageVisual[]; className?: string }) {
  if (visuals.length === 0) return null
  const odd = visuals.length % 2 === 1
  return (
    <ul className={cn('grid gap-5 md:grid-cols-2 md:gap-6', className)}>
      {visuals.map((v, i) => (
        <li key={v.id} className={cn((visuals.length === 1 || (odd && i === 0) || v.full) && 'md:col-span-2')}>
          <figure className="rounded-[14px] bg-card p-2 shadow-soft">
            {v.src && v.prototype?.interactive ? (
              <PrototypeEmbed embed={v.prototype.embed} poster={v.src} width={v.width ?? 1440} height={v.height ?? 1024} alt={v.alt} />
            ) : v.src ? (
              v.kind === 'video' ? (
                <video
                  src={v.src}
                  width={v.width}
                  height={v.height}
                  className="w-full rounded-[10px] bg-card-soft"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={v.alt}
                />
              ) : (
                // Opens full size in a new tab, for diagrams too dense to read in the column.
                <a href={v.src} target="_blank" rel="noopener noreferrer" className="block cursor-zoom-in rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.src}
                    width={v.width}
                    height={v.height}
                    alt={v.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full rounded-[10px] bg-card-soft"
                  />
                  <span className="sr-only"> (opens full size in a new tab)</span>
                </a>
              )
            ) : (
              <div
                role="img"
                aria-label={`Image to come: ${v.alt}`}
                className="flex aspect-[16/10] items-end rounded-[10px] bg-card-soft p-4"
                style={STRIPES}
              >
                <span className="rounded-full bg-card px-3 py-1 label-micro text-muted-foreground shadow-soft">
                  Image to come
                </span>
              </div>
            )}
            <figcaption className="px-2 pb-2 pt-3 text-pretty font-sans text-sm leading-relaxed text-muted-foreground">
              {v.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

// Duration, role, team and research: the facts a reader wants before the
// story, in four short cells under the context bar.
function Facts({ facts }: { facts: PageFact[] }) {
  return (
    <dl className="mt-6 grid gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="label-micro text-muted-foreground">{f.label}</dt>
          <dd className="mt-1.5 text-pretty font-sans text-base leading-relaxed text-foreground">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

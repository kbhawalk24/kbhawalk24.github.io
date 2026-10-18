'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { cn } from '@/lib/utils'
import type { Block, ShortPage, SystemContext } from '@/lib/pages/types'
import { Reveal } from '@/components/motion-primitives'
import { ContactFooter } from '@/components/contact-footer'
import { HeadingDot } from '@/components/heading-dot'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { LensProvider } from '@/components/lens'

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

function BlockView({ block }: { block: Block }) {
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
  return <p className="text-pretty leading-relaxed text-foreground/90">{block.text}</p>
}

export function ShortPageLayout({ page }: { page: ShortPage }) {
  return (
    <LensProvider>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <SiteHeader onHome={false} />

        <main id="main" className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 lg:px-14">
          <article className="mx-auto max-w-3xl">
            <header>
              <p className="label-micro text-accent-brand">
                {page.roleTag} <span className="text-muted-foreground">· {page.period}</span>
              </p>
              <h1 className="mt-4 text-balance font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                {page.title}
              </h1>
              <p className="mt-4 max-w-[62ch] text-pretty font-sans text-lg leading-[1.6] text-muted-foreground">
                {page.description}
              </p>
            </header>

            <div className="mt-8">
              <ContextBar context={page.context} />
            </div>

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
        </main>
        <ContactFooter />
      </MotionConfig>
    </LensProvider>
  )
}

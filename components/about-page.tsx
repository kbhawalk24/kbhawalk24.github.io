'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ABOUT_PARAGRAPH,
  ABOUT_SECTIONS,
  EDUCATION,
  HOW_I_MANAGE,
  HOW_I_MANAGE_INTRO,
  HOW_I_WORK_WITH_AI,
  LINKS,
  POSITIONING,
  VIDEOS,
  type Passage,
} from '@/lib/about'
import { ARCS } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'
import { ContactFooter } from '@/components/contact-footer'
import { HeadingDot } from '@/components/heading-dot'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'

// The About page (copy in lib/about.ts): About me, How I manage, How I
// work with AI, the two public videos, and the list of case study pages.
// The header's "On this page" menu carries the sections; there is no
// second nav on the page.

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

function Passages({ items }: { items: Passage[] }) {
  return (
    <div className="mt-6 grid max-w-2xl gap-6">
      {items.map((p) => (
        <p key={p.lead} className="text-pretty leading-relaxed text-foreground/90">
          <span className="font-semibold text-foreground">{p.lead}</span> {p.text}
        </p>
      ))}
    </div>
  )
}

function Section({ id, title, children, className }: { id: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <Reveal as="section" className={cn('border-t border-border py-12 md:py-16', className)}>
      <div id={id} className="scroll-mt-32">
        <h2 className="text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
          <HeadingDot />
        </h2>
        {children}
      </div>
    </Reveal>
  )
}

export function AboutPage() {
  const cards = ARCS.flatMap((a) => a.cards)
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <SiteHeader onHome={false} chapters={ABOUT_SECTIONS} />
      <main id="main" className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 lg:px-14">
        <article className="mx-auto max-w-3xl">
          <section id="about" className="scroll-mt-32">
            <h1 className="text-balance font-heading text-4xl font-extrabold tracking-tight md:text-5xl">About</h1>
            <p className="mt-6 max-w-[40ch] text-pretty font-sans text-xl leading-[1.5] text-foreground md:text-2xl">{POSITIONING}</p>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-foreground/90">{ABOUT_PARAGRAPH}</p>
            <ul className="mt-6 grid gap-1 font-sans text-sm text-muted-foreground">
              {EDUCATION.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={LINKS.resume}
                {...ext}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-cta transition-[box-shadow] hover:shadow-cta-hover"
              >
                Resume <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={LINKS.linkedin}
                {...ext}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25"
              >
                LinkedIn <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={`mailto:${LINKS.email}`} className="inline-flex min-h-11 items-center px-2 font-sans text-sm text-foreground underline-offset-4 hover:underline">
                {LINKS.email}
              </a>
            </div>
          </section>

          <Section id="how-i-manage" title="How I manage" className="mt-12">
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{HOW_I_MANAGE_INTRO}</p>
            <Passages items={HOW_I_MANAGE} />
          </Section>

          <Section id="how-i-work-with-ai" title="How I work with AI">
            <Passages items={HOW_I_WORK_WITH_AI} />
          </Section>

          <Section id="in-public" title="In public">
            <ul className="mt-6 grid gap-4">
              {VIDEOS.map((v) => (
                <li key={v.href} className="rounded-[14px] bg-card p-5 shadow-soft">
                  <p className="label-micro text-muted-foreground">
                    {v.when} · {v.at}
                  </p>
                  <a href={v.href} {...ext} className="mt-2 inline-flex items-start gap-1.5 font-heading text-lg font-semibold leading-tight tracking-tight text-foreground hover:underline">
                    {v.title}
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <p className="mt-1 font-sans text-sm text-muted-foreground">{v.who}</p>
                  <p className="mt-2 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-foreground/90">{v.note}</p>
                  {v.transcript && (
                    <a href={v.transcript} {...ext} className="mt-2 inline-flex items-center gap-1 font-sans text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                      Transcript
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="the-work" title="The work">
            <ul className="mt-6 grid gap-2">
              {cards.map((c) => (
                <li key={c.slug} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border py-3">
                  {c.href ? (
                    <Link href={c.href} className="font-sans text-base font-semibold text-foreground hover:underline">
                      {c.title}
                    </Link>
                  ) : (
                    <span className="font-sans text-base font-semibold text-foreground">{c.title}</span>
                  )}
                  <span className="font-sans text-sm text-muted-foreground">
                    {c.stats[0].value}
                    {!c.href && <span className="ml-2 label-micro">coming soon</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </article>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

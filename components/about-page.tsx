'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ABOUT_PARAGRAPH,
  ABOUT_SECTIONS,
  BEFORE_INTUIT,
  EDUCATION,
  HOW_I_MANAGE,
  HOW_I_MANAGE_INTRO,
  HOW_I_WORK_WITH_AI,
  LINKS,
  POSITIONING,
  VIDEOS,
} from '@/lib/about'
import { Reveal } from '@/components/motion-primitives'
import { ContactFooter } from '@/components/contact-footer'
import { HeadingDot } from '@/components/heading-dot'
import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { WithSectionNav } from '@/components/section-nav'
import { VideoEmbed } from '@/components/video-embed'

// The About page (copy in lib/about.ts): About me, How I manage, How I
// work with AI, and the two public videos.
// The section nav beside the content carries the sections; there is no
// second nav on the page.

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-6 grid max-w-2xl gap-6">
      {items.map((text) => (
        <p key={text.slice(0, 40)} className="text-pretty leading-relaxed text-foreground/90">
          {text}
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
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <SiteHeader onHome={false} />
      <main id="main" className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 lg:px-14">
        <WithSectionNav chapters={ABOUT_SECTIONS}>
        <article className="max-w-3xl">
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
            <Paragraphs items={HOW_I_MANAGE} />
          </Section>

          <Section id="how-i-work-with-ai" title="How I work with AI">
            <Paragraphs items={HOW_I_WORK_WITH_AI} />
          </Section>

          <Section id="in-public" title="In public">
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {VIDEOS.map((v) => (
                <li key={v.href} className="rounded-[14px] bg-card p-5 shadow-soft">
                  <VideoEmbed id={v.youtube} start={v.start} title={v.title} />
                  <p className="mt-4 label-micro text-muted-foreground">
                    {v.when} · {v.at}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold leading-tight tracking-tight text-foreground">{v.title}</h3>
                  <p className="mt-1 font-sans text-sm text-muted-foreground">{v.who}</p>
                  <p className="mt-2 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-foreground/90">{v.note}</p>
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-muted-foreground">
                    <a href={v.href} {...ext} className="inline-flex items-center gap-1 underline-offset-4 hover:text-foreground hover:underline">
                      Watch on YouTube <ArrowUpRight className="size-3" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    {v.transcript && (
                      <a href={v.transcript} {...ext} className="inline-flex items-center gap-1 underline-offset-4 hover:text-foreground hover:underline">
                        Transcript <ArrowUpRight className="size-3" aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="before-intuit" title="Before Intuit">
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-foreground/90">{BEFORE_INTUIT.intro}</p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {BEFORE_INTUIT.images.map((img) => (
                <li key={img.src}>
                  <figure className="rounded-[14px] bg-card p-2 shadow-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} width={img.width} height={img.height} alt={img.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-[10px] bg-card-soft object-cover object-top" />
                    <figcaption className="px-2 pb-2 pt-3 text-pretty font-sans text-sm leading-relaxed text-muted-foreground">{img.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <Link href={BEFORE_INTUIT.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline">
              The 605 case study <span aria-hidden="true">→</span>
            </Link>
          </Section>
        </article>
        </WithSectionNav>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

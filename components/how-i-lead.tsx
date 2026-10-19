'use client'

import Link from 'next/link'
import { HOW_I_LEAD } from '@/lib/home-content'
import { VIDEOS } from '@/lib/about'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'
import { VideoEmbed } from '@/components/video-embed'

// "How I lead" on the homepage is a pointer: the framing sentence and two
// links into the About page, where the principles live in full. Under it,
// the two public talks, playable here, with the notes and transcripts on About.

export function HowILead() {
  return (
    <section id="how-i-lead" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-10 md:pt-28 lg:px-14">
        <Reveal className="max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {HOW_I_LEAD.heading}
            <HeadingDot />
          </h2>
          <p className="mt-6 max-w-[62ch] text-pretty font-sans text-lg leading-[1.6] text-foreground">
            {HOW_I_LEAD.framing}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {HOW_I_LEAD.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
              >
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <p className="label-micro text-muted-foreground">In public</p>
          <ul className="mt-4 grid gap-6 md:grid-cols-2">
            {VIDEOS.map((v) => (
              <li key={v.youtube} className="rounded-[14px] bg-card p-5 shadow-soft">
                <VideoEmbed id={v.youtube} start={v.start} title={v.title} />
                <p className="mt-4 label-micro text-muted-foreground">
                  {v.when} · {v.at}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold leading-tight tracking-tight text-foreground">
                  {v.title}
                </h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">{v.who}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/about#in-public"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline"
          >
            What each talk covers, with transcripts <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

'use client'

import { event } from '@/lib/analytics'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'
import { IntuitChapterDiagram } from '@/components/intuit-chapter'
import { OUTLINE_BUTTON } from '@/components/hero'
import { ABOUT, INTUIT_CHAPTER } from '@/lib/home-content'

// About, after Selected work: the three paragraphs that used to open the
// site (the intro, Intuit with all nine areas named, 605), the owned and
// directed diagram, the experience rows with the actual titles and what
// each role shipped, the skills in the field's words, and three links.

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal>
          <p className="label-micro text-muted-foreground">{ABOUT.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {ABOUT.heading}
            <HeadingDot />
          </h2>
        </Reveal>

        <Reveal className="mt-8 flex flex-col gap-6">
          <p className="font-sans text-lg leading-[1.6] text-foreground md:text-xl">
            {ABOUT.intro.before}
            <span className="font-semibold text-accent-brand">{ABOUT.intro.fields}</span>
            {ABOUT.intro.after}
          </p>
          {ABOUT.history.map((h) => (
            <p key={h.org} className="font-sans text-lg leading-[1.6] text-foreground md:text-xl">
              {h.before}
              <span translate="no" className="font-semibold">{h.org}</span>
              {h.after}
              {'pills' in h &&
                h.pills?.map((pl, i, all) => (
                  <span key={pl.label}>
                    {' '}
                    <span className="font-semibold text-accent-brand">{pl.label}</span>
                    {i < all.length - 2 ? ',' : i === all.length - 2 ? ' and' : ''}
                  </span>
                ))}
              {'tail' in h && h.tail}
            </p>
          ))}
        </Reveal>

        <Reveal className="mt-14">
          <p className="label-micro text-muted-foreground">{INTUIT_CHAPTER.eyebrow}</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight md:text-3xl">{INTUIT_CHAPTER.heading}</h3>
          <p className="mt-4 font-sans text-lg leading-[1.6] text-muted-foreground">{INTUIT_CHAPTER.text}</p>
          <div className="mt-8">
            <IntuitChapterDiagram />
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <p className="label-micro text-muted-foreground">Experience</p>
          <ol className="mt-4 border-t border-border">
            {ABOUT.experience.map((row) => (
              <li
                key={row.org + row.title}
                className="grid gap-x-8 gap-y-1 border-b border-border py-5 md:grid-cols-[10rem_minmax(0,1fr)_8rem] md:items-baseline"
              >
                <p translate="no" className="font-sans text-base font-semibold text-foreground">{row.org}</p>
                <div>
                  <p className="font-sans text-base font-semibold text-foreground">{row.title}</p>
                  <p className="mt-1 font-sans text-[15px] leading-relaxed text-muted-foreground">{row.what}</p>
                </div>
                <p className="font-sans text-sm tabular-nums text-muted-foreground md:text-right">{row.years}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-14">
          <p className="label-micro text-muted-foreground">How I work</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {ABOUT.skills.map((s) => (
              <li key={s} className="inline-flex min-h-10 items-center rounded-full bg-card px-4 font-sans text-sm text-foreground shadow-soft">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-3">
          {ABOUT.links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className={OUTLINE_BUTTON}
              {...event('about-link', { link: l.key })}
            >
              {l.label} <span aria-hidden="true">{l.external ? '↗' : '→'}</span>
              {l.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

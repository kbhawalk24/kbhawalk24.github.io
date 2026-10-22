'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ROLES, TRACKS, type TimelineEntry } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// The career timeline as a plain list. Each role is a row separated by a
// hairline: the role facts on the left, every highlight on the right. A
// highlight carries a track pill (management, strategy, IC craft), one
// headline, one line of detail and at most one measured outcome, set in
// the track's colour next to its label. Colour means the kind of work; a
// figure in that colour is a measured result; everything else is neutral.

function CompanyMark({ logo, name }: { logo?: string; name: string }) {
  const [errored, setErrored] = useState(false)
  useEffect(() => {
    if (!logo) return
    let cancelled = false
    const probe = new window.Image()
    probe.onload = () => !cancelled && setErrored(false)
    probe.onerror = () => !cancelled && setErrored(true)
    probe.src = logo
    return () => {
      cancelled = true
    }
  }, [logo])
  if (!logo || errored) {
    return <p className="mt-2 font-sans text-base font-semibold text-foreground">{name}</p>
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={name} onError={() => setErrored(true)} className="mt-2 inline-block h-5 w-auto" />
  )
}

function Pill({ entry }: { entry: TimelineEntry }) {
  if (entry.track) {
    return (
      <span className={cn('inline-block rounded-full px-2.5 py-1 label-micro', trackStyles[entry.track].badgeFlat)}>
        {TRACKS[entry.track].label}
      </span>
    )
  }
  return (
    <span className="inline-block rounded-full bg-card-soft px-2.5 py-1 label-micro text-muted-foreground">
      {entry.tag ?? 'Highlight'}
    </span>
  )
}

function Highlight({ entry }: { entry: TimelineEntry }) {
  const accent = entry.track ? trackStyles[entry.track].accentText : 'text-foreground'
  const title = (
    <h3 className="mt-2.5 text-pretty font-heading text-lg font-semibold leading-snug tracking-tight">
      {entry.href ? (
        <Link href={entry.href} className="underline-offset-4 hover:underline">
          {entry.headline}
        </Link>
      ) : (
        entry.headline
      )}
    </h3>
  )
  return (
    <li className="border-t border-foreground/10 py-5 first:border-t-0 first:pt-1">
      <Pill entry={entry} />
      {title}
      <p className="mt-1.5 text-pretty font-sans text-base leading-relaxed text-muted-foreground">{entry.detail}</p>
      {entry.impact && (
        <p className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={cn('font-heading text-xl font-bold leading-tight tabular-nums', accent)}>{entry.impact.value}</span>
          <span className="label-micro text-muted-foreground">
            {entry.impact.label}
            {entry.impact.shared && <span className={cn('normal-case tracking-normal', accent)}> · shared</span>}
          </span>
        </p>
      )}
    </li>
  )
}

export function CareerTimeline({ heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  const Heading = heading
  return (
    <section id="timeline" className="relative z-10 scroll-mt-28">
      <div className={cn('mx-auto max-w-6xl px-6 md:px-10 lg:px-14', heading === 'h1' ? 'pt-8 md:pt-10' : 'pt-20 md:pt-28')}>
        <Reveal>
          <Heading
            className={cn(
              'font-heading tracking-tight',
              heading === 'h1' ? 'text-4xl font-extrabold md:text-5xl' : 'text-3xl font-semibold md:text-4xl',
            )}
          >
            Career timeline
            <HeadingDot />
          </Heading>
        </Reveal>

        <ol className="mt-10 border-t border-border">
          {ROLES.map((role) => (
            <li
              key={role.id}
              id={role.id}
              className="scroll-mt-28 border-b border-border py-12 sm:grid sm:grid-cols-[minmax(220px,300px)_1fr] sm:gap-10 md:py-14 lg:gap-14"
            >
              <div className="sm:sticky sm:top-28 sm:self-start">
                <p className="label-micro tabular-nums text-muted-foreground">
                  {role.period}
                  {role.note && (
                    <span className="ml-2 rounded-full bg-card-soft px-2 py-0.5 text-muted-foreground" title={role.note}>
                      to confirm
                    </span>
                  )}
                </p>
                <h2 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">
                  {role.title}
                </h2>
                <CompanyMark logo={role.companyLogo} name={role.company} />
                <p className="mt-3 label-micro text-muted-foreground">{role.location}</p>
                <p className="mt-4 max-w-[42ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
                  {role.summary}
                </p>
              </div>

              {role.entries.length > 0 && (
              <div className="mt-8 min-w-0 sm:mt-0">
                <p className="label-micro text-muted-foreground">Highlights</p>
                <ol className="mt-2">
                  {role.entries.map((entry) => (
                    <Highlight key={entry.headline} entry={entry} />
                  ))}
                </ol>
              </div>
              )}
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 md:mt-16">
          <p className="label-micro text-muted-foreground">Education</p>
          <div className="mt-3 grid gap-2 font-sans text-base">
            <p>
              <span className="font-semibold">MS in Information, Human-Computer Interaction</span>{' '}
              <span className="text-muted-foreground">· University of Michigan, Ann Arbor (2017)</span>
            </p>
            <p>
              <span className="font-semibold">BE in Computer Engineering</span>{' '}
              <span className="text-muted-foreground">· University of Pune (2012)</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

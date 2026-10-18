'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { EDUCATION, ROLES, TRACKS, TRACK_ORDER, type Track } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { HeadingDot } from '@/components/heading-dot'

// Links into /work are plain anchors: those pages are encrypted at build
// time and are not Next routes any more, so they need a full load.

type Filter = 'all' | Track

/** Roles that started before this year are collapsed by default. */
const COLLAPSE_BEFORE = 2024

// Falls back to the plain company name if the logo image fails to load.
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
    return <p className="mt-1 font-sans text-lg font-semibold text-accent-brand">{name}</p>
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={name} onError={() => setErrored(true)} className="mt-2 inline-block h-5 w-auto" />
  )
}

export function CareerTimeline() {
  const [filter, setFilter] = useState<Filter>('all')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const segments: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...TRACK_ORDER.map((t) => ({ value: t, label: TRACKS[t].label })),
  ]

  return (
    <section aria-labelledby="timeline-heading">
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 lg:px-14">
        <h1 id="timeline-heading" className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Timeline
          <HeadingDot />
        </h1>

        <div role="group" aria-label="Show highlights from" className="mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-card p-1 shadow-soft">
          {segments.map((s) => {
            const active = s.value === filter
            return (
              <button
                key={s.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(s.value)}
                className={cn(
                  'min-h-9 rounded-full px-4 font-sans text-sm transition-colors',
                  active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {s.label}
              </button>
            )
          })}
        </div>

        <ol className="mt-6 divide-y divide-border">
          {ROLES.map((role) => {
            const entries = role.entries.filter((e) => filter === 'all' || e.track === filter)
            if (entries.length === 0) return null
            const collapsible = role.startYear < COLLAPSE_BEFORE
            const open = !collapsible || expanded[role.id] === true
            const bodyId = `${role.id}-highlights`
            return (
              <li key={role.id} id={role.id} className="py-10 first:pt-6 md:py-14 sm:grid sm:grid-cols-[minmax(200px,280px)_1fr] sm:gap-10 lg:gap-14">
                <div>
                  <p className="label-micro tabular-nums text-muted-foreground">{role.period}</p>
                  <h2 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">{role.title}</h2>
                  <CompanyMark logo={role.companyLogo} name={role.company} />
                  <p className="mt-3 label-micro text-muted-foreground">{role.location}</p>
                  {open && (
                    <p className="mt-4 max-w-[42ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">{role.summary}</p>
                  )}
                  {role.caseStudy && open && (
                    <p className="mt-4 font-sans text-sm">
                      <a href={role.caseStudy.href} className="font-semibold text-accent-brand underline-offset-4 hover:underline">
                        {role.caseStudy.title} <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  )}
                  {collapsible && (
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={bodyId}
                      onClick={() => setExpanded((s) => ({ ...s, [role.id]: !open }))}
                      className="mt-4 inline-flex min-h-9 items-center rounded-full px-4 font-sans text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25"
                    >
                      {open ? 'Hide highlights' : 'Show highlights'}
                    </button>
                  )}
                </div>

                <div id={bodyId} hidden={!open} className="mt-8 min-w-0 sm:mt-0">
                  <ul className="grid gap-4 md:grid-cols-2">
                    {entries.map((entry) => (
                      <li key={entry.headline} className="flex flex-col rounded-[14px] bg-card p-5 shadow-soft sm:p-6">
                        <p className={cn('label-micro', trackStyles[entry.track].accentText)}>{TRACKS[entry.track].label}</p>
                        <h3 className="mt-2 text-pretty font-heading text-lg font-semibold leading-snug tracking-tight">
                          {entry.href ? (
                            <a href={entry.href} className="underline-offset-4 hover:underline">
                              {entry.headline}
                            </a>
                          ) : (
                            entry.headline
                          )}
                        </h3>
                        <p className="mt-1.5 text-pretty font-sans text-base leading-relaxed text-muted-foreground">{entry.detail}</p>
                        {entry.metrics && entry.metrics.length > 0 && (
                          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-foreground/10 pt-4">
                            {entry.metrics.map((m) => (
                              <div key={m.label} className="flex flex-col-reverse">
                                <dt className="mt-1.5 label-micro text-muted-foreground">{m.label}</dt>
                                <dd className={cn('font-heading text-xl font-semibold leading-tight tabular-nums', trackStyles[entry.track].accentText)}>
                                  {m.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-4 border-t border-border pt-12">
          <p className="label-micro text-muted-foreground">Education</p>
          <ul className="mt-3 grid gap-2 font-sans text-base">
            {EDUCATION.map((e) => (
              <li key={e.degree}>
                <span className="font-semibold">{e.degree}</span>
                <span className="text-muted-foreground">
                  , {e.school}, {e.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

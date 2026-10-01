'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { ROLES, TRACKS, type TimelineEntry, type Track } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { LENS_TRACKS, useLens, withLens } from '@/components/lens'
import { EASE_OUT, Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// Experience: roles as rows separated by a hairline, the role facts on the
// left. On the right, the role's highlights grouped under track headings,
// one row per highlight in resume style: the headline as a bold lead-in
// (linking to its chapter on the case-study page), the detail running on
// in the same paragraph, the stat on the right. The case studies have
// their own section above (components/case-study-index.tsx).
//
// Earlier layouts (a featured card plus carousel per role; badged blocks
// per highlight) are kept in previous-experiments/.

const TRACK_ORDER: Track[] = ['management', 'strategy', 'ic']

// Falls back to the plain company name if the logo image 404s (or none was
// given), rather than letting a broken-image glyph render.
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
    <img
      src={logo}
      alt={name}
      onError={() => setErrored(true)}
      className="mt-2 inline-block h-5 w-auto"
    />
  )
}

function HighlightRows({ entries }: { entries: TimelineEntry[] }) {
  const { lens } = useLens()
  const groups = TRACK_ORDER.map((track) => ({
    track,
    entries: entries.filter((e) => e.track === track),
  })).filter((g) => g.entries.length > 0)

  return (
    <div className="grid gap-8">
      {groups.map(({ track, entries: group }) => (
        <div key={track}>
          <h4 className={cn('label-micro', trackStyles[track].accentText)}>{TRACKS[track].label}</h4>
          <ul className="mt-2 divide-y divide-border border-t border-border">
            {group.map((entry) => {
              const stat = entry.metrics?.[0]
              return (
                <li
                  key={entry.headline}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <p className="max-w-[64ch] text-pretty font-sans text-[15px] leading-relaxed text-muted-foreground">
                    <span className="font-heading text-base font-semibold text-foreground">
                      {entry.href ? (
                        <Link
                          href={withLens(entry.href, lens)}
                          className="transition-colors hover:text-accent-brand hover:underline"
                        >
                          {entry.headline}
                        </Link>
                      ) : (
                        entry.headline
                      )}
                      .
                    </span>{' '}
                    {entry.detail}
                  </p>
                  {stat && (
                    <p className="flex shrink-0 items-baseline gap-2 sm:flex-col sm:items-end sm:gap-0.5 sm:text-right">
                      <span
                        className={cn(
                          'font-heading text-base font-semibold leading-tight tabular-nums',
                          trackStyles[track].accentText,
                        )}
                      >
                        {stat.value}
                      </span>
                      <span className="label-micro text-muted-foreground">{stat.label}</span>
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function CareerTimeline() {
  const { lens } = useLens()
  const [activeTrack, setActiveTrack] = useState<Track | null>(null)

  return (
    <section id="experience" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal className="mb-8">
          <h2 className="mb-6 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Experience
            <HeadingDot />
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <div role="group" aria-label="Filter experience by type of work" className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTrack(null)}
                aria-pressed={activeTrack === null}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-heading text-sm font-semibold ring-1 transition-colors duration-200',
                  activeTrack === null
                    ? 'bg-track-management text-track-management-foreground ring-track-management'
                    : 'bg-card text-foreground ring-foreground/10 hover:ring-foreground/30',
                )}
              >
                All work
              </button>
              {TRACK_ORDER.map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => setActiveTrack(activeTrack === track ? null : track)}
                  aria-pressed={activeTrack === track}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-heading text-sm font-semibold ring-1 transition-colors duration-200',
                    activeTrack === track
                      ? trackStyles[track].chipActive
                      : 'bg-card text-foreground ring-foreground/10 hover:ring-foreground/30',
                  )}
                >
                  {TRACKS[track].label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {activeTrack && (
              <motion.p
                initial={{ opacity: 0, gridTemplateRows: '0fr' }}
                animate={{ opacity: 1, gridTemplateRows: '1fr' }}
                exit={{ opacity: 0, gridTemplateRows: '0fr' }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="grid font-sans text-sm text-muted-foreground"
              >
                <span className="min-h-0 overflow-hidden">
                  <span className="block pt-3">{TRACKS[activeTrack].description}</span>
                </span>
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>

        <ol className="divide-y divide-border">
          {ROLES.map((role) => {
            const filtered = activeTrack
              ? role.entries.filter((entry) => entry.track === activeTrack)
              : role.entries
            // The lens, if a URL carries one, puts its tracks' entries first;
            // nothing is removed.
            const promoted = lens ? filtered.find((e) => LENS_TRACKS[lens].includes(e.track)) : undefined
            const visibleEntries = promoted
              ? [promoted, ...filtered.filter((e) => e !== promoted)]
              : filtered
            const isDimmed = activeTrack !== null && visibleEntries.length === 0

            return (
              <motion.li
                key={role.id}
                id={role.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className={cn(
                  'py-12 transition-opacity duration-300 first:pt-0 sm:grid sm:grid-cols-[minmax(220px,300px)_1fr] sm:gap-10 md:py-16 lg:gap-14',
                  isDimmed && 'opacity-40',
                )}
              >
                <div>
                  <p className="label-micro tabular-nums text-muted-foreground">{role.period}</p>
                  <h3 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">
                    {role.title}
                  </h3>
                  <CompanyMark logo={role.companyLogo} name={role.company} />
                  <p className="mt-3 label-micro text-muted-foreground">{role.location}</p>
                  <p className="mt-4 max-w-[42ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
                    {role.summary}
                  </p>
                </div>

                <div className="mt-8 min-w-0 sm:mt-0">
                  {isDimmed ? (
                    <p className="font-sans text-sm text-muted-foreground">
                      No {TRACKS[activeTrack!].label.toLowerCase()} work in this role.
                    </p>
                  ) : (
                    visibleEntries.length > 0 && <HighlightRows entries={visibleEntries} />
                  )}
                </div>
              </motion.li>
            )
          })}
        </ol>

        <Reveal className="mt-4 border-t border-border pt-12 md:pt-16">
          <p className="label-micro text-muted-foreground">Education</p>
          <div className="mt-3 grid gap-2 font-sans text-base">
            <p>
              <span className="font-semibold">MS in Information, Human-Computer Interaction</span>{' '}
              <span className="text-muted-foreground">- University of Michigan, Ann Arbor (2017)</span>
            </p>
            <p>
              <span className="font-semibold">BE in Computer Engineering</span>{' '}
              <span className="text-muted-foreground">- University of Pune (2012)</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

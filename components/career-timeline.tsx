'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ROLES,
  TRACKS,
  type TimelineEntry,
  type Track,
} from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { resolveChapterHref } from '@/lib/site-content'
import { LENS_TRACKS, useLens } from '@/components/lens'
import { EASE_OUT, Reveal } from '@/components/motion-primitives'
import { InlineCasePreview } from '@/components/case-preview'
import { HeadingDot } from '@/components/heading-dot'

// The timeline is the index. Each role is one white card on a paper canvas
// (matched to the Claude Design reference, frame 13a): role facts on the
// left; on the right, the featured case study (image, metric pill, grey
// content panel) with the remaining highlights in a small carousel under
// it. Only the featured card opens an inline preview; every featured card
// links out to the full chapter (see lib/site-content.ts).

const TRACK_ORDER: Track[] = ['management', 'strategy', 'ic']

const DIAGONAL_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, var(--stripe-a) 0, var(--stripe-a) 10px, var(--stripe-b) 10px, var(--stripe-b) 20px)',
}

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

function TrackBadge({ track }: { track: Track }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 label-micro',
        trackStyles[track].badgeFlat,
      )}
    >
      {TRACKS[track].label}
    </span>
  )
}

/** Featured card: image with the metric pill floating on it, then a grey
 *  content panel. Flat (no bezel), 14px radius, matching the reference. */
function FeaturedEntryCard({
  entry,
  isExpanded,
  onToggle,
}: {
  entry: TimelineEntry
  isExpanded: boolean
  onToggle?: () => void
}) {
  // The pill carries the headline stat only; the carousel shows the rest.
  const headlineStat = entry.metrics?.[0]
  const metricText = headlineStat ? `${headlineStat.value} · ${headlineStat.label}` : null

  return (
    <motion.div
      layout
      className={cn(
        'relative overflow-hidden rounded-[14px] text-left transition-shadow',
        isExpanded && 'shadow-card-raised',
      )}
    >
      <div className="relative aspect-[16/10] w-full" style={DIAGONAL_STRIPES}>
        <span className="absolute right-4 top-4 rounded-[6px] bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground">
          laptop screen 16:10
        </span>
        {metricText && (
          <span
            className={cn(
              'absolute bottom-5 left-5 right-5 rounded-[8px] px-4 py-2.5 font-heading text-base font-semibold tabular-nums text-white sm:right-auto',
              trackStyles[entry.track].dot,
            )}
          >
            {metricText}
          </span>
        )}
      </div>

      <div className="bg-panel px-6 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7">
        <TrackBadge track={entry.track} />
        {/* The heading owns the toggle (APG accordion); its ::after
            stretches over the whole card so the tile stays clickable. */}
        <h4 className="mt-4 text-pretty font-heading text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          {entry.href ? (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isExpanded}
              className="text-left after:absolute after:inset-0 after:content-['']"
            >
              {entry.headline}
            </button>
          ) : (
            entry.headline
          )}
        </h4>
        <p className="mt-2 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
          {entry.detail}
        </p>

        {entry.href && (
          <div className="relative z-10 mt-5 border-t border-foreground/10 pt-4">
            {/* Opens the real case-study page in a new tab — distinct from
                the toggle above, which just peeks at it inline. */}
            <Link
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                '-my-2 inline-flex min-h-11 items-center gap-2 py-2 font-sans text-base font-semibold transition-colors hover:underline',
                trackStyles[entry.track].accentText,
              )}
            >
              Read the case study <span aria-hidden="true">→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/** A highlight in the carousel: flat, lighter grey, static. Copy takes the
 *  full width; the stats sit in their own strip at the foot of the card, one
 *  value + label per stat, so a two-stat entry reads as two stats and never
 *  squeezes the text. */
function CarouselEntryCard({ entry }: { entry: TimelineEntry }) {
  const stats = entry.metrics ?? []
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      className="rounded-[14px] bg-panel-soft p-6 text-left sm:p-7"
    >
      <TrackBadge track={entry.track} />
      <h4 className="mt-3 text-pretty font-heading text-xl font-semibold leading-snug tracking-tight">
        {entry.headline}
      </h4>
      <p className="mt-2 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
        {entry.detail}
      </p>

      {stats.length > 0 && (
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-foreground/10 pt-4">
          {stats.map((m) => (
            <div key={m.label} className="flex flex-col-reverse">
              <dt className="mt-1.5 label-micro text-muted-foreground">{m.label}</dt>
              <dd
                className={cn(
                  'font-heading text-xl font-semibold leading-tight tabular-nums',
                  trackStyles[entry.track].accentText,
                )}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </motion.div>
  )
}

function EntryCarousel({ entries }: { entries: TimelineEntry[] }) {
  const [index, setIndex] = useState(0)
  const safeIndex = Math.min(index, entries.length - 1)
  const entry = entries[safeIndex]
  const atStart = safeIndex === 0
  const atEnd = safeIndex === entries.length - 1

  const navButton =
    'flex size-11 items-center justify-center rounded-full bg-panel text-foreground transition-colors hover:bg-stripe disabled:cursor-default disabled:opacity-40 disabled:hover:bg-panel'

  return (
    <div className="mt-5">
      {entries.length > 1 && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {/* Each dot keeps a 44px hit box around a small visual; that row
              doesn't fit next to the arrows on a narrow phone, so the dots
              are sm+ only and the counter carries the position on mobile. */}
          <div aria-label="Featured highlights" className="hidden items-center sm:flex">
            {entries.map((e, i) => (
              <button
                key={e.headline}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show highlight ${i + 1} of ${entries.length}`}
                aria-current={i === safeIndex}
                className="group flex size-11 items-center justify-center rounded-full first:-ml-4"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-2 rounded-full transition-[width,background-color] duration-200',
                    i === safeIndex
                      ? 'w-7 bg-accent-brand'
                      : 'w-2 bg-foreground/15 group-hover:bg-foreground/35',
                  )}
                />
              </button>
            ))}
          </div>
          <p className="label-micro text-muted-foreground">
            Featured highlights &middot;{' '}
            <span className="tabular-nums">
              {safeIndex + 1} / {entries.length}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex(safeIndex - 1)}
              disabled={atStart}
              aria-label="Previous highlight"
              className={navButton}
            >
              <ChevronLeft aria-hidden="true" strokeWidth={2} className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setIndex(safeIndex + 1)}
              disabled={atEnd}
              aria-label="Next highlight"
              className={navButton}
            >
              <ChevronRight aria-hidden="true" strokeWidth={2} className="size-4" />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <CarouselEntryCard key={entry.headline} entry={entry} />
      </AnimatePresence>
    </div>
  )
}

export function CareerTimeline() {
  const { lens } = useLens()
  const [activeTrack, setActiveTrack] = useState<Track | null>(null)
  const [expandedHeadline, setExpandedHeadline] = useState<string | null>(null)

  const setActiveTrackAndCollapse = (next: Track | null) => {
    setActiveTrack(next)
    setExpandedHeadline(null)
  }

  const toggleEntry = (headline: string) =>
    setExpandedHeadline((current) => (current === headline ? null : headline))

  return (
    <section
      id="timeline"
      className="scroll-mt-28"
      style={{
        // The paper canvas fades in over the top padding rather than
        // starting on a hard line under the hero's wash.
        background: 'linear-gradient(to bottom, var(--background) 0, var(--canvas) 22rem)',
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal className="mb-8">
          <h2 className="mb-6 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Career timeline
            <HeadingDot />
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <div role="group" aria-label="Filter timeline by type of work" className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTrackAndCollapse(null)}
                aria-pressed={activeTrack === null}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-heading text-sm font-semibold ring-1 transition-colors duration-200',
                  activeTrack === null
                    ? 'bg-track-management text-track-management-foreground ring-track-management'
                    : 'bg-background text-foreground ring-foreground/10 hover:ring-foreground/30',
                )}
              >
                All work
              </button>
              {TRACK_ORDER.map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => setActiveTrackAndCollapse(activeTrack === track ? null : track)}
                  aria-pressed={activeTrack === track}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-heading text-sm font-semibold ring-1 transition-colors duration-200',
                    activeTrack === track
                      ? trackStyles[track].chipActive
                      : 'bg-background text-foreground ring-foreground/10 hover:ring-foreground/30',
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

        <ol className="grid gap-6">
          {ROLES.map((role) => {
            const filtered = activeTrack
              ? role.entries.filter((entry) => entry.track === activeTrack)
              : role.entries
            // The lens promotes the first entry on its tracks to featured;
            // nothing is removed, the rest keep their order in the carousel.
            const promoted = lens ? filtered.find((e) => LENS_TRACKS[lens].includes(e.track)) : undefined
            const visibleEntries = promoted
              ? [promoted, ...filtered.filter((e) => e !== promoted)]
              : filtered
            const isDimmed = activeTrack !== null && visibleEntries.length === 0
            const [featured, ...rest] = visibleEntries
            const featuredIsExpanded = featured ? expandedHeadline === featured.headline : false
            const featuredResolved = featured?.href ? resolveChapterHref(featured.href) : null

            return (
              <motion.li
                key={role.id}
                id={role.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className={cn(
                  'rounded-[20px] border border-border bg-background p-6 transition-opacity duration-300 sm:grid sm:grid-cols-[minmax(220px,300px)_1fr] sm:gap-10 md:p-10 lg:p-12',
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
                  ) : featured ? (
                    <>
                      <p className="label-micro text-muted-foreground">Featured case study</p>
                      <div className="mt-3">
                        <FeaturedEntryCard
                          entry={featured}
                          isExpanded={featuredIsExpanded}
                          onToggle={() => toggleEntry(featured.headline)}
                        />
                      </div>
                      <AnimatePresence>
                        {featuredIsExpanded && featuredResolved && (
                          <InlineCasePreview
                            track={featured.track}
                            page={featuredResolved.page}
                            chapter={featuredResolved.chapter}
                            metricFallback={featured.metrics?.[0]}
                            onClose={() => toggleEntry(featured.headline)}
                          />
                        )}
                      </AnimatePresence>

                      {rest.length > 0 && <EntryCarousel entries={rest} />}
                    </>
                  ) : null}
                </div>
              </motion.li>
            )
          })}
        </ol>

        <Reveal className="mt-10 rounded-[20px] border border-border bg-background p-6 md:p-10">
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

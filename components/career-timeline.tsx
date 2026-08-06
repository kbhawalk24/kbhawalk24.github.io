'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'
import {
  ROLES,
  TRACKS,
  type TimelineEntry,
  type TimelineRole,
  type Track,
} from '@/lib/timeline-data'
import { CASE_STUDIES } from '@/lib/case-studies'
import { Reveal } from '@/components/motion-primitives'
import {
  CaseStudyPanel,
  type SelectedCase,
} from '@/components/case-study-panel'

const trackStyles: Record<
  Track,
  {
    dot: string
    chipActive: string
    selectedBorder: string
    laneBorder: string
    laneText: string
  }
> = {
  management: {
    dot: 'bg-track-management',
    chipActive:
      'bg-track-management text-track-management-foreground border-track-management',
    selectedBorder: 'border-track-management',
    laneBorder: 'border-track-management',
    laneText: 'text-track-management',
  },
  strategy: {
    dot: 'bg-track-strategy',
    chipActive:
      'bg-track-strategy text-track-strategy-foreground border-track-strategy',
    selectedBorder: 'border-track-strategy',
    laneBorder: 'border-track-strategy',
    laneText: 'text-track-strategy',
  },
  ic: {
    dot: 'bg-track-ic',
    chipActive: 'bg-track-ic text-track-ic-foreground border-track-ic',
    selectedBorder: 'border-track-ic',
    laneBorder: 'border-track-ic',
    laneText: 'text-track-ic',
  },
}

const TRACK_ORDER: Track[] = ['management', 'strategy', 'ic']

interface EntryCardProps {
  entry: TimelineEntry
  role: TimelineRole
  compact: boolean
  showBadge: boolean
  isSelected: boolean
  onSelect: () => void
}

function EntryCard({
  entry,
  role,
  compact,
  showBadge,
  isSelected,
  onSelect,
}: EntryCardProps) {
  const hasCaseStudy = Boolean(CASE_STUDIES[entry.headline])

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      whileHover={compact ? undefined : { y: -3 }}
      className="group"
    >
      <button
        type="button"
        disabled={!hasCaseStudy}
        onClick={onSelect}
        aria-pressed={isSelected}
        className={cn(
          'relative flex h-full w-full flex-col items-start rounded-lg border bg-card text-left transition-all',
          compact ? 'p-3' : 'p-4',
          isSelected
            ? cn('border-l-2', trackStyles[entry.track].selectedBorder)
            : 'border-border',
          hasCaseStudy
            ? 'cursor-pointer hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
            : 'cursor-default',
        )}
      >
        {showBadge && (
          <span
            aria-hidden="true"
            className={cn(
              'mb-2 size-1.5 rounded-full',
              trackStyles[entry.track].dot,
            )}
          />
        )}
        <h4
          className={cn(
            'text-pretty font-medium leading-snug',
            compact ? 'text-sm' : 'pr-5',
          )}
        >
          {entry.headline}
        </h4>
        {entry.metric && !compact && (
          <span
            className={cn(
              'mt-3 font-serif text-xl leading-none tracking-tight',
              trackStyles[entry.track].laneText,
            )}
          >
            {entry.metric}
          </span>
        )}
        {hasCaseStudy && !compact && (
          <span
            aria-hidden="true"
            className="absolute right-4 top-4 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-foreground"
          >
            →
          </span>
        )}
        <span className="sr-only">View case study</span>
      </button>
    </motion.li>
  )
}

export function CareerTimeline() {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null)
  const [selectedCase, setSelectedCase] = useState<SelectedCase | null>(null)
  const timelineRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  })

  const isOpen = selectedCase !== null

  const selectEntry = (entry: TimelineEntry, role: TimelineRole) => {
    setSelectedCase((current) =>
      current?.entry.headline === entry.headline ? null : { entry, role },
    )
  }

  return (
    <section
      id="timeline"
      className={cn(
        'mx-auto px-6 py-20 transition-[max-width] duration-500 md:px-10 md:py-28 lg:px-14',
        isOpen ? 'max-w-[1440px]' : 'max-w-6xl',
      )}
    >
      <Reveal>
        <h2 className="mb-4 font-serif text-3xl tracking-tight md:text-4xl">
          Career timeline
        </h2>
        <p className="mb-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Three parallel tracks of work. Select any card for the full case
          study.
        </p>
      </Reveal>

      {/* Legend / filter */}
      <div
        role="group"
        aria-label="Filter timeline by type of work"
        className="sticky top-[68px] z-10 -mx-6 mb-12 border-y border-border bg-background/90 px-6 py-3 backdrop-blur-md md:-mx-10 md:px-10 lg:-mx-14 lg:px-14"
      >
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTrack(null)}
            aria-pressed={activeTrack === null}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95',
              activeTrack === null
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:text-foreground',
            )}
          >
            All work
          </button>
          {TRACK_ORDER.map((track) => (
            <button
              key={track}
              type="button"
              onClick={() =>
                setActiveTrack((current) => (current === track ? null : track))
              }
              aria-pressed={activeTrack === track}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95',
                activeTrack === track
                  ? trackStyles[track].chipActive
                  : 'border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:text-foreground',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'size-2 rounded-full',
                  activeTrack === track ? 'bg-current' : trackStyles[track].dot,
                )}
              />
              {TRACKS[track].label}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {activeTrack && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden font-sans text-xs text-muted-foreground"
            >
              <span className="block pt-2">
                {TRACKS[activeTrack].description}
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Timeline + inline case study, side by side */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Timeline column — compresses to a 20% rail when a case study is open */}
        <div
          className={cn(
            'min-w-0 transition-all duration-500',
            isOpen ? 'hidden md:block md:w-1/5' : 'w-full',
          )}
        >
          <ol
            ref={timelineRef}
            className={cn(
              'relative transition-all duration-500',
              isOpen ? 'pl-6' : 'pl-8 md:pl-12',
            )}
          >
            {/* Static track + scroll-drawn spine */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px bg-border"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: lineProgress }}
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-foreground"
            />

            {ROLES.map((role, roleIndex) => {
              const visibleEntries = activeTrack
                ? role.entries.filter((entry) => entry.track === activeTrack)
                : role.entries
              const roleTracks = TRACK_ORDER.filter((track) =>
                role.entries.some((entry) => entry.track === track),
              )
              const isDimmed =
                activeTrack !== null && visibleEntries.length === 0

              return (
                <motion.li
                  key={role.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={cn(
                    'relative transition-opacity duration-300 last:pb-0',
                    isOpen ? 'pb-10' : 'pb-16',
                    isDimmed && 'opacity-40',
                  )}
                >
                  {/* Node */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 18,
                      delay: 0.15,
                    }}
                    className={cn(
                      'absolute top-1 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background bg-foreground',
                      isOpen ? '-left-6' : '-left-8 md:-left-12',
                    )}
                  >
                    {roleIndex === 0 && (
                      <span className="absolute size-4 animate-ping rounded-full bg-foreground/40" />
                    )}
                  </motion.span>

                  {/* Year marker */}
                  <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {role.period}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3
                      className={cn(
                        'tracking-tight',
                        isOpen
                          ? 'text-sm font-semibold'
                          : 'font-serif text-2xl',
                      )}
                    >
                      {role.title}
                    </h3>
                    {!isOpen && (
                      <>
                        <span className="text-muted-foreground">·</span>
                        <p className="text-lg text-muted-foreground">
                          {role.company}
                        </p>
                      </>
                    )}
                  </div>
                  {isOpen ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {role.company}
                    </p>
                  ) : (
                    <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                      {role.summary}
                    </p>
                  )}

                  {isDimmed ? (
                    <p className="mt-5 font-sans text-xs text-muted-foreground">
                      No {TRACKS[activeTrack!].label.toLowerCase()} work in
                      this role.
                    </p>
                  ) : isOpen || activeTrack ? (
                    /* Single stacked column: compact rail mode or filtered view */
                    <motion.ul
                      layout
                      className={cn(
                        'grid max-w-2xl',
                        isOpen ? 'mt-4 gap-2' : 'mt-6 gap-3',
                      )}
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        {visibleEntries.map((entry) => (
                          <EntryCard
                            key={entry.headline}
                            entry={entry}
                            role={role}
                            compact={isOpen}
                            showBadge={isOpen}
                            isSelected={
                              selectedCase?.entry.headline === entry.headline
                            }
                            onSelect={() => selectEntry(entry, role)}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.ul>
                  ) : (
                    /* Parallel track lanes — only tracks with work in this role */
                    <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-4">
                      {roleTracks.map((track) => {
                        const laneEntries = role.entries.filter(
                          (entry) => entry.track === track,
                        )
                        return (
                          <div key={track} className="min-w-0 flex-1">
                            <div
                              className={cn(
                                'flex items-center gap-2 border-t-2 pt-2.5',
                                trackStyles[track].laneBorder,
                              )}
                            >
                              <span
                                className={cn(
                                  'font-sans text-[11px] font-semibold uppercase tracking-widest',
                                  trackStyles[track].laneText,
                                )}
                              >
                                {TRACKS[track].label}
                              </span>
                            </div>
                            <ul className="mt-3 grid content-start gap-3">
                              {laneEntries.map((entry) => (
                                <EntryCard
                                  key={entry.headline}
                                  entry={entry}
                                  role={role}
                                  compact={false}
                                  showBadge={false}
                                  isSelected={
                                    selectedCase?.entry.headline ===
                                    entry.headline
                                  }
                                  onSelect={() => selectEntry(entry, role)}
                                />
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </motion.li>
              )
            })}
          </ol>
        </div>

        {/* Case study column — 80% of the horizontal space */}
        <AnimatePresence mode="wait">
          {selectedCase && (
            <CaseStudyPanel
              selected={selectedCase}
              onClose={() => setSelectedCase(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Education note */}
      <Reveal className="mt-16 border-t border-border pt-8">
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Education
        </p>
        <div className="mt-3 grid gap-2 text-sm">
          <p>
            <span className="font-medium">
              MS in Information, Human-Computer Interaction
            </span>{' '}
            <span className="text-muted-foreground">
              — University of Michigan, Ann Arbor (2017)
            </span>
          </p>
          <p>
            <span className="font-medium">BE in Computer Engineering</span>{' '}
            <span className="text-muted-foreground">
              — University of Pune (2012)
            </span>
          </p>
        </div>
      </Reveal>
    </section>
  )
}

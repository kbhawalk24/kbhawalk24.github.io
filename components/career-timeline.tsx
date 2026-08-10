'use client'

import { useRef, useState, type RefObject } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'
import {
  ROLES,
  TRACKS,
  type TimelineEntry,
  type TimelineRole,
  type Track,
} from '@/lib/timeline-data'
import { CASE_STUDIES } from '@/lib/case-studies'
import { trackStyles } from '@/lib/track-styles'
import { Reveal } from '@/components/motion-primitives'
import { TrackBadge } from '@/components/track-badge'
import { MockPlaceholder, type MockVariant } from '@/components/mock-placeholder'
import {
  CaseStudyPanel,
  type SelectedCase,
} from '@/components/case-study-panel'

// Temporarily showing only a curated handful of case studies. The rest of
// CASE_STUDIES stays intact in lib/case-studies.ts — this is just a gate on
// which cards render as clickable, so more can be turned back on later by
// adding headlines here. Each also gets a placeholder mock variant until
// real screenshots/diagrams replace them.
const FEATURED_CASE_STUDIES: Record<string, MockVariant> = {
  'Scaled the platform into company-wide infrastructure': 'dashboard',
  'UX strategy for enterprise data maturity': 'dashboard',
  'Architectural strategy for agentic data search': 'flow',
  'Founded the internal data catalog from scratch': 'list',
  'Shipped Intuit’s first agentic data tooling': 'flow',
}

const TRACK_ORDER: Track[] = ['management', 'strategy', 'ic']

type ViewMode = 'timeline' | 'resume'

interface ResumeViewProps {
  activeTrack: Track | null
  selectedCase: SelectedCase | null
  onSelect: (entry: TimelineEntry, role: TimelineRole) => void
}

function ResumeView({ activeTrack, selectedCase, onSelect }: ResumeViewProps) {
  return (
    <div className="flex flex-col divide-y divide-border">
      {ROLES.map((role) => {
        const visibleEntries = activeTrack
          ? role.entries.filter((entry) => entry.track === activeTrack)
          : role.entries

        return (
          <div key={role.id} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-lg tracking-tight">
                {role.title}{' '}
                <span className="text-muted-foreground">· {role.company}</span>
              </h3>
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {role.period}
              </p>
            </div>

            {visibleEntries.length === 0 ? (
              <p className="mt-3 font-sans text-xs text-muted-foreground">
                No {TRACKS[activeTrack!].label.toLowerCase()} work in this
                role.
              </p>
            ) : (
              <ul className="mt-3 grid max-w-2xl gap-1.5">
                {visibleEntries.map((entry) => {
                  const hasCaseStudy =
                    Boolean(FEATURED_CASE_STUDIES[entry.headline]) &&
                    Boolean(CASE_STUDIES[entry.headline])
                  const isSelected =
                    selectedCase?.entry.headline === entry.headline

                  return (
                    <li key={entry.headline} className="flex items-baseline gap-2.5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'mt-[0.4em] size-1.5 shrink-0 self-start rounded-full',
                          trackStyles[entry.track].dot,
                        )}
                      />
                      {hasCaseStudy ? (
                        <button
                          type="button"
                          onClick={() => onSelect(entry, role)}
                          aria-pressed={isSelected}
                          className={cn(
                            'text-pretty text-left text-sm leading-snug underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                            isSelected
                              ? 'text-foreground underline'
                              : 'text-foreground hover:text-foreground',
                          )}
                        >
                          {entry.headline}
                          {entry.metric && (
                            <span className="text-muted-foreground">
                              {' '}
                              — {entry.metric}
                            </span>
                          )}
                        </button>
                      ) : (
                        <p className="text-pretty text-sm leading-snug text-foreground/70">
                          {entry.headline}
                          {entry.metric && (
                            <span className="text-muted-foreground">
                              {' '}
                              — {entry.metric}
                            </span>
                          )}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface TimelineListProps {
  timelineRef: RefObject<HTMLOListElement | null>
  lineProgress: MotionValue<number>
  isOpen: boolean
  activeTrack: Track | null
  selectedCase: SelectedCase | null
  onSelect: (entry: TimelineEntry, role: TimelineRole) => void
}

function TimelineList({
  timelineRef,
  lineProgress,
  isOpen,
  activeTrack,
  selectedCase,
  onSelect,
}: TimelineListProps) {
  return (
    <ol
      ref={timelineRef}
      className={cn(
        'relative transition-all duration-500',
        isOpen ? 'pl-6' : 'pl-8 sm:pl-0',
      )}
    >
      {/* Static track + scroll-drawn spine. Sits at the ol's left edge in
          compact/mobile layouts, but shifts into the gutter between the
          title and content columns once the two-column layout kicks in. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 top-0 w-px bg-border',
          isOpen ? 'left-0' : 'left-0 sm:left-[176px]',
        )}
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: lineProgress }}
        className={cn(
          'absolute bottom-0 top-0 w-px origin-top bg-foreground',
          isOpen ? 'left-0' : 'left-0 sm:left-[176px]',
        )}
      />

      {ROLES.map((role, roleIndex) => {
        const visibleEntries = activeTrack
          ? role.entries.filter((entry) => entry.track === activeTrack)
          : role.entries
        const isDimmed = activeTrack !== null && visibleEntries.length === 0

        // Only the current role (Product Design Manager) spans all three
        // tracks — split that one into IC craft vs. the two management-level
        // tracks combined. Every other role stays a single flat grid; a
        // repeated per-track header on every role added little.
        const icEntries = role.entries.filter((entry) => entry.track === 'ic')
        const stratMgmtEntries = role.entries.filter(
          (entry) => entry.track === 'strategy' || entry.track === 'management',
        )

        const renderCardGrid = (entries: TimelineEntry[]) => (
          // auto-fill (not auto-fit) so a short row of cards keeps its
          // natural ~240-320px width instead of stretching to fill the row —
          // the empty tracks stay reserved as blank canvas.
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {entries.map((entry) => (
              <EntryCard
                key={entry.headline}
                entry={entry}
                role={role}
                compact={false}
                showBadge={false}
                isSelected={selectedCase?.entry.headline === entry.headline}
                onSelect={() => onSelect(entry, role)}
              />
            ))}
          </ul>
        )

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
              !isOpen && 'sm:grid sm:grid-cols-[160px_1fr] sm:gap-8',
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
                isOpen ? '-left-6' : '-left-8 sm:left-[176px]',
              )}
            >
              {roleIndex === 0 && (
                <span className="absolute size-4 animate-ping rounded-full bg-foreground/40" />
              )}
            </motion.span>

            {/* LEFT: role identity — period, title, company */}
            <div className={cn(!isOpen && 'sm:text-right')}>
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {role.period}
              </p>
              <h3
                className={cn(
                  'mt-2 tracking-tight',
                  isOpen ? 'text-sm font-semibold' : 'font-serif text-2xl',
                )}
              >
                {role.title}
              </h3>
              <p
                className={cn(
                  'text-muted-foreground',
                  isOpen ? 'mt-0.5 text-xs' : 'mt-1 text-lg',
                )}
              >
                {role.company}
              </p>
            </div>

            {/* RIGHT: overview of the work, then the projects themselves */}
            <div className={cn(!isOpen && 'mt-6 sm:mt-0')}>
              {!isOpen && (
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  {role.summary}
                </p>
              )}

              {isDimmed ? (
                <p className="mt-5 font-sans text-xs text-muted-foreground">
                  No {TRACKS[activeTrack!].label.toLowerCase()} work in this
                  role.
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
                        onSelect={() => onSelect(entry, role)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              ) : role.id === 'intuit-manager' ? (
                <div className="mt-6 flex flex-col gap-8">
                  <div>
                    <TrackBadge track="ic" />
                    <div className="mt-4">{renderCardGrid(icEntries)}</div>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      <span className="flex -space-x-0.5" aria-hidden="true">
                        <span
                          className={cn(
                            'size-1.5 rounded-full ring-2 ring-card',
                            trackStyles.management.dot,
                          )}
                        />
                        <span
                          className={cn(
                            'size-1.5 rounded-full ring-2 ring-card',
                            trackStyles.strategy.dot,
                          )}
                        />
                      </span>
                      Design Strategy &amp; Management
                    </span>
                    <div className="mt-4">
                      {renderCardGrid(stratMgmtEntries)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6">{renderCardGrid(role.entries)}</div>
              )}
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}

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
  const mockVariant = FEATURED_CASE_STUDIES[entry.headline]
  const hasCaseStudy = Boolean(mockVariant) && Boolean(CASE_STUDIES[entry.headline])
  const showMock = hasCaseStudy && !compact

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
          'relative flex h-full w-full flex-col items-start rounded-lg bg-card text-left shadow-sm transition-all',
          compact ? 'p-3' : 'p-4',
          isSelected &&
            cn('border-l-2', trackStyles[entry.track].accentBorder),
          hasCaseStudy
            ? 'cursor-pointer hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
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
        {showMock && (
          <MockPlaceholder
            track={entry.track}
            variant={mockVariant}
            className="mb-3"
          />
        )}
        <h4
          className={cn(
            'text-pretty font-medium leading-snug',
            compact && 'text-sm',
          )}
        >
          {entry.headline}
        </h4>
        {entry.metric && !compact && (
          <span
            className={cn(
              'mt-3 font-serif text-xl leading-none tracking-tight',
              trackStyles[entry.track].accentText,
            )}
          >
            {entry.metric}
          </span>
        )}
        {hasCaseStudy && !compact && (
          <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-medium text-muted-foreground transition-all group-hover:gap-1.5 group-hover:text-foreground">
            View case study <span aria-hidden="true">→</span>
          </span>
        )}
      </button>
    </motion.li>
  )
}

export function CareerTimeline() {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('timeline')
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
        'relative mx-auto px-6 py-20 transition-[max-width] duration-500 md:px-10 md:py-28 lg:px-14',
        isOpen ? 'max-w-[1440px]' : 'max-w-6xl',
      )}
    >
      {/* Echoes the hero's blue glow so the two sections read as one
          continuous canvas instead of a hard cut. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 -z-10 rounded-full"
        style={{
          width: 'min(70vh, 640px)',
          height: 'min(70vh, 640px)',
          background:
            'radial-gradient(circle, #d0ecf6 0%, #dff3f9 62%, transparent 100%)',
        }}
      />

      <Reveal>
        <h2 className="mb-4 font-serif text-3xl tracking-tight md:text-4xl">
          Career timeline
        </h2>
        <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
          {viewMode === 'timeline'
            ? 'Three parallel tracks of work. Select any card for the full case study.'
            : 'A condensed summary of the same work. Underlined lines open the full case study.'}
        </p>
      </Reveal>

      {/* Legend / filter */}
      <div className="sticky top-[68px] z-10 -mx-6 mb-12 border-y border-border bg-background/90 px-6 py-3 backdrop-blur-md md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label="Filter timeline by type of work"
            className="flex flex-wrap items-center gap-2"
          >
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

          <div
            role="group"
            aria-label="Timeline display mode"
            className="flex items-center gap-1 rounded-full border border-border bg-card p-1"
          >
            {(
              [
                { mode: 'timeline', label: 'Timeline' },
                { mode: 'resume', label: 'Resume view' },
              ] as const
            ).map(({ mode, label }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  viewMode === mode
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
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
          {viewMode === 'resume' ? (
            <ResumeView
              activeTrack={activeTrack}
              selectedCase={selectedCase}
              onSelect={selectEntry}
            />
          ) : (
            <TimelineList
              timelineRef={timelineRef}
              lineProgress={lineProgress}
              isOpen={isOpen}
              activeTrack={activeTrack}
              selectedCase={selectedCase}
              onSelect={selectEntry}
            />
          )}
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

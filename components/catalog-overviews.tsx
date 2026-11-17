'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import type { RoughSVG } from 'roughjs/bin/svg'

import { event } from '@/lib/analytics'
import { EASE_OUT } from '@/components/motion-primitives'
import { Sketch } from '@/components/management/sketch'

// Three Overview options she picked from the mock sheets (16 Nov 2026), each
// with a shorter text than the description and the prototype beside it:
//   fan:  the opening sentence large, three screen captures fanned like cards
//   band: the full description beside the four clips on a tall pale band
//         that turns like a wheel, the middle clip playing
//   tour: the fan's left column beside the one long spotlight tour video
// They live on /overdrive/catalog/<option>; the homepage keeps the
// description until she chooses. The clips are recordings of the rebuilt
// prototype with sample data; the account picture in its top bar is covered.

const DIR = '/work/dde-rebuild'

const CLIPS = [
  { id: 'search-lineage', file: '1-search-lineage', label: 'Search and lineage', alt: 'The prototype: a search for “tax” across data products, tables and topics, then a table’s lineage.' },
  { id: 'data-map', file: '2-data-map', label: 'Data map', alt: 'The prototype: a data product’s page in the Data Map, with its tables, attributes and topics.' },
  { id: 'data-management', file: '3-data-management', label: 'Data management', alt: 'The prototype: a data owner’s list of assets with the gaps to fix highlighted.' },
  { id: 'data-copilot', file: '4-data-copilot', label: 'Data copilot', alt: 'The prototype: a plain question about a table answered with SQL by the data copilot.' },
] as const

type ClipId = (typeof CLIPS)[number]['id']

const PALE = '#dbe7fb'
const TEAL = '#d5efe8'
const LILAC = '#e7e0f9'
const SUN = '#fff0c0'
const PEACH = '#fde5d6'

const CARD = 'shadow-[0_0_0_1px_rgba(30,39,56,0.09),0_22px_44px_-20px_rgba(30,39,56,0.42)]'

/** A sentence in parts; the marked parts take the pale blue highlighter. */
type Part = string | { mark: string }

const LEAD = 'I design data and AI tools, and I manage the designers who build them.'
const INTUIT: Part[] = [
  'I joined Intuit in 2021 as the ',
  { mark: 'founding designer of its data catalog' },
  ', the internal tool where about ',
  { mark: '6,600 people a month' },
  ' find, judge and get access to the company’s data.',
]
const SEARCH: Part[] = ['I rebuilt search in Intuit’s data catalog, and first-result precision rose from ', { mark: '81.31% to 89.24%' }, '.']
const AGENT: Part[] = [
  'I wrote the rules for the data agent, an AI assistant that cut the time from a question to a verified answer from ',
  { mark: '45 minutes to 4' },
  '.',
]
const MANAGER: Part[] = ['As a manager, I led three designers. ', { mark: 'Every designer who reported to me was promoted.' }]

function Sentence({ parts, className }: { parts: Part[]; className?: string }) {
  return (
    <p className={`font-sans text-[17px] leading-[1.6] text-foreground lg:text-lg lg:leading-[1.6] ${className ?? ''}`}>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : (
          <mark
            key={i}
            className="bg-transparent bg-[linear-gradient(transparent_58%,#c9dbf8_58%,#c9dbf8_94%,transparent_94%)] box-decoration-clone px-0.5 font-semibold text-foreground"
          >
            {part.mark}
          </mark>
        ),
      )}
    </p>
  )
}

function Lead({ className }: { className: string }) {
  return <p className={`font-heading font-bold tracking-[-0.025em] text-foreground ${className}`}>{LEAD}</p>
}

/** Covers the account picture in the prototype's top bar. */
function AvatarCover() {
  return <span aria-hidden="true" className="absolute left-[98.2%] top-[3.35%] aspect-square w-[2.5%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9ced8]" />
}

function PlayButton({ playing, onClick, card }: { playing: boolean; onClick: () => void; card: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...event('clip', { card, action: playing ? 'pause' : 'play' })}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/95 px-4 font-sans text-sm font-bold text-foreground shadow-[0_4px_12px_-4px_rgba(30,39,56,0.4)] transition-[color,scale] duration-150 ease-out hover:text-accent-brand active:scale-[0.97]"
    >
      {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
      {playing ? 'Pause' : 'Play'}
    </button>
  )
}

/** True while the element is on screen: the videos only play then. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

const LEFT_COLUMN = [SEARCH, AGENT, MANAGER]

function LeadColumn() {
  return (
    <div>
      <Lead className="text-4xl leading-[1.08] lg:text-5xl lg:leading-[1.08]" />
      <div className="mt-7 grid gap-4">
        {LEFT_COLUMN.map((parts, i) => (
          <Sentence key={i} parts={parts} />
        ))}
      </div>
    </div>
  )
}

// The fan. Every card is the front card's size; a slot moves, turns and
// scales it, so a card changing place animates on transform alone.
const SLOTS = [
  { x: 23.1, y: 7, r: 5, s: 0.847 },
  { x: 2, y: 60, r: -4, s: 0.904 },
  { x: 21.1, y: 120, r: 2, s: 1 },
]
const slotTransform = (slot: (typeof SLOTS)[number], lift = 0) => `translate(${slot.x}%, ${slot.y + lift}%) rotate(${slot.r}deg) scale(${slot.s})`

const fanMarks = (rc: RoughSVG) => [
  rc.path('M30 86 q 26 -20 52 0 t 52 0 t 52 0', { stroke: '#2a8676', strokeWidth: 2.4 }),
  rc.path('M52 548 q3 19 22 22 q-19 3 -22 22 q-3 -19 -22 -22 q19 -3 22 -22 z', { stroke: '#b8860b' }),
  rc.path('M74 544 l0 10 M69 549 l10 0', { stroke: '#b8860b' }),
]

export function OverviewFan() {
  const reduce = useReducedMotion() === true
  // Back, middle, front.
  const [order, setOrder] = useState<ClipId[]>(['data-management', 'data-map', 'search-lineage'])
  const front = CLIPS.find((c) => c.id === order[2])!
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
      <LeadColumn />
      <div>
        <div className="relative aspect-[638/640]">
          <span aria-hidden="true" className="absolute left-[14%] top-[9%] aspect-square w-[74%] rounded-full" style={{ background: PALE }} />
          <span aria-hidden="true" className="absolute left-[78%] top-[5%] aspect-square w-[17%] rotate-12 rounded-[26px]" style={{ background: PEACH }} />
          <Sketch w={638} h={640} draw={fanMarks} seed={11} className="pointer-events-none absolute inset-0 size-full" />
          {CLIPS.filter((c) => order.includes(c.id)).map((c) => {
            const place = order.indexOf(c.id)
            const slot = SLOTS[place]
            return (
              <motion.button
                key={c.id}
                type="button"
                aria-pressed={place === 2}
                aria-label={`${c.label}: bring to the front`}
                onClick={() => setOrder((o) => [...o.filter((id) => id !== c.id), c.id])}
                {...event('overview-card', { card: c.id })}
                initial={{ opacity: 0, transform: slotTransform(slot, 14) }}
                animate={{ opacity: 1, transform: slotTransform(slot) }}
                transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.1 + place * 0.09, ease: EASE_OUT }}
                style={{ zIndex: place + 1, transformOrigin: '0 0' }}
                className={`absolute left-0 top-0 block w-[81.5%] overflow-hidden rounded-[14px] bg-white ${CARD}`}
              >
                <Image src={`${DIR}/${c.file}.jpg`} alt={c.alt} width={1920} height={1046} sizes="(min-width: 1024px) 560px, 80vw" className="block h-auto w-full" />
                <AvatarCover />
              </motion.button>
            )
          })}
        </div>
        <p className="mt-3 font-sans text-sm text-muted-foreground" aria-live="polite">
          In front: {front.label}. Select a card to bring it forward.
        </p>
      </div>
    </div>
  )
}

const tourMarks = (rc: RoughSVG) => [
  rc.path('M24 40 q 26 -20 52 0 t 52 0 t 52 0', { stroke: '#2a8676', strokeWidth: 2.4 }),
  rc.path('M596 470 q3 19 22 22 q-19 3 -22 22 q-3 -19 -22 -22 q19 -3 22 -22 z', { stroke: '#6b52c0' }),
]

export function OverviewTour() {
  const reduce = useReducedMotion() === true
  const [wanted, setWanted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [frame, inView] = useInView<HTMLDivElement>()
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reduce) setWanted(false)
  }, [reduce])

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (wanted && inView) v.play().catch(() => {})
    else v.pause()
  }, [wanted, inView])

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
      <LeadColumn />
      <div>
        <div ref={frame} className="relative px-[4%] pb-[7%] pt-[9%]">
          <span aria-hidden="true" className="absolute left-0 top-0 aspect-square w-[26%] rounded-full" style={{ background: TEAL }} />
          <span aria-hidden="true" className="absolute bottom-0 right-0 aspect-[17/12] w-[28%] rotate-6 rounded-[26px]" style={{ background: SUN }} />
          <span aria-hidden="true" className="absolute right-[6%] top-[2%] aspect-square w-[14%] -rotate-12 rounded-[22px]" style={{ background: LILAC }} />
          <Sketch w={638} h={520} draw={tourMarks} seed={5} className="pointer-events-none absolute inset-0 size-full" stretch />
          <div className={`relative overflow-hidden rounded-2xl bg-white ${CARD}`}>
            <video
              ref={video}
              src={`${DIR}/spotlight-tour.mp4`}
              poster={`${DIR}/spotlight-tour.jpg`}
              muted
              loop
              playsInline
              preload="none"
              aria-label="A tour of the rebuilt data discovery prototype: search, a table’s page, the Data Map, filters and access requests, with each part lit in turn."
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className="block aspect-[3200/1744] h-auto w-full"
            />
            <AvatarCover />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 px-[4%]">
          <PlayButton playing={playing} onClick={() => setWanted(!playing)} card="overview-tour" />
          <p className="font-sans text-sm text-muted-foreground">A tour of the prototype, 1 min 49 s, no sound.</p>
        </div>
      </div>
    </div>
  )
}

// The wheel: the four clips and a still from each of the other projects,
// stacked on a tall pale band that turns like a drum. The middle one shows
// in full (a clip plays, a still holds for a few seconds); the ones above and
// below wait, smaller, dimmed and tipped back. Then the wheel turns one place.
type WheelItem =
  | { kind: 'clip'; id: string; label: string; caption: string; alt: string; file: string }
  | { kind: 'still'; id: string; label: string; caption: string; alt: string; src: string; width: number; height: number; slug: string }

const clipItem = (n: number): WheelItem => ({
  kind: 'clip',
  ...CLIPS[n],
  caption: `${CLIPS[n].label}, from a prototype of the data platform rebuilt with sample data.`,
})

const WHEEL: WheelItem[] = [
  clipItem(0),
  {
    kind: 'still',
    id: 'search-2',
    slug: 'search-2',
    label: 'Search 2.0',
    caption: 'Search 2.0, the rebuilt search in Intuit’s data catalog, shown in a prototype with sample data.',
    alt: 'Search results for “tax” in the redesigned search, rebuilt as a prototype with sample data: a tab for each kind of data, a filter column on the left, and the owning team and where the data lives on each result.',
    src: '/work/search-2/recreated/card-poster.jpg',
    width: 2560,
    height: 1396,
  },
  clipItem(1),
  {
    kind: 'still',
    id: 'agentic-discovery',
    slug: 'agentic-discovery',
    label: 'The data agent',
    caption: 'The data agent, an AI assistant that answers questions about the company’s data.',
    alt: 'The data agent inside a code editor: it shows the SQL query it wrote and explains each column before running it.',
    src: '/work/agentic-discovery/hero-poster.jpg',
    width: 1340,
    height: 994,
  },
  clipItem(2),
  {
    kind: 'still',
    id: '605-tv-analytics',
    slug: '605-tv-analytics',
    label: '605 Platform',
    caption: 'The 605 Platform, analytics for TV advertising.',
    alt: 'The 605 Platform’s main dashboard: a table of top networks by rating beside reach and viewing totals and a playback chart.',
    src: '/work/605-tv-analytics/hero-poster.jpg',
    width: 1440,
    height: 820,
  },
  clipItem(3),
]

const STILL_HOLD_MS = 6000

// Places past the neighbours all sit at 2, out of sight.
const wheelTransform = (d: number) => {
  const at = Math.max(-2, Math.min(2, d))
  return `translateY(${at * 78}%) perspective(900px) rotateX(${at * -24}deg) scale(${at === 0 ? 1 : 0.74})`
}
const wheelOpacity = (d: number) => (d === 0 ? 1 : Math.abs(d) === 1 ? 0.7 : 0)

export function OverviewWheel() {
  const reduce = useReducedMotion() === true
  const [active, setActive] = useState(0)
  const [wanted, setWanted] = useState(true)
  const [clipPlaying, setClipPlaying] = useState(false)
  const [band, inView] = useInView<HTMLDivElement>()
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const before = useRef<number[]>([])
  const count = WHEEL.length
  const item = WHEEL[active]
  const turning = wanted && inView
  const playing = item.kind === 'clip' ? clipPlaying : turning

  useEffect(() => {
    if (reduce) setWanted(false)
  }, [reduce])

  useEffect(() => {
    videos.current.forEach((v, n) => {
      if (!v) return
      if (n === active && turning) v.play().catch(() => {})
      else {
        v.pause()
        if (n !== active && v.currentTime > 0) v.currentTime = 0
      }
    })
    if (WHEEL[active].kind !== 'still' || !turning) return
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % count), STILL_HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [active, turning, count])

  // -1 is the one above the middle, 1 the one below, 2 and up are hidden.
  const places = WHEEL.map((_, n) => ((n - active + count + 1) % count) - 1)
  const was = before.current
  useEffect(() => {
    before.current = places
  })

  const select = (n: number) => {
    setActive(n)
    setWanted(true)
  }

  return (
    <div>
      {/* overflow-clip, not hidden: a hidden box scrolls itself when a card inside takes focus. */}
      <div ref={band} className="relative aspect-[100/84] overflow-clip rounded-[110px_40px_110px_40px] lg:rounded-[160px_60px_160px_60px]" style={{ background: PALE }}>
        {WHEEL.map((w, n) => {
          const d = places[n]
          const from = was[n] ?? d
          const on = d === 0
          const near = Math.abs(d) === 1
          // A hidden one changes side out of sight: off the top, then in
          // from the bottom (or the reverse when the wheel turns back).
          const overTop = from === -1 && d > 1
          const animate = overTop
            ? { transform: [null, wheelTransform(-2), wheelTransform(2)], opacity: [null, 0, 0] }
            : from > 1 && d === -1
              ? { transform: [wheelTransform(-2), wheelTransform(-1)], opacity: [0, wheelOpacity(-1)] }
              : { transform: wheelTransform(d), opacity: wheelOpacity(d) }
          return (
            <div key={w.id} className="absolute left-[7%] top-1/2 w-[86%] -translate-y-1/2" style={{ zIndex: on ? 3 : near ? 2 : 0 }}>
              <motion.div
                initial={false}
                animate={animate}
                transition={reduce ? { duration: 0 } : { duration: 0.65, ease: EASE_OUT, times: overTop ? [0, 0.98, 1] : undefined }}
                className={`relative overflow-hidden rounded-[14px] bg-white ${CARD}`}
              >
                {w.kind === 'clip' ? (
                  <>
                    <video
                      ref={(el) => {
                        videos.current[n] = el
                      }}
                      src={`${DIR}/${w.file}.mp4`}
                      poster={`${DIR}/${w.file}.jpg`}
                      muted
                      playsInline
                      preload="none"
                      aria-label={w.alt}
                      onPlay={() => on && setClipPlaying(true)}
                      onPause={() => on && setClipPlaying(false)}
                      onEnded={() => on && setActive((a) => (a + 1) % count)}
                      className="block aspect-[3200/1744] h-auto w-full"
                    />
                    <AvatarCover />
                  </>
                ) : (
                  <Image
                    src={w.src}
                    alt={w.alt}
                    width={w.width}
                    height={w.height}
                    sizes="(min-width: 1024px) 560px, 86vw"
                    className="block aspect-[3200/1744] h-auto w-full object-cover object-left-top"
                  />
                )}
                {on ? (
                  <div className="absolute bottom-3 left-3">
                    <PlayButton playing={playing} onClick={() => setWanted(!playing)} card={`overview-${w.id}`} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => select(n)}
                    tabIndex={near ? 0 : -1}
                    aria-hidden={near ? undefined : true}
                    aria-label={`Show ${w.label}`}
                    {...event('clip', { card: `overview-${w.id}`, action: 'play' })}
                    className="absolute inset-0 cursor-pointer"
                  />
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
      {/* Room for the longest caption, so nothing under the wheel moves when
          it turns; announced only when the visitor turns it, not on its own. */}
      <p className="mt-3 min-h-[3.75rem] font-sans text-sm text-muted-foreground sm:min-h-10" aria-live={turning ? 'off' : 'polite'}>
        {active + 1} of {count}: {item.caption}
        {item.kind === 'still' && (
          <>
            {' '}
            <Link
              href={`/work/${item.slug}/`}
              {...event('work-card', { card: item.slug, via: 'wheel' })}
              className="font-semibold text-accent-brand underline decoration-accent-brand/40 underline-offset-4 hover:decoration-accent-brand"
            >
              Read the case study
            </Link>
          </>
        )}
      </p>
    </div>
  )
}

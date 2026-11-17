'use client'

import Image from 'next/image'
import Link from 'next/link'
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import { easeInOut, easeOut, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight, ArrowUpRight, ChevronRight, Database } from 'lucide-react'

import { event } from '@/lib/analytics'
import { EASE_OUT } from '@/components/motion-primitives'
import { EXPERIENCE, HERO } from '@/lib/home-content'
import { OverviewWheel } from '@/components/catalog-overviews'

// The catalog-entry hero (14 Nov 2026, from the mockups Kanchi picked): the
// landing page opens as her own entry in a data catalog. A top bar with the
// path, the photo as the profile picture beside the
// name, three chips, a tab row that
// swaps the panel under it in place (Overview, Design work, Management, Leveraging AI, Talks), and the Overview panel: her description (or her first line over a table
// of her record: roles, years and the seven areas) beside "Queries people run on this profile", the three
// questions visitors arrive with. Contact is the page's small footer. No pinning and no scroll choreography. The
// load-in keeps some of the split hero's: the photo is uncovered from the
// bottom up and its blue block slides out, the name rises out of a mask, the
// badges follow, and the rule under the tabs draws in with one packet on it.

// band is the homepage's Overview: the description beside the wheel.
export type CatalogOverview = 'description' | 'schema' | 'band'

export type CatalogTab = 'overview' | 'work' | 'management' | 'ai' | 'talks'

/** The tab row. Each tab swaps the panel under the header in place; nothing
 *  scrolls. The ids double as the page's hash (#work, #management, #ai, #talks), so
 *  the site nav and the links inside the Overview open the matching tab. */
export const CATALOG_TABS: { id: CatalogTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'work', label: 'Design work' },
  { id: 'management', label: 'Management' },
  // The Leveraging AI tab is off the page for now (17 Nov 2026, her call);
  // its panel (components/catalog-ai.tsx) is kept. Put this line back to show it:
  // { id: 'ai', label: 'Leveraging AI' },
  // The Talks tab is off the page for now too (17 Nov 2026, her call):
  // { id: 'talks', label: 'Talks' },
]

/** The three questions, in the order she gave them. Each has the short answer
 *  shown in the preview card (wording from the case studies and the Management
 *  section), a screenshot from the page it opens, and that page. */
const QUERIES = [
  {
    id: 'ai',
    text: 'How do I use AI in my work?',
    answer:
      'Coded prototypes, AI research synthesis and AI-made videos, in my own design work. Every designer on my team adopted them.',
    href: '/#management',
    cover: { src: '/work/leading-the-team/marvin-2025.jpg', width: 2000, height: 1087 },
  },
  {
    id: 'agents',
    text: 'Have I designed for agent workflows?',
    answer:
      'From a copilot that turned questions into SQL to an agent inside Cursor and Claude. A question to a verified answer went from 45 min to 4 min.',
    href: '/work/agentic-discovery/',
    cover: { src: '/work/agentic-discovery/hero-poster.jpg', width: 1340, height: 994 },
  },
  {
    id: 'player-coach',
    text: 'How do I manage as a player-coach?',
    answer:
      'From 2024 to 2026 I managed the designers on Intuit’s data platform and kept designing myself. Every designer who reported to me was promoted.',
    href: '/#management',
    cover: { src: '/work/leading-the-team/tracker-2025.jpg', width: 2000, height: 1087 },
  },
]

/** The schema option's table: facts about her, not links. The tabs and the
 *  queries already do the navigating, so these rows only state the record:
 *  the roles with their years (EXPERIENCE), what came before, and the seven
 *  Intuit areas, in the wording the intro uses. */
const RECORD: { key: string; tag?: string; text: string }[] = [
  ...EXPERIENCE.map((role) => ({ key: role.period, tag: role.org, text: role.title })),
  { key: 'earlier', text: 'Backend software engineer' },
  {
    key: 'product_areas',
    tag: 'Intuit × 7',
    text: 'Discovery, access, lineage, observability, data maturity, instrumentation and pipeline authoring',
  },
]

const paragraphs = HERO.intro.map((para) => para.map((part) => part.text).join(''))

/** The timed load-in for a piece of the Overview: it rises a few pixels and
 *  fades in, a beat after the one above it. Skipped when the opening is doing
 *  the revealing or has already played. */
function useRise() {
  const intro = useContext(CatalogIntroContext)
  const instant = intro?.instant === true
  return (i: number) => ({
    initial: { opacity: 0, transform: 'translateY(10px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: instant ? { duration: 0 } : { duration: 0.5, delay: 0.45 + i * 0.08, ease: EASE_OUT },
  })
}

/** The three queries in a small terminal window, with the result beside it.
 *  Clicking a query selects it and shows its preview card on the right: a
 *  screenshot, the short answer and the link into the case study. The first
 *  query is selected from the start, so the card is never empty. */
export function CatalogQueries() {
  const [open, setOpen] = useState(0)
  const still = useReducedMotion()
  const q = QUERIES[open]
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:items-stretch">
      <Step at={4}>
        <div className="h-full overflow-hidden rounded-xl bg-card font-mono text-[13.5px] text-foreground shadow-soft ring-1 ring-foreground/[9%]">
          <div className="flex h-[34px] items-center gap-1.5 border-b border-foreground/[9%] px-3">
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden="true" className="size-[9px] rounded-full bg-foreground/15" />
            ))}
            <h2 className="ml-2.5 text-xs font-normal text-muted-foreground">queries people run on this profile</h2>
          </div>
          <ul>
            {QUERIES.map((item, i) => {
              const on = i === open
              return (
                <li key={item.id} className={i > 0 ? 'border-t border-foreground/[9%]' : undefined}>
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-controls="query-result"
                    onClick={() => setOpen(i)}
                    {...event('quick-link', { link: item.id, via: 'query' })}
                    className={`group/node flex min-h-11 w-full items-center gap-2.5 py-2 pl-3.5 pr-2.5 text-left transition-colors duration-150 ease-out ${on ? 'bg-accent-brand/[7%]' : 'hover:bg-foreground/[3%]'}`}
                  >
                    <span aria-hidden="true" className="font-semibold text-accent-brand">
                      &gt;
                    </span>
                    <span className="flex-1">{item.text}</span>
                    <kbd
                      aria-hidden="true"
                      className={`rounded-[6px] px-1.5 py-0.5 font-mono text-[11px] font-semibold transition-colors duration-150 ${on ? 'bg-accent-brand text-white' : 'bg-accent-brand/10 text-accent-brand group-hover/node:bg-accent-brand/20'}`}
                    >
                      run
                    </kbd>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </Step>
      <Step at={5.2}>
        <div id="query-result" aria-live="polite" className="h-full">
          <motion.div
            key={q.id}
            className="h-full"
            initial={{ opacity: 0, transform: 'translateY(4px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: still ? 0 : 0.22, ease: EASE_OUT }}
          >
            <Link
              href={q.href}
              {...event('quick-link', { link: q.id, via: 'card' })}
              className="group/card flex h-full flex-col gap-3.5 rounded-xl bg-card p-3 shadow-soft ring-1 ring-foreground/[9%] transition-[box-shadow,scale] duration-150 ease-out hover:ring-accent-brand/50 active:scale-[0.99] sm:flex-row sm:items-center sm:gap-5"
            >
              <Image
                src={q.cover.src}
                width={q.cover.width}
                height={q.cover.height}
                alt=""
                sizes="(min-width: 640px) 230px, 100vw"
                className="aspect-[16/10] w-full shrink-0 rounded-lg object-cover object-left-top ring-1 ring-foreground/[9%] sm:w-[230px]"
              />
              <span className="flex flex-col gap-2 pb-1 sm:pb-0 sm:pr-3">
                <span className="font-mono text-xs text-muted-foreground">
                  <span aria-hidden="true" className="text-accent-brand">
                    &gt;{' '}
                  </span>
                  {q.text}
                </span>
                <span className="font-sans text-[15px] leading-[1.5] text-foreground">{q.answer}</span>
                <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-brand">
                  Read the full case study
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-[translate] duration-150 ease-out group-hover/card:translate-x-0.5"
                    strokeWidth={2}
                  />
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </Step>
    </div>
  )
}

const MARK =
  'bg-transparent bg-[linear-gradient(transparent_58%,#c9dbf8_58%,#c9dbf8_94%,transparent_94%)] box-decoration-clone px-0.5 font-semibold text-foreground'
/** Phrases she asked to have highlighted that `HERO.intro` does not flag. */
const ALSO_MARKED = ['Every designer who reported to me was promoted.', 'I started as a backend software engineer']

/** The description's key facts under the pale blue highlighter (the wheel
 *  option, 16 Nov 2026): the phrases `HERO.intro` marks as `accent`, without
 *  a leading "from", and the phrases in `ALSO_MARKED`. */
function markedParts(para: (typeof HERO.intro)[number]) {
  return para.flatMap((part, i) => {
    const accent = 'accent' in part && part.accent
    if (accent) {
      const lead = part.text.startsWith('from ') ? 'from ' : ''
      return [lead, <mark key={i} className={MARK}>{part.text.slice(lead.length)}</mark>]
    }
    const phrase = ALSO_MARKED.find((p) => part.text.includes(p))
    if (!phrase) return [part.text]
    const at = part.text.indexOf(phrase)
    return [part.text.slice(0, at), <mark key={i} className={MARK}>{phrase}</mark>, part.text.slice(at + phrase.length)]
  })
}

/** The wheel option (16 Nov 2026) shows the description with its key facts
 *  highlighted and without the results paragraph (index 2 of `HERO.intro`):
 *  she asked for less text there, and the content agent found the other three
 *  read as one piece unchanged. The homepage keeps all four, plain. */
const RESULTS = 2

function Description({ marked = false }: { marked?: boolean }) {
  const shown = paragraphs.map((text, i) => ({ text, i })).filter((para) => !marked || para.i !== RESULTS)
  return (
    <div>
      {shown.map(({ text, i }, n) => (
        <Step key={i} at={3 + n * 0.6}>
          <p className={`${n > 0 ? 'mt-4 ' : ''}font-sans text-[17px] leading-[1.6] text-foreground lg:text-lg lg:leading-[1.6]`}>
            {marked ? markedParts(HERO.intro[i]) : text}
          </p>
        </Step>
      ))}
    </div>
  )
}

function Schema() {
  return (
    <div>
      <p className="font-heading text-xl font-semibold leading-[1.28] tracking-[-0.015em] text-foreground lg:text-2xl lg:leading-[1.28]">
        {paragraphs[0]}
      </p>
      <dl className="mt-5">
        {RECORD.map((row, i) => (
          <div
            key={row.key}
            className={`-mx-4 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 rounded-[14px] px-4 py-3 md:grid-cols-[9.5rem_6.5rem_1fr] ${
              i === 0 ? 'bg-accent-brand/5' : ''
            }`}
          >
            <dt className="font-mono text-[15px] font-bold tabular-nums text-foreground">{row.key}</dt>
            <dd className="justify-self-end md:justify-self-start">
              {row.tag && (
                <span className="rounded-[7px] bg-accent-brand/10 px-2 py-1 font-mono text-xs font-semibold text-accent-brand">{row.tag}</span>
              )}
            </dd>
            <dd className="col-span-2 font-sans text-[15px] leading-[1.4] text-foreground md:col-span-1">{row.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** The opening (desktop, motion allowed): the page loads with the photo and
 *  the name large, joined by a thread, holds for a beat, and then plays its
 *  own transition into the catalog page: the photo and the name travel home
 *  to the header and the rest assembles piece by piece. No scrolling is
 *  needed; any scroll, key or press skips to the end. `progress` runs 0 to 1
 *  over that transition; `stageId` names the element positions are measured
 *  against. */
export type CatalogIntro = {
  on: boolean
  progress: MotionValue<number>
  stageId: string
  /** True when the timed load-ins should not play: the opening is doing the
   *  revealing, or it already played and this is a return to the page. */
  instant: boolean
}

/** The page hands the opening to every piece through this. */
export const CatalogIntroContext = createContext<CatalogIntro | null>(null)

/** One piece of the page arriving. While the opening plays, each piece fades
 *  and rises in at its own point of the scroll, `at` steps after the photo
 *  has started home, so the page assembles piece by piece: the breadcrumb, each badge,
 *  the tabs, each paragraph, each query, the footer. Without
 *  an opening (phones, reduced motion) it is a plain wrapper. */
export function Step({ at, className, children }: { at: number; className?: string; children: React.ReactNode }) {
  const intro = useContext(CatalogIntroContext)
  const settled = useMotionValue(1)
  const progress = intro?.progress ?? settled
  // The photo and name are home by 0.42; pieces follow from 0.36, one every
  // 0.083 of the transition, each taking 0.1 to settle.
  const start = 0.36 + at * 0.083
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1], { ease: easeOut })
  const y = useTransform(progress, [start, start + 0.1], [14, 0], { ease: easeOut })
  const visibility = useTransform(opacity, (o) => (o <= 0.01 ? 'hidden' : 'visible'))
  // Always the same element type, so nothing remounts when the opening turns
  // on; without an opening the values sit at their settled ends.
  return (
    <motion.div style={intro?.on ? { opacity, y, visibility } : undefined} className={className}>
      {children}
    </motion.div>
  )
}

/** An element's place inside the stage, from layout offsets (transforms do
 *  not affect them). */
function placeIn(el: HTMLElement, stage: HTMLElement) {
  let x = 0
  let y = 0
  for (let n: HTMLElement | null = el; n && n !== stage; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft
    y += n.offsetTop
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

/** The opening screen's layout: the photo large on the left, its left edge
 *  on the page's content edge, and the name large beside it, as wide as the
 *  room to the right allows. Both are the header's own photo and name,
 *  enlarged; the transition brings them home. */
function openingLayout(stageId: string) {
  const stage = document.getElementById(stageId)
  const slot = stage?.querySelector<HTMLElement>('[data-opening="photo"]')
  const name = stage?.querySelector<HTMLElement>('[data-opening="name"]')
  if (!stage || !slot || !name) return null
  const vw = window.innerWidth
  const vh = window.innerHeight
  const edge = Math.max(24, (vw - 1360) / 2 + 56)
  const size = Math.min(416, vw * 0.28, vh * 0.52)
  const photo = { size, cx: edge + size / 2, cy: vh * 0.5 + 10 }
  const p = placeIn(slot, stage)
  const n = placeIn(name, stage)
  // The name starts past the photo, its blue block and the thread.
  const nameX = edge + size + 34 + 72
  const nameScale = Math.max(1, Math.min(1.9, (vw - edge - nameX) / n.w))
  const nameY = photo.cy - (n.h * nameScale) / 2 - 22
  return {
    photo: { dx: photo.cx - (p.x + p.w / 2), dy: photo.cy - (p.y + p.w / 2), k: size / p.w },
    name: { dx: nameX - n.x, dy: nameY - n.y, k: nameScale },
    // For the opening's own layer: the thread from photo to name, and the
    // title line under the name.
    thread: { x1: edge + size + 34, x2: nameX - 16, y: nameY + (n.h * nameScale) / 2 },
    title: { x: nameX, y: nameY + n.h * nameScale + 14 },
  }
}

/** The opening's own layer: a thread from the photo to the name, with one
 *  packet riding it, and the title under the name. Both fade as the photo
 *  and the name leave for the header. Decorative. */
export function CatalogOpening({ progress, stageId }: { progress: MotionValue<number>; stageId: string }) {
  const [g, setG] = useState<ReturnType<typeof openingLayout>>(null)
  const opacity = useTransform(progress, [0, 0.14], [1, 0])
  const visibility = useTransform(opacity, (o) => (o <= 0.01 ? 'hidden' : 'visible'))

  useLayoutEffect(() => {
    const measure = () => setG(openingLayout(stageId))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [stageId])

  const enter = (duration: number, delay = 0) => ({ duration, delay, ease: EASE_OUT })
  if (!g) return null
  const d = `M ${g.thread.x1} ${g.thread.y} H ${g.thread.x2}`

  return (
    <motion.div aria-hidden="true" style={{ opacity, visibility }} className="pointer-events-none absolute inset-x-0 top-0 z-10 h-dvh">
      <svg className="absolute inset-0 size-full overflow-visible" fill="none">
        <motion.path
          d={d}
          stroke="color-mix(in oklab, var(--accent-brand) 45%, transparent)"
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={enter(0.6, 0.75)}
        />
        <motion.circle cx={g.thread.x1} cy={g.thread.y} r={3.5} fill="var(--accent-brand)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0.3, 0.7)} />
        <motion.circle cx={g.thread.x2} cy={g.thread.y} r={3.5} fill="var(--accent-brand)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0.3, 1.2)} />
        <motion.circle
          r={4.5}
          fill="var(--accent-brand)"
          style={{ offsetPath: `path("${d}")` }}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.7, delay: 1.15, ease: EASE_OUT, opacity: { duration: 0.7, delay: 1.15, times: [0, 0.15, 0.8, 1] } }}
        />
      </svg>
      <motion.p
        initial={{ opacity: 0, transform: 'translateY(8px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={enter(0.6, 0.5)}
        style={{ left: g.title.x, top: g.title.y }}
        className="absolute font-sans text-[clamp(1.125rem,1.6vw,1.5rem)] text-foreground"
      >
        Product Design Manager and Principal Designer
      </motion.p>
    </motion.div>
  )
}

/** The breadcrumb, as a catalog shows where an entry lives: the folders
 *  quiet, the entry itself in ink. It sits directly above the name. */
function Breadcrumb() {
  const crumbs = ['portfolio', 'product_design', 'kanchi_bhawalkar']
  return (
    <nav aria-label="Location">
      <ol translate="no" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[11px] sm:text-xs">
        <li aria-hidden="true" className="flex text-accent-brand">
          <Database className="size-3.5" strokeWidth={2} />
        </li>
        {crumbs.map((crumb, i) => (
          // A phone has room for the last two parts only.
          <li key={crumb} className={`flex items-center gap-1.5 ${i === 0 ? 'max-sm:hidden' : ''}`}>
            {i > 0 && (
              <ChevronRight aria-hidden="true" className={`size-3 text-muted-foreground/60 ${i === 1 ? 'max-sm:hidden' : ''}`} strokeWidth={2} />
            )}
            <span aria-current={i === crumbs.length - 1 ? 'page' : undefined} className={i === crumbs.length - 1 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
              {crumb}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** The header: path line, photo, name, chips and the tab row. `id="hero"` is
 *  what the floating nav hides over. */
export function CatalogHero({ tab, onTab, intro }: { tab: CatalogTab; onTab: (tab: CatalogTab) => void; intro?: CatalogIntro }) {
  const list = useRef<HTMLDivElement>(null)
  // The photo and the name are the same elements throughout. On the opening
  // screen they are moved and scaled up to their large places; the
  // transition brings them home to the header.
  const [flip, setFlip] = useState({ photo: { dx: 0, dy: 0, k: 1 }, name: { dx: 0, dy: 0, k: 1 } })
  const introOn = intro?.on === true
  const stageId = intro?.stageId
  useLayoutEffect(() => {
    const home = { photo: { dx: 0, dy: 0, k: 1 }, name: { dx: 0, dy: 0, k: 1 } }
    if (!introOn || !stageId) {
      setFlip(home)
      return
    }
    const measure = () => {
      const g = openingLayout(stageId)
      setFlip(g ? { photo: g.photo, name: g.name } : home)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [introOn, stageId])
  const settled = useMotionValue(1)
  const progress = intro?.progress ?? settled
  const photoX = useTransform(progress, [0, 0.42], [flip.photo.dx, 0], { ease: easeInOut })
  const photoY = useTransform(progress, [0, 0.42], [flip.photo.dy, 0], { ease: easeInOut })
  const photoScale = useTransform(progress, [0, 0.42], [flip.photo.k, 1], { ease: easeInOut })
  // Corner radius in the photo's own pixels, so it reads 28px when large.
  const photoRadius = useTransform(progress, [0, 0.42], [28 / flip.photo.k, 20], { ease: easeInOut })
  const nameX = useTransform(progress, [0, 0.42], [flip.name.dx, 0], { ease: easeInOut })
  const nameY = useTransform(progress, [0, 0.42], [flip.name.dy, 0], { ease: easeInOut })
  const nameScale = useTransform(progress, [0, 0.42], [flip.name.k, 1], { ease: easeInOut })
  // The load-in. Initial states always render, so SSR and hydration agree;
  // reduced motion gets a zero-length transition instead of the choreography.
  const reduce = useReducedMotion() === true
  const enter = (duration: number, delay = 0) => (reduce ? { duration: 0 } : { duration, delay, ease: EASE_OUT })
  // Pieces the opening reveals itself, and everything on a return visit,
  // skip their timed load-in.
  const instant = intro?.instant === true
  const settle = (duration: number, delay = 0) => (instant ? { duration: 0 } : enter(duration, delay))
  const played = instant && !introOn

  // Arrow keys, Home and End move along the tab row, as a tab list should.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = CATALOG_TABS.findIndex((t) => t.id === tab)
    const last = CATALOG_TABS.length - 1
    const to = e.key === 'ArrowRight' ? (i + 1) % (last + 1) : e.key === 'ArrowLeft' ? (i + last) % (last + 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1
    if (to < 0) return
    e.preventDefault()
    const next = CATALOG_TABS[to]
    onTab(next.id)
    list.current?.querySelector<HTMLButtonElement>(`#tab-${next.id}`)?.focus()
  }

  return (
    <section id="hero" className="relative">
      <div className="relative mx-auto max-w-[85rem] px-6 pt-[clamp(1.75rem,6vh,4.5rem)] md:px-10 lg:px-14">
        <div className="flex items-start gap-3.5 sm:items-center sm:gap-6">
          <div data-opening="photo" className="relative z-20 w-14 flex-none sm:w-[84px] md:w-[92px]">
           <motion.div style={{ x: photoX, y: photoY, scale: photoScale }} className="relative">
            {/* The blue block waits behind the photo, then slides out to its
                offset. */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, transform: 'translate(0px, 0px)' }}
              animate={{ opacity: 1, transform: 'translate(6px, 6px)' }}
              transition={played ? { duration: 0 } : enter(0.7, 0.55)}
              style={{ borderRadius: photoRadius }}
              className="absolute inset-0 bg-accent-brand"
            />
            {/* The photo is uncovered from the bottom up while it settles
                from a slight zoom. */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={played ? { duration: 0 } : enter(0.9, 0.1)}
              style={{ borderRadius: photoRadius }}
              className="relative overflow-hidden shadow-[0_24px_48px_-28px_rgb(var(--shadow-ink)/0.45)]"
            >
              <motion.div initial={{ transform: 'scale(1.12)' }} animate={{ transform: 'scale(1)' }} transition={played ? { duration: 0 } : enter(1.2, 0.1)}>
                <Image
                  src="/images/kanchi.jpeg"
                  alt="Portrait of Kanchi Bhawalkar"
                  width={1024}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 26rem, 92px"
                  className="block h-auto w-full"
                />
              </motion.div>
            </motion.div>
           </motion.div>
          </div>
          <div className="min-w-0 flex-1">
            <Step at={0} className="mb-[11px]">
              <Breadcrumb />
            </Step>
            <h1
              data-opening="name"
              translate="no"
              className="relative z-20 -ml-0.5 w-max max-w-full font-heading text-[clamp(1.75rem,calc(5vw+0.6rem),4rem)] font-bold leading-[0.92] tracking-[-0.03em] text-foreground"
            >
             <motion.span style={{ x: nameX, y: nameY, scale: nameScale, transformOrigin: '0 0' }} className="block">
              {/* The name rises out of its own mask, as on the split hero.
                  The padding keeps the tops and tails of letters unclipped. */}
              <span className="-my-[0.12em] block overflow-hidden py-[0.12em]">
                <motion.span
                  className="block"
                  initial={{ transform: 'translateY(115%)' }}
                  animate={{ transform: 'translateY(0%)' }}
                  transition={played ? { duration: 0 } : enter(0.9, 0.12)}
                >
                  Kanchi Bhawalkar
                </motion.span>
              </span>
             </motion.span>
            </h1>
            {/* The four badges under the name were removed on 16 Nov 2026. */}
          </div>
        </div>

        <Step at={2.3}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={settle(0.5, 0.6)}
          className="-mx-6 mt-6 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:px-0"
        >
          <div
            ref={list}
            role="tablist"
            aria-label="Sections"
            onKeyDown={onKeyDown}
            className="relative flex w-max min-w-full gap-5 font-sans text-[15px] sm:gap-7"
          >
            {/* The rule under the tabs draws in from the left, and one packet
                rides it across: the split hero's lineage thread, kept small. */}
            <motion.span
              aria-hidden="true"
              initial={{ transform: 'scaleX(0)' }}
              animate={{ transform: 'scaleX(1)' }}
              transition={settle(1.1, 0.65)}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-foreground/10"
            />
            {!reduce && !instant && (
              <motion.span
                aria-hidden="true"
                initial={{ transform: 'translateX(-100%)', opacity: 0 }}
                animate={{ transform: 'translateX(0%)', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, delay: 0.65, ease: EASE_OUT, opacity: { duration: 1.1, delay: 0.65, times: [0, 0.08, 0.8, 1] } }}
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              >
                <span className="absolute -top-[2.5px] right-0 size-1.5 rounded-full bg-accent-brand" />
              </motion.span>
            )}
            {CATALOG_TABS.map((t) => {
              const active = t.id === tab
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => onTab(t.id)}
                  {...event('nav', { item: t.label })}
                  className={`inline-flex min-h-11 items-center whitespace-nowrap font-semibold transition-colors duration-150 ${
                    active
                      ? 'text-accent-brand shadow-[0_2px_0_var(--accent-brand)]'
                      : 'text-muted-foreground hover:text-foreground active:text-accent-brand'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </motion.div>
        </Step>
      </div>
    </section>
  )
}

const CONTACT = [
  { id: 'resume', label: 'Resume', href: '/kanchi-bhawalkar-resume.pdf' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/kanchib' },
]

/** Resume and LinkedIn as two buttons under the description (16 Nov 2026).
 *  They replace the homepage footer: no email, no "open to" line.
 *  `id="contact"` is where the nav's Contact link lands. */
function ContactButtons() {
  return (
    <ul id="contact" className="mt-7 flex flex-wrap items-center gap-2.5">
      {CONTACT.map((c, i) => (
        <li key={c.id}>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            {...event('contact', { link: c.id })}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 font-sans text-[15px] font-semibold transition-[color,background-color,scale] duration-150 ease-out active:scale-[0.97] ${
              i === 0 ? 'bg-accent-brand text-white hover:bg-foreground' : 'bg-accent-brand/10 text-accent-brand hover:bg-accent-brand/[18%]'
            }`}
          >
            {c.label}
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function CatalogOverviewPanel({ overview = 'description' }: { overview?: CatalogOverview }) {
  const rise = useRise()
  return (
    // The description alone (16 Nov 2026: the product reel that sat beside it
    // was removed), with Resume and LinkedIn under it. The wheel
    // (components/catalog-overviews.tsx) sits beside the description on the homepage (the band option).
    <div className="mx-auto max-w-[85rem] px-6 pb-3 pt-6 md:px-10 lg:px-14">
      <motion.div {...rise(2)}>
        {overview === 'schema' ? (
          <Step at={3}><Schema /></Step>
        ) : overview === 'band' ? (
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Resume and LinkedIn close the text column, so they sit with
                the words they follow and not under the wheel's height. */}
            <div>
              <Description marked />
              <Step at={5.4}>
                <ContactButtons />
              </Step>
            </div>
            <Step at={4}><OverviewWheel /></Step>
          </div>
        ) : (
          <Description />
        )}
        {overview !== 'band' && (
          <Step at={5.4}>
            <ContactButtons />
          </Step>
        )}
      </motion.div>
    </div>
  )
}

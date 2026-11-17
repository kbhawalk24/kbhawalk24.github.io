'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { event } from '@/lib/analytics'
import { ARCS, EXPERIENCE, MANAGEMENT } from '@/lib/home-content'
import { cn } from '@/lib/utils'
import { AreaIcon } from './visuals'

// The Management lineage (12 Nov 2026): one root box (me, on the Intuit data
// platform) → each of the seven areas → that area's own wins, with a last row for what came from
// the team. Every win sits on the row
// that produced it, so a reader can see which results were tied to one area
// and which were shared. "Mine" marks my own design work in those years.
// Sources: lib/home-content.ts, lib/pages/leading-the-team.ts, and the
// Career Record in the job-search folder (pipeline and instrumentation).

// `also` names other rows that fed the same win; each gets its own line to it.
type Win = { id: string; value: string; caption: string; tag?: 'mine' | 'shared'; also?: string[] }
type Row = { id: string; label: string; kind: 'area' | 'team'; wins: Win[] }

const card = (slug: string) => ARCS.flatMap((a) => a.cards).find((c) => c.slug === slug)!
const fig = (v: string) => MANAGEMENT.shipped.figures.find((f) => f.value === v)!.value
const [mgr] = EXPERIENCE

const ROWS: Row[] = [
  {
    id: 'find',
    label: 'Discovery',
    kind: 'area',
    wins: [
      { id: 'search', value: card('search-2').stats[0].value, caption: 'How often the first result was the right one, Data Map search at launch, Mar 2025' },
      { id: 'agent', value: card('agentic-discovery').stats[0].value, caption: 'Time from a question to a verified answer, with the data agent, Mar 2026' },
      { id: 'users', value: '2,664 → 6,673', caption: 'Monthly users of the data catalog, Jul 2024 to Mar 2026' },
    ],
  },
  { id: 'access', label: 'Access', kind: 'area', wins: [{ id: 'streams', value: fig('2–3 weeks → 3 days'), caption: 'Time to get access to a real-time data stream; 61% of requests were approved automatically' }] },
  { id: 'lineage', label: 'Lineage', kind: 'area', wins: [{ id: 'rootcause', value: fig('~4 hours → minutes'), caption: 'Time to find the root cause of a data incident', also: ['observability'] }] },
  { id: 'observability', label: 'Observability', kind: 'area', wins: [] },
  {
    id: 'maturity',
    label: 'Data maturity',
    kind: 'area',
    wins: [
      { id: 'clean', value: MANAGEMENT.shipped.lead.value, caption: 'Share of the company’s data certified to the clean-data standard, by Nov 2025' },
      { id: 'p0', value: fig('17 → 0'), caption: 'Most severe data incidents during tax season, tax year 2025' },
    ],
  },
  { id: 'instrumentation', label: 'Instrumentation', kind: 'area', wins: [{ id: 'tracking', value: '2 weeks → under 2 days', caption: 'Time to approve an instrumentation tracking plan, once approvals were automated' }] },
  { id: 'pipelines', label: 'Pipeline authoring', kind: 'area', wins: [] },
  { id: 'team', label: 'The team', kind: 'team', wins: [{ id: 'promoted', value: 'Every designer who reported to me was promoted', caption: '' }] },
]

// Lineage: the root → each row → its wins.
// A win with `also` is fed by those rows too (root cause: lineage and observability).
const FEEDS: Edge[] = ROWS.flatMap((r) => r.wins.flatMap((w) => (w.also ?? []).map((a) => [`r-${a}`, `w-${w.id}`] as Edge)))
type Edge = [string, string]
const EDGES: Edge[] = [
  ...ROWS.map((r) => ['me', `r-${r.id}`] as Edge),
  ...ROWS.flatMap((r) => r.wins.map((w) => [`r-${r.id}`, `w-${w.id}`] as Edge)),
  ...FEEDS,
]
const DRAWN: Edge[] = [
  ...ROWS.map((r) => ['me', `r-${r.id}`] as Edge),
  ...ROWS.filter((r) => r.wins.length).map((r) => [`r-${r.id}`, `w-${r.wins[0].id}`] as Edge),
  ...FEEDS,
]
const STORY = ROWS.filter((r) => r.wins.length || FEEDS.some((e) => e[0] === `r-${r.id}`)).map((r) => `r-${r.id}`)

function lineageOf(id: string) {
  const nodes = new Set<string>([id])
  for (const dir of [0, 1] as const) {
    const queue = [id]
    while (queue.length) {
      const cur = queue.shift()!
      for (const e of EDGES) {
        const next = e[1 - dir]
        if (e[dir] === cur && !nodes.has(next)) {
          nodes.add(next)
          queue.push(next)
        }
      }
    }
  }
  return nodes
}

const track = (item: string) => event('management', { item })

const PILL = 'relative rounded-xl bg-white text-left shadow-soft ring-1 ring-foreground/[9%] transition-[opacity,box-shadow] duration-300'
const HEAD = 'font-sans text-sm font-semibold text-muted-foreground'

export function StageGraph() {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLElement | null>>({})
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState<Record<string, string>>({})
  const [hover, setHover] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const [story, setStory] = useState(0)
  const [inView, setInView] = useState(false)

  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const box = wrap.getBoundingClientRect()
    setSize({ w: box.width, h: box.height })
    const next: Record<string, string> = {}
    for (const [from, to] of DRAWN) {
      const a = refs.current[from]?.getBoundingClientRect()
      const b = refs.current[to]?.getBoundingClientRect()
      if (!a || !b || !a.width || !b.width) continue
      const sx = a.right - box.left
      const sy = a.top + a.height / 2 - box.top
      const tx = b.left - box.left
      const ty = b.top + b.height / 2 - box.top
      const dx = Math.max(16, (tx - sx) * 0.5)
      next[`${from}>${to}`] = `M${sx},${sy} C${sx + dx},${sy} ${tx - dx},${ty} ${tx},${ty}`
    }
    setPaths(next)
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const storyRunning = !reduced && inView && !hover && !pinned
  useEffect(() => {
    if (!storyRunning) return
    const t = setInterval(() => setStory((s) => (s + 1) % STORY.length), 2600)
    return () => clearInterval(t)
  }, [storyRunning])

  const focus = hover ?? pinned ?? (storyRunning ? STORY[story] : null)
  const lit = useMemo(() => {
    if (!focus) return null
    const set = lineageOf(focus)
    // Hovering a win lights its whole row, not just that one figure.
    const row = ROWS.find((r) => r.wins.some((w) => `w-${w.id}` === focus))
    if (row) for (const w of row.wins) set.add(`w-${w.id}`)
    return set
  }, [focus])
  // Nodes fade only when the visitor picks one (hover, focus or pin). The
  // resting tour lights a lineage without dimming the other results, so
  // every figure stays readable (17 Nov 2026).
  const picked = hover ?? pinned
  const on = (id: string) => !lit || !picked || lit.has(id)

  const nodeProps = (id: string) => ({
    ref: (el: HTMLElement | null) => {
      refs.current[id] = el
    },
    type: 'button' as const,
    'aria-pressed': pinned === id,
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    onClick: () => setPinned((p) => (p === id ? null : id)),
    ...track(`node-${id}`),
  })
  const ring = (id: string) => (hover === id || pinned === id ? 'ring-2 ring-accent-brand' : '')

  return (
    <div ref={wrapRef} className="relative">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block" width={size.w} height={size.h}>
        {DRAWN.map(([from, to]) => {
          const d = paths[`${from}>${to}`]
          if (!d) return null
          const isLit = !!lit && lit.has(from) && lit.has(to)
          return (
            <g key={`${from}>${to}`}>
              <path
                d={d}
                fill="none"
                strokeLinecap="round"
                stroke={isLit ? 'var(--accent-brand)' : '#c9ced8'}
                strokeWidth={isLit ? 2.4 : 1.8}
                opacity={1}
                className="transition-[stroke,opacity] duration-300"
              />
              {isLit && !reduced && (
                <circle r="4.5" fill="var(--accent-brand)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          )
        })}
      </svg>

      <div className="relative grid gap-y-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16">
        {/* The root: me, on the platform, centred on the rows */}
        <div className="flex flex-col md:justify-center">
          <p className={cn(HEAD, 'mb-3 md:hidden')}>Me</p>
          <button {...nodeProps('me')} className={cn('relative self-start rounded-xl border-[1.5px] border-[#1e2738] bg-white px-4 py-2.5 text-left transition-[opacity,box-shadow] duration-300', ring('me'), !on('me') && 'opacity-35')}>
            <span className="block whitespace-nowrap font-sans text-sm text-muted-foreground">{mgr.title}</span>
            <span className="mt-0.5 flex items-center gap-2 whitespace-nowrap font-sans text-[16px] font-semibold text-foreground">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent-brand" />
              Intuit data platform
            </span>
          </button>
        </div>

        {/* One row per area, then the team row */}
        <div>
          <div className="mb-3 hidden grid-cols-[12.5rem_minmax(0,1fr)] gap-x-10 md:grid">
            <p className={HEAD}>The seven areas</p>
            <p className={HEAD}>Highlights</p>
          </div>
          <ul className="flex flex-col gap-1.5">
            {ROWS.map((r) => (
              <li
                key={r.id}
                className={cn(
                  'grid items-center gap-x-10 gap-y-2 md:grid-cols-[12.5rem_minmax(0,1fr)]',
                  r.kind === 'team' && 'mt-3 border-t border-dashed border-foreground/20 pt-3',
                )}
              >
                <button
                  {...nodeProps(`r-${r.id}`)}
                  className={cn(
                    'flex min-h-11 items-center gap-2.5 rounded-[10px] px-2.5 py-1.5 text-left font-sans text-[14px] font-semibold leading-tight text-foreground transition-[opacity,box-shadow] duration-300',
                    r.kind === 'area' ? 'border-[1.5px] border-[#1e2738] bg-white' : 'border-[1.5px] border-dashed border-[#1e2738]/50 bg-transparent',
                    (hover === `r-${r.id}` || pinned === `r-${r.id}`) && 'ring-2 ring-accent-brand',
                    !on(`r-${r.id}`) && 'opacity-35',
                  )}
                  aria-label={`${r.label}${r.wins.length || FEEDS.some((e) => e[0] === `r-${r.id}`) ? '' : ', no figure'}`}
                >
                  {r.kind === 'area' && <AreaIcon name={r.label} className="size-7 flex-none" />}
                  {r.label}
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  {r.wins.map((w) => (
                    <button
                      key={w.id}
                      {...nodeProps(`w-${w.id}`)}
                      className={cn(PILL, 'max-w-full px-3 py-1.5', ring(`w-${w.id}`), !on(`w-${w.id}`) && 'opacity-35')}
                    >
                      <span className={cn('block font-heading font-bold leading-[1.15] tracking-[-0.01em] text-accent-brand', 'text-[16px]')}>
                        {w.value}
                      </span>
                      {(w.caption || w.tag) && (
                        <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-sans text-[14px] leading-[1.35] text-muted-foreground">
                          {w.caption}
                          {w.tag && (
                            <span className={cn('rounded-full px-1.5 py-px label-micro', w.tag === 'mine' ? 'bg-accent-brand/10 text-accent-brand' : 'bg-foreground/[0.06] text-muted-foreground')}>
                              {w.tag}
                            </span>
                          )}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

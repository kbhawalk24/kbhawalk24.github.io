'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { event } from '@/lib/analytics'
import { ARCS, EXPERIENCE, MANAGEMENT } from '@/lib/home-content'
import { cn } from '@/lib/utils'

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
      { id: 'search', value: card('search-2').stats[0].value, caption: 'Search 2.0 precision', tag: 'mine' },
      { id: 'agent', value: card('agentic-discovery').stats[0].value, caption: 'The agent, to an answer', tag: 'mine' },
      { id: 'users', value: '2,664 → 6,673', caption: 'Monthly users, Jul 2024 to Mar 2026', tag: 'shared' },
    ],
  },
  { id: 'access', label: 'Access', kind: 'area', wins: [{ id: 'streams', value: fig('2–3 weeks → 3 days'), caption: 'Stream access, 61% auto-approved' }] },
  { id: 'lineage', label: 'Lineage', kind: 'area', wins: [{ id: 'rootcause', value: fig('~4 hours → minutes'), caption: 'Root cause of a data incident', also: ['observability'] }] },
  { id: 'observability', label: 'Observability', kind: 'area', wins: [] },
  {
    id: 'maturity',
    label: 'Data maturity',
    kind: 'area',
    wins: [
      { id: 'clean', value: MANAGEMENT.shipped.lead.value, caption: 'Certified clean data', tag: 'shared' },
      { id: 'p0', value: fig('17 → 0'), caption: 'P0 and P1 incidents, 2025', tag: 'shared' },
    ],
  },
  { id: 'instrumentation', label: 'Instrumentation', kind: 'area', wins: [{ id: 'tracking', value: '2 weeks → under 2 days', caption: 'Tracking-plan review' }] },
  { id: 'pipelines', label: 'Pipeline authoring', kind: 'area', wins: [{ id: 'debug', value: '1,000+ hours', caption: 'Saved by AI debug assist, by mid-2025' }] },
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

const PILL = 'relative rounded-[14px] bg-card text-left shadow-soft transition-[opacity,box-shadow] duration-300'

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
  const on = (id: string) => !lit || lit.has(id)

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
  const ring = (id: string) => (hover === id || pinned === id ? 'ring-2 ring-accent-brand' : 'ring-1 ring-transparent')

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
                stroke={isLit ? 'var(--accent-brand)' : 'color-mix(in oklab, var(--accent-brand) 30%, var(--band))'}
                strokeWidth={isLit ? 2.25 : 1.5}
                opacity={lit && !isLit ? 0.45 : 1}
                className="transition-[stroke,opacity] duration-300"
              />
              {isLit && !reduced && (
                <circle r="3.5" fill="var(--accent-brand)">
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
          <p className="mb-3 label-micro text-accent-brand md:hidden">Me</p>
          <button {...nodeProps('me')} className={cn(PILL, 'self-start px-4 py-2.5', ring('me'), !on('me') && 'opacity-35')}>
            <span className="label-micro block whitespace-nowrap text-muted-foreground">{mgr.title} · {mgr.period}</span>
            <span className="mt-0.5 flex items-center gap-2 whitespace-nowrap font-sans text-[16px] font-semibold text-foreground">
              <span aria-hidden="true" className="size-2 rounded-full bg-foreground" />
              Intuit data platform
            </span>
          </button>
        </div>

        {/* One row per area, then the team row */}
        <div>
          <div className="mb-3 hidden grid-cols-[12.5rem_minmax(0,1fr)] gap-x-10 md:grid">
            <p className="label-micro text-accent-brand">The seven areas</p>
            <p className="label-micro text-accent-brand">What changed</p>
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
                    'min-h-9 rounded-[10px] px-3 py-1.5 text-left font-sans text-[14px] font-semibold leading-tight text-foreground transition-[opacity,box-shadow] duration-300',
                    r.kind === 'area' ? 'bg-card/70' : 'bg-transparent outline outline-[1.5px] outline-dashed outline-foreground/30',
                    hover === `r-${r.id}` || pinned === `r-${r.id}` ? 'ring-2 ring-accent-brand' : r.kind === 'area' ? 'ring-1 ring-foreground/[0.07]' : '',
                    !on(`r-${r.id}`) && 'opacity-35',
                  )}
                  aria-label={`${r.label}${r.wins.length || FEEDS.some((e) => e[0] === `r-${r.id}`) ? '' : ', no figure'}`}
                >
                  {r.label}
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  {r.wins.map((w) => (
                    <button
                      key={w.id}
                      {...nodeProps(`w-${w.id}`)}
                      className={cn(PILL, 'px-3 py-1.5', ring(`w-${w.id}`), !on(`w-${w.id}`) && 'opacity-35')}
                    >
                      <span className={cn('block font-heading font-bold leading-[1.15] tracking-[-0.01em] text-accent-brand', 'text-[16px]')}>
                        {w.value}
                      </span>
                      {(w.caption || w.tag) && (
                        <span className="flex items-center gap-1.5 whitespace-nowrap font-sans text-[12px] text-muted-foreground">
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

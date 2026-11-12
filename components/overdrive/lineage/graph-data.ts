import { ARCS, EXPERIENCE, MANAGEMENT, type WorkCard } from '@/lib/home-content'

// The career as a lineage graph: roles, case studies, the seven Intuit
// product areas and sourced figures, with edges running upstream to
// downstream. Every word comes from lib/home-content.ts; captions are
// shortened from the card and Management copy, never extended.

export type Kind = 'role' | 'case' | 'area' | 'figure'

export interface LineageNode {
  id: string
  kind: Kind
  /** Where the node sits on the year axis (fractional years spread a column). */
  x: number
  /** The main line: a role title, a short case name, an area, or a figure. */
  label: string
  /** Small uppercase line above the label (org and period). */
  meta?: string
  /** Line under a figure. */
  caption?: string
  /** The case study, for case nodes. */
  card?: WorkCard
}

export interface LineageEdge {
  from: string
  to: string
}

const CARDS = ARCS.flatMap((a) => a.cards)
const card = (slug: string) => {
  const c = CARDS.find((x) => x.slug === slug)
  if (!c) throw new Error(`No card ${slug}`)
  return c
}

const [mgr, ic, early] = EXPERIENCE
const S = MANAGEMENT.shipped
const fig = (value: string) => {
  const f = S.figures.find((x) => x.value === value)
  if (!f) throw new Error(`No figure ${value}`)
  return f
}

export const AREAS = [
  'Discovery',
  'Access',
  'Lineage',
  'Observability',
  'Data maturity',
  'Instrumentation',
  'Pipeline authoring',
] as const

const areaId = (a: string) => `area-${a.toLowerCase().replace(/[^a-z]+/g, '-')}`

const c605 = card('605-tv-analytics')
const cCatalog = card('catalog-data-map-lineage')
const cSearch = card('search-2')
const cAgent = card('agentic-discovery')

export const NODES: LineageNode[] = [
  // Roles
  { id: 'role-605', kind: 'role', x: 2017, label: early.title, meta: `${early.org} · ${early.period}` },
  { id: 'role-ic', kind: 'role', x: 2021.35, label: ic.title, meta: `${ic.org} · ${ic.period}` },
  { id: 'role-manager', kind: 'role', x: 2024.6, label: mgr.title, meta: `${mgr.org} · ${mgr.period}` },

  // Case studies
  { id: 'case-605', kind: 'case', x: 2018, label: '605: three analytics products', meta: `${c605.org} · ${c605.period}`, card: c605 },
  { id: 'case-catalog', kind: 'case', x: 2021.7, label: 'Intuit’s data catalog', meta: `${cCatalog.org} · ${cCatalog.period}`, card: cCatalog },
  { id: 'case-search', kind: 'case', x: 2024, label: 'Search 2.0', meta: `${cSearch.org} · ${cSearch.period}`, card: cSearch },
  { id: 'case-agent', kind: 'case', x: 2025.1, label: 'The data agent', meta: `${cAgent.org} · ${cAgent.period}`, card: cAgent },

  // The platform and its seven areas
  { id: 'platform', kind: 'area', x: 2021.35, label: 'Intuit’s data platform', meta: 'Founding designer · 2021–2026' },
  ...AREAS.map((a, i) => ({ id: areaId(a), kind: 'area' as const, x: 2022.5 + i * 0.42, label: a })),

  // Figures
  { id: 'fig-605', kind: 'figure', x: 2019.3, label: c605.stats[0].value, caption: 'Additional revenue from pitches on the new designs' },
  { id: 'fig-users', kind: 'figure', x: 2025.65, label: cCatalog.stats[0].value, caption: 'Monthly users, Jul 2023 to Mar 2026' },
  { id: 'fig-precision', kind: 'figure', x: 2024.05, label: cSearch.stats[0].value, caption: 'Precision of the first result' },
  { id: 'fig-agent', kind: 'figure', x: 2026.2, label: cAgent.stats[0].value, caption: cAgent.stats[0].label },
  { id: 'fig-launches', kind: 'figure', x: 2024.7, label: '24 launches', caption: 'From 2024 to 2026' },
  { id: 'fig-clean', kind: 'figure', x: 2025.0, label: S.lead.value, caption: 'Certified clean data, a shared result' },
  { id: 'fig-incidents', kind: 'figure', x: 2025.3, label: fig('17 → 0').value, caption: 'P0 and P1 incidents in tax year 2025, a shared result' },
  { id: 'fig-access', kind: 'figure', x: 2024.35, label: fig('2–3 weeks → 3 days').value, caption: 'To get access to a data stream' },
  { id: 'fig-rootcause', kind: 'figure', x: 2025.95, label: fig('~4 hours → minutes').value, caption: 'To find the root cause of a data incident' },
  { id: 'fig-promoted', kind: 'figure', x: 2026.45, label: 'Every designer who reported to me was promoted' },
]

export const EDGES: LineageEdge[] = [
  // The career line
  { from: 'role-605', to: 'role-ic' },
  { from: 'role-ic', to: 'role-manager' },
  // 605
  { from: 'role-605', to: 'case-605' },
  { from: 'case-605', to: 'fig-605' },
  // 605 → the catalog → Search 2.0 → the data agent
  { from: 'case-605', to: 'case-catalog' },
  { from: 'role-ic', to: 'case-catalog' },
  { from: 'case-catalog', to: 'case-search' },
  { from: 'role-ic', to: 'case-search' },
  { from: 'case-search', to: 'case-agent' },
  { from: 'role-ic', to: 'case-agent' },
  { from: 'role-manager', to: 'case-agent' },
  { from: 'case-catalog', to: 'fig-users' },
  { from: 'case-search', to: 'fig-precision' },
  { from: 'case-agent', to: 'fig-agent' },
  // The platform and all seven areas
  { from: 'role-ic', to: 'platform' },
  ...AREAS.map((a) => ({ from: 'platform', to: areaId(a) })),
  { from: 'case-catalog', to: areaId('Discovery') },
  { from: 'case-catalog', to: areaId('Lineage') },
  { from: areaId('Access'), to: 'fig-access' },
  // The team's launches
  { from: 'role-manager', to: 'fig-launches' },
  { from: 'role-manager', to: 'fig-clean' },
  { from: 'role-manager', to: 'fig-incidents' },
  { from: 'role-manager', to: 'fig-access' },
  { from: 'role-manager', to: 'fig-rootcause' },
  { from: 'role-manager', to: 'fig-promoted' },
]

export const LANES: { kind: Kind; label: string }[] = [
  { kind: 'role', label: 'Roles' },
  { kind: 'case', label: 'Case studies' },
  { kind: 'area', label: 'Intuit product areas' },
  { kind: 'figure', label: 'Figures' },
]

export const KIND_LABEL: Record<Kind, string> = {
  role: 'Role',
  case: 'Case study',
  area: 'Product area',
  figure: 'Figure',
}

// ---------------------------------------------------------------------------
// Layout: columns by year, lanes by kind. Within a lane nodes are packed
// greedily into sub-rows (interval scheduling), so nothing overlaps and the
// graph stays a left-to-right DAG instead of a force blob.

export const YEARS = Array.from({ length: 10 }, (_, i) => 2017 + i)
export const X0 = 168
/** Column widths per year: the 605 years are sparse, the last Intuit years
 *  carry most of the figures, so the columns are not equal. */
const COL_W: Record<number, number> = {
  2017: 190, 2018: 170, 2019: 140, 2020: 110, 2021: 250,
  2022: 210, 2023: 210, 2024: 330, 2025: 400, 2026: 380,
}
const HEADER = 52
const LANE_LABEL = 26
const LANE_GAP = 30
const ROW_GAP = 14
const GAP_X = 18
const PAD_X = 16

export const NODE_H: Record<Kind, number> = { role: 50, case: 50, area: 34, figure: 50 }

export const yearX = (y: number) => {
  let x = X0
  for (let yr = 2017; yr < 2027; yr++) {
    const w = COL_W[yr]
    if (y < yr + 1) return x + (y - yr) * w
    x += w
  }
  return x
}

/** Text widths are estimated from per-face averages so the layout is the
 *  same on the server and the client; padding absorbs the difference. */
function estimate(n: LineageNode) {
  const main = n.kind === 'figure' ? (n.caption ? 7 : 7.8) : n.kind === 'area' ? 6.4 : 6.6
  const w = Math.max(
    n.label.length * main,
    (n.meta?.length ?? 0) * 7.2,
    (n.caption?.length ?? 0) * 5.6,
  )
  const dot = n.kind === 'case' ? 0 : 14
  return Math.ceil(w + PAD_X + dot + 18)
}

export interface Placed extends LineageNode {
  left: number
  top: number
  w: number
  h: number
}

export interface Layout {
  nodes: Placed[]
  byId: Map<string, Placed>
  lanes: { label: string; top: number; bottom: number }[]
  width: number
  height: number
  header: number
}

/** `measured` holds each node's real text extent (from the browser, once
 *  fonts load); without it the estimate is used. */
export function computeLayout(measured?: Map<string, number>): Layout {
  const placed: Placed[] = []
  const lanes: Layout['lanes'] = []
  let top = HEADER + 12
  for (const lane of LANES) {
    const h = NODE_H[lane.kind]
    const members = NODES.filter((n) => n.kind === lane.kind).sort((a, b) => a.x - b.x)
    const rows: number[] = []
    const laneTop = top
    let areaRight = 0
    for (const n of members) {
      const m = measured?.get(n.id)
      const w = m ? Math.ceil(m + 18) : estimate(n)
      // The seven areas hang off the platform as one row, like a tree.
      if (n.id.startsWith('area-')) {
        const platform = placed.find((p) => p.id === 'platform')!
        const left = areaRight ? areaRight + 12 : platform.left + 36
        areaRight = left + w
        if (rows.length < 2) rows.push(0)
        rows[1] = areaRight
        placed.push({ ...n, left, w, h, top: laneTop + LANE_LABEL + (h + ROW_GAP + 18) })
        continue
      }
      const left = yearX(n.x)
      let r = rows.findIndex((right) => right + GAP_X <= left)
      if (r === -1) {
        rows.push(0)
        r = rows.length - 1
      }
      rows[r] = left + w
      placed.push({ ...n, left, w, h, top: laneTop + LANE_LABEL + r * (h + ROW_GAP) })
    }
    const extra = lane.kind === 'area' ? 18 : 0
    const bottom = laneTop + LANE_LABEL + rows.length * (h + ROW_GAP) - ROW_GAP + extra
    lanes.push({ label: lane.label, top: laneTop, bottom })
    top = bottom + LANE_GAP
  }
  const width = Math.ceil(Math.max(yearX(2027), ...placed.map((p) => p.left + p.w + 48)))
  return {
    nodes: placed,
    byId: new Map(placed.map((p) => [p.id, p])),
    lanes,
    width,
    height: top - LANE_GAP + 28,
    header: HEADER,
  }
}

/** An edge in lineage-UI style: a horizontal S-curve along a row, or a
 *  rounded elbow when the target sits in a lower row. */
export function edgePath(a: Placed, b: Placed) {
  if (b.top === a.top) {
    const x1 = a.left + a.w
    const y1 = a.top + a.h / 2
    const x2 = b.left
    const y2 = b.top + b.h / 2
    const c = Math.max(40, (x2 - x1) / 2)
    return `M${x1},${y1} C${x1 + c},${y1} ${x2 - c},${y2} ${x2},${y2}`
  }
  // Rows apart: drop from the source's bottom onto a bus just under its
  // row, run across, and drop into the target's top, with rounded elbows.
  const x1 = Math.min(a.left + a.w - 24, Math.max(a.left + 24, b.left + 24))
  const y1 = a.top + a.h
  const x2 = b.left + Math.min(24, b.w / 2)
  const y2 = b.top
  const bus = y1 + 12
  const dx = x2 - x1
  if (Math.abs(dx) < 1) return `M${x1},${y1} V${y2}`
  const r = Math.min(8, Math.abs(dx) / 2, (y2 - bus) / 2)
  const sx = Math.sign(dx)
  return `M${x1},${y1} V${bus - r} Q${x1},${bus} ${x1 + sx * r},${bus} H${x2 - sx * r} Q${x2},${bus} ${x2},${bus + r} V${y2}`
}

/** Upstream and downstream of a node, with the edges on those paths: the
 *  impact view. */
export function lineageOf(id: string) {
  const up = new Set<string>()
  const down = new Set<string>()
  const walk = (start: string, dir: 'up' | 'down', seen: Set<string>) => {
    const stack = [start]
    while (stack.length) {
      const cur = stack.pop()!
      for (const e of EDGES) {
        const next = dir === 'up' ? (e.to === cur ? e.from : null) : e.from === cur ? e.to : null
        if (next && !seen.has(next)) {
          seen.add(next)
          stack.push(next)
        }
      }
    }
  }
  walk(id, 'up', up)
  walk(id, 'down', down)
  const nodes = new Set([id, ...up, ...down])
  const edges = new Set<number>()
  EDGES.forEach((e, i) => {
    const onUp = (e.to === id || up.has(e.to)) && up.has(e.from)
    const onDown = (e.from === id || down.has(e.from)) && down.has(e.to)
    if (onUp || onDown) edges.add(i)
  })
  return { nodes, edges, up, down }
}

export const upstreamOf = (id: string) => EDGES.filter((e) => e.to === id).map((e) => e.from)

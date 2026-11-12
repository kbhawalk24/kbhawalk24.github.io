import { NOW, type Asset, type OtherResult } from './data'

// Pure search, filter, sort and formatting rules for the local Search 2.0
// build, kept out of the component so the edge cases can be tested.

const DAY = 86_400_000

/** Lower-cased words of a query; blank or whitespace-only gives none. */
export function tokenize(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean)
}

function haystack(a: Asset): { name: string; parent: string; schema: string; text: string } {
  const parent = a.kind === 'column' ? a.table : ''
  return {
    name: a.name.toLowerCase(),
    parent: parent.toLowerCase(),
    schema: a.schema.toLowerCase(),
    text: `${a.description ?? ''} ${a.store} ${a.owner} ${a.domain ?? ''}`.toLowerCase(),
  }
}

/** Relevance of an asset to the query, or 0 when any word is missing. */
export function score(a: Asset, tokens: string[]): number {
  if (tokens.length === 0) return 1
  const h = haystack(a)
  let total = 0
  for (const t of tokens) {
    let s = 0
    if (h.name === t) s += 8
    else if (h.name.startsWith(t)) s += 6
    else if (h.name.includes(t)) s += 5
    if (h.parent.includes(t)) s += 3
    if (h.schema.includes(t)) s += 2
    if (h.text.includes(t)) s += 1
    if (s === 0) return 0
    total += s
  }
  return total
}

export function matchesOther(r: OtherResult, tokens: string[]): boolean {
  const text = `${r.title} ${r.subtitle} ${r.description} ${r.meta.join(' ')}`.toLowerCase()
  return tokens.every((t) => text.includes(t))
}

export type Filters = {
  tables: boolean
  columns: boolean
  dataMapOnly: boolean
  kafka: boolean
  cdc: boolean
  hideTemporary: boolean
  hideDeprecated: boolean
  refreshed120: boolean
  used120: boolean
  schemas: string[]
  domains: string[]
  maturity: 'All' | 0 | 1 | 2 | 3 | 4 | 5
}

export const DEFAULT_FILTERS: Filters = {
  tables: false,
  columns: false,
  dataMapOnly: false,
  kafka: false,
  cdc: false,
  hideTemporary: true,
  hideDeprecated: true,
  refreshed120: false,
  used120: false,
  schemas: [],
  domains: [],
  maturity: 'All',
}

/** How many filters differ from the defaults, for "Clear all". */
export function activeFilterCount(f: Filters): number {
  let n = 0
  for (const k of Object.keys(DEFAULT_FILTERS) as (keyof Filters)[]) {
    const a = f[k]
    const b = DEFAULT_FILTERS[k]
    if (Array.isArray(a)) n += a.length
    else if (a !== b) n += 1
  }
  return n
}

export function withinDays(iso: string | null, days: number, now = NOW): boolean {
  if (!iso) return false
  const t = Date.parse(`${iso}T00:00:00Z`)
  return Number.isFinite(t) && now - t <= days * DAY && t <= now
}

/** Every filter except hidden-results; kept apart so hidden counts can be reported. */
function passesFacets(a: Asset, f: Filters, now: number): boolean {
  if ((f.tables || f.columns) && !(a.kind === 'table' ? f.tables : f.columns)) return false
  if (f.dataMapOnly && !a.inDataMap) return false
  if ((f.kafka || f.cdc) && !((f.kafka && a.alsoAs.includes('kafka')) || (f.cdc && a.alsoAs.includes('cdc')))) return false
  if (f.refreshed120 && !withinDays(a.updated, 120, now)) return false
  if (f.used120 && !withinDays(a.lastUsed, 120, now)) return false
  if (f.schemas.length && !f.schemas.includes(a.schema)) return false
  if (f.domains.length && (!a.domain || !f.domains.includes(a.domain))) return false
  if (f.maturity !== 'All' && a.maturity !== f.maturity) return false
  return true
}

function isHidden(a: Asset, f: Filters): boolean {
  return (f.hideTemporary && a.temporary) || (f.hideDeprecated && a.deprecated)
}

export type SortKey = 'relevance' | 'popular' | 'updated' | 'name'

export type SearchOutcome = {
  results: Asset[]
  /** Matched the query at all, before any filter. */
  matched: number
  /** Passed every facet but were hidden as temporary or deprecated. */
  hidden: number
}

export function search(assets: Asset[], query: string, f: Filters, sort: SortKey, now = NOW): SearchOutcome {
  const tokens = tokenize(query)
  const scored = assets.map((a) => ({ a, s: score(a, tokens) })).filter((x) => x.s > 0)
  const faceted = scored.filter((x) => passesFacets(x.a, f, now))
  const shown = faceted.filter((x) => !isHidden(x.a, f))
  const usage = (a: Asset) => (a.kind === 'table' ? a.queries : a.joins)
  shown.sort((x, y) => {
    let d = 0
    if (sort === 'relevance') d = y.s - x.s || usage(y.a) - usage(x.a)
    else if (sort === 'popular') d = usage(y.a) - usage(x.a)
    else if (sort === 'updated') d = y.a.updated.localeCompare(x.a.updated)
    return d || x.a.name.localeCompare(y.a.name) || x.a.id.localeCompare(y.a.id)
  })
  return { results: shown.map((x) => x.a), matched: scored.length, hidden: faceted.length - shown.length }
}

/** Options for a facet with how many query matches carry each value, most first. */
export function facetOptions(assets: Asset[], query: string, pick: (a: Asset) => string | null) {
  const tokens = tokenize(query)
  const counts = new Map<string, number>()
  for (const a of assets) {
    const v = pick(a)
    if (v && score(a, tokens) > 0) counts.set(v, (counts.get(v) ?? 0) + 1)
  }
  return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
}

export const PAGE_SIZE = 10

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(items.length / size))
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pages)
  const start = (current - 1) * size
  return { items: items.slice(start, start + size), page: current, pages, from: items.length ? start + 1 : 0, to: start + Math.min(size, items.length - start) }
}

/** 950, 1.2K, 30.19M, 12.8B; null for unknown. */
export function compact(n: number | null): string {
  if (n === null || !Number.isFinite(n)) return '–'
  const abs = Math.abs(n)
  const trim = (v: number, d: number) => v.toFixed(d).replace(/\.?0+$/, '')
  if (abs >= 1e9) return `${trim(n / 1e9, 2)}B`
  if (abs >= 1e6) return `${trim(n / 1e6, 2)}M`
  if (abs >= 1e3) return `${trim(n / 1e3, 1)}K`
  return String(n)
}

/** Count badge on a tab: 0 to 999 as is, then 1K+ style. */
export function tabCount(n: number): string {
  return n > 999 ? `${Math.floor(n / 1000)}K+` : String(n)
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n.toLocaleString('en-US')} ${n === 1 ? one : many}`
}

export function usageLine(queries: number, users: number): string {
  if (queries === 0) return 'No queries yet'
  return `${plural(queries, 'query', 'queries')} by ${plural(users, 'user')}`
}

export function formatDate(iso: string): string {
  const t = Date.parse(`${iso}T00:00:00Z`)
  if (!Number.isFinite(t)) return 'Unknown date'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(t)
}

/** Splits text into plain and matched parts for highlighting; no regex, so any query is safe. */
export function highlight(text: string, tokens: string[]): { text: string; hit: boolean }[] {
  const lower = text.toLowerCase()
  const marks = new Array<boolean>(text.length).fill(false)
  for (const t of tokens) {
    if (!t) continue
    let i = lower.indexOf(t)
    while (i !== -1) {
      for (let j = i; j < i + t.length; j++) marks[j] = true
      i = lower.indexOf(t, i + t.length)
    }
  }
  const parts: { text: string; hit: boolean }[] = []
  for (let i = 0; i < text.length; i++) {
    const last = parts[parts.length - 1]
    if (last && last.hit === marks[i]) last.text += text[i]
    else parts.push({ text: text[i], hit: marks[i] })
  }
  return parts
}

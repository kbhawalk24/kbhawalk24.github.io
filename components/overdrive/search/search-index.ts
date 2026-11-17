import { ARCS, EXPERIENCE, MANAGEMENT, type WorkCard } from '@/lib/home-content'
import { SEARCH_2 } from '@/lib/pages/search-2'
import { AGENTIC_DISCOVERY } from '@/lib/pages/agentic-discovery'
import { CATALOG_DATA_MAP_LINEAGE } from '@/lib/pages/catalog-data-map-lineage'
import { SIX_O_FIVE } from '@/lib/pages/605-tv-analytics'
import { LEADING_THE_TEAM } from '@/lib/pages/leading-the-team'
import type { ShortPage } from '@/lib/pages/types'

// The /overdrive/search index: every entry is copied from content the site
// already shows (the homepage cards, the case pages' headings and figures,
// the Management figures, the experience rows). Nothing here is new copy
// except the short kicker labels that say where an entry comes from.

export type ResultType = 'Case study' | 'Figure' | 'Area' | 'Role'
export const TYPES: ResultType[] = ['Case study', 'Figure', 'Area', 'Role']
export const ORGS = ['Intuit', '605'] as const

export interface IndexItem {
  id: string
  type: ResultType
  /** Where the entry comes from, shown small above the title. */
  kicker: string
  title: string
  text: string
  href: string
  org: string
  period: string
  years: number[]
  /** Set on the four homepage case cards: these expand in place. */
  card?: WorkCard
}

/** The seven product areas, always all seven, in the site's order. */
export const AREAS = [
  'discovery',
  'access',
  'lineage',
  'observability',
  'data maturity',
  'instrumentation',
  'pipeline authoring',
] as const
// The site's own sentence listing them, used as each area's text.
const AREAS_SENTENCE =
  'Intuit’s data platform: discovery, access, lineage, observability, data maturity, instrumentation and pipeline authoring.'

function yearsOf(period: string): number[] {
  const found = (period.match(/\d{4}/g) ?? []).map(Number)
  if (found.length === 0) return []
  const lo = Math.min(...found)
  const hi = Math.max(...found)
  const out: number[] = []
  for (let y = lo; y <= hi; y++) out.push(y)
  return out
}

const slash = (href: string) => {
  const [path, hash] = href.split('#')
  const p = path.endsWith('/') ? path : `${path}/`
  return hash ? `${p}#${hash}` : p
}

const PAGES: { page: ShortPage; short: string; org: string }[] = [
  { page: SEARCH_2, short: 'Search 2.0', org: 'Intuit' },
  { page: AGENTIC_DISCOVERY, short: 'Data agent', org: 'Intuit' },
  { page: CATALOG_DATA_MAP_LINEAGE, short: 'Data catalog', org: 'Intuit' },
  { page: SIX_O_FIVE, short: '605', org: '605' },
]

function build(): IndexItem[] {
  const items: IndexItem[] = []

  // The four homepage case cards.
  for (const arc of ARCS) {
    for (const card of arc.cards) {
      if (!card.href) continue
      items.push({
        id: `case-${card.slug}`,
        type: 'Case study',
        kicker: card.role,
        title: card.title,
        text: card.line,
        href: slash(card.href),
        org: card.org,
        period: card.period,
        years: yearsOf(card.period),
        card,
      })
    }
  }

  // The Management page itself, as a case study without a card.
  items.push({
    id: 'case-leadership',
    type: 'Case study',
    kicker: LEADING_THE_TEAM.roleTag,
    title: LEADING_THE_TEAM.title,
    text: MANAGEMENT.text,
    href: '/#management',
    org: 'Intuit',
    period: LEADING_THE_TEAM.period,
    years: yearsOf(LEADING_THE_TEAM.period),
  })

  // Case pages: each section heading, the page figures, and figure cards.
  for (const { page, short, org } of PAGES) {
    const base = slash(page.href)
    const years = yearsOf(page.period)
    page.stats.forEach((s, i) => {
      // The Management "All" stat is shown through its standing sentence below.
      if (s.value === 'All') return
      items.push({
        id: `${page.slug}-stat-${i}`,
        type: 'Figure',
        kicker: short,
        title: s.value,
        text: s.label,
        href: base,
        org,
        period: page.period,
        years,
      })
    })
    for (const section of page.sections) {
      items.push({
        id: `${page.slug}-section-${section.id}`,
        type: 'Case study',
        kicker: `${short} · ${section.eyebrow ?? 'Section'}`,
        title: section.heading,
        text: page.title,
        href: `${base}#${section.id}`,
        org,
        period: page.period,
        years,
      })
      section.blocks.forEach((b, bi) => {
        if (b.type !== 'cards') return
        b.items.forEach((c, ci) => {
          if (!c.value) return
          items.push({
            id: `${page.slug}-${section.id}-${bi}-${ci}`,
            type: 'Figure',
            kicker: `${short} · ${section.heading}`,
            title: c.value,
            text: `${c.title}. ${c.text}`,
            href: `${base}#${section.id}`,
            org,
            period: page.period,
            years,
          })
        })
      })
    }
  }

  // The seven Intuit product areas.
  AREAS.forEach((area) => {
    items.push({
      id: `area-${area.replace(/\s+/g, '-')}`,
      type: 'Area',
      kicker: 'Intuit product area',
      title: area.charAt(0).toUpperCase() + area.slice(1),
      text: `One of the seven product areas of ${AREAS_SENTENCE}`,
      href: '/#management',
      org: 'Intuit',
      period: '2021–2026',
      years: yearsOf('2021–2026'),
    })
  })

  // Management figures from the homepage.
  const mg = { kicker: 'Management', href: '/#management', org: 'Intuit', period: '2024–2026', years: yearsOf('2024–2026') }
  items.push({ id: 'mg-launches', type: 'Figure', title: '24 launches', text: MANAGEMENT.shipped.statement, ...mg })
  items.push({ id: 'mg-lead', type: 'Figure', title: MANAGEMENT.shipped.lead.value, text: `${MANAGEMENT.shipped.lead.label}, ${MANAGEMENT.shipped.lead.text}`, ...mg })
  MANAGEMENT.shipped.figures.forEach((f, i) => items.push({ id: `mg-fig-${i}`, type: 'Figure', title: f.value, text: f.text, ...mg }))
  MANAGEMENT.managed.people.forEach((p, i) =>
    items.push({ id: `mg-people-${i}`, type: 'Figure', title: p.value, text: p.text || MANAGEMENT.heading, ...mg }),
  )

  // Experience rows.
  EXPERIENCE.forEach((row, i) => {
    items.push({
      id: `role-${i}`,
      type: 'Role',
      kicker: `${row.org} · ${row.period}`,
      title: row.title,
      text: row.org,
      href: '/timeline/',
      org: row.org,
      period: row.period,
      years: yearsOf(row.period),
    })
  })

  return items
}

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .split(/[^a-z0-9%]+/)
    .filter(Boolean)
}

interface Prepared {
  item: IndexItem
  title: string[]
  body: string[]
  hay: string
}

export const INDEX: IndexItem[] = build()

const PREPARED: Prepared[] = INDEX.map((item) => {
  const title = tokenize(item.title)
  const body = tokenize(`${item.text} ${item.kicker} ${item.org} ${item.period} ${item.type}`)
  return { item, title, body, hay: [...title, ...body].join(' ') }
})

/** Every query token must match somewhere; title matches weigh most. */
function score(p: Prepared, tokens: string[], phrase: string): number {
  let total = 0
  for (const t of tokens) {
    let s = 0
    if (p.title.includes(t)) s = 6
    else if (p.title.some((w) => w.startsWith(t))) s = 4
    else if (p.body.includes(t)) s = 2
    else if (p.body.some((w) => w.startsWith(t))) s = 1.5
    else if (t.length >= 3 && p.hay.includes(t)) s = 0.5
    if (s === 0) return 0
    total += s
  }
  if (tokens.length > 1 && p.title.join(' ').includes(phrase)) total += 3
  if (p.item.card) total += 1
  return total
}

export interface Filters {
  type?: ResultType
  org?: string
  year?: number
}

function passes(item: IndexItem, f: Filters, skip?: keyof Filters) {
  if (skip !== 'type' && f.type && item.type !== f.type) return false
  if (skip !== 'org' && f.org && item.org !== f.org) return false
  if (skip !== 'year' && f.year && !item.years.includes(f.year)) return false
  return true
}

export const YEARS: number[] = Array.from(new Set(INDEX.flatMap((i) => i.years))).sort((a, b) => b - a)

export interface SearchResult {
  results: IndexItem[]
  counts: { type: Record<string, number>; org: Record<string, number>; year: Record<string, number> }
  tokens: string[]
}

export function search(query: string, f: Filters): SearchResult {
  const tokens = Array.from(new Set(tokenize(query)))
  const phrase = tokens.join(' ')
  const noFilters = !f.type && !f.org && !f.year

  // Matching by query alone, with scores, before facets.
  const matched: { item: IndexItem; s: number; i: number }[] = []
  PREPARED.forEach((p, i) => {
    if (tokens.length === 0) {
      matched.push({ item: p.item, s: 0, i })
      return
    }
    const s = score(p, tokens, phrase)
    if (s > 0) matched.push({ item: p.item, s, i })
  })

  const counts = { type: {} as Record<string, number>, org: {} as Record<string, number>, year: {} as Record<string, number> }
  for (const { item } of matched) {
    if (passes(item, f, 'type')) counts.type[item.type] = (counts.type[item.type] ?? 0) + 1
    if (passes(item, f, 'org')) counts.org[item.org] = (counts.org[item.org] ?? 0) + 1
    if (passes(item, f, 'year')) for (const y of item.years) counts.year[y] = (counts.year[y] ?? 0) + 1
  }

  let results: IndexItem[]
  if (tokens.length === 0 && noFilters) {
    // The default: the four homepage case cards.
    results = INDEX.filter((i) => i.card)
  } else {
    results = matched
      .filter(({ item }) => passes(item, f))
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map(({ item }) => item)
  }
  return { results, counts, tokens }
}

export const SUGGESTIONS = ['lineage', 'agent', '605', 'access', 'promoted', 'precision'] as const

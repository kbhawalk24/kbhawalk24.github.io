import type { Track } from '@/lib/timeline-data'

// The career drawn the way the platform draws data: upstream sources, a
// transform, the materialized asset, what it feeds downstream. Every figure
// here is copied from a case study page or the homepage wheel; none is
// recomputed or rounded. "shared" marks results many teams share.

export type Stage = 'upstream' | 'transform' | 'materialized' | 'downstream'

export const STAGES: { id: Stage; label: string; note: string }[] = [
  { id: 'upstream', label: 'Upstream', note: 'Before Intuit' },
  { id: 'transform', label: 'Transform', note: '2021 to 2024' },
  { id: 'materialized', label: 'Materialized', note: 'The platform today' },
  { id: 'downstream', label: 'Downstream', note: '2024 to 2026' },
]

export interface LineageMetric {
  value: string
  label: string
}

export interface LineageNode {
  id: string
  stage: Stage
  track: Track
  /** Role line above the title, in the track colour. */
  kicker: string
  title: string
  /** One line on the card. */
  line: string
  period: string
  /** The paragraph in the inspect panel. */
  body: string
  metrics: LineageMetric[]
  links: { label: string; href: string }[]
}

export const NODES: LineageNode[] = [
  {
    id: 'tibco',
    stage: 'upstream',
    track: 'ic',
    kicker: 'Software engineer',
    title: 'TIBCO',
    line: 'Three years of back-end Java on an enterprise integration platform.',
    period: 'Before 605',
    body:
      'I was a software engineer before I became a designer: three years at TIBCO writing back-end Java for its enterprise integration platform. Then an MS in Information, Human-Computer Interaction, at the University of Michigan, 2017.',
    metrics: [],
    links: [{ label: 'About me', href: '/about' }],
  },
  {
    id: '605',
    stage: 'upstream',
    track: 'ic',
    kicker: 'First product designer',
    title: '605',
    line: 'Three TV ad-analytics products, from concept to commercial launch.',
    period: 'Oct 2017 to Jun 2021',
    body:
      'First product designer at 605, a TV advertising analytics company, taking three products from concept to commercial launch: multi-audience reports under hard render constraints, an attribute search tool, and the Impact redesign that folded 32 reports into 2 pages.',
    metrics: [
      { value: '3–4 min → 1–1.5 min', label: 'To render a report' },
      { value: '$2M', label: 'Additional booked revenue from pitches that used the new designs, since March 2021' },
      { value: '32 → 2', label: 'Reports into pages, the Impact redesign of 2020' },
    ],
    links: [{ label: '605 TV Analytics', href: '/work/605-tv-analytics' }],
  },
  {
    id: 'founding',
    stage: 'transform',
    track: 'ic',
    kicker: 'Founding designer',
    title: 'A data catalog at Intuit',
    line: 'From tables and columns to the company’s system of record for data.',
    period: 'Jun 2021 to Aug 2024',
    body:
      'Founding designer of Intuit’s internal data catalog, which grew from tables and columns into the company’s system of record for data: the catalog, the Data Map and the first lineage graph, then self-service onboarding and the human-in-the-loop rules that made AI-generated metadata trustworthy. Principal from January 2024.',
    metrics: [
      { value: '68% → 96%', label: 'Searches with a click in the top five, Apr 2022 to Apr 2023' },
      { value: '4 weeks', label: 'From brief to lineage launch' },
      { value: '1–2 weeks → under 24 hours', label: 'To get marketing data onboarded' },
    ],
    links: [
      { label: '0-to-1 Catalog, Data Map & 4-Week Lineage', href: '/work/catalog-data-map-lineage' },
      { label: 'Self-Service Onboarding & Human-in-the-Loop AI Trust', href: '/work/self-service-onboarding' },
    ],
  },
  {
    id: 'platform',
    stage: 'materialized',
    track: 'strategy',
    kicker: 'The data platform',
    title: 'Company-wide infrastructure',
    line: '320,000 tables. 6,673 people a month.',
    period: '2024 to 2026',
    body:
      'Intuit’s enterprise data platform: finding data, getting access, lineage, quality, certification and the agent. I owned data discovery and the platform’s design strategy myself; the team covered the rest.',
    metrics: [
      { value: '320,000', label: 'Tables in the data lake' },
      { value: '1,886 → 2,664', label: 'Monthly users, FY24, by Jul 2024' },
      { value: '6,673', label: 'Monthly users by Mar 2026' },
      { value: '<1% → 80%', label: 'Of the data estate meeting the clean-data standard · shared' },
    ],
    links: [{ label: 'What I owned, at a glance', href: '/#at-a-glance' }],
  },
  {
    id: 'search',
    stage: 'downstream',
    track: 'ic',
    kicker: 'Principal IC → Design Manager',
    title: 'Search 2.0 & Data Collections',
    line: 'First result correct: 81.31% → 89.24%.',
    period: '2024 to 2025',
    body:
      'The search rebuilt for a platform of data products, and Collections, a person’s saved working set of data. Designed as a principal, shipped by the team after I became its manager.',
    metrics: [
      { value: '81.31% → 89.24%', label: 'First result correct' },
      { value: '50.59 s → 1.93 s', label: 'For 99 in 100 searches' },
      { value: '10,000 · 460,000', label: 'Data products and attributes searchable' },
    ],
    links: [{ label: 'Search 2.0 & Data Collections', href: '/work/search-2' }],
  },
  {
    id: 'agent',
    stage: 'downstream',
    track: 'strategy',
    kicker: 'Principal strategy & spec · Design Manager',
    title: 'Agentic discovery in Cursor & Claude',
    line: 'From a question to an answer: 45 min → 4 min.',
    period: '2025 to 2026',
    body:
      'Data discovery moved into the tools people already work in, as an agent with the platform’s search, lineage and access as its tools. I wrote the strategy and the specification; the team and engineering shipped it.',
    metrics: [
      { value: '45 min → 4 min', label: 'From a question to an answer' },
      { value: '711', label: 'Active users' },
      { value: '56,560', label: 'Tool calls in 90 days' },
    ],
    links: [{ label: 'Agentic Discovery in Cursor & Claude', href: '/work/agentic-discovery' }],
  },
  {
    id: 'team',
    stage: 'downstream',
    track: 'management',
    kicker: 'Product Design Manager',
    title: 'The team, at 1:85',
    line: 'One designer for every 85 engineers. Every direct report promoted.',
    period: 'Aug 2024 to Jul 2026',
    body:
      'Led UX strategy and the product designers for Intuit’s enterprise data platform: data discovery and search, access and governance, lineage, observability, data quality standards, and pipeline authoring. Every designer who reported to me was promoted while on my team.',
    metrics: [
      { value: 'All', label: 'Designers who reported to me, promoted' },
      { value: '17 → 0', label: 'Peak-season P0/P1 data incidents · shared' },
      { value: '2–3 weeks → 3 days', label: 'To get access to real-time data' },
    ],
    links: [
      { label: 'Scaling Platform Design at a 1:85 Ratio', href: '/work/scaling-platform-design' },
      { label: 'How I manage', href: '/about#how-i-manage' },
    ],
  },
]

/** Directed edges, source to target. */
export const EDGES: [string, string][] = [
  ['tibco', 'founding'],
  ['605', 'founding'],
  ['founding', 'platform'],
  ['platform', 'search'],
  ['platform', 'agent'],
  ['platform', 'team'],
]

export const DEFAULT_NODE = 'platform'

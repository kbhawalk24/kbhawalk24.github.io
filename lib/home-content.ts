import type { Track } from '@/lib/timeline-data'
import { TINTS } from '@/lib/tint'

// The homepage's words: the work grouped into three arcs, each with one
// case study shown as a full-width card.

export interface CardStat {
  value: string
  label: string
}

export interface WorkCard {
  slug: string
  title: string
  period: string
  roleTag: string
  /** Where the work was done, shown above the title. */
  org: string
  /** The kind of work, for the accent colour. */
  track: Track
  /** Two or three words a recruiter scans for, shown as the card's pill. */
  role: string
  /** What the cover will show once it exists; read out for the placeholder. */
  visualNote: string
  /** The cover image, once it exists. */
  /** The thumbnail screenshot, shown whole on the card's tinted panel. With
   *  `video`, a muted looping clip plays over it while the card is on screen;
   *  `src` is then the clip's poster and must share its aspect ratio. */
  cover?: { src: string; alt: string; video?: string; width?: number; height?: number; tint: string }
  /** One line of plain text under the title. */
  line: string
  /** The sticky on the thumbnail: what to read this one for. */
  note?: string
  /** One measured outcome per card. */
  stats: [CardStat]
  status: 'coming-soon' | 'live'
  /** The page, once it exists. */
  href?: string
}

export interface Arc {
  id: string
  heading: string
  period: string
  thesis?: string
  cards: WorkCard[]
}

export const ARCS: Arc[] = [
  {
    id: 'discovery',
    heading: 'Data discovery',
    period: '2023–2026',
    cards: [
      {
        slug: 'search-2',
        org: 'Intuit',
        title: 'Rebuilding search for Intuit’s data catalog',
        period: '2024–2025',
        roleTag: 'Principal Product Designer',
        role: 'Principal designer',
        track: 'ic',
        line:
          'Data workers were stitching together six tools to verify one table, because search returned millions of unranked results. After shadowing 20 of them and analysing 1,392 questions from the help channel, I redesigned search around physical object types, dynamic facets and strict trust signals.',
        visualNote: 'The Search 2.0 design for table results.',
        cover: {
          src: '/work/search-2/tables-tab-design.jpg',
          tint: TINTS.search2design,
          alt: 'The Search 2.0 design for table results, with tabs per object type, facets on the left and metadata on every result',
        },
        stats: [{ value: '81.31% → 89.24%', label: 'Precision of the first result; P99 latency 50.59 s → 1.93 s; discovery time 14.2 h → 9.4 h' }],
        status: 'live',
        href: '/work/search-2',
      },
      {
        slug: 'agentic-discovery',
        org: 'Intuit',
        title: 'The evolution of the data agent at Intuit over three years',
        period: '2023–2026',
        roleTag: 'Principal Product Designer → Design Manager',
        role: 'Principal designer, then design manager',
        track: 'strategy',
        line:
          'From a copilot in a browser tab that turned questions into SQL, to an agent inside Cursor and Claude that reads a person’s Collections first and shows its query before it runs.',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        cover: {
          src: '/work/agentic-discovery/hero-poster.jpg',
          video: '/work/agentic-discovery/hero.mp4',
          tint: TINTS.neutral,
          width: 1340,
          height: 994,
          alt: 'The agent inside Cursor finding tables, writing a query and showing it before running it',
        },
        stats: [{ value: '45 min → 4 min', label: 'From a question to a verified answer' }],
        status: 'live',
        href: '/work/agentic-discovery',
      },
    ],
  },
  {
    id: 'platform',
    heading: 'The data platform',
    period: '2021–2026',
    cards: [
      {
        slug: 'catalog-data-map-lineage',
        org: 'Intuit',
        title: 'Replacing a commercial catalog with Intuit’s own, 2021 to 2026',
        period: '2021–2026',
        roleTag: 'Founding Product Designer → Principal → Design Manager',
        role: 'Founding designer',
        track: 'ic',
        line:
          'Five years from a list of table names to the platform Intuit showed on stage at AWS re:Invent: signals to judge a table, the data product model, lineage in four weeks, onboarding teams run themselves.',
        visualNote: 'A data product page in the 2026 platform.',
        cover: {
          src: '/work/catalog-data-map-lineage/hero-poster.jpg',
          video: '/work/catalog-data-map-lineage/hero.mp4',
          tint: TINTS.platform2026,
          width: 1600,
          height: 872,
          alt: 'The data discovery platform: the home page, then a table page with its columns, owners and statistics',
        },
        stats: [{ value: '1,886 → 6,673', label: 'People using the platform each month, Jul 2023 to Mar 2026, across 320,000 tables' }],
        status: 'live',
        href: '/work/catalog-data-map-lineage',
      },
    ],
  },
  {
    id: 'early',
    heading: 'Before Intuit',
    period: '2017–2021',
    cards: [
      {
        slug: '605-tv-analytics',
        org: '605',
        title: 'Designing three TV analytics products at 605',
        period: '2017–2021',
        roleTag: 'First Product Designer',
        role: 'First designer',
        track: 'ic',
        line:
          'Three analytics products from first concept to launch, and the rule that made them work: design to the common case, not the limit.',
        visualNote: 'The 605 Platform main dashboard.',
        cover: {
          src: '/work/605-tv-analytics/hero-poster.jpg',
          video: '/work/605-tv-analytics/hero.mp4',
          tint: TINTS.platform605,
          width: 1440,
          height: 820,
          alt: 'The 605 Platform main dashboard: networks by rating, household reach and time-shifted viewing',
        },
        stats: [{ value: '$2M', label: 'Additional booked revenue from pitches on the new designs' }],
        status: 'live',
        href: '/work/605-tv-analytics',
      },
    ],
  },
]


// Leadership: its own section after Selected work, not a case-study card.
// The link goes to the Leadership page.

export const LEADERSHIP = {
  heading: 'Leadership',
  text: 'From 2024 to 2026 I managed the designers behind Intuit’s enterprise data platform while staying inside the technical work: one research repository in Marvin, one intake tracker, and every designer who reported to me was promoted.',
  stats: [
    { value: '1 : 85', label: 'Designers to engineers across the data design group' },
    { value: '2,664 → 6,673', label: 'Monthly users of the platform, Jul 2024 to Mar 2026 · shared' },
  ],
  link: { label: 'How I led the team', href: '/leadership' },
} as const

// The hero's words and the Intuit chapter diagram under it.

export const HERO = {
  /** The intro: the fields are set in the accent colour. */
  intro: {
    before: 'I’m a product design leader with 12+ years of experience shaping ',
    fields: 'developer platforms, agentic AI and enterprise data systems',
    after: '. I started as a backend software engineer, so I take platform work from the API up to the interface people use, and work with engineers as a technical peer.',
  },
  /** The history as one paragraph, one sentence per employer. */
  history: [
    {
      org: 'Intuit',
      before: 'Most recently at ',
      after: ', from 2021 to 2026, my work came in three parts:',
      /** The three phrases set in the accent colour match the three groups under Selected work. */
      pills: [{ label: 'data discovery' }, { label: 'the data platform' }, { label: 'leading the design team' }],
      tail: '. The platform had nine product areas and I designed, or directed the design of, every one: finding and understanding data, access, lineage, health monitoring, reliability, usage tracking, pipeline authoring, publishing and ingestion.',
    },
    {
      org: '605',
      before: 'Before that, at ',
      after: ', from 2017 to 2021, I designed three TV analytics products from scratch.',
    },
  ],
}

export const INTUIT_CHAPTER = {
  eyebrow: 'Inside the Intuit chapter',
  heading: 'What I owned, and what I led the team through.',
  text: 'Two areas were mine end to end. Six more ran through my team as design manager, from instrumentation at the source to access control at the edge.',
  pill: { initial: 'K', text: 'Led design for the core Data Platform', meta: 'Intuit 2021–2026' },
  owned: {
    label: 'Personally owned',
    meta: 'hands-on',
    items: [
      {
        title: 'Data discovery',
        icon: 'search',
        tone: 'ic',
        text: 'Catalog & search, Data Map, plain-language assistant, lineage views, the agent in Cursor & Claude.',
        href: '#search-2',
      },
      {
        title: 'Platform design strategy',
        icon: 'compass',
        tone: 'strategy',
        text: 'Clean-data standard, fine-grained access model, and agentic AI & MCP workflows across the platform.',
        href: '#agentic-discovery',
      },
    ],
  },
  directed: {
    label: 'Directed the team across',
    meta: 'as design manager',
    items: [
      { title: 'Pipeline authoring', icon: 'workflow', text: 'Batch & stream' },
      { title: 'Observability', icon: 'activity', text: 'Quality checks, reliability & monitoring' },
      { title: 'Lineage', icon: 'git-fork', text: 'Upstream & downstream impact' },
      { title: 'Governance', icon: 'shield-check', text: 'Scoring, certification, standards' },
      { title: 'Fine-grained access control', icon: 'key-round', text: 'Requests, policies & approvals' },
      { title: 'Instrumentation', icon: 'chart-column', text: 'Event capture & data product onboarding' },
    ],
  },
} as const

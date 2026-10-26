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
  /** The kind of work, shown as the card's pill. */
  track: Track
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
    heading: 'Data discovery: search, then an agent',
    period: '2021–2026',
    thesis:
      'Five years of data discovery across a data lake of 320,000 tables: keyword search, then a plain-language assistant, then an agent inside Cursor and Claude.',
    cards: [
      {
        slug: 'search-2',
        org: 'Intuit',
        title: 'Search 2.0: redesigning search for the data catalog',
        period: '2024–2025',
        roleTag: 'Principal Product Designer',
        track: 'ic',
        note: 'Read this for how I take research to roadmap to shipped work.',
        line:
          'Twenty people watched searching for data, 1,392 help-channel questions, a specification, and eight findings that became eight launches.',
        visualNote: 'The Search 2.0 design for table results.',
        cover: {
          src: '/work/search-2/tables-tab-design.jpg',
          tint: TINTS.search2design,
          alt: 'The Search 2.0 design for table results, with tabs per object type, facets on the left and metadata on every result',
        },
        stats: [{ value: '14.2 h → 9.4 h', label: 'Time to discover data, for 6,673 people a month' }],
        status: 'live',
        href: '/work/search-2',
      },
      {
        slug: 'agentic-discovery',
        org: 'Intuit',
        title: 'Building the data discovery agent for Cursor and Claude',
        period: '2023–2026',
        roleTag: 'Principal Product Designer → Design Manager',
        track: 'strategy',
        note: 'Read this for design strategy on agentic data discovery.',
        line:
          'An assistant that shipped before its search could support it, a saved working set of data, the specification for how the agent answers, and the question of where it sits in the catalog.',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        cover: {
          src: '/work/agentic-discovery/hero-poster.jpg',
          video: '/work/agentic-discovery/hero.mp4',
          tint: TINTS.neutral,
          width: 1340,
          height: 994,
          alt: 'The agent inside Cursor finding tables, writing a query and showing it before running it',
        },
        stats: [{ value: '45 min → 4 min', label: 'From a question to an answer' }],
        status: 'live',
        href: '/work/agentic-discovery',
      },
    ],
  },
  {
    id: 'platform',
    heading: 'The data discovery platform',
    period: '2021–2026',
    thesis:
      'I joined Intuit as the catalog’s founding designer. By 2026 it was the platform 6,673 people a month use to find data, trace its lineage, get access to it and check it against the clean-data standard.',
    cards: [
      {
        slug: 'catalog-data-map-lineage',
        org: 'Intuit',
        note: 'Read this to see how I grew a product into a platform over five years.',
        title: 'Building the data discovery platform, 2021 to 2026',
        period: '2021–2026',
        roleTag: 'Founding Product Designer → Principal → Design Manager',
        track: 'ic',
        line:
          'One layer at a time: signals to judge a table, the Data Map, lineage in four weeks, AI-written metadata people could correct, and self-service onboarding.',
        visualNote: 'A data product page in the 2026 platform.',
        cover: {
          src: '/work/catalog-data-map-lineage/hero-poster.jpg',
          video: '/work/catalog-data-map-lineage/hero.mp4',
          tint: TINTS.platform2026,
          width: 1600,
          height: 870,
          alt: 'The data discovery platform: search with a maturity score, then a realtime data product page',
        },
        stats: [{ value: '68% → 96%', label: 'Searches with a click in the top five' }],
        status: 'live',
        href: '/work/catalog-data-map-lineage',
      },
    ],
  },
  {
    id: 'team',
    heading: 'Leading design for the data platform',
    period: '2024–2026',
    thesis:
      'From August 2024 I managed the designers for the platform’s nine product areas, one designer for every 85 engineers, and kept designing myself.',
    cards: [
      {
        slug: 'leading-the-team',
        org: 'Intuit',
        title: 'Leading design for the data platform, 2024 to 2026',
        period: '2024–2026',
        roleTag: 'Design Manager',
        track: 'management',
        line:
          'Where I spent my time, one intake and one research base for nine areas, AI tools in my own work first, what the team shipped, and every designer promoted.',
        visualNote: 'The design project tracker.',
        cover: {
          src: '/work/leading-the-team/tracker-2025.jpg',
          tint: TINTS.platform2026,
          width: 2000,
          height: 1087,
          alt: 'The design project tracker: every design request across nine product areas with its status and designer',
        },
        stats: [{ value: '1 : 85', label: 'Designers to engineers across nine product areas' }],
        status: 'live',
        href: '/work/leading-the-team',
      },
    ],
  },
  {
    id: 'early',
    heading: 'Before Intuit: 605',
    period: '2017–2021',
    cards: [
      {
        slug: '605-tv-analytics',
        org: '605',
        note: 'Read this for zero-to-one products and data visualisation craft.',
        title: 'Designing three TV analytics products at 605',
        period: '2017–2021',
        roleTag: 'First Product Designer',
        track: 'ic',
        line:
          'Three TV advertising analytics products, from first concept to commercial launch.',
        visualNote: 'The 15-target chart beside the shipped 5-target comparison chart in 605 Platform.',
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


// The hero's words and the Intuit chapter diagram under it.

export const HERO = {
  /** The intro: the fields are set in the accent colour. */
  intro: {
    before: 'I’m a product design leader with 12+ years of experience turning complex data infrastructure into tools people trust and use. I started as a backend software engineer, which means I’m happiest untangling messy systems, debating trade-offs with engineers, and designing ',
    fields: 'AI workflows that go deeper than a chat box',
    after: '.',
  },
  /** The history as one paragraph, one sentence per employer. */
  history: [
    {
      org: 'Intuit',
      before: 'Most recently at ',
      after: ', from 2021 to 2026, I led Data Platform design, owning',
      /** The three phrases set in the accent colour; they do not link anywhere. */
      pills: [{ label: 'data discovery' }, { label: 'platform strategy' }, { label: 'leading the team' }],
      tail: ' across pipeline authoring, observability, lineage, governance, fine-grained access control and instrumentation.',
    },
    {
      org: '605',
      before: 'Before that, at ',
      after: ', from 2017 to 2021, I designed three 0-to-1 TV analytics products that brought in more than $20M in new revenue.',
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

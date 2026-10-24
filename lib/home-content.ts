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
  /** Instead of one outcome: the same journey measured at three moments.
   *  Each step keeps its own label, because they are not one metric. */
  journey?: { when: string; value: string; label: string }[]
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
    heading: 'Data discovery, from keywords to coding agents',
    period: '2021–2026',
    thesis:
      'I led data discovery for five years across a data lake of 320,000 tables and the data products built on it, from keyword search to a plain-language assistant, and then to an agent inside Cursor and Claude.',
    cards: [
      {
        slug: 'search-2',
        org: 'Intuit',
        title: 'Search 2.0: making the catalog carry the proof people got from colleagues',
        period: '2024–2025',
        roleTag: 'Principal Product Designer',
        track: 'ic',
        note: 'Read this for how I take research to roadmap to shipped work.',
        line:
          'Twenty people followed through a search, a case made to the roadmap, eight findings that became eight launches, and the object model the team and the agent still run on.',
        visualNote: 'The Search 2.0 design for table results.',
        cover: {
          src: '/work/search-2/tables-tab-design.jpg',
          tint: TINTS.dde2023,
          alt: 'The Search 2.0 design for table results, with tabs per object type, facets on the left and metadata on every result',
        },
        stats: [{ value: '14.8 h → 9.4 h', label: 'Time to discover data, for 6,673 people a month' }],
        status: 'live',
        href: '/work/search-2',
      },
      {
        slug: 'agentic-discovery',
        org: 'Intuit',
        title: 'Finding data: from an assistant to an agent',
        period: '2023–2026',
        roleTag: 'Principal Product Designer → Design Manager',
        track: 'strategy',
        note: 'Read this for design strategy on agentic data discovery.',
        line:
          'An assistant that came too early, a place to keep the data people reuse, the specification for how an agent inside Cursor and Claude answers, and the question of where it should live next.',
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
        journey: [
          { when: '2023', value: '20 days', label: 'To find, get access to and explore data' },
          { when: '2025', value: '9.4 hours', label: 'To discover data, after Search 2.0' },
          { when: '2026', value: '4 minutes', label: 'From a question to an answer, with the agent' },
        ],
        status: 'live',
        href: '/work/agentic-discovery',
      },
    ],
  },
  {
    id: 'platform',
    heading: 'The data platform, built from a list of tables',
    period: '2021–2026',
    thesis:
      'I joined Intuit as the catalog’s founding designer and later led its design team, as it grew into the platform 6,673 people a month use to find data, trace its lineage, get access to it and check it against the clean-data standard.',
    cards: [
      {
        slug: 'catalog-data-map-lineage',
        org: 'Intuit',
        note: 'Read this to see how I grew a product into a platform over five years.',
        title: 'The catalog: from a list of tables to a platform',
        period: '2021–2026',
        roleTag: 'Founding Product Designer → Principal → Design Manager',
        track: 'ic',
        line:
          'Five years of building it one layer at a time: the Data Map, lineage in four weeks, AI-written metadata people could correct, and self-service onboarding.',
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
    id: 'early',
    heading: 'Before Intuit: three products at 605',
    period: '2017–2021',
    cards: [
      {
        slug: '605-tv-analytics',
        org: '605',
        note: 'Read this for zero-to-one products and data visualisation craft.',
        title: '605 TV Analytics: Multi-Audience Reports Under Render Constraints',
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
  eyebrow: 'Product Design Manager & Principal IC',
  /** The intro: the fields are set in the accent colour. */
  intro: {
    before: 'I’m a technical design leader specializing in ',
    fields: 'AI, enterprise data platforms, and developer tools',
    after: '. With roots as a backend engineer, I thrive in the deep end of technical complexity, both as a hands-on Principal Designer and a team manager.',
  },
  history: [
    {
      org: 'Intuit',
      period: '2021–26',
      text: 'Led Data Platform design. Owned',
      /** Pills inside the line, each scrolling to a work card. */
      pills: [
        { label: 'data discovery', href: '#search-2' },
        { label: 'platform strategy', href: '#agentic-discovery' },
      ],
      tail: '.',
    },
    { org: '605', period: '2017–21', text: 'Three 0-to-1 TV analytics products;', strong: '$20M+', tail: ' new revenue.' },
    { org: 'TIBCO', period: '2012–15', text: 'Backend Java on an enterprise integration platform.' },
  ],
  exploring: { label: 'Exploring', text: 'Principal or Design Management roles · Bay Area · AI, data, dev tools' },
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

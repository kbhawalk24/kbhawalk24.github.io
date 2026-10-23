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
    heading: 'Data discovery, from keywords to coding agents',
    period: '2021–2026',
    thesis:
      'I led data discovery for five years across a data lake of 320,000 tables and the data products built on it, from keyword search to a plain-language assistant, and then to an agent inside Cursor and Claude.',
    cards: [
      {
        slug: 'agentic-discovery',
        org: 'Intuit',
        title: 'Finding data: from search to an agent',
        period: '2023–2026',
        roleTag: 'Principal Product Designer → Design Manager',
        track: 'strategy',
        line:
          'An assistant that came before search was precise, the search rebuild that fixed it, and the agent inside Cursor and Claude.',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        cover: {
          src: '/work/agentic-discovery/copilot-ask.jpg',
          video: '/work/agentic-discovery/copilot-thumb.mp4',
          tint: TINTS.dde2023,
          width: 1280,
          height: 906,
          alt: 'Data Copilot beside a table page, answering a question with a SQL query and an explanation',
        },
        stats: [{ value: '45 min → 4 min', label: 'From a question to an answer' }],
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
          alt: 'The data discovery platform: a table’s lineage graph, search with a maturity score, and a realtime data product',
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


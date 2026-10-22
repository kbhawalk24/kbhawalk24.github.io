import type { Track } from '@/lib/timeline-data'

// The homepage's words: the work grouped into three strategic arcs, and
// page exists its status is 'coming-soon' and it does not link.

export interface CardStat {
  value: string
  label: string
}

export interface WorkCard {
  slug: string
  title: string
  period: string
  roleTag: string
  /** The kind of work, shown as the card's pill. */
  track: Track
  /** What the cover will show once it exists; read out for the placeholder. */
  visualNote: string
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
        title: 'Agentic Discovery in Cursor & Claude',
        period: '2025–2026',
        roleTag: 'Principal Strategy & Spec · Design Manager',
        track: 'strategy',
        line:
          'The catalog moved into Cursor and Claude, with the platform’s search, lineage and access as the agent’s tools.',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        stats: [{ value: '45 min → 4 min', label: 'From a question to an answer' }],
        status: 'live',
        href: '/work/agentic-discovery',
      },
      {
        slug: 'search-2',
        title: 'Search 2.0 & Data Collections',
        period: '2024–2025',
        roleTag: 'Principal IC → Design Manager',
        track: 'ic',
        line:
          'Search rebuilt around four rules from research with 20 catalog users, and Collections, a person’s saved working set of data.',
        visualNote: 'Six object-type tabs and the five-line result card anatomy.',
        stats: [{ value: '81.31% → 89.24%', label: 'First result correct' }],
        status: 'live',
        href: '/work/search-2',
      },
    ],
  },
  {
    id: 'platform',
    heading: 'Building the data platform and scaling its design team',
    period: '2021–2026',
    thesis:
      'I joined as the founding designer and became the design manager of the platform 6,673 people a month use to find data, model it on the Data Map, trace its lineage, get access to it and know whether it meets the clean-data standard.',
    cards: [
      {
        slug: 'scaling-platform-design',
        title: 'Scaling Platform Design at a 1:85 Ratio',
        period: '2024–2026',
        roleTag: 'Product Design Manager',
        track: 'management',
        line:
          'One designer for every 85 engineers, and the mechanisms that made the ratio work.',
        visualNote: 'An anonymized platform launch map beside the team project intake tracker.',
        stats: [{ value: '<1% → 80%', label: 'Of the data estate meeting the clean-data standard · shared' }],
        status: 'live',
        href: '/work/scaling-platform-design',
      },
      {
        slug: 'self-service-onboarding',
        title: 'Self-Service Onboarding & Human-in-the-Loop AI Trust',
        period: '2023–2024',
        roleTag: 'Principal IC',
        track: 'ic',
        line:
          'AI fills the request up front, and a person stays at the review step for AI-generated metadata.',
        visualNote: 'Three onboarding flow iterations side by side.',
        stats: [{ value: '1–2 weeks → under 24 hours', label: 'To get marketing data onboarded' }],
        status: 'live',
        href: '/work/self-service-onboarding',
      },
      {
        slug: 'catalog-data-map-lineage',
        title: '0-to-1 Catalog, Data Map & 4-Week Lineage',
        period: '2021–2023',
        roleTag: 'Founding Senior IC',
        track: 'ic',
        line:
          'From a list of tables to a map of data products with lineage beneath it, replacing the commercial catalog.',
        visualNote: 'The Data Product object model: batch, stream and marketing copies beneath a business concept.',
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
        title: '605 TV Analytics: Multi-Audience Reports Under Render Constraints',
        period: '2017–2021',
        roleTag: 'First Product Designer',
        track: 'ic',
        line:
          'Three TV advertising analytics products, from first concept to commercial launch.',
        visualNote: 'The 15-target chart beside the shipped 5-target comparison chart in 605 Platform.',
        stats: [{ value: '$2M', label: 'Additional booked revenue from pitches on the new designs' }],
        status: 'live',
        href: '/work/605-tv-analytics',
      },
    ],
  },
]


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
  /** What the cover will show once it exists; read out for the placeholder. */
  visualNote: string
  /** One optional line of plain text under the title. */
  line?: string
  stats: CardStat[]
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
      'I led data discovery across 180 petabytes of data for five years, from keyword search to a chat assistant people did not come back to, and then to the catalog inside Cursor and Claude.',
    cards: [
      {
        slug: 'agentic-discovery',
        title: 'Agentic Discovery in Cursor & Claude',
        period: '2025–2026',
        roleTag: 'Principal Strategy & Spec · Design Manager',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        stats: [
          { value: '45 min → 4 min', label: 'From a question to an answer' },
          { value: '711', label: 'Active users · 56,560 tool calls in 90 days' },
        ],
        status: 'live',
        href: '/work/agentic-discovery',
      },
      {
        slug: 'search-2',
        title: 'Search 2.0 & Data Collections',
        period: '2024–2025',
        roleTag: 'Principal IC → Design Manager',
        visualNote: 'Six object-type tabs and the five-line result card anatomy.',
        stats: [
          { value: '81.31% → 89.24%', label: 'First result correct' },
          { value: '50.59 s → 1.93 s', label: 'For 99 in 100 searches' },
        ],
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
        visualNote: 'An anonymized platform launch map beside the team project intake tracker.',
        stats: [
          { value: '<1% → 80%', label: 'Of the data estate meeting the clean-data standard · shared' },
          { value: 'All', label: 'Direct reports promoted' },
        ],
        status: 'live',
        href: '/work/scaling-platform-design',
      },
      {
        slug: 'self-service-onboarding',
        title: 'Self-Service Onboarding & Human-in-the-Loop AI Trust',
        period: '2023–2024',
        roleTag: 'Principal IC',
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
        visualNote: 'The Data Product object model: batch, stream and marketing copies beneath a business concept.',
        line: 'Commercial catalog retired in FY23.',
        stats: [
          { value: '68% → 96%', label: 'Searches with a click in the top five' },
          { value: '4 weeks', label: 'From brief to lineage launch' },
        ],
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
        visualNote: 'The 15-target chart beside the shipped 5-target comparison chart in 605 Platform.',
        stats: [
          { value: '3–4 min → 1–1.5 min', label: 'To render a report' },
          { value: '$2M', label: 'Additional booked revenue from pitches on the new designs' },
        ],
        status: 'live',
        href: '/work/605-tv-analytics',
      },
    ],
  },
]


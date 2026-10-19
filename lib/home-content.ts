// The homepage's words: the work grouped into three strategic arcs, and
// the "How I lead" pointer. Card pages arrive step by step; until a card's
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
    heading: 'Evolving Enterprise Data Discovery from Keywords to Coding Agents',
    period: '2021–2026',
    thesis:
      'How I led the 5-year evolution of data discovery across 320,000 tables: learning why standalone chatbots failed and moving the catalog directly into Cursor and Claude.',
    cards: [
      {
        slug: 'agentic-discovery',
        title: 'Agentic Discovery in Cursor & Claude',
        period: '2025–2026',
        roleTag: 'Principal Strategy & Spec · Design Manager',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        stats: [
          { value: '45 min → 4 min', label: 'Time to insight' },
          { value: '711', label: 'Active users · 56,560 tool calls' },
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
          { value: '81.31% → 89.24%', label: 'First-result precision' },
          { value: '50.59s → 1.93s', label: 'P99 latency' },
        ],
        status: 'live',
        href: '/work/search-2',
      },
    ],
  },
  {
    id: 'platform',
    heading: 'Architecting the Data Platform & Scaling the Team at a 1:85 Ratio',
    period: '2021–2026',
    thesis:
      'Unifying data modeling (Data Map), clean-data quality standards, lineage, and access into a single platform used by 6,673 monthly users: first as founding IC designer, then as Design Manager across 9 product areas.',
    cards: [
      {
        slug: 'scaling-platform-design',
        title: 'Scaling Platform Design at a 1:85 Ratio',
        period: '2024–2026',
        roleTag: 'Product Design Manager',
        visualNote: 'An anonymized platform launch map beside the team project intake tracker.',
        stats: [
          { value: '<1% → 80%', label: 'Certified clean data across the estate' },
          { value: '17 → 0', label: 'Serious TY25 tax-season incidents' },
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
        stats: [{ value: '1–2 weeks → under 24 hours', label: 'Marketing data onboarding' }],
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
          { value: '68% → 96%', label: 'Top-5 click-through' },
          { value: '30K tables', label: 'Lineage MVP in 4 weeks' },
        ],
        status: 'live',
        href: '/work/catalog-data-map-lineage',
      },
    ],
  },
  {
    id: 'early',
    heading: 'Early 0-to-1 Craft & Data Visualization',
    period: '2017–2021',
    cards: [
      {
        slug: '605-tv-analytics',
        title: '605 TV Analytics: Multi-Audience Reports Under Render Constraints',
        period: '2017–2021',
        roleTag: 'First Product Designer',
        visualNote: 'The 15-target chart beside the shipped 5-target comparison chart in 605 Platform.',
        stats: [
          { value: '3–4 min → 1–1.5 min', label: 'Render latency' },
          { value: '$2M', label: 'Additional booked revenue from client pitches ($20M+ on Platform)' },
        ],
        status: 'live',
        href: '/work/605-tv-analytics',
      },
    ],
  },
]

export const HOW_I_LEAD = {
  heading: 'How I lead',
  framing:
    'Operating in an enterprise data organization with one designer for every 85 engineers taught me that a manager cannot scale by reviewing screens or routing tickets. How I manage, and how I work with AI, are on the About page.',
  links: [
    { label: 'How I manage', href: '/about#how-i-manage' },
    { label: 'How I work with AI', href: '/about#how-i-work-with-ai' },
  ],
}

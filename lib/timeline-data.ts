export type Track = 'management' | 'strategy' | 'ic'

export const TRACKS: Record<
  Track,
  { label: string; short: string; description: string }
> = {
  management: {
    label: 'Design Management',
    short: 'MGMT',
    description: 'Leading teams, talent development, and operational scale',
  },
  strategy: {
    label: 'Design Strategy',
    short: 'STRAT',
    description: 'Vision, roadmaps, and architectural direction',
  },
  ic: {
    label: 'IC Craft',
    short: 'IC',
    description: 'Hands-on design execution, shipped end to end',
  },
}

/** One measured outcome. Value short (a number, a before → after); the
 *  label says what was measured and when. `shared` marks a result many
 *  teams share. */
export interface TimelineImpact {
  value: string
  label: string
  shared?: boolean
}

export interface TimelineEntry {
  /** The kind of work. Absent for roles outside design (TIBCO), which use `tag`. */
  track?: Track
  /** Neutral pill text when there is no track. */
  tag?: string
  headline: string
  detail: string
  /** At most one per entry; entries without a measured outcome have none. */
  impact?: TimelineImpact
  /** Where this entry is told in full. */
  href?: string
}

export interface TimelineRole {
  id: string
  period: string
  startYear: string
  title: string
  company: string
  /** Optional wordmark shown instead of the plain company name. */
  companyLogo?: string
  location: string
  summary: string
  /** Set when a date or fact still needs the user's confirmation. */
  note?: string
  entries: TimelineEntry[]
}

/**
 * Every figure here is copied from a case study page or the About page,
 * unrounded, with its date where one exists. No headcount on the Intuit
 * roles; reports are never named.
 */
export const ROLES: TimelineRole[] = [
  {
    id: 'intuit-manager',
    period: 'Aug 2024 – Jul 2026',
    startYear: '2024',
    title: 'Product Design Manager',
    company: 'Intuit',
    companyLogo: '/images/intuit-logo.jpg',
    location: 'Mountain View, CA',
    summary:
      'Led UX strategy and the product designers for Intuit’s enterprise data platform: data discovery and search, access and governance, lineage, observability, data quality standards, and pipeline authoring.',
    entries: [
      {
        track: 'management',
        headline: 'Scaled the platform into company-wide infrastructure',
        detail: 'From a single-team discovery tool to the default way Intuit finds, trusts, and gets data.',
        impact: { value: '2,664 → 6,673', label: 'Monthly users, Jul 2024 to Mar 2026' },
        href: '/work/scaling-platform-design',
      },
      {
        track: 'management',
        headline: 'Every designer who reported to me was promoted',
        detail:
          'A 2023 intern I had managed joined the team full-time; the team began a design sign-off before release that engineering adopted.',
        impact: { value: 'All', label: 'Direct reports promoted' },
        href: '/work/scaling-platform-design',
      },
      {
        track: 'management',
        headline: 'My team redesigned how people get access to data',
        detail:
          'Tables and encrypted columns in one request; real-time data in 3 days instead of 2 to 3 weeks, with 61% of requests approved automatically.',
        impact: { value: '9 → 3 days', label: 'Tables and encrypted columns, Aug 2025' },
        href: '/work/scaling-platform-design',
      },
      {
        track: 'strategy',
        headline: 'Set the design strategy for the clean-data standard',
        detail:
          'The same steps for every way data is produced and the same display of maturity for producers and consumers; peak-season P0 and P1 incidents fell from 17 to 0, a result many teams share.',
        impact: { value: '<1% → 80%', label: 'Of the data estate meeting the standard', shared: true },
        href: '/work/scaling-platform-design',
      },
      {
        track: 'strategy',
        headline: 'Moved discovery into the coding agent',
        detail:
          'The catalog inside Cursor and Claude instead of a better chat; I wrote the strategy and the specification. 711 active users in the first 90 days.',
        impact: { value: '45 min → 4 min', label: 'From a question to an answer' },
        href: '/work/agentic-discovery',
      },
      {
        track: 'strategy',
        headline: 'Argued two features onto the roadmap',
        detail:
          'Query insights and Collections, which the engineering manager wrote would not have happened without design sponsorship.',
        href: '/work/scaling-platform-design',
      },
    ],
  },
  {
    id: 'intuit-principal',
    period: 'Jan 2024 – Aug 2024',
    startYear: '2024',
    title: 'Principal Product Designer',
    company: 'Intuit',
    companyLogo: '/images/intuit-logo.jpg',
    location: 'Mountain View, CA',
    summary:
      'Principal-level IC owning search, discoverability, and data trust across the platform, plus the research that set the next year’s roadmap.',
    entries: [
      {
        track: 'ic',
        headline: 'Designed search rebuilt on meaning',
        detail:
          'Semantic search for tables and the Data Map, around four rules from research with 20 catalog users; the slowest searches went from 50.59 seconds to 1.93.',
        impact: { value: '81.31% → 89.24%', label: 'First result correct' },
        href: '/work/search-2',
      },
      {
        track: 'ic',
        headline: 'Shipped the self-service onboarding flow',
        detail:
          'AI pre-fills the form and validates up front, with a person kept at the review step for AI-generated metadata.',
        impact: { value: '1–2 weeks → under 24 hours', label: 'To onboard marketing data' },
        href: '/work/self-service-onboarding',
      },
      {
        track: 'ic',
        headline: 'Made complex data marts discoverable',
        detail: 'Re-architected the catalog for the new data-product model.',
        impact: { value: '1,886 → 2,664', label: 'Platform monthly users, FY24' },
        href: '/work/catalog-data-map-lineage',
      },
      {
        track: 'strategy',
        headline: 'Research that set the FY25 roadmap',
        detail:
          '20 in-context user visits and a cross-functional workshop; the group product lead called it “a major contributor to our FY25 roadmap.”',
        href: '/work/search-2',
      },
    ],
  },
  {
    id: 'intuit-senior',
    period: 'Jun 2021 – Jan 2024',
    startYear: '2021',
    title: 'Senior Product Designer',
    company: 'Intuit',
    companyLogo: '/images/intuit-logo.jpg',
    location: 'Mountain View, CA',
    summary:
      'Founding designer of Intuit’s internal data catalog, which grew from tables and columns into the company’s system of record for data.',
    entries: [
      {
        track: 'ic',
        headline: 'Founded the internal data catalog from scratch',
        detail:
          'Trust flags, documentation, query information, ownership, new sources: enough to retire the third-party catalog the company was paying for.',
        impact: { value: '68% → 96%', label: 'Searches with a click in the top five, Apr 2022 to Apr 2023' },
        href: '/work/catalog-data-map-lineage',
      },
      {
        track: 'ic',
        headline: 'Built the first data lineage UI',
        detail: 'Impact graphs across about 30,000 tables and 7,000 pipelines.',
        impact: { value: '4 weeks', label: 'From brief to launch' },
        href: '/work/catalog-data-map-lineage',
      },
      {
        track: 'ic',
        headline: 'Led design for Data Copilot',
        detail:
          'Intuit’s first AI data tooling, consolidated from sixteen hackathon explorations; shown by the CTO at Investor Day 2023.',
        impact: { value: 'Up to 2×', label: 'Faster for data scientists and analysts, Investor Day 2023' },
        href: '/about#in-public',
      },
      {
        track: 'ic',
        headline: 'Designed the Data Map',
        detail: 'Organized the catalog by what the data is about, every physical copy under one entry.',
        href: '/work/catalog-data-map-lineage',
      },
      {
        track: 'management',
        headline: 'Mentored a summer intern who joined the team',
        detail: 'A summer 2023 design intern who converted to full-time and later joined my team.',
      },
    ],
  },
  {
    id: '605',
    period: 'Oct 2017 – Jun 2021',
    startYear: '2017',
    title: 'Product Designer, first design hire',
    company: '605',
    companyLogo: '/images/605logo.jpg',
    location: 'New York, NY',
    summary: 'First product designer at 605, taking three TV ad-analytics products from concept to commercial launch.',
    entries: [
      {
        track: 'ic',
        headline: 'Redesigned 605 Platform',
        detail:
          'Self-serve analytics shipped in two months for a client deadline; reports render in 1 to 1.5 minutes instead of 3 to 4; over $20M booked across the three products by April 2021.',
        impact: { value: '$2M', label: 'Additional booked revenue from pitches on the new designs, since Mar 2021' },
        href: '/work/605-tv-analytics',
      },
      {
        track: 'ic',
        headline: 'Designed 605 Impact',
        detail: 'A platform measuring TV advertising’s effect on consumer behavior.',
        impact: { value: '32 → 2', label: 'Reports into pages, 2020' },
        href: '/work/605-tv-analytics',
      },
      {
        track: 'ic',
        headline: 'Shipped 605 Indxr',
        detail: 'Audience targeting that replaced manual ranking pulls of one day to two weeks.',
        href: '/work/605-tv-analytics',
      },
      {
        track: 'ic',
        headline: 'Built a data-visualization design system',
        detail: 'Accessible, built for multivariate charts, hand-coded where needed.',
      },
    ],
  },
  {
    id: 'tibco',
    period: 'Jul 2012 – Jun 2015',
    startYear: '2012',
    title: 'Software Developer',
    company: 'TIBCO Software',
    location: 'Pune, India',
    summary:
      'Java back-end developer on TIBCO’s enterprise integration platform. I shipped integration features from customer requirements and defined the MVP for a mobile integration product through competitive analysis and user research.',
    entries: [],
  },
]

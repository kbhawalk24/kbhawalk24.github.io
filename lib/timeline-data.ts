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

export interface TimelineMetric {
  value: string
  label: string
}

export interface TimelineEntry {
  track: Track
  headline: string
  detail: string
  /** One to three value + label pairs. The first is the headline stat
   *  (the featured card's pill); the carousel shows all of them as a stat
   *  strip. Values stay short (a number, a before → after); the label says
   *  what was measured. */
  metrics?: TimelineMetric[]
  /** Where this entry is told in full: a page, optionally with a chapter anchor. */
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
  entries: TimelineEntry[]
}

/**
 * Every metric here is sourced (year-end summaries FY22-FY26, the April 2026
 * "Design for Data" deck, or Kanchi directly). Baselines are given wherever
 * one exists. Plain language only, no internal acronyms.
 */
export const ROLES: TimelineRole[] = [
  {
    id: 'intuit-manager',
    period: 'Aug 2024 - Jul 2026',
    startYear: '2024',
    title: 'Product Design Manager',
    company: 'Intuit',
    companyLogo: '/images/intuit-logo.jpg',
    location: 'Mountain View, CA',
    summary:
      'Led UX strategy and a team of three product designers for Intuit’s enterprise data platform: data discovery and search, access and governance, lineage, observability, data quality standards, and pipeline authoring. The platform supports ~550 engineers and 16 product managers.',
    entries: [
      {
        track: 'management',
        headline: 'Scaled the platform into company-wide infrastructure',
        detail:
          'From a single-team discovery tool to the default way Intuit finds, trusts, and gets data. The team shipped 24 launches in the final twelve months.',
        metrics: [
          { value: '~2,700 → 6,000+', label: 'Monthly users' },
        ],        href: '/leadership#shipped',
      },
      {
        track: 'management',
        headline: 'Access from weeks to minutes',
        detail:
          'Directed the redesign of data-access workflows: provisioning 9 → 3 days, most routine requests auto-approved, restricted-data denials down 85%.',
        metrics: [
          { value: '~4,000 hrs', label: 'Saved per year' },
        ],        href: '/work/trusting-data#access',
      },
      {
        track: 'management',
        headline: 'Promoted all three direct reports',
        detail:
          'Wrote the promotion-case framework they used; backed a team-led design sign-off practice that engineering adopted.',
        metrics: [
          { value: '3 of 3', label: 'Direct reports promoted' },
        ],        href: '/leadership#people',
      },
      {
        track: 'strategy',
        headline: 'Data maturity standards across the platform',
        detail:
          'Quality scorecards, a company-wide maturity dashboard, and self-service certification of trusted data.',
        metrics: [
          { value: '0 incidents', label: 'Marketing data, 2025 peak' },
        ],        href: '/work/trusting-data#maturity',
      },
      {
        track: 'strategy',
        headline: 'Moved discovery into the coding agent',
        detail:
          'Architected the strategy to collapse the find → access → explore loop by putting the catalog inside Cursor and Claude instead of building a better chat.',
        metrics: [
          { value: '45 min → 4 min', label: 'Time to insight' },
        ],        href: '/work/finding-data#agent',
      },
      {
        track: 'ic',
        headline: 'Designed how the data agent answers',
        detail:
          'Wrote the agent’s rules, designed its responses, and worked on trust in what it returns, then shipped merged production pull requests myself.',
        metrics: [
          { value: '11% → 81%', label: 'Precision in 3 months' },
        ],        href: '/work/finding-data#agent',
      },
      {
        track: 'ic',
        headline: 'Shipped a GenAI onboarding workflow',
        detail:
          'AI pre-fills the form and validates up front, so marketers integrate data pipelines in under a day instead of one to two weeks.',
        metrics: [
          { value: '1-2 weeks → <24 hrs', label: 'Pipeline onboarding' },
        ],        href: '/work/trusting-data#access',
      },
    ],
  },
  {
    id: 'intuit-principal',
    period: 'Jan 2024 - Aug 2024',
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
        headline: 'Designed data-quality trust features',
        detail:
          'AI-generated descriptions, maturity scorecards, and AI classification tags.',
        metrics: [
          { value: '7,000+', label: 'Trusted data products' },
        ],        href: '/work/trusting-data#maturity',
      },
      {
        track: 'strategy',
        headline: 'Research that set the FY25 roadmap',
        detail:
          '20 in-context user visits across business units and a cross-functional ideation workshop; the group product lead called it “a major contributor to our FY25 roadmap.”',
        metrics: [
          { value: '1 in 5', label: 'Searches for unfamiliar data' },
        ],        href: '/work/finding-data#search-2',
      },
      {
        track: 'ic',
        headline: 'Designed search rebuilt on meaning',
        detail:
          'The semantic search and facet model that launched as Search 2.0 in March 2025, across every data type on the platform.',
        metrics: [
          { value: '81% → 89%', label: 'Search precision' },
          { value: '51s → 2s', label: 'Query latency' },
        ],        href: '/work/finding-data#search-2',
      },
      {
        track: 'ic',
        headline: 'Made complex data marts discoverable',
        detail:
          'Re-architected the catalog for the new data-product model; ~2,000 previously siloed tables became findable.',
        metrics: [
          { value: '+42%', label: '1,886 → 2,664 monthly users' },
        ],        href: '/work/trusting-data#maturity',
      },
      {
        track: 'management',
        headline: 'Co-led intern hiring and mentorship',
        detail:
          'Sourced 50+ candidates, managed a design intern who later became a direct report.',
        href: '/leadership#people',
      },
    ],
  },
  {
    id: 'intuit-senior',
    period: 'Jun 2021 - Jan 2024',
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
        metrics: [
          { value: '68% → 96%', label: 'Top-5 click-through' },
        ],        href: '/work/finding-data#catalog',
      },
      {
        track: 'ic',
        headline: 'Designed the Data Map',
        detail:
          'Organized the catalog by what the data is about, with every physical copy (batch, real-time, marketing) under one entry. No other catalog had done it.',
        metrics: [
          { value: '~20', label: 'In-context user sessions' },
        ],        href: '/work/finding-data#data-map',
      },
      {
        track: 'ic',
        headline: 'Led design for Data Copilot',
        detail:
          'Intuit’s first AI data tooling: sixteen hackathon explorations consolidated into one chat experience, shipped in four months, presented by the CTO at Investor Day 2023.',
        metrics: [
          { value: '500+', label: 'Monthly users' },
          { value: '2×', label: 'Faster SQL authoring' },
        ],        href: '/work/finding-data#copilot',
      },
      {
        track: 'ic',
        headline: 'Built the first data lineage UI in 4 weeks',
        detail:
          'Impact graphs across ~30K tables and ~7K pipelines; ~500 monthly users in the first year.',
        metrics: [
          { value: '~30K', label: 'Tables visualized' },
        ],        href: '/work/trusting-data#lineage',
      },
    ],
  },
  {
    id: '605',
    period: 'Oct 2017 - Jun 2021',
    startYear: '2017',
    title: 'Lead Product Designer',
    company: '605',
    location: 'New York, NY',
    summary:
      'Lead designer for TV ad-analytics products, taking three data products from concept to commercial launch.',
    entries: [
      {
        track: 'ic',
        headline: 'Designed 605 Impact',
        detail:
          'A first-of-its-kind platform measuring TV advertising’s effect on consumer behavior; 32 statistical reports of 500+ rows condensed into a two-screen report.',
        metrics: [
          { value: '$20M+', label: 'Revenue across three products' },
        ],        href: '/605#impact',
      },
      {
        track: 'ic',
        headline: 'Shipped 605 Indxr',
        detail: 'Audience targeting that cut report generation from 15 days to 2 hours.',
        metrics: [
          { value: '15 days → 2 hrs', label: 'Report generation' },
        ],        href: '/605#indxr',
      },
      {
        track: 'ic',
        headline: 'Redesigned 605 Platform',
        detail: 'Self-serve analytics; halved report-building time.',
        metrics: [
          { value: '−50%', label: 'Report-building time' },
        ],        href: '/605#platform',
      },
      {
        track: 'ic',
        headline: 'Built a data-visualization design system',
        detail: 'Accessible, built for multivariate charts, hand-coded where needed.',
        href: '/605#design-system',
      },
    ],
  },
  {
    id: 'tibco',
    period: 'Jul 2012 - Jun 2015',
    startYear: '2012',
    title: 'Software Developer',
    company: 'TIBCO Software',
    location: 'Pune, India',
    summary:
      'Java back-end developer on TIBCO’s enterprise integration platform, the engineering foundation behind a data-fluent design career.',
    entries: [
      {
        track: 'ic',
        headline: 'Shipped enterprise integration enhancements',
        detail: 'Translated customer requirements into shipped features.',
      },
      {
        track: 'strategy',
        headline: 'Defined the MVP for a mobile integration product',
        detail: 'Through competitive analysis and user research.',
      },
    ],
  },
]

export const STATS = [
  { value: '12+', label: 'Years in enterprise tech' },
  { value: '45 days → seconds', label: 'Time to find, trust, and get data (2021 → 2026)' },
  { value: '6,000+', label: 'Monthly users on the platform I led' },
  { value: '$20M+', label: 'Revenue from products shipped at 605' },
]

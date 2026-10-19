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

export interface TimelineEntry {
  track: Track
  headline: string
  detail: string
  /** One to three value + label pairs. The first is the headline stat
   *  (the featured card's pill); the carousel shows all of them as a stat
   *  strip. Values stay short (a number, a before → after); the label says
   *  what was measured. */
  /** Where this entry is told in full: a page, optionally with a chapter anchor. */
  href?: string
}

/** The case study told under a role. Its page lives at `href`. While the
 *  write-up is in progress the home card and the page are both placeholders:
 *  a title and "Coming soon", with no numbers and no link between them. */
export interface RoleCaseStudy {
  title: string
  href: string
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
  /** Shown in the role's "Featured case study" slot. Roles without one
   *  feature their first entry there instead. */
  caseStudy?: RoleCaseStudy
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
      'Led UX strategy and a team of product designers for Intuit’s enterprise data platform: data discovery and search, access and governance, lineage, observability, data quality standards, and pipeline authoring.',
    caseStudy: { title: 'Scaling platform design at a 1:85 ratio', href: '/work/scaling-platform-design' },
    entries: [
      {
        track: 'management',
        headline: 'Scaled the platform into company-wide infrastructure',
        detail:
          'From a single-team discovery tool to the default way Intuit finds, trusts, and gets data.',        href: '/#work',
      },
      {
        track: 'management',
        headline: 'My team redesigned how people get access to data',
        detail:
          'Tables and encrypted columns in one request: 9 days to 3 days (Aug 2025). Real-time streams: 2–3 weeks to 3 days, with 61% of requests approved automatically (Mar 2025). Ineligible denials for restricted tax data down 85%.',        href: '/#work',
      },
      {
        track: 'management',
        headline: 'One Senior promotion, two more cases approved',
        detail:
          'Secured one Senior promotion in Jan 2026 and had two additional promotion cases approved before my role ended. Wrote the promotion-case framework each of them used, and backed a design sign-off before release that became the team’s practice.',
        href: '/#work',
      },
      {
        track: 'strategy',
        headline: 'Built the tooling behind Intuit’s clean-data standard',
        detail:
          'The platform organization defined the standard. Quality scorecards, a company-wide maturity dashboard, and self-service certification of trusted data.',        href: '/#work',
      },
      {
        track: 'strategy',
        headline: 'Moved discovery into the coding agent',
        detail:
          'Architected the strategy to collapse the find → access → explore loop by putting the catalog inside Cursor and Claude instead of building a better chat.',        href: '/work/agentic-discovery',
      },
      {
        track: 'ic',
        headline: 'Designed how the data agent answers',
        detail:
          'Wrote the interaction model for the agent: structured answers that show their sources, not open chat. Tested its answers against real user questions, refined its rules, and drove adoption inside Cursor and Claude.',        href: '/work/agentic-discovery',
      },
      {
        track: 'ic',
        headline: 'Shipped a GenAI onboarding workflow',
        detail:
          'AI pre-fills the form and validates up front, so marketers integrate data pipelines in under a day instead of one to two weeks.',        href: '/#work',
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
    caseStudy: { title: 'Finding data', href: '/work/search-2' },
    entries: [
      {
        track: 'ic',
        headline: 'Designed data-quality trust features',
        detail:
          'AI-generated descriptions, maturity scorecards, and AI classification tags.',        href: '/#work',
      },
      {
        track: 'strategy',
        headline: 'Research that set the FY25 roadmap',
        detail:
          '20 in-context user visits across business units and a cross-functional ideation workshop; the group product lead called it “a major contributor to our FY25 roadmap.”',        href: '/work/search-2',
      },
      {
        track: 'ic',
        headline: 'Designed search rebuilt on meaning',
        detail:
          'Designed semantic search for tables and for the Data Map. Table search launched Nov 14, 2024. I designed the first version of Data Map search; a designer on my team took it to launch on Mar 26, 2025.',        href: '/work/search-2',
      },
      {
        track: 'ic',
        headline: 'Made complex data marts discoverable',
        detail:
          'Re-architected the catalog for the new data-product model; ~2,000 previously siloed tables became findable.',        href: '/#work',
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
    caseStudy: { title: 'Founding designer of Intuit’s data catalog', href: '/work/catalog-data-map-lineage' },
    entries: [
      {
        track: 'ic',
        headline: 'Founded the internal data catalog from scratch',
        detail:
          'Trust flags, documentation, query information, ownership, new sources: enough to retire the third-party catalog the company was paying for.',        href: '/#work',
      },
      {
        track: 'ic',
        headline: 'Designed the Data Map',
        detail:
          'Organized the catalog by what the data is about, with every physical copy (batch and real-time) under one entry. No catalog we evaluated offered this.',        href: '/#work',
      },
      {
        track: 'ic',
        headline: 'Led design for Data Copilot',
        detail:
          'Intuit’s first AI data tooling: sixteen hackathon explorations consolidated into one chat experience, shipped in four months, presented by the CTO at Investor Day 2023.',        href: '/work/agentic-discovery',
      },
      {
        track: 'ic',
        headline: 'Built the first data lineage UI in 4 weeks',
        detail:
          'Impact graphs across ~30K tables and ~7K pipelines; 450–500 monthly users in the first year.',        href: '/#work',
      },
      {
        track: 'management',
        headline: 'Mentored a summer intern who joined the team',
        detail:
          'Managed a summer 2023 design intern who converted to full-time and later joined my team.',
        href: '/#work',
      },
    ],
  },
  {
    id: '605',
    period: 'Oct 2017 - Jun 2021',
    startYear: '2017',
    title: 'Product Designer (First Design Hire)',
    company: '605',
    location: 'New York, NY',
    summary:
      'First product designer at 605, taking three TV ad-analytics products from concept to commercial launch.',
    caseStudy: { title: 'Three analytics products for TV advertising', href: '/work/605-tv-analytics' },
    entries: [
      {
        track: 'ic',
        headline: 'Designed 605 Impact',
        detail:
          'A platform measuring TV advertising’s effect on consumer behavior. Collapsed 32 separate reports into a two-page interactive view and replaced a chart type that caused around 8 bugs.',        href: '/#work',
      },
      {
        track: 'ic',
        headline: 'Shipped 605 Indxr',
        detail: 'Audience targeting that replaced manual ranking pulls, which took one day to two weeks.',        href: '/#work',
      },
      {
        track: 'ic',
        headline: 'Redesigned 605 Platform',
        detail:
          'Self-serve analytics, shipped in two months to meet a client deadline. Client pitches on it booked $2M in additional revenue.',        href: '/#work',
      },
      {
        track: 'ic',
        headline: 'Built a data-visualization design system',
        detail: 'Accessible, built for multivariate charts, hand-coded where needed.',
        href: '/#work',
      },
    ],
  },
]


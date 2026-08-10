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
    description: 'Vision, roadmaps, and architectural direction as a manager',
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
  metric?: string
}

export interface TimelineRole {
  id: string
  period: string
  startYear: string
  title: string
  company: string
  location: string
  summary: string
  entries: TimelineEntry[]
}

export const ROLES: TimelineRole[] = [
  {
    id: 'intuit-manager',
    period: 'Aug 2024 — Present',
    startYear: '2024',
    title: 'Product Design Manager',
    company: 'Intuit',
    location: 'Mountain View, CA',
    summary:
      'Leading UX strategy and a team of designers for Intuit’s enterprise data platform — spanning data discovery, governance, lineage, observability, and pipeline authoring.',
    entries: [
      {
        track: 'management',
        headline: 'Scaled the platform into company-wide infrastructure',
        detail:
          'Grew Intuit’s data platform from a localized discovery tool into infrastructure used across the company.',
        metric: '6,000+ monthly users',
      },
      {
        track: 'management',
        headline: 'Guided operational workflows for data access',
        detail:
          'Reduced access provisioning from 9 to 3 days and cut restricted-data denials by 85%.',
        metric: '4,000 hrs/year saved',
      },
      {
        track: 'management',
        headline: 'Talent development and team outcomes',
        detail:
          'Led recruitment, assessment, and growth across the team — securing promotions for all direct reports.',
        metric: '100% of reports promoted',
      },
      {
        track: 'strategy',
        headline: 'UX strategy for enterprise data maturity',
        detail:
          'Directed lineage and observability strategy, ensuring zero marketing-data incidents during the 2025 tax peak.',
        metric: '35 → 0 critical incidents',
      },
      {
        track: 'strategy',
        headline: 'Architectural strategy for agentic data search',
        detail:
          'Drove architectural adoption of the Cursor/Claude data search MCP server across the platform.',
        metric: 'Time-to-insight < 4 min',
      },
      {
        track: 'ic',
        headline: 'Authored the agentic search interaction model',
        detail:
          'Personally designed the structured interaction model powering agentic data search, refining interaction rules hands-on.',
        metric: '90%+ search accuracy',
      },
      {
        track: 'ic',
        headline: 'Shipped a GenAI onboarding workflow',
        detail:
          'Designed a workflow that auto-populates and pre-validates parameters, accelerating data pipeline integrations for marketers.',
        metric: '1–2 weeks → < 24 hrs',
      },
    ],
  },
  {
    id: 'intuit-principal',
    period: 'Jan 2024 — Aug 2024',
    startYear: '2024',
    title: 'Principal Product Designer',
    company: 'Intuit',
    location: 'Mountain View, CA',
    summary:
      'Principal-level IC owning search, discoverability, and data trust across the enterprise data platform.',
    entries: [
      {
        track: 'ic',
        headline: 'Redesigned platform search with a semantic layer',
        detail:
          'Introduced a semantic interaction layer to the data platform’s search experience.',
        metric: '89% search precision',
      },
      {
        track: 'strategy',
        headline: 'Defined the FY25 platform roadmap',
        detail:
          'Spearheaded foundational user research and cross-functional synthesis workshops that directly shaped the roadmap.',
      },
      {
        track: 'ic',
        headline: 'Modernized architecture for complex data marts',
        detail:
          'Made ~2,000 previously siloed data assets discoverable, driving a 42% growth in monthly active users.',
        metric: '1,886 → 2,664 MAU',
      },
      {
        track: 'ic',
        headline: 'Designed clean-data trust features',
        detail:
          'AI-generated descriptions and maturity scorecards made high-quality data products discoverable.',
        metric: '7,000+ data products',
      },
      {
        track: 'management',
        headline: 'Co-led intern hiring and mentorship',
        detail:
          'Sourced 50+ candidates, mentored high-potential talent, and converted interns into full-time roles.',
      },
    ],
  },
  {
    id: 'intuit-senior',
    period: 'Jun 2021 — Jan 2024',
    startYear: '2021',
    title: 'Senior Product Designer',
    company: 'Intuit',
    location: 'Mountain View, CA',
    summary:
      'Founding designer of Intuit’s internal data catalog — from zero to the company’s system of record for data.',
    entries: [
      {
        track: 'ic',
        headline: 'Founded the internal data catalog from scratch',
        detail:
          'Replaced a legacy third-party system (Alation); designed search, browse, and trust tooling end to end.',
        metric: '96% top-5 CTR · 45 days → 3',
      },
      {
        track: 'ic',
        headline: 'Shipped Intuit’s first agentic data tooling',
        detail:
          'Data Copilot doubled SQL writing speed and was presented by the CTO at Investor Day 2023.',
        metric: '500+ MAU',
      },
      {
        track: 'ic',
        headline: 'Built the first data lineage UI in 4 weeks',
        detail:
          'Rendered impact graphs for ~30K tables and ~7K pipelines — the technical foundation for data reliability.',
        metric: '~30K tables visualized',
      },
      {
        track: 'ic',
        headline: 'Expanded the catalog into a management platform',
        detail:
          'Added access requests, governance workflows, and a unified data map combining physical and logical objects.',
      },
    ],
  },
  {
    id: '605',
    period: 'Oct 2017 — Jun 2021',
    startYear: '2017',
    title: 'Product Designer',
    company: '605 LLC',
    location: 'New York, NY',
    summary:
      'Lead designer for TV ad-analytics products, taking three data products from conception to commercial launch.',
    entries: [
      {
        track: 'ic',
        headline: 'Designed 605 Impact',
        detail:
          'Attribution analytics that answered media buyers’ core question — did this campaign work, and what should change?',
        metric: '$20M+ revenue generated',
      },
      {
        track: 'ic',
        headline: 'Built 605 Platform',
        detail:
          'Self-serve analytics that let media buyers run their own campaign reports without waiting on an analyst.',
      },
      {
        track: 'ic',
        headline: 'Shipped 605 Indxr',
        detail:
          'Audience indexing that measured which viewer segments a TV campaign actually reached.',
      },
      {
        track: 'ic',
        headline: 'Built a data-visualization design system',
        detail:
          'Created an accessible, dataviz-focused design system that scaled to support multivariate visualizations.',
      },
      {
        track: 'strategy',
        headline: 'Introduced a formal product design process',
        detail:
          'Streamlined design operations and coordinated weekly design meetings for the 605 design team.',
      },
    ],
  },
  {
    id: 'tibco',
    period: 'Jul 2012 — Jun 2015',
    startYear: '2012',
    title: 'Software Developer',
    company: 'TIBCO Software',
    location: 'Pune, India',
    summary:
      'Java back-end developer on BusinessWorks, TIBCO’s enterprise integration platform — the engineering foundation behind a data-fluent design career.',
    entries: [
      {
        track: 'ic',
        headline: 'Shipped enterprise integration enhancements',
        detail:
          'Translated customer requirements into shipped features for BusinessWorks.',
      },
      {
        track: 'strategy',
        headline: 'Defined the MVP for TIBCO Expresso',
        detail:
          'Shaped the mobile integration platform’s feature set through competitive analysis and user research.',
      },
    ],
  },
]

export const STATS = [
  { value: '12+', label: 'Years in enterprise tech' },
  { value: '6,000+', label: 'Monthly users on platform led' },
  { value: '$20M+', label: 'Revenue from shipped products' },
  { value: '350 → 7,000+', label: 'Trustworthy data products scaled' },
]

export type Track = 'management' | 'strategy' | 'ic'

export const TRACKS: Record<Track, { label: string; short: string; description: string }> = {
  ic: {
    label: 'IC Design',
    short: 'IC',
    description: 'Hands-on design, shipped end to end',
  },
  strategy: {
    label: 'Strategy',
    short: 'STRAT',
    description: 'Direction, research and what to build next',
  },
  management: {
    label: 'Team Delivery',
    short: 'TEAM',
    description: 'What the designers on my team shipped, and growing them',
  },
}

/** The order the segmented control shows the tracks in. */
export const TRACK_ORDER: Track[] = ['ic', 'strategy', 'management']

export interface TimelineMetric {
  value: string
  label: string
}

export interface TimelineEntry {
  track: Track
  headline: string
  detail: string
  /** One or two value + label pairs. Values stay short (a number, a
   *  before → after); the label says what was measured and when. */
  metrics?: TimelineMetric[]
  /** Where this entry is told in full. The /work pages are password-protected. */
  href?: string
}

export interface TimelineRole {
  id: string
  period: string
  /** Four-digit start year; roles that started before 2024 are collapsed by default. */
  startYear: number
  title: string
  company: string
  /** Optional wordmark shown instead of the plain company name. */
  companyLogo?: string
  location: string
  summary: string
  /** The case study told under this role. */
  caseStudy?: { title: string; href: string }
  entries: TimelineEntry[]
}

/**
 * Every figure here is in content/numbers.json (the build check in
 * scripts/check-content.mjs enforces it) and sourced in BRIEF.md. Plain
 * language only; no internal product names, no headcount, no "~".
 */
export const ROLES: TimelineRole[] = [
  {
    id: 'intuit-manager',
    period: 'Aug 2024 - Jul 2026',
    startYear: 2024,
    title: 'Product Design Manager',
    company: 'Intuit',
    companyLogo: '/images/intuit-logo.jpg',
    location: 'Mountain View, CA',
    summary:
      'Led design strategy and the designers for Intuit’s internal data platform: data discovery and search, access, lineage, monitoring of data health, the clean-data standard, and pipeline authoring. I kept designing alongside the team.',
    caseStudy: { title: 'Leading the designers behind Intuit’s data platform', href: '/work/my-teams-work' },
    entries: [
      {
        track: 'management',
        headline: 'The platform became the default way Intuit finds, trusts and gets data',
        detail: 'From a single-team discovery tool to company-wide infrastructure.',
        metrics: [{ value: '2,664 → 6,673', label: 'Monthly users, Jul 2024 → Mar 2026' }],
        href: '/work/my-teams-work',
      },
      {
        track: 'management',
        headline: 'My team redesigned how people get access to data',
        detail:
          'Tables and encrypted columns in one request: 9 days to 3 days (Aug 2025). Real-time streams: 2–3 weeks to 3 days, with 61% of requests approved automatically (Mar 2025). Ineligible denials for restricted tax data down 85%.',
        metrics: [{ value: '9 → 3 days', label: 'Tables and encrypted columns, Aug 2025' }],
        href: '/work/my-teams-work#access',
      },
      {
        track: 'management',
        headline: 'One senior promotion, two more cases approved',
        detail:
          'One designer was promoted to senior in 2026, and two more promotion cases were approved before my role ended. I wrote the promotion-case framework each of them used, and backed a design sign-off before release that became the team’s practice.',
        href: '/work/my-teams-work#growing-people',
      },
      {
        track: 'strategy',
        headline: 'Set the design strategy for Intuit’s clean-data standard',
        detail:
          'The platform organization defined the standard. My team and the wider design group designed the scorecards and the guided certification workflows, the same way on every data-production path.',
        metrics: [{ value: 'Under 1% → 80%', label: 'Clean data, public figure, Dec 2025' }],
        href: '/work/my-teams-work#certifying',
      },
      {
        track: 'strategy',
        headline: 'Moved discovery into the coding tools people already use',
        detail:
          'Set the strategy to put the catalog inside Cursor and Claude instead of building a better chat window, so finding data, checking access and running the query happen in one place.',
        metrics: [{ value: '45 min → 4 min', label: 'Question to answer, observed-task study, Mar 2026' }],
        href: '/work/finding-data#inside-the-tools',
      },
      {
        track: 'ic',
        headline: 'Designed how the data agent answers',
        detail:
          'Wrote the specification for the agent’s answers: structured replies that show their sources, never a query that has not been run. Tested its answers against real questions, refined its rules, and recruited the first users.',
        metrics: [{ value: '711', label: 'Active users, Mar 2026' }],
        href: '/work/finding-data#inside-the-tools',
      },
      {
        track: 'ic',
        headline: 'Shipped self-service onboarding with AI filling in the request',
        detail:
          'AI pre-fills the form and a test run checks it up front, so marketers get clean data into the marketing data store in under a day instead of one to two weeks.',
        metrics: [{ value: '1–2 weeks → under 24 hours', label: 'Onboarding, Oct 2024' }],
        href: '/work/building-the-platform#onboarding',
      },
    ],
  },
  {
    id: 'intuit-principal',
    period: 'Jan 2024 - Aug 2024',
    startYear: 2024,
    title: 'Principal Product Designer',
    company: 'Intuit',
    companyLogo: '/images/intuit-logo.jpg',
    location: 'Mountain View, CA',
    summary:
      'Principal-level designer owning search, discoverability and data trust across the platform, plus the research that set the next year’s roadmap.',
    caseStudy: { title: 'Finding data: three decisions in five years of search', href: '/work/finding-data' },
    entries: [
      {
        track: 'ic',
        headline: 'Designed how the clean-data standard appears in the catalog',
        detail:
          'AI-written descriptions with a way to correct them, a scorecard against the standard, and AI-assigned classification tags.',
        metrics: [{ value: '1,600', label: 'Data products newly certified at the third level, FY24' }],
        href: '/work/building-the-platform#judge-a-table',
      },
      {
        track: 'strategy',
        headline: 'Research that set the FY25 roadmap',
        detail:
          '20 in-context user visits across business units and a cross-functional ideation workshop; the group product lead called it “a major contributor to our FY25 roadmap.”',
        metrics: [{ value: '20', label: 'In-context user visits, spring 2024' }],
        href: '/work/finding-data#data-people-already-use',
      },
      {
        track: 'ic',
        headline: 'Designed search rebuilt on meaning',
        detail:
          'Designed search for tables and across the map of data. Table search launched Nov 14, 2024. I designed the first version of search across the map; a designer on my team took it to launch on Mar 26, 2025.',
        metrics: [{ value: '81.31% → 89.24%', label: 'First result correct, Mar 2025 launch' }],
        href: '/work/finding-data#organize-by-meaning',
      },
      {
        track: 'ic',
        headline: 'Made curated tables discoverable',
        detail:
          'Redesigned the catalog for the new data-product model and for curated tables that had taken three to four tools to find.',
        metrics: [{ value: '1,886 → 2,664', label: 'Monthly users of the platform, FY24' }],
        href: '/work/building-the-platform#judge-a-table',
      },
    ],
  },
  {
    id: 'intuit-senior',
    period: 'Jun 2021 - Jan 2024',
    startYear: 2021,
    title: 'Senior Product Designer',
    company: 'Intuit',
    companyLogo: '/images/intuit-logo.jpg',
    location: 'Mountain View, CA',
    summary:
      'Founding designer of Intuit’s internal data catalog, which grew from tables and columns into the place where people judge data, trace it and get it.',
    caseStudy: { title: 'Founding designer of Intuit’s data catalog', href: '/work/building-the-platform' },
    entries: [
      {
        track: 'ic',
        headline: 'Founded the internal data catalog',
        detail:
          'Trust flags, descriptions, query information, ownership, new sources: enough to retire the commercial catalog the company was paying for.',
        metrics: [{ value: '68% → 96%', label: 'Top-five click-through, Apr 2022 → Apr 2023' }],
        href: '/work/building-the-platform#judge-a-table',
      },
      {
        track: 'ic',
        headline: 'Designed the map of data',
        detail:
          'Organized the catalog by what the data means, with every physical copy, batch and real-time, under one entry. No catalog we evaluated offered this.',
        metrics: [{ value: 'Around 20', label: 'Users in rounds of feedback, FY22' }],
        href: '/work/finding-data#organize-by-meaning',
      },
      {
        track: 'ic',
        headline: 'Led design for the catalog’s chat assistant',
        detail:
          'Intuit’s first AI data tooling: 16 hackathon teams and 58 collaborators consolidated into one flow, shipped in four months, presented by the CTO at Investor Day 2023.',
        metrics: [{ value: '500+', label: 'Monthly users, FY24' }],
        href: '/work/finding-data#inside-the-tools',
      },
      {
        track: 'ic',
        headline: 'Built the first data lineage view in four weeks',
        detail:
          'A graph of what feeds a table and what depends on it, across about 30,000 tables and 7,000 pipelines; 450 to 500 monthly users by July 2024.',
        metrics: [{ value: '30,000', label: 'Tables in the lineage graph, Dec 2023' }],
        href: '/work/building-the-platform#lineage',
      },
      {
        track: 'management',
        headline: 'Managed a summer intern who later joined my team',
        detail: 'Managed a summer 2023 design intern who converted to full-time and later joined my team.',
        href: '/work/my-teams-work#growing-people',
      },
    ],
  },
  {
    id: '605',
    period: 'Oct 2017 - Jun 2021',
    startYear: 2017,
    title: 'Product Designer, the company’s first',
    company: '605',
    location: 'New York, NY',
    summary:
      'First product designer at 605, taking three TV advertising analytics products from first concept to launch.',
    caseStudy: { title: '605: three analytics products for TV advertising', href: '/work/605' },
    entries: [
      {
        track: 'ic',
        headline: 'Redesigned 605 Platform',
        detail:
          'Self-service reports comparing audiences, shipped in two months for a client deadline. Chart render time fell from 3 to 4 minutes to 1 to 1.5 minutes.',
        metrics: [{ value: '$2M', label: 'Additional booked revenue from the redesign, 2021' }],
        href: '/work/605#platform',
      },
      {
        track: 'ic',
        headline: 'Designed 605 Impact',
        detail:
          'A product measuring whether people who saw an ad went on to watch the show. Collapsed 32 separate reports into a two-page view and replaced a chart type that had caused around 8 bugs.',
        metrics: [{ value: '32 → 2', label: 'Reports into pages, 2020' }],
        href: '/work/605#also-at-605',
      },
      {
        track: 'ic',
        headline: 'Shipped 605 Indxr',
        detail: 'Audience building that replaced manual ranking pulls, which took between 1 day and 2 weeks.',
        metrics: [{ value: '1 day to 2 weeks', label: 'Manual ranking pulls replaced, 2019' }],
        href: '/work/605#indxr',
      },
      {
        track: 'ic',
        headline: 'Built a color palette for data visualization',
        detail: 'Accessible, adopted across the product and the company, with a typeface with tabular figures.',
        href: '/work/605#also-at-605',
      },
    ],
  },
]

export const EDUCATION = [
  { degree: 'MS Information (HCI)', school: 'University of Michigan', year: '2017' },
  { degree: 'BE Computer Engineering', school: 'University of Pune', year: '2012' },
]

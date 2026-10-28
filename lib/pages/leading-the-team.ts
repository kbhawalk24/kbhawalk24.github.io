import type { ShortPage } from './types'

// Case study: leading design for the data platform, August 2024 to July
// 2026. Five sections: the scope (with the lifecycle wheel), how I ran it,
// AI in the work, what the team shipped, the people and the results. Each
// is one paragraph, one or two visuals and at most one supporting block.
// Figures are from the year-end reviews, launch posts and recognition
// notes listed in sources; people are credited by role, never by name.

export const LEADING_THE_TEAM: ShortPage = {
  slug: 'leading-the-team',
  href: '/work/leading-the-team',
  title: 'Leading design for the data platform, 2024 to 2026',
  roleTag: 'Design Manager',
  period: '2024–2026',
  description:
    'Two years managing the designers for Intuit’s enterprise data platform: the scope, how I ran it, AI tools in my own work first, what the team shipped, and the people.',
  context: {
    system: 'Intuit’s enterprise data platform: 9 product areas · about 550 engineers and 16 PMs · 6,673 monthly users.',
    steps: [
      { label: 'Catalog search', href: '/work/search-2' },
      { label: 'The agent', href: '/work/agentic-discovery' },
      { label: 'The catalog', href: '/work/catalog-data-map-lineage' },
      { label: '605', href: '/work/605-tv-analytics' },
      { label: 'Management' },
    ],
    current: 4,
  },
  facts: [
    {
      label: 'Role',
      lines: [
        { text: 'Product Design Manager', note: 'Aug 2024 to Jul 2026' },
        { text: 'Kept designing', note: 'search, the agent' },
      ],
    },
    {
      label: 'Scope',
      lines: [
        { text: 'Three product designers' },
        { text: 'Nine product areas' },
        { text: 'About 550 engineers, 16 product managers' },
      ],
    },
    {
      label: 'Research',
      lines: [
        { text: 'One research base', note: '2,890 notes' },
        { text: 'Six months of user visits' },
        { text: 'Eight surveys, eleven mined help channels' },
      ],
    },
    {
      label: 'Shipped',
      lines: [
        { text: 'Six access launches', note: 'Dec 2024 to Sep 2025' },
        { text: 'Collections', note: 'Aug 2025' },
        { text: 'Fourth-level certification', note: 'Nov 2025' },
        { text: 'Column-level lineage', note: 'tax year 2025' },
      ],
    },
  ],
  stats: [
    { value: '1 : 85', label: 'Designers to engineers across the data design group' },
    { value: 'All', label: 'Designers who reported to me were promoted' },
    { value: '2,664 → 6,673', label: 'Monthly users of the platform, Jul 2024 to Mar 2026 · shared' },
  ],
  visuals: [
    {
      id: 'tracker',
      after: 'running',
      lead: true,
      src: '/work/leading-the-team/tracker-2025.jpg',
      width: 2000,
      height: 1087,
      alt: 'The design project tracker: a table of design projects with their product area, status from backlog to shipped, status date, assigned designer and due date, and a link to the requirements document.',
      caption: 'The one tracker, 2025: every design request across the nine areas, with its status, its designer and its requirements. Names blurred.',
    },
    {
      id: 'research',
      after: 'running',
      src: '/work/leading-the-team/marvin-2025.jpg',
      width: 2000,
      height: 1087,
      alt: 'The research repository: 2,890 notes from user visits, each tagged with its source meeting, with AI analysis across all of them.',
      caption: 'The shared research base, 2026: 2,890 notes from the team’s visits and the mined help channels, in one place engineers and PMs could search.',
    },
    {
      id: 'launch-video',
      after: 'ai',
      lead: true,
      src: '/work/leading-the-team/launch-video-2025.jpg',
      width: 1920,
      height: 500,
      alt: 'A frame from an AI-made launch video: three titles, find trusted data faster, better project-centric data organisation, seamless collaboration, each with an icon.',
      caption: 'A frame from the AI-made launch video for Collections, August 2025. Engineering copied the format for its own launches.',
    },
    {
      id: 'collections',
      after: 'shipped',
      lead: true,
      src: '/work/agentic-discovery/collections-2025.jpg',
      width: 1920,
      height: 990,
      alt: 'The My Collections page with a Create new collection dialog open: a name, a description and a choice between private and public.',
      caption: 'Collections, shipped August 2025 by a designer on my team. It was not on the roadmap until I argued for it.',
    },
    {
      id: 'maturity',
      after: 'shipped',
      src: '/work/catalog-data-map-lineage/maturity-2026.jpg',
      width: 2150,
      height: 940,
      alt: 'A search result with its maturity score open: six criteria, from stewardship to lineage, each with a star rating.',
      caption: 'The maturity score on every search result, 2026: the clean-data standard, visible wherever data appears. My team designed the certification flow behind it.',
    },
  ],
  sections: [
    {
      id: 'scope',
      eyebrow: 'The scope',
      short: 'Scope',
      heading: 'Nine product areas, three designers',
      blocks: [
        {
          type: 'p',
          text:
            'From August 2024 I managed the designers for Intuit’s data platform: finding and understanding data, access, lineage, health monitoring, reliability, usage tracking, pipeline authoring, publishing and ingestion. Across the data design group that was one designer for every 85 engineers. They shipped the work. I set the strategy and the shared research base, and kept designing. The nine areas sit on the seven stages of the data lifecycle, drawn below: what I designed myself, what I led, and where I set the strategy.',
        },
        { type: 'wheel' },
      ],
    },
    {
      id: 'running',
      eyebrow: 'How I ran it',
      short: 'How I ran it',
      heading: 'One intake, one tracker, one research base',
      blocks: [
        {
          type: 'p',
          text:
            'Requests came from nine areas and sixteen product managers, so I set up a single intake path and one tracker of what each designer was on, visible to every PM. I spent my own time in the meetings where a problem was being framed, before a specification existed. Technical users rarely sit for repeated interviews, so the designers pooled six months of user visits, eight surveys and eleven mined help channels into one research base that engineers and product managers used directly in pitch decks and requirements.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'Sixteen PMs each asked their nearest designer.', decision: 'One intake path and one tracker, with the requirements document linked on each row.' },
            { tension: 'Leadership wanted the access designer to cover instrumentation as well.', decision: 'No. The designer stayed on access and shipped six launches in a year.' },
          ],
        },
      ],
    },
    {
      id: 'ai',
      eyebrow: 'AI in the work',
      short: 'AI first',
      heading: 'AI tools in my own work first',
      blocks: [
        {
          type: 'p',
          text:
            'Coded prototypes in v0 and Figma Make, research synthesis in NotebookLM, AI-made launch videos in place of recorded walkthroughs: I used each in my own design work first, and my manager wrote that he then saw every designer on the team adopt them. One redesign, prototyped in code with the developers instead of handed over as a spec, took 90% less development time. Twenty transcripts became one set of findings in a day instead of a week.',
        },
      ],
    },
    {
      id: 'shipped',
      eyebrow: 'What the team shipped',
      short: 'Shipped',
      heading: '24 launches: access, lineage, certification, discovery',
      blocks: [
        {
          type: 'p',
          text:
            'The team built on the data product model the catalog already ran on. Two of the launches were not on the roadmap until I argued for them from the research: a view of the queries other people run against a table, and Collections, a person’s saved working set of data, which the agent now answers from.',
        },
        {
          type: 'table',
          head: ['Area', 'Launches, 2024 to 2026', 'What changed', 'Source'],
          rows: [
            ['Access to data', 'Unified request tracker; stream access; restricted tax data; table and encrypted-column requests; bulk access; owner auto-approval', 'Manual requests 25% faster; streams 2–3 weeks → 3 days, 61% approved automatically; 85% fewer ineligible tax-data denials; decryption 9 → 3 days; 5,000 tables in a week, 200+ hours saved; internal data 24 hours → near-instant', 'Launch posts, Dec 2024 to Sep 2025; FY25 review'],
            ['Lineage for incidents', 'List-based dependency summary; column-level lineage with readable impact reports', 'Root-cause investigations about 4 hours → minutes; 19 marketing data incidents resolved in one tax season', 'FY26 mid-year review'],
            ['Certifying clean data', 'Guided fourth-level certification across several production paths', 'Clean data under 1% → 80% of the estate; P0 and P1 incidents 17 → 0 in tax year 2025 · shared', 'Launch post, Nov 2025; AWS re:Invent 2025'],
            ['Discovery and the agent', 'Query insights; stream and marketing-attribute search; Collections; the agent’s response patterns', '99.99% first-result precision on stream and marketing search; the agent’s results are on its own page', 'Launch posts, May 2025 to Mar 2026'],
          ],
        },
      ],
    },
    {
      id: 'people',
      eyebrow: 'The people and the results',
      short: 'People',
      heading: 'Every designer who reported to me was promoted',
      blocks: [
        {
          type: 'p',
          text:
            'I wrote a six-slide promotion case framework that every designer on the team used. My designers told my manager what they valued: clarity when requirements were unclear, boundaries when work kept changing, and the right people in one room to settle a decision. The results below are the team’s, with my part named in each. Monthly users of the platform grew from 2,664 to 6,673 in the same period, a result many teams share.',
        },
        {
          type: 'table',
          head: ['When', 'What was measured', 'Change', 'Whose result'],
          rows: [
            ['Dec 2024 to Sep 2025', 'Access requests, six launches', 'Streams 2–3 weeks → 3 days; decryption 9 → 3 days', 'The access designer on my team; I kept the designer on access'],
            ['Aug 7, 2025', 'Collections shipped', 'A saved working set of data, now the agent’s context', 'My strategy; designed by my team'],
            ['Tax year 2025', 'Incident investigations with column-level lineage', 'About 4 hours → minutes', 'The lineage designer on my team'],
            ['Nov 2025', 'Clean data in the estate, with fourth-level certification', 'Under 1% → 80%', 'Platform-wide; my team designed the certification flow'],
            ['FY25', 'Development time on one redesign, prototyped in code', '90% less', 'A designer on my team; the practice I set'],
            ['Jul 2024 to Mar 2026', 'Monthly users of the platform', '2,664 → 6,673', 'Shared'],
          ],
        },
      ],
    },
  ],
  next: {
    text: 'The team’s work sits on a catalog I designed first. Next: how it went from a list of tables to a platform.',
    label: 'Building the data discovery platform, 2021 to 2026',
    href: '/work/catalog-data-map-lineage',
  },
  credits:
    'The strategy, the intake and tracker, the research base, the promotion framework and the practices are mine. The designers on my team designed and shipped the launches named here. Engineers built everything that shipped; the platform organisation defined the clean-data standard.',
  sources:
    'FY25 and FY26 year-end reviews; FY26 mid-year review; launch posts, Dec 2024 to Mar 2026; recognition notes from the engineering manager, the engineering lead, the product lead and my manager, 2025 to 2026; AWS re:Invent 2025; Amplitude.',
}

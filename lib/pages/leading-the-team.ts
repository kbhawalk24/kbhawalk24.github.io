import type { ShortPage } from './types'

// Case study: leading design for the data platform, August 2024 to July
// 2026. Each section is an eyebrow, a heading, one lead paragraph under 60
// words, one visual, and at most one supporting block. Figures are from the
// year-end reviews, launch posts and recognition notes listed in sources;
// people are credited by role, never by name.

export const LEADING_THE_TEAM: ShortPage = {
  slug: 'leading-the-team',
  href: '/work/leading-the-team',
  title: 'Leading design for the data platform, 2024 to 2026',
  roleTag: 'Design Manager',
  period: '2024–2026',
  description:
    'Two years managing the designers for Intuit’s enterprise data platform: where I spent my time, one intake and one research base for nine product areas, AI tools in my own work first, what the team shipped, and the people.',
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
    { label: 'Duration', value: 'August 2024 to July 2026' },
    { label: 'My role', value: 'Design manager for the data platform. I set the strategy and the shared research base, and kept designing' },
    { label: 'Team', value: 'Three product designers, across nine product areas, with about 550 engineers and 16 product managers' },
    { label: 'Tools', value: 'A research repository, help-channel mining, Amplitude, one intake and project tracker, v0 and Figma Make, NotebookLM, a promotion case framework' },
  ],
  stats: [
    { value: '1 : 85', label: 'Designers to engineers across the data design group' },
    { value: 'All', label: 'Designers who reported to me were promoted' },
    { value: '2,664 → 6,673', label: 'Monthly users of the platform, Jul 2024 to Mar 2026 · shared' },
  ],
  visuals: [
    {
      id: 'collections',
      after: 'time',
      lead: true,
      src: '/work/agentic-discovery/collections-2025.jpg',
      width: 1920,
      height: 990,
      alt: 'The My Collections page with a Create new collection dialog open: a name, a description and a choice between private and public.',
      caption: 'Collections, shipped August 2025 by a designer on my team. It was not on the roadmap until I argued for it.',
    },
    {
      id: 'tracker',
      after: 'intake',
      lead: true,
      src: '/work/leading-the-team/tracker-2025.jpg',
      width: 2000,
      height: 1087,
      alt: 'The design project tracker: a table of design projects with their product area, status from backlog to shipped, status date, assigned designer and due date, and a link to the requirements document.',
      caption: 'The one tracker, 2025: every design request across the nine areas, with its status, its designer and its requirements. Names blurred.',
    },
    {
      id: 'research',
      after: 'research',
      lead: true,
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
      id: 'maturity',
      after: 'shipped',
      lead: true,
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
            'From August 2024 I managed the designers for Intuit’s data platform: finding and understanding data, access, lineage, health monitoring, reliability, usage tracking, pipeline authoring, publishing and ingestion. Across the data design group that was one designer for every 85 engineers. They shipped the work. I set the strategy and the shared research base, and kept designing.',
        },
        { type: 'wheel' },
        {
          type: 'cards',
          items: [
            { value: '9', title: 'product areas, all nine named above', text: 'About 550 engineers and 16 product managers sent design requests.' },
            { value: '3', title: 'product designers, each owning two or three areas', text: 'A summer 2023 intern I had mentored joined the team full-time.' },
            { value: '24', title: 'launches with design in them, 2024 to 2026', text: 'Across access, lineage, certification, discovery and the agent.' },
          ],
        },
      ],
    },
    {
      id: 'time',
      eyebrow: 'Where I spent my time',
      short: 'My time',
      heading: 'The meetings where a problem gets framed',
      blocks: [
        {
          type: 'p',
          text:
            'My first change as a manager was where I spent my time: in the meetings where a problem was being framed, before a specification existed, asking questions. Two features the roadmap did not have came out of that, a view of the queries other people run against a table and a person’s saved working set of data. My team designed both.',
        },
        {
          type: 'quotes',
          items: [
            { text: 'Your thoroughness in bringing customer conversations, whether it was a month ago or two years ago, always kept us grounded.', who: 'The engineering lead for data understanding, after the offsite', when: 'January 2025' },
          ],
        },
      ],
    },
    {
      id: 'intake',
      eyebrow: 'Focus',
      short: 'Intake',
      heading: 'One intake and one tracker',
      blocks: [
        {
          type: 'p',
          text:
            'Requests came from nine areas and sixteen product managers, so I set up a single intake path and one tracker of what each designer was on. I pushed back when leadership wanted to spread the access designer across instrumentation as well. When a decision stalled, I got the engineering leads and the product managers into one room.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'Sixteen PMs each asked their nearest designer.', decision: 'One intake path and one tracker, visible to every PM, with the requirements document linked on each row.' },
            { tension: 'Leadership wanted the access designer to cover instrumentation as well.', decision: 'No. The designer stayed on access, shipped six launches in a year, and wrote the tracker requirements while the PM was away.' },
            { tension: 'Certification requirements differed across several production paths.', decision: 'PMs and designers in one room until they agreed, so fourth-level certification launched the same way everywhere.' },
          ],
        },
      ],
    },
    {
      id: 'research',
      eyebrow: 'Evidence',
      short: 'Research base',
      heading: 'One research base',
      blocks: [
        {
          type: 'p',
          text:
            'Technical users rarely sit for repeated interviews, so I had the designers pool six months of user visits, eight targeted surveys and eleven mined help channels into one repository. Engineers and product managers used it directly in pitch decks and requirements. My manager wrote that it showed in what was added to the roadmap.',
        },
        {
          type: 'quotes',
          items: [
            { text: 'The feedback summary is great (Ouch!) and I think ALL the platform PMs need to sit down and read this together.', who: 'A platform product manager, on the research summary', when: '2025' },
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
            'Coded prototypes in v0 and Figma Make, so a flow can be used before it is specified; research synthesis in NotebookLM; AI-made launch videos in place of recorded walkthroughs. I used each in my own design work first. My manager wrote that he then saw every designer on my team adopt them. Three practices started on the team from there: coded prototypes with developers, AI-made launch videos that engineering copied, and a design sign-off before release.',
        },
        {
          type: 'cards',
          items: [
            { value: '90%', title: 'less development time on one redesign', text: 'A designer on my team prototyped it in code with the developers instead of handing over a spec.' },
            { value: '1 day', title: 'from twenty transcripts to one set of findings, instead of a week', text: 'Synthesis in NotebookLM, checked against the repository.' },
            { value: '4 rules', title: 'the agent answers by, written as text where it reads them', text: 'For the agent in Cursor and Claude, the specification lives in the repository rather than in a deck.' },
          ],
        },
      ],
    },
    {
      id: 'shipped',
      eyebrow: 'What the team shipped',
      short: 'Shipped',
      heading: 'Access, lineage, certification, discovery',
      blocks: [
        {
          type: 'p',
          text:
            'The team built on the data product model the catalog already ran on: access requested from the table a person is looking at, lineage for incident work, certification to the clean-data standard’s fourth level, and the search and collections work the agent now answers from.',
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
      eyebrow: 'The people',
      short: 'People',
      heading: 'Every designer who reported to me was promoted',
      blocks: [
        {
          type: 'p',
          text:
            'I wrote a six-slide promotion case framework that every designer on the team used. My designers told my manager what they valued: clarity when requirements were unclear, boundaries when work kept changing, and getting the right people into one room to settle a decision. I also hired for the wider design team. We ran a weekly design sync with the tracker on screen, a research readout each time a study closed, and offsites in January 2025 and later that year.',
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Results',
      short: 'Results',
      heading: 'Results, with attribution',
      blocks: [
        {
          type: 'p',
          text:
            'Monthly users of the platform grew from 2,664 to 6,673 while I managed its design, a result many teams share. The results below are the team’s, with my part named in each.',
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

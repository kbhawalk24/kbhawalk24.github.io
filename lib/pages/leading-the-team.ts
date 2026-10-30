import type { ShortPage } from './types'

// Case study: leading design for the data platform, August 2024 to July
// 2026. Five sections: the scope (with the lifecycle wheel), how I managed
// it (five things I put in place), what the team shipped, how the work was
// presented to executives, the people and the results. Figures are from
// the year-end reviews, launch posts and recognition notes listed in
// sources; people are credited by role, never by name.

export const LEADING_THE_TEAM: ShortPage = {
  slug: 'leading-the-team',
  href: '/work/leading-the-team',
  title: 'Leading the designers behind Intuit’s enterprise data platform',
  roleTag: 'Design Manager',
  period: '2024–2026',
  description:
    'Two years managing the designers for Intuit’s enterprise data platform at one designer to 85 engineers: the scope, the five things I ran the team on, what the team shipped, how the work was presented to executives, and the people.',
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
        { text: 'Nine product areas' },
        { text: 'About 550 engineers, 16 product managers', note: '1 : 85' },
        { text: 'Three product designers' },
      ],
    },
    {
      label: 'Systems',
      lines: [
        { text: 'One research base in Marvin', note: '2,890 notes' },
        { text: 'One intake tracker', note: 'all nine areas' },
        { text: 'Six-slide promotion framework' },
      ],
    },
    {
      label: 'Outcomes',
      lines: [
        { text: 'Certified clean data', note: 'under 1% → 80% · shared' },
        { text: 'Stream access', note: '2 to 3 weeks → 3 days' },
        { text: 'Incident investigations', note: 'about 4 hours → minutes' },
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
      caption: 'The shared research base in Marvin, 2026: 2,890 notes from the team’s visits and the mined help channels, in one place engineers and PMs could search.',
    },
    {
      id: 'launch-video',
      after: 'running',
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
      heading: 'Five things I ran the team on',
      blocks: [
        {
          type: 'p',
          text:
            'One designer for every 85 engineers meant I could not scale by reviewing screens or routing tickets. Five things kept the team on the work that mattered.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Design where the problem is defined.',
              text:
                'I moved my own time into the early framing meetings with product managers and engineers, before a specification existed. I wrote the strategy and architecture documents, Search 2.0 and the agent’s rules, that my team extended into new domains, and argued for work that was not on the roadmap: query insights and Collections.',
            },
            {
              lead: 'One research base in Marvin, plus the help channels.',
              text:
                'Technical users rarely sit for repeated interviews, so the designers pooled six months of user visits, eight surveys and eleven mined Slack help channels into one repository, 2,890 notes, that engineers and product managers used directly in pitch decks and requirements.',
            },
            {
              lead: 'Weekly syncs, one intake tracker, decisions that get made.',
              text:
                'One intake path and one tracker for every design request from the sixteen product managers, visible to all of them. Each designer stayed on one domain: when leadership wanted the access designer to cover instrumentation as well, the answer was no, and that designer shipped six launches in a year. When a decision stalled, I put the engineering leads and the product managers in one room until it was made.',
            },
            {
              lead: 'AI tools in my own work first.',
              text:
                'Coded prototypes in v0, AI research synthesis and AI-made launch videos: I used each in my own design work before asking anyone else to, and every designer on the team adopted them. Three practices then started with the team: coded prototypes built with the developers, which took 90% less development time on one redesign; AI-made launch videos, which engineering copied; and a design sign-off before each release.',
            },
            {
              lead: 'A six-slide promotion case framework.',
              text:
                'Six steps: problem framing and scoping, research-driven rigour, execution and cross-functional partnership, the multiplier effect on others, strategic courage and transparency, executive storytelling and impact demos. Every designer on the team used it. The summer 2023 intern converted to full time and joined the team.',
            },
          ],
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
            ['Access to data · one designer', 'Unified request tracker; stream access; restricted tax data; table and encrypted-column requests; bulk access; owner auto-approval', 'Manual requests 25% faster; streams 2–3 weeks → 3 days, 61% approved automatically; 85% fewer ineligible tax-data denials; decryption 9 → 3 days; 5,000 tables in a week, 200+ hours saved; internal data 24 hours → near-instant', 'Launch posts, Dec 2024 to Sep 2025; FY25 review'],
            ['Lineage for incidents · one designer, a second from 2026', 'List-based dependency summary; column-level lineage with readable impact reports, after six user visits and a one-week, seven-concept sprint', 'Root-cause investigations about 4 hours → minutes; 19 marketing data incidents resolved in one tax season', 'FY26 mid-year review'],
            ['Certifying clean data · my team with the data design group', 'Guided fourth-level certification across several production paths', 'Most of the estate certified, from almost none (the figure is in the results below); P0 and P1 incidents 17 → 0 in tax year 2025 · shared', 'Launch post, Nov 2025; AWS re:Invent 2025'],
            ['Discovery and the agent · my team', 'Query insights; stream and marketing-attribute search; Collections; the agent’s response patterns; coded prototypes with developers', '99.99% first-result precision on stream and marketing search; 90% less development time on one redesign; the agent’s results are on its own page', 'Launch posts, May 2025 to Mar 2026; FY26 mid-year review'],
          ],
        },
      ],
    },
    {
      id: 'executive',
      eyebrow: 'Executive communication',
      short: 'Executives',
      heading: 'Presenting the work: the founder, leadership, Investor Day',
      blocks: [
        {
          type: 'p',
          text:
            'Three times the work had to be told to people outside the platform, each time as a before-and-after story rather than a feature list. What I did in each room and what came of it.',
        },
        {
          type: 'table',
          head: ['Forum', 'What I did', 'What came of it'],
          rows: [
            ['General Executives Day, 2025: Intuit’s founder and the executive team', 'As the sole designer on an agentic AI platform for tax experts, I built the before-and-after story with coded prototypes in v0 and end-to-end storyboards, including the mobile experience for customers, under startup-like ambiguity.', 'The founder’s immediate response was about how to monetise it. My manager cited it as a highlight of the organisation’s year; the director of product management and the director of AI science both named it in their reviews.'],
            ['Leadership review, mid FY25: the state of discovery and Search 2.0', 'A strategy presentation to cross-functional leadership and the design team, during heavy delivery pressure on two platform programmes: the behavioural findings from the follow-me-home research, and Search 2.0 framed as an architectural change rather than a UI refresh.', 'Search 2.0, query insights and Collections all shipped in 2025. The engineering manager’s note on it is below.'],
            ['Investor Day, August 2023', 'I wrote the design script and user narrative for Data Copilot: natural language to SQL and conversational data exploration, shown on stage by the CTO.', 'The platform’s AI tooling was shown to investors on stage; the clip is on the agent page.'],
          ],
        },
        {
          type: 'quotes',
          items: [
            {
              text:
                'Her presentation mid FY25 on the state of DDE and what we wanted to do differently with Search 2.0 was a great milestone for the Design team. The continued push for long-requested features like Query Insights and Data Collections is very appreciated, and these items would not have happened if not for Kanchi’s persistence and design sponsorship.',
              who: 'The engineering manager for the catalog',
              when: 'FY25',
            },
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
            'My designers told my manager what they valued: clarity when requirements were unclear, boundaries when work kept changing, and the right people in one room to settle a decision. The results below are the team’s, with my part named in each. Monthly users of the platform grew from 2,664 to 6,673 in the same period, a result many teams share.',
        },
        {
          type: 'table',
          head: ['When', 'What was measured', 'Change', 'Whose result'],
          rows: [
            ['Dec 2024 to Sep 2025', 'Access requests, six launches', 'Streams 2–3 weeks → 3 days; decryption 9 → 3 days', 'The access designer on my team; I kept the designer on access'],
            ['Aug 7, 2025', 'Collections shipped', 'A saved working set of data, now the agent’s context', 'My strategy; designed by my team'],
            ['Tax year 2025', 'Incident investigations with column-level lineage', 'About 4 hours → minutes', 'The lineage designer on my team'],
            ['Nov 2025', 'Share of the data estate meeting the clean-data standard, fourth-level certification', 'Under 1% → 80%', 'Platform-wide; my team designed the certification flow'],
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
    'FY25 and FY26 year-end reviews; FY26 mid-year review; launch posts, Dec 2024 to Mar 2026; recognition notes from the engineering manager, the engineering lead, the product lead, the director of product management, the director of AI science and my manager, 2025 to 2026; AWS re:Invent 2025; Investor Day 2023; Amplitude.',
}

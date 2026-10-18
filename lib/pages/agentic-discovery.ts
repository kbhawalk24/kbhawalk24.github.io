import type { ShortPage } from './types'

export const AGENTIC_DISCOVERY: ShortPage = {
  slug: 'agentic-discovery',
  href: '/work/agentic-discovery',
  title: 'Agentic Discovery in Cursor & Claude',
  roleTag: 'Principal Strategy & Spec · Design Manager',
  period: '2025–2026',
  description:
    'How I moved Intuit’s data catalog out of a standalone chat window and into Cursor and Claude, and wrote the specification for how the agent answers.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: '0-to-1 Catalog & Data Map' },
      { label: 'Search 2.0 & Data Collections' },
      { label: 'Agent in Cursor & Claude' },
    ],
    current: 2,
  },
  stats: [
    { value: '45 min → 4 min', label: 'From a question to an answer' },
    { value: '711', label: 'Active users' },
    { value: '56,560', label: 'Tool calls in 90 days' },
  ],
  sections: [
    {
      id: 'framing',
      heading: 'How the problem was framed',
      blocks: [
        {
          type: 'p',
          text: 'In 2023 I was the sole design lead for a chat assistant inside the catalog. It shipped in four months and Intuit’s CTO presented it at Investor Day 2023, but usage did not hold after 2024. My 20 in-context visits that year showed why: only one person used the AI search at all, and when a first answer failed, people did not come back. They were already working in their editors. With 320,000 tables in the lake and 73.0% of 666 help-channel questions resolved only because someone knew the answer, the question was not a better chat window. It was where the catalog had to live.',
        },
      ],
    },
    {
      id: 'rules',
      heading: 'The system rules, not just screens',
      blocks: [
        {
          type: 'p',
          text: 'I set the strategy: move the catalog into Cursor and Claude through a tool server (MCP). Then I wrote the specification for how the agent answers three kinds of request.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Looking up a known table.',
              text: 'Return its name, description, data product and maturity, last refresh, owner and top users, what depends on it, and whether the person has access.',
            },
            {
              lead: 'Choosing a table for a use case.',
              text: 'Return five candidates, each with the specific reason it matches.',
            },
            {
              lead: 'Asking a question that needs a value.',
              text: 'If one column answers it, show the column and a query. If several tables are needed, state the planned join and why, check the tables exist, check access, then run the query or hand it over.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Four rules sit under all three: check the person’s collections before the wider lake, never invent a table name, never show a query that has not been run, and always ask before running anything.',
        },
      ],
    },
    {
      id: 'trade-offs',
      heading: 'Hard trade-offs and organizational influence',
      blocks: [
        {
          type: 'p',
          text: 'The agent needed a context layer. Research kept saying people mostly return to data they already know, so I argued for Collections, a person’s saved working set of data, as design strategy. Engineering criticized it. I kept arguing until it was on the roadmap. Designers on my team designed Collections and shipped it on August 7, 2025. The engineering manager wrote that it “would not have happened if not for Kanchi’s persistence and design sponsorship.” The agent now checks a person’s collections before it searches anything else.',
        },
        {
          type: 'p',
          text: 'The second trade-off was a specification over screens: the rules about queries and table names cost the agent some fluency, and they are why a first answer can be trusted. I recruited the first users, tested answers against real questions, and refined the rules. A designer on my team built the response patterns that shipped and benchmarked their precision. Engineers built the servers.',
        },
      ],
    },
    {
      id: 'multiplier',
      heading: 'The systemic multiplier',
      blocks: [
        {
          type: 'p',
          text: 'By March 11, 2026 the agent had 711 active users and 56,560 tool calls in 90 days. In an observed-task study, a question to an answer fell from 45 minutes to 4. The specification became the pattern for how the platform answers inside tools; Collections became the agent’s context layer and, in work under way when my role ended, its access boundary. Unsolved: the agent lived in coding tools, not yet in the web catalog. A designer on my team was leading that work.',
        },
      ],
    },
  ],
  next: {
    text: 'The agent only answers well because the search underneath it returns the right table first. Next: how the Search 2.0 rebuild took first-result precision from 81.31% to 89.24% and left the door open for Collections.',
    label: 'Search 2.0 & Data Collections',
  },
  credits:
    'Strategy and the answer specification are mine. Response patterns: a designer on my team. Servers and search models: engineering.',
  sources:
    'Launch post, Mar 16, 2026; FY27 strategy readout; observed-task study, Mar 2026; help-channel analysis, Aug 2025; July 2024 research readout; AWS re:Invent 2025 for the table count.',
}

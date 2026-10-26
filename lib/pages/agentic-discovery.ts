import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: the agent. Each section is an eyebrow, a heading, one lead
// paragraph under 60 words, one visual, and at most one supporting block.
// Figures and their sources are in docs/FINDING-DATA-NARRATIVE.md.

export const AGENTIC_DISCOVERY: ShortPage = {
  slug: 'agentic-discovery',
  href: '/work/agentic-discovery',
  title: 'Building the data discovery agent for Cursor and Claude',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2023–2026',
  description:
    'How Intuit’s data catalog ended up inside Cursor and Claude: an assistant that shipped in 2023 before its search could support it, a saved working set of data, the specification for how the agent answers, and the question I am working on now.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: 'Search 2.0', href: '/work/search-2' },
      { label: 'The agent' },
      { label: 'The catalog', href: '/work/catalog-data-map-lineage' },
      { label: '605', href: '/work/605-tv-analytics' },
    ],
    current: 1,
  },
  facts: [
    { label: 'Duration', value: 'August 2023 to March 2026' },
    {
      label: 'My role',
      value:
        'Sole design lead for the 2023 assistant; design manager writing the agent’s strategy and specification',
    },
    {
      label: 'Team',
      value:
        '16 hackathon teams and 58 collaborators on the assistant; designers on my team took collections and the agent’s responses to launch; catalog PMs, platform engineers and the search-model team',
    },
    {
      label: 'Research',
      value:
        '20 in-context interviews with engineers watching; 666 help-channel questions; Amplitude; an observed-task study of the agent',
    },
  ],
  stats: [
    { value: '45 min → 4 min', label: 'From a question to an answer, with the agent' },
    { value: '711', label: 'Active users of the agent in its first 90 days' },
    { value: '56,560', label: 'Tool calls in those 90 days' },
  ],
  hero: {
    src: '/work/agentic-discovery/hero.mp4',
    poster: '/work/agentic-discovery/hero-poster.jpg',
    tint: TINTS.neutral,
    width: 1340,
    height: 994,
    alt: 'A screen recording of the agent in Cursor. Asked for the usage of the top features in the data discovery app, it searches for tables, writes a SQL query, shows it before running, then runs it and a category breakdown in Databricks.',
    caption: 'The agent inside Cursor, 2026: it finds the right tables, shows the query before it runs, then runs it. Sped up 2.5 times.',
  },
  visuals: [
    {
      id: 'copilot-ask',
      after: 'assistant',
      lead: true,
      src: '/work/agentic-discovery/copilot-ask.jpg',
      width: 2480,
      height: 1756,
      alt: 'Data Copilot open beside a table page. Asked how many companies signed up this year by sales channel, it returns a SQL query and a plain-language explanation of what the query does.',
      caption: 'Data Copilot, 2023, from my prototype: ask a question about the table on screen and it writes the SQL and explains it.',
    },
    {
      id: 'search-2-table',
      after: 'rebuild',
      lead: true,
      src: '/work/agentic-discovery/search-2-table.jpg',
      width: 1440,
      height: 1020,
      alt: 'Search 2.0 results on the Tables tab: each result with its owner, last refresh, row count, queries in the last 30 days and lineage counts.',
      caption: 'Search 2.0, 2024: the five lines of evidence on every result. The 2023 assistant had none of them to work with.',
    },
    {
      id: 'collections',
      after: 'collections',
      lead: true,
      src: '/work/agentic-discovery/collections-2025.jpg',
      width: 1920,
      height: 990,
      alt: 'The My Collections page with a Create new collection dialog open: a name, a description and a choice between private and public.',
      caption: 'Collections, as shipped in August 2025: a person’s saved working set of data, private or shared.',
    },
    {
      id: 'agent-answer',
      after: 'agent',
      lead: true,
      src: '/work/agentic-discovery/agent-answer.jpg',
      width: 2601,
      height: 726,
      alt: 'The data agent answering a question about how job roles use search, with a run query and its results table',
      caption: 'The agent answering a question with a query it has already run, 2026. The answer follows the rules in the next section.',
    },
    {
      id: 'catalog-entry-points',
      after: 'open',
      lead: true,
      kind: 'video',
      src: '/work/agentic-discovery/catalog-entry-points.mp4',
      width: 1600,
      height: 872,
      alt: 'A screen recording of the catalog, May 2026. The home page offers three ways in: a specific asset, a business question, or data for a use case, with a link to open the agent directly. Then a data product page, and a table search with its facets.',
      caption: 'The catalog in May 2026: three ways in on the home page (a specific asset, a business question, a use case), then a data product and a search. Where the agent sits among them is the open question. Sped up 1.8 times.',
    },
  ],
  sections: [
    {
      id: 'problem',
      eyebrow: 'The problem',
      short: 'Problem',
      heading: 'People found data by asking a person',
      blocks: [
        {
          type: 'p',
          text: 'Intuit’s data lake held 320,000 tables. Over one year, 666 questions went to the company’s data help channel. The goal for the catalog had been the same since 2021: someone with a business question should reach data they can trust without asking anyone.',
        },
        {
          type: 'cards',
          items: [
            { value: '43%', title: 'of help-channel questions were people trying to find the right data', text: '666 questions over one year, read and coded one by one.' },
            { value: '73%', title: 'were answered because a specific person happened to know', text: 'In most of those the answer was a table the catalog already listed.' },
            { value: '1 of 20', title: 'people I interviewed used the AI search', text: 'When a first answer failed, people did not come back.' },
          ],
        },
      ],
    },
    {
      id: 'assistant',
      eyebrow: '2023',
      short: 'The assistant',
      heading: 'Data Copilot, 2023',
      blocks: [
        {
          type: 'p',
          text: 'I was the sole design lead for a plain-language data assistant, consolidating 16 hackathon teams and 58 collaborators into one flow for finding tables, writing SQL and translating queries. It shipped in four months, more than 500 people used it each month, and Intuit’s CTO presented it at Investor Day 2023.',
        },
        {
          type: 'video',
          youtube: 'kfpmtVe2OFY',
          start: 2505,
          title: 'Intuit Investor Day 2023',
          caption: 'Intuit Investor Day 2023, from 41:45: the CTO presenting the assistant I designed, describing analysts working up to twice as fast.',
          href: 'https://youtu.be/kfpmtVe2OFY?t=2505',
        },
      ],
    },
    {
      id: 'rebuild',
      eyebrow: '2024',
      short: 'The rebuild',
      heading: 'Usage fell, so the search underneath came first',
      blocks: [
        {
          type: 'p',
          text: 'The assistant could only be as good as its search, and that search reached tables alone, with no metadata to judge a result by. So before any agent, the search had to change. I led that research and rebuild; it has its own page. Two of its findings decided what the agent would be.',
          links: [{ text: 'its own page', href: '/work/search-2' }],
        },
        {
          type: 'cards',
          items: [
            { value: '3 in 4', title: 'searches go back to data the person already knows', text: 'That became Collections, a saved working set the agent checks first.' },
            { value: '81.31% → 89.24%', title: 'first-result precision on Data Map search after Search 2.0', text: 'Precise enough for an agent to build on.' },
            { value: '20 of 20', title: 'people wanted answers where they were working', text: 'That became the agent in Cursor and Claude, instead of another chat window.' },
          ],
        },
      ],
    },
    {
      id: 'collections',
      eyebrow: '2025',
      short: 'Collections',
      heading: 'Collections, 2025',
      blocks: [
        {
          type: 'p',
          text: 'I argued for collections, a person’s saved working set of data, when engineering criticised the idea, and kept it in every roadmap conversation until it was funded. Designers on my team designed it and shipped it on August 7, 2025. The agent now checks a person’s collections before it searches anywhere else.',
        },
        {
          type: 'quotes',
          items: [
            { text: 'Would not have happened if not for Kanchi’s persistence and design sponsorship.', who: 'The engineering manager, at launch', when: 'August 2025' },
          ],
        },
      ],
    },
    {
      id: 'agent',
      eyebrow: '2025 to 2026',
      short: 'The agent',
      heading: 'An agent inside Cursor and Claude',
      blocks: [
        {
          type: 'p',
          text: 'People worked in code editors and notebooks and had to leave them to use the assistant’s chat window, which few did for long. I set the strategy to move the catalog into Cursor and Claude through MCP servers, as an agent with the platform’s search, lineage and access as its tools, and wrote the specification for how it answers three kinds of request.',
        },
        {
          type: 'cards',
          items: [
            { title: 'A table someone already knows', text: 'Its description, data product and quality level, last refresh, owner, who else uses it, what it depends on, and whether the person has access.' },
            { title: 'A table for a use case', text: 'Five candidates, each with the reason it fits.' },
            { title: 'A question that needs a value', text: 'If one column answers it, the column and a query. If it needs a join, which tables and columns and why, checked for existence and access, then run or handed over.' },
          ],
        },
      ],
    },
    {
      id: 'rules',
      eyebrow: 'The rules',
      short: 'Rules',
      heading: 'The four rules',
      blocks: [
        {
          type: 'p',
          text: 'I recruited the first users, tested answers against real questions and refined the rules from what went wrong. A designer on my team built the response patterns that shipped and benchmarked their precision; engineers built the MCP servers.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'The lake has 320,000 tables and the person has a handful they trust.', decision: 'Check the person’s collections before the wider lake.' },
            { tension: 'A model will complete a plausible table name.', decision: 'Never invent a table name. Every name comes from a search result.' },
            { tension: 'A query that looks right is not a result.', decision: 'Never show a query that has not been run.' },
            { tension: 'Queries cost money and can touch restricted data.', decision: 'Always ask before running anything.' },
          ],
        },
      ],
    },
    {
      id: 'open',
      eyebrow: 'The open question',
      short: 'Open question',
      heading: 'Where the agent sits inside the catalog',
      blocks: [
        {
          type: 'p',
          text: 'The agent lives in Cursor and Claude; the catalog still has a search box. In 2026 I wrote the brief for how the two relate, which is the problem I am working on now. It has three modes: lookup for people who can name what they want, an assistant beside the page whose context is whatever is on screen, and a full-screen chat for open-ended work.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'Side by side, people clicked the familiar search box out of habit and never saw the agent.', decision: 'Search and chat keep separate entry points. Which mode a person gets depends on the task, not on their job title.' },
            { tension: 'People did not want to lose the thread when they opened a result.', decision: 'Links inside the chat open in a new tab. Expanding to the full-screen view keeps the person’s place.' },
            { tension: 'Still open: what the assistant says when a person moves to a new page, or to a page with no clear subject.', decision: 'Testing now. The assistant always says what it is looking at.' },
          ],
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
          text: 'By March 11, 2026 the agent had 711 active users and 56,560 tool calls in its first 90 days. In an observed-task study, the time from a question to an answer fell from 45 minutes to 4.',
        },
        {
          type: 'table',
          head: ['When', 'What was measured', 'Change', 'Whose result'],
          rows: [
            ['2023', 'Analysts using the 2023 assistant', 'Up to 2x faster; 500+ people a month', 'My design; figure from the CTO at Investor Day'],
            ['Aug 7, 2025', 'Collections shipped', 'A saved working set of data, now the agent’s context', 'My strategy; designed by my team'],
            ['Mar 2026', 'From a question to an answer, with the agent', '45 min → 4 min', 'My strategy and specification; shared'],
            ['Mar 11, 2026', 'Agent adoption in its first 90 days', '711 active users; 56,560 tool calls', 'Shared'],
          ],
        },
      ],
    },
  ],
  next: {
    text: 'The agent was built by a team I managed. Next: how I ran that team, across nine product areas.',
    label: 'Leading design for the data platform, 2024 to 2026',
    href: '/work/leading-the-team',
  },
  credits:
    'The research, the collections strategy, the 2023 assistant and the agent’s specification are mine. Designers on my team designed collections and built the agent’s response patterns. Engineers and the search-model team delivered the precision and speed and built the agent’s servers.',
  sources:
    'Help-channel analysis, Aug 2025; July 2024 research readout; Search 2.0 specification, June 2024; launch posts of Nov 14, 2024, Mar 26, 2025, Aug 7, 2025 and Mar 16, 2026; Amplitude; FY24 year-end review; FY27 strategy readout; observed-task study, Mar 2026; Intuit Investor Day 2023 transcript for the CTO’s description; AWS re:Invent 2025 for the table count.',
}

import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study 1: Finding data, from search to an agent. Search 2.0 is folded
// in as the research and craft chapter. Structure: how I think through a
// problem. The problem with evidence, how I framed it, three decisions, what
// went wrong in between, and an impact table with source and attribution.

export const AGENTIC_DISCOVERY: ShortPage = {
  slug: 'agentic-discovery',
  href: '/work/agentic-discovery',
  title: 'Finding data: from an assistant to an agent',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2023–2026',
  description:
    'The strategy behind putting Intuit’s data catalog inside Cursor and Claude: an assistant that came too early, what the search rebuild taught, a place to keep the data people reuse, the specification for how the agent answers, and the question I am working on now.',
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
        'Sole design lead for the 2023 assistant; principal designer for the search research and rebuild; design manager writing the agent’s strategy and specification',
    },
    {
      label: 'Team',
      value:
        '16 hackathon teams and 58 collaborators on the assistant; designers on my team took map search, collections and the agent’s responses to launch; catalog PMs, platform engineers and the search-model team',
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
      id: 'agent-answer',
      src: '/work/agentic-discovery/agent-answer.jpg',
      width: 2601,
      height: 726,
      alt: 'The data agent answering a question about how job roles use search, with a run query and its results table',
      caption: 'The data agent answering a question with a query it has already run. I wrote the rules for how it answers.',
    },
    {
      id: 'copilot-ask',
      src: '/work/agentic-discovery/copilot-ask.jpg',
      width: 2480,
      height: 1756,
      after: 'assistant',
      alt: 'Data Copilot open beside a table page. Asked how many companies signed up this year by sales channel, it returns a SQL query and a plain-language explanation of what the query does.',
      caption: 'Data Copilot, 2023, from my prototype: ask a question about the table on screen and it writes the SQL and explains it.',
    },
    {
      id: 'collections',
      after: 'collections',
      alt: 'A collection: a person’s saved working set of data products, shared with teammates',
      caption: 'A collection, a person’s saved working set of data, as shipped in August 2025.',
      todo: 'Frame from the 8_04_25 Data Collections launch video or export from DDE - Data Collections.fig; remove names.',
    },
    {
      id: 'spec-excerpt',
      after: 'agent',
      alt: 'An excerpt of the agent specification: the three kinds of request and what the agent returns for each',
      caption: 'The specification: three kinds of request, and what the agent must return for each.',
      todo: 'Screenshot an excerpt of the spec ("Updating Cursor Output"); redact names.',
    },
  ],
  sections: [
    {
      id: 'problem',
      eyebrow: 'The problem',
      short: 'Problem',
      heading: 'The problem: people found data by asking a person',
      blocks: [
        {
          type: 'p',
          text: 'Intuit’s data lake held 320,000 tables. Over one year, 666 questions went to the company’s data help channel. 43% were people trying to find the right data, and 73% were answered only because a specific person happened to know. One analyst found two customer tables with nearly identical names and had to ask which to trust, because one had not been refreshed in over a year.',
        },
        {
          type: 'p',
          text: 'The goal stayed the same for five years: someone with a business question should reach data they can trust without asking anyone.',
        },
      ],
    },
    {
      id: 'assistant',
      eyebrow: 'Where it started',
      short: 'The assistant',
      heading: 'Where it started: an assistant that came before its search was ready',
      blocks: [
        {
          type: 'p',
          text: 'In 2023 I was the sole design lead for a plain-language data assistant. I consolidated the work of 16 hackathon teams and 58 collaborators into one flow for finding tables, writing SQL and translating queries. It shipped in four months, more than 500 people used it each month, and Intuit’s CTO presented it at Investor Day 2023, describing analysts working up to twice as fast.',
        },
        {
          type: 'video',
          youtube: 'kfpmtVe2OFY',
          start: 2505,
          title: 'Intuit Investor Day 2023',
          caption: 'Intuit Investor Day 2023, from 41:45: the CTO presenting the assistant I designed.',
          href: 'https://youtu.be/kfpmtVe2OFY?t=2505',
        },
        {
          type: 'p',
          text: 'Usage did not hold after 2024. The assistant was only as good as the search underneath it, and that search reached tables and nothing else: columns, topics, data products and dashboards were outside it, so a question about any of those had no answer. The tables it did find came with little to judge them by, none of the metadata Search 2.0 later put on every result, so when the first answer named the wrong table people had to go back and forth with it. Most of the time they did not want a conversation at all. They wanted to look a table up and get on with their work. Only one of the 20 people I later interviewed used the AI search, and when a first answer failed, people did not come back.',
        },
        {
          type: 'p',
          text: 'That set the order of the work that followed: make search precise first, then give people a place for the data they reuse, and only then bring the agent back.',
        },
      ],
    },
    {
      id: 'rebuild',
      eyebrow: 'The rebuild',
      short: 'The rebuild',
      heading: 'Between the assistant and the agent: fix the search underneath',
      blocks: [
        {
          type: 'p',
          text:
            'The assistant answered from search as it was: tables only, with none of the metadata a person needs to judge a result. So before any agent, the search had to change. That work has its own page. In short: I followed twenty people through a search, wrote a specification that gave each kind of object its own tab and each result five lines of evidence, and the team shipped table search in November 2024 and map search in March 2025, with the first result right 89.24% of the time instead of 81.31%. Two findings from that research set the agent’s shape: three searches in four go back to data the person already knows, and people wanted answers where they were working, not in another window.',
          links: [{ text: 'its own page', href: '/work/search-2' }],
        },
      ],
    },
    {
      id: 'collections',
      eyebrow: 'Collections',
      short: 'Collections',
      heading: 'Decision 2: give people a home for the data they reuse',
      blocks: [
        {
          type: 'p',
          text: 'If four searches in five go back to known data, the fastest search is no search. I argued for collections, a person’s saved working set of data, even though engineering criticized the idea, and kept it in every roadmap conversation until it was funded.',
        },
        {
          type: 'p',
          text: 'Designers on my team designed collections and shipped it on August 7, 2025. The engineering manager wrote that it “would not have happened if not for Kanchi’s persistence and design sponsorship.” It became more than a list: the agent checks a person’s collections before it searches anywhere else.',
        },
      ],
    },
    {
      id: 'agent',
      eyebrow: 'The agent',
      short: 'The agent',
      heading: 'Decision 3: put the catalog where people already work',
      blocks: [
        {
          type: 'p',
          text: 'By 2025 search returned the right table first most of the time, and collections held the data each person reused. That made an agent worth trying again, but not as another chat window: people worked in their code editors and notebooks, and a chat window somewhere else was a place to visit, not a place to work. I set the strategy to move the catalog into the coding tools people already used, Cursor and Claude, as an agent with the platform’s search, lineage and access as its tools, so finding data, checking access and running the query happen in one place.',
        },
        {
          type: 'p',
          text: 'I wrote the specification for how the agent answers three kinds of request.',
        },
        {
          type: 'list',
          items: [
            { lead: 'A table someone already knows.', text: 'Its description, the data product it belongs to and its quality level, when it was last refreshed, its owner, who else uses it, what it depends on, and whether the person has access.' },
            { lead: 'A table for a use case.', text: 'Five candidates, each with the reason it fits.' },
            { lead: 'A question that needs a value.', text: 'If one column answers it, show the column and a query. If it needs a join, say which tables and columns and why, check they exist and that the person has access, then run the query or hand it over.' },
          ],
        },
        {
          type: 'p',
          text: 'Four rules sit under all three: check the person’s collections before the wider lake, never invent a table name, never show a query that has not been run, and always ask before running anything. I recruited the first users, tested answers against real questions and refined the rules. A designer on my team built the response patterns that shipped and benchmarked their precision; engineers built the servers.',
        },
        {
          type: 'p',
          text: 'By March 11, 2026 the agent had 711 active users and 56,560 tool calls in 90 days. In an observed-task study, the time from a question to an answer fell from 45 minutes to 4.',
        },
      ],
    },
    {
      id: 'open',
      eyebrow: 'The open question',
      short: 'Open question',
      heading: 'The question after the agent: where should it live?',
      blocks: [
        {
          type: 'p',
          text:
            'The agent lives in Cursor and Claude. The catalog itself still has a search box. In 2026 I wrote the brief for how the two should relate, and it is the problem I am working on now. Three modes: lookup, for people who can name what they want; an assistant beside the page, whose context is whatever table or search is on screen; and an immersive chat for open-ended work, with the page it came from still visible. Four rules that hold across them: the mode follows the intent, never the persona; the assistant’s context follows the page and always says what it is looking at; a person can expand to the immersive view from anywhere, and only they can; and expanding never loses their place.',
        },
        {
          type: 'p',
          text:
            'Two decisions so far, each from testing with users. Search and chat keep separate entry points, because when the two sat side by side people clicked the familiar search box out of habit and never saw the agent. And links inside the chat open in a new tab by default, because people did not want to lose the thread. What is still open: how the assistant should signal that its context has changed when a person moves to a new page, and what it should do on a page with no clear subject.',
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Impact',
      short: 'Impact',
      heading: 'Impact',
      blocks: [
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
    text: 'The agent answers from a catalog that took five years to build. Next: how it went from a list of tables to a platform.',
    label: 'The catalog, from tables to a platform',
    href: '/work/catalog-data-map-lineage',
  },
  credits:
    'The research, the search design, the collections strategy, the 2023 assistant and the agent’s specification are mine. Designers on my team took map search to launch, designed collections and built the agent’s response patterns. Engineers and the search-model team delivered the precision and speed and built the agent’s servers.',
  sources:
    'Help-channel analysis, Aug 2025; July 2024 research readout; Search 2.0 specification, June 2024; launch posts of Nov 14, 2024, Mar 26, 2025, Aug 7, 2025 and Mar 16, 2026; Amplitude; FY24 year-end review; FY27 strategy readout; observed-task study, Mar 2026; Intuit Investor Day 2023 transcript for the CTO’s description; AWS re:Invent 2025 for the table count.',
}

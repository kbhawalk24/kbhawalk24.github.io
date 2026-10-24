import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: the agent. Each section is an eyebrow, a heading, one lead
// paragraph under 60 words, one visual, and at most one supporting block.
// Figures and their sources are in docs/FINDING-DATA-NARRATIVE.md.

export const AGENTIC_DISCOVERY: ShortPage = {
  slug: 'agentic-discovery',
  href: '/work/agentic-discovery',
  title: 'Finding data: from an assistant to an agent',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2023–2026',
  description:
    'The strategy behind putting Intuit’s data catalog inside Cursor and Claude: an assistant that came too early, a place to keep the data people reuse, the specification for how the agent answers, and the question I am working on now.',
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
      caption: 'Search 2.0, 2024: the five lines of evidence on every result that the assistant never had.',
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
      caption: 'The agent answering a question with a query it has already run, 2026. The answer follows the rules below.',
    },
    {
      id: 'agent-beside-page',
      after: 'open',
      lead: true,
      src: '/work/agentic-discovery/agent-beside-page-2026.jpg',
      width: 1440,
      height: 1024,
      alt: 'Search results on the Tables tab with an Agent Chat panel open on the right. The panel shows the exact match for the query and says which table the person last viewed.',
      caption: 'The assistant beside the page, 2026 design: its context is the search on screen, and it says so.',
    },
    {
      id: 'agent-immersive',
      after: 'open',
      lead: true,
      src: '/work/agentic-discovery/agent-immersive-2026.jpg',
      width: 1436,
      height: 1045,
      alt: 'The AI Mode tab of search: a full-width chat with the question, a show-thinking toggle, the matching table with its maturity score and an ask-anything box.',
      caption: 'The immersive mode, 2026 design: the same conversation expanded, with the search tabs still in reach.',
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
          text: 'Intuit’s data lake held 320,000 tables. Over one year, 666 questions went to the company’s data help channel. The goal stayed the same for five years: someone with a business question should reach data they can trust without asking anyone.',
        },
        {
          type: 'cards',
          items: [
            { value: '43%', title: 'of help-channel questions were people trying to find the right data', text: '666 questions over one year, read and coded one by one.' },
            { value: '73%', title: 'were answered only because a specific person happened to know', text: 'The proof lived with people, not in the catalog.' },
            { value: '1 of 20', title: 'people I interviewed used the AI search', text: 'When a first answer failed, people did not come back.' },
          ],
        },
      ],
    },
    {
      id: 'assistant',
      eyebrow: '2023',
      short: 'The assistant',
      heading: 'An assistant that came before its search was ready',
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
      heading: 'Usage did not hold, so I fixed the search underneath first',
      blocks: [
        {
          type: 'p',
          text: 'The assistant was only as good as its search, and that search reached tables and nothing else, with no metadata to judge a result by. So before any agent, the search had to change. I led that research and rebuild; it has its own page. Two of its findings set the agent’s shape.',
          links: [{ text: 'its own page', href: '/work/search-2' }],
        },
        {
          type: 'cards',
          items: [
            { value: '3 in 4', title: 'searches go back to data the person already knows', text: 'The fastest search is no search. That became collections.' },
            { value: '89%', title: 'first results right, up from 81%, after Search 2.0', text: 'Precise enough for an agent to build on.' },
            { value: '20 of 20', title: 'people wanted answers where they were working', text: 'Not in another window. That became the agent in Cursor and Claude.' },
          ],
        },
      ],
    },
    {
      id: 'collections',
      eyebrow: '2025',
      short: 'Collections',
      heading: 'Give people a home for the data they reuse',
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
      heading: 'Put the catalog where people already work',
      blocks: [
        {
          type: 'p',
          text: 'People worked in code editors and notebooks; a chat window somewhere else was a place to visit, not a place to work. I set the strategy to move the catalog into Cursor and Claude as an agent with the platform’s search, lineage and access as its tools, and wrote the specification for how it answers three kinds of request.',
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
      heading: 'Four rules under every answer',
      blocks: [
        {
          type: 'p',
          text: 'I recruited the first users, tested answers against real questions and refined the rules. A designer on my team built the response patterns that shipped and benchmarked their precision; engineers built the servers.',
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
      heading: 'Where should the agent live inside the catalog?',
      blocks: [
        {
          type: 'p',
          text: 'The agent lives in Cursor and Claude; the catalog still has a search box. In 2026 I wrote the brief for how the two relate, the problem I am working on now: lookup for people who can name what they want, an assistant beside the page whose context is whatever is on screen, and an immersive chat for open-ended work.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'Side by side, people clicked the familiar search box out of habit and never saw the agent.', decision: 'Search and chat keep separate entry points. The mode follows the intent, never the persona.' },
            { tension: 'People did not want to lose the thread when they opened a result.', decision: 'Links inside the chat open in a new tab. Expanding to the immersive view never loses their place.' },
            { tension: 'Still open: what the assistant says when a person moves to a new page, or to a page with no clear subject.', decision: 'Testing now. The assistant always says what it is looking at.' },
          ],
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Impact',
      short: 'Impact',
      heading: 'What changed, and whose result it is',
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
    text: 'The agent answers from a catalog that took five years to build. Next: how it went from a list of tables to a platform.',
    label: 'The catalog, from tables to a platform',
    href: '/work/catalog-data-map-lineage',
  },
  credits:
    'The research, the collections strategy, the 2023 assistant and the agent’s specification are mine. Designers on my team designed collections and built the agent’s response patterns. Engineers and the search-model team delivered the precision and speed and built the agent’s servers.',
  sources:
    'Help-channel analysis, Aug 2025; July 2024 research readout; Search 2.0 specification, June 2024; launch posts of Nov 14, 2024, Mar 26, 2025, Aug 7, 2025 and Mar 16, 2026; Amplitude; FY24 year-end review; FY27 strategy readout; observed-task study, Mar 2026; Intuit Investor Day 2023 transcript for the CTO’s description; AWS re:Invent 2025 for the table count.',
}

import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study 1: Finding data, from search to an agent. Search 2.0 is folded
// in as the research and craft chapter. Structure: how I think through a
// problem. The problem with evidence, how I framed it, three decisions, what
// went wrong in between, and an impact table with source and attribution.

export const AGENTIC_DISCOVERY: ShortPage = {
  slug: 'agentic-discovery',
  href: '/work/agentic-discovery',
  title: 'Finding data: from search to an agent',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2023–2026',
  description:
    'How I took finding data at Intuit from a 2023 assistant that came too early, through a search rebuild and collections, to an agent inside Cursor and Claude, and the specification for how it answers.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: 'Finding data' },
      { label: 'The catalog, from tables to a platform', href: '/work/catalog-data-map-lineage' },
      { label: '605', href: '/work/605-tv-analytics' },
    ],
    current: 0,
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
    { value: '81.31% → 89.24%', label: 'Searches where the first result was right' },
    { value: '711', label: 'Active users of the agent by March 2026' },
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
      id: 'search-2-table',
      src: '/work/agentic-discovery/search-2-table.jpg',
      width: 1440,
      height: 1020,
      after: 'search',
      full: true,
      alt: 'Table search results in the Search 2.0 design. Filters on the left for hidden results, compliance, usage, schema and maturity. Each result shows its path, description and tags, and on the right its owner team, last refresh, size, query count and upstream and downstream counts.',
      caption: 'My Search 2.0 design for table results, 2024: every result carries what a person needs to judge it, from last refresh to how many queries use it.',
    },
    {
      id: 'click-depth',
      full: true,
      src: '/work/agentic-discovery/amplitude-click-depth.jpg',
      width: 2087,
      height: 930,
      after: 'search',
      alt: 'Stacked monthly bars showing which search result people clicked, with the first result the large majority every month',
      caption: 'Which result people clicked, November 2025 to May 2026. The first result carries most clicks every month.',
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
          text: 'Usage did not hold after 2024. The assistant was only as good as the search underneath it, and search was not precise enough yet: when the first answer named the wrong table, people had to go back and forth with it to get to the right one. Most of the time they did not want a conversation at all. They wanted to look a table up and get on with their work. Only one of the 20 people I later interviewed used the AI search, and when a first answer failed, people did not come back.',
        },
        {
          type: 'p',
          text: 'That set the order of the work that followed: make search precise first, then give people a place for the data they reuse, and only then bring the agent back.',
        },
      ],
    },
    {
      id: 'framing',
      heading: 'How I framed it: watch people work, not ask what they want',
      blocks: [
        {
          type: 'p',
          text: 'To understand what people needed instead, in spring 2024 I interviewed 20 catalog users across business units while they did their own work, and brought engineers along to watch. Then I ran a workshop with the whole team. The group product lead called the research “a major contributor to our FY25 roadmap.” Three findings set the direction for everything after.',
        },
        {
          type: 'list',
          items: [
            { lead: 'People know what kind of data they want.', text: 'They arrive knowing whether they need a table or a stream, so search should start there, not make them filter for it.' },
            { lead: 'Four times in five, they go back to data they already know.', text: 'Only about one search in five is for something new. Search was never the whole job.' },
            { lead: 'Trust decides the click.', text: 'People checked freshness, owners and past queries before using anything, and asked a colleague when the catalog could not tell them.' },
          ],
        },
      ],
    },
    {
      id: 'search',
      heading: 'Decision 1: rebuild search around what people already know',
      blocks: [
        {
          type: 'p',
          text: 'The old search split results into a catalog and a map and left people to work out which one held their data. I wrote the Search 2.0 specification in June 2024 around five rules.',
        },
        {
          type: 'list',
          items: [
            { lead: 'One tab per kind of data.', text: 'Tables, the Data Map, real-time streams, feature sets, dashboards and marketing attributes, each with its own tab.' },
            { lead: 'Filters and facets do different jobs.', text: 'A filter is the kind of data and never changes; a facet is a property of the results and changes with the query, with four behaviors depending on how many values it has.' },
            { lead: 'Five lines per result, no more.', text: 'Split between signals of health, such as freshness and quality, and signals of use, such as how often a table is queried.' },
            { lead: 'Cut what would not ship well.', text: 'Nested facet browsing came out of the first release after engineering review, and tags were left open when a reviewer warned they would turn subjective.' },
            { lead: 'No unverified AI text by default.', text: 'When two of the first three reviewers said AI-written descriptions felt untrustworthy, we stopped showing unverified ones and put human editing first.' },
          ],
        },
        {
          type: 'p',
          text: 'Table search launched on November 14, 2024, with keyword precision up 12.5% and semantic precision up 58%. After I became a manager, a designer on my team took my design for searching the map to launch on March 26, 2025, across 10,000 data products and 460,000 attributes: the first result was right 89.24% of the time, up from 81.31%, and 99 in 100 searches finished in 1.93 seconds instead of 50.59.',
        },
        {
          type: 'p',
          text: 'What it cost: the instrumentation showed exact-name searches got slightly worse while everything else improved, dipping from 96% to 94% top-five clicks in July 2025 before recovering to 95%. The lesson I took: an exact name deserves its own fast path.',
        },
      ],
    },
    {
      id: 'collections',
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
      id: 'impact',
      heading: 'Impact',
      blocks: [
        {
          type: 'table',
          head: ['When', 'What was measured', 'Change', 'Whose result'],
          rows: [
            ['2023', 'Analysts using the 2023 assistant', 'Up to 2x faster; 500+ people a month', 'My design; figure from the CTO at Investor Day'],
            ['Nov 14, 2024', 'Table search precision', '+12.5% keyword, +58% semantic', 'My design; engineering built the ranking'],
            ['Mar 26, 2025', 'Searches where the first result was right', '81.31% → 89.24%', 'My design, taken to launch by a designer on my team'],
            ['Mar 26, 2025', 'Time for 99 in 100 searches', '50.59 s → 1.93 s', 'Engineering and the search-model team'],
            ['Aug 7, 2025', 'Collections shipped', 'A saved working set of data, now the agent’s context', 'My strategy; designed by my team'],
            ['Mar 2026', 'From a question to an answer, with the agent', '45 min → 4 min', 'My strategy and specification; shared'],
            ['Mar 11, 2026', 'Agent adoption in its first 90 days', '711 active users; 56,560 tool calls', 'Shared'],
          ],
        },
      ],
    },
  ],
  next: {
    text: 'Finding data only works if the catalog underneath it can be trusted. Next: how I built that catalog from a list of tables into a platform.',
    label: 'The catalog, from tables to a platform',
    href: '/work/catalog-data-map-lineage',
  },
  credits:
    'The research, the search design, the collections strategy, the 2023 assistant and the agent’s specification are mine. Designers on my team took map search to launch, designed collections and built the agent’s response patterns. Engineers and the search-model team delivered the precision and speed and built the agent’s servers.',
  sources:
    'Help-channel analysis, Aug 2025; July 2024 research readout; Search 2.0 specification, June 2024; launch posts of Nov 14, 2024, Mar 26, 2025, Aug 7, 2025 and Mar 16, 2026; Amplitude; FY24 year-end review; FY27 strategy readout; observed-task study, Mar 2026; Intuit Investor Day 2023 transcript for the CTO’s description; AWS re:Invent 2025 for the table count.',
}

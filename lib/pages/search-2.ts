import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: Search 2.0. Edited 13 Nov 2026 from the deck-ordered readout
// (13 sections, about 4,200 words) into eight sections led by decisions:
// the problem; the research; three decisions (split by kind of data, a
// result you can judge, filters people can see), each with the finding from
// the July 2024 design review deck that led to it; one framework for five
// searches; what was cut to ship; results and what it set up. One table.
// Sources: that deck and its images, the June 2024 design document, the
// design frames in public/work/search-2, the May 2026 recording, launch
// posts, the 726-question help desk summary, Amplitude. People are credited
// by role, never by name; names in screenshots are blurred or cropped out.

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Rebuilding search for Intuit’s data catalog: 320,000 tables, 10,000 data products',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2024–2025',
  description:
    'Search 2.0 rebuilt search in Intuit’s data catalog, used by about 6,600 people a month. I led the research and wrote the design specification in 2024, then managed the designers who extended it. Results are now split by kind of data, each shows five lines of evidence to judge it by, and first-result precision rose from 81.31% to 89.24%.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: 'Catalog search' },
      { label: 'The agent', href: '/work/agentic-discovery' },
      { label: 'The catalog', href: '/work/catalog-data-map-lineage' },
      { label: '605', href: '/work/605-tv-analytics' },
    ],
    current: 0,
  },
  facts: [
    { label: 'Role', lines: [
      { text: 'Principal Product Designer', note: 'Jan to Aug 2024' },
      { text: 'Product Design Manager', note: 'Aug 2024 to 2026' },
    ] },
    { label: 'Scope', lines: [
      { text: 'Intuit’s data platform' },
      { text: '320,000 tables' },
      { text: '10,000 data products' },
      { text: 'about 6,600 monthly users' },
    ] },
    { label: 'Research', lines: [
      { text: '20 Follow-Me-Home sessions', note: '9 business units' },
      { text: 'An in-person design workshop' },
      { text: '666 Slack help threads' },
      { text: '726 help-desk questions' },
    ] },
    { label: 'Shipped', lines: [
      { text: 'Table search', note: 'Nov 2024' },
      { text: 'Data Map search', note: 'Mar 2025' },
      { text: 'Stream, CDC and marketing search', note: 'Jun to Aug 2025' },
      { text: 'Old search switched off', note: 'Sep 2025' },
    ] },
  ],
  stats: [
    { value: '81.31% → 89.24%', label: 'First-result precision, Data Map search, Mar 2025' },
    { value: '32% → 63%', label: 'Searches that ended in a click, Jan 2024 to Jan 2026' },
    { value: '14.2 h → 9.4 h', label: 'Time to discover data, Aug 2024 to Jul 2025' },
  ],
  hero: {
    src: '/work/search-2/hero.mp4',
    poster: '/work/search-2/hero-poster.jpg',
    width: 1600,
    height: 872,
    tint: TINTS.platform2026,
    alt: 'A screen recording of the shipped search, 2026: a query typed into the Tables tab, results with their owner, last refresh and queries run, and the maturity score opened on the first result.',
    caption: 'The search as it shipped, recorded May 2026: a tab for each kind of data, facets that change with the query, and five lines of signal on every result. The recording plays at 1.5× speed.',
  },
  visuals: [
    {
      id: 'before',
      src: '/work/search-2/f/before-same-names.jpg',
      width: 1330,
      height: 470,
      alt: 'The old results for “company status”: rows of columns all named company_status with identical descriptions, a single table among them, and an empty Details column.',
      caption: 'Before, 2024: a search for “company status”. The same name and the same description on row after row, and an empty Details column.',
    },
    {
      id: 'after',
      src: '/work/search-2/f/after-design.jpg',
      width: 1440,
      height: 972,
      alt: 'The table search as designed in June 2024: a Tables tab, a filter column on the left with every control visible, and results that each show the name, path, description and badges on the left and the owner, last refreshed date, size, queries and lineage on the right.',
      caption: 'After, as designed in June 2024: results split by kind of data, filters in view, and evidence on every result.',
    },
    {
      id: 'haystack',
      after: 'problem',
      lead: true,
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One marketing manager’s path to find and validate one dataset. In the readout I called the pile they were searching “the haystack”.',
    },
    {
      id: 'raw-notes',
      after: 'research',
      lead: true,
      src: '/work/search-2/raw-notes-board-2024.jpg',
      width: 2400,
      height: 619,
      alt: 'The synthesis board from the April 2024 sessions: one row of sticky notes per person, grouped by role, data analysts 1 to 8, software engineers 1 to 4, data engineers, marketing managers, a solutions architect, product managers and machine-learning engineers.',
      caption: 'Every session’s notes on one board, a row per person, grouped by role.',
    },
    {
      id: 'd4d-votes',
      after: 'research',
      src: '/work/search-2/d4d-votes-2024.jpg',
      width: 1396,
      height: 1570,
      alt: 'A whiteboard from the design workshop listing ideas with dot votes beside each: people as first-class objects or a social network, 5; index enterprise docs and tools, 6; Stack Overflow, Twitter or Reddit style, 3; personalise with suggested filters by team and domain, 6; connect with experts, 3; use cases as a first-class object; bounties to find or create data, a data marketplace, 7; next-action coaching if you do not find something, 3; embed with a team or domain; “do it for me” AI data butler, 5.',
      caption: 'The workshop’s ideas with the team’s votes, April 2024.',
    },
    {
      id: 'annotated',
      after: 'tabs',
      lead: true,
      src: '/work/search-2/design-annotated-2024.png',
      width: 2000,
      height: 1446,
      alt: 'The table search design, annotated. Nine tabs across the top, noted “Separate search results by object type, as people often know broadly what they are looking for”. Type pills for Schemas, Tables and Columns with a clean-data toggle, noted “Remove dropdowns to improve discoverability of filters”. A filter column with a searchable Schema list, noted “Search within a specific schema”, business-unit tags, noted “BU Tags”, and Data Maturity stars. Four results, a table, two columns and a schema: queries run and times joined are noted “Social trust”, the column’s type and profile “Additional metadata”, and the path line “Longer names and descriptions on hover”.',
      caption: 'The design I presented in the readout. Each yellow note names the finding that change answers.',
    },
    {
      id: 'tabs',
      after: 'tabs',
      src: '/work/search-2/decision-tabs.png',
      width: 820,
      height: 240,
      alt: 'The shipped search, 2026: four tabs, Data Map, Tables, CDC Attributes and Topics, with the first table result under them.',
      caption: 'The shipped tabs, 2026: Data Map, Tables, CDC Attributes and Topics.',
    },
    {
      id: 'result',
      after: 'result',
      lead: true,
      src: '/work/search-2/decision-result.png',
      width: 1030,
      height: 520,
      alt: 'Four table results in the second design iteration. Each has a type icon, the name with an endorsement mark and maturity stars, the path, a two-line description and badges on the left; on the right the owning team, last refreshed date, column and row counts with a health ring, queries by users, and upstream and downstream lineage counts. Rows without data say “No queries run in the last 30 days” and “Lineage not available”.',
      caption: 'The result in its second iteration: what the thing is on the left, whether to believe it on the right, and a plain sentence wherever a signal is missing.',
    },
    {
      id: 'filters',
      after: 'facets',
      lead: true,
      src: '/work/search-2/decision-filters.png',
      width: 660,
      height: 470,
      alt: 'The filter column of the table search design beside the first results: Only show tables in data map; Hidden Results with Hide temporary data and Hide deprecated data; Compliance with 7216 and SOX; Usage.',
      caption: 'The filter column as designed: every control visible with its state, in the words people used.',
    },
    {
      id: 'datamap',
      after: 'framework',
      lead: true,
      src: '/work/search-2/decision-datamap.png',
      width: 1440,
      height: 1050,
      alt: 'The Data Map tab design: the same layout as table search, with Data Products and Attributes pills, facets for Datamap folders, Data Freshness, CDC, Hosting Location and Type on the left, and results whose right side lists where each product lives: Datalake tables, Kafka topics and CDC attributes, by environment. A Search 2.0 toggle sits in the header.',
      caption: 'Data Map search on the same skeleton. The right side answers a different question: where does this data product physically live?',
    },
    {
      id: 'spec-columns',
      after: 'cuts',
      lead: true,
      src: '/work/search-2/spec-table-results-2024.jpg',
      width: 1110,
      height: 940,
      alt: 'The table results as designed in June 2024: the Tables tab with a filter column on the left, a table result followed by two column results for customer_account_id and a schema result, each with its own details.',
      caption: 'The Tables tab as designed: columns and schemas as their own results, each with their own evidence. Both were cut before launch.',
    },
  ],
  sections: [
    {
      id: 'problem',
      eyebrow: 'The problem',
      short: 'The problem',
      heading: 'Finding data was the longest phase of a project, and it ran through six tools',
      blocks: [
        {
          type: 'p',
          text:
            'Data discovery was the longest phase in the projects our users ran. The catalog had been built around analysts: in early 2024, 61% of analysts found data in it, against 13% of software developers and 5% of technical marketers. We did not know enough about anyone else.',
        },
        {
          type: 'p',
          text:
            'People on average jumped across six different tools to find and validate data, because one tool lacks the context of the other. Inside the catalog, a search returned hundreds of results, many with the same name and the same description, and nothing on the row to judge them by.',
        },
      ],
    },
    {
      id: 'research',
      eyebrow: 'Research',
      short: 'Research',
      heading: 'Twenty sessions, one question, and three things search could fix now',
      blocks: [
        {
          type: 'p',
          text:
            'I led twenty Follow-Me-Home sessions with the product manager across nine business units, and the catalog engineering team sat in. We asked each person to walk us through a recent time they successfully found data at Intuit. An in-person design workshop then turned the findings into ideas and ranked them. The product manager later called the series “a major contributor to our FY25 roadmap.”',
        },
        {
          type: 'chips',
          items: [
            { count: '8', label: 'data analysts', icon: 'chart' },
            { count: '4', label: 'software engineers', icon: 'code' },
            { count: '2', label: 'data engineers', icon: 'wrench' },
            { count: '2', label: 'ML engineers', icon: 'brain' },
            { count: '2', label: 'marketing managers', icon: 'megaphone' },
            { count: '1', label: 'solutions architect', icon: 'boxes' },
            { count: '1', label: 'product manager', icon: 'clipboard' },
          ],
        },
        {
          type: 'list',
          items: [
            { lead: 'Too many results looked the same.', text: 'Same name, same description, no way to tell which one to open.' },
            { lead: 'People did not use the filters.', text: 'The useful ones were missing, and the rest were nested, hidden or named in the catalog’s terms.' },
            { lead: 'Trust came from people, not the page.', text: 'They started in Slack with someone they trusted, and messaged an expert again before believing a result.' },
          ],
        },
        {
          type: 'p',
          text:
            'I split the findings in two: what search could fix now, which became Search 2.0, and the workshop’s larger ideas, which went to a later track.',
        },
      ],
    },
    {
      id: 'tabs',
      eyebrow: 'Decision 1',
      short: 'Split by kind',
      heading: 'I split results by kind of data, and made my own Data Map one tab among several',
      blocks: [
        {
          type: 'p',
          text:
            'A search for “company status” listed nine columns named company_status before the first table. People know broadly what they are looking for, a table, a column, a data product, so each kind got its own tab, with type pills inside it.',
        },
        {
          type: 'p',
          text:
            'It meant giving up my own structure. I had designed the Data Map in 2022 as the catalog’s organising idea; here it became one tab. Every name and its path got a full line each, so long schema names stopped being cut off, with the full text on hover.',
        },
      ],
    },
    {
      id: 'result',
      eyebrow: 'Decision 2',
      short: 'The result',
      heading: 'A result you can judge without opening it: five lines of evidence, one question each',
      blocks: [
        {
          type: 'p',
          text:
            'The specification listed about twenty things a table result could show, each one asked for by some team. I capped the result at five lines of evidence and gave every line one question to answer.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Name, with maturity stars:', text: 'is this the clean one? The stars open into the six criteria behind the score.' },
            { lead: 'Path:', text: 'which of the same-named ones is this? Analysts trusted data-mart schemas over raw ones.' },
            { lead: 'Badges:', text: 'can I rule it out without opening it? View, compliance (7216, SOX), temporary or internal.' },
            { lead: 'Last refreshed:', text: 'is it still alive?' },
            { lead: 'Queries and people in the last 30 days:', text: 'does anyone else rely on it?' },
          ],
        },
        {
          type: 'finding',
          items: [
            {
              title: 'Team-based ownership made the right expert hard to reach',
              saw: 'A table’s owner was a team, and the team opened to 94 people in five roles.',
              quote: { text: 'One of this team will be owning this. But I don’t see a specific ownership here.', who: 'A senior data engineer' },
              before: { src: '/work/search-2/f/before-owner.jpg', width: 700, height: 790, alt: 'The old Team Members dialog on a table page: Data-Steward 3, Admin 5, DevManager 1, Developer 39, Devops 46, with names blurred.' },
              did: 'The owner is named on the result itself, so the first question, who do I ask, is answered before opening anything.',
              after: { src: '/work/search-2/f/after-result.jpg', width: 1250, height: 200, alt: 'The redesigned table result: name with endorsement and maturity stars, path, two-line description and badges on the left; business owner, last refreshed, queries run, row count and data product on the right.' },
              shipped: 'The owning team is on every result, one click from its page. It is still a team, not a person.',
            },
            {
              title: 'AI descriptions lowered trust beside the owner’s own',
              saw: 'AI-generated descriptions were useful when nothing else existed. Shown next to a steward’s description, they lacked key context and reduced trust in the feature overall.',
              before: { src: '/work/search-2/f/before-descriptions.jpg', width: 2048, height: 455, alt: 'A table page in the old catalog: the Business Owner description, and directly beneath it an AI-generated description of the same table with thumbs up and down.' },
              did: 'One description per result, two lines. The owner’s words if they exist; an AI description only when none does, marked with the AI icon.',
              shipped: 'Shipped as the rule for every search tab.',
            },
          ],
        },
        {
          type: 'p',
          text:
            'Two small rules did the rest. Labels came off: “Last refreshed: May 17, 2024” became “Last refreshed on May 17, 2024”, which gave the width back to the name and description. And a missing signal is said, never left blank: “No queries run in the last 30 days”.',
        },
      ],
    },
    {
      id: 'facets',
      eyebrow: 'Decision 3',
      short: 'Filters',
      heading: 'Filters people can see: no dropdowns, their words, and behaviour set by how many values a facet holds',
      blocks: [
        {
          type: 'p',
          text:
            'I split the narrowing controls in two. Filters are the kind of object, set once. Facets are properties of the results, and their values change with the tab, the query and each other. Applied values stay visible as chips, and people recognise a value instead of recalling it.',
        },
        {
          type: 'finding',
          items: [
            {
              title: 'People did not use the filters',
              saw: 'Product, schema and domain were missing. To find data marts you opened search results, then Data Product Type, then Data Mart.',
              quote: { text: 'There is a need for improved search capabilities for column names within a specific schema.', who: 'A staff business data analyst' },
              before: { src: '/work/search-2/f/before-filters.jpg', width: 1080, height: 420, alt: 'The old Data Map search with the Data Product Type dropdown open: Clickstream, Data Mart, Derived Data, Domain Entity, Raw Database Table, Reporting Table.' },
              did: 'Removed the dropdowns. Every filter is visible in a left column, and the schema facet, about a thousand values, has its own search box.',
              after: { src: '/work/search-2/f/after-schema.jpg', width: 330, height: 380, alt: 'The redesigned filter column: a Schema group with a count of 1000, a search box and a list of schema names with checkboxes; a long schema name wraps onto two lines.' },
              shipped: 'The visible filter column and schema search shipped with table search, Nov 14, 2024.',
            },
            {
              title: 'No search as you browse',
              saw: 'People could open a Data Map domain and browse its folders, but not search inside the domain they were in.',
              quote: { text: 'Need to add domain specific search.', who: 'A marketing manager' },
              before: { src: '/work/search-2/f/before-browse.jpg', width: 1560, height: 420, alt: 'The old Data Map browse page for the Enterprise domain: a list of subdomain folders with descriptions and no search box for the domain.' },
              did: 'Data Map folders became a facet you can type into; typing matches a folder at any level.',
              shipped: 'Shipped with Data Map search, Mar 26, 2025.',
            },
          ],
        },
        {
          type: 'clips',
          items: [
            { src: '/work/search-2/facet-single.webm', width: 520, height: 560, title: 'One value: apply at once', text: 'A facet group with a single value applies itself.', alt: 'The filter column: a single-value facet applying automatically when the query returns one schema.' },
            { src: '/work/search-2/facet-low.webm', width: 520, height: 560, title: 'Few values: show them all', text: 'Every value sits in the list; no dropdown to open.', alt: 'The filter column: a low-cardinality facet showing every value inline, with the Show clean tables toggle above.' },
            { src: '/work/search-2/facet-multi.webm', width: 520, height: 560, title: 'Many values: pick, then apply', text: 'A searchable list; choose several, then one Apply for the group.', alt: 'The filter column: three schemas selected in a searchable dropdown and applied together as chips.' },
            { src: '/work/search-2/facet-nested.webm', width: 520, height: 560, title: 'Nested values: search, not browse', text: 'Typing matches any level of the tree.', alt: 'The filter column: typing into the Data Map folders facet matches nodes at any level.' },
          ],
          caption: 'The four facet behaviours, from the prototype attached to the June 2024 specification.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Six usage states became two checkboxes.', text: 'Refreshed in the last 120 days, used in the last 120 days. Nobody could tell “stale and actively used” from “fresh and unused” at a glance.' },
            { lead: 'A four-value taxonomy became two switches.', text: '“Hide temporary data” and “Hide deprecated data”. People wanted those two gone, not a taxonomy.' },
            { lead: 'One facet narrows the others.', text: 'An ML engineer had spent three months finding 7 of the 11 attributes his model needed. With facets that narrow each other, a few choices show quickly that the data is not there.' },
            { lead: 'Clear to change.', text: 'Once a group is applied you clear it to pick again. That is how the search service works, and I accepted it rather than ask for a custom backend.' },
          ],
        },
      ],
    },
    {
      id: 'framework',
      eyebrow: 'Scale',
      short: 'Framework',
      heading: 'The same skeleton carried five searches',
      blocks: [
        {
          type: 'p',
          text:
            'Table search was the template: a tab, type pills, facets on the left, and a result with identity on the left and evidence on the right. Every later search changed only the evidence that kind of data needs. I designed tables and the Data Map, which a designer on my team carried to launch; my team designed the other three on the same specification without a new structure.',
        },
        {
          type: 'table',
          head: ['Search', 'Evidence on a result', 'Shipped'],
          rows: [
            ['Tables', 'Owner · last refreshed · queries in 30 days · maturity stars', 'Nov 14, 2024'],
            ['Data Map', 'Owner · where it lives: lake tables, Kafka topics and CDC attributes · the entity that matched', 'Mar 26, 2025'],
            ['Real-time streams', 'Producer · consumers · schema', 'Jun 15, 2025'],
            ['CDC attributes', 'Source · consumers', 'Aug 2025'],
            ['Marketing attributes', 'Owner · freshness', 'Aug 12, 2025'],
          ],
          caption: 'Dates from the team’s launch posts.',
        },
        {
          type: 'p',
          text:
            'Rollout was a toggle in the header, so people could move between old and new while both ran. About 70% had made the new one their main search before the old was switched off in September 2025.',
        },
      ],
    },
    {
      id: 'cuts',
      eyebrow: 'Trade-offs',
      short: 'Trade-offs',
      heading: 'What I cut to ship, and what each cut cost',
      blocks: [
        {
          type: 'tension',
          labels: ['What I cut', 'What it cost, and what shipped anyway'],
          items: [
            {
              tension: 'Columns as results. The design gave a column its own row: the table it belongs to, how often it is joined on, how much of it is profiled. A search engineer’s reason for the cut: “too many results because of the size of the dataset.” One column name matches across thousands of tables.',
              decision: 'Columns never came back to search. Of 726 help-desk questions in early 2025, two in three ended at a specific column, and 158 that one table could have answered went to an expert. Table search shipped on November 14, 2024.',
            },
            {
              tension: 'Two of the five evidence lines: size with its health ring, and lineage counts.',
              decision: 'The shipped result carries owner, last refresh and queries. Lineage, which marketers valued most, is visible only inside the maturity score.',
            },
            {
              tension: 'Measurement. It was not in the first scope.',
              decision: 'My miss. An exact-name ranking problem reached launch and was fixed afterwards with an exact-match fast path.',
            },
          ],
        },
      ],
    },
    {
      id: 'results',
      eyebrow: 'Results',
      short: 'Results',
      heading: 'First-result precision rose from 81.31% to 89.24%',
      blocks: [
        {
          type: 'cards',
          items: [
            { value: '81.31% → 89.24%', title: 'first-result precision, Data Map search, Mar 2025', text: 'Across 10,000 data products and 460,000 attributes. My design and specification, carried to launch by a designer on my team; ranking by search engineering.' },
            { value: '+58%', title: 'semantic precision, table search, Nov 2024', text: '+12.5% for keyword searches, across 320,000 tables. My design; the search-model team built the ranking.' },
            { value: '32% → 63%', title: 'of searches ended in a click, Jan 2024 to Jan 2026', text: '41% in Aug 2024, 61% in Jul 2025. Platform-wide, tracked in Amplitude.' },
            { value: '14.2 h → 9.4 h', title: 'time to discover data, Aug 2024 to Jul 2025', text: 'Platform-wide; Intuit’s public figure, AWS re:Invent 2025.' },
          ],
        },
        {
          type: 'quotes',
          items: [
            { text: 'Through multiple iterations we were able to deliver completely new user experience and delight our customers.', who: 'A staff software engineer on the catalog', when: 'Jan 2025' },
          ],
        },
        { type: 'subhead', text: 'What it set up' },
        {
          type: 'p',
          text:
            'A year on, help-desk questions were about what data means, not where it is, and most could be answered from one table’s column details. That is the question the data agent in Cursor and Claude answers, using the same object model as its schema. That story is on the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
        },
        {
          type: 'donut',
          total: '726 questions',
          segments: [
            { value: 68.2, label: 'Understanding', text: 'What a column means, how two tables join' },
            { value: 16, label: 'Finding', text: '“Where is this dataset?”' },
            { value: 15.8, label: 'Other', text: 'Ownership, access, pipelines' },
          ],
          note: '74.1% could be answered from one table’s column details.',
        },
      ],
    },
  ],
  next: {
    text: 'The rebuilt search gave the catalog results people could judge. The next question was where the search should live: in a chat window, or inside the tools where people already work.',
    label: 'The evolution of the data agent at Intuit over three years',
    href: '/work/agentic-discovery',
  },
}

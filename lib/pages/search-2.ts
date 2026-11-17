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
  roleTag: 'Principal Product Designer → Product Design Manager',
  period: '2024–2025',
  description:
    'In 2024 a search in Intuit’s internal data catalog returned row after row with the same name and description, and nothing to judge them by. I led the research and wrote the design specification for the rebuild, Search 2.0, then managed the designers who extended it. On Data Map search, which covers 10,000 data products, the first result was the right one 89.24% of the time at launch, up from 81.31%.',
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
      { text: 'about 6,600 monthly users', note: 'Mar 2026' },
    ] },
    { label: 'Research', lines: [
      { text: '20 in-context sessions', note: '9 business units, Apr 2024' },
      { text: 'An in-person design workshop' },
      { text: '666 Slack help threads' },
      { text: '726 help-channel questions', note: 'Jan to Jul 2025' },
    ] },
    { label: 'Shipped', lines: [
      { text: 'Table search', note: 'Nov 2024' },
      { text: 'Data Map search', note: 'Mar 2025' },
      { text: 'Three more searches, same specification', note: 'Jun to Aug 2025' },
      { text: 'Old search switched off', note: 'Sep 2025' },
    ] },
  ],
  stats: [
    { value: '81.31% → 89.24%', label: 'How often the first result was the right one, Data Map search, at launch in Mar 2025' },
    { value: '32% → 63%', label: 'Search sessions that ended in a click, Jan 2024 to Jan 2026 (41% in Aug 2024, before the first launch)' },
    { value: '14.2 h → 9.4 h', label: 'Time to discover data, the search step only, Aug 2024 to Jul 2025' },
  ],
  hero: {
    src: '/work/search-2/recreated/hero.mp4',
    poster: '/work/search-2/recreated/hero-poster.jpg',
    width: 2560,
    height: 1396,
    tint: TINTS.platform2026,
    alt: 'A screen recording of the redesigned search, rebuilt as a prototype with sample data: “tax” is typed into the search bar on the catalog’s home page, the results open on the Data Map tab, the Tables tab is chosen, and a maturity level is ticked in the filter column so the results narrow. Each result shows its owning team, last refresh, size, queries and lineage.',
    caption: 'The redesigned search, rebuilt as a working prototype with sample data: a tab for each kind of data, filters that stay in view, and evidence on every result.',
  },
  visuals: [
    {
      id: 'before',
      src: '/work/search-2/recreated/before-old-search.png',
      width: 2816,
      height: 1848,
      alt: 'The old search results, recreated with sample data, with “tax” in the search bar: a row of dropdown pills above five table results. Three of the tables are all named tax_returns, two of them with no description, and the only evidence on a row is a star score and a tag.',
      caption: 'Before: the old search, recreated with sample data. A search for “tax” returns three tables with the same name, two with no description, and nothing on a row to choose between them.',
    },
    {
      id: 'after',
      src: '/work/search-2/recreated/after-search2.png',
      width: 2816,
      height: 1848,
      alt: 'The redesigned search, rebuilt as a prototype with sample data, with the same query, “tax”, in the search bar: tabs for Data Map, Tables, CDC Attributes and Kafka Topics, a filter column on the left with every control visible, and five table results that each show the name, path, description and badges on the left and the owning team, last refresh, size, queries and lineage on the right.',
      caption: 'After: the design, rebuilt as a working prototype with sample data. The same search for “tax”: results split by kind of data, filters in view, and evidence on every result.',
    },
    {
      id: 'haystack',
      after: 'problem',
      lead: true,
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One person’s path to find and validate one dataset.',
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
      height: 900,
      alt: 'The table search design, annotated. Nine tabs across the top, noted “Separate search results by object type, as people often know broadly what they are looking for”. Type pills for Schemas, Tables and Columns with a clean-data toggle, noted “Remove dropdowns to improve discoverability of filters”. A filter column with a searchable Schema list, noted “Search within a specific schema”, business-unit tags, noted “BU Tags”, and Data Maturity stars. Four results, a table, two columns and a schema: queries run and times joined are noted “Social trust”, the column’s type and profile “Additional metadata”, and the path line “Longer names and descriptions on hover”.',
      caption: 'The design as I presented it. Each yellow note names the finding that change answers.',
    },
    {
      id: 'tabs',
      after: 'tabs',
      src: '/work/search-2/recreated/tabs.png',
      width: 2816,
      height: 600,
      alt: 'The top of the search results in the rebuilt prototype, with sample data: four tabs, Data Map, Tables, CDC Attributes and Kafka Topics, each with a count, above the filter column and the first result.',
      caption: 'The tabs in the rebuilt prototype, with sample data: one tab for each kind of data, each with its own count.',
    },
    {
      id: 'result',
      after: 'result',
      lead: true,
      src: '/work/search-2/recreated/result.png',
      width: 2240,
      height: 882,
      alt: 'Three table results in the rebuilt prototype, with sample data. Each has a type icon, the name with an endorsement mark and maturity stars, the path, a description and badges on the left; on the right the owning team, when it was last refreshed, column and row counts with a health ring, queries by users, and upstream and downstream lineage counts.',
      caption: 'The result in the rebuilt prototype, with sample data: what the thing is on the left, whether to believe it on the right.',
    },
    {
      id: 'filters',
      after: 'facets',
      lead: true,
      src: '/work/search-2/recreated/filters.png',
      width: 2000,
      height: 1520,
      alt: 'The filter column in the rebuilt prototype, with sample data, beside the first results: Clean Data with Show clean tables; Environment with PRD ticked and E2E; Data Maturity with a checkbox for each score from 5 to 0; and collapsed groups below.',
      caption: 'The filter column in the rebuilt prototype, with sample data: every control visible with its state.',
    },
    {
      id: 'datamap',
      after: 'framework',
      lead: true,
      src: '/work/search-2/recreated/datamap.png',
      width: 2816,
      height: 1760,
      alt: 'The Data Map tab in the rebuilt prototype, with sample data: the same layout as table search, with Data Products and Attributes pills, filters for Datamap folders, Data Freshness, CDC, Hosting Location and Type on the left, and results whose right side lists where each product lives: Datalake tables, Kafka topics and CDC attributes, by environment.',
      caption: 'Data Map search on the same skeleton, in the rebuilt prototype with sample data. The right side answers a different question: where does this data product physically live?',
    },
    {
      id: 'spec-columns',
      after: 'cuts',
      lead: true,
      src: '/work/search-2/recreated/columns.png',
      width: 2816,
      height: 1600,
      alt: 'The Tables tab in the rebuilt prototype, with sample data, set to Columns: each result is one column, with the table it belongs to, its type, a description, the owning team, how often it is joined on and how much of it is profiled.',
      caption: 'Columns as their own results, in the rebuilt prototype with sample data: each with the table it belongs to, how often it is joined on and how much of it is profiled. Columns were cut before launch.',
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
            'Data discovery was the longest phase in the projects our users ran. The catalog had been built around analysts: in early 2024, 61% of analysts found data in it, against 13% of software developers and 5% of technical marketers. We did not know enough about anyone else. One machine-learning engineer had spent three months finding 7 of the 11 attributes his model needed.',
        },
        {
          type: 'p',
          text:
            'To find a dataset and check it, a person used six tools on average, because no single tool held what they needed to trust a result. Inside the catalog, one search for “company status” returned 1,838,670 results, many with the same name and the same description, and nothing on the row to judge them by.',
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
            'In April 2024 I led twenty sessions with catalog users while they did their own work (Follow-Me-Home sessions), with the catalog’s product manager, across nine business units. The catalog’s engineers sat in. We asked each person to walk us through a recent time they successfully found data at Intuit. An in-person design workshop then turned the findings into ideas and ranked them. The group product manager later called the series “a major contributor to our FY25 roadmap”, the plan for the fiscal year that began in August 2024.',
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
            'I split the findings in two. What search itself could fix became Search 2.0. The workshop’s larger ideas, such as an AI assistant that does the search for you, waited for later work.',
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
            'The old search returned tables and columns in one list. In 2024 the search for “company status” returned row after row of columns named company_status, from nine schemas, each with the same description. People know broadly what they are looking for before they search: a table, a stream or a data product. So each kind of data got its own tab.',
        },
        {
          type: 'p',
          text:
            'It meant giving up my own structure. In 2022 I had designed the Data Map, which organises the catalog by business concept, such as a customer or an invoice, and lists every physical copy of that data under one entry. I had made it the catalog’s organising idea. In Search 2.0 it became one tab among several, because people think in physical objects: the table or the stream they will query.',
        },
      ],
    },
    {
      id: 'result',
      eyebrow: 'Decision 2',
      short: 'The result',
      heading: 'A result you can judge without opening it',
      blocks: [
        {
          type: 'p',
          text:
            'The specification listed about twenty things a table result could show, each one asked for by some team. I capped what a result shows and gave every line one question to answer.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Name, with maturity stars, its rating against Intuit’s clean-data standard:', text: 'is this one clean? The stars open into the six criteria behind the score.' },
            { lead: 'Path:', text: 'which of the same-named ones is this? Analysts trusted data-mart schemas over raw ones.' },
            { lead: 'Badges:', text: 'can I rule it out without opening it? A view, a compliance restriction, temporary or internal.' },
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
              after: { src: '/work/search-2/recreated/result-one.png', width: 2240, height: 286, alt: 'One table result in the rebuilt prototype, with sample data: the name, path and description on the left, and the owning team at the top of the evidence on the right.' },
              shipped: 'The owning team is on every result, one click from its page. It is still a team, not a person.',
            },
            {
              title: 'AI descriptions lowered trust beside the owner’s own',
              saw: 'AI-generated descriptions were useful when a table had no other description. Next to the owner’s description they lacked key context and lowered trust in AI descriptions overall.',
              before: { src: '/work/search-2/f/before-descriptions.jpg', width: 2048, height: 455, alt: 'A table page in the old catalog: the Business Owner description, and directly beneath it an AI-generated description of the same table with thumbs up and down.' },
              did: 'Each result shows one description, two lines long: the owner’s if one exists, and an AI description, marked with the AI icon, only when none does.',
              shipped: 'This shipped as the rule on every search tab.',
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
      heading: 'I put every filter in view and named it in people’s own words',
      blocks: [
        {
          type: 'p',
          text:
            'The left column holds the filters, and their values change with the tab, the query and each other. The values a person has applied stay visible as chips, so people recognise a value instead of recalling it. Because the filters narrow each other, a few choices show quickly that the data is not there.',
        },
        {
          type: 'finding',
          items: [
            {
              title: 'The filters people needed were missing or two clicks deep',
              saw: 'Product, schema and domain were missing. To find data marts you opened search results, then Data Product Type, then Data Mart.',
              quote: { text: 'There is a need for improved search capabilities for column names within a specific schema.', who: 'A staff business data analyst' },
              before: { src: '/work/search-2/f/before-filters.jpg', width: 1080, height: 420, alt: 'The old Data Map search with the Data Product Type dropdown open: Clickstream, Data Mart, Derived Data, Domain Entity, Raw Database Table, Reporting Table.' },
              did: 'I removed the dropdowns. Every filter is visible in the left column, and the schema filter, with about a thousand values, has its own search box.',
              after: { src: '/work/search-2/f/after-schema.jpg', width: 330, height: 380, alt: 'The redesigned filter column: a Schema group with a count of 1000, a search box and a list of schema names with checkboxes; a long schema name wraps onto two lines.' },
              shipped: 'The visible filter column and schema search shipped with table search, Nov 14, 2024.',
            },
            {
              title: 'No search as you browse',
              saw: 'People could open a Data Map domain and browse its folders, but not search inside the domain they were in.',
              before: { src: '/work/search-2/f/before-browse.png', width: 1420, height: 290, alt: 'The old Data Map browse page for the Enterprise domain: a list of subdomain folders with descriptions and no search box for the domain.' },
              did: 'Data Map folders became a filter you can type into; typing matches a folder at any level.',
              shipped: 'This shipped with Data Map search on March 26, 2025.',
            },
          ],
        },
        {
          type: 'clips',
          items: [
            { src: '/work/search-2/recreated/filter-few-values.mp4', width: 1600, height: 1120, title: 'Few values: show them all', text: 'Every value sits in the list; no dropdown to open.', alt: 'A screen recording of the filter column in the rebuilt prototype: a maturity level and Show clean tables are ticked in the list, and the results beside it narrow each time.' },
            { src: '/work/search-2/recreated/filter-folder-search.mp4', width: 1600, height: 1120, title: 'Nested values: search, not browse', text: 'Type a folder name; there is no tree to open.', alt: 'A screen recording of the filter column in the rebuilt prototype: a folder name is typed into the Datamap folders filter, and the results narrow to the data products in that folder.' },
          ],
          caption: 'The filter column, recorded from the rebuilt prototype with sample data.',
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
            'Table search was the template: a tab, type pills, filters on the left, and a result with identity on the left and evidence on the right. Every later search changed only the evidence that kind of data needs. I designed table search and Data Map search. In August 2024 I became the team’s manager, and a designer on my team carried Data Map search to launch. My team designed the other three searches to the same specification.',
        },
        {
          type: 'table',
          head: ['Search', 'Evidence on a result', 'Shipped'],
          rows: [
            ['Tables', 'Owner · last refreshed · queries in 30 days · maturity stars', 'Nov 14, 2024'],
            ['Data Map', 'Owner · where it lives: lake tables, Kafka topics and CDC attributes · the data product or attribute that matched', 'Mar 26, 2025'],
            ['Real-time streams', 'Producer · consumers · schema', 'Jun 15, 2025'],
            ['CDC attributes', 'Source · consumers', 'Aug 2025'],
            ['Marketing attributes', 'Owner · freshness', 'Aug 12, 2025'],
          ],
        },
        {
          type: 'p',
          text:
            'Rollout was a toggle in the header, so people could move between old and new while both ran. About 70% of users had made the new search their main one before the old search was switched off in September 2025.',
        },
      ],
    },
    {
      id: 'cuts',
      eyebrow: 'Trade-offs',
      short: 'Trade-offs',
      heading: 'What was cut to ship, and what each cut cost',
      blocks: [
        {
          type: 'tension',
          labels: ['What was cut', 'What it cost, and what shipped anyway'],
          items: [
            {
              tension: 'I designed columns as results of their own. A column’s row showed the table it belongs to, how often it is joined on and how much of it is profiled. I pushed for it, and engineering vetoed it: one column name matches across thousands of tables, and a search engineer’s reason was “too many results because of the size of the dataset.”',
              decision: 'Table search shipped on November 14, 2024 without column results, and they have not come back. The cost showed in 2025: of 726 questions sent to the data help channel between January and July, 48% needed a human expert, and 45% of those, 158 questions, asked for the column definitions of a single table.',
            },
            {
              tension: 'Two lines on the right-hand side of the designed result were cut: the table’s size, and its lineage counts, the number of tables that feed it and depend on it.',
              decision: 'The shipped result shows the owning team, the last refresh and the queries run in the last 30 days. Lineage is visible only inside the maturity score.',
            },
            {
              tension: 'I left measurement out of the first scope.',
              decision: 'That was my miss. When someone searched for an exact table name, results that were close in meaning could rank above it. The share of searches with a click in the top five results fell from 96% on the old search to 94% in July 2025, and we saw it only after launch. A fast path for exact names fixed the ranking, and the figure was 95% by January 2026.',
            },
            {
              tension: 'The search service cannot change a group of filter values once it is applied.',
              decision: 'A person clears the group and picks again. I accepted that rather than ask for a custom backend.',
            },
          ],
        },
      ],
    },
    {
      id: 'results',
      eyebrow: 'Results',
      short: 'Results',
      heading: 'On Data Map search, the first result was the right one 89.24% of the time, up from 81.31%',
      blocks: [
        {
          type: 'cards',
          items: [
            { value: '81.31% → 89.24%', title: 'first-result precision, Data Map search, Mar 2025', text: 'Across 10,000 data products and 460,000 attributes. My design and specification, carried to launch by a designer on my team; ranking by search engineering.' },
            { value: '+58%', title: 'more precise results when the search is phrased by meaning, table search, Nov 2024', text: '+12.5% for keyword searches, across 320,000 tables. My design; the search-model team built the ranking.' },
            { value: '32% → 63%', title: 'of searches ended in a click, Jan 2024 to Jan 2026', text: '41% in Aug 2024, 61% in Jul 2025. Platform-wide, tracked in Amplitude, a product analytics tool.' },
            { value: '14.2 h → 9.4 h', title: 'time to discover data, Aug 2024 to Jul 2025', text: 'Platform-wide; Intuit’s public figure, AWS re:Invent 2025.' },
          ],
        },
        { type: 'subhead', text: 'What it set up' },
        {
          type: 'p',
          text:
            'The questions people asked changed after the rebuild. The chart shows the 726 questions sent to the company’s data help channel between January and July 2025. Most were about what data means, not where it is, and those are the questions the data agent answers: an AI assistant inside Cursor and Claude that answers questions about the company’s data.',
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
    text: 'The rebuilt search gave the catalog results people could judge. The next case study follows the data agent from a chat window in a browser tab into the tools where people already work.',
    label: 'The evolution of the data agent at Intuit over three years',
    href: '/work/agentic-discovery',
  },
}

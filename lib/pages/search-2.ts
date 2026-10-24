import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: Search 2.0. The IC craft story. The path people took to data
// in 2024, the search they had, the research that changed the question, six
// design decisions with their costs, what shipped and what it cost, and what
// it set up. Every figure has a source in docs/FINDING-DATA-NARRATIVE.md.

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Search 2.0: rebuilding how people find data',
  roleTag: 'Principal Product Designer',
  period: '2024–2025',
  description:
    'How I took Intuit’s data search from one box that returned everything to a structure built on how twenty people actually looked for data: the research I ran, the six decisions I made, what shipped, and what it cost.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: 'Search 2.0' },
      { label: 'The agent', href: '/work/agentic-discovery' },
      { label: 'The catalog', href: '/work/catalog-data-map-lineage' },
      { label: '605', href: '/work/605-tv-analytics' },
    ],
    current: 0,
  },
  facts: [
    { label: 'Duration', value: 'March 2024 to September 2025, from the first interview to the day the old search was switched off' },
    {
      label: 'My role',
      value:
        'Principal designer. I designed and ran the research, wrote the specification and designed table search. After I became manager, a designer on my team took map search to launch',
    },
    {
      label: 'Team',
      value:
        'The catalog’s product manager and engineers, the search-model team, and three senior engineers who reviewed the specification',
    },
    {
      label: 'Research',
      value:
        '20 follow-me-home sessions across nine business units with engineers watching; an in-person workshop; 666 and 726 help-channel questions; Amplitude',
    },
  ],
  stats: [
    { value: '81.31% → 89.24%', label: 'Searches where the first result was right' },
    { value: '14.8 h → 9.4 h', label: 'Time to discover data, Nov 2024 to Jul 2025' },
    { value: '41% → 63%', label: 'Searches that ended in a click, Jan 2024 to Jan 2026' },
  ],
  hero: {
    src: '/work/search-2/hero.mp4',
    poster: '/work/search-2/hero-poster.jpg',
    width: 1600,
    height: 854,
    tint: TINTS.dde2023,
    alt: 'A screen recording with two browser windows side by side. On the left, Search 2.0 in alpha: a Tables tab, filters down the left, and each result with owner, last refresh and queries run. On the right, the old search for the same query: one list under Data Catalog and Data Map with filter pills across the top.',
    caption: 'October 2024, the same searches in Search 2.0 (left, in alpha) and the search it replaced (right). Sped up 2.3 times.',
  },
  visuals: [
    {
      id: 'tables-tab',
      src: '/work/search-2/tables-tab-design.jpg',
      width: 1440,
      height: 1020,
      alt: 'The Search 2.0 design for table results: tabs for each kind of object across the top, facets down the left, and each result showing its path, description, tags, owner team, last refresh, size, query count and upstream and downstream counts.',
      caption: 'My design for table results, 2024. Each result carries what a person needs to choose it: owner, last refresh, size, how many queries use it, and whether they have access.',
    },
    {
      id: 'haystack',
      after: 'path',
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One person’s path through six tools, from my research board. The notes on the right became the problems this work set out to solve.',
    },
    {
      id: 'workshop-coach',
      after: 'path',
      src: '/work/search-2/workshop-coach-2024.jpg',
      width: 2400,
      height: 1800,
      alt: 'A whiteboard from the April 2024 workshop with sticky notes reading AI DDE coach, Reddit for DDE, and Scale up ask-data-genius-bar to all domains with a 15-minute SLA.',
      caption: 'The April 2024 workshop. An AI coach for the catalog was on the board two years before the agent shipped.',
    },
    {
      id: 'workshop-usecase',
      after: 'path',
      src: '/work/search-2/workshop-usecase-explorer-2024.jpg',
      width: 2400,
      height: 1800,
      alt: 'A sticky note sketching a use case explorer: a search box, then similar use cases shown as a dev portal project summary, a data product summary and a Slack conversation summary, with a note that it shows when there are no results.',
      caption: 'A use case explorer that appears when search returns nothing: the first answer to “how do I learn this data does not exist?”',
    },
    {
      id: 'search-1',
      after: 'problem',
      full: true,
      src: '/work/search-2/search-1-results-2024.jpg',
      width: 2048,
      height: 1147,
      alt: 'The 2024 search results for “company status”: 1,838,670 results under a Data Catalog tab, nine columns named company_status from different schemas with the same description before the first table, and eight filter pills across the top.',
      caption: 'The search people had in 2024. “Company status” returned 1,838,670 results, and nine identical columns before the first table.',
    },
    {
      id: 'datamap-filter',
      after: 'problem',
      full: true,
      src: '/work/search-2/search-1-datamap-filter-2024.jpg',
      width: 1640,
      height: 675,
      alt: 'The Data Map tab of the old search with the Data Product Type filter open, listing Clickstream, Data Mart, Derived Data, Domain Entity, Raw Database Table and Reporting Table.',
      caption: 'To find a data mart you opened Data Product Type and picked Data Mart: two clicks, in the platform’s vocabulary rather than the analyst’s.',
    },
    {
      id: 'workshop-ideas',
      after: 'research',
      src: '/work/search-2/workshop-ideas-2024.jpg',
      width: 1396,
      height: 1570,
      alt: 'A whiteboard list of workshop ideas with vote counts: people as first-class objects, index enterprise docs and tools, personalise with suggested filters, connect with experts, use cases as first-class objects, bounties, next-action coaching, embed with a team or domain, and a do-it-for-me AI data butler.',
      caption: 'The ideas the room voted on. People as a way to find data, indexing documents and tools, and an AI that does the search for you.',
    },
    {
      id: 'workshop-board',
      after: 'research',
      src: '/work/search-2/workshop-board-2024.jpg',
      width: 1558,
      height: 1214,
      alt: 'The same ideas as sticky notes on an impact-versus-technology board, with people as first-class object, index enterprise docs and tools, and do it for me starred.',
      caption: 'The same ideas placed by impact against what existing technology could do. Three were starred.',
    },
    {
      id: 'facets',
      after: 'decisions',
      full: true,
      src: '/work/search-2/facet-behaviours-spec.jpg',
      width: 3150,
      height: 3420,
      alt: 'Four rows from the Search 2.0 specification in Figma, each a flow of screens: a facet group with one value that applies itself; a group with many flat values and a search box; a group with few values shown as a list; and nested values.',
      caption: 'The four facet behaviours, each drawn as a flow in the specification. Click to open it full size.',
    },
    {
      id: 'click-depth',
      after: 'shipped',
      full: true,
      src: '/work/search-2/click-depth.jpg',
      width: 2087,
      height: 930,
      alt: 'Stacked monthly bars showing which search result people clicked, November 2025 to May 2026, with the first result the large majority every month.',
      caption: 'Which result people clicked, November 2025 to May 2026. The first result carried about four clicks in five every month.',
    },
    {
      id: 'retired',
      after: 'shipped',
      full: true,
      src: '/work/search-2/search-1-retired-2025.jpg',
      width: 1320,
      height: 110,
      alt: 'A banner in the catalog: Search 1.0 will be deprecated on Friday September 19, 2025 and switch to Search 2.0.',
      caption: 'The old search was switched off on 19 September 2025.',
    },
  ],
  sections: [
    {
      id: 'path',
      heading: 'How people got to data in 2024',
      blocks: [
        {
          type: 'p',
          text:
            'Before the search problem, the path. In spring 2024 I followed twenty people through a recent search for data: eight analysts, six software or data engineers, two machine learning engineers, two marketing managers, a solutions architect and a product manager, across nine business units. The same six stages came up every time, and the catalog was one stop among several.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Get the requirement',
              tools: 'Jira, meetings',
              quote: 'It usually takes about a week from getting a data request to finding the right sources. The biggest delay is getting stakeholders and data owners into one meeting.',
              who: 'A marketing manager',
              time: 'About a week',
            },
            {
              title: 'Search',
              tools: 'Slack, GitHub, the catalog',
              quote: '90% of the time someone knows the answer: a colleague, or the help channel.',
              who: 'A staff analyst',
              time: 'Five minutes before one engineer gave up',
            },
            {
              title: 'Validate',
              tools: 'Old queries, the people who ran them, a sample',
              quote: 'I’d rather just look at a query and see if that’s what I need without bothering them.',
              who: 'A senior analyst',
            },
            {
              title: 'Request access',
              tools: 'Tickets, one table at a time',
              quote: 'Every time someone points me at a new table it takes two or three days to get access, and only then can I check whether it’s relevant.',
              who: 'A staff analyst',
              time: '2 to 3 days per table; a month for one engineer',
            },
            {
              title: 'Explore',
              tools: 'Databricks, Athena, Postman',
              quote: 'Even with the right table names the SQL won’t run. The dialects differ.',
              who: 'A software engineer',
            },
            {
              title: 'Move or use it',
              tools: 'CDC Explorer, Kafka, the marketing store',
              quote: 'I knew the batch data I wanted. Then I realised it had to be real-time, and the real-time source did not exist.',
              who: 'A machine learning engineer',
              time: '3 months of a 9-month project',
            },
          ],
          caption:
            'Six stages, the tools people ran through, and one thing someone said at each, from the April 2024 sessions. The whole path took about 20 days in 2023, by the company’s own public figure.',
        },
        {
          type: 'p',
          text: 'Three of the twenty, walked through as they happened.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'An analyst building an experiment dashboard needs firmographic data.',
              text:
                'She searches Slack for “firmographic” in the one channel her team trusts and finds a dashboard, not the table she wants. She goes to the catalog, finds a table, joins it to hers: zero rows. She searches Slack for both table names and finds no examples of either. Back to the dashboard, into its linked sources, to a table owned by someone known for QBO analytics. Recent, familiar owner, she takes it. “At this point I am spending too much time looking at two tables I don’t really know, so I decide to go back to Slack.”',
            },
            {
              lead: 'A marketing manager has a Jira request for a customer’s latest expert.',
              text:
                'She searches “expert” and clicks the first typeahead result because she had been in that folder before. Many similar names, no owner shown, so she goes to the help channel to ask which one is populated. She searches “zipcode” when she needed county. She browses the Data Map, picks the commerce domain by habit, then income tax, then the schema. She did not know the default filter could be changed.',
            },
            {
              lead: 'A machine learning engineer is building an onboarding recommendation model.',
              text:
                'He lists the attributes he needs in a spreadsheet. Some he knows live in Hive. He searches the catalog and Slack for the rest and finds some. For each one found he needs the real-time equivalent: some in the marketing store through an API, some needing a new streaming pipeline. He queries the same data in Databricks to cross-check, and some of it does not match. He finds a document in Slack saying one attribute does not exist yet. Three months, 7 of the 11 attributes.',
            },
          ],
        },
        {
          type: 'p',
          text:
            'Two things ran through all twenty. What earned trust was an owner they knew, a recent refresh, and a table inside their own domain. And the search for something new was about one in four: a solutions architect put it at 75% the same core tables and 25% new, a staff analyst at a quarter to a third of her time. The other three in four were people going back to data they already knew.',
        },
      ],
    },
    {
      id: 'problem',
      heading: 'The search they had: one box that returned everything',
      blocks: [
        {
          type: 'p',
          text:
            'Search had grown by accretion since 2021: tables first, then a Data Map tab, then filter pills added one at a time. By 2024, searching “company status” returned 1,838,670 results under Data Catalog, and the first nine were columns named company_status from nine schemas, each with the same description, before a single table appeared. Eight filter pills sat across the top. In the sessions I recorded why nobody used them: the useful ones, product, schema and domain, did not exist; the rest were two clicks deep, like Data Product Type and then Data Mart; they were written in the Data Map’s vocabulary; and nothing showed that a filter was applied. People did not refine. They asked a colleague.',
        },
        {
          type: 'p',
          text:
            'The team’s own adoption data showed who search was failing. Analysts used discovery at 61% of their addressable base and data engineers at 77%. Technical marketers were at 5% and software developers at 13%. One machine learning engineer spent three months finding the real-time sources for a personalisation project estimated at $4 million a year, found 7 of the 11 attributes he needed, and reckoned that finding them faster would have been worth about $2 million in earlier release.',
        },
        {
          type: 'p',
          text:
            'A year of questions to the company’s data help channel said the same thing at scale. Of 666 questions, 43% were people who could not locate the right data, and 73% were resolved only because a specific person knew the answer.',
        },
      ],
    },
    {
      id: 'research',
      heading: 'The research: twenty people, six tools, one haystack',
      blocks: [
        {
          type: 'p',
          text:
            'This was the catalog’s first follow-me-home series. I designed it, recruited the twenty, and ran every session with the engineering team watching, with one prompt: walk us through a recent time you found data. What tools, how long, what went wrong? Then I ran an in-person workshop where engineering, product and design plotted ideas on impact against what existing technology could do, and starred three. The group product manager wrote that the sessions were “a major contributor to our FY25 roadmap.”',
        },
        {
          type: 'p',
          text: 'What the sessions showed, as I presented it in July 2024.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Discovery runs on people.', text: 'Before the catalog, trusted colleagues and about fifteen Slack channels. During validation, old queries, wikis and GitHub. After, a subject matter expert’s say-so. This was true across every persona.' },
            { lead: 'Six tools per search.', text: 'People jumped across an average of six tools to find and validate one dataset, because no tool had the context of the others.' },
            { lead: 'People know the kind of object they want before they search.', text: 'A table, a topic, a dashboard. The exceptions were marketers and machine learning engineers moving data between systems, who did not know whether an attribute lived in a topic or a table.' },
            { lead: 'It takes a long time to learn that data does not exist.', text: 'One engineer spent weeks across Slack channels to find out he was never going to find what he needed in the lake.' },
            { lead: 'Same names stop people at result two.', text: 'Too many results with the same name and the same description, and no metadata to tell them apart. People did not iterate on their search terms.' },
            { lead: 'AI-written descriptions helped only where there was no human one.', text: 'Beside a steward’s description they lacked context and lowered trust in the feature. Of the twenty, one had used the AI search that already existed.' },
            { lead: 'Team ownership hides the right expert.', text: 'A list of eight names for a team was not an owner. People wanted one point of contact.' },
          ],
        },
        {
          type: 'p',
          text:
            'Two help-channel analyses later confirmed the shape. In the one-year set of 666 questions, 43% were about location. In 726 questions from the first half of 2025, 68% were about what a column or table meant, and 48% had to be escalated to an expert.',
        },
      ],
    },
    {
      id: 'decisions',
      heading: 'The design: a different structure, not a better list',
      blocks: [
        {
          type: 'p',
          text: 'I wrote the Search 2.0 specification in June 2024. Six decisions carry it, each with what it cost.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'One tab per kind of object.',
              text:
                'Tables, Data Map, Kafka topics, feature sets, dashboards, CDC attributes. People knew which kind they wanted, and the single list hid the kind. The cost was to the Data Map I had argued for in 2022 as the way to organise the catalog by meaning: it became one tab among six. Both held. People browse by meaning and search by the kind of thing they want. The map stayed the way to understand a data product, and search stopped forcing it on everyone.',
            },
            {
              lead: 'Filters are not facets.',
              text:
                'A filter is the kind of object. It never changes. A facet is a property of the results, and it changes with the query and with the other facets. I defined four facet behaviours by how many values a facet has and whether they nest: a single value applies itself; many flat values get a searchable list applied in one go; a few values stay visible; nested values browse or search. All four stayed within what the search service could do, so none needed its own infrastructure.',
            },
            {
              lead: 'Five lines per result, no more.',
              text:
                'Chosen by asking in every session what a person needed to see to pick between two similar results. The answer was the trust criteria from the path: last refreshed, size, maturity, how many queries used it in thirty days, and whether they had access.',
            },
            {
              lead: 'What was cut or left open.',
              text:
                'Browsing inside a nested facet came out of the first release after engineering review, and search within it stayed. Sort order was deferred. A richer Data Map tab was dropped for engineering bandwidth, not on the merits. Whether people should tag data or collect it was left open on purpose; it became Collections a year later.',
            },
            {
              lead: 'Reviewed with the engineers who would build it.',
              text:
                'Three senior engineers reviewed the specification. Facets collapsed by default and nested facets became search-only in the first release because of that review.',
            },
            {
              lead: 'Two smaller pieces shipped first.',
              text:
                'In August 2024, business-unit tags on tables: 13 tags covering 74% of the lake, 295,000 unusable tables hidden from results, and precision in the first twenty results up 4%. And Slack insights on table pages, so the channels people were already searching appeared next to the table.',
            },
          ],
        },
      ],
    },
    {
      id: 'shipped',
      heading: 'What shipped, and what it cost',
      blocks: [
        {
          type: 'p',
          text:
            'Table search launched on 14 November 2024, with keyword precision up 12.5% and semantic precision up 58%, and the launch post projected a three-hour cut in the time to discover data from a 14.8-hour baseline. Map search launched on 26 March 2025, across 10,000 data products and 460,000 attributes. It was my first design, taken to launch by a designer on my team after I became manager. The first result was right 89.24% of the time, from 81.31%, and the slowest one in a hundred searches finished in 1.93 seconds instead of 50.59. The old search was switched off on 19 September 2025, by which point Search 2.0 was the primary search for about 70% of users.',
        },
        {
          type: 'p',
          text:
            'Over the following year the searches that ended in a click rose from 41% to 61%, and to 63% by January 2026. Time to discover data fell from 14.2 hours to 9.4, and to 8.2 by May 2026. By then 9,650 of the catalog’s 15,775 users in six months had used Search 2.0, and the first result took about four clicks in five every month.',
        },
        {
          type: 'p',
          text:
            'What it cost. I ran a poll in the help channels on 30 April 2025, and the answers were plain. Exact-name lookups had got slightly worse, because semantic ranking outranked the literal match and defaulted to the map tab; the top-five click rate on exact names dipped from 96% to 94% before recovering to 95%. One person turned the new search off. People who pasted an exact name were confused when it sat behind the hidden-results toggle. And map search was adopted less than tables, because people think in physical objects.',
        },
        {
          type: 'p',
          text:
            'One more cost is mine. The precision figures were measured after launch, because instrumentation was not in the first scope. If I did this again I would write the measurement into the engineering specification on day one, so that every later decision had a baseline to argue from.',
        },
      ],
    },
    {
      id: 'after',
      heading: 'What it set up',
      blocks: [
        {
          type: 'p',
          text:
            'The open question in the specification, tags or collections, became Collections in August 2025: a person’s saved working set of data, which is now the context the agent reads before it searches the wider lake. And the object model behind the tabs, tables, data products, topics, attributes, became the shape of the agent’s tools. That story, from the 2023 assistant to the agent inside Cursor and Claude, is the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
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
            ['Jul 2024', 'The research', '20 sessions; “a major contributor to our FY25 roadmap”', 'My research; the group PM’s words'],
            ['Aug 27, 2024', 'Business-unit tags: precision in the first 20 results', '+4%; 295,000 unusable tables hidden', 'My design'],
            ['Nov 14, 2024', 'Table search precision', '+12.5% keyword, +58% semantic', 'My design; the search-model team built the ranking'],
            ['Mar 26, 2025', 'Searches where the first result was right', '81.31% → 89.24%', 'My design, taken to launch by a designer on my team'],
            ['Mar 26, 2025', 'Time for 99 in 100 searches', '50.59 s → 1.93 s', 'Engineering and the search-model team'],
            ['Jan 2024 → Jan 2026', 'Searches that ended in a click', '41% → 61% → 63%', 'Shared with the catalog team'],
            ['Aug 2024 → May 2026', 'Time to discover data', '14.2 h → 9.4 h → 8.2 h', 'Shared'],
            ['Sep 19, 2025', 'Search 1.0', 'Switched off; 2.0 primary for about 70% of users', 'Shared'],
            ['Jul 2025 → Jan 2026', 'Exact-name top-five clicks', '96% → 94% → 95%', 'The cost; mine to own'],
          ],
        },
      ],
    },
  ],
  next: {
    text: 'Search 2.0 gave the catalog results people could judge. The next question was where the search should live at all: in a chat window, or inside the tools where people already work.',
    label: 'Finding data: from an assistant to an agent',
    href: '/work/agentic-discovery',
  },
  credits:
    'The research, the specification and the table search design are mine. A designer on my team took map search to launch and the team reused the framework for topic and attribute search. The catalog’s engineers and the search-model team built the ranking and delivered the precision and the speed.',
  sources:
    'Design review deck, July 2024; the April 2024 follow-me-home synthesis board and the User Journey board; Design Document for Search 2.0, June 2024; the Search 2.0 Figma file; Data Search Pattern Analysis (666 questions); Data Genius Bar Summary (726 questions); launch posts of Aug 27 and Nov 14, 2024 and Mar 26, 2025; the help-channel poll of Apr 30, 2025; the team’s roadmap tracker and KPI dashboard; Amplitude; AWS re:Invent 2025 for the public 20-day figure.',
}

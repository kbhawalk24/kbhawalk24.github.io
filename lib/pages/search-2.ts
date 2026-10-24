import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: Search 2.0. The argument first: finding data was slow because
// the proof that a table could be trusted lived with people, and the catalog
// had to carry that proof. Then the evidence, the research traced to the
// roadmap, the decisions as positions, what moved, and the evidence below.
// Every figure has a source in docs/FINDING-DATA-NARRATIVE.md.

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Search 2.0: making the catalog carry the proof people got from colleagues',
  roleTag: 'Principal Product Designer',
  period: '2024–2025',
  description:
    'In 2024 I made the case that finding data at Intuit was slow because trust lived with people, not in the catalog. That argument set the next year’s roadmap. Search 2.0 was its first delivery, and the object model underneath it became the team’s framework and, later, the agent’s.',
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
        'Principal designer. I designed and ran the research, made the case to the roadmap, wrote the specification and designed table search. After I became manager, a designer on my team took map search to launch',
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
    { value: '14.8 h → 9.4 h', label: 'Time to discover data, Nov 2024 to Jul 2025, for 6,673 people a month' },
    { value: '41% → 63%', label: 'Searches that ended in a click, Jan 2024 to Jan 2026' },
    { value: '8 of 9', label: 'Research findings that became launches in 2024 and 2025' },
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
      id: 'search-1',
      after: 'problem',
      full: true,
      src: '/work/search-2/search-1-results-2024.jpg',
      width: 2048,
      height: 1147,
      alt: 'The 2024 search results for “company status”: 1,838,670 results under a Data Catalog tab, nine columns named company_status from different schemas with the same description before the first table, and eight filter pills across the top.',
      caption: '“Company status”, 2024: 1,838,670 results, nine identical columns before the first table, and eight filter pills nobody used.',
    },
    {
      id: 'workshop-ideas',
      after: 'research',
      src: '/work/search-2/workshop-ideas-2024.jpg',
      width: 1396,
      height: 1570,
      alt: 'A whiteboard list of workshop ideas with vote counts: people as first-class objects, index enterprise docs and tools, personalise with suggested filters, connect with experts, use cases as first-class objects, bounties, next-action coaching, embed with a team or domain, and a do-it-for-me AI data butler.',
      caption: 'The April 2024 workshop: the ideas the room voted on. Most of the next year’s roadmap is on this board.',
    },
    {
      id: 'workshop-coach',
      after: 'research',
      src: '/work/search-2/workshop-coach-2024.jpg',
      width: 2400,
      height: 1800,
      alt: 'A whiteboard from the April 2024 workshop with sticky notes reading AI DDE coach, Reddit for DDE, and Scale up ask-data-genius-bar to all domains with a 15-minute SLA.',
      caption: 'An AI coach for the catalog, on the board two years before the agent shipped.',
    },
    {
      id: 'tables-tab',
      after: 'decisions',
      full: true,
      src: '/work/search-2/tables-tab-design.jpg',
      width: 1440,
      height: 1020,
      alt: 'The Search 2.0 design for table results: tabs for each kind of object across the top, facets down the left, and each result showing its path, description, tags, owner team, last refresh, size, query count and upstream and downstream counts.',
      caption: 'My design for table results. Five lines on every result: owner, last refresh, size, queries in thirty days, access.',
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
    {
      id: 'haystack',
      after: 'evidence',
      full: true,
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One person’s path through six tools, from my research board. The notes on the right became the roadmap items above.',
    },
    {
      id: 'datamap-filter',
      after: 'evidence',
      src: '/work/search-2/search-1-datamap-filter-2024.jpg',
      width: 1640,
      height: 675,
      alt: 'The Data Map tab of the old search with the Data Product Type filter open, listing Clickstream, Data Mart, Derived Data, Domain Entity, Raw Database Table and Reporting Table.',
      caption: 'To find a data mart you opened Data Product Type and picked Data Mart: two clicks, in the platform’s vocabulary.',
    },
    {
      id: 'workshop-usecase',
      after: 'evidence',
      src: '/work/search-2/workshop-usecase-explorer-2024.jpg',
      width: 2400,
      height: 1800,
      alt: 'A sticky note sketching a use case explorer: a search box, then similar use cases shown as a dev portal project summary, a data product summary and a Slack conversation summary, with a note that it shows when there are no results.',
      caption: 'A use case explorer that appears when search returns nothing: the first answer to “how do I learn this data does not exist?”',
    },
  ],
  sections: [
    {
      id: 'argument',
      eyebrow: 'The argument',
      short: 'Argument',
      heading: 'Finding data was slow because the proof lived with people',
      blocks: [
        {
          type: 'p',
          text:
            'Cutting the time to find data was a company goal for 2024, and the assumption was a search problem: better ranking, more filters. I followed twenty people through a real search and found that the catalog was one stop on a six-tool path, and the stage that took the days was trust. People found a table in minutes and then spent days learning whether to believe it, from old queries, from a colleague, from a Slack channel. So the case I took to the roadmap: put that proof on every result, organise search by the kind of thing people already know they want, and the time comes out of the path.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Get the requirement', tools: 'Jira, meetings', time: 'About a week', quote: 'The biggest delay is getting stakeholders and data owners into one meeting.', who: 'A marketing manager' },
            { title: 'Search', tools: 'Slack, GitHub, then the catalog', time: 'Minutes, then give up', quote: '90% of the time someone knows the answer: a colleague, or the help channel.', who: 'A staff analyst' },
            { title: 'Validate', tools: 'Old queries, the people who ran them', time: 'Where the days went', quote: 'I’d rather just look at a query and see if that’s what I need without bothering them.', who: 'A senior analyst' },
            { title: 'Request access', tools: 'Tickets, one table at a time', time: '2 to 3 days per table', quote: 'Only then can I check whether it’s relevant.', who: 'A staff analyst' },
            { title: 'Explore', tools: 'Databricks, Athena, Postman', quote: 'Even with the right table names the SQL won’t run. The dialects differ.', who: 'A software engineer' },
            { title: 'Move or use it', tools: 'CDC Explorer, Kafka', time: '3 months of a 9-month project', quote: 'I realised it had to be real-time, and the real-time source did not exist.', who: 'A machine learning engineer' },
          ],
          caption: 'The path, from the April 2024 sessions. About 20 days end to end in 2023, by the company’s public figure. Search 2.0 took aim at the second and third stages.',
        },
      ],
    },
    {
      id: 'problem',
      eyebrow: 'The problem',
      short: 'Problem',
      heading: 'The search returned everything and proved nothing',
      blocks: [
        {
          type: 'p',
          text:
            'By 2024, “company status” returned 1,838,670 results, nine identical columns before the first table, and nothing on any result about who owned it, when it was refreshed or whether anyone used it. The filters that would have helped did not exist; the ones that did were two clicks deep, in the platform’s vocabulary, with no sign they were applied. People did not refine. They asked a colleague.',
        },
        {
          type: 'cards',
          items: [
            { value: '73%', title: 'of help-channel questions were answered only because a specific person knew', text: 'From 666 questions over one year. 43% were people who could not locate the data at all.' },
            { value: '5%', title: 'of technical marketers used discovery, against 61% of analysts', text: 'The team’s own adoption data by persona. Search was failing the people who did not already know the schemas.' },
            { value: '$2M', title: 'in earlier release, by one engineer’s estimate', text: 'A machine learning engineer spent three months finding real-time sources for a $4 million-a-year project and found 7 of the 11 attributes he needed.' },
          ],
        },
      ],
    },
    {
      id: 'research',
      eyebrow: 'The research',
      short: 'Research',
      heading: 'Twenty sessions, three findings that changed what the team built',
      blocks: [
        {
          type: 'p',
          text:
            'The catalog’s first follow-me-home series. I designed it, recruited twenty people across nine business units, and ran every session with engineers in the room, with one prompt: walk us through a recent time you found data. Then an in-person workshop where engineering, product and design placed ideas by impact against what existing technology could do.',
        },
        {
          type: 'cards',
          items: [
            { value: '8', title: 'Data analysts', text: 'Weekly KPIs, experiments, deep dives. The persona search was built for.' },
            { value: '6', title: 'Software and data engineers', text: 'Pipelines, lineage, owners. Looked in GitHub before the catalog.' },
            { value: '2 + 2', title: 'ML engineers and marketing managers', text: 'The two groups moving data between systems, and the ones search served worst.' },
            { value: '2', title: 'A solutions architect and a product manager', text: 'Self-serve by necessity. Few analysts to lean on.' },
          ],
        },
        {
          type: 'quotes',
          items: [
            { text: 'I’d rather just, like, look at a query and see if that’s what I need without bothering them.', who: 'Senior business data analyst', when: 'April 2024' },
            { text: 'Slack has been more helpful than Data Discovery for discovery.', who: 'Staff analyst', when: 'April 2024' },
            { text: 'Overall, the search function works great. The only thing is how can I search a column name under a schema name? And to avoid asking around and doing a little reverse engineering in projects.', who: 'Staff business data analyst', when: 'April 2024' },
            { text: 'What’s interesting is that I have rarely used DDE to find things about tables that I don’t own. I mostly use it for tables that I do own, or that my team owns.', who: 'Senior software engineer', when: 'April 2024' },
          ],
        },
        {
          type: 'cards',
          items: [
            { title: 'Trust is decided in two results, from evidence the catalog did not show', text: 'An owner they knew, a recent refresh, a table in their own domain, who had queried it lately. Same-named results with nothing to tell them apart stopped people cold. They did not refine. They escalated.' },
            { title: 'People know what kind of thing they want before they search', text: 'A table, a topic, a dashboard. The one list hid the kind. The exceptions were marketers and ML engineers moving data between systems.' },
            { title: 'Three searches in four go back to data the person already knows', text: 'A solutions architect put it at 75% the same core tables; a staff analyst spent a quarter of her time on new data. The catalog treated every search as a first search.' },
          ],
        },
        {
          type: 'quotes',
          items: [
            { text: 'I don’t think I should reach out to Crystal for this. But I do see Aveek and Sandesh. This covers all the teams. If I see tax, I already know I need to go to all these team members. But I don’t see a specific ownership here.', who: 'Senior data engineer, on team-level ownership (names changed)', when: 'April 2024' },
            { text: 'At this point I am spending too much time looking at two tables I don’t really know, so I decide to go back to Slack.', who: 'Analyst, during a session', when: 'April 2024' },
            { text: 'Kanchi facilitated FMH and D4D sessions that I’d say were a major contributor to our FY25 roadmap and helped the entire team get a better understanding of the user, both qualitative and emotional understanding.', who: 'Group product manager', when: 'July 2024' },
          ],
        },
      ],
    },
    {
      id: 'roadmap',
      eyebrow: 'Research to roadmap',
      short: 'Roadmap',
      heading: 'Eight findings became eight launches, traced from the whiteboard to the date they shipped',
      blocks: [
        {
          type: 'p',
          text:
            'One finding per row, the item it became, when it shipped, and whose work it was. I designed the first four and the specification the rest were built on; designers on my team designed the others after I became their manager in August 2024.',
        },
        {
          type: 'table',
          head: ['What the research found', 'What it became', 'Shipped', 'Result and whose work'],
          rows: [
            ['Trust is decided from metadata the catalog did not show', 'Five lines of evidence on every result', 'Nov 14, 2024 (tables) and Mar 26, 2025 (map)', 'First result right 89.24% of the time, from 81.31%. My design; map search taken to launch by a designer on my team'],
            ['People search by the kind of object they want', 'One tab per kind: tables, Data Map, topics, feature sets, dashboards, attributes', 'Nov 14, 2024', 'Keyword precision +12.5%, semantic +58%. My specification'],
            ['Filters were unused: wrong ones, nested, invisible once applied', 'Facets that change with the query, including usage, marketing group and domain', 'Q2 to Q3 FY25', 'Search session conversion 48% → 55%. My design'],
            ['Marketers wanted to filter by product and business unit', 'Business-unit tags on tables', 'Aug 27, 2024', 'Precision in the first 20 results +4%; 295,000 unusable tables hidden. My design'],
            ['Discovery starts in Slack, in channels people trust', 'Slack insights on table pages', 'Q1 FY25', 'Higher discovery conversion. My design with a designer on my team'],
            ['People validate a table through the queries others ran on it', 'Query insights on table pages', 'Alpha, Q2 to Q3 FY25', 'Designed by a designer on my team'],
            ['Engineers could not find real-time equivalents of batch data', 'Kafka topic search', 'Jun 15, 2025', 'First result right 99.99% of the time, on the same framework. Designed by my team'],
            ['Three searches in four return to known data; people kept lists in spreadsheets', 'Collections and favourites, a saved working set', 'Aug 7, 2025', 'Now the context the agent reads first. My strategy; designed by my team'],
          ],
          caption: 'Launch dates from the team’s launch posts and roadmap tracker.',
        },
      ],
    },
    {
      id: 'decisions',
      eyebrow: 'The decisions',
      short: 'Decisions',
      heading: 'Four positions I took in the specification, and what each one cost',
      blocks: [
        {
          type: 'tension',
          tension:
            'In 2022 I had argued for the Data Map: organise the catalog by what data means, one entry per business concept. In 2024 the sessions said people search by the physical kind of thing they want, and the map was one list among many.',
          decision:
            'One tab per kind of object, with the Data Map as one tab among six. I gave up the structure I had fought for two years earlier, because the evidence said people browse by meaning and search by kind. The map stayed the way to understand a data product. Search stopped forcing it on everyone.',
        },
        {
          type: 'tension',
          tension:
            'Every request for a new filter was reasonable on its own. Together they had produced eight pills nobody used, because the filter for object type and the filter for freshness behaved the same way and looked the same.',
          decision:
            'Filters are not facets. A filter is the kind of object and never changes. A facet is a property of the results and changes with the query. I defined four facet behaviours by cardinality and nesting, and kept all four inside what the search service could already do, so none of them needed its own infrastructure.',
        },
        {
          type: 'tension',
          tension:
            'Engineers and stewards wanted every piece of metadata the platform held on each result: a dozen lines, some of it in platform vocabulary.',
          decision:
            'Five lines per result and no more, chosen by asking in every session what a person needed to see to pick between two similar results. I held that line against every request to add a sixth. More went behind a click.',
        },
        {
          type: 'tension',
          tension:
            'The specification asked for browsing inside nested facets, a sort order, a richer Data Map tab, and a way for people to mark data as theirs.',
          decision:
            'Nested browsing came out of the first release after engineering review, and search within a facet stayed. Sort was deferred. The richer map tab was dropped for engineering bandwidth, and I said so rather than pretend it was a design call. Tags versus collections I left open on purpose. It became Collections a year later.',
        },
      ],
    },
    {
      id: 'shipped',
      eyebrow: 'What shipped',
      short: 'Shipped',
      heading: 'The time came out of the path, and two things got worse before they got better',
      blocks: [
        {
          type: 'cards',
          items: [
            { value: '14.8 h → 9.4 h', title: 'Time to discover data', text: 'November 2024 to July 2025, across the catalog’s users. 8.2 hours by May 2026.' },
            { value: '41% → 63%', title: 'Searches that ended in a click', text: 'January 2024 to January 2026. The all-time high came the quarter the old search was switched off.' },
            { value: '4 in 5', title: 'Clicks went to the first result', text: 'Every month from November 2025 to May 2026, by the catalog’s own instrumentation.' },
          ],
        },
        {
          type: 'p',
          text:
            'Table search launched on 14 November 2024, map search on 26 March 2025, and the old search was switched off on 19 September 2025 with Search 2.0 already the primary search for about 70% of users.',
        },
        {
          type: 'quotes',
          items: [
            { text: 'Right now if I search for an exact table name it defaults to Data Map, resulting in an extra click to the Tables tab compared to before. Hoping that exact table matches can be prioritized to the top without extra clicks.', who: 'Catalog user, help-channel poll', when: 'April 30, 2025' },
            { text: 'Finding the option to show hidden tables in 2.0 is incredibly difficult. As well as knowing why tables are hidden.', who: 'Staff data scientist, help-channel poll', when: 'April 30, 2025' },
            { text: 'Turned off Search 2.0 because I found the original version more helpful.', who: 'Catalog user, help-channel poll', when: 'April 30, 2025' },
            { text: 'Wait, you can find topics in DDE now? I didn’t know that.', who: 'Engineer, in a follow-me-home on topic search', when: 'Q3 FY26' },
          ],
        },
        {
          type: 'tension',
          tension:
            'I ran a poll in the help channels on 30 April 2025. Exact-name lookups had got slightly worse, because semantic ranking outranked the literal match and defaulted to the map tab. One person turned the new search off. People who pasted an exact name were confused when it sat behind the hidden-results toggle. And map search was adopted less than tables, because people think in physical objects.',
          decision:
            'An exact name deserves its own fast path, which the team added; the top-five click rate on exact names dipped from 96% to 94% and recovered to 95%. The other cost is mine. The precision figures were measured after launch, because instrumentation was not in the first scope. If I did this again I would write the measurement into the engineering specification on day one, so every later decision had a baseline to argue from.',
        },
      ],
    },
    {
      id: 'after',
      eyebrow: 'What it set up',
      short: 'After',
      heading: 'The object model became the team’s framework, then the agent’s',
      blocks: [
        {
          type: 'p',
          text:
            'The tabs were an object model: tables, data products, topics, attributes, each with its own evidence. The team reused it for topic and attribute search without a new design, and it became the shape of the agent’s tools in 2026. The open question in the specification became Collections, now the context the agent reads first. That story is the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
        },
        {
          type: 'quotes',
          items: [
            { text: 'The Search 2.0 design, introduction of dynamic facets, and thinking around Data Map vs hosting location search experiences.', who: 'Engineering manager, on what to credit me with', when: 'February 2025' },
            { text: 'Kanchi is one of the most capable designers I have worked with. Search 2.0 is actually a big milestone for DDE and the products built on top of it. It also enables the next steps like collections, query insights persistence.', who: 'Staff software engineer and product manager, written feedback', when: 'January and February 2025' },
            { text: 'Saved myself and data stewards time.', who: 'Marketing manager, on business-unit tags', when: 'FY25' },
          ],
        },
        {
          type: 'cards',
          items: [
            { title: 'Measure before you ship', text: 'Precision was measured after launch because instrumentation was not in scope. The research would have landed harder with a baseline, and the dip on exact names would have been caught in a week instead of a quarter.' },
            { title: 'Organise by meaning, search by kind', text: 'Both the 2022 Data Map and the 2024 tabs were right. The mistake would have been making people choose. The map explains a data product; search finds the thing you can name.' },
            { title: 'Hand off on purpose', text: 'Giving map search to a designer on my team was not delegation. It kept one owner on the surface while I took the agent, and that designer carried two more search types to 99.99% precision on the same framework.' },
          ],
        },
      ],
    },
    {
      id: 'evidence',
      eyebrow: 'The evidence',
      short: 'Evidence',
      heading: 'Three of the twenty, walked through as they happened',
      blocks: [
        {
          type: 'steps',
          caption: 'An analyst building an experiment dashboard needs firmographic data.',
          items: [
            { title: 'Slack first', tools: 'One trusted channel', quote: 'Finds a dashboard, not the table she wants.' },
            { title: 'The catalog', tools: 'Search, then a join', quote: 'Finds a table, joins it to hers: zero rows.' },
            { title: 'Slack again', tools: 'Both table names', quote: 'No examples of either, anywhere.' },
            { title: 'Back to the dashboard', tools: 'Its linked sources', quote: 'A table owned by someone known for QBO analytics. Recent, familiar owner. She takes it.', time: 'At this point I am spending too much time on two tables I don’t know, so I go back to Slack.' },
          ],
        },
        {
          type: 'steps',
          caption: 'A marketing manager has a Jira request for a customer’s latest expert.',
          items: [
            { title: 'Search “expert”', tools: 'Typeahead', quote: 'Clicks the first result because she had been in that folder before.' },
            { title: 'Many similar names', tools: 'No owner shown', quote: 'Goes to the help channel to ask which one is populated.' },
            { title: 'Search “zipcode”', tools: 'Needed county', quote: 'Nothing. Browses the Data Map instead.' },
            { title: 'Wrong domain', tools: 'Commerce, then income tax, then the schema', quote: 'Picks commerce by habit. Did not know the default filter could be changed.' },
          ],
        },
        {
          type: 'steps',
          caption: 'A machine learning engineer is building an onboarding recommendation model.',
          items: [
            { title: 'List the attributes', tools: 'A spreadsheet', quote: 'Some he knows live in Hive. The rest he has to find.' },
            { title: 'Catalog and Slack', tools: 'For the rest', quote: 'Finds some. A document in Slack says one does not exist yet.' },
            { title: 'Real-time equivalents', tools: 'The marketing store, new pipelines', quote: 'Some through an API, some need a new streaming pipeline.' },
            { title: 'Cross-check', tools: 'Databricks', quote: 'Queries the same data twice. Some of it does not match.', time: '3 months, 7 of 11 attributes' },
          ],
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Impact',
      short: 'Impact',
      heading: 'What moved, when, and whose work it was',
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
    'The research, the case to the roadmap, the specification and the table search design are mine. A designer on my team took map search to launch and the team reused the framework for topic and attribute search. The catalog’s engineers and the search-model team built the ranking and delivered the precision and the speed.',
  sources:
    'Design review deck, July 2024; the April 2024 follow-me-home synthesis board and the User Journey board; Design Document for Search 2.0, June 2024; the Search 2.0 Figma file; Data Search Pattern Analysis (666 questions); Data Genius Bar Summary (726 questions); launch posts of Aug 27 and Nov 14, 2024 and Mar 26, Jun 15 and Aug 7, 2025; the help-channel poll of Apr 30, 2025; the team’s roadmap tracker and KPI dashboard; Amplitude; AWS re:Invent 2025 for the public 20-day figure.',
}

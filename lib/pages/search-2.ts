import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: Search 2.0. Each section is an eyebrow, a heading, one lead
// paragraph under 60 words, one visual, and at most one supporting block.
// Sources for every figure are in docs/FINDING-DATA-NARRATIVE.md.

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Search 2.0: redesigning search for the data catalog',
  roleTag: 'Principal Product Designer',
  period: '2024–2025',
  description:
    'Finding data at Intuit was slow because trust lived with people, not in the catalog. I made that case to the roadmap in 2024. Search 2.0 was its first delivery; the object model under it became the team’s framework and, later, the agent’s.',
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
    { label: 'Duration', value: 'March 2024 to September 2025' },
    { label: 'My role', value: 'Principal designer: the research, the case to the roadmap, the specification, table search. Map search taken to launch by a designer on my team' },
    { label: 'Team', value: 'The catalog’s PM and engineers, the search-model team, three senior engineers who reviewed the spec' },
    { label: 'Research', value: '20 follow-me-home sessions across nine business units, with engineers in the room; a workshop; 1,392 help-channel questions; Amplitude' },
  ],
  stats: [
    { value: '14.8 h → 9.4 h', label: 'Time to discover data, Nov 2024 to Jul 2025' },
    { value: '41% → 63%', label: 'Searches that ended in a click, Jan 2024 to Jan 2026' },
    { value: '8 of 9', label: 'Research findings that became launches' },
  ],
  hero: {
    src: '/work/search-2/hero.mp4',
    poster: '/work/search-2/hero-poster.jpg',
    width: 1600,
    height: 872,
    tint: TINTS.platform2026,
    alt: 'A screen recording of the shipped search, 2026: a query typed into the Tables tab, results with their owner, last refresh and queries run, and the maturity score opened on the first result.',
    caption: 'The search as it shipped, recorded May 2026: the Tables tab, the facets down the left, and the maturity score on the first result. Sped up 1.5 times.',
  },
  visuals: [
    {
      id: 'haystack',
      after: 'argument',
      lead: true,
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One person’s path through six tools, from my research board. The notes on the right became roadmap items.',
    },
    {
      id: 'search-1',
      after: 'problem',
      lead: true,
      src: '/work/search-2/search-1-results-2024.jpg',
      width: 2048,
      height: 1147,
      alt: 'The 2024 search results for “company status”: 1,838,670 results under a Data Catalog tab, nine columns named company_status from different schemas with the same description before the first table, and eight filter pills across the top.',
      caption: '“Company status”, 2024: 1,838,670 results, nine identical columns before the first table, eight filter pills nobody used.',
    },
    {
      id: 'workshop-board',
      after: 'research',
      lead: true,
      src: '/work/search-2/workshop-board-2024.jpg',
      width: 1558,
      height: 1214,
      alt: 'Sticky notes on a whiteboard placed by impact against existing versus new technology: people as first-class object, personalise, index enterprise docs and tools, bounties, next-action coaching, connect with experts, use cases as first-class object, do it for me. Three are starred.',
      caption: 'The April 2024 workshop: engineering, product and design placing ideas by impact against what existing technology could do. Three starred.',
    },
    {
      id: 'raw-notes',
      after: 'voices',
      lead: true,
      src: '/work/search-2/raw-notes-board-2024.jpg',
      width: 2400,
      height: 619,
      alt: 'The raw-notes board from the April 2024 sessions: twenty columns of sticky notes, one column per person, each note a thing they said or did, with the ones that recurred marked in purple.',
      caption: 'The raw notes from the twenty sessions, April 2024: one row per person, one note per observation, the recurring ones in purple. Zoomed out; the quotes below are read from it.',
    },
    {
      id: 'ai-search',
      after: 'persona',
      lead: true,
      src: '/work/search-2/ai-search-2024.jpg',
      width: 1990,
      height: 1000,
      alt: 'The old AI search asked for a table with an email column in a named schema. It returns five unrelated tables: order headers, users, a QuickBooks Self-Employed view, a user dimension and a payroll view.',
      caption: 'What the AI search that already existed returned for a plain request. One of the twenty had ever used it.',
    },
    {
      id: 'workshop-ideas',
      after: 'roadmap',
      lead: true,
      src: '/work/search-2/workshop-ideas-2024.jpg',
      width: 1396,
      height: 1060,
      alt: 'A whiteboard list of workshop ideas with vote counts: people as first-class objects, index enterprise docs and tools, personalise with suggested filters, connect with experts, use cases as first-class objects, bounties and a data marketplace, next-action coaching.',
      caption: 'The ideas the room voted on in April 2024. Most of the next year’s roadmap is on this board.',
    },
    {
      id: 'tables-tab',
      after: 'decisions',
      lead: true,
      src: '/work/search-2/hero-annotated.jpg',
      width: 2000,
      height: 1196,
      alt: 'The Search 2.0 design for table results, annotated for the July 2024 design review: one tab per object type, filters visible down the left with search inside a schema, business-unit tags, data maturity stars, and five lines of operational and social-trust metadata on every result.',
      caption: 'My design for table results, as reviewed in July 2024, with the review annotations: one tab per kind, visible filters, and five lines of evidence on every result.',
    },
    {
      id: 'click-depth',
      after: 'shipped',
      lead: true,
      src: '/work/search-2/click-depth.jpg',
      width: 2087,
      height: 930,
      alt: 'Stacked monthly bars showing which search result people clicked, November 2025 to May 2026, with the first result the large majority every month.',
      caption: 'Which result people clicked, November 2025 to May 2026. The first result took about four clicks in five every month.',
    },
    {
      id: 'workshop-coach',
      after: 'after',
      lead: true,
      src: '/work/search-2/workshop-coach-2024.jpg',
      width: 2400,
      height: 1800,
      alt: 'Sticky notes from the workshop: AI DDE coach, Reddit for DDE, scale up the help channel to all domains with a 15-minute SLA.',
      caption: 'An AI coach for the catalog, on the board in April 2024, two years before the agent shipped.',
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
            'Cutting the time to find data was a company goal for 2024, and the assumption was a search problem. I followed twenty people through a real search. The catalog was one stop on a six-tool path, and the stage that took the days was trust: people found a table in minutes, then spent days learning whether to believe it.',
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
          caption: 'The six stages, from the April 2024 sessions. About 20 days end to end in 2023, by the company’s public figure. Search 2.0 took aim at stages two and three.',
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
            'Nothing on a result said who owned it, when it was refreshed or whether anyone used it. The filters that would have helped did not exist; the ones that did were two clicks deep, in the platform’s words, with no sign they were applied. People did not refine. They asked a colleague.',
        },
        {
          type: 'cards',
          items: [
            { value: '73%', title: 'of help-channel questions were answered only because a specific person knew', text: '666 questions over one year. 43% could not locate the data at all.' },
            { value: '5%', title: 'of technical marketers used discovery, against 61% of analysts', text: 'Search was failing the people who did not already know the schemas.' },
            { value: '$2M', title: 'in earlier release, by one engineer’s estimate', text: 'Three months finding real-time sources for a $4 million-a-year project.' },
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
            'The catalog’s first follow-me-home series: eight analysts, six engineers, two ML engineers, two marketing managers, a solutions architect and a product manager, across nine business units, with engineers in the room. Then a workshop where the team placed ideas by impact against what existing technology could do.',
        },
        {
          type: 'cards',
          items: [
            { title: 'Trust is decided in two results, from evidence the catalog did not show', text: 'An owner they knew, a recent refresh, their own domain, who queried it lately. Same names with nothing to tell them apart stopped people cold.' },
            { title: 'People know what kind of thing they want before they search', text: 'A table, a topic, a dashboard. One list hid the kind. The exceptions: marketers and ML engineers moving data between systems.' },
            { title: 'Three searches in four go back to data the person already knows', text: 'A solutions architect: 75% the same core tables. The catalog treated every search as a first search.' },
          ],
        },
      ],
    },
    {
      id: 'voices',
      eyebrow: 'In their words',
      short: 'Voices',
      heading: 'What people said when the catalog could not tell them',
      blocks: [
        {
          type: 'quotes',
          items: [
            { text: 'Slack has been more helpful than Data Discovery for discovery.', who: 'Staff analyst', when: 'April 2024' },
            { text: 'I don’t think I should reach out to her for this. But I do see these two. This covers all the teams. I don’t see a specific ownership here.', who: 'Senior data engineer, on team-level ownership', when: 'April 2024' },
            { text: 'Kanchi facilitated FMH and D4D sessions that I’d say were a major contributor to our FY25 roadmap.', who: 'Group product manager', when: 'July 2024' },
          ],
        },
      ],
    },
    {
      id: 'persona',
      eyebrow: 'One of the twenty',
      short: 'One person',
      heading: 'Three months to find 7 of 11 attributes',
      blocks: [
        {
          type: 'p',
          text:
            'A machine learning engineer building an onboarding recommendation model. He tried the catalog, fell back to Slack and GitHub, and for every attribute he found still had to find its real-time equivalent. His statement, in the workshop’s own format.',
        },
        {
          type: 'statement',
          who: 'A machine learning engineer, April 2024',
          rows: [
            { label: 'I am', text: 'an engineer building AI into QuickBooks.' },
            { label: 'Trying to', text: 'personalise “next action” experiences from signals like SKU and signup type.' },
            { label: 'But', text: 'it takes three to four months of up-front work to find the data for each project,' },
            { label: 'Because', text: 'I triangulate between the catalog, random people on Slack, and GitHub threads.' },
            { label: 'Which makes me feel', text: 'stuck trying to boil the ocean.' },
            { label: 'In a perfect world', text: 'it takes seconds to find the data, or to learn that it does not exist yet.' },
          ],
        },
      ],
    },
    {
      id: 'roadmap',
      eyebrow: 'Research to roadmap',
      short: 'Roadmap',
      heading: 'Eight findings became eight launches',
      blocks: [
        {
          type: 'p',
          text: 'One finding per row, the item it became, when it shipped, and whose work it was. I designed the first four and the specification the rest were built on; designers on my team designed the others after I became their manager in August 2024.',
        },
        {
          type: 'table',
          head: ['What the research found', 'What it became', 'Shipped', 'Result · whose work'],
          rows: [
            ['Trust is decided from metadata the catalog did not show', 'Five lines of evidence on every result', 'Nov 14, 2024 and Mar 26, 2025', 'First result right 89.24%, from 81.31% · my design; map search launched by my team'],
            ['People search by the kind of object they want', 'One tab per kind', 'Nov 14, 2024', 'Keyword precision +12.5%, semantic +58% · my specification'],
            ['Filters unused: wrong ones, nested, invisible once applied', 'Facets that change with the query', 'Q2–Q3 FY25', 'Session conversion 48% → 55% · my design'],
            ['Marketers wanted to filter by product and business unit', 'Business-unit tags', 'Aug 27, 2024', 'Top-20 precision +4%; 295,000 unusable tables hidden · my design'],
            ['Discovery starts in Slack channels people trust', 'Slack insights on table pages', 'Q1 FY25', 'Higher discovery conversion · my design with my team'],
            ['People validate a table through the queries others ran', 'Query insights on table pages', 'Alpha, FY25', 'Designed by my team'],
            ['Engineers could not find real-time equivalents of batch data', 'Kafka topic search', 'Jun 15, 2025', 'First result right 99.99% · my team, same framework'],
            ['Three searches in four return to known data', 'Collections, a saved working set', 'Aug 7, 2025', 'Now the agent’s first context · my strategy, my team’s design'],
          ],
          caption: 'Dates from the team’s launch posts and roadmap tracker.',
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
          items: [
            {
              tension: 'In 2022 I argued for the Data Map: organise the catalog by what data means. In 2024 the sessions said people search by the physical kind of thing they want.',
              decision: 'One tab per kind, with the map as one tab among six. I gave up the structure I had fought for, because people browse by meaning and search by kind. The map stayed the way to understand a data product.',
            },
            {
              tension: 'Every request for a new filter was reasonable alone. Together they made eight pills nobody used, because object type and freshness looked and behaved the same.',
              decision: 'Filters are not facets. A filter is the kind of object and never changes. A facet is a property of the results and changes with the query. Four facet behaviours, all inside what the search service could already do.',
            },
            {
              tension: 'Engineers and stewards wanted every piece of metadata on each result: a dozen lines, some in platform vocabulary.',
              decision: 'Five lines per result, chosen by asking in every session what a person needed to pick between two similar tables. I held that line against every request for a sixth.',
            },
            {
              tension: 'The spec asked for browsing inside nested facets, a sort order, a richer Data Map tab, and a way to mark data as yours.',
              decision: 'Nested browsing came out after engineering review; search within a facet stayed. Sort deferred. The richer map tab dropped for bandwidth, and I said so. Tags versus collections I left open on purpose. It became Collections a year later.',
            },
          ],
        },
      ],
    },
    {
      id: 'shipped',
      eyebrow: 'What shipped',
      short: 'Shipped',
      heading: 'The time came out of the path, and one thing got worse before it got better',
      blocks: [
        {
          type: 'p',
          text:
            'Table search launched on 14 November 2024, map search on 26 March 2025, and the old search was switched off on 19 September 2025 with Search 2.0 already primary for 70% of users. Exact-name lookups got worse first: semantic ranking outranked the literal match, and the top-five click rate on exact names dipped from 96% to 94% before the team added a fast path and it recovered to 95%. The cost that is mine: precision was measured after launch, because instrumentation was not in the first scope.',
        },
        {
          type: 'quotes',
          items: [
            { text: 'If I search for an exact table name it defaults to Data Map, resulting in an extra click to the Tables tab compared to before.', who: 'Catalog user, help-channel poll', when: 'April 30, 2025' },
            { text: 'Finding the option to show hidden tables in 2.0 is incredibly difficult. As well as knowing why tables are hidden.', who: 'Staff data scientist, help-channel poll', when: 'April 30, 2025' },
            { text: 'Turned off Search 2.0 because I found the original version more helpful.', who: 'Catalog user, help-channel poll', when: 'April 30, 2025' },
          ],
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
            'The tabs were an object model: tables, data products, topics, attributes, each with its own evidence. The team reused it for topic and attribute search without a new design, and it became the shape of the agent’s tools in 2026. I handed map search to a designer on my team on purpose, so the surface kept one owner while I took the agent. That story is the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
        },
        {
          type: 'quotes',
          items: [
            { text: 'The Search 2.0 design, introduction of dynamic facets, and thinking around Data Map vs hosting location search experiences.', who: 'Engineering manager, on what to credit me with', when: 'February 2025' },
            { text: 'Search 2.0 is actually a big milestone for DDE and the products built on top of it. It also enables the next steps like collections, query insights persistence.', who: 'Product manager, written feedback', when: 'February 2025' },
            { text: 'Saved myself and data stewards time.', who: 'Marketing manager, on business-unit tags', when: 'FY25' },
          ],
        },
      ],
    },
  ],
  next: {
    text: 'Search 2.0 gave the catalog results people could judge. The next question was where the search should live at all: in a chat window, or inside the tools where people already work.',
    label: 'Building the data discovery agent for Cursor and Claude',
    href: '/work/agentic-discovery',
  },
  credits:
    'The research, the case to the roadmap, the specification and the table search design are mine. A designer on my team took map search to launch and the team reused the framework for topic and attribute search. The catalog’s engineers and the search-model team built the ranking and delivered the precision and the speed.',
  sources:
    'Design review deck, July 2024; the April 2024 follow-me-home synthesis board and the User Journey board; Design Document for Search 2.0, June 2024; the Search 2.0 Figma file; Data Search Pattern Analysis (666 questions); Data Genius Bar Summary (726 questions); launch posts of Aug 27 and Nov 14, 2024 and Mar 26, Jun 15 and Aug 7, 2025; the help-channel poll of Apr 30, 2025; the team’s roadmap tracker and KPI dashboard; Amplitude; AWS re:Invent 2025 for the public 20-day figure.',
}

import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: Search 2.0. Eight sections that carry one argument: search
// answered the navigation question, and the real question was comprehension.
// Each section is a heading, one lead paragraph, one visual and at most one
// supporting block. Sources: the June 2024 design document and its review
// notes, the April 2024 session boards, the Nov 2024 and Mar 2025 launch
// posts, the FY24 year-end review, the Data Genius Bar summary (726
// questions), the help-channel analysis (666 questions), Amplitude, and the
// public figures from AWS re:Invent 2025. People are credited by role.

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Search 2.0: redesigning search for the data catalog',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2024–2025',
  description:
    'The search box was fine. The problem was that the catalog gave people no reason to trust what it returned, so they asked each other instead. In spring 2024 I watched twenty people across nine business units search for data while doing their own work, paired that with 1,392 help-channel questions, overturned the structure I had designed in 2022, and wrote the specification that rebuilt search across 320,000 tables and 10,000 data products. Eight launches followed over eighteen months.',
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
    { label: 'Duration', value: 'January 2024 to September 2025' },
    { label: 'My role', value: 'Principal designer for the FY24 clean-up of the index, the research and the June 2024 specification; design manager for the launches, the Search 1.0 sunset and the extensions from August 2024' },
    { label: 'Who built it', value: 'Search engineering and the search-model team built the ranking and the indexing; three senior engineers reviewed the specification; a designer on my team took Data Map search to launch, and the team built stream search, marketing-attribute search, query insights and Collections on the same framework' },
    { label: 'Research', value: '20 contextual sessions across 9 business units, with engineers in the room; 1,392 help-channel questions (666 Slack threads and 726 Data Genius Bar queries); Amplitude' },
  ],
  stats: [
    { value: '81.31% → 89.24%', label: 'First-result precision on Data Map search, Mar 2025; MRR 0.81 → 0.89; P99 latency 50.59 s → 1.93 s' },
    { value: '32% → 63%', label: 'Searches that ended in a click, Jan 2024 to Jan 2026; time to discover data 14.2 h → 8.9 h' },
    { value: '8 of 8', label: 'Research findings that became launches, FY25 to FY26' },
  ],
  hero: {
    src: '/work/search-2/hero.mp4',
    poster: '/work/search-2/hero-poster.jpg',
    width: 1600,
    height: 872,
    tint: TINTS.platform2026,
    alt: 'A screen recording of the shipped search, 2026: a query typed into the Tables tab, results with their owner, last refresh and queries run, and the maturity score opened on the first result.',
    caption: 'The search as it shipped, recorded May 2026: a tab for each kind of data, facets that change with the query, and five lines of signal on every result. Sped up 1.5 times.',
  },
  visuals: [
    {
      id: 'slack-session',
      after: 'problem',
      lead: true,
      src: '/work/search-2/slack-session-2024.jpg',
      width: 590,
      height: 600,
      alt: 'A Slack channel during an observed session: a thread of questions about where to find firmographic data, with links to a dashboard, a query and a table passed between colleagues. Names blurred.',
      caption: 'An observed session, April 2024: a person searching Slack for a dataset. Links to a dashboard, a query and a table pass between colleagues. Slack was the discovery layer; the catalog was one stop on the way. Names blurred.',
    },
    {
      id: 'raw-notes',
      after: 'research',
      lead: true,
      src: '/work/search-2/raw-notes-board-2024.jpg',
      width: 2400,
      height: 619,
      alt: 'The raw-notes board from the April 2024 sessions: twenty columns of sticky notes, one column per person, each note a thing they said or did, with the ones that recurred marked in purple.',
      caption: 'The raw notes from the twenty sessions, April 2024: one row per person, one note per observation, the recurring ones in purple.',
    },
    {
      id: 'haystack',
      after: 'comprehension',
      lead: true,
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One person’s path through six tools to trust one result, from my research board. Four of the six steps happen outside the catalog. The notes on the right became roadmap items.',
    },
    {
      id: 'tabs',
      after: 'reversal',
      lead: true,
      src: '/work/search-2/decision-tabs.png',
      width: 820,
      height: 240,
      alt: 'The shipped search, 2026: one tab per kind of object, Data Map, Tables, CDC Attributes and Topics, with the first table result under it.',
      caption: 'The shipped search: one tab per kind of object. The Data Map, which I had designed as the catalog’s organising idea in 2022, is one tab among them.',
    },
    {
      id: 'search-1',
      after: 'reversal',
      src: '/work/search-2/search-1-results-2024.jpg',
      width: 2048,
      height: 1147,
      alt: 'The 2024 search results for “company status”: 1,838,670 results under a Data Catalog tab, nine columns named company_status from different schemas with the same description before the first table, and eight filter pills across the top.',
      caption: 'Before: “company status” in the old search, 2024. 1,838,670 results, nine identically named columns before a single table, and eight filter pills nobody used.',
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
  ],
  sections: [
    {
      id: 'problem',
      eyebrow: '1 · The problem',
      short: 'Problem',
      heading: 'The search box was fine. The problem was trust.',
      blocks: [
        {
          type: 'p',
          text:
            'Intuit’s data lake held about 320,000 tables, 10,000 data products and 460,000 attributes, and cutting the time to find data was a company goal for 2024. People found a candidate table in minutes. Then they spent days finding out whether to believe it: messaging whoever wrote the pipeline three years ago, asking in the help channel which of two identically named customer tables was still refreshed, waiting for access and then finding the column they needed was empty. At that scale, “ask a colleague” was the retrieval system. Only 1 of the 20 people I later interviewed had ever tried the catalog’s AI search, which was visible on every page.',
        },
        {
          type: 'cards',
          items: [
            { value: '73%', title: 'of 666 help-channel questions in one year were answered only because a specific person knew which table to use', text: '43% of them were simply trying to locate the right dataset.' },
            { value: '5% vs 61%', title: 'of marketers’ searches ended in a click, against 61% of analysts’', text: 'The catalog was written in the storage vocabulary of the people who built the warehouse, not the people who used it.' },
            { value: '295,000', title: 'tables hidden from default results before Search 2.0 began', text: 'In the second half of FY24 I designed business-unit data tags (13 tags covering 74% of the lake) and Data Marts in the catalog (2,000 clean tables surfaced, 85% of non-consumable ones suppressed). A better search would still have failed on a flooded index.' },
          ],
        },
      ],
    },
    {
      id: 'research',
      eyebrow: '2 · The research, spring 2024',
      short: 'Research',
      heading: 'Twenty sessions, with engineers in the room',
      blocks: [
        {
          type: 'p',
          text:
            'Before opening Figma I watched twenty people search for data while doing their actual work: eight analysts, four software engineers, two data engineers, two machine-learning engineers, two marketing managers, a solutions architect and a product manager, across nine business units. Engineers came along to watch, so the findings were theirs as much as mine. The group product manager later wrote that the series was “a major contributor to our FY25 roadmap.” Three findings came out of the sessions and the synthesis workshop that followed.',
        },
        {
          type: 'cards',
          items: [
            { title: '1 · People know what kind of asset they want before they type', text: 'Almost everyone arrived knowing whether they needed a table, a real-time stream, a feature set or a dashboard. The exceptions were marketing managers and ML engineers moving data between systems, who needed to know whether an attribute lived in a topic or a table.' },
            { title: '2 · Trust is decided in about 60 seconds, on the first two results', text: 'People looked at the top two results, then gave up or rewrote the query. Analysts trusted engineering-owned, curated tables over raw ones. ML engineers wanted a fast no: to learn that a dataset does not exist and move on.' },
            { title: '3 · Four times in five, people are re-finding, not discovering', text: 'About 80% of sessions were people going back to tables they had vetted weeks earlier, re-running the search as a bookmark bar. One ML engineer building an onboarding model spent three months finding 7 of 11 attributes, then had to find each one’s real-time equivalent again.' },
          ],
        },
      ],
    },
    {
      id: 'comprehension',
      eyebrow: '3 · The core finding',
      short: 'Comprehension',
      heading: 'People were not looking for tables. They were trying to understand them.',
      blocks: [
        {
          type: 'p',
          text:
            'Search had been built to answer one question: where is the table with this name. The sessions showed four. Find it, understand what is in it, trust that it is the right one, and use it without going to Slack. Search answered the first and left the other three to colleagues. That is why the catalog was one stop on a six-tool path, and it is the thesis the rest of this page tests.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'What search was built for: find a table by name, navigate to it, done.', decision: 'What people needed: find the table, understand what is in it, trust that it is the right one, use it without asking anyone.' },
          ],
        },
      ],
    },
    {
      id: 'roadmap',
      eyebrow: '4 · Research to roadmap',
      short: 'Roadmap',
      heading: 'Eight findings became eight launches',
      blocks: [
        {
          type: 'p',
          text:
            'I presented the state of the catalog and what Search 2.0 would change to leadership mid-year, and took the findings to the roadmap as eight items. All eight shipped between November 2024 and August 2025. Two of them, query insights and Collections, had to be argued for repeatedly against the demands of the platform’s larger programmes. The engineering manager wrote that they “would not have happened if not for Kanchi’s persistence and design sponsorship.” I designed and specified the first launches; designers on my team carried the rest after I became their manager in August 2024.',
        },
        {
          type: 'table',
          head: ['From finding', 'What shipped', 'When', 'Whose work'],
          rows: [
            ['1 · Asset type known up front', 'One search tab per kind of object', 'Nov 14, 2024', 'My design and specification'],
            ['2 · Trust decided in 60 seconds', 'A five-line result card: operational and social proof', 'Nov 14, 2024', 'My specification'],
            ['2 · Governance unclear on each object', 'Clean-data maturity stars on every result', 'Nov 14, 2024', 'My design'],
            ['1, 2 · People search in business language', 'Data Map and marketing-attribute search', 'Mar 26 and Aug 12, 2025', 'My specification; carried to launch by my team'],
            ['2 · Filters unused: wrong ones, nested, invisible once applied', 'A facet bar that changes with the query', 'Q2–Q3 FY25', 'My specification'],
            ['3 · Four searches in five re-find a known table', 'Collections, a saved working set', 'Aug 7, 2025', 'My sponsorship; my team’s design'],
            ['2, 3 · People check a table through others’ queries', 'Query insights on table pages', 'May 2025', 'My sponsorship; my team’s design'],
            ['1 · Batch data with no real-time equivalent in sight', 'Real-time stream search', 'Jun 15, 2025', 'My team’s design, same framework'],
          ],
          caption: 'Dates from the team’s launch posts and roadmap tracker. The first column names the research finding each item came from.',
        },
      ],
    },
    {
      id: 'reversal',
      eyebrow: '5 · The specification, June 2024',
      short: 'Reversal',
      heading: 'I replaced the structure I had argued for in 2022',
      blocks: [
        {
          type: 'p',
          text:
            'In 2022 I designed the Data Map to organise the catalog around business concepts, Customer or Invoice, with every physical copy nested underneath. By 2024 search had split into two modes, Catalog and Data Map, each mixing every kind of physical asset in one list. My own research now said that business concepts help new people orient, and that working engineers and analysts search by the physical object they need to query. So the June 2024 specification replaced the two modes with one tab per object type, grouped by where the data physically lives: tables, the Data Map, real-time streams, CDC attributes, feature sets, dashboards. The map I had fought for became one tab among them, and stayed the way to understand a data product. Reviewers pushed the split further than my first draft: tables, columns and schemas each got their own section.',
        },
        {
          type: 'cards',
          items: [
            { title: 'A table', text: 'Owner · domain · last refresh · maturity stars · queries in 30 days. Enough to choose between two tables with the same name.' },
            { title: 'A Kafka topic', text: 'Producer · consumers · schema. The evidence a stream needs is not the evidence a table needs.' },
            { title: 'A data product', text: 'The business meaning, its owner, and every physical copy listed beneath it. The 2022 idea, kept where it helps.' },
          ],
        },
      ],
    },
    {
      id: 'decisions',
      eyebrow: '6 · Four more calls, and what each cost',
      short: 'Decisions',
      heading: 'Filters, facets, five lines, and what was left open',
      blocks: [
        {
          type: 'p',
          text:
            'The specification drew a line the old interface never had. In its words: filters are reserved for a searchable object and never change with the query; facets are reserved for metadata about an object, and any nominal metadata with unlimited values is always a facet. The search service, Vertex AI, supported a fixed set of facet behaviours, so I defined four by cardinality and kept all of them inside what it did out of the box. Nested tree browsing came out of the first release after discussion with engineering; keyword search inside the facet stayed.',
        },
        {
          type: 'clips',
          items: [
            { src: '/work/search-2/facet-single.webm', width: 520, height: 560, title: 'One value: apply at once', text: 'A facet group with a single value applies itself.', alt: 'The filter column: a single-value facet applying automatically when the query returns one schema.' },
            { src: '/work/search-2/facet-low.webm', width: 520, height: 560, title: 'Few values: show them all', text: 'Five or fewer values sit inline, one click to clear.', alt: 'The filter column: a low-cardinality facet showing every value inline, with the Show clean tables toggle above.' },
            { src: '/work/search-2/facet-multi.webm', width: 520, height: 560, title: 'Many values: pick, then apply', text: 'A searchable multi-select with a group-level Apply, so the page does not reload on every checkbox.', alt: 'The filter column: three schemas selected in a searchable dropdown and applied together as chips.' },
            { src: '/work/search-2/facet-nested.webm', width: 520, height: 560, title: 'Nested values: search, not browse', text: 'Tree browsing was cut from release one; typing matches any node.', alt: 'The filter column: typing into the Data Map folders facet matches nodes at any level.' },
          ],
          caption: 'The four facet behaviours, from the prototype attached to the June 2024 specification.',
        },
      ],
    },
    {
      id: 'calls',
      eyebrow: 'The other three',
      short: 'Three more',
      heading: 'Five lines per card, AI descriptions demoted, tags left open',
      blocks: [
        {
          type: 'tension',
          items: [
            {
              image: { src: '/work/search-2/decision-result.png', width: 1030, height: 520, alt: 'Two results, each with its owner, last refresh, queries run, row count and data product beside the description.' },
              tension: 'People decided within 60 seconds on the top two results, and result cards had become a dumping ground for every metadata field a team wanted to promote.',
              decision: 'A hard ceiling of five lines per card, split between operational signals (path, maturity stars, last refresh, steward) and social proof (query volume, active users, verified documentation). The specification deferred everything else to a side panel per object type, so that the five lines stayed the ones that help choose between two similar results.',
            },
            {
              image: { src: '/work/search-2/decision-filters.png', width: 660, height: 470, alt: 'The filter column of the design beside the first results: hidden results, compliance, usage and schema, every filter visible with its state.' },
              tension: 'In the design review, two of the first three reviewers said AI-written descriptions felt untrustworthy mixed in with human ones.',
              decision: 'Steward-written descriptions show by default. An AI description appears only as a labelled fallback when no human one exists, and the owner can edit it inline.',
            },
            {
              image: { src: '/work/search-2/decision-datamap.png', width: 1440, height: 1050, alt: 'The Data Map tab design: data products with their freshness, hosting location and type filters down the left.' },
              tension: 'Stakeholders asked for user-applied tags so analysts could label tables for their teams. A principal engineer pointed out in review that freeform tags rot into inconsistent noise.',
              decision: 'I left the choice between tags and saved collections open in the specification rather than ship a tagging system that would decay, then argued Collections, a saved and shareable working set of trusted data, onto the FY26 roadmap over initial engineering scepticism. It shipped on August 7, 2025.',
            },
          ],
        },
      ],
    },
    {
      id: 'shipped',
      eyebrow: '7 · What shipped, what it did not solve, and what was mine',
      short: 'Shipped',
      heading: 'Precision rose, latency fell, and two gaps showed',
      blocks: [
        {
          type: 'p',
          text:
            'Table search launched on 14 November 2024 and Data Map search on 26 March 2025; the old search was switched off in September 2025, by which point Search 2.0 was primary for about 70% of users and session conversion had gone from 41% to 61% over the year. Object-type separation ended the ambiguous mixed lists, facets cut the time to a trusted result, and certification became visible without a click. Two things it did not solve. When the ranking was tuned for natural-language queries, people who pasted an exact table name saw semantic neighbours outrank the exact string, and the Data Map default tab added a click; top-five click-through dipped from 96% to 94% in July 2025. One person wrote in the April poll: “If I search for an exact table name it defaults to Data Map, resulting in an extra click to the Tables tab compared to before.” Amplitude caught it, a fast path for exact strings and a routing change fixed it, and the rate recovered to 95% by January 2026. And column-name search still returned table-level relevance, so the comprehension gap was narrower, not closed. The cost that is mine: instrumentation was not in the first scope, so precision was measured after launch rather than designed for before it.',
        },
        {
          type: 'table',
          head: ['Launch and scope', 'Metric', 'Before → after', 'Attribution and source'],
          rows: [
            ['Table Search 2.0, Nov 14, 2024, 320,000 tables', 'Keyword and semantic precision', '+12.5% keyword; +58% semantic', 'My design; the search-model team built the ranking. Nov 2024 launch post'],
            ['Data Map Search 2.0, Mar 26, 2025, 10,000 data products and 460,000 attributes', 'First-result precision; MRR; P99 latency; average response', '81.31% → 89.24%; 0.81 → 0.89; 50.59 s → 1.93 s; 15.88 s → 1.24 s', 'My design and specification; carried to launch by a designer on my team; speed by search engineering. Mar 2025 launch post'],
            ['Search 1.0 sunset and discovery behaviour, Jan 2024 to Jan 2026', 'Searches ending in a click; time to discover and access data; monthly users, Mar 2026', '32% (Jan 2024) → 41% (Aug 2024) → 61% (Jul 2025, Search 1.0 switched off) → 63% (Jan 2026); 14.2 h → 9.4 h → 8.9 h, from 20 days in 2023; 6,673 monthly users, 3,843 of them searching', 'Platform-wide; the team’s KPI tracker, Amplitude and AWS re:Invent 2025'],
            ['Stream search Jun 15, 2025; marketing-attribute search Aug 12, 2025', 'First-result precision', '99.99% on both', 'Built on the tab and facet specification; designed by my team; ranking by engineering'],
          ],
          caption: 'The 20-day figure is Intuit’s public number for the whole path, including access and exploration; 14.2 hours is the catalog’s own measure of the search step.',
        },
      ],
    },
    {
      id: 'after',
      eyebrow: '8 · What it set up, 2025 to 2026',
      short: 'After',
      heading: 'Research compounds: the object model became the agent’s tool schema',
      blocks: [
        {
          type: 'p',
          text:
            'Fixing search changed the questions people asked. In the 726 Data Genius Bar questions analysed after the rebuild, 16% were still about locating a table; 68.2% were about comprehension, what a column meant, how two tables joined, which filters to apply; and 74.1% could be answered by a single-table lookup if column-level context reached the person where they worked. That is the finding from section 3, measured a year later. The June 2024 specification had already listed Slack and queries as future search objects, and both shipped within the year as Slack insights and query insights. Collections followed in August 2025. Together they set up the next step: the catalog inside Cursor and Claude, where the Search 2.0 object model, tables, data products, topics and attributes each with their own evidence, is the schema the agent’s tools answer with. That story is on the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
        },
        {
          type: 'cards',
          items: [
            { value: 'FY24 Q3', title: 'Research: twenty sessions, seven roles', text: 'The first behavioural evidence on how people search for data. The group PM called it a major contributor to the FY25 roadmap.' },
            { value: 'Mar 2025', title: 'Search 2.0: typed, facet-indexed objects', text: 'Tables, Data Map, streams, attributes, each with its own evidence. First-result precision 81% → 89%.' },
            { value: 'Aug 2025', title: 'Collections: a saved working set', text: 'Built on the same object model, for the three searches in four that go back to known data.' },
            { value: 'Mar 2026', title: 'The agent: the object model is the tool schema', text: 'Inside Cursor and Claude, checking Collections first. Question to answer 45 min → 4 min.' },
          ],
        },
      ],
    },
  ],
  next: {
    text: 'Search 2.0 gave the catalog results people could judge. The next question was where the search should live: in a chat window, or inside the tools where people already work.',
    label: 'Building the data discovery agent for Cursor and Claude',
    href: '/work/agentic-discovery',
  },
}

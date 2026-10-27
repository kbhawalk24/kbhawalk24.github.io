import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: Search 2.0, in the order of the October 2026 master findings
// document: scorecard, problem (index pollution and trust), research,
// research to roadmap, the June 2024 specification as four positions,
// architectural trade-offs and failure modes, what it set up. One argument runs through them: search
// answered the navigation question, and the real question was comprehension. Sources: the June 2024 design document and its review
// notes, the April 2024 session boards, the Nov 2024 and Mar 2025 launch
// posts, the FY24 year-end review, the Data Genius Bar summary (726
// questions), the help-channel analysis (666 questions), Amplitude, and the
// public figures from AWS re:Invent 2025. People are credited by role.

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Search 2.0: rebuilding information architecture across 320,000 tables and 10,000 data products',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2024–2025',
  description:
    'Fixing enterprise data search meant going past the search box: suppressing 295,000 dirty tables from the index, aligning the information architecture with how people physically search rather than with the business model I had designed in 2022, constraining dynamic facets to what the Vertex AI service supported, and holding every result to a five-line trust card. Eight launches followed over eighteen months.',
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
    { label: 'Role', value: 'Principal Product Designer, January to August 2024: the research, the dirty-data suppression and the specification. Product Design Manager, August 2024 to 2026: the launches, the Search 1.0 sunset and the downstream extensions' },
    { label: 'Scope', value: 'Enterprise data discovery across Intuit’s data platform: 320,000 tables, 10,000 data products, 460,000 attributes, about 6,600 monthly users' },
    { label: 'Who built it', value: 'Search engineering and the search-model team built the ranking and the indexing; three senior engineers reviewed the specification; a designer on my team took Data Map search to launch, and the team built stream search, marketing-attribute search, query insights and Collections on the same framework' },
    { label: 'Research', value: '20 Follow-Me-Home sessions across 9 business units with engineering observers, synthesised in HeyMarvin; 1,392 help-channel questions (666 Slack threads and 726 Data Genius Bar queries); Amplitude' },
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
      after: 'research',
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One person’s path through six tools to trust one result, from my research board. Four of the six steps happen outside the catalog. The notes on the right became roadmap items.',
    },
    {
      id: 'tabs',
      after: 'spec',
      lead: true,
      src: '/work/search-2/decision-tabs.png',
      width: 820,
      height: 240,
      alt: 'The shipped search, 2026: one tab per kind of object, Data Map, Tables, CDC Attributes and Topics, with the first table result under it.',
      caption: 'The shipped search: one tab per kind of object. The Data Map, which I had designed as the catalog’s organising idea in 2022, is one tab among them.',
    },
    {
      id: 'search-1',
      after: 'problem',
      lead: true,
      src: '/work/search-2/search-1-results-2024.jpg',
      width: 2048,
      height: 1147,
      alt: 'The 2024 search results for “company status”: 1,838,670 results under a Data Catalog tab, nine columns named company_status from different schemas with the same description before the first table, and eight filter pills across the top.',
      caption: '“Company status” in the old search, 2024: 1,838,670 results, nine identically named columns before a single table, and eight filter pills nobody used. The search returned everything and proved nothing.',
    },
    {
      id: 'click-depth',
      after: 'tradeoffs',
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
      id: 'scorecard',
      eyebrow: '1 · Quantitative impact',
      short: 'Scorecard',
      heading: 'The scorecard, with attribution',
      blocks: [
        {
          type: 'p',
          text:
            'Engineers and the search-model team built the ranking models and the indexing. The specification defined what was searchable, how objects were separated, how facets behaved and the five lines of signal on every card. Each row names whose work the number is.',
        },
        {
          type: 'table',
          head: ['Launch and scope', 'Metric', 'Before → after', 'Attribution and source'],
          rows: [
            ['Table Search 2.0, Nov 14, 2024, 320,000 tables', 'Keyword and semantic precision', '+12.5% keyword; +58% semantic', 'My design; the search-model team built the ranking. Nov 2024 launch post'],
            ['Data Map Search 2.0, Mar 26, 2025, 10,000 data products and 460,000 attributes', 'First-result precision; MRR; P99 latency; average response', '81.31% → 89.24%; 0.81 → 0.89; 50.59 s → 1.93 s; 15.88 s → 1.24 s', 'My design and specification; carried to launch by a designer on my team; speed by search engineering. Mar 2025 launch post'],
            ['Search 1.0 sunset and discovery conversion, Jan 2024 to Jan 2026', 'Searches ending in a click; time to discover and access data; monthly users, Mar 2026', '32% (Jan 2024) → 41% (Aug 2024) → 61% (Jul 2025, Search 1.0 switched off) → 63% (Jan 2026); 14.2 h → 9.4 h → 8.9 h; 6,673 monthly users, 3,843 of them searching', 'Platform-wide; the team’s KPI tracker, Amplitude and AWS re:Invent 2025'],
            ['Downstream reuse: stream search Jun 15, 2025; marketing-attribute search Aug 12, 2025', 'First-result precision', '99.99% on both', 'Built on the six-tab, four-facet specification; designed by my team; ranking by engineering'],
          ],
          caption: 'Intuit’s public figure for the whole discovery path, including access and exploration, was 20 days in 2023; 14.2 hours is the catalog’s own measure of the search step.',
        },
      ],
    },
    {
      id: 'problem',
      eyebrow: '2 · The problem',
      short: 'Problem',
      heading: 'Index pollution and a trust deficit',
      blocks: [
        {
          type: 'p',
          text:
            'The search box was not the problem. The index behind it returned everything and proved nothing, so people verified results through each other.',
        },
        {
          type: 'list',
          items: [
            { lead: 'The scale.', text: 'Intuit’s data lake held roughly 320,000 tables, 10,000 data products and 460,000 attributes, and cutting the time to find data was a company goal for 2024.' },
            { lead: 'The user pain.', text: 'People found a candidate table in minutes, then spent days verifying whether they could believe it: messaging the pipeline author, asking in the help channel which of two identically named customer tables was active, waiting days for access only to find empty columns.' },
            { lead: 'The prior AI failure.', text: 'Only 1 of the 20 people interviewed had ever tried the catalog’s existing AI search, visible on every page, because an uncurated index produced undifferentiated, untrustworthy results.' },
            { lead: 'Help-channel evidence.', text: 'Of 666 questions in the data help channel over one year, 43% were people trying to locate data and 73% needed a specific human expert to resolve. Marketers’ searches ended in a click 5% of the time, against 61% for analysts: the catalog was written in the storage vocabulary of the people who built the warehouse.' },
            { lead: 'The prerequisite: dirty-data suppression.', text: 'Before Search 2.0 began, in the second half of FY24, I designed Filter by BU Data Tag (13 business-unit tags covering 74% of the lake, hiding 295,000 dirty tables from default results) and Data Marts in the catalog (2,000 clean consumable tables surfaced, 85% of non-consumable tables suppressed). A better search would still have failed on a flooded index.' },
          ],
        },
      ],
    },
    {
      id: 'research',
      eyebrow: '3 · Research findings, spring 2024',
      short: 'Research',
      heading: 'Twenty sessions, nine business units, three findings',
      blocks: [
        {
          type: 'p',
          text:
            'Twenty Follow-Me-Home sessions across nine business units, with engineers observing: eight analysts, four software engineers, two data engineers, two machine-learning engineers, two marketing managers, a solutions architect and a product manager. Synthesised in HeyMarvin and a workshop with the team. The group product manager later wrote that the series was “a major contributor to our FY25 roadmap.”',
        },
        {
          type: 'cards',
          items: [
            { title: '1 · Asset type known up front', text: 'People almost always arrived knowing whether they needed a physical table, a real-time stream, a feature set or a dashboard. The exceptions were marketing managers and ML engineers moving data between systems.' },
            { title: '2 · The 60-second trust window', text: 'People evaluated only the top two results before abandoning or rewriting the query. Analysts trusted curated, engineering-owned tables over raw ones. ML engineers needed fast negative confirmation: knowing a dataset does not exist.' },
            { title: '3 · 80% re-finding, 20% discovery', text: 'Four sessions in five were people returning to tables they had vetted weeks earlier, using search as a bookmark bar.' },
          ],
        },
        {
          type: 'statement',
          who: 'One of the twenty: a machine-learning engineer on QuickBooks, April 2024, from my synthesis board. The onboarding model had taken three months to find 7 of its 11 attributes.',
          rows: [
            { label: 'I am', text: 'a machine-learning engineer building an onboarding model for QuickBooks,' },
            { label: 'trying to', text: 'find the eleven attributes the model needs, and then the real-time equivalent of each one,' },
            { label: 'but', text: 'three months in I have found seven, and the catalog lists tables, streams and dead pipelines in one list with no freshness or production signal,' },
            { label: 'because', text: 'the search index treats every storage object the same, so I ask in Slack before I write a line of code.' },
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
            'I presented the state of the catalog and what Search 2.0 would change to leadership mid-year and took the findings to the roadmap as eight items. All eight shipped between November 2024 and August 2025. Two of them, query insights and Collections, had to be argued for repeatedly against the platform’s larger programmes; the engineering manager wrote that they “would not have happened if not for Kanchi’s persistence and design sponsorship.” I designed and specified the first launches; designers on my team carried the rest after I became their manager in August 2024.',
        },
        {
          type: 'table',
          head: ['Finding', 'Shipped capability', 'When', 'Attribution and scope'],
          rows: [
            ['1 · Asset type known up front', 'Object-specific search tabs', 'Nov 14, 2024', 'My design and specification'],
            ['2 · Trust decided in 60 seconds', 'Five-line card with operational and social proof', 'Nov 14, 2024', 'My specification'],
            ['3 · People search in business language', 'Data Map and marketing-attribute search', 'Mar 26 and Aug 12, 2025', 'My specification; carried by my team'],
            ['4 · Re-finding existing assets (80%)', 'Data Collections, saved working sets', 'Aug 7, 2025', 'My sponsorship; my team’s design'],
            ['5 · Context-switching to verify data', 'Embedded query insights', 'May 2025', 'My sponsorship; my team’s design'],
            ['6 · Unclear object governance', 'Clean-data maturity star ratings', 'Nov 14, 2024', 'My design'],
            ['7 · Unfiltered, irrelevant results', 'Dynamic, query-aware facet bar', 'Q2–Q3 FY25', 'My specification'],
            ['8 · Fragmented ingestion models', 'Real-time stream search', 'Jun 15, 2025', 'My team’s design, same framework'],
          ],
          caption: 'Dates from the team’s launch posts and roadmap tracker.',
        },
      ],
    },
    {
      id: 'spec',
      eyebrow: '5 · The June 2024 design specification',
      short: 'Specification',
      heading: 'Four positions I took in the design document',
      blocks: [
        {
          type: 'p',
          text:
            'In June 2024 I wrote the design document that search engineering built from. Three senior engineers reviewed it before anything was built. Four positions in it decided the shape of what shipped.',
        },
        { type: 'subhead', number: '01', text: 'Giving up the 2022 Data Map structure' },
        {
          type: 'p',
          text:
            'In 2022 I had designed the Data Map around abstract business concepts, Customer or Invoice, with every physical copy nested underneath. By 2024 search had split into Catalog and Data Map modes, each mixing every kind of physical asset in one list, and the research showed that working engineers and analysts search by the physical object they need to query. I replaced the split with one dedicated tab per object type, grouped by where the data physically lives: Tables, Data Map, Real-Time Streams, Feature Sets, Dashboards and Marketing Attributes. The map I had argued for became one tab among six, and stayed the way to understand a data product. Reviewers pushed the split further than my first draft: tables, columns and schemas each got their own section.',
        },
        {
          type: 'cards',
          items: [
            { title: 'A table', text: 'Owner · domain · last refresh · maturity stars · queries in 30 days. Enough to choose between two tables with the same name.' },
            { title: 'A real-time stream', text: 'Producer · consumers · schema. The evidence a stream needs is not the evidence a table needs.' },
            { title: 'A data product', text: 'The business meaning, its owner, and every physical copy listed beneath it. The 2022 idea, kept where it helps.' },
          ],
        },
        { type: 'subhead', number: '02', text: 'Separating filters from facets, and four facet behaviours inside Vertex AI’s limits' },
        {
          type: 'p',
          text:
            'The old interface treated every narrowing control the same. The specification drew the line: a filter is the kind of object, the top tabs, and never changes with the query; a facet is a property of the returned results, domain, owner, freshness, maturity, and changes with the active tab and query. Any nominal metadata with unlimited values is always a facet. To keep engineering scope inside what the Vertex AI search service supported out of the box, I defined four facet behaviours by cardinality and hierarchy.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Single-value facets:', text: 'auto-applied immediately.' },
            { lead: 'Low-cardinality facets (five values or fewer):', text: 'every value visible inline, one click to clear.' },
            { lead: 'High-cardinality flat facets (owner, database):', text: 'a searchable multi-select with a group-level Apply, so the page does not reload on every checkbox.' },
            { lead: 'High-cardinality nested facets (business domain):', text: 'nested tree browsing cut from release one after engineering review; flat keyword matching of any node shipped instead.' },
          ],
        },
        {
          type: 'clips',
          items: [
            { src: '/work/search-2/facet-single.webm', width: 520, height: 560, title: 'One value: apply at once', text: 'A facet group with a single value applies itself.', alt: 'The filter column: a single-value facet applying automatically when the query returns one schema.' },
            { src: '/work/search-2/facet-low.webm', width: 520, height: 560, title: 'Few values: show them all', text: 'Five or fewer values sit inline, one click to clear.', alt: 'The filter column: a low-cardinality facet showing every value inline, with the Show clean tables toggle above.' },
            { src: '/work/search-2/facet-multi.webm', width: 520, height: 560, title: 'Many values: pick, then apply', text: 'A searchable multi-select with a group-level Apply.', alt: 'The filter column: three schemas selected in a searchable dropdown and applied together as chips.' },
            { src: '/work/search-2/facet-nested.webm', width: 520, height: 560, title: 'Nested values: search, not browse', text: 'Tree browsing was cut from release one; typing matches any node.', alt: 'The filter column: typing into the Data Map folders facet matches nodes at any level.' },
          ],
          caption: 'The four facet behaviours, from the prototype attached to the June 2024 specification.',
        },
        { type: 'subhead', number: '03', text: 'Five-line result card anatomy, and guardrails on AI descriptions' },
        {
          type: 'tension',
          items: [
            {
              image: { src: '/work/search-2/decision-result.png', width: 1030, height: 520, alt: 'Two results, each with its owner, last refresh, queries run, row count and data product beside the description.' },
              tension: 'People decided within 60 seconds on the top two results, and result cards had become a dumping ground for every metadata field a team wanted to promote.',
              decision: 'A hard ceiling of five lines per card. Operational signals: table path, clean-data maturity stars, last refresh, steward. Social proof: query volume, unique active users, verified documentation and Slack insights. Everything else deferred to a side panel per object type, so the five lines stayed the ones that choose between two similar results.',
            },
            {
              image: { src: '/work/search-2/decision-filters.png', width: 660, height: 470, alt: 'The filter column of the design beside the first results: hidden results, compliance, usage and schema, every filter visible with its state.' },
              tension: 'In the design review, two of the first three reviewers said AI-written descriptions felt untrustworthy mixed in with human ones.',
              decision: 'Steward-written descriptions show by default. An AI description appears only as an explicitly labelled fallback when no human documentation exists, and the data owner can edit it inline. AI moved from an ungrounded metadata generator to an editor-approved assistance layer.',
            },
          ],
        },
        { type: 'subhead', number: '04', text: 'Leaving tags open, championing Data Collections' },
        {
          type: 'tension',
          items: [
            {
              image: { src: '/work/search-2/decision-datamap.png', width: 1440, height: 1050, alt: 'The Data Map tab design: data products with their freshness, hosting location and type filters down the left.' },
              tension: 'Stakeholders asked for user-applied tags so analysts could label tables for their teams. A principal engineer pointed out in review that freeform tags rot into subjective, inconsistent noise.',
              decision: 'I left the choice between tags and saved collections open in the specification rather than ship a tagging system that would decay, then championed Data Collections, a saved and shareable working set of trusted data, onto the FY26 roadmap over initial engineering scepticism, to answer the 80% re-finding behaviour. It shipped on August 7, 2025.',
            },
          ],
        },
      ],
    },
    {
      id: 'tradeoffs',
      eyebrow: '6 · Architectural trade-offs and failure modes',
      short: 'Trade-offs',
      heading: 'Three trade-offs, what each cost, and what was mine',
      blocks: [
        {
          type: 'p',
          text:
            'Table search launched on 14 November 2024 and Data Map search on 26 March 2025. The old search was switched off in September 2025, by which point Search 2.0 was primary for about 70% of users and session conversion had gone from 41% to 61% over the year. Three trade-offs shaped the result.',
        },
        {
          type: 'tension',
          items: [
            {
              tension: 'Exact-name search degradation. Tuning the ranking for vector and semantic recall meant that people who pasted an exact physical table name saw semantic neighbours outrank the exact string, and the Data Map default tab added a click. Top-five click-through dropped from 96% to 94% in July 2025. One person wrote in the poll: “If I search for an exact table name it defaults to Data Map, resulting in an extra click to the Tables tab compared to before.”',
              decision: 'Amplitude telemetry isolated the exact-string queries. Engineering built a deterministic exact-match routing fast path and the tab routing changed; top-five click-through recovered to 95% by January 2026 without giving up natural-language quality. The cost that is mine: instrumentation was not in the first scope, so this was measured after launch rather than designed for before it.',
            },
            {
              tension: 'Information architecture against speed of refinement. Enterprise metadata taxonomies favour deeply nested trees, and the business-domain facet was one. Exposing the tree inside a query-dependent facet was the costliest item in the engineering review.',
              decision: 'Nested tree browsing came out of release one; flat keyword matching of any node in the tree shipped instead. That traded taxonomy completeness for execution speed and lower interaction latency. Column-name search still returned table-level relevance, so the comprehension gap narrowed rather than closed.',
            },
            {
              tension: 'Governance against AI-generated metadata. Unverified LLM summaries across enterprise datasets threatened the trust the whole redesign was meant to restore.',
              decision: 'Steward-written documentation overrides the AI fallback everywhere, the fallback is labelled, and owners edit it inline. The rule held through the later launches and became the model the agent page follows.',
            },
          ],
        },
      ],
    },
    {
      id: 'after',
      eyebrow: '7 · What it set up, 2025 to 2026',
      short: 'What it set up',
      heading: 'Search solved locating data. Comprehension and the coding agent came next.',
      blocks: [
        {
          type: 'p',
          text:
            'Fixing search changed the questions people asked. In the 726 Data Genius Bar questions analysed after the rebuild, 16% were still about locating a table; 68.2% were about comprehension, what a column meant, how two tables joined, which filters to apply; and 74.1% could be answered by a single-table lookup if column-level context reached the person where they worked. The June 2024 specification had already listed Slack and queries as future search objects, and both shipped within the year as Slack insights and query insights. Collections followed in August 2025. Together they set up the catalog inside Cursor and Claude, where the Search 2.0 object model, tables, data products, topics and attributes each with their own evidence, is the schema the agent’s tools answer with. That story is on the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
        },
        {
          type: 'cards',
          items: [
            { value: 'FY24 Q3', title: 'Research: twenty sessions, seven roles', text: 'The first behavioural evidence on how people search for data. The group PM called it a major contributor to the FY25 roadmap.' },
            { value: 'Mar 2025', title: 'Search 2.0: typed, facet-indexed objects', text: 'Tables, Data Map, streams, attributes, each with its own evidence. First-result precision 81% → 89%.' },
            { value: 'Aug 2025', title: 'Collections: a saved working set', text: 'Built on the same object model, for the four searches in five that go back to known data.' },
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

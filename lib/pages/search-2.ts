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
  title: 'Rebuilding search for Intuit’s data catalog: 320,000 tables, 10,000 data products',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2024–2025',
  description:
    'The team called it Search 2.0. Fixing how 6,600 people find data meant going past the search box: suppressing 295,000 dirty tables from the index, aligning the information architecture with how people physically search rather than with the business model I had designed in 2022, constraining dynamic facets to what the Vertex AI service supported, and holding every result to a five-line trust card. Eight launches followed over eighteen months.',
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
      { text: 'Principal Product Designer', note: '(Jan to Aug 2024)' },
      { text: 'Product Design Manager', note: '(Aug 2024 to 2026)' },
    ] },
    { label: 'Scope', lines: [
      { text: 'Intuit’s data platform' },
      { text: '320,000 tables' },
      { text: '10,000 data products' },
      { text: 'about 6,600 monthly users' },
    ] },
    { label: 'Research', lines: [
      { text: '20 Follow-Me-Home sessions', note: '(9 business units)' },
      { text: '666 Slack help threads' },
      { text: '726 Genius Bar queries' },
    ] },
    { label: 'Shipped', lines: [
      { text: 'Table search', note: '(Nov 2024)' },
      { text: 'Data Map search', note: '(Mar 2025)' },
      { text: 'Stream and marketing search', note: '(Jun to Aug 2025)' },
      { text: 'Collections', note: '(Aug 2025)' },
    ] },
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
            'Data discovery was the single longest phase of any data lifecycle at Intuit; that was the business case for rebuilding the information architecture rather than polishing the search box. Engineering built the ranking and the indexing; the specification defined what was searchable, how objects were separated, how facets behaved and the five lines on every card. Each row names whose work the number is.',
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
            'The search box was not the problem. The index behind it returned everything and proved nothing: people found a candidate table in minutes, then spent days finding out whether to believe it, through each other. Four of the six steps happened outside the catalog.',
        },
        {
          type: 'journey',
          items: [
            { title: 'Search the catalog' },
            { title: 'Ask in the data help channel', outside: true },
            { title: 'Message whoever last wrote the pipeline', outside: true },
            { title: 'Request access and wait', outside: true },
            { title: 'Sample the columns in a notebook', outside: true },
            { title: 'Start over with the next candidate' },
          ],
          caption: 'The discovery path observed in the 2024 sessions, from my research board.',
        },
        {
          type: 'cards',
          items: [
            { value: '320,000', title: 'tables in the lake, with 10,000 data products and 460,000 attributes', text: 'Cutting the time to find data was a company goal for 2024.' },
            { value: '1 of 20', title: 'people had ever tried the catalog’s AI search', text: 'It was visible on every page. An uncurated index made its answers untrustworthy.' },
            { value: '73%', title: 'of 666 help-channel questions needed a specific human to resolve', text: '43% were people trying to locate data. Marketers’ searches ended in a click 5% of the time, analysts’ 61%.' },
            { value: '295,000', title: 'dirty tables hidden from default results before the redesign began', text: 'The prerequisite I designed in FY24: 13 business-unit tags covering 74% of the lake, and Data Marts surfacing 2,000 clean tables while suppressing 85% of non-consumable ones.' },
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
            'Twenty Follow-Me-Home sessions across nine business units, with engineers observing, synthesised in HeyMarvin and a workshop with the team. The group product manager later wrote that the series was “a major contributor to our FY25 roadmap.”',
        },
        {
          type: 'chips',
          items: [
            { count: '8', label: 'analysts', icon: 'chart' },
            { count: '4', label: 'software engineers', icon: 'code' },
            { count: '2', label: 'data engineers', icon: 'wrench' },
            { count: '2', label: 'ML engineers', icon: 'brain' },
            { count: '2', label: 'marketing managers', icon: 'megaphone' },
            { count: '1', label: 'solutions architect', icon: 'boxes' },
            { count: '1', label: 'product manager', icon: 'clipboard' },
          ],
        },
        {
          type: 'cards',
          items: [
            { title: '1 · Asset type known up front', text: 'People arrived knowing whether they needed a table, a stream, a feature set or a dashboard. The exceptions: marketers and ML engineers moving data between systems.' },
            { title: '2 · The 60-second trust window', text: 'Only the top two results got looked at. Analysts trusted curated tables over raw ones; ML engineers wanted a fast no.' },
            { title: '3 · 80% re-finding, 20% discovery', text: 'Four sessions in five went back to tables vetted weeks earlier. Search was a bookmark bar.' },
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
            'The findings went to the roadmap as eight items, and all eight shipped between November 2024 and August 2025. Two of them, query insights and Collections, had to be argued for repeatedly; the engineering manager wrote that they “would not have happened if not for Kanchi’s persistence and design sponsorship.” I designed and specified the first launches; my team carried the rest after I became their manager in August 2024.',
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
            'The June 2024 design document is what search engineering built from, after three senior engineers reviewed it. Four positions in it decided the shape of what shipped.',
        },
        { type: 'subhead', number: '01', text: 'Giving up the 2022 Data Map structure: object taxonomy mapping' },
        {
          type: 'p',
          text:
            'In 2022 I had designed the Data Map around business concepts, Customer or Invoice, with every physical copy nested underneath. By 2024 the research showed that working engineers and analysts search by the physical object they need to query. So I mapped every searchable object to where it is hosted and gave each kind its own tab. The map I had argued for became one tab among six. Reviewers pushed the split further: tables, columns and schemas each got their own section.',
        },
        {
          type: 'table',
          head: ['Tab', 'Objects grouped under it', 'Evidence shown on a result', 'Shipped'],
          rows: [
            ['Tables', 'Tables · columns · schemas', 'Owner · domain · last refresh · maturity stars · queries in 30 days', 'Nov 14, 2024'],
            ['Data Map', 'Data products · attributes', 'Business meaning · owner · every physical copy beneath it', 'Mar 26, 2025'],
            ['Real-time streams', 'Kafka topics · attributes', 'Producer · consumers · schema', 'Jun 15, 2025'],
            ['CDC attributes', 'Change-data-capture attributes', 'Source · consumers', 'Aug 2025'],
            ['Feature sets', 'Feature sets · features', 'Owning team · model', 'Framework in place'],
            ['Dashboards', 'Dashboards', 'Author · views · last updated', 'Framework in place'],
            ['Marketing attributes', 'Marketing attributes', 'Owner · freshness', 'Aug 12, 2025'],
            ['Queries (future in spec)', 'Queries', 'Who ran it · against which table', 'Query insights, May 2025'],
            ['Enterprise tools (future in spec)', 'Slack · GitHub · Google Docs · wiki', 'The thread or document itself', 'Slack insights, FY25'],
          ],
          caption: 'The object taxonomy from the June 2024 specification: each searchable object assigned to the tab for where it is hosted, with the evidence that kind of object needs. Dates from the launch posts.',
        },
        { type: 'subhead', number: '02', text: 'Separating filters from facets: API cardinality and facet constraints' },
        {
          type: 'p',
          text:
            'The old interface treated every narrowing control the same. The specification drew a line between the two, then defined four facet behaviours by the cardinality and hierarchy of the values, every one inside what the Vertex AI search service did out of the box.',
        },
        {
          type: 'compare',
          panels: [
            { label: 'Filters', text: 'The kind of object. Static: chosen before or after the query, never changed by it.', pills: ['Tables', 'Data Map', 'Streams', 'Feature sets', 'Dashboards'] },
            { label: 'Facets', text: 'A property of the returned results. Dynamic: values change with the active tab and the query.', pills: ['Domain', 'Owner', 'Last refresh', 'Maturity ★★★★', 'Schema'], accent: true },
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
        { type: 'subhead', number: '03', text: 'Five-line result card anatomy: a payload budget, and AI fallback guardrails' },
        {
          type: 'anatomy',
          kind: 'Table',
          name: 'customer_account',
          groups: ['Operational', 'Social'],
          lines: [
            { text: 'data lake / enterprise_monetization · steward: data platform', group: 'Operational' },
            { text: 'Clean-data maturity ★★★★ · controlled', group: 'Operational' },
            { text: 'Last refreshed today, 5:30 AM', group: 'Operational' },
            { text: '1,224 queries · 86 people in the last 30 days', group: 'Social' },
            { text: 'Steward-written description · Slack insights', group: 'Social' },
          ],
          caption: 'Five lines per result, fixed in the specification as a payload budget. People decided within 60 seconds on the top two results, and cards had become a dumping ground for every field a team wanted to promote. Everything else went to a side panel per object type.',
        },
        {
          type: 'tension',
          items: [
            {
              image: { src: '/work/search-2/decision-filters.png', width: 660, height: 470, alt: 'The filter column of the design beside the first results: hidden results, compliance, usage and schema, every filter visible with its state.' },
              tension: 'Two of the first three reviewers said AI-written descriptions felt untrustworthy mixed in with human ones.',
              decision: 'Steward-written descriptions by default. An AI description only as a labelled fallback when no human one exists, inside the same five-line budget, editable inline by the owner.',
            },
          ],
        },
        { type: 'subhead', number: '04', text: 'Leaving tags open, championing Data Collections' },
        {
          type: 'tension',
          items: [
            {
              image: { src: '/work/search-2/decision-datamap.png', width: 1440, height: 1050, alt: 'The Data Map tab design: data products with their freshness, hosting location and type filters down the left.' },
              tension: 'Stakeholders asked for user-applied tags. A principal engineer pointed out in review that freeform tags rot into inconsistent noise.',
              decision: 'I left tags versus collections open in the specification rather than ship a system that would decay, then championed Data Collections, a saved and shareable working set, onto the FY26 roadmap for the 80% re-finding behaviour. Shipped August 7, 2025.',
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
            'Table search launched in November 2024, Data Map search in March 2025, and the old search was switched off in September 2025 with the new one primary for about 70% of users. Three trade-offs shaped the result.',
        },
        {
          type: 'tension',
          items: [
            {
              tension: 'Telemetry-driven exact-match routing. Tuning for semantic recall let semantic neighbours outrank an exact table name, and the default tab added a click. Top-five click-through fell from 96% to 94% in July 2025. From the poll: “If I search for an exact table name it defaults to Data Map, resulting in an extra click.”',
              decision: 'Amplitude isolated the exact-string queries; search engineering built a deterministic exact-match fast path and the tab routing changed. Back to 95% by January 2026. The cost that is mine: instrumentation was not in the first scope, so this was measured after launch, not designed for before it.',
            },
            {
              tension: 'Information architecture against cognitive load. Enterprise taxonomies favour deep trees, and the business-domain facet was one. Exposing it inside a query-dependent facet was the costliest item in the engineering review and the slowest control to refine with.',
              decision: 'Tree browsing came out of release one; flat keyword matching of any node shipped instead. Taxonomy completeness traded for speed. Column-name search still returned table-level relevance, so the comprehension gap narrowed rather than closed.',
            },
            {
              tension: 'AI fallback against the payload budget. Unverified LLM summaries threatened the trust the redesign was meant to restore, and every line they took was a line of evidence lost.',
              decision: 'Steward-written documentation overrides the AI fallback everywhere; the fallback is labelled and held inside the five lines. The rule held through the later launches and is the model the agent follows.',
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
            'Fixing search changed the questions people asked. A year on, the help desk’s questions were about understanding data, not finding it, and most could be answered by a single-table lookup if column-level context reached the person where they worked. That finding, plus Collections, set up the catalog inside Cursor and Claude, where the object model from this page is the schema the agent’s tools answer with. That story is on the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
        },
        {
          type: 'donut',
          total: '726 questions',
          segments: [
            { value: 68.2, label: 'Comprehension', text: 'What a column means, how two tables join, which filters to apply' },
            { value: 16, label: 'Locating data', text: '“Where is this dataset?”' },
            { value: 15.8, label: 'Other', text: 'Ownership, access, pipelines' },
          ],
          note: 'Data Genius Bar questions analysed after the rebuild. 74.1% could be answered by one table’s column-level context.',
        },
        {
          type: 'timeline',
          items: [
            { when: 'FY24 Q3', title: 'The research', text: 'Twenty sessions, seven roles. The first behavioural evidence on how people search for data; a major contributor to the FY25 roadmap.' },
            { when: 'Nov 2024 to Mar 2025', title: 'Catalog search rebuilt', text: 'Typed, facet-indexed objects: tables, Data Map, streams, attributes, each with its own evidence. First-result precision 81% → 89%.' },
            { when: 'Aug 2025', title: 'Collections', text: 'A saved working set on the same object model, for the four searches in five that go back to known data.' },
            { when: 'Mar 2026', title: 'The agent in Cursor and Claude', text: 'The object model is the tool schema. Checks Collections first. Question to answer 45 min → 4 min.', state: 'Next page' },
          ],
        },
      ],
    },
  ],
  next: {
    text: 'The rebuilt search gave the catalog results people could judge. The next question was where the search should live: in a chat window, or inside the tools where people already work.',
    label: 'Building the data discovery agent for Cursor and Claude',
    href: '/work/agentic-discovery',
  },
}

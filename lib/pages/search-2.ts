import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: Search 2.0, rebuilt from the October 2026 master document
// (Part 1). Each section is an eyebrow, a heading, one lead paragraph, one
// visual, and at most one supporting block. People are credited by role.
// Figures: the Nov 2024 and Mar 2025 launch posts, the June 2024 design
// document, the FY24 year-end review, Amplitude, the Data Genius Bar
// summary (726 questions) and the help-channel analysis (666 questions).

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Search 2.0: redesigning search for the data catalog',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2024–2025',
  description:
    'Finding data at Intuit took days because the catalog gave people no reason to trust what it returned. In spring 2024 I watched twenty people across nine business units search for data while doing their own work, paired that with 1,392 help-channel questions, and wrote the specification that rebuilt search across 320,000 tables and 10,000 data products. Eight launches followed over eighteen months.',
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
    { label: 'My role', value: 'Principal designer for the research and the specification, January to August 2024; design manager for the launches and extensions after that' },
    { label: 'Team', value: 'Search and platform engineering, the search-model team, product management. Designers on my team carried Data Map search, stream search, marketing-attribute search, query insights and Collections to launch' },
    { label: 'Research', value: '20 contextual sessions across 9 business units, with engineers watching; 1,392 help-channel questions (666 Slack threads and 726 Data Genius Bar queries); Amplitude' },
  ],
  stats: [
    { value: '81.31% → 89.24%', label: 'First-result precision on Data Map search, Mar 2025; P99 latency 50.59 s → 1.93 s' },
    { value: '41% → 63%', label: 'Searches that ended in a click, Jan 2024 to Jan 2026; time to discover data 14.2 h → 9.4 h' },
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
      id: 'search-1',
      after: 'problem',
      lead: true,
      src: '/work/search-2/search-1-results-2024.jpg',
      width: 2048,
      height: 1147,
      alt: 'The 2024 search results for “company status”: 1,838,670 results under a Data Catalog tab, nine columns named company_status from different schemas with the same description before the first table, and eight filter pills across the top.',
      caption: 'A real search for “company status” before the rebuild: 1,838,670 results, and nine identically named company_status columns before a single table appears.',
    },
    {
      id: 'haystack',
      after: 'research',
      lead: true,
      src: '/work/search-2/journey-haystack-2024.jpg',
      width: 2048,
      height: 1466,
      alt: 'A swimlane map of one marketing manager’s search for data across Slack, institutional knowledge, Google Drive, Jira, subject matter experts, the catalog, CDC Explorer, Postman and Databricks, with notes on where the catalog could take over each step.',
      caption: 'One person’s path through six tools, from my research board. Four of the six steps happen outside the catalog. The notes on the right became roadmap items.',
    },
    {
      id: 'raw-notes',
      after: 'research',
      lead: true,
      src: '/work/search-2/raw-notes-board-2024.jpg',
      width: 2400,
      height: 619,
      alt: 'The raw-notes board from the April 2024 sessions: twenty columns of sticky notes, one column per person, each note a thing they said or did, with the ones that recurred marked in purple.',
      caption: 'The raw notes from the twenty sessions and the synthesis workshop, April 2024: one row per person, one note per observation, the recurring ones in purple.',
    },
    {
      id: 'click-depth',
      after: 'impact',
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
      heading: 'The search returned everything and proved nothing',
      blocks: [
        {
          type: 'p',
          text:
            'Intuit’s data lake held about 320,000 tables, 10,000 data products and 460,000 attributes. People found a candidate table in minutes, then spent days finding out whether they could believe it: messaging whoever wrote the pipeline three years ago, asking in the help channel which of two identically named customer tables was still refreshed, waiting for access and then finding the column they needed was empty.',
        },
        {
          type: 'cards',
          items: [
            { value: '73%', title: 'of 666 help-channel questions in one year were answered only because a specific person knew which table to use', text: '43% of them were simply trying to locate the right dataset.' },
            { value: '5% vs 61%', title: 'of marketers’ searches ended in a click, against 61% of analysts’', text: 'The catalog was written in the storage vocabulary of the people who built the warehouse, not the people who used it.' },
            { value: '1 in 20', title: 'people in the study had ever tried the catalog’s existing AI search', text: 'An LLM could not fix discovery until the relevance and trust signals underneath it were fixed.' },
          ],
        },
      ],
    },
    {
      id: 'research',
      eyebrow: '2 · The research, spring 2024',
      short: 'Research',
      heading: 'Twenty sessions across nine business units',
      blocks: [
        {
          type: 'p',
          text:
            'Instead of starting in Figma, I watched twenty people search for data while doing their actual work: data scientists, analysts, data engineers, machine-learning engineers and marketing managers, with engineers in the room to see it first-hand. Three findings came out of the sessions and the synthesis workshop that followed.',
        },
        {
          type: 'cards',
          items: [
            { title: 'People know what kind of asset they want before they type', text: 'Almost everyone arrived knowing whether they needed a table, a real-time stream, a feature set or a dashboard. Marketing managers and ML engineers moving data between systems were the only exceptions.' },
            { title: 'Trust is decided in about 60 seconds, on the first two results', text: 'People looked at the top two results, then gave up or rewrote the query. Analysts trusted engineering-owned, curated tables over raw ones. ML engineers wanted a fast no: to learn quickly that a dataset does not exist and move on.' },
            { title: 'Four times in five, people are re-finding, not discovering', text: 'About 80% of sessions were people going back to tables they had vetted weeks earlier, re-running the search as a bookmark bar, because the catalog had no idea of a personal working set.' },
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
            'A machine learning engineer building an onboarding recommendation model. He tried the catalog, fell back to Slack and GitHub, and for every attribute he found still had to find its real-time equivalent. His statement, in the format the workshop used.',
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
      eyebrow: '3 · Research to roadmap',
      short: 'Roadmap',
      heading: 'Eight findings became eight launches',
      blocks: [
        {
          type: 'p',
          text:
            'Every finding from the sessions shipped as something, between November 2024 and August 2025. I designed and specified the first launches; designers on my team carried the rest after I became their manager in August 2024.',
        },
        {
          type: 'table',
          head: ['Finding', 'What shipped', 'When', 'Whose work'],
          rows: [
            ['People know the kind of asset they want', 'One search tab per kind of object', 'Nov 14, 2024', 'My design and specification'],
            ['Trust is decided in 60 seconds', 'A five-line result card with operational and social proof', 'Nov 14, 2024', 'My specification'],
            ['People search in business language', 'Data Map and marketing-attribute search', 'Mar 26 and Aug 12, 2025', 'My specification; carried to launch by my team'],
            ['Four searches in five re-find a known table', 'Collections, a saved working set', 'Aug 7, 2025', 'My sponsorship; my team’s design'],
            ['People switch tools to check a table through others’ queries', 'Query insights on table pages', 'May 2025', 'My team’s design'],
            ['Unclear governance on each object', 'Clean-data maturity stars on results', 'Nov 14, 2024', 'My design'],
            ['Filters unused: wrong ones, nested, invisible once applied', 'A facet bar that changes with the query', 'Q2–Q3 FY25', 'My specification'],
            ['Batch data with no real-time equivalent in sight', 'Real-time stream search', 'Jun 15, 2025', 'My team’s design, same framework'],
          ],
          caption: 'Dates from the team’s launch posts and roadmap tracker.',
        },
      ],
    },
    {
      id: 'decisions',
      eyebrow: '4 · The specification, June 2024',
      short: 'Specification',
      heading: 'Four decisions in the design document',
      blocks: [
        {
          type: 'p',
          text:
            'The June 2024 design document set what was searchable, how objects were separated, how facets behaved and what every result card showed. Three senior engineers reviewed it. Four of its decisions cost something.',
        },
        {
          type: 'tension',
          items: [
            {
              image: { src: '/work/search-2/decision-tabs.png', width: 820, height: 240, alt: 'The shipped search, 2026: one tab per kind of object, Data Map, Tables, CDC Attributes and Topics, with the first table result under it.' },
              tension: 'In 2022 I had designed the Data Map to organise the catalog around business concepts, Customer or Invoice, with every physical copy nested underneath. By 2024 search had split into two modes, Catalog and Data Map, each mixing every physical asset type. The sessions showed that business concepts help new people orient, while working engineers and analysts search by the physical object they need to query.',
              decision: 'I replaced the two-mode split with one tab per object type: Tables, Data Map, real-time streams, feature sets, dashboards and marketing attributes. I gave up the structure I had argued for two years earlier. The map stayed as the way to understand a data product.',
            },
            {
              image: { src: '/work/search-2/decision-filters.png', width: 660, height: 470, alt: 'The filter column of the design beside the first results: hidden results, compliance, usage and schema, every filter visible with its state.' },
              tension: 'The old interface treated every narrowing control the same, so every reasonable request for a new one added a pill nobody used. The search service, Vertex AI, supported a fixed set of facet behaviours out of the box.',
              decision: 'A filter is the kind of object (the tabs) and never changes. A facet is a property of the results and changes with the tab and the query. Four facet behaviours, by cardinality: a single value applies at once; five or fewer values show inline with one click to clear; many flat values (owner, database) get a searchable multi-select with a group-level Apply, so the page does not reload on every checkbox; nested taxonomies get keyword matching inside the facet. I cut tree browsing inside nested facets from the first release after engineering review.',
            },
            {
              image: { src: '/work/search-2/decision-result.png', width: 1030, height: 520, alt: 'Two results, each with its owner, last refresh, queries run, row count and data product beside the description.' },
              tension: 'Because people decided within 60 seconds on the top two results, result cards had become a dumping ground for every metadata field a team wanted to promote. Two of the first three reviewers of the specification said AI-written descriptions felt untrustworthy mixed in with human ones.',
              decision: 'A hard ceiling of five lines per card, split between operational signals (path, maturity stars, last refresh, steward) and social proof (query volume, active users, verified documentation). Steward-written descriptions show by default; an AI description appears only as a labelled fallback when no human one exists, and the owner can edit it inline.',
            },
            {
              image: { src: '/work/search-2/decision-datamap.png', width: 1440, height: 1050, alt: 'The Data Map tab design: data products with their freshness, hosting location and type filters down the left.' },
              tension: 'Stakeholders asked for user-applied tags so analysts could label tables for their teams. In the reviews a principal engineer pointed out that freeform tags rot into inconsistent noise.',
              decision: 'I left the choice between tags and saved collections open in the June 2024 spec rather than ship a tagging system that would decay, then argued Collections, a saved and shareable working set of trusted data, onto the FY26 roadmap over initial engineering scepticism. It shipped on August 7, 2025.',
            },
          ],
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: '5 · Impact and trade-offs',
      short: 'Impact',
      heading: 'Precision rose, latency fell, and one thing broke first',
      blocks: [
        {
          type: 'p',
          text:
            'Engineers and the search-model team built the ranking models and the indexing; my specification defined what was searchable, how objects were separated, how facets behaved and the five lines on every card. When the ranking was tuned for natural-language queries, people who pasted an exact table name saw semantic neighbours outrank the exact string, and the Data Map default tab meant an extra click to reach tables. Top-five click-through dipped from 96% to 94% in July 2025. Catching that in Amplitude led to a dedicated fast path for exact strings and a change to tab routing, and the rate recovered to 95% by January 2026. One person wrote in the April 2025 poll: “If I search for an exact table name it defaults to Data Map, resulting in an extra click to the Tables tab compared to before.”',
        },
        {
          type: 'table',
          head: ['Launch and scope', 'Metric', 'Before → after', 'Attribution and source'],
          rows: [
            ['Table Search 2.0, Nov 14, 2024, 320,000 tables', 'Keyword and semantic precision', '+12.5% keyword; +58% semantic', 'My design; the search-model team built the ranking. Nov 2024 launch post'],
            ['Data Map Search 2.0, Mar 26, 2025, 10,000 data products and 460,000 attributes', 'First-result precision; P99 latency; average response', '81.31% → 89.24%; 50.59 s → 1.93 s; 15.88 s → 1.24 s', 'My design and specification; carried to launch by a designer on my team; speed by search engineering. Mar 2025 launch post'],
            ['Discovery behaviour, Jan 2024 to Jan 2026', 'Searches ending in a click; time to discover and access data; monthly users, Mar 2026', '41% → 63%; 14.2 h → 9.4 h, from 20 days in 2023; 6,673 monthly users, 3,843 of them searching', 'Platform-wide; Amplitude and AWS re:Invent 2025'],
            ['Stream search Jun 15, 2025; marketing-attribute search Aug 12, 2025', 'First-result precision', '99.99% on both', 'Built on the tab and facet specification; designed by my team; ranking by engineering'],
          ],
          caption: 'The 20-day figure is Intuit’s public number for the whole path, including access and exploration; 14.2 hours is the catalog’s own measure of the search step.',
        },
      ],
    },
    {
      id: 'after',
      eyebrow: '6 · What it set up, 2025 to 2026',
      short: 'After',
      heading: 'Search solved locating data; comprehension and the coding agent came next',
      blocks: [
        {
          type: 'p',
          text:
            'Fixing search changed the questions people asked. In the 726 Data Genius Bar questions analysed after the rebuild, 16% were still about locating a table. 68.2% were about comprehension: what a column meant, how two tables joined, which filters to apply. 74.1% could be answered by a single-table lookup if column-level context reached the person where they worked. That, with Collections shipped in August 2025, set up the next step: the catalog inside Cursor and Claude, checking a person’s collections first, which cut question-to-answer time from 45 minutes to 4. That story is on the next page.',
          links: [{ text: 'the next page', href: '/work/agentic-discovery' }],
        },
      ],
    },
  ],
  next: {
    text: 'Search 2.0 gave the catalog results people could judge. The next question was where the search should live: in a chat window, or inside the tools where people already work.',
    label: 'Building the data discovery agent for Cursor and Claude',
    href: '/work/agentic-discovery',
  },
  credits:
    'The research, the case to the roadmap, the June 2024 specification and the table search design are mine. A designer on my team took Data Map search to launch, and the team built stream search, marketing-attribute search, query insights and Collections on the same framework. Search engineering and the search-model team built the ranking and the indexing and delivered the precision and the speed.',
  sources:
    'Design Document for Search 2.0, June 2024; design review deck, July 2024; the April 2024 follow-me-home synthesis board and User Journey board; Data Search Pattern Analysis (666 questions); Data Genius Bar Summary (726 questions); FY24 year-end review; launch posts of Nov 14, 2024, Mar 26, May, Jun 15, Aug 7 and Aug 12, 2025; the help-channel poll of Apr 30, 2025; the team’s roadmap tracker and KPI dashboard; Amplitude; AWS re:Invent 2025 for the public 20-day figure.',
}

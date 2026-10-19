import type { ShortPage } from './types'

export const CATALOG_DATA_MAP_LINEAGE: ShortPage = {
  slug: 'catalog-data-map-lineage',
  href: '/work/catalog-data-map-lineage',
  title: '0-to-1 Catalog, Data Map & 4-Week Lineage',
  roleTag: 'Founding Senior IC',
  period: '2021–2023',
  description:
    'How Intuit’s data catalog went from a list of tables to a map of data products with lineage beneath it, and why the commercial catalog it replaced was retired.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: '0-to-1 Catalog, Data Map & Lineage' },
      { label: 'Self-Service Onboarding & AI Trust', href: '/work/self-service-onboarding' },
      { label: 'Scaling the team at 1:85', href: '/work/scaling-platform-design' },
    ],
    current: 0,
  },
  stats: [
    { value: '68% → 96%', label: 'of searches with a click in the top five, Apr 2022 to Apr 2023' },
    { value: 'About 30,000 tables, 7,000 pipelines', label: 'in the first lineage graph' },
    { value: '4 weeks', label: 'from brief to lineage launch' },
  ],
  visuals: [
    {
      id: 'object-model',
      alt: 'The Data Product object model: a business concept with batch, stream and marketing copies of the same data beneath it.',
      caption: 'The Data Product object model: batch, stream and marketing copies of the same data beneath one business concept.',
      todo: 'Export from Data Product V2.fig.',
    },
    {
      id: 'first-catalog',
      after: 'rules',
      alt: 'The first catalog in 2021: a table page with owner, schema and usage.',
      caption: 'The first catalog, 2021: a table page with owner, schema and usage.',
      todo: 'Export from DDE MVP.fig.',
    },
    {
      id: 'data-map',
      after: 'trade-offs',
      alt: 'The Data Map: business concepts and the data products beneath them.',
      caption: 'The Data Map: business concepts and the data products beneath them.',
      todo: 'Export from DDE 2.0.fig.',
    },
    {
      id: 'first-lineage',
      after: 'multiplier',
      alt: 'The first lineage graph: tables and pipelines connected upstream and downstream of a selected table.',
      caption: 'The first lineage graph, launched 4 weeks after the brief: about 30,000 tables and 7,000 pipelines.',
      todo: 'Export from Data Lineage.fig.',
    },
  ],
  sections: [
    {
      id: 'framing',
      heading: 'How the problem was framed',
      blocks: [
        {
          type: 'p',
          text:
            'When I joined in June 2021 the catalog did one thing: search for data-lake tables and their columns. The company was paying for a commercial catalog alongside it, and both returned bare table names with nothing to say whether a dataset was live or stale. One person found two customer tables with nearly identical names and had to ask in the help channel which one to trust, because one of them had not been refreshed in over a year. The mandate was to retire the commercial catalog. People would not switch to an internal tool that returned a name and nothing to judge it by, so the goal that held for five years was set in the first month: someone with a business question should reach data they can trust without having to ask a person.',
        },
      ],
    },
    {
      id: 'rules',
      heading: 'The system rules, not just screens',
      blocks: [
        {
          type: 'p',
          text:
            'Every screen rests on one idea. Data has a business meaning and several physical forms. A data product is the meaning, a customer or an invoice, with an owner and a description. Beneath it sit the physical copies: a batch table, a real-time stream, a copy in the marketing data store. Each copy has an owner, a history and a quality level. That is what search, trust, lineage and access all attach to.',
        },
        {
          type: 'p',
          text:
            'From it, three rules. A search result must carry enough to be judged without asking anyone: description, trust flags, ownership, the SQL behind a view, and from 2023 usage statistics, column popularity and one view of every place a piece of data is hosted, production and test side by side. Browsing follows meaning, not storage: one entry per data product, every physical copy listed beneath it, so nobody has to guess whether a real-time source exists. And a warning about broken data appears wherever that data appears, in search results and on table pages as well as on the lineage graph, not only on the graph.',
        },
      ],
    },
    {
      id: 'trade-offs',
      heading: 'Hard trade-offs and organizational influence',
      blocks: [
        {
          type: 'p',
          text:
            'The Data Map was the harder path. The easier option was to keep the storage-shaped structure, warehouse, schema, table, and add better filters. Organizing by business meaning meant reworking the home page, browsing, search, results and detail pages around a new unit. I took it because the company was reorganizing its data by business domain, and it took several rounds of feedback with around 20 users; no catalog we evaluated organized data this way, and the idea kept needing explaining. It still does: my team’s 2025 research found map search adopted less than table search, because people prefer physical objects. The 2024 search rebuild answered that by giving each physical kind its own tab and keeping the map as one of them.',
        },
        {
          type: 'p',
          text:
            'Lineage was forced. The organization wanted a way to trace where data came from before tax season, and I had four weeks. I designed a graph of what feeds a table and what depends on it, with an impact report to download, so that before a change a data producer can see who to warn and during an incident both sides can see what is affected.',
        },
      ],
    },
    {
      id: 'multiplier',
      heading: 'The systemic multiplier',
      blocks: [
        {
          type: 'p',
          text:
            'The commercial catalog was retired in fiscal 2023. Top-five click-through rose from 68% to 96% between April 2022 and April 2023. Lineage launched on December 6, 2023, across about 30,000 tables and 7,000 pipelines, and had 450 to 500 monthly users by July 2024; the designer who took it over the next year turned the graph into a list-based summary for root-cause work. The data product model became the thing every later piece attached to: the scorecard against the clean-data standard, the access request from the table a person is looking at, the onboarding flow, and the search rebuild that kept the map as one tab among the physical kinds.',
        },
      ],
    },
  ],
  next: {
    text: 'Before Intuit, the same instinct at a smaller company: three TV advertising analytics products designed from first concept to launch, under render and privacy constraints',
    label: '605 TV Analytics: Multi-Audience Reports Under Render Constraints',
    href: '/work/605-tv-analytics',
  },
  credits:
    'The designs are mine. Engineers built the catalog, the map and the lineage graph; a second designer joined lineage and took it over in 2024.',
  sources:
    'FY22 and FY23 year-end reviews; lineage launch post, Dec 6, 2023; FY24 year-end review; July 2024 research readout; team research deck, Q3 FY26.',
}

import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study 2: the catalog, from a list of tables to a platform. Structure:
// a build-up, one dated chapter per layer. Each chapter says what was wrong,
// what I designed, and what changed. Self-service onboarding is folded in as
// the fifth layer; the impact table at the end gives source and attribution.

export const CATALOG_DATA_MAP_LINEAGE: ShortPage = {
  slug: 'catalog-data-map-lineage',
  href: '/work/catalog-data-map-lineage',
  title: 'The catalog: from a list of tables to a platform',
  roleTag: 'Founding Product Designer → Principal → Design Manager',
  period: '2021–2026',
  description:
    'How I built Intuit’s data catalog one layer at a time over five years: signals to judge a table, a map of data products, lineage, AI-written metadata people could correct, and self-service onboarding. In 2025 Intuit showed the result on stage at AWS re:Invent.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: 'Search 2.0', href: '/work/search-2' },
      { label: 'The agent', href: '/work/agentic-discovery' },
      { label: 'The catalog' },
      { label: '605', href: '/work/605-tv-analytics' },
    ],
    current: 2,
  },
  facts: [
    { label: 'Duration', value: 'June 2021 to July 2026; hands-on design from 2021 to 2024' },
    {
      label: 'My role',
      value:
        'Founding designer of the catalog: senior designer from 2021, principal in 2024, then design manager of the designers who carried it on',
    },
    {
      label: 'Team',
      value:
        'The only designer until 2023, working with PMs, platform architects and the catalog, access and data-movement engineers; a summer 2023 intern I mentored; a second designer took lineage in 2024',
    },
    {
      label: 'Research',
      value:
        'About 20 Data Map feedback sessions in 2022; journey mapping with marketers and data owners; a 2024 study with reviewers of AI-written descriptions; state and edge-case maps; Amplitude',
    },
  ],
  stats: [
    { value: '68% → 96%', label: 'Searches with a click in the top five, Apr 2022 to Apr 2023' },
    { value: '1–2 weeks → under 24 hours', label: 'To get marketing data onboarded' },
    { value: '2,664 → 6,673', label: 'Monthly users, FY24 to March 2026 · shared' },
  ],
  hero: {
    src: '/work/catalog-data-map-lineage/hero.mp4',
    poster: '/work/catalog-data-map-lineage/hero-poster.jpg',
    tint: TINTS.platform2026,
    width: 1600,
    height: 870,
    alt: 'A screen recording of the data discovery platform: search results with a data maturity score breakdown, then a realtime data product page with its tables, owners and attributes.',
    caption: 'The platform in May 2026: search with the maturity score on every result, then a data product with its copies and attributes. Sped up 2 times.',
  },
  visuals: [
    {
      id: 'first-catalog',
      after: 'start',
      alt: 'The first catalog in 2021: a table page with owner, schema and usage.',
      caption: 'The first catalog, 2021: a table page with owner, schema and usage.',
      todo: 'Export from DDE MVP.fig.',
    },
    {
      id: 'data-product',
      after: 'data-map',
      src: '/work/catalog-data-map-lineage/data-product-2026.jpg',
      width: 3024,
      height: 1524,
      alt: 'A data product page. The left column lists its physical copies grouped by where they live: two data lake tables, a marketing copy, a real-time CDC entity and Kafka topics. The main area shows the business owner, the description and the attributes with their sensitivity labels.',
      caption: 'The model in 2026: one data product, with its lake tables, real-time entity and Kafka topics listed beneath it on the left.',
    },
    {
      id: 'lineage',
      after: 'lineage',
      full: true,
      src: '/work/catalog-data-map-lineage/lineage-mvp-2023.jpg',
      width: 1440,
      height: 1024,
      alt: 'The lineage tab of a table in the 2023 design. The table sits in the middle with the tables and pipelines that feed it on the left and everything that depends on it on the right, expanded two levels, with a button to download impact reports.',
      caption: 'My lineage design, launched in December 2023: what feeds a table, what depends on it, and an impact report to download.',
    },
    {
      id: 'lineage-alert',
      after: 'lineage',
      full: true,
      src: '/work/catalog-data-map-lineage/lineage-alert-2023.jpg',
      width: 1792,
      height: 560,
      alt: 'Search results in the 2023 design, with a red alert badge on the first table to show an upstream outage.',
      caption: 'The same outage, flagged in search results, so people see it before they open the table.',
    },
    {
      id: 'maturity',
      after: 'trust',
      src: '/work/catalog-data-map-lineage/maturity-2026.jpg',
      width: 2150,
      height: 940,
      alt: 'A search result with its maturity score open: six criteria, from stewardship to lineage, each with a star rating, and a note that the lowest-rated criterion sets the score.',
      caption: 'The maturity score on a search result, 2026. The lowest-rated criterion sets the score.',
    },
    {
      id: 'state-map',
      after: 'onboarding',
      src: '/work/catalog-data-map-lineage/state-map-2024.jpg',
      width: 3144,
      height: 858,
      alt: 'A state map of the onboarding request: checks on whether the data product is rated at least three stars, marked consumable and already onboarded, three entry points, and each step through to submission, with notes on edge cases such as the 24-hour review time.',
      caption: 'One of my state maps for onboarding, click to open it full size. Mapping every state and edge case is what showed the fully automatic version could not work.',
    },
    {
      id: 'onboarding-entry',
      after: 'onboarding',
      src: '/work/catalog-data-map-lineage/onboarding-entry-2024.jpg',
      width: 1442,
      height: 1024,
      alt: 'A data product page in the shipped design, listing its tables and Kafka topic, with a link at the bottom to onboard attributes to the Customer Data Cloud.',
      caption: 'Where the shipped flow starts: from any data product that qualifies, one link to onboard its attributes.',
    },
    {
      id: 'onboarding-request',
      after: 'onboarding',
      src: '/work/catalog-data-map-lineage/onboarding-request-2024.jpg',
      width: 752,
      height: 680,
      alt: 'The onboarding request panel: a searchable list of a data product’s attributes with checkboxes, two selected, and a summary of what will be onboarded.',
      caption: 'The onboarding request, 2024: pick the attributes to send to the marketing data store.',
    },
  ],
  sections: [
    {
      id: 'start',
      heading: '2021: a list of tables, and a catalog to retire',
      blocks: [
        {
          type: 'p',
          text:
            'I joined Intuit in June 2021 as the catalog’s first designer. It did one thing: search data-lake tables and columns by name. The company was paying for a commercial catalog alongside it, and neither said whether a table was live or stale. One analyst found two customer tables with nearly identical names and had to ask in the help channel which one to trust. One of them had not been refreshed in over a year.',
        },
        {
          type: 'p',
          text:
            'The mandate was to retire the commercial catalog, and nobody would switch to a tool that returned a name and nothing to judge it by. So the first layer was the signals: a description, trust flags, a way to claim ownership, the SQL behind a view, column popularity, opening a table in a notebook, and a viewer for nested columns with search inside the schema. The goal I set in that first month held for five years. Someone with a business question should reach data they can trust without asking a person.',
        },
        {
          type: 'p',
          text:
            'Moving that fast had a cost. Layouts drifted and had to be standardized later, and I tested features as they shipped instead of running a formal usability study.',
        },
      ],
    },
    {
      id: 'data-map',
      heading: '2022: organize data by what it means, not where it is stored',
      blocks: [
        {
          type: 'p',
          text:
            'The signals fixed single tables. The next problem was structural. The same business concept, a customer or an invoice, existed as a batch table, a real-time stream and a copy in the marketing data store, with nothing connecting them. Nobody could tell whether a real-time version existed without asking.',
        },
        {
          type: 'p',
          text:
            'I designed the data product model the rest of the platform now rests on. A data product is the business meaning, with an owner and a description. Its physical copies sit beneath it, each with its own owner, history and quality level. The Data Map shows one entry per data product with every copy nested under it, and one view of every place a piece of data is hosted, production and test side by side.',
        },
        {
          type: 'p',
          text:
            'It was the harder path. Keeping the storage layout of warehouse, schema and table and adding filters would have been quicker. Organizing by meaning reworked the home page, browsing, search, results and detail pages around a new unit, and no catalog we evaluated did it. It took about 20 feedback sessions to land, because the idea kept needing explaining. It still does: my team’s 2025 research found people searched the map less than tables, because they think in physical objects. The 2024 search rebuild kept the map as one tab beside the physical kinds instead of forcing it on everyone.',
        },
      ],
    },
    {
      id: 'lineage',
      heading: '2023: lineage in four weeks',
      blocks: [
        {
          type: 'p',
          text:
            'Before tax season the organization needed a way to trace where data came from, and I had four weeks. I designed a graph of what feeds a table and what depends on it, across about 30,000 tables and 7,000 pipelines, with an impact report to download. Before a change, a data producer can see whom to warn. During an incident, both sides can see what is affected.',
        },
        {
          type: 'p',
          text:
            'The decision I would defend: a warning about broken upstream data appears wherever the affected data appears, on search results and table headers, not only inside the graph. A warning that lived only in the graph would reach only the people who opened it.',
        },
        {
          type: 'p',
          text:
            'Lineage launched on December 6, 2023 and had 450 to 500 monthly users by July 2024. That year I handed it to a second designer. After six user visits they added a list-based summary for root-cause work and lineage down to single columns, which cut incident investigations from about 4 hours to minutes.',
        },
      ],
    },
    {
      id: 'trust',
      heading: '2023 to 2024: AI-written metadata people could correct',
      blocks: [
        {
          type: 'p',
          text:
            'Thousands of tables had no description. The company’s clean-data standard, defined by the platform organization, was arriving in the catalog, and AI could write the missing descriptions and tags. My 2024 study with reviewers said where that was worth doing. An AI description helped only where no human one existed, and two of the first three reviewers said unverified ones could not be trusted.',
        },
        {
          type: 'p',
          text:
            'So I designed the rules for how the standard and the AI content appear. A maturity scorecard shows a table against the standard. AI writes a description only where none exists, and says so. Classification and compliance tags are assigned by AI, with a label for what the data is meant for. Two corrections sit beside every piece of AI content: the data’s owner can edit an AI description in place, and anyone can report a wrong tag. The AI descriptions grew out of a summer 2023 intern project I scoped and mentored.',
        },
        {
          type: 'p',
          text:
            'In fiscal 2024, 1,600 new data products at the standard’s third level became discoverable, and monthly users grew from 1,886 to 2,664.',
        },
      ],
    },
    {
      id: 'onboarding',
      heading: '2024: self-service onboarding, on the third design',
      blocks: [
        {
          type: 'p',
          text:
            'Getting clean data into the marketing data store took one to two weeks and several engineers, marketers and data owners. In fiscal 2023 it delayed campaigns by 7 days on average. I mapped the journey with marketers and data owners, and it took three designs.',
        },
        {
          type: 'list',
          items: [
            { lead: 'The first design.', text: 'A structured request, then manual approval by the data’s owner.' },
            {
              lead: 'The second, which stalled.',
              text:
                'Leadership asked for less friction, so I removed the approver for full automation. After several months of engineering it proved infeasible: access permissions and edge cases in how data moves got in the way. Drawing every state and edge case in the flow is what surfaced them.',
            },
            {
              lead: 'The third, shipped on October 16, 2024.',
              text:
                'Self-service with no approver for data that qualifies, a ticket that keeps the owner involved for the rest, AI filling in the request, a test run against a staging copy before it is submitted, and a page that tracks the request.',
            },
          ],
        },
        {
          type: 'p',
          text:
            'One to two weeks became under 24 hours. The request and its tracker became the pattern my team later reused for access requests and certification.',
        },
      ],
    },
    {
      id: 'platform',
      heading: '2025 to 2026: the platform on stage',
      blocks: [
        {
          type: 'p',
          text:
            'From August 2024 I managed the designers who carried the platform on, and they built on the same model: access requested from the table a person is looking at, certification to the standard’s fourth level, and column-level lineage. When a partner team lost its designer in fiscal 2025, I designed table and schema creation in the developer portal myself.',
        },
        {
          type: 'video',
          youtube: 'L_Q7LPB5HcA',
          start: 1430,
          title: 'AWS re:Invent 2025, INV201: Harnessing analytics for humans and AI',
          caption: 'AWS re:Invent 2025, from 23:50: Intuit’s segment, with the catalog on stage.',
          href: 'https://www.youtube.com/watch?v=L_Q7LPB5HcA&t=1430',
        },
        {
          type: 'p',
          text:
            'At AWS re:Invent 2025 Intuit showed the catalog on stage, with owners, quality rating, lineage and self-service access on one screen. Intuit reported time to discover data falling from 20 days to 9.4 hours, and clean data rising from under 1% to 80% of the estate. Those are platform results that many teams share. By March 2026 the catalog had 6,673 monthly users across 320,000 tables.',
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
            ['Apr 2022 to Apr 2023', 'Searches with a click in the top five results', '68% → 96%', 'My design; engineering built the catalog'],
            ['FY23', 'The commercial catalog', 'Retired', 'My design; shared with the catalog team'],
            ['Dec 6, 2023', 'Lineage, 4 weeks from the brief', 'About 30,000 tables and 7,000 pipelines', 'My design'],
            ['Jul 2024', 'Monthly users of lineage', '450–500', 'My design'],
            ['FY24', 'Data products newly certified and discoverable', '1,600', 'Shared with the platform organization'],
            ['FY24', 'Monthly users of the catalog', '1,886 → 2,664', 'Shared'],
            ['Oct 16, 2024', 'Time to onboard marketing data', '1–2 weeks → under 24 hours', 'My design; engineering built it'],
            ['2025', 'Time to discover data, reported by Intuit', '20 days → 9.4 hours', 'Platform-wide; shared'],
            ['Mar 2026', 'Monthly users of the catalog', '6,673', 'Shared'],
          ],
        },
      ],
    },
  ],
  next: {
    text: 'Before Intuit, the same instinct at a smaller company: three TV advertising analytics products designed from first concept to launch, under render and privacy constraints.',
    label: '605 TV Analytics: Multi-Audience Reports Under Render Constraints',
    href: '/work/605-tv-analytics',
  },
  credits:
    'The catalog’s designs from 2021 to 2024 are mine. Engineers built everything that shipped. The platform organization defined the clean-data standard and the access team owned permissions. A second designer took lineage over in 2024, and from then designers on my team carried access, certification and lineage forward.',
  sources:
    'FY22, FY23, FY24 and FY25 year-end reviews; lineage launch post, Dec 6, 2023; onboarding workshop deck, Feb 2024; onboarding launch post, Oct 16, 2024; July 2024 research readout; team research deck, Q3 FY26; FY26 mid-year review; AWS re:Invent 2025; Amplitude.',
}

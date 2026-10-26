import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: the catalog, one dated chapter per layer. Each section is an
// eyebrow, a heading, one lead paragraph under 60 words, one visual, and at
// most one supporting block. Figures are sourced in the impact table.

export const CATALOG_DATA_MAP_LINEAGE: ShortPage = {
  slug: 'catalog-data-map-lineage',
  href: '/work/catalog-data-map-lineage',
  title: 'Building the data discovery platform, 2021 to 2026',
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
      id: 'data-product',
      after: 'data-map',
      lead: true,
      src: '/work/catalog-data-map-lineage/data-product-2026.jpg',
      width: 3024,
      height: 1524,
      alt: 'A data product page. The left column lists its physical copies grouped by where they live: two data lake tables, a marketing copy, a real-time CDC entity and Kafka topics. The main area shows the business owner, the description and the attributes with their sensitivity labels.',
      caption: 'The model as it stands in 2026: one data product, with its lake tables, real-time entity and Kafka topics listed beneath it on the left.',
    },
    {
      id: 'lineage',
      after: 'lineage',
      lead: true,
      src: '/work/catalog-data-map-lineage/lineage-mvp-2023.jpg',
      width: 1440,
      height: 1024,
      alt: 'The lineage tab of a table in the 2023 design. The table sits in the middle with the tables and pipelines that feed it on the left and everything that depends on it on the right, expanded two levels, with a button to download impact reports.',
      caption: 'My lineage design, launched in December 2023: what feeds a table, what depends on it, and an impact report to download.',
    },
    {
      id: 'maturity',
      after: 'trust',
      lead: true,
      src: '/work/catalog-data-map-lineage/maturity-2026.jpg',
      width: 2150,
      height: 940,
      alt: 'A search result with its maturity score open: six criteria, from stewardship to lineage, each with a star rating, and a note that the lowest-rated criterion sets the score.',
      caption: 'The maturity score on a search result, 2026. The lowest-rated criterion sets the score.',
    },
    {
      id: 'state-map',
      after: 'onboarding',
      lead: true,
      src: '/work/catalog-data-map-lineage/state-map-2024.jpg',
      width: 3144,
      height: 858,
      alt: 'A state map of the onboarding request: checks on whether the data product is rated at least three stars, marked consumable and already onboarded, three entry points, and each step through to submission, with notes on edge cases such as the 24-hour review time.',
      caption: 'One of my state maps for onboarding. Mapping every state and edge case is what showed the fully automatic version could not work.',
    },
    {
      id: 'onboarding-entry',
      after: 'platform',
      lead: true,
      src: '/work/catalog-data-map-lineage/onboarding-entry-2024.jpg',
      width: 1442,
      height: 1024,
      alt: 'A data product page in the shipped design, listing its tables and Kafka topic, with a link at the bottom to onboard attributes to the Customer Data Cloud.',
      caption: 'A data product in the shipped design, 2024, with its copies beneath it and the first self-service action at the bottom. The team’s later work starts from the same page.',
    },
  ],
  sections: [
    {
      id: 'start',
      eyebrow: '2021',
      short: '2021',
      heading: 'A list of tables, and a commercial catalog to retire',
      blocks: [
        {
          type: 'p',
          text:
            'I joined in June 2021 as the catalog’s first designer. It searched data-lake tables by name and said nothing about whether a table was live or stale. The mandate was to retire the commercial catalog beside it, and nobody would switch to a tool that returned a name and nothing to judge it by.',
        },
        {
          type: 'cards',
          items: [
            { value: '2', title: 'customer tables with nearly identical names', text: 'One analyst had to ask the help channel which to trust. One had not been refreshed in over a year.' },
            { value: '7', title: 'signals added in the first year', text: 'Description, trust flags, ownership, the SQL behind a view, column popularity, open in a notebook, and search inside a schema.' },
            { value: '68% → 96%', title: 'searches with a click in the top five, by April 2023', text: 'The commercial catalog was retired in fiscal 2023.' },
          ],
        },
      ],
    },
    {
      id: 'data-map',
      eyebrow: '2022',
      short: '2022',
      heading: 'Organise data by what it means, not where it is stored',
      blocks: [
        {
          type: 'p',
          text:
            'The same business concept, a customer or an invoice, existed as a batch table, a real-time stream and a copy in the marketing store, with nothing connecting them. I designed the data product model the platform now rests on: the business meaning, with an owner, and its physical copies beneath it.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'Keeping the warehouse, schema, table layout and adding filters would have been quicker, and no catalog we evaluated organised by meaning.', decision: 'Rework the home page, browsing, search, results and detail pages around the data product. About 20 feedback sessions to land it.' },
            { tension: 'My team’s 2025 research found people still think in physical objects and searched the map less than tables.', decision: 'The 2024 search rebuild kept the map as one tab beside the physical kinds instead of forcing it on everyone.' },
          ],
        },
      ],
    },
    {
      id: 'lineage',
      eyebrow: '2023',
      short: '2023',
      heading: 'Lineage in four weeks',
      blocks: [
        {
          type: 'p',
          text:
            'Before tax season the organisation needed to trace where data came from, and I had four weeks. I designed a graph of what feeds a table and what depends on it, with an impact report to download. The warning about broken upstream data appears wherever the affected data appears, on search results and table headers, not only inside the graph.',
        },
        {
          type: 'cards',
          items: [
            { value: '30,000', title: 'tables and 7,000 pipelines in the graph at launch', text: 'December 6, 2023.' },
            { value: '450–500', title: 'monthly users by July 2024', text: 'That year I handed lineage to a second designer.' },
            { value: '4 h → minutes', title: 'for an incident investigation', text: 'After six user visits, the second designer added a list summary for root-cause work and column-level lineage.' },
          ],
        },
      ],
    },
    {
      id: 'trust',
      eyebrow: '2023 to 2024',
      short: '2023–24',
      heading: 'AI-written metadata people could correct',
      blocks: [
        {
          type: 'p',
          text:
            'Thousands of tables had no description. The company’s clean-data standard was arriving in the catalog, and AI could write what was missing. My 2024 study with reviewers said where that was worth doing, so I designed the rules for how the standard and the AI content appear.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'An AI description helped only where no human one existed, and two of the first three reviewers said unverified ones could not be trusted.', decision: 'AI writes a description only where none exists, and says so. The owner can edit it in place.' },
            { tension: 'Classification and compliance tags had to cover thousands of tables at once.', decision: 'AI assigns them, with a label for what the data is meant for, and anyone can report a wrong tag.' },
            { tension: 'A standard nobody can see is a standard nobody meets.', decision: 'A maturity scorecard on every table. In fiscal 2024, 1,600 data products reached the third level and monthly users grew from 1,886 to 2,664.' },
          ],
        },
      ],
    },
    {
      id: 'onboarding',
      eyebrow: '2024',
      short: '2024',
      heading: 'Self-service onboarding, on the third design',
      blocks: [
        {
          type: 'p',
          text:
            'Getting clean data into the marketing store took one to two weeks and several engineers, marketers and data owners; in fiscal 2023 it delayed campaigns by 7 days on average. I mapped the journey with marketers and data owners. It took three designs, and the third shipped on October 16, 2024.',
        },
        {
          type: 'cards',
          items: [
            { title: 'The first design', text: 'A structured request, then manual approval by the data’s owner.' },
            { title: 'The second, which stalled', text: 'Leadership asked for less friction, so I removed the approver. After months of engineering it proved infeasible: access permissions and edge cases in how data moves got in the way.' },
            { title: 'The third, shipped', text: 'No approver for data that qualifies, a ticket that keeps the owner involved for the rest, AI filling in the request, a test run against staging, and a page that tracks it. One to two weeks became under 24 hours.' },
          ],
        },
      ],
    },
    {
      id: 'platform',
      eyebrow: '2025 to 2026',
      short: '2025–26',
      heading: 'The platform on stage',
      blocks: [
        {
          type: 'p',
          text:
            'From August 2024 I managed the designers who carried the platform on, and they built on the same model: access requested from the table on screen, certification to the standard’s fourth level, and column-level lineage. At AWS re:Invent 2025 Intuit showed the catalog on stage, with owners, quality rating, lineage and self-service access on one screen.',
        },
        {
          type: 'video',
          youtube: 'L_Q7LPB5HcA',
          start: 1430,
          title: 'AWS re:Invent 2025, INV201: Harnessing analytics for humans and AI',
          caption: 'AWS re:Invent 2025, from 23:50: Intuit’s segment, with the catalog on stage.',
          href: 'https://www.youtube.com/watch?v=L_Q7LPB5HcA&t=1430',
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Impact',
      short: 'Impact',
      heading: 'What changed, and whose result it is',
      blocks: [
        {
          type: 'p',
          text:
            'Intuit reported time to discover data falling from 20 days to 9.4 hours, and clean data rising from under 1% to 80% of the estate. Those are platform results many teams share. By March 2026 the catalog had 6,673 monthly users across 320,000 tables.',
        },
        {
          type: 'table',
          head: ['When', 'What was measured', 'Change', 'Whose result'],
          rows: [
            ['Apr 2022 to Apr 2023', 'Searches with a click in the top five results', '68% → 96%', 'My design; engineering built the catalog'],
            ['FY23', 'The commercial catalog', 'Retired', 'My design; shared with the catalog team'],
            ['Dec 6, 2023', 'Lineage, 4 weeks from the brief', 'About 30,000 tables and 7,000 pipelines', 'My design'],
            ['Jul 2024', 'Monthly users of lineage', '450–500', 'My design'],
            ['FY24', 'Data products newly certified and discoverable', '1,600', 'Shared with the platform organisation'],
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
    label: 'Designing three TV analytics products at 605',
    href: '/work/605-tv-analytics',
  },
  credits:
    'The catalog’s designs from 2021 to 2024 are mine. Engineers built everything that shipped. The platform organisation defined the clean-data standard and the access team owned permissions. A second designer took lineage over in 2024, and from then designers on my team carried access, certification and lineage forward.',
  sources:
    'FY22, FY23, FY24 and FY25 year-end reviews; lineage launch post, Dec 6, 2023; onboarding workshop deck, Feb 2024; onboarding launch post, Oct 16, 2024; July 2024 research readout; team research deck, Q3 FY26; FY26 mid-year review; AWS re:Invent 2025; Amplitude.',
}

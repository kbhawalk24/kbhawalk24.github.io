import type { ShortPage } from './types'

export const SEARCH_2: ShortPage = {
  slug: 'search-2',
  href: '/work/search-2',
  title: 'Search 2.0 & Data Collections',
  roleTag: 'Principal IC → Design Manager',
  period: '2024–2025',
  description:
    'How research with 20 catalog users rebuilt Intuit’s data search around four rules, and why I kept arguing for Collections until my team shipped it.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: '0-to-1 Catalog & Data Map', href: '/work/catalog-data-map-lineage' },
      { label: 'Search 2.0 & Data Collections' },
      { label: 'Agent in Cursor & Claude', href: '/work/agentic-discovery' },
    ],
    current: 1,
  },
  stats: [
    { value: '81.31% → 89.24%', label: 'First result correct' },
    { value: '50.59 s → 1.93 s', label: 'For 99 in 100 searches' },
    { value: '10,000 · 460,000', label: 'Data products and attributes searchable' },
  ],
  sections: [
    {
      id: 'framing',
      heading: 'How the problem was framed',
      blocks: [
        {
          type: 'p',
          text: 'Cutting the time it took to discover data was a company goal; a data scientist put it plainly: “Data discovery is the longest part of a new project.” In spring 2024 I interviewed 20 catalog users across business units while they did their own work, brought engineers along to watch, and ran a workshop with the whole team. Four findings shaped everything after. People know the type of data they want up front. Analysts trust engineering-owned, curated tables and cannot map a raw table to its curated equivalent. Machine-learning engineers need to learn fast that data does not exist, or that a real-time source does. And people look for new data about one time in five; four times in five they return to data they already know. The group product manager called the readout “a major contributor to our FY25 roadmap.”',
        },
      ],
    },
    {
      id: 'rules',
      heading: 'The system rules, not just screens',
      blocks: [
        { type: 'p', text: 'Four decisions, each a rule the search still runs on.' },
        {
          type: 'list',
          items: [
            {
              lead: 'One tab per type of data:',
              text: 'Tables, Data Map, Real-Time Streams, Feature Sets, Dashboards, Marketing Attributes. It replaced a two-mode split that mixed every asset type together.',
            },
            {
              lead: 'One rule for filters and facets.',
              text: 'A filter is the kind of object and never changes. A facet is a property of the results and changes with the query, with four facet behaviours defined by how many values a facet has and whether they nest.',
            },
            {
              lead: 'Five lines of information per result,',
              text: 'each either operational (freshness, quality) or social (how many people query it).',
            },
            {
              lead: 'Trust before coverage.',
              text: 'When two of the first three reviewers said AI-generated descriptions were not trustworthy, we stopped showing unverified ones and prioritised human editing controls.',
            },
          ],
        },
      ],
    },
    {
      id: 'trade-offs',
      heading: 'Hard trade-offs and organizational influence',
      blocks: [
        {
          type: 'p',
          text: 'The Data Map had argued for organizing data by business meaning; the 2024 research said people usually know which physical type they need. One tab per type honours both: scope by type when you know it, browse the Data Map tab when you are searching by concept.',
        },
        {
          type: 'p',
          text: 'The second trade-off I left open on purpose. The research kept saying people mostly return to data they already know, so I argued for Collections, a person’s saved working set of data, as design strategy. Engineering criticised it. I kept it in every roadmap conversation until it shipped: designers on my team designed Collections and shipped it on August 7, 2025, and the engineering manager wrote that it “would not have happened if not for Kanchi’s persistence and design sponsorship.” I designed the first version of search across the Data Map; after I became a manager, a designer on my team carried it to launch.',
        },
      ],
    },
    {
      id: 'multiplier',
      heading: 'The systemic multiplier',
      blocks: [
        {
          type: 'p',
          text: 'Table search launched on November 14, 2024, with keyword precision up 12.5% and semantic precision up 58%. Search across the Data Map launched on March 26, 2025, covering 10,000 data products and 460,000 attributes: the first result was the right one 89.24% of the time, up from 81.31%, and 99 in 100 searches finished within 1.93 seconds, down from 50.59. Engineers and the search-model team delivered the precision and the speed; design defined what was searchable and how a person judges a result. The same foundation let my team ship search for real-time streams and marketing attributes in 2025, and Collections became the context layer the agent checks first. Unsolved: exact-name lookup regressed after the semantic rebuild, and top-five click-through dipped from 96% to 94% in July 2025, back to 95% by January 2026.',
        },
      ],
    },
  ],
  next: {
    text: 'Search 2.0 and Collections were the last things I designed with my own hands before the work became the team’s. Next: how the designers I led carried the platform at one designer for every 85 engineers.',
    label: 'Scaling Platform Design at a 1:85 Ratio',
    href: '/work/scaling-platform-design',
  },
  credits:
    'Research, the first design of search across the Data Map, and the Collections strategy are mine. Search to launch and Collections: designers on my team. Precision and speed: engineers and the search-model team.',
  sources:
    'FY25 research readout, July 2024; launch posts, Nov 14, 2024 and Mar 26, 2025; Collections launch post, Aug 7, 2025, and written feedback; top-five click-through from the search dashboard, Jul 2025 and Jan 2026.',
}

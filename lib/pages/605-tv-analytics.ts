import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: 605. Each section is an eyebrow, a heading, one lead paragraph
// under 60 words, one visual, and at most one supporting block.

export const SIX_O_FIVE: ShortPage = {
  slug: '605-tv-analytics',
  href: '/work/605-tv-analytics',
  title: 'Designing three TV analytics products at 605',
  roleTag: 'First Product Designer',
  period: '2017–2021',
  description:
    'Three TV advertising analytics products designed from first concept to launch at 605, and the rules that let a report compare audiences without a two-hour workaround.',
  context: {
    system: 'Before Intuit: 605, a TV advertising analytics company, three products from first concept to launch.',
    steps: [
      { label: 'Catalog search', href: '/work/search-2' },
      { label: 'The agent', href: '/work/agentic-discovery' },
      { label: 'The catalog', href: '/work/catalog-data-map-lineage' },
      { label: '605' },
    ],
    current: 3,
  },
  facts: [
    { label: 'Duration', value: 'October 2017 to June 2021' },
    { label: 'My role', value: 'First product designer; the designs are mine' },
    { label: 'Team', value: 'About 20 engineers and 5 product managers; two designers joined as the team grew' },
    { label: 'Research', value: 'Interviews across client, agency and network teams; five networks tested the Indxr prototype' },
  ],
  stats: [
    { value: '3–4 min → 1–1.5 min', label: 'To render a report' },
    { value: '$2M', label: 'In additional booked revenue from pitches that used the new designs, since March 2021' },
    { value: '32 → 2', label: 'Reports into pages, the Impact redesign of 2020' },
  ],
  hero: {
    src: '/work/605-tv-analytics/hero.mp4',
    poster: '/work/605-tv-analytics/hero-poster.jpg',
    tint: TINTS.platform605,
    width: 1440,
    height: 820,
    alt: 'A screen recording of the 605 Platform main dashboard, scrolling through top networks by rating, household reach, time-shifted playback, platform reach and reach by quarter hour.',
    caption: 'The 605 Platform main dashboard, 2020: networks by rating, household reach, time-shifted viewing and reach by quarter hour.',
  },
  visuals: [
    {
      id: 'journey-map',
      after: 'framing',
      lead: true,
      src: '/work/605-tv-analytics/journey-map.jpg',
      width: 2400,
      height: 736,
      alt: 'A whiteboard journey map with rows for organisation, actor, action, interview insights, pain points, requirements, functionality and technical details, filled with sticky notes across client, agency and network columns.',
      caption: 'The journey map from the first interviews: organisations and actors across the top, their actions, the interview insights and pain points under each.',
    },
    {
      id: 'early-sketches',
      after: 'first-design',
      lead: true,
      src: '/work/605-tv-analytics/early-sketches.jpg',
      width: 1800,
      height: 1280,
      alt: 'Three notebook sketches of the audience view: a header, a chart area, a filter column with age, gender, income and education, and a row of applied filters above a generate rankers button.',
      caption: 'Early sketches of the Platform audience view: the chart, the filter column and the applied filters that became the rankers.',
    },
    {
      id: 'platform-campaign',
      after: 'rules',
      lead: true,
      src: '/work/605-tv-analytics/platform-campaign.png',
      width: 2880,
      height: 1770,
      alt: 'The 605 Platform campaign dashboard: a bar chart of household reach and frequency by network and daypart, a line chart of reach and average audience by day, and ranked network tables on the right.',
      caption: 'The Platform campaign view after the 2020 redesign, with demo data: colour means audience in every chart.',
    },
    {
      id: 'indxr-iteration-note',
      after: 'indxr',
      lead: true,
      src: '/work/605-tv-analytics/indxr-iteration-note.png',
      width: 2838,
      height: 1546,
      alt: 'An Indxr prototype screen with a demographic breakdown chart, an applied filters row and a filter column, annotated with tester remarks: attributes are hard to discover in the list, scrolling 250 or more attributes is tough, two attributes from two sources can share a name, there is no definition for an attribute, and applied filters sit too far from the list.',
      caption: 'An Indxr prototype iteration annotated with remarks from the five-network test sessions. The rules for the tool came from those sessions.',
    },
    {
      id: 'indxr-report-creation',
      after: 'shipped',
      lead: true,
      src: '/work/605-tv-analytics/indxr-report-creation.png',
      width: 2880,
      height: 3022,
      alt: 'The Indxr report creation screen: a target definition search box, the attribute hierarchy in three columns with attribute details and data source, a target size line, and a demographic breakdown chart comparing the target with the national population.',
      caption: 'Indxr as shipped: the attribute hierarchy, where the data comes from, the target size and the demographic breakdown.',
    },
    {
      id: 'impact-overview',
      after: 'shipped',
      lead: true,
      src: '/work/605-tv-analytics/impact-overview.png',
      width: 2880,
      height: 3022,
      alt: 'The Impact overview page: a summary table of conversion, lift, reach, impressions and frequency, delivery charts by week and by frequency, and conversion mosaics for exposed, control and unexposed households.',
      caption: 'Impact after the 2020 redesign: the overview page of the two-page view, with delivery and conversion, in place of 32 separate reports. Demo data.',
    },
  ],
  sections: [
    {
      id: 'framing',
      eyebrow: 'The problem',
      short: 'Problem',
      heading: 'Comparing audiences took a two-hour workaround',
      blocks: [
        {
          type: 'p',
          text:
            'I was 605’s first product designer and led design for three products from first concept to launch, for network clients including AMC Networks and Discovery. The problem on this page came from the users: reports supported one target audience at a time, so researchers compared audiences by a workaround. I asked four researchers at AMC to walk me through it, and my manager studied five reports our own team had built the same way.',
        },
        {
          type: 'cards',
          items: [
            { value: '30 min', title: 'for two audiences and two metrics', text: 'The simplest comparison anyone asked for.' },
            { value: '+10 min', title: 'for each extra audience or metric', text: 'Often more, when the report had to be rebuilt.' },
            { value: '1–2 h', title: 'for five audiences and four metrics', text: 'The comparison a pitch deck usually needed.' },
          ],
        },
      ],
    },
    {
      id: 'first-design',
      eyebrow: 'The first design',
      short: 'First design',
      heading: 'The first design: 15 audiences in one chart',
      blocks: [
        {
          type: 'p',
          text:
            'My first design supported 15 audiences in one chart, the most we had ever observed. Engineering said the charts would take 3 to 4 minutes to render instead of 30 to 60 seconds, and the work 4 months against a 2-month client deadline. So I went back to both networks and asked for real examples.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'In 9 of 10 real examples people compared 2 to 5 audiences; 15 appeared once.', decision: 'A chart holds up to five audiences. The render fell to 1 to 1.5 minutes and the work fit a 2-month client deadline.' },
            { tension: 'Users found the colour confusing: it meant audience in one chart and metric in the next.', decision: 'Colour means audience in every chart in the product, and nothing else is coloured.' },
            { tension: 'When two metrics shared a chart there was only ever one audience.', decision: 'Two metrics share a chart only when there is one audience, so the worst case is two charts at once.' },
          ],
        },
      ],
    },
    {
      id: 'rules',
      eyebrow: 'The design',
      short: 'Design',
      heading: 'The three rules',
      blocks: [
        {
          type: 'p',
          text:
            'The rules held across every chart and report in the Platform, so a new report needed no new decisions about colour or layout. In-app search and filtering were deferred, since the exports already had the data. The redesign was delivered in 2 months for the client deadline. By April 2021 the Platform had over $20M in booked revenue and three networks as clients since its 2020 launch.',
        },
        {
          type: 'cards',
          items: [
            { value: '5', title: 'audiences per chart, at most', text: 'The 9-in-10 case, at a render time people would wait for.' },
            { value: '1', title: 'meaning for colour: the audience', text: 'Never the metric, never the network.' },
            { value: '2', title: 'charts at once, in the worst case', text: 'Two metrics share a chart only when there is one audience.' },
          ],
        },
      ],
    },
    {
      id: 'indxr',
      eyebrow: 'Indxr',
      short: 'Indxr',
      heading: 'Indxr: five networks tested the prototype',
      blocks: [
        {
          type: 'p',
          text:
            'Indxr lets a network define an audience from 200 attributes and see its size and shape, replacing manual program-ranking pulls that took a day to two weeks. Five networks tested the first prototype. Its search, export and sign-in were reused across all three products. Half of every session went to questions about where the data came from.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'Engineering could return instant results for about 12 attributes, not 200. Users said a longer wait was fine if they got more filters.', decision: 'Trade speed for attributes.' },
            { tension: 'Half of every session was about provenance.', decision: 'The tool shows where each attribute comes from, at the cost of screen space the rankings wanted.' },
            { tension: 'Household data is personal.', decision: 'No filtering on personal information, and no charts when an audience falls below 100 households.' },
          ],
        },
      ],
    },
    {
      id: 'shipped',
      eyebrow: 'What shipped',
      short: 'Results',
      heading: 'What shipped',
      blocks: [
        {
          type: 'p',
          text:
            'Pitches that used the new designs brought $2M in additional booked revenue from March 2021. Impact, the attribution product, went from 32 separate statistical reports to a two-page interactive view in 2020, and I replaced a chart type that had caused about 8 bugs, each worth about 2 days of engineering. Under all three products sat a data-visualisation system I designed and partly built: an accessible five-colour palette, tabular numerals, and an internal client reporting dashboard. Three habits came with me to Intuit: find the common case before designing to the limit, give colour one meaning, and show where the data came from before anyone has to ask.',
        },
        {
          type: 'table',
          head: ['When', 'What was measured', 'Change', 'Whose result'],
          rows: [
            ['2020', 'Time to render a Platform report', '3–4 min → 1–1.5 min', 'My design; engineering built the charts'],
            ['2020', 'Impact, the attribution product', '32 reports → 2 pages', 'My design'],
            ['Mar 2021', 'Additional booked revenue from pitches using the new designs', '$2M', 'Shared with sales'],
            ['Apr 2021', 'Platform booked revenue since the 2020 launch', 'Over $20M, three networks', 'Shared'],
          ],
        },
      ],
    },
  ],
  next: {
    text: 'That is the five case studies. The homepage has them side by side.',
    label: 'All the work',
    href: '/#work',
  },
  credits:
    'The designs are mine. About 20 engineers and 5 product managers built and shipped the products; two designers joined as the team grew.',
  sources:
    'April 2021 deck; March 2021 deck; Indxr write-up, Feb 2019; case study deck.',
}

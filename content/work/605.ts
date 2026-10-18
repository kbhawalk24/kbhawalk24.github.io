import type { CaseStudy } from '@/lib/case-study'

// Appendix D of BRIEF.md, rendered as written. The 605 title line is still
// to be confirmed (BRIEF.md section 1).

export const SIX_O_FIVE: CaseStudy = {
  slug: '605',
  href: '/work/605',
  title: '605: three analytics products for TV advertising',
  intro:
    '605 measured who watched which TV programs and ads, by matching viewing data to household demographics. Its customers were TV networks and advertisers.',
  summary: {
    role: 'Interaction designer and researcher, then product designer, and the company’s first. October 2017 – June 2021.',
    what: 'I led design for three products from first concept to launch. I worked with about 20 engineers and 5 product managers, led design on two products at once, and brought two more designers on board. By April 2021, the Platform product alone had over $20M in booked revenue and three networks as clients since its 2020 launch.',
    hero: {
      id: 's6-platform',
      caption: 'First design beside the shipped design, same data.',
      alt: 'Two versions of a 605 Platform report on the same data: the first design with fifteen audiences in one chart, and the shipped design with five audiences and colour meaning audience.',
      aspect: '16 / 7',
    },
  },
  impactId: 's6-impact',
  decisions: [
    {
      id: 'platform',
      heading: '605 Platform: comparing audiences in one report',
      blocks: [
        {
          type: 'kv',
          rows: [
            ['Product', 'A self-service tool for building reports on TV viewing. In plain terms, a well-dressed SQL query builder'],
            ['Users', 'Media researchers at two TV networks; business analysts at 605'],
            ['Problem', 'A report could cover one audience at a time. Comparing audiences meant running it again for each and combining the results by hand'],
            ['Outcome', 'Delivered in 2 months for a client deadline. $2M in additional booked revenue from pitches that used the new designs'],
          ],
        },
        {
          type: 'p',
          text: 'I asked four researchers at one network to walk me through the workaround, and my manager studied five reports our own team had built the same way. Two audiences and two metrics took 30 minutes. Each extra audience or metric added 10 minutes or more. Five audiences and four metrics took one to two hours.',
        },
        {
          type: 'p',
          text: 'My first design supported 15 audiences, the upper limit we had observed. Engineering said charts would take 3 to 4 minutes to render and the work would take 4 months. Users said color was confusing: it meant audience in one chart and metric in the next.',
        },
        {
          type: 'p',
          text: 'I went back to both networks and asked for real examples. In 9 of 10, they compared 2 to 5 audiences. Fifteen appeared once. When two metrics shared a chart, there was only ever one audience.',
        },
        { type: 'p', text: 'That changed three things:' },
        {
          type: 'ul',
          items: [
            'Five audiences, not 15.',
            'No search and filter in the first release. The export already had the data.',
            'Two metrics on one chart for a single audience only. Whenever there is more than one audience, color means audience.',
          ],
        },
        {
          type: 'p',
          text: 'The worst case became two charts at once. Render time fell to 1 to 1.5 minutes, and the build fit the 2-month deadline.',
        },
        {
          type: 'visual',
          visual: {
            id: 's6-color',
            caption: 'The color rule.',
            alt: 'Two charts from 605 Platform: one audience with two metrics in two colours, and several audiences where every colour means an audience.',
          },
        },
      ],
    },
    {
      id: 'indxr',
      heading: '605 Indxr: finding an audience and what it watches',
      blocks: [
        {
          type: 'kv',
          rows: [
            ['Product', 'Build a target audience from household attributes, then see which networks and programs it watches'],
            ['Users', 'Account executives and planners at TV networks'],
            ['Problem', 'Ranked lists of programs for an audience were pulled by research teams and took between 1 day and 2 weeks'],
            ['Outcome', 'Launched with one client. Its attribute search and its export were reused in 605 Platform, and its sign-in flow in every 605 product'],
          ],
        },
        {
          type: 'p',
          text: 'I tested the first prototype with five networks. All five wanted the tool, all five were most interested in how finely they could filter, and all five called program-level rankings invaluable. More than half of every session went to questions about where the data came from.',
        },
        {
          type: 'p',
          text: 'Engineering could return instant results for about 12 attributes, not 200. Users had told us a longer wait was fine if they got more filters, so we were willing to trade speed for more attributes. Two privacy rules shaped the design: no filtering on personal information, and no charts when an audience falls below 100 households.',
        },
        {
          type: 'visual',
          visual: {
            id: 's6-indxr',
            caption: 'The filter panel and the audience summary.',
            alt: 'The 605 Indxr screen: a panel of household attributes to filter on, and a summary of the resulting audience with the networks and programs it watches.',
          },
        },
      ],
    },
    {
      id: 'also-at-605',
      heading: 'Also at 605',
      blocks: [
        {
          type: 'ul',
          items: [
            '605 Impact. Launched in 2020. It measures whether people who saw an ad went on to watch the show. I collapsed 32 separate reports into two pages. After launch I designed a replacement for a chart type that users could not read and that had caused about 8 bugs, each costing around 2 days of engineering.',
            'A color palette for data visualization. Accessible, and adopted across the product and the company. I also introduced a typeface with tabular figures.',
            'Two internal tools. I helped redesign the dashboard that monitors incoming data quality, and I designed and built a reporting dashboard for the client team.',
            'Design process. I introduced a formal product design process and ran the weekly design meeting.',
          ],
        },
        {
          type: 'visual',
          visual: {
            id: 's6-impact',
            caption: 'The two-page Impact report; the chart before and after.',
            alt: 'The two-page 605 Impact report, and the chart type users could not read beside its replacement.',
          },
        },
        {
          type: 'visual',
          visual: {
            id: 's6-internal',
            caption: 'The data-quality dashboard.',
            alt: 'The internal dashboard that monitors the quality of incoming viewing data, with its filters.',
          },
        },
      ],
    },
  ],
  outcomes: {
    whoseLabel: 'Note',
    rows: [
      { figure: '30 minutes; 10+ minutes per addition; 1–2 hours', date: '2021', source: 'April 2021 deck', whose: 'Observed in user walkthroughs' },
      { figure: '4 users; 5 reports', date: '2021', source: 'April 2021 deck', whose: '' },
      { figure: '3–4 minutes to render; 4 months', date: '2021', source: 'April 2021 deck', whose: '' },
      { figure: '2–5 audiences in 9 of 10; 15 in 1', date: '2021', source: 'April 2021 deck', whose: '' },
      { figure: '1–1.5 minutes; 2 months', date: '2021', source: 'March and April 2021 decks', whose: '' },
      { figure: '$2M additional booked revenue', date: 'Since March 2021', source: 'April 2021 deck', whose: '' },
      { figure: 'Over $20M booked revenue; three network clients', date: 'April 2021', source: 'April 2021 deck', whose: 'Platform product only' },
      { figure: '5 networks; over 50% of session time', date: 'Feb 2019', source: 'Indxr write-up', whose: '' },
      { figure: 'About 12 attributes, not 200', date: '2019', source: 'Indxr write-up', whose: '' },
      { figure: '1 day to 2 weeks', date: '2019', source: 'Indxr write-up', whose: '' },
      { figure: '32 reports into 2 pages; 2020', date: '2020', source: 'April 2021 deck', whose: '' },
      { figure: 'About 8 bugs; around 2 days each', date: '', source: 'Case study deck', whose: '' },
      { figure: 'About 20 engineers, 5 product managers; 2 products at once; 2 designers', date: '', source: 'Both decks', whose: '' },
    ],
  },
  differently: null,
  credits: [
    'On 605 Platform I worked with an engineering manager, two front-end developers, a QA engineer, a product manager and a director of product, a data analyst and an account manager.',
  ],
}

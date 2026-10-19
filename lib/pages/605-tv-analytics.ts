import type { ShortPage } from './types'

export const SIX_O_FIVE: ShortPage = {
  slug: '605-tv-analytics',
  href: '/work/605-tv-analytics',
  title: '605 TV Analytics: Multi-Audience Reports Under Render Constraints',
  roleTag: 'First Product Designer',
  period: '2017–2021',
  description:
    'Three TV advertising analytics products designed from first concept to launch at 605, and the rules that let a report compare audiences without a two-hour workaround.',
  context: {
    system: 'Before Intuit: 605, a TV advertising analytics company, three products from first concept to launch.',
    steps: [
      { label: '605, TV advertising analytics, 2017–2021' },
      { label: 'Intuit, the data platform, 2021–2026', href: '/work/catalog-data-map-lineage' },
    ],
    current: 0,
  },
  stats: [
    { value: '3–4 min → 1–1.5 min', label: 'to render a report' },
    { value: '$2M', label: 'in additional booked revenue from pitches that used the new designs, since March 2021' },
    { value: '32 → 2', label: 'reports into pages, the Impact redesign of 2020' },
  ],
  sections: [
    {
      id: 'framing',
      heading: 'How the problem was framed',
      blocks: [
        {
          type: 'p',
          text:
            '605 was a TV advertising analytics company, and I was its first product designer. I led design for three products from first concept to launch, worked with about 20 engineers and 5 product managers, led design on two products at once, and brought two more designers on board. By April 2021 the Platform product alone had over $20M in booked revenue and three networks as clients since its 2020 launch. The problem that defines this page came from its users. Researchers at a network compared audiences by a workaround: I asked four of them to walk me through it, and my manager studied five reports our own team had built the same way. Two audiences and two metrics took 30 minutes. Each extra audience or metric added 10 minutes or more. Five audiences and four metrics took one to two hours.',
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
            'My first design supported 15 audiences in one chart, the upper limit we had observed. Engineering said the charts would take 3 to 4 minutes to render and the work would take 4 months. Users said the colour was confusing: it meant audience in one chart and metric in the next. So I went back to both networks and asked for real examples. In 9 of 10, they compared 2 to 5 audiences; 15 appeared once; and when two metrics shared a chart there was only ever one audience. That set the rules the product shipped with. A chart holds up to five audiences. Colour means audience, and only audience, everywhere in the product. Two metrics share a chart only when there is one audience, so the worst case is two charts at once.',
        },
        {
          type: 'p',
          text:
            'For Indxr, the audience-finding tool, the rules came from five networks who tested the first prototype. Engineering could return instant results for about 12 attributes, not 200; users had said a longer wait was fine if they got more filters, so we traded speed for attributes. Two privacy rules shaped everything: no filtering on personal information, and no charts when an audience falls below 100 households.',
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
            'The first trade-off was between the limit we had observed and the case that was common. Designing to 15 audiences was defensible and would have cost 4 months and a 4-minute wait; designing to the 9 in 10 fit a 2-month client deadline and cut the render to 1 to 1.5 minutes. The second was provenance. In the Indxr sessions, more than half of every session went to questions about where the data came from, so the tool shows it, at the cost of screen space the rankings wanted. The third was internal: a data-quality dashboard for our own team’s sanity checks, which caught about 8 bugs, each worth around 2 days.',
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
            'The Platform redesign was delivered in 2 months for a client deadline, and pitches that used the new designs brought $2M in additional booked revenue from March 2021. Impact, the attribution product, went from 32 separate reports to a two-page design in 2020. What carried to Intuit was the method: find the common case before designing to the limit, give colour one meaning, and show where the data came from before anyone has to ask.',
        },
      ],
    },
  ],
  next: {
    text: 'Five years later the same questions, at a company with 320,000 tables. The person behind the work, how I manage, and how I work with AI',
    label: 'About me, how I manage, how I work with AI',
    href: '/about',
  },
  credits:
    'The designs are mine. About 20 engineers and 5 product managers built and shipped the products; two designers joined as the team grew.',
  sources:
    'April 2021 deck; March 2021 deck; Indxr write-up, Feb 2019; case study deck.',
}

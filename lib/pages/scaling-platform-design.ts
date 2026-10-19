import type { ShortPage } from './types'

export const SCALING_PLATFORM_DESIGN: ShortPage = {
  slug: 'scaling-platform-design',
  href: '/work/scaling-platform-design',
  title: 'Scaling Platform Design at a 1:85 Ratio',
  roleTag: 'Product Design Manager',
  period: 'August 2024 – July 2026',
  description:
    'How I ran design for Intuit’s data platform at one designer for every 85 engineers: the mechanisms I put in place, the bets I argued onto the roadmap, what did not work, and what the team shipped.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: '0-to-1 Catalog, Data Map & Lineage' },
      { label: 'Self-Service Onboarding & AI Trust', href: '/work/self-service-onboarding' },
      { label: 'Scaling the team at 1:85' },
    ],
    current: 2,
  },
  stats: [
    { value: '<1% → 80%', label: 'Of the data estate meeting the clean-data standard · shared' },
    { value: '17 → 0', label: 'Peak-season P0/P1 data incidents · shared' },
    { value: '2–3 weeks → 3 days', label: 'To get access to real-time data' },
  ],
  sections: [
    {
      id: 'framing',
      heading: 'How the problem was framed',
      blocks: [
        {
          type: 'p',
          text:
            'In August 2024 I became the design manager for the platform I had helped build, with one designer for every 85 engineers across the data design group. The team covered one platform, from finding data and getting access to lineage, quality, certification and the agent, and two separate products beside it, product usage tracking and pipeline authoring. Requests for design came from many product teams. At that ratio a manager cannot scale by reviewing screens or routing tickets, so the first thing that changed was where I spent my time: in the meetings where a problem was framed, asking questions before a specification existed.',
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
            'Four things I put in place, each a mechanism rather than a review.',
        },
        {
          type: 'list',
          items: [
            { lead: 'One research base for every data designer.', text: 'The designers pooled their user visits, surveys and help-channel threads into one set of findings: 15 visits, 8 surveys and 11 help channels in 2025. It produced the list of what to build next, in a form the engineering manager could take straight into pitch decks and requirements. My manager wrote that it showed in what was added to the roadmap.' },
            { lead: 'One way in and one list.', text: 'An intake process and a project tracker, so every product team’s request landed in the same place and every designer’s load was visible.' },
            { lead: 'Decisions that get made.', text: 'Clarity when requirements were unclear, boundaries when work kept changing, and engineering leads and several product managers in one room to settle a decision. That is what my designers told my manager they valued.' },
            { lead: 'AI in the work, modelled first.', text: 'Coded prototypes, AI research synthesis and AI-made videos in my own work first; my manager wrote that he then saw every one of my designers use them.' },
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
          text:
            'I argued for work the roadmap did not have. Two features got onto it and my team designed them: a view of the queries other people run against a table, and Collections, a person’s saved working set of data. The engineering manager wrote that they “would not have happened if not for Kanchi’s persistence and design sponsorship.” I pushed back when one designer was about to be spread across two unrelated products. And I set the design strategy for the clean-data standard, the same steps across every way data is produced and the same display of maturity for producers and consumers, coordinating designers on my team and beyond it.',
        },
        {
          type: 'p',
          text:
            'Not everything worked. My manager’s 2025 review names four projects where we did the research, translated it into recommendations, and it changed neither the direction nor the execution. He called it wasted effort and asked me to work on one thing: influence. The following year a finding stayed on the table until it became a commitment, not a readout.',
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
            'The designers on my team shipped the results. Access to real-time data fell from 2–3 weeks to 3 days, decryption access from 9 days to 3, internal approvals from 24 hours to near-instant, time to discover data from 14.2 hours to 9.4, and search session conversion rose from 41% to 61%. Across the platform, peak-season P0 and P1 data incidents fell from 17 to 0 and clean data grew from under 1% to 80% of the estate, results many teams share. The team began practices of its own: a design sign-off before release, AI-made launch videos other teams copied, and coded prototypes that cut development time by as much as 90% on some features. A 2023 intern I had managed joined the team full-time; one designer was promoted to senior in 2026, and two more cases were approved before my role ended.',
        },
      ],
    },
    {
      id: 'heading',
      heading: 'Where the line was heading',
      blocks: [
        {
          type: 'p',
          text:
            'In September 2026, two months after my role ended, Intuit described its platform to investors as “one data platform, one domain set of workflows, and then the orchestration layer that we’ve built on top,” with every experience feeding “a common business object model” and “a persistent customer financial graph.” The last thing I was designing was the step before that: a collection connected to a project and a query tool, so that finding data, getting access to it and querying it happen in one place, with the agent’s collections as its context and, in work under way, its access boundary. It was in flight when my role ended and did not ship.',
          links: [
            { text: 'one data platform, one domain set of workflows, and then the orchestration layer that we’ve built on top', href: 'https://stockanalysis.com/stocks/intu/transcripts/612260-investor-day-2026/' },
          ],
        },
      ],
    },
  ],
  next: {
    text: 'The access and certification flows the team shipped reused a pattern I had designed myself a year earlier. Next: the self-service onboarding flow of 2023–24, and the human-in-the-loop rules that made AI-generated metadata trustworthy',
    label: 'Self-Service Onboarding & Human-in-the-Loop AI Trust',
    href: '/work/self-service-onboarding',
  },
  credits:
    'The mechanisms, the strategy and the pushback are mine. The products on this page were designed by the designers on my team; the certification work was shared with designers elsewhere in the data design group. Engineers delivered everything that shipped.',
  sources:
    'Launch posts of Jan 14, Mar 24, Aug 22 and Sep 18, 2025; team research deck, Q3 FY26; FY25 and FY26 reviews; roadmap decks and the FY27 strategy readout; AWS re:Invent 2025 for the public clean-data figure; promotion records. Intuit Investor Day 2026 transcript, Sep 17, 2026, for the closing quotes.',
}

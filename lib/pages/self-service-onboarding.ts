import type { ShortPage } from './types'

export const SELF_SERVICE_ONBOARDING: ShortPage = {
  slug: 'self-service-onboarding',
  href: '/work/self-service-onboarding',
  title: 'Self-Service Onboarding & Human-in-the-Loop AI Trust',
  roleTag: 'Principal IC',
  period: '2023–2024',
  description:
    'Two problems with the same shape: a request nobody could finish, and content nobody could trust.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: '0-to-1 Catalog, Data Map & Lineage', href: '/work/catalog-data-map-lineage' },
      { label: 'Self-Service Onboarding & AI Trust' },
      { label: 'Scaling the team at 1:85', href: '/work/scaling-platform-design' },
    ],
    current: 1,
  },
  stats: [
    { value: '1–2 weeks → under 24 hours', label: 'to get marketing data onboarded' },
    { value: '7 days', label: 'of campaign delay on average in FY23, the problem' },
    { value: '1,600', label: 'data products newly certified and discoverable in FY24' },
  ],
  visuals: [
    {
      id: 'three-iterations',
      alt: 'Three iterations of the self-service onboarding flow side by side, from the first form to the shipped version.',
      caption: 'Three iterations of the self-service onboarding flow, side by side.',
      todo: 'Export from Onboarding attributes to C360 Q2 2024.fig and CDC 2.0.fig.',
    },
    {
      id: 'human-in-the-loop',
      after: 'rules',
      alt: 'The review step where a person confirms or corrects AI-generated metadata before it is published.',
      caption: 'Where the human stays in the automated flow: the review step for AI-generated metadata.',
      todo: 'Export from Displaying ai generated metadata in DDE.fig.',
    },
    {
      id: 'journey-map',
      after: 'trade-offs',
      alt: 'The journey map from the FY23 research, with the campaign delay marked.',
      caption: 'The FY23 journey map, with the 7-day campaign delay marked.',
      todo: 'Export from C360 - Self Serve onboarding.jam; redact names.',
    },
    {
      id: 'certified-by-month',
      after: 'multiplier',
      alt: 'A chart of newly certified data products by month in FY24.',
      caption: 'Newly certified data products by month, FY24.',
      todo: 'Chart from the source of the 1,600 figure.',
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
            'Two problems with the same shape: a request nobody could finish, and content nobody could trust. Getting clean data into the marketing data store took one to two weeks and several engineers, marketers and data owners, and in fiscal 2023 it delayed campaigns by 7 days on average. At the same time the company’s clean-data standard was arriving in the catalog, and AI could write the descriptions and tags that thousands of tables lacked. My 2024 research said where that was worth doing: AI-written descriptions were useful only where no human-written one existed, and two of the first three reviewers said unverified ones were not trustworthy. Both problems came down to one question: where does a person belong in an automated flow?',
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
            'For the standard in the catalog, the rules I designed for how it appears. A description is AI-written only where none exists, and it says so. A scorecard shows the table against the standard. Classification and compliance tags are AI-assigned, with a label for what the data is intended for and filters for all of it. Two corrections sit beside every piece of AI content: the person responsible for the data can edit an AI description, and any user can report a wrong tag. Unverified AI content is not shown. The platform organization defined the standard; I designed how a person sees it.',
        },
        {
          type: 'p',
          text:
            'For onboarding, what shipped on October 16, 2024. Self-service, with no approver, for data that qualifies. A ticket for data that does not. The person responsible for the data stays involved for the remaining types. AI fills in the request. A test run against a copy of the destination checks it before it is submitted. A tracking page shows where the request is.',
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
            'Onboarding took three designs. The first was a request followed by manual approval by the data’s owner. Leadership asked for less friction, so the second removed the approver: a marketer could request and receive data with nobody in the loop. After several months of engineering it stalled. The fully automatic version was not feasible; access permissions and edge cases in how data is moved got in the way, and drawing every state and edge case in the flows is what surfaced them. The third design is the one above, with the human kept exactly where the edge cases are.',
        },
        {
          type: 'p',
          text:
            'The trust work had its own cost. I moved fast and the product showed it: my manager’s review in my first year lists inconsistent experiences and non-standard patterns, and I planned a formal usability study that I did not run. The correction controls are the part of that work I would defend without reservation, because the research is what put them there.',
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
            'One to two weeks became under 24 hours. The onboarding flow became the pattern for later requests, access and promoting data to a certified level, which is how the team’s access work the following year could ship so fast. In fiscal 2024, 1,600 new data products at the standard’s third level became discoverable, and I redesigned the catalog for curated tables that had taken three to four tools to find. At AWS re:Invent 2025 Intuit showed the catalog on stage: owners, quality rating, lineage and self-service access on one screen.',
        },
      ],
    },
  ],
  next: {
    text: 'The owner, the scorecard and the request flow all hang off one idea, a data product with its physical copies beneath it. Next: the catalog itself, from a list of tables to the Data Map, and lineage in four weeks',
    label: '0-to-1 Catalog, Data Map & 4-Week Lineage',
    href: '/work/catalog-data-map-lineage',
  },
  credits:
    'The designs are mine. The platform organization defined the clean-data standard; the access team owned permissions; engineers built everything that shipped.',
  sources:
    'Onboarding workshop deck, Feb 2024; launch post, Oct 16, 2024; FY24 and FY25 year-end reviews; July 2024 research readout; my first-year review; AWS re:Invent 2025.',
}

import type { CaseStudy } from '@/lib/case-study'

// Appendix C of BRIEF.md, rendered as written. Two passages are drafts in
// content/drafts/pending.md and stay off the page.

export const MY_TEAMS_WORK: CaseStudy = {
  slug: 'my-teams-work',
  href: '/work/my-teams-work',
  title: 'Leading the designers behind Intuit’s data platform',
  summary: {
    role: 'Product Design Manager, August 2024 – July 2026. I kept designing alongside the team.',
    where: 'Intuit, internal data platform.',
    what: 'The work on this page was designed by the designers on my team. My own part in each project is one sentence, marked “My part.”',
    extra: [
      { type: 'p', text: 'What the team covered: one platform and two separate products.' },
      {
        type: 'ul',
        items: [
          'The data discovery platform: finding and understanding data, collections, the agent, access and the status of requests, exploration, moving data, promoting data to certified levels, lineage, monitoring of data health, and data quality.',
          'Separate products: tracking of product usage, and pipeline authoring.',
        ],
      },
      { type: 'p', text: 'The constraint: across the data design group, there was one designer for every 85 engineers.' },
    ],
    hero: {
      id: 'tw-hero',
      caption: 'The platform with its parts, the two separate products beside it, and the team’s launches placed on each.',
      alt: 'A map of the data discovery platform divided into its parts, with the two separate products beside it, and each of the team’s launches from 2024 to 2026 placed on the part it belongs to.',
      aspect: '16 / 8',
    },
  },
  impactId: 'tw-impact',
  primer: {
    id: 'what-i-put-in-place',
    heading: 'What I put in place',
    blocks: [
      {
        type: 'p',
        text: 'Design at the point where the problem is defined. The first thing that changed when I became a manager was where I spent my time: in the meetings where a problem was framed, asking questions before a specification existed. I also argued for work the roadmap did not have. Two features got onto it, and my team then designed them: a view of the queries other people run against a table, and collections, a person’s saved working set of data. The engineering manager wrote that they “would not have happened if not for Kanchi’s persistence and design sponsorship.”',
      },
      {
        type: 'p',
        text: 'One research base for every data designer. I had the designers pool their user visits, surveys and help-channel threads into one set of findings. In 2025 that base covered 15 user visits, 8 targeted surveys and 11 help channels, and it produced the list of what to build next: column-level information, relationships between tables, better descriptions. The engineering manager had asked for organized user evidence that could go straight into pitch decks and requirements. My manager wrote that it showed in what was added to the roadmap.',
      },
      {
        type: 'p',
        text: 'An intake process and a project tracker. Requests for design came from many product teams. I set up one way in and one list of what each designer was working on.',
      },
      {
        type: 'p',
        text: 'Decisions that get made. My designers told my manager what they valued: clarity when requirements were unclear or missing, boundaries when work kept changing, and getting engineering leads and several product managers into one room to settle a decision.',
      },
      {
        type: 'p',
        text: 'A way to make a promotion case. I wrote a six-slide framework for a promotion case: the gap, the scope, the execution, the result, the effect on other people, the ask. Each designer on my team used it.',
      },
      {
        type: 'p',
        text: 'AI tools in everyday design work. I used coded prototypes, AI research synthesis and AI-made videos in my own work first. My manager wrote that he then saw every one of my designers use them.',
      },
      {
        type: 'visual',
        visual: {
          id: 'tw-research',
          caption: 'One slide of the 2025 findings.',
          alt: 'One slide from the 2025 research findings listing what to build next: column-level information, relationships between tables, better descriptions.',
          aspect: '16 / 9',
        },
      },
    ],
  },
  decisions: [
    {
      id: 'access',
      heading: 'Access to data',
      meta: 'Designed by one designer on my team',
      blocks: [
        {
          type: 'p',
          text: 'My part. In 2023 I worked with the access team on the entry point from the catalog into access requests. As manager I pushed back when this designer was about to be spread across two products.',
        },
        { type: 'p', text: 'What my team designed.' },
        {
          type: 'table',
          columns: ['Launch', 'Date', 'Result'],
          rows: [
            ['One page to track every access request', 'Dec 2024', '25% reduction in time to resolve manual requests'],
            ['Access to real-time streams', 'Mar 24, 2025', 'Wait fell from 2–3 weeks to 3 days; 61% of requests approved automatically'],
            ['Access to restricted tax data', 'May 2025', '85% of ineligible denials eliminated'],
            ['Tables and encrypted columns in one request', 'Aug 22, 2025', '9 days to 3 days; two approval flows became one'],
            ['Requests in bulk', 'Aug 28, 2025', 'One customer moved access for 5,000 tables in a week and saved 200+ hours'],
            ['Automatic approval rules set by data owners', 'Sep 18, 2025', '24 hours to near-instant for internal data'],
          ],
        },
        { type: 'p', text: 'The designer also wrote the product requirements for the tracking page while the product manager was away.' },
        {
          type: 'visual',
          visual: {
            id: 'tw-access',
            caption: 'Access request flow before and after; the journey map.',
            alt: 'The access request flow before and after the redesign, with the journey map of a person requesting data from the table they are looking at.',
          },
        },
      ],
    },
    {
      id: 'lineage',
      heading: 'Lineage for investigating incidents',
      meta: 'Designed by one designer on my team; a second took lineage over in 2026',
      blocks: [
        { type: 'p', text: 'My part. I designed the first lineage view in 2023 on a four-week deadline and handed it over in 2024.' },
        {
          type: 'p',
          text: 'What my team designed. A list-based summary of what feeds a table and what depends on it, then lineage at the level of a single attribute, with an impact report people can read. The designer tested seven concepts in about five days across eight user sessions. A full graph would have taken too long to build, so the direction changed to a summary first.',
        },
        {
          type: 'p',
          text: 'Result. Investigations that took about 4 hours now take minutes. The work was used to find the root cause of 19 marketing data incidents in one tax season.',
        },
        {
          type: 'visual',
          visual: {
            id: 'tw-lineage',
            caption: 'The graph beside the list summary; a readable impact report.',
            alt: 'The original lineage graph beside the list-based summary that replaced it for root-cause work, and an impact report written for people to read.',
          },
        },
      ],
    },
    {
      id: 'certifying',
      heading: 'Certifying data, the same way everywhere',
      meta: 'Designed by designers on my team and others in the data design group',
      blocks: [
        {
          type: 'p',
          text: 'My part. The standard was the platform organization’s. I set the design strategy for how it shows up: the same steps across every way data is produced, the same display of maturity whether a person is producing data or consuming it, and bulk tools for descriptions, ownership and compliance tags so that promotion is possible to finish. I coordinated the design work across designers on my team and beyond it, and got product managers and designers to agree on requirements when they were unclear.',
        },
        {
          type: 'p',
          text: 'What the group designed. The company’s clean-data standard has levels. Guided workflows for reaching the fourth level launched on November 5, 2025, across several ways of producing data.',
        },
        {
          type: 'p',
          text: 'Result. Publicly, Intuit reports that clean data went from under 1% to 80% of its data estate. In the tax season that followed, peak-season P0 and P1 data incidents fell from 17 to 0. Many teams share that result.',
        },
        {
          type: 'visual',
          visual: {
            id: 'tw-cert',
            caption: 'One guided certification workflow shown on two different data-production paths.',
            alt: 'The same guided certification workflow shown twice, once for a batch pipeline and once for a real-time source, with the same steps and the same maturity display in each.',
          },
        },
      ],
    },
    {
      id: 'discovery',
      heading: 'Discovery, built on the search design',
      meta: 'Designed by designers on my team',
      blocks: [
        { type: 'p', text: 'My part. I did the research and the first search design in 2024. That work is in the case study on search.' },
        {
          type: 'p',
          text: 'What my team designed. A view of the queries other people run against a table (May 15, 2025). Search for real-time streams (June 15, 2025) and for marketing attributes (August 12, 2025), each with the first result correct 99.99% of the time. Collections (August 7, 2025). The response patterns for the agent in coding tools (2026).',
        },
        {
          type: 'visual',
          visual: {
            id: 'tw-discovery',
            caption: 'Collections; the query view.',
            alt: 'A collection, a person’s saved working set of data, beside the view of the queries other people run against a table.',
          },
        },
      ],
    },
  ],
  sections: [
    {
      id: 'started-on-its-own',
      heading: 'What the team started on its own',
      blocks: [
        {
          type: 'ul',
          items: [
            'A design sign-off before release. One designer began reviewing built features against the design before they shipped. It became the team’s practice.',
            'AI-made launch videos. One designer replaced recorded walkthroughs with AI-generated videos. A stakeholder called it a “game-changer”, and engineering teams began to copy the format.',
            'Coded prototypes built with developers. One designer’s use of a prototyping tool cut development time by as much as 90% on some features.',
          ],
        },
      ],
    },
    {
      id: 'growing-people',
      heading: 'Growing people',
      blocks: [
        {
          type: 'ul',
          items: [
            'A design intern I managed in summer 2023 converted to a full-time designer and later joined my team.',
            'One designer was promoted to senior in 2026.',
            'The two remaining promotion cases were approved before my role ended and confirmed after I left.',
          ],
        },
      ],
    },
    {
      id: 'limits',
      heading: 'Limits',
      blocks: [
        {
          type: 'p',
          text: 'My manager’s 2025 review names what did not work. On four projects, we did the research and translated it into recommendations, and it did not change the direction or the execution. He called it wasted effort for design and research, and asked me to work on one thing: influence.',
        },
      ],
    },
  ],
  outcomes: {
    whoseLabel: 'Whose',
    rows: [
      { figure: 'One designer for every 85 engineers', date: 'Apr 2026', source: 'Design group overview', whose: 'Whole data design group' },
      { figure: '15 visits, 8 surveys, 11 channels', date: '2025', source: 'Team research deck, Q3 FY26', whose: 'Team' },
      { figure: '25% reduction in time to resolve manual requests', date: 'Dec 2024, announced Jan 14, 2025', source: 'Launch post', whose: 'Team' },
      { figure: '2–3 weeks → 3 days; 61% auto-approved', date: 'Mar 24, 2025', source: 'Launch post', whose: 'Team' },
      { figure: '85% of ineligible denials eliminated', date: 'May 2025', source: 'FY25 reviews', whose: 'Team' },
      { figure: '9 days → 3 days; two flows into one', date: 'Aug 22, 2025', source: 'Launch post; design group overview', whose: 'Team' },
      { figure: '5,000 tables in a week; 200+ hours', date: 'Aug 28, 2025', source: 'Launch post', whose: 'One customer' },
      { figure: '24 hours → near-instant', date: 'Sep 18, 2025', source: 'Launch post', whose: 'Team' },
      { figure: '7 concepts in about 5 days; 8 sessions', date: 'FY25 Q4', source: 'Roadmap tracker', whose: 'Team' },
      { figure: 'About 4 hours → minutes; 19 incidents', date: 'Tax year 2025', source: 'FY26 mid-year review; report’s assessment', whose: 'Team' },
      { figure: 'Certification workflows launched', date: 'Nov 5, 2025', source: 'Three launch posts', whose: 'Group' },
      { figure: 'Clean data under 1% → 80%', date: 'Dec 2025', source: 'Public: AWS re:Invent 2025', whose: 'Many teams' },
      { figure: 'Peak-season P0/P1 incidents 17 → 0', date: 'Tax year 2025', source: 'Roadmap decks; FY27 strategy readout', whose: 'Many teams' },
      { figure: 'First result correct 99.99%', date: 'Jun 15 and Aug 12, 2025', source: 'Launch posts', whose: 'Team; engineering delivered' },
      { figure: 'Development time cut by as much as 90% on some features', date: 'FY26 first half', source: 'FY26 mid-year review', whose: 'Team' },
      { figure: 'One promotion; two cases approved', date: '2026', source: 'Promotion records; own knowledge', whose: 'Me as manager' },
    ],
  },
  differently: null,
  credits: [
    'Designers on my team designed everything in the four project sections. Designers elsewhere in the data design group shared the certification work. I worked with my manager, product managers and engineering leads across the platform.',
  ],
}

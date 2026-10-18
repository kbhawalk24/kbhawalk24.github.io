import type { CaseStudy } from '@/lib/case-study'

// Appendix B of BRIEF.md, rendered as written.

export const BUILDING_THE_PLATFORM: CaseStudy = {
  slug: 'building-the-platform',
  href: '/work/building-the-platform',
  title: 'Founding designer of Intuit’s data catalog: from a list of tables to a platform',
  summary: {
    role: 'Founding designer of the catalog. Senior, then Principal Product Designer, June 2021 – August 2024. I kept designing parts of it as a manager until July 2026.',
    where: 'Intuit, internal data platform.',
    what: 'I designed the catalog that replaced a commercial product, then the parts that turned it into the place where people judge data, trace it and get it.',
    measured: {
      columns: ['When', 'State'],
      rows: [
        ['June 2021', 'The catalog listed data-lake tables and their columns. Nothing told you whether to trust a table or who owned it. The company paid for a commercial catalog alongside it. By my own measure, finding, getting access to and exploring data took about 45 days'],
        ['Fiscal 2023', 'Commercial catalog retired'],
        ['Fiscal 2024', 'Monthly users grew from 1,886 to 2,664'],
        ['2023 → 2025, public', 'Time to discover and access data: 20 days → 14.2 hours → 9.4 hours'],
        ['March 2026', '6,673 people used the catalog in the month'],
      ],
    },
    hero: {
      id: 'bp-hero',
      caption: 'The first table page from 2021 beside the same page in 2026.',
      alt: 'Two screens side by side: the 2021 table page showing a name and columns only, and the 2026 page for the same table with its owner, quality rating, lineage and a request-access button.',
      aspect: '16 / 7',
    },
  },
  impactId: 'bp-impact',
  primer: {
    id: 'the-platform',
    heading: 'The platform, then my part',
    blocks: [
      {
        type: 'p',
        text: 'The data discovery platform is one product. When I joined in June 2021 it did one thing: search for data-lake tables and their columns. By 2026 it was where people at Intuit searched for data, judged its quality, traced where it came from, watched its health, requested access, explored it, moved it to where they needed it, and promoted it to a certified level. In the same place they checked the status of their requests and kept their own collections of data. The plain-language assistant and the later agent were parts of it too. Two neighbouring products were separate: tracking of product usage, and pipeline authoring.',
      },
      {
        type: 'p',
        text: 'I was its founding designer. The search case study covers search. This page covers three moments where I designed what happens after a person finds data: deciding whether to trust it, tracing where it came from, and getting it to where it is needed. The case study on my team’s work covers what the designers on my team added from 2024.',
      },
      {
        type: 'visual',
        visual: {
          id: 'bp-diagram',
          caption: 'Diagram of the platform as one product with its parts; product-usage tracking and pipeline authoring drawn outside it.',
          alt: 'A diagram: one box for the data discovery platform containing search, quality, lineage, health, access, exploration, moving data and certification; two smaller boxes outside it for product-usage tracking and pipeline authoring.',
          aspect: '16 / 9',
        },
      },
    ],
  },
  sections: [
    {
      id: 'the-model',
      heading: 'The model before the screens',
      blocks: [
        {
          type: 'p',
          text: 'Every screen rests on one idea. Data has a business meaning and several physical forms. A data product is the meaning: a customer, an invoice. Beneath it sit the physical copies: a batch table, a real-time stream, a copy in the marketing data store. Each copy has an owner, a history and a quality level. The search page shows how this model changed search; here it is what trust, lineage and access attach to.',
        },
      ],
    },
  ],
  decisions: [
    {
      id: 'judge-a-table',
      heading: '1. Enough to judge a table without asking anyone',
      meta: '2021–2024 · my design',
      blocks: [
        { type: 'p', text: 'The problem. A search result was a table name. Deciding whether to use it meant asking the person who knew.' },
        {
          type: 'p',
          text: 'What I designed. First, in 2021–2022, what the commercial catalog had: descriptions, trust flags, filters, browsing by warehouse. Then what it did not: opening a table in a notebook tool, the SQL behind a view, claiming ownership of a table, and in 2023 usage statistics and a view for deeply nested schemas with search inside it. In 2023–2024, for the company’s clean-data initiative, I designed how the standard appears in the catalog: AI-written descriptions for tables that had none, a scorecard against the standard, AI-assigned classification and compliance tags, a label for what the data is intended for, and filters for all of them. The platform organization defined the standard; I designed how a person sees it.',
        },
        {
          type: 'p',
          text: 'The decision. AI-written content needed a way to be corrected. I added two: the person responsible for the data can edit an AI description, and any user can report a wrong tag.',
        },
        {
          type: 'p',
          text: 'What it cost. I moved fast and the product showed it. My manager’s review in my first year lists inconsistent experiences and non-standard patterns, and I planned a formal usability study that I did not run.',
        },
        {
          type: 'p',
          text: 'What changed. The commercial catalog was retired in fiscal 2023. Top-five click-through rose from 68% to 96% between April 2022 and April 2023. In fiscal 2024, 1,600 new data products at the standard’s third level became discoverable, and I redesigned the catalog for curated tables that had taken three to four tools to find. My 2024 research found AI-written descriptions useful only where no human-written one existed, which is why both correction controls exist.',
        },
        {
          type: 'visual',
          visual: {
            id: 'bp-d1',
            caption: 'A table page with trust flags, description, owner and the scorecard; editing an AI description.',
            alt: 'A table page showing trust flags, a description marked as AI-written with an edit control, the owner, and a scorecard against the clean-data standard.',
          },
        },
      ],
    },
    {
      id: 'lineage',
      heading: '2. Lineage in four weeks',
      meta: '2023 · my design; a second designer joined the work and took it over in 2024',
      blocks: [
        { type: 'p', text: 'What forced it. The organization wanted a way to trace where data came from before tax season. I had four weeks.' },
        {
          type: 'p',
          text: 'What I designed. A graph of what feeds a table and what depends on it, across about 30,000 tables and 7,000 pipelines, with an impact report to download. Before a change, a data producer can see who to warn. During an incident, both sides can see what is affected.',
        },
        {
          type: 'p',
          text: 'The decision. When something upstream breaks, where should the warning appear? We were working out how to flag it on the lineage graph. I proposed an alert that shows wherever the affected data appears: in search results and on table pages as well as on the graph.',
        },
        {
          type: 'p',
          text: 'What changed. Lineage launched on December 6, 2023. By July 2024 it had 450 to 500 monthly users. The designer who took it over turned the graph into a list-based summary for root-cause work; that is on the page about my team.',
        },
        {
          type: 'visual',
          visual: {
            id: 'bp-d2',
            caption: 'The lineage graph; the alert on a search result.',
            alt: 'Left: a lineage graph of what feeds a table and what depends on it. Right: a search result card carrying an alert that something upstream of the table is broken.',
          },
        },
      ],
    },
    {
      id: 'onboarding',
      heading: '3. Self-service onboarding, on the third design',
      meta: '2024 · my design',
      blocks: [
        {
          type: 'p',
          text: 'The problem. Getting clean data into the marketing data store took one to two weeks and several engineers, marketers and data owners. In fiscal 2023 it delayed campaigns by 7 days on average.',
        },
        { type: 'p', text: 'First design. A request, then manual approval by the person responsible for the data.' },
        {
          type: 'p',
          text: 'Second design. Leadership asked for less friction. I removed the approval step, so a marketer could request and receive data without anyone in the loop.',
        },
        {
          type: 'p',
          text: 'Why it stalled. After several months of engineering work, the fully automatic version was not feasible. Access permissions and edge cases in how data is moved got in the way. Drawing every state and edge case in the flows is what surfaced them.',
        },
        {
          type: 'p',
          text: 'What shipped, October 16, 2024. Self-service for data that qualifies, with no approver. A ticket for data that does not. The person responsible for the data stays involved for the remaining data types. AI fills in the request. A test run against a copy of the destination checks it before it is submitted. A tracking page shows status.',
        },
        { type: 'p', text: 'What changed. One to two weeks became under 24 hours.' },
        {
          type: 'visual',
          visual: {
            id: 'bp-d3',
            caption: 'The three designs side by side; the request form.',
            alt: 'Three onboarding flows side by side: a request with manual approval, a fully automatic version, and the shipped version that is self-service for data that qualifies and a ticket for the rest; beside them, the AI-filled request form with its test run.',
          },
        },
      ],
    },
    {
      id: 'catalog-to-platform',
      heading: 'From catalog to platform',
      blocks: [
        {
          type: 'p',
          text: 'By 2024 the catalog had grown into the data discovery platform. Access, moving data and promoting data were parts of the same product.',
        },
        {
          type: 'ul',
          items: [
            'Access. In 2023 I worked with the access team so that a request for access starts from the table a person is looking at.',
            'Moving data. The onboarding flow above became the pattern for later requests: access, and promoting data to a certified level.',
            'Creating data, in a neighbouring product. As a manager I designed table and schema creation in the developer portal when that team lost its designer. An engineer there wrote that I “chimed in so quickly and were able to come up with a design for Datalake within the timeline.”',
            'Where it was heading. In 2026 I was designing the next step: a collection connected to a project and a query tool, so that finding data, getting access and querying it happen in one place. It was in flight when my role ended and did not ship.',
          ],
        },
        {
          type: 'p',
          text: 'At AWS re:Invent 2025, Intuit showed the catalog on stage: owners, quality rating, lineage and self-service access on one screen.',
        },
      ],
    },
  ],
  outcomes: {
    whoseLabel: 'Whose',
    rows: [
      { figure: '45 days', date: '2021', source: 'Own measure', whose: 'Mine' },
      { figure: 'Commercial catalog retired', date: 'FY23', source: 'FY23 year-end review', whose: 'Team' },
      { figure: '68% → 96%', date: 'Apr 2022 → Apr 2023', source: 'FY23 year-end review', whose: 'Mine' },
      { figure: '1,886 → 2,664 monthly users', date: 'FY24', source: 'FY24 year-end review', whose: 'Platform' },
      { figure: '6,673 users in the month', date: 'Mar 2026', source: 'Analytics dashboard, captured May 22, 2026', whose: 'Platform' },
      { figure: '20 days → 14.2 hours → 9.4 hours', date: '2023 → 2025', source: 'Public: AWS re:Invent 2025; internal roadmap', whose: 'Platform' },
      { figure: 'About 30,000 tables, 7,000 pipelines', date: 'Dec 6, 2023', source: 'Launch post', whose: 'Lineage' },
      { figure: 'Four weeks; 450–500 monthly users', date: 'By Jul 2024', source: 'FY24 year-end review', whose: 'Mine' },
      { figure: '1,600 new third-level data products; three to four tools', date: 'FY24', source: 'FY24 year-end review', whose: 'Mine, catalog side' },
      { figure: 'One to two weeks; 7 days of campaign delay in FY23', date: 'Feb 2024', source: 'Onboarding workshop deck', whose: 'Problem statement' },
      { figure: 'One to two weeks → under 24 hours', date: 'Oct 16, 2024', source: 'Launch post; FY25 year-end review', whose: 'Design: mine' },
    ],
  },
  differently: null,
  credits: [
    'I was the designer for everything in sections 1 to 3 unless a line says otherwise. I worked with product managers, catalog and platform engineers, the access team and the data-movement team. The clean-data standard was defined by the platform organization. A second designer joined lineage and took it over in 2024. Not everything I designed shipped when I designed it: a page and a search for marketing attributes, designed in 2023, were built by designers on my team in 2025.',
  ],
}

import type { Track } from '@/lib/timeline-data'
import { TINTS } from '@/lib/tint'

// The homepage's words: the work grouped into three arcs, each with one
// case study shown as a full-width card.

export interface CardStat {
  value: string
  label: string
}

export interface WorkCard {
  slug: string
  title: string
  period: string
  roleTag: string
  /** Where the work was done, shown above the title. */
  org: string
  /** The kind of work, for the accent colour. */
  track: Track
  /** Two or three words a recruiter scans for, shown as the card's pill. */
  role: string
  /** What the cover will show once it exists; read out for the placeholder. */
  visualNote: string
  /** The cover image, once it exists. */
  /** The thumbnail screenshot, shown whole on the card's tinted panel. With
   *  `video`, a muted looping clip plays over it while the card is on screen;
   *  `src` is then the clip's poster and must share its aspect ratio. */
  cover?: { src: string; alt: string; video?: string; width?: number; height?: number; tint: string }
  /** One line of plain text under the title. */
  line: string
  /** The sticky on the thumbnail: what to read this one for. */
  note?: string
  /** One measured outcome per card. */
  stats: [CardStat]
  status: 'coming-soon' | 'live'
  /** The page, once it exists. */
  href?: string
}

export interface Arc {
  id: string
  heading: string
  period: string
  thesis?: string
  cards: WorkCard[]
}

export const ARCS: Arc[] = [
  {
    id: 'discovery',
    heading: 'Data discovery',
    period: '2023–2026',
    cards: [
      {
        slug: 'search-2',
        org: 'Intuit',
        title: 'Rebuilding search for Intuit’s data catalog',
        period: '2024–2025',
        roleTag: 'Principal Product Designer',
        role: 'Principal Product Designer',
        track: 'ic',
        line:
          'Data workers were stitching together six tools to verify one table, because search returned millions of unranked results. After shadowing 20 of them and analysing 1,392 questions from the help channel, I redesigned search around physical object types, dynamic facets and strict trust signals.',
        visualNote: 'The redesigned search, rebuilt as a prototype with sample data.',
        cover: {
          // The rebuilt prototype with sample data (17 Nov 2026): the same
          // recording as the case study's hero, starting on the results.
          src: '/work/search-2/recreated/card-poster.jpg',
          video: '/work/search-2/recreated/card.mp4',
          width: 2560,
          height: 1396,
          tint: TINTS.platform2026,
          alt: 'A screen recording of the redesigned search, rebuilt as a prototype with sample data: results for “tax” on the Data Map tab, then the Tables tab, then a maturity level ticked in the filter column so the results narrow.',
        },
        stats: [{ value: '81.31% → 89.24%', label: 'Precision of the first result; P99 latency 50.59 s → 1.93 s; discovery time 14.2 h → 9.4 h' }],
        status: 'live',
        href: '/work/search-2',
      },
      {
        slug: 'agentic-discovery',
        org: 'Intuit',
        title: 'The evolution of the data agent at Intuit over three years',
        period: '2023–2026',
        roleTag: 'Principal Product Designer → Design Manager',
        role: 'Principal designer, then design manager',
        track: 'strategy',
        line:
          'From a copilot in a browser tab that turned questions into SQL, to an agent inside Cursor and Claude that reads a person’s Collections first and shows its query before it runs.',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        cover: {
          src: '/work/agentic-discovery/hero-poster.jpg',
          video: '/work/agentic-discovery/hero.mp4',
          tint: TINTS.neutral,
          width: 1340,
          height: 994,
          alt: 'The agent inside Cursor finding tables, writing a query and showing it before running it',
        },
        stats: [{ value: '45 min → 4 min', label: 'From a question to a verified answer' }],
        status: 'live',
        href: '/work/agentic-discovery',
      },
    ],
  },
  {
    id: 'platform',
    heading: 'The data platform',
    period: '2021–2026',
    cards: [
      {
        slug: 'catalog-data-map-lineage',
        org: 'Intuit',
        title: 'Founding designer of Intuit’s data catalog',
        period: '2021–2024',
        roleTag: 'Founding Product Designer → Principal → Design Manager',
        role: 'Senior → Principal Product Designer',
        track: 'ic',
        line:
          'From a list of tables to the place people judge data, trace it and get it.',
        visualNote: 'A data product page in the 2026 platform.',
        cover: {
          src: '/work/catalog-data-map-lineage/hero-poster.jpg',
          video: '/work/catalog-data-map-lineage/hero.mp4',
          tint: TINTS.platform2026,
          width: 1600,
          height: 872,
          alt: 'The data discovery platform: the home page, then a table page with its columns, owners and statistics',
        },
        stats: [{ value: '1,886 → 6,673', label: 'Monthly users, Jul 2023 to Mar 2026.' }],
        status: 'live',
        href: '/work/catalog-data-map-lineage',
      },
    ],
  },
  {
    id: 'early',
    heading: 'Before Intuit',
    period: '2017–2021',
    cards: [
      {
        slug: '605-tv-analytics',
        org: '605',
        title: '605: three analytics products for TV advertising',
        period: '2017–2021',
        roleTag: 'First Product Designer',
        role: 'Lead designer, the company’s first',
        track: 'ic',
        line:
          'Multi-audience reports, delivered in two months under a render-time constraint.',
        visualNote: 'The 605 Platform main dashboard.',
        cover: {
          src: '/work/605-tv-analytics/hero-poster.jpg',
          video: '/work/605-tv-analytics/hero.mp4',
          tint: TINTS.platform605,
          width: 1440,
          height: 820,
          alt: 'The 605 Platform main dashboard: networks by rating, household reach and time-shifted viewing',
        },
        stats: [{ value: '$2M booked', label: 'Additional revenue from pitches on the new designs.' }],
        status: 'live',
        href: '/work/605-tv-analytics',
      },
    ],
  },
]


// Copy from the tabbed landing mock (Landing01, 11 Nov 2026), with the content
// rules applied: sourced figures only, the promotion sentence as written,
// family-only personal line. Sources: lib/pages/leading-the-team.ts.

export const HERO = {
  /** The intro, between the mock's three sentences and the earlier three
   *  long paragraphs (11 Nov 2026). The hero sets every phrase in one style;
   *  `accent` only marks the key facts for the experimental pages. */
  intro: [
    [
      { text: 'I design ' },
      { text: 'data and AI tools', accent: true },
      { text: ', and I manage the designers who build them. I am a Principal Designer and Product Design Manager with ' },
      { text: '12+ years', accent: true },
      { text: ' in developer platforms, agentic AI and enterprise data systems, and I started as a backend software engineer.' },
    ],
    [
      { text: 'I joined Intuit in 2021 as the ' },
      { text: 'founding designer of its data catalog', accent: true },
      { text: ', the internal tool where about 6,600 people a month find, judge and get access to the company’s data. By 2026 I had designed or directed ' },
      { text: 'all seven product areas', accent: true },
      { text: ' of Intuit’s data platform: discovery, access, lineage, observability, data maturity, instrumentation and pipeline authoring. From August 2024 I also ' },
      { text: 'managed the platform’s design team', accent: true },
      { text: '.' },
    ],
    [
      { text: 'As a designer, I rebuilt search in Intuit’s data catalog, and first-result precision rose ' },
      { text: 'from 81.31% to 89.24%', accent: true },
      { text: '. I also wrote the rules for the data agent, an AI assistant that cut the time from a question to a verified answer ' },
      { text: 'from 45 minutes to 4', accent: true },
      { text: '. As a manager, I led three designers. Every designer who reported to me was promoted.' },
    ],
    [
      { text: 'Before Intuit I was the first product designer at 605, a TV advertising analytics company. I designed three analytics products there, and pitches that used the new designs brought ' },
      { text: '$2M in additional booked revenue', accent: true },
      { text: '.' },
    ],
  ],
}

/** Two talks the work was shown in, linked at the moment Intuit's segment
 *  starts (moved here from the catalog and data-agent case studies, 12 Nov
 *  2026). Thumbnails are YouTube's own frames. */
export const TALKS = [
  {
    id: 'reinvent-2025',
    kicker: 'On stage',
    title: 'AWS re:Invent 2025',
    text: 'Intuit showed the catalog I founded.',
    youtube: 'L_Q7LPB5HcA',
    href: 'https://www.youtube.com/watch?v=L_Q7LPB5HcA&t=1430',
  },
  {
    id: 'investor-day-2023',
    kicker: 'Presented by the CTO',
    title: 'Intuit Investor Day 2023',
    text: 'The data assistant I led design for.',
    youtube: 'kfpmtVe2OFY',
    href: 'https://youtu.be/kfpmtVe2OFY?t=2505',
  },
] as const

export const MANAGEMENT = {
  heading: 'Managing the designers behind Intuit’s enterprise data platform',
  text: 'From 2024 to 2026 I managed the product designers on Intuit’s enterprise data platform, and kept designing myself.',
  led: {
    statement: 'I did the work first, and my team followed.',
    items: [
      { title: 'I set the direction', text: 'I wrote the strategy for rebuilding search and the design rules for AI agents. My designers extended both into new areas.' },
      { title: 'I used the new tools before asking anyone else', text: 'Coded prototypes, AI research synthesis and AI-made videos, in my own design work. Every designer on my team adopted them.' },
      { title: 'I got two features onto the roadmap', text: 'A view of the queries others run on a table, and saved working sets of data. Nobody had asked for either. Both launched in 2025.' },
    ],
  },
  shipped: {
    // The mock's "22 launches in 2025, with one designer for every four
    // product managers" is not in the sources; the sourced line is used.
    statement: '24 launches from 2024 to 2026, with one designer for every 85 engineers.',
    lead: { label: 'Certified clean data', value: '<1% → 80%', before: 'Before: under 1%', after: 'After: 80%', text: 'of Intuit’s data estate, through guided certification workflows. A shared result.' },
    figures: [
      { value: '17 → 0', text: 'P0 and P1 incidents in tax year 2025, a shared result' },
      { value: '2–3 weeks → 3 days', text: 'to get access to a data stream; 61% auto-approved' },
      { value: '~4 hours → minutes', text: 'to find the root cause of a data incident' },
    ],
    areasHeading: 'Across four areas',
    areas: [
      { label: 'Access', text: 'Six launches in ten months. Access to a data stream went from 2–3 weeks to 3 days.' },
      { label: 'Incidents', text: 'Finding the root cause of a data incident went from about 4 hours to minutes.' },
      { label: 'Clean data', text: 'Certified clean data went from under 1% to 80%. A shared result, with the wider data design group.' },
      { label: 'Search', text: 'Search for streams and marketing data, where the first result is the right one.' },
    ],
  },
  managed: {
    statement: 'Five habits kept a small team shipping, and the people on it grew.',
    habits: [
      { lead: 'Design where the problem is defined.', text: 'I sat in the framing meetings, before requirements were written.' },
      { lead: 'One shared research base.', text: 'Visits, recordings, surveys and help threads in one place anyone could search.' },
      { lead: 'One intake list.', text: 'Every request through one door, so priority and staffing were weighed together.' },
      { lead: 'Decisions that get made.', text: 'When one stalled, I put engineering leads and product managers in one room.' },
      { lead: 'A six-slide promotion case.', text: 'One format every designer used to make their case.' },
    ],
    // The mock's promotion counts are replaced by the standing sentence.
    people: [
      { value: 'Intern → full-time', text: 'My summer 2023 intern, converted.' },
      { value: 'Every designer who reported to me was promoted', text: '' },
    ],
    quote: { text: '“… [two features] … would not have happened if not for Kanchi’s persistence and design sponsorship.”', who: 'Engineering manager, Intuit' },
  },
  link: { label: 'How I manage', href: '/#management' },
}

export const EXPERIENCE = [
  { org: 'Intuit', title: 'Product Design Manager', period: '2024–2026' },
  { org: 'Intuit', title: 'Senior, then Principal Product Designer', period: '2021–2024' },
  { org: '605', title: 'Lead designer, the company’s first', period: '2017–2021' },
] as const


export const INTUIT_CHAPTER = {
  eyebrow: 'Inside the Intuit chapter',
  heading: 'What I owned, and what I led the team through.',
  text: 'Two areas were mine end to end. Six more ran through my team as design manager, from instrumentation at the source to access control at the edge.',
  pill: { initial: 'K', text: 'Led design for the core Data Platform', meta: 'Intuit 2021–2026' },
  owned: {
    label: 'Personally owned',
    meta: 'hands-on',
    items: [
      {
        title: 'Data discovery',
        icon: 'search',
        tone: 'ic',
        text: 'Catalog & search, Data Map, plain-language assistant, lineage views, the agent in Cursor & Claude.',
        href: '#search-2',
      },
      {
        title: 'Platform design strategy',
        icon: 'compass',
        tone: 'strategy',
        text: 'Clean-data standard, fine-grained access model, and agentic AI & MCP workflows across the platform.',
        href: '#agentic-discovery',
      },
    ],
  },
  directed: {
    label: 'Directed the team across',
    meta: 'as design manager',
    items: [
      { title: 'Pipeline authoring', icon: 'workflow', text: 'Batch & stream' },
      { title: 'Observability', icon: 'activity', text: 'Quality checks, reliability & monitoring' },
      { title: 'Lineage', icon: 'git-fork', text: 'Upstream & downstream impact' },
      { title: 'Governance', icon: 'shield-check', text: 'Scoring, certification, standards' },
      { title: 'Fine-grained access control', icon: 'key-round', text: 'Requests, policies & approvals' },
      { title: 'Instrumentation', icon: 'chart-column', text: 'Event capture & data product onboarding' },
    ],
  },
} as const

/** How I manage, as one story in five chapters (16 Nov 2026, third pass):
 *  operating mechanisms, communication, practices, my own work, and impact
 *  with what I learned. The arc is Kanchi's management draft; a claim is kept
 *  only where the site's sources back it or she confirmed it herself that day
 *  (the Data 3.0 deck for the COO, the weekly 1:1 template, designers writing
 *  SQL and reading Amplitude, and the detail in the lessons). Written for a
 *  reader with no context: every product, tool and internal term is glossed
 *  at first use (her answers to eight questions, 16 Nov 2026). Site rules
 *  applied: seven areas, colleagues by role, the promotion sentence as
 *  written, 24 launches. `slot` names an artifact still to come: it shows as
 *  a labelled placeholder on localhost and never in a production build. */
export const HOW_I_MANAGE = {
  heading: 'How I manage',
  // The opening (16 Nov 2026): role, scope and outcomes lead, in place of the
  // 1 : 85 ratio. Kanchi's draft, with the seven areas, the promotion
  // sentence and the sourced launch count.
  role: 'Product Design Manager · Enterprise Data Platform · 2024–2026',
  opening: [
    // [[double brackets]] mark the outcomes the page runs a highlighter over.
    'From August 2024 to July 2026 I led product design for Intuit’s enterprise data platform as its Product Design Manager. The platform is where people at the company produce, certify, find and get access to its data. I managed three designers directly and two more indirectly, working with sixteen product managers.',
    '[[Every designer who reported to me was promoted.]] The platform’s wider design group, which included my team, shipped [[24 launches]] from 2024 to 2026. Its work contributed to two results shared with many other teams. The share of the company’s data certified to its clean-data standard, which rates data on five levels, grew [[from under 1% to 80%]] by November 2025. The most severe data incidents during tax season fell [[from 17 to 0]] in tax year 2025.',
    'I treated the platform’s seven product areas as one connected product.',
  ],
  // Each area with a few words on what it is, for a reader who has never
  // seen the platform (the wording is the Intuit chapter's).
  areas: [
    { name: 'Discovery', gloss: 'catalog and search' },
    { name: 'Access', gloss: 'requests and approvals' },
    { name: 'Lineage', gloss: 'what feeds a table' },
    { name: 'Observability', gloss: 'checks and monitoring' },
    { name: 'Data maturity', gloss: 'rating and certifying' },
    { name: 'Instrumentation', gloss: 'tracking product usage' },
    { name: 'Pipeline authoring', gloss: 'batch and real-time' },
  ],
  // The story (16 Nov 2026, fourth pass): six parts in the order things
  // happened, each in full, connected sentences, so the tab reads as one
  // account and not a list of facts. A `row` pairs paragraphs with the
  // pictures that prove them. The "before" is Kanchi's own answer: the process
  // she inherited was sound, product management grew fast and design did not.
  // Scale is designers to product managers (her answer): three designers with
  // twelve product managers, two more designers managed indirectly, sixteen
  // product managers in all. The 1 : 85 engineer ratio is not used here.
  parts: [
    {
      id: 'situation',
      label: 'The situation',
      heading: 'The product management team grew faster than the design team',
      rows: [
        {
          paras: [
            'I became the design manager for Intuit’s data platform in August 2024, after three years as the founding designer of its data catalog, where people find and judge data. The product management team had grown quickly to sixteen people, and the design team had not grown with it.',
          ],
        },
        {
          paras: [
            'Designers were pulled across unrelated areas, design was brought in after a problem had already been framed, and what we knew about the platform’s users sat in scattered notes. So I changed how work reached the designers, and when.',
          ],
        },
      ],
    },
    {
      id: 'visible',
      label: 'Making the work visible',
      heading: 'First, I made the work visible',
      // The part in three lines for a reader who skims: every word is from
      // the paragraphs below it.
      gist: {
        problem: 'Designers were pulled across unrelated product areas.',
        bet: 'I put every request into one tracker that every product manager could see, and gave each designer a fixed set of areas.',
        outcome: 'The designer for data access shipped six launches in ten months.',
      },
      rows: [
        {
          paras: [
            'Managing design across the whole platform meant replacing case-by-case coordination with a few fixed routines. The first was intake. Every design request came through one door into one tracker, a shared table of every design project with its status and designer, that every product manager could see, so priority and staffing were weighed in the open.',
            'The tracker also let me protect focus. Each designer owned a fixed set of product areas and was not moved between them. When leadership wanted the designer for data access to cover instrumentation, an unrelated area, as well, I said no, and that designer shipped six launches in ten months. When a decision stalled, I ran a resolution session: the product managers and the engineering leads in one room until the decision was made.',
          ],
          figure: {
            src: '/work/leading-the-team/tracker-2025.jpg',
            // The part of the screenshot worth reading, and its own colour behind it.
            tint: 'rgba(31,74,138,0.10)',
            zoom: '190%',
            at: '38% 70%',
            width: 2000,
            height: 1087,
            alt: 'The design project tracker: a table of design projects with their product area, status from backlog to shipped, status date, assigned designer and due date, and a link to the requirements document.',
            caption: 'The one tracker, 2025. Names blurred.',
          },
        },
        {
          paras: [
            'Technical users rarely sit for repeated interviews, so I had the team pool six months of research into one searchable research base: user visits, eight surveys and the questions people asked in Slack help channels, 2,890 tagged notes in all. Engineers and product managers pulled from it directly for their requirements and pitch decks.',
            'That evidence put two features on the roadmap that had not been on it: Query insights, a view of the queries other people run against a table, and Collections, a person’s saved working set of data. Both shipped in 2025. I kept the same rigour with the team itself. Every weekly 1:1 followed one template: blockers, shipping status, growth goals and career.',
          ],
          figure: {
            src: '/work/leading-the-team/marvin-2025.jpg',
            // The part of the screenshot worth reading, and its own colour behind it.
            tint: 'rgba(98,84,214,0.11)',
            zoom: '190%',
            at: '80% 26%',
            width: 2000,
            height: 1087,
            alt: 'The research repository: 2,890 notes from user visits, each tagged with its source meeting, with AI analysis across all of them.',
            caption: 'The shared research base in 2026, kept in Marvin, a research repository tool: 2,890 notes, each tagged with the session it came from.',
          },
          slots: ['The 1:1 template, with the names removed'],
        },
      ],
    },
    {
      id: 'upstream',
      label: 'Moving design upstream',
      heading: 'Then I moved design upstream',
      gist: {
        problem: 'Design was brought in after a problem had already been framed.',
        bet: 'I joined before the specification existed and wrote the design strategy the designers worked from.',
        outcome: 'Collections reached the roadmap and shipped in August 2025.',
      },
      rows: [
        {
          paras: [
            'With seven product areas and three designers, I had to settle the open questions early so the designers could get on with the design. So once intake was under control, I moved my own time into the early meetings where product managers and engineers frame a problem, before a specification exists. I also wrote the strategy the designers worked from. I had written the specification for Search 2.0, the rebuild of search in Intuit’s data catalog, in June 2024, two months before I became manager. I also wrote the design strategy for access to data and the rules for the data agent, an AI assistant inside Cursor and Claude that answers questions about the company’s data. My designers extended the search specification and the agent’s rules into new areas.',
            'I kept designing as well. I designed table search for Search 2.0, across 320,000 tables, and it shipped in November 2024. When a partner team lost its designer, I designed the screens for creating tables and schemas in Intuit’s developer portal, where engineers author pipelines and create services, and that design shipped.',
          ],
          link: { label: 'Read the Search 2.0 case study', href: '/work/search-2/', card: 'search-2' },
          figure: {
            // Her file (17 Nov 2026): the Ground rules section of her design
            // brief for AI chat in the data catalog, pages 2 and 3 joined.
            src: '/work/leading-the-team/agent-ground-rules.jpg',
            tint: 'rgba(0,107,190,0.10)',
            zoom: '100%',
            at: '50% 0%',
            width: 1080,
            height: 1450,
            alt: 'A page of a design brief headed Ground rules, "Decisions already made. Treat these as constraints", followed by a numbered list of rules for how AI chat behaves in the data catalog.',
            caption: 'The agent rules I wrote: the ground rules in my design brief for AI chat in the data catalog, decisions a designer treats as fixed.',
          },
        },
        {
          paras: [
            'Collections shows what joining early made possible. Twenty sessions I had led in April 2024, where people walked us through a recent time they looked for data, showed that three in four searches go back to data the person already knows: a working set of ten to fifteen vetted tables kept in spreadsheets and Slack bookmarks. A way to save that set was not on the roadmap, and engineering was sceptical of one.',
            'I used the research base to argue for it, and it went onto the roadmap for fiscal 2025, the year that began in August 2024, as private bookmarks plus the first way to share a set of tables with colleagues. Designers on my team shipped it on August 7, 2025, and it became the first thing the data agent reads before it searches.',
          ],
          link: { label: 'Read the data agent case study, which covers Collections', href: '/work/agentic-discovery/', card: 'agentic-discovery' },
          figure: {
            // Her file (17 Nov 2026): the first page of her Collections strategy document.
            src: '/work/leading-the-team/collections-strategy.jpg',
            tint: 'rgba(0,107,190,0.10)',
            zoom: '100%',
            at: '50% 0%',
            width: 1040,
            height: 1000,
            alt: 'The first page of a strategy document titled Collections + Genie + DevPortal: an Overview with a Problem section and a Solution section, and a diagram of three connected systems.',
            caption: 'The strategy document I wrote for the next version of Collections: the problem, and how a collection connects to access control and to a tool for asking questions in plain language.',
          },
        },
      ],
    },
    {
      id: 'practices',
      label: 'How the team worked',
      heading: 'I changed how the team worked',
      gist: {
        problem: 'A small team had to choose the right problems and move quickly on them.',
        bet: 'The designers sized each problem with data, prototyped in code, tested rough concepts, signed off each release and measured the result.',
        outcome: 'Development took 90% less time on the lineage redesign.',
      },
      rows: [
        {
          paras: [
            'A small team has to choose the right problems, so I pushed the designers to check a problem before building and to measure the outcome after shipping. They did not wait for an analyst. Before designing, they sized the problem with interviews, their own SQL against the platform’s logs, and funnels in Amplitude, a product analytics tool. After launch, they tracked how the feature was used and iterated on what they saw.',
          ],
          slots: ['A dashboard or a query one of the designers wrote'],
        },
        {
          paras: [
            'I went first on new tools. I built coded prototypes with Claude, Cursor, v0 and Figma and used AI to synthesise research in my own design work before I asked anyone else to. Every designer then adopted both. I also coached the designers to test rough concepts before engineering committed to building one.',
            'The redesign of lineage, the view of what feeds a table, shows these practices at work. After six user visits, a designer on my team tested seven concepts in a one-week sprint, and a summary list helped people find the cause of a data incident faster than a graph did. On the same redesign a designer on my team prototyped in code alongside the developers, and development took 90% less time. Finding the root cause of an incident went from about 4 hours to minutes. The designers added a practice of their own: a design sign-off before each release.',
          ],
          slots: ['A coded prototype beside the screen that shipped', 'The seven lineage concepts from the sprint'],
        },
      ],
    },
    {
      id: 'understood',
      label: 'Explaining the work',
      heading: 'I made sure the work was understood',
      gist: {
        problem: 'Platform changes are hard to explain, to the executives who fund them and to the people whose workflow changes.',
        bet: 'I wrote executive decks for the long-term direction, and we made a video for each launch and a walkthrough video before a workflow changed.',
        outcome: 'Engineering copied the video format for its own launches.',
      },
      rows: [
        {
          paras: [
            'Internal infrastructure is funded only when executives agree on the long-term architecture, so I wrote the decks that made the case. Data 3.0 was a multi-year vision for the data platform, presented to Intuit’s COO. In a second deck, on the state of data discovery, I framed Search 2.0 for cross-functional leadership as an architectural change rather than a UI refresh.',
            'For the engineering squads, I made concept models and rollout decks that showed what a platform change meant for their daily work.',
          ],
          // Her files (17 Nov 2026): a frame of the Data 3.0 deck, and a slide
          // of the walkthrough deck for a change to how access to data is granted.
          figures: [
            {
              src: '/work/leading-the-team/data-3-0-deck.jpg',
              tint: 'rgba(0,107,190,0.10)',
              zoom: '100%',
              at: '50% 50%',
              width: 1920,
              height: 1080,
              wide: true,
              alt: 'A title slide reading "Introducing Data 3.0. Not a tool. A contextual knowledge stack", with three small tags under it.',
              caption: 'The title slide of Data 3.0, the vision deck I presented to Intuit’s COO.',
            },
          ],
        },
        {
          paras: [
            'The people using the platform needed a different kind of explanation from a release note. I started making short AI-made videos, and the team took the practice up. Each launch got a video of what was new, starting with Collections, and engineering later copied the format for its own launches.',
            'Some changes to a workflow are hard to explain in words at all. For those we made a walkthrough video before the change arrived: when the tools for requesting access to data were merged into one, and when certification to level four of the five-level clean-data standard rolled out.',
          ],
          // The walkthrough deck sits with the paragraph about walkthroughs.
          figures: [
            {
              src: '/work/leading-the-team/access-walkthrough-deck.jpg',
              tint: 'rgba(0,107,190,0.10)',
              zoom: '100%',
              at: '50% 50%',
              width: 1920,
              height: 1080,
              wide: true,
              alt: 'A slide headed "Here’s what each of you will do", with four cards, one for each role: two for a project admin, one for a data steward and one for a data analyst, each with the one task that role has.',
              caption: 'A slide from the walkthrough deck for a change to how access to data is granted: what each role has to do.',
            },
          ],
        },
        {
          paras: [
            'I asked the designers to make the case for their own work as well. I wrote one six-slide format for a promotion case, from problem framing to executive storytelling, and each of them used it. One of the three had been my intern in summer 2023 and joined the team full time. Every designer who reported to me was promoted.',
          ],
          slides: [
            'Problem framing and scoping',
            'Research-driven rigour',
            'Execution and cross-functional partnership',
            'The multiplier effect on others',
            'Strategic courage and transparency',
            'Executive storytelling and impact demos',
          ],
        },
      ],
    },
  ],
  impact: {
    id: 'impact',
    label: 'What changed',
    heading: 'What changed, and what I learned',
    statement: 'The graph places the highlights of these two years against the product area each came from.',
    learnedHeading: 'What I learned',
    learned: [
      'Arguing against low-return work earned trust with engineering, but some of those debates ran long enough to slow decisions. I learned when to hold the line on the evidence and when to disagree and commit.',
      'I also learned when to walk away. I pushed for search that returns individual columns as well as tables, and engineering vetoed it over indexing complexity and latency. Accepting that early kept the team on work it could ship.',
    ],
  },
} as const

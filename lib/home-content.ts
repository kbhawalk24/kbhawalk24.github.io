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
        role: 'Principal designer',
        track: 'ic',
        line:
          'Data workers were stitching together six tools to verify one table, because search returned millions of unranked results. After shadowing 20 of them and analysing 1,392 help-channel questions, I redesigned search around physical object types, dynamic facets and strict trust signals.',
        visualNote: 'The Search 2.0 design for table results.',
        cover: {
          src: '/work/search-2/tables-tab-design.jpg',
          tint: TINTS.search2design,
          alt: 'The Search 2.0 design for table results, with tabs per object type, facets on the left and metadata on every result',
        },
        stats: [{ value: '81.31% → 89.24%', label: 'First-result precision; P99 latency 50.59 s → 1.93 s; discovery time 14.2 h → 9.4 h' }],
        status: 'live',
        href: '/work/search-2',
      },
      {
        slug: 'agentic-discovery',
        org: 'Intuit',
        title: 'Beyond the chatbot: designing the data discovery agent for Cursor and Claude',
        period: '2023–2026',
        roleTag: 'Principal Product Designer → Design Manager',
        role: 'Principal designer, then design manager',
        track: 'strategy',
        line:
          'Replaced a siloed web chat with an agent inside Cursor and Claude, backed by a person’s own Collections and a three-intent response specification, so engineers get a verified answer without leaving their editor.',
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
        title: 'Building the data discovery platform, 2021 to 2026',
        period: '2021–2026',
        roleTag: 'Founding Product Designer → Principal → Design Manager',
        role: 'Founding designer',
        track: 'ic',
        line:
          'Five years from a list of table names to the platform Intuit showed on stage at AWS re:Invent: signals to judge a table, the data product model, lineage in four weeks, self-service onboarding.',
        visualNote: 'A data product page in the 2026 platform.',
        cover: {
          src: '/work/catalog-data-map-lineage/hero-poster.jpg',
          video: '/work/catalog-data-map-lineage/hero.mp4',
          tint: TINTS.platform2026,
          width: 1600,
          height: 872,
          alt: 'The data discovery platform: the home page, then a table page with its columns, owners and statistics',
        },
        stats: [{ value: '1,886 → 6,673', label: 'People using the platform each month, Jul 2023 to Mar 2026, across 320,000 tables' }],
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
        title: 'Designing three TV analytics products at 605',
        period: '2017–2021',
        roleTag: 'First Product Designer',
        role: 'First designer',
        track: 'ic',
        line:
          'Three analytics products from first concept to launch, and the rule that made them work: design to the common case, not the limit.',
        visualNote: 'The 605 Platform main dashboard.',
        cover: {
          src: '/work/605-tv-analytics/hero-poster.jpg',
          video: '/work/605-tv-analytics/hero.mp4',
          tint: TINTS.platform605,
          width: 1440,
          height: 820,
          alt: 'The 605 Platform main dashboard: networks by rating, household reach and time-shifted viewing',
        },
        stats: [{ value: '$2M', label: 'Additional booked revenue from pitches on the new designs' }],
        status: 'live',
        href: '/work/605-tv-analytics',
      },
    ],
  },
  {
    id: 'team',
    heading: 'Leading the design team',
    period: '2024–2026',
    cards: [
      {
        slug: 'leading-the-team',
        org: 'Intuit',
        title: 'Leading the designers behind Intuit’s enterprise data platform',
        period: '2024–2026',
        roleTag: 'Design Manager',
        role: 'Design manager',
        track: 'management',
        line:
          'How I built one research repository in Marvin, one intake tracker and an AI prototyping culture across nine product areas, managing at one designer to 85 engineers.',
        visualNote: 'The design project tracker.',
        cover: {
          src: '/work/leading-the-team/tracker-2025.jpg',
          tint: TINTS.platform2026,
          width: 2000,
          height: 1087,
          alt: 'The design project tracker: every design request across nine product areas with its status and designer',
        },
        stats: [{ value: '1 : 85', label: 'Designer to engineer ratio I ran design at, across nine product areas' }],
        status: 'live',
        href: '/work/leading-the-team',
      },
    ],
  },
]


// The hero's words: the eyebrow with the name, the headline that says what
// she designs, one sentence of background and scale, two buttons.

export const HERO = {
  eyebrow: 'Hi, I am',
  name: 'Kanchi Bhawalkar',
  headline: { lead: 'I design', rest: 'data platforms and AI agents engineers trust' },
  subtitle: {
    before: 'Product designer and former backend engineer, twice the first designer, turning ambiguous data systems into tools engineers use every day. Most recently Intuit’s data platform: ',
    figures: '320,000 tables, 6,673 people a month',
    after: '.',
  },
  buttons: { work: 'See selected work', resume: 'Resume' },
}

// About, after Selected work: the paragraphs that used to open the site,
// the experience rows with the actual titles, the skills, the links.

export const ABOUT = {
  eyebrow: 'About',
  heading: 'Twice the first designer, once the manager',
  /** The intro: the fields are set in the accent colour. */
  intro: {
    before: 'I’m a product design leader with 12+ years of experience turning complex data infrastructure into tools people trust and use. I started as a backend software engineer, which means I’m happiest untangling messy systems, debating trade-offs with engineers, and designing ',
    fields: 'AI workflows that go deeper than a chat box',
    after: '.',
  },
  /** One paragraph per employer. */
  history: [
    {
      org: 'Intuit',
      before: 'Most recently at ',
      after: ', from 2021 to 2026, my work came in three parts:',
      /** The three phrases set in the accent colour match the three groups under Selected work. */
      pills: [{ label: 'data discovery' }, { label: 'the data platform' }, { label: 'leading the design team' }],
      tail: '. The platform had nine product areas and I designed, or directed the design of, every one: finding and understanding data, access, lineage, health monitoring, reliability, usage tracking, pipeline authoring, publishing and ingestion.',
    },
    {
      org: '605',
      before: 'Before that, at ',
      after: ', from 2017 to 2021, I designed three 0-to-1 TV analytics products that brought in more than $20M in new revenue.',
    },
  ],
  /** The actual titles, and one line of what each role shipped. Figures as on the resume and in private/source-kit.md. */
  experience: [
    {
      org: 'Intuit',
      title: 'Product Design Manager and principal IC',
      years: '2024 to 2026',
      what: 'Three designers across nine product areas and about 550 engineers. Wrote the agent’s answer specification and argued Collections onto the roadmap; the team shipped both.',
    },
    {
      org: 'Intuit',
      title: 'Principal Product Designer',
      years: '2024',
      what: 'Twenty observed sessions across nine business units that set the FY25 roadmap, and the Search 2.0 specification.',
    },
    {
      org: 'Intuit',
      title: 'Senior Product Designer',
      years: '2021 to 2024',
      what: 'Founding designer of the data catalog: the Data Map, lineage in four weeks, Data Copilot as sole design lead.',
    },
    {
      org: '605',
      title: 'Product Designer, first design hire',
      years: '2017 to 2021',
      what: 'Three TV analytics products from first concept to commercial launch, over $20M booked by 2021.',
    },
    {
      org: 'TIBCO Software',
      title: 'Software Developer',
      years: '2012 to 2015',
      what: 'Java back-end developer on an enterprise integration platform.',
    },
  ],
  skills: [
    'Agentic AI interaction design',
    'Human-AI trust patterns',
    'Object models and information architecture',
    'Data visualization',
    'Research-led strategy',
    'Prototyping in code',
    'Executive communication',
    'Design leadership',
  ],
  links: [
    { key: 'resume', label: 'Resume', href: '/kanchi-bhawalkar-resume.pdf', external: true },
    { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/kanchib', external: true },
    { key: 'timeline', label: 'Career timeline', href: '/timeline', external: false },
  ],
}

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
        text: 'Catalog and search, Data Map, Data Copilot, lineage views, the agent in Cursor and Claude.',
        href: '#search-2',
      },
      {
        title: 'Platform design strategy',
        icon: 'compass',
        tone: 'strategy',
        text: 'Clean-data standard, fine-grained access model, and agentic AI and tool-server workflows across the platform.',
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

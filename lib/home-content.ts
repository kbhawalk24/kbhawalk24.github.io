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
        visualNote: 'The Search 2.0 design for table results.',
        cover: {
          src: '/work/search-2/tables-tab-design.jpg',
          tint: TINTS.search2design,
          alt: 'The Search 2.0 design for table results, with tabs per object type, facets on the left and metadata on every result',
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
      { text: 'I’m a product design leader for ' },
      { text: 'data and AI tools', accent: true },
      { text: ', with ' },
      { text: '12+ years', accent: true },
      { text: ' shaping developer platforms, agentic AI and enterprise data systems.' },
    ],
    [
      { text: 'I was the ' },
      { text: 'founding designer of Intuit’s data platform', accent: true },
      { text: ' from 2021 to 2026, and designed or directed ' },
      { text: 'all seven of its product areas', accent: true },
      { text: ': discovery, access, lineage, observability, data maturity, instrumentation and pipeline authoring. I led search, then Data Copilot and the data agent, and from 2024 I was ' },
      { text: 'manager of its design team', accent: true },
      { text: '.' },
    ],
    [
      { text: 'Before that, at 605, I designed three analytics products for TV networks, and pitches using them brought ' },
      { text: '$2M in additional booked revenue', accent: true },
      { text: '. Before that, I was a backend software engineer.' },
    ],
  ],
}

/** Two talks the work was shown in. Placeholders until the links and
 *  thumbnails arrive: not shippable as they are. */
export const TALKS = [
  { kicker: 'On stage', title: 'AWS re:Invent 2025', text: 'Intuit showed the catalog I founded.' },
  { kicker: 'Presented by the CTO', title: 'Intuit Investor Day 2023', text: 'The data assistant I led design for.' },
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
  link: { label: 'Read the full case study', href: '/leadership' },
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

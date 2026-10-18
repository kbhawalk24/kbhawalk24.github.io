import type { Track } from '@/lib/timeline-data'

// The domain map beside the hero's about text: every area of Intuit's data
// platform the design group covered, 2021-2026, and who designed each one.
// `owner` reuses the timeline's three tracks and their colours:
//   ic          designed by me
//   strategy    my strategy or specification; designed by my team or the group
//   management  designed by my team
// Every detail line is drawn from the case study content.

export interface DomainArea {
  id: string
  label: string
  owner: Track
  years: string
  detail: string
}

export interface DomainGroup {
  id: string
  label: string
  areas: DomainArea[]
}

export const OWNER_LABEL: Record<Track, string> = {
  ic: 'Designed myself',
  strategy: 'My strategy, my team designed',
  management: 'My team designed',
}

/** The short tag shown inside each cell; the legend spells it out. */
export const OWNER_TAG: Record<Track, string> = {
  ic: 'Me',
  strategy: 'Strategy',
  management: 'Team',
}

export const DOMAIN_GROUPS: DomainGroup[] = [
  {
    id: 'find',
    label: 'Find and understand data',
    areas: [
      {
        id: 'catalog',
        label: 'Catalog & search',
        owner: 'ic',
        years: '2021–2024',
        detail: 'Home, search, browsing, trust flags, documentation and ownership; the 2024 search rebuild. The commercial catalog was retired in FY23.',
      },
      {
        id: 'data-map',
        label: 'Data Map',
        owner: 'ic',
        years: '2022–2023',
        detail: 'One entry per data product, with every physical copy nested beneath it: batch table, real-time stream, marketing copy.',
      },
      {
        id: 'assistant',
        label: 'Plain-language assistant',
        owner: 'ic',
        years: '2023',
        detail: 'Sixteen hackathon experiments consolidated into one chat flow; shipped in four months.',
      },
      {
        id: 'collections',
        label: 'Collections',
        owner: 'strategy',
        years: '2025',
        detail: 'A person’s saved working set of data. I argued for it as design strategy; my team designed it and shipped it on August 7, 2025.',
      },
      {
        id: 'agent',
        label: 'Agent in Cursor & Claude',
        owner: 'strategy',
        years: '2025–2026',
        detail: 'The strategy and the answer specification are mine; a designer on my team built the response patterns that shipped.',
      },
    ],
  },
  {
    id: 'trust',
    label: 'Trust data',
    areas: [
      {
        id: 'lineage',
        label: 'Lineage',
        owner: 'ic',
        years: '2023',
        detail: 'The first lineage view, on a four-week deadline; handed to my team in 2024, who rebuilt it for incident investigation.',
      },
      {
        id: 'quality',
        label: 'Clean-data certification',
        owner: 'strategy',
        years: '2025',
        detail: 'The standard was the platform organization’s. I set the design strategy for how it shows up, the same way everywhere; designers across the group designed it.',
      },
      {
        id: 'observability',
        label: 'Observability',
        owner: 'management',
        years: '2024–2026',
        detail: 'Monitoring of data health, designed by my team.',
      },
    ],
  },
  {
    id: 'get',
    label: 'Get and move data',
    areas: [
      {
        id: 'access',
        label: 'Access & governance',
        owner: 'management',
        years: '2024–2026',
        detail: 'Access requests, real-time streams, encrypted columns and automatic approval rules, designed by one designer on my team.',
      },
      {
        id: 'onboarding',
        label: 'Self-service onboarding',
        owner: 'ic',
        years: '2023–2024',
        detail: 'Marketing data onboarding, from one to two weeks to under 24 hours. The flow became the pattern for access and certification requests.',
      },
    ],
  },
  {
    id: 'separate',
    label: 'Separate products',
    areas: [
      {
        id: 'pipelines',
        label: 'Pipeline authoring',
        owner: 'management',
        years: '2024–2026',
        detail: 'Designed by my team.',
      },
      {
        id: 'analytics',
        label: 'Behavioral analytics',
        owner: 'management',
        years: '2024–2026',
        detail: 'Tracking of product usage, designed by my team.',
      },
    ],
  },
]

// Expertise as spans on one time axis. Years come from the roles in the
// about text: three years of back-end Java before 605 (Oct 2017), design
// from 605 onward, management from August 2024, designing for AI from the
// 2023 assistant on.
export interface ExpertiseSpan {
  id: string
  label: string
  from: number
  to: number
  note: string
}

export const EXPERTISE_AXIS = { from: 2014, to: 2026.5 }

export const EXPERTISE_SPANS: ExpertiseSpan[] = [
  { id: 'eng', label: 'Back-end engineering, Java', from: 2014.5, to: 2017.75, note: '3 years at TIBCO' },
  { id: 'design', label: 'Product design', from: 2017.75, to: 2026.5, note: '605, then Intuit' },
  { id: 'data', label: 'Data & analytics products', from: 2017.75, to: 2026.5, note: 'TV analytics, then the data platform' },
  { id: 'ai', label: 'Designing for AI & agents', from: 2023, to: 2026.5, note: 'Assistant, search, the agent' },
  { id: 'mgmt', label: 'Design management', from: 2024.6, to: 2026.5, note: 'Aug 2024 – Jul 2026' },
]

import type { Track } from '@/lib/timeline-data'

// The lifecycle band in the hero, between the about paragraph and the ask.
// Seven stages of Intuit's data lifecycle, each marked by how it was mine
// (designed myself, owned as the design manager, or outside design's
// scope), and two horizontal initiatives I set the strategy for, marked at
// the stages they touched. Stage names and descriptions are plain words;
// internal tool names stay off the site.

export type Involvement = Track | 'none'
export type InitiativeId = 'clean' | 'access'

export interface Stage {
  n: number
  name: string
  /** One line on what the stage covers, in plain words. */
  what: string
  mine: Involvement
  /** The products in this stage, spelled out; no internal names or short forms. */
  products: string[]
  initiatives: InitiativeId[]
}

export interface Initiative {
  id: InitiativeId
  label: string
  /** Rail mark shape, so the two differ by more than colour. */
  shape: 'circle' | 'square'
}

export const INVOLVEMENT_LABEL: Record<Involvement, string> = {
  ic: 'designed myself',
  management: 'owned as design manager',
  strategy: 'set the strategy',
  none: 'outside design’s scope',
}

export const STAGES: Stage[] = [
  {
    n: 1,
    name: 'Produce & instrument',
    what: 'Create data products, score and certify them, author the Data Map, instrument events',
    mine: 'management',
    products: ['Data product scoring and certification', 'Authoring tool for the Data Map', 'Guided onboarding for source data'],
    initiatives: ['clean', 'access'],
  },
  {
    n: 2,
    name: 'Move & ingest',
    what: 'Bring batch and real-time data into the lake',
    mine: 'management',
    products: ['Batch ingestion', 'Real-time stream materialization'],
    initiatives: ['access'],
  },
  {
    n: 3,
    name: 'Store & persist',
    what: 'Entity storage, managed databases, the event bus',
    mine: 'none',
    products: [],
    initiatives: ['access'],
  },
  {
    n: 4,
    name: 'Discover & access',
    what: 'Find data, trace it, request and provision access, the agent in coding tools',
    mine: 'ic',
    products: [
      'Catalog and search',
      'Data Map',
      'Plain-language assistant',
      'Lineage',
      'Access requests and control',
      'Collections',
      'The agent in Cursor and Claude',
    ],
    initiatives: ['clean', 'access'],
  },
  {
    n: 5,
    name: 'Process & derive',
    what: 'Build pipelines and derived tables',
    mine: 'management',
    products: ['Pipeline authoring, batch and stream'],
    initiatives: ['access'],
  },
  {
    n: 6,
    name: 'Test & ensure quality',
    what: 'Quality checks, reliability, monitoring',
    mine: 'management',
    products: ['Data quality checks', 'Data reliability and monitoring'],
    initiatives: ['clean', 'access'],
  },
  {
    n: 7,
    name: 'Consume & activate',
    what: 'Push clean data to marketing and business intelligence',
    mine: 'ic',
    products: ['Self-service marketing data onboarding', 'Business intelligence dashboards'],
    initiatives: ['clean', 'access'],
  },
]


export const INITIATIVES: Initiative[] = [
  { id: 'clean', label: 'Clean-data standard', shape: 'circle' },
  { id: 'access', label: 'Fine-grained access control', shape: 'square' },
]

/** The four rows of the matrix under the cards. Each is a yes-or-no per
 *  stage; the label is the legend. */
export interface MatrixRow {
  id: string
  label: string
  note: string
  tone: Track
  applies: (stage: Stage) => boolean
}

export const MATRIX_ROWS: MatrixRow[] = [
  { id: 'designed', label: 'Designed myself', note: '2021–2024', tone: 'ic', applies: (s) => s.mine === 'ic' },
  { id: 'owned', label: 'Owned as design manager', note: '2024–2026', tone: 'management', applies: (s) => s.mine !== 'none' },
  { id: 'clean', label: 'Clean-data standard', note: 'strategy mine', tone: 'strategy', applies: (s) => s.initiatives.includes('clean') },
  { id: 'access', label: 'Fine-grained access control', note: 'strategy mine, every stage', tone: 'strategy', applies: (s) => s.initiatives.includes('access') },
]

export const BAND = {
  heading: 'Led design and strategy for Intuit’s data platform, end to end',
  sub: '2021–2026 · the seven stages of the data lifecycle. In the grid below, a filled cell means the row applies to that stage.',
}

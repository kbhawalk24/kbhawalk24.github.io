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
  /** The handoff's fuller name for the wheel, with the object spelled out. */
  wheelName: string
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
    wheelName: 'Produce & instrument data',
    what: 'Create data products, score and certify them, author the Data Map, instrument events',
    mine: 'management',
    products: ['Data product scoring and certification', 'Authoring tool for the Data Map', 'Guided onboarding for source data'],
    initiatives: ['clean', 'access'],
  },
  {
    n: 2,
    name: 'Move & ingest',
    wheelName: 'Move & ingest data',
    what: 'Bring batch and real-time data into the lake',
    mine: 'management',
    products: ['Batch ingestion', 'Real-time stream materialization'],
    initiatives: ['access'],
  },
  {
    n: 3,
    name: 'Store & persist',
    wheelName: 'Store & persist data',
    what: 'Entity storage, managed databases, the event bus',
    mine: 'none',
    products: [],
    initiatives: ['access'],
  },
  {
    n: 4,
    name: 'Discover & access',
    wheelName: 'Discover & access data',
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
    wheelName: 'Process & derive data',
    what: 'Build pipelines and derived tables',
    mine: 'management',
    products: ['Pipeline authoring, batch and stream'],
    initiatives: ['access'],
  },
  {
    n: 6,
    name: 'Test & ensure quality',
    wheelName: 'Test & ensure data quality',
    what: 'Quality checks, reliability, monitoring',
    mine: 'management',
    products: ['Data quality checks', 'Data reliability and monitoring'],
    initiatives: ['clean', 'access'],
  },
  {
    n: 7,
    name: 'Consume & activate',
    wheelName: 'Consume & activate data',
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

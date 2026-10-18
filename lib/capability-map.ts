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
  /** Short name for tight layouts, and the tail that completes it. */
  short: string
  tail: string
  name: string
  what: string
  mine: Involvement
  /** The products in this stage that were mine or my team's, plain names. */
  products?: string
  /** A shorter list for the subway's narrow station labels. */
  productsShort?: string
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
  { n: 1, short: 'Produce', tail: '& instrument', name: 'Produce & instrument', what: 'Create, score and certify data products; author the Data Map', mine: 'management', products: 'Data product scoring & certification · Data Map authoring', productsShort: 'Scoring & certification, Data Map authoring', initiatives: ['clean', 'access'] },
  { n: 2, short: 'Move', tail: '& ingest', name: 'Move & ingest', what: 'Batch and real-time data into the lake', mine: 'management', products: 'Batch & real-time ingestion', initiatives: ['access'] },
  { n: 3, short: 'Store', tail: '& persist', name: 'Store & persist', what: 'Storage, managed databases, the event bus', mine: 'none', initiatives: ['access'] },
  { n: 4, short: 'Discover', tail: '& access', name: 'Discover & access', what: 'Find data, trace it, get access, the agent in coding tools', mine: 'ic', products: 'Catalog & search · Data Map · plain-language assistant · lineage · access requests · Collections · the agent in Cursor & Claude', productsShort: 'Catalog, search, Data Map, lineage, access, the agent', initiatives: ['clean', 'access'] },
  { n: 5, short: 'Process', tail: '& derive', name: 'Process & derive', what: 'Pipelines and derived tables', mine: 'management', products: 'Pipeline authoring', initiatives: ['access'] },
  { n: 6, short: 'Test', tail: '& quality', name: 'Test & ensure quality', what: 'Quality checks, reliability, monitoring', mine: 'management', products: 'Data quality · observability', initiatives: ['clean', 'access'] },
  { n: 7, short: 'Consume', tail: '& activate', name: 'Consume & activate', what: 'Clean data to marketing and BI', mine: 'ic', products: 'Self-service marketing data onboarding · BI', productsShort: 'Marketing data onboarding, BI', initiatives: ['clean', 'access'] },
]

/** The stage I designed myself for five years, shown large in layout 08. */
export const FOCUS = {
  index: 3,
  eyebrow: '4 · designed myself, then led',
}

export const INITIATIVES: Initiative[] = [
  { id: 'clean', label: 'Clean-data standard', shape: 'circle' },
  { id: 'access', label: 'Fine-grained access control', shape: 'square' },
]

/** Legend line for the initiatives: both were mine to set the strategy for. */
export const INITIATIVES_LEGEND = 'drove the strategy, across stages'

export const BAND = {
  heading: 'Led design and strategy for',
  sub: 'Intuit’s data platform, end to end · 2021–2026',
}

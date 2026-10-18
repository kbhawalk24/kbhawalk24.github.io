import type { LucideIcon } from 'lucide-react'
import { Crosshair, LayoutDashboard, TrendingUp } from 'lucide-react'
import type { Track } from '@/lib/timeline-data'

// The map beside the hero's about text. Section one: the end-to-end data
// lifecycle at Intuit, seven stages, each marked by how it was mine
// (designed myself, owned as the design manager, or outside design's
// scope), with two horizontal initiatives I set the strategy for drawn as
// rails down the side at the stages they touched. Section two: 605.
// Stage names and descriptions are plain words; internal tool names stay
// off the site.

export type Involvement = Track | 'none'

export interface Stage {
  n: number
  name: string
  what: string
  mine: Involvement
  /** Which horizontal initiatives touched this stage. */
  initiatives: InitiativeId[]
}

export type InitiativeId = 'clean' | 'access'

export interface Initiative {
  id: InitiativeId
  label: string
  /** Rail shape, so the two rails differ by more than colour. */
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
    what: 'Creating data products, scoring and certifying them, authoring the Data Map',
    mine: 'management',
    initiatives: ['clean'],
  },
  {
    n: 2,
    name: 'Move & ingest',
    what: 'Batch and real-time data into the lake',
    mine: 'management',
    initiatives: [],
  },
  {
    n: 3,
    name: 'Store & persist',
    what: 'Entity storage, managed databases, the event bus',
    mine: 'none',
    initiatives: [],
  },
  {
    n: 4,
    name: 'Discover & access',
    what: 'Finding data, tracing it, requesting access, the agent in coding tools',
    mine: 'ic',
    initiatives: ['clean', 'access'],
  },
  {
    n: 5,
    name: 'Process & derive',
    what: 'Pipelines and derived tables',
    mine: 'management',
    initiatives: ['access'],
  },
  {
    n: 6,
    name: 'Test & ensure quality',
    what: 'Quality checks, reliability, monitoring',
    mine: 'management',
    initiatives: ['clean'],
  },
  {
    n: 7,
    name: 'Consume & activate',
    what: 'Clean data to marketing and BI; self-service onboarding',
    mine: 'ic',
    initiatives: ['clean', 'access'],
  },
]

export const INITIATIVES: Initiative[] = [
  { id: 'clean', label: 'Clean-data standard', shape: 'circle' },
  { id: 'access', label: 'Fine-grained access control', shape: 'square' },
]

export interface Product {
  name: string
  icon: LucideIcon
}

export const BEFORE = {
  caption: 'Before Intuit · 605, 2017–2021',
  line: 'First product designer. Three TV advertising analytics products, concept to launch.',
  products: [
    { name: 'Platform', icon: LayoutDashboard },
    { name: 'Indxr', icon: Crosshair },
    { name: 'Impact', icon: TrendingUp },
  ] as Product[],
}

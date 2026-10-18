import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ArrowUpRight,
  Bot,
  Building2,
  ChartColumn,
  Compass,
  DatabaseZap,
  KeyRound,
  Map,
  Network,
  PenTool,
  Search,
  ShieldCheck,
  Tv,
  Users,
} from 'lucide-react'
import type { Track } from '@/lib/timeline-data'

// The capability map beside the hero's about text: three branches a reader
// can scan in a few seconds. Where the work was (Intuit in two layers, then
// 605), what I am good at as a designer, and how I manage. Tones reuse the
// timeline's track colours: ic = designed myself, management = owned as the
// design manager (my team designed), strategy = craft.

export interface Leaf {
  label: string
  icon: LucideIcon
  /** The full list behind a summarised leaf, shown on hover and focus. */
  detail?: string
}

export interface LeafGroup {
  caption?: string
  tone: Track
  leaves: Leaf[]
}

export interface Branch {
  id: string
  label: string
  icon: LucideIcon
  tone: Track
  groups: LeafGroup[]
}

export const BRANCHES: Branch[] = [
  {
    id: 'where',
    label: 'Where',
    icon: Building2,
    tone: 'ic',
    groups: [
      {
        caption: 'Designed myself · Intuit, 2021–2024',
        tone: 'ic',
        leaves: [
          { label: 'Catalog, search, Data Map', icon: Search },
          { label: 'Assistant, lineage, onboarding', icon: Network },
          { label: 'Platform design strategy', icon: Compass },
        ],
      },
      {
        caption: 'Owned as design manager · 2024–2026',
        tone: 'management',
        leaves: [
          {
            label: 'Discovery, Collections, the agent',
            icon: Bot,
            detail: 'Search and the Data Map, Collections, the plain-language assistant, and the agent in Cursor and Claude.',
          },
          {
            label: 'Access, lineage, observability',
            icon: KeyRound,
            detail: 'Access requests and fine-grained access control, governance, lineage, and monitoring of data health.',
          },
          {
            label: 'Clean data, pipelines, analytics',
            icon: ShieldCheck,
            detail: 'The clean-data and data maturity program, pipeline authoring, and behavioral analytics.',
          },
        ],
      },
      {
        caption: 'Before · 605, 2017–2021',
        tone: 'ic',
        leaves: [{ label: 'TV and ad analytics products', icon: Tv }],
      },
    ],
  },
  {
    id: 'craft',
    label: 'Craft',
    icon: PenTool,
    tone: 'strategy',
    groups: [
      {
        tone: 'strategy',
        leaves: [
          { label: 'Search and discovery over very large data', icon: DatabaseZap },
          { label: 'Rules for how AI agents answer and earn trust', icon: Bot },
          { label: 'Data visualization under hard constraints', icon: ChartColumn },
        ],
      },
    ],
  },
  {
    id: 'manage',
    label: 'How I manage',
    icon: Users,
    tone: 'management',
    groups: [
      {
        tone: 'management',
        leaves: [
          { label: 'Upstream, where problems get defined', icon: ArrowUpRight },
          { label: 'Player-coach on the hardest piece', icon: Activity },
        ],
      },
    ],
  },
]

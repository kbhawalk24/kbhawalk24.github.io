import type { LucideIcon } from 'lucide-react'
import { Bot, Building2, Compass, KeyRound, Layers, Map, MessageSquare, Network, Search, ShieldCheck } from 'lucide-react'
import type { Track } from '@/lib/timeline-data'

// The capability map beside the hero's about text: two branches a reader
// can scan in a few seconds. What I owned across Intuit's data platform, in
// two layers (designed myself, then owned as the design manager), and the
// design strategy I set. Tones reuse the timeline's track colours:
// ic = designed myself, management = owned as manager, strategy = strategy.

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
    id: 'owned',
    label: 'Owned',
    icon: Building2,
    tone: 'ic',
    groups: [
      {
        caption: 'Designed myself · Intuit, 2021–2024',
        tone: 'ic',
        leaves: [
          { label: 'Catalog, search, Data Map', icon: Search },
          { label: 'Plain-language assistant', icon: MessageSquare },
          { label: 'Lineage, self-service onboarding', icon: Network },
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
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy focus',
    icon: Compass,
    tone: 'strategy',
    groups: [
      {
        caption: 'The bets I set for the platform',
        tone: 'strategy',
        leaves: [
          { label: 'Discovery inside the coding tools, not a chat window', icon: Bot },
          { label: 'Collections as the agent’s context layer', icon: Layers },
          { label: 'Data organized by business meaning', icon: Map },
          { label: 'Certification that looks the same everywhere', icon: ShieldCheck },
        ],
      },
    ],
  },
]

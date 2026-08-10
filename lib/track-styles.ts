import type { Track } from '@/lib/timeline-data'

// Single source of truth for track color tokens. Previously duplicated
// (with different field names) across career-timeline.tsx and
// case-study-panel.tsx — both now import from here.
export const trackStyles: Record<
  Track,
  {
    /** Solid dot / underline fill */
    dot: string
    /** Compact badge chip: tinted background + border + text */
    badge: string
    /** Filter chip when actively selected */
    chipActive: string
    /** Left border / underline accent */
    accentBorder: string
    /** Track-colored text (metrics, step numbers) */
    accentText: string
  }
> = {
  management: {
    dot: 'bg-track-management',
    badge:
      'bg-track-management/10 text-track-management border-track-management/25',
    chipActive:
      'bg-track-management text-track-management-foreground border-track-management',
    accentBorder: 'border-track-management',
    accentText: 'text-track-management',
  },
  strategy: {
    dot: 'bg-track-strategy',
    badge:
      'bg-track-strategy/10 text-track-strategy border-track-strategy/25',
    chipActive:
      'bg-track-strategy text-track-strategy-foreground border-track-strategy',
    accentBorder: 'border-track-strategy',
    accentText: 'text-track-strategy',
  },
  ic: {
    dot: 'bg-track-ic',
    badge: 'bg-track-ic/10 text-track-ic border-track-ic/25',
    chipActive: 'bg-track-ic text-track-ic-foreground border-track-ic',
    accentBorder: 'border-track-ic',
    accentText: 'text-track-ic',
  },
}

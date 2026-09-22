import type { Track } from '@/lib/timeline-data'

// Single source of truth for track color tokens. Previously duplicated
// (with different field names) across career-timeline.tsx and
// case-study-panel.tsx — both now import from here.
export const trackStyles: Record<
  Track,
  {
    /** Solid dot / underline fill */
    dot: string
    /** Same badge, no border — for the borderless timeline cards */
    badgeFlat: string
    /** Filter chip when actively selected */
    chipActive: string
    /** Track-colored text (metrics, step numbers) */
    accentText: string
  }
> = {
  management: {
    dot: 'bg-track-management',
    badgeFlat: 'bg-track-management/10 text-track-management',
    chipActive:
      'bg-track-management text-track-management-foreground border-track-management',
    accentText: 'text-track-management',
  },
  strategy: {
    dot: 'bg-track-strategy',
    badgeFlat: 'bg-track-strategy/10 text-track-strategy',
    chipActive:
      'bg-track-strategy text-track-strategy-foreground border-track-strategy',
    accentText: 'text-track-strategy',
  },
  ic: {
    dot: 'bg-track-ic',
    badgeFlat: 'bg-track-ic/10 text-track-ic',
    chipActive: 'bg-track-ic text-track-ic-foreground border-track-ic',
    accentText: 'text-track-ic',
  },
}

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
    /** Same badge, no border — for the borderless timeline cards */
    badgeFlat: string
    /** Filter chip when actively selected */
    chipActive: string
    /** Track-colored ambient shadow tint on the borderless double-bezel
     *  cards (career-timeline, case-preview). */
    accentGlow: string
    /** Track-colored text (metrics, step numbers) */
    accentText: string
  }
> = {
  management: {
    dot: 'bg-track-management',
    badge:
      'bg-track-management/10 text-track-management border-track-management/25',
    badgeFlat: 'bg-track-management/10 text-track-management',
    chipActive:
      'bg-track-management text-track-management-foreground border-track-management',
    accentGlow: 'shadow-track-management/25',
    accentText: 'text-track-management',
  },
  strategy: {
    dot: 'bg-track-strategy',
    badge:
      'bg-track-strategy/10 text-track-strategy border-track-strategy/25',
    badgeFlat: 'bg-track-strategy/10 text-track-strategy',
    chipActive:
      'bg-track-strategy text-track-strategy-foreground border-track-strategy',
    accentGlow: 'shadow-track-strategy/25',
    accentText: 'text-track-strategy',
  },
  ic: {
    dot: 'bg-track-ic',
    badge: 'bg-track-ic/10 text-track-ic border-track-ic/25',
    badgeFlat: 'bg-track-ic/10 text-track-ic',
    chipActive: 'bg-track-ic text-track-ic-foreground border-track-ic',
    accentGlow: 'shadow-track-ic/25',
    accentText: 'text-track-ic',
  },
}

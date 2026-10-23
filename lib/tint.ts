import type { CSSProperties } from 'react'

/** Colours sampled from the prototypes themselves. The panel behind a
 *  prototype, screenshot or clip always takes the prototype's own colour. */
export const TINTS = {
  dde2023: '#008481', // Data Discovery 2023 designs and Data Copilot: header teal
  platform2026: '#006bbe', // the 2026 data discovery platform: primary button blue
  platform605: '#8745c6', // 605 Platform: brand purple
  neutral: '#6b7280', // Cursor and other greyscale tools
} as const

/** A soft gradient panel in the prototype's colour, readable in both themes. */
export function tintPanel(tint: string): CSSProperties {
  return {
    backgroundImage: `linear-gradient(160deg, color-mix(in oklab, ${tint} 7%, var(--card)) 0%, color-mix(in oklab, ${tint} 20%, var(--card)) 100%)`,
  }
}

/** Text in the prototype's colour. Mixed with the foreground so it stays
 *  readable on light and dark cards. */
export function tintText(tint: string): CSSProperties {
  return { color: `color-mix(in oklab, ${tint} 82%, var(--foreground))` }
}

/** A pill in the prototype's colour. */
export function tintPill(tint: string): CSSProperties {
  return { ...tintText(tint), backgroundColor: `color-mix(in oklab, ${tint} 12%, var(--card))` }
}

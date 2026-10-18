/**
 * The shape of a case study page. Every /work page is one of these,
 * authored in content/work/<slug>.ts from BRIEF.md and rendered by
 * components/case-study-page.tsx in the brief's seven-section order:
 *
 *   1. summary   2. impact viz   3. primer   4. problem
 *   5. decisions (3-5)   6. outcome table   7. what I would do differently
 *   8. credits   then the colophon line.
 *
 * Extra narrative sections a page needs (a model, a closing arc, the
 * team's own initiatives) go in `sections` and render between the
 * decisions and the outcome table, in the order given.
 */

export interface VisualSlotSpec {
  id: string
  caption: string
  /** Required: what the image will show, for readers without images. */
  alt: string
  /** CSS aspect ratio, e.g. "16 / 9". */
  aspect?: string
  kind?: 'image' | 'video' | 'viz'
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; columns: string[]; rows: string[][]; caption?: string }
  /** Label / value pairs, for the product summaries on the 605 page. */
  | { type: 'kv'; rows: [string, string][] }
  | { type: 'visual'; visual: VisualSlotSpec }

export interface Section {
  id: string
  heading: string
  /** The italic line under a decision heading: dates and whose work. */
  meta?: string
  blocks: Block[]
}

export interface OutcomeRow {
  figure: string
  date: string
  source: string
  /** "Whose" on the Intuit pages, "Note" on the 605 page. */
  whose: string
}

export interface CaseStudy {
  slug: string
  href: string
  title: string
  /** One line under the title before the summary block, if any. */
  intro?: string
  summary: {
    role: string
    where?: string
    what: string
    /** Extra lines in the summary block, e.g. what the team covered. */
    extra?: Block[]
    /** The headline measurements with their dates. */
    measured?: { lead?: string; columns: string[]; rows: string[][]; after?: string }
    hero: VisualSlotSpec
  }
  /** The id of the page's impact visualization (components/impact). */
  impactId: 'fd-impact' | 'bp-impact' | 'tw-impact' | 's6-impact'
  primer?: Section
  problem?: Section
  decisions: Section[]
  sections?: Section[]
  outcomes: { whoseLabel: 'Whose' | 'Note'; rows: OutcomeRow[] }
  /** null while the passage is still a draft in content/drafts/pending.md. */
  differently: string[] | null
  credits: string[]
}

export const COLOPHON = 'Where AI was used on this page, and where I overruled it: [to write].'

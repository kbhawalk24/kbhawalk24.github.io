// The short case study page: about 450 words at Principal and Manager
// depth, framed by a System Context Bar at the top and a handoff to the
// next page at the bottom. One file per page under lib/pages/.

export interface PageStat {
  value: string
  label: string
}

export interface ContextStep {
  label: string
  /** Set once that page exists; until then the step is plain text. */
  href?: string
}

export interface SystemContext {
  /** One sentence: what this page is part of, with the scale figures. */
  system: string
  steps: ContextStep[]
  /** Index into steps of the page the reader is on. */
  current: number
}

export interface InlineLink {
  /** The exact phrase in the text to link, first occurrence. */
  text: string
  href: string
}

export type Block =
  | { type: 'p'; text: string; links?: InlineLink[] }
  | { type: 'list'; items: { lead: string; text: string }[] }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'video'; youtube: string; start?: number; title: string; caption: string; href: string }

export interface PageSection {
  id: string
  heading: string
  blocks: Block[]
}

/** One cell of the facts block under the context bar. */
export interface PageFact {
  label: string
  value: string
}

export interface PageVisual {
  id: string
  /** Path under /public once the file exists, e.g. /work/605-tv-analytics/platform.png. Absent: a placeholder renders. */
  src?: string
  /** Intrinsic size, for layout before the file loads. Placeholders use 16:10. */
  width?: number
  height?: number
  kind?: 'image' | 'video'
  /** What a person who cannot see the image needs to know. */
  alt: string
  /** The one-sentence caption under the figure. */
  caption: string
  /** Where it sits: under the stats when absent, else after this section id. */
  after?: string
  /** For a placeholder: what to export and from where. Not rendered. */
  todo?: string
}

export interface NextHandoff {
  /** Two sentences: what this work left open, and what the next page shows. */
  text: string
  label: string
  /** Set once the next page exists. */
  href?: string
}

export interface ShortPage {
  slug: string
  href: string
  title: string
  roleTag: string
  period: string
  /** Metadata description and the summary line under the title. */
  description: string
  context: SystemContext
  /** Duration, role, team as roles, research. Four short cells. */
  facts?: PageFact[]
  stats: PageStat[]
  /** Screens, diagrams, recordings; 4 to 6 per page, every one captioned. */
  visuals?: PageVisual[]
  sections: PageSection[]
  next: NextHandoff
  credits: string
  sources: string
}

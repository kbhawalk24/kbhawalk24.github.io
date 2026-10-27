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
  /** A persona statement in the workshop format: I am, trying to, but, because. */
  | { type: 'statement'; who: string; rows: { label: string; text: string }[] }
  /** Exact words from research or feedback, credited by role and date. */
  | { type: 'quotes'; items: { text: string; who: string; when?: string }[] }
  /** Three or four short cards in a row: insights, outcomes, learnings. */
  | { type: 'cards'; items: { title: string; text: string; value?: string }[] }
  /** What the evidence said, beside what I decided and what it cost. */
  | { type: 'tension'; items: { tension: string; decision: string; image?: { src: string; width: number; height: number; alt: string } }[] }
  /** A path through stages, each with the tools it ran through, one thing
   *  someone said (credited by role) and, where known, how long it took. */
  | { type: 'steps'; caption?: string; items: { title: string; tools: string; quote?: string; who?: string; time?: string }[] }
  /** Three or four small muted looping clips in a row, each with a title and one line: a behaviour shown rather than described. */
  | { type: 'clips'; caption?: string; items: { src: string; width: number; height: number; title: string; text: string; alt: string }[] }

export interface PageSection {
  id: string
  /** The small label above the heading, e.g. THE RESEARCH. */
  eyebrow?: string
  /** Short name for the contents rail; the heading is used when absent. */
  short?: string
  /** A claim, not a description. */
  heading: string
  blocks: Block[]
}

/** One cell of the facts block under the context bar. */
export interface PageFact {
  label: string
  value: string
}

/** A short muted prototype clip that opens the page, under the title. */
export interface PageHero {
  src: string
  poster: string
  /** A still design frame instead of a clip: `src` is the image, no controls. */
  still?: boolean
  width: number
  height: number
  /** What the clip shows, for people who cannot see it. */
  alt: string
  caption: string
  /** The prototype's own colour, for the panel around the clip (see lib/tint). */
  tint: string
}

export interface PageVisual {
  id: string
  /** Path under /public once the file exists, e.g. /work/605-tv-analytics/platform.png. Absent: a placeholder renders. */
  src?: string
  /** Intrinsic size, for layout before the file loads. Placeholders use 16:10. */
  width?: number
  height?: number
  kind?: 'image' | 'video'
  /** A Figma prototype embed URL. Shown live only when `interactive` is true,
   *  which needs the file shared as anyone with the link can view. */
  prototype?: { embed: string; interactive: boolean }
  /** What a person who cannot see the image needs to know. */
  alt: string
  /** The one-sentence caption under the figure. */
  caption: string
  /** Span the full measure even when it shares a section with other visuals. */
  full?: boolean
  /** Open the section: render between the heading and the first block. */
  lead?: boolean
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
  hero?: PageHero
  visuals?: PageVisual[]
  sections: PageSection[]
  next: NextHandoff
  /** Kept in the data as a record; no longer rendered on the page. */
  credits?: string
  sources?: string
}

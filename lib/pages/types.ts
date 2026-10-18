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

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: { lead: string; text: string }[] }

export interface PageSection {
  id: string
  heading: string
  blocks: Block[]
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
  stats: PageStat[]
  sections: PageSection[]
  next: NextHandoff
  credits: string
  sources: string
}

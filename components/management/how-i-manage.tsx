'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { event } from '@/lib/analytics'
import { useActiveSection } from '@/components/section-nav'
import { HOW_I_MANAGE } from '@/lib/home-content'
import { StageGraph } from './stage-graph'
import { PartDiagram } from './diagrams'
import { Sketch, drawAreas, drawLifecycle, drawSlide, drawSlot } from './sketch'

// "How I manage" on the homepage's Management tab: one story in six parts, in
// the order things happened (16 Nov 2026, fourth pass). Each part is a plain
// heading and connected paragraphs in full sentences; the real artifacts sit
// beside the paragraph they prove, and the last part is the lineage graph and
// what she learned. No lists of bold facts: Kanchi asked for a story.
// From lg up a Contents card on the right, the same one the case studies have,
// names the parts, marks the one being read and jumps to any of them; it
// scrolls, it does not swap panels, and it never sets the hash (which names
// the open tab).
// A row's `slots` are artifacts still to come. They show as small dashed
// markers on localhost only, so an empty slot can never reach the live site.

const H = HOW_I_MANAGE
const PARTS = [...H.parts.map((c) => ({ id: c.id, label: c.label })), { id: H.impact.id, label: H.impact.label }]
const SHOW_SLOTS = process.env.NODE_ENV !== 'production'

// Type, one scale under the page header (the name is 56px, heavy):
//   24  a part's heading                   League Spartan 600
//   20  a sub-heading                      League Spartan 600
//   18  the story's sentences              Mulish 400, 1.65 leading
//   14  captions and diagram labels        Mulish, muted
//   16  a part's problem, bet and outcome   Mulish 400
//   11  "Before", "After" and the three    the site's mono micro label
//       labels over a part's gist
// Nothing is bold inside a paragraph, and no size is used for two jobs.
const PART = 'font-heading text-[22px] font-semibold leading-[1.15] tracking-[-0.015em] text-foreground md:text-2xl'
const SUB = 'font-heading text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground'
const PROSE = 'font-sans text-[17px] leading-[1.65] text-[#33332f] md:text-lg md:leading-[1.65]'
const CAPTION = 'mt-3 font-sans text-sm leading-[1.45] text-muted-foreground'

type Fig = { src: string; width: number; height: number; alt: string; caption: string; tint: string; zoom: string; at: string; wide?: boolean }
type Row = {
  paras: readonly string[]
  figure?: Fig
  /** More than one artifact under the same paragraphs, stacked. */
  figures?: readonly Fig[]
  slides?: readonly string[]
  slots?: readonly string[]
  link?: { label: string; href: string; card: string }
}

/** An artifact, large and plain: the screenshot zoomed to the part worth
 *  reading, flat on a white card. No device frame, tint or tilt, so the
 *  interface itself is what the reader sees. */
function Artifact({ f }: { f: Fig }) {
  return (
    <figure>
      <div
        role="img"
        aria-label={f.alt}
        className={`overflow-hidden rounded-xl bg-white bg-no-repeat shadow-soft ring-1 ring-foreground/[9%] ${f.wide ? '' : 'aspect-[4/3]'}`}
        style={{ backgroundImage: `url(${f.src})`, backgroundSize: `${f.zoom} auto`, backgroundPosition: f.at, aspectRatio: f.wide ? `${f.width} / ${f.height}` : undefined }}
      />
      <figcaption className={CAPTION}>{f.caption}</figcaption>
    </figure>
  )
}

/** Where an artifact will go. Localhost only. */
function Slot({ label }: { label: string }) {
  if (!SHOW_SLOTS) return null
  return (
    <p className="relative flex items-start gap-2.5 px-3.5 py-2.5 font-sans text-sm leading-[1.4] text-accent-brand">
      <Sketch w={400} h={120} draw={drawSlot} stretch seed={label.length} className="absolute inset-0 size-full" />
      <Plus aria-hidden="true" className="relative mt-0.5 size-4 flex-none" />
      <span className="relative">
        <span className="font-bold">Artifact to add:</span> {label}. Hidden on the live site.
      </span>
    </p>
  )
}

function Slides({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s} className={`relative flex min-h-[5.25rem] flex-col justify-between gap-2 px-3.5 py-3 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
          <Sketch w={160} h={100} draw={drawSlide} stretch seed={40 + i} className="absolute inset-0 size-full" />
          <span className="relative font-heading text-lg font-semibold leading-none tabular-nums text-accent-brand">{i + 1}</span>
          <span className="relative font-sans text-sm font-semibold leading-[1.25] text-foreground">{s}</span>
        </li>
      ))}
    </ol>
  )
}

/** The opening paragraph, with a highlighter run over each [[marked]] outcome. */
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/\[\[|\]\]/).map((part, i) =>
        i % 2 ? (
          <mark key={i} className="bg-transparent bg-[linear-gradient(transparent_58%,#c9dbf8_58%,#c9dbf8_94%,transparent_94%)] box-decoration-clone px-0.5 font-medium text-foreground">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

/** A stretch of the story: its paragraphs, then the artifact that proves
 *  them, large. */
function StoryRow({ row, paired }: { row: Row; paired: boolean }) {
  return (
    // Two rows of the part's grid, shared with the stretch beside it, so the
    // artifacts start on one line however long each paragraph runs.
    <div className={`flex flex-col gap-5 ${paired ? 'md:row-span-2 md:grid md:grid-rows-subgrid md:gap-y-6' : ''}`}>
      <div className="flex flex-col gap-4">
        {row.paras.map((t) => (
          <p key={t} className={PROSE}>
            {t}
          </p>
        ))}
        {row.link && (
          <Link
            href={row.link.href}
            {...event('work-card', { card: row.link.card, via: 'read' })}
            className="inline-flex min-h-11 items-center gap-2 self-start font-sans text-base font-semibold text-accent-brand hover:underline"
          >
            {row.link.label} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      {/* Kept when empty from md up in a part that has pictures, where it
          holds the shared row; left out of a part with none. */}
      <div className={`flex-col gap-4 ${row.figure || row.figures || row.slides || (SHOW_SLOTS && row.slots?.length) ? 'flex' : paired ? 'hidden md:flex' : 'hidden'}`}>
        {row.figure && <Artifact f={row.figure} />}
        {row.figures?.map((f) => <Artifact key={f.src} f={f} />)}
        {row.slides && <Slides steps={row.slides} />}
        {row.slots?.map((s) => <Slot key={s} label={s} />)}
      </div>
    </div>
  )
}

export function HowIManage() {
  // The same marker the case studies' Contents card uses.
  const current = useActiveSection(PARTS.map((p) => `manage-${p.id}`)).replace('manage-', '')

  const go = (id: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(`manage-${id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_10rem] lg:gap-8 xl:gap-10">
      <aside className="mb-8 lg:col-start-2 lg:row-start-1 lg:mb-0">
        <div className="lg:sticky lg:top-28 lg:rounded-[14px] lg:bg-card lg:p-5 lg:shadow-soft">
          <nav aria-label="Contents" className="w-full max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] lg:overflow-visible">
            <p className="label-micro hidden text-muted-foreground lg:block">Contents</p>
            <ol className="flex w-max gap-2 lg:mt-3 lg:block lg:w-auto lg:border-l lg:border-foreground/10">
              {PARTS.map((p) => {
                const on = p.id === current
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      aria-current={on ? 'location' : undefined}
                      onClick={() => go(p.id)}
                      {...event('management', { item: `story-${p.id}` })}
                      className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-left font-sans text-sm transition-colors lg:-ml-px lg:flex lg:w-full lg:whitespace-normal lg:rounded-none lg:border-l-2 lg:bg-transparent lg:py-1.5 lg:pl-4 lg:pr-2 lg:leading-snug lg:hover:bg-transparent ${
                        on
                          ? 'bg-primary font-semibold text-primary-foreground lg:border-accent-brand lg:text-foreground'
                          : 'bg-card-soft text-foreground hover:bg-card lg:border-transparent lg:text-muted-foreground lg:hover:border-foreground/25 lg:hover:text-foreground'
                      }`}
                    >
                      {p.label}
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      </aside>

      <div className="min-w-0 lg:col-start-1 lg:row-start-1">
        {/* The opening: role, the platform and its scale, the outcomes, then
            the seven areas as stops on one line. */}
        {/* No visible heading here (she removed it, 16 Nov 2026): the open tab
            already says Management, and the first paragraph says the rest. */}
        <h2 className="sr-only">Management</h2>
        <div className="flex flex-col gap-4">
          {H.opening.map((t) => (
            <p key={t} className={PROSE}>
              <Marked text={t} />
            </p>
          ))}
        </div>
        {/* The seven areas as stations on one drawn line: a small picture of
            each, its name and a few words on what it is. On a phone they are
            a list, each picture beside its name. */}
        <div className="relative mt-10">
          <Sketch w={1400} h={40} draw={drawLifecycle} stretch seed={5} className="absolute inset-x-0 top-3 hidden h-10 w-full lg:block" />
          <ol className="relative grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
            {H.areas.map((a, i) => (
              <li key={a.name} className="flex items-center gap-3.5 lg:flex-col lg:gap-2.5 lg:px-1.5 lg:text-center">
                <Sketch w={64} h={64} draw={drawAreas[a.name]} seed={70 + i} className="size-12 flex-none lg:size-16" />
                <span className="flex flex-col gap-0.5">
                  <span className="font-sans text-[15px] font-semibold leading-[1.3] text-foreground">{a.name}</span>
                  <span className="font-sans text-sm leading-[1.35] text-muted-foreground">{a.gloss}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {H.parts.map((part) => (
            <section key={part.id} id={`manage-${part.id}`} aria-labelledby={`manage-${part.id}-h`} className="scroll-mt-24">
              <h3 id={`manage-${part.id}-h`} className={PART}>
                {part.heading}
              </h3>
              {/* The part's point as a drawing, then its paragraphs with their
                  artifacts: side by side when the part has two stretches. */}
              {/* The Problem, Bet and Outcome lines are off the page since
                  17 Nov 2026 ("cut further"): they restated the paragraphs
                  below. Each part's `gist` stays in HOW_I_MANAGE, unrendered. */}
              <div className="mt-5">
                <PartDiagram id={part.id} />
              </div>
              <div className={`mt-8 grid gap-x-8 gap-y-10 ${part.rows.length > 1 ? 'md:grid-cols-2' : ''}`}>
                {part.rows.map((row) => (
                  <StoryRow key={row.paras[0]} row={row} paired={part.rows.some((r: Row) => !!(r.figure || r.figures || r.slides || (SHOW_SLOTS && r.slots?.length)))} />
                ))}
              </div>
            </section>
          ))}

          <section id={`manage-${H.impact.id}`} aria-labelledby="manage-impact-h" className="scroll-mt-24">
            <h3 id="manage-impact-h" className={PART}>
              {H.impact.heading}
            </h3>
            <p className={`mt-5 ${PROSE}`}>{H.impact.statement}</p>
            <div className="mt-10">
              <StageGraph />
            </div>
            <h4 className={`mt-14 ${SUB}`}>{H.impact.learnedHeading}</h4>
            <div className="mt-4 grid gap-x-12 gap-y-4 md:grid-cols-2">
              {H.impact.learned.map((t) => (
                <p key={t} className={PROSE}>
                  {t}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

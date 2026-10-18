import { Fragment } from 'react'
import type { Block, CaseStudy, Section } from '@/lib/case-study'
import { COLOPHON } from '@/lib/case-study'
import { VisualSlot } from '@/components/visual-slot'
import { SectionMenu, type SectionMenuItem } from '@/components/section-menu'
import { ImpactViz } from '@/components/impact'
import { HeadingDot } from '@/components/heading-dot'

/** Renders a case study in the brief's order: summary, impact viz, primer,
 *  problem, decisions, extra sections, outcome table, what I would do
 *  differently, credits, colophon. */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const menu: SectionMenuItem[] = [
    { id: 'summary', label: 'Summary' },
    { id: 'impact', label: 'Impact' },
    ...(study.primer ? [{ id: study.primer.id, label: study.primer.heading }] : []),
    ...(study.problem ? [{ id: study.problem.id, label: study.problem.heading }] : []),
    ...study.decisions.map((s) => ({ id: s.id, label: s.heading })),
    ...(study.sections ?? []).map((s) => ({ id: s.id, label: s.heading })),
    { id: 'outcomes', label: 'Outcome table' },
    { id: 'differently', label: 'What I would do differently' },
    { id: 'credits', label: 'Credits' },
  ]

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 lg:px-14">
      <header className="max-w-[30ch] md:max-w-[36ch]">
        <h1 className="text-balance font-heading text-4xl font-extrabold leading-[1.02] tracking-tight md:text-5xl">{study.title}</h1>
        {study.intro && <p className="prose-measure mt-5 font-sans text-lg leading-relaxed text-muted-foreground">{study.intro}</p>}
      </header>

      <div className="mt-10 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <SectionMenu items={menu} />

        <div className="min-w-0">
          <section id="summary" aria-label="Summary" className="scroll-mt-28">
            <dl className="grid gap-x-8 gap-y-4 rounded-[14px] bg-card p-5 shadow-soft sm:grid-cols-[max-content_1fr] sm:p-6">
              <dt className="label-micro text-muted-foreground sm:pt-1">Role</dt>
              <dd className="font-sans text-base leading-relaxed">{study.summary.role}</dd>
              {study.summary.where && (
                <>
                  <dt className="label-micro text-muted-foreground sm:pt-1">Where</dt>
                  <dd className="font-sans text-base leading-relaxed">{study.summary.where}</dd>
                </>
              )}
              <dt className="label-micro text-muted-foreground sm:pt-1">What I did</dt>
              <dd className="font-sans text-base leading-relaxed">{study.summary.what}</dd>
            </dl>
            {study.summary.extra && <Blocks blocks={study.summary.extra} />}
            {study.summary.measured && (
              <div className="mt-6">
                {study.summary.measured.lead && <p className="prose-measure font-sans text-base leading-relaxed">{study.summary.measured.lead}</p>}
                <DataTable columns={study.summary.measured.columns} rows={study.summary.measured.rows} />
                {study.summary.measured.after && (
                  <p className="prose-measure mt-4 font-sans text-base leading-relaxed">{study.summary.measured.after}</p>
                )}
              </div>
            )}
            <VisualSlot
              id={study.summary.hero.id}
              caption={study.summary.hero.caption}
              alt={study.summary.hero.alt}
              aspect={study.summary.hero.aspect ?? '16 / 7'}
              kind={study.summary.hero.kind}
            />
          </section>

          <ImpactViz id={study.impactId} />

          {study.primer && <SectionBlock section={study.primer} />}
          {study.problem && <SectionBlock section={study.problem} />}
          {study.decisions.map((s) => (
            <SectionBlock key={s.id} section={s} />
          ))}
          {(study.sections ?? []).map((s) => (
            <SectionBlock key={s.id} section={s} />
          ))}

          <section id="outcomes" aria-labelledby="outcomes-heading" className="mt-16 scroll-mt-28">
            <h2 id="outcomes-heading" className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              Outcome table
              <HeadingDot />
            </h2>
            <DataTable
              columns={['Figure', 'Date', 'Source', study.outcomes.whoseLabel]}
              rows={study.outcomes.rows.map((r) => [r.figure, r.date, r.source, r.whose])}
              firstColumnBold
            />
          </section>

          <section id="differently" aria-labelledby="differently-heading" className="mt-16 scroll-mt-28">
            <h2 id="differently-heading" className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              What I would do differently
              <HeadingDot />
            </h2>
            {study.differently ? (
              study.differently.map((p, i) => (
                <p key={i} className="prose-measure mt-4 font-sans text-base leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="prose-measure mt-4 font-sans text-base leading-relaxed text-muted-foreground">Not published yet.</p>
            )}
          </section>

          <section id="credits" aria-labelledby="credits-heading" className="mt-16 scroll-mt-28">
            <h2 id="credits-heading" className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              Credits
              <HeadingDot />
            </h2>
            {study.credits.map((p, i) => (
              <p key={i} className="prose-measure mt-4 font-sans text-base leading-relaxed">
                {p}
              </p>
            ))}
          </section>

          <p className="mt-16 border-t border-border pt-6 font-sans text-xs text-muted-foreground">{COLOPHON}</p>
        </div>
      </div>
    </article>
  )
}

function SectionBlock({ section }: { section: Section }) {
  const headingId = `${section.id}-heading`
  return (
    <section id={section.id} aria-labelledby={headingId} className="mt-16 scroll-mt-28">
      <h2 id={headingId} className="text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
        {section.heading}
        <HeadingDot />
      </h2>
      {section.meta && <p className="mt-2 font-sans text-sm italic text-muted-foreground">{section.meta}</p>}
      <Blocks blocks={section.blocks} />
    </section>
  )
}

/** The lead-ins the appendices use at the start of a paragraph; rendered
 *  bold so the shape of each decision section is visible. */
const LEAD_INS =
  /^(The choice|What I picked|Why|What happened|What I designed|The problem|The decision|What it cost|What changed|What forced it|First design|Second design|Why it stalled|What shipped, [A-Za-z]+ \d{1,2}, \d{4}|My part|What my team designed|What the group designed|Result|Design at the point where the problem is defined|One research base for every data designer|An intake process and a project tracker|Decisions that get made|A way to make a promotion case|AI tools in everyday design work)\. /

function Paragraph({ text }: { text: string }) {
  const m = text.match(LEAD_INS)
  if (!m) return <p className="prose-measure mt-4 font-sans text-base leading-relaxed">{text}</p>
  const lead = m[0].trimEnd()
  return (
    <p className="prose-measure mt-4 font-sans text-base leading-relaxed">
      <strong className="font-semibold">{lead}</strong> {text.slice(m[0].length)}
    </p>
  )
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <Paragraph key={i} text={b.text} />
          case 'ul':
            return (
              <ul key={i} className="prose-measure mt-4 list-disc space-y-2 pl-5 font-sans text-base leading-relaxed marker:text-accent-brand">
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'table':
            return <DataTable key={i} columns={b.columns} rows={b.rows} caption={b.caption} />
          case 'kv':
            return (
              <dl key={i} className="mt-4 grid gap-x-6 gap-y-3 rounded-[14px] bg-card p-5 shadow-soft sm:grid-cols-[max-content_1fr] sm:p-6">
                {b.rows.map(([k, v]) => (
                  <Fragment key={k}>
                    <dt className="label-micro text-muted-foreground sm:pt-1">{k}</dt>
                    <dd className="font-sans text-base leading-relaxed">{v}</dd>
                  </Fragment>
                ))}
              </dl>
            )
          case 'visual':
            return (
              <VisualSlot
                key={i}
                id={b.visual.id}
                caption={b.visual.caption}
                alt={b.visual.alt}
                aspect={b.visual.aspect ?? '16 / 9'}
                kind={b.visual.kind}
              />
            )
        }
      })}
    </>
  )
}

function DataTable({
  columns,
  rows,
  caption,
  firstColumnBold = false,
}: {
  columns: string[]
  rows: string[][]
  caption?: string
  firstColumnBold?: boolean
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-[14px] bg-card shadow-soft">
      <table className="w-full min-w-[36rem] border-collapse text-left font-sans text-sm">
        {caption && <caption className="px-4 pt-3 text-left text-xs text-muted-foreground">{caption}</caption>}
        <thead>
          <tr className="border-b border-foreground/10">
            {columns.map((c) => (
              <th key={c} scope="col" className="label-micro px-4 py-3 font-medium text-muted-foreground">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-foreground/5 align-top last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={j === 0 && firstColumnBold ? 'px-4 py-3 font-semibold leading-relaxed tabular-nums' : 'px-4 py-3 leading-relaxed'}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { cn } from '@/lib/utils'
import { VisualSlot } from '@/components/visual-slot'
import { caseStudyBySlug } from '@/content/work'
import cards from '@/content/case-studies.json'

export interface CaseStudyCardData {
  slug: string
  href: string
  title: string
  roleTag: string
  line: string
  figure: string
  stats: { value: string; label: string }[]
  status: 'password'
}

export const CASE_STUDY_CARDS = cards as CaseStudyCardData[]

/** A stacked card: the cover slot on top, a small role-tag badge, the title,
 *  one line, "Read the case study →", and the impact numbers as a stat strip
 *  under the text (never a badge over the image). */
export function CaseStudyCard({ card }: { card: CaseStudyCardData }) {
  const study = caseStudyBySlug(card.slug)
  const hero = study?.summary.hero

  return (
    <li className="flex flex-col overflow-hidden rounded-[20px] bg-card shadow-soft">
      {/* A plain anchor on purpose: the /work pages are encrypted at build
          time and are not Next routes any more, so they need a full load. */}
      <a href={card.href} className="group flex flex-1 flex-col p-4 pb-0 sm:p-5 sm:pb-0">
        <VisualSlot
          id={`${card.slug}-cover`}
          aspect="16 / 10"
          alt={hero?.alt ?? card.title}
          compact
          className="overflow-hidden rounded-[14px]"
        />
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="label-micro rounded-full bg-accent-brand/10 px-2.5 py-1 text-accent-brand">{card.roleTag}</span>
          <span className="label-micro rounded-full bg-card-soft px-2.5 py-1 text-muted-foreground">Password</span>
        </div>
        <h3 className="mt-3 text-balance font-heading text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          {card.title}
        </h3>
        <p className="mt-2 text-pretty font-sans text-base leading-relaxed text-muted-foreground">{card.line}</p>
        <p className="mt-3 font-sans text-sm font-semibold text-accent-brand">
          Read the case study{' '}
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </a>
      <dl className={cn('mt-5 grid gap-4 border-t border-foreground/10 p-4 pt-4 sm:p-5 sm:pt-4', card.stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
        {card.stats.map((s) => (
          <div key={s.label} className="flex min-w-0 flex-col-reverse">
            <dt className="mt-1.5 label-micro text-muted-foreground">{s.label}</dt>
            <dd className="font-heading text-lg font-semibold leading-tight tracking-tight text-accent-brand tabular-nums sm:text-xl">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </li>
  )
}

/** The compact form for /about: title and the one-line figure. */
export function CaseStudyRow({ card }: { card: CaseStudyCardData }) {
  return (
    <li>
      <a href={card.href} className="group block rounded-[14px] bg-card p-5 shadow-soft">
        <p className="label-micro text-accent-brand">{card.roleTag}</p>
        <h3 className="mt-2 text-balance font-heading text-lg font-semibold leading-snug tracking-tight group-hover:text-accent-brand">
          {card.title}
        </h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{card.figure}</p>
      </a>
    </li>
  )
}

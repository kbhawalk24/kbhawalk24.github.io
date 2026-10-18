import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { SectionMenu } from '@/components/section-menu'
import { ExternalLink } from '@/components/external-link'
import { HeadingDot } from '@/components/heading-dot'
import { CASE_STUDY_CARDS, CaseStudyRow } from '@/components/case-study-card'
import { SITE } from '@/lib/routes'
import { EDUCATION } from '@/lib/timeline-data'
import { ABOUT_PARAGRAPH, HOW_I_MANAGE, MANAGER_INTRO, MANAGER_TABLE } from '@/content/about'

export const metadata: Metadata = {
  title: 'About',
  description: SITE.positioning,
}

const MENU = [
  { id: 'about', label: 'About' },
  { id: 'as-a-design-manager', label: 'As a design manager' },
  { id: 'how-i-manage', label: 'How I manage' },
]

const buttonPrimary =
  'inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-medium text-primary-foreground shadow-cta transition-[box-shadow,transform] hover:shadow-cta-hover active:scale-[0.98]'
const buttonSecondary =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25'

export default function Page() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 lg:px-14">
        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
          <SectionMenu items={MENU} />

          <div className="min-w-0">
            <section id="about" aria-labelledby="about-heading" className="scroll-mt-28">
              <h1 id="about-heading" className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                About me
                <HeadingDot />
              </h1>
              <p className="prose-measure mt-6 text-pretty font-sans text-xl leading-[1.5] text-foreground">{SITE.positioning}</p>
              <p className="prose-measure mt-5 text-pretty font-sans text-base leading-relaxed text-foreground">{ABOUT_PARAGRAPH}</p>
              <ul className="mt-6 grid gap-1 font-sans text-base">
                {EDUCATION.map((e) => (
                  <li key={e.degree}>
                    <span className="font-semibold">{e.degree}</span>
                    <span className="text-muted-foreground">
                      , {e.school}, {e.year}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ExternalLink href={SITE.resume} className={buttonPrimary}>
                  Resume
                </ExternalLink>
                <ExternalLink href={SITE.linkedin} className={buttonSecondary}>
                  LinkedIn
                </ExternalLink>
                <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center px-2 font-sans text-sm text-foreground underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </div>
            </section>

            <section id="as-a-design-manager" aria-labelledby="manager-heading" className="mt-20 scroll-mt-28">
              <h2 id="manager-heading" className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                As a design manager
                <HeadingDot />
              </h2>
              <p className="prose-measure mt-4 font-sans text-base italic leading-relaxed text-muted-foreground">{MANAGER_INTRO}</p>
              <div className="mt-6 overflow-x-auto rounded-[14px] bg-card shadow-soft">
                <table className="w-full min-w-[36rem] border-collapse text-left font-sans text-sm">
                  <thead>
                    <tr className="border-b border-foreground/10">
                      <th scope="col" className="label-micro px-4 py-3 font-medium text-muted-foreground">Area</th>
                      <th scope="col" className="label-micro px-4 py-3 font-medium text-muted-foreground">Result</th>
                      <th scope="col" className="label-micro px-4 py-3 font-medium text-muted-foreground">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MANAGER_TABLE.map((row, i) => (
                      <tr key={i} className="border-b border-foreground/5 align-top last:border-0">
                        <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold">{row.area}</th>
                        <td className="px-4 py-3 leading-relaxed">{row.result}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground tabular-nums">{row.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="how-i-manage" aria-labelledby="how-heading" className="mt-20 scroll-mt-28">
              <h2 id="how-heading" className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                How I manage
                <HeadingDot />
              </h2>
              <ol className="mt-6 grid gap-6">
                {HOW_I_MANAGE.map((p) => (
                  <li key={p.lead} className="prose-measure font-sans text-base leading-relaxed">
                    <strong className="font-semibold">{p.lead}</strong> {p.text}
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="studies-heading" className="mt-20">
              <h2 id="studies-heading" className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                The four case studies
                <HeadingDot />
              </h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {CASE_STUDY_CARDS.map((card) => (
                  <CaseStudyRow key={card.slug} card={card} />
                ))}
              </ul>
              <p className="mt-6 font-sans text-sm text-muted-foreground">{SITE.passwordLine}</p>
            </section>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}

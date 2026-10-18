import Image from 'next/image'
import { SiteShell } from '@/components/site-shell'
import { StatStrip } from '@/components/stat-strip'
import { CASE_STUDY_CARDS, CaseStudyCard } from '@/components/case-study-card'
import { SITE } from '@/lib/routes'

/** The homepage, top to bottom: positioning, the four-tile stat strip, the
 *  2×2 case study grid, and the password line. Nothing else. */
export default function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6 md:px-10 md:pb-16 lg:px-14">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-12">
          <div>
            <h1
              translate="no"
              className="font-heading text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-tight text-foreground"
            >
              Kanchi
              <br />
              Bhawalkar
            </h1>
            <p className="mt-6 max-w-[40ch] text-pretty font-sans text-xl leading-[1.5] text-foreground md:text-2xl">
              {SITE.positioning}
            </p>
          </div>
          {/* The illustration kept beside the name; flagged in the preview. */}
          <div className="mx-auto w-full max-w-[16rem] md:max-w-none">
            <Image
              src="/images/illustration.webp"
              alt=""
              width={720}
              height={955}
              sizes="(min-width: 768px) 30vw, 16rem"
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <StatStrip />

      <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-14">
        <h2 id="work-heading" className="sr-only">
          Case studies
        </h2>
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CASE_STUDY_CARDS.map((card) => (
            <CaseStudyCard key={card.slug} card={card} />
          ))}
        </ol>
        <p className="mt-8 font-sans text-sm text-muted-foreground">{SITE.passwordLine}</p>
      </section>
    </SiteShell>
  )
}

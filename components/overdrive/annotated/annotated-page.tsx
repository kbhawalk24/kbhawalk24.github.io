import Image from 'next/image'
import Link from 'next/link'

import { event } from '@/lib/analytics'
import { ARCS, HERO, MANAGEMENT } from '@/lib/home-content'
import { LEADING_THE_TEAM } from '@/lib/pages/leading-the-team'
import { AnnotatedReel } from './annotated-reel'

// A landing-page option (16 Nov 2026), built from a reference Kanchi picked:
// one flat pale-blue hero with four clips of the rebuilt prototype in one
// frame and four labels pinned around it that choose the clip, the Management statement beside the project tracker, the seven
// Intuit areas as dictionary entries on a deep-blue band, the case studies,
// and the contact line. One long scrolling page, no tabs. It is an option at
// /overdrive/annotated; the live homepage is untouched. No copy of its own:
// the words come from lib/home-content.ts and the Management page.

const ev = (item: string) => event('overdrive', { page: 'annotated', item })

const INTRO = HERO.intro.map((p) => p.map((s) => s.text).join(''))
const CARDS = ARCS.flatMap((a) => a.cards).filter((c) => c.cover && c.href)
const SCOPE = LEADING_THE_TEAM.sections.find((s) => s.id === 'scope')
const STATS = LEADING_THE_TEAM.stats ?? []

/** The seven areas, in the resume's order, set as dictionary headwords. The
 *  one-line descriptions are the Intuit chapter's (INTUIT_CHAPTER in
 *  lib/home-content.ts), under the area names in use since 12 Nov 2026. */
const AREAS = [
  ['dis·cov·ery', 'Catalog & search, Data Map, plain-language assistant, lineage views, the agent in Cursor & Claude.'],
  ['ac·cess', 'Requests, policies & approvals'],
  ['lin·e·age', 'Upstream & downstream impact'],
  ['ob·serv·a·bil·i·ty', 'Quality checks, reliability & monitoring'],
  ['da·ta ma·tur·i·ty', 'Scoring, certification, standards'],
  ['in·stru·men·ta·tion', 'Event capture & data product onboarding'],
  ['pipe·line au·thor·ing', 'Batch & stream'],
] as const

const NAV = [
  { label: 'Design work', href: '#work' },
  { label: 'Management', href: '#management' },
  { label: 'Leveraging AI', href: '/#ai' },
  { label: 'Talks', href: '/#talks' },
]

const dotted = (size: string, color = '#2a62c9') => ({
  backgroundImage: `radial-gradient(circle, ${color} 38%, transparent 44%)`,
  backgroundSize: size,
  backgroundRepeat: 'repeat-x',
  backgroundPosition: '0 100%',
})

const WRAP = 'mx-auto max-w-[85rem] px-4 sm:px-6 md:px-10 lg:px-14'
const H2 = 'font-heading text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[52px] lg:text-[66px]'
const DARK_BTN =
  'inline-flex min-h-12 items-center rounded-[10px] bg-[#161c28] px-5 font-sans text-[17px] font-bold text-white transition-colors duration-150 hover:bg-accent-brand active:bg-accent-brand'
const TEXT_LINK =
  'inline-flex min-h-11 items-center font-sans text-[17px] font-bold text-[#161c28] underline decoration-2 underline-offset-[6px] hover:text-accent-brand'

export function AnnotatedPage() {
  return (
    <div className="bg-white text-[#161c28]">
      <header className="bg-[#d6e4fb]">
        <div className={WRAP}>
          <nav aria-label="Sections" className="flex min-h-[84px] flex-wrap items-center justify-between gap-x-8 gap-y-1 py-3">
            <Link href="/" {...ev('home')} className="inline-flex min-h-11 items-center font-heading text-[27px] font-extrabold tracking-[-0.02em]">
              Kanchi Bhawalkar<span className="text-[#e0452f]">.</span>
            </Link>
            <ul className="hidden items-center gap-8 font-sans text-[16.5px] font-semibold md:flex">
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} {...ev(`nav-${n.label.toLowerCase().replace(/ /g, '-')}`)} className="inline-flex min-h-11 items-center hover:text-accent-brand">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href="/kanchi-bhawalkar-resume.pdf" target="_blank" rel="noopener noreferrer" {...ev('resume')} className={DARK_BTN}>
              Resume<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>

          <div className="grid items-center gap-x-16 gap-y-8 pb-10 pt-8 lg:grid-cols-[1.15fr_1fr] lg:pb-14 lg:pt-14">
            {/* The opening sentence's own words, as the headline. */}
            <h1 className="font-heading text-[46px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[68px] lg:text-[88px]">
              Product design leader for data and{' '}
              <span className="whitespace-nowrap pb-[0.1em]" style={dotted('0.125em 0.07em')}>
                AI tools.
              </span>
            </h1>
            <div>
              <p className="font-sans text-lg leading-[1.55] lg:text-[19.5px]">{INTRO[0]}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2">
                <Link href="#work" {...ev('hero-work')} className={DARK_BTN}>
                  Design work
                </Link>
                <Link href="#management" {...ev('hero-management')} className={TEXT_LINK}>
                  Management <span aria-hidden="true">&nbsp;↓</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Four clips of the rebuilt prototype; the labels pinned around
              the frame choose the clip. */}
          <AnnotatedReel />
        </div>
      </header>
      <div aria-hidden="true" className="h-0.5 bg-[#161c28]" />

      <main id="main">
        <section id="management" aria-labelledby="annotated-management" className="scroll-mt-6 py-16 lg:py-28">
          <div className={WRAP}>
            <h2 id="annotated-management" className={H2}>
              {MANAGEMENT.led.statement}
            </h2>
            <div className="mt-5 grid lg:grid-cols-2">
              <p className="font-sans text-lg leading-[1.55] lg:text-xl">{MANAGEMENT.text}</p>
            </div>
            <div className="mt-12 grid items-center gap-y-10 lg:grid-cols-[1fr_1.45fr]">
              <ul className="flex flex-col gap-8 lg:gap-10">
                {MANAGEMENT.led.items.map((item) => (
                  <li key={item.title} className="grid lg:grid-cols-[1fr_96px]">
                    <div className="lg:text-right">
                      <h3 className="font-sans text-[19px] font-bold leading-[1.3]">{item.title}</h3>
                      <p className="mt-1.5 font-sans text-base leading-[1.55] text-[#161c28]/75">{item.text}</p>
                    </div>
                    <div aria-hidden="true" className="relative hidden h-[26px] lg:block">
                      <span className="absolute left-3.5 right-2 top-3 h-0.5 bg-[#161c28]" />
                      <span className="absolute right-0 top-[7px] size-3 rounded-full bg-[#161c28]" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="rounded-[18px] bg-[#161c28] p-2.5 shadow-[0_30px_50px_-26px_rgba(22,28,40,0.5)] sm:rounded-[26px] sm:p-4">
                <Image
                  src="/work/leading-the-team/tracker-2025.jpg"
                  width={2000}
                  height={1087}
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  alt="The design project tracker: a table of design projects with their product area, status, assigned designer and due date. Names blurred."
                  className="h-auto w-full rounded-[10px] sm:rounded-[13px]"
                />
              </div>
            </div>
            <Link href="/#management" {...ev('leadership')} className={`${TEXT_LINK} mt-8`}>
              {MANAGEMENT.link.label} <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </section>

        <section aria-labelledby="annotated-areas" className="bg-accent-brand py-16 text-white lg:py-28">
          <div className={WRAP}>
            <h2 id="annotated-areas" className={H2}>
              {SCOPE?.heading}
            </h2>
            <div className="mt-5 grid lg:grid-cols-[1.25fr_1fr]">
              <p className="font-sans text-lg leading-[1.55] lg:text-[19px]">{INTRO[1]}</p>
            </div>
            <dl className="mt-12 grid gap-x-20 md:grid-cols-2">
              {AREAS.map(([word, text]) => (
                <div key={word} className="border-t-2 border-white pb-8 pt-5">
                  <dt className="font-heading text-[30px] font-extrabold leading-none tracking-[-0.02em] lg:text-[38px]">{word}</dt>
                  <dd className="mt-2.5 font-sans text-[17px] leading-normal">{text}</dd>
                </div>
              ))}
              <div className="border-t-2 border-white pb-8 pt-5">
                <dt className="sr-only">The team</dt>
                <dd className="font-heading text-[30px] font-extrabold leading-none tracking-[-0.02em] text-[#f6d95a] lg:text-[38px]">
                  Every designer who reported to me was promoted.
                </dd>
              </div>
            </dl>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {STATS.map((s, i) => (
                <li key={s.label} className={`rounded-[10px] px-6 py-5 text-[#161c28] ${i === 1 ? 'bg-[#f6d95a]' : 'bg-white'}`}>
                  <p className="font-heading text-[36px] font-extrabold leading-none tracking-[-0.02em] lg:text-[44px]">{s.value}</p>
                  <p className="mt-2 font-sans text-[15.5px] font-semibold leading-[1.4]">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" aria-labelledby="annotated-work" className="scroll-mt-6 py-16 lg:py-28">
          <div className={WRAP}>
            <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
              <h2 id="annotated-work" className={H2}>
                Design work
              </h2>
              <p className="font-sans text-lg leading-[1.55] lg:text-[19px]">{INTRO[2]}</p>
            </div>
            <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {CARDS.map((c) => (
                <li key={c.slug}>
                  <Link href={`${c.href}/`} {...event('work-card', { card: c.slug, via: 'panel' })} className="group block">
                    <span className="block aspect-[16/11] overflow-hidden rounded-xl border-2 border-[#161c28] bg-white shadow-[5px_5px_0_#161c28] transition-[translate,box-shadow] duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[7px_7px_0_#161c28]">
                      <Image
                        src={c.cover!.src}
                        width={c.cover!.width ?? 1600}
                        height={c.cover!.height ?? 900}
                        sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
                        alt=""
                        className="size-full object-cover object-left-top"
                      />
                    </span>
                    <span className="mt-4 block font-heading text-[23px] font-extrabold leading-[1.1] tracking-[-0.02em] group-hover:text-accent-brand">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t-2 border-[#161c28] bg-[#d6e4fb] py-14 lg:py-20">
        <div className={`${WRAP} flex`}>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <li>
              <a href="mailto:kbhawalk@gmail.com" {...event('contact', { link: 'email' })} className={DARK_BTN}>
                kbhawalk@gmail.com
              </a>
            </li>
            <li>
              <a href="/kanchi-bhawalkar-resume.pdf" target="_blank" rel="noopener noreferrer" {...event('contact', { link: 'resume' })} className={TEXT_LINK}>
                Resume<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/kanchib" target="_blank" rel="noopener noreferrer" {...event('contact', { link: 'linkedin' })} className={TEXT_LINK}>
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

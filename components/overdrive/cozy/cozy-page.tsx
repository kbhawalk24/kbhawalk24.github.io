'use client'

import './cozy.css'
import { MotionConfig, motion } from 'motion/react'
import { event } from '@/lib/analytics'
import { HERO } from '@/lib/home-content'
import { SiteHeader } from '@/components/site-header'
import { WorkArcs } from '@/components/work-arcs'
import { TalksRow } from '@/components/talks-row'
import { ManagementSection } from '@/components/management/management-section'
import { FooterDeskWide, HeroRoomWide } from './cozy-scenes'

// The cosy pass on the homepage (11 Nov 2026). Same content and order as the
// live homepage; the hero and the footer are drawn scenes, and the wrapper's
// tokens (./cozy.css) warm every shared section. Entrance: the scene settles
// up into place, then the words follow, one decelerating curve throughout.

const EASE = [0.22, 1, 0.36, 1] as const

const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-sans text-sm font-semibold transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.98]'
const PRIMARY = `${PILL} bg-[var(--ink)] text-[var(--card)] shadow-[0_0_0_1.5px_var(--ink),0_10px_20px_-10px_rgb(var(--shadow-ink)/0.6)] hover:opacity-90`
const OUTLINE = `${PILL} bg-[var(--card)] text-[var(--foreground)] shadow-[0_0_0_1.5px_var(--ink)] hover:bg-[var(--secondary)]`

function CozyHero() {
  return (
    <section id="hero" className="relative overflow-hidden md:min-h-[1000px]">
      {/* The room is the hero: wall and floor run edge to edge behind the
          words. On phones it sits above them as a picture of the right side. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative h-[420px] overflow-hidden border-b-[3px] border-[var(--ink)] md:absolute md:inset-0 md:h-auto md:border-b-0"
      >
        <HeroRoomWide />
      </motion.div>
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-10 md:pb-36 md:pt-32 lg:px-14">
        <div className="max-w-[min(34rem,48%)] max-md:max-w-none">
          <motion.h1
            initial={{ opacity: 0, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            translate="no"
            className="cozy-lettering font-heading text-[clamp(3.25rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.01em]"
          >
            Kanchi
            <br />
            Bhawalkar
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(10px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          >
            <p className="mt-6 inline-block rounded-full bg-[var(--band)] px-4 py-1.5 font-sans text-[15px] font-semibold text-[var(--foreground)] shadow-[0_0_0_1.5px_var(--ink)]">
              Product Design Manager and Principal Designer
            </p>
            {HERO.intro.map((para, i) => (
              <p key={i} className="mt-5 text-pretty font-sans text-[17px] leading-[1.65] text-[var(--foreground)] lg:text-lg">
                {para.map((part) =>
                  'accent' in part && part.accent ? (
                    <span key={part.text} className="rounded-[4px] bg-[var(--highlight)] px-1 font-semibold [box-decoration-break:clone]">
                      {part.text}
                    </span>
                  ) : (
                    <span key={part.text}>{part.text}</span>
                  ),
                )}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a href="#work" className={PRIMARY} {...event('hero-button', { button: 'work' })}>
                Design work <span aria-hidden="true">↓</span>
              </a>
              <a href="#management" className={OUTLINE} {...event('hero-button', { button: 'management' })}>
                Management <span aria-hidden="true">↓</span>
              </a>
              <a href="/kanchi-bhawalkar-resume.pdf" target="_blank" rel="noopener noreferrer" className={OUTLINE} {...event('hero-button', { button: 'resume' })}>
                Resume <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href="https://linkedin.com/in/kanchib" target="_blank" rel="noopener noreferrer" className={OUTLINE} {...event('hero-button', { button: 'linkedin' })}>
                LinkedIn <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const LINKS = [
  { id: 'email', label: 'kbhawalk@gmail.com', href: 'mailto:kbhawalk@gmail.com' },
  { id: 'resume', label: 'Resume', href: '/kanchi-bhawalkar-resume.pdf', external: true },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/kanchib', external: true },
]

function CozyFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden md:min-h-[680px]">
      {/* The desk is the footer: wall and desk run edge to edge behind the
          words. On phones it sits above them as a picture of the right side. */}
      <div className="relative h-[300px] overflow-hidden border-b-[3px] border-[var(--ink)] md:absolute md:inset-0 md:h-auto md:border-b-0">
        <FooterDeskWide />
      </div>
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(14px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-10 md:pb-44 md:pt-24 lg:px-14"
      >
        <div className="max-w-[min(34rem,48%)] max-md:max-w-none">
          <h2 className="font-heading text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--foreground)]">
            Building developer tools or complex data systems? Let&rsquo;s talk.
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {LINKS.map((l, i) => (
              <a
                key={l.id}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className={i === 0 ? PRIMARY : OUTLINE}
                {...event('contact', { link: l.id })}
              >
                {l.label}
                {l.external && <span aria-hidden="true">↗</span>}
                {l.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export function CozyPage({ fontClass = '' }: { fontClass?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={`cozy ${fontClass}`}>
        <SiteHeader />
        <main id="main">
          <CozyHero />
          <WorkArcs />
          <TalksRow />
          <ManagementSection />
        </main>
        <CozyFooter />
      </div>
    </MotionConfig>
  )
}

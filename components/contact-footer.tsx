'use client'

import { motion } from 'motion/react'
import { fadeUp, stagger } from '@/components/motion-primitives'
import { event } from '@/lib/analytics'

const LINKS = [
  { id: 'email', label: 'kbhawalk@gmail.com', href: 'mailto:kbhawalk@gmail.com' },
  { id: 'resume', label: 'Resume', href: '/kanchi-bhawalkar-resume.pdf', external: true },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/kanchib', external: true },
]

const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-sans text-sm font-semibold tabular-nums transition-[background-color,box-shadow]'

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 lg:px-14"
      >
        <motion.h2
          variants={fadeUp}
          className="font-heading text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.025em]"
        >
          Building developer tools or complex data systems? Let&rsquo;s talk.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 font-sans text-base text-muted-foreground">
          Open to principal or staff product design roles and design manager roles in the San Francisco Bay Area.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-2.5">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={
                i === 0
                  ? `${PILL} bg-primary text-primary-foreground shadow-cta hover:shadow-cta-hover`
                  : `${PILL} bg-card text-foreground ring-1 ring-border hover:bg-secondary hover:ring-foreground/25`
              }
              {...event('contact', { link: link.id })}
            >
              {link.label}
              {link.external && <span aria-hidden="true">↗</span>}
              {link.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  )
}

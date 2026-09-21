'use client'

import { motion } from 'motion/react'
import { fadeUp, stagger } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

const LINKS = [
  { label: 'kbhawalk@gmail.com', href: 'mailto:kbhawalk@gmail.com' },
  {
    label: 'linkedin.com/in/kanchib',
    href: 'https://linkedin.com/in/kanchib',
    external: true,
  },
  { label: '+1 (734) 747-3800', href: 'tel:+17347473800' },
]

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-14"
      >
        <motion.h2
          variants={fadeUp}
          className="max-w-2xl text-balance font-heading text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          Building something complex with data? Let&rsquo;s <em>talk</em>.
          <HeadingDot />
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group relative -my-2 inline-flex min-h-11 items-center py-2 font-sans text-sm tabular-nums"
            >
              {link.label}
              {link.external && <span className="sr-only"> (opens in a new tab)</span>}
              <span
                aria-hidden="true"
                className="absolute bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-foreground transition-transform duration-300 group-hover:scale-x-0"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-muted-foreground transition-transform delay-100 duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </motion.div>
        <motion.p variants={fadeUp} className="mt-8 max-w-[52ch] font-sans text-sm text-muted-foreground">
          Open to Principal / Staff product design roles and design manager
          roles. The timeline above can be read either way.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-10 font-sans text-xs text-muted-foreground"
        >
          <span translate="no">Kanchi Bhawalkar</span> · Sunnyvale, California
        </motion.p>
      </motion.div>
    </footer>
  )
}

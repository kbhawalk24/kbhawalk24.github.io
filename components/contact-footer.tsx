'use client'

import { motion } from 'motion/react'
import { fadeUp, stagger } from '@/components/motion-primitives'

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
        <motion.p
          variants={fadeUp}
          className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          Contact
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-4 max-w-2xl text-balance font-serif text-4xl tracking-tight md:text-5xl"
        >
          Building something complex with data? Let&apos;s{' '}
          <em className="italic">talk</em>.
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
              className="group relative font-sans text-sm"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-foreground transition-transform duration-300 group-hover:scale-x-0"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-muted-foreground transition-transform delay-100 duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-12 font-sans text-xs text-muted-foreground"
        >
          Kanchi Bhawalkar · Sunnyvale, California
        </motion.p>
      </motion.div>
    </footer>
  )
}

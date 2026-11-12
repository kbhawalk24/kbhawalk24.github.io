import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import { CozyPage } from '@/components/overdrive/cozy/cozy-page'

// A warm, illustrated pass on the homepage (11 Nov 2026): the same content in
// a cosy palette, with a drawn room around the hero and the footer. Not linked
// from the nav; kept out of search.

// A rounded, bubbly heading face for this page only (the site keeps League
// Spartan and Mulish). It stands in for League Spartan inside the .cozy wrapper.
const fredoka = Fredoka({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-fredoka', display: 'swap' })

export const metadata: Metadata = {
  title: 'Cosy · Overdrive · Kanchi Bhawalkar',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CozyPage fontClass={fredoka.variable} />
}

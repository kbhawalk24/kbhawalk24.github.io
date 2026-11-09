import { Analytics } from '@/components/analytics'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, League_Spartan, Mulish } from 'next/font/google'
import './globals.css'

// League Spartan carries display and headings, Mulish carries body. Plex
// Mono is loaded only for the small uppercase labels (`.label-micro`), the
// one element borrowed from the Claude Design reference deck.
const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mulish',
})
const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-league-spartan',
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  title: 'Kanchi Bhawalkar, Product Design Leader',
  description:
    'Product Design Manager and Principal Designer for data and AI tools. Founding designer of Intuit’s data platform, then the manager of its design team at one designer for every 85 engineers. Four case studies with exact, sourced figures, and how I led the design team.',

}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${mulish.variable} ${leagueSpartan.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        {/* For keyboard users: the first Tab stop jumps past the header to
            the page's <main id="main">. Hidden until focused. */}
        <a
          href="#main"
          className="sr-only rounded-full bg-foreground px-4 py-2 font-sans text-sm font-semibold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:outline-none focus:ring-2 focus:ring-accent-brand focus:ring-offset-2"
        >
          Skip to content
        </a>
        {/* The wash, locked to the viewport. The ground itself carries a
            faint violet base (--background) and this fixed layer adds the
            bloom on top, so the gradient reads the same on every screen
            instead of scrolling away with the hero. Inert and behind all
            content; nothing animates, so it costs one paint. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle 1100px at 0% 100%, var(--wash-bloom) 0%, transparent 72%), radial-gradient(circle 900px at 100% 0%, var(--wash-bloom-far) 0%, transparent 70%)',
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

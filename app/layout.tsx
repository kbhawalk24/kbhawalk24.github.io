import { Analytics } from '@vercel/analytics/next'
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
    'Design leader with 12+ years across enterprise data platforms and agentic AI tooling. A career timeline of design management, design strategy, and hands-on IC craft.',

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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

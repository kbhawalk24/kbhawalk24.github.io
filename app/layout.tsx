import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, League_Spartan, Mulish } from 'next/font/google'
import { SITE } from '@/lib/routes'
import './globals.css'

// League Spartan carries display and headings, Mulish carries body. Plex
// Mono is loaded only for the small uppercase labels (`.label-micro`).
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
  title: {
    default: 'Kanchi Bhawalkar, Product Design Manager',
    template: '%s | Kanchi Bhawalkar',
  },
  description: SITE.positioning,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
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
        {/* The wash, locked to the viewport: a white ground with two soft
            violet blooms. Inert and behind all content. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle 1100px at 0% 100%, var(--wash-bloom) 0%, transparent 72%), radial-gradient(circle 900px at 100% 0%, var(--wash-bloom-far) 0%, transparent 70%)',
          }}
        />
        {children}
      </body>
    </html>
  )
}

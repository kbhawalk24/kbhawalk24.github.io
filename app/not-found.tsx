import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { HeadingDot } from '@/components/heading-dot'
import { event } from '@/lib/analytics'

// The site's own 404. The static export writes it to out/404.html, which
// GitHub Pages serves for any path that does not exist.

export const metadata: Metadata = {
  title: 'Page not found | Kanchi Bhawalkar',
}

export default function NotFound() {
  return (
    <>
      <SiteHeader onHome={false} />
      <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-40 md:px-10 lg:px-14">
        <p className="label-micro text-muted-foreground">404</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
          This page does not exist
          <HeadingDot />
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
          The link may be old, or the address may have a typo. The case studies are all on the home page.
        </p>
        <Link
          href="/#work"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 font-sans text-sm font-semibold text-background transition-[background-color,transform] duration-300 ease-out hover:bg-foreground/85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2"
          {...event('nav', { item: 'not-found-work' })}
        >
          See the case studies <span aria-hidden="true">→</span>
        </Link>
      </main>
    </>
  )
}

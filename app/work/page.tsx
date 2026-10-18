import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteShell } from '@/components/site-shell'
import { WorkRedirect } from '@/components/work-redirect'

export const metadata: Metadata = {
  title: 'Work',
  robots: { index: false },
}

/** /work has no index of its own: the case studies are on the homepage.
 *  Sends people there, and says so for anyone without JavaScript. */
export default function Page() {
  return (
    <SiteShell>
      <WorkRedirect />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 lg:px-14">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">The case studies are on the homepage.</h1>
        <p className="mt-4 font-sans text-base">
          <Link href="/" className="font-semibold text-accent-brand underline-offset-4 hover:underline">
            Go to the homepage →
          </Link>
        </p>
      </div>
    </SiteShell>
  )
}

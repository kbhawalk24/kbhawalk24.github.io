'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

/** A page that has moved. The site is a static export, so there are no
 *  server redirects: this forwards on the client and shows the link for
 *  anyone whose script has not run. */
export function Forward({ to, label }: { to: string; label: string }) {
  const router = useRouter()
  useEffect(() => {
    router.replace(to)
  }, [router, to])
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 pt-40 font-sans text-foreground">
      <p className="text-lg">
        This page has moved to{' '}
        <Link href={to} className="font-semibold underline underline-offset-4">
          {label}
        </Link>
        .
      </p>
    </main>
  )
}

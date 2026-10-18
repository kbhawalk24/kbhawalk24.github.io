import { SkipLink } from '@/components/skip-link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

/** Header, main and footer around every page. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" className="pt-24 md:pt-28">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}

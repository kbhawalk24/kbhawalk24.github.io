import { SITE } from '@/lib/routes'
import { ExternalLink } from '@/components/external-link'

const linkClass =
  'inline-flex min-h-11 items-center gap-1 font-sans text-sm text-foreground underline-offset-4 hover:underline'

/** Name, email, Resume and LinkedIn. No location, no phone. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-10 sm:px-6 md:px-10 lg:px-14">
        <p translate="no" className="font-heading text-base font-semibold tracking-tight">
          {SITE.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6">
          <li>
            <a href={`mailto:${SITE.email}`} className={linkClass}>
              {SITE.email}
            </a>
          </li>
          <li>
            <ExternalLink href={SITE.resume} className={linkClass}>
              Resume
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={SITE.linkedin} className={linkClass}>
              LinkedIn
            </ExternalLink>
          </li>
        </ul>
      </div>
    </footer>
  )
}

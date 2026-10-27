import Script from 'next/script'
import { UMAMI_SCRIPT, UMAMI_WEBSITE_ID } from '@/lib/analytics'

/** The Umami tracker; renders nothing until a website ID is set, and never outside production. */
export function Analytics() {
  if (process.env.NODE_ENV !== 'production' || !UMAMI_WEBSITE_ID) return null
  return <Script src={UMAMI_SCRIPT} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />
}

// Umami Cloud analytics. Page views are automatic; clicks are tracked by
// putting `data-umami-event` on the element (see event()). The script loads
// only in production builds, so the dev server and local renders never count.
// The website ID is public by design: it only identifies which dashboard
// receives the events, and the dashboard itself needs a login.

export const UMAMI_WEBSITE_ID = ''

export const UMAMI_SCRIPT = 'https://cloud.umami.is/script.js'

/** Spread onto a link or button to record a named click, with optional detail. */
export function event(name: string, data?: Record<string, string>) {
  const attrs: Record<string, string> = { 'data-umami-event': name }
  for (const [k, v] of Object.entries(data ?? {})) attrs[`data-umami-event-${k}`] = v
  return attrs
}

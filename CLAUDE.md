# Design Portfolio

Kanchi Bhawalkar's portfolio. Next.js static export (`output: 'export'`, `trailingSlash: true`), pnpm, Tailwind v4, deployed to kbhawalk24.github.io by the "Deploy to GitHub Pages" workflow on every push to `main`. Typecheck with `pnpm exec tsc --noEmit`, test with `pnpm exec vitest run`.

## Analytics: keep every click tracked

Umami Cloud is the analytics. The tracker is `components/analytics.tsx`, rendered once in `app/layout.tsx`; it loads only in production builds and only when `UMAMI_WEBSITE_ID` in `lib/analytics.ts` is set. Page views are automatic. Clicks are recorded through `data-umami-event` attributes, produced by the `event()` helper in `lib/analytics.ts`.

Rules, applied on every change and checked before every push:

1. **Never remove or bypass the tracker.** `app/layout.tsx` keeps `<Analytics />`; `lib/analytics.ts` keeps the website ID `60d41913-e7f0-4512-b462-42c3be1bf8e4`. Do not add a second analytics tool.
2. **Every new clickable element gets an event.** Any link, button or card added to the site is tagged with `{...event('<name>', { ...detail })}` when it is written, not later. Names in use: `work-card` (detail `card`, `via`: panel, title or read), `hero-button` (detail `button`), `nav` (detail `item`), `next-case` (detail `from`). Reuse these names for the same kinds of element; add a new kebab-case name only for a new kind, and list it here.
3. **New pages need nothing extra** for page views, but their outbound links (resume, LinkedIn, external sites, prototypes) get an event.
4. **Before pushing, verify the attributes survived.** Run `pnpm build` and check that `out/index.html` still contains `data-umami-event="work-card"`, `"hero-button"` and `"nav"`, and that the page you changed contains the events you added. After the deploy, the live HTML at kbhawalk24.github.io must contain `cloud.umami.is/script.js`.
5. **Local never counts.** The tracker stays gated on `process.env.NODE_ENV === 'production'`, so the dev server, scratchpad renders and screenshots are never recorded.

Dashboard: https://cloud.umami.is (Kanchi's account).

## Content rules that are not derivable from the code

- Colleagues are credited by role, never by name. No names, emails, avatars or faces in screenshots; blur them.
- Client names appear in case studies only, never on the landing page.
- Figures only when sourced; the sources are in `docs/`. Keep figures consistent across pages.
- The nine Intuit product areas are always listed in full: finding and understanding data, access, lineage, health monitoring, reliability, usage tracking, pipeline authoring, publishing and ingestion. Never summarised as a range.
- "Every designer who reported to me was promoted" stays as that sentence, never a count.
- No em-dashes anywhere in site copy. Plain, factual headings.
- Quotes only where they carry a fact the surrounding text does not.
- The original hero (name, illustration, scroll choreography) stays.

## Layout rules

- **Headings span end to end.** No heading, on any page, gets a max-width or `text-balance`; it runs the full width of its column and wraps where the column ends. Paragraphs may keep their measure; headings never do.

# Design Portfolio

Kanchi Bhawalkar's portfolio. Next.js static export (`output: 'export'`, `trailingSlash: true`), pnpm, Tailwind v4, deployed to kbhawalk24.github.io by the "Deploy to GitHub Pages" workflow on every push to `main`. Typecheck with `pnpm exec tsc --noEmit`, test with `pnpm exec vitest run`.

## Analytics: keep every click tracked

Umami Cloud is the analytics. The tracker is `components/analytics.tsx`, rendered once in `app/layout.tsx`; it loads only in production builds and only when `UMAMI_WEBSITE_ID` in `lib/analytics.ts` is set. Page views are automatic. Clicks are recorded through `data-umami-event` attributes, produced by the `event()` helper in `lib/analytics.ts`.

Rules, applied on every change and checked before every push:

1. **Never remove or bypass the tracker.** `app/layout.tsx` keeps `<Analytics />`; `lib/analytics.ts` keeps the website ID `60d41913-e7f0-4512-b462-42c3be1bf8e4`. Do not add a second analytics tool.
2. **Every new clickable element gets an event.** Any link, button or card added to the site is tagged with `{...event('<name>', { ...detail })}` when it is written, not later. Names in use: `work-card` (detail `card`, `via`: panel, title or read), `hero-button` (detail `button`: work, management, resume or linkedin), `nav` (detail `item`), `next-case` (detail `from`), `wheel` (detail `button`: play, pause or replay, on the lifecycle wheel), `contact` (detail `link`: email, resume or linkedin, in the footer), `leadership` (detail `via`: home, the homepage Management section's link to /leadership), `management` (detail `item`: the node clicked or focused in the homepage Management lineage graph, e.g. `node-fig-clean`). `clip` (detail `card` and `action`: play or pause, the preview button on a work card's clip). When the talks row's placeholders get real video links, tag them `talk` (detail `talk`). `overdrive` (detail `page`: index, search, lineage, film or hero, and `item`; on the hero pages the switcher's develop, cursor, thread or live), every interactive element on the experimental /overdrive pages. Reuse these names for the same kinds of element; add a new kebab-case name only for a new kind, and list it here.
3. **New pages need nothing extra** for page views, but their outbound links (resume, LinkedIn, external sites, prototypes) get an event.
4. **Before pushing, verify the attributes survived.** Run `pnpm build` and check that `out/index.html` still contains `data-umami-event="work-card"`, `"hero-button"` and `"nav"`, and that the page you changed contains the events you added. After the deploy, the live HTML at kbhawalk24.github.io must contain `cloud.umami.is/script.js`.
5. **Local never counts.** The tracker stays gated on `process.env.NODE_ENV === 'production'`, so the dev server, scratchpad renders and screenshots are never recorded.

Dashboard: https://cloud.umami.is (Kanchi's account).

## Content rules that are not derivable from the code

- Colleagues are credited by role, never by name. No names, emails, avatars or faces in screenshots; blur them.
- Client names appear in case studies only, never on the landing page.
- Figures only when sourced; the sources are in `docs/` and in `private/` (gitignored: the repo is public, and `private/source-kit.md` holds review quotes and the job-search files). Keep figures consistent across pages.
- The seven Intuit product areas are always listed in full, in this wording and order, matching the resume (seven since 12 Nov 2026; ingestion and the data lake control plane are out; "data maturity" is the one name for the clean-data and certification work, never "data quality certification"): discovery, access, lineage, observability, data maturity, instrumentation and pipeline authoring. Never summarised as a range.
- "Every designer who reported to me was promoted" stays as that sentence, never a count.
- No em-dashes anywhere in site copy. Plain, factual headings.
- Quotes only where they carry a fact the surrounding text does not.
- The hero is the split layout (11 Nov 2026): name and title on the left (no label above the name since 12 Nov 2026), her headshot (`public/images/kanchi.jpeg`) on an offset ledger-blue block on the right, on a ground that is white under the text and fades to a pale blue with a dot grid from the middle toward the right (`.hero-ground` in globals.css, 12 Nov 2026; no separate panel). The scroll reveal stays: the name rises and shrinks, and the intro and buttons blur in. The name and title sit in a lineage-node card spanning the left column (12 Nov 2026); the card's chrome and the thread fade out as the intro fades in, leaving the plain name (on phones and with reduced motion the plain name shows from the start). On desktop a lineage thread (`components/overdrive/hero/lineage-thread.tsx`) draws from a port on the card's right edge to the photo (the "Portfolio · 2017–2026" label was removed): straight while level, one rounded elbow on a grid column once the name rises, a packet along it and a ring at the photo. Restored 11 Nov 2026 after a short-lived static version; the about copy under it comes from `HERO.intro`, set in one style throughout: no colour, highlight or underline on any phrase (12 Nov 2026).
- The accent is deep blue `#1f4a8a` with a blue wash across the top (11 Nov 2026); it was violet.

## Layout rules

- **Everything spans end to end.** No heading and no paragraph, on any page, gets a max-width or `text-balance`; text runs the full width of its column and wraps where the column ends. No reading-measure caps.
- **Opening facts are a four-column table of short lines.** Under the hero of every case page: Role, Scope, Research, Shipped (the Management page uses Systems and Outcomes for the last two), each as stacked lines of a few words with the date or count set lighter in brackets (`PageFact.lines`). Never a sentence per cell.

# Review note, 19 October 2026

Everything below is on `main`, committed, not pushed. Run `pnpm dev` and open http://localhost:3000, or read the pages in order from the homepage. Each item says what to look at and what I was unsure about. Nothing needs to be answered in one sitting.

## What is live

- Homepage (22 October): the hero, then Selected work as three cards (agent, team, Search 2.0) and an Also list linking the catalog, onboarding and 605 pages, which stay live. About has a Before Intuit section with three 605 images.
- Timeline: `/timeline`, the career as a list of roles and highlights with track pills and one figure per highlight. No wheel.
- About: `/about`, with About me, How I manage, How I work with AI, In public (the two videos), The work.
- Six case study pages, in reading order:
  1. `/work/agentic-discovery`
  2. `/work/search-2`
  3. `/work/scaling-platform-design`
  4. `/work/self-service-onboarding`
  5. `/work/catalog-data-map-lineage`
  6. `/work/605-tv-analytics`
- Old URLs forward: `/605`, `/leadership`, `/work/finding-data`, `/work/trusting-data`.

## Pages you have not approved yet

You approved the copy for pages 1, 2 and 3 and the 2026 closing paragraph. Pages 4, 5 and 6 were built from the drafts without a review pass, so read those first.

- **Onboarding (4).** Two phrases are mine, not from a source: "where does a person belong in an automated flow?" and "with the human kept exactly where the edge cases are". The "7 days" stat tile describes the problem, not a result; cut it if a problem number on a stat strip bothers you.
- **Team page (3), changed 19 October.** Third stat tile and the last sentence of the multiplier section now say every designer who reported to you was promoted; the same line is in About under How I manage and on the homepage team card. Source: promotion records.
- **Catalog (5).** The help-channel anecdote about two near-identical customer tables comes from the old content file; the brief struck other claims from that file, so confirm this one is true. The 2025 finding that map search is adopted less than table search is on the page on purpose, as honesty.
- **605 (6).** "About 20 engineers and 5 product managers" is in the brief's own 605 appendix, so it stays; say so if you want headcount off this page too. The "three rules" for charts are my paraphrase of the deck's "that changed three things"; check the deck's list matches: five audiences per chart, colour means audience only, two metrics only with one audience.

## Visuals, added 19 October

Every case study page has a `visuals` list in its `lib/pages/<slug>.ts`. The 605 page has six real images from `_staging/605`. The other five show hatched "Image to come" slots: the captions describe the intended image and are provisional, and each entry's `todo` names the source file to export. Replace a slot by dropping the file in `public/work/<slug>/` and setting `src`, `width` and `height`.

## About page, rewritten 21 October

How I manage and How I work with AI are prose paragraphs now, rewritten with the humanizer skill (blader/humanizer 3.1.0): no bold leads, no "X, not Y" contrasts, no one-line closers; every figure and quote kept. The phrase "a place to visit, not a place to work" now appears only on the agent page. "Twenty transcripts become one set of findings in a day instead of a week" is still mine to confirm. The opening is the positioning line plus the founding-designer paragraph again; the work list at the bottom is gone.

## Open decisions, none blocking

The running list now lives in `docs/LATER.md`; the items below are kept as they stood on 19 October.

- **Push.** Pushing `main` deploys to GitHub Pages. Nothing is pushed until you say "ship".
- **Password protection.** The rebuild branch encrypted the work pages behind one password; `main` does not. Decide whether the six pages are public.
- **The wheel.** Loops at 28 seconds with the estate opener, the reach counter and the legend lines. The re:Invent segment link in About has no timestamp yet; send it when you find it.
- **180 petabytes.** Public, from the same re:Invent talk; not added anywhere yet.
- **The two readout figures.** "20 to 40% efficiency gains" and "19,200 access requests a month" are written up in the chat; not on any page.
- **Timeline.** Still the old homepage section. Entries whose page exists link to it; the rest point at the work section.
- **Colophon and pending passages.** The rebuild branch's "what I would do differently" passages (`content/drafts/pending.md` on that branch) are not on `main`; the short pages have no colophon line.

## How to give feedback

Paste a page's URL and the change, or edit the copy in `lib/pages/<slug>.ts` and `lib/about.ts` directly; every word on a page lives in one of those files.

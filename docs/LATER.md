# Parking lot

Things noticed or wanted that are not in the current step. Nothing here blocks shipping. When one of these comes up again, the answer is "it is in LATER.md", not a new branch.

Rule for adding to this list: one line, what it is, where it would go, what it needs. No designing here.

## Decided for after the current steps

- **Lineage graph, retired 19 October.** Built and then replaced by the plain-list timeline at the user's request; the component and data are in git at commit 7c3b588 if the idea comes back.
- **Lineage graph in place of the career timeline (superseded).** The Claude Design "Landing B - Lineage v2" concept, rebuilt light, in the site's fonts, with exact figures and no team size. Nodes link to the six pages and About; the inspect panel opens beside the graph on desktop and below it on phones. Replaces the homepage timeline section; the nav's Timeline link keeps pointing there.
- **Visual placeholders on the six pages.** A `visuals` slot on the page template under the stats, captioned, 4 to 6 per page, striped placeholder until the export lands in `_staging/<slug>/`. The 605 exports are already in `_staging/605/`.

## Open decisions (from the review note)

- **Push.** Nothing is pushed until the word is "ship".
- **Password protection** of the six work pages. The rebuild branch had one password; `main` has none.
- **The catalog card's "30K tables".** Rounded. Needs the exact figure from the lineage launch post or stays as "about 30,000".
- **180 petabytes** (public, re:Invent 2025). Tried in the first arc's thesis on 21 October and reverted the same day; the thesis now says 'a data lake of 320,000 tables and the data products built on it'. Still unplaced.
- **The two FY27 readout figures** (20 to 40% efficiency gains; access requests 6,500 to 19,200 a month). Not on any page until approved.
- **"What I would do differently" passages** from the rebuild branch (`content/drafts/pending.md` there). Not on `main`.
- **Colophon line** on the short pages.

## Ideas from the benchmark, not scheduled

- Photos of workshops or the team (two of eight senior sites).
- Testimonials or quoted review lines (two of eight). The team page already quotes the engineering manager inline.
- A deeper artifact behind a gate, such as a deck for in-person walkthroughs (four of eight).
- The "who is kanchi bhawalkar?" search-results conceit from the Claude Design A variant. Two conceits on one homepage compete; parked.

## Removed from the landing page on 19 October

- The "How I lead" pointer and the two talks. Both live on About (How I manage, How I work with AI, In public). The talks could come back to the landing page if the benchmark pattern (7 of 8 sites surface talks on the homepage) matters more than the simpler page.
- The lifecycle wheel is no longer mounted anywhere (removed from `/timeline` on 21 October). `components/lifecycle-wheel.tsx` and `components/capability-map.tsx` stay in the tree with their data in `lib/capability-map.ts`; delete them or give the wheel a home.

## Hygiene

- Forwarding pages (`/605`, `/leadership`, `/work/finding-data`, `/work/trusting-data`) carry the homepage title in the tab. Harmless; a `title` per forward would be tidier.
- `_staging/` is ignored by git on purpose: it holds raw exports, some with names and internal URLs. Only cropped, checked images go into `public/work/`.

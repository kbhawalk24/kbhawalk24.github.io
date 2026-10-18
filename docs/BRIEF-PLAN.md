# Plan for executing BRIEF.md (branch brief-rebuild)

Do NOT push or merge to main: the Pages deploy runs on main pushes and step 8 of the brief is a preview gate where the user must say "ship" first.

## Done on the Mac (commit 2fdf054)
- BRIEF.md; lib/case-study.ts (page types); content/case-studies.json; content/numbers.json (seeded from every outcome table, the homepage tables, and the timeline figures; has an allow list); content/impact/*.json (4); content/work/*.ts (Appendices A–D as typed Section/Block objects, PROPOSED passages omitted, `differently: null`); content/drafts/pending.md.
- `_staging/` is gitignored and exists only on the Mac: 25 candidate images copied per slot plus a README. ffmpeg is not installed there, so no video frames; the README says so. The cloud has no ~/Documents/Work: do not redo staging.

## Remaining, in brief order

### Section 2, removals
- Delete lib/site-content.ts and everything importing it: components/case-study-layout.tsx, case-study-placeholder.tsx (+ test), case-study-index.tsx, case-study-nav.test.tsx, chapter-nav.tsx, visual-slot.tsx (rewrite), lens.tsx (remove the lens everywhere, incl. site-header and the LensProvider in pages).
- Delete components/hero.tsx + hero.test.ts and components/numbers-strip.tsx (the brief's homepage replaces them). Delete app/605, app/leadership, app/work/trusting-data. app/work/page.tsx redirects to "/".
- lib/timeline-data.ts: remove every "~" (banned in built HTML) and use words; remove the headcount sentence ("550 engineers and 16 product managers") and "team of product designers"; "2,664 → 6,000+" → "2,664 → 6,673" (Jul 2024 → Mar 2026); 605 "$20M+" → "$2M" ("Additional booked revenue from the redesign, 2021"); "7,000+" → "1,600" newly certified data products (FY24); drop "+42%" and the "~2,000" detail (use "curated tables that had taken three to four tools to find"); drop the "2×" Copilot metric; lineage "~30K/~7K" → "about 30,000 tables and 7,000 pipelines", metric "30,000"; "~20" → "around 20". Intern entry stays under Senior Product Designer. Remove STATS and its test. TRACKS labels → IC Design / Strategy / Team Delivery. Entry hrefs → new routes or drop them. Fix lib/timeline-data.test.ts (no PAGES/STATS).

### Section 3, structure
- Nav: Work (→ /), About (/about), Timeline (/timeline), Resume ↗ (/Kanchi_Bhawalkar_Resume.pdf: `git mv public/kanchi-bhawalkar-resume.pdf public/Kanchi_Bhawalkar_Resume.pdf`), LinkedIn ↗ (https://www.linkedin.com/in/kanchib). External links target=_blank rel=noopener with a glyph. No Contact link.
- Footer: name, email link (kbhawalk@gmail.com), Resume, LinkedIn. No location, no phone.
- Homepage: name + the positioning sentence (keep the illustration beside the name; flag it in the preview), StatStrip (four tiles from 3.1.B, counting up from before to after once per session via sessionStorage; reduced motion = end values), the 2×2 case study grid from content/case-studies.json, then the line "Case studies are password-protected. The password is in my application."
- USER'S EXTRA REQUEST for the grid cards (sent mid-turn; honor it): stacked card format: cover slot on top (16:10 striped placeholder), small role-tag badge, title, one line of description, "Read the case study →"; the impact numbers as a stat strip UNDER the text (value in the accent colour in the heading font, label beneath in the 11px uppercase mono `label-micro` style), NOT as a badge over the image. Split the one-line figure from case-studies.json into those stats. Status chip "Password".
- /about (3.3): About me (positioning sentence, the short first-person paragraph, the two education lines, Resume/LinkedIn buttons, email link); "As a design manager" (intro line + table D); "How I manage" (the five paragraphs E, exact copy); compact list of the four case studies (title + one-line figure). Sticky section menu: About · As a design manager · How I manage.
- /timeline (3.2): move CareerTimeline there; segmented control for the three tracks (plus All); roles that started before 2024 collapsed by default behind a "Show" control; apply the removals.

### Section 4, case study pages
- components/case-study-page.tsx renders a CaseStudy in the seven-section order with a sticky section menu (left rail on lg; a jump `<select>` bar on phones): summary block, `<ImpactViz id>`, primer, problem, decisions, extra sections, outcome table (Figure · Date · Source · Whose/Note), "What I would do differently" (when `differently` is null, the heading plus one honest line such as "Not published yet."), credits, the COLOPHON line. Routes app/work/<slug>/page.tsx ×4. Visual blocks render `<VisualSlot>` placeholders.

### Section 4.2, impact animations (components/impact/*.tsx)
- Shared wrapper: heading, Replay button, one-sentence summary (also the accessible description), source line; plays once on scroll into view; before state drawn, held about 600 ms, then the after; total 1.5–2.5 s ease-out; no loops; useReducedMotion → end state; all numbers real DOM text; accent colour for after, neutral for before.
- FindingDataViz: two duration bars on a 0/15/30/45 min ruler + three count-up tiles.
- PlatformViz: vertical ladder on a log axis labelled "log scale" with units days · hours · minutes, five dated points top to bottom; beside it the three-point users step line (no line between points not measured monthly).
- TeamViz: five paired before/after bars, each on its own labelled scale, staggered; a 17-dot incident row going out to 0; a clean-data fill bar <1% → 80%; source line names the launch posts and marks the last two as shared.
- SixOFiveViz: 32 tiles collapsing to 2; render-time bars 3–4 min → 1–1.5 min on one axis; workaround clock 30 min / 1–2 hours / one report.
- Data from content/impact/*.json. Ranges draw as a band from low to high. Homepage StatStrip count-up is part of this family.

### Section 5, visual slots
- components/visual-slot.tsx: props id, aspect, caption, alt (required; the check script fails without it), status ('placeholder' default | 'final'), src, kind (image | video | viz). Placeholder = neutral box with caption and alt text. Everything ships as placeholders.

### Section 6, access
- devDependency staticrypt@3; scripts/encrypt-work.mjs; `"build": "next build && node scripts/check-content.mjs && node scripts/encrypt-work.mjs"`. Encrypt out/work/<slug>/index.html in place with the password from PORTFOLIO_PASSWORD, `--remember 30 --template-title "<page title>" --template-instructions "The password is in my application." --template-button "Open" --short` and brand colours. Fail the build with a clear message when PORTFOLIO_PASSWORD is unset so plain pages are never published. After encrypting, assert the file no longer contains "Outcome table" or the summary sentence.
- .github/workflows/deploy.yml: `env: PORTFOLIO_PASSWORD: ${{ secrets.PORTFOLIO_PASSWORD }}` on the Build step. The user must add that repository secret before shipping.

### Section 7, build checks
- scripts/check-content.mjs: scan the visible text (strip script/style/tags; include alt and title attributes) of every out/**/*.html for the brief's banned strings (visible text, not raw HTML: Next chunk hashes contain letter runs like DDE/MJ). Numbers check: every numeric token on /, /about, /timeline and the four /work pages must appear in a figure in content/numbers.json (ignore years 1990–2099, tokens glued to letters such as P0/FY24, day numbers next to a month name, and the allow list). Every value in content/impact/*.json must appear in numbers.json. Fail if a VisualSlot has no alt.
- Motion checks as vitest: render each ImpactViz with useReducedMotion mocked true and assert the end-state labels; assert no duration constant exceeds 2500 ms and no `repeat: Infinity`.
- Layout: 16px gutters, no horizontal scroll at phone width, focus states, heading order, alt on every image. Lighthouse (`npx lighthouse` against `npx serve out`) on / and /work/my-teams-work; report scores.
- Also: remove @vercel/analytics from app/layout.tsx; metadata description = the positioning sentence. Keep the fonts (League Spartan, Mulish, IBM Plex Mono), the white ground with the purple gradient wash, shadow-soft cards without borders, no em-dashes in prose. Run tsc, eslint, vitest, and `PORTFOLIO_PASSWORD=preview-only pnpm build`.

### Section 8, preview gate
STOP and show: the route list; the rendered text of / and /work/my-teams-work; the placeholder list per page; the lint output; the _staging README (it exists only on the Mac; say so and summarize it); the git diff summary; the items to confirm from brief section 1 (605 title line; "$20M+" left off in favour of "$2M"; the 2026 promotion month; the "15 user visits" count; the colophon text) plus the illustration kept on the homepage and the PORTFOLIO_PASSWORD secret. Wait for "ship" before touching main.

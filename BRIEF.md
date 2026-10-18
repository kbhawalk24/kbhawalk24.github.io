# Portfolio site brief for Claude Code

One file. It holds the build instructions, the homepage copy and numbers, the content rules, and the full page copy for all four case studies. Nothing else is needed from outside this file except the image source folders on this Mac.

Repo: the "Design Portfolio" folder (Next.js), deployed to kbhawalk24.github.io.

How to run this: save as `BRIEF.md` in the repo root, open Claude Code there, and paste:

> Read BRIEF.md and follow it in order. Stop and show me a local preview at step 8 before pushing anything.

---

## 1. Decisions already made (do not ask again)

- Homepage is short: positioning, stat strip, and a top-level 2×2 grid of the four case studies. "About me", "As a design manager" and "How I manage" live on `/about`. The chronological timeline lives on `/timeline`. Resume (PDF) and LinkedIn are nav links that open in a new tab.
- Every number in this file stays on the site. Do not round, cut, approximate, or recompute any figure. Where a figure is marked "(own measure)" or "(own research)", publish it with that label.
- Access: `/`, `/timeline` and `/about` are public. The four `/work/*` pages are encrypted at build time with staticrypt behind one shared password from the env var `PORTFOLIO_PASSWORD` (never committed). GitHub Pages cannot password-protect pages server-side, so this is the mechanism.
- Passages wrapped in `⟦PROPOSED … ⟧` are not approved yet. Keep them out of the built site and store them in `content/drafts/pending.md`.
- Reports are never named. Credit is by role ("a designer on my team").
- No headcount or team size anywhere on the site.

Items still to be confirmed by me, listed so you can flag them in the preview, not block on them: the 605 title line; "$20M+" (left off; "$2M" used instead); the month of the 2026 promotion (page says "in 2026"); the "15 user visits" count; the colophon text.

## 2. Remove first

- Delete `lib/site-content.ts` and `lib/case-studies.ts`. They contain invented claims.
- Remove any embed of the April 2026 "Design for Data" page and any image with team photos or names.
- Remove from every page and from the timeline data: "three designers", "team of three", any headcount, "24 launches", "11% → 81%", "merged pull requests", "Magellan for Tax", "99% accuracy", "35 → 0", "~2,700", "15 days → 2 hrs", "−50%", "500+ rows", "first-of-its-kind", "Promoted every direct report", "Lead Product Designer" (605 title), "Sunnyvale", "~45 days → seconds".
- Move the intern line to the Senior Product Designer period, summer 2023: "Managed a summer 2023 design intern who converted to full-time and later joined my team."
- The TIBCO role stays off the timeline (already removed).

## 3. Site structure

Routes: `/`, `/about`, `/timeline`, `/work/finding-data`, `/work/building-the-platform`, `/work/my-teams-work`, `/work/605`.

Nav, in this order: Work (→ `/`) · About · Timeline · Resume ↗ · LinkedIn ↗. The last two open in a new tab (`target="_blank" rel="noopener"`) with an external-link glyph. Resume links to `/Kanchi_Bhawalkar_Resume.pdf` served from `public/`; if that file is not in the repo, ask me for the PDF path before building and do not invent one. LinkedIn links to https://www.linkedin.com/in/kanchib. Footer: name, email link, the same Resume and LinkedIn links. No location.

The homepage is short: positioning, stat strip, case study grid. "As a design manager" and "How I manage" live on `/about`.

### 3.1 Homepage, top to bottom

**A. Positioning (one sentence, no numbers).**
"Design manager and founding designer of an internal data platform used across Intuit, former software engineer, still designing."

**B. Stat strip (four tiles, directly under A).**

| Figure | Caption | Note (for the hover/footnote, one short line) |
|---|---|---|
| 45 days → under 4 min | Time to find, get access to and use data, 2021 → 2026 | 2021 baseline is my own measure; 2026 figure from an observed-task study of the agent |
| 2,664 → 6,673 | Monthly users of the platform, Jul 2024 → Mar 2026 | Platform figure across my time as manager |
| 17 → 0 | Peak-season P0/P1 data incidents, tax year 2025 | Result shared by many teams; my team built the tooling |
| <1% → 80% | Of the data estate meeting the clean-data standard | Public figure, AWS re:Invent 2025 |

**C. Case study grid (2×2 desktop, one column on phone).** Cards in this order, content from `content/case-studies.json`:

| Slug | Title | Role tag | One-line figure | Status chip |
|---|---|---|---|---|
| finding-data | Finding data: three decisions in five years of search | Principal → Manager | First result correct 81.31% → 89.24% (2025); question to answer 45 min → 4 min with the agent (2026) | Password |
| building-the-platform | Founding designer of Intuit's data catalog: from a list of tables to a platform | Senior → Principal | Top-five click-through 68% → 96% (2022–23); onboarding 1–2 weeks → under 24 hours (2024) | Password |
| my-teams-work | Leading the designers behind Intuit's data platform | Manager | Access wait 2–3 weeks → 3 days; decryption 9 → 3 days; approvals 24 h → near-instant (2025) | Password |
| 605 | 605: three analytics products for TV advertising | First product designer | Three products shipped; $2M in added booked revenue from the redesign (2021) | Password |

Under the grid, one plain line: "Case studies are password-protected. The password is in my application."

Nothing else on the homepage. The two blocks below (D and E) go on `/about`.

**D. "As a design manager" (block with a table) — on `/about`.**

Intro line: *August 2024 – July 2026. The designers on my team shipped the work below. I set the strategy, built the shared research base, and kept designing.*

| Area | Result | When |
|---|---|---|
| Discovery | Time to discover data 14.2 hours → 9.4 hours | Aug 2024 → Jul 2025 |
| Discovery | Search session conversion 41% → 61% | Aug 2024 → Jul 2025 |
| Agent in coding tools | 711 active users; 56,560 tool calls in 90 days | Mar 2026 |
| Access | Real-time data access 2–3 weeks → 3 days; decryption access 9 days → 3 days; internal approvals 24 hours → near-instant | 2025 |
| Access | One migration: 5,000 tables in a week, 200+ hours saved | Aug 2025 |
| Lineage | Root cause found for 19 marketing data incidents in one tax season | Tax year 2025 |
| Clean data | Certification workflows across every data-production path; <1% → 80% of the estate | Nov 2025 |
| Reliability | Peak-season P0/P1 incidents 17 → 0 | Tax year 2025 |
| People | Summer intern → full-time → joined my team; one senior promotion in 2026; two more promotion cases approved before my role ended | 2023–2026 |

**E. "How I manage" (five short paragraphs, each a practice plus one result) — on `/about`.** Use this copy:

1. **Design at the point where the problem is defined.** My first change as a manager was where I spent my time: in the meetings where a problem was framed, asking questions before a specification existed. I argued for two features the roadmap did not have, a view of the queries other people run against a table and a person's saved working set of data, and my team designed both. The engineering manager wrote that they "would not have happened if not for Kanchi's persistence and design sponsorship."
2. **One research base for every data designer.** I had the designers pool their user visits, 8 targeted surveys and 11 help channels into one set of findings. It produced the list of what to build next, and my manager wrote that it showed in what was added to the roadmap.
3. **One way in, one list.** Requests for design came from many product teams. I set up a single intake process and one tracker of what each designer was working on, and pushed back when a designer was about to be spread across two products.
4. **Decisions that get made.** My designers told my manager what they valued: clarity when requirements were unclear, boundaries when work kept changing, and getting engineering leads and several product managers into one room to settle a decision.
5. **AI tools in my own work first.** I used coded prototypes, AI research synthesis and AI-made videos in my own design work; my manager wrote that he then saw every designer on my team adopt them. One designer's use of a prototyping tool with developers cut development time by as much as 90% on some features.

### 3.2 `/timeline`
Move the existing chronological history here. Segmented control for the three tracks (IC Design · Strategy · Team Delivery). Entries older than 2024 collapsed by default. Apply the removals in section 2.

### 3.3 `/about`, top to bottom
1. **About me.** The positioning sentence, then one short paragraph in the first person: founding designer of Intuit's data catalog from June 2021, grew it into the data discovery platform, became its design manager in August 2024; before that, first product designer at 605 (2017–2021), three analytics products shipped; started as a software engineer. Then two lines: MS Information (HCI), University of Michigan, 2017; BE Computer Engineering, University of Pune, 2012. Then the Resume ↗ and LinkedIn ↗ links as buttons, and the email link.
2. **As a design manager.** Block D from 3.1, intro line and table.
3. **How I manage.** Block E from 3.1, five paragraphs.
4. Links to the four case studies (title and one-line figure only, reuse the card component in a compact list).

Sticky section menu on this page too: About · As a design manager · How I manage.

## 4. Case study pages

Every `/work/*` page uses the same seven sections, in order, with a sticky section menu (a jump menu on phone):

1. Summary block: role, dates, one sentence on what I did, headline metrics with dates
2. Plain-language primer (with one diagram slot)
3. The problem, with one piece of evidence
4. Three to five decision sections (headings are claims or outcomes)
5. Outcome table: Figure · Date · Source · Whose
6. What I would do differently
7. Credits

The page copy is in Appendices A–D. Render it as written. Lines that start with `[Visual:` or `[Hero visual:` become `<VisualSlot>` placeholders (section 5). The "Outcome table" in each appendix is section 5 of the page. Each page ends with a colophon line: "Where AI was used on this page, and where I overruled it: [to write]."

### 4.1 Writing rules (apply when touching any copy)
- Lead with the outcome or the decision, then the path, kept short.
- "I" is for my decisions. Work by reports is "a designer on my team" or "my team designed". Never "we" where it hides what I did.
- Each decision section gives the option chosen, the option it beat, the constraint that decided it, and what it cost.
- Every metric carries its date; the Outcome table carries its source and whose result it is.
- Plain language for an outsider. Never use: DDE, A2D, CDC, FMH, D4D, MCP, GED, C360, DACM, UIP, SPP, BPP, FGAC, Superglue, Nebula, Data Copilot, Alation, "Collections" as a product name (write "a person's saved working set of data" on first use, "collections" lower-case after). Cursor and Claude are public tools and may be named.
- No filler, no "game-changer" language except inside a quote, no repeated sentence shapes.
- Headings are claims ("Organize data by what it means, not where it is stored"), never labels ("Approach").

### 4.2 Impact animations (one per case study, plus the homepage stat strip)

Every case study page carries one motion-based data visualization that shows the impact of the work. It sits directly under the summary block, before the primer, and it is the first thing a reader sees after the title. Build these as an `<ImpactViz>` component family, SVG rendered in React with the Web Animations API or Motion (motion.dev); no heavy charting library, no canvas, no 3D, no gauges or dials.

Rules for all of them:
- Animate only between measured points. Every point shown is a figure from `content/numbers.json`, with its date and label rendered as text beside it. Never interpolate, smooth, or invent intermediate values; if there are three measurements, the chart has three points.
- Before state first, then the change. The "before" value is drawn fully and held for about 600 ms before the "after" value animates in, so the reader sees the baseline.
- Same scale for before and after. Where the range forces a log scale (days to minutes), label the axis "log scale" in plain text.
- Play once when the element scrolls into view, then stop; offer a small "Replay" control. Total duration 1.5–2.5 s, ease-out. No infinite loops.
- `prefers-reduced-motion`: render the end state statically with the same labels. The page must make the same point with motion off.
- Numbers and labels are real text in the DOM (not paths), so recruiters, screen readers and AI readers can read them. Each viz has a one-sentence text summary immediately below it, which doubles as its accessible description.
- One accent color for "after", a neutral for "before", nothing else. Consistent across all four pages and the homepage.
- Attribution is part of the viz: a short source line under each ("Observed-task study, Mar 2026"; "Own measure, 2021"; "Public, AWS re:Invent 2025"). Where a result is shared with other teams, the source line says so.

**Homepage stat strip.** The four tiles count up from the "before" value to the "after" value on first load (once per session), with the caption static. Reduced motion: end values only.

**Finding data (`/work/finding-data`), id `fd-impact`: "From 45 minutes to 4 minutes."**
Two horizontal duration bars on one time axis, before and after. The 45-minute bar draws left to right; then the 4-minute bar draws beneath it. A thin ruler marks 0, 15, 30, 45 min. Underneath, a second row of three small stat tiles count up: top-five click-through 68% → 96% (Apr 2022 → Apr 2023), first result correct 81.31% → 89.24% (Mar 2025), agent users 711 (Mar 2026). Source line: "Observed-task study of the agent, March 2026. Earlier figures from year-end reviews and launch posts."

**Building the platform (`/work/building-the-platform`), id `bp-impact`: "From 45 days to under 4 minutes."**
A vertical ladder on a log time axis with units marked (days · hours · minutes). Five dated points animate in top to bottom, each labelled with its value, date and source tag: 45 days (2021, own measure) · 20 days (2023, public) · 14.2 hours (Aug 2024, platform) · 9.4 hours (Jul 2025, platform) · 4 minutes (Mar 2026, agent study). Beside it, a second small chart: monthly users as three dated points, 1,886 (FY24 start) · 2,664 (Jul 2024) · 6,673 (Mar 2026), drawn as a rising step line with the points labelled; no line between points that were not measured monthly. Source line: "Dates and sources per point; the 2021 baseline is my own measure."

**My team's work (`/work/my-teams-work`), id `tw-impact`: "What changed in the two years I led the team."**
A grid of paired before/after bars, one row per result, all on their own labelled scales, animating top to bottom with a short stagger:
- Access to real-time data: 2–3 weeks → 3 days (Mar 2025)
- Decryption access: 9 days → 3 days (Aug 2025)
- Internal approvals: 24 hours → near-instant (Sep 2025)
- Time to discover data: 14.2 hours → 9.4 hours (Aug 2024 → Jul 2025)
- Search session conversion: 41% → 61% (Aug 2024 → Jul 2025)
Then a 17-dot row for peak-season P0/P1 incidents that goes out dot by dot to 0 (tax year 2025), and a fill bar for clean data <1% → 80%. Source line names the launch posts and marks the last two as results shared by many teams.

**605 (`/work/605`), id `s6-impact`: "Thirty-two reports became two pages. Fifteen audiences became five."**
Three short sequences, left to right: 32 small report tiles collapse into 2 pages; a chart-render timer runs 3–4 minutes then 1–1.5 minutes (two bars, same axis); a workaround clock: 30 minutes for two audiences and two metrics, 1–2 hours for five audiences and four metrics, then the single-report time in the shipped design. Source line: "April 2021 deck; timings from user walkthroughs."

Each viz's data lives in `content/impact/<slug>.json` and is validated against `content/numbers.json` by the build check in section 7. Put the id in the page as a `<VisualSlot>` of type "viz" so the placeholder box appears until the component is built, and build the components in this pass (they do not depend on screenshots).

## 5. Visual slots and image staging

Build `<VisualSlot id aspect caption alt status src>`. `alt` is required; fail the build without it.
- `status="placeholder"`: a neutral box with the caption and alt text. Nothing else.
- `status="final"`: image at `public/work/<slug>/<id>.webp`, lazy-loaded, caption below. Video slots: short muted looping mp4 with a poster, reduced-motion fallback to the poster.
- The page must read correctly with images disabled: alt text and captions carry the content.

All slots ship as placeholders in this pass. For each slot, the appendices list candidate source files on this Mac under `~/Documents/Work/Intuit (2021-2026)/` and `~/Documents/Work/605 (2017-2021)/`. **Do not copy any of them into `public/`.** Copy PNG/JPG/SVG candidates, and one frame every 30 seconds from each MP4 (ffmpeg), into `_staging/<slug>/<slot-id>/` with a README that maps files to slots. Skip `.fig`, `.sketch` and `.jam` files; list them in the README as "open in Figma/FigJam and export". Add `_staging/` to `.gitignore`. I will crop and remove names, Slack content and internal URLs before anything goes in `public/`.

## 6. Access

staticrypt on the four `/work/*` output pages, one shared password from `PORTFOLIO_PASSWORD`, remember-me for 30 days. The locked view shows the page title, one password field, and the line "The password is in my application." Nothing from the page body may be present in the HTML before decryption (check the built file).

## 7. Build checks (scripts/check-content.mjs, run in `npm run build`)

Fail the build if any built HTML contains: `DDE`, `A2D`, `CDC`, `FMH`, `D4D`, `MCP`, `GED`, `C360`, `DACM`, `UIP`, `SPP`, `BPP`, `FGAC`, `Superglue`, `Nebula`, `Data Copilot`, `Magellan`, `Alation`, `~`, `approximately`, `three designers`, `24 launches`, `11%`, `/Users/`, `.fig`, `.mp4`, `Documents/Work`, `PROPOSED`, `⚠`, or any of the designer names Anaisha, Carolyn, Sanjana, Sooji, Yeonji, MJ, Elmer.

Seed `content/numbers.json` from the four Outcome tables plus the homepage tables. Fail the build if a figure on any page is missing from it, and fail if any value in `content/impact/*.json` is not in it (the animations may only move between measured figures).

Motion checks: every `<ImpactViz>` renders its end state and labels with `prefers-reduced-motion: reduce`; no animation runs longer than 2.5 s; nothing loops; all numbers in a viz are selectable text.

Layout: 16px side gutter, no horizontal scroll at phone width, visible focus states, correct heading order, alt on every image. Lighthouse performance and accessibility ≥ 90 on `/` and one `/work` page.

## 8. Preview gate, then deploy

Show me: the route list; the rendered text of `/` and of `/work/my-teams-work`; the placeholder list per page; the lint output; the `_staging` README; the git diff summary. Wait for me to say "ship". Then commit, push to `main`, confirm the GitHub Pages deploy, and confirm the password gate works on the live URL.

---

# Appendix A — /work/finding-data

**Title:** Finding data: three decisions in five years of search

**Summary block**
- Role: Lead designer for the data catalog, 2021–2024. Design manager, still designing, 2024–2026.
- Where: Intuit, internal data platform.
- What I did: I designed how people at Intuit search for data, from a keyword catalog in 2021 to an agent inside the coding tools engineers use in 2026.

What was measured. No single measure ran across all five years. These are three points where one was.

| When | Measure | Change |
|---|---|---|
| Apr 2022 → Apr 2023 | Searches where the person clicked one of the top five results | 68% → 96% |
| Mar 2025 | Searches where the first result was the right one | 81.31% → 89.24% |
| Mar 2026 | Time from a question to an answer with the agent, in an observed-task study | 45 minutes → 4 minutes |

The first figure is from the first catalog I designed. The second is from the launch of search across the map of data: I designed the first version, a designer on my team took it to launch, and engineers delivered the gain.

[Hero visual: the same question asked in 2023, 2025 and 2026.]

**The problem**

Intuit's data lake held 320,000 tables in December 2025. Of 666 questions sent to the company's data help channel over one year, 43% were people trying to locate the right data, and 73.0% of all the questions were resolved only because a specific person knew the answer.

The goal stayed the same for five years. Someone with a business question should reach data they can trust without having to ask a person.

**1. Organize data by what it means, not where it is stored**
*2022–2023 · my design*

The choice. The catalog, like the commercial one it replaced, organized data the way it was stored: warehouse, schema, table. Search returned physical tables. The same customer data existed as a batch table, a real-time stream and a marketing copy, and nothing connected them. The easier option was to keep that structure and add better filters. The harder one meant reworking the home page, browsing, search, results and detail pages around a new unit.

What I picked. A map of data: one entry per business concept, such as a customer, with an owner and a description. Every physical copy sits beneath it. In 2023 I added one view of every place a piece of data is hosted, production and test side by side.

Why. The company was reorganizing its data by business domain, and people needed to stop guessing whether a real-time source existed.

What happened. It took several rounds of feedback with around 20 users. No catalog we evaluated organized data this way. The idea kept needing explaining. My 2024 interviews found that people know what kind of object they want, a table or a stream, so the rebuilt search of 2024–2025 gives each kind its own tab and keeps the map as one of them. In 2025 my team's research still found map search adopted less than table search, because people prefer physical objects.

[Visual: one business concept with its copies beneath it.]

**2. Build for the data people already use**
*2024–2025 · research and strategy mine; collections designed by my team*

The choice. Whether to add collections, a person's saved working set of data. Engineering criticized the idea.

What I picked. I argued for collections as design strategy and kept arguing.

Why. In spring 2024 I interviewed 20 catalog users while they did their own work, and brought engineers along to watch. People arrived at the catalog with a lead from a colleague or a help channel, validated what they found with past queries and experts, and crossed about six tools to find and check one dataset (own research). They looked for new data about one time in five; four times in five they went back to data they already knew (own research). Search was never the whole job.

What happened. Designers on my team designed collections and shipped it on August 7, 2025. The engineering manager wrote that it "would not have happened if not for Kanchi's persistence and design sponsorship." The agent in the next section checks a person's collections before it searches.

[Visual: a collection.]

**3. Put the catalog inside the tools people already work in**
*2023–2026 · the 2023 assistant, the strategy and the answer specification are mine; response patterns by a designer on my team*

The choice. In 2023 I was the sole design lead for a chat assistant inside the catalog. I consolidated the work of 16 hackathon teams and 58 collaborators into one flow. It shipped in 4 months, more than 500 people used it each month, and Intuit's CTO presented it at Investor Day 2023. Usage did not hold after 2024. The options were a better chat window or a different place for the catalog.

What I picked. I set the strategy: move the catalog into the coding tools people already used, Cursor and Claude, through a tool server, and do not build a better chat window.

Why. The 2024 interviews told me where the assistant had gone wrong. Only one of the 20 people used the AI-powered search at all. Those who had tried it found it unreliable, and the window to earn trust was short: when the first answer failed, people did not come back. They were already working in their editors, so the catalog had to go there, with finding the data, checking access and running the query in one place.

What I designed. The specification for how the agent answers three kinds of request: looking up a known table, choosing a table for a use case, and asking a question that needs a value. Its rules include: never show a query that has not been run, never invent a table name, ask before running anything, and check the person's collections first. I recruited the first users, tested the answers against real questions and refined the rules. A designer on my team built the response patterns that shipped and benchmarked their precision.

What happened. By March 11, 2026 the agent had 711 active users and 56,560 tool calls in 90 days. In an observed-task study, the time from a question to an answer fell from 45 minutes to 4 minutes.

[Visual: the agent answering in a coding tool, beside an excerpt of the specification.]

**What I would do differently**

⟦PROPOSED: I would have run the usability study I planned in 2022 instead of testing one feature at a time; the inconsistencies my manager noted that year would have surfaced sooner. Before the 2025 rebuild I would have given exact-name search its own measure, because it got worse while everything else improved. And I would have treated research as a decision, not a report: on four projects in 2025 it did not change the direction of the work.⟧

**Credits**

Designers on my team designed collections, took search across the map of data from my first version to launch, and built and benchmarked the agent's response patterns. Engineers and a search-model team delivered the search precision and speed and built the agent's servers.

**Outcome table**

| Figure | Date | Source | Whose |
|---|---|---|---|
| 320,000 tables | Dec 2025 | Public: AWS re:Invent 2025 | Scale |
| 666 questions; 43%; 73.0% | One year, analysis dated Aug 2025 | Help-channel question analysis | Research |
| 68% → 96% | Apr 2022 → Apr 2023 | FY23 year-end review | Mine |
| Around 20 users | FY22 | FY22 year-end review | Mine |
| 20 interviews; one of 20 used AI search; about six tools; one time in five | Spring 2024 | My July 2024 research readout; own research | Mine |
| 16 teams, 58 collaborators, 4 months, 500+ a month, Investor Day 2023 | FY24 | FY24 year-end review | Mine |
| 81.31% → 89.24% | Mar 26, 2025 | Launch post | Engineering delivered; first design mine; a designer on my team took it to launch |
| Collections, Aug 7, 2025; the quote | 2025 | Launch post; written feedback | Team; quote is the engineering manager's |
| 711 users; 56,560 tool calls; 45 → 4 minutes | As of Mar 11, 2026 | Launch post, Mar 16, 2026; FY27 strategy readout | Shared |

**Visual slots and staging sources** (paths under `~/Documents/Work/Intuit (2021-2026)/`)

| Slot id | Caption | Candidate files |
|---|---|---|
| fd-hero | The same question asked in 2023, 2025 and 2026 | `Media/Videos/Demos and talks/Natural_language_search.mp4`; `Media/Videos/Demos and talks/dde_search_v3.mp4`; `Media/Videos/Demos and talks/DDE-Cursor-Claude.mp4`; `Media/Videos/Demos and talks/3x-DDE-Agent-Demo.mp4` |
| fd-d1 | One business concept with its physical copies beneath it | `Projects/DDE/Data Product V2.fig` (export) |
| fd-d2 | A collection | `Media/Videos/Demos and talks/8_04_25 DDE Data Collections Launch Announcement.mp4`; `Projects/DDE/DDE - Data Collections.fig` (export) |
| fd-d3 | The agent answering in a coding tool, beside the answer specification | the two agent videos above; `Reference/Team-Misc/Updating Cursor Output.docx` (screenshot an excerpt, redact names) |
| fd-d3b (optional) | The 2023 assistant | `Media/Videos/Demos and talks/QueryDashboard.mp4`, `generateQuestions.mp4`, `AskThisTableAQuestion.mp4`; `Projects/DDE/Data Copilot MVP.fig` (export) |

---

# Appendix B — /work/building-the-platform

**Title:** Founding designer of Intuit's data catalog: from a list of tables to a platform

**Summary block**
- Role: Founding designer of the catalog. Senior, then Principal Product Designer, June 2021 – August 2024. I kept designing parts of it as a manager until July 2026.
- Where: Intuit, internal data platform.
- What I did: I designed the catalog that replaced a commercial product, then the parts that turned it into the place where people judge data, trace it and get it.

| When | State |
|---|---|
| June 2021 | The catalog listed data-lake tables and their columns. Nothing told you whether to trust a table or who owned it. The company paid for a commercial catalog alongside it. By my own measure, finding, getting access to and exploring data took about 45 days |
| Fiscal 2023 | Commercial catalog retired |
| Fiscal 2024 | Monthly users grew from 1,886 to 2,664 |
| 2023 → 2025, public | Time to discover and access data: 20 days → 14.2 hours → 9.4 hours |
| March 2026 | 6,673 people used the catalog in the month |

[Hero visual: the first table page from 2021 beside the same page in 2026.]

**The platform, then my part**

The data discovery platform is one product. When I joined in June 2021 it did one thing: search for data-lake tables and their columns. By 2026 it was where people at Intuit searched for data, judged its quality, traced where it came from, watched its health, requested access, explored it, moved it to where they needed it, and promoted it to a certified level. In the same place they checked the status of their requests and kept their own collections of data. The plain-language assistant and the later agent were parts of it too. Two neighbouring products were separate: tracking of product usage, and pipeline authoring.

I was its founding designer. The search case study covers search. This page covers three moments where I designed what happens after a person finds data: deciding whether to trust it, tracing where it came from, and getting it to where it is needed. The case study on my team's work covers what the designers on my team added from 2024.

[Visual: diagram of the platform as one product with its parts; product-usage tracking and pipeline authoring drawn outside it.]

**The model before the screens**

Every screen rests on one idea. Data has a business meaning and several physical forms. A data product is the meaning: a customer, an invoice. Beneath it sit the physical copies: a batch table, a real-time stream, a copy in the marketing data store. Each copy has an owner, a history and a quality level. The search page shows how this model changed search; here it is what trust, lineage and access attach to.

**1. Enough to judge a table without asking anyone**
*2021–2024 · my design*

The problem. A search result was a table name. Deciding whether to use it meant asking the person who knew.

What I designed. First, in 2021–2022, what the commercial catalog had: descriptions, trust flags, filters, browsing by warehouse. Then what it did not: opening a table in a notebook tool, the SQL behind a view, claiming ownership of a table, and in 2023 usage statistics and a view for deeply nested schemas with search inside it. In 2023–2024, for the company's clean-data initiative, I designed how the standard appears in the catalog: AI-written descriptions for tables that had none, a scorecard against the standard, AI-assigned classification and compliance tags, a label for what the data is intended for, and filters for all of them. The platform organization defined the standard; I designed how a person sees it.

The decision. AI-written content needed a way to be corrected. I added two: the person responsible for the data can edit an AI description, and any user can report a wrong tag.

What it cost. I moved fast and the product showed it. My manager's review in my first year lists inconsistent experiences and non-standard patterns, and I planned a formal usability study that I did not run.

What changed. The commercial catalog was retired in fiscal 2023. Top-five click-through rose from 68% to 96% between April 2022 and April 2023. In fiscal 2024, 1,600 new data products at the standard's third level became discoverable, and I redesigned the catalog for curated tables that had taken three to four tools to find. My 2024 research found AI-written descriptions useful only where no human-written one existed, which is why both correction controls exist.

[Visual: a table page with trust flags, description, owner and the scorecard; editing an AI description.]

**2. Lineage in four weeks**
*2023 · my design; a second designer joined the work and took it over in 2024*

What forced it. The organization wanted a way to trace where data came from before tax season. I had four weeks.

What I designed. A graph of what feeds a table and what depends on it, across about 30,000 tables and 7,000 pipelines, with an impact report to download. Before a change, a data producer can see who to warn. During an incident, both sides can see what is affected.

The decision. When something upstream breaks, where should the warning appear? We were working out how to flag it on the lineage graph. I proposed an alert that shows wherever the affected data appears: in search results and on table pages as well as on the graph.

What changed. Lineage launched on December 6, 2023. By July 2024 it had 450 to 500 monthly users. The designer who took it over turned the graph into a list-based summary for root-cause work; that is on the page about my team.

[Visual: the lineage graph; the alert on a search result.]

**3. Self-service onboarding, on the third design**
*2024 · my design*

The problem. Getting clean data into the marketing data store took one to two weeks and several engineers, marketers and data owners. In fiscal 2023 it delayed campaigns by 7 days on average.

First design. A request, then manual approval by the person responsible for the data.

Second design. Leadership asked for less friction. I removed the approval step, so a marketer could request and receive data without anyone in the loop.

Why it stalled. After several months of engineering work, the fully automatic version was not feasible. Access permissions and edge cases in how data is moved got in the way. Drawing every state and edge case in the flows is what surfaced them.

What shipped, October 16, 2024. Self-service for data that qualifies, with no approver. A ticket for data that does not. The person responsible for the data stays involved for the remaining data types. AI fills in the request. A test run against a copy of the destination checks it before it is submitted. A tracking page shows status.

What changed. One to two weeks became under 24 hours.

[Visual: the three designs side by side; the request form.]

**From catalog to platform**

By 2024 the catalog had grown into the data discovery platform. Access, moving data and promoting data were parts of the same product.

- Access. In 2023 I worked with the access team so that a request for access starts from the table a person is looking at.
- Moving data. The onboarding flow above became the pattern for later requests: access, and promoting data to a certified level.
- Creating data, in a neighbouring product. As a manager I designed table and schema creation in the developer portal when that team lost its designer. An engineer there wrote that I "chimed in so quickly and were able to come up with a design for Datalake within the timeline."
- Where it was heading. In 2026 I was designing the next step: a collection connected to a project and a query tool, so that finding data, getting access and querying it happen in one place. It was in flight when my role ended and did not ship.

At AWS re:Invent 2025, Intuit showed the catalog on stage: owners, quality rating, lineage and self-service access on one screen.

**What I would do differently**

⟦PROPOSED: In the first year I traded consistency for speed, and the design system paid for it later. In 2024 I took on too many parallel projects; my own review that year says so. And on onboarding, I would draw every state and edge case before the second design went to engineering, not after; it is the drawing that found the cases that stalled it.⟧

**Credits**

I was the designer for everything in sections 1 to 3 unless a line says otherwise. I worked with product managers, catalog and platform engineers, the access team and the data-movement team. The clean-data standard was defined by the platform organization. A second designer joined lineage and took it over in 2024. Not everything I designed shipped when I designed it: a page and a search for marketing attributes, designed in 2023, were built by designers on my team in 2025.

**Outcome table**

| Figure | Date | Source | Whose |
|---|---|---|---|
| 45 days | 2021 | Own measure | Mine |
| Commercial catalog retired | FY23 | FY23 year-end review | Team |
| 68% → 96% | Apr 2022 → Apr 2023 | FY23 year-end review | Mine |
| 1,886 → 2,664 monthly users | FY24 | FY24 year-end review | Platform |
| 6,673 users in the month | Mar 2026 | Analytics dashboard, captured May 22, 2026 | Platform |
| 20 days → 14.2 hours → 9.4 hours | 2023 → 2025 | Public: AWS re:Invent 2025; internal roadmap | Platform |
| About 30,000 tables, 7,000 pipelines | Dec 6, 2023 | Launch post | Lineage |
| Four weeks; 450–500 monthly users | By Jul 2024 | FY24 year-end review | Mine |
| 1,600 new third-level data products; three to four tools | FY24 | FY24 year-end review | Mine, catalog side |
| One to two weeks; 7 days of campaign delay in FY23 | Feb 2024 | Onboarding workshop deck | Problem statement |
| One to two weeks → under 24 hours | Oct 16, 2024 | Launch post; FY25 year-end review | Design: mine |

**Visual slots and staging sources** (paths under `~/Documents/Work/Intuit (2021-2026)/`)

| Slot id | Caption | Candidate files |
|---|---|---|
| bp-hero | The first table page from 2021 beside the same page in 2026 | `Projects/DDE/DDE MVP.fig` (export); public re:Invent 2025 recording, session INV201 (capture the stage screen) |
| bp-diagram | The platform as one product, two neighbours outside | none; draw |
| bp-d1 | Table page with trust flags, description, owner and scorecard; editing an AI description | `Projects/DDE/Data Maturity Widget.fig`, `Data Maturity Widget v2.fig`, `Displaying ai generated metadata in DDE.fig`, `Datamarts in DDE.fig` (export) |
| bp-d2 | The lineage graph; the alert on a search result | `Projects/DDE/Data Lineage.fig` (export) |
| bp-d3 | The three onboarding designs side by side; the request form | `Projects/C360-CDC/Self-serve CDC Attribute Onboarding.pptx` (export slides); `Onboarding attributes to C360 Q2 2024.fig`, `C360 - Self Serve onboarding.jam`, `CDC 2.0.fig` (export) |

---

# Appendix C — /work/my-teams-work

**Title:** Leading the designers behind Intuit's data platform

**Summary block**
- Role: Product Design Manager, August 2024 – July 2026. I kept designing alongside the team.
- Where: Intuit, internal data platform.
- The work on this page was designed by the designers on my team. My own part in each project is one sentence, marked "My part."

What the team covered: one platform and two separate products.
- The data discovery platform: finding and understanding data, collections, the agent, access and the status of requests, exploration, moving data, promoting data to certified levels, lineage, monitoring of data health, and data quality.
- Separate products: tracking of product usage, and pipeline authoring.

The constraint: across the data design group, there was one designer for every 85 engineers.

[Hero visual: the platform with its parts, the two separate products beside it, and the team's launches placed on each.]

**What I put in place**

Design at the point where the problem is defined. The first thing that changed when I became a manager was where I spent my time: in the meetings where a problem was framed, asking questions before a specification existed. I also argued for work the roadmap did not have. Two features got onto it, and my team then designed them: a view of the queries other people run against a table, and collections, a person's saved working set of data. The engineering manager wrote that they "would not have happened if not for Kanchi's persistence and design sponsorship."

One research base for every data designer. I had the designers pool their user visits, surveys and help-channel threads into one set of findings. In 2025 that base covered 15 user visits, 8 targeted surveys and 11 help channels, and it produced the list of what to build next: column-level information, relationships between tables, better descriptions. The engineering manager had asked for organized user evidence that could go straight into pitch decks and requirements. My manager wrote that it showed in what was added to the roadmap.

An intake process and a project tracker. Requests for design came from many product teams. I set up one way in and one list of what each designer was working on.

Decisions that get made. My designers told my manager what they valued: clarity when requirements were unclear or missing, boundaries when work kept changing, and getting engineering leads and several product managers into one room to settle a decision.

A way to make a promotion case. I wrote a six-slide framework for a promotion case: the gap, the scope, the execution, the result, the effect on other people, the ask. Each designer on my team used it.

AI tools in everyday design work. I used coded prototypes, AI research synthesis and AI-made videos in my own work first. My manager wrote that he then saw every one of my designers use them.

**Access to data**
*Designed by one designer on my team*

My part. In 2023 I worked with the access team on the entry point from the catalog into access requests. As manager I pushed back when this designer was about to be spread across two products.

What my team designed.

| Launch | Date | Result |
|---|---|---|
| One page to track every access request | Dec 2024 | 25% reduction in time to resolve manual requests |
| Access to real-time streams | Mar 24, 2025 | Wait fell from 2–3 weeks to 3 days; 61% of requests approved automatically |
| Access to restricted tax data | May 2025 | 85% of ineligible denials eliminated |
| Tables and encrypted columns in one request | Aug 22, 2025 | 9 days to 3 days; two approval flows became one |
| Requests in bulk | Aug 28, 2025 | One customer moved access for 5,000 tables in a week and saved 200+ hours |
| Automatic approval rules set by data owners | Sep 18, 2025 | 24 hours to near-instant for internal data |

The designer also wrote the product requirements for the tracking page while the product manager was away.

[Visual: access request flow before and after; the journey map.]

**Lineage for investigating incidents**
*Designed by one designer on my team; a second took lineage over in 2026*

My part. I designed the first lineage view in 2023 on a four-week deadline and handed it over in 2024.

What my team designed. A list-based summary of what feeds a table and what depends on it, then lineage at the level of a single attribute, with an impact report people can read. The designer tested seven concepts in about five days across eight user sessions. A full graph would have taken too long to build, so the direction changed to a summary first.

Result. Investigations that took about 4 hours now take minutes. The work was used to find the root cause of 19 marketing data incidents in one tax season.

[Visual: the graph beside the list summary; a readable impact report.]

**Certifying data, the same way everywhere**
*Designed by designers on my team and others in the data design group*

My part. The standard was the platform organization's. I set the design strategy for how it shows up: the same steps across every way data is produced, the same display of maturity whether a person is producing data or consuming it, and bulk tools for descriptions, ownership and compliance tags so that promotion is possible to finish. I coordinated the design work across designers on my team and beyond it, and got product managers and designers to agree on requirements when they were unclear.

What the group designed. The company's clean-data standard has levels. Guided workflows for reaching the fourth level launched on November 5, 2025, across several ways of producing data.

Result. Publicly, Intuit reports that clean data went from under 1% to 80% of its data estate. In the tax season that followed, peak-season P0 and P1 data incidents fell from 17 to 0. Many teams share that result.

[Visual: one guided certification workflow shown on two different data-production paths.]

**Discovery, built on the search design**
*Designed by designers on my team*

My part. I did the research and the first search design in 2024. That work is in the case study on search.

What my team designed. A view of the queries other people run against a table (May 15, 2025). Search for real-time streams (June 15, 2025) and for marketing attributes (August 12, 2025), each with the first result correct 99.99% of the time. Collections (August 7, 2025). The response patterns for the agent in coding tools (2026).

[Visual: collections; the query view.]

**What the team started on its own**

- A design sign-off before release. One designer began reviewing built features against the design before they shipped. It became the team's practice.
- AI-made launch videos. One designer replaced recorded walkthroughs with AI-generated videos. A stakeholder called it a "game-changer", and engineering teams began to copy the format.
- Coded prototypes built with developers. One designer's use of a prototyping tool cut development time by as much as 90% on some features.

**Growing people**

- A design intern I managed in summer 2023 converted to a full-time designer and later joined my team.
- One designer was promoted to senior in 2026.
- The two remaining promotion cases were approved before my role ended and confirmed after I left.

**Limits**

My manager's 2025 review names what did not work. On four projects, we did the research and translated it into recommendations, and it did not change the direction or the execution. He called it wasted effort for design and research, and asked me to work on one thing: influence.

⟦PROPOSED: The following year I changed what I did with a finding. Instead of a readout, I kept it on the table until it became a commitment: collections stayed in every roadmap conversation despite engineering's criticism until it shipped, and when we built the agent, its rules check a person's collections before anything else.⟧

**What I would do differently**

⟦PROPOSED: I would have started the shared research base in my first month as a manager instead of my second year; it is what finally made design's case in roadmap terms. And I would have asked for a decision-maker by name on every project whose research we were about to run, so that findings had somewhere to land.⟧

**Credits**

Designers on my team designed everything in the four project sections. Designers elsewhere in the data design group shared the certification work. I worked with my manager, product managers and engineering leads across the platform.

**Outcome table**

| Figure | Date | Source | Whose |
|---|---|---|---|
| One designer for every 85 engineers | Apr 2026 | Design group overview | Whole data design group |
| 15 visits, 8 surveys, 11 channels | 2025 | Team research deck, Q3 FY26 | Team |
| 25% reduction in time to resolve manual requests | Dec 2024, announced Jan 14, 2025 | Launch post | Team |
| 2–3 weeks → 3 days; 61% auto-approved | Mar 24, 2025 | Launch post | Team |
| 85% of ineligible denials eliminated | May 2025 | FY25 reviews | Team |
| 9 days → 3 days; two flows into one | Aug 22, 2025 | Launch post; design group overview | Team |
| 5,000 tables in a week; 200+ hours | Aug 28, 2025 | Launch post | One customer |
| 24 hours → near-instant | Sep 18, 2025 | Launch post | Team |
| 7 concepts in about 5 days; 8 sessions | FY25 Q4 | Roadmap tracker | Team |
| About 4 hours → minutes; 19 incidents | Tax year 2025 | FY26 mid-year review; report's assessment | Team |
| Certification workflows launched | Nov 5, 2025 | Three launch posts | Group |
| Clean data under 1% → 80% | Dec 2025 | Public: AWS re:Invent 2025 | Many teams |
| Peak-season P0/P1 incidents 17 → 0 | Tax year 2025 | Roadmap decks; FY27 strategy readout | Many teams |
| First result correct 99.99% | Jun 15 and Aug 12, 2025 | Launch posts | Team; engineering delivered |
| Development time cut by as much as 90% on some features | FY26 first half | FY26 mid-year review | Team |
| One promotion; two cases approved | 2026 | Promotion records; own knowledge | Me as manager |

**Visual slots and staging sources** (paths under `~/Documents/Work/Intuit (2021-2026)/`)

| Slot id | Caption | Candidate files |
|---|---|---|
| tw-hero | The platform, its parts, and the team's launches placed on each (redraw; no names or photos) | `Projects/DDE/adu-final-presentation.html`, `Projects/DDE/data-understanding-tracker.html` (reference only) |
| tw-research | One slide of the 2025 findings (crop out presenter names) | `Reference/Research-Feedback/Data Understanding_ Q3 User Research Findings .pptx` |
| tw-access | Access request flow before and after; the journey map | `Projects/Data-Infrastructure/Data Access _ FY 25 _ User Research + Journey Maps.jam`, `DACM - My Requests.fig`, `Data access target state FY 25-26.fig` (export) |
| tw-lineage | Graph beside list summary; readable impact report | `Projects/DDE/Data Lineage.fig` (export) |
| tw-cert | One certification workflow on two production paths | `Projects/DDE/Data Maturity Widget v2.fig`, `Clickstream - Nebula - 4 star data.fig`, `Projects/C360-CDC/Source paved path 2.0.fig` (export) |
| tw-discovery | Collections; the query view | `Media/Videos/Demos and talks/8_04_25 DDE Data Collections Launch Announcement.mp4`; `Projects/DDE/DDE Query Insights.fig`, `Kafka Topics in DDE.fig` (export) |

---

# Appendix D — /work/605

**Title:** 605: three analytics products for TV advertising

605 measured who watched which TV programs and ads, by matching viewing data to household demographics. Its customers were TV networks and advertisers.

**Summary block**
- Role: Interaction designer and researcher, then product designer, and the company's first. October 2017 – June 2021.
- What I did: I led design for three products from first concept to launch. I worked with about 20 engineers and 5 product managers, led design on two products at once, and brought two more designers on board. By April 2021, the Platform product alone had over $20M in booked revenue and three networks as clients since its 2020 launch.

**605 Platform: comparing audiences in one report**

| | |
|---|---|
| Product | A self-service tool for building reports on TV viewing. In plain terms, a well-dressed SQL query builder |
| Users | Media researchers at two TV networks; business analysts at 605 |
| Problem | A report could cover one audience at a time. Comparing audiences meant running it again for each and combining the results by hand |
| Outcome | Delivered in 2 months for a client deadline. $2M in additional booked revenue from pitches that used the new designs |

I asked four researchers at one network to walk me through the workaround, and my manager studied five reports our own team had built the same way. Two audiences and two metrics took 30 minutes. Each extra audience or metric added 10 minutes or more. Five audiences and four metrics took one to two hours.

My first design supported 15 audiences, the upper limit we had observed. Engineering said charts would take 3 to 4 minutes to render and the work would take 4 months. Users said color was confusing: it meant audience in one chart and metric in the next.

I went back to both networks and asked for real examples. In 9 of 10, they compared 2 to 5 audiences. Fifteen appeared once. When two metrics shared a chart, there was only ever one audience.

That changed three things:
- Five audiences, not 15.
- No search and filter in the first release. The export already had the data.
- Two metrics on one chart for a single audience only. Whenever there is more than one audience, color means audience.

The worst case became two charts at once. Render time fell to 1 to 1.5 minutes, and the build fit the 2-month deadline.

[Visual: first design beside the shipped design, same data.]

**605 Indxr: finding an audience and what it watches**

| | |
|---|---|
| Product | Build a target audience from household attributes, then see which networks and programs it watches |
| Users | Account executives and planners at TV networks |
| Problem | Ranked lists of programs for an audience were pulled by research teams and took between 1 day and 2 weeks |
| Outcome | Launched with one client. Its attribute search and its export were reused in 605 Platform, and its sign-in flow in every 605 product |

I tested the first prototype with five networks. All five wanted the tool, all five were most interested in how finely they could filter, and all five called program-level rankings invaluable. More than half of every session went to questions about where the data came from.

Engineering could return instant results for about 12 attributes, not 200. Users had told us a longer wait was fine if they got more filters, so we were willing to trade speed for more attributes. Two privacy rules shaped the design: no filtering on personal information, and no charts when an audience falls below 100 households.

[Visual: the filter panel and the audience summary.]

**Also at 605**

- 605 Impact. Launched in 2020. It measures whether people who saw an ad went on to watch the show. I collapsed 32 separate reports into two pages. After launch I designed a replacement for a chart type that users could not read and that had caused about 8 bugs, each costing around 2 days of engineering.
- A color palette for data visualization. Accessible, and adopted across the product and the company. I also introduced a typeface with tabular figures.
- Two internal tools. I helped redesign the dashboard that monitors incoming data quality, and I designed and built a reporting dashboard for the client team.
- Design process. I introduced a formal product design process and ran the weekly design meeting.

[Visual: the two-page Impact report; the chart before and after.]

**Credits**

On 605 Platform I worked with an engineering manager, two front-end developers, a QA engineer, a product manager and a director of product, a data analyst and an account manager.

**Outcome table**

| Figure | Date | Source | Note |
|---|---|---|---|
| 30 minutes; 10+ minutes per addition; 1–2 hours | 2021 | April 2021 deck | Observed in user walkthroughs |
| 4 users; 5 reports | 2021 | April 2021 deck | |
| 3–4 minutes to render; 4 months | 2021 | April 2021 deck | |
| 2–5 audiences in 9 of 10; 15 in 1 | 2021 | April 2021 deck | |
| 1–1.5 minutes; 2 months | 2021 | March and April 2021 decks | |
| $2M additional booked revenue | Since March 2021 | April 2021 deck | |
| Over $20M booked revenue; three network clients | April 2021 | April 2021 deck | Platform product only |
| 5 networks; over 50% of session time | Feb 2019 | Indxr write-up | |
| About 12 attributes, not 200 | 2019 | Indxr write-up | |
| 1 day to 2 weeks | 2019 | Indxr write-up | |
| 32 reports into 2 pages; 2020 | 2020 | April 2021 deck | |
| About 8 bugs; around 2 days each | | Case study deck | |
| About 20 engineers, 5 product managers; 2 products at once; 2 designers | | Both decks | |

**Visual slots and staging sources** (paths under `~/Documents/Work/605 (2017-2021)/`)

| Slot id | Caption | Candidate files |
|---|---|---|
| s6-platform | First design beside shipped design, same data | `Design files (2020-2021)/iteration-1.png`, `iteration3.svg`, `final-1.svg`, `final-2.svg`, `final-3.svg`, `earlyexploration.png`; `Multiple Targets.fig`, `Target Builder.fig`, `Platform.fig` (export) |
| s6-color | The color rule | `Design files (2020-2021)/Component Library.fig` (export); `Portfolio assets (screens and photos)/Platform.svg` |
| s6-indxr | Filter panel and audience summary | `Design files (2020-2021)/indxr.svg`, `attribute Type 1 - Multiselect without search.png`, `attribute Type 3 - Range of values.png`, `attribute Type 4 - Multiselect with search hover on details.png`, `search bar highlight on hover.png`, `side menu expanded.svg`; `Portfolio assets (screens and photos)/Indxr.svg`, `Indxr2.svg` |
| s6-impact | Two-page report; chart before and after | `Design files (2020-2021)/imp.png`, `impact.jpg`, `report default view - internal (on hover).png`, `report expanded view - client copy.png`; `Impact.fig`, `IMPACT- MVP.fig` (export); `Portfolio assets (screens and photos)/Impact.svg` |
| s6-internal | Data-quality dashboard | `Portfolio assets (screens and photos)/Sanity Checks UI_Filters.svg` |
| s6-research (optional) | Whiteboard journey map | `Portfolio assets (screens and photos)/Whiteboard journey map.jpg` |

---

End of brief.

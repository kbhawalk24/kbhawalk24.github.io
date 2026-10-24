# Finding data: proposed narrative (24 October 2026)

A proposal for the Finding data case study, written from the Search 2.0 material: the design document, the July 2024 design review, the two help-channel analyses, the User Journey board, the agent chat brief, the Search 2.0 Figma file, and the Search_2_0_Case_Study draft in the Job-Hunt folder. Not site copy yet. Every figure below has a source; the ones that conflict are listed at the end.

## The premise

Search 1.0 was a keyword box. It returned every kind of object in one list, with filter pills across the top that nobody used because they were nested, technical and invisible once applied. People knew what kind of thing they wanted and still got 999+ results with the same names. So they asked a person instead. The case study is the five-year answer to that: an assistant that came too early, research that found the real problem, a search rebuilt around how people actually look, a place to keep what they found, and an agent that answers where they work.

## What makes it read as principal work

Not the labels. The draft in Job-Hunt calls things "the Senior Staff pattern" four times, and you called a milder version of that pretentious. The page should show the pattern and let the reader name it. Five things carry it:

1. The problem is framed at the system level, with evidence you generated: 73% of help-channel questions answered only because a person knew, six tools per search, one in twenty using the AI search that already existed.
2. The decisions are structural and each has a stated trade-off: tabs by object type, filters versus facets, five lines of metadata, what was cut and why.
3. It was measured, and the measurement is honest about what dipped.
4. Other people built on it: a designer on your team took it to launch, the team reused the framework for two more search types, and the same object model became the agent's tool schema.
5. The ending is the open problem you are working on now, not a victory lap: how lookup, an assistant beside the page and an immersive chat should relate.

## Proposed sections, in order

### 1. The problem: a box that returned everything

Intuit's data lake held 320,000 tables, and finding data was the longest phase of any data project. The catalog's search was one box. It returned tables, columns, schemas, data products and dashboards in a single list under "Data Catalog" and "Data Map", with eight filter pills across the top. In the July 2024 review you recorded why people did not use them: the useful ones (product, schema, domain) were missing, the rest were nested two clicks deep, written in Data Map vocabulary rather than theirs, and gave no sign they were applied. Same-named results with the same descriptions made the first two results useless, and people did not refine. They escalated to a colleague.

Evidence for this section: the 666-question analysis (43% could not find the data, 73% resolved only by someone who knew), six tools per search, and the adoption table from the review deck (analysts at 61% of their addressable base, technical marketers at 5%).

Image: the Search 1.0 results screen from the Figma file, the frame with the September 2025 deprecation banner. It is the before picture: one list, 999+ results, the pill row. Crop the banner for the hero image and keep a second crop with the banner for the impact section, because the date is evidence.

### 2. Where it started: an assistant before its search was ready

Keep the current section, shorter. Data Copilot in 2023, 16 hackathon teams, 58 collaborators, four months, Investor Day. Then the honest line: only one of the twenty people you later interviewed had used AI search, trust had to be earned inside about two results, and when it failed people did not return. That sets the order of the work that follows.

Images: the Copilot clip you have, and the Investor Day video.

### 3. Research that changed the question

Spring 2024. You designed and ran the catalog's first follow-me-home series: 20 sessions across eight analysts, four software engineers, two marketing managers, two data engineers, two machine learning engineers, a solutions architect and a product manager, with engineers in the room, then an in-person synthesis workshop. The group product manager called it "a major contributor to our FY25 roadmap."

Three findings set the design:
- People know what kind of object they want before they search. The exceptions are marketers and ML engineers moving data between systems.
- Trust is decided in the first two results, from metadata the catalog did not show: freshness, size, who else queries it, whether I have access.
- Discovery is a comprehension problem more than a location problem. The two help-channel analyses confirmed it: 43% location in the one-year set, and 68% definition and meaning in the 726 questions from the first half of 2025.

Images: the User Journey board redrawn as a six-stop map (Jira ticket, catalog, Postman, Drive, Databricks, a colleague). The original screenshots carry names and ticket text, so it needs an illustration rather than the screenshots. A research-by-numbers tile: 20 sessions, 2 analyses, 1,392 questions.

### 4. The design: not a better list, a different structure

The June 2024 specification, written by you, with five decisions and the reasoning behind each:

1. **One tab per kind of object.** Tables, Data Map, Kafka topics, feature sets, dashboards, CDC attributes. People already knew which they wanted, and mixing them hid the type.
2. **Filters and facets are different things.** A filter is the kind of object and never changes. A facet is a property of the results and changes with the query. Four facet behaviours by cardinality and nesting: auto-applied singles, searchable high-cardinality lists, visible low-cardinality lists, and nested hierarchies.
3. **Five lines of metadata, no more.** Chosen by asking in every session what a person needed to see to pick between two similar results. Operational signals (last refreshed, maturity, size) and social ones (queries, users, access).
4. **What was cut.** Nested browsing inside a facet, after engineering review. Sort order, deferred. Tags versus collections, left open on purpose, which became Collections a year later.
5. **Built with engineering.** Tab order by query volume, not alphabet. Nested facets collapsed by default. Both came from three senior engineers reviewing the spec.

Images: the Tables tab design you already have on the page; a facet-types strip from the Figma file; the "Previous iterations" page as a small strip showing the inspiration boards (commerce search, Google, Finder) and the earlier layouts. All of it is yours.

### 5. What shipped, and what it measured

Table search on 14 November 2024: keyword precision up 12.5%, semantic up 58%. Map search on 26 March 2025, taken to launch by a designer on your team after you became manager: the first result right 89.24% of the time, from 81.31%; the slowest one in a hundred searches in 1.93 seconds instead of 50.59. Search 1.0 switched off on 19 September 2025. By May 2026, 9,650 of the catalog's 15,775 users in six months had used Search 2.0, and the first result took about four in five clicks every month.

What it cost, stated plainly: exact-name lookups dipped from 96% to 94% before recovering, because semantic ranking outranked the literal match, and people with muscle memory noticed. Map search was adopted less than table search because people think in physical objects. And the precision numbers were measured after launch, because instrumentation was not in the first scope. That is the thing you would do differently.

Images: the click-depth chart you have; the Search 1.0 deprecation banner crop.

### 6. From finding to keeping: Collections

Short. The placeholder in the spec became a PRD you wrote, shipped on 7 August 2025 by designers on your team, over engineering objections. The engineering manager's line that it "would not have happened" without your persistence, credited by role. Four in five searches return to known data, so a saved working set is the context the agent later reads first.

### 7. The agent, and the question after it

Keep the current agent section: the specification for three kinds of request, the four rules, 711 users and 56,560 tool calls in 90 days, the time from question to answer.

Then end on the open problem, from your agent chat brief: three modalities (lookup, an assistant beside the page, an immersive chat), the ground rules (modality follows intent, context localises to the page, escalation is always available and user-initiated), and the decision you have taken so far: separate entry points for search and chat, because in testing people clicked the familiar search box and never saw the agent. That is a principal designer thinking in public, and it is more persuasive than another metric.

Image: a simple three-modality diagram in the site's style. The industry references (Atlan, Alation, Purview, Glean, Notion) can be a single line, not a section.

### 8. Impact

The existing table, with the Search 1.0 retirement date and the 61% adoption row added. Attribution column kept.

## The homepage card

Option A from the mockups: the time chain. 20 days to find data in 2023, 9.4 hours after the rebuild in 2025, 4 minutes from question to answer with the agent in 2026. The first two are Intuit's public figures from re:Invent. Each step keeps its own label because they are three measures of the journey, not one metric.

## Numbers: sourced, and the four that conflict

| Figure | Source | Status |
|---|---|---|
| 666 questions, 43% location, 73% SME-resolved | Data Search Pattern Analysis | solid |
| 726 questions, 68.2% comprehension, 48% escalated | Data Genius Bar Summary, Jan to Jul 2025 | solid |
| 20 sessions, 5 personas, 6 tools, 1 of 20 used AI search | Design Review deck, July 2024 | solid |
| +12.5% keyword, +58% semantic | Nov 2024 launch post, per source kit | solid |
| 81.31% to 89.24%, 50.59 s to 1.93 s | Mar 2025 launch post, per source kit | solid |
| Search 1.0 retired 19 Sep 2025 | Figma deprecation frame | solid |
| 9,650 of 15,775 users on Search 2.0 | Amplitude dashboard screenshot, May 2026 | solid |
| 20 days to 9.4 hours | AWS re:Invent 2025, FY27 readout | solid, public |
| 711 users, 56,560 tool calls | Mar 2026 launch post notes | solid |
| 45 min to 4 min | Launch post and Q4 FY26 executive paper say question to insight; the May showcase deck says 25 to 4 | confirm which study |
| Agent precision 81% | Showcase deck says from 13%; resume says from 11% | pick one |
| Session conversion 41% to 61% | No source in your files; tracker shows 61% to 67% Aug 2025 to May 2026 | replace or drop |
| 6,673 monthly users, Mar 2026 | Amplitude; the Databricks tracker shows 5,840 for the same month | say which scope |

## What I would leave out

- The Job-Hunt draft's self-descriptions: "Senior Staff pattern", "influence without authority", "force-multiplication move". Show the thing instead.
- Engineers' and PMs' names. Roles only, per your rule.
- "Manager 2" as a title on the site.
- The claim that nobody had studied search before. The deck supports "the first follow-me-home series for the catalog", which is enough.

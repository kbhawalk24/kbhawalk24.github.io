# Finding data: a thorough case study plan (24 October 2026, revised)

Built from everything on your Mac about search: the July 2024 design review deck (both copies, all 29 slides and their photos), the June 2024 Search 2.0 design document, the two help-channel analyses, the User Journey board, the Search 2.0 Figma file (nine pages rendered), the agent chat brief, the May 2025 feedback poll, the launch attribution and roadmap tracker notes, and your May 2026 case study draft. Not site copy yet. Every figure names its source. Conflicts are at the end.

Still missing: the "Search 2.0 Presentation" slide deck your draft cites, and the May 2025 user feedback report.

## Why this reads as principal work

The page should show five things and name none of them: a problem framed at the system level with evidence you generated; structural decisions that each cost something; measurement that admits what dipped; other people building on the work; and an unsolved problem you are thinking about in public. The draft from May says "Senior Staff pattern" out loud. The page does not.

## Sections, in order, with what goes in each

### 0. The path, before anything else: how people actually got to data in 2024

A diagram at the top of the page, drawn in the site's style from your User Journey board and grounded in the April 2024 follow-me-home synthesis (20 people: 8 analysts, 6 software or data engineers, 2 ML engineers, 2 marketing managers, a solutions architect, a product manager; nine business units). Six stages, left to right. Under each: the tools people used, one or two things they said, credited by role, and the time it took where someone gave one. The red annotations from your board become the problems the rest of the page solves.

**1. Get requirements.** Jira tickets and meetings. "It usually takes about a week from getting a data request to finding the right sources. The biggest delay is getting stakeholders and data owners into one meeting." (marketing manager). A product manager: six to twelve months to get one attribute identified, into a table and into the marketing store.

**2. Search.** Slack first, then GitHub, then the catalog. "I start in Slack channels like the TurboTax data help channel. If I find a table name there, I search for it in Data Discovery." (staff analyst). "90% of the time someone knows the answer: a colleague or the help channel." (staff analyst). "Search GitHub first when looking for new data, then ask the team." (data engineer). One ML engineer tried the catalog for about five minutes, did not expect to get close, and did not narrow down or iterate. A manager searched "county" and got "country". Problem on the board: there is no way to learn that data does not exist.

**3. Validate.** Columns, old queries on GitHub, the people who ran them, a sample in Databricks. "I'd rather just look at a query and see if that's what I need without bothering them." (senior analyst). What analysts actually check: same columns and primary keys, row count steady over time, partitioned, one unified source, how detailed the owner's description is, who queried it recently. "If no one mentions having used a table, I discard it." The copy problem: a search for the payroll company status table lands on a published copy of a data mart table, and nothing says which is the original. Problem on the board: surface the experts and the proof inside the catalog.

**4. Request access.** Tickets, one table at a time. "Every time someone points me at a new table it takes two or three days to get access, and only then can I check whether it is relevant." (staff analyst). A principal engineer: about a month, across several Slack channels, to reach transcript data. Marketing managers have no lake access at all. An HR analyst asked for a five-minute preview before requesting permanent access. Problem: validation sits behind access, so people pay for access to find out a table is wrong.

**5. Explore.** Databricks, Athena, Postman. "Even with the right table names the SQL won't run; the dialects differ." (software engineer). An ML engineer checked by hand that the lake and the marketing store agreed, and found discrepancies. Problem: cross-validating across sources is manual.

**6. Move or use.** CDC Explorer, Kafka, the marketing store. "I knew the batch data I wanted. Then I realised it had to be real-time, and the real-time source did not exist." (ML engineer). Discovery took about three months of an eight-to-nine-month project; faster discovery was worth about $2 million in earlier release. Problem on the board: link real-time to batch so the verification loop disappears.

**Cross-cutting, under the diagram.** How often the search is for something new: one in four. A solutions architect put it at 75% the same core tables, 25% new; a staff analyst at 25 to 30% of her time; a marketing manager at one in ten. That is better evidence than the "one in five" the site uses today, and it should replace it.

**Measures attached to the path.** 20 days for the whole path in 2023 (public, re:Invent). 14.8 hours for the search stage in November 2024, 9.4 in July 2025, 8.2 in May 2026 (tracker). 4 minutes from question to answer with the agent in 2026. This is how the card's chain becomes honest: each number labelled with the stage it measures.

Images: the diagram itself; beside it, your User Journey board with the Jira and Slack screenshots blurred, as the proof it came from a real session; and three of the workshop stickies as a strip: "Use case explorer, shows when there are no results", "AI DDE coach", "Natural language search across Slack, GitHub and Databricks". They show the agent was already on the whiteboard in April 2024.

### 1. The problem: one box that returned everything

Open on the before picture. Searching "company status" in 2024 returned 1,838,670 results under Data Catalog: columns named company_status from nine schemas, each with the same description, before the first table. Eight filter pills across the top. The July 2024 review recorded why nobody used them: the useful ones (product, schema, domain) did not exist; the rest were two clicks deep, like Data Product Type → Data Mart; they were written in Data Map vocabulary; and nothing showed that a filter was applied. People did not refine. They asked a colleague.

Scale of the problem, from the deck's adoption table: analysts were using discovery at 61% of their addressable base, data engineers at 77%, technical marketers at 5%, software developers at 13%. Discovery was the longest phase of any data project. One machine learning engineer spent three months finding real-time sources for a personalisation project estimated at $4 million a year; finding them faster would have been worth about $2 million in earlier release, and he found 7 of the 11 attributes he needed.

From the one-year help-channel analysis: 666 questions, 43% could not locate the data, 73% were resolved only because a specific person knew.

Images: the Search 1.0 "company status" results (your Figma file, Previous Iterations page); the Data Map tab with the nested Data Product Type dropdown open; the adoption table redrawn as a small chart.

### 2. Where it started: an assistant before its search was ready

Keep the existing section, trimmed. Data Copilot, 2023: 16 hackathon teams, 58 collaborators, four months, the CTO at Investor Day. Then the deck's finding: of the 20 people you later followed, one had used the AI search that already existed. The trust window was about two results, and when it failed people did not come back. That ordered everything after it.

Images: the Copilot clip; the Investor Day video.

### 3. The research: twenty people, six tools, one haystack

Spring 2024. You designed and ran the catalog's first follow-me-home series: 20 people across nine business units (8 analysts, 4 software engineers, 2 data engineers, 2 marketing managers, 2 ML engineers, a solutions architect, a product manager), with the engineering team watching, one prompt: "Walk us through a recent time you found data. What tools, how long, what went wrong?" Then an in-person design-for-delight workshop with engineering, PM and design, where the group plotted ideas on impact against existing-versus-new technology and starred three. The group product manager called it "a major contributor to our FY25 roadmap."

What you learned, as the deck states it:
- Discovery runs on people. Before the catalog: trusted colleagues and about fifteen Slack channels. During validation: old queries, wikis, GitHub. After: a subject matter expert's say-so. True across every persona.
- Six tools per search. Jira, the catalog, Postman, Drive, Databricks, a colleague. The User Journey board maps one marketer's path through all six.
- People know what kind of object they want before they search. The exceptions are marketers and ML engineers moving data between systems.
- It takes a very long time to establish that data does not exist at all.
- Same-named results with same descriptions stop people at result two.
- AI-written descriptions help only where no human one exists; beside a steward's description they reduce trust.
- Team-based ownership makes the right expert hard to reach.

The two help-channel analyses that followed confirmed the shape: 43% location in the 666, 68% definition and meaning in the 726 from 2025, 48% escalated to an expert.

Images: the whiteboard of workshop ideas (your photo, no faces); the impact-versus-technology board with sticky notes; the six-tool journey redrawn in the site's style, because the original carries names and ticket text; a research-by-numbers tile (20 sessions, 2 analyses, 1,392 questions, 15 channels).

### 4. The decisions: a different structure, not a better list

The June 2024 specification you wrote. Each decision with its reason and its cost.

1. **One tab per kind of object.** Tables, Data Map, Kafka topics, feature sets, dashboards, CDC attributes. People knew which they wanted; the flat list hid the type. Cost: the Data Map, which you had argued for in 2022 as the way to organise by meaning, became one tab among six. The page should say that plainly, because an interviewer will ask.
2. **Filters are not facets.** A filter is the kind of object; it never changes. A facet is a property of the results and changes with the query. Four facet behaviours by cardinality and nesting, each drawn as a flow in the Figma file: a single value auto-applies; many flat values get a searchable list applied in one go; few values stay visible; nested hierarchies browse or search.
3. **Five lines per result.** Chosen by asking in every session what a person needed to see to choose between two similar results: last refreshed, size, maturity, queries in 30 days, whether I have access.
4. **What was cut or deferred.** Nested browsing inside a facet, after engineering review. Sort order, deferred. Tags versus collections, left open on purpose; that became Collections. The Data Map tab had a variant marked NOT APPROVED in the file, which is worth one sentence.
5. **Built with engineering.** The spec reviewed by three senior engineers; facets collapsed by default; nested hierarchies search-only in the first release.
6. **Two smaller pieces that shipped first and set up the rebuild.** Business-unit data tags (August 2024, your design): 13 tags, 74% of the lake covered, 295,000 unusable tables hidden, precision in the first 20 results up 4%. Slack insights on table pages, surfacing the channels people were already using.

Images: your Tables tab design (already on the page); the four facet flows as a strip; the facet types illustration from the spec; the Data Map tab design beside its rejected variant; the inspiration board as a thin strip (commerce search, Google, Finder).

### 5. What shipped, and what it cost

Table search, 14 November 2024: keyword precision up 12.5%, semantic up 58%, and the launch post projected a three-hour cut in time to discover data from a 14.8-hour baseline. Map search, 26 March 2025, your first design taken to launch by a designer on your team after you became manager: first result right 89.24% of the time from 81.31%; the slowest one in a hundred searches 1.93 seconds from 50.59. Search 1.0 switched off on 19 September 2025, by which point Search 2.0 was the primary search for about 70% of users. By May 2026, 9,650 of 15,775 catalog users in six months had used it. Session conversion went from 41% in January 2024 to 61% by July 2025 and 63% in January 2026. Time to discover data fell from 14.2 hours to 9.4 over the same year, and to 8.2 by May 2026.

What it cost, from the poll you ran in the help channels on 30 April 2025: exact-name lookups dipped from 96% to 94% top-five clicks, because semantic ranking outranked the literal match and defaulted to the map tab; one person turned 2.0 off; hidden-results behaviour confused people who had pasted an exact name. Map search was adopted less than tables because people think in physical objects. The precision figures were measured after launch, because instrumentation was not in the first scope. That last one is what you would do differently.

Images: the click-depth chart (already on the page); the 1.0 deprecation banner crop; the conversion trend from the KPI tracker, redrawn.

### 6. From finding to keeping: Collections

Short. Four in five searches return to known data. The placeholder in the spec became a PRD you wrote and a feature designers on your team shipped on 7 August 2025, over engineering objections; the engineering manager's line, credited by role. Collections is now the context the agent reads before the wider lake.

### 7. The agent, and the question after it

Keep the agent section: the specification for three kinds of request, the four rules, 711 users and 56,560 tool calls in 90 days, question to answer in minutes.

Then end on the open problem from your chat brief and the AI Mode page of the Figma file: three modalities (lookup, an assistant beside the page, an immersive chat), ground rules (modality follows intent; context localises to the page; escalation is always available and user-initiated; immersive is additive), and two decisions taken so far with their evidence: separate entry points for search and chat, because in testing people clicked the familiar box and never saw the agent; and links from chat open in a new tab, because people did not want to lose the thread.

Images: the AI Mode frames (welcome, side panel beside the Tables tab); a three-modality diagram in the site's style. The industry references stay as one line.

### 8. Impact

The existing table, adding: BU tags (Aug 2024), the 1.0 sunset date, session conversion 41% → 61% → 63%, time to discover 14.2 → 9.4 → 8.2 hours. Attribution column kept.

## The homepage card

Built: 20 days (2023), 9.4 hours (2025), 4 minutes (2026). See the conflict on the first figure below.

## Figures and sources

| Figure | Source | Status |
|---|---|---|
| 1,838,670 results for "company status"; nested Data Product Type filter | Figma, Previous Iterations page | solid |
| Adoption by persona (61%, 77%, 5%, 13% of base) | Design review deck, slide 3 | solid |
| 3 months to find real-time sources; $4M project; $2M; 7 of 11 attributes | Deck, slide 12, MLE persona | solid, anonymise |
| 20 people, 7 business units, 7 roles, 1 of 20 used AI search, 6 tools, 15 channels | Deck | solid |
| 666 questions, 43%, 73% | Data Search Pattern Analysis | solid |
| 726 questions, 68.2%, 48% | Data Genius Bar Summary | solid |
| BU tags: 13, 74%, 295k hidden, +4% precision | Launch post Aug 27 2024; roadmap tracker | solid |
| +12.5% keyword, +58% semantic; 14.8 hr baseline, 3 hr projected cut | Launch post Nov 14 2024 | solid |
| 81.31 → 89.24; 50.59 → 1.93 s | Launch post Mar 26 2025 | solid |
| 1.0 sunset Sep 19 2025; 2.0 primary for ~70% | Figma banner; roadmap tracker | solid |
| 9,650 of 15,775 users | Amplitude screenshot, May 2026 | solid |
| Session conversion 41% (Jan 24) → 61% (Jul 25) → 63% (Jan 26) | Roadmap decks via tracker | solid, now sourced |
| Time to discover 14.2 → 9.4 → 8.9 hrs; 8.2 May 2026 | Tracker; KPI dashboard screenshot | solid |
| 96% → 94% exact-name dip; poll comments | Source kit; feedback log Apr 30 2025 | solid |
| 711 users; 56,560 tool calls | Launch post notes Mar 16 2026 | solid |

## Conflicts to settle before the page goes live

1. **"20 days" on the card.** Public at re:Invent, but the internal tracker puts time to discover at 14.2 hours in August 2024 and the November 2024 launch post at 14.8 hours. "20 days" must be an earlier or wider measure (discover plus access plus explore, 2023). Either label it that way or use 14.8 hours → 9.4 → 8.2 from the tracker.
2. **45 min → 4 min.** Launch post and executive paper say question to insight, observational study. The tracker and the May deck say 25 → 4 minutes, lab experiment. Decide which the card and page cite.
3. **Agent precision baseline.** 13% in the showcase deck, 11% on the resume.
4. **Monthly users, March 2026.** 6,673 in Amplitude, 5,840 in the Databricks tracker. Say which scope.
5. **Who designed map search.** The tracker credits you; the launch post credits a designer on your team with you as manager. Keep the Oct 7 resolution: your first design, carried to launch by your report.

## Leave out

Names of engineers, PMs and users (roles only). "Manager 2". "Senior Staff pattern", "influence without authority", "force-multiplication". The claim that no one had studied search before; "the catalog's first follow-me-home series" is what the deck supports.

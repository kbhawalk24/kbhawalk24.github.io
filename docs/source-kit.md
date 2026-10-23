# Source kit (from another Claude conversation, saved 23 October 2026)

Reference material for the case studies and the Team page. Not site copy as it stands; rewrite before it goes on a page.

## Decisions Kanchi made about this kit (23 October 2026)

- **Promotions:** every direct report was promoted. Where the kit says "one senior promotion plus two cases approved", use "every designer who reported to me was promoted".
- **Limits / influence passage:** dropped everywhere. Do not use the "Limits & What I Changed as a Leader" section or any reference to the 2025 review asking for influence.
- **Headcount:** allowed now, because it shows how many people the work supported (for example ~550 engineers and 16 PMs, 9 product areas, 16 hackathon teams and 58 collaborators). This lifts the earlier no-headcount rule.
- **New figures with no source seen yet:** ignore them. Not on any page: Copilot "2.2x on single-table queries", NPS 26 → 31, −41% documentation complaints, ~2,000 curated tables, AI tracking-plan review 2 weeks → under 1 day, "$20M+ to $30M+" booked revenue, "won the org innovation award".
- **Client names** (AMC Networks, Discovery, the Killing Eve example): allowed inside case studies, never on the landing page.
- **605 title:** not a promotion; it was a title change. Do not write "promoted from Interaction Designer & Researcher".
- **Em dashes:** ignore the kit's punctuation; site copy is rewritten in the site's own style.
- **`07-site-content.ts`:** not used. It would replace the site's content system and duplicates files 2 to 4 below, so it is not saved here.

## How the kit maps to the agreed plan (see docs/TEAM-PAGE-PLAN.md)

- File 2 (agentic discovery and Search 2.0) → case study 1, Finding data.
- File 3 (founding designer of the platform) → case study 2, the catalog.
- File 5 part B (605) → case study 3, 605.
- File 4 (scaling design leadership) and file 1's How I lead → the Team page.
- File 1's Option B bio, especially the closing personal line, → hero or footer.
- The "Project Scope & Impact Summary" block (duration, my role, team and partners, research and tools, a metrics table with when, measure, change, source and attribution) → the opening of every case study.

---

## FILE 1: Homepage and About

### Hero
Kanchi Bhawalkar · Principal Product Designer & Product Design Manager · San Francisco Bay Area · kbhawalk@gmail.com · linkedin.com/in/kanchib

**Option A, two-sentence hero:** I'm a product design leader with 12+ years of experience turning complex data infrastructure into tools people actually trust and use. I started my career as a backend software engineer, which means I'm happiest untangling messy systems, debating trade-offs with engineers, and designing AI workflows that go deeper than a chat box.

**Option B, "no-nonsense builder" bio:** I design for the parts of software that usually look like a spreadsheet had a bad day: data lakes, pipelines, schemas, and developer tools.

Before moving into design (via Michigan's HCI program), I spent three years writing backend Java at TIBCO. That background still shapes how I work today, whether I'm operating as a Principal IC or leading a design team. I care less about theatrical design process and more about getting to the root of a technical constraint, writing clear rules for how a system should behave, and making sure people can trust the data in front of them.

Most recently, I spent five years at Intuit, where I was the founding designer of the internal data catalog and later led the design team across nine areas of the enterprise data platform (operating at a 1:85 designer-to-engineer ratio). Before that, I was the first product designer at 605, building TV viewership and ad analytics tools from scratch.

When I'm not looking at data schemas, I'm hanging out with my husband and our son in the Bay Area, hunting down good chaat, experimenting with healthier bakes in the kitchen, or waiting patiently for George R.R. Martin to finish *The Winds of Winter*.

### How I lead (five habits)
1. **I intervene at problem definition before a PRD exists.** I shifted my calendar into early PM and engineering framing meetings, authoring strategy docs that others designed from and championing unrequested bets like Data Collections and Query Insights onto the roadmap.
2. **I operate as a technical player-coach on core architecture.** As a former backend engineer, I stay hands-on where systems are most ambiguous: writing the 3-intent answer specification for the Cursor/Claude agent, designing Search 2.0, and stepping in to design Datalake schema creation during staffing gaps.
3. **I turn scattered feedback into shared roadmap leverage (Marvin and Slack mining).** Because technical users rarely sit for repeated interviews, I pooled six months of visits, surveys and mined Slack help threads into a shared Marvin repository that engineers and PMs used directly in pitch decks and PRDs.
4. **I shield my team's focus from organizational thrash.** Across 9 product areas, I stood up a single intake tracker, pushed back against splitting designers across unrelated domains, and pulled engineering leads and multiple PMs into one room to settle stalled decisions.
5. **I model AI-native workflows first and systematize career growth.** I used v0 coded prototypes, AI research synthesis and AI videos in my own IC work first, and every designer on my team adopted them (coded dev prototyping that cut build time by 90%, AI launch videos, UX sign-off gates). I authored a 6-slide promotion case framework used across the team.

---

## FILE 2: Case study 1, Agentic discovery and Search 2.0

System context: Intuit enterprise data platform (320,000 tables · 6,673 monthly users).

### Scope and impact summary
- **Duration:** August 2023 to July 2026, building on the 2021 to 2023 catalog foundation.
- **My role:** Principal Product Designer (Jan to Aug 2024), then Product Design Manager and IC strategy/spec lead (Aug 2024 to Jul 2026).
- **Team and partners:** Data Copilot (2023 to 2024): sole design lead consolidating 16 hackathon teams and 58 engineering and PM collaborators in 4 months. Search 2.0, Collections and the agent (2024 to 2026): partnered with catalog PMs, platform engineers and the search-model team; managed the designers who carried Data Map search to launch, designed Collections and benchmarked the shipped agent response patterns.
- **Research and analytics:** Marvin, Slack help-channel mining (666 threads), 20 contextual inquiries, Amplitude and Databricks KPI dashboards, Cursor, Claude.

| When | Capability and measure | Change | Source and attribution |
|---|---|---|---|
| 2023–2024 | Data Copilot: analyst SQL writing speed (500+ monthly users) | 2x faster | FY24 review and launch post (my IC design as sole lead across 16 teams) |
| Nov 14, 2024 | Table Search 2.0: keyword and semantic precision | +12.5% keyword, +58% semantic | Nov 2024 launch post (my design; search-model engineering built ranking) |
| Mar 26, 2025 | Data Map Search 2.0: first-result precision and P99 latency (10,000 data products, 460,000 attributes) | 81.31% → 89.24%; 50.59 s → 1.93 s | Mar 2025 launch post (my first design; carried to launch by a designer on my team; speed by engineering) |
| Mar 2026 | Agent in Cursor and Claude: question to verified answer (711 active users; 56,560 tool calls in 90 days) | 45 min → 4 min | Mar 16, 2026 launch post and FY27 readout observational study (my spec and strategy; patterns by a report; servers by engineering) |

Hero visual: the same discovery task across Data Copilot (2023), Search 2.0 (2024–25) and the agent (2026).

### 1. Research, Slack mining and why the first chatbot faded
In 2023 I was sole design lead for Data Copilot, consolidating 16 hackathon experiments into one web chat flow in 4 months (finding tables, writing SQL, sample insights, translating SQL). It doubled analyst SQL speed, reached 500+ monthly users and was presented by Intuit's CTO at Investor Day 2023. Usage faded after 2024.

To understand why discovery still bottlenecked projects across the 320,000-table lake:
- **20 in-context visits and a cross-functional workshop (spring 2024).** I interviewed 20 catalog users while they did their own work, brought engineers along, and ran a synthesis workshop the group PM credited as "a major contributor to our FY25 roadmap."
- **666 Slack help-channel questions over one year.** 43% were people trying to locate the right data; 73.0% were resolved only because a specific person knew the answer (for example two identically named customer tables, one not refreshed in over a year).

Three insights:
1. Standalone chat faded because engineers and analysts lived in IDEs and notebooks; switching to a web chat broke their workflow, and freeform answers lacked the provenance needed to trust unfamiliar tables.
2. People know the object type up front (table or stream), except marketing managers and ML engineers moving data between systems.
3. Four in five searches return to familiar data; only about one in five looks for something new.

### 2. Rebuilding Search 2.0 and writing the spec others built on (2024–2025)
I wrote the Search 2.0 specification (June 2024) around five rules:
1. **One tab per data type:** six tabs (Tables, Data Map, Real-Time Streams, Feature Sets, Dashboards, Marketing Attributes) replaced the Catalog vs Data Map split.
2. **Static filters vs four dynamic facet behaviors:** a filter is the object type (never changes); a facet is a property of results (changes with the query), with four behaviors by value count and nesting.
3. **Five-line result card cap,** split between operational signals (freshness, quality score) and social proof (query volume).
4. **Deliberate scope cuts:** nested facet browsing cut from v1 after engineering review (search within a facet kept), sort order deferred, tags vs collections left open after a reviewer said tags would turn subjective, which set up Collections.
5. **Challenging unverified AI descriptions:** when two of the first three reviewers said AI-written descriptions felt untrustworthy, unverified ones were no longer shown by default and human editing was prioritized.

Multiplier: a designer on my team carried my Data Map search design to launch (81.31% → 89.24%), and the team reused the framework for Real-Time Stream Search and Marketing-Attribute Search at 99.99% first-result precision. Amplitude also showed a trade-off: semantic ranking dipped exact-name click-through from 96% to 94% in July 2025, recovering to 95% in January 2026, which taught me to keep exact-string lookup as its own fast path.

### 3. Sponsoring Collections and specifying the agent (2025–2026)
- **Collections (shipped Aug 7, 2025).** Because four in five searches return to known data, I argued for Collections, a person's saved working set of data, despite engineering criticism. Designers on my team designed and shipped it; the engineering manager wrote it "would not have happened if not for Kanchi's persistence and design sponsorship."
- **The agent specification.** Instead of a better chat window, the catalog moved into Cursor and Claude through tool servers. I wrote how the agent answers three kinds of request:
  1. Looking up a known table: name, description, parent data product and maturity tier, last refresh, owner, top users, dependencies, access status.
  2. Choosing a table for a use case: five candidates, each with why it matches.
  3. A question that needs a value: if one column answers it, show the column and a query; if it needs a join, say which tables and columns and why, verify existence and access, then run or hand over the query.
- **Four rules:** check the person's collections before the wider lake; never invent a table name; never show a query that has not been run; always ask before running anything.

I recruited the first users, tested answers against real questions and refined the rules; a designer on my team built and benchmarked the shipped response patterns; engineers built the servers. As of March 2026 a designer on my team was leading the work to bring the agent into the web catalog.

---

## FILE 3: Case study 2, Founding designer of the data platform

### Scope and impact summary
- **Duration:** June 2021 to July 2026; core IC platform architecture 2021 to 2024.
- **My role:** founding designer of the catalog. Senior Product Designer (Jun 2021 to Jan 2024), Principal (Jan to Aug 2024), Product Design Manager (Aug 2024 to Jul 2026).
- **Team and partners:** sole founding designer 2021 to 2023; partnered across five platform pillars (Produce, Certify, Catalog, Access, Explore) with PMs, platform architects and catalog, access and data-movement engineering; mentored a summer 2023 intern; handed lineage to a second designer in 2024.
- **Research:** about 20 Data Map feedback sessions (FY22), incremental feature testing, state and edge-case mapping, Amplitude.

| When | Milestone | Outcome | Source |
|---|---|---|---|
| June 2021 | Baseline: time to find, get access to and explore data, beside a paid commercial catalog | 45 days (own baseline) | Career record |
| FY23 | Catalog v1 and Data Map | Commercial catalog retired; top-5 click-through 68% → 96% | FY23 year-end review |
| Dec 6, 2023 | Lineage MVP in 4 weeks | About 30,000 tables and 7,000 pipelines; 450–500 monthly users by Jul 2024 | Launch post; FY24 review |
| FY24 | AI quality signals and curated tables | Monthly users 1,886 → 2,664 (+42%); 1,600 new 3-star data products discoverable | FY24 year-end review |
| Oct 16, 2024 | Self-service marketing onboarding (campaigns delayed 7 days on average in FY23) | 1–2 weeks → under 24 hours | Launch post; FY25 review |
| 2023 → Mar 2026 | Platform scale | 20 days → 14.2 hours → 9.4 hours (public); 6,673 monthly users (Mar 2026) | AWS re:Invent 2025; Amplitude |

Hero visual: the 2021 table page beside the 2026 platform screen shown at AWS re:Invent 2025, with the five-pillar diagram (Produce → Certify → Catalog → Access → Explore).

### 1. Defining the data product model (2021–2023)
In June 2021 the catalog listed bare table and column names beside a paid commercial catalog. To retire it I designed the signals needed to judge a table without asking anyone: descriptions, trust flags, claiming ownership, opening tables in notebooks, SQL view definitions, column popularity, and a nested-column viewer with in-schema search.

Through about 20 feedback sessions in FY22 we took on the structural problem: the same business concept (a customer, an invoice) existed as a batch table, a real-time stream and a marketing copy with nothing connecting them.
- **Decision:** the Data Map, one entry per data product with every physical copy nested beneath it, plus one view of every hosting location (production and test side by side).
- **Trade-off:** moving fast to retire the commercial catalog left layout inconsistencies to standardize later, and a formal usability study was deferred in favor of testing features as they shipped.

### 2. Lineage in four weeks and human-corrected AI signals (2023–2024)
- **Lineage (Dec 2023):** a four-week deadline before tax season to trace upstream and downstream dependencies across about 30,000 tables and 7,000 pipelines, with a downloadable impact report. Decision: show upstream failure alerts wherever the affected data appears, on search result cards and table headers, not only inside the graph. 450–500 monthly users by July 2024, then handed to a second designer.
- **AI quality signals (2023–2024):** for the clean-data initiative (standard defined by the platform org) I designed maturity scorecards, AI-written descriptions (building on a summer 2023 intern project I scoped), AI classification and compliance tags, and intended-use labels. Because people distrusted unverified AI metadata, two correction controls: the owner edits an AI description inline, and any user can report a wrong tag. 1,600 new 3-star data products became discoverable.

### 3. Self-service onboarding on the third design (2024)
Onboarding clean data into the marketing store took 1–2 weeks across engineers, marketers and data owners, delaying campaigns by 7 days on average in FY23.
- **First design:** a structured request plus manual owner approval.
- **Second design, why it stalled:** leadership asked for less friction, so approval was removed for full automation. After months of engineering work it proved infeasible because of access permissions and data-movement edge cases. Drawing every state and edge case is what surfaced them.
- **Third design, shipped Oct 16, 2024:** self-service with no approver for qualifying data, a ticket keeping the owner in the loop for the rest, AI pre-fill, a test run against a staging copy before submission, and a status tracker.
- **Multiplier:** 1–2 weeks became under 24 hours, and the request-and-tracker flow became the pattern for access requests and certification. In FY25, as manager, I also designed developer-portal table and schema creation when a partner team lost its designer.

---

## FILE 4: Scaling design leadership (now the Team page)

System context: Intuit enterprise data platform (9 product areas · 1:85 designer-to-engineer ratio).

### Scope and impact summary
- **Duration:** two years as manager (Aug 2024 to Jul 2026); five years on the platform.
- **My role:** Product Design Manager, player-coach: org strategy, research ops and cross-team alignment while still designing Search 2.0, the agent spec and Datalake schema creation.
- **Team and scale:** designers across 9 product areas (finding and understanding data, access, lineage, health monitoring, reliability, product usage tracking, pipeline authoring, publishing, ingestion). Across the data design group, one designer for every 85 engineers (about 550 engineers and 16 PMs).
- **Management, research and design-ops stack:** Marvin, Slack help-channel and voice-of-customer mining, Amplitude and Databricks, a unified intake and project tracker, a 6-slide promotion case framework, v0 and coded prototyping, AI launch videos.
- **Attribution rule:** product work below was designed by the designers on my team (and partner designers for certification); my part is one sentence per area.

| Area | Launches (2024–2026) | Outcome | Source |
|---|---|---|---|
| Access to data | Unified request tracker (Dec 2024); stream access (Mar 2025); restricted tax data (May 2025); table + encrypted column requests (Aug 2025); bulk access (Aug 2025); owner auto-approval rules (Sep 2025) | Manual requests 25% faster; streams 2–3 weeks → 3 days (61% auto-approved); 85% fewer ineligible tax denials; decryption 9 → 3 days; 5,000 tables in a week (200+ hours saved); internal data 24 hours → near-instant | Launch posts Dec 2024 – Sep 2025; FY25 reviews |
| Lineage for incidents | List-based dependency summary and single-attribute lineage with readable impact reports (after 6 user visits and a one-week, 7-concept sprint) | Root-cause investigations about 4 hours → minutes; 19 marketing data incidents resolved in one tax season | FY26 mid-year review |
| Certifying clean data | Guided 4th-level certification across several production paths (Nov 5, 2025) | Clean data <1% → 80% of the estate; P0/P1 incidents 17 → 0 in TY25 | Launch posts; AWS re:Invent 2025; FY27 readout |
| Discovery and AI ops | Query Insights (May 2025); stream and marketing-attribute search (Jun/Aug 2025); Collections (Aug 2025); agent patterns (2026); coded dev prototyping | 99.99% first-result precision on stream and marketing search; 90% faster dev time on a redesign | Launch posts May–Aug 2025; FY26 mid-year review |

Hero visual: a redrawn, anonymized map of the 9 product areas with the team's launches on it, beside the Marvin repository, the intake tracker and the promotion framework.

### What I put in place
1. **Design where the problem is defined, and strategy docs others designed from.** I moved my time into early framing meetings, wrote strategy and architecture docs (Search 2.0, the agent rules) that my team extended, and argued for work missing from the roadmap. Query Insights and Collections got on it and my team designed them; the engineering manager's quote above.
2. **One shared research base in Marvin, plus Slack mining.** The designers pooled six months of visits, surveys and mined help-channel threads into one repository, so engineers and PMs had evidence for pitch decks and requirements. My manager wrote that it showed in what was added to the roadmap.
3. **Weekly syncs, one intake tracker, decisions that get made.** One intake path, one tracker, weekly design syncs. My designers valued clarity when requirements were unclear, boundaries when work kept changing (pushing back when leadership tried to spread the access designer across instrumentation), and getting engineering leads and PMs into one room to decide.
4. **AI tools modelled first, then team-originated practices.** v0, AI synthesis and AI videos in my own work first; every designer adopted them. The team then started: coded prototypes with developers (90% less dev time on a redesign), AI-made launch videos that engineering copied, and a design sign-off before release.
5. **A 6-slide promotion case framework,** used by every designer on my team. The summer 2023 intern converted to full-time and joined my team. Every designer who reported to me was promoted (decision of 23 October 2026; the kit's "one plus two approved" is superseded).

### My part in each area
- **Access:** I designed the 2023 catalog entry point into access requests and protected the access designer from being split across two domains; the designer shipped six launches and wrote the tracker PRD while the PM was away.
- **Lineage:** I designed the 2023 graph in four weeks and handed it over in 2024; the designer moved from a full graph to a list summary and attribute impact report after 6 visits and a 7-concept sprint.
- **Certification:** I coordinated design across my team and the wider group, getting PMs and designers to agree on unclear requirements so 4th-level certification launched consistently.
- **Discovery:** I led the 2024 research, the first Search 2.0 design and the agent specification; my team shipped Query Insights, stream and marketing search, Collections and the agent's response patterns.

(The kit's "Limits & What I Changed as a Leader" section is dropped by decision.)

---

## FILE 5: Timeline notes and 605

### Timeline facts from the kit worth checking against lib/timeline-data.ts
- Search 2.0 spec authored June 2024; 20 in-context visits spring 2024.
- Datalake table and schema creation during a partner team's staffing gap (FY25).
- Data Copilot: 16 hackathon teams, 58 collaborators, 4 months, 500+ monthly users, CTO demo at Investor Day 2023. (The kit's "won the org innovation award" is unsourced; leave out.)
- 605: led design for three products; about 20 engineers and 5 PMs; two products at once; onboarded two designers. (The kit's "$20M+ to $30M+" is unsourced; leave out.)

### 605: three analytics products for TV advertising (2017–2021)
How the three products connected, using a Killing Eve season 3 example, for programmers and researchers at networks like AMC Networks and Discovery (client names allowed in the case study, not on the landing page):
1. **605 Indxr (audience insights):** which network and time of day to air the commercial to reach the target audience. Tested with 5 networks; replaced manual ranking pulls of 1 day to 2 weeks; traded instant results on 12 attributes for 200 attributes; suppressed results under 100 households for privacy; its search, export and sign-in were reused across the suite.
2. **605 Platform (ad and content delivery measurement), the deep dive:** a self-service "well-dressed SQL query builder" measuring reach and viewing seconds ($20M+ booked across three network clients).
   - **Problem:** reports supported one audience at a time. Comparing audiences (studied with 4 researchers and 5 internal reports) took 30 minutes for 2 targets and 2 metrics, 10+ minutes per addition, and 1–2 hours for 5 targets and 4 metrics.
   - **Iteration 1, 15 targets, blocked:** supporting the observed maximum of 15 pushed chart render from 30–60 s to 3–4 minutes and the build to 4 months, missing a 2-month client deadline; inconsistent color rules confused users.
   - **Iteration 2, shipped in 2 months:** real usage showed 9 of 10 reports compared 2–5 targets (15 appeared once) and dual-metric charts only ever used one target. v1 was scoped to 5 targets, in-app search and filter deferred (exports had the data), and one rule set: when comparing targets, color always means target. Render time 1–1.5 minutes, deadline met, $2M additional booked revenue from pitches using the designs.
3. **605 Impact (ad attribution) and the data-viz design system:** collapsed 32 separate reports into a two-page narrative and replaced an unreadable chart type that had caused about 8 bugs (about 2 days each). Created an accessible 5-color palette (#8745c6, #53c1e8, #ffa200, #eb0008, #15a736), introduced Lato tabular numerals, and designed and built an internal client reporting dashboard.

---

## FILE 6: Visual placement map (sources on the Mac)

### Case study 1
- Hero: three-panel evolution, Data Copilot (Natural_language_search.mp4) → Search 2.0 (Search 2.0.fig, dde_search_v3.mp4) → agent (DDE-Cursor-Claude.mp4, 3x-DDE-Agent-Demo.mp4).
- Research: the two identically named tables before-state, and a breakdown of the 666 help-channel questions.
- Search 2.0: before and after results (December 2024 captures), the six tabs, the facet rules diagram, the five-line card, the rejected nested-facet option.
- Collections and agent: DDE - Data Collections.fig or the August 2025 launch video; the agent in Cursor beside the three-intent spec ("Updating Cursor Output").

### Case study 2
- Hero: 2021 table page beside the 2026 platform screen from AWS re:Invent 2025.
- Data product model: the five-pillar diagram; a data product card with nested copies; the 2021–2023 table page (trust flags, SQL view, nested schema, hosting locations).
- Lineage and AI signals: Data Lineage.fig; the upstream alert on a search card; the maturity scorecard with inline editing.
- Onboarding: the three designs side by side (Self-serve CDC Attribute Onboarding.pptx), the edge-case state map, the shipped form and staging test.

### Team page
- Hero: the redrawn 9-area launch map (no names or photos) plus the Marvin repository, the intake tracker and the promotion framework.
- Areas: the access journey map (FigJam) and request tracker; the 2023 lineage graph beside the list summary; a 4th-level certification workflow on two paths; a frame from an AI-made launch video (8_04_25 DDE Data Collections Launch Announcement.mp4).
- Screenshots already reviewed in this session: ~/Documents/Work/Intuit (2021-2026)/Media/Screenshots (product screens, Amplitude, research, Slack mining, the tracker, recognition posts).

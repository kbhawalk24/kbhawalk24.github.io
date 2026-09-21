# Resume redline

Source: `public/kanchi-bhawalkar-resume.pdf` (2 pages, extracted 21 Sep 2026).

**Why these changes.** The resume reads manager-only, but the record is two
records: ten years of shipped IC craft and two years of M1 management, with
the 2024-2026 entries proving the craft never stopped. IC panels worry a
manager has gone rusty; manager panels worry an IC cannot let go. The edits
below make each reader find their evidence fast without inventing anything.

Facts are drawn only from the existing resume, `lib/timeline-data.ts` and
`lib/site-content.ts`. Management scope is stated as it is: two years, a team
of three.

---

## 1. Headline

**Now**

> Design leader with 12+ years across ad analytics and enterprise data
> platforms. Expertise in agentic AI experience design, data visualization,
> and design strategy for complex data environments.

**Proposed**

> **Principal Product Designer · Product Design Manager**
>
> Design leader for enterprise data: ten years shipping the work, two years
> leading the team that ships it, still in the codebase. Agentic AI
> interaction design, data visualization, and design strategy for complex
> data environments.

Two changes. The title line exists because recruiters and ATS match on
titles, and "Design leader" matches only one of the two searches. The summary
states the dual track as the point rather than leaving a reader to infer it.

---

## 2. Product Design Manager, Intuit (Aug 2024 - Present)

Add a scope line directly under the role. Manager screens filter on scope and
it is currently absent:

> Team of 3 designers · ~550 engineers · 16 product managers · 24 launches in
> 12 months

Keep the existing **Team leadership / Direct IC execution** split. It is the
single best device on the resume, and it is what makes the dual-track claim
legible at a glance.

### Verb audit

Three bullets lead with verbs that tell an IC reader the work was
supervised, not designed. Same facts, attribution made explicit.

| Now | Proposed | Why |
|---|---|---|
| "Guided operational workflows that reduced access provisioning from 9 to 3 days (saving 4,000 hours/year) and cut restricted-data denials by 85%." | "Directed the redesign of data-access workflows: provisioning 9 → 3 days, most routine requests auto-approved, restricted-data denials down 85%, ~4,000 hours saved per year." | "Guided" reads as oversight. "Directed the redesign" names the design act and keeps the numbers. |
| "Oversaw lineage and observability, ensuring zero marketing-data incidents during the 2025 tax peak; secured promotions for all direct reports." | Split into two bullets (below). | One bullet currently carries an engineering outcome and a people outcome; neither lands. |
| *(new bullet)* | "Owned lineage and observability for the platform: zero marketing-data incidents through the 2025 tax peak." | Stays under Team leadership. |
| "…secured promotions for all direct reports." | "All three direct reports promoted. I wrote the promotion-case framework the team used." | "Secured" is vague; the framework is the transferable artifact and the stronger signal. |

### Principal-level craft, kept where it is

The two **Direct IC execution** bullets are the most valuable lines on the
page for an IC panel. Leave them unchanged except to make the agent metric
match the site:

> Authored the interaction model for agentic data search and drove
> architectural adoption of the Cursor/Claude data search MCP server, cutting
> time to insight from 45 minutes to under 4. Agent search precision 11% →
> 81% in three months.

---

## 3. Principal Product Designer, Intuit (Jan 2024 - Aug 2024)

This role has two bullets and is the thinnest block on the page, yet it is
the hinge between the two tracks. Give it the same split:

> **Design strategy**
> Set the FY25 roadmap through twenty in-context user visits and a
> cross-functional ideation workshop; the group product lead called the
> research a major contributor to it.
>
> **Direct IC execution**
> Redesigned platform search on a semantic interaction layer: precision 81% →
> 89%, query latency 51s → 2s, across every data type on the platform.
> Designed clean-data features, AI-generated descriptions and maturity
> scorecards, making 7,000+ high-quality data products discoverable.

Strategy and craft in the same role, six months apart, is the clearest
evidence that the two tracks are one person.

---

## 4. Senior Product Designer, Intuit (Jun 2021 - Jan 2024)

One factual fix.

**Now**

> "…reduced data discovery time from 45 days to 3."

**Proposed**

> "…reduced time to find, access, and explore data from ~45 days to seconds."

The site and the sourced year-end summaries both say seconds. Two different
numbers for the same claim across a resume and a portfolio reads as
inflation, so use the sourced one.

Everything else in this role stands: founding the catalog, top-5
click-through to 96%, Data Copilot at 500+ MAU with SQL authoring twice as
fast and the CTO presenting it at Investor Day 2023, and the first lineage UI
in four weeks across ~30K tables and ~7K pipelines.

---

## 5. Key skills

**Now**

> Agentic AI Experience Design · Design Strategy & Leadership · Data
> Visualization · Executive-level Communication · Mentoring & Team Development

**Proposed**

> Agentic AI Experience Design · Interaction design for AI agents · Data
> Visualization · Prototyping in v0 and code · Design Strategy & Leadership ·
> Mentoring & Team Development

Three of the five current skills are leadership, which skews an IC read. The
two additions are both evidenced (the agent interaction model and rules; v0
prototypes, Figma Make, and merged production pull requests). "Executive-level
Communication" goes: it is unprovable on a resume, and the CTO Investor Day
line already demonstrates it.

---

## 6. Selected work

Add one line above Education so each reader is routed to their own evidence:

> **Selected work**
> kbhawalk24.github.io/work/finding-data (IC) ·
> kbhawalk24.github.io/work/trusting-data (Both) ·
> kbhawalk24.github.io/leadership (Manager)

The tags matter more than the links. They tell a reader which two minutes of
the portfolio answer their question.

---

## 7. What deliberately does not change

- **Page count.** Still two pages; the additions are offset by tightening the
  three rewritten bullets.
- **TIBCO.** The 2012-2015 engineering block stays as is. It is the reason
  the data fluency is credible and it costs four lines.
- **Management scale.** Two years, three reports. No "org", no "head of", no
  headcount rounding. The record is strong at its real size and a manager
  panel will check.

## Open item

The leadership case study still has three `[DRAFT]` blocks: the concrete
"got in the room earlier" case, the 24-launch table with the $4.5M direct /
$10M indirect / 22K hours figures, and the "what I would do differently"
reflection. The resume can point at that page, but a manager panel that
follows the link finds metrics without a story. That content is the highest
value thing left to write, and it needs Kanchi.

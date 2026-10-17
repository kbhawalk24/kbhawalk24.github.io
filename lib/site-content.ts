/**
 * Portfolio page content: the four pages behind the timeline.
 *
 * This is a SKELETON. Every chapter carries the facts we have (with sources)
 * and a `draft: true` flag where the narrative still needs writing.
 * Nothing here should appear on the site that isn't in Work_Highlights.md
 * or the resume. Plain language only, no internal acronyms.
 */

export type ChapterRole = 'IC' | 'Team' | 'Both'

export interface Visual {
  /** What the image/video should show. */
  caption: string
  /** Path under /public once it exists, e.g. /work/finding/02-data-map.png */
  src?: string
  kind?: 'image' | 'video'
}

export interface Chapter {
  id: string
  title: string
  period: string
  role: ChapterRole
  /** 1-3 short paragraphs. */
  body: string[]
  /** The one decision worth showing, with the alternative rejected. */
  decision?: { title: string; detail: string }
  metrics?: { value: string; label: string }[]
  visuals: Visual[]
  /** true = narrative not yet written; the layout shows a draft badge. */
  draft?: boolean
}

export const CHAPTER_ROLE_LABEL: Record<ChapterRole, string> = {
  IC: 'My design',
  Team: 'The team',
  Both: 'Me + the team',
}

export const CHAPTER_ROLE_STYLE: Record<ChapterRole, string> = {
  IC: 'bg-track-ic/10 text-track-ic',
  Team: 'bg-track-management/10 text-track-management',
  Both: 'bg-track-strategy/10 text-track-strategy',
}

export interface PortfolioPage {
  slug: string
  href: string
  kind: 'case-study' | 'leadership' | 'overview'
  eyebrow: string
  title: string
  /** One sentence: the claim the page proves. */
  claim: string
  period: string
  role: string
  /** The insight that organizes the page, shown near the top. */
  insight?: string
  /** Role and years, for the card on the home page: "Product Design Manager · 2024-2026". */
  roleTag: string
  /** One line of verified outcomes for the card, items separated by " · ". */
  outcome: string
  /** The card's cover once a real screenshot or video exists. */
  cover?: Visual & { poster?: string }
  /** Set while the write-up is still in progress; the card says so instead of linking. */
  status?: 'coming-soon'
  metrics: { value: string; label: string }[]
  chapters: Chapter[]
  reflection?: string[]
  /** Who did what, in one paragraph. */
  credits?: string
}

// ───────────────────────────────────────────────────────────────────────────
// Case Study 1: Finding data
// ───────────────────────────────────────────────────────────────────────────
export const FINDING_DATA: PortfolioPage = {
  slug: 'finding-data',
  href: '/work/finding-data',
  kind: 'case-study',
  eyebrow: 'Case study 01 · Intuit, 2021-2026',
  title: 'Finding data',
  claim:
    'How people at Intuit search for and trust data, designed through five versions: a keyword catalog, a map of data organized by business meaning, a plain-language assistant, a rebuilt semantic search, and an agent inside the coding tools engineers already use.',
  period: '2021 - 2026',
  role: 'Lead designer for the data catalog (2021-2024); product design manager, still designing (2024-2026)',
  roleTag: 'Principal IC and strategy lead · 2021-2026',
  outcome:
    '68% → 96% top-five click-through (2023) · 81.31% → 89.24% first-result precision (2025) · 45 min → 4 min from a question to an answer with the agent (2026)',
  insight:
    'Of 666 questions sent to the company’s data help channel in one year, 43% were people trying to locate the right data, and 73% were resolved only because a specific person knew the answer.',
  metrics: [
    { value: '68% → 96%', label: 'Searches with a click in the top five results (Apr 2022 → Apr 2023)' },
    { value: '81.31% → 89.24%', label: 'Searches where the first result was the right one (Mar 2025)' },
    { value: '45 min → 4 min', label: 'From a question to an answer with the agent (2026)' },
    { value: '711', label: 'Active agent users, Mar 2026' },
  ],
  chapters: [
    {
      id: 'catalog',
      title: 'A catalog people would use instead of the one we paid for',
      period: '2021 - 2023',
      role: 'IC',
      body: [
        'When I joined in June 2021, the internal catalog covered data-lake tables and their columns and little else, and the company was paying for a commercial catalog alongside it. Both returned bare table names without the information needed to tell whether a dataset was live or stale. One person found two customer tables with nearly identical names and had to ask in the help channel which one to trust, because one of them had not been refreshed in over a year.',
        'The mandate was to retire the commercial catalog. People would not switch to an internal tool that returned a table name and nothing to judge it by. I designed the home page, search and filtering, and browsing by data warehouse, and added what a person needs to decide on a result: trust flags, documentation, ownership, and the SQL behind a view. In 2023 I added usage statistics and column popularity.',
        'The commercial catalog was retired in fiscal 2023. Top-five click-through rose from 68% to 96% between April 2022 and April 2023, the satisfaction score rose from 26 to 31, and after documentation launched, 41% fewer users said data was poorly documented.',
        'What stayed unsolved: search still returned physical tables. The same data existed as a batch table, a real-time stream, and a marketing copy, and nothing connected them. I had also planned a formal usability study and did not run it, testing each feature with users as it shipped instead.',
      ],
      metrics: [
        { value: '68% → 96%', label: 'Top-five click-through' },
        { value: '26 → 31', label: 'Satisfaction score (NPS)' },
        { value: '−41%', label: '“Poorly documented” complaints' },
      ],
      visuals: [
        { caption: 'The 2021-2023 catalog: search results and the table detail view with trust flags, documentation status, ownership, SQL view preview, and column popularity.' },
        { caption: 'Before: two near-identical customer tables in the legacy search results, with nothing to tell them apart.' },
      ],
    },
    {
      id: 'data-map',
      title: 'Organize by what the data is about: the Data Map',
      period: '2022 - 2023',
      role: 'IC',
      body: [
        'The company was reorganizing its data by business domain, and the catalog had to let people find data by meaning rather than by storage engine. Three terms matter here. A table is one physical dataset. A data product is a business concept, such as a customer, with an owner and a description; every physical copy of it sits beneath it: the batch table, the real-time stream, the marketing copy. A facet is a property of search results that narrows them, such as owner or freshness.',
        'I designed browsing, search, and detail pages for the Data Map: one entry per data product, with every physical copy listed beneath it. It took several rounds of feedback with around 20 users and a rework of the home page, browsing, search, results, and detail pages. In 2023 I added one consolidated view of every location where a piece of data is hosted, and filters for real-time versus batch. No catalog we evaluated organized data this way.',
        'What stayed unsolved: people still had to know the right words. Search matched keywords only.',
      ],
      decision: {
        title: 'Organize results by business meaning, not by where the data is stored',
        detail:
          'The simpler path was a flat list of physical tables with storage-engine filters. Nesting physical copies beneath a logical data product meant re-architecting the browse, search, and entity pages. I took that path because it matches how people think about the data they need.',
      },
      visuals: [
        { caption: 'The Data Map search and entity view: one data product with its batch table, real-time stream, and marketing copies nested beneath it.' },
        { caption: 'The 2023 consolidated view of every location where a piece of data is hosted.' },
      ],
    },
    {
      id: 'copilot',
      title: 'Ask in plain language: Data Copilot',
      period: '2023 - 2024',
      role: 'IC',
      body: [
        'Generative AI arrived, and 16 hackathon teams each built a separate conversational experiment on top of catalog metadata. As sole design lead, I consolidated the work of 16 teams and 58 collaborators into one chat-based flow with four capabilities: finding tables, writing SQL, sample insights, and translating SQL. It shipped in four months.',
        'Analysts wrote SQL twice as fast (2.2x for single-table queries). More than 500 people used it each month. Intuit’s CTO presented it on stage at Investor Day 2023, and it won the organization’s innovation award.',
        'What stayed unsolved: usage did not hold after 2024. People had to leave their coding tools and notebooks for a standalone web chat window, and freeform chat answers lacked the structured provenance needed to verify and trust unfamiliar tables.',
      ],
      metrics: [
        { value: '4 months', label: 'From 16 explorations to one shipped product' },
        { value: '2×', label: 'Faster SQL writing for analysts' },
        { value: '500+', label: 'Monthly users' },
      ],
      visuals: [{ caption: 'The plain-language assistant: table discovery and SQL generation in one chat flow.', kind: 'video' }],
    },
    {
      id: 'search-2',
      title: 'Research first, then rebuild search',
      period: '2024 - 2025',
      role: 'Both',
      body: [
        'Cutting the time it took to discover data was a company goal. A data scientist told us, “Data discovery is the longest part of a new project.” In spring 2024 I interviewed 20 catalog users across business units while they did their own work, brought engineers along to watch, and ran a workshop with the whole team. The group product manager called it “a major contributor to our FY25 roadmap.”',
        'Four things the research changed. People know the object type up front, whether they want a table or a stream, with the exception of marketing managers and machine-learning engineers who move data between systems. Analysts trust engineering-owned, curated tables over the rest, and are frustrated when they cannot map a raw table to its curated equivalent. Machine-learning engineers need to learn quickly that data does not exist, or that a real-time source does. And people look for new data roughly one time in five; four times in five, they return to data they already know.',
        'Five decisions followed. One tab per type of data (Tables, Data Map, Real-Time Streams, Feature Sets, Dashboards, Marketing Attributes) replaced the old two-mode split that mixed every asset type together. One rule for filters and facets: a filter is the kind of object and never changes; a facet is a property of the results and changes with the query, with four facet behaviors defined by how many values a facet has and whether they nest. A limit of five lines of information per result, each either operational (freshness, quality) or social (how many people query it). Nested browsing inside a facet came out of the first release, sort order was deferred, and the choice between user tags and collections was left open, which set up Collections for 2025. And when two of the first three reviewers said AI-generated descriptions were not trustworthy, we stopped showing unverified ones and prioritized human editing controls.',
        'Table search launched on November 14, 2024, with keyword precision up 12.5% and semantic precision up 58%. I designed the first version of search across the Data Map; after I became a manager, a designer on my team carried it to launch on March 26, 2025, covering 10,000 data products and 460,000 attributes. The first result was the right one 89.24% of the time, up from 81.31%, and 99 in 100 searches finished within 1.93 seconds, down from 50.59. Engineers and the search-model team delivered the precision and speed; design defined what was searchable and how a person judges a result.',
        'What stayed unsolved: exact-name search fell short after the semantic rebuild. The top-five click rate dipped from 96% to 94% in July 2025 and stood at 95% in January 2026.',
      ],
      decision: {
        title: 'One tab per type of data',
        detail:
          'The Data Map had argued for organizing by business meaning, and the 2024 research showed people usually know which physical type they need. One tab per asset type lets a person scope by type when they know it, or browse the Data Map tab when they are searching by business concept. The rejected option was keeping the two-mode split with better filters.',
      },
      metrics: [
        { value: '+12.5% / +58%', label: 'Keyword / semantic precision, table search (Nov 2024)' },
        { value: '81.31% → 89.24%', label: 'First result correct, Data Map search (Mar 2025)' },
        { value: '50.59s → 1.93s', label: 'Response time, 99th percentile' },
      ],
      visuals: [
        { caption: 'Search results before and after the rebuild.' },
        { caption: 'The four facet behaviors and the five-line result card, with the rejected nested-facet browsing option.' },
      ],
    },
    {
      id: 'agent',
      title: 'Familiar data, then the agent in Cursor and Claude',
      period: '2025 - 2026',
      role: 'Both',
      body: [
        'Research showed people mostly return to data they already know, and the standalone assistant had faded. I argued for Collections, a person’s saved working set of data, as design strategy despite initial criticism from engineering. Designers on my team designed and shipped it on August 7, 2025. Our engineering manager wrote that it “would not have happened if not for Kanchi’s persistence and design sponsorship.”',
        'Rather than building a better web chat window, we moved the catalog into the coding tools people already used, Cursor and Claude, through MCP servers. I wrote the specification for how the agent answers three kinds of requests. Looking up a known table: return the name, description, whether it belongs to a data product and how mature that product is, when it was last refreshed, its owner and top users, what depends on it, and whether the person has access. Choosing a table for a use case: return five candidates, each with the specific reason it matches. Asking a question that needs a value: if one column answers it, show the column and a query; if the answer needs several tables, state which tables and columns the agent plans to join and why, check that they exist, check access, then run the query or hand it over.',
        'Four working rules: check the person’s Collections before searching the wider lake; never invent a table name; never show a query that has not been run; always ask before running anything.',
        'I recruited the first users, tested the agent’s answers against real questions, and refined the rules. A designer on my team built the response patterns that shipped and benchmarked their precision, and engineers built the servers. By March 11, 2026, the agent had 711 active users and 56,560 tool calls in 90 days. In an observed-task study, the time from a question to an answer fell from 45 minutes to 4 minutes.',
        'What stayed unsolved: the agent lived in coding tools, not yet inside the web catalog itself. As of March 2026, a designer on my team was leading the work to bring it there.',
      ],
      metrics: [
        { value: '711', label: 'Active users, Mar 2026' },
        { value: '56,560', label: 'Tool calls in 90 days' },
        { value: '45 min → 4 min', label: 'From a question to an answer, observed-task study' },
      ],
      visuals: [
        { caption: 'The agent answering inside Cursor and Claude.', kind: 'video' },
        { caption: 'An excerpt of the answer specification for the three request types, beside the Collections UI.' },
      ],
    },
  ],
  reflection: [
    'Protect exact-name search during semantic rebuilds. When we tuned the rebuilt search for semantic matching, exact table-name lookup regressed and top-five click-through dipped from 96% to 94%. I would isolate exact-string lookup as a separate fast path from day one.',
    'Run formal usability baselines early and bind research directly to specs. Skipping a formal usability study in 2022, and watching four research readouts fail to change engineering direction in 2025, pushed me to stop treating research as a slide deck. I wrote the agent’s operational rules myself and fought to make Collections its context layer.',
  ],
  credits:
    'I was the designer for versions one to three and for the research and first design of version four, and the manager and strategy lead for version five. I worked with product managers, search and platform engineers, and the search-model team. Designers on my team took search across the Data Map from my first version to launch, designed Collections, and built and benchmarked the agent’s response patterns.',
}

// ───────────────────────────────────────────────────────────────────────────
// Case Study 2: Trusting data, and getting it
// ───────────────────────────────────────────────────────────────────────────
export const TRUSTING_DATA: PortfolioPage = {
  slug: 'trusting-data',
  href: '/work/trusting-data',
  kind: 'case-study',
  eyebrow: 'Case study 02 · Intuit, 2021-2026',
  title: 'Founding designer of Intuit’s data catalog',
  claim:
    'From a list of tables to the platform where people find data, judge it, get access to it, and start using it.',
  period: '2021 - 2026',
  role: 'Founding designer of the catalog: Senior, then Principal Product Designer (2021-2024); kept designing parts of it as a manager until 2026',
  roleTag: 'Founding and principal IC · 2021-2026',
  outcome:
    'Commercial catalog retired in FY23 · Time to discover and access data cut 20 days → 9.4 hours · Self-service onboarding 1-2 weeks → under 24 hours · 6,673 monthly users (Mar 2026)',
  status: 'coming-soon',
  metrics: [
    { value: '20 days → 9.4 hrs', label: 'Time to discover and access data (2023 → 2025, public figure)' },
    { value: '1-2 wks → <24 hrs', label: 'Self-service marketing data onboarding' },
    { value: '~30K', label: 'Tables in the first lineage graph, built in four weeks' },
    { value: '6,673', label: 'Monthly users, Mar 2026' },
  ],
  chapters: [
    {
      id: 'trust',
      title: 'Trust as a feature',
      period: '2021 - 2022',
      role: 'IC',
      body: [
        'Trust flags, documentation, usage statistics, ownership: the first signals that let someone decide whether to use a table without asking a person.',
      ],
      visuals: [{ caption: 'Trust flags and usage statistics on a table page.' }],
      draft: true,
    },
    {
      id: 'lineage',
      title: 'Lineage in four weeks',
      period: '2023 - 2025',
      role: 'Both',
      body: [
        'I shipped the first lineage UI on a four-week deadline: impact graphs across ~30K tables and ~7K pipelines, ~500 monthly users in the first year.',
        'Then I handed it off. A designer on my team took it from a table-level graph to attribute-level impact reports; usage passed 1,000 a month and incident investigations went from about four hours to minutes. This is the first place on this site where “I” becomes “we.”',
      ],
      metrics: [
        { value: '4 weeks', label: 'To first release' },
        { value: '~500 → 1,000+', label: 'Monthly users' },
        { value: '~4 h → min', label: 'Investigation time' },
      ],
      visuals: [
        { caption: 'The first lineage graph (2023).' },
        { caption: 'Attribute-level impact report (2025).' },
      ],
      draft: true,
    },
    {
      id: 'maturity',
      title: 'Data maturity standards',
      period: '2023 - 2025',
      role: 'Both',
      body: [
        'A scorecard first, then AI-generated descriptions and classification, then a company-wide maturity dashboard, then self-service certification. I designed the scorecard itself, including the 2★ → 3★ and 3★ → 4★ maturity criteria, while my team built the paved-path pipelines that produced clean data and the workflows that promoted data from unclean to clean. 1,600 newly certified products in one year; 7,000+ discoverable.',
        'The outcome that matters: zero marketing-data incidents at the 2025 tax peak. That result belongs to this work, not to lineage.',
        'This is the same governance work Intuit later presented publicly: the five-dimension scorecard (stewardship, documentation, data model, data observability, operational stability) that a Distinguished Engineer walked through at AWS re:Invent 2025 grew directly out of what we built here.',
      ],
      decision: {
        title: 'A transparency tool, not a tracker',
        detail:
          'The dashboard surfaces ratings, not tasks. Leaders could see exactly where a data product stood, 2 stars or 3 stars, without being handed a punch list. That visibility is what got teams to act on their own instead of waiting to be assigned work.',
      },
      metrics: [
        { value: '0', label: 'Incidents at peak, 2025' },
        { value: '1,600', label: 'Newly certified products in a year' },
      ],
      visuals: [{ caption: 'The maturity dashboard for leaders, or the scorecard on a data product.' }],
      draft: true,
    },
    {
      id: 'access',
      title: 'Access, from weeks to minutes',
      period: '2024 - 2026',
      role: 'Both',
      body: [
        'My piece: a self-service onboarding flow that stalled in 2024 on technical constraints and shipped in 2025, taking onboarding from one to two weeks down to under 24 hours, with AI pre-filling the form and validation up front.',
        'The team’s: topic access from two-three weeks to three days; decryption access from nine days to three at 360K+ requests a month; batch access from days to minutes; restricted-data denials down 85%; auto-approval to near-instant. Access requests grew from 10K to 18K in a year because asking stopped hurting.',
      ],
      metrics: [
        { value: '1-2 wks → <24 h', label: 'Self-service onboarding' },
        { value: '9 → 3 days', label: 'Decryption access' },
        { value: '−85%', label: 'Restricted-data denials' },
        { value: '10K → 18K', label: 'Access requests per year' },
      ],
      visuals: [
        { caption: 'The self-service onboarding flow.' },
        { caption: 'Batch access or decryption request flow.' },
      ],
      draft: true,
    },
    {
      id: 'closing-the-loop',
      title: 'Closing the loop',
      period: '2026 · in flight',
      role: 'Both',
      body: [
        'Where it was heading: access integrated into collections, so the agent’s context is also its access boundary. In flight when my role ended. [DRAFT: one paragraph on the semantic-layer direction, labeled as unshipped.]',
      ],
      visuals: [],
      draft: true,
    },
  ],
  reflection: ['[DRAFT: two or three honest sentences.]'],
}

// ───────────────────────────────────────────────────────────────────────────
// How I lead
// ───────────────────────────────────────────────────────────────────────────
export const LEADERSHIP: PortfolioPage = {
  slug: 'leadership',
  href: '/leadership',
  kind: 'leadership',
  eyebrow: 'Case study 03 · Intuit, 2024-2026',
  title: 'Scaling platform design at a 1:85 ratio',
  claim:
    'Leading the designers behind Intuit’s data platform: one designer for every 85 engineers, across nine product areas.',
  period: '2024 - 2026',
  role: 'Product Design Manager, still hands-on',
  roleTag: 'Product Design Manager · 2024-2026',
  outcome:
    'Clean data grew from under 1% to 80% of the estate, with 0 serious TY25 tax-season incidents, down from 17 · Stream access 2-3 weeks → 3 days · Incident investigations ~4 hours → minutes',
  status: 'coming-soon',
  metrics: [
    { value: '1 : 85', label: 'Designers to engineers' },
    { value: '<1% → 80%', label: 'Clean data across the estate (public figure, Dec 2025)' },
    { value: '17 → 0', label: 'Serious tax-season incidents, TY25' },
    { value: '1 + 2', label: 'Senior promotion secured; two more cases approved' },
  ],
  chapters: [
    {
      id: 'earlier',
      title: 'Getting in the room earlier',
      period: '2024 →',
      role: 'Team',
      body: [
        'The first thing that changed when I became a manager: I could strategize before executing, joining the meetings where the problem was defined and asking questions there instead of receiving a spec.',
        '[DRAFT: one concrete case. The original ask, the question, what shipped differently.]',
      ],
      visuals: [],
      draft: true,
    },
    {
      id: 'shipped',
      title: 'What the team shipped',
      period: 'Aug 2025 - Mar 2026',
      role: 'Team',
      body: [
        '[DRAFT: the launch table from the April 2026 deck, plain-language titles, one metric each. 2025 review: $4.5M direct / $10M indirect savings, 22K+ hours saved.]',
      ],
      visuals: [{ caption: 'Launch table (rebuilt from the April 2026 deck).' }],
      draft: true,
    },
    {
      id: 'people',
      title: 'Growing people',
      period: '2024 - 2026',
      role: 'Team',
      body: [
        'Secured one Senior promotion in January 2026 and had two additional promotion cases approved before my role ended. I wrote the promotion-case framework they used.',
        'What I watch for is what a team does on its own: one designer started a design sign-off practice that the engineering org adopted; another’s AI-generated launch videos became the format other teams copied; a third stepped in and filled the gap when I moved onto the agent work. [DRAFT: one sentence on what that says about how you manage.]',
      ],
      visuals: [{ caption: 'The 6-slide promotion framework (sanitized).' }],
      draft: true,
    },
    {
      id: 'prototyping',
      title: 'How this team prototypes',
      period: '2025 - 2026',
      role: 'Both',
      body: [
        'v0, Figma Make, Builder, NotebookLM, AI-generated launch videos, and me in the codebase writing the rules that govern AI coding agents. The team’s standard became: a working prototype before a spec.',
        'Magellan for Tax is the clearest example: sole designer, v0 prototypes including a mobile customer flow, demoed to Intuit’s founder. It did not ship; it is here as evidence of method, not outcome.',
      ],
      visuals: [{ caption: 'Magellan v0 prototype recording (mobile flow) or the “Lucy” storytelling video.', kind: 'video' }],
      draft: true,
    },
    {
      id: 'pov',
      title: 'Agents can query data. They can’t design trust.',
      period: '2026',
      role: 'Both',
      body: [
        'Three things I believe after two years of designing for agents: oversight is a new design problem (what was done, what is pending, what needs judgment); an agent answers the question you ask, and the interface handles not knowing what to ask; and high-stakes, multi-day, multi-actor workflows cannot live in a chat thread, because a thread is not audit evidence.',
        '[DRAFT: tie to the Data 3.0 framing in two sentences.]',
      ],
      visuals: [{ caption: 'The April 2026 “Design for Data” page, rehosted as-is.' }],
      draft: true,
    },
  ],
  reflection: ['[DRAFT: what you would do differently as a manager. Candidate: the influence gap, research that did not change direction, and what you would do about it now.]'],
}

// ───────────────────────────────────────────────────────────────────────────
// 605: the tools I built
// ───────────────────────────────────────────────────────────────────────────
export const SIX_O_FIVE: PortfolioPage = {
  slug: '605',
  href: '/605',
  kind: 'overview',
  eyebrow: 'Case study 04 · 605, 2017-2021',
  title: 'Three analytics products for TV advertising',
  claim:
    'The first product designer at 605, taking three products from concept to commercial launch. This is where the data-visualization craft comes from.',
  period: '2017 - 2021',
  role: 'Product Designer, first design hire',
  roleTag: 'First product designer · 2017-2021',
  outcome:
    'Render time cut 3-4 min → 1-1.5 min to hit a two-month client deadline · $2M in additional booked revenue from client pitches, $20M-30M+ across the launched suite',
  status: 'coming-soon',
  metrics: [
    { value: '$20M-30M+', label: 'Revenue across the launched suite' },
    { value: '3', label: 'Products, concept to launch' },
    { value: '3-4 min → 1-1.5 min', label: 'Report render time in 605 Platform' },
  ],
  chapters: [
    {
      id: 'impact',
      title: '605 Impact',
      period: '2018 - 2020',
      role: 'IC',
      body: ['A platform measuring TV advertising’s effect on consumer behavior. Collapsed 32 separate reports into a two-page interactive view and replaced a chart type that caused around 8 bugs.'],
      visuals: [{ caption: '605 Impact: the two-screen report.' }],
      draft: true,
    },
    {
      id: 'indxr',
      title: '605 Indxr',
      period: '2019 - 2020',
      role: 'IC',
      body: ['An audience-targeting platform that replaced manual ranking pulls which took one day to two weeks, designed to be dataset-agnostic.'],
      visuals: [{ caption: '605 Indxr.' }],
      draft: true,
    },
    {
      id: 'platform',
      title: '605 Platform',
      period: '2017 - 2019',
      role: 'IC',
      body: ['Redesign of the self-serve analytics tool, shipped in two months to meet a client deadline. Render time fell from 3-4 minutes to 1-1.5 minutes, and client pitches on it booked $2M in additional revenue.'],
      visuals: [{ caption: '605 Platform before / after.' }],
      draft: true,
    },
    {
      id: 'design-system',
      title: 'A data-visualization design system',
      period: '2018 - 2021',
      role: 'IC',
      body: ['Accessible, built for multivariate charts, and hand-coded where needed (D3, Plotly, Highcharts).'],
      visuals: [{ caption: 'Design-system page: chart components and color rules.' }],
      draft: true,
    },
  ],
}

export const PAGES: PortfolioPage[] = [FINDING_DATA, TRUSTING_DATA, LEADERSHIP, SIX_O_FIVE]

/**
 * Resolves a timeline entry's href (e.g. "/work/finding-data#agent") to the
 * page and chapter it points at, for the timeline's inline preview.
 */
export function resolveChapterHref(
  href: string,
): { page: PortfolioPage; chapter: Chapter } | null {
  const [path, hash] = href.split('#')
  if (!hash) return null
  const page = PAGES.find((p) => p.href === path)
  if (!page) return null
  const chapter = page.chapters.find((c) => c.id === hash)
  if (!chapter) return null
  return { page, chapter }
}

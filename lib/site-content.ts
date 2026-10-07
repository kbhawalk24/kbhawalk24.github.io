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
  metrics: { value: string; label: string }[]
  chapters: Chapter[]
  reflection?: string[]
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
    'One question, designed five times over five years, each time closer to how people really behave: how does someone find data they can actually use?',
  period: '2021 - 2026',
  role: 'Founding designer → design lead → manager, still hands-on',
  insight:
    'Research before the search redesign showed that people look for new data only about one time in five. Four times in five, they are going back to something they already know. Search was never the whole job.',
  metrics: [
    { value: '~45 days → seconds', label: 'Time to find, access, and explore data (2021 → 2026)' },
    { value: '68% → 96%', label: 'Top-5 search click-through (2022 → 2023)' },
    { value: '11% → 81%', label: 'Agent search precision in 3 months (2025-26)' },
    { value: '45 min → 4 min', label: 'Time to insight via the agent' },
  ],
  chapters: [
    {
      id: 'catalog',
      title: 'A catalog that could replace the one we paid for',
      period: '2021 - 2022',
      role: 'IC',
      body: [
        'When I joined, the internal catalog was bare-bones: tables from the data lake, their columns, and not much else. The mandate was to make it good enough to retire the third-party catalog the company was paying for.',
        'I designed what a catalog needs before anyone will trust it (trust flags, documentation, query information, ownership) and widened what it covered: feature sets, real-time topics, data warehouses.',
      ],
      metrics: [
        { value: '68% → 96%', label: 'Top-5 click-through' },
        { value: '−41%', label: '“Poorly documented” complaints' },
        { value: '26 → 31', label: 'NPS' },
      ],
      visuals: [{ caption: 'The catalog when I joined vs. a year later (table detail page with trust flags, documentation, queries).' }],
      draft: true,
    },
    {
      id: 'data-map',
      title: 'The Data Map',
      period: '2022',
      role: 'IC',
      body: [
        'Every other catalog organized data by where it was stored. The Data Map organized it by the thing the data was about, and hung every physical copy under one entry: batch, real-time, marketing. Nobody had to wonder whether a real-time version of a dataset existed.',
        'It took about twenty user sessions and a redesign of the home page, browsing, search, and results to get there.',
      ],
      decision: {
        title: 'Organize by meaning, not by storage location',
        detail:
          'The alternative, a flat list of physical tables with better filters, was faster to ship and what every competitor did. [DRAFT: what pushed you to the harder option, and what it cost.]',
      },
      visuals: [{ caption: 'The Data Map view: one entity, every source and sink beneath it.' }],
      draft: true,
    },
    {
      id: 'copilot',
      title: 'Asking in plain language',
      period: '2023 - 2024',
      role: 'IC',
      body: [
        'Data Copilot was the first time anyone at Intuit could ask a question of data in plain language. As sole design lead I consolidated sixteen hackathon teams’ explorations into one chat-based experience and shipped it in four months.',
        'It reached 500+ monthly users, doubled how fast analysts wrote SQL, was presented by the CTO at Investor Day, and won the org’s innovation award. Then it fizzled. [DRAFT: why, and what that taught you about where the interface should live.]',
      ],
      metrics: [
        { value: '4 months', label: 'From 16 explorations to one shipped product' },
        { value: '2×', label: 'Faster SQL writing' },
        { value: '500+', label: 'Monthly users' },
      ],
      visuals: [{ caption: 'One of the four 2023 prototype recordings (natural-language search).', kind: 'video' }],
      draft: true,
    },
    {
      id: 'search-2',
      title: 'Search rebuilt on meaning',
      period: '2024 - 2025',
      role: 'Both',
      body: [
        'Twenty in-context user visits and a cross-functional ideation workshop set the next year’s roadmap; the group product lead called the research “a major contributor” to it. The search redesign was the first thing it authorized.',
        'Search 2.0 shipped in March 2025: semantic search across every data type on the platform. I owned the design; the engineering and model team delivered the gains.',
      ],
      decision: {
        title: 'Search as a foundation, not a feature',
        detail:
          'Scoped from the start to cover tables, real-time topics, and marketing attributes rather than one data type. [DRAFT: the facet-selection model and what you gave up to keep it simple.]',
      },
      metrics: [
        { value: '81% → 89%', label: 'Precision' },
        { value: '51s → 2s', label: 'Worst-case latency' },
      ],
      visuals: [
        { caption: 'Facet selection: the core search interaction (Figma).' },
        { caption: 'Before / after search results.' },
      ],
      draft: true,
    },
    {
      id: 'collections',
      title: 'Collections',
      period: '2025',
      role: 'Both',
      body: [
        'If people return to familiar data four times out of five, the catalog should make the familiar effortless. I pushed for Collections as design strategy, against resistance, and architected it; a designer on my team designed it.',
      ],
      metrics: [{ value: '41% → 61%', label: 'Session conversion' }],
      visuals: [{ caption: 'A collection: the handful of tables a team actually uses, shareable.' }],
      draft: true,
    },
    {
      id: 'agent',
      title: 'The catalog inside the coding agent',
      period: '2025 - 2026',
      role: 'IC',
      body: [
        'Instead of building a better chat, we moved discovery to where people already were: their coding agent. I wrote the agent’s rules, designed its responses, and worked on making its answers trustworthy: the same problem as trust flags in 2021, five years on.',
        'Collections became the agent’s context: with a team’s familiar tables in scope, accuracy passed 99%. I also worked directly in the codebase, writing the rules governing what AI agents may change, and merged production pull requests.',
      ],
      metrics: [
        { value: '11% → 81%', label: 'Precision in 3 months' },
        { value: '711', label: 'Users in the first months' },
        { value: '56K', label: 'Tool calls' },
        { value: '45 → 4 min', label: 'Time to insight' },
      ],
      visuals: [
        { caption: 'The agent answering a data question inside Cursor.', kind: 'video' },
        { caption: 'An excerpt of the rules file (redacted).' },
      ],
      draft: true,
    },
  ],
  reflection: ['[DRAFT: two or three honest sentences. Candidate: what you would have done with Data Copilot in 2023 knowing agents would end up in the IDE.]'],
}

// ───────────────────────────────────────────────────────────────────────────
// Case Study 2: Trusting data, and getting it
// ───────────────────────────────────────────────────────────────────────────
export const TRUSTING_DATA: PortfolioPage = {
  slug: 'trusting-data',
  href: '/work/trusting-data',
  kind: 'case-study',
  eyebrow: 'Case study 02 · Intuit, 2021-2026',
  title: 'Trusting data, and getting it',
  claim:
    'Finding data is useless if you can’t trust it or can’t get it. This is the other half of the 45-days-to-seconds story, and the half where I moved from doing the work to leading the team that did it.',
  period: '2021 - 2026',
  role: 'IC → manager of three designers',
  metrics: [
    { value: '0', label: 'Marketing-data incidents at the 2025 tax peak' },
    { value: '9 → 3 days', label: 'Access provisioning' },
    { value: '~4 h → minutes', label: 'Incident investigation with lineage' },
    { value: '1,000+', label: 'Monthly lineage users' },
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
  eyebrow: 'Intuit · Product Design Manager, 2024-2026',
  title: 'How I lead',
  claim:
    'Three designers, about 550 engineers, sixteen product managers: one designer for every 85 engineers, and 24 launches in twelve months.',
  period: '2024 - 2026',
  role: 'Manager of three, still hands-on',
  metrics: [
    { value: '1 : 85', label: 'Designers to engineers' },
    { value: '24', label: 'Launches in 12 months' },
    { value: '3 of 3', label: 'Direct reports promoted' },
    { value: '$4.5M', label: 'Direct savings, 2025' },
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
        'All three direct reports were promoted: one in the January cycle, two approved before I left and confirmed after. I wrote the promotion-case framework they used.',
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
  eyebrow: '605 · Lead Product Designer, 2017-2021',
  title: 'The tools I built at 605',
  claim:
    'Three analytics products for TV advertising, from concept to market, that generated $20M+ in revenue, and where the data-visualization craft comes from.',
  period: '2017 - 2021',
  role: 'Lead Product Designer',
  metrics: [
    { value: '$20M+', label: 'Revenue from products shipped' },
    { value: '3', label: 'Products, concept to launch' },
    { value: '15 days → 2 h', label: 'Audience report generation' },
  ],
  chapters: [
    {
      id: 'impact',
      title: '605 Impact',
      period: '2018 - 2020',
      role: 'IC',
      body: ['A first-of-its-kind platform measuring TV advertising’s effect on consumer behavior. Condensed 32 statistical reports of 500+ rows each into a two-screen interactive report.'],
      visuals: [{ caption: '605 Impact: the two-screen report.' }],
      draft: true,
    },
    {
      id: 'indxr',
      title: '605 Indxr',
      period: '2019 - 2020',
      role: 'IC',
      body: ['An audience-targeting platform that cut report generation from 15 days to 2 hours, designed to be dataset-agnostic.'],
      visuals: [{ caption: '605 Indxr.' }],
      draft: true,
    },
    {
      id: 'platform',
      title: '605 Platform',
      period: '2017 - 2019',
      role: 'IC',
      body: ['Redesign of the self-serve analytics tool; halved report-building time.'],
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

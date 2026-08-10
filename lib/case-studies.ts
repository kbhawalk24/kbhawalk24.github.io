export interface CaseStudy {
  subtitle: string
  context: string
  challenge: string
  approach: { title: string; detail: string }[]
  outcomes: string[]
  metrics: { value: string; label: string }[]
}

/**
 * Case studies are keyed by the timeline entry headline.
 * Every timeline card with a matching key opens a full case study panel.
 */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  // ── Intuit · Product Design Manager ────────────────────────────────
  'Scaled the platform into company-wide infrastructure': {
    subtitle:
      'From a localized discovery tool to the data backbone of the company',
    context:
      'When I stepped into management, Intuit’s data platform was a well-liked but localized discovery tool serving a handful of analytics teams. The company’s data footprint — tens of thousands of tables, thousands of pipelines — was growing faster than any single team could curate.',
    challenge:
      'Scale the platform’s UX to serve every function at Intuit — engineers, analysts, marketers, and compliance — without fragmenting the experience or the team maintaining it.',
    approach: [
      {
        title: 'Segmented the user base into platform personas',
        detail:
          'Ran a company-wide research initiative to map producer, consumer, and steward workflows, then reorganized the IA around jobs-to-be-done rather than org charts.',
      },
      {
        title: 'Prioritized shared primitives over bespoke features',
        detail:
          'Directed the team to invest in search, trust signals, and access workflows that every persona shares — resisting one-off requests that would splinter the product.',
      },
      {
        title: 'Built adoption loops with platform teams',
        detail:
          'Partnered with data-producing teams so publishing to the platform became the default path, not an extra chore.',
      },
    ],
    outcomes: [
      'The platform became company-wide infrastructure — the default way Intuit finds, trusts, and accesses data.',
      'Usage grew past 6,000 monthly active users spanning every business unit.',
      'The design team’s charter expanded from one product surface to the full data lifecycle.',
    ],
    metrics: [
      { value: '6,000+', label: 'Monthly active users' },
      { value: '5', label: 'Business units served' },
      { value: '1', label: 'Unified experience' },
    ],
  },

  'Guided operational workflows for data access': {
    subtitle: 'Turning a nine-day approval maze into a three-day workflow',
    context:
      'Getting access to restricted data at Intuit involved multiple ticketing systems, ambiguous ownership, and policies that users discovered only after being denied. Analysts routinely lost days waiting.',
    challenge:
      'Redesign access provisioning so speed and governance reinforce each other — faster for requesters, safer for stewards.',
    approach: [
      {
        title: 'Mapped the end-to-end denial funnel',
        detail:
          'Led the team through a service-blueprint exercise that revealed most denials came from requesting the wrong asset — a discoverability failure, not a policy one.',
      },
      {
        title: 'Moved policy upstream into the request flow',
        detail:
          'Guided designs that surface usage restrictions, ownership, and prerequisites before submission, so bad requests never enter the queue.',
      },
      {
        title: 'Consolidated approvals into a single review surface',
        detail:
          'Gave stewards context-rich review queues with lineage and prior-grant history so decisions take minutes instead of meetings.',
      },
    ],
    outcomes: [
      'Access provisioning dropped from 9 days to 3.',
      'Restricted-data denials fell 85% as requesters self-corrected upstream.',
      'The workflow now saves an estimated 4,000 analyst hours per year.',
    ],
    metrics: [
      { value: '9 → 3 days', label: 'Provisioning time' },
      { value: '−85%', label: 'Restricted-data denials' },
      { value: '4,000 hrs/yr', label: 'Analyst time saved' },
    ],
  },

  'Talent development and team outcomes': {
    subtitle: 'Building a team where every designer levels up',
    context:
      'I inherited and grew a team of designers working on some of the most technically dense surfaces at Intuit — lineage graphs, governance workflows, pipeline authoring.',
    challenge:
      'Grow designers in a domain where craft alone isn’t enough — every designer needs data fluency, systems thinking, and the credibility to push back on engineering-led decisions.',
    approach: [
      {
        title: 'Ran assessment against a data-design competency model',
        detail:
          'Defined explicit expectations for data fluency alongside core craft, making growth areas concrete instead of vibes-based.',
      },
      {
        title: 'Matched stretch assignments to promotion narratives',
        detail:
          'Staffed each designer on work that generated the evidence their next level required, and coached them on articulating impact in business terms.',
      },
      {
        title: 'Recruited for trajectory, not pedigree',
        detail:
          'Led sourcing and interview loops oriented around learning velocity — the trait that predicts success in deeply technical domains.',
      },
    ],
    outcomes: [
      '100% of direct reports earned promotions under my management.',
      'The team retained every designer through two reorgs.',
      'Data-design competencies I authored were adopted by peer teams.',
    ],
    metrics: [
      { value: '100%', label: 'Direct reports promoted' },
      { value: '0', label: 'Regretted attrition' },
    ],
  },

  'UX strategy for enterprise data maturity': {
    subtitle: 'Lineage and observability that survived tax season',
    context:
      'Intuit’s marketing data flows through thousands of interdependent pipelines. In prior years, silent upstream failures caused dozens of critical incidents — discovered only after campaigns misfired.',
    challenge:
      'Direct a UX strategy that makes data health visible and actionable before failures cascade, in time for the 2025 tax peak — Intuit’s highest-stakes period.',
    approach: [
      {
        title: 'Framed observability as a consumer problem',
        detail:
          'Shifted the team’s strategy from pipeline-operator dashboards to consumer-facing trust signals — surfacing freshness and incident status where data is actually used.',
      },
      {
        title: 'Directed the lineage-first alerting model',
        detail:
          'Guided designs that traverse the lineage graph to notify downstream owners automatically when upstream assets degrade.',
      },
      {
        title: 'Instituted pre-peak readiness reviews',
        detail:
          'Partnered with data platform leadership on UX-led readiness audits of the most business-critical data flows.',
      },
    ],
    outcomes: [
      'Zero marketing-data critical incidents during the 2025 tax peak, down from 35 the prior year.',
      'Lineage-based alerting became the standard incident-prevention pattern across the platform.',
    ],
    metrics: [
      { value: '35 → 0', label: 'Critical incidents at peak' },
      { value: '100%', label: 'Critical flows with lineage coverage' },
    ],
  },

  'Architectural strategy for agentic data search': {
    subtitle: 'Betting the platform on an MCP-native architecture',
    context:
      'As agentic tools like Cursor and Claude became daily instruments for Intuit engineers, data discovery was still trapped in a web UI. The strategic question: should the platform remain a destination, or become a capability agents can call?',
    challenge:
      'Drive architectural adoption of an MCP server for data search — a decision that reshapes the platform’s interaction model, trust guarantees, and roadmap.',
    approach: [
      {
        title: 'Prototyped the agentic workflow to make the case',
        detail:
          'Demonstrated an end-to-end flow where an engineer finds, evaluates, and queries governed data without leaving their IDE — turning an abstract architecture debate into a felt experience.',
      },
      {
        title: 'Defined trust requirements for agent-mediated answers',
        detail:
          'Specified how provenance, freshness, and access policy must travel with every result an agent returns, so speed never bypasses governance.',
      },
      {
        title: 'Aligned platform and AI leadership on sequencing',
        detail:
          'Brokered the roadmap trade-offs between UI investment and MCP capability, landing a strategy where both share one semantic layer.',
      },
    ],
    outcomes: [
      'The MCP server architecture was adopted across the data platform.',
      'Median time-to-insight for engineers dropped under 4 minutes.',
      'The platform’s semantic layer now serves both human and agent consumers.',
    ],
    metrics: [
      { value: '< 4 min', label: 'Time to insight' },
      { value: '2', label: 'Consumption surfaces, one semantic layer' },
    ],
  },

  'Authored the agentic search interaction model': {
    subtitle: 'Hands-on IC work: teaching agents to search data responsibly',
    context:
      'Even as a manager, I personally designed the structured interaction model that powers agentic data search — the rules governing how an AI agent interprets a question, disambiguates intent, and returns governed data.',
    challenge:
      'Natural-language data search fails in enterprise settings when agents guess. The model needed explicit disambiguation, provenance, and refusal behaviors — designed at the interaction-rule level.',
    approach: [
      {
        title: 'Wrote the interaction grammar myself',
        detail:
          'Authored the structured model defining when the agent answers, when it asks a clarifying question, and when it declines and routes to a steward.',
      },
      {
        title: 'Designed disambiguation as a first-class turn',
        detail:
          'Specified how the agent presents candidate assets with trust signals — freshness, certification, usage — so users pick with confidence instead of hoping.',
      },
      {
        title: 'Refined rules against real query logs',
        detail:
          'Iterated the model hands-on against production search logs, tightening rules where the agent over-answered or under-asked.',
      },
    ],
    outcomes: [
      'Agentic search accuracy exceeded 90% on production queries.',
      'The interaction model became the reference spec for agent behaviors across the platform.',
    ],
    metrics: [
      { value: '90%+', label: 'Search accuracy' },
      { value: '1 spec', label: 'Adopted platform-wide' },
    ],
  },

  'Shipped a GenAI onboarding workflow': {
    subtitle: 'From weeks of configuration to a validated pipeline in a day',
    context:
      'Marketers integrating new data pipelines faced a form-heavy onboarding process requiring parameters they didn’t understand — schema mappings, refresh cadences, destination configs. Most filed tickets and waited.',
    challenge:
      'Design a workflow where GenAI does the tedious parameter work while humans stay firmly in control of the decisions that matter.',
    approach: [
      {
        title: 'Inverted the form: AI drafts, human confirms',
        detail:
          'Designed a flow where the system pre-populates parameters from source metadata and prior integrations, presenting a reviewable draft instead of blank fields.',
      },
      {
        title: 'Built pre-validation into the draft',
        detail:
          'Every AI-suggested parameter is validated against live schemas before the user sees it, so confirmed configs work on first run.',
      },
      {
        title: 'Made corrections teach the system',
        detail:
          'Designed the review interaction so each human correction improves suggestions for subsequent integrations.',
      },
    ],
    outcomes: [
      'Pipeline integration time collapsed from 1–2 weeks to under 24 hours.',
      'First-run configuration failures dropped to near zero.',
    ],
    metrics: [
      { value: '1–2 wks → <24 hrs', label: 'Integration time' },
      { value: '~0', label: 'First-run config failures' },
    ],
  },

  // ── Intuit · Principal Product Designer ────────────────────────────
  'Redesigned platform search with a semantic layer': {
    subtitle: 'Search that understands what data means, not just what it’s called',
    context:
      'Platform search matched on names and descriptions — useless in a company where the same concept lives under a dozen table names. Users maintained personal bookmark lists because search couldn’t be trusted.',
    challenge:
      'Rebuild search on a semantic layer so queries match business meaning, and design the result experience to communicate why each result is trustworthy.',
    approach: [
      {
        title: 'Designed the semantic mapping experience',
        detail:
          'Created the workflows for connecting physical tables to business concepts, making the semantic layer something stewards could actually maintain.',
      },
      {
        title: 'Ranked results by trust, not just relevance',
        detail:
          'Designed a result model weighting certification, freshness, and usage — so the best answer surfaces above the merely well-named one.',
      },
      {
        title: 'Instrumented precision from day one',
        detail:
          'Defined the measurement plan with data science so precision improvements were provable, not anecdotal.',
      },
    ],
    outcomes: [
      'Search precision reached 89%.',
      'The semantic layer became the foundation for the platform’s later agentic search capabilities.',
    ],
    metrics: [
      { value: '89%', label: 'Search precision' },
      { value: '1 layer', label: 'Powers search + agents today' },
    ],
  },

  'Defined the FY25 platform roadmap': {
    subtitle: 'Research-led strategy that set the platform’s year',
    context:
      'The platform’s roadmap had historically been assembled from stakeholder requests. As principal designer, I saw the gap: no shared, evidence-based picture of user needs across the data lifecycle.',
    challenge:
      'Build that picture and convert it into a roadmap leadership would fund — as an IC leading through influence, not authority.',
    approach: [
      {
        title: 'Spearheaded foundational research across personas',
        detail:
          'Designed and ran a research program spanning data producers, consumers, and stewards to map needs across the full data lifecycle.',
      },
      {
        title: 'Ran cross-functional synthesis workshops',
        detail:
          'Facilitated sessions with PM, engineering, and data science that turned raw findings into ranked opportunity areas with shared ownership.',
      },
      {
        title: 'Framed opportunities as business bets',
        detail:
          'Translated each theme into cost-of-inaction terms — hours lost, incidents risked — the language planning decisions actually use.',
      },
    ],
    outcomes: [
      'The FY25 roadmap was built directly from the research synthesis.',
      'The workshop format became the platform team’s recurring planning ritual.',
    ],
    metrics: [
      { value: 'FY25', label: 'Roadmap shaped by research' },
      { value: '3', label: 'Personas mapped end-to-end' },
    ],
  },

  'Modernized architecture for complex data marts': {
    subtitle: 'Making 2,000 invisible data assets discoverable',
    context:
      'Roughly 2,000 data assets lived in complex, siloed data marts — technically on the platform but effectively invisible. Teams rebuilt datasets that already existed because they couldn’t find them.',
    challenge:
      'Redesign the information architecture so complex marts became navigable without flattening the structure their owners relied on.',
    approach: [
      {
        title: 'Modeled the marts’ real conceptual structure',
        detail:
          'Worked directly with mart owners to understand their internal logic, then designed navigation reflecting how consumers think about the domain.',
      },
      {
        title: 'Designed progressive disclosure for depth',
        detail:
          'Built browse experiences that reveal mart complexity gradually — domain, then subject area, then asset — instead of dumping raw hierarchies.',
      },
      {
        title: 'Connected assets through lineage context',
        detail:
          'Surfaced upstream and downstream relationships on every asset page, turning dead-end search results into explorable neighborhoods.',
      },
    ],
    outcomes: [
      '~2,000 previously siloed assets became discoverable.',
      'Monthly active users grew 42%, from 1,886 to 2,664.',
    ],
    metrics: [
      { value: '~2,000', label: 'Assets made discoverable' },
      { value: '+42%', label: 'MAU growth (1,886 → 2,664)' },
    ],
  },

  'Designed clean-data trust features': {
    subtitle: 'Scorecards and AI descriptions that made quality visible',
    context:
      'The platform hosted thousands of data products, but users couldn’t distinguish curated, production-grade data from abandoned experiments. Trust was tribal knowledge.',
    challenge:
      'Design trust signals that scale to thousands of assets — without requiring manual curation that owners would never keep up with.',
    approach: [
      {
        title: 'Designed maturity scorecards',
        detail:
          'Created a scorecard model grading assets on documentation, freshness, ownership, and usage — computed automatically, displayed consistently.',
      },
      {
        title: 'Shipped AI-generated descriptions with human review',
        detail:
          'Designed the flow where AI drafts asset descriptions from schema and query patterns, and owners approve or edit — closing the documentation gap at scale.',
      },
      {
        title: 'Put trust signals in the decision path',
        detail:
          'Placed scorecards directly in search results and asset pages, so quality influences the choice at the moment it’s made.',
      },
    ],
    outcomes: [
      'High-quality data products became discoverable across 7,000+ assets.',
      'Certified-asset usage grew as consumers migrated toward trusted data.',
    ],
    metrics: [
      { value: '7,000+', label: 'Data products with trust signals' },
      { value: '350 → 7,000+', label: 'Trustworthy products scaled' },
    ],
  },

  'Co-led intern hiring and mentorship': {
    subtitle: 'Building the pipeline for the next generation of data designers',
    context:
      'Data-platform design is a niche discipline with no established hiring pipeline. The team needed a way to find and grow early-career designers who could thrive in a deeply technical domain.',
    challenge:
      'Source, assess, and convert intern talent for a specialization most design programs don’t teach.',
    approach: [
      {
        title: 'Sourced 50+ candidates through targeted outreach',
        detail:
          'Went beyond standard pipelines to HCI programs and portfolio communities where systems-minded designers actually are.',
      },
      {
        title: 'Designed an assessment for learning velocity',
        detail:
          'Built interview exercises testing how candidates reason about unfamiliar technical domains, not whether they already know data.',
      },
      {
        title: 'Mentored through real, shipped scope',
        detail:
          'Gave interns production surfaces with guardrails — real ambiguity, real reviews, real launches.',
      },
    ],
    outcomes: [
      'High-potential interns converted to full-time roles on the team.',
      'The assessment format was reused for subsequent early-career hiring.',
    ],
    metrics: [
      { value: '50+', label: 'Candidates sourced' },
      { value: 'FT', label: 'Intern conversions' },
    ],
  },

  // ── Intuit · Senior Product Designer ───────────────────────────────
  'Founded the internal data catalog from scratch': {
    subtitle: 'Zero to system of record: replacing Alation with a homegrown catalog',
    context:
      'Intuit ran its data discovery on Alation, a third-party catalog that fit the company’s scale and workflows poorly. I was the founding — and initially only — designer on the bet to replace it.',
    challenge:
      'Design a data catalog from nothing: search, browse, asset pages, and trust tooling — good enough to migrate thousands of users off an entrenched incumbent.',
    approach: [
      {
        title: 'Started with the highest-frequency job: finding a table',
        detail:
          'Designed search-first, obsessing over ranking quality and result scannability before touching any other surface.',
      },
      {
        title: 'Designed asset pages as decision documents',
        detail:
          'Structured every asset page to answer the three questions that gate usage: What is this? Can I trust it? How do I get access?',
      },
      {
        title: 'Made migration the killer feature',
        detail:
          'Designed onboarding flows that imported users’ existing bookmarks and queries, so switching cost approached zero.',
      },
    ],
    outcomes: [
      'The catalog fully replaced Alation as Intuit’s system of record for data.',
      'Top-5 search click-through hit 96%.',
      'Time to find and access trusted data fell from 45 days to 3.',
    ],
    metrics: [
      { value: '96%', label: 'Top-5 search CTR' },
      { value: '45 → 3 days', label: 'Time to trusted data' },
    ],
  },

  'Shipped Intuit’s first agentic data tooling': {
    subtitle: 'Data Copilot: the SQL assistant the CTO demoed to investors',
    context:
      'Analysts spent hours translating business questions into SQL against schemas they didn’t fully know. In 2023 — before agentic tooling was a category — we bet on an AI assistant embedded in the data workflow.',
    challenge:
      'Design an AI SQL assistant that analysts trust with production queries, in an era with no established interaction patterns for AI-generated code.',
    approach: [
      {
        title: 'Grounded generation in catalog metadata',
        detail:
          'Designed Copilot to draw on the catalog’s schema and lineage knowledge, so generated SQL referenced real, current tables — not hallucinated ones.',
      },
      {
        title: 'Designed for verify-then-run',
        detail:
          'Every generated query came with a plain-language explanation of what it does, making verification faster than writing from scratch.',
      },
      {
        title: 'Kept the human in the loop by default',
        detail:
          'Positioned Copilot as a drafting partner — accelerating experts rather than replacing judgment.',
      },
    ],
    outcomes: [
      'SQL writing speed doubled for Copilot users.',
      'Grew to 500+ monthly active users.',
      'Presented by Intuit’s CTO at Investor Day 2023.',
    ],
    metrics: [
      { value: '2×', label: 'SQL writing speed' },
      { value: '500+', label: 'Monthly active users' },
    ],
  },

  'Built the first data lineage UI in 4 weeks': {
    subtitle: 'Visualizing 30,000 tables of dependencies on a deadline',
    context:
      'A data reliability initiative needed impact analysis — which downstream assets break when a table changes — and needed it fast. No lineage UI existed. I had four weeks.',
    challenge:
      'Design a comprehensible visualization for a dependency graph spanning ~30K tables and ~7K pipelines, where the naive rendering is an unreadable hairball.',
    approach: [
      {
        title: 'Designed for the question, not the graph',
        detail:
          'Anchored the UI on “what does this change break?” — rendering focused upstream/downstream slices instead of the full graph.',
      },
      {
        title: 'Used progressive expansion',
        detail:
          'Showed one hop by default with on-demand expansion, keeping any single view readable while preserving access to full depth.',
      },
      {
        title: 'Cut scope ruthlessly to ship in 4 weeks',
        detail:
          'Shipped table-level lineage first, deferring column-level detail — the version that ships beats the version that’s complete.',
      },
    ],
    outcomes: [
      'Shipped in 4 weeks, visualizing ~30K tables and ~7K pipelines.',
      'Became the technical foundation for Intuit’s data reliability program.',
    ],
    metrics: [
      { value: '4 weeks', label: 'Concept to ship' },
      { value: '~30K', label: 'Tables visualized' },
    ],
  },

  'Expanded the catalog into a management platform': {
    subtitle: 'From finding data to governing it',
    context:
      'Once the catalog became the front door to data, users expected to act there too — request access, manage governance, understand how physical tables map to business concepts. Each of those lived in a different tool.',
    challenge:
      'Grow the catalog into a management platform without bloating the focused discovery experience that made it succeed.',
    approach: [
      {
        title: 'Designed access requests in the discovery flow',
        detail:
          'Put “request access” on the asset page with policy context inline, collapsing the discover-then-ticket loop into one motion.',
      },
      {
        title: 'Embedded governance into existing workflows',
        detail:
          'Designed stewardship tasks — certification, ownership, reviews — as extensions of pages stewards already used, not a separate console.',
      },
      {
        title: 'Unified physical and logical objects in one data map',
        detail:
          'Designed the combined map connecting tables and pipelines to business terms and metrics, giving technical and business users one shared geography.',
      },
    ],
    outcomes: [
      'The catalog evolved into Intuit’s full data management platform.',
      'Access, governance, and discovery converged into a single coherent experience.',
    ],
    metrics: [
      { value: '3 → 1', label: 'Tools consolidated' },
      { value: '1', label: 'Unified data map' },
    ],
  },

  // ── 605 LLC ────────────────────────────────────────────────────────
  'Designed 605 Impact': {
    subtitle: 'Attribution analytics for TV ad campaigns',
    context:
      '605 measured how TV advertising changes real consumer behavior, using viewership data from millions of households. 605 Impact was the attribution product — turning that data into a defensible answer for media buyers.',
    challenge:
      'Make statistically complex attribution legible to media buyers — an audience of marketers, not data scientists.',
    approach: [
      {
        title: 'Designed around the buyer’s decision, not the model',
        detail:
          'Anchored every report on “did this campaign work, and what should I change?” — surfacing methodology as supporting detail, not the headline.',
      },
      {
        title: 'Validated with real sales conversations',
        detail:
          'Sat in on client pitches and used objections as design input — the fastest research loop a B2B designer can get.',
      },
    ],
    outcomes: [
      'Reached commercial launch and anchored the three-product 605 line.',
      'Contributed to $20M+ in combined product-line revenue.',
    ],
    metrics: [
      { value: '$20M+', label: 'Product-line revenue' },
      { value: '1 of 3', label: 'Products shipped end to end' },
    ],
  },

  'Built 605 Platform': {
    subtitle: 'Self-serve analytics for media buyers',
    context:
      'Media buyers needed to run their own campaign reports without waiting on a 605 analyst — Platform was the self-serve counterpart to Impact’s attribution engine.',
    challenge:
      'Give non-technical buyers direct access to the same data analysts used, without requiring them to understand the underlying methodology.',
    approach: [
      {
        title: 'Built report templates around common buyer questions',
        detail:
          'Pre-built views for the handful of questions buyers asked repeatedly, instead of a general-purpose query builder.',
      },
      {
        title: 'Ran design end to end',
        detail:
          'Owned research, IA, visual design, and dev handoff as part of the three-product 605 line.',
      },
    ],
    outcomes: [
      'Reduced buyers’ dependence on analyst-run reports.',
      'Shipped alongside Impact and Indxr as part of a $20M+ product line.',
    ],
    metrics: [
      { value: '3', label: 'Products shipped end to end' },
      { value: '$20M+', label: 'Combined product-line revenue' },
    ],
  },

  'Shipped 605 Indxr': {
    subtitle: 'Audience indexing for TV campaigns',
    context:
      'Indxr measured which viewer segments a campaign actually reached — the audience-side complement to Impact’s outcome measurement.',
    challenge:
      'Present household-level viewership data as a clear audience index without overwhelming media buyers with the underlying sample methodology.',
    approach: [
      {
        title: 'Indexed audiences the way buyers already planned around',
        detail:
          'Mapped viewership data onto the audience segments buyers were already targeting in their media plans.',
      },
      {
        title: 'Ran design end to end',
        detail:
          'Owned research, IA, visual design, and dev handoff as part of the three-product 605 line.',
      },
    ],
    outcomes: [
      'Completed the three-product 605 line alongside Impact and Platform.',
      'Gave buyers a clearer read on audience reach than prior indexing tools.',
    ],
    metrics: [
      { value: '3', label: 'Products shipped end to end' },
      { value: '$20M+', label: 'Combined product-line revenue' },
    ],
  },

  'Built a data-visualization design system': {
    subtitle: 'A dataviz language that scaled across a product line',
    context:
      'Three analytics products were shipping charts with inconsistent encodings, colors, and interaction patterns — and none of it met accessibility standards. Every new report reinvented visualization decisions.',
    challenge:
      'Build a design system where data visualization is the core competency, not an afterthought bolted onto a component library.',
    approach: [
      {
        title: 'Standardized encodings before components',
        detail:
          'Defined how the products express magnitude, comparison, and change over time — the grammar — before building the chart components that speak it.',
      },
      {
        title: 'Made accessibility structural',
        detail:
          'Built colorblind-safe palettes, pattern redundancy, and screen-reader data tables into the system defaults rather than per-chart fixes.',
      },
      {
        title: 'Designed for multivariate growth',
        detail:
          'Created composition rules for layering dimensions, letting the system scale to complex multivariate visualizations without redesign.',
      },
    ],
    outcomes: [
      'One visualization language unified all three products.',
      'New report design time dropped sharply as teams composed from the system.',
    ],
    metrics: [
      { value: '3', label: 'Products on one system' },
      { value: 'AA', label: 'Accessibility standard' },
    ],
  },

  'Introduced a formal product design process': {
    subtitle: 'Bringing design operations to a data-first startup',
    context:
      '605 was an analytics company first — design happened ad hoc, requested late, and reviewed never. As the design team grew, the lack of process was becoming the bottleneck.',
    challenge:
      'Introduce enough process to make design predictable and visible, without the ceremony that kills startup velocity.',
    approach: [
      {
        title: 'Instituted weekly design critiques',
        detail:
          'Established a standing crit where work was reviewed against user goals — creating quality pressure and shared context simultaneously.',
      },
      {
        title: 'Standardized the design-to-dev handoff',
        detail:
          'Defined spec formats and review checkpoints that cut rework loops between design and engineering.',
      },
      {
        title: 'Moved design upstream into scoping',
        detail:
          'Embedded designers in early product conversations, shifting design from a rendering service to a shaping function.',
      },
    ],
    outcomes: [
      'Design gained a predictable operating rhythm and earlier influence on product decisions.',
      'The crit and handoff formats persisted as the team scaled.',
    ],
    metrics: [
      { value: 'Weekly', label: 'Design crit cadence' },
      { value: 'Upstream', label: 'Design’s seat in scoping' },
    ],
  },

  // ── TIBCO ──────────────────────────────────────────────────────────
  'Shipped enterprise integration enhancements': {
    subtitle: 'The engineering years: building the systems I now design for',
    context:
      'Before design, I was a Java back-end developer on TIBCO BusinessWorks — the enterprise integration platform connecting the systems large companies run on.',
    challenge:
      'Translate ambiguous enterprise customer requirements into shipped platform features — the same translation act that defines enterprise UX, executed in code.',
    approach: [
      {
        title: 'Worked directly from customer requirements',
        detail:
          'Turned integration requirements from enterprise customers into implemented, tested BusinessWorks features.',
      },
      {
        title: 'Learned the anatomy of enterprise data flow',
        detail:
          'Built daily fluency in messaging, transformations, and system integration — the substrate every data product I’ve since designed sits on.',
      },
    ],
    outcomes: [
      'Shipped features running in production enterprise environments.',
      'Gained the engineering fluency that became my differentiator as a data-platform designer.',
    ],
    metrics: [
      { value: '3 yrs', label: 'Enterprise back-end engineering' },
      { value: 'Java', label: 'BusinessWorks platform' },
    ],
  },

  'Defined the MVP for TIBCO Expresso': {
    subtitle: 'First product-shaping work: scoping a mobile integration platform',
    context:
      'TIBCO Expresso was an early bet on mobile-first integration. As a developer on the team, I stepped beyond implementation to help define what the MVP should be.',
    challenge:
      'Scope a credible MVP in an emerging category — deciding what a mobile integration platform must do on day one, and what it must refuse to do.',
    approach: [
      {
        title: 'Ran competitive analysis across the category',
        detail:
          'Mapped adjacent platforms’ capabilities to find the gaps worth attacking and the table stakes worth matching.',
      },
      {
        title: 'Grounded scope in user research',
        detail:
          'Gathered developer input on integration workflows to rank features by real need instead of internal enthusiasm.',
      },
    ],
    outcomes: [
      'The MVP feature set shipped as scoped.',
      'This was the work that pulled me toward product and design — and eventually to an HCI master’s.',
    ],
    metrics: [
      { value: 'MVP', label: 'Shipped as defined' },
      { value: '→ HCI', label: 'Sparked the career pivot' },
    ],
  },
}

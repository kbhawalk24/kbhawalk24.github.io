import type { ShortPage } from './types'
import { TINTS } from '@/lib/tint'

// Case study: the agent, 2023 to 2026. Nine sections: Data Copilot and
// its ceiling, what the 2025 support questions proved, Collections as the
// agent's first step, the audit of the first prototype, the three-intent
// specification, the guardrails (links and access), the surfaces, the
// three chat modes, and the results. Each section is one paragraph, one
// visual and at most one supporting block. Figures and sources are in
// docs/FINDING-DATA-NARRATIVE.md and private/source-kit.md (not in the repo); the 99% figure
// for precision within collections was confirmed by Kanchi on 28 Oct 2026.

export const AGENTIC_DISCOVERY: ShortPage = {
  slug: 'agentic-discovery',
  href: '/work/agentic-discovery',
  title: 'Beyond the chatbot: designing the data discovery agent for Cursor and Claude',
  roleTag: 'Principal Product Designer → Design Manager',
  period: '2023–2026',
  description:
    'A conversational assistant is only as trustworthy as the metadata under it and only as useful as the place it lives. After the 2023 web chatbot hit a ceiling, 726 support questions showed the problem had moved from finding tables to understanding columns and joins, so the catalog moved into Cursor and Claude as an agent with Collections as its memory and a three-intent specification for how it answers.',
  context: {
    system: 'Part of Intuit’s enterprise data platform (320,000 tables · 6,673 monthly users).',
    steps: [
      { label: 'Catalog search', href: '/work/search-2' },
      { label: 'The agent' },
      { label: 'The catalog', href: '/work/catalog-data-map-lineage' },
      { label: '605', href: '/work/605-tv-analytics' },
    ],
    current: 1,
  },
  facts: [
    {
      label: 'Role',
      lines: [
        { text: 'Senior, then Principal Designer', note: 'Data Copilot, 2023 to 2024' },
        { text: 'Design Manager and spec lead', note: 'Collections and the agent, 2025 to 2026' },
      ],
    },
    {
      label: 'Scope',
      lines: [
        { text: 'Intuit’s enterprise data platform' },
        { text: 'Cursor, Claude and the web catalog' },
        { text: '711 active users, 56,560 tool calls', note: '90 days to Mar 2026' },
      ],
    },
    {
      label: 'Research',
      lines: [
        { text: '16 hackathon teams consolidated', note: '2023' },
        { text: '726 support questions analysed', note: 'Jan to Jul 2025' },
        { text: 'Observed-task study and UI audits', note: 'in Marvin' },
      ],
    },
    {
      label: 'Shipped',
      lines: [
        { text: 'Data Copilot', note: '2023 to 2024' },
        { text: 'Collections', note: 'Aug 7, 2025' },
        { text: 'The agent in Cursor and Claude', note: 'FY26' },
      ],
    },
  ],
  stats: [
    { value: '45 min → 4 min', label: 'From a question to a verified answer, with the agent' },
    { value: '711', label: 'Active users of the agent in its first 90 days' },
    { value: '56,560', label: 'Tool calls in those 90 days' },
  ],
  hero: {
    src: '/work/agentic-discovery/hero.mp4',
    poster: '/work/agentic-discovery/hero-poster.jpg',
    tint: TINTS.neutral,
    width: 1340,
    height: 994,
    alt: 'A screen recording of the agent in Cursor. Asked for the usage of the top features in the data discovery app, it searches for tables, writes a SQL query, shows it before running, then runs it and a category breakdown in Databricks.',
    caption: 'The agent inside Cursor, 2026: it finds the right tables, shows the query before it runs, then runs it. The recording plays at 2.5× speed.',
  },
  visuals: [
    {
      id: 'copilot-ask',
      after: 'copilot',
      lead: true,
      src: '/work/agentic-discovery/copilot-ask.jpg',
      width: 2480,
      height: 1756,
      alt: 'Data Copilot open beside a table page. Asked how many companies signed up this year by sales channel, it returns a SQL query and a plain-language explanation of what the query does.',
      caption: 'Data Copilot, 2023, from my prototype: ask a question about the table on screen and it writes the SQL and explains it. It lived in a browser tab, away from where engineers wrote code.',
    },
    {
      id: 'search-2-table',
      after: 'support',
      lead: true,
      src: '/work/agentic-discovery/search-2-table.jpg',
      width: 1440,
      height: 1020,
      alt: 'Search 2.0 results on the Tables tab: each result with its owner, last refresh, row count, queries in the last 30 days and lineage counts.',
      caption: 'Search 2.0, 2024: owner, last refresh, row count, queries in 30 days and lineage on every result. Once finding was solved, the support questions moved to what a column means and how two tables join.',
    },
    {
      id: 'collections',
      after: 'collections',
      lead: true,
      src: '/work/agentic-discovery/collections-2025.jpg',
      width: 1920,
      height: 990,
      alt: 'The My Collections page with a Create new collection dialog open: a name, a description and a choice between private and public.',
      caption: 'Collections, as shipped on August 7, 2025: a person’s saved working set of data, private or shared. The agent reads it before it searches the lake.',
    },
    {
      id: 'agent-answer',
      after: 'spec',
      lead: true,
      src: '/work/agentic-discovery/agent-answer.jpg',
      width: 2601,
      height: 726,
      alt: 'The data agent answering a question about how job roles use search, with a run query and its results table',
      caption: 'The agent answering a value question, 2026: the tables and columns it planned, the query it ran, the result. Intent 3 in the specification.',
    },
    {
      id: 'catalog-entry-points',
      after: 'surfaces',
      lead: true,
      kind: 'video',
      src: '/work/agentic-discovery/catalog-entry-points.mp4',
      width: 1600,
      height: 872,
      alt: 'A screen recording of the catalog, May 2026. The home page offers three ways in: a specific asset, a business question, or data for a use case, with a link to open the agent directly. Then a data product page, and a table search with its facets.',
      caption: 'The web catalog in May 2026: the shareable record and the visual surface, linked from every agent answer. Three ways in on the home page, then a data product and a search. The recording plays at 1.8× speed.',
    },
    {
      id: 'agent-immersive',
      after: 'modes',
      lead: true,
      src: '/work/agentic-discovery/agent-immersive-2026.jpg',
      width: 1436,
      height: 1045,
      alt: 'The immersive chat view of the agent inside the web catalog: a full-screen conversation with inline cards for tables, lineage and a SQL preview, and a thread list at the side.',
      caption: 'The immersive chat mode in the web catalog, 2026: full screen, saved threads, and the same inline cards for metadata, lineage and SQL as the side panel.',
    },
  ],
  sections: [
    {
      id: 'copilot',
      eyebrow: '2023 to 2024',
      short: 'Data Copilot',
      heading: 'Data Copilot shipped in four months and hit a ceiling',
      blocks: [
        {
          type: 'p',
          text:
            'In August 2023, 16 hackathon teams across Intuit had built separate generative AI prototypes for data. As the sole design lead I consolidated them, with 58 engineering and product collaborators, into one assistant in four months, with four interaction patterns: natural language to SQL, table summaries, query explanation and join recommendations. It doubled SQL writing speed for 500+ people a month, Intuit’s CTO presented it at Investor Day 2023, and in 2024 it was extended to multi-table queries. Then retention flattened, for two structural reasons.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'The wrong surface.',
              text: 'Data engineers, ML engineers and technical analysts worked in Cursor, VS Code and Databricks notebooks. The assistant was a chat window in a browser tab: leaving the editor broke the flow, and the conversation could not see their files or be shared.',
            },
            {
              lead: 'Ungrounded SQL with no provenance.',
              text: 'Before Search 2.0 cleaned up the metadata index, a model writing SQL against 320,000 tables guessed deprecated schemas, invented join keys and suggested tables the person had no permission to query.',
            },
          ],
        },
        {
          type: 'video',
          youtube: 'kfpmtVe2OFY',
          start: 2505,
          title: 'Intuit Investor Day 2023',
          caption: 'Intuit Investor Day 2023, from 41:45: the CTO presenting the assistant I designed, describing analysts working up to twice as fast.',
          href: 'https://youtu.be/kfpmtVe2OFY?t=2505',
        },
      ],
    },
    {
      id: 'support',
      eyebrow: '2025',
      short: 'What was left',
      heading: 'Search solved finding; 726 support questions showed what was left',
      blocks: [
        {
          type: 'p',
          text:
            'Once Search 2.0 had solved locating datasets, I analysed the 726 questions sent to the company’s data help channel between January and July 2025 to see why people were still stuck. The problem had moved: from where a dataset is to what a column means, whether an attribute is captured before or inside the product, and how two tables join. Most of it could be answered automatically if column-level context, past query patterns and join logic came to the person where they worked.',
        },
        {
          type: 'cards',
          items: [
            { value: '68.2%', title: 'were about definition and comprehension', text: 'What a column means, how two tables join. Only 16% were still about finding data.' },
            { value: '48%', title: 'needed a human expert', text: 'Of those escalations, 45% were asking for the column definitions of a single table.' },
            { value: '60%', title: 'of join questions came from people who knew the primary table', text: 'They were lost on which key or companion table to join it to.' },
            { value: '74.1%', title: 'could be answered automatically', text: 'With column context, historical query patterns and join logic brought into the workflow.' },
          ],
        },
      ],
    },
    {
      id: 'collections',
      eyebrow: 'Collections',
      short: 'Collections',
      heading: 'Collections: the agent’s first step',
      blocks: [
        {
          type: 'p',
          text:
            'The follow-me-home sessions had shown that three in four searches go back to data the person already knows: a working set of ten to fifteen vetted tables kept in spreadsheets and Slack bookmarks. Engineering was sceptical of a curation feature; I argued Collections onto the FY25 roadmap, private bookmarking plus the catalog’s first public sharing, and designers on my team shipped it on August 7, 2025. When the agent was specified, Collections became its mandatory first call: before it searches the 320,000-table index it reads the person’s collections, ranks anything in them at twice the weight of a global result, and falls back to the data marts only where the collections do not cover the question. Within a curated collection, precision reached 99%.',
        },
        {
          type: 'quotes',
          items: [
            { text: 'Would not have happened if not for Kanchi’s persistence and design sponsorship.', who: 'The engineering manager, at launch', when: 'August 2025' },
          ],
        },
      ],
    },
    {
      id: 'audit',
      eyebrow: 'The first prototype',
      short: 'The audit',
      heading: 'Four things wrong with the first prototype, and the fix for each',
      blocks: [
        {
          type: 'p',
          text:
            'When engineering stood up the first raw MCP server in Cursor, I audited live sessions in Marvin: the interaction and the output, prompt by prompt. Four failure modes, four rules.',
        },
        {
          type: 'tension',
          items: [
            { tension: 'The agent interrogated people first: a context template asking for role, experience, org, product, domain, PRD, KPIs and constraints before it called a single tool.', decision: 'No gate. The agent runs the catalog tools on the first prompt and offers the template only as a fallback when the first five tables do not match.' },
            { tension: 'Answers were a wall of markdown: key columns, endorsements, storage formats and the model’s reasoning, with the clarifying question buried at the bottom, so people did not realise the agent was waiting.', decision: 'Progressive disclosure. Reasoning collapsed by default, secondary metadata only on request, the question last and visible.' },
            { tension: 'The agent called search in loops, and showed sample SQL that failed in Databricks.', decision: 'Stop once the tool payloads return. Put queries at the end. Never show SQL that has not been verified against Databricks.' },
            { tension: 'Raw backend facets leaked into the chat: field names and status codes nobody outside engineering would recognise.', decision: 'Two vocabularies. The agent talks in plain filter names (clean data, production, maturity, recent usage, intended use, lifecycle stage, data tier) and translates them into facet payloads underneath, confirming with the person before applying any filter.' },
          ],
        },
      ],
    },
    {
      id: 'spec',
      eyebrow: 'The specification',
      short: 'Three intents',
      heading: 'Three intents, one answer shape for each',
      blocks: [
        {
          type: 'p',
          text:
            'Instead of letting the model improvise, I wrote the answer specification that routes every prompt into one of three intents, each with a fixed payload, a disclosure order and a follow-up. A designer on my team built the response patterns that shipped and benchmarked them; engineers built the MCP servers.',
        },
        {
          type: 'table',
          head: ['Intent', 'What the agent returns', 'Then offers'],
          rows: [
            ['1. A table the person already knows', 'Qualified name with a verified catalog link; description; parent data product with its maturity score; last refresh; owning team and top users in 30 days; lineage with downstream consumers; an AI summary of business context drawn from query insights, the help channel and collections, flagging data marts, product data and restricted tax data; the top five columns by use and joins, with keys; the person’s access status.', 'One-click follow-ups: common queries, a sample of rows, the data profile, request access.'],
            ['2. A table for a use case', 'The five most relevant tables, collections first, then data marts and the highest maturity scores. For each: name with an exact-match badge, description, owner, lineage and queries in 30 days, last refresh, and the reason it fits and why it ranks where it does.', 'Drill into one, check access, or narrow with the eleven plain filters.'],
            ['3. A value, a metric or a join', 'If one column or a certified metric answers it: the column, its table, freshness, lineage, 30-day query volume, real-time availability, pre-auth or in-product context, and a verified query. If it needs a join: the tables and columns planned before any SQL, the key logic, each column checked for existence and past use, access checked on every table, then permission to run; if access is missing, the commented query with a flag per table.', 'How the number was computed, dashboard links while access is pending, next prompts.'],
          ],
        },
      ],
    },
    {
      id: 'guardrails',
      eyebrow: 'Guardrails',
      short: 'Guardrails',
      heading: 'Verified links and six access states',
      blocks: [
        {
          type: 'p',
          text:
            'Two systemic failures in early testing had nothing to do with the model’s prose. It built broken links to the web catalog by stuffing table identifiers into data product URLs, and it hit enterprise access control, with fine-grained permissions and tax-data regulation, as an opaque error. I co-specified the link rule: the agent may never build a link from a raw table identifier; it resolves the parent data product through the enterprise domain model, constructs the environment-specific link, and if the lookup fails it shows no link rather than a guess. For access I mapped the six states a person can be in and what the agent says in each.',
        },
        {
          type: 'list',
          items: [
            { lead: 'No developer project exists.', text: 'The agent finds zero projects and offers three paths: join a partner team’s project, ask a manager to provision one, or create one from the documentation.' },
            { lead: 'A project exists but the analyst role is disabled.', text: 'A status table (project, id, role, disabled) and how to have the project admin enable it.' },
            { lead: 'Project and role enabled, person not a member.', text: 'The exact admin to ask for membership.' },
            { lead: 'One valid project, no access to the table.', text: 'The agent asks for the three required inputs (business justification, credential, environment) and files the access request.' },
            { lead: 'Several projects with several analyst roles.', text: 'The agent refuses to guess the credential: a disambiguation table, and the person picks the project tied to their SQL warehouse.' },
            { lead: 'Partial or denied access on a multi-table metric.', text: 'The certified metric definition, the commented SQL with an access-needed flag per table, one-click requests, and links to the existing dashboards to use while approval is pending.' },
          ],
        },
      ],
    },
    {
      id: 'surfaces',
      eyebrow: 'Surfaces',
      short: 'Surfaces',
      heading: 'Cursor and Claude, and the web catalog as the record',
      blocks: [
        {
          type: 'p',
          text:
            'As the agent extended to certified business objects and KPIs, I led the trade-off across its surfaces. The editor and the command line win on context: no switching, the person’s own files and SQL, and queries run where they are written. They lose the visual layer, shareability and control of memory and feedback. The web catalog is the opposite. So each answer in Cursor or Claude links back to the catalog through the same verified-link rule, and the catalog stays the shareable record and the place to explore visually.',
        },
        {
          type: 'compare',
          panels: [
            { label: 'Cursor and Claude', text: 'No context switching for engineers and analysts; direct access to repository files, SQL scripts and query execution. No interactive lineage graphs, no shared conversations, limited cross-session memory and feedback. Compensated with relationship graphs and lineage trees drawn in text inside the markdown, anchor-linked sections for schema, relationships, lineage and metrics, and deep links to the catalog.', pills: ['Text lineage trees', 'Anchor-linked sections', 'Deep links to the catalog'], accent: true },
            { label: 'The web catalog agent', text: 'Full control of persistent memory, intent detection and feedback telemetry; interactive lineage graphs, maturity badges and bulk access requests. Costs a switch away from the editor or notebook, so it is positioned as the shareable system of record and the visual exploration surface, linked from every answer elsewhere.', pills: ['Lineage graphs', 'Maturity badges', 'Bulk access requests', 'Shareable record'] },
          ],
        },
      ],
    },
    {
      id: 'modes',
      eyebrow: 'Chat modes',
      short: 'Chat modes',
      heading: 'Lookup, side panel, immersive',
      blocks: [
        {
          type: 'p',
          text:
            'For a consistent experience across surfaces the chat has three modes, each with its own entry point, saved and resumable threads, and the same inline cards for metadata, lineage and SQL previews. The agent’s context has three tiers: local, the tables, streams or topics the person has selected or landed on; attached, the documents and schema files they add; and global, their Collections, which travel with them across the catalog, the developer portal and the editor. The aim is to close the loop from finding data to getting access to querying it without leaving the tool.',
        },
        {
          type: 'cards',
          items: [
            { title: 'Lookup', text: 'Inline, embedded in the page or the editor, for a quick reference without leaving the current file or context.' },
            { title: 'Side panel', text: 'A persistent drawer for multi-turn discovery and query building, split-screen beside the active code or page.' },
            { title: 'Immersive', text: 'A full-screen workspace for deep schema exploration, visual lineage and complex modelling.' },
          ],
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Results',
      short: 'Results',
      heading: 'Results, with attribution',
      blocks: [
        {
          type: 'p',
          text:
            'In the October 2025 lab benchmark the task that took 25 minutes took 4; by then the agent had 500+ downloads across four business units and 20,000 queries. In the March 2026 observed-task study the time from a question to a verified answer fell from 45 minutes to 4, and by March 11, 2026 the agent had 711 active users and 56,560 tool calls in its first 90 days.',
        },
        {
          type: 'table',
          head: ['When', 'What was measured', 'Change', 'Whose result'],
          rows: [
            ['2023', 'Analysts using Data Copilot', 'Up to 2x faster; 500+ people a month', 'My design as sole lead; figure from the CTO at Investor Day'],
            ['Aug 7, 2025', 'Collections shipped', 'Three in four searches re-find known data; now the agent’s first call, ranked at twice the weight', 'My roadmap sponsorship and framing; UI by my team; backend by platform engineering'],
            ['Oct 2025', 'Lab benchmark task time; early rollout', '25 min → 4 min; 500+ downloads, four business units, 20,000 queries', 'My specification and rules; benchmarking by a designer on my team; servers by engineering'],
            ['Mar 2026', 'Question to verified answer, observed-task study; first 90 days', '45 min → 4 min; 711 active users, 56,560 tool calls', 'Shared'],
          ],
        },
      ],
    },
  ],
  next: {
    text: 'The agent was built by a team I managed. Next: how I ran that team, across nine product areas.',
    label: 'Leading the designers behind Intuit’s enterprise data platform',
    href: '/work/leading-the-team',
  },
  credits:
    'The 2023 assistant, the Collections strategy, the audit, the three-intent specification, the link rule and the access states are mine. Designers on my team designed Collections and built and benchmarked the agent’s response patterns. Engineers built the MCP servers and everything that shipped.',
  sources:
    'Data Genius Bar summary of 726 help-channel questions, Jan to Jul 2025; July 2024 research readout; launch posts of Aug 7, 2025 and Mar 16, 2026; the Cursor output specification and the first-cut agent document, 2025; the Data Understanding KPI tracker (Oct 2025 lab benchmark); observed-task study, Mar 2026; FY24 year-end review; Intuit Investor Day 2023 transcript; AWS re:Invent 2025 for the table count.',
}

// Every word on the homepage, in one place. Step 1 of the incremental
// rebuild: hero, the work grouped into three strategic arcs, and the
// "How I lead" block. Card pages arrive in later steps; until a card's page
// exists its status is 'coming-soon' and it does not link.

export interface HeroBullet {
  org: string
  period: string
  text: string
}

export const HERO = {
  title: 'Principal Product Designer & Product Design Manager',
  location: 'San Francisco Bay Area',
  email: 'kbhawalk@gmail.com',
  linkedin: 'linkedin.com/in/kanchib',
  linkedinUrl: 'https://linkedin.com/in/kanchib',
  paragraph:
    'Design leader with 12+ years across advertising analytics and enterprise data platforms, and a former backend software engineer. Known for turning deep data infrastructure into workflows people trust, and for moving data tooling past standalone chatbots into structured agents that live where engineers already work.',
  bullets: [
    {
      org: 'At Intuit',
      period: '2021–2026',
      text: 'Founding designer of the internal data catalog (Senior → Principal) and Product Design Manager leading design across nine platform areas at a 1:85 designer-to-engineer ratio. Grew monthly users from 2,664 to 6,673, cut public data discovery time from 20 days to 9.4 hours, and slashed question-to-answer time from 45 minutes to 4 minutes with our coding-tool agent.',
    },
    {
      org: 'At 605 LLC',
      period: '2017–2021',
      text: 'First product designer. Led design from concept to launch across three TV analytics products generating $20M+ in booked revenue.',
    },
  ] as HeroBullet[],
}

export interface CardStat {
  value: string
  label: string
}

export interface WorkCard {
  slug: string
  title: string
  period: string
  roleTag: string
  /** What the cover will show once it exists; read out for the placeholder. */
  visualNote: string
  /** One optional line of plain text under the title. */
  line?: string
  stats: CardStat[]
  status: 'coming-soon' | 'live'
}

export interface Arc {
  id: string
  heading: string
  period: string
  thesis?: string
  cards: WorkCard[]
}

export const ARCS: Arc[] = [
  {
    id: 'discovery',
    heading: 'Evolving Enterprise Data Discovery from Keywords to Coding Agents',
    period: '2021–2026',
    thesis:
      'How I led the 5-year evolution of data discovery across 320,000 tables: learning why standalone chatbots failed and moving the catalog directly into Cursor and Claude.',
    cards: [
      {
        slug: 'agentic-discovery',
        title: 'Agentic Discovery in Cursor & Claude',
        period: '2025–2026',
        roleTag: 'Principal Strategy & Spec · Design Manager',
        visualNote: 'The agent answering a multi-table query inside Cursor.',
        stats: [
          { value: '45 min → 4 min', label: 'Time to insight' },
          { value: '711', label: 'Active users · 56,560 tool calls' },
        ],
        status: 'coming-soon',
      },
      {
        slug: 'search-2',
        title: 'Search 2.0 & Data Collections',
        period: '2024–2025',
        roleTag: 'Principal IC → Design Manager',
        visualNote: 'Six object-type tabs and the five-line result card anatomy.',
        stats: [
          { value: '81.31% → 89.24%', label: 'First-result precision' },
          { value: '50.59s → 1.93s', label: 'P99 latency' },
        ],
        status: 'coming-soon',
      },
    ],
  },
  {
    id: 'platform',
    heading: 'Architecting the Data Platform & Scaling the Team at a 1:85 Ratio',
    period: '2021–2026',
    thesis:
      'Unifying data modeling (Data Map), clean-data quality standards, lineage, and access into a single platform used by 6,673 monthly users: first as founding IC designer, then as Design Manager across 9 product areas.',
    cards: [
      {
        slug: 'scaling-platform-design',
        title: 'Scaling Platform Design at a 1:85 Ratio',
        period: '2024–2026',
        roleTag: 'Product Design Manager',
        visualNote: 'An anonymized platform launch map beside the team project intake tracker.',
        stats: [
          { value: '<1% → 80%', label: 'Certified clean data across the estate' },
          { value: '17 → 0', label: 'Serious TY25 tax-season incidents' },
        ],
        status: 'coming-soon',
      },
      {
        slug: 'self-service-onboarding',
        title: 'Self-Service Onboarding & Human-in-the-Loop AI Trust',
        period: '2023–2024',
        roleTag: 'Principal IC',
        visualNote: 'Three onboarding flow iterations side by side.',
        stats: [{ value: '1–2 weeks → under 24 hours', label: 'Marketing data onboarding' }],
        status: 'coming-soon',
      },
      {
        slug: 'catalog-data-map-lineage',
        title: '0-to-1 Catalog, Data Map & 4-Week Lineage',
        period: '2021–2023',
        roleTag: 'Founding Senior IC',
        visualNote: 'The Data Product object model: batch, stream and marketing copies beneath a business concept.',
        line: 'Commercial catalog retired in FY23.',
        stats: [
          { value: '68% → 96%', label: 'Top-5 click-through' },
          { value: '30K tables', label: 'Lineage MVP in 4 weeks' },
        ],
        status: 'coming-soon',
      },
    ],
  },
  {
    id: 'early',
    heading: 'Early 0-to-1 Craft & Data Visualization',
    period: '2017–2021',
    cards: [
      {
        slug: '605-tv-analytics',
        title: '605 TV Analytics: Multi-Audience Reports Under Render Constraints',
        period: '2017–2021',
        roleTag: 'First Product Designer',
        visualNote: 'The 15-target chart beside the shipped 5-target comparison chart in 605 Platform.',
        stats: [
          { value: '3–4 min → 1–1.5 min', label: 'Render latency' },
          { value: '$2M', label: 'Additional booked revenue from client pitches ($20M+ on Platform)' },
        ],
        status: 'coming-soon',
      },
    ],
  },
]

export interface Habit {
  title: string
  body: string
}

export const HOW_I_LEAD = {
  heading: 'How I lead',
  subtitle: 'Technical depth, upstream strategy, and high-leverage teams',
  framing:
    'Operating in an enterprise data organization with one designer for every 85 engineers taught me that a manager cannot scale by reviewing screens or routing tickets. Four habits define how I lead:',
  habits: [
    {
      title: 'I move upstream to problem definition before specifications exist.',
      body: 'I shifted my calendar into early engineering and PM framing meetings, sponsoring unrequested bets like Data Collections and Query Insights onto the roadmap.',
    },
    {
      title: 'I operate as a technical player-coach on core architecture.',
      body: 'As a former backend software engineer, I stay hands-on where systems are most ambiguous: authoring the answer specification for our Cursor/Claude MCP agent, designing Search 2.0, and stepping in to design Datalake schema creation during staffing gaps.',
    },
    {
      title: 'I absorb organizational thrash so my team can focus.',
      body: 'I established a single intake tracker across 9 product areas, pushed back against splitting designers across unrelated domains, and pulled engineering leads and PMs into one room to settle decisions.',
    },
    {
      title: 'I model AI-native workflows first instead of mandating them.',
      body: 'I used coded prototypes (v0), AI research synthesis, and AI video walkthroughs in my own IC work first, inspiring every designer on my team to adopt them and invent new team practices (like coded prototyping that cut dev time by 90%).',
    },
  ] as Habit[],
}

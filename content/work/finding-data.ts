import type { CaseStudy } from '@/lib/case-study'

// Appendix A of BRIEF.md, rendered as written.

export const FINDING_DATA: CaseStudy = {
  slug: 'finding-data',
  href: '/work/finding-data',
  title: 'Finding data: three decisions in five years of search',
  summary: {
    role: 'Lead designer for the data catalog, 2021–2024. Design manager, still designing, 2024–2026.',
    where: 'Intuit, internal data platform.',
    what: 'I designed how people at Intuit search for data, from a keyword catalog in 2021 to an agent inside the coding tools engineers use in 2026.',
    measured: {
      lead: 'What was measured. No single measure ran across all five years. These are three points where one was.',
      columns: ['When', 'Measure', 'Change'],
      rows: [
        ['Apr 2022 → Apr 2023', 'Searches where the person clicked one of the top five results', '68% → 96%'],
        ['Mar 2025', 'Searches where the first result was the right one', '81.31% → 89.24%'],
        ['Mar 2026', 'Time from a question to an answer with the agent, in an observed-task study', '45 minutes → 4 minutes'],
      ],
      after:
        'The first figure is from the first catalog I designed. The second is from the launch of search across the map of data: I designed the first version, a designer on my team took it to launch, and engineers delivered the gain.',
    },
    hero: {
      id: 'fd-hero',
      caption: 'The same question asked in 2023, 2025 and 2026.',
      alt: 'Three screens side by side: the 2023 chat assistant, the 2025 rebuilt search, and the 2026 agent inside a coding tool, each answering the same question about which customer table to use.',
      aspect: '16 / 7',
    },
  },
  impactId: 'fd-impact',
  problem: {
    id: 'problem',
    heading: 'The problem',
    blocks: [
      {
        type: 'p',
        text: 'Intuit’s data lake held 320,000 tables in December 2025. Of 666 questions sent to the company’s data help channel over one year, 43% were people trying to locate the right data, and 73.0% of all the questions were resolved only because a specific person knew the answer.',
      },
      {
        type: 'p',
        text: 'The goal stayed the same for five years. Someone with a business question should reach data they can trust without having to ask a person.',
      },
    ],
  },
  decisions: [
    {
      id: 'organize-by-meaning',
      heading: '1. Organize data by what it means, not where it is stored',
      meta: '2022–2023 · my design',
      blocks: [
        {
          type: 'p',
          text: 'The choice. The catalog, like the commercial one it replaced, organized data the way it was stored: warehouse, schema, table. Search returned physical tables. The same customer data existed as a batch table, a real-time stream and a marketing copy, and nothing connected them. The easier option was to keep that structure and add better filters. The harder one meant reworking the home page, browsing, search, results and detail pages around a new unit.',
        },
        {
          type: 'p',
          text: 'What I picked. A map of data: one entry per business concept, such as a customer, with an owner and a description. Every physical copy sits beneath it. In 2023 I added one view of every place a piece of data is hosted, production and test side by side.',
        },
        {
          type: 'p',
          text: 'Why. The company was reorganizing its data by business domain, and people needed to stop guessing whether a real-time source existed.',
        },
        {
          type: 'p',
          text: 'What happened. It took several rounds of feedback with around 20 users. No catalog we evaluated organized data this way. The idea kept needing explaining. My 2024 interviews found that people know what kind of object they want, a table or a stream, so the rebuilt search of 2024–2025 gives each kind its own tab and keeps the map as one of them. In 2025 my team’s research still found map search adopted less than table search, because people prefer physical objects.',
        },
        {
          type: 'visual',
          visual: {
            id: 'fd-d1',
            caption: 'One business concept with its copies beneath it.',
            alt: 'A data map entry for one business concept, a customer, with its batch table, real-time stream and marketing copy listed beneath it, each with an owner.',
          },
        },
      ],
    },
    {
      id: 'data-people-already-use',
      heading: '2. Build for the data people already use',
      meta: '2024–2025 · research and strategy mine; collections designed by my team',
      blocks: [
        {
          type: 'p',
          text: 'The choice. Whether to add collections, a person’s saved working set of data. Engineering criticized the idea.',
        },
        { type: 'p', text: 'What I picked. I argued for collections as design strategy and kept arguing.' },
        {
          type: 'p',
          text: 'Why. In spring 2024 I interviewed 20 catalog users while they did their own work, and brought engineers along to watch. People arrived at the catalog with a lead from a colleague or a help channel, validated what they found with past queries and experts, and crossed about six tools to find and check one dataset (own research). They looked for new data about one time in five; four times in five they went back to data they already knew (own research). Search was never the whole job.',
        },
        {
          type: 'p',
          text: 'What happened. Designers on my team designed collections and shipped it on August 7, 2025. The engineering manager wrote that it “would not have happened if not for Kanchi’s persistence and design sponsorship.” The agent in the next section checks a person’s collections before it searches.',
        },
        {
          type: 'visual',
          visual: {
            id: 'fd-d2',
            caption: 'A collection.',
            alt: 'A person’s saved working set of data: a named collection listing the handful of tables and streams they use, shareable with a team.',
          },
        },
      ],
    },
    {
      id: 'inside-the-tools',
      heading: '3. Put the catalog inside the tools people already work in',
      meta: '2023–2026 · the 2023 assistant, the strategy and the answer specification are mine; response patterns by a designer on my team',
      blocks: [
        {
          type: 'p',
          text: 'The choice. In 2023 I was the sole design lead for a chat assistant inside the catalog. I consolidated the work of 16 hackathon teams and 58 collaborators into one flow. It shipped in 4 months, more than 500 people used it each month, and Intuit’s CTO presented it at Investor Day 2023. Usage did not hold after 2024. The options were a better chat window or a different place for the catalog.',
        },
        {
          type: 'p',
          text: 'What I picked. I set the strategy: move the catalog into the coding tools people already used, Cursor and Claude, through a tool server, and do not build a better chat window.',
        },
        {
          type: 'p',
          text: 'Why. The 2024 interviews told me where the assistant had gone wrong. Only one of the 20 people used the AI-powered search at all. Those who had tried it found it unreliable, and the window to earn trust was short: when the first answer failed, people did not come back. They were already working in their editors, so the catalog had to go there, with finding the data, checking access and running the query in one place.',
        },
        {
          type: 'p',
          text: 'What I designed. The specification for how the agent answers three kinds of request: looking up a known table, choosing a table for a use case, and asking a question that needs a value. Its rules include: never show a query that has not been run, never invent a table name, ask before running anything, and check the person’s collections first. I recruited the first users, tested the answers against real questions and refined the rules. A designer on my team built the response patterns that shipped and benchmarked their precision.',
        },
        {
          type: 'p',
          text: 'What happened. By March 11, 2026 the agent had 711 active users and 56,560 tool calls in 90 days. In an observed-task study, the time from a question to an answer fell from 45 minutes to 4 minutes.',
        },
        {
          type: 'visual',
          visual: {
            id: 'fd-d3',
            caption: 'The agent answering in a coding tool, beside an excerpt of the specification.',
            alt: 'Left: the agent inside a coding tool answering a question about a table, with the table’s owner, freshness and access status in its reply. Right: an excerpt of the written specification for the three kinds of request.',
          },
        },
      ],
    },
  ],
  outcomes: {
    whoseLabel: 'Whose',
    rows: [
      { figure: '320,000 tables', date: 'Dec 2025', source: 'Public: AWS re:Invent 2025', whose: 'Scale' },
      { figure: '666 questions; 43%; 73.0%', date: 'One year, analysis dated Aug 2025', source: 'Help-channel question analysis', whose: 'Research' },
      { figure: '68% → 96%', date: 'Apr 2022 → Apr 2023', source: 'FY23 year-end review', whose: 'Mine' },
      { figure: 'Around 20 users', date: 'FY22', source: 'FY22 year-end review', whose: 'Mine' },
      { figure: '20 interviews; one of 20 used AI search; about six tools; one time in five', date: 'Spring 2024', source: 'My July 2024 research readout; own research', whose: 'Mine' },
      { figure: '16 teams, 58 collaborators, 4 months, 500+ a month, Investor Day 2023', date: 'FY24', source: 'FY24 year-end review', whose: 'Mine' },
      { figure: '81.31% → 89.24%', date: 'Mar 26, 2025', source: 'Launch post', whose: 'Engineering delivered; first design mine; a designer on my team took it to launch' },
      { figure: 'Collections, Aug 7, 2025; the quote', date: '2025', source: 'Launch post; written feedback', whose: 'Team; quote is the engineering manager’s' },
      { figure: '711 users; 56,560 tool calls; 45 → 4 minutes', date: 'As of Mar 11, 2026', source: 'Launch post, Mar 16, 2026; FY27 strategy readout', whose: 'Shared' },
    ],
  },
  differently: null,
  credits: [
    'Designers on my team designed collections, took search across the map of data from my first version to launch, and built and benchmarked the agent’s response patterns. Engineers and a search-model team delivered the search precision and speed and built the agent’s servers.',
  ],
}

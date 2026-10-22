// The About page: who I am, how I manage, how I work with AI, the work, and
// the two public videos. Copy follows BRIEF.md 3.3 and blocks D and E, with
// the Limits paragraph from the team page in place of the fifth management
// paragraph, which opens the AI section instead.

export const POSITIONING =
  'Design manager and founding designer of an internal data platform used across Intuit, former software engineer, still designing.'

export const ABOUT_PARAGRAPH =
  'I joined Intuit in June 2021 as the founding designer of its data catalog, grew it into the data discovery platform, and became its design manager in August 2024. Before that I was the first product designer at 605 (2017–2021), where three analytics products shipped. I started as a software engineer.'

export const EDUCATION = [
  'MS Information (HCI), University of Michigan, 2017',
  'BE Computer Engineering, University of Pune, 2012',
]

export const LINKS = {
  resume: '/kanchi-bhawalkar-resume.pdf',
  linkedin: 'https://linkedin.com/in/kanchib',
  email: 'kbhawalk@gmail.com',
}

export const HOW_I_MANAGE_INTRO =
  'From August 2024 to July 2026 I managed the designers for Intuit’s data platform, at one designer for every 85 engineers across the data design group. They shipped the work. I set the strategy and the shared research base, and I kept designing.'

export const HOW_I_MANAGE: string[] = [
  'My first change as a manager was where I spent my time. I went to the meetings where a problem was framed and asked questions before a specification existed. Two features the roadmap did not have came out of that, a view of the queries other people run against a table and a person’s saved working set of data, and my team designed both. The engineering manager wrote that they “would not have happened if not for Kanchi’s persistence and design sponsorship.”',
  'Requests for design came from many product teams, so I set up a single intake process and one tracker of what each designer was working on, and I pushed back when a designer was about to be spread across two products. I also had the designers pool their user visits, 8 targeted surveys and 11 help channels into one set of findings. It produced the list of what to build next, and my manager wrote that it showed in what was added to the roadmap.',
  'My designers told my manager what they valued from me: clarity when requirements were unclear, boundaries when work kept changing, and getting engineering leads and several product managers into one room to settle a decision. I hired for the wider design team, every designer who reported to me at Intuit was promoted while on my team, and a 2023 intern I had managed joined the team full-time.',
  'Not everything worked. My manager’s 2025 review names four projects where we did the research, translated it into recommendations, and it changed neither the direction nor the execution. He asked me to work on influence. The following year I kept a finding on the table until it became a commitment.',
]

export const HOW_I_WORK_WITH_AI: string[] = [
  'I used coded prototypes, AI research synthesis and AI-made videos in my own design work first, and my manager wrote that he then saw every designer on my team adopt them. One designer’s use of a prototyping tool with developers cut development time by as much as 90% on some features. The tools are coded prototypes in v0 and Figma Make, so a flow can be used before it is specified; research synthesis in NotebookLM, so twenty transcripts become one set of findings in a day instead of a week; and AI-made launch videos in place of recorded walkthroughs. For the agent in Cursor and Claude I wrote the rules it answers by as text in the repository, where it reads them. A working prototype before a spec became the team’s standard.',
  'In 2023 I consolidated 16 hackathon teams and 58 collaborators into one plain-language assistant inside the catalog. It shipped in four months, and usage did not hold, because people had to leave their tools to visit it. The agent that followed in 2025 lives inside the coding tools and answers under four rules: it checks the person’s own collections before the wider lake, it never invents a table name or shows a query that has not been run, and it asks before running anything.',
  'After two years of it I think oversight is the new design problem: what was done, what is pending, and what needs a person’s judgment. An agent answers the question you asked, so the interface has to handle not knowing what to ask. And work that is high stakes, runs over days and involves several people cannot live in a chat thread, because a thread cannot be audited.',
]

export interface Video {
  title: string
  who: string
  when: string
  note: string
  href: string
  at: string
  /** The transcript, where one exists. */
  transcript?: string
  /** YouTube id and the second to start at, for the embed. */
  youtube: string
  start?: number
}

export const VIDEOS: Video[] = [
  {
    title: 'Intuit Investor Day 2023',
    who: 'Intuit’s CTO on stage',
    when: 'September 2023',
    note: 'The plain-language assistant, Data Copilot, demonstrated to investors: my hands-on design work as an individual contributor. The CTO described it as “AI-assisted data analysis to facilitate quick data discovery, query generation, and query translation,” with data scientists and analysts working up to 2x faster.',
    href: 'https://youtu.be/kfpmtVe2OFY?t=2505',
    at: 'from 41:45',
    youtube: 'kfpmtVe2OFY',
    start: 2505,
    transcript: 'https://stockanalysis.com/stocks/intu/transcripts/92755-investor-day-2023/',
  },
  {
    title: 'AWS re:Invent 2025, INV201: Harnessing analytics for humans and AI',
    who: 'Intuit’s segment, a Distinguished Engineer',
    when: 'December 2025',
    note: 'Intuit’s data strategy, from a system of record to a system of intelligence: the catalog on stage, 320,000 tables, clean data from under 1% to 80% of the estate, time to discover data from 20 days to 9.4 hours. The segment runs to about 39:20.',
    href: 'https://www.youtube.com/watch?v=L_Q7LPB5HcA&t=1430',
    at: 'from 23:50, Intuit’s segment',
    youtube: 'L_Q7LPB5HcA',
    start: 1430,
  },
]

export const ABOUT_SECTIONS = [
  { id: 'about', title: 'About' },
  { id: 'how-i-manage', title: 'How I manage' },
  { id: 'how-i-work-with-ai', title: 'How I work with AI' },
  { id: 'in-public', title: 'In public' },
]

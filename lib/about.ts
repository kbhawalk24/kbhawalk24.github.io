// The About page: who I am, how I manage, how I work with AI, the work, and
// the two public videos. Copy follows BRIEF.md 3.3 and blocks D and E, with
// the Limits paragraph from the team page in place of the fifth management
// paragraph, which opens the AI section instead.

export const POSITIONING =
  'Design manager and founding designer of an internal data platform used across Intuit, former software engineer, still designing.'

export const ABOUT_PARAGRAPH =
  'I was the founding designer of Intuit’s data catalog from June 2021, grew it into the data discovery platform, and became its design manager in August 2024. Before that I was the first product designer at 605 (2017–2021), where three analytics products shipped. I started as a software engineer.'

export const EDUCATION = [
  'MS Information (HCI), University of Michigan, 2017',
  'BE Computer Engineering, University of Pune, 2012',
]

export const LINKS = {
  resume: '/kanchi-bhawalkar-resume.pdf',
  linkedin: 'https://linkedin.com/in/kanchib',
  email: 'kbhawalk@gmail.com',
}

export interface Passage {
  lead: string
  text: string
}

export const HOW_I_MANAGE_INTRO =
  'August 2024 – July 2026. One designer for every 85 engineers across the data design group. The designers on my team shipped the work; I set the strategy, built the shared research base, and kept designing.'

export const HOW_I_MANAGE: Passage[] = [
  {
    lead: 'Design at the point where the problem is defined.',
    text: 'My first change as a manager was where I spent my time: in the meetings where a problem was framed, asking questions before a specification existed. I argued for two features the roadmap did not have, a view of the queries other people run against a table and a person’s saved working set of data, and my team designed both. The engineering manager wrote that they “would not have happened if not for Kanchi’s persistence and design sponsorship.”',
  },
  {
    lead: 'One research base for every data designer.',
    text: 'I had the designers pool their user visits, 8 targeted surveys and 11 help channels into one set of findings. It produced the list of what to build next, and my manager wrote that it showed in what was added to the roadmap.',
  },
  {
    lead: 'One way in, one list.',
    text: 'Requests for design came from many product teams. I set up a single intake process and one tracker of what each designer was working on, and pushed back when a designer was about to be spread across two products.',
  },
  {
    lead: 'Decisions that get made.',
    text: 'My designers told my manager what they valued: clarity when requirements were unclear, boundaries when work kept changing, and getting engineering leads and several product managers into one room to settle a decision.',
  },
  {
    lead: 'What did not work.',
    text: 'My manager’s 2025 review names four projects where we did the research, translated it into recommendations, and it changed neither the direction nor the execution. He asked me to work on one thing: influence. The following year a finding stayed on the table until it became a commitment, not a readout.',
  },
]

export const HOW_I_WORK_WITH_AI: Passage[] = [
  {
    lead: 'In my own work first.',
    text: 'I used coded prototypes, AI research synthesis and AI-made videos in my own design work; my manager wrote that he then saw every designer on my team adopt them. One designer’s use of a prototyping tool with developers cut development time by as much as 90% on some features.',
  },
  {
    lead: 'The tools, and where they sit.',
    text: 'Coded prototypes in v0 and Figma Make, so a flow can be used before it is specified. Research synthesis in NotebookLM, so twenty transcripts become one set of findings in a day instead of a week. AI-made launch videos in place of recorded walkthroughs. And the codebase itself: for the agent in Cursor and Claude I wrote the rules it answers by, as text in the repository, not as a slide. The team’s standard became a working prototype before a spec.',
  },
  {
    lead: 'Designing for agents, not only with them.',
    text: 'In 2023 I consolidated 16 hackathon teams and 58 collaborators into one plain-language assistant inside the catalog. It shipped in four months and usage did not hold, because a chat window outside people’s tools is a place to visit, not a place to work. The agent that followed in 2025 lives inside the coding tools and answers under four rules: check the person’s own collections before the wider lake, never invent a table name, never show a query that has not been run, always ask before running anything.',
  },
  {
    lead: 'What I believe after two years of it.',
    text: 'Oversight is a new design problem: what was done, what is pending, what needs a person’s judgment. An agent answers the question you asked, and the interface has to handle not knowing what to ask. And high-stakes, multi-day, multi-actor work cannot live in a chat thread, because a thread is not audit evidence.',
  },
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
    note: 'The catalog on stage: 320,000 tables, clean data from under 1% to 80% of the estate, time to discover data from 20 days to 9.4 hours.',
    href: 'https://www.youtube.com/watch?v=L_Q7LPB5HcA',
    at: 'Intuit’s segment',
    youtube: 'L_Q7LPB5HcA',
  },
]

export const ABOUT_SECTIONS = [
  { id: 'about', title: 'About' },
  { id: 'how-i-manage', title: 'How I manage' },
  { id: 'how-i-work-with-ai', title: 'How I work with AI' },
  { id: 'in-public', title: 'In public' },
  { id: 'the-work', title: 'The work' },
]

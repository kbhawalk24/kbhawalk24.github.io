/** Every route the site builds. The four /work pages are password-protected at build time. */
export const ROUTES = [
  '/',
  '/about',
  '/timeline',
  '/work/finding-data',
  '/work/building-the-platform',
  '/work/my-teams-work',
  '/work/605',
] as const

export type Route = (typeof ROUTES)[number]

export const PUBLIC_ROUTES: Route[] = ['/', '/about', '/timeline']
export const WORK_ROUTES: Route[] = ['/work/finding-data', '/work/building-the-platform', '/work/my-teams-work', '/work/605']

export const SITE = {
  name: 'Kanchi Bhawalkar',
  positioning:
    'Design manager and founding designer of an internal data platform used across Intuit, former software engineer, still designing.',
  email: 'kbhawalk@gmail.com',
  resume: '/Kanchi_Bhawalkar_Resume.pdf',
  linkedin: 'https://www.linkedin.com/in/kanchib',
  passwordLine: 'Case studies are password-protected. The password is in my application.',
} as const

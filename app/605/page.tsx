import type { Metadata } from 'next'
import { CaseStudyLayout } from '@/components/case-study-layout'
import { SIX_O_FIVE } from '@/lib/site-content'

export const metadata: Metadata = { title: 'The tools I built at 605 | Kanchi Bhawalkar' }

export default function Page() {
  return <CaseStudyLayout page={SIX_O_FIVE} />
}

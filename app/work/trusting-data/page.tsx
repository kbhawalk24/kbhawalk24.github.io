import type { Metadata } from 'next'
import { CaseStudyLayout } from '@/components/case-study-layout'
import { TRUSTING_DATA } from '@/lib/site-content'

export const metadata: Metadata = { title: 'Trusting data, and getting it | Kanchi Bhawalkar' }

export default function Page() {
  return <CaseStudyLayout page={TRUSTING_DATA} />
}

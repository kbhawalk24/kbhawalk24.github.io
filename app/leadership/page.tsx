import type { Metadata } from 'next'
import { CaseStudyLayout } from '@/components/case-study-layout'
import { LEADERSHIP } from '@/lib/site-content'

export const metadata: Metadata = { title: 'How I lead | Kanchi Bhawalkar' }

export default function Page() {
  return <CaseStudyLayout page={LEADERSHIP} />
}

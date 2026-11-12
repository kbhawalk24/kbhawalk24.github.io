import type { Metadata } from 'next'
import { HeroFxPage } from '@/components/overdrive/hero/hero-fx-page'
import type { HeroFx } from '@/components/hero'

// Three overdrive takes on the homepage hero (12 Nov 2026): develop, cursor
// and thread. Not linked from the nav; kept out of search.

const FX: HeroFx[] = ['develop', 'cursor', 'thread']

export function generateStaticParams() {
  return FX.map((fx) => ({ fx }))
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: 'Hero · Overdrive · Kanchi Bhawalkar',
  robots: { index: false, follow: false },
}

export default async function Page({ params }: { params: Promise<{ fx: string }> }) {
  const { fx } = await params
  return <HeroFxPage fx={fx as HeroFx} />
}

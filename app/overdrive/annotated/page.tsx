import type { Metadata } from 'next'
import { AnnotatedPage } from '@/components/overdrive/annotated/annotated-page'

// A landing-page option (16 Nov 2026): the annotated product screenshot, the
// seven areas as dictionary entries, one long page. Not linked from the nav;
// kept out of search. The live homepage is /.

export const metadata: Metadata = {
  title: 'Annotated landing · Overdrive · Kanchi Bhawalkar',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AnnotatedPage />
}

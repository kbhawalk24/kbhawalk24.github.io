import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SearchResults } from './search-results'

// Local build of the Figma frame "Search results - ALL RESULTS" (Search 2.0
// file, node 1990:15917). It is an internal Intuit screen, so it exists only
// on the dev server: production builds render the 404 instead and nothing
// from it reaches the public site.

export const metadata: Metadata = {
  title: 'Search 2.0 results, local build',
  robots: { index: false, follow: false },
}

export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <SearchResults />
}

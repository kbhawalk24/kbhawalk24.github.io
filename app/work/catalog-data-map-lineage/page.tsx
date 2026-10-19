import type { Metadata } from 'next'
import { ShortPageLayout } from '@/components/short-page'
import { CATALOG_DATA_MAP_LINEAGE } from '@/lib/pages/catalog-data-map-lineage'

export const metadata: Metadata = {
  title: `${CATALOG_DATA_MAP_LINEAGE.title} | Kanchi Bhawalkar`,
  description: CATALOG_DATA_MAP_LINEAGE.description,
}

export default function Page() {
  return <ShortPageLayout page={CATALOG_DATA_MAP_LINEAGE} />
}

import { CatalogPage } from '@/components/overdrive/catalog/catalog-page'

// The landing page (14 Nov 2026): Kanchi's own entry in a data catalog. It
// loads on the split hero's opening screen, and scrolling turns that into the
// tabbed catalog page: the header, the tab row (Overview, Design work,
// Management, Leveraging AI, Talks) and the Overview with her description
// beside the wheel of clips and project stills (16 Nov 2026). The earlier scrolling homepage's sections are the tabs' panels.

export default function Page() {
  return <CatalogPage option="band" />
}

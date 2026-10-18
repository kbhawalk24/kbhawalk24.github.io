import type { CaseStudy } from '@/lib/case-study'
import { FindingDataViz } from '@/components/impact/finding-data-viz'
import { PlatformViz } from '@/components/impact/platform-viz'
import { TeamViz } from '@/components/impact/team-viz'
import { SixOFiveViz } from '@/components/impact/six-o-five-viz'
import fd from '@/content/impact/finding-data.json'
import bp from '@/content/impact/building-the-platform.json'
import tw from '@/content/impact/my-teams-work.json'
import s6 from '@/content/impact/605.json'

/** The one motion-based visualization each case study carries, directly
 *  under the summary block. The data is read here, on the server, and
 *  passed down, so the figures travel inside the page (which is encrypted)
 *  and not inside a public JavaScript chunk. `#impact` is the section
 *  menu's anchor; the viz carries its own id from content/impact. */
export function ImpactViz({ id }: { id: CaseStudy['impactId'] }) {
  return (
    <div id="impact" className="scroll-mt-28">
      {id === 'fd-impact' && <FindingDataViz data={fd} />}
      {id === 'bp-impact' && <PlatformViz data={bp} />}
      {id === 'tw-impact' && <TeamViz data={tw} />}
      {id === 's6-impact' && <SixOFiveViz data={s6} />}
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { event } from '@/lib/analytics'
import { LEADING_THE_TEAM } from '@/lib/pages/leading-the-team'

// The "Leveraging AI" tab on the catalog homepage (15 Nov 2026). No copy of
// its own: the words are the "AI tools in my own work first" item from the
// Management page's "How I ran it" section, and the two pictures are that
// section's research base and launch video, with their captions. The link
// opens the Management tab.

const running = LEADING_THE_TEAM.sections.find((s) => s.id === 'running')
const list = running?.blocks.find((b) => b.type === 'list')
const item = list?.type === 'list' ? list.items.find((i) => i.lead.startsWith('AI tools')) : undefined
const MANAGEMENT_LABEL = 'How I manage'
const visuals = (LEADING_THE_TEAM.visuals ?? []).filter((v) => v.src && (v.id === 'research' || v.id === 'launch-video'))

export function CatalogAi() {
  if (!item) return null
  return (
    <section aria-label="Leveraging AI" className="relative z-10">
      <div className="mx-auto grid max-w-6xl gap-x-14 gap-y-8 px-6 pb-12 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:px-14">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.015em] text-foreground">{item.lead}</h2>
          <p className="font-sans text-lg leading-[1.6] text-foreground">{item.text}</p>
          <Link
            href="/#management"
            {...event('leadership', { via: 'ai' })}
            className="group inline-flex min-h-11 items-center gap-1.5 self-start font-sans text-base font-bold text-accent-brand"
          >
            <span className="group-hover:underline">{MANAGEMENT_LABEL}</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-[translate] duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="flex flex-col gap-6">
          {visuals.map((v) => (
            <li key={v.id}>
              <figure className="overflow-hidden rounded-[14px] bg-card shadow-soft">
                <Image src={v.src ?? ''} width={v.width} height={v.height} alt={v.alt} sizes="(min-width: 1024px) 44rem, 100vw" className="h-auto w-full" />
                <figcaption className="px-5 py-3.5 font-sans text-[15px] leading-normal text-muted-foreground">{v.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

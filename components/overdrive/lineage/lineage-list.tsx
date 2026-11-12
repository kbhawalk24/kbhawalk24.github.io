'use client'

import Link from 'next/link'
import { event } from '@/lib/analytics'
import { AREAS, KIND_LABEL, NODES, upstreamOf, type LineageNode } from './graph-data'

const track = (item: string) => event('overdrive', { page: 'lineage', item })
const NAME = new Map(NODES.map((n) => [n.id, n.label]))

/** Phones: the same nodes as a vertical lineage, oldest first. The seven
 *  areas are listed in full under the platform instead of as seven rows. */
export function LineageList() {
  const items = NODES.filter((n) => !n.id.startsWith('area-')).sort(
    (a, b) => a.x - b.x || order(a) - order(b),
  )
  return (
    <ol aria-label="Career lineage, 2017 to 2026" className="relative">
      {items.map((n, i) => (
        <Item key={n.id} n={n} last={i === items.length - 1} />
      ))}
    </ol>
  )
}

const order = (n: LineageNode) => ['role', 'case', 'area', 'figure'].indexOf(n.kind)

function Item({ n, last }: { n: LineageNode; last: boolean }) {
  const up = upstreamOf(n.id).map((id) => NAME.get(id)!)
  const isCase = n.kind === 'case'
  return (
    <li className="relative pb-5 pl-8">
      {!last && <span aria-hidden="true" className="absolute bottom-0 left-[9px] top-6 w-px bg-accent-brand/30" />}
      <span
        aria-hidden="true"
        className={
          'absolute left-[4px] top-[18px] size-[11px] rounded-full ring-4 ring-band ' +
          (isCase ? 'bg-accent-brand' : n.kind === 'role' ? 'bg-foreground' : n.kind === 'area' ? 'bg-track-ic' : 'bg-card shadow-[inset_0_0_0_2px_var(--accent-brand)]')
        }
      />
      <div className={'rounded-[18px] p-4 shadow-soft ' + (isCase ? 'bg-accent-brand text-white' : 'bg-card')}>
        <p className={'label-micro ' + (isCase ? 'text-white/75' : 'text-muted-foreground')}>
          {KIND_LABEL[n.kind]}
          {n.meta ? ` · ${n.meta}` : ''}
        </p>
        {n.kind === 'figure' ? (
          <p className={'mt-1 font-heading font-bold tracking-tight text-accent-brand ' + (n.caption ? 'text-2xl' : 'text-lg leading-snug')}>
            {n.label}
          </p>
        ) : (
          <p className="mt-1 font-heading text-lg font-semibold leading-snug tracking-tight">{n.card?.title ?? n.label}</p>
        )}
        {n.caption && <p className="mt-0.5 font-sans text-sm text-muted-foreground">{n.caption}</p>}
        {n.card && <p className="mt-2 font-sans text-[15px] leading-relaxed text-white/85">{n.card.line}</p>}
        {n.id === 'platform' && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {AREAS.map((a) => (
              <li key={a} className="rounded-full bg-card-soft px-2.5 py-1 font-sans text-[13px] font-semibold">
                {a}
              </li>
            ))}
          </ul>
        )}
        {up.length > 0 && (
          <p className={'mt-3 font-sans text-[13px] ' + (isCase ? 'text-white/75' : 'text-muted-foreground')}>
            <span className="label-micro">Upstream</span> {up.join(', ')}
          </p>
        )}
        {n.card?.href && (
          <Link
            href={n.card.href}
            {...track(`list-read-${n.card.slug}`)}
            className="mt-3 inline-flex min-h-11 items-center rounded-full bg-white px-5 font-sans text-sm font-semibold text-foreground"
          >
            Read the case study →
          </Link>
        )}
      </div>
    </li>
  )
}

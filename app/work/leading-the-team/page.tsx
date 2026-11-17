import { Forward } from '@/components/forward'

/** The Management case study is now the homepage's Management tab (16 Nov
 *  2026); old links forward there. */
export default function Page() {
  return <Forward to="/#management" label="the Management section" />
}

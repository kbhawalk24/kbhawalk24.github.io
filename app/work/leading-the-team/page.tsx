import { Forward } from '@/components/forward'

/** The leadership page moved to /leadership; old links forward there. */
export default function Page() {
  return <Forward to="/leadership" label="the Leadership page" />
}

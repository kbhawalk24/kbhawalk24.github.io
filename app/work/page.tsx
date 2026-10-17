import { redirect } from 'next/navigation'

/** /work has no index of its own: the work lives in the Work highlights
 *  section of the home page, so send people there. */
export default function Page() {
  redirect('/#work')
}

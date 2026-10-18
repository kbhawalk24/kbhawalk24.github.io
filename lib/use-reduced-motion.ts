'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'
const canQuery = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'

function subscribe(onChange: () => void) {
  if (!canQuery()) return () => {}
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
const getSnapshot = () => canQuery() && window.matchMedia(QUERY).matches
const getServerSnapshot = () => false

/** True when the person asked the OS for less motion. False on the server
 *  and until hydration, so the first client render matches the HTML. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'

// Overdrive B (12 Nov 2026): the hero's dot grid answers the pointer. Dots
// near it swell and darken to ledger blue, easing back when it leaves; the
// photo leans a couple of degrees toward it. The CSS grid stays underneath,
// so this canvas only draws the swollen dots. Fine pointers only; touch and
// reduced motion keep the still grid. The loop sleeps once everything rests.

const PITCH = 30 // matches .hero-ground::before (dots at multiples of 30px)
const RADIUS = 170

export function useFinePointer() {
  const reduced = useReducedMotion()
  const [fine, setFine] = useState(false)
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFine(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return fine && !reduced
}

export function CursorField({ stageRef }: { stageRef: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const active = useFinePointer()

  useEffect(() => {
    const canvas = ref.current
    const stage = stageRef.current
    const ctx = canvas?.getContext('2d')
    if (!active || !canvas || !stage || !ctx) return

    let w = 0
    let h = 0
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const ink = getComputedStyle(canvas).getPropertyValue('--accent-brand').trim() || '#1f4a8a'
    const target = { x: -999, y: -999, on: 0 }
    const pos = { x: -999, y: -999, on: 0 }
    let raf = 0

    const draw = () => {
      // Ease toward the pointer and toward on/off, then sleep when settled.
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      pos.on += (target.on - pos.on) * 0.12
      ctx.clearRect(0, 0, w, h)
      if (pos.on > 0.01) {
        ctx.fillStyle = ink
        const x0 = Math.max(0, Math.floor((pos.x - RADIUS) / PITCH))
        const x1 = Math.ceil((pos.x + RADIUS) / PITCH)
        const y0 = Math.max(0, Math.floor((pos.y - RADIUS) / PITCH))
        const y1 = Math.ceil((pos.y + RADIUS) / PITCH)
        for (let gx = x0; gx <= x1; gx++) {
          for (let gy = y0; gy <= y1; gy++) {
            const x = gx * PITCH
            const y = gy * PITCH
            const d = Math.hypot(x - pos.x, y - pos.y)
            if (d > RADIUS) continue
            const f = Math.pow(1 - d / RADIUS, 2) * pos.on
            ctx.globalAlpha = 0.25 + 0.6 * f
            ctx.beginPath()
            ctx.arc(x, y, 1.4 + 3.4 * f, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1
      }
      const moving = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 || Math.abs(target.on - pos.on) > 0.005
      raf = moving ? requestAnimationFrame(draw) : 0
    }
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      target.x = e.clientX - r.left
      target.y = e.clientY - r.top
      if (pos.on < 0.01) {
        pos.x = target.x
        pos.y = target.y
      }
      target.on = inside ? 1 : 0
      wake()
    }
    const onLeave = () => {
      target.on = 0
      wake()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [active, stageRef])

  if (!active) return null
  return <canvas ref={ref} aria-hidden="true" className="hero-field pointer-events-none absolute inset-0 h-full w-full" />
}

// The photo's lean: up to 3 degrees toward the pointer, on a soft spring.
export function usePhotoTilt(targetRef: RefObject<HTMLElement | null>, enabled: boolean) {
  const fine = useFinePointer()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 })
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 })
  useEffect(() => {
    if (!enabled || !fine) return
    const onMove = (e: PointerEvent) => {
      const el = targetRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 700))
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 700))
      ry.set(nx * 3)
      rx.set(-ny * 3)
    }
    const onLeave = () => {
      rx.set(0)
      ry.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, fine, rx, ry, targetRef])
  return enabled && fine ? { rotateX, rotateY, transformPerspective: 900 } : undefined
}

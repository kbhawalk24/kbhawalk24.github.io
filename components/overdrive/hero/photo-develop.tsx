'use client'

import { useEffect, useRef } from 'react'

// Overdrive A (12 Nov 2026): the portrait develops out of the dot grid. The
// real photo is sampled once into a coarse grid; each cell becomes a blue dot
// sized by how dark that part of the photo is, swelling outward from the
// centre. The hero then crossfades this halftone into the photo itself.
// Runs once, about 1.3s, on one canvas the size of the photo.

const DURATION = 1300
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function PhotoDevelop({ src }: { src: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let raf = 0
    let cancelled = false
    const img = new window.Image()
    img.decoding = 'async'
    img.src = src
    img.onload = () => {
      if (cancelled) return
      const { width: w, height: h } = canvas.getBoundingClientRect()
      if (!w || !h) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // One cell per dot, about 56 across the photo.
      const pitch = Math.max(6, w / 56)
      const cols = Math.ceil(w / pitch)
      const rows = Math.ceil(h / pitch)
      const sample = document.createElement('canvas')
      sample.width = cols
      sample.height = rows
      const sctx = sample.getContext('2d', { willReadFrequently: true })
      if (!sctx) return
      sctx.drawImage(img, 0, 0, cols, rows)
      const px = sctx.getImageData(0, 0, cols, rows).data

      const cx = w / 2
      const cy = h / 2
      const maxD = Math.hypot(cx, cy)
      const dots: { x: number; y: number; r: number; d: number }[] = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255
          const dx = (x + 0.5) * pitch
          const dy = (y + 0.5) * pitch
          // A contrast curve so the grey backdrop stays light and the hair,
          // eyes and shirt carry the image; dots never quite touch.
          const ink = Math.pow(Math.min(1, Math.max(0, (1 - lum - 0.3) / 0.6)), 1.3)
          dots.push({ x: dx, y: dy, r: 0.5 + ink * pitch * 0.42, d: Math.hypot(dx - cx, dy - cy) / maxD })
        }
      }

      const inkColor = getComputedStyle(canvas).getPropertyValue('--accent-brand').trim() || '#1f4a8a'
      ctx.fillStyle = inkColor
      const start = performance.now()
      const frame = (now: number) => {
        const t = (now - start) / DURATION
        ctx.clearRect(0, 0, w, h)
        ctx.beginPath()
        for (const p of dots) {
          // Dots near the centre grow first; the wave reaches the corners last.
          const local = Math.min(1, Math.max(0, (t - p.d * 0.4) / 0.55))
          const r = p.r * easeOutExpo(local)
          if (r < 0.2) continue
          ctx.moveTo(p.x + r, p.y)
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        }
        ctx.fill()
        if (t < 1.05) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [src])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

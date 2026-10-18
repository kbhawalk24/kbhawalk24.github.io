#!/usr/bin/env node
/**
 * Build check for the built site in out/ (BRIEF.md section 7). Fails the
 * build when:
 *   1. any page's visible text (tags stripped, scripts and styles removed,
 *      alt/title/aria-label attributes included) contains a banned string;
 *   2. a numeric token on /, /about, /timeline or a /work page is not in a
 *      figure in content/numbers.json (ignoring years 1990–2099, tokens glued
 *      to letters such as P0 or FY24, day numbers next to a month name, list
 *      numbering, and the allow list);
 *   3. a displayed value in content/impact/*.json or content/stat-strip.json
 *      is not in content/numbers.json;
 *   4. a VisualSlot has no alt, an <img> has no alt attribute, or a page's
 *      heading order is wrong (no h1, more than one, or a skipped level).
 * It also prints the placeholder list per page for the preview.
 *
 * Run after `next build` and before scripts/encrypt-work.mjs, so it reads
 * the plain pages.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOT = process.cwd()
const OUT = join(ROOT, 'out')

const BANNED_WORDS = [
  'DDE', 'A2D', 'CDC', 'FMH', 'D4D', 'MCP', 'GED', 'C360', 'DACM', 'UIP', 'SPP', 'BPP', 'FGAC',
  'Superglue', 'Nebula', 'Data Copilot', 'Magellan', 'Alation', 'approximately', 'three designers',
  '24 launches', 'PROPOSED', 'Anaisha', 'Carolyn', 'Sanjana', 'Sooji', 'Yeonji', 'MJ', 'Elmer',
]
const BANNED_LITERALS = ['~', '11%', '/Users/', '.fig', '.mp4', 'Documents/Work', '⚠']

const NUMBER_PAGES = new Set(['/', '/about', '/timeline', '/work/finding-data', '/work/building-the-platform', '/work/my-teams-work', '/work/605'])

const failures = []
const fail = (msg) => failures.push(msg)

// ---------- helpers ----------

function walk(dir) {
  const files = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) files.push(...walk(p))
    else if (name.endsWith('.html')) files.push(p)
  }
  return files
}

function routeOf(file) {
  const rel = relative(OUT, file).split(sep).join('/')
  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length)
  return '/' + rel.replace(/\.html$/, '')
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
}

/** Visible text plus the attributes a reader or screen reader gets. */
function visibleText(html) {
  const stripped = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
  const attrs = [...stripped.matchAll(/\s(?:alt|title|aria-label|data-alt|placeholder)="([^"]*)"/g)].map((m) => m[1])
  const text = stripped.replace(/<[^>]+>/g, ' ')
  return decode([text, ...attrs].join(' \n ')).replace(/[ \t]+/g, ' ')
}

function context(text, index, len) {
  const start = Math.max(0, index - 36)
  const end = Math.min(text.length, index + len + 36)
  return text.slice(start, end).replace(/\s+/g, ' ').trim()
}

// ---------- numbers ----------

const numbers = JSON.parse(readFileSync(join(ROOT, 'content', 'numbers.json'), 'utf8'))
const MONTH_BEFORE = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?\s+$/
const TOKEN = /(?<![\w.])\d[\d,]*(?:\.\d+)?(?!\w)/g

function normalize(tok) {
  const clean = tok.replace(/,+$/, '').replace(/,/g, '')
  return String(Number(clean))
}

/** Every numeric token in a string, normalized, with no ignore rules. */
function tokensOf(s) {
  return [...String(s).matchAll(TOKEN)].map((m) => normalize(m[0]))
}

const allowTokens = new Set(numbers.allow.flatMap((a) => tokensOf(a)))
const perPage = new Map()
const allTokens = new Set()
for (const f of numbers.figures) {
  const toks = [...tokensOf(f.figure), ...tokensOf(f.date ?? '')]
  const set = perPage.get(f.page) ?? new Set()
  toks.forEach((t) => {
    set.add(t)
    allTokens.add(t)
  })
  perPage.set(f.page, set)
}

function pageTokens(text) {
  const found = []
  for (const m of text.matchAll(TOKEN)) {
    const raw = m[0]
    const idx = m.index ?? 0
    const bare = raw.replace(/,+$/, '')
    const value = Number(bare.replace(/,/g, ''))
    if (Number.isInteger(value) && value >= 1990 && value <= 2099 && /^\d{4}$/.test(bare)) continue
    if (MONTH_BEFORE.test(text.slice(Math.max(0, idx - 12), idx))) continue
    if (/^\d$/.test(raw) && text.slice(idx + raw.length, idx + raw.length + 2) === '. ') continue
    found.push({ token: normalize(raw), raw, idx })
  }
  return found
}

// ---------- pages ----------

if (!existsSync(OUT)) {
  console.error('check-content: out/ does not exist; run `next build` first.')
  process.exit(1)
}

const pages = walk(OUT)
const placeholders = {}

for (const file of pages) {
  const route = routeOf(file)
  const html = readFileSync(file, 'utf8')
  const text = visibleText(html)

  // 1. banned strings
  for (const word of BANNED_WORDS) {
    const re = new RegExp(`(?<![A-Za-z0-9])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z0-9])`, 'g')
    for (const m of text.matchAll(re)) fail(`${route}: banned "${word}" in "${context(text, m.index, word.length)}"`)
  }
  for (const lit of BANNED_LITERALS) {
    let i = text.indexOf(lit)
    while (i !== -1) {
      fail(`${route}: banned "${lit}" in "${context(text, i, lit.length)}"`)
      i = text.indexOf(lit, i + lit.length)
    }
  }

  // 2. numbers
  if (NUMBER_PAGES.has(route)) {
    const allowed = perPage.get(route) ?? new Set()
    const missing = new Map()
    for (const { token, raw, idx } of pageTokens(text)) {
      if (allowed.has(token) || allowTokens.has(token)) continue
      if (!missing.has(token)) missing.set(token, context(text, idx, raw.length))
    }
    for (const [token, ctx] of missing) fail(`${route}: number ${token} is not in content/numbers.json for this page: "${ctx}"`)
  }

  // 4. alt on every slot and image; heading order
  for (const m of html.matchAll(/<figure\b[^>]*data-visual-slot="([^"]*)"[^>]*>/g)) {
    const tag = m[0]
    const alt = tag.match(/data-alt="([^"]*)"/)?.[1] ?? ''
    if (!alt.trim()) fail(`${route}: VisualSlot "${m[1]}" has no alt`)
    const status = tag.match(/data-status="([^"]*)"/)?.[1]
    if (status === 'placeholder') (placeholders[route] ??= []).push(m[1])
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) fail(`${route}: <img> without alt: ${m[0].slice(0, 80)}`)
  }
  if (NUMBER_PAGES.has(route)) {
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]))
    const h1s = levels.filter((l) => l === 1).length
    if (h1s !== 1) fail(`${route}: expected one h1, found ${h1s}`)
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] > levels[i - 1] + 1) fail(`${route}: heading order skips from h${levels[i - 1]} to h${levels[i]}`)
    }
  }
}

// 3. impact data and the stat strip
const impactDir = join(ROOT, 'content', 'impact')
const dataFiles = [...readdirSync(impactDir).map((f) => join(impactDir, f)), join(ROOT, 'content', 'stat-strip.json')]
const VALUE_KEYS = new Set(['value', 'before', 'after', 'from', 'to', 'axis'])
function checkValues(node, path, file) {
  if (Array.isArray(node)) return node.forEach((n, i) => checkValues(n, `${path}[${i}]`, file))
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (VALUE_KEYS.has(k) && (typeof v === 'string' || Array.isArray(v))) {
        const strings = Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [v]
        for (const s of strings) {
          for (const t of tokensOf(s)) {
            if (!allTokens.has(t) && !allowTokens.has(t)) fail(`${relative(ROOT, file)} ${path}.${k} = "${s}": ${t} is not in content/numbers.json`)
          }
        }
      }
      checkValues(v, `${path}.${k}`, file)
    }
  }
}
for (const file of dataFiles) checkValues(JSON.parse(readFileSync(file, 'utf8')), '', file)

// ---------- report ----------

console.log(`check-content: ${pages.length} pages`)
for (const route of Object.keys(placeholders).sort()) {
  console.log(`  ${route}: ${placeholders[route].length} placeholder${placeholders[route].length === 1 ? '' : 's'}: ${placeholders[route].join(', ')}`)
}
if (failures.length) {
  console.error(`\ncheck-content: ${failures.length} failure${failures.length === 1 ? '' : 's'}`)
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}
console.log('check-content: ok')

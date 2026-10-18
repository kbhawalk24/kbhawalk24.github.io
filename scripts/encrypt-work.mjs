#!/usr/bin/env node
/**
 * Encrypts the four /work pages in out/ in place with staticrypt (BRIEF.md
 * section 6). One shared password from PORTFOLIO_PASSWORD; the build fails
 * when it is unset so a plain page is never published. The salt is fixed
 * (it is public in the HTML anyway) so one "remember me" unlocks all four.
 * After encrypting, asserts nothing from the page body is left in the file.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join, relative } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = process.cwd()
const OUT = join(ROOT, 'out')
const SLUGS = ['finding-data', 'building-the-platform', 'my-teams-work', '605']
const SALT = 'b7e0c1d2a9f84c3e9d6a5b4c3d2e1f00'
const INSTRUCTIONS = 'The password is in my application.'

const password = process.env.PORTFOLIO_PASSWORD
if (!password) {
  console.error(
    'encrypt-work: PORTFOLIO_PASSWORD is not set. The /work pages must be encrypted before they are published.\n' +
      '  Locally: PORTFOLIO_PASSWORD=... pnpm build\n' +
      '  On GitHub: add the repository secret PORTFOLIO_PASSWORD (the deploy workflow passes it to the build).',
  )
  process.exit(1)
}

const require = createRequire(import.meta.url)
const cli = require.resolve('staticrypt/cli/index.js')
/** Phrases from each page body, checked against every file at the end. */
const bodies = []

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(amp|lt|gt|quot|apos);/g, (_, n) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" })[n])

for (const slug of SLUGS) {
  const candidates = [join(OUT, 'work', `${slug}.html`), join(OUT, 'work', slug, 'index.html')]
  const file = candidates.find((f) => existsSync(f))
  if (!file) {
    console.error(`encrypt-work: no built page for /work/${slug} (looked for ${candidates.map((c) => relative(ROOT, c)).join(', ')})`)
    process.exit(1)
  }
  const plain = readFileSync(file, 'utf8')
  const title = decode(plain.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'Case study')
  // The title stays visible on the locked view by design, and the homepage
  // cards reuse the one-line summary. The body below the summary must not
  // appear anywhere: needles are the section headings every page has plus
  // the first long paragraphs after the impact section.
  const markup = plain.replace(/<script\b[\s\S]*?<\/script>/gi, '')
  const afterSummary = markup.slice(markup.indexOf('id="impact"'))
  const bodyText = [...afterSummary.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => decode(m[1].replace(/<[^>]+>/g, '')).trim())
    .filter((t) => t.length > 80)
  const mustNotRemain = ['Outcome table', 'What I would do differently', ...bodyText.slice(0, 4)]
  if (bodyText.length === 0) {
    console.error(`encrypt-work: ${relative(ROOT, file)} has no body paragraphs; is this the right file?`)
    process.exit(1)
  }

  const tmp = mkdtempSync(join(tmpdir(), 'staticrypt-'))
  try {
    execFileSync(
      process.execPath,
      [
        cli,
        file,
        '--password',
        password,
        '--directory',
        tmp,
        '--config',
        'false',
        '--salt',
        SALT,
        '--remember',
        '30',
        '--short',
        '--template-title',
        title,
        '--template-instructions',
        INSTRUCTIONS,
        '--template-button',
        'Open',
        '--template-placeholder',
        'Password',
        '--template-error',
        'That is not the password.',
        '--template-color-primary',
        '#6d28d9',
        '--template-color-secondary',
        '#f1eefd',
      ],
      { stdio: ['ignore', 'pipe', 'inherit'] },
    )
    // staticrypt writes <directory>/<basename of the input>.
    const produced = [join(tmp, basename(file)), join(tmp, relative(OUT, file))].find((f) => existsSync(f))
    if (!produced) {
      console.error(`encrypt-work: staticrypt wrote nothing for ${relative(ROOT, file)}`)
      process.exit(1)
    }
    renameSync(produced, file)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }

  const encrypted = readFileSync(file, 'utf8')
  for (const needle of mustNotRemain) {
    if (encrypted.includes(needle)) {
      console.error(`encrypt-work: "${needle}" is still readable in ${relative(ROOT, file)} after encryption`)
      process.exit(1)
    }
  }
  if (!encrypted.includes(INSTRUCTIONS)) {
    console.error(`encrypt-work: the locked view of ${relative(ROOT, file)} is missing its instructions line`)
    process.exit(1)
  }
  bodies.push(...mustNotRemain)
  console.log(`encrypt-work: /work/${slug} encrypted (${relative(ROOT, file)})`)
}

// The static export also writes the page as plain-text React payloads
// (out/work/<slug>.txt and out/work/<slug>/__next*.txt) for client-side
// navigation. They would carry the whole page past the password, so they
// go; the client then falls back to a full load of the encrypted page.
let removed = 0
for (const file of walk(join(OUT, 'work'))) {
  if (file.endsWith('.txt')) {
    rmSync(file)
    removed++
  }
}
console.log(`encrypt-work: removed ${removed} plain-text payload file${removed === 1 ? '' : 's'} under out/work`)

// Last: nothing from a case study body may remain anywhere in out/.
const leaks = []
for (const file of walk(OUT)) {
  if (!/\.(html|txt|js|json|css|xml)$/.test(file)) continue
  const text = readFileSync(file, 'utf8')
  for (const needle of bodies) {
    if (needle.length > 12 && text.includes(needle)) leaks.push(`${relative(ROOT, file)}: "${needle}"`)
  }
}
if (leaks.length) {
  console.error('encrypt-work: case study text is still readable in the build output:')
  for (const l of leaks) console.error(`  - ${l}`)
  process.exit(1)
}
console.log('encrypt-work: ok, no case study text left in the clear')

function walk(dir) {
  const files = []
  if (!existsSync(dir)) return files
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) files.push(...walk(p))
    else files.push(p)
  }
  return files
}

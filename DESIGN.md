---
name: Kanchi Bhawalkar portfolio
description: A product design leader's portfolio for data platforms and AI agents, written and drawn like an engineer's notebook.
colors:
  notebook-ink: "#141414"
  graphite: "#5f5f5b"
  paper: "#ffffff"
  margin-grey: "#f5f5f5"
  rule-line: "#e5e5e5"
  ledger-blue: "#1f4a8a"
  sky-wash: "#dfeafe"
  sky-wash-far: "#e8f1ff"
  band-blue: "#eff5ff"
  track-amber: "#b4531a"
  track-teal: "#157f5f"
typography:
  display:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 8vw, 6.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Mulish, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.09em"
  graph-node:
    fontFamily: "Mulish, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.15
  graph-label:
    fontFamily: "Mulish, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
  graph-caption:
    fontFamily: "Mulish, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  screenshot: "8px"
  panel: "12px"
  table: "14px"
  card: "18px"
  pill: "9999px"
spacing:
  gutter-phone: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "56px"
  card-gap: "32px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.notebook-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  tab-selected:
    backgroundColor: "{colors.ledger-blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "48px"
  tab:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.pill}"
    height: "48px"
  work-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "16px"
  pill-role:
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: Kanchi Bhawalkar portfolio

## Overview

**Creative North Star: "The Engineer's Notebook"**

A calm white page with one deep-blue ink, where the evidence is the real work: product screenshots and prototype clips, sourced figures, plain headings. It reads like the notebook of a designer who used to be an engineer, precise and quiet, with nothing on the page that is not doing a job.

Density is comfortable, not airy: full-width text, generous section breaks, and tight groups inside them. Her headshot in the hero, framed with an 18px radius and the soft shadow, is the one personal mark; everything else is set in the same restrained voice so the work carries the page.

**Key Characteristics:**
- White ground with a soft blue wash across the top of the viewport, never a flat tint.
- One accent, ledger blue, for links, the heading dot, selected tabs and figures.
- White cards held off the white ground by soft shadow, not borders.
- Screenshots framed on panels tinted with the prototype's own colour.
- Text spans its column end to end; no reading-measure caps.

## Colors

One ink, one accent, and greys; colour beyond that comes from the products shown.

### Primary
- **Ledger Blue** (#1f4a8a): links, the heading dot, selected tabs, focus rings, Leadership figures and the case-study link. Used sparingly so it always means "this is the thing to act on or read".

### Neutral
- **Notebook Ink** (#141414): headings, body copy, the primary button fill.
- **Graphite** (#5f5f5b): secondary copy, notes under facts, card descriptions. Passes AA on white.
- **Paper** (#ffffff): the ground and every card.
- **Margin Grey** (#f5f5f5): panels nested inside a card, hover fills.
- **Rule Line** (#e5e5e5): row dividers, the footer rule, outline-button rings.
- **Sky Wash** (#dfeafe) and **Sky Wash Far** (#e8f1ff): the two radial blooms across the top of the viewport, on a fixed layer.
- **Band Blue** (#eff5ff): the full-bleed band behind the Leadership section.

### Tertiary (product tints)
- Work-card and case-page panels take the prototype's own colour: Search 2.0 blue (#1c5ca0), platform blue (#006bbe), 605 purple (#8745c6), data-discovery teal (#008481), neutral grey (#6b7280) for Cursor and other greyscale tools. Track colours Amber (#b4531a) and Teal (#157f5f) mark work types on the timeline.

**The One Ink Rule.** Ledger blue is the only accent the page itself owns. Any other colour on screen belongs to a product being shown.

**The Wash-Is-A-Gradient Rule.** The blue wash is always two soft radial blooms on a fixed layer; a flat tinted ground is never used. `body` carries no background, or it hides the wash.

## Typography

**Display Font:** League Spartan (with system-ui)
**Body Font:** Mulish (with system-ui)
**Label/Mono Font:** IBM Plex Mono, for small uppercase labels and dates only

**Character:** a geometric, slightly condensed heading face over a soft, open body face; the mono appears only where the content is data (dates, periods, labels).

### Hierarchy
- **Display** (800, clamp(3.25rem, 8vw, 6.75rem), 0.95): the name in the hero, nowhere else.
- **Headline** (600, 2.25rem to 2.375rem, 1.1): section headings, followed by the heading dot.
- **Title** (600, 1.5rem to 1.875rem, 1.25): case-card titles, footer-scale headings step up to clamp(2rem, 4.4vw, 3.25rem) at 700.
- **Body** (400, 18 to 19px, 1.65): hero and Leadership paragraphs; 16px for card descriptions and rows.
- **Label** (500, 11px, 0.09em, uppercase): org and period on cards, column labels in tabs.

**The Two Faces Rule.** League Spartan and Mulish carry everything; Plex Mono is a label face, never a voice. No new fonts without asking.

**The End-To-End Rule.** No heading or paragraph gets a max-width or `text-balance`; text runs the full width of its column.

## Layout

A single centred column, `max-width: 72rem`, with 24px gutters on phones, 40px from 768px and 56px from 1024px. The homepage runs: the pinned split hero (left: name, title, then the intro and buttons blurring in as the name rises and shrinks; right: the headshot on an offset ledger-blue block; the ground is white under the text and fades to a pale blue with a 30px dot grid from the middle toward the right (`.hero-ground`); the name and title sit in a lineage-node card (22px radius, card fill, hairline ring, role as a meta row under a hairline) spanning the column; the intro is one plain style, with no emphasised phrases; on desktop a 1.75px ledger-blue thread runs from a port on the card's right edge to the photo (straight, or one 14px-radius elbow on a grid column), settles to 40% opacity, and carries a packet every 7s that rings the end node on arrival, 28px corners; phones stack the panel on top, still), Design work (one run of full-width cards, 32px apart), the talks row, Management as a left-to-right lineage (one root box, Intuit data platform → the seven areas → what changed) on a dotted full-bleed band and the contact footer. Sections sit about 80px apart; groups inside them 24 to 32px. Breakpoints: 640px (`sm`), 768px (`md`), 1024px (`lg`).

## Elevation & Depth

White on white, separated by shadow. Cards rest on the page, they are not lifted off it.

### Shadow Vocabulary
- **Soft** (`0 1px 2px rgb(23 21 28 / 0.04), 0 14px 34px -18px rgb(23 21 28 / 0.16)`): every resting card and the facts tables on case pages.
- **Float** (`0 20px 40px -22px rgb(23 21 28 / 0.28)`): the floating nav pill and its menu.
- **CTA** (`0 18px 30px -16px rgb(23 21 28 / 0.55)`, hover `0 22px 38px -14px … / 0.6`): the dark primary buttons.
- **Screenshot** (`0 24px 48px -16px rgb(20 20 20 / 0.28)` plus a 1px ink ring at 10%): the framed product window on a card's tinted panel.

**The No-Border Card Rule.** Cards never carry a border; the soft shadow alone holds them off the ground. (A shadow token is never named `--shadow-card`: it collides with `--color-card`.)

## Shapes

Gently rounded throughout: cards 18px, the tinted thumbnail panel inside a card 12px, case-page facts tables 14px, the framed screenshot 8px. Buttons, tabs, role tags and the nav are full pills.

## Components

### Buttons
- **Shape:** full pill, at least 44px tall, 20px side padding, 14px semibold Mulish.
- **Primary:** notebook ink fill, white text, CTA shadow; hover deepens the shadow; active scales to 0.98.
- **Outline:** paper fill with a 1px rule-line ring; hover fills margin grey and darkens the ring.
- **Arrows:** ↓ for in-page jumps, ↗ plus a screen-reader "(opens in a new tab)" for outside links.

### Cards (work cards)
- **Corner Style:** 18px.
- **Background:** paper, soft shadow, 16px inner padding.
- **Layout:** the tinted thumbnail panel (prototype colour gradient) takes about 55% on desktop with the framed screenshot or muted clip inside; text beside it: org and period label, role pill, title, one line, one figure in the prototype colour, "Read the case study →".
- **Hover:** the framed screenshot lifts 6px.

### Lineage graph (Management)
- Four stages read left to right: Me → The platform → The seven areas → What changed. White pills (16px corners, soft shadow) for me and the platform; the seven areas as one 3×3 block of quiet flat chips; the wins as the destination column, ledger-blue figures at 20px. Smooth curves in pale ledger blue; only sourced links are drawn. At rest one packet walks a path to each win in turn; hovering, focusing or clicking a box traces its upstream and downstream. Column labels replace a legend. Phones stack the stages without lines; reduced motion keeps it still.

### Navigation
- A floating pill fixed at the top: name in semibold, links in graphite turning ink on hover, 80% paper with backdrop blur and the float shadow. On phones everything folds into one Menu.

### Rows
- Experience and Leadership rows: a 1px rule line on top, text left, the note or date right (mono for dates).

## Do's and Don'ts

### Do:
- **Do** frame real product screenshots on a panel tinted with that product's own colour.
- **Do** keep one figure per card, sourced, set in the prototype's colour.
- **Do** tag every link, button and card with its analytics event (CLAUDE.md).
- **Do** keep 44px touch targets and the single 2px ledger-blue focus ring.

### Don't:
- **Don't** add borders to cards or a coloured left border to anything.
- **Don't** use a flat tinted page ground; the wash is a gradient.
- **Don't** cap text width or balance headings.
- **Don't** put a facts table of icon-and-label columns on the homepage (removed 11 Nov 2026).
- **Don't** use em-dashes in copy, eyebrows above headings, or emoji as icons.

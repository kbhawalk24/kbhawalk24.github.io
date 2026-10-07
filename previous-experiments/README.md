# Previous experiments

Code kept out of the build for reference. Nothing in this folder is imported;
`tsconfig.json` and `vitest.config.mts` exclude it.

## Home layouts A and B (removed 2026-10-01, layout C kept)

The home page had an A / B / C switch in the header (`layout-mode.tsx`,
URL `?layout=` and localStorage). C won and is now the only layout.

- `layout-mode.tsx`: the provider and the A / B / C switch.
- `career-timeline.tsx`: the full component with all three variants.
  - A (`variant="timeline"`): roles as rows, each with a featured case-study
    card (image, stat pill, white panel) and a carousel of the remaining
    highlights (`FeaturedEntryCard`, `CarouselEntryCard`, `EntryCarousel`).
  - B (`variant="experience"`): roles as rows, each highlight as a badged
    block with headline, detail, and inline stats (`HighlightList`).
  - C (`variant="experience-rows"`): what shipped.
- `site-header.tsx`: header with the switch and layout-dependent links.
- `page.tsx`: `HomeBody` picking the layout.
- `home-layout.test.tsx`: tests for the switch and the three layouts.

## Case-study card, style 2 (removed 2026-10-06)

`case-study-index-two-styles.tsx` is the index with a 1 / 2 switch in the
section header. Style 2 puts the claim and stats on top and the cover in a
browser frame at the full card width, bleeding off the card's bottom edge,
built for a large screenshot or a short muted loop. Style 1 shipped; bring
style 2 back once covers exist (2300×1150 WebP or 1080p MP4 with a poster).

## Hero variants

- `hero-one-beat.tsx`: the hero without scroll choreography (name, scope
  sentence, expertise line, buttons, illustration held on the right).
  Commit `42a666f`.
- `overview.tsx`: the separate Overview section (headline with the domain
  nouns in the accent, paragraph with the numbers bold) that sat under the
  one-beat hero. Commit `8cb5411`.

The shipped hero is the original two-beat scroll choreography with the
scope sentence as the about text (commit `2a0cefa`).

## Also tried and dropped (no code kept)

- IC / Manager lens switch in the header (`76e026a` removed it; the lens
  plumbing in `components/lens.tsx` is still in the tree, inert).
- A cursor-following butterfly and a lion that ate it (`631c9fe`, `8f59113`,
  removed in `d2264ba`).

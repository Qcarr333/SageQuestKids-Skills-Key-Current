# Skills Game Content/Data Strategy

Purpose: guide future game redesign agents so Skills games can grow beyond
small hardcoded prototypes and later move to Supabase or another internal
content database. This is strategy only; no backend tables or content loading
are being implemented now.

## 1. Problem Statement

Several current games are functional prototypes but have limited content depth.
For example, Memory Match may only have one or very small card sets for some
grades. Other games may have limited word, puzzle, target, or prompt banks.

Future redesign should avoid hardcoding tiny content sets directly into game
components. Content should be rich enough for repeat play, grade progression,
QA coverage, and future localization.

## 2. Local-First, Database-Ready Approach

- Local TypeScript content banks are acceptable during build/redesign.
- Content should be separated from UI and game loop logic.
- Content should be structured so it can later move to Supabase or another
  internal content database.
- No Supabase tables are being created now.
- No backend content loading is being implemented now.

Checkpoint 12A adds the first shared local content-bank skeleton under
`/lib/skills/content`. It is intentionally small and local-only. It does not
replace game-specific layout/task banks yet and is not wired into live gameplay.
The purpose is to establish reusable content item types, selector helpers,
randomization helpers, and a Memory Match adapter that future checkpoints can
connect safely.

## 3. Recommended Content Bank Shape

Conceptual fields for future content banks:

- `contentId`
- `moduleId`
- `gameKey`
- `gradeLevel`
- `difficulty`
- `skillCategory`
- `locale`
- `prompt`
- `answer`
- `options`
- `pairs`
- `tags`
- `contentType`
- `estimatedDuration`
- `isActive`
- `metadata`

Do not implement this shape in code until a content architecture checkpoint is
explicitly scoped.

## 4. Game-Specific Content Examples

- Memory Match: card/pair banks by grade, difficulty, category, and locale.
- Word Builder Farm: word banks, spelling patterns, and vocabulary categories.
- Galaxy Click Command: grammar/category target banks and distractors.
- Math Key Quest: math problem banks and generated variants.
- Cipher Quest: puzzle banks and hint banks.
- Story Sort: sequence/story event banks.
- Drag/drop games: sortable item banks and placement rules.
- Pointer/click games: target/distractor banks.
- Typing games: prompt banks and keyboard skill categories.

## 5. Randomization Rules

Future games should support:

- randomized selection from approved content pools
- grade/difficulty filters
- avoiding immediate repeats
- deterministic test seeds for QA
- safe fallback content
- no randomization that breaks educational alignment

For normal Skills Hub gameplay, selection should use unseeded random content
selection unless a specific stable mode is approved. Memory Match should treat
pair selection and card placement as two separate randomization steps:

- select pairs from the filtered content pool
- convert selected pairs into cards
- shuffle card positions separately

Seeded deterministic behavior is for QA/debugging and future stable assignment
practice only. Assignment dashboard behavior, assignment UI, and backend
assignment persistence are not implemented here.

## 6. Translation/Localization Readiness

- Keep display text separate from game logic.
- Support `locale` fields, even if only English exists now.
- Avoid embedding labels inside scoring logic.
- Content should eventually support Spanish or other language expansion if
  product scope requires.

## 7. Future Supabase/Internal Database Readiness

Future, not current, needs:

- content tables or an internal content repository
- versioned content
- active/inactive content flags
- grade/difficulty indexes
- locale indexes
- teacher/parent assignability later
- privacy-safe analytics connected to content IDs, not raw child input

## 8. Game Build Packet Impact

Every future game build packet must include:

- current content files
- content expansion requirements
- minimum content volume by grade/difficulty
- randomization rules
- localization notes
- future Supabase/internal DB mapping notes
- whether the content can be authored by admins or teachers later

Checkpoint 12A content packet note:

- Shared seed content lives in `/lib/skills/content`.
- New records are picked up by exporting them through the subject bank and
  `/lib/skills/content/index.ts`.
- Standard Memory Match gameplay should eventually use unseeded pair selection
  plus separate card-position shuffling.
- Future assignment mode may use a stable seed/config, for example Math
  Addition + Value 8s + Card Count 16 + Due Date Friday, but that is only a
  design constraint right now.

Checkpoint 12B Memory Match config note:

- Memory Match category config lives in
  `/lib/skills/content/memory-match/memoryMatchCategories.ts`.
- Local deck preview lives in
  `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`.
- The preview layer maps game-facing categories to shared content filters, then
  selects pairs and shuffles card positions separately.
- It is not wired into `/gaming/memory-match` yet.
- Standard gameplay previews default to unseeded selection/shuffle.
- Seeded preview is available only when a seed is passed for QA/debugging and
  future stable assignment behavior.
- Beginning sound categories are marked guided/future-sensitive because future
  rules should avoid duplicate beginning sounds in the same round.

Checkpoint 12C Memory Match wiring note:

- Live `/gaming/memory-match` standard gameplay now starts rounds from the local
  Memory Match deck preview layer.
- Standard gameplay does not pass a seed; pair selection and card-position
  shuffling are unseeded for normal Skills Hub play.
- Runtime preview metadata includes selected category, requested/resolved card
  count, available/selected pair count, pair selection mode, card shuffle mode,
  and concise content IDs.
- Assignment mode remains future-only. No assignment dashboard behavior,
  assignment backend, Supabase writes, or route migration was added.
- Current seed banks are intentionally small, so requested card counts may exceed
  available pairs until a content expansion checkpoint adds more records.

Checkpoint 12D QA note:

- Memory Match shared-content wiring was QA-tested after live integration.
- Standard gameplay still uses unseeded pair selection and separate card-position
  shuffling.
- Assignment mode remains future-only.
- Current seed content is intentionally small; larger content pools are required
  before final game polish.
- Current QA uses End Round to force summary and preview payload validation.
  Future learner-facing polish should support automatic completion when all
  Memory Match pairs are matched, while keeping End Round as an early-exit
  option.

Checkpoint 12E content expansion note:

- Kindergarten uppercase/lowercase now has the full A-Z local shared content
  set.
- Kindergarten picture/word now has a 20-record starter vocabulary set.
- Kindergarten beginning sound now has a 12-record guided/future-sensitive
  starter set with unique beginning letters.
- 2nd grade math addition now has 19 local records: 13 focus-8 facts and 6
  non-8 starter facts.
- Existing Memory Match card-count options are fully supported by available
  pairs for the current category configs.
- Content remains local-first and database-ready; no backend content loading,
  Supabase tables, assignment behavior, route migration, or UI redesign was
  added.

Checkpoint 12F post-expansion QA note:

- Memory Match content expansion was QA-tested through the live standard-game
  route.
- Exposed standard categories `k-uppercase-lowercase`, `k-picture-word`, and
  `2nd-math-addition` each produced playable 10, 12, 16, and 20-card boards.
- `k-beginning-sound` and `2nd-math-addition-8s` remain non-standard UI modes
  by category config, but their shared content pools support the current
  card-count options through the deck-preview layer.
- Standard gameplay still uses unseeded pair selection and separate
  card-position shuffling.
- Assignment mode remains future-only.
- Future learner-facing polish should add automatic completion when all pairs
  are matched.
- Future visual polish should make the board more mobile-friendly and
  child-friendly.

Checkpoint 12G learner-flow note:

- Memory Match now supports natural auto-completion when all active pairs are
  matched.
- End Round remains available as a manual early-exit option before all pairs are
  matched.
- Runtime preview works for both `auto_complete` and `manual_end` completion
  paths.
- No backend/API/Supabase/dashboard/route/assignment behavior or content
  expansion was added.
- Future visual polish should still make the board more mobile-friendly and
  child-friendly.

Checkpoint 12H visual/mobile presentation note:

- Memory Match received learner-facing board presentation polish after shared
  content wiring and natural auto-complete were in place.
- The setup panel, progress strip, responsive board grid, and card states were
  refined for desktop, tablet, and mobile-sized screens.
- Cards now have larger touch targets, clearer face-down/revealed/matched
  states, visible focus styling, ARIA state, and reduced-motion-safe transition
  behavior.
- Shared content selection, unseeded pair selection, separate card-position
  shuffling, auto-complete, manual End Round, and local runtime preview behavior
  were preserved.
- No new content records, assignment behavior, backend/API/Supabase/dashboard
  work, or route migration was added.

Checkpoint 12H.1 asset-driven polish note:

- Memory Match visual polish was aligned more closely to the active
  `/assets/skills/memory-match` package.
- The live game uses the real `background.png` classroom tabletop treatment.
- `sprite-sheet.png`, `ui-state-sheet.png`, `animation-notes.md`,
  `sound-notes.md`, `asset-manifest.md`, and `reference/README.md` were used as
  design references for card backs, card faces, matched state, panel treatment,
  and reduced-motion-safe visual behavior.
- The sprite sheet was not sliced because no formal atlas metadata exists; card
  states are CSS-driven and responsive.
- Shared content, normal unseeded randomization, auto-completion, manual early
  exit, and local runtime preview behavior were preserved.
- Content expansion remains deferred to 12I. Assignment mode remains
  future-only.

Checkpoint 12I content expansion note:

- Memory Match shared local content received a second expansion batch.
- Kindergarten picture/word expanded to 40 total concrete early-reader noun
  records.
- Kindergarten beginning sound expanded to 20 total clear letter/sound examples
  and remains guided/future-sensitive.
- 2nd grade addition expanded to 40 total addition records, with 13 focus-8
  facts preserved for the existing focus category.
- Science and social studies starter term-definition banks expanded to 12
  records each for future category growth, but no standard Memory Match category
  config was added for them in this checkpoint.
- All new records remain local-first and database-ready, export through the
  subject content banks, and are picked up by `/lib/skills/content/index.ts`.
- No UI, runtime, randomization, backend, Supabase, dashboard, route, or
  assignment behavior changed.

Checkpoint 12J final content + visual QA note:

- Memory Match passed final content and visual QA after content expansion,
  natural auto-complete, and asset-driven board polish.
- Content QA confirmed 150 shared records, no duplicate content IDs, and no
  duplicate exact math equations.
- Current standard categories remain stable and support 10, 12, 16, and 20-card
  boards.
- Science and social studies starter records are present as future
  category-ready pools, but they are not exposed as standard Memory Match UI
  categories.
- Live QA confirmed desktop/mobile ready states, 10-card and 20-card boards,
  card flipping, matching, manual early exit, natural auto-complete, runtime
  preview metadata, unseeded randomization, and no backend/API/Supabase/REST
  traffic.
- Assignment mode remains future-only. No backend/API/Supabase/dashboard/route
  behavior was added.

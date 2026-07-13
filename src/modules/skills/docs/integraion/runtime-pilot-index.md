# Skills Runtime Pilot Index

Purpose: compact navigation for future Codex sessions and local development
agents. This is not the full integration contract and not a long handoff.

## Where To Look

- Technical runtime guide: `/lib/skills/runtime/README.md`
- Portable route/mobile strategy: `/docs/skills-games/integration/portable-skills-module-strategy.md`
- Content/data strategy: `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- Game build packet template: `/docs/skills-games/integration/game-build-packet-template.md`
- Full implementation log: `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
- Long-term Supabase/API/dashboard contract: `/docs/skills-games/integration/Skills_Module_Integration_Contract.md`
- Pilot examples:
  - `/components/gaming/word-builder-farm/WordBuilderFarmGame.tsx`
  - `/components/gaming/memory-match/MemoryMatchGame.tsx`
  - `/components/gaming/galaxy-click-command/GalaxyClickCommandGame.tsx`
  - `/components/gaming/math-key-quest/MathKeyQuestGame.tsx`
  - `/components/gaming/code-keys-workshop/CodeKeysWorkshopGame.tsx`
  - `/components/gaming/target-tracker/TargetTrackerGame.tsx`
  - `/components/gaming/bug-trail-maze/BugTrailMazeGame.tsx`

## Completed Checkpoints

- 1: Skills runtime registry and local preview adapter.
- 2: Shared runtime shell pilot for Word Builder Farm.
- 3: Healthy Play and accessibility plumbing for Word Builder Farm.
- 4: Development-only local runtime debug panel.
- 5: Memory Match second pilot.
- 6: Shared runtime hardening and next-game checklist.
- 7: Galaxy Click Command third pilot.
- 8: Three-pilot QA pass.
- 9A: Compact runtime pilot index.
- 9B: Healthy Play persistence TypeScript blocker fix.
- 9C: Clean validation pass and documentation update.
- 10A: Git and validation baseline record.
- 10B: Non-interactive ESLint CLI lint gate.
- 10C: Portable Skills module route/mobile strategy.
- 10D: Skills game content/data architecture plan.
- 10E: Reusable game build packet template.
- 11A: Math Key Quest fourth local runtime pilot.
- 11C: Code Keys Workshop local runtime pilot.
- 11D: Target Tracker Adventure local runtime pilot.
- 11E: Bug Trail Maze local runtime pilot.
- 11F: Seven-pilot QA and runtime rollout status update.
- 12A: Shared Skills content-bank skeleton and selector randomization tests.
- 12B: Memory Match content category config and local deck preview helper.
- 12C: Live Memory Match standard gameplay wired to shared local content deck
  preview.
- 12D: Memory Match shared-content QA and status pass.
- 12E: Memory Match small shared local content expansion packet.
- 12F: Memory Match post-expansion QA and status pass.
- 12G: Memory Match natural auto-complete and manual early-exit behavior.
- 12H: Memory Match responsive visual/mobile board presentation polish.
- 12H.1: Memory Match asset-driven visual polish fix.
- 12I: Memory Match shared local content expansion batch 2.
- 12J: Memory Match final content and visual QA status pass.
- 12K: Portable Skills module transfer scaffold.
- 12L: Stable Memory Match copied into the portable Skills module package.
- 12M: `/skills/memory-match` thin route wrapper wired to the portable package.
- 12M.1: Memory Match post-route product polish fixes for category exposure,
  picture/word card rendering, temporary hint peek behavior, and motion toggle
  verification.
- 12M.2: Memory Match K-5 category coverage, final picture-card cleanup, and
  portable admin content guide.
- 12M.3: Memory Match optional looping `Piano-chill.mp3` background music and
  player-facing hide of future assignment Addition 8s category.

## Current Baseline

- Branch: `skills_Phase3_runtime_rollout_and_game_packets`.
- Remote tracking: confirm before push.
- Post-10E packet baseline is the starting point for Phase 3 runtime rollout.
- Recommendation: push/keep this baseline before adding more runtime pilots or
  validation-gate changes.

## Current Pilots

- Word Builder Farm: proves typing/keyboard runtime integration.
- Memory Match: proves card/memory runtime integration.
- Galaxy Click Command: proves click/pointer integration with aggregate telemetry.
- Math Key Quest: proves keyboard/input runtime integration for math-answer flow.
- Code Keys Workshop: proves keyboard/input runtime integration for coding-style
  pattern and command flow.
- Target Tracker Adventure: proves pointer/tracking integration with canonical
  alias handling for `/gaming/target-tracker`.
- Bug Trail Maze: proves pointer/path-following integration with aggregate path
  accuracy and item collection telemetry.

## Seven Pilot QA Status

Latest focused QA pass: Implementation Checkpoint 11F.

Verified local-only runtime pilots:

- `/gaming/word-builder-farm`
- `/gaming/memory-match`
- `/gaming/galaxy-click-command`
- `/gaming/math-key-quest`
- `/gaming/code-keys-workshop`
- `/gaming/target-tracker`
- `/gaming/bug-trail-maze`

All seven pilots were verified for route load, start, mute toggle state, reduced
motion toggle state, pause/resume, round completion, normal summary, hidden
debug panel before round end, development-only preview panel after round end,
expandable `roundResult`, `xpEvent`, `progress`, and `registryEntry`,
`previewOnly: true`, canonical `moduleId/gameKey`, `sessionId`, `roundId`,
sound/reduced-motion metadata, aggregate-only telemetry, console
`[skills-runtime-preview]`, and no `/api/skills`, Supabase, or `/rest/v1`
traffic. The QA pass also checked that runtime previews do not include raw
keystroke logs, raw pointer trails, raw click streams, raw coordinates, or raw
frame-by-frame movement arrays.

## Reusable Runtime Pattern

- Wrap game with `SkillsGameRuntimeShell`.
- Use `useSkillsGameRuntime()` inside the game body.
- Call `runtime.beginRound()`, `runtime.pauseRound()`,
  `runtime.resumeRound()`, and `runtime.endRound()` with existing game state.
- Use `runtime.createPreviewMetadata(...)` for shared local metadata.
- Use `runtime.createRoundResult(...)` for normalized round results.
- Use `runtime.createPayloadPreview(...)` for local XP/progress preview payloads.
- Render `SkillsRuntimeDebugPanel` only after round end in development mode.
- Preserve console preview with `logSkillPayloadPreview(...)`.

## Hard Rules

- Local-only.
- `previewOnly: true` only.
- No API routes, Supabase writes, dashboards, billing gates, or route migration.
- Current playable routes stay `/gaming/[game]` until route migration is
  explicitly scoped.
- Future route target is `/skills/[game]`.
- Debug panel must stay guarded by `process.env.NODE_ENV !== 'production'`.
- Store aggregate telemetry only; no raw pointer trails or raw click streams.
- Do not re-enable `SessionTracker` until the Healthy Play update loop is fixed.

## Known Non-Blockers

- Audible sound playback is not implemented yet.
- Galaxy Click Command targets do not move in the initial build, so Slower Mode
  has no visible movement effect yet.
- Galaxy Click Command Larger Targets works visibly.
- `SessionTracker` is intentionally deferred.
- `npm run lint` runs non-interactively through ESLint CLI and currently passes
  with warnings.

## Validation Status

- `cmd /c npx tsc --noEmit --pretty false` passes.
- `cmd /c npm run build` passes.
- `cmd /c npm run lint` passes non-interactively with existing warnings.

## Shared Content Foundation

Checkpoint 12A adds a local-first, database-ready content skeleton under
`/lib/skills/content`.

- Shared types: `/lib/skills/content/types.ts`
- Subject seed banks: math, literacy, science, and social studies
- Selectors: `/lib/skills/content/selectors/contentFilters.ts`
- Randomization: `/lib/skills/content/selectors/randomization.ts`
- Memory Match adapter:
  `/lib/skills/content/adapters/memoryMatchContentAdapter.ts`
- Lightweight validation preview:
  `/lib/skills/content/selectors/contentSelectionPreview.ts`

The content layer is not wired into live gameplay yet. It is intended to support
future Memory Match standard Skills Hub gameplay and future assignment-driven
practice. Normal gameplay should use unseeded pair selection and separate card
position shuffling; seeded selection is reserved for QA/debugging and future
stable assignment behavior.

Checkpoint 12B adds Memory Match-specific category and deck-preview helpers:

- Category config:
  `/lib/skills/content/memory-match/memoryMatchCategories.ts`
- Deck preview:
  `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`
- Barrel export:
  `/lib/skills/content/memory-match/index.ts`

The preview helper accepts a `categoryId`, requested card count, and optional
seed. It filters shared content, maps card count to pair count, selects pairs,
converts pairs to cards, and shuffles card positions separately from pair
selection. It remains local-only and is not connected to live Memory Match
gameplay.

Checkpoint 12C wires `/gaming/memory-match` standard gameplay to the local deck
preview layer. The live game now uses category/card-count config, unseeded pair
selection, and separate unseeded card-position shuffling. Assignment mode remains
future-only, and no backend/API/Supabase/dashboard/route behavior was added.

Checkpoint 12D QA confirms the shared-content Memory Match path loads, exposes
category and card-count selectors, starts from shared content, preserves matching
and round summary behavior, emits the local runtime preview with deck metadata,
and makes no backend/API/Supabase/REST requests. Randomization QA confirmed five
normal starts with the same category/card count produced five unique board
orders. Future polish should add natural auto-completion when all pairs are
matched; current QA still uses End Round to force summary/preview validation.

Checkpoint 12E expands the shared local content pools for existing Memory Match
categories:

- `k-uppercase-lowercase`: 26 pairs, supports 10/12/16/20-card boards.
- `k-picture-word`: 20 pairs, supports 10/12/16/20-card boards.
- `k-beginning-sound`: 12 guided/future-sensitive pairs, supports
  10/12/16/20-card boards.
- `2nd-math-addition`: 19 pairs, supports 10/12/16/20-card boards.
- `2nd-math-addition-8s`: 13 focus-8 pairs, supports 10/12/16/20-card boards.

No assignment/dashboard/backend/route/runtime behavior changed.

Checkpoint 12F verifies the post-expansion Memory Match path. Live standard
gameplay categories `k-uppercase-lowercase`, `k-picture-word`, and
`2nd-math-addition` all produced playable 10, 12, 16, and 20-card boards.
Randomization still produced different board orders across starts, runtime
preview metadata remained intact, and no backend/API/Supabase/REST traffic was
observed. `k-beginning-sound` and `2nd-math-addition-8s` remain
guided/future-preview categories rather than standard UI categories, but their
eligible pools support the current card-count options.

Checkpoint 12G adds natural Memory Match completion. The game now completes
automatically when all active pairs are matched, while End Round remains a
manual early-exit option. Runtime previews include `completionType` with
`auto_complete` or `manual_end`, and the preview flow still logs exactly once
per completed round in focused QA. No backend/API/Supabase/dashboard/route or
assignment behavior was added.

Checkpoint 12H polishes the Memory Match learner-facing board presentation.
The ready state now uses a cleaner setup panel, the active round shows progress
and board context, and cards use a responsive two-to-five-column grid with
larger tap targets, visible focus states, ARIA state, clearer face-down,
revealed, and matched visuals, and reduced-motion-safe transitions. Shared
content wiring, unseeded randomization, natural auto-complete, manual End
Round, local runtime preview, and `/gaming/memory-match` routing were preserved.
No content expansion, backend/API/Supabase/dashboard/route migration, or
assignment behavior was added.

Checkpoint 12H.1 tightens the Memory Match visual layer against the available
`/assets/skills/memory-match` direction. The game now uses the real classroom
tabletop `background.png`, and the card/panel CSS mirrors the active asset
package guidance: rounded educational cards, blue star card backs, cream
revealed faces, lime matched state, soft classroom panels, and clean mobile
spacing. The sprite and UI state sheets were used as visual references only; no
sprite slicing or new asset paths were introduced. Shared content,
randomization, auto-complete, manual early exit, runtime preview, and current
route behavior were preserved. Content expansion remains deferred to 12I, and
assignment mode remains future-only.

Checkpoint 12I expands shared local Memory Match content without changing live
game behavior. Kindergarten picture/word now has 40 records, Kindergarten
beginning sound has 20 guided/future-sensitive records, 2nd grade addition has
40 records, focus-8 addition remains at 13 records, and science/social studies
starter term-definition banks each have 12 records for future category growth.
Memory Match category config was not changed; standard UI categories remain the
same. The expansion is local-first, database-ready, and still picked up through
the shared content index.

Checkpoint 12J verifies Memory Match as stable after shared content expansion,
natural auto-complete, and asset-driven visual polish. Content QA confirmed 150
shared records, no duplicate content IDs, no duplicate exact math equations, and
current standard categories supporting 10, 12, 16, and 20-card boards. Live QA
confirmed desktop/mobile ready states, 10-card and 20-card boards, card flips,
manual End Round, auto-complete, development-only runtime preview metadata,
unseeded randomization, and no backend/API/Supabase/REST traffic. Science and
social studies pools are present for future category work but are not exposed as
standard Memory Match UI categories.

Checkpoint 12K creates the portable Skills module transfer scaffold at
`/skills/src/modules/skills`. This package is intended to map into the main
project as `src/modules/skills/*`, while shared platform services remain under
`src/core/*`. The scaffold is structure/documentation only: current live code,
imports, `/gaming/memory-match`, runtime behavior, content, UI, API/Supabase,
dashboard, and assignment behavior were not changed. See `/skills/README.md`
for the transfer and route-wrapper strategy.

Checkpoint 12L copies the stable Memory Match module surface into the portable
package without changing live imports or routes. The package now mirrors:

- `/components/gaming/memory-match`
  -> `/skills/src/modules/skills/components/games/memory-match`
- `/components/skills/runtime`
  -> `/skills/src/modules/skills/components/runtime`
- `/lib/skills/runtime`
  -> `/skills/src/modules/skills/lib/runtime`
- `/lib/skills/content`
  -> `/skills/src/modules/skills/lib/content`
- `/assets/skills`
  -> `/skills/src/modules/skills/assets`
- `/docs/skills-games/integration`
  -> `/skills/src/modules/skills/docs/integration`

The live app still uses the original working files and `/gaming/memory-match`
remains the active route.

Checkpoint 12M adds `/app/skills/memory-match/page.tsx` as a thin root app
wrapper importing Memory Match from the portable package at
`/skills/src/modules/skills/components/games/memory-match`. The canonical
Memory Match registry route now points to `/skills/memory-match`, while
`/gaming/memory-match` remains available as a temporary compatibility route.
No backend/API/Supabase/dashboard/assignment behavior was added.

Checkpoint 12M.1 fixes learner-facing Memory Match polish on both
`/skills/memory-match` and `/gaming/memory-match`. The category selector now
includes the safe local category configs, picture/word prompt cards render as
visual clue tiles instead of text such as `door picture`, Hint Reveal is now a
temporary Hint Peek, and motion remains enabled by default with the existing
Reduce Motion toggle preserved. Sound playback remains deferred.

Checkpoint 12M.2 adds at least one safe visible Memory Match category path for
every grade K-5. It adds modest local-first content for 1st grade literacy
vocabulary, 3rd grade science terms, 4th grade social studies terms, and 5th
grade science terms. Picture/word cards now show only pictograms on the picture
side, with accessible labels preserved. The portable admin content guide lives
at `/skills/src/modules/skills/docs/memory-match-admin-content-guide.md`.

Checkpoint 12M.3 wires the provided
`/skills/src/modules/skills/assets/audio/Piano-chill.mp3` as optional looping
Memory Match background music. Music starts only after Start/unmute interaction,
respects Mute/Unmute, pauses on Pause, resumes on Resume when sound is enabled,
and stops on round end or unmount. Per-event sound effects remain future-only.
`2nd-math-addition-8s` remains in code/content for future assignment use but is
hidden from the normal player-facing category selector.

## Recommended Next Checkpoints

- 11: Continue additional runtime pilots using the game build packet template.
- 11B: Focused QA pass for Math Key Quest after local review.
- 11C: Continue runtime rollout with one approved target game, using the packet
  template and four-pilot pattern.
- 11F: Focused QA/status pass after Bug Trail Maze, or continue one
  approved runtime pilot with the packet template.
- 11G: Continue one approved runtime pilot with the packet template, or pause
  runtime rollout for a cleanup/merge checkpoint.
- 12B: Wire Memory Match to the shared content bank for standard Skills Hub
  gameplay only, preserving current runtime behavior and keeping assignment
  mode future-only.
- 12C: Wire live Memory Match standard gameplay to the local deck preview layer,
  using unseeded standard-game selection and separate card-position shuffling.
- 12D: Focused Memory Match content QA/status pass, then decide between a small
  content expansion checkpoint or a visual/mobile redesign packet.
- 12E: Memory Match content expansion packet, or 12E-alt Memory Match
  learner-experience polish packet, depending on priority.
- 12F: Focused Memory Match post-expansion QA/status pass, or begin a scoped
  learner-experience polish packet.
- 12G: Scoped Memory Match learner-experience polish, such as natural
  auto-completion and mobile-friendly board presentation, if approved.
- 12H: Focused Memory Match learner-flow QA/status pass, or begin mobile-friendly
  board presentation polish if explicitly approved.
- 12N: Portable package import-path review/migration-readiness audit, if
  explicitly approved, without removing the compatibility route.
- 13A: Move to the next approved game packet, or create an explicitly scoped
  Memory Match future category/config packet.
- Future content expansion planning for one approved game, with no backend work
  unless explicitly scoped.

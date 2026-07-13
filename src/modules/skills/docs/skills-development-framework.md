# Skills Development Framework

Purpose: turn the Memory Match checkpoint lessons into a repeatable process for
remaining Skills games. This framework is for planning and execution discipline;
it does not authorize route migration, backend work, assignment behavior, or
production release work by itself.

## 1. Purpose

Use this framework when revising one Skills game at a time. The goal is to keep
game work portable, local-first, testable, and easy to transfer into the main
Sage Quest Kids project under `src/modules/skills/*`.

Memory Match is the current reference implementation because it now proves:

- portable package copy under `skills/src/modules/skills`
- root `/skills/memory-match` route wrapper
- `/gaming/memory-match` compatibility route
- runtime preview and debug surface
- shared local content bank
- K-5 player-facing category coverage
- hidden `assignment_future` category support
- asset-driven visual polish
- mobile-friendly board presentation
- Hint Peek
- natural auto-complete and manual early exit
- optional user-initiated background music
- no API, Supabase, dashboard, or assignment behavior

## 2. Branching Guidance

Create a new branch for:

- a new game packet
- route migration
- shared runtime changes
- API, Supabase, or backend work
- release candidate work
- hotfix work

Usually stay on the current branch for:

- QA documentation
- same-game content expansion
- same-game visual polish
- minor same-checkpoint fixes

Keep branches narrow enough that a game can be reviewed without unrelated module
or platform changes mixed in.

## 3. Recommended Game Checkpoint Sequence

A streamlined sequence for the next games:

- A: Game packet review
- B: Portable scaffold and mapping check
- C: Runtime integration
- D: Gameplay stabilization
- E: Content/data architecture
- F: Asset-driven visual, mobile, and accessibility polish
- G: Route wrapper or migration, only if approved
- H: Final QA and status pass

The exact order may flex for a game that is already stable or already has strong
content, but the checkpoints should stay explicit.

## 4. Prompt Efficiency Rules

Work that can often be grouped:

- asset polish, mobile polish, and accessibility polish
- content expansion and validation documentation
- QA and documentation updates
- small same-game text/label fixes

Work that should stay separate:

- shared runtime changes
- route migration
- backend, API, or Supabase work
- assignment behavior
- auth or entitlement changes
- production release work
- audio-system work when new shared audio behavior is introduced

For audio, keep background music and per-event sound effects as separate scopes
unless a packet explicitly combines them.

## 5. Standard Runtime Integration Checklist

For a runtime-integrated game:

- confirm canonical `moduleId` and `gameKey`
- wrap with `SkillsGameRuntimeShell`
- call `useSkillsGameRuntime()` inside the game body
- call `beginRound`, `pauseRound`, `resumeRound`, and `endRound`
- use `createPreviewMetadata`
- use `createRoundResult`
- use `createPayloadPreview`
- render `SkillsRuntimeDebugPanel` only after round end in development
- preserve `logSkillPayloadPreview`
- keep `previewOnly: true`
- include `sessionId` and `roundId`
- include aggregate-only game metrics
- do not store raw keystrokes, raw pointer trails, raw coordinates, raw click
  streams, raw answer streams, or frame-by-frame movement arrays

## 6. Content Architecture Checklist

Content should be:

- outside UI and game loop logic where practical
- local-first and database-ready
- exported through shared content indexes
- keyed by unique `contentId`
- tagged with grade, difficulty, category, locale, and useful metadata
- safe for unseeded normal gameplay
- deterministic only for QA/debug or future assignment mode

Normal player-facing gameplay should use unseeded pair/content selection and
separate unseeded placement/shuffling. Seeded behavior should remain helper-only
unless an assignment packet explicitly scopes stable assigned decks.

Hidden future categories may use `mode: 'assignment_future'`. They should remain
available in content/config, but player-facing dropdowns should exclude them.

## 7. Category/Admin Checklist

Lessons from Memory Match:

- every visible grade should have at least one playable category
- player-facing dropdowns should hide `assignment_future` categories
- each visible category must have enough pairs/items for its allowed card counts
- category filters must still match exported content after edits
- picture/word categories should use visual clues, not visible `word picture`
  text
- avoid ambiguous categories where one prompt could match several answers
- keep K-2 content concrete and short
- admin docs should explain how to add and update content and categories

Before exposing a category, verify at least one playable board. Prefer verifying
all configured card counts.

## 8. Asset-Driven UI Checklist

Before visual polish:

- inspect the game asset folder
- read the manifest, reference README, animation notes, sound notes, and UI state
  notes when present
- use real background/assets when practical
- do not invent asset paths
- do not slice sprites unless atlas metadata exists
- prefer direct extracted assets when they are available
- keep game backgrounds visible instead of covering them with edge-to-edge
  panels
- make gameplay fit one desktop screen at 100% whenever practical
- request extracted assets or atlas coordinates when sprite/UI sheets cannot be
  safely used
- keep layout mobile-first
- keep touch targets large
- keep text readable at mobile widths
- respect reduced motion
- avoid hover-only critical interactions

The UI should feel child-friendly and credible, not like a developer prototype
and not so busy that it distracts from learning.

## 9. Audio Checklist

Audio assets must be supplied, not invented.

Use these rules:

- store shared audio under `skills/src/modules/skills/assets/audio` or the final
  `src/modules/skills/assets/audio` equivalent
- game-specific audio may live under the game asset folder if clearly scoped
- do not autoplay
- start only after user interaction
- respect mute and unmute
- pause or stop audio on pause, round end, and unmount
- visual feedback must remain independent of audio
- audio must never be required to understand gameplay
- background music and event sound effects should be separate checkpoints
- per-event sounds remain future-only unless explicitly scoped

## 10. Mobile QA Checklist

Check each polished game at:

- 320px
- 375px
- 768px
- 1024px
- 1280px and wider

Verify:

- route loads
- setup controls wrap cleanly
- core board/tool area does not overflow horizontally
- touch targets are usable
- text stays readable
- summary remains readable
- debug surfaces do not block learner flow in development

## 11. Network/API Safety Checklist

Unless explicitly scoped:

- no `/api/skills`
- no Supabase writes
- no `/rest/v1`
- no dashboards
- no assignment behavior
- no auth, billing, or entitlement changes
- no production XP awards

Use browser/network smoke checks for route work and runtime pilots.

## 12. Main-Project Transfer Checklist

Target mapping:

```text
/skills/src/modules/skills -> main-project/src/modules/skills
```

Root route wrappers live under:

```text
main-project/app/skills/[game]/page.tsx
```

Before transfer:

- review portable imports
- rewrite root app aliases that point to copied source locations
- decide which current shared dependencies become `src/core/*`
- keep Skills-owned runtime, content, assets, and game components under
  `src/modules/skills/*`
- keep platform services under `src/core/*`
- make adapter requirements explicit for progress, sound, Healthy Play, auth,
  analytics, and feature flags
- include module-local type declarations for non-code asset imports such as
  audio files when the module imports them directly
- add feature flags before release
- keep staging and production promotion separate
- verify route wrappers remain thin

Platform-level services should include auth, billing, entitlements, analytics,
permissions, feature flags, API clients, and release gates. The Skills module
should consume those through adapters or props once scoped.

First-two-build transfer baseline from 13Z:

- Memory Match and Word Builder Farm are both closed as learner-facing local
  Skills builds.
- Both are classified as transferable with required platform adapter stubs.
- Direct game imports should be module-local before a game is considered
  portable.
- Shared adapter requirements for progress, sound, and Healthy Play must be
  documented before transfer.
- A thin root route wrapper is still required for each game in the target app.

## 13. Definition Of Done

A game checkpoint is done when:

- lint passes with accepted warnings only
- build passes
- typecheck passes
- target route smoke test passes
- mobile/tablet/desktop smoke checks pass when UI was touched
- runtime preview works when runtime is in scope
- network safety checks pass
- docs are updated
- known limitations are recorded
- no scope creep was introduced

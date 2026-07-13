# Skills Games Integration Plan Notes

Last updated: 2026-05-25

Scope reminder:
- Skills games and shared Skills systems only.
- Treat `/app/gaming`, `/components/gaming`, and `/lib/gaming` as Skills module surfaces for this review.
- Do not migrate `/gaming` routes yet.
- Do not work on the landing page, four-module selector, Skills Hub visual redesign, dashboards, API routes, Supabase migrations, billing gates, or parent/teacher views.

## Checkpoint Status

| Checkpoint | Status | Notes |
|---|---|---|
| 0. Prompt and contract grounding | Complete | Reviewed integration plan prompt and integration contract before edits. |
| 1. Inventory and notes setup | Complete | Inventory captured below. No code changes made. |
| 2. Per-game readiness review | Complete | Per-game readiness captured below. No game code changed. |
| 3. Shared systems review | Complete | Shared-system readiness and adapter attachment points captured below. |
| 4. Integration contract alignment | Complete | Contract-only field mapping and canonical alias strategy captured below. |
| 5. Accessibility, Healthy Play, sound, animation pass | Complete | Cross-game accessibility, Healthy Play, sound, and animation gaps captured below. |
| 6. Final integration readiness plan | Complete | Final planning report and first safe implementation checkpoint recommendation captured below. |

## Completed Review Sections

- Read `/docs/skills-games/refinement-prompts/skills-games-integration-plan-prompt.md`.
- Read `/docs/skills-games/integration/Skills_Module_Integration_Contract.md`.
- Reviewed file inventory for:
  - `/docs/skills-games/initial-build-prompts`
  - `/docs/skills-games/refinement-prompts`
  - `/docs/skills-games/shared-systems`
  - `/assets/skills`
  - `/assets/skills/shared`
  - `/components/gaming`
  - `/app/gaming`
  - `/components/healthy-play`
  - `/lib/healthy-play`
  - `/lib/gaming`

## Files And Folders Reviewed

### Initial Build Prompts

Found 25 files:
- `Build-Gaming-Hub-Foundation.md`
- `Game-1-Typing-Meteor-Defense.md`
- `Game-2-Story-Sort-Drag-and-Drop.md`
- `Game-3-Target-Tracker-Adventure.md`
- `Game-4-Word-Builder-Farm.md`
- `Game-5-Math-Key-Quest.md`
- `Game-6-Bug-Trail-Maze.md`
- `Game-7-Rhythm-Row-Typing.md`
- `Game-8-Code-Keys-Workshop.md`
- `Game-9-Galaxy-Click-Command.md`
- `Game-10-Circuit-Builder-Lab.md`
- `Game-11-Gravity-Workshop.md`
- `Game-12-Discovery-Trails.md`
- `Game-13-Word-Storm.md`
- `Game-14-Memory-Match.md`
- `Game-15-Cipher-Quest.md`
- `Game-16-Droplets.md`
- `Game-17-Shakerz.md`
- `Game-18-Shape-Shifter.md`
- `Keyboard-Coach.md`
- `Mini-Game-1-Keyboard-Expedition.md`
- `Mini-Game-2-Precision-Painter-Studio.md`
- `SCREEN-TIME-SYSTEM.md`
- `Shared-Polish-Accessibility-Progression-and-QA-Pass.md`
- `Supabase-database-schema-migrations-RLS-policies-and-backend-integration-layer.md`

### Refinement Prompts

Found 20 files:
- 17 direct game refinement prompts.
- `shape-shifter-refinement-prompt.md-refinement-prompt.md` exists with a duplicated suffix in the filename.
- `skills-games-integration-plan-prompt.md` exists and is the active review prompt.
- `healthy-play-refinement-prompt.md` exists.
- `healthy-play-system-refinement-prompt.md` exists but is empty.

No refinement prompt found in this folder for:
- Typing Meteor Defense
- Story Sort Drag-and-Drop

### Shared System Specs

Found shared-system spec and refinement docs for:
- Accessibility Assist Controls
- Keyboard Coach
- Shared Game Shell
- Supabase Progress Layer
- XP Round Summary System

Healthy Play docs are in refinement prompts and assets, not in `/docs/skills-games/shared-systems` as a spec file.

### Asset Folders

Found 18 game asset folders under `/assets/skills`:
- `bug-trail-maze`
- `cipher-quest`
- `circut-builder-lab`
- `code-keys-workshop`
- `discovery-trail`
- `droplets`
- `galaxy-click-command`
- `gravity-workshop`
- `keyboard-expedition`
- `math-key-quest`
- `memory-match`
- `precision-painter-studio`
- `rhythm-row-typing`
- `shakerz`
- `shape-shifter`
- `target-tracker-adventure`
- `word-builder-farm`
- `word-storm`

Found 6 shared asset folders under `/assets/skills/shared`:
- `accessibility-assist-controls`
- `healthy-play`
- `keyboard-coach`
- `shared-game-shell`
- `supabase-progress-layer`
- `xp-round-summary-system`

### Component And Route Folders

Found 19 playable component folders under `/components/gaming`:
- `bug-trail-maze`
- `cipher-quest`
- `circuit-builder-lab`
- `code-keys-workshop`
- `discovery-trails`
- `droplets`
- `galaxy-click-command`
- `gravity-workshop`
- `keyboard-expedition`
- `math-key-quest`
- `memory-match`
- `precision-painter-studio`
- `rhythm-row-typing`
- `shakerz`
- `story-sort`
- `target-tracker`
- `typing-meteor`
- `word-builder-farm`
- `word-storm`

Also found:
- `/components/gaming/keyboard-coach`
- `/components/gaming/shared`

Found 19 playable route folders under `/app/gaming`:
- `bug-trail-maze`
- `cipher-quest`
- `circuit-builder-lab`
- `code-keys-workshop`
- `discovery-trails`
- `droplets`
- `galaxy-click-command`
- `gravity-workshop`
- `keyboard-expedition`
- `math-key-quest`
- `memory-match`
- `precision-painter-studio`
- `rhythm-row-typing`
- `shakerz`
- `story-sort`
- `target-tracker`
- `typing-meteor-defense`
- `word-builder-farm`
- `word-storm`

Also found `/app/gaming/page.tsx`, which is the gaming hub surface and should not be redesigned in this phase.

## Expected Games Inventory Reconciliation

The integration prompt says to review all 23 Skills game components. Current repository evidence does not cleanly reconcile to 23 playable games.

Observed counts:
- 20 expected playable game prompts: 18 numbered games plus 2 mini-games.
- 21 expected game-like entries if Keyboard Coach is counted as a shared game/support component.
- 19 playable route folders under `/app/gaming`.
- 19 playable component folders under `/components/gaming`.
- 18 game asset folders under `/assets/skills`.

Preliminary interpretation:
- Shape Shifter appears expected by docs and assets but has no current component or route.
- Typing Meteor Defense and Story Sort appear expected by prompts and components/routes but have no matching asset folder found.
- Keyboard Coach is present as a shared/support component, not as a playable `/app/gaming` route.
- The remaining difference between the prompt's "23" and observed inventory needs investigation in Checkpoint 2. Possible sources are shared systems, hub foundation, Healthy Play break activity, or prompt count drift.

## Expected Game Matrix - Checkpoint 1

| # | Game/System | Initial Prompt | Refinement Prompt | Assets | Component | Route | Preliminary Status |
|---|---|---|---|---|---|---|---|
| 1 | Typing Meteor Defense | Yes | Missing | Missing | `components/gaming/typing-meteor` | `app/gaming/typing-meteor-defense` | Needs asset/refinement review |
| 2 | Story Sort Drag-and-Drop | Yes | Missing | Missing | `components/gaming/story-sort` | `app/gaming/story-sort` | Needs asset/refinement review |
| 3 | Target Tracker Adventure | Yes | Yes | `target-tracker-adventure` | `target-tracker` | `target-tracker` | Naming mismatch |
| 4 | Word Builder Farm | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 5 | Math Key Quest | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 6 | Bug Trail Maze | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 7 | Rhythm Row Typing | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 8 | Code Keys Workshop | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 9 | Galaxy Click Command | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 10 | Circuit Builder Lab | Yes | Filename typo | `circut-builder-lab` | `circuit-builder-lab` | `circuit-builder-lab` | Naming typo/mismatch |
| 11 | Gravity Workshop | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 12 | Discovery Trails | Yes | `discovery-trail` | `discovery-trail` | `discovery-trails` | `discovery-trails` | Singular/plural mismatch |
| 13 | Word Storm | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 14 | Memory Match | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 15 | Cipher Quest | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 16 | Droplets | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 17 | Shakerz | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 18 | Shape Shifter | Yes | Filename typo | Yes | Missing | Missing | Missing component/route |
| 19 | Keyboard Expedition | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 20 | Precision Painter Studio | Yes | Yes | Yes | Yes | Yes | Inventory present |
| 21 | Keyboard Coach | Yes | Shared refinement | Shared assets | `components/gaming/keyboard-coach` | Missing direct route | Shared/support status |

## Shared Systems Inventory - Checkpoint 1

| System | Docs Found | Assets Found | Components Found | Lib Helpers Found | Preliminary Status |
|---|---|---|---|---|---|
| Healthy Play | Yes | Yes | Yes, `/components/healthy-play` | Yes, `/lib/healthy-play` | Present, needs integration gap review |
| Shared Game Shell | Yes | Yes | Partial shared gaming components | Not clearly dedicated | Needs review |
| Accessibility Assist Controls | Yes | Yes | Some game-level assist controls visible | `accessibilityRules.ts` | Needs review |
| Supabase Progress Layer | Yes | Yes | No dedicated component found yet | `/lib/gaming/progress.ts`, services | Needs contract alignment review |
| XP Round Summary System | Yes | Yes | Per-game `RoundSummary` components | Progress helpers exist | Needs standardization review |
| Keyboard Coach Shared System | Yes | Yes | Yes, `/components/gaming/keyboard-coach` | Hook/context exists in component folder | Present, needs integration review |
| Sound Effects | Notes in assets and `soundEffects.ts` | Per-game sound notes mostly present | No dedicated shared component | `/lib/gaming/soundEffects.ts` | Placeholder/no-op style; needs review |
| Animation Notes | Per-game and shared notes | Yes where assets exist | No dedicated animation system found | Not clearly dedicated | Needs reduced-motion review |

## Missing Assets Or Components - Preliminary

| Priority | Missing Item | Expected Location | Evidence | Recommended Action | Risk |
|---|---|---|---|---|---|
| P1 important | Shape Shifter component and route | `/components/gaming/shape-shifter`, `/app/gaming/shape-shifter` | Initial prompt, refinement prompt, and asset folder exist | Confirm intended implementation path in Checkpoint 2 | Expected game cannot be played or integrated |
| P1 important | Typing Meteor Defense assets | `/assets/skills/typing-meteor-defense` or `/assets/skills/typing-meteor` | Initial prompt and playable component/route exist | Check prompt asset expectations in Checkpoint 2 | Visual/sound/animation alignment may be incomplete |
| P1 important | Story Sort assets | `/assets/skills/story-sort` | Initial prompt and playable component/route exist | Check prompt asset expectations in Checkpoint 2 | Visual/sound/animation alignment may be incomplete |
| P2 polish | Typing Meteor Defense refinement prompt | `/docs/skills-games/refinement-prompts/typing-meteor-defense-refinement-prompt.md` | No matching refinement file found | Decide whether initial prompt is source of truth | Later direction may be missing |
| P2 polish | Story Sort refinement prompt | `/docs/skills-games/refinement-prompts/story-sort-refinement-prompt.md` | No matching refinement file found | Decide whether initial prompt is source of truth | Later direction may be missing |
| P2 polish | Healthy Play system refinement prompt is empty | `/docs/skills-games/refinement-prompts/healthy-play-system-refinement-prompt.md` | File exists with 0 bytes | Use `healthy-play-refinement-prompt.md` as active source unless contradicted | Confusing duplicate source |

## Import And Path Issues - Preliminary

- Circuit Builder Lab has spelling divergence:
  - Docs/refinement and assets include `circut-builder-lab`.
  - Components/routes use `circuit-builder-lab`.
- Discovery Trails has singular/plural divergence:
  - Assets/refinement use `discovery-trail`.
  - Components/routes use `discovery-trails`.
- Target Tracker Adventure has shortened implementation paths:
  - Assets/refinement use `target-tracker-adventure`.
  - Components/routes use `target-tracker`.
- Typing Meteor Defense has component/route divergence:
  - Component folder uses `typing-meteor`.
  - Route folder uses `typing-meteor-defense`.
- Shape Shifter assets/docs exist, but component and route are missing.
- Healthy Play module balance defaults point to `/skills/...` routes, while current implementation scope keeps `/gaming/...` routes.

## gameKey / moduleId Issues - Preliminary

Found explicit `GAME_KEY` constants in many game components. No full canonical `moduleId` registry found during Checkpoint 1.

Known preliminary mismatches:
- Target Tracker component uses `target_tracker`; Healthy Play profile uses `target_tracker_adventure`.
- Precision Painter component uses `precision_painter_studio`; Healthy Play profile uses `precision_painter`.
- Healthy Play profiles use future `/skills` routes rather than current `/gaming` routes.
- Current progress helpers use `game_key`; the integration contract expects future `moduleId`, `lessonId`, idempotent XP events, and progress payloads.

Checkpoint 2 should record every per-game `GAME_KEY`, route, asset folder, and expected moduleId/gameKey side by side.

## Healthy Play Integration Gaps - Preliminary

- Healthy Play provider/hooks/components exist.
- `components/healthy-play/useHealthyPlay.ts` exposes game activity tracking methods with optional `gameKey`.
- `components/healthy-play/SessionTracker.tsx` accepts `gameKey`.
- `components/healthy-play/XPBalanceController.tsx` supports future XP balance behavior.
- Current game components need review to confirm whether they are actually wrapped with Healthy Play provider/session tracking.
- Healthy Play module balance defaults appear route-migrated to `/skills`, which must remain future-only in this phase.

## Accessibility Gaps - Preliminary

- Shared docs and `lib/healthy-play/accessibilityRules.ts` exist.
- Shared asset folder for Accessibility Assist Controls exists.
- Some individual game components include assist-like state, large target toggles, or round summary flows.
- Cross-game consistency for keyboard navigation, visible focus, high contrast, larger text, reduced motion, quiet/off sound, and non-audio cues is not yet verified.

## Progress / XP Adapter Gaps - Preliminary

- Existing progress helpers are in `/lib/gaming/progress.ts` and `/lib/gaming/services`.
- Game components use local `GAME_KEY` constants and save progress-like records through current gaming helpers.
- Current helpers are not yet the same as the integration contract:
  - Future contract expects `moduleId`, `lessonId`, `status`, `score`, `accuracy`, `durationMs`, `attempt`, `maxCombo`, `mistakeCount`, and `completedAt`.
  - Future XP events expect `moduleId`, `activityType`, `score`, `accuracy`, `durationMs`, `attempt`, `difficulty`, `xpProposed`, `sessionId`, and `idempotencyKey`.
- No API route, Supabase migration, or dashboard implementation should be added in this phase.

## Checkpoint 2 - Per-Game Readiness Review

Overall Checkpoint 2 findings:
- Reviewed 21 expected game-like entries: 20 expected playable game prompts plus Keyboard Coach as a shared/support game system.
- Found 19 playable `/app/gaming` route folders and 19 playable game component folders.
- Most implemented games have local `GAME_KEY`, grade selection, task/content files, round summaries, XP/progress-like local helper writes, sound toggles, and pause/resume controls.
- No implemented game imports `HealthyPlayProvider`, `useHealthyPlay`, `SessionTracker`, or `XPBalanceController` directly yet.
- Current game progress is adapter-ready in spirit, but not contract-ready: no canonical `moduleId` registry, no `lessonId`/`roundId`, no `durationMs` standard, no `sessionId`, and no idempotency-key generation.
- Privacy posture is generally safe from raw telemetry logging: no raw keystroke logs or surveillance-style event streams found. Several games keep typed input in transient React state and save aggregate progress only.
- Common implementation risk: games use `local-user` placeholders and client-side progress helpers; this must become authenticated, server-mediated integration later.

### 1. Typing Meteor Defense

- Current files found: `/components/gaming/typing-meteor/TypingMeteorGame.tsx`, `Meteor.tsx`, `VisualKeyboard.tsx`, `HandPlacementGuide.tsx`, `RoundSummary.tsx`, `config.ts`, `types.ts`; route wrapper at `/app/gaming/typing-meteor-defense/page.tsx`.
- Assets found: no matching `/assets/skills/typing-meteor-defense` or `/assets/skills/typing-meteor` folder found.
- Prompt/refinement docs found: initial prompt `Game-1-Typing-Meteor-Defense.md`; no refinement prompt found.
- Expected gameplay output: timed keyboarding defense loop with falling prompts, correct/missed counts, streak, accuracy, XP, level, and keyboard guide.
- gameKey/moduleId: current `GAME_KEY = typing_meteor_defense`; no canonical `moduleId` registry found.
- Route: `/gaming/typing-meteor-defense`.
- Grade/difficulty support: K-5 prompts and per-grade spawn/speed/max-meteor settings in `config.ts`; no explicit easy/medium/hard field.
- Round-end/completion output: `RoundSummary` emits XP earned, accuracy, correct, missed, best streak, level, sync warning.
- Progress/XP readiness: has score-like counts, attempts, accuracy, streak, time left, XP, and `awardXP`/`saveUserGameProgress`; missing lesson/round ID, durationMs normalization, sessionId, idempotency key, and server route adapter.
- Privacy safety: transient typed input only; saves aggregate progress. No raw keystroke log found.
- Healthy Play readiness: pause/resume and reduced-motion/mute controls exist; no Healthy Play provider/session/XP efficiency connection.
- Accessibility readiness: on-screen keyboard, hand guide, reduced motion, input controls, and meteor `aria-label`; needs broader focus/high-contrast/large-target verification.
- Import/path risks: component folder `typing-meteor` differs from route/game key `typing-meteor-defense`; missing assets/refinement prompt.
- Missing items: asset folder and refinement prompt; Healthy Play/progress adapter.
- Recommended next action: keep route as-is, define canonical moduleId mapping to `typing_meteor_defense`, add asset plan or document no-asset exception, then add standard game-end adapter later.

### 2. Story Sort Drag-and-Drop

- Current files found: `/components/gaming/story-sort/StorySortGame.tsx`, `GradeDifficultyTasks.ts`, `types.ts`, `RoundSummary.tsx`, drag/drop helper components; route wrapper at `/app/gaming/story-sort/page.tsx`.
- Assets found: no matching `/assets/skills/story-sort` folder found.
- Prompt/refinement docs found: initial prompt `Game-2-Story-Sort-Drag-and-Drop.md`; no refinement prompt found.
- Expected gameplay output: K-5 drag-and-drop sorting/sequencing loop with correct placements, attempts, accuracy, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = story_sort`; no canonical moduleId registry found.
- Route: `/gaming/story-sort`.
- Grade/difficulty support: K-5 task set exists; no explicit difficulty field in task data.
- Round-end/completion output: `RoundSummary` emits XP earned, correct placements, attempts, accuracy, best streak, level, sync warning.
- Progress/XP readiness: has correct, attempts, accuracy, best streak, task type, XP; uses `awardXP` and `saveUserGameProgress`; missing lesson/round ID, durationMs, sessionId, idempotency key.
- Privacy safety: aggregate drag/drop outcomes only; no raw pointer path or keystroke log found.
- Healthy Play readiness: pause/resume and sound controls exist through local game controls; no Healthy Play connection.
- Accessibility readiness: drag/drop helpers and buttons exist; keyboard alternative for drag/drop needs verification.
- Import/path risks: missing asset folder and refinement prompt.
- Missing items: visual/sound/animation assets, refinement prompt, Healthy Play/progress adapter.
- Recommended next action: document asset gap as P1, then standardize moduleId and completion adapter before deeper UI work.

### 3. Target Tracker Adventure

- Current files found: `/components/gaming/target-tracker/TargetTrackerGame.tsx`, `GradeDifficultyTasks.ts`, `types.ts`, `RoundSummary.tsx`, `MovingTargetCharacter.tsx`, `TrackingZone.tsx`, `CollectibleObject.tsx`, `GameInstructionPanel.tsx`; route wrapper at `/app/gaming/target-tracker/page.tsx`.
- Assets found: `/assets/skills/target-tracker-adventure` with background, sprite sheets, sound notes, animation notes, manifest, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-3-Target-Tracker-Adventure.md`; refinement prompt `target-tracker-adventure-refinement-prompt.md`.
- Expected gameplay output: pointer tracking and click-target challenge with tracking zone, collected/correct/missed counts, accuracy, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = target_tracker`; Healthy Play profile uses `target_tracker_adventure`; contract moduleId unresolved.
- Route: `/gaming/target-tracker`, while docs/assets imply target-tracker-adventure naming.
- Grade/difficulty support: K-5 task data exists; difficulty is implicit through speed, target lifetime, size, and path rather than an explicit difficulty field.
- Round-end/completion output: `RoundSummary` emits XP earned, objects collected, correct clicks, missed clicks, accuracy, best streak, level.
- Progress/XP readiness: has attempts, accuracy, correct/missed, tracking percentage, time left, XP, and `awardXP`; missing canonical moduleId, explicit difficulty, lessonId/roundId, durationMs, sessionId, idempotency key.
- Privacy safety: pointer position used transiently for tracking; saves aggregate tracking accuracy only. No raw pointer trail storage found.
- Healthy Play readiness: pause/resume, reduced motion, sound toggle exist; no Healthy Play session/idle/XP efficiency connection.
- Accessibility readiness: large buttons for controls and visible tracking zone toggle; pointer-centric gameplay needs keyboard/assist alternative review.
- Import/path risks: component/route `target-tracker` differs from prompt/assets `target-tracker-adventure`; gameKey mismatch with Healthy Play profile.
- Missing items: canonical name mapping and adapter.
- Recommended next action: choose one canonical moduleId, likely `target_tracker_adventure`, while preserving `/gaming/target-tracker` route until migration phase.

### 4. Word Builder Farm

- Current files found: `/components/gaming/word-builder-farm/WordBuilderFarmGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/word-builder-farm/page.tsx`.
- Assets found: `/assets/skills/word-builder-farm` with base and growth UI/sprite/diagram assets, manifest, sound and animation notes.
- Prompt/refinement docs found: initial prompt `Game-4-Word-Builder-Farm.md`; refinement prompt `word-builder-farm-refinement-prompt.md`.
- Expected gameplay output: typing/growth loop with words completed, accuracy, streak, XP, level, farm progress.
- gameKey/moduleId: current `GAME_KEY = word_builder_farm`; no canonical moduleId registry found.
- Route: `/gaming/word-builder-farm`.
- Grade/difficulty support: K-5 task data with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, words completed, accuracy, best streak, level.
- Progress/XP readiness: has tasks done, attempts, correct, accuracy, difficulty, best streak, XP; missing lessonId/roundId, durationMs, sessionId, idempotency key.
- Privacy safety: typed answers are transient; saved data is aggregate plus known task metadata. No raw keystroke log found.
- Healthy Play readiness: pause/resume, sound toggle, reduced motion toggle present; no Healthy Play hooks.
- Accessibility readiness: keyboard input, keyboard guide, visible hints, large controls; needs shared assist/high-contrast/reduced-motion enforcement.
- Import/path risks: none obvious for current route/component/assets.
- Missing items: Healthy Play and progress contract adapters.
- Recommended next action: mark mostly ready for adapter work; preserve current route and add contract mapping later.

### 5. Math Key Quest

- Current files found: `/components/gaming/math-key-quest/MathKeyQuestGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/math-key-quest/page.tsx`.
- Assets found: `/assets/skills/math-key-quest` with background, sprite sheets, keyboard/effects diagrams, manifest, sound and animation notes.
- Prompt/refinement docs found: initial prompt `Game-5-Math-Key-Quest.md`; refinement prompt `math-key-quest-refinement-prompt.md`.
- Expected gameplay output: number-row/math typing quest with problems completed, accuracy, hints, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = math_key_quest`; no canonical moduleId registry found.
- Route: `/gaming/math-key-quest`.
- Grade/difficulty support: K-5 tasks with easy/medium/hard difficulty and allowed input sets.
- Round-end/completion output: `RoundSummary` emits XP earned, problems completed, accuracy, best streak, level.
- Progress/XP readiness: has problems done, attempts, correct, accuracy, hints, difficulty, best streak, XP; missing lessonId/roundId, durationMs, sessionId, idempotency key.
- Privacy safety: typed numeric/math answers are transient and task-defined; aggregate progress only.
- Healthy Play readiness: pause/resume, sound, reduced motion; no Healthy Play hooks.
- Accessibility readiness: keyboard guide, hints, input sanitization, large controls; needs shared assist/high-contrast verification.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; later adapter should include hintsUsed as metadata only, not raw answers.

### 6. Bug Trail Maze

- Current files found: `/components/gaming/bug-trail-maze/BugTrailMazeGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/bug-trail-maze/page.tsx`.
- Assets found: `/assets/skills/bug-trail-maze` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-6-Bug-Trail-Maze.md`; refinement prompt `bug-trail-maze-refinement-prompt.md`.
- Expected gameplay output: pointer path-control maze with item collection, path accuracy, correct/missed items, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = bug_trail_maze`; no canonical moduleId registry found.
- Route: `/gaming/bug-trail-maze`.
- Grade/difficulty support: K-5 tasks with easy/medium/hard path and task difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, path accuracy, items collected, correct/missed items, best streak, level.
- Progress/XP readiness: has path accuracy, attempts, correct/incorrect, difficulty, best streak, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: pointer frames counted as aggregate inside/total frames; no raw pointer path storage found.
- Healthy Play readiness: pause/resume, sound, reduced motion, wider path assist; no Healthy Play hooks.
- Accessibility readiness: pointer-centric but has wider-path assist and target-size changes; needs keyboard alternative/high-contrast verification.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should preserve aggregate path accuracy only.

### 7. Rhythm Row Typing

- Current files found: `/components/gaming/rhythm-row-typing/RhythmRowTypingGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/rhythm-row-typing/page.tsx`.
- Assets found: `/assets/skills/rhythm-row-typing` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-7-Rhythm-Row-Typing.md`; refinement prompt `rhythm-row-typing-refinement-prompt.md`.
- Expected gameplay output: rhythm typing loop with timing consistency, combo, flow score, accuracy, XP, level.
- gameKey/moduleId: current `GAME_KEY = rhythm_row_typing`; no canonical moduleId registry found.
- Route: `/gaming/rhythm-row-typing`.
- Grade/difficulty support: K-5 tasks with BPM, timing window, easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, accuracy, timing consistency, best combo, flow score, level.
- Progress/XP readiness: has timing deltas summarized to consistency, attempts, correct, accuracy, BPM, patterns completed, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: typed input transient; saves aggregate timing and completion metrics only.
- Healthy Play readiness: pause/resume, sound, reduced motion, slower rhythm mode; no Healthy Play hooks.
- Accessibility readiness: keyboard guide, Keyboard Coach, hand placement, slower mode; needs reduced-motion behavior and high-contrast pass.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should store timing buckets/consistency, not raw per-keystroke timing.

### 8. Code Keys Workshop

- Current files found: `/components/gaming/code-keys-workshop/CodeKeysWorkshopGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/code-keys-workshop/page.tsx`.
- Assets found: `/assets/skills/code-keys-workshop` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-8-Code-Keys-Workshop.md`; refinement prompt `code-keys-workshop-refinement-prompt.md`.
- Expected gameplay output: coding-readiness keyboard pattern/command loop with patterns completed, symbols mastered, accuracy, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = code_keys_workshop`; no canonical moduleId registry found.
- Route: `/gaming/code-keys-workshop`.
- Grade/difficulty support: K-5 tasks with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, accuracy, patterns completed, symbols mastered, best streak, level.
- Progress/XP readiness: has completed count, attempts, accuracy, difficulty, mastered patterns/symbols, XP; missing lessonId/roundId, durationMs, sessionId, idempotency key.
- Privacy safety: typed commands are fixed prompt answers and transient; saved aggregates only.
- Healthy Play readiness: pause/resume, sound, reduced motion, slower mode; no Healthy Play hooks.
- Accessibility readiness: keyboard guide, Keyboard Coach, hand placement, slower mode; needs shared assist/high-contrast verification.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should normalize symbols mastered and patterns completed into metadata.

### 9. Galaxy Click Command

- Current files found: `/components/gaming/galaxy-click-command/GalaxyClickCommandGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/galaxy-click-command/page.tsx`.
- Assets found: `/assets/skills/galaxy-click-command` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-9-Galaxy-Click-Command.md`; refinement prompt `galaxy-click-command-refinement-prompt.md`.
- Expected gameplay output: click-command target selection loop with mission progress, target completion, accuracy, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = galaxy_click_command`; Healthy Play profile matches gameKey.
- Route: `/gaming/galaxy-click-command`.
- Grade/difficulty support: K-5 tasks with easy/medium/hard difficulty, target speed/size/lifetime.
- Round-end/completion output: `RoundSummary` emits XP earned, accuracy, targets completed, best streak, mission progress, level.
- Progress/XP readiness: has attempts, targets clicked/missed, task type, difficulty, accuracy, XP; missing durationMs, sessionId, idempotency key, lessonId.
- Privacy safety: aggregate click outcomes only; no raw click event logs found.
- Healthy Play readiness: pause/resume, sound, reduced motion toggle, slower mode, larger targets; no Healthy Play hooks.
- Accessibility readiness: larger target mode and large buttons; pointer/click gameplay needs keyboard alternative review.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should capture click counts and accuracy only.

### 10. Circuit Builder Lab

- Current files found: `/components/gaming/circuit-builder-lab/CircuitBuilderLabGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`, `AssistControls.tsx`, workspace/slot/drag helper components; route wrapper at `/app/gaming/circuit-builder-lab/page.tsx`.
- Assets found: `/assets/skills/circut-builder-lab` with typo in folder name; includes background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-10-Circuit-Builder-Lab.md`; refinement prompt `circut-builder-lab-refinement-prompt.md` with same typo.
- Expected gameplay output: drag/select circuit logic-building loop with completion, correct placements, logic chains, accuracy, XP, level.
- gameKey/moduleId: current `GAME_KEY = circuit_builder_lab`; no canonical moduleId registry found.
- Route: `/gaming/circuit-builder-lab`.
- Grade/difficulty support: K-5 tasks with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, accuracy, correct placements, completion, logic chains completed, level.
- Progress/XP readiness: has attempts, correct placements, completion, difficulty, task type, best streak, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: aggregate placements and task metadata only; no raw drag stream found.
- Healthy Play readiness: pause/resume, sound, reduced motion, hint, larger slots, simplified mode; no Healthy Play hooks.
- Accessibility readiness: selectable buttons plus drag behavior and assist controls; keyboard-only placement needs deeper verification.
- Import/path risks: `circut` typo in assets/refinement versus `circuit` in code/routes.
- Missing items: canonical asset path/name decision and adapter.
- Recommended next action: preserve current route, document alias from `circut-builder-lab` assets to `circuit_builder_lab`, and avoid renaming until migration phase.

### 11. Gravity Workshop

- Current files found: `/components/gaming/gravity-workshop/GravityWorkshopGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`, `PhysicsSandbox.tsx`, `ToolInventory.tsx`; route wrapper at `/app/gaming/gravity-workshop/page.tsx`.
- Assets found: `/assets/skills/gravity-workshop` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-11-Gravity-Workshop.md`; refinement prompt `gravity-workshop-refinement-prompt.md`.
- Expected gameplay output: drag/drop physics puzzle with completion, creativity, efficiency, attempts, XP, level.
- gameKey/moduleId: current `GAME_KEY = gravity_workshop`; no canonical moduleId registry found.
- Route: `/gaming/gravity-workshop`.
- Grade/difficulty support: K-5 puzzles with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, puzzle completion, creativity bonus, efficiency score, attempts used, level.
- Progress/XP readiness: has completion, attempts, success flag, difficulty, puzzle type, stability score, object types used, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: saves aggregate object type/stability data, not raw drag logs.
- Healthy Play readiness: pause/resume, sound, reduced motion toggle exists but physics/animation reduced-motion behavior needs verification; no Healthy Play hooks.
- Accessibility readiness: drag/drop tool inventory; keyboard alternative and focus behavior need review.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter and keyboard-accessible drag/drop confirmation.
- Recommended next action: mark mostly ready with accessibility risk; adapter should preserve aggregate puzzle metrics only.

### 12. Discovery Trails

- Current files found: `/components/gaming/discovery-trails/DiscoveryTrailsGame.tsx`, `events.ts`, `types.ts`, `JourneySummary.tsx`; route wrapper at `/app/gaming/discovery-trails/page.tsx`.
- Assets found: `/assets/skills/discovery-trail` with rich sprite/UI/diagram assets, manifest, sound/animation notes, reference README.
- Prompt/refinement docs found: initial prompt `Game-12-Discovery-Trails.md`; refinement prompt `discovery-trail-refinement-prompt.md`.
- Expected gameplay output: narrative typing/comprehension journey with challenges completed, journey progress, accuracy, vocabulary mastered, typing progress, XP, level.
- gameKey/moduleId: current `GAME_KEY = discovery_trails`; assets/refinement use singular `discovery-trail`.
- Route: `/gaming/discovery-trails`.
- Grade/difficulty support: K-5 event data with easy/medium/hard difficulty.
- Round-end/completion output: `JourneySummary` emits XP earned, journey progress, challenges completed, accuracy, vocabulary mastered, typing progress, level.
- Progress/XP readiness: has completed count, attempts, accuracy, difficulty, environment, event type, XP; missing lessonId/roundId, durationMs, sessionId, idempotency key.
- Privacy safety: typed responses are constrained valid answers and transient; saved vocabulary/event aggregate only.
- Healthy Play readiness: pause/resume, sound, reduced motion; no Healthy Play hooks.
- Accessibility readiness: keyboard input, hints, Keyboard Coach; needs high-contrast/reduced-motion validation.
- Import/path risks: singular/plural mismatch across docs/assets and code/routes.
- Missing items: canonical naming map and adapter.
- Recommended next action: preserve route, map `discovery_trails` to current route and asset folder, then adapter later.

### 13. Word Storm

- Current files found: `/components/gaming/word-storm/WordStormGame.tsx`, `words.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/word-storm/page.tsx`.
- Assets found: `/assets/skills/word-storm` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-13-Word-Storm.md`; refinement prompt `word-storm-refinement-prompt.md`.
- Expected gameplay output: falling-word typing storm loop with words completed, accuracy, best combo, vocabulary mastered, typing speed, XP, level.
- gameKey/moduleId: current `GAME_KEY = word_storm`; Healthy Play profile matches gameKey.
- Route: `/gaming/word-storm`.
- Grade/difficulty support: K-5 words with movement pattern and easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, words completed, accuracy, best combo, vocabulary mastered, typing speed, level.
- Progress/XP readiness: has attempts, correct, accuracy, combo, typing speed estimate, difficulty, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: typed input transient; saved mastered words/categories are from fixed game content.
- Healthy Play readiness: pause/resume, sound, reduced motion; no Healthy Play hooks.
- Accessibility readiness: keyboard input and Keyboard Coach; moving-word critical cues need reduced-motion and non-animation cue verification.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should map bestCombo to `maxCombo`.

### 14. Memory Match

- Current files found: `/components/gaming/memory-match/MemoryMatchGame.tsx`, `pairs.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/memory-match/page.tsx`.
- Assets found: `/assets/skills/memory-match` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-14-Memory-Match.md`; refinement prompt `memory-match-refinement-prompt.md`.
- Expected gameplay output: card matching loop with matches completed, accuracy, memory streak, educational mastery, XP, level.
- gameKey/moduleId: current `GAME_KEY = memory_match`; Healthy Play profile matches gameKey.
- Route: `/gaming/memory-match`.
- Grade/difficulty support: K-5 pairs with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, matches completed, accuracy, memory streak, mastery, level.
- Progress/XP readiness: has matches, attempts, accuracy, best streak, pair categories, XP; current difficulty saved as grade rather than pair difficulty.
- Privacy safety: aggregate match outcomes and fixed card content only.
- Healthy Play readiness: pause/resume, sound, reduced motion, hint reveal; no Healthy Play hooks.
- Accessibility readiness: button-based cards support focus/click basics; needs ARIA state for revealed/matched and high-contrast review.
- Import/path risks: current_difficulty uses grade value, not easy/medium/hard.
- Missing items: difficulty normalization and adapter.
- Recommended next action: mark mostly ready; adapter should compute mistakeCount as attempts minus matches.

### 15. Cipher Quest

- Current files found: `/components/gaming/cipher-quest/CipherQuestGame.tsx`, `puzzles.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/cipher-quest/page.tsx`.
- Assets found: `/assets/skills/cipher-quest` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-15-Cipher-Quest.md`; refinement prompt `cipher-quest-refinement-prompt.md`.
- Expected gameplay output: cipher/logic typing puzzle loop with puzzles solved, logic accuracy, vocabulary mastery, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = cipher_quest`; no canonical moduleId registry found.
- Route: `/gaming/cipher-quest`.
- Grade/difficulty support: K-5 puzzles with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, puzzles solved, logic accuracy, vocabulary mastery, best streak, level.
- Progress/XP readiness: has solved count, attempts, accuracy, hints used, puzzle type, difficulty, environment, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: typed decoded messages are constrained to game answers and transient; saved vocabulary/valid answers are fixed content.
- Healthy Play readiness: pause/resume, sound, reduced motion, Keyboard Coach; no Healthy Play hooks.
- Accessibility readiness: keyboard input, clues, Keyboard Coach; needs high-contrast/reduced-motion verification.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should treat hintsUsed as optional metadata.

### 16. Droplets

- Current files found: `/components/gaming/droplets/DropletsGame.tsx`, `words.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/droplets/page.tsx`.
- Assets found: `/assets/skills/droplets` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-16-Droplets.md`; refinement prompt `droplets-refinement-prompt.md`; additional one-pager/spec docs exist outside the required prompt folders.
- Expected gameplay output: falling-letter/word typing loop with words completed, phonics/typing accuracy, streak, fluency, vocabulary mastered, XP, level.
- gameKey/moduleId: current `GAME_KEY = droplets`; no canonical moduleId registry found.
- Route: `/gaming/droplets`.
- Grade/difficulty support: K-5 words with speed/spacing and easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, words completed, accuracy, best streak, typing fluency, vocabulary mastered, level.
- Progress/XP readiness: has words done, attempts, correct, accuracy, difficulty, best streak, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: keystrokes are handled transiently through input keydown; saved mastered words/categories are fixed content.
- Healthy Play readiness: pause/resume, sound, reduced motion, slow pace assist; no Healthy Play hooks.
- Accessibility readiness: keyboard input, Keyboard Coach, assist slow pace; falling-letter cues need reduced-motion/non-animation verification.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should avoid raw key storage and use aggregate word/accuracy metrics.

### 17. Shakerz

- Current files found: `/components/gaming/shakerz/ShakerzGame.tsx`, `scenarios.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/shakerz/page.tsx`.
- Assets found: `/assets/skills/shakerz` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Game-17-Shakerz.md`; refinement prompt `shakerz-refinement-prompt.md`.
- Expected gameplay output: playful click-target scenario loop with targets completed, accuracy, educational mastery, scenario progress, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = shakerz`; no canonical moduleId registry found.
- Route: `/gaming/shakerz`.
- Grade/difficulty support: K-5 scenarios with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, accuracy, targets completed, best streak, mastery, scenario progress, level.
- Progress/XP readiness: has attempts, correct, accuracy, scenario progress, difficulty, category/mastery, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: aggregate clicks only; no raw click stream found.
- Healthy Play readiness: pause/resume, sound, reduced motion, larger targets; no Healthy Play hooks.
- Accessibility readiness: button-based targets and large-target assist; needs focus/high-contrast review.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should record click accuracy and scenario category only.

### 18. Shape Shifter

- Current files found: no `/components/gaming/shape-shifter` folder and no `/app/gaming/shape-shifter` route found.
- Assets found: `/assets/skills/shape-shifter` with background, sprite/effects/obstacle/key-prompt sheets, UI state sheets, progress summary and keyboard timing diagrams, manifest, sound/animation notes, reference README.
- Prompt/refinement docs found: initial prompt `Game-18-Shape-Shifter.md`; refinement prompt `shape-shifter-refinement-prompt.md-refinement-prompt.md`.
- Expected gameplay output: based on docs/assets, likely keyboard timing and shape/obstacle interaction game with progress summary, key prompts, sound/animation support.
- gameKey/moduleId: not implemented; likely expected `shape_shifter`, but no source constant exists.
- Route: missing.
- Grade/difficulty support: unknown in code; docs/assets imply expected game-specific levels but no component data exists.
- Round-end/completion output: missing component and summary.
- Progress/XP readiness: blocked; no internal state exists to map to contract.
- Privacy safety: unknown because implementation missing.
- Healthy Play readiness: blocked; no implementation to wrap.
- Accessibility readiness: blocked; only assets/docs exist.
- Import/path risks: duplicated suffix in refinement prompt filename; missing route/component.
- Missing items: full component, route, content/type files, round summary, adapter plan.
- Recommended next action: treat as P1 missing component/route; implement only after review approval, using existing assets/docs as source of truth.

### 19. Keyboard Expedition

- Current files found: `/components/gaming/keyboard-expedition/KeyboardExpeditionGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/keyboard-expedition/page.tsx`.
- Assets found: `/assets/skills/keyboard-expedition` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Mini-Game-1-Keyboard-Expedition.md`; refinement prompt `keyboard-expedition-refinement-prompt.md`.
- Expected gameplay output: keyboarding adventure command loop with challenges completed, typing accuracy, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = keyboard_expedition`; Healthy Play profile matches gameKey.
- Route: `/gaming/keyboard-expedition`.
- Grade/difficulty support: K-5 tasks with easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, typing accuracy, challenges completed, best streak, level.
- Progress/XP readiness: has completed count, attempts, correct, accuracy, difficulty, best streak, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: typed command input is transient and fixed prompt-based; saved aggregate task data only.
- Healthy Play readiness: pause/resume, sound, reduced motion, Keyboard Coach; no Healthy Play hooks.
- Accessibility readiness: keyboard guide, hand guide, Keyboard Coach, hints; needs shared high-contrast/reduced-motion check.
- Import/path risks: none obvious.
- Missing items: Healthy Play/progress adapter.
- Recommended next action: mark mostly ready; adapter should map challengesCompleted to lesson/round completion metrics.

### 20. Precision Painter Studio

- Current files found: `/components/gaming/precision-painter-studio/PrecisionPainterStudioGame.tsx`, `tasks.ts`, `types.ts`, `RoundSummary.tsx`; route wrapper at `/app/gaming/precision-painter-studio/page.tsx`.
- Assets found: `/assets/skills/precision-painter-studio` with background, sprite sheet, UI state sheet, manifest, sound/animation notes, interaction diagram, reference README.
- Prompt/refinement docs found: initial prompt `Mini-Game-2-Precision-Painter-Studio.md`; refinement prompt `precision-painter-studio-refinement-prompt.md`.
- Expected gameplay output: pointer precision/tracing studio loop with precision score, completion, accuracy, streak, XP, level.
- gameKey/moduleId: current `GAME_KEY = precision_painter_studio`; Healthy Play profile uses `precision_painter`.
- Route: `/gaming/precision-painter-studio`.
- Grade/difficulty support: K-5 tasks with precision requirement and easy/medium/hard difficulty.
- Round-end/completion output: `RoundSummary` emits XP earned, precision score, completion, accuracy, best streak, level.
- Progress/XP readiness: has attempts, correct, precision, completion, difficulty, task type, XP; missing durationMs/session/idempotency/lessonId.
- Privacy safety: pointer movement evaluated into aggregate painted/on-target counts; no raw pointer trail storage found.
- Healthy Play readiness: pause/resume, sound, reduced motion, brush size, wider path assist; no Healthy Play hooks.
- Accessibility readiness: pointer-centric; has assist path/brush controls, but keyboard alternative needs review.
- Import/path risks: gameKey mismatch with Healthy Play profile.
- Missing items: canonical key mapping and adapter.
- Recommended next action: choose canonical moduleId, likely `precision_painter_studio`, and update future Healthy Play profile mapping without route migration.

### 21. Keyboard Coach

- Current files found: `/components/gaming/keyboard-coach/KeyboardCoachDock.tsx`, `KeyboardCoachOverlay.tsx`, `useKeyboardCoach.tsx`, `types.ts`, `keymap.ts`.
- Assets found: `/assets/skills/shared/keyboard-coach` with UI state sheet, interaction diagram, manifest, animation notes.
- Prompt/refinement docs found: initial prompt `Keyboard-Coach.md`; shared spec `keyboard-coach-spec.md`; refinement prompt `shared-systems/refinement-prompt/keyboard-coach-refinement-prompt.md`.
- Expected gameplay output: shared keyboard support overlay/dock with targets, active/next key, finger guide, home-row display, settings, and persistence.
- gameKey/moduleId: no playable game key; Healthy Play profile includes `keyboard_coach`, but current component is embedded support rather than standalone route.
- Route: no direct route found; consumed by typing games.
- Grade/difficulty support: not game-grade driven in code; supports target sequences from consuming games.
- Round-end/completion output: none; this is not a round-based game.
- Progress/XP readiness: not an XP-producing game by itself; settings persist through user settings service. Could emit usage/support metadata later.
- Privacy safety: target keys come from game prompts; settings persist. No raw keystroke storage found.
- Healthy Play readiness: not connected to Healthy Play; could be counted as support activity only if desired later.
- Accessibility readiness: has settings for reduced motion/high contrast in types, finger/home-row support, visible overlay; overlay controls need full ARIA/focus review.
- Import/path risks: `KeyboardCoachDock` creates its own provider per dock; route/profile mismatch if treated as standalone game.
- Missing items: no direct route if product expects standalone practice; no progress/XP adapter if treated as activity.
- Recommended next action: keep as shared system for now; do not count as a playable game unless product explicitly wants standalone Keyboard Coach.

## Checkpoint 2 Missing Items Report

| Priority | Missing Item | Expected Location | Evidence | Recommended Action | Risk |
|---|---|---|---|---|---|
| P1 important | Shape Shifter component and route | `/components/gaming/shape-shifter`, `/app/gaming/shape-shifter` | Game 18 prompt, refinement prompt, and full asset folder exist | Plan implementation after approval | Expected game is unavailable and cannot emit progress/XP |
| P1 important | Typing Meteor Defense asset folder | `/assets/skills/typing-meteor-defense` or `/assets/skills/typing-meteor` | Initial prompt and working route/component exist | Confirm whether assets were intentionally omitted or need creation | Visual/sound/animation alignment cannot be verified |
| P1 important | Story Sort asset folder | `/assets/skills/story-sort` | Initial prompt and working route/component exist | Confirm whether assets were intentionally omitted or need creation | Visual/sound/animation alignment cannot be verified |
| P1 important | Canonical game registry/moduleId map | shared Skills registry location TBD | All games use local `GAME_KEY`; contract expects known `moduleId` values | Create contract-only registry plan before adapters | XP/progress payloads may drift |
| P1 important | Healthy Play game wrapper/adapter | shared game shell or route wrapper TBD | No game imports Healthy Play hooks/components | Plan provider/session wrapper in Checkpoint 3 | Session time, idle exclusion, XP efficiency, Calm Mode not connected |
| P1 important | Progress/XP contract adapter | shared Skills adapter location TBD | Existing progress helpers differ from integration contract | Plan adapter before API/schema work | Future server integration will be inconsistent |
| P2 polish | Typing Meteor and Story Sort refinement docs | `/docs/skills-games/refinement-prompts` | No matching refinement files found | Use initial prompts as source until docs are added | Later design direction may be unclear |
| P2 polish | Naming mismatches | Target Tracker, Circuit, Discovery, Precision Painter | Paths/gameKeys/docs/assets differ | Add alias table and avoid route migration now | Import/asset lookup and moduleId confusion |
| P2 polish | Explicit duration/session/idempotency source | per-game adapter | Games track time inconsistently or not at all | Add standard game session adapter later | Duplicate XP and inconsistent duration metrics |

## Checkpoint 2 Current Readiness Snapshot

| Game/System | Status | Main Reason |
|---|---|---|
| Typing Meteor Defense | needs assets/adapter | Component exists; no asset/refinement docs found. |
| Story Sort Drag-and-Drop | needs assets/adapter | Component exists; no asset/refinement docs found. |
| Target Tracker Adventure | needs adapter/name mapping | Component exists but naming differs from docs/assets. |
| Word Builder Farm | mostly ready | Needs shared adapters. |
| Math Key Quest | mostly ready | Needs shared adapters. |
| Bug Trail Maze | mostly ready | Needs shared adapters and pointer accessibility review. |
| Rhythm Row Typing | mostly ready | Needs shared adapters and timing privacy guardrail. |
| Code Keys Workshop | mostly ready | Needs shared adapters. |
| Galaxy Click Command | mostly ready | Needs shared adapters. |
| Circuit Builder Lab | needs adapter/name mapping | Asset/refinement typo differs from code route. |
| Gravity Workshop | mostly ready with accessibility risk | Drag/drop/physics need keyboard alternative review. |
| Discovery Trails | needs adapter/name mapping | Singular/plural mismatch. |
| Word Storm | mostly ready | Needs shared adapters. |
| Memory Match | mostly ready | Needs difficulty normalization and adapter. |
| Cipher Quest | mostly ready | Needs shared adapters. |
| Droplets | mostly ready | Needs shared adapters. |
| Shakerz | mostly ready | Needs shared adapters. |
| Shape Shifter | missing component | Docs/assets exist; route/component missing. |
| Keyboard Expedition | mostly ready | Needs shared adapters. |
| Precision Painter Studio | needs adapter/name mapping | GameKey differs from Healthy Play profile. |
| Keyboard Coach | shared/support ready | Needs decision whether standalone route/activity is desired. |

## Checkpoint 3 - Shared Systems Review

Overall Checkpoint 3 findings:
- Healthy Play has the strongest implementation coverage: provider, hooks, session tracking, reminder UI, XP efficiency, local fail-soft persistence, accessibility settings, and shared helper libraries exist.
- The Shared Game Shell, Accessibility Assist Controls, Supabase Progress Layer, and XP Round Summary System are well documented and have shared assets, but implementation is only partial in current `/components/gaming` and `/lib/gaming`.
- Current games already use partial shell pieces: `GameTopBar`, `GameControlRow`, per-game `RoundSummary`, `XPProgress`, `soundEffects`, and `lib/gaming/progress`.
- No game currently mounts `HealthyPlayProvider`, `SessionTracker`, `WellnessPromptSystem`, `BreakReminderManager`, or `XPBalanceController`.
- Best future attachment point: a shared Skills game wrapper/shell around each `/app/gaming/*/page.tsx` game component, while preserving current `/gaming` routes.
- XP/progress adapters should sit between game round-end data and existing/future server contracts, not inside every game component separately.

### Healthy Play

- Docs/assets reviewed: `healthy-play-refinement-prompt.md`, `SCREEN-TIME-SYSTEM.md`, `/assets/skills/shared/healthy-play/*`.
- Code reviewed: `/components/healthy-play/*`, `/lib/healthy-play/*`.
- Current implementation found:
  - `HealthyPlayProvider` supports current game key, active/idle time, session status, break status, Calm Mode, XP efficiency, save status, sync status, local storage, `onSaveState`, `onPreserveGameState`, `onReturnToSkillsPage`, and `onTrySomethingElse`.
  - `SessionTracker` can attach browser activity listeners and report `typing`, `mouse_movement`, `clicking`, `tracking`, `drag_drop`, `puzzle_interaction`, `game_navigation`, `pause`, and `resume`.
  - `useHealthyPlay` exposes derived state, activity helpers, future-XP preview, and `preserveProgress`.
  - `WellnessPromptSystem`, `BreakReminderManager`, `ActivitySummaryPanel`, `HealthySessionAnalytics`, and `XPBalanceController` exist as reusable UI/logic pieces.
  - `lib/healthy-play` has framework-safe helpers for session tracking, reminder rules, XP efficiency, module balance, persistence, and accessibility rules.
- Provider/wrapper needs:
  - Add a single shared game wrapper, likely inside a future Shared Game Shell, that mounts `HealthyPlayProvider currentGameKey={canonicalGameKey}`.
  - Mount `SessionTracker gameKey={canonicalGameKey}` inside that wrapper so games do not each duplicate browser event listeners.
  - Mount `WellnessPromptSystem` once per game screen, probably shell-level overlay/toast.
  - Use `BreakReminderManager` in `logic-only` or compact shell mode, not per-game custom UI.
  - Wire `onPreserveGameState` to the future game-end/progress adapter before any navigation action.
- Where Healthy Play should wrap games:
  - Preferred: route wrapper/shared shell around each game component under `/app/gaming/*/page.tsx`.
  - Alternative: a shared `SkillsGameRuntime` wrapper imported by each page.
  - Avoid: embedding Healthy Play logic inside every individual game loop.
- Activity mapping from Checkpoint 2:
  - Typing games (`typing_meteor_defense`, `word_builder_farm`, `math_key_quest`, `rhythm_row_typing`, `code_keys_workshop`, `keyboard_expedition`, `word_storm`, `droplets`, `cipher_quest`, `discovery_trails`) should report `typing` and `prompt_answer`.
  - Pointer/click games (`target_tracker`/`target_tracker_adventure`, `galaxy_click_command`, `shakerz`) should report `clicking`; Target Tracker should also report `tracking`.
  - Drag/path/precision games (`story_sort`, `circuit_builder_lab`, `gravity_workshop`, `precision_painter_studio`, `bug_trail_maze`) should report `drag_drop`, `mouse_movement`, `tracking`, or `puzzle_interaction` depending on interaction type.
  - Memory Match should report `puzzle_interaction`.
- Calm Mode compatibility:
  - Provider/accessibility helpers can mark Calm Mode active and derive reduced motion/calm visuals.
  - Games do not currently consume Calm Mode state; the wrapper should translate Calm Mode to shared props/classes: reduced motion, quieter/off sound, calmer visual class, and optional slower pace where a game already supports it.
- Progress preservation gaps:
  - `onPreserveGameState` exists but no game wrapper passes a game-specific save callback yet.
  - Current games save only on end-round; mid-round state preservation before Healthy Play navigation is not standardized.
  - Break flow should pause games and preserve current round state before `returnToSkillsPage` or `trySomethingElse`.
- Route boundary risk:
  - Healthy Play route targets and module balance profiles use future `/skills` paths, while this phase must keep `/gaming`.
  - For this phase, wrapper actions should use callbacks that route to `/gaming` or current hub behavior without editing route paths.

### Shared Game Shell

- Docs/assets reviewed: `shared-game-shell-spec.md`, shared-game-shell refinement prompt, `/assets/skills/shared/shared-game-shell/*`.
- Current implementation found:
  - Partial shell pieces exist at `/components/gaming/shared/GameTopBar.tsx` and `GameControlRow.tsx`.
  - `GameTopBar` provides back link, title, grade, XP, accuracy, streak, and optional time.
  - `GameControlRow` provides start/pause/resume/end, sound toggle, reduced-motion toggle, and extension slot.
  - No full `SharedGameShell`, pause modal, assist panel, save status component, shell provider, or shell-owned round-summary wrapper found.
- Provider/wrapper needs:
  - Shared Game Shell should become the top-level wrapper that owns Healthy Play provider, SessionTracker, top bar, controls, save status, assist controls, prompt overlay, and summary placement.
  - Existing games can keep their game logic and pass status/handlers/stats into the shell over time.
- Adapter attachment point:
  - First practical step should be a shell/runtime wrapper that can wrap current game components without changing game internals.
  - Later, move duplicated per-game top bars/control rows into the shell in small slices.
- Progress preservation gaps:
  - Current `GameControlRow` pause/end handlers are per-game only; no common "pause because Healthy Play break started" behavior.
  - No shell-level save status or "progress will sync" component beyond per-game `syncWarning` text.
- Shared game-end output needs:
  - A standard summary shape should be produced at round end and passed to a shared summary component.
  - Current per-game summaries expose enough data, but names differ (`bestStreak`, `bestCombo`, `memoryStreak`, `flowScore`, `missionProgress`, etc.).

### Accessibility Assist Controls

- Docs/assets reviewed: `accessibility-assist-controls-spec.md`, accessibility refinement prompt, `/assets/skills/shared/accessibility-assist-controls/*`.
- Code reviewed: `lib/healthy-play/accessibilityRules.ts`, current game local controls.
- Current implementation found:
  - Healthy Play accessibility helpers support reduced motion, high contrast, larger text, sound preference, quiet breaks, touch-friendly controls, Calm Mode-derived reduced motion, CSS class names, and data attributes.
  - Many games already have local toggles for sound/reduced motion, and some have larger targets, slower mode, wider path, hint reveal, simplified mode, brush size, or keyboard guide.
  - No single `AccessibilityAssistProvider`, `AssistControlsPanel`, or shared assist hook found for games.
- Provider/wrapper needs:
  - Put shared assist settings in the shell or Healthy Play wrapper so all games receive consistent `reducedMotion`, `soundPreference`, `highContrast`, `largerText`, `touchFriendlyControls`, and game-specific assist flags.
  - Translate existing per-game assist controls into shared settings gradually; do not remove local controls until parity exists.
- Reduced-motion support:
  - Game-level toggles exist widely, but actual gameplay animation reduction is inconsistent.
  - `accessibilityRules.ts` can provide one source of truth; wrapper should pass `shouldReduceMotion` to game components later.
- Calm Mode compatibility:
  - Calm Mode should force or imply reduced motion and quiet sounds through accessibility evaluation.
  - Games need a shared class/data attribute at shell root so visual tone can change without per-game rewrites.
- Persistence hooks:
  - Healthy Play persistence supports accessibility settings locally.
  - Keyboard Coach persists settings through `userSettingsService`.
  - No unified assist-settings persistence adapter connects all games yet.
- Accessibility gaps by game type:
  - Pointer/drag games need keyboard alternatives or accessible fallback interactions: Story Sort, Target Tracker, Bug Trail Maze, Circuit Builder Lab, Gravity Workshop, Precision Painter Studio.
  - Button-based games are closer but still need ARIA state/focus review: Memory Match, Shakerz, Galaxy Click Command.
  - Typing games need high contrast, larger text, and no-animation critical cue confirmation.

### Keyboard Coach

- Docs/assets reviewed: `keyboard-coach-spec.md`, keyboard-coach refinement prompt, `/assets/skills/shared/keyboard-coach/*`.
- Code reviewed: `/components/gaming/keyboard-coach/*`.
- Current implementation found:
  - `KeyboardCoachDock` wraps `KeyboardCoachProvider` and renders `KeyboardCoachOverlay`.
  - Overlay shows active/next key, keyboard rows, home row, finger guide, mode/position/hands/home-row/motion settings.
  - `useKeyboardCoach` persists settings with `userSettingsService` and defaults to `local-user`.
- Integration readiness:
  - Many keyboard games already import Keyboard Coach or a visual keyboard.
  - Keyboard Coach is reusable enough for current game support, but not yet integrated with Healthy Play accessibility preferences or canonical user identity.
- Provider/wrapper needs:
  - Avoid one provider per dock long-term. Prefer shell-level KeyboardCoachProvider so settings/visibility are consistent across keyboard games.
  - Feed targets from game components into shell/coach via an adapter or hook.
- Persistence gaps:
  - Uses `local-user` default; should later receive authenticated user context or shared settings persistence.
  - Settings are separate from Healthy Play accessibility settings; high contrast/reduced motion should be reconciled.
- Privacy safety:
  - Coach targets are derived from fixed game prompts, not logged raw keystrokes.
  - Future analytics should only record aggregate coach usage, not per-key streams.

### Supabase Progress Layer

- Docs/assets reviewed: `supabase-progress-layer-spec.md`, progress-layer refinement prompt, `/assets/skills/shared/supabase-progress-layer/*`.
- Code reviewed: `/lib/gaming/progress.ts`, `/lib/gaming/services/*`.
- Current implementation found:
  - `lib/gaming/progress.ts` defines `UserGameProgress`, XP thresholds, `calculateLevelFromXP`, `getUserGameProgress`, `saveUserGameProgress`, and `awardXP`.
  - The main helper is fail-soft and returns merged local data, but `getUserGameProgress` currently returns null and Supabase calls are TODO comments.
  - Additional service files exist under `/lib/gaming/services`, but Checkpoint 3 did not implement or validate backend connectivity.
- Adapter attachment point:
  - Add a shared Skills progress adapter between game round-end results and future contract payloads.
  - The adapter should receive normalized round output, game registry metadata, Healthy Play session state, and XP efficiency result.
  - It should produce two contract-ready shapes later: XP event payload and progress upsert payload.
- Progress preservation gaps:
  - Existing games save on `endRound`; no standard `saveDraftRound`, `preserveBeforeNavigation`, or mid-round state snapshot exists.
  - Healthy Play `onPreserveGameState` should call a shared adapter method, not per-game bespoke save logic.
- Contract gaps:
  - Current shape uses `game_key`, `xp`, `level`, `best_score`, `total_sessions`, `total_correct`, `total_attempts`, `accuracy`, `settings`.
  - Future contract expects `moduleId`, `lessonId`, `status`, `score`, `accuracy`, `durationMs`, `attempt`, `maxCombo`, `mistakeCount`, `completedAt`, plus idempotent XP event fields.
  - No canonical module registry or `lessonId` source exists yet.
- Safety boundary:
  - Do not add API routes or migrations in this checkpoint.
  - Keep current helpers as local/fail-soft until contract alignment checkpoint decides adapter shape.

### XP Round Summary System

- Docs/assets reviewed: `xp-round-summary-system-spec.md`, summary refinement prompt, `/assets/skills/shared/xp-round-summary-system/*`.
- Current implementation found:
  - Every implemented game has its own `RoundSummary` or `JourneySummary`.
  - `components/gaming/XPProgress.tsx` exists for XP progress display.
  - No shared `XPRoundSummary`, stat card, save-status chip, or summary data builder found.
- Shared game-end output needs:
  - Standardize a `SkillRoundResult` object with common fields: gameKey/moduleId, grade, difficulty, score, accuracy, durationMs, attempt, xpProposed/baseXP, maxCombo/bestStreak, mistakeCount, completedAt, gameSpecificStats.
  - Convert per-game stats into a flexible summary panel rather than keeping 19 one-off summary components long-term.
  - Preserve per-game display labels as metadata so child-facing copy remains specific and friendly.
- Progress/XP adapter location:
  - Build summary data first, then let the progress adapter create contract payloads.
  - XP efficiency should apply to future XP before contract payload creation, and already-earned XP must remain safe.
- Reduced motion/sound:
  - Summary animations should use the shared accessibility evaluation.
  - Completion sound should remain optional/no-op if sound is off or quiet mode applies.

### Sound Helpers

- Docs/assets reviewed: per-shared and per-game sound notes, especially Healthy Play sound notes.
- Code reviewed: `/lib/gaming/soundEffects.ts`.
- Current implementation found:
  - `playCorrectSound`, `playCompleteSound`, `playSoftClickSound`, `playGentleWhoosh`, and `playTryAgainSound` are safe no-op placeholders when enabled and return immediately when disabled.
  - Games use local `soundOn` booleans and call helpers or inline TODO sound hooks.
- No-op behavior:
  - Current no-op behavior is safe and preferable until final sound assets/engine are chosen.
  - No casino/currency/store sounds found in helper names or notes.
- Adapter/wrapper needs:
  - Replace per-game `soundOn` with shared sound preference later: `on`, `quiet`, `off`.
  - Healthy Play Calm Mode and Quiet Breaks should lower or mute nonessential sounds.
  - Sound helper should accept sound category/intensity later, but remain fail-safe.

### Animation Notes And Reduced Motion

- Docs/assets reviewed: shared animation notes for Healthy Play, Accessibility Assist Controls, Keyboard Coach, Shared Game Shell, Supabase Progress Layer, XP Round Summary System, plus per-game notes inventory from Checkpoint 2.
- Current implementation found:
  - Many games expose a local `reducedMotion` toggle.
  - Some components conditionally disable transitions (`Meteor`, `LogicFlowVisualizer`, Memory Match timeout, Shakerz background), but coverage is inconsistent.
  - Shared animation docs consistently call for calm motion, no reward bursts, reduced-motion support, and motion used only for clarity.
- Reduced-motion support needs:
  - Shared shell should set a root class/data attribute from `evaluateHealthyPlayAccessibility`.
  - Game components should consume a shared `reducedMotion` value instead of local-only state over time.
  - Games where animation is a core cue need non-animation alternatives: Typing Meteor, Word Storm, Droplets, Rhythm Row Typing, Target Tracker, Bug Trail Maze, Precision Painter.
- Calm Mode compatibility:
  - Calm Mode should imply reduced motion, quiet sounds, softened visual treatment, and optional slower pacing where already available.

### Shared Adapter Attachment Plan

Use these future attachment points when implementation is approved:

| Need | Best Attachment Point | Why |
|---|---|---|
| Healthy Play provider | Shared game shell or route-level `SkillsGameRuntime` | One provider per game screen, no duplicated logic. |
| Session tracking | Same wrapper, with `SessionTracker gameKey` | Browser activity can be captured consistently. |
| Activity type mapping | Thin per-game metadata registry | Avoid scattering `trackTyping`/`trackClicking` calls everywhere. |
| Accessibility settings | Shell/provider context | Shared reduced motion, high contrast, sound, touch settings. |
| Sound preference | Sound helper wrapper used by games | Supports `on`, `quiet`, `off` without replacing every call at once. |
| XP efficiency | Round-end adapter before XP payload creation | Future XP only; already-earned XP remains safe. |
| Progress preservation | Shell `onPreserveGameState` -> progress adapter | Protects state before Healthy Play navigation. |
| Round summary | Shared summary data builder | Standard output for UI and contract payloads. |
| Progress/XP contract | Shared Skills progress adapter | Keeps API/schema details out of individual games. |
| Canonical game keys | Registry/alias map | Resolves Target Tracker, Circuit, Discovery, Precision Painter mismatches. |

### Checkpoint 3 Missing Items Report

| Priority | Missing Item | Expected Location | Evidence | Recommended Action | Risk |
|---|---|---|---|---|---|
| P0 blocker | Canonical game registry/alias map | shared Skills config/lib location TBD | Healthy Play profiles, game keys, routes, and assets disagree | Plan registry before adapter implementation | Contract payloads and wrapper routing may drift |
| P1 important | Shared game runtime/shell implementation | shared wrapper around `/app/gaming/*` | Specs exist; only partial top/control components exist | Add wrapper in a later approved implementation checkpoint | Healthy Play and adapters have no clean attachment point |
| P1 important | Healthy Play wrapper integration | shared shell/runtime | Healthy Play exists but no game mounts it | Wrap games once at route/shell level | Session tracking, Calm Mode, XP efficiency remain disconnected |
| P1 important | Progress/XP adapter | shared Skills lib location TBD | Current progress helper differs from integration contract | Design adapter before API/schema work | Future API integration inconsistent and duplicate-prone |
| P1 important | Shared round result shape | shared summary/progress builder location TBD | Per-game summaries use different prop names | Normalize output before contract mapping | Hard to create reliable XP/progress payloads |
| P1 important | Progress preservation callback | shell `onPreserveGameState` -> adapter | Provider supports it; games do not provide it | Implement after round-result adapter exists | Healthy Play navigation can lose mid-round state |
| P2 polish | Unified sound preference | sound helper/shared assist context | Games use booleans; Healthy Play supports `on/quiet/off` | Add compatibility wrapper later | Calm/quiet mode cannot control all game sounds |
| P2 polish | Unified accessibility provider | shared shell/provider | Specs exist; local game toggles vary | Introduce shared assist settings gradually | Reduced motion/high contrast behavior remains inconsistent |
| P2 polish | Keyboard Coach provider placement | shared shell/provider | Current dock creates provider per instance | Move to shell-level provider later | Settings/visibility can be inconsistent across games |
| P2 polish | Route target override for Healthy Play | wrapper callbacks | Healthy Play defaults point to `/skills` | Use callbacks for current `/gaming` phase | Accidental future route navigation |

### Checkpoint 3 Readiness Snapshot

| Shared System | Status | Main Reason |
|---|---|---|
| Healthy Play | mostly ready, not integrated | Provider/hooks/UI/helpers exist; games are not wrapped. |
| Shared Game Shell | partial | Specs/assets exist; only `GameTopBar` and `GameControlRow` are implemented. |
| Accessibility Assist Controls | planned/partial | Strong docs/assets and helper rules; no shared assist provider/panel in games. |
| Keyboard Coach | mostly ready, needs provider/user alignment | Reusable overlay exists and is used by many keyboard games. |
| Supabase Progress Layer | stubbed/fail-soft | Specs/assets exist; helper shape exists but backend calls are TODO. |
| XP Round Summary System | partial | Per-game summaries exist; no shared summary system yet. |
| Sound Effects | safe placeholder | No-op helpers are safe; no shared quiet/off preference adapter yet. |
| Animation/Reduced Motion | partial | Docs strong; local toggles exist but behavior is inconsistent. |

## Checkpoint 4 - Integration Contract Alignment

Scope guard: this checkpoint is contract-only. No game code, route, asset, schema, dashboard, landing page, Skills Hub UI, `/gaming` routing, API route, Supabase migration, or production write work was performed.

Contract fields reviewed:
- XP event fields from `/docs/skills-games/integration/Skills_Module_Integration_Contract.md`: `moduleId`, `activityType`, `score`, `accuracy`, `durationMs`, `attempt`, `difficulty`, `xpProposed`, `sessionId`, `idempotencyKey`.
- Progress fields: `moduleId`, `lessonId`, `status`, `score`, `accuracy`, `durationMs`, `attempt`, `maxCombo`, `mistakeCount`, `completedAt`.

Overall Checkpoint 4 findings:
- Current games are close to adapter-ready for aggregate `score`, `accuracy`, `attempt`, `difficulty`, `maxCombo`/streak, mistake counts, and `xpProposed`.
- No implemented game currently has a durable `lessonId`, `roundId`, `sessionId`, idempotency key, or standardized `completedAt` source.
- Several games track elapsed time indirectly through countdown timers, but many have no normalized duration source. A wrapper-level session timer should supply `durationMs` for all games, with game-specific countdown deltas used only when reliable.
- Current client persistence uses `local-user` or hardcoded user fallback patterns in several games. The future adapter must not forward client user IDs; server routes must derive user identity.
- Privacy posture remains generally safe because current saved data is aggregate. The future telemetry adapter should preserve that boundary and avoid raw keystrokes, raw pointer traces, raw typed answers, or click-path sequences.

### Canonical Alias Strategy

Recommended strategy:
- Use one canonical snake_case `moduleId`/`gameKey` per playable game.
- Preserve current `/gaming` routes and component folders during this phase.
- Add aliases only in a future registry/adapter layer, not by renaming routes or folders now.
- Treat docs/assets folder aliases as lookup aliases only. Contract payloads should always emit canonical `moduleId`.
- Store `sourceRoute`, `componentKey`, and `assetFolder` separately in registry metadata so future migration to `/skills` does not disturb XP/progress identity.

| Mismatch | Canonical moduleId/gameKey | Current route | Current code key | Asset/doc alias | Recommended handling |
|---|---|---|---|---|---|
| `target_tracker` vs `target_tracker_adventure` | `target_tracker_adventure` | `/gaming/target-tracker` | `target_tracker` | `target-tracker-adventure` | Keep route/code for now; registry maps `target_tracker` as legacy alias to canonical contract key. |
| `precision_painter_studio` vs `precision_painter` | `precision_painter_studio` | `/gaming/precision-painter-studio` | `precision_painter_studio` | Healthy Play uses `precision_painter` | Keep full game name as canonical; map Healthy Play profile alias to canonical key. |
| `discovery_trails` vs `discovery-trail` | `discovery_trails` | `/gaming/discovery-trails` | `discovery_trails` | `discovery-trail` asset/refinement folder | Keep plural route/key as canonical; map singular asset folder alias. |
| `circuit_builder_lab` vs `circut-builder-lab` | `circuit_builder_lab` | `/gaming/circuit-builder-lab` | `circuit_builder_lab` | `circut-builder-lab` typo | Keep correctly spelled canonical key; map misspelled asset/refinement folder alias. |
| `typing_meteor_defense` vs `typing-meteor` | `typing_meteor_defense` | `/gaming/typing-meteor-defense` | `typing_meteor_defense` | component folder `typing-meteor`; no asset folder | Keep prompt/route key as canonical; map component folder alias; asset folder remains missing. |
| Shape Shifter missing route/component | `shape_shifter` | missing; expected `/gaming/shape-shifter` | missing; expected `shape_shifter` | `shape-shifter` assets/docs | Reserve canonical key, but mark adapter blocked until component and route exist. |

### Contract Alignment Table A - Identity And Adapter Target

| Game | Canonical moduleId/gameKey | Current route | Asset folder alias | Adapter requirement |
|---|---|---|---|---|
| Typing Meteor Defense | `typing_meteor_defense` | `/gaming/typing-meteor-defense` | none found; component folder `typing-meteor` | Game-end adapter plus asset alias/missing-asset handling. |
| Story Sort Drag-and-Drop | `story_sort` | `/gaming/story-sort` | none found | Game-end adapter plus missing-asset handling. |
| Target Tracker Adventure | `target_tracker_adventure` | `/gaming/target-tracker` | `target-tracker-adventure` | Alias adapter from code key `target_tracker`; route preserved. |
| Word Builder Farm | `word_builder_farm` | `/gaming/word-builder-farm` | `word-builder-farm` | Standard game-end adapter. |
| Math Key Quest | `math_key_quest` | `/gaming/math-key-quest` | `math-key-quest` | Standard game-end adapter; hints as metadata only. |
| Bug Trail Maze | `bug_trail_maze` | `/gaming/bug-trail-maze` | `bug-trail-maze` | Standard game-end adapter; pointer/path data aggregate only. |
| Rhythm Row Typing | `rhythm_row_typing` | `/gaming/rhythm-row-typing` | `rhythm-row-typing` | Standard game-end adapter; timing metrics aggregated only. |
| Code Keys Workshop | `code_keys_workshop` | `/gaming/code-keys-workshop` | `code-keys-workshop` | Standard game-end adapter. |
| Galaxy Click Command | `galaxy_click_command` | `/gaming/galaxy-click-command` | `galaxy-click-command` | Standard game-end adapter; click data aggregate only. |
| Circuit Builder Lab | `circuit_builder_lab` | `/gaming/circuit-builder-lab` | `circut-builder-lab` | Alias adapter for misspelled asset/docs folder. |
| Gravity Workshop | `gravity_workshop` | `/gaming/gravity-workshop` | `gravity-workshop` | Standard game-end adapter; completion score normalization needed. |
| Discovery Trails | `discovery_trails` | `/gaming/discovery-trails` | `discovery-trail` | Alias adapter for singular asset/docs folder. |
| Word Storm | `word_storm` | `/gaming/word-storm` | `word-storm` | Standard game-end adapter; duration from countdown delta. |
| Memory Match | `memory_match` | `/gaming/memory-match` | `memory-match` | Standard game-end adapter; difficulty normalization needed. |
| Cipher Quest | `cipher_quest` | `/gaming/cipher-quest` | `cipher-quest` | Standard game-end adapter; hints/vocabulary metadata only. |
| Droplets | `droplets` | `/gaming/droplets` | `droplets` | Standard game-end adapter. |
| Shakerz | `shakerz` | `/gaming/shakerz` | `shakerz` | Standard game-end adapter; click labels should not become raw telemetry. |
| Shape Shifter | `shape_shifter` | missing; expected `/gaming/shape-shifter` | `shape-shifter` | Blocked until game component/route exist. |
| Keyboard Expedition | `keyboard_expedition` | `/gaming/keyboard-expedition` | `keyboard-expedition` | Standard game-end adapter. |
| Precision Painter Studio | `precision_painter_studio` | `/gaming/precision-painter-studio` | `precision-painter-studio`; Healthy Play alias `precision_painter` | Alias adapter for Healthy Play profile; pointer trace aggregate only. |

Keyboard Coach note: Keyboard Coach is a shared/support system, not a standalone contract-emitting playable game in this checkpoint. It should feed metadata such as `keyboard_coach_used` or assist state into game-specific payload metadata later, but should not emit independent XP/progress payloads unless product scope changes.

### Contract Alignment Table B - Progress Payload Field Mapping

| Game | lessonId/roundId source or gap | score source | accuracy source | durationMs source or gap | attempt source | difficulty source |
|---|---|---|---|---|---|---|
| Typing Meteor Defense | Gap; derive future `lessonId` from grade/config prompt set and `roundId` from wrapper. | `roundScore`/correct answers. | `correct / attempts`. | Countdown delta from round duration and `timeLeft`; wrapper timer preferred. | Current `attempts` counts prompt attempts; round retry attempt gap. | Grade plus config speed/spawn settings; no explicit easy/medium/hard. |
| Story Sort Drag-and-Drop | Gap; derive from grade/task type and wrapper `roundId`. | Correct placements. | `correct / attempts`. | Gap; wrapper timer required. | Current placement attempts; round retry attempt gap. | Grade/task type; no explicit difficulty field. |
| Target Tracker Adventure | Gap; derive from task type/grade and wrapper `roundId`. | Correct clicks/objects collected. | `correct / attempts`. | Countdown delta from `ROUND_SECONDS`, `timeLeft`, and tracking seconds; wrapper timer preferred. | Current click attempts; round retry attempt gap. | Task difficulty is implicit through size/speed/lifetime/path; explicit adapter normalization needed. |
| Word Builder Farm | Gap; derive from task id/category/grade and wrapper `roundId`. | `tasksDone`/words completed. | `correct / attempts`. | Gap; wrapper timer required. | Current typing attempts; round retry attempt gap. | `task.difficulty`. |
| Math Key Quest | Gap; derive from task id/category/grade and wrapper `roundId`. | `problemsDone`. | `correct / attempts`. | Gap; wrapper timer required. | Current answer attempts; round retry attempt gap. | `task.difficulty`. |
| Bug Trail Maze | Gap; derive from task type/grade and wrapper `roundId`. | Correct items or items collected; choose correct items for contract `score`. | `pathAccuracy` in summary; saved as `accuracy`. | Gap; wrapper timer required. | Current interaction attempts; round retry attempt gap. | `task.difficulty`. |
| Rhythm Row Typing | Gap; derive from pattern/BPM/grade and wrapper `roundId`. | Correct patterns completed. | `correct / attempts`. | Gap; wrapper timer required. | Current typing attempts; round retry attempt gap. | `task.difficulty`. |
| Code Keys Workshop | Gap; derive from task type/grade and wrapper `roundId`. | Patterns completed. | `correct / attempts`. | Gap; wrapper timer required. | Current input attempts; round retry attempt gap. | `task.difficulty`. |
| Galaxy Click Command | Gap; derive from task type/grade and wrapper `roundId`. | Correct targets completed. | `correct / attempts`. | Gap; wrapper timer required. | Current click attempts; round retry attempt gap. | `task.difficulty`. |
| Circuit Builder Lab | Gap; derive from circuit task/grade and wrapper `roundId`. | Correct placements or completion percent; choose completion percent for progress score and correct placements for metadata. | Saved `accuracy`; summary also has completion. | Gap; wrapper timer required. | Current placement attempts; round retry attempt gap. | Task difficulty. |
| Gravity Workshop | Gap; derive from puzzle/task type/grade and wrapper `roundId`. | Completion percent or success flag; choose completion percent for progress score. | `completion` is saved as accuracy-like value. | Gap; wrapper timer required. | Current puzzle attempts. | `puzzle.difficulty`. |
| Discovery Trails | Gap; derive from event type/grade and wrapper `roundId`. | Events/challenges completed. | `correct / attempts`. | Gap; wrapper timer required. | Current typed response attempts; round retry attempt gap. | `event.difficulty`. |
| Word Storm | Gap; derive from grade/active word set and wrapper `roundId`. | Words typed/correct. | `correct / attempts`. | Countdown delta from 75 seconds and `timeLeft`; wrapper timer preferred. | Current typing attempts; round retry attempt gap. | Currently grade; adapter should map to difficulty band or metadata. |
| Memory Match | Gap; derive from board/card set/grade and wrapper `roundId`. | Matches completed. | `matches / attempts` style current accuracy. | Gap; wrapper timer required. | Current card attempts; round retry attempt gap. | Currently grade; adapter should map to difficulty band or metadata. |
| Cipher Quest | Gap; derive from puzzle type/grade and wrapper `roundId`. | Puzzles solved. | Logic accuracy/current `accuracy`. | Gap; wrapper timer required. | Current answer attempts; round retry attempt gap. | `puzzle.difficulty`. |
| Droplets | Gap; derive from word/category/grade and wrapper `roundId`. | Words completed. | `correct / attempts`. | Gap; wrapper timer required. | Current typing attempts; round retry attempt gap. | `word.difficulty`. |
| Shakerz | Gap; derive from scenario type/grade and wrapper `roundId`. | Correct targets completed. | `correct / attempts`. | Gap; wrapper timer required. | Current click attempts; round retry attempt gap. | `scenario.difficulty`. |
| Shape Shifter | Gap; no component source exists. | Gap; expected score from future key prompts/obstacle success. | Gap. | Gap. | Gap. | Gap; prompt likely expects level/grade/difficulty. |
| Keyboard Expedition | Gap; derive from task type/grade and wrapper `roundId`. | Challenges completed. | `correct / attempts`. | Gap; wrapper timer required. | Current typing attempts; round retry attempt gap. | `task.difficulty`. |
| Precision Painter Studio | Gap; derive from tracing task/grade and wrapper `roundId`. | Completion percent or correct checks; choose completion/precision composite for progress score. | `correct / attempts`; precision also available. | Gap; wrapper timer required. | Current check/evaluation attempts; round retry attempt gap. | `task.difficulty`. |

### Contract Alignment Table C - XP, Session, And Telemetry Mapping

| Game | maxCombo/bestStreak source | mistakeCount source | completedAt source | xpProposed/baseXP source | sessionId source or gap | idempotencyKey source or gap | Privacy-safe telemetry notes |
|---|---|---|---|---|---|---|---|
| Typing Meteor Defense | `bestStreak`. | `missed` or `attempts - correct`. | Gap; adapter should stamp completion time. | `finalXP`/`xpEarned` plus streak/accuracy bonuses. | Gap; Healthy Play/session wrapper should provide. | Gap; use `skills:typing_meteor_defense:lesson_complete:user:{userId}:session:{sessionId}:attempt:{attempt}`. | Do not store raw typed characters; aggregate correct/missed/streak only. |
| Story Sort Drag-and-Drop | `bestStreak`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `finalRoundXP`. | Gap; wrapper should provide. | Gap; use canonical key + lessonId + sessionId + round attempt. | Store placement counts/task type only, not full drag path. |
| Target Tracker Adventure | `bestStreak`. | `missed` or `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; use canonical `target_tracker_adventure`, not legacy `target_tracker`. | Store tracking percentage/click counts only, not raw pointer trail. |
| Word Builder Farm | `bestStreak`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + task/lesson + session + round attempt. | Typed answers are task-defined and transient; save aggregate counts only. |
| Math Key Quest | `bestStreak`. | `attempts - correct`; hints as metadata. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + task/lesson + session + round attempt. | Do not store raw wrong answers; hints used can be aggregate metadata. |
| Bug Trail Maze | `bestStreak`. | `missedItems` or `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + task/lesson + session + round attempt. | Store path accuracy/items only, not path trace. |
| Rhythm Row Typing | `bestCombo`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + pattern lesson + session + round attempt. | Timing consistency should be aggregated; do not store keystroke timestamps. |
| Code Keys Workshop | `bestStreak`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + task/lesson + session + round attempt. | Store mastered symbols/pattern categories, not raw typed sequence. |
| Galaxy Click Command | `bestStreak`. | `attempts - correct`/targets missed. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + task/lesson + session + round attempt. | Store target counts/task type, not click coordinates or sequence. |
| Circuit Builder Lab | Gap/limited; no clear combo in summary. | Attempts minus correct placements, if available. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + circuit lesson + session + round attempt. | Store placement accuracy/completion only, not full drag trace unless explicitly anonymized. |
| Gravity Workshop | `streak`. | Attempts minus success or total failed attempts; normalize in adapter. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + puzzle lesson + session + round attempt. | Store aggregate object types used/completion only, not detailed sandbox movement. |
| Discovery Trails | `bestStreak`. | `attempts - correct`; hints as metadata. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + event lesson + session + round attempt. | Do not store raw written responses; save vocabulary/event categories and aggregate accuracy. |
| Word Storm | `bestCombo`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + lesson + session + round attempt. | Do not store raw typed entries beyond task vocabulary metadata. |
| Memory Match | `memoryStreak`/`bestStreak`. | `attempts - matches`, normalized carefully because attempts may be pair flips. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + board lesson + session + round attempt. | Store match count/category only, not unnecessary click order. |
| Cipher Quest | `bestStreak`. | `attempts - correct`; hints as metadata. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + puzzle lesson + session + round attempt. | Do not store raw typed guesses; vocabulary/category metadata is acceptable. |
| Droplets | `bestStreak`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + word lesson + session + round attempt. | Pronunciation/play counts can be aggregate metadata; no raw audio/typing telemetry. |
| Shakerz | `bestStreak`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + scenario lesson + session + round attempt. | Store scenario/category/click accuracy only, not click sequence. |
| Shape Shifter | Gap; no component source exists. | Gap. | Gap. | Gap; expected from future prompt implementation. | Gap. | Gap. | Cannot evaluate runtime telemetry until game exists; docs imply aggregate keyboard timing only. |
| Keyboard Expedition | `bestStreak`. | `attempts - correct`. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; canonical key + task lesson + session + round attempt. | Do not store raw typed answers; task/category mastery metadata only. |
| Precision Painter Studio | `bestStreak`. | `attempts - correct`; precision misses may need metadata. | Gap; adapter should stamp completion time. | `roundXP`. | Gap; wrapper should provide. | Gap; use canonical `precision_painter_studio`, not Healthy Play alias. | Store precision/completion aggregates only, not raw pointer trace. |

### Adapter Requirements

Recommended adapter shape for future implementation:
- A shared game registry should expose `moduleId`, `legacyGameKeys`, `route`, `componentFolder`, `assetFolder`, `category`, and default lesson/difficulty metadata.
- A shared `SkillRoundResult` builder should normalize per-game summary props into a stable object before any XP/progress payload is created.
- A shared progress/XP adapter should create:
  - XP event payload with `moduleId`, `activityType`, `score`, `accuracy`, `durationMs`, `attempt`, `difficulty`, `xpProposed`, `sessionId`, and `idempotencyKey`.
  - Progress payload with `moduleId`, `lessonId`, `status`, `score`, `accuracy`, `durationMs`, `attempt`, `maxCombo`, `mistakeCount`, and `completedAt`.
- `durationMs`, `sessionId`, `completedAt`, and idempotency key generation should come from the shared wrapper/adapter, not individual games.
- `attempt` should be split conceptually into:
  - `interactionAttempts`: current in-game attempts/clicks/answers, retained in metadata where helpful.
  - `roundAttempt`: contract retry/submission attempt used for idempotency and progress.
- XP proposed by games should remain a hint. Future server routes must compute final awarded XP and enforce caps.
- Privacy metadata should include only aggregates: counts, percentages, task categories, difficulty, assist-mode use, and summary stats.

### Checkpoint 4 Missing Items Report

| Priority | Missing Item | Evidence | Recommended Action | Risk |
|---|---|---|---|---|
| P0 blocker | Canonical registry/alias map | Multiple route/code/asset/profile naming mismatches | Define registry before any adapter implementation | Payload identity drift and duplicated progress rows. |
| P0 blocker | Shared `lessonId` and `roundId` strategy | No durable per-game source found | Derive from registry + task metadata + wrapper-generated `roundId` | Progress upsert cannot be stable by `(user, module, lesson)`. |
| P0 blocker | `sessionId` generation | No game/session wrapper source found | Generate in Shared Game Shell/Healthy Play wrapper | XP idempotency and Healthy Play duration cannot be connected. |
| P0 blocker | Idempotency-key generation | No current source found | Generate in progress/XP adapter from canonical key, activity, user, session, lesson, round attempt | Duplicate XP on retries/reloads. |
| P1 important | Normalized `durationMs` | Only some games expose countdown deltas; many have no timer | Use wrapper-level active session duration, excluding idle/break time where available | Inconsistent duration analytics and XP balancing. |
| P1 important | `completedAt` source | Current summaries do not standardize completion timestamp | Adapter stamps ISO timestamp at terminal round event | Progress records lack reliable completion metadata. |
| P1 important | Score semantics | Some games have multiple score-like values such as completion, precision, correct count | Registry should document per-game primary score and metadata fields | Dashboards may compare unlike values incorrectly. |
| P1 important | Round attempt vs interaction attempts | Current `attempts` usually means answers/clicks, not replay attempt | Adapter should track retry attempt separately | Idempotency keys and learning analytics may be misleading. |
| P1 important | Shape Shifter missing runtime | Assets/docs exist but component/route absent | Keep canonical key reserved; implement later only after approval | Cannot emit contract payloads for expected game. |

### Checkpoint 4 Readiness Snapshot

| Area | Status | Main Reason |
|---|---|---|
| moduleId/gameKey mapping | planned | Canonical values can be chosen now, but registry does not exist. |
| Route preservation | ready | Current `/gaming` paths can remain while registry maps aliases. |
| Asset aliasing | needed | Several asset/doc folders differ from route or code names. |
| lessonId/roundId | blocked | No standardized source yet. |
| score/accuracy | mostly ready | Current games expose aggregate score/accuracy signals. |
| durationMs | partial | Some timers exist, but wrapper timer is needed for consistency. |
| attempt | partial | Interaction attempts exist; round retry attempts do not. |
| difficulty | mostly ready | Most games expose task difficulty; a few use grade only. |
| maxCombo/bestStreak | mostly ready | Most games expose streak/combo; Circuit/Gravity need normalization. |
| mistakeCount | mostly ready | Generally derivable from attempts minus correct or missed fields. |
| completedAt | blocked | Adapter timestamp needed. |
| xpProposed/baseXP | mostly ready | Current round XP is available but must remain a server-validated hint. |
| sessionId | blocked | Shared wrapper/Healthy Play integration needed. |
| idempotencyKey | blocked | Adapter generation needed. |
| privacy-safe telemetry | mostly ready | Aggregate-only approach is viable if adapter avoids raw inputs/traces. |

## Checkpoint 5 - Accessibility, Healthy Play, Sound, And Animation Pass

Scope guard: this checkpoint is review/planning only. No game code, routes, assets, schemas, dashboards, landing page, Skills Hub UI, `/gaming` routing, API routes, Supabase migrations, dashboard pages, or production writes were changed.

Reviewed cross-game signals from:
- Checkpoint 2 per-game readiness findings.
- Checkpoint 3 shared-system findings for Healthy Play, Accessibility Assist Controls, Keyboard Coach, XP Round Summary, sound helpers, and animation notes.
- Shared controls in `/components/gaming/shared/GameControlRow.tsx` and `/components/gaming/shared/GameTopBar.tsx`.
- Healthy Play helpers/components in `/components/healthy-play` and `/lib/healthy-play`.
- Sound helper stubs in `/lib/gaming/soundEffects.ts`.

Overall Checkpoint 5 findings:
- Most games have basic keyboard-usable HTML controls, large-ish `min-h-11` buttons, a sound toggle, a reduced-motion toggle, pause/resume controls, visual score/accuracy/streak feedback, and non-audio round summaries.
- The major gap is consistency: accessibility controls are local per game, not shared or persisted, and not all games expose the same assist settings.
- No game is currently wrapped by Healthy Play. That blocks idle exclusion, Calm Mode, progress preservation before Healthy Play navigation, XP efficiency, and shared active-session timing.
- Focus visibility is not standardized. Some inputs use `outline-none`, and most buttons rely on browser defaults or Tailwind hover/color states rather than an explicit shared focus ring.
- Sound is fail-safe because helpers no-op when disabled, but there is no shared `on`/`quiet`/`off` preference, no Calm Mode sound intensity, and no central sound policy.
- Reduced motion exists locally in many games but is inconsistent and does not yet consume Healthy Play or Accessibility Assist settings.
- Shape Shifter cannot be evaluated at runtime because its route/component are missing.

### Cross-Game Readiness Matrix

| Requirement | Current readiness | Gaps | Priority |
|---|---|---|---|
| Keyboard navigation | partial | Native buttons/inputs help, but drag/drop, pointer, canvas-like, and moving-target interactions need keyboard alternatives and focus order review. | P1 important |
| Visible focus states | partial | No shared focus-ring style; some controls use `outline-none`; high-contrast focus style is not centralized. | P1 important |
| Large touch targets | mostly ready | Shared buttons generally use `min-h-11`; some dynamic targets/cards may need shared larger-target scaling. | P2 polish |
| High contrast | partial | Spec/helper support exists, but games mostly do not consume shared high-contrast settings. | P1 important |
| Larger text | partial | Some grade-specific large text exists, but no shared larger-text setting reaches all games. | P2 polish |
| Reduced motion | partial | Many local toggles exist; behavior varies and is not driven by shared settings or OS preference. | P1 important |
| Sound off / quiet sound | partial | Local mute/sound booleans exist and helpers no-op, but no shared quiet mode or Calm Mode sound intensity. | P1 important |
| Non-audio critical cues | mostly ready | Visual feedback and summaries exist; final verification needed that all sound cues have visual equivalents. | P2 polish |
| Non-animation critical cues | partial | Many games use text/status, but timing/moving-target games may still depend on motion for target discovery. | P1 important |
| Break-safe pause/resume | partial | Game pause/resume exists, but Healthy Play break flow is not mounted and state preservation is not shared. | P1 important |
| Idle exclusion | blocked | Healthy Play session tracking exists but is not mounted around games. | P0 blocker |
| Calm Mode compatibility | blocked/partial | Healthy Play/accessibility helpers support Calm Mode, but games do not consume shared Calm Mode state. | P1 important |
| Progress preservation before navigation | blocked | `onPreserveGameState` exists in provider, but no game wrapper passes state-save callbacks. | P0 blocker |
| Healthy Play wrapper readiness | planned | Provider/components exist, but no Shared Game Shell/runtime wrapper mounts them for games. | P0 blocker |
| XP efficiency connection readiness | blocked | XPBalanceController exists, but game XP awards do not pass through Healthy Play or the contract adapter. | P0 blocker |

### Typing Games

Included games: Typing Meteor Defense, Word Builder Farm, Math Key Quest, Rhythm Row Typing, Code Keys Workshop, Word Storm, Droplets, Cipher Quest, Discovery Trails, Keyboard Expedition, and future Shape Shifter.

Readiness:
- Keyboard input is central to these games, and most have text inputs or key-entry flows.
- Keyboard Coach is present across many implemented typing games.
- Most expose sound toggles, reduced-motion toggles, pause/resume, visual accuracy/streak/XP, and round summaries.
- Some games have larger prompt text by grade or visible keyboard guides.

Gaps:
- P0 blocker: Shape Shifter has no route/component, so its keyboard accessibility cannot be verified.
- P1 important: Keyboard Coach settings are not shared; `KeyboardCoachDock` currently manages its own provider pattern instead of consuming a shell-level assist provider.
- P1 important: Several games use timed or moving prompts, but reduced motion/slower mode/reduced simultaneous targets are not consistently tied to the shared Accessibility Assist system.
- P1 important: Focus restoration after pause, summary, Healthy Play prompts, or Keyboard Coach overlays is not standardized.
- P1 important: Raw typing should stay transient. Future telemetry must continue storing only aggregate counts, accuracy, category, and assist metadata.
- P2 polish: Larger letters/text should become a shared setting rather than per-game grade-specific sizing.
- P2 polish: Sound toggles should move from local booleans to shared sound preference with `on`, `quiet`, and `off`.

Recommended next action:
- Put typing games behind the future Shared Game Shell first, because they are the broadest group and can validate Keyboard Coach, sound, reduced motion, activity tracking, and XP efficiency in one path.

### Pointer / Click Games

Included games: Target Tracker Adventure, Galaxy Click Command, Shakerz, Precision Painter Studio, and pointer-heavy portions of Bug Trail Maze.

Readiness:
- Most pointer/click games use real buttons or pointer handlers with visible labels/status text.
- Galaxy Click Command and Shakerz expose larger-target or slower-mode style controls.
- Target Tracker and Precision Painter expose aggregate accuracy/precision signals that are privacy-safe if raw pointer traces are not stored.

Gaps:
- P1 important: Pointer-only movement/tracking and tracing need keyboard or alternate input paths, especially Target Tracker and Precision Painter Studio.
- P1 important: Non-animation critical cues need review where moving targets or tracing paths are the main challenge.
- P1 important: High contrast and larger target settings are local or absent, not shared.
- P1 important: Pause/resume does not yet coordinate with Healthy Play break states or state preservation.
- P2 polish: Click target focus order and visible focus rings need consistency.
- P2 polish: Sound-off visual feedback should be verified for each click success/failure.
- P3 future: Pointer precision could later support motor-control presets such as slower target movement, wider paths, or reduced target count, using the shared assist provider.

Recommended next action:
- Prioritize keyboard alternatives and aggregate-only telemetry rules before adding any production progress adapter for pointer/click games.

### Drag / Drop Games

Included games: Story Sort Drag-and-Drop, Circuit Builder Lab, Gravity Workshop, Bug Trail Maze, and drag/placement aspects of Precision Painter Studio.

Readiness:
- Story Sort uses button-like draggable items, and Circuit has shared workspace/assist components.
- Circuit and some STEM games have larger-target or assist concepts.
- Round summaries generally expose completion, accuracy, attempts, and XP visually.

Gaps:
- P1 important: Drag/drop interactions need explicit keyboard alternatives: select item, move focus to target, place/drop, undo/retry.
- P1 important: Focus states for draggable/selectable items and drop targets need a shared high-contrast style.
- P1 important: Non-animation critical cues are needed for placement validity, collision, path, or circuit-flow feedback.
- P1 important: Progress preservation before route navigation is not shared; mid-puzzle state can be lost.
- P2 polish: Larger target support should be driven by shared assist settings rather than local per-game controls.
- P2 polish: Sound cues should remain supplementary only; validation and completion feedback must be text/icon/state based.
- P3 future: Advanced assist modes could include snap-to-slot, reduced component count, or guided placement, but should not be framed as XP-penalized help.

Recommended next action:
- Design the shared drag/drop accessibility pattern before implementing contract adapters for Story Sort and Circuit Builder Lab.

### Timing / Rhythm Games

Included games: Rhythm Row Typing, Typing Meteor Defense, Word Storm, Droplets, Target Tracker Adventure, and future Shape Shifter.

Readiness:
- These games generally expose timers, status text, pause/resume controls, sound toggles, and reduced-motion toggles.
- Rhythm Row has slower rhythm mode; Typing Meteor has a local reduced-motion option and grade-based speed settings.

Gaps:
- P0 blocker: XP efficiency and idle exclusion are not connected, which matters most for timed games.
- P1 important: Slower mode, reduced simultaneous targets, reduced motion, and Calm Mode should be shared settings with no XP penalty.
- P1 important: Critical timing cues must not be audio-only or animation-only. Rhythm/timing prompts need text/static alternatives.
- P1 important: Pause/resume should freeze timers, moving elements, and Healthy Play active-time accounting consistently.
- P2 polish: Timer announcements and status changes should be screen-reader-friendly without becoming noisy.
- P3 future: Per-student pacing profiles can be added later after shared assist settings exist.

Recommended next action:
- Use one timing game, likely Rhythm Row Typing or Typing Meteor Defense, as the first future validation target for reduced motion, slower mode, idle exclusion, and XP efficiency.

### Memory / Puzzle Games

Included games: Memory Match, Cipher Quest, Circuit Builder Lab, Gravity Workshop, Discovery Trails, Math Key Quest, and Shape Shifter once implemented.

Readiness:
- Memory Match cards are buttons and have large target sizes.
- Cipher Quest, Discovery Trails, and Math Key Quest rely on text prompts/answers, which are naturally compatible with keyboard input.
- Puzzle games tend to have clear visual summaries and aggregate progress metrics.

Gaps:
- P1 important: Memory Match needs explicit non-animation state cues when flip animation is reduced.
- P1 important: Puzzle hints and correctness feedback must avoid color-only signaling and should be available when sound is off.
- P1 important: High contrast/larger text settings are not shared across puzzle instructions, cards, and summaries.
- P1 important: Healthy Play break/resume must preserve puzzle state, selected cards, current prompt, and partial progress.
- P2 polish: Focus should return to the active puzzle control after hints, pause, summary, or Healthy Play prompts.
- P3 future: Puzzle difficulty and hint support can later feed private assist metadata, but should not reduce XP by itself.

Recommended next action:
- Include Memory Match in future accessibility QA because it exercises focus, card states, reduced motion, large targets, and non-color-only feedback.

### Shared Support Systems

Included systems: Shared Game Shell, Accessibility Assist Controls, Keyboard Coach, Healthy Play, Supabase Progress Layer, XP Round Summary System, sound helpers, animation/reduced-motion helpers.

Readiness:
- Healthy Play provider/hooks/session/XP efficiency/accessibility helpers are implemented enough to plan wrapper integration.
- Accessibility Assist Controls are well specified and Healthy Play accessibility helpers can produce classes/data attributes, but no game consumes a unified assist provider yet.
- Shared controls give a consistent starting point for start/pause/resume/end/sound/reduced-motion buttons.
- Sound helpers are safe no-ops when disabled.
- Per-game round summaries provide visible non-audio completion information.

Gaps:
- P0 blocker: No Shared Game Shell/runtime wrapper mounts Healthy Play, SessionTracker, Accessibility Assist settings, or progress preservation around games.
- P0 blocker: No shared adapter connects game-end results to XP efficiency before XP/progress payload creation.
- P1 important: Shared controls lack explicit focus-ring/high-contrast styling and do not expose assist settings beyond sound/reduced motion.
- P1 important: No unified `soundPreference` with `on`, `quiet`, and `off`.
- P1 important: Reduced motion, high contrast, larger text, and larger targets should be propagated via shared context/classes/data attributes.
- P1 important: Round summary system needs a shared save/sync status and focus strategy.
- P2 polish: Keyboard Coach should move to shell/provider-level settings and avoid duplicate keyboard displays.
- P3 future: Parent/teacher accessibility profiles and dashboards remain deferred.

Recommended next action:
- Before implementation, define the Shared Game Shell responsibilities precisely: Healthy Play wrapper, assist provider, sound preference, focus management, progress preservation callback, and round-result adapter attachment.

### Prioritized Issue List

| Priority | Issue | Evidence | Recommended action |
|---|---|---|---|
| P0 blocker | Healthy Play wrapper not mounted around games | No game imports/mounts `HealthyPlayProvider`, `SessionTracker`, or `WellnessPromptSystem` | Plan Shared Game Shell/runtime wrapper before code integration. |
| P0 blocker | Idle exclusion unavailable in games | Session tracking exists but is disconnected from `/gaming` routes | Mount SessionTracker once per game route in future shell. |
| P0 blocker | Progress preservation before navigation missing | Provider supports `onPreserveGameState`; games do not pass callbacks | Connect shell navigation to the future progress/round-result adapter. |
| P0 blocker | XP efficiency not connected to XP awards | XPBalanceController exists; game XP is local/direct | Route future XP proposals through Healthy Play efficiency before contract payload creation. |
| P0 blocker | Shape Shifter runtime missing | Assets/docs exist, no component/route | Keep blocked until implementation is approved. |
| P1 important | No unified accessibility assist provider | Accessibility spec exists; local toggles vary | Create shared assist provider/panel in future shell. |
| P1 important | Focus states not standardized | Buttons rely on defaults; some inputs use `outline-none` | Add shared focus-ring/high-contrast style later. |
| P1 important | Drag/drop and pointer-only alternatives incomplete | Several games rely on pointer/drag/tracking/tracing | Define keyboard alternate interaction pattern per game type. |
| P1 important | Reduced motion is inconsistent | Local toggles vary and do not consume OS/Healthy Play settings | Drive motion from shared assist/Calm Mode state. |
| P1 important | Calm Mode not consumed by games | Healthy Play has Calm Mode helpers but no game wrapper | Map Calm Mode to reduced stimulation, quiet sound, reduced motion, and softer visuals. |
| P1 important | Sound preference is local boolean only | Game controls use `soundOn`/`mute`; helper accepts boolean | Add shared sound adapter for `on`/`quiet`/`off`. |
| P1 important | Non-animation alternatives need review for timing games | Moving/timed prompts can be essential | Add static/text cues and slower/reduced-target modes. |
| P1 important | Round summaries lack shared focus/save behavior | Per-game summaries exist but are bespoke | Standardize summary open focus, save status, and return navigation. |
| P2 polish | Large targets are mostly local | Some games support `largeTargets`; many do not | Propagate shared larger-target setting gradually. |
| P2 polish | Larger text is not shared | Grade-based prompt sizing exists, but no global setting | Add shared larger-text class/data attribute later. |
| P2 polish | Non-audio cues should be verified | Visual cues exist, but not systematically tested | Include sound-off QA in Checkpoint 6 acceptance criteria. |
| P2 polish | Keyboard Coach provider placement | Dock appears in many games, but settings are not centralized | Move Keyboard Coach settings to shell-level provider later. |
| P3 future | Advanced assist profiles | Spec discusses future profile/presets | Defer parent/teacher and personalized accessibility profiles. |
| P3 future | Motor-control presets | Useful for pointer/drag games | Defer until shared assist MVP is stable. |

### Checkpoint 5 Readiness Snapshot

| Category | Status | Main reason |
|---|---|---|
| Typing games | partial to mostly ready | Keyboard-first gameplay and visual summaries exist, but shared assist/Healthy Play integration is missing. |
| Pointer/click games | partial | Large targets and visual feedback exist in places; keyboard alternatives and raw pointer privacy guardrails need standardization. |
| Drag/drop games | partial | Core interactions exist, but keyboard alternatives and drop-target focus states need design. |
| Timing/rhythm games | partial | Local timers and reduced-motion toggles exist; shared slower mode, idle exclusion, and XP efficiency are blocked. |
| Memory/puzzle games | partial to mostly ready | Good button/text foundations; reduced-motion, high-contrast, focus restoration, and state preservation need shared handling. |
| Shared support systems | planned/partial | Specs and helpers are strong, but wrapper/provider/adapters are not mounted in games. |

## Checkpoint 6 - Final Integration Readiness Plan

Scope guard: this final report is planning-only. No game code, routes, assets, schemas, dashboards, landing page, Skills Hub UI, `/gaming` routing, API routes, Supabase migrations, dashboard pages, or production writes were changed.

### 1. Executive Summary

The Skills games package is broadly playable and has a strong planning foundation, but it is not ready for broad XP/progress integration yet.

Current readiness:
- 19 playable `/app/gaming` routes and 19 playable component folders are present.
- 20 playable games are expected by prompts: 18 numbered games plus Keyboard Expedition and Precision Painter Studio.
- Shape Shifter is expected by docs/assets but has no route/component, so only 19 of the 20 expected playable games are currently runnable.
- Keyboard Coach is present as a shared support system, not a standalone playable game.
- Most implemented games expose enough aggregate round-end data for future adapters: score-like output, accuracy, attempts, difficulty, streak/combo, mistake counts, and XP proposals.
- Shared Healthy Play, accessibility, progress, and XP systems are well specified and partially implemented, but not wired into games.

Primary blockers:
- No canonical Skills game registry/alias map exists.
- No Shared Game Shell/runtime wrapper mounts Healthy Play, SessionTracker, assist settings, progress preservation, or XP efficiency.
- No shared `SkillRoundResult` shape or XP/progress adapter exists.
- No standardized `lessonId`, `roundId`, `sessionId`, idempotency key, `durationMs`, or `completedAt` source exists.
- Shape Shifter is missing runtime implementation.

Recommended direction:
- Do not start API routes, Supabase migrations, dashboards, billing gates, route migration, or broad UI redesign yet.
- First implement a narrow shared runtime/registry foundation around one or two existing games while preserving `/gaming` routes.
- Treat XP/progress payload creation as adapter-only until the contract is validated locally.

### 2. Source Review Checklist

| Source area | Reviewed | Notes |
|---|---|---|
| Integration plan prompt | Yes | `/docs/skills-games/refinement-prompts/skills-games-integration-plan-prompt.md`. |
| Integration contract | Yes | `/docs/skills-games/integration/Skills_Module_Integration_Contract.md`. |
| Initial game prompts | Yes | 25 prompt files reviewed/inventoried. |
| Refinement prompts | Yes | 20 refinement files found; Typing Meteor and Story Sort lack direct refinement docs. |
| Shared system specs | Yes | Accessibility Assist, Keyboard Coach, Shared Game Shell, Supabase Progress Layer, XP Round Summary. |
| Healthy Play docs | Yes | Healthy Play refinement prompt and shared assets reviewed. |
| Game assets | Yes | 18 game asset folders found. |
| Shared assets | Yes | 6 shared asset folders found. |
| Game components | Yes | 19 playable component folders plus shared/Keyboard Coach. |
| Game routes | Yes | 19 playable `/app/gaming` route folders. |
| Healthy Play code | Yes | Provider/hooks/session/reminder/XP/accessibility helpers reviewed. |
| Gaming progress helpers | Yes | Current fail-soft/local helper shape reviewed. |
| Sound helpers | Yes | No-op/fail-safe helper stubs reviewed. |

### 3. Expected Skills Games Inventory

| Group | Games | Readiness |
|---|---|---|
| Keyboard/typing | Typing Meteor Defense, Word Builder Farm, Math Key Quest, Rhythm Row Typing, Code Keys Workshop, Word Storm, Droplets, Cipher Quest, Discovery Trails, Keyboard Expedition | Playable except shared adapter gaps. |
| Mouse/pointer/click | Target Tracker Adventure, Galaxy Click Command, Shakerz, Precision Painter Studio | Playable; need alias mapping, keyboard alternatives, and pointer telemetry guardrails. |
| Drag/drop/path/STEM | Story Sort, Bug Trail Maze, Circuit Builder Lab, Gravity Workshop | Playable; need keyboard alternatives and shared adapter mapping. |
| Memory/puzzle | Memory Match plus puzzle portions of Cipher Quest, Circuit Builder Lab, Gravity Workshop, Math Key Quest | Playable; need shared accessibility/focus/state preservation. |
| Missing expected game | Shape Shifter | Assets/docs exist; route/component missing. |
| Shared support | Keyboard Coach | Present as support system; should not emit standalone XP/progress unless product scope changes. |

Inventory conclusion:
- Current repo evidence supports 20 expected playable games, with 19 implemented.
- The prompt's "23 Skills game components" does not reconcile cleanly to playable games. The extra count likely includes shared systems, support components, hub foundation, or prompt drift.

### 4. Shared Systems Inventory

| Shared system | Current state | Integration readiness |
|---|---|---|
| Healthy Play | Provider, hooks, session tracking, reminders, XP efficiency, accessibility helpers, and persistence helpers exist. | Mostly ready as a system, not integrated into games. |
| Shared Game Shell | Specs/assets exist; partial shared controls exist as `GameTopBar` and `GameControlRow`. | Needs runtime wrapper implementation. |
| Accessibility Assist Controls | Strong spec/assets and Healthy Play accessibility helper rules exist. | Needs shared provider/panel and game consumption. |
| Keyboard Coach | Shared overlay/provider/hook pattern exists and is used by many typing games. | Needs shell-level settings and user/session alignment. |
| Supabase Progress Layer | Specs/assets exist; `lib/gaming/progress.ts` is fail-soft/local with backend TODOs. | Not production-ready; adapter should be planned before API/schema work. |
| XP Round Summary System | Per-game summaries exist; shared assets/specs exist. | Needs shared `SkillRoundResult` builder and save/focus/sync behavior. |
| Sound helpers | No-op-safe helper functions exist. | Needs shared `on`/`quiet`/`off` preference and Calm Mode behavior. |
| Animation/reduced motion | Per-game/shared notes exist; local toggles are common. | Needs unified assist/Calm Mode propagation and QA. |

### 5. Per-Game Readiness Review Summary

| Game | Readiness | Main integration note |
|---|---|---|
| Typing Meteor Defense | needs assets/adapter | Playable; no asset/refinement folder found; strong score/accuracy/streak signals. |
| Story Sort Drag-and-Drop | needs assets/adapter | Playable; no asset/refinement folder found; drag/drop accessibility needs follow-up. |
| Target Tracker Adventure | needs alias/adapter | Canonical contract key should be `target_tracker_adventure`; current code key is `target_tracker`. |
| Word Builder Farm | mostly ready | Playable and adapter-friendly; needs shared shell/progress/Healthy Play. |
| Math Key Quest | mostly ready | Playable and adapter-friendly; hints should remain private metadata. |
| Bug Trail Maze | mostly ready | Playable; path/pointer data should remain aggregate only. |
| Rhythm Row Typing | mostly ready | Playable; good candidate for timing/reduced-motion validation. |
| Code Keys Workshop | mostly ready | Playable and adapter-friendly; Keyboard Coach settings need centralization. |
| Galaxy Click Command | mostly ready | Playable; click telemetry should remain aggregate only. |
| Circuit Builder Lab | needs alias/adapter | Playable; asset/refinement typo `circut-builder-lab` should be alias-mapped. |
| Gravity Workshop | mostly ready | Playable; completion/score semantics need registry definition. |
| Discovery Trails | needs alias/adapter | Playable; assets/refinement use singular `discovery-trail`, route/key use plural. |
| Word Storm | mostly ready | Playable; duration can be derived from countdown but wrapper timer preferred. |
| Memory Match | mostly ready | Playable; excellent accessibility QA target for focus, card state, reduced motion. |
| Cipher Quest | mostly ready | Playable; raw guesses should not be persisted. |
| Droplets | mostly ready | Playable; sound/typing/Coach behavior should be shared later. |
| Shakerz | mostly ready | Playable; large targets exist locally; click sequence should not be stored. |
| Shape Shifter | blocked | Expected by docs/assets; no component/route. |
| Keyboard Expedition | mostly ready | Playable; adapter-friendly typing game. |
| Precision Painter Studio | needs alias/accessibility review | Playable; Healthy Play alias mismatch and pointer-trace privacy guardrail. |
| Keyboard Coach | shared support | Present; should be integrated through shell/assist settings. |

### 6. Missing Items Report

| Priority | Missing item | Why it matters |
|---|---|---|
| P0 must-fix | Canonical game registry/alias map | Prevents moduleId drift, duplicate progress rows, and Healthy Play profile mismatches. |
| P0 must-fix | Shared runtime/shell wrapper | Gives one place to mount Healthy Play, session tracking, assist settings, progress preservation, and adapters. |
| P0 must-fix | Shared `SkillRoundResult` shape | Normalizes per-game summaries before XP/progress mapping. |
| P0 must-fix | Session/round identity | Required for `sessionId`, `roundId`, duration, idempotency, and progress preservation. |
| P0 must-fix | Idempotency-key generator | Required before any XP write endpoint can be safe. |
| P0 must-fix | Shape Shifter implementation decision | Expected game is unavailable and cannot be integrated. |
| P1 important | Accessibility Assist provider/panel | Needed for high contrast, larger text, larger targets, reduced motion, sound, Keyboard Coach, and slower mode consistency. |
| P1 important | Sound preference adapter | Converts local booleans to shared `on`/`quiet`/`off` behavior. |
| P1 important | Focus management | Needed for pause, summary, overlays, assist panel, and Healthy Play prompts. |
| P1 important | Keyboard alternatives for drag/pointer games | Needed for Story Sort, Circuit, Target Tracker, Precision Painter, and other pointer-heavy flows. |
| P1 important | Asset/refinement gaps | Typing Meteor and Story Sort assets; naming aliases for Circuit, Discovery, Target Tracker, Precision Painter. |
| P2 polish | Shared larger text/target styling | Improves consistency and reduces per-game duplication. |
| P2 polish | Sound-off and reduced-motion QA | Ensures no critical cue is audio-only or animation-only. |
| P3 future | Dashboards/API/schema/billing/route migration | Explicitly deferred until gameplay integration foundations are stable. |

### 7. Integration Contract Alignment

Recommended canonical contract keys:
- `typing_meteor_defense`
- `story_sort`
- `target_tracker_adventure`
- `word_builder_farm`
- `math_key_quest`
- `bug_trail_maze`
- `rhythm_row_typing`
- `code_keys_workshop`
- `galaxy_click_command`
- `circuit_builder_lab`
- `gravity_workshop`
- `discovery_trails`
- `word_storm`
- `memory_match`
- `cipher_quest`
- `droplets`
- `shakerz`
- `shape_shifter`
- `keyboard_expedition`
- `precision_painter_studio`

Alias rules:
- `target_tracker` is a legacy code key for canonical `target_tracker_adventure`.
- `precision_painter` is a Healthy Play profile alias for canonical `precision_painter_studio`.
- `discovery-trail` is an asset/refinement alias for canonical `discovery_trails`.
- `circut-builder-lab` is a misspelled asset/refinement alias for canonical `circuit_builder_lab`.
- `typing-meteor` is a component folder alias for canonical `typing_meteor_defense`.
- `shape_shifter` is reserved, but blocked until route/component exist.

Contract mapping status:
- `score`, `accuracy`, `attempt`, `difficulty`, `maxCombo`/`bestStreak`, `mistakeCount`, and `xpProposed` are mostly available or derivable from current round state.
- `lessonId`, `roundId`, `durationMs`, `completedAt`, `sessionId`, and `idempotencyKey` need shared wrapper/adapter sources.
- Future XP event and progress payloads should be produced by a shared adapter, not directly by individual game components.
- Client-provided `userId` should not be trusted. Future write routes must derive identity server-side as described in the integration contract.

### 8. Healthy Play Alignment

Ready pieces:
- Healthy Play provider/hooks/session tracking/reminder rules/XP efficiency/persistence helpers exist.
- Session IDs and active/idle tracking helpers exist in Healthy Play libraries.
- Calm Mode, reduced stimulation, quiet breaks, and XP efficiency concepts are present.

Gaps:
- No game currently mounts Healthy Play.
- No `SessionTracker` is attached to `/gaming` routes.
- No game emits Healthy Play activity events through a shared wrapper.
- `onPreserveGameState` exists but no game supplies a preservation callback.
- XP efficiency exists but is not connected to game XP proposals.
- Healthy Play default route targets lean future `/skills`, while this phase must preserve `/gaming`.

Recommendation:
- Healthy Play should attach at a future Shared Game Shell/runtime wrapper around each game route.
- The wrapper should mount provider/session tracking once, pass canonical game key, handle route callbacks, and call progress preservation before any Healthy Play navigation.

### 9. Accessibility Alignment

Ready pieces:
- Many games use native buttons and inputs.
- Most shared/game controls have basic touch-friendly sizing.
- Keyboard Coach exists for typing games.
- Accessibility Assist Controls are well specified.
- Healthy Play accessibility helpers can evaluate reduced motion, high contrast, larger text, sound preference, quiet breaks, touch-friendly controls, and Calm Mode.

Gaps:
- No unified assist provider/panel is wired into games.
- Focus-visible styling is not standardized.
- Some inputs use `outline-none`.
- Pointer-only, drag/drop, tracing, and moving-target interactions need keyboard/alternate input patterns.
- High contrast, larger text, larger targets, reduced simultaneous targets, and slower mode are local or absent.
- Assist settings are not persisted or shared.

Recommendation:
- Introduce shared assist settings in the same runtime layer as Healthy Play.
- Start with non-invasive settings propagation: sound, reduced motion, high contrast, larger text, larger targets, slower mode, reduced simultaneous targets, and Keyboard Coach enabled/mode.

### 10. Sound And Animation Alignment

Sound readiness:
- Current helper functions are no-op-safe and respect boolean enabled flags.
- Most games have local sound toggles.
- Round summaries and feedback generally provide visual information.

Sound gaps:
- No shared `soundPreference` with `on`, `quiet`, and `off`.
- Calm Mode does not currently lower sound intensity.
- Sound-off QA has not been performed across all games.

Animation readiness:
- Many games expose local reduced-motion toggles.
- Asset notes describe animation expectations.

Animation gaps:
- Reduced motion is inconsistent and not tied to OS preference, Healthy Play Calm Mode, or shared assist settings.
- Some timing/moving-target games may rely on animation for critical cues.
- Non-animation fallback cues need QA.

Recommendation:
- Keep existing sound helpers fail-safe.
- Add a future sound adapter and reduced-motion/calm class propagation before replacing per-game behavior.

### 11. Implementation Order Recommendation

#### P0 must-fix before broad integration

1. Create a canonical Skills game registry and alias map.
2. Define the Shared Game Runtime/Shell wrapper responsibilities.
3. Add a shared session/round identity source: canonical game key, session ID, round ID, round attempt, active duration, completed timestamp.
4. Define `SkillRoundResult` and per-game mapping contracts without server writes.
5. Add local idempotency-key generation in the adapter layer.
6. Mount Healthy Play and SessionTracker through the wrapper for a small pilot set only.
7. Connect progress preservation callback to the future adapter path.
8. Decide Shape Shifter handling: implement later, explicitly defer, or remove from expected playable count.

#### P1 important integration readiness

1. Add shared Accessibility Assist provider/panel in the runtime wrapper.
2. Add shared sound preference adapter: `on`, `quiet`, `off`.
3. Add focus management for shell, pause/resume, assist panel, Healthy Play prompts, and round summaries.
4. Add reduced-motion/high-contrast/larger-text/larger-target class/data attribute propagation.
5. Normalize score semantics per game in registry metadata.
6. Add keyboard alternatives for drag/drop and pointer-heavy games.
7. Standardize round summary save/sync/focus behavior.
8. Verify privacy-safe telemetry remains aggregate-only.

#### P2 polish/cleanup

1. Fill or explicitly document Typing Meteor Defense and Story Sort asset gaps.
2. Clean up naming/asset alias documentation.
3. Move Keyboard Coach settings to shared assist provider.
4. Add sound-off and reduced-motion QA pass.
5. Standardize large target/text behavior across all game categories.
6. Add non-audio/non-animation critical cue checks to acceptance criteria.

#### P3 future module/dashboard work

1. `/gaming` to `/skills` route migration.
2. Student Skills dashboard.
3. Parent dashboard.
4. Teacher dashboard.
5. Supabase migrations and RLS policies.
6. Production `/api/skills/*` routes.
7. Rewards/dashboard rollups.
8. Billing/plan gates.
9. Parent/teacher accessibility profiles.
10. Cross-module landing/app selector work.

### 12. Explicitly Deferred Work

Deferred by current scope:
- Landing page.
- Main four-module app selector page.
- Skills Hub visual redesign.
- `/gaming` to `/skills` route migration.
- Student dashboard.
- Parent dashboard.
- Teacher dashboard.
- Supabase migrations.
- Production API routes.
- Production XP/progress writes.
- Billing or plan gates.
- Parent/teacher views.
- Role dashboards.
- Assignment workflows.
- Cross-module Math/Coding/Reading integrations.
- Production analytics dashboards.

### 13. Acceptance Criteria

Planning completion acceptance:
- Notes file captures completed review sections, files/folders reviewed, missing assets/components, import/path issues, gameKey/moduleId issues, Healthy Play gaps, accessibility gaps, progress/XP adapter gaps, next actions, and resume instruction.
- Every expected playable game has a readiness summary.
- Shared systems have integration readiness summaries.
- Contract alignment identifies canonical game keys, aliases, field sources, and gaps.
- Healthy Play, accessibility, sound, and animation gaps are prioritized.
- Deferred work is explicit.

First implementation readiness acceptance:
- A canonical registry can map every current playable route to a canonical `moduleId` without changing routes.
- A wrapper design can mount Healthy Play and assist settings without touching dashboard/API/schema work.
- A pilot game can produce a local-only `SkillRoundResult`, XP event preview, and progress preview with no production write.
- Existing `/gaming` routes continue to work.
- No raw keystrokes, pointer traces, or raw answer telemetry are persisted.
- Sound off, reduced motion, and visible focus behavior can be tested on pilot games.

Future broad integration acceptance:
- Every integrated game emits normalized round results.
- Every XP event has canonical `moduleId`, `sessionId`, and idempotency key.
- Every progress payload has stable `moduleId`, `lessonId`, `status`, score, accuracy, duration, attempt, and completion timestamp.
- Healthy Play idle exclusion and XP efficiency apply before XP payload creation.
- Progress preservation runs before Healthy Play navigation.
- Accessibility controls are shared, private, supportive, and do not penalize XP.
- Sound and animation critical cues have visual/static alternatives.

### 14. Recommended First Implementation Checkpoint After Planning

Recommended first implementation checkpoint: **Implementation Checkpoint 1 - Skills Runtime Registry And Local Preview Adapter**.

Goal:
- Build the smallest non-production integration foundation that proves naming, wrapping, and payload preview boundaries without API routes, Supabase writes, dashboards, route migration, or visual redesign.

Proposed scope:
- Add a canonical Skills game registry/alias map for current `/gaming` routes.
- Add a shared local-only `SkillRoundResult` type and adapter plan/source file.
- Add local-only payload preview builders for XP event and progress payloads.
- Generate `sessionId`, `roundId`, `completedAt`, and idempotency key locally for preview only.
- Pilot on one low-risk typing game and one low-risk pointer/click or puzzle game after approval.
- Preserve `/gaming` routes and existing game visuals.
- Do not add API routes, migrations, dashboards, production writes, billing gates, or route migration.

Recommended pilot games:
- Primary pilot: Word Builder Farm, because it has clear score, accuracy, attempts, difficulty, best streak, XP, and route/component alignment.
- Secondary pilot: Memory Match or Galaxy Click Command, because they test non-typing interaction patterns without the naming complexity of Target Tracker or Precision Painter.

Why this should be first:
- It resolves the biggest P0 blocker, canonical identity drift.
- It creates the attachment point for Healthy Play, accessibility, and XP/progress without touching production data.
- It gives a testable local preview before any server contract work.

## Next Actions

Recommended next checkpoint: Implementation Checkpoint 1 - Skills Runtime Registry And Local Preview Adapter, only after explicit implementation approval.

Implementation Checkpoint 1 should:
- Create a canonical Skills game registry/alias map.
- Add local-only `SkillRoundResult` and preview payload builders.
- Generate preview `sessionId`, `roundId`, `completedAt`, and idempotency key values.
- Pilot only after approval, preferably with Word Builder Farm first.
- Keep `/gaming` routes intact.
- Avoid API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, and broad visual redesign.
- Keep all output in this notes file unless instructed otherwise.

## Exact Resume Instruction For Next Session

Resume with Implementation Checkpoint 1 only if implementation is explicitly approved: Skills Runtime Registry And Local Preview Adapter. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, preserve current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, or parent/teacher views, and implement the smallest local-only registry plus payload-preview foundation needed to validate canonical module IDs and round-result mapping.

## Implementation Checkpoint 1 - Skills Runtime Registry And Local Preview Adapter

Status: Complete.

Scope guard:
- No API routes created.
- No Supabase migrations created.
- No Supabase writes added.
- No dashboards modified.
- No landing page modified.
- No Skills Hub UI modified.
- No `/gaming` to `/skills` migration.
- No game visual redesign.
- No Shape Shifter implementation.
- No production auth or billing logic changes.

Implemented:
- Added canonical Skills game registry with aliases for known naming mismatches.
- Added shared TypeScript types for local normalized round results and preview payloads.
- Added local-only adapter helpers to create normalized `SkillRoundResult` objects.
- Added local-only preview helpers for future XP event and progress payload shapes.
- Added runtime README documenting preview-only boundaries.
- Piloted the adapter in Word Builder Farm only.

Word Builder Farm pilot:
- Existing gameplay behavior remains unchanged.
- Existing local progress behavior remains in place.
- At round end, the game now creates a local-only normalized round result and preview XP/progress payloads.
- The preview is logged to the browser console as `[skills-runtime-preview]`.
- In development only, a local preview details panel appears after the round summary.
- No backend submission or server XP award is performed.

Files created:
- `/lib/skills/runtime/skillsGameRegistry.ts`
- `/lib/skills/runtime/skillsRuntimeTypes.ts`
- `/lib/skills/runtime/skillsRoundResultAdapter.ts`
- `/lib/skills/runtime/skillsPayloadPreview.ts`
- `/lib/skills/runtime/README.md`

Files changed:
- `/components/gaming/word-builder-farm/WordBuilderFarmGame.tsx`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Validation:
- `cmd /c npx tsc --noEmit` was attempted. It is currently blocked by existing type errors in `/lib/healthy-play/healthyPlayPersistence.ts` at lines 736 and 780 related to a narrowed sync queue key type.
- `cmd /c npm run build` compiled the app successfully, then failed during type validation on the same existing `/lib/healthy-play/healthyPlayPersistence.ts` issue.
- `cmd /c npm run lint` was attempted, but the repository's `next lint` command opened the deprecated interactive ESLint setup prompt instead of running a non-interactive lint.
- Direct PowerShell `npm`/`npx` commands are blocked by local execution policy, so validation used `cmd /c`.

What is now testable:
- The canonical registry can resolve current canonical game keys and aliases locally.
- Word Builder Farm can produce a local-only `SkillRoundResult`.
- Word Builder Farm can preview future XP event and progress payload shapes without API routes or Supabase writes.
- The preview confirms canonical `moduleId`, `lessonId`, `sessionId`, `roundId`, `completedAt`, idempotency key, score, accuracy, duration, attempt, difficulty, XP, streak, and mistake mapping.

Recommended next implementation checkpoint:
- Implementation Checkpoint 2 - Shared Runtime Shell Pilot For Word Builder Farm.
- Proposed scope: wrap Word Builder Farm with a minimal shared runtime boundary that owns stable session/round identity and can later mount Healthy Play and Accessibility Assist settings, still with no API routes, Supabase writes, dashboards, route migration, or visual redesign.

Exact resume instruction:
Resume with Implementation Checkpoint 2 only if implementation is explicitly approved: Shared Runtime Shell Pilot For Word Builder Farm. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, or parent/teacher views, and add the smallest shared runtime shell boundary needed for Word Builder Farm to own stable session/round identity and future Healthy Play/accessibility attachment points.

## Implementation Checkpoint 2 - Shared Runtime Shell Pilot For Word Builder Farm

Status: Complete.

Scope guard:
- Word Builder Farm only.
- Local-only.
- No API routes created.
- No Supabase migrations created.
- No Supabase writes added.
- No dashboards modified.
- No route migration.
- No landing page modified.
- No Skills Hub UI modified.
- No broad visual redesign.
- No Shape Shifter implementation.
- No production auth or billing logic changes.
- Unrelated Healthy Play persistence TypeScript errors were not changed.

Implemented:
- Added a transparent `SkillsGameRuntimeShell` provider for future shared game runtime attachment.
- Added local runtime session helper for preview-only session and round identity.
- Wrapped Word Builder Farm in the runtime shell without changing its route or visual layout.
- Moved Word Builder Farm preview identity/duration generation to the runtime shell.
- Added local runtime support for:
  - canonical registry entry lookup
  - stable preview `sessionId`
  - per-round `roundId`
  - per-session `roundAttempt`
  - active round duration
  - pause/resume-aware duration tracking
  - local progress preservation callback result
  - local payload preview creation
- Kept Word Builder Farm's existing local progress save and gameplay flow intact.

Files created:
- `/components/skills/runtime/SkillsGameRuntimeShell.tsx`
- `/lib/skills/runtime/skillsRuntimeSession.ts`

Files changed:
- `/components/gaming/word-builder-farm/WordBuilderFarmGame.tsx`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What is now testable:
- Word Builder Farm renders through a shared runtime shell with no visible layout change.
- Starting a Word Builder Farm round creates a stable local runtime round identity.
- Ending a round produces a local-only payload preview using the shell-provided `sessionId`, `roundId`, `roundAttempt`, and active duration.
- Pausing and resuming a round uses the shell's pause/resume hooks so preview duration excludes paused time.
- The preview remains local-only and marked with `previewOnly: true`.
- The runtime shell exposes future attachment points for Healthy Play, accessibility preferences, progress preservation, and XP efficiency without implementing those systems in this checkpoint.

Validation:
- `cmd /c npm run build` compiled successfully, then failed during type validation on the existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue.
- `cmd /c npx tsc --noEmit --pretty false` reports only the existing `/lib/healthy-play/healthyPlayPersistence.ts` errors at lines 736 and 780.
- `cmd /c npm run lint` still opens the deprecated interactive `next lint` setup prompt and cannot run non-interactively in the current repo state.

Recommended next implementation checkpoint:
- Implementation Checkpoint 3 - Healthy Play And Accessibility Local Attachment For Word Builder Farm.
- Proposed scope: mount Healthy Play and basic local accessibility/sound preference plumbing through `SkillsGameRuntimeShell` for Word Builder Farm only, still local-only and with no API routes, Supabase writes, dashboards, route migration, or visual redesign.

Exact resume instruction:
Resume with Implementation Checkpoint 3 only if implementation is explicitly approved: Healthy Play And Accessibility Local Attachment For Word Builder Farm. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, or parent/teacher views, and attach Healthy Play/accessibility preference plumbing to the existing Word Builder Farm runtime shell in the smallest local-only way possible.

## Implementation Checkpoint 3 - Healthy Play And Accessibility Local Attachment For Word Builder Farm

Status: Complete.

Scope guard:
- Word Builder Farm only.
- Local-only.
- No API routes created.
- No Supabase migrations created.
- No Supabase writes added.
- No dashboards modified.
- No route migration.
- No landing page modified.
- No Skills Hub UI modified.
- No broad visual redesign.
- No Shape Shifter implementation.
- No production auth or billing logic changes.
- Unrelated Healthy Play persistence TypeScript errors were not changed.

Implemented:
- Mounted `HealthyPlayProvider` inside `SkillsGameRuntimeShell`.
- Added shell-level accessibility/sound preference plumbing for:
  - reduced motion
  - sound preference
  - quiet sound state
  - high contrast state
  - larger text state
- Exposed Healthy Play status through the runtime shell for future UI/adapter use:
  - active time label
  - idle time label
  - XP efficiency multiplier/status
  - progress protection label
- Kept Word Builder Farm's existing controls, but connected its Sound and Reduced Motion buttons to the runtime shell.
- Added Healthy Play/accessibility metadata to the local-only Word Builder Farm payload preview.
- Kept the preview local-only with `previewOnly: true`.
- Regression fix: direct `SessionTracker` mounting was removed because it caused a local Healthy Play update loop through unstable effect dependencies. The shell still owns Healthy Play provider placement and local runtime lifecycle hooks; SessionTracker should be reintroduced only after its dependencies are stabilized.

Files changed:
- `/components/skills/runtime/SkillsGameRuntimeShell.tsx`
- `/components/gaming/word-builder-farm/WordBuilderFarmGame.tsx`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What is now testable:
- Word Builder Farm still loads through `/gaming/word-builder-farm`.
- Healthy Play is mounted at shell level for Word Builder Farm.
- Mute/Unmute changes the runtime sound preference locally.
- Reduce Motion changes the runtime reduced-motion preference locally.
- Payload preview includes local Healthy Play/accessibility fields such as sound preference, quiet sound, reduced motion, high contrast, larger text, active time, and XP efficiency status.
- Existing local preview, round summary, pause/resume, and gameplay behavior remain intact.

Validation:
- `cmd /c npm run build` compiled successfully, then failed during type validation on the existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue at line 736.
- `cmd /c npx tsc --noEmit --pretty false` is currently blocked by missing generated `.next/types` route files after the failed build/type cycle. Earlier direct type validation for source files was blocked by the same existing Healthy Play persistence errors.
- `cmd /c npm run lint` still opens the deprecated interactive `next lint` setup prompt and cannot run non-interactively in the current repo state.
- The only new type issue found during this checkpoint was the Healthy Play preservation callback return type in `SkillsGameRuntimeShell`; it was fixed before final handoff.
- Runtime regression fix validation: a Playwright route test opened `/gaming/word-builder-farm`, toggled Mute Sounds and Reduce Motion, paused/resumed, completed a round, opened the preview, confirmed `[skills-runtime-preview]`, confirmed `previewOnly: true`, confirmed `soundPreference` and `reducedMotion` metadata, and observed no `/api/` or Supabase network requests. The helper script printed `ok: true`; it timed out only because the spawned dev server process stayed alive after the assertions completed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 4 - Local Runtime Debug Surface Or Second Pilot Selection.
- Option A: add a small development-only runtime status panel for Word Builder Farm so Healthy Play/accessibility/session state can be inspected without opening payload preview.
- Option B: pilot the shell/runtime adapter on a second low-risk game, preferably Memory Match or Galaxy Click Command.

Exact resume instruction:
Resume with Implementation Checkpoint 4 only if implementation is explicitly approved: Local Runtime Debug Surface Or Second Pilot Selection. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, or parent/teacher views, and either add a small development-only runtime status panel for Word Builder Farm or extend the local-only runtime pilot to one approved second game.

## Implementation Checkpoint 4 - Local Runtime Debug Surface

Status: Complete.

Scope guard:
- Word Builder Farm only.
- Local-only.
- Development/debug surface only.
- No API routes created.
- No Supabase writes added.
- No Supabase migrations created.
- No dashboards modified.
- No route migration.
- No landing page modified.
- No Skills Hub UI modified.
- No broad visual redesign.
- No Shape Shifter implementation.
- Core gameplay was not altered.
- SessionTracker remains intentionally deferred.
- Unrelated Healthy Play persistence TypeScript errors were not changed.

Implemented:
- Added a reusable development-only runtime debug panel component.
- Replaced the prior raw JSON details block in Word Builder Farm with the new panel.
- Panel uses the existing `lastPreview` object and preserves the existing `[skills-runtime-preview]` console log.
- Panel shows compact summary fields first:
  - `previewOnly`
  - `moduleId`
  - `gameKey`
  - `lessonId`
  - `sessionId`
  - `roundId`
  - `roundAttempt`
  - `durationMs`
  - `score`
  - `accuracy`
  - `xpProposed`
  - `soundPreference`
  - `reducedMotion`
- Panel includes expandable details for:
  - `roundResult`
  - `xpEvent`
  - `progress`
  - `registryEntry`

Files created:
- `/components/skills/runtime/SkillsRuntimeDebugPanel.tsx`

Files changed:
- `/components/gaming/word-builder-farm/WordBuilderFarmGame.tsx`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What is now testable:
- Word Builder Farm still loads through `/gaming/word-builder-farm`.
- After ending a round in development, the page shows `Development-only Skills Runtime Preview` under the round summary.
- The panel shows compact runtime fields without opening the browser console.
- Expandable details show full `roundResult`, `xpEvent`, `progress`, and `registryEntry`.
- The existing console log is preserved.
- The panel remains local-only and makes no backend request.

Validation:
- `cmd /c npm run build` compiled the production bundle successfully, then failed during type validation on the known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue at line 736.
- `cmd /c npx tsc --noEmit --pretty false` failed on the same known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue at lines 736 and 780.
- `cmd /c npm run lint` still opens the deprecated interactive `next lint` setup prompt and cannot run non-interactively in the current repo state.
- In-app browser verification attempted against `http://localhost:3005/gaming/word-builder-farm`, but the browser client blocked the localhost navigation with `ERR_BLOCKED_BY_CLIENT`; focused Playwright validation was used as the local fallback.
- Focused Playwright route validation passed: `/gaming/word-builder-farm` loaded, Start worked, Mute Sounds worked, Reduce Motion worked, Pause/Resume worked, a round ended, `Farm Round Complete` appeared, `Development-only Skills Runtime Preview` appeared, compact fields were present, expandable `roundResult`, `xpEvent`, `progress`, and `registryEntry` details opened, `[skills-runtime-preview]` logged, `previewOnly: true` was present in expanded payloads, and no `/api/` or Supabase requests were observed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 5 - Second Local Runtime Pilot Selection.
- Proposed scope: apply the same local-only registry/runtime/preview/debug-panel pattern to one approved second game, preferably Memory Match or Galaxy Click Command, without API routes, Supabase writes, dashboards, route migration, or visual redesign.

Exact resume instruction:
Resume with Implementation Checkpoint 5 only if implementation is explicitly approved: Second Local Runtime Pilot Selection. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, or parent/teacher views, and apply the accepted local-only runtime shell, payload preview, and development debug panel pattern to one approved second game.

## Implementation Checkpoint 5 - Second Local Runtime Pilot: Memory Match

Status: Complete.

Scope guard:
- Memory Match only.
- Local-only.
- No API routes created.
- No Supabase writes added.
- No Supabase migrations created.
- No dashboards modified.
- No route migration.
- No landing page modified.
- No Skills Hub UI modified.
- No broad visual redesign.
- No Shape Shifter implementation.
- SessionTracker remains intentionally deferred.
- Core Memory Match gameplay was not intentionally altered.
- Unrelated Healthy Play persistence TypeScript errors were not changed.

Implemented:
- Wrapped Memory Match in `SkillsGameRuntimeShell` using canonical `gameKey/moduleId` `memory_match`.
- Kept current `/gaming/memory-match` route intact.
- Connected existing Memory Match Sound and Reduce Motion controls to the runtime shell preference plumbing.
- Added local runtime round lifecycle calls for start, pause, resume, and end.
- Added normalized local-only `SkillRoundResult` generation at round end.
- Added local-only payload preview generation at round end.
- Preserved the existing `[skills-runtime-preview]` console log pattern.
- Rendered `SkillsRuntimeDebugPanel` only in development mode after round end.
- Preserved existing local progress behavior and current local progress save shape.

Memory Match preview metadata added:
- `taskType: puzzle_interaction`
- `pairsCompleted`
- `matchesCompleted`
- `attempts`
- `mistakeCount`
- `memoryStreak`
- `bestStreak`
- `gradeLevel`
- `difficulty`
- `difficultySource`
- `categories`
- `pairTypes`
- `totalCards`
- `soundPreference`
- `quietSound`
- `reducedMotion`
- `highContrast`
- `largerText`
- `healthyPlayActiveTime`
- `xpEfficiencyMultiplier`
- `xpEfficiencyStatus`
- `localOnlyPreview: true`

Difficulty normalization note:
- The existing local progress save still writes `current_difficulty: grade`; this was preserved to avoid over-refactoring local progress behavior.
- The runtime preview separately derives normalized difficulty from Memory Match pair data when all selected pairs share one difficulty.
- If selected pairs ever mix difficulty values, the preview falls back to `grade_based` and marks `difficultySource: mixed_or_grade_based`.

Files changed:
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What is now testable:
- Memory Match still loads through `/gaming/memory-match`.
- Start, pause, resume, sound toggle, reduced motion toggle, card matching, and round end still work.
- After ending a round in development, the page shows `Development-only Skills Runtime Preview` under the round summary.
- Compact runtime fields are visible without opening the browser console.
- Expandable `roundResult`, `xpEvent`, `progress`, and `registryEntry` details are available.
- Console still logs `[skills-runtime-preview]`.
- Preview payloads remain local-only and include `previewOnly: true`.
- Preview payloads use canonical `moduleId/gameKey: memory_match`.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` failed only on the known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issues at lines 736 and 780.
- `cmd /c npm run build` compiled the production bundle successfully, then failed during type validation on the same known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue at line 736.
- `cmd /c npm run lint` still opens the deprecated interactive `next lint` setup prompt and cannot run non-interactively in the current repo state.
- Focused Playwright route validation passed: `/gaming/memory-match` loaded, Start worked, Mute Sounds worked, Reduce Motion worked, Pause/Resume worked, cards could be flipped/matched, End Round worked, `Memory Board Complete` appeared, `Development-only Skills Runtime Preview` appeared, compact fields were present, expandable details opened, `[skills-runtime-preview]` logged, expanded payloads included `previewOnly: true`, `moduleId: memory_match`, and `gameKey: memory_match`, and no `/api/` or Supabase requests were observed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 6 - Third Local Runtime Pilot Or Shared Runtime Hardening.
- Proposed option A: apply the local-only runtime shell, payload preview, and debug-panel pattern to a third approved low-risk game such as Galaxy Click Command.
- Proposed option B: harden the shared local runtime before additional pilots by adding a tiny reusable helper for game-level preview metadata assembly and documenting the SessionTracker re-enable requirements.

Exact resume instruction:
Resume with Implementation Checkpoint 6 only if implementation is explicitly approved: Third Local Runtime Pilot Or Shared Runtime Hardening. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, or parent/teacher views, do not re-enable SessionTracker, and either apply the accepted local-only runtime shell, payload preview, and development debug panel pattern to one approved third game or harden the shared local runtime helpers in a local-only way.

## Implementation Checkpoint 6 - Shared Runtime Hardening Pass

Status: Complete.

Scope guard:
- Shared Skills runtime files only, plus minimal pilot-game touchups for the shared metadata helper.
- Word Builder Farm remains in scope only as a pilot verification target.
- Memory Match remains in scope only as a pilot verification target.
- Local-only.
- No API routes created.
- No Supabase writes added.
- No Supabase migrations created.
- No dashboards modified.
- No route migration.
- No landing page modified.
- No Skills Hub UI modified.
- No broad visual redesign.
- No Shape Shifter implementation.
- SessionTracker remains intentionally deferred.
- No audible sound playback added.
- Unrelated Healthy Play persistence TypeScript errors were not changed.

What was hardened:
- Added `runtime.createPreviewMetadata(extraMetadata)` to `SkillsGameRuntimeShell`.
- The helper centralizes shared local preview metadata:
  - `soundPreference`
  - `quietSound`
  - `reducedMotion`
  - `highContrast`
  - `largerText`
  - `healthyPlayActiveTime`
  - `xpEfficiencyMultiplier`
  - `xpEfficiencyStatus`
  - `localOnlyPreview: true`
- Updated Word Builder Farm and Memory Match to pass only game-specific metadata into `createPreviewMetadata(...)`.
- Kept each game responsible for its own score, accuracy, attempts, difficulty, streak/combo, mistake count, grade, XP, and local progress behavior.
- Confirmed debug panel rendering remains guarded by `process.env.NODE_ENV !== 'production'` in both pilots.
- Confirmed shared runtime files do not call `fetch`, Supabase, `/api/skills`, or `/rest/v1`.
- Confirmed direct `SessionTracker` mounting remains absent.
- Updated `/lib/skills/runtime/README.md` with:
  - current pilot list
  - runtime surface summary
  - "How To Integrate The Next Game" checklist
  - production safety checks

Files changed:
- `/components/skills/runtime/SkillsGameRuntimeShell.tsx`
- `/components/gaming/word-builder-farm/WordBuilderFarmGame.tsx`
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What is now testable:
- Word Builder Farm still loads through `/gaming/word-builder-farm`.
- Memory Match still loads through `/gaming/memory-match`.
- Both pilots still use the shared runtime shell.
- Both pilots still produce local-only payload previews at round end.
- Both pilots still show the development-only runtime preview panel after round end.
- Both pilots still log `[skills-runtime-preview]`.
- Both pilots still include shared metadata in `roundResult.metadata`, `xpEvent.metadata`, and `progress.metadata`.
- Future pilots now have a documented local integration checklist and a shared metadata helper.

Validation:
- Static search confirmed `SkillsRuntimeDebugPanel` is only rendered in pilot games behind `process.env.NODE_ENV !== 'production'`.
- Static search confirmed no direct `SessionTracker` usage in shared runtime or the two pilot game folders.
- Static search confirmed no `fetch`, Supabase, `/api/skills`, or `/rest/v1` calls in shared runtime or the two pilot game folders.
- `cmd /c npx tsc --noEmit --pretty false` failed only on the known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issues at lines 736 and 780.
- `cmd /c npm run build` compiled the production bundle successfully, then failed during type validation on the same known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue at line 736.
- `cmd /c npm run lint` still opens the deprecated interactive `next lint` setup prompt and cannot run non-interactively in the current repo state.
- Focused Playwright route validation passed for both pilots: `/gaming/word-builder-farm` and `/gaming/memory-match` loaded, Start worked, Mute Sounds worked, Reduce Motion worked, Pause/Resume worked, round end worked, each round summary appeared, each `Development-only Skills Runtime Preview` panel appeared, compact fields were present, expandable details opened, `[skills-runtime-preview]` logged once per game, payloads included `previewOnly: true`, canonical module/game keys were present, metadata included sound preference and reduced motion, and no `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 7 - Third Local Runtime Pilot.
- Proposed low-risk target: Galaxy Click Command, because it exercises pointer/click interactions while using the same local-only shell, payload preview, debug panel, sound preference, reduced motion, and no-backend boundaries.
- Alternative: fix the unrelated Healthy Play persistence type blocker in a separately approved maintenance checkpoint before adding more pilots.

Exact resume instruction:
Resume with Implementation Checkpoint 7 only if implementation is explicitly approved: Third Local Runtime Pilot. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md` and `/lib/skills/runtime/README.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting, and apply the documented local-only runtime shell, payload preview, shared metadata helper, console log, and development-only debug panel pattern to one approved third game.

## Implementation Checkpoint 7 - Third Local Runtime Pilot: Galaxy Click Command

Status: Complete.

Scope guard:
- Galaxy Click Command only.
- Local-only.
- No API routes created.
- No Supabase writes added.
- No Supabase migrations created.
- No dashboards modified.
- No route migration.
- No landing page modified.
- No Skills Hub UI modified.
- No broad visual redesign.
- No Shape Shifter implementation.
- SessionTracker remains intentionally deferred.
- No audible sound playback added.
- Unrelated Healthy Play persistence TypeScript errors were not changed.
- Core Galaxy Click Command gameplay was not intentionally altered.
- No raw pointer trails or raw click-event streams were stored.

Implemented:
- Wrapped Galaxy Click Command in `SkillsGameRuntimeShell` using canonical `gameKey/moduleId` `galaxy_click_command`.
- Kept current `/gaming/galaxy-click-command` route intact.
- Connected existing Galaxy Click Command Sound and Reduce Motion controls to the runtime shell preference plumbing.
- Added local runtime round lifecycle calls for start, pause, resume, and end.
- Added normalized local-only `SkillRoundResult` generation at round end.
- Added local-only payload preview generation at round end.
- Preserved the existing `[skills-runtime-preview]` console log pattern.
- Rendered `SkillsRuntimeDebugPanel` only in development mode after round end.
- Used `runtime.createPreviewMetadata(...)` for shared preview metadata.
- Preserved existing local progress behavior and current local progress save shape.
- Updated `/lib/skills/runtime/README.md` to list Galaxy Click Command as the third current pilot.

Galaxy Click Command preview metadata added:
- `taskType`
- `targetsCompleted`
- `correctClicks`
- `missedClicks`
- `attempts`
- `mistakeCount`
- `bestStreak`
- `missionProgress`
- `gradeLevel`
- `difficulty`
- `targetSize`
- `baseTargetSize`
- `targetSpeed`
- `baseTargetSpeed`
- `targetLifetime`
- `largerTarget`
- `assistMode`
- `slowMode`
- `totalCorrectTargets`
- `totalDistractorTargets`
- shared runtime metadata from `createPreviewMetadata(...)`, including `soundPreference`, `reducedMotion`, and `localOnlyPreview: true`

Files changed:
- `/components/gaming/galaxy-click-command/GalaxyClickCommandGame.tsx`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What is now testable:
- Galaxy Click Command still loads through `/gaming/galaxy-click-command`.
- Start, pause, resume, sound toggle, reduced motion toggle, target clicking, slower mode, larger targets, and round end still work.
- After ending a round in development, the page shows `Development-only Skills Runtime Preview` under the round summary.
- Compact runtime fields are visible without opening the browser console.
- Expandable `roundResult`, `xpEvent`, `progress`, and `registryEntry` details are available.
- Console still logs `[skills-runtime-preview]`.
- Preview payloads remain local-only and include `previewOnly: true`.
- Preview payloads use canonical `moduleId/gameKey: galaxy_click_command`.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` failed only on the known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issues at lines 736 and 780.
- `cmd /c npm run build` compiled the production bundle successfully, then failed during type validation on the same known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue at line 736.
- `cmd /c npm run lint` still opens the deprecated interactive `next lint` setup prompt and cannot run non-interactively in the current repo state.
- Focused Playwright route validation passed: `/gaming/galaxy-click-command` loaded, Start worked, Mute Sounds worked, Reduce Motion worked, Pause/Resume worked, Slower Mode and Larger Targets toggled, target click worked, End Round worked, `Mission Complete` appeared, `Development-only Skills Runtime Preview` appeared, compact fields were present, expandable details opened, `[skills-runtime-preview]` logged, expanded payloads included `previewOnly: true`, `moduleId: galaxy_click_command`, `gameKey: galaxy_click_command`, `sessionId`, `roundId`, metadata, `soundPreference`, and `reducedMotion`, and no `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 8 - Pilot Pattern QA And Healthy Play Persistence Decision.
- Proposed option A: run the three-pilot pattern across Word Builder Farm, Memory Match, and Galaxy Click Command and capture any shared rough edges before expanding further.
- Proposed option B: fix the unrelated Healthy Play persistence type blocker in a separately approved maintenance checkpoint so build/typecheck can become a reliable gate before additional pilots.

Exact resume instruction:
Resume with Implementation Checkpoint 8 only if implementation is explicitly approved: Pilot Pattern QA And Healthy Play Persistence Decision. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md` and `/lib/skills/runtime/README.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting, and either QA the three current local runtime pilots together or fix the existing Healthy Play persistence type blocker as a separate maintenance step if explicitly approved.

## Implementation Checkpoint 8 - Three-Pilot QA Pass

Status: Complete.

Scope guard:
- QA/documentation pass only across Word Builder Farm, Memory Match, and Galaxy Click Command.
- Local-only.
- No new game integrations.
- No API routes created.
- No Supabase writes added.
- No Supabase migrations created.
- No dashboards modified.
- No route migration.
- No landing page modified.
- No Skills Hub UI modified.
- No broad visual redesign.
- No Shape Shifter implementation.
- SessionTracker remains intentionally deferred.
- No audible sound playback added.
- Unrelated Healthy Play persistence TypeScript errors were not changed.
- Core gameplay was not altered.

Documentation updated:
- `/lib/skills/runtime/README.md`
  - Fixed current pilot language to cover all three pilots.
  - Added `Three Pilot QA Status`.
  - Documented passed QA checks.
  - Documented known non-blockers.
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
  - Added this Checkpoint 8 summary and resume instruction.

QA results by game:

| Game | Route | Result |
|---|---|---|
| Word Builder Farm | `/gaming/word-builder-farm` | Passed |
| Memory Match | `/gaming/memory-match` | Passed |
| Galaxy Click Command | `/gaming/galaxy-click-command` | Passed |

Checks passed for each game:
- Route loads.
- Start round works.
- Mute Sounds toggle changes state.
- Reduce Motion toggle changes state.
- Pause/resume works.
- End round works.
- Normal round summary appears.
- Development-only Skills Runtime Preview appears after round end.
- Debug panel is not shown before a round starts or while a round is running.
- `roundResult`, `xpEvent`, `progress`, and `registryEntry` expand correctly.
- `previewOnly` is true.
- Correct canonical `moduleId/gameKey` appears:
  - `word_builder_farm`
  - `memory_match`
  - `galaxy_click_command`
- `sessionId` and `roundId` exist.
- Metadata includes `soundPreference` and `reducedMotion`.
- Metadata contains aggregate gameplay values only.
- Console logs `[skills-runtime-preview]` once per completed pilot round.
- Network observation saw no `/api/skills`, Supabase, or `/rest/v1` requests.
- Debug panel remains guarded by `process.env.NODE_ENV !== 'production'`.

Known limitations and non-blockers:
- No audible sound playback is expected at this stage. Current acceptance is sound preference plumbing, toggle state, and metadata capture only.
- Galaxy Click Command targets do not currently move in the initial build, so Slower Mode toggles but has no obvious visible movement effect yet.
- Galaxy Click Command Larger Targets works visibly and can return to normal when toggled off.
- Galaxy Click Command Slower Mode behavior is an existing gameplay limitation, not a runtime integration regression.
- `cmd /c npx tsc --noEmit --pretty false` remains blocked by the known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issues at lines 736 and 780.
- `cmd /c npm run build` compiles the production bundle successfully, then remains blocked during type validation by the same known existing `/lib/healthy-play/healthyPlayPersistence.ts` sync queue key type issue at line 736.
- `cmd /c npm run lint` still opens the deprecated interactive `next lint` setup prompt and cannot run non-interactively in the current repo state.

Blockers found:
- No new runtime-pilot blockers were found.
- The existing Healthy Play persistence type issue remains a repo-level validation blocker.
- The interactive Next lint prompt remains a repo-level validation blocker.

Validation details:
- Focused Playwright QA passed for all three pilot routes in one run.
- The run observed three `[skills-runtime-preview]` console logs, one per completed pilot round.
- No page errors were captured.
- No `/api/skills`, Supabase, or `/rest/v1` requests were captured.
- Static search confirmed the debug panel render sites remain guarded by `process.env.NODE_ENV !== 'production'`.
- Static search confirmed no `SessionTracker` mount in the shared runtime or current pilot folders.
- Static search confirmed no direct `fetch`, Supabase, `/api/skills`, or `/rest/v1` usage in shared runtime or current pilot folders.

Recommended next implementation checkpoint:
- Implementation Checkpoint 9 - Validation Gate Cleanup Or Fourth Pilot Selection.
- Recommended option A: fix the existing Healthy Play persistence type blocker so `build` and `tsc --noEmit` can become reliable gates before expanding the pattern further.
- Alternative option B: proceed to a fourth approved local runtime pilot after accepting that build/typecheck remain blocked by unrelated Healthy Play persistence typing.

Exact resume instruction:
Resume with Implementation Checkpoint 9 only if implementation is explicitly approved: Validation Gate Cleanup Or Fourth Pilot Selection. Read `/docs/skills-games/integration/skills-games-integration-plan-notes.md` and `/lib/skills/runtime/README.md`, preserve all current scope boundaries, keep `/gaming` routes intact, do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting, and either fix the existing Healthy Play persistence type blocker as a separately scoped validation cleanup or apply the documented local-only runtime pattern to one approved fourth game.

## Implementation Checkpoint 9A - Compact Runtime Pilot Index

Status: Complete.

Scope guard:
- Documentation only.
- No game code changes.
- No runtime behavior changes.
- No API routes, Supabase writes, dashboards, route migration, Skills Hub UI, Shape Shifter, SessionTracker, or audible sound playback changes.

Documentation updated:
- Created `/docs/skills-games/integration/runtime-pilot-index.md`.
- The index points future sessions to:
  - `/lib/skills/runtime/README.md`
  - `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
  - `/docs/skills-games/integration/Skills_Module_Integration_Contract.md`
  - the three pilot game components.
- The index summarizes checkpoints 1-8, current pilots, reusable runtime pattern, hard rules, known non-blockers, the then-current validation blocker, and recommended next checkpoints.

## Implementation Checkpoint 9B - Healthy Play Persistence TypeScript Blocker

Status: Complete.

Scope guard:
- Changed only `/lib/healthy-play/healthyPlayPersistence.ts`.
- No runtime/game/API/Supabase/dashboard/route/Skills Hub behavior changes.
- SessionTracker remains deferred.
- No audible sound playback added.

Root cause:
- Sync queue helpers inferred the exact sync queue key literal from `HEALTHY_PLAY_PERSISTENCE_KEYS.syncQueue`.
- `flushHealthyPlaySyncQueue` accepted `key?: string`, making the local key too broad for `readHealthyPlaySyncQueue(...)` and `writeHealthyPlaySyncQueue(...)`.

Fix:
- Added a narrow `HealthyPlaySyncQueueStorageKey` type from `typeof HEALTHY_PLAY_PERSISTENCE_KEYS.syncQueue`.
- Applied it to sync queue helper key parameters and `flushHealthyPlaySyncQueue(options.key)`.
- Behavior remains unchanged.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` passed.
- `cmd /c npm run build` passed.
- `cmd /c npm run lint` still opens the deprecated interactive Next lint setup prompt.

## Implementation Checkpoint 9C - Clean Validation Pass And Documentation Update

Status: Complete.

Scope guard:
- Validation and documentation only.
- No game code changes.
- No runtime behavior changes.
- No API routes, Supabase writes, dashboards, route migration, Skills Hub UI, Shape Shifter, SessionTracker, audible sound playback, or new pilot changes.

Documentation updated:
- `/docs/skills-games/integration/runtime-pilot-index.md`
  - Updated completed checkpoints through 9C.
  - Replaced the old TypeScript/build blocker with current validation status.
  - Updated recommended next checkpoints.
- `/lib/skills/runtime/README.md`
  - Updated Three Pilot QA known non-blockers to state that TypeScript and build are now unblocked.
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
  - Added Checkpoint 9A/9B/9C summaries.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` passed.
- `cmd /c npm run build` passed.
- `cmd /c npm run lint` still opens the deprecated interactive Next lint setup prompt and cannot run non-interactively in the current repo state.
- Focused route smoke validation passed for:
  - `/gaming/word-builder-farm`
  - `/gaming/memory-match`
  - `/gaming/galaxy-click-command`
- Focused smoke validation confirmed:
  - Debug panel hidden before round end.
  - Development-only runtime preview appears after round end.
  - `previewOnly: true` is present.
  - Canonical module/game keys are present.
  - `sessionId` and `roundId` exist.
  - Metadata includes `soundPreference` and `reducedMotion`.
  - `[skills-runtime-preview]` logged once per pilot round.
  - No `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Remaining blockers:
- `npm run lint` remains blocked by the deprecated interactive Next lint setup prompt.

Recommended next implementation checkpoint:
- Implementation Checkpoint 10A - Lint Gate Decision.
- Recommended option A: migrate lint to a non-interactive ESLint CLI setup in a separately approved checkpoint.
- Alternative option B: accept the lint prompt state and continue additional local runtime pilots with `tsc`, `build`, and focused route smoke validation as gates.

Exact resume instruction:
Resume with Implementation Checkpoint 10 only if implementation is explicitly approved: Lint Gate Decision Or Fourth Pilot Selection. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, and `/lib/skills/runtime/README.md`; preserve all current scope boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting; and either address the interactive lint prompt as a validation gate or apply the documented local-only runtime pattern to one approved fourth game.

## Implementation Checkpoint 10A - Git And Validation Baseline Record

Status: Complete.

Scope guard:
- Documentation/verification only.
- No game code changes.
- No runtime behavior changes.
- No API routes, Supabase writes, dashboards, route migration, Skills Hub UI, Shape Shifter, SessionTracker, audible sound playback, or game redesign changes.

Git baseline:
- Current branch confirmed: `skills_Phase2_integrated_pilots`.
- Remote tracking confirmed: `origin/skills_Phase2_integrated_pilots`.
- Working tree was clean at checkpoint start.
- `git diff --stat` was clean at checkpoint start.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` passed.
- `cmd /c npm run build` passed.
- `cmd /c npm run lint` still opens the deprecated interactive Next lint setup prompt and cannot run non-interactively in the current repo state.

Documentation updated:
- `/docs/skills-games/integration/runtime-pilot-index.md`
  - Added Checkpoint 10A to completed checkpoints.
  - Added current branch/baseline note.
  - Confirmed branch is safe as a starting point for future checkpoints.
  - Kept clean TypeScript/build status and lint prompt status.
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
  - Added this Checkpoint 10A summary.

Recommended next implementation checkpoint:
- Implementation Checkpoint 10B - Lint Gate Decision.
- Recommended option A: migrate lint to a non-interactive ESLint CLI setup in a separately approved checkpoint.
- Alternative option B: accept the lint prompt state and continue additional local runtime pilots with `tsc`, `build`, and focused route smoke validation as gates.

Exact resume instruction:
Resume with Implementation Checkpoint 10B only if implementation is explicitly approved: Lint Gate Decision. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, and `/lib/skills/runtime/README.md`; preserve all current scope boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, SessionTracker mounting, or new game pilots; and decide whether to migrate lint from deprecated interactive Next lint to a non-interactive validation gate.

## Implementation Checkpoint 10B - Lint Gate Decision/Fix

Status: Complete.

Scope guard:
- Validation tooling only.
- No game behavior changes.
- No runtime behavior changes.
- No API routes, Supabase writes, dashboards, route migration, Skills Hub redesign, Shape Shifter, SessionTracker, audible sound playback, mobile redesign, game redesign, or game content expansion.

Root cause:
- `package.json` used `next lint`.
- Next 15 deprecates `next lint`; with no existing ESLint config, the command opened the interactive setup prompt instead of running a non-interactive validation gate.

Decision:
- Implemented a minimal ESLint CLI gate using existing installed dependencies.
- Added `eslint.config.mjs` with `FlatCompat` and the installed Next configs:
  - `next/core-web-vitals`
  - `next/typescript`
- Updated `package.json` lint script from `next lint` to `eslint .`.
- Ignored generated/build output and `next-env.d.ts`.
- Set `@typescript-eslint/no-explicit-any` to warning so the existing game/service `any` usage is visible without forcing broad application-code cleanup in this tooling checkpoint.

Validation:
- `cmd /c npm run lint` now runs non-interactively and exits successfully with existing warnings.
- Current warning baseline: 36 warnings, mostly existing `@typescript-eslint/no-explicit-any`, `react-hooks/exhaustive-deps`, and unused-variable warnings.
- `cmd /c npm run build` passed. Build also reports the lint warnings but completes successfully.
- `cmd /c npx tsc --noEmit --pretty false` passed after build completed. A parallel first run raced with `.next/types` regeneration during build and saw transient missing generated route files; rerun after build passed.

Files changed:
- `/eslint.config.mjs`
- `/package.json`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Remaining lint/tooling blockers:
- No interactive lint blocker remains.
- Existing lint warnings remain and should be addressed separately only if approved.

Recommended next implementation checkpoint:
- Implementation Checkpoint 10C - Lint Warning Baseline Decision, if the team wants to reduce or ratchet warnings before more pilots.
- Alternative: Implementation Checkpoint 11 - Fourth Local Runtime Pilot, using `tsc`, `build`, `lint`, and focused route smoke checks as validation gates.

Exact resume instruction:
Resume with Implementation Checkpoint 10C or 11 only if implementation is explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, and `/lib/skills/runtime/README.md`; preserve all current scope boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting; and either decide how to handle the existing lint warning baseline or apply the documented local-only runtime pattern to one approved fourth game.

## Implementation Checkpoint 10C - Portable Skills Module Architecture + Route/Mobile Strategy

Status: Complete.

Scope guard:
- Documentation and architecture strategy only.
- No game code changes.
- No runtime behavior changes.
- No API routes, Supabase writes, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, game content expansion, mobile redesign, or new pilots.

Documentation created:
- `/docs/skills-games/integration/portable-skills-module-strategy.md`

Documentation updated:
- `/docs/skills-games/integration/runtime-pilot-index.md`
  - Added the portable route/mobile strategy link.
  - Added Checkpoint 10C to completed checkpoints.
  - Added route strategy hard rules for current `/gaming/[game]` routes and future `/skills/[game]` target.
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
  - Added this Checkpoint 10C summary.

Strategy summary:
- Portable module boundaries should keep runtime, assets, integration docs, and current game components grouped so the Skills module can move into the main project cleanly.
- Current playable routes remain `/gaming/[game]`; no route migration is happening now.
- Future target is `/skills/[game]`, ideally with registry support for both `currentRoute` and `futureRoute`.
- Game components should avoid hardcoded `/gaming` product assumptions where practical and should rely on canonical registry identity instead of scattered strings.
- Future game build packets must include mobile/touch expectations, desktop keyboard/mouse expectations, content/data expectations, pilot references, and strict no-backend/no-route-migration scope unless explicitly approved.
- The app should remain functional on tablet/mobile where feasible; keyboard and mouse can be recommended as the best skill-building experience without making the product PC-only.
- Future Skills page copy guidance: "For the best skill-building experience, use a keyboard and mouse when available. Many activities also support touch so learners can practice on tablets and mobile devices."
- Hardcoded local content is acceptable during local development, but game content should be structured so banks can later move to Supabase or another internal content database.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11 - Fourth Local Runtime Pilot, if continuing runtime rollout.
- Alternative: Implementation Checkpoint 10D - Lint Warning Baseline Reduction, if the team wants to reduce warning noise before adding more pilots.

Exact resume instruction:
Resume with Implementation Checkpoint 11 or 10D only if implementation is explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, and `/lib/skills/runtime/README.md`; preserve all current scope boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting; and either apply the documented local-only runtime pattern to one approved fourth game or reduce the existing lint warning baseline in a separately scoped cleanup.

## Implementation Checkpoint 10D - Skills Game Content/Data Architecture Plan

Status: Complete.

Scope guard:
- Documentation and architecture strategy only.
- No game code changes.
- No runtime behavior changes.
- No API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, game content expansion, or lint warning reduction.

Documentation created:
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`

Documentation updated:
- `/docs/skills-games/integration/runtime-pilot-index.md`
  - Added the content/data strategy link.
  - Added Checkpoint 10D to completed checkpoints.
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
  - Added this Checkpoint 10D summary.

Strategy summary:
- Current games can keep local TypeScript content banks during development, but content should be separated from UI/game loop logic.
- Future content banks should be database-ready with fields such as `contentId`, `moduleId`, `gameKey`, `gradeLevel`, `difficulty`, `skillCategory`, `locale`, `prompt`, `answer`, `options`, `pairs`, `tags`, `contentType`, `estimatedDuration`, `isActive`, and `metadata`.
- Future redesign packets must include content expansion requirements, minimum content volume by grade/difficulty, randomization rules, localization notes, and future Supabase/internal DB mapping notes.
- Randomization should use approved pools, grade/difficulty filters, repeat avoidance, deterministic QA seeds, safe fallback content, and educational alignment safeguards.
- Future analytics should connect to content IDs, not raw child input.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11 - Fourth Local Runtime Pilot, if continuing runtime rollout.
- Alternative: a future content expansion planning checkpoint for one approved game using the new content/data strategy, without backend implementation.

Exact resume instruction:
Resume with Implementation Checkpoint 11 only if implementation is explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, and `/lib/skills/runtime/README.md`; preserve all current scope boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting; and either apply the documented local-only runtime pattern to one approved fourth game or plan content expansion for one approved game without backend implementation.

## Implementation Checkpoint 10E - Game Build Packet Template

Status: Complete.

Scope guard:
- Documentation/template only.
- No game code changes.
- No runtime behavior changes.
- No API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, game content expansion, or lint warning reduction.

Documentation created:
- `/docs/skills-games/integration/game-build-packet-template.md`

Documentation updated:
- `/docs/skills-games/integration/runtime-pilot-index.md`
  - Added the game build packet template link.
  - Added Checkpoint 10E to completed checkpoints.
  - Updated recommended next checkpoints to point future work through the packet template.
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`
  - Added this Checkpoint 10E summary.

Template summary:
- Each future game packet must define the approved task type, required source files, and strict scope guardrails.
- Runtime packets must follow the existing `SkillsGameRuntimeShell`, `useSkillsGameRuntime`, preview metadata, round result, payload preview, debug panel, and `[skills-runtime-preview]` pattern.
- Content packets must separate content from game loop logic, use local TypeScript banks where appropriate, define grade/difficulty/localization metadata, and document future Supabase/internal DB mapping.
- UI/mobile/accessibility packets must preserve portability, support desktop/tablet/mobile where feasible, avoid hover-only critical interactions, and keep games understandable without audio.
- Future agents must report files changed, validation results, portability status, mobile/touch status, content status, limitations, and recommended next step.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11 - Fourth Local Runtime Pilot using the game build packet template.
- Alternative: content expansion planning for one approved game using the packet template, without backend implementation.

Exact resume instruction:
Resume with Implementation Checkpoint 11 only if implementation is explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/docs/skills-games/integration/skills-games-integration-plan-notes.md`, and `/lib/skills/runtime/README.md`; preserve all current scope boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting; and apply the approved packet type to one approved target game only.

## Implementation Checkpoint 11A - Fourth Local Runtime Pilot: Math Key Quest

Status: Complete.

Scope guard:
- Math Key Quest only.
- Runtime integration only.
- Local-only.
- No content expansion, UI redesign, mobile redesign, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/components/gaming/math-key-quest/MathKeyQuestGame.tsx`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Runtime integration summary:
- Confirmed existing canonical registry entry for `math_key_quest`.
- Wrapped Math Key Quest with `SkillsGameRuntimeShell`.
- Moved the game body into an inner component that calls `useSkillsGameRuntime()`.
- Connected `beginRound`, `pauseRound`, `resumeRound`, and `endRound` to the existing controls.
- Reused shell-level `soundEnabled` and `reducedMotion` preferences for the existing toggles.
- Created a normalized local `SkillRoundResult` at round end.
- Generated a preview-only payload through `runtime.createPayloadPreview(...)`.
- Preserved `[skills-runtime-preview]` console logging.
- Rendered `SkillsRuntimeDebugPanel` only in development after round end.
- Included aggregate Math Key Quest metadata: `taskType`, `problemsCompleted`, `correctAnswers`, `attempts`, `mistakeCount`, `hintsUsed`, `bestStreak`, `gradeLevel`, `difficulty`, `mathOperation`, `skillCategory`, `inputMode`, and `allowedKeys`.
- Did not store raw keystroke logs or raw answer streams beyond existing aggregate metrics.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` passed before documentation updates.
- Full validation after documentation updates:
  - `cmd /c npm run lint` passed non-interactively with existing warnings.
  - `cmd /c npm run build` passed.
  - `cmd /c npx tsc --noEmit --pretty false` passed when rerun after build completed.
- Focused local route smoke for `/gaming/math-key-quest` passed:
  - route loaded
  - start worked
  - mute and reduce-motion toggles changed state
  - pause/resume worked
  - entering the current answer and ending the round showed the normal summary
  - debug panel was hidden before round end and visible after round end
  - `previewOnly: true`, canonical `math_key_quest` identity, `sessionId`, `roundId`, `soundPreference`, and `reducedMotion` were present
  - `[skills-runtime-preview]` logged
  - no `/api/skills`, Supabase, or `/rest/v1` requests were observed

Known limitations:
- Audible sound playback remains out of scope; only sound preference plumbing is connected.
- SessionTracker remains deferred.
- Existing local progress persistence remains unchanged.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11B - Focused local QA pass for Math Key Quest and four-pilot status update.
- Alternative: another one-game runtime pilot using `/docs/skills-games/integration/game-build-packet-template.md`.

Exact resume instruction:
Resume with Implementation Checkpoint 11B only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, content expansion, or SessionTracker mounting; and perform focused QA on `/gaming/math-key-quest` plus the existing runtime pilot pattern only.

## Implementation Checkpoint 11B - Four-Pilot QA + Status Update

Status: Complete.

Scope guard:
- QA and documentation only.
- No new runtime pilot.
- No game code changes.
- No content expansion, UI redesign, mobile redesign, API routes, Supabase writes, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

QA targets:
- `/gaming/word-builder-farm`
- `/gaming/memory-match`
- `/gaming/galaxy-click-command`
- `/gaming/math-key-quest`

QA result summary:
- Word Builder Farm passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `word_builder_farm` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Memory Match passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary (`Memory Board Complete`), development-only preview panel, expandable preview details, canonical `memory_match` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Galaxy Click Command passed route load, start, mute toggle, reduced-motion toggle, pause/resume, completion, normal summary, development-only preview panel, expandable preview details, canonical `galaxy_click_command` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Math Key Quest passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `math_key_quest` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Known limitations/non-blockers:
- Existing lint warnings remain non-blocking.
- SessionTracker remains deferred.
- Audible sound playback remains out of scope; current verification is limited to preference plumbing, toggle state, and metadata.
- Runtime previews remain local-only and `previewOnly`.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11C - Continue runtime rollout with one approved target game using `/docs/skills-games/integration/game-build-packet-template.md`.
- Alternative: a separately scoped one-game content expansion planning checkpoint with no backend work.

Exact resume instruction:
Resume with Implementation Checkpoint 11C only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, content expansion, or SessionTracker mounting; and apply the approved packet type to one approved target game only.

## Implementation Checkpoint 11C - Code Keys Workshop Local Runtime Pilot

Status: Complete.

Scope guard:
- Code Keys Workshop only.
- Runtime integration only.
- Local-only.
- No content expansion, UI redesign, mobile redesign, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/components/gaming/code-keys-workshop/CodeKeysWorkshopGame.tsx`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Runtime integration summary:
- Confirmed existing canonical registry entry for `code_keys_workshop`.
- Wrapped Code Keys Workshop with `SkillsGameRuntimeShell`.
- Moved the game body into an inner component that calls `useSkillsGameRuntime()`.
- Connected `beginRound`, `pauseRound`, `resumeRound`, and `endRound` to the existing controls.
- Reused shell-level `soundEnabled` and `reducedMotion` preferences for the existing toggles.
- Created a normalized local `SkillRoundResult` at round end.
- Generated a preview-only payload through `runtime.createPayloadPreview(...)`.
- Preserved `[skills-runtime-preview]` console logging.
- Rendered `SkillsRuntimeDebugPanel` only in development after round end.
- Included aggregate Code Keys Workshop metadata: `taskType`, `patternsCompleted`, `correctInputs`, `attempts`, `mistakeCount`, `bestStreak`, `gradeLevel`, `difficulty`, `symbolsMastered`, `codingSkillCategory`, `inputMode`, and `slowMode`.
- Did not store raw keystroke logs or raw command streams.

Focused route smoke:
- `/gaming/code-keys-workshop` loaded.
- Start worked.
- Mute Sounds and Reduce Motion toggles changed state.
- Pause/resume worked.
- Completing the current command and ending the round showed `Workshop Round Complete`.
- Development-only runtime preview was hidden before round end and visible after round end.
- `roundResult`, `xpEvent`, `progress`, and `registryEntry` expanded.
- `previewOnly: true`, canonical `code_keys_workshop` identity, `sessionId`, `roundId`, `soundPreference`, and `reducedMotion` were present.
- `[skills-runtime-preview]` logged.
- No `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` passed before documentation updates.
- Full validation after documentation updates:
  - `cmd /c npm run lint` passed non-interactively with existing warnings.
  - `cmd /c npm run build` passed.
  - `cmd /c npx tsc --noEmit --pretty false` passed.

Known limitations:
- Existing lint warnings remain non-blocking.
- SessionTracker remains deferred.
- Audible sound playback remains out of scope.
- This checkpoint did not expand Code Keys content or redesign the game.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11D - Focused QA/status pass after Code Keys Workshop.
- Alternative: continue one approved runtime pilot using `/docs/skills-games/integration/game-build-packet-template.md`.

Exact resume instruction:
Resume with Implementation Checkpoint 11D only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, content expansion, or SessionTracker mounting; and perform focused QA/status review for the current local runtime pilots only.

## Implementation Checkpoint 11D - Target Tracker Adventure Local Runtime Pilot

Status: Complete.

Scope guard:
- Target Tracker Adventure only.
- Runtime integration only.
- Local-only.
- No content expansion, UI redesign, mobile redesign, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, or lint warning reduction.

Canonical identity decision:
- Runtime preview uses canonical `moduleId/gameKey`: `target_tracker_adventure`.
- Existing route remains `/gaming/target-tracker`.
- Registry aliases remain preserved: `target_tracker`, `target-tracker`, and `target-tracker-adventure`.

Files changed:
- `/components/gaming/target-tracker/TargetTrackerGame.tsx`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Runtime integration summary:
- Confirmed existing canonical registry entry for `target_tracker_adventure`.
- Wrapped Target Tracker with `SkillsGameRuntimeShell`.
- Moved the game body into an inner component that calls `useSkillsGameRuntime()`.
- Connected `beginRound`, `pauseRound`, `resumeRound`, and `endRound` to the existing controls.
- Reused shell-level `soundEnabled` and `reducedMotion` preferences for the existing toggles.
- Created a normalized local `SkillRoundResult` at round end.
- Generated a preview-only payload through `runtime.createPayloadPreview(...)`.
- Preserved `[skills-runtime-preview]` console logging.
- Rendered `SkillsRuntimeDebugPanel` only in development after round end.
- Included aggregate Target Tracker metadata: `taskType`, `targetsCompleted`, `objectsCollected`, `correctClicks`, `missedClicks`, `attempts`, `mistakeCount`, `bestStreak`, `trackingAccuracy`, `trackingPercentage`, `gradeLevel`, `difficulty`, `targetSize`, `targetSpeed`, `baseTargetSpeed`, `targetLifetime`, `trackingZoneRadius`, `assistMode`, `reducedMotion`, and `trackingMode`.
- Did not add raw pointer trails, raw mouse-coordinate telemetry, or raw click streams to preview payloads.

Focused route smoke:
- `/gaming/target-tracker` loaded.
- Start worked.
- Mute Sounds and Reduce Motion toggles changed state.
- Pause/resume worked.
- End Round showed the normal summary.
- Development-only runtime preview was hidden before round end and visible after round end.
- `roundResult`, `xpEvent`, `progress`, and `registryEntry` expanded.
- `previewOnly: true`, canonical `target_tracker_adventure` identity, `sessionId`, `roundId`, `soundPreference`, and `reducedMotion` were present.
- Registry aliases were visible in `registryEntry`.
- `[skills-runtime-preview]` logged.
- No `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` passed before documentation updates.
- Full validation after documentation updates:
  - `cmd /c npm run lint` passed non-interactively with existing warnings.
  - `cmd /c npm run build` passed.
  - `cmd /c npx tsc --noEmit --pretty false` passed.

Known limitations:
- Existing lint warnings remain non-blocking.
- SessionTracker remains deferred.
- Audible sound playback remains out of scope.
- This checkpoint did not expand Target Tracker content or redesign the game.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11E - Focused QA/status pass after Target Tracker Adventure.
- Alternative: continue one approved runtime pilot using `/docs/skills-games/integration/game-build-packet-template.md`.

Exact resume instruction:
Resume with Implementation Checkpoint 11E only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, content expansion, or SessionTracker mounting; and perform focused QA/status review for the current local runtime pilots only.

## Implementation Checkpoint 11E - Bug Trail Maze Local Runtime Pilot

Status: Complete.

Scope guard:
- Bug Trail Maze only.
- Runtime integration only.
- Local-only.
- No content expansion, UI redesign, mobile redesign, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/components/gaming/bug-trail-maze/BugTrailMazeGame.tsx`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Runtime integration summary:
- Confirmed existing canonical registry entry for `bug_trail_maze`.
- Wrapped Bug Trail Maze with `SkillsGameRuntimeShell`.
- Moved the game body into an inner component that calls `useSkillsGameRuntime()`.
- Connected `beginRound`, `pauseRound`, `resumeRound`, and `endRound` to the existing controls.
- Reused shell-level `soundEnabled` and `reducedMotion` preferences for the existing toggles.
- Created a normalized local `SkillRoundResult` at round end.
- Generated a preview-only payload through `runtime.createPayloadPreview(...)`.
- Preserved `[skills-runtime-preview]` console logging.
- Rendered `SkillsRuntimeDebugPanel` only in development after round end.
- Included aggregate Bug Trail Maze metadata: `taskType`, `itemsCollected`, `correctItems`, `missedItems`, `attempts`, `mistakeCount`, `pathAccuracy`, `insidePathFrames`, `totalPathFrames`, `bestStreak`, `gradeLevel`, `difficulty`, `pathDifficulty`, `widerPath`, `assistMode`, `reducedMotion`, `pathWidth`, `itemSize`, and `requiredOrder`.
- Did not add raw pointer trails, raw mouse-coordinate telemetry, or raw frame-by-frame movement arrays.
- Replaced the corrupted bug glyph with plain `Bug` while preserving the moving marker behavior.

Focused route smoke:
- `/gaming/bug-trail-maze` loaded.
- Start worked.
- Mute Sounds and Reduce Motion toggles changed state.
- Pause/resume worked.
- End Round showed `Trail Round Complete`.
- Development-only runtime preview was hidden before round end and visible after round end.
- `roundResult`, `xpEvent`, `progress`, and `registryEntry` expanded.
- `previewOnly: true`, canonical `bug_trail_maze` identity, `sessionId`, `roundId`, `soundPreference`, and `reducedMotion` were present.
- `[skills-runtime-preview]` logged.
- No `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Validation:
- `cmd /c npx tsc --noEmit --pretty false` passed before documentation updates.
- Full validation after documentation updates:
  - `cmd /c npm run lint` passed non-interactively with existing warnings.
  - `cmd /c npm run build` passed.
  - `cmd /c npx tsc --noEmit --pretty false` passed.

Known limitations:
- Existing lint warnings remain non-blocking.
- SessionTracker remains deferred.
- Audible sound playback remains out of scope.
- This checkpoint did not expand Bug Trail Maze content or redesign the game.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11F - Focused QA/status pass after Bug Trail Maze.
- Alternative: continue one approved runtime pilot using `/docs/skills-games/integration/game-build-packet-template.md`.

Exact resume instruction:
Resume with Implementation Checkpoint 11F only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, content expansion, or SessionTracker mounting; and perform focused QA/status review for the current local runtime pilots only.

## Implementation Checkpoint 11F - Seven-Pilot QA + Runtime Rollout Status Update

Status: Complete.

Scope guard:
- QA and documentation only.
- No new runtime pilot.
- No game code changes.
- No content expansion, UI redesign, mobile redesign, API routes, Supabase writes, dashboards, route migration, Skills Hub redesign, Shape Shifter implementation, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

QA targets:
- `/gaming/word-builder-farm`
- `/gaming/memory-match`
- `/gaming/galaxy-click-command`
- `/gaming/math-key-quest`
- `/gaming/code-keys-workshop`
- `/gaming/target-tracker`
- `/gaming/bug-trail-maze`

QA result summary:
- Word Builder Farm passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `word_builder_farm` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Memory Match passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `memory_match` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Galaxy Click Command passed route load, start, mute toggle, reduced-motion toggle, pause/resume, round completion, normal summary, development-only preview panel, expandable preview details, canonical `galaxy_click_command` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Math Key Quest passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `math_key_quest` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Code Keys Workshop passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `code_keys_workshop` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Target Tracker Adventure passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `target_tracker_adventure` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- Bug Trail Maze passed route load, start, mute toggle, reduced-motion toggle, pause/resume, end round, normal summary, development-only preview panel, expandable preview details, canonical `bug_trail_maze` identity, `sessionId`, `roundId`, shared metadata, aggregate-only telemetry check, console preview log, and no forbidden backend/Supabase/REST traffic.
- The seven-pilot QA pass checked for absence of raw keystroke logs, raw pointer trails, raw click streams, raw coordinates, and raw frame-by-frame movement arrays in runtime previews.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Known limitations/non-blockers:
- Existing lint warnings remain non-blocking.
- SessionTracker remains deferred.
- Audible sound playback remains out of scope; current verification is limited to preference plumbing, toggle state, and metadata.
- Runtime previews remain local-only and `previewOnly`.

Recommended next implementation checkpoint:
- Implementation Checkpoint 11G - Continue one approved runtime pilot using `/docs/skills-games/integration/game-build-packet-template.md`.
- Alternative: a cleanup/merge checkpoint to review current Phase 3 runtime rollout changes before adding more pilots.

Exact resume instruction:
Resume with Implementation Checkpoint 11G only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, content expansion, or SessionTracker mounting; and apply the approved packet type to one approved target game only.

## Implementation Checkpoint 12A - Shared Skills Content Bank Skeleton + Selector Randomization Tests

Status: Complete.

Scope guard:
- Local content architecture only.
- Small seed content only.
- Selector/randomization helper validation only.
- No game UI changes, live Memory Match gameplay changes, runtime behavior changes, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, SessionTracker, audible sound playback, or lint warning reduction.

Files created:
- `/lib/skills/content/types.ts`
- `/lib/skills/content/index.ts`
- `/lib/skills/content/math/mathContent.ts`
- `/lib/skills/content/literacy/literacyContent.ts`
- `/lib/skills/content/science/scienceContent.ts`
- `/lib/skills/content/social-studies/socialStudiesContent.ts`
- `/lib/skills/content/selectors/contentFilters.ts`
- `/lib/skills/content/selectors/randomization.ts`
- `/lib/skills/content/selectors/contentSelectionPreview.ts`
- `/lib/skills/content/adapters/memoryMatchContentAdapter.ts`

Files changed:
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Content bank summary:
- Added reusable `SkillContentDomain`, `SkillGradeLevel`, `SkillContentDifficulty`, `SkillContentDisplayType`, and `SkillContentItem` types.
- Added small local seed banks for math, literacy, science, and social studies.
- Added math 2nd grade addition examples with `focusValue: 8`, including `math-2-add-8-0`, `math-2-add-8-1`, and `math-2-add-8-2`, plus one non-8 addition example for exclusion checks.
- Added Kindergarten literacy uppercase/lowercase, picture/word, and beginning sound examples.
- Added simple science and social studies term/definition examples.

Selector and randomization summary:
- `filterSkillContent(...)` supports filtering by domain, gradeLevel, skillCategory, locale, difficulty, tags, and metadata.
- `filterByMetadataValue(...)` supports focused metadata checks such as `focusValue = 8`.
- `getEligibleSkillContent(...)` wraps the standard filter path for future game integration.
- `shuffleItems(...)`, `takeRandomItems(...)`, and `shuffleCards(...)` support unseeded normal gameplay.
- `takeSeededItems(...)`, `shuffleSeededCards(...)`, and `createSeededRandom(...)` support deterministic QA/debug behavior.
- Pair selection and card-position shuffling are kept separate.

Memory Match adapter summary:
- Converts selected `SkillContentItem` records into Memory Match pairs.
- Math records use `equation_answer`; other domains use `prompt_answer`.
- Converts pairs into prompt/answer cards.
- Supports unseeded card-position shuffling for normal gameplay.
- Supports seeded shuffle for QA/debug only.
- Not wired into the live Memory Match game yet.

Validation coverage:
- Lightweight validation helper in `/lib/skills/content/selectors/contentSelectionPreview.ts` checks 2nd grade math addition filtering, `focusValue = 8` filtering, same-seed deterministic order, different-seed alternate order, unseeded selection availability, separate pair/card shuffle behavior, unseeded card-order variation, and index-export coverage.

Future assignment note:
- Future assignment mode may use category + parameter/value + card count + due date, for example Math Addition + Value 8s + Card Count 16 + Due Date Friday.
- Future assignment mode may use stable seed/config for consistent student practice and analytics.
- No assignment UI, assignment backend, dashboard behavior, or production persistence was implemented.

Known limitations:
- The content skeleton is local-first and database-ready, but not connected to live gameplay.
- Seed banks are intentionally small.
- It does not replace game-specific layout/task banks yet.
- Standard Skills Hub Memory Match randomization remains a future wiring checkpoint.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12B - Wire Memory Match standard Skills Hub gameplay to the shared content bank using unseeded pair selection and separate card-position shuffling, while preserving existing runtime behavior and keeping assignment mode future-only.

Exact resume instruction:
Resume with Implementation Checkpoint 12B only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/content/index.ts`, `/lib/skills/content/adapters/memoryMatchContentAdapter.ts`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting; wire Memory Match only if the checkpoint explicitly approves live gameplay integration; use unseeded standard gameplay selection and separate card-position shuffling; keep assignment mode future-only.

## Implementation Checkpoint 12B - Memory Match Content Config + Local Deck Preview

Status: Complete.

Scope guard:
- Memory Match content configuration only.
- Local preview/helper only.
- No live Memory Match UI changes, live gameplay changes, runtime behavior changes, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, SessionTracker, audible sound playback, lint warning reduction, or assignment dashboard behavior.

Files created:
- `/lib/skills/content/memory-match/memoryMatchCategories.ts`
- `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`
- `/lib/skills/content/memory-match/index.ts`

Files changed:
- `/lib/skills/content/index.ts`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Category configs added:
- `k-uppercase-lowercase`: standard game, low ambiguity, literacy uppercase/lowercase.
- `k-picture-word`: standard game, low ambiguity, literacy picture/word matching.
- `k-beginning-sound`: guided-only, medium ambiguity, with future rule to avoid duplicate beginning sounds in a round.
- `2nd-math-addition`: standard game, low ambiguity, math addition.
- `2nd-math-addition-8s`: standard-game preview/future assignment-style focus category, low ambiguity, math addition filtered by `metadata.focusValue = 8`.

Deck preview behavior:
- `createMemoryMatchDeckPreview(...)` accepts `categoryId`, requested card count, optional seed, and optional card-shuffle toggle.
- Category lookup maps game-facing categories to shared content filters.
- Shared content is filtered through `getEligibleSkillContent(...)`.
- Requested card count maps to pair count with `mapCardCountToPairCount(...)`.
- Selected content is converted into Memory Match pairs and then cards.
- Card positions are shuffled separately from pair selection.
- Unseeded preview is the default for normal gameplay preview.
- Seeded preview is deterministic only when a seed is passed for QA/debugging or future assignment stability.

Preview validation coverage:
- Category ID lookup.
- K uppercase/lowercase records pull only matching literacy records.
- 2nd grade math addition pulls only matching math addition records.
- 2nd grade math addition 8s pulls only `focusValue = 8` records.
- Card-count mapping: 10 cards = 5 pairs, 12 cards = 6 pairs, 16 cards = 8 pairs, 20 cards = 10 pairs.
- Pair selection and card shuffling are separate.
- Seeded preview is stable for QA.
- Unseeded preview is available for normal gameplay.

New content pickup rule:
- New records are included when exported through their subject content bank and `/lib/skills/content/index.ts`.
- New Memory Match categories can point at those records by adding a category config with the correct shared filters.

Known limitations:
- The deck preview layer is not wired into `/gaming/memory-match` yet.
- Seed content is intentionally small, so requested card counts can exceed available pairs until content expansion happens.
- Assignment mode is documented as a future constraint only; no dashboard, backend, or persistence work exists.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12C - Wire live Memory Match standard gameplay to the local deck preview layer, preserving runtime behavior and using unseeded standard-game selection plus separate card-position shuffling. Keep assignment mode future-only.

Exact resume instruction:
Resume with Implementation Checkpoint 12C only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, `/lib/skills/content/adapters/memoryMatchContentAdapter.ts`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, or SessionTracker mounting; if approved, wire only standard Memory Match gameplay to the local preview layer; use unseeded standard gameplay selection and separate card-position shuffling; keep assignment mode future-only.

## Implementation Checkpoint 12C - Wire Memory Match Standard Gameplay to Shared Content Deck Preview

Status: Complete.

Scope guard:
- Memory Match only.
- Standard game mode only.
- Local-only shared content/deck preview layer.
- No assignment dashboard behavior, assignment backend, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, SessionTracker, audible sound playback, lint warning reduction, or large content expansion.

Files changed:
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Live Memory Match wiring summary:
- Round start now calls `createMemoryMatchDeckPreview(...)` instead of the old component-local `getPairs(...)` path.
- The game uses shared local content filtered by Memory Match category config.
- Generated cards from the preview layer become the active board cards.
- Existing card flip/match logic remains intact.
- Existing runtime calls remain intact: `beginRound`, `pauseRound`, `resumeRound`, `endRound`, local payload preview, `[skills-runtime-preview]`, and development-only `SkillsRuntimeDebugPanel`.
- Normal gameplay does not pass a seed.

Category/card count behavior:
- Ready state includes a category selector powered by standard-game Memory Match categories.
- Ready state includes a card-count selector using the selected category's allowed counts.
- Default category is `2nd-math-addition`.
- Current standard categories are `2nd-math-addition`, `k-uppercase-lowercase`, and `k-picture-word`.
- The shared seed content remains intentionally small, so requested card counts may exceed available pairs until content expansion.

Runtime preview metadata added:
- `selectedCategoryId`
- `selectedCategoryLabel`
- `requestedCardCount`
- `resolvedCardCount`
- `selectedPairCount`
- `availablePairCount`
- `pairSelectionMode`
- `cardShuffleMode`
- `contentIds`

Randomization result:
- Standard gameplay uses unseeded pair selection and separate unseeded card-position shuffling.
- Focused randomization smoke started five normal boards for `2nd-math-addition`, used Hint Reveal only for test inspection, and observed five unique card orders.
- This confirms the first board is not always identical and a pair such as `8 + 4 -> 12` does not always land in the same board position.

Focused route smoke:
- `/gaming/memory-match` loaded.
- Category selector worked.
- Card-count selector worked.
- Start worked.
- Shared-content cards appeared.
- A generated math pair matched successfully and advanced the match counter.
- End Round worked.
- Normal round summary appeared.
- Development-only Skills Runtime Preview appeared after round end and was hidden before round end.
- Preview remained `previewOnly: true` with canonical `memory_match` identity, `sessionId`, `roundId`, `soundPreference`, `reducedMotion`, and selected category/deck metadata.
- `[skills-runtime-preview]` logged.
- No `/api/skills`, Supabase, or `/rest/v1` requests were observed.

New content pickup rule:
- New records are eligible when exported through the appropriate subject bank and `/lib/skills/content/index.ts`.
- Memory Match can use them when a category config points to them through shared filters.

Known limitations:
- Assignment mode remains future-only.
- No assignment UI, backend, dashboard behavior, or stable assignment seed behavior was implemented.
- Current seed banks are small and should be expanded before relying on larger card-count settings.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12D - Focused Memory Match content QA/status pass, then decide whether the next scoped packet should be small content expansion or Memory Match visual/mobile redesign.

Exact resume instruction:
Resume with Implementation Checkpoint 12D only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, or SessionTracker mounting; focus on Memory Match content QA/status only unless a new implementation packet explicitly scopes more work.

## Implementation Checkpoint 12D - Memory Match Shared Content QA + Status Pass

Status: Complete.

Scope guard:
- QA and documentation only.
- Memory Match only.
- No new content expansion, UI redesign, mobile redesign, runtime behavior changes, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

QA target:
- `/gaming/memory-match`

QA results:
- Route loads.
- Category selector appears.
- Card-count selector appears.
- Standard categories are available: `k-uppercase-lowercase`, `k-picture-word`, and `2nd-math-addition`.
- Default category is `2nd-math-addition`.
- Default card count is `10`.
- User can select another category.
- User can select another card count.
- Start Round works.
- Cards render from shared content/deck preview data.
- Cards can be flipped.
- Matching still works and advances the match counter.
- End Round works.
- Normal round summary appears.
- Development-only Skills Runtime Preview appears after round end.
- Debug panel is hidden before round end.
- Preview remains `previewOnly: true`.
- `moduleId/gameKey` remain `memory_match`.
- `sessionId` and `roundId` exist.
- Metadata includes `soundPreference` and `reducedMotion`.
- Metadata includes selected category/deck fields: `selectedCategoryId`, `selectedCategoryLabel`, `requestedCardCount`, `resolvedCardCount`, `selectedPairCount`, `availablePairCount`, `pairSelectionMode`, `cardShuffleMode`, and `contentIds`.
- Console logs `[skills-runtime-preview]`.
- Network shows no `/api/skills`, Supabase, or `/rest/v1` calls.

Randomization QA:
- Started five normal unseeded rounds with the same category/card count.
- Observed five unique board orders.
- Confirmed the first board is not always identical.
- Confirmed pair selection and card placement are separate.
- Confirmed the same card can land in different board positions across starts.
- Confirmed seeded behavior remains helper-only; no seed UI is exposed during normal gameplay.

Content pickup QA:
- New exported records will be picked up when added to the appropriate subject bank and exported through `/lib/skills/content/index.ts`.
- Memory Match categories will include those records when their shared filters match.
- No large new content was added in this checkpoint.

Gameplay-completion note:
- Current runtime QA uses End Round to force the summary and preview payload.
- Future polished learner experience should support automatic completion when all Memory Match pairs are naturally matched, while keeping End Round as an early-exit option.
- Auto-complete was not implemented in this checkpoint.

Known limitations:
- Current seed content is intentionally small.
- Larger content pools are required before final game polish.
- Assignment mode remains future-only.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12E - Memory Match content expansion packet, focused on adding enough local shared content to support selected category/card-count combinations.
- Alternative: learner-experience polish packet for natural auto-completion and mobile-friendly board presentation, if explicitly approved.

Exact resume instruction:
Resume with Implementation Checkpoint 12E only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, or SessionTracker mounting; if approved, expand only local shared Memory Match content or perform only the explicitly scoped learner-experience polish.

## Implementation Checkpoint 12E - Memory Match Small Content Expansion Packet

Status: Complete.

Scope guard:
- Shared local content expansion only.
- Memory Match category support only.
- No UI redesign, mobile redesign, runtime behavior changes, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/lib/skills/content/literacy/literacyContent.ts`
- `/lib/skills/content/math/mathContent.ts`
- `/lib/skills/content/selectors/contentSelectionPreview.ts`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Content added by category:
- `k-uppercase-lowercase`: full A-Z uppercase/lowercase set, 26 records, stable `lit-k-case-[letter]` IDs.
- `k-picture-word`: 20 simple picture/word vocabulary records: apple, ball, book, car, cat, cup, dog, fish, hat, leaf, moon, shoe, star, sun, tree, boat, cake, door, frog, and kite.
- `k-beginning-sound`: 12 guided/future-sensitive records with unique beginning letters: A/apple, B/ball, C/cat, D/dog, F/fish, H/hat, K/kite, L/leaf, M/moon, S/sun, T/tree, and Z/zip.
- `2nd-math-addition`: 19 addition records total.
- `2nd-math-addition-8s`: 13 focus-8 records from `0 + 8` through `12 + 8`.

Eligible record counts by Memory Match category:
- `k-uppercase-lowercase`: 26 eligible pairs.
- `k-picture-word`: 20 eligible pairs.
- `k-beginning-sound`: 12 eligible pairs.
- `2nd-math-addition`: 19 eligible pairs.
- `2nd-math-addition-8s`: 13 eligible pairs.

Card-count support:
- `k-uppercase-lowercase`: 10, 12, 16, and 20 cards fully supported.
- `k-picture-word`: 10, 12, 16, and 20 cards fully supported.
- `k-beginning-sound`: 10, 12, 16, and 20 cards fully supported, but category remains guided/future-sensitive.
- `2nd-math-addition`: 10, 12, 16, and 20 cards fully supported.
- `2nd-math-addition-8s`: 10, 12, 16, and 20 cards fully supported.

Content pickup:
- New records are exported through the existing subject bank arrays, so `/lib/skills/content/index.ts` picks them up automatically.
- Existing Memory Match category filters can now draw from the expanded local pools without game/runtime changes.

Focused Memory Match smoke:
- `/gaming/memory-match` loaded.
- Category selector appeared with `k-uppercase-lowercase`, `k-picture-word`, and `2nd-math-addition`.
- Card-count selector appeared with `10`, `12`, `16`, and `20`.
- Default category remained `2nd-math-addition`.
- Default card count remained `10`.
- `k-uppercase-lowercase` produced a 20-card playable board.
- `k-picture-word` produced a 20-card playable board.
- `2nd-math-addition` produced a 20-card playable board.
- `2nd-math-addition-8s` has 13 eligible focus-8 records, enough for at least a 10-card board and enough for all current 10/12/16/20-card options.
- Randomization smoke produced five unique board orders across five starts.
- Round summary and development-only runtime preview still appeared.
- Preview remained `previewOnly` and included deck metadata.
- No `/api/skills`, Supabase, or `/rest/v1` calls were observed.

Known limitations:
- Beginning sound remains guided/future-sensitive because duplicate-sound and ambiguity rules are still future work.
- This is still local-first content only; no backend content loading or authoring workflow exists.
- This checkpoint does not add auto-complete, UI polish, mobile redesign, assignment mode, or sound playback.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12F - Focused Memory Match post-expansion QA/status pass.
- Alternative: a scoped learner-experience polish packet for natural auto-completion and mobile-friendly board presentation.

Exact resume instruction:
Resume with Implementation Checkpoint 12F only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/lib/skills/content/literacy/literacyContent.ts`, `/lib/skills/content/math/mathContent.ts`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, or SessionTracker mounting; focus on Memory Match post-expansion QA/status only unless a new implementation packet explicitly scopes more work.

## Implementation Checkpoint 12F - Memory Match Post-Expansion QA + Status Pass

Status: Complete.

Scope guard:
- QA and documentation only.
- Memory Match only.
- No new content expansion, UI redesign, mobile redesign, runtime behavior changes, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

QA target:
- `/gaming/memory-match`

Live standard-game QA results:
- Route loads.
- Category selector appears.
- Card-count selector appears.
- Exposed standard categories are available: `k-uppercase-lowercase`, `k-picture-word`, and `2nd-math-addition`.
- Card-count options are available: `10`, `12`, `16`, and `20`.
- Default category remains `2nd-math-addition`.
- Default card count remains `10`.
- Each exposed standard category can start a round.
- Each exposed standard category can produce playable 10, 12, 16, and 20-card boards.
- Cards render from shared local content.
- Cards can be flipped.
- End Round works.
- Normal round summary appears.
- Development-only Skills Runtime Preview appears after round end.
- Debug panel is hidden before round end.
- Preview remains `previewOnly: true`.
- `moduleId/gameKey` remain `memory_match`.
- `sessionId` and `roundId` exist.
- Metadata includes `soundPreference`, `reducedMotion`, and selected category/deck metadata.
- Console logs `[skills-runtime-preview]`.
- Network shows no `/api/skills`, Supabase, or `/rest/v1` calls.

Category QA results:
- `k-uppercase-lowercase`: 10, 12, 16, and 20-card boards all rendered the expected number of cards and remained playable.
- `k-picture-word`: 10, 12, 16, and 20-card boards all rendered the expected number of cards and remained playable.
- `2nd-math-addition`: 10, 12, 16, and 20-card boards all rendered the expected number of cards and remained playable.
- `k-beginning-sound`: 12 eligible pairs in shared content and remains guided/future-sensitive by config, not exposed in standard gameplay.
- `2nd-math-addition-8s`: 13 eligible focus-8 pairs in shared content and remains a future-preview/future-assignment category by config, not exposed in standard gameplay.

Card-count support results:
- `k-uppercase-lowercase`: 26 eligible pairs; supports 10, 12, 16, and 20 cards.
- `k-picture-word`: 20 eligible pairs; supports 10, 12, 16, and 20 cards.
- `k-beginning-sound`: 12 eligible pairs; supports 10, 12, 16, and 20 cards, but remains guided/future-sensitive.
- `2nd-math-addition`: 19 eligible records; supports 10, 12, 16, and 20 cards.
- `2nd-math-addition-8s`: 13 `focusValue: 8` records; supports 10, 12, 16, and 20 cards.

Randomization QA:
- Started five normal unseeded 20-card `2nd-math-addition` boards.
- Observed five unique board orders.
- Confirmed the first board is not always identical.
- Confirmed the same card can land in different board positions.
- Confirmed pair selection and card-position shuffling remain separate.
- Confirmed seeded behavior remains helper-only and no seed UI is exposed in normal gameplay.

Content pickup QA:
- New records are picked up through the subject banks and `/lib/skills/content/index.ts`.
- Existing Memory Match category filters draw from those exported records.

Future polish notes:
- Assignment mode remains future-only.
- Future learner-facing polish should add automatic completion when all pairs are matched.
- Future visual polish should make the board mobile-friendly and more child-friendly.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12G - Scoped Memory Match learner-experience polish, such as automatic completion after all pairs match and a mobile-friendlier board presentation.
- Alternative: return to broader Skills runtime/content rollout with a new approved packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12G only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, or SessionTracker mounting; implement only the explicitly approved Memory Match learner-experience polish or perform only the approved next packet.

## Implementation Checkpoint 12G - Memory Match Natural Auto-Complete + Early-Exit Behavior

Status: Complete.

Scope guard:
- Memory Match only.
- Learner-experience polish only.
- Natural auto-completion only.
- No new content expansion, UI redesign beyond tiny non-visible QA attributes, mobile redesign, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What changed:
- Replaced the manual-only round-end implementation with a guarded shared `completeRound(...)` path.
- Added automatic completion when the final pair is matched.
- Preserved End Round as a manual early-exit option.
- Added aggregate `completionType` metadata with `auto_complete` or `manual_end`.
- Added non-visible card data attributes for stable QA targeting; no visible UI redesign was introduced.

Auto-completion behavior:
- On each successful match, Memory Match computes the next match count, attempt count, best streak, XP-in-round value, and card snapshot.
- If the next match count equals the active pair count, the game calls the same completion path used by End Round with `completionType: auto_complete`.
- A completion-in-flight guard prevents duplicate completion if a final match and manual End Round happen close together.

Manual End Round behavior:
- End Round still calls the same completion path with `completionType: manual_end`.
- Manual early exit still shows the normal summary and development-only runtime preview.
- Play Again and Return to Gaming behavior remain unchanged.

Runtime preview behavior:
- Preview remains `previewOnly: true`.
- `moduleId/gameKey` remain `memory_match`.
- `sessionId` and `roundId` remain present.
- Metadata still includes `soundPreference`, `reducedMotion`, selected category/deck metadata, and now `completionType`.
- `[skills-runtime-preview]` still logs.
- No `/api/skills`, Supabase, or `/rest/v1` calls were observed.

Focused smoke results:
- `/gaming/memory-match` loaded.
- Category selector still worked.
- Card-count selector still worked.
- Shared-content cards rendered and could be flipped.
- Manual End Round before all pairs were matched showed summary and runtime preview with `completionType: manual_end`.
- Matching all five pairs in a 10-card board automatically showed summary and runtime preview with `completionType: auto_complete`.
- Auto-completion produced one summary and one preview console log in focused QA.
- Normal gameplay randomization still produced varied board orders; no seed UI was exposed.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12H - Focused Memory Match learner-flow QA/status pass.
- Alternative: mobile-friendly, child-friendly board presentation polish if explicitly approved.

Exact resume instruction:
Resume with Implementation Checkpoint 12H only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, content expansion, or SessionTracker mounting; perform only focused Memory Match learner-flow QA/status or the explicitly approved next polish packet.

## Implementation Checkpoint 12H - Memory Match Visual + Mobile-Friendly Board Presentation

Status: Complete.

Scope guard:
- Memory Match only.
- Visual/layout/mobile presentation polish only.
- No new content expansion, runtime behavior change, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

What changed:
- Reworked the ready-state presentation into a cleaner setup panel with category, board-size, grade, and skill context.
- Added an active round progress strip with selected category, pair progress, attempts, accuracy, and reduced-motion-safe progress fill.
- Reworked the board into a responsive two-to-five-column grid with a balanced desktop max width and mobile-friendly spacing.
- Updated card presentation for clearer face-down, revealed, and matched states.
- Added larger tap targets, visible focus rings, `aria-label`, `aria-pressed`, disabled matched cards, and safer text wrapping.
- Removed a visible mojibake bullet from the top-bar accuracy label by using a plain ASCII separator.

Preserved behavior:
- Shared content/deck preview wiring remains active.
- Standard gameplay remains unseeded and uses separate pair selection and card-position shuffling.
- Natural auto-completion still fires when all pairs are matched.
- Manual End Round remains an early-exit path.
- Round summary and development-only Skills Runtime Preview still appear after both completion paths.
- Runtime preview remains `previewOnly: true`, keeps `completionType`, deck/category metadata, `soundPreference`, and `reducedMotion`, and logs `[skills-runtime-preview]`.

Focused smoke results:
- `/gaming/memory-match` loaded at desktop width.
- 10-card `2nd-math-addition` board rendered with no horizontal overflow, large card targets, ARIA labels/state, hidden debug panel before end, manual End Round summary, runtime preview, and `completionType: manual_end`.
- `/gaming/memory-match` loaded at mobile-ish width.
- 20-card `k-uppercase-lowercase` board rendered with no horizontal overflow, large card targets, ARIA labels/state, hidden debug panel before end, auto-complete summary, runtime preview, and `completionType: auto_complete`.
- Focused smoke observed exactly two `[skills-runtime-preview]` logs for two completed rounds.
- No `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12I - Focused Memory Match visual/mobile QA/status pass, or pause for a merge/baseline checkpoint before additional content/UI packets.

Exact resume instruction:
Resume with Implementation Checkpoint 12I only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, content expansion, or SessionTracker mounting; perform only the explicitly approved Memory Match QA/status pass or next scoped packet.

## Implementation Checkpoint 12H.1 - Memory Match Asset-Driven Visual Polish Fix

Status: Complete.

Scope guard:
- Memory Match only.
- Visual polish and asset/design-reference integration only.
- Small grade-selector label cleanup only.
- No content expansion, runtime behavior change, randomization change, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Asset/design files inspected:
- `/assets/skills/memory-match/asset-manifest.md`
- `/assets/skills/memory-match/animation-notes.md`
- `/assets/skills/memory-match/sound-notes.md`
- `/assets/skills/memory-match/reference/README.md`
- `/assets/skills/memory-match/background.png`
- `/assets/skills/memory-match/sprite-sheet.png`
- `/assets/skills/memory-match/ui-state-sheet.png`
- `/assets/skills/memory-match/interaction-state-diagram.png`

Assets/design references used:
- `background.png` is imported and used as the real Memory Match page background with a light readability overlay.
- `sprite-sheet.png` informed the blue star card backs, cream card faces, lime matched state, dashed inner card borders, soft shadows, and classroom-card shape language.
- `ui-state-sheet.png` informed the ready panel, active progress strip, clean board zone, and positive matched-card treatment.
- `animation-notes.md` informed reduced-motion-safe hover/transition behavior.
- `sound-notes.md` confirmed that all critical cues must remain visual because no audible sound playback was added.

Important asset note:
- The sprite sheet was not sliced because no formal atlas metadata exists. Card visuals are CSS-driven while following the active sheet direction.
- The expected `interaction-states.md` file does not exist; the available active file is `interaction-state-diagram.png`.

Files changed:
- `/components/gaming/GradeSelector.tsx`
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Visual changes:
- Replaced the dark prototype page backdrop with the real bright classroom tabletop background.
- Shifted Memory Match panels to warm white, sky, mint, and soft lavender treatments matching the asset package.
- Added a small ready-state card preview using the blue star card-back style.
- Reworked face-down cards into rounded blue educational card backs with dashed inner border, soft star motifs, and classroom-card shadows.
- Reworked revealed cards into cream card faces with readable content and dashed inner border.
- Reworked matched cards into a lime success state with a small check badge and positive glow.
- Preserved responsive two-to-five-column board behavior and large mobile tap targets.

Grade selector label cleanup:
- `GradeSelector` now supports an optional visible label formatter.
- Memory Match displays `K`, `1st`, `2nd`, `3rd`, `4th`, and `5th`.
- The Kindergarten button keeps `aria-label="Kindergarten"` and the underlying value remains `Kindergarten`.
- Memory Match top-bar grade display now shows `K` for Kindergarten while preserving game logic.

Focused smoke results:
- Desktop ready-state panel loaded with the asset-driven background and no horizontal overflow.
- Desktop 10-card and 20-card boards rendered with large card targets, no horizontal overflow, ARIA labels/state, and hidden debug panel before end.
- Mobile-ish ready-state panel loaded with no horizontal overflow and the K label available.
- Mobile-ish 10-card and 20-card boards rendered with large card targets, no horizontal overflow, ARIA labels/state, and hidden debug panel before end.
- Manual End Round still produced summary and runtime preview with `completionType: manual_end`.
- Matching all pairs still produced auto-complete summary and runtime preview with `completionType: auto_complete`.
- Focused smoke observed exactly two `[skills-runtime-preview]` logs for two completed rounds.
- No `/api/skills`, Supabase, or `/rest/v1` requests were observed.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12I - Memory Match content expansion, or a focused visual/mobile QA/status pass if preferred before content work.

Exact resume instruction:
Resume with Implementation Checkpoint 12I only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, `/components/gaming/GradeSelector.tsx`, `/assets/skills/memory-match/asset-manifest.md`, `/assets/skills/memory-match/reference/README.md`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, or SessionTracker mounting; perform only the explicitly approved Memory Match content or QA/status packet.

## Implementation Checkpoint 12I - Memory Match Content Expansion Batch 2

Status: Complete.

Scope guard:
- Memory Match shared local content expansion only.
- No UI redesign, mobile redesign, visual redesign, runtime behavior change, auto-complete change, shared shell change, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/lib/skills/content/literacy/literacyContent.ts`
- `/lib/skills/content/math/mathContent.ts`
- `/lib/skills/content/science/scienceContent.ts`
- `/lib/skills/content/social-studies/socialStudiesContent.ts`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Content added by category:
- Kindergarten Picture/Word: added 20 concrete early-reader noun records: bed, bird, bus, cow, duck, egg, fan, goat, hand, house, milk, nest, pig, rain, sock, spoon, train, web, yard, zoo.
- Kindergarten Beginning Sound: added 8 clear letter/sound examples: E/egg, G/goat, I/igloo, J/jam, N/nest, O/owl, P/pig, R/rain.
- 2nd Grade Math Addition: added 21 non-focus-8 addition records with stable IDs and metadata for `operation`, `addendA`, `addendB`, and `sum`.
- Science term/definition: added 9 simple early-elementary records for plants, weather, and matter.
- Social Studies term/definition: added 9 simple early-elementary records for maps, community, civics, and culture.

Total eligible record counts:
- `k-uppercase-lowercase`: 26 eligible pairs.
- `k-picture-word`: 40 eligible pairs.
- `k-beginning-sound`: 20 eligible pairs, still guided/future-sensitive.
- `2nd-math-addition`: 40 eligible records.
- `2nd-math-addition-8s`: 13 `focusValue: 8` records.
- Science term-definition starter bank: 12 records.
- Social studies term-definition starter bank: 12 records.

Card-count support status:
- Existing 10, 12, 16, and 20-card options are supported for current standard categories.
- `k-beginning-sound` and `2nd-math-addition-8s` also have enough eligible pairs for 10, 12, 16, and 20-card preview/future modes.
- Science/social studies banks are not exposed in the standard Memory Match UI yet; no category config was added.

Content QA:
- All new records export through existing subject content arrays.
- `/lib/skills/content/index.ts` picks up new records through the existing `allSkillContent` export.
- Content check confirmed 150 total shared content records, no duplicate content IDs, and no duplicate math equations.

Memory Match smoke results:
- `/gaming/memory-match` loaded.
- Category selector still worked.
- Card-count selector still worked.
- Existing standard categories produced playable boards.
- 20-card board still worked.
- Randomization still produced varied board order across normal starts.
- Auto-complete still worked.
- Manual End Round still worked.
- Runtime preview still appeared.
- No `/api/skills`, Supabase, or `/rest/v1` calls were observed.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12J - Focused Memory Match post-expansion QA/status pass, or an explicitly approved new Memory Match category/config packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12J only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/lib/skills/content/literacy/literacyContent.ts`, `/lib/skills/content/math/mathContent.ts`, `/lib/skills/content/science/scienceContent.ts`, `/lib/skills/content/social-studies/socialStudiesContent.ts`, `/lib/skills/content/memory-match/memoryMatchCategories.ts`, `/lib/skills/content/memory-match/memoryMatchDeckPreview.ts`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, UI redesign, or SessionTracker mounting; perform only the explicitly approved Memory Match QA/status or category/config packet.

## Implementation Checkpoint 12J - Memory Match Final Content + Visual QA Status Pass

Status: Complete.

Scope guard:
- QA and documentation only.
- Memory Match only.
- No new content expansion, UI redesign, mobile redesign, runtime behavior change, category config change, API routes, Supabase writes, Supabase migrations, dashboards, route migration, Skills Hub redesign, assignment dashboard behavior, SessionTracker, audible sound playback, or lint warning reduction.

Files changed:
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Content QA results:
- Total shared content count: 150.
- Duplicate content IDs: none.
- Duplicate exact math equations: none.
- `k-uppercase-lowercase`: 26 eligible pairs.
- `k-picture-word`: 40 eligible pairs.
- `k-beginning-sound`: 20 eligible pairs, guided/future-sensitive.
- `2nd-math-addition`: 40 eligible records.
- `2nd-math-addition-8s`: 13 `focusValue: 8` records, standard-game preview/future-assignment oriented.
- Science term-definition starter bank: 12 records.
- Social studies term-definition starter bank: 12 records.
- Current standard categories `k-uppercase-lowercase`, `k-picture-word`, and `2nd-math-addition` all support 10, 12, 16, and 20-card boards.
- Science/social studies content is present for future category work but is not exposed as standard Memory Match UI.

Gameplay QA results:
- `/gaming/memory-match` loaded.
- Ready/setup panel appeared.
- Category selector worked.
- Card-count selector worked.
- 10-card board worked.
- 20-card board worked.
- Cards flipped.
- Matching worked.
- Manual End Round worked before completion.
- Auto-complete worked when all pairs were matched.
- Summary appeared for both completion paths.
- Development-only runtime preview appeared after completion.
- `[skills-runtime-preview]` logged once per completion.
- No `/api/skills`, Supabase, or `/rest/v1` calls were observed.

Visual/mobile QA results:
- Desktop ready state looked polished and had no horizontal overflow.
- Desktop 10-card and 20-card boards looked polished and usable.
- Mobile-ish ready state was usable.
- Mobile-ish 10-card and 20-card boards were usable.
- Cards remained large enough to tap: desktop cards were at least 188x151 in the smoke, and mobile-ish cards were 170x136.
- Text remained readable in the tested revealed cards.
- Background/card visuals remained child-friendly and not distracting.
- Screenshots were saved under `/qa-artifacts/memory-match-12j/`.

Runtime QA results:
- `previewOnly` remained true.
- `moduleId/gameKey` remained `memory_match`.
- `sessionId` existed.
- `roundId` existed.
- Metadata included selected category/deck metadata.
- Metadata included `completionType: manual_end` for manual End Round.
- Metadata included `completionType: auto_complete` for natural completion.
- Randomization remained unseeded for normal gameplay; four tested starts produced four unique board orders.
- Seed UI was not exposed.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Issues found:
- No blocking issues found.
- Existing lint warnings remain outside this checkpoint's scope.
- Science/social studies category exposure remains future work by design.
- Assignment mode remains future-only.

Recommended next implementation checkpoint:
- Implementation Checkpoint 13A - move to the next approved game packet, or create an explicitly scoped Memory Match future category/config packet.

Exact resume instruction:
Resume with Implementation Checkpoint 13A only if explicitly approved. Read `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/skills-game-content-data-strategy.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact unless route migration is explicitly scoped; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, UI redesign, or SessionTracker mounting unless explicitly approved in the next packet.

## Implementation Checkpoint 12K - Portable Skills Module Package

Status: Complete.

Scope guard:
- Structure and documentation only.
- No live code moves.
- No live import changes.
- No `/skills/memory-match` route.
- No `/gaming/memory-match` behavior change.
- No asset moves, runtime behavior change, content change, randomization change, UI change, API routes, Supabase writes, Supabase migrations, dashboards, assignment behavior, SessionTracker, or audible sound playback.

Folders created:
- `/skills/src/modules/skills`
- `/skills/src/modules/skills/app`
- `/skills/src/modules/skills/components`
- `/skills/src/modules/skills/components/games`
- `/skills/src/modules/skills/components/runtime`
- `/skills/src/modules/skills/lib`
- `/skills/src/modules/skills/lib/runtime`
- `/skills/src/modules/skills/lib/content`
- `/skills/src/modules/skills/assets`
- `/skills/src/modules/skills/docs`

Files created:
- `/skills/README.md`
- `/skills/src/modules/skills/app/.gitkeep`
- `/skills/src/modules/skills/components/games/.gitkeep`
- `/skills/src/modules/skills/components/runtime/.gitkeep`
- `/skills/src/modules/skills/lib/runtime/.gitkeep`
- `/skills/src/modules/skills/lib/content/.gitkeep`
- `/skills/src/modules/skills/assets/.gitkeep`
- `/skills/src/modules/skills/docs/.gitkeep`

Docs updated:
- `/docs/skills-games/integration/portable-skills-module-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

README summary:
- The `/skills` folder is a portable Skills module transfer package.
- The final main-project target is `src/modules/skills/*`.
- `/skills/src/modules/skills` maps to `main-project/src/modules/skills`.
- Next.js will not automatically route from `/skills/src/modules/skills/app`.
- Future main-project route wrappers should live under the root app router, such as `app/skills/memory-match/page.tsx`.
- Route wrappers should import module code from `src/modules/skills/components/games/memory-match`.
- Shared platform services such as auth, billing, entitlements, analytics, permissions, and feature flags should remain in `src/core/*`.
- Current stable Memory Match files remain in the working project structure for now.
- Future Reading, Math, and Code modules can follow the same `src/modules/[module]` pattern.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.

Memory Match route confirmation:
- `/gaming/memory-match` still loaded in a focused route check.
- No live imports changed, so the route continues to use the existing working files.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12L - copy stable Memory Match module files into the portable transfer package without changing live imports, if explicitly approved.
- Alternative: Implementation Checkpoint 13A - move to the next approved game packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12L or 13A only if explicitly approved. Read `/skills/README.md`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, UI redesign, content changes, runtime behavior changes, or SessionTracker mounting unless explicitly approved in the next packet.

## Implementation Checkpoint 12L - Copy Stable Memory Match Into Portable Skills Module Package

Status: Complete.

Scope guard:
- Copy/mirror checkpoint only.
- No live import changes.
- No `/skills/memory-match` route.
- No removal of old files.
- No content, runtime behavior, UI, randomization, API routes, Supabase writes,
  Supabase migrations, dashboards, assignment behavior, SessionTracker, or
  audible sound playback changes.

Source-to-portable mapping used:
- `/components/gaming/memory-match` -> `/skills/src/modules/skills/components/games/memory-match`
- `/components/skills/runtime` -> `/skills/src/modules/skills/components/runtime`
- `/lib/skills/runtime` -> `/skills/src/modules/skills/lib/runtime`
- `/lib/skills/content` -> `/skills/src/modules/skills/lib/content`
- `/assets/skills` -> `/skills/src/modules/skills/assets`
- `/docs/skills-games/integration` -> `/skills/src/modules/skills/docs/integration`

Files/folders copied:
- Stable Memory Match game component folder.
- Shared Skills runtime component folder.
- Shared Skills runtime library folder.
- Shared Skills content library folder.
- Skills asset folder.
- Skills integration docs folder.

Docs updated:
- `/skills/README.md`
- `/docs/skills-games/integration/portable-skills-module-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Live app status:
- Live imports were not changed.
- Live routes were not changed.
- `/gaming/memory-match` remains the active route and continues to use the
  existing working project files.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.
- Focused route check confirmed `/gaming/memory-match` loaded.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12M - portable package import-path
  review/migration-readiness audit without rewiring the live app, or
  Implementation Checkpoint 13A - move to the next approved game packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12M or 13A only if explicitly approved. Read `/skills/README.md`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming` routes intact; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, route migration, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, UI redesign, content changes, runtime behavior changes, live import rewiring, or SessionTracker mounting unless explicitly approved in the next packet.

## Implementation Checkpoint 12M - Wire /skills/memory-match Route From Portable Skills Package

Status: Complete.

Scope guard:
- Memory Match route wrapper only.
- Preserve `/gaming/memory-match` as a temporary compatibility route.
- No old route removal or redirect.
- No game behavior, content, randomization, UI, runtime behavior, API routes,
  Supabase writes, Supabase migrations, dashboards, assignment behavior,
  SessionTracker, or audible sound playback changes.

Files changed:
- `/app/skills/memory-match/page.tsx`
- `/lib/skills/runtime/skillsGameRegistry.ts`
- `/skills/src/modules/skills/lib/runtime/skillsGameRegistry.ts`
- `/skills/README.md`
- `/docs/skills-games/integration/portable-skills-module-strategy.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Route behavior:
- `/skills/memory-match` now loads Memory Match through a thin root app wrapper
  that imports from `/skills/src/modules/skills/components/games/memory-match`.
- `/gaming/memory-match` remains in place as a compatibility route and was not
  redirected.

Registry/navigation metadata:
- Memory Match canonical registry `route` now points to `/skills/memory-match`.
- Memory Match `componentFolder` now points to the portable package copy.
- `/gaming/memory-match` was preserved as an alias/backward compatibility note.
- Other game registry entries were not changed.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.
- Focused route checks confirmed `/skills/memory-match` and
  `/gaming/memory-match` loaded.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12N - portable package import-path
  review/migration-readiness audit without removing `/gaming/memory-match`, or
  Implementation Checkpoint 13A - move to the next approved game packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12N or 13A only if explicitly approved. Read `/skills/README.md`, `/app/skills/memory-match/page.tsx`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming/memory-match` unless compatibility removal is explicitly scoped; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, UI redesign, content changes, runtime behavior changes, or SessionTracker mounting unless explicitly approved in the next packet.

## Implementation Checkpoint 12M.1 - Memory Match Post-Route Product Polish Fix

Status: Complete.

Scope guard:
- Memory Match product polish only.
- Preserve `/skills/memory-match` and `/gaming/memory-match`.
- Preserve portable package structure.
- No API routes, Supabase writes, Supabase migrations, dashboards, assignment
  behavior, SessionTracker, audible sound playback, content count reduction,
  randomization change, auto-complete change, or runtime preview behavior
  change.

Files changed:
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/components/gaming/memory-match/types.ts`
- `/skills/src/modules/skills/components/games/memory-match/MemoryMatchGame.tsx`
- `/skills/src/modules/skills/components/games/memory-match/types.ts`
- `/lib/skills/content/memory-match/memoryMatchCategories.ts`
- `/skills/src/modules/skills/lib/content/memory-match/memoryMatchCategories.ts`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Category selector changes:
- Existing safe local configs now appear in the Memory Match selector.
- Exposed categories include Kindergarten uppercase/lowercase, Kindergarten
  picture/word, Kindergarten beginning sound, 2nd grade math addition, 2nd
  grade math addition focus 8s, 2nd grade science terms, and 2nd grade social
  studies terms.
- Science and social studies categories were added conservatively as
  low-ambiguity term/definition `standard_game_preview` configs with enough
  2nd-grade records for current card counts.

Picture/word rendering changes:
- Picture prompt cards keep their content metadata and alt text, but the card
  face no longer renders strings such as `door picture`.
- Known picture words render as child-friendly pictogram clue tiles.
- Unknown image prompts fall back to a generic picture clue tile instead of
  exposing placeholder text as the main card face.

Hint behavior changes:
- Hint Reveal is now Hint Peek.
- Hint Peek temporarily reveals unmatched cards, then returns unmatched cards
  face-down.
- Matched cards remain matched.
- Card clicking is disabled only while the peek is active.
- Gameplay continues after the peek window.

Motion and sound:
- Motion remains enabled by default through the existing reduced-motion false
  runtime default.
- The Reduce Motion toggle still minimizes transitions when enabled.
- Audible sound playback remains deferred; existing mute/unmute state behavior
  is unchanged.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.
- Focused smoke checks confirmed `/skills/memory-match` and
  `/gaming/memory-match` load, start rounds, show the expanded category set,
  render picture clue cards without visible `picture` placeholder text, support
  temporary Hint Peek, complete rounds, show runtime preview, log
  `[skills-runtime-preview]`, and make no `/api/skills`, Supabase, or
  `/rest/v1` calls.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12N - portable package import-path
  review/migration-readiness audit, or Implementation Checkpoint 13A - move to
  the next approved game packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12N or 13A only if explicitly approved. Read `/skills/README.md`, `/app/skills/memory-match/page.tsx`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, `/skills/src/modules/skills/components/games/memory-match/MemoryMatchGame.tsx`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming/memory-match` unless compatibility removal is explicitly scoped; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, content count changes, runtime behavior changes, or SessionTracker mounting unless explicitly approved in the next packet.

## Implementation Checkpoint 12M.2 - Memory Match Full Grade Category Coverage + Final UI Cleanup + Admin Content Guide

Status: Complete.

Scope guard:
- Memory Match only.
- Preserve `/skills/memory-match` and `/gaming/memory-match`.
- Preserve portable package structure, runtime preview behavior,
  auto-complete, manual End Round, Hint Peek, and unseeded randomization.
- No API routes, Supabase writes, Supabase migrations, dashboards, assignment
  behavior, SessionTracker, audible sound playback, lint-warning cleanup, or
  backend content loading.

Files changed:
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/components/gaming/memory-match/types.ts`
- `/lib/skills/content/literacy/literacyContent.ts`
- `/lib/skills/content/science/scienceContent.ts`
- `/lib/skills/content/social-studies/socialStudiesContent.ts`
- `/lib/skills/content/memory-match/memoryMatchCategories.ts`
- mirrored portable copies under `/skills/src/modules/skills`
- `/skills/src/modules/skills/docs/memory-match-admin-content-guide.md`
- `/skills/README.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Categories added or exposed by grade:
- K: existing uppercase/lowercase, picture/word, and beginning sound categories.
- 1st: `1st-literacy-vocabulary`.
- 2nd: existing math addition, math addition 8s, science terms, and social
  studies terms categories.
- 3rd: `3rd-science-terms`.
- 4th: `4th-social-studies-terms`.
- 5th: `5th-science-terms`.

Content records added:
- 10 first-grade literacy vocabulary/definition records.
- 9 additional third-grade science term/definition records, bringing the
  third-grade science category to 10 eligible pairs with the existing `force`
  record.
- 10 fourth-grade social studies term/definition records.
- 10 fifth-grade science term/definition records.

Card-count support:
- Every exposed category has at least 10 eligible pairs and supports 10, 12,
  16, and 20-card boards.

UI cleanup:
- Kindergarten picture/word picture cards no longer show visible `Picture clue`
  text.
- Picture cards do not show `word picture` text as the main card face.
- Picture cards render pictogram-only visual clues with accessible labels.
- Card value backgrounds were softened from strong white pills to a lighter,
  less obtrusive treatment while preserving readability.

Back to Gaming:
- `Back to Gaming` / `Return to Gaming` remains pointed at `/gaming` because no
  full `/skills` landing page exists yet.
- This is temporary compatibility behavior.

Sound:
- Sound state/toggles remain present.
- Audible sound playback remains future-only.
- Future audio should use real provided files under a clear Skills asset audio
  folder and respect mute, reduced-motion, and Healthy Play preferences.

Admin guide:
- Created `/skills/src/modules/skills/docs/memory-match-admin-content-guide.md`.
- The guide explains where content and categories live, how to add content
  items, how to add or update categories, quality rules, testing checks, and
  future sound guidance.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.
- Focused smoke checks confirmed `/skills/memory-match` and
  `/gaming/memory-match` load, all exposed categories can start 10-card boards,
  all grade buttons map to a playable category path, picture cards do not show
  visible placeholder text, Hint Peek still recovers, motion/sound toggles
  change state, manual end and auto-complete show summary/runtime preview,
  `[skills-runtime-preview]` logs, and no `/api/skills`, Supabase, or
  `/rest/v1` calls occur.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12N - portable package import-path
  review/migration-readiness audit, or Implementation Checkpoint 13A - move to
  the next approved game packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12N or 13A only if explicitly approved. Read `/skills/README.md`, `/skills/src/modules/skills/docs/memory-match-admin-content-guide.md`, `/app/skills/memory-match/page.tsx`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, `/skills/src/modules/skills/components/games/memory-match/MemoryMatchGame.tsx`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming/memory-match` unless compatibility removal is explicitly scoped; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, audible sound playback, assignment behavior, randomization changes, runtime behavior changes, or SessionTracker mounting unless explicitly approved in the next packet.

## Implementation Checkpoint 12M.3 - Memory Match Background Music + Hide Future Assignment Category

Status: Complete.

Scope guard:
- Memory Match only.
- Background music wiring only; no click/correct/incorrect/complete event sound
  effects.
- Hide Addition 8s from the normal player-facing selector only.
- Preserve `/skills/memory-match`, `/gaming/memory-match`, portable package
  structure, runtime preview, auto-complete, manual End Round, Hint Peek, and
  unseeded randomization.
- No API routes, Supabase writes, Supabase migrations, dashboards, assignment
  behavior, SessionTracker, or lint-warning cleanup.

Files changed:
- `/components/gaming/memory-match/MemoryMatchGame.tsx`
- `/skills/src/modules/skills/components/games/memory-match/MemoryMatchGame.tsx`
- `/lib/skills/content/memory-match/memoryMatchCategories.ts`
- `/skills/src/modules/skills/lib/content/memory-match/memoryMatchCategories.ts`
- `/types/audio-assets.d.ts`
- `/skills/README.md`
- `/skills/src/modules/skills/docs/memory-match-admin-content-guide.md`
- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/docs/skills-games/integration/skills-games-integration-plan-notes.md`

Audio asset:
- `/skills/src/modules/skills/assets/audio/Piano-chill.mp3`

Background music behavior:
- Music does not autoplay on page load.
- Music starts after Start when sound is enabled.
- Music loops during active gameplay at gentle volume.
- Music pauses on Pause.
- Music resumes on Resume when sound is enabled.
- Music pauses when muted.
- Music can resume during a round after Unmute.
- Music stops/resets when the round ends.
- Music stops/resets on component unmount.

Addition 8s visibility:
- `2nd-math-addition-8s` remains in category config and content.
- Its `mode` is now `assignment_future`.
- Normal player-facing category filtering excludes it.
- Focus-8 content records and `focusValue: 8` metadata are preserved for future
  assignment functionality.

Visible player-facing categories by grade:
- K: Uppercase/Lowercase, Picture/Word, Beginning Sound.
- 1st: Literacy Vocabulary.
- 2nd: Math Addition, Science Terms, Social Studies Terms.
- 3rd: Science Terms.
- 4th: Social Studies Terms.
- 5th: Science Terms.

Validation:
- `cmd /c npm run lint` passed non-interactively with existing warnings.
- `cmd /c npm run build` passed.
- `cmd /c npx tsc --noEmit --pretty false` passed.
- Focused smoke checks confirmed `/skills/memory-match` and
  `/gaming/memory-match` load, do not autoplay music, start/loop
  `Piano-chill.mp3` after Start when sound is enabled, pause/resume music with
  Mute/Unmute and Pause/Resume, stop music on End Round, hide Addition 8s from
  the normal selector, keep K-5 visible category paths, preserve picture
  cards/Hint Peek/manual end/auto-complete/runtime preview, log
  `[skills-runtime-preview]`, and make no `/api/skills`, Supabase, or
  `/rest/v1` calls.

Recommended next implementation checkpoint:
- Implementation Checkpoint 12N - portable package import-path
  review/migration-readiness audit, or Implementation Checkpoint 13A - move to
  the next approved game packet.

Exact resume instruction:
Resume with Implementation Checkpoint 12N or 13A only if explicitly approved. Read `/skills/README.md`, `/skills/src/modules/skills/docs/memory-match-admin-content-guide.md`, `/app/skills/memory-match/page.tsx`, `/components/gaming/memory-match/MemoryMatchGame.tsx`, `/skills/src/modules/skills/components/games/memory-match/MemoryMatchGame.tsx`, `/docs/skills-games/integration/portable-skills-module-strategy.md`, `/docs/skills-games/integration/runtime-pilot-index.md`, `/docs/skills-games/integration/game-build-packet-template.md`, `/lib/skills/runtime/README.md`, and this notes file; preserve all current boundaries; keep `/gaming/memory-match` unless compatibility removal is explicitly scoped; do not create API routes, Supabase migrations, dashboards, production writes, billing gates, landing page changes, Skills Hub visual redesign, Shape Shifter runtime, parent/teacher views, assignment behavior, randomization changes, runtime behavior changes, or SessionTracker mounting unless explicitly approved in the next packet.

# Skills Runtime Preview

This folder contains the local-only foundation for Skills game identity and
future payload previews.

Current scope:
- canonical Skills game registry and alias mapping
- normalized `SkillRoundResult` type
- local preview builders for future XP and progress payload shapes
- transparent runtime shell for stable local session and round identity
- local progress preservation callback hook for future Healthy Play navigation
- shell-level Healthy Play provider attachment
- local accessibility preference surface for reduced motion, sound, quiet sound,
  high contrast, and larger text
- no API routes
- no Supabase writes
- no dashboard integration
- no `/gaming` route migration

The preview payloads are marked with `previewOnly: true`. They are intended for
developer validation during gameplay and must not be treated as production
contract writes.

Current pilots:
- Word Builder Farm is wrapped in `SkillsGameRuntimeShell`.
- Memory Match is wrapped in `SkillsGameRuntimeShell`.
- Galaxy Click Command is wrapped in `SkillsGameRuntimeShell`.
- Math Key Quest is wrapped in `SkillsGameRuntimeShell`.
- Code Keys Workshop is wrapped in `SkillsGameRuntimeShell`.
- Target Tracker Adventure is wrapped in `SkillsGameRuntimeShell`.
- Bug Trail Maze is wrapped in `SkillsGameRuntimeShell`.
- All current pilots emit a local preview at round end.
- The pilots render `SkillsRuntimeDebugPanel` only behind
  `process.env.NODE_ENV !== 'production'`.
- The shell owns preview-only `sessionId`, `roundId`, `roundAttempt`, active
  duration, pause/resume duration exclusion, and preservation callback state.
- The shell mounts Healthy Play locally and exposes accessibility/sound
  preferences to games without submitting data to a backend.
- Direct `SessionTracker` mounting is deferred until its effect dependencies are
  stabilized; the shell currently tracks round lifecycle through local runtime
  callbacks.

## Runtime Surface

`useSkillsGameRuntime()` currently provides:

- `registryEntry`, `moduleId`, `sessionId`, `roundId`, and `roundAttempt`
- `beginRound()`, `pauseRound()`, `resumeRound()`, and `endRound()`
- `getRoundDurationMs()` with paused time excluded
- `soundPreference`, `soundEnabled`, and `quietSound`
- `reducedMotion`, `highContrast`, and `largerText`
- `healthyPlayStatus` labels and XP efficiency preview values
- `createPreviewMetadata(extraMetadata)` for shared local-only metadata
- `createRoundResult(input)` for normalized `SkillRoundResult`
- `createPayloadPreview(roundResult)` for local XP/progress preview payloads
- `preserveProgress(reason, handler)` for local preservation hooks

## How To Integrate The Next Game

Use this checklist for the next local-only pilot:

1. Confirm the game exists in `skillsGameRegistry.ts` with the canonical
   `moduleId/gameKey`, route, component folder, asset folder, and aliases.
2. Wrap only the game component with `SkillsGameRuntimeShell`.
3. Move the game body into an inner component that calls `useSkillsGameRuntime()`.
4. On round start, call `runtime.beginRound()` and clear any prior local preview.
5. On pause and resume, call `runtime.pauseRound()` and `runtime.resumeRound()`
   alongside the game's existing pause state.
6. Use `runtime.soundEnabled` and `runtime.reducedMotion` for existing toggle
   state, without adding new sound playback.
7. At round end, call `runtime.endRound()`.
8. Build a `SkillRoundResult` with the game's existing score, accuracy,
   attempts, difficulty, streak/combo, mistake count, grade, and XP values.
9. Put game-specific metadata into `runtime.createPreviewMetadata(...)`; the
   helper adds shared local fields such as sound preference, reduced motion,
   Healthy Play preview data, and `localOnlyPreview: true`.
10. Generate the preview with `runtime.createPayloadPreview(roundResult)`.
11. Preserve the console log by passing the preview through
   `logSkillPayloadPreview(preview)`.
12. Store the preview in local component state only.
13. Render `SkillsRuntimeDebugPanel` only when
   `process.env.NODE_ENV !== 'production'`, the round has ended, and a preview
   exists.
14. Do not create API routes, Supabase writes, dashboards, route migrations,
   production XP awards, or production debug UI during local pilots.

## Production Safety Checks

- Local preview payloads must include `previewOnly: true`.
- Debug panels must be guarded with `process.env.NODE_ENV !== 'production'`.
- No runtime helper should call `fetch`, Supabase clients, `/api/skills`,
  `/rest/v1`, or production XP/progress writers.
- `SessionTracker` remains deferred until the Healthy Play update loop can be
  fixed safely.

## Seven Pilot QA Status

Latest QA pass: Implementation Checkpoint 11F.

Verified local runtime pilots:

- `/gaming/word-builder-farm`
- `/gaming/memory-match`
- `/gaming/galaxy-click-command`
- `/gaming/math-key-quest`
- `/gaming/code-keys-workshop`
- `/gaming/target-tracker`
- `/gaming/bug-trail-maze`

All seven pilots passed the focused local QA checks:

- route loads
- start, pause, resume, and end round work
- sound preference toggle changes state
- reduced motion toggle changes state
- normal round summary appears after round end
- debug panel is hidden before round end
- `Development-only Skills Runtime Preview` appears after round end
- `roundResult`, `xpEvent`, `progress`, and `registryEntry` expand
- payloads include `previewOnly: true`
- canonical `moduleId/gameKey` values are present
- `sessionId` and `roundId` exist
- metadata includes `soundPreference` and `reducedMotion`
- gameplay metadata remains aggregate-only
- no raw keystroke logs, raw pointer trails, raw click streams, raw
  coordinates, or raw frame-by-frame movement arrays are stored in runtime
  previews
- `[skills-runtime-preview]` logs once per completed pilot round
- no `/api/skills`, Supabase, or `/rest/v1` requests were observed
- debug panels remain guarded by `process.env.NODE_ENV !== 'production'`

Known non-blockers:

- Audible sound playback is not expected yet. Current acceptance is limited to
  sound preference plumbing, toggle state, and metadata capture.
- Galaxy Click Command targets do not currently move in the initial build, so
  Slower Mode can toggle without an obvious movement change. Larger Targets does
  visibly increase target size and can return to normal. This is an existing
  gameplay limitation, not a runtime integration regression.
- `tsc --noEmit` and `npm run build` are unblocked as of Implementation
  Checkpoint 9C.
- `npm run lint` is non-interactive as of Implementation Checkpoint 10B and
  currently passes with existing warnings.

Math Key Quest now follows the same local-only runtime pattern as the first
three pilots:

- route remains `/gaming/math-key-quest`
- canonical `moduleId/gameKey` is `math_key_quest`
- runtime shell provides local `sessionId`, `roundId`, round attempt, and active
  duration
- pause/resume timing is connected to the existing controls
- sound and reduced-motion toggles use shell-level preferences
- round end emits a local-only preview with aggregate math/game metadata
- `SkillsRuntimeDebugPanel` renders only in development after round end
- no API route, Supabase write, dashboard, route migration, content expansion,
  or visual redesign was added

Code Keys Workshop follows the same local-only runtime pattern:

- route remains `/gaming/code-keys-workshop`
- canonical `moduleId/gameKey` is `code_keys_workshop`
- runtime shell provides local `sessionId`, `roundId`, round attempt, and active
  duration
- pause/resume timing is connected to the existing controls
- sound and reduced-motion toggles use shell-level preferences
- round end emits a local-only preview with aggregate coding/keyboard metadata
- `SkillsRuntimeDebugPanel` renders only in development after round end
- no API route, Supabase write, dashboard, route migration, content expansion,
  or visual redesign was added

Target Tracker Adventure follows the same local-only runtime pattern:

- route remains `/gaming/target-tracker`
- canonical `moduleId/gameKey` is `target_tracker_adventure`
- registry aliases preserve `target_tracker`, `target-tracker`, and
  `target-tracker-adventure`
- runtime shell provides local `sessionId`, `roundId`, round attempt, and active
  duration
- pause/resume timing is connected to the existing controls
- sound and reduced-motion toggles use shell-level preferences
- round end emits a local-only preview with aggregate tracking/click metadata
- `SkillsRuntimeDebugPanel` renders only in development after round end
- no API route, Supabase write, dashboard, route migration, content expansion,
  or visual redesign was added

Bug Trail Maze follows the same local-only runtime pattern:

- route remains `/gaming/bug-trail-maze`
- canonical `moduleId/gameKey` is `bug_trail_maze`
- runtime shell provides local `sessionId`, `roundId`, round attempt, and active
  duration
- pause/resume timing is connected to the existing controls
- sound and reduced-motion toggles use shell-level preferences
- round end emits a local-only preview with aggregate path/item metadata
- `SkillsRuntimeDebugPanel` renders only in development after round end
- no API route, Supabase write, dashboard, route migration, content expansion,
  or visual redesign was added

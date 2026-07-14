# Key Current — Migration Readiness

How to move this module from the standalone workspace into the main Sage
Quest Kids project, per `portable-skills-module-strategy.md`.

## What transfers as-is

Copy these into `main-project/src/modules/skills/…` at the same relative
paths:

- `components/games/key-current/` (entire folder, incl. CSS module + README)
- `assets/key-current/` (sprite sheets — still reference-only)
- `docs/games/key-current/` (all five docs)
- Registry additions: `key_current` in `lib/runtime/skillsRuntimeTypes.ts`
  (`SkillGameKey` union) and the entry in `lib/runtime/skillsGameRegistry.ts`
  (route `/skills/key-current`)

The game imports only:

- React
- shared module code via relative paths (`../../keyboard/keymap`,
  `../../runtime/*`, `../../../lib/adapters/*`, `../../../lib/runtime/*`)
- `../../../audio/Piano-chill.mp3` (requires the shared audio folder and an
  `*.mp3` module declaration + bundler asset rule)
- (1B) the two far-background plates from
  `assets/key-current/design-targets/` as static PNG imports — the host needs
  Next's standard static image imports (default in Next ≥12; no config).
  These are ~2 MB each; consider an image-optimization pass at integration.
- (1C) the eight Higgsfield-generated runtime assets in
  `assets/key-current/generated/` (gate, causeway texture, six runner
  renders — static imports rendered via `next/image`). ~0.7–1.5 MB each;
  same optimization note applies. The gate letter is overlaid in code, so
  words/localization need no new art.
- (1C.1) playfield perspective is governed by
  `components/games/key-current/keyCurrentLaneGeometry.ts` (horizon /
  vanishing point / gate band / pillar overhang). The `.obstacle` rules in
  `keyCurrent.module.css` mirror its formulas — keep both in sync if the
  composition is ever retuned in the main project.

No `/gaming` assumptions, no hardcoded host URLs, no API calls.

## 1F transfer-readiness note

Checkpoint 1F adds Track C Outer Reach, but the game is **still not ready for
main-project transfer**. Track D Short Words, final QA/docs/optimization, and
the transfer-readiness closure audit remain pending.

1F behavior that should transfer later:

- Track A Home Base, Track B Center Reach, and Track C Outer Reach are
  data-driven in `keyCurrentTracks.ts`.
- Track C unlocks only after Track B is complete; Track D remains
  locked/coming later in this checkpoint.
- Track C has 12 stages covering top and bottom outer reaches plus left,
  right, and mixed outer reach reviews.
- Track C remains Guided Practice followed by Proficiency Check, with the
  same supportive three-practice-bump restart behavior used by Track B.
- Generated sequences continue to pass through the bounded kid-safe local
  guard; no raw key streams or sequence telemetry are added.
- The HUD now displays the actual current track name and track-local stage
  number. Large current-stage key sets wrap as compact chips in the landing
  settings panel.
- Primary yellow actions receive focus for Enter-key activation outside active
  gameplay states. Active letter input handling is unchanged.
- The accepted keyboard row offsets are preserved and `KEYBOARD_ROWS` order
  remains unchanged.

Still no Track D implementation, Supabase writes, migrations, `/api/skills`,
raw telemetry, assignment logic, dashboards, voice MP3 generation, browser
speech synthesis, Higgsfield usage, generated art changes, playfield redesign,
or transfer work.

## 1E.1 transfer-readiness note

Checkpoint 1E.1 is a cleanup checkpoint on top of the completed 1E Track B
build. The game is **still not ready for main-project transfer**. Track C,
Track D, final QA/docs/optimization, and the closure audit remain pending.

1E.1 behavior that should transfer later:

- Track B Center Reach now has 13 stages: ten two-key anchor/reach stages,
  left and right center reach reviews, and a mixed center reach review.
- Track B remains Guided Practice followed by Proficiency Check, with the
  existing three-practice-bump restart behavior preserved.
- Generated sequences run through a bounded kid-safe local guard that checks
  contiguous generated letters, retries/repairs, and falls back
  deterministically without raw telemetry.
- Landing expanded stage rows are compact one-line rows. The duplicate
  secondary start button is hidden when it would do the same thing as
  `Continue Adventure`.
- Old local preview Track B completed IDs that no longer match the 13-stage
  shape are filtered on load. Track A completion and settings are preserved.
- The bottom keyboard row alignment is a helper layout/CSS adjustment only;
  `KEYBOARD_ROWS` ordering and input behavior are unchanged.

Still no Track C/D implementation, Supabase writes, migrations, `/api/skills`,
raw telemetry, assignment logic, dashboards, voice MP3 generation, browser
speech synthesis, Higgsfield usage, generated art changes, or playfield
redesign.

## 1E transfer-readiness note

Checkpoint 1E adds Track B Center Reach and a scalable landing/progress
dashboard, but the game is **still not ready for main-project transfer**. The
V1 roadmap still requires Track C Outer Reach, Track D Short Words, and final
QA/docs/optimization/transfer-readiness closure.

1E behavior that should transfer later:

- Track A Home Base and Track B Center Reach are data-driven in
  `keyCurrentTracks.ts`.
- Track B unlocks only after Track A is complete.
- Track C and Track D remain visible as locked/coming later; no stages are
  implemented for them yet.
- The landing page uses compact Track A-D progress rows with one expanded
  track detail area, not a giant always-visible stage grid.
- Track B stages use Guided Practice followed by Proficiency Check.
- Track B uses a supportive three-practice-bump restart state. Track A remains
  guided/no-hard-fail.
- Runtime metadata remains aggregate-only and preview-only, adding
  `failureMode` and `restartReason` for three-bump restarts.
- Mobile keyboard helper sizing was tightened for large Track A/B active-key
  groups while keeping true approximate key placement.
- Future/upcoming gates remain hidden for V1, preserving the accepted 1C.1
  playfield composition.

Still no Supabase writes, migrations, `/api/skills`, raw telemetry, assignment
logic, dashboard coupling, voice MP3 generation, browser speech synthesis, or
new generated art.

## 1D transfer-readiness note

Checkpoint 1D makes Track A Home Base playable end to end in this portable
workspace, but the game is **not ready for main-project transfer yet**. The V1
roadmap still requires Track B Center Reach, Track C Outer Reach, Track D
Short Words, and a final closure audit before integration.

1D behavior that should transfer later:

- Track A stages 1-7 are data-driven in `keyCurrentTracks.ts`.
- Every stage has Guided Practice followed by a Proficiency Check.
- Completing a Proficiency Check completes the stage, unlocks the next stage,
  and keeps replay available.
- Completing Stage 7 marks Track A complete.
- Runtime metadata remains aggregate-only and preview-only, including stage,
  track, run type, selected character, difficulty, input mode, counts,
  practice bumps, accuracy, proficiency status, XP proposal, and track
  completion status.
- Future/upcoming gates remain hidden for V1, preserving the accepted 1C.1
  playfield composition.

Still no Supabase writes, migrations, `/api/skills`, raw telemetry, assignment
logic, dashboard coupling, voice MP3 generation, or browser speech synthesis.

## Route

Create the thin wrapper in the main app router:

```tsx
// main-project/src/app/skills/key-current/page.tsx
import { KeyCurrentGame } from '@/modules/skills/components/games/key-current/KeyCurrentGame';
export default function KeyCurrentPage() {
  return <KeyCurrentGame />;
}
```

No gameplay logic lives in the route file.

## Workspace-only pieces to REPLACE at migration time

These exist in this repo only so the module can run standalone:

| Workspace file | Replace with |
| --- | --- |
| `src/lib/gaming/progress.ts` (localStorage stub) | main project's real `@/lib/gaming/progress` |
| `src/lib/gaming/soundEffects.ts` (WebAudio stub) | main project's real `@/lib/gaming/soundEffects` |
| `tsconfig.json` path alias `@/components/healthy-play/*` → `src/modules/skills/components/healthy-play/*` | main project's own healthy-play location/alias |
| Root app scaffold (`src/app/layout.tsx`, `page.tsx`, configs) | not migrated |

The `soundAdapter` / `progressAdapter` files under
`src/modules/skills/lib/adapters/` migrate unchanged — only their `@/lib/…`
targets change meaning in the new host.

## Build requirements in the host

- Tailwind CSS scanning `src/modules/skills/**` (the module uses Tailwind
  utilities + one CSS module)
- Webpack/Turbopack rule for `.mp3` (`type: 'asset/resource'`) and the
  `declare module '*.mp3'` d.ts (already at `src/modules/skills/types/`)
- App Router with client components (game is `'use client'`)

## Integration switch-over checklist

1. Copy folders; add registry entries; add route wrapper.
2. Verify `@/lib/gaming/*` resolves to real services; remove stubs.
3. Keep `previewOnly: true` until the backend checkpoint is scoped, then
   route round results to `/api/skills/xp-events` + `/api/skills/progress`
   per `key-current-progress-data-contract.md` (idempotency key already
   provided by the runtime preview payload).
4. Wire play limits: the game already runs inside `HealthyPlayProvider` via
   `SkillsGameRuntimeShell`; confirm platform limit prompts appear and the
   run-end preserve hook fires (`preserveProgress('healthy_play')`).
5. Replace the CSS character with extracted mascot frames when the art
   arrives (see `key-current-asset-map.md` extraction request).

## Skills page card (main project)

This workspace has a minimal registry-driven `/skills` index
(`src/app/skills/page.tsx`) that exists only for local navigation — do not
migrate it. In the main project, add a Key Current card to the existing
Skills page/game list using the registry entry:

```
title: Key Current        route: /skills/key-current
category: keyboard        blurb: "Ride the Skills Sea current and open
                                  letter gates by finding the right keys."
```

## Known workspace divergences to watch

- Audio lives at `src/modules/skills/audio/` here (the build brief said
  `assets/audio`); keep whichever convention the main project uses and update
  the single import in `keyCurrentAssets.ts`.
- `SkillsGameRuntimeShell` imports healthy-play through the `@/components/…`
  alias; the main project must provide that alias or the shell import should
  be updated there.

# Key Current — Build Plan

## Checkpoint 1F - Track C Outer Reach Expansion

Goal: add Track C Outer Reach while preserving completed Track A and Track B,
the accepted 1C/1C.1 playfield, the scalable landing dashboard, and the 1E.1
Track B instructional cleanup.

Delivered:

- **Track C stages 1-12 are available after Track B completion:** A/Q, S/W,
  D/E, J/I, K/O, L/P, A/Z, S/X, D/C, Left Outer Reach Review, Right Outer
  Reach Review, and Mixed Outer Reach Review.
- **Track C run structure:** every Track C stage uses Guided Practice followed
  by a Proficiency Check. Pair stages use 8/12 gates, the left review uses
  14/18, the right review uses 12/16, and the mixed review stays capped at
  18/24.
- **Track C restart behavior:** Track C uses the same supportive
  three-practice-bump restart model as Track B: Try Again, Make It Easier,
  and Back to Track Map. Track A remains guided/no-hard-fail.
- **Unlock/progression:** Track C unlocks after Track B completion, completing
  each Track C stage unlocks the next, and completing Stage 12 marks Track C
  complete. Track D remains locked/coming later.
- **Pre-flight UI/accessibility fixes:** the HUD now uses the actual current
  track name with track-local stage numbers; large current-stage key badge
  sets wrap into compact chips inside the settings panel; primary yellow
  actions receive focus so Enter works on landing, Guided Practice completion,
  stage completion, and supportive retry overlays.
- **Keyboard preservation:** the accepted keyboard helper row offsets are
  preserved, `KEYBOARD_ROWS` order is unchanged, and input mechanics remain
  unchanged.
- **Safety/runtime preservation:** the kid-safe contiguous sequence guard
  applies to Track C generated sequences. Runtime remains `previewOnly: true`
  with aggregate-only metadata and no raw key streams.
- **Visual/backend preservation:** no Higgsfield, no generated art changes, no
  playfield redesign, no future-gate re-enable, no Supabase, no migrations,
  no `/api/skills`, no dashboards, no assignment behavior, and no transfer
  work was performed.

Transfer readiness remains pending until Track D and the final V1 closure
audit are complete.

## Checkpoint 1E.1 - Track B instructional polish + landing microfixes

Goal: polish the Track B build before Track C so the Center Reach pattern
teaches anchor-to-reach muscle memory more clearly.

Delivered:

- **Landing compact stage rows:** expanded track details now use one compact
  line per stage, such as `Stage 1 - F J - Current`, with local best accuracy
  shown only as a small compact chip when useful.
- **CTA cleanup:** `Continue Adventure` remains the primary action. The
  secondary start button is hidden when it would launch the same current
  unfinished stage, remains `Replay Selected Stage` for completed selections,
  and becomes `Start Selected Stage` only for a different unlocked selection.
- **Kid-safe sequence guard:** Guided Practice, Proficiency Check, and future
  generated review sequences pass through a bounded local guard that checks
  contiguous generated letters, retries/repairs safely, and cannot hang.
- **Track B revised to 13 stages:** F/G, J/H, F/R, J/U, F/T, J/Y, F/V, J/N,
  F/B, J/M, Left Center Reach Review, Right Center Reach Review, and Mixed
  Center Reach Review.
- **Anchor/reach practice shape:** Track B pair stages keep two-key
  anchor/reach practice for now, with predictable Guided Practice rhythms and
  balanced randomized Proficiency Checks. Three-key reach groups are deferred
  for playtesting after the two-key pattern feels solid.
- **Local preview progress compatibility:** old Track B preview-only completed
  IDs that no longer match the 13-stage shape are filtered on load. Track A
  completion, XP, best accuracy, and settings are preserved.
- **Keyboard helper alignment:** the bottom keyboard row is shifted slightly
  left through helper layout classes only. `KEYBOARD_ROWS` order and input
  mechanics are unchanged.
- **Preservation:** Track C and Track D were not implemented. No Higgsfield,
  new art, generated asset changes, playfield redesign, Supabase, backend API,
  dashboard, assignment, or transfer work was performed.

Transfer readiness remains pending until Tracks A-D and the final V1 closure
audit are complete.

## Checkpoint 1E - Track B Center Reach + scalable landing

Goal: add Track B Center Reach and replace the Track A-only landing stage grid
with a compact progress dashboard that scales to Tracks A-D.

Delivered:

- **Track B stages 1-9 are available after Track A completion:** F/G, J/H,
  R/U, T/Y, V/N, B/M, Left Center Reach, Right Center Reach, and Mixed Center
  Reach Review.
- **Track B run structure:** every Track B stage uses Guided Practice followed
  by a Proficiency Check. Pair stages stay at 8/12 gates, six-key zones use
  14/18, and the 12-key review uses 16/24.
- **Three-practice-bump restart:** Track B uses `failureMode:
  'three_collision'`. Three practice bumps pause the current run with
  supportive retry copy, Try Again, Make It Easier, and Back to Track Map.
  Track A remains guided/no-hard-fail.
- **Scalable landing:** the landing screen now prioritizes explorer selection,
  speed/settings, and a `Continue Adventure` button. A compact track progress
  dashboard shows Track A-D rows, one expanded track, progress bars, compact
  stage rows, local best accuracy, locked/current/complete states, and Track
  C/D as coming later.
- **Progression helpers:** track/stage lookup, first incomplete stage, first
  playable stage across tracks, stage unlocks, track completion, and available
  tracks are now generic rather than Track A-only.
- **Polish fixes:** restored lightning speed icons and Music/Sounds/Guide
  icons, removed the stray landing character shadow by making runner shadows
  opt-in, and reduced mobile keyboard helper sizing/gaps so large active key
  groups fit at narrow widths.
- **Runtime preview payload:** aggregate metadata includes `failureMode` and,
  for Track B restarts, `restartReason`, while preserving `previewOnly: true`
  and avoiding raw key streams or pointer/frame telemetry.
- **Visual/backend preservation:** no Higgsfield, no generated art changes, no
  playfield redesign, no future-gate re-enable, no Supabase, no migrations,
  no `/api/skills`, no dashboards, and no assignment behavior.

Remaining future scope: Track C Outer Reach, Track D Short Words, final V1
QA/docs/optimization, production backend persistence, and transfer-readiness
closure.

## Checkpoint 1D - Track A Home Base V1 expansion

Goal: expand Key Current from a single F/J stage into the full Track A Home
Base experience, without changing the 1C/1C.1 playfield composition or
generated assets.

Delivered:

- **Track A stages 1-7 are available:** F/J, D/K, S/L, A/S/D/F, J/K/L,
  A/S/D/F/J/K/L, and Mixed Home Base Review.
- **Two-run structure per stage:** every stage uses Guided Practice followed
  by a Proficiency Check. Guided runs are short and predictable; checks are
  balanced, re-randomized on replay, and avoid excessive same-key runs.
- **Stage progression:** completing Guided Practice opens the Proficiency
  Check; completing the check marks the stage complete, unlocks the next
  stage, and keeps replay available. Completing Stage 7 marks Track A
  complete.
- **Landing stage map:** Track A now shows completed/current/locked states,
  best local preview accuracy, Continue Track A, and selected-stage replay.
  Tracks B-D remain visible only as future scope.
- **Keyboard helper:** the full keyboard silhouette receives the current
  stage's active keys, so F/J, D/K, S/L, ASDF, JKL, and ASDFJKL keep true
  approximate positions with current-target highlight and wrong-key red flash.
- **Runtime preview payload:** aggregate metadata now includes `stageId`,
  `trackId`, `runType`, selected character, difficulty, input mode,
  required/correct/incorrect counts, collisions/practice bumps, obstacles
  cleared, `completionType`, `proficiencyStatus`, proposed XP, accuracy, and
  `trackCompletionStatus`.
- **Persistence:** still local preview only through `progressAdapter`; no
  Supabase writes, migrations, `/api/skills`, assignments, dashboards, raw
  telemetry, voice files, or backend XP writes.
- **Visual preservation:** future/upcoming gates remain hidden for V1. The
  1C.1 causeway perspective, texture tuning, generated gate, generated runner
  art, and slower/less-zoomed lane texture scroll were not redesigned.

Remaining future scope: Track B Center Reach, Track C Outer Reach, Track D
Short Words, final V1 closure audit, production backend persistence, and real
Voice Help remain out of scope until later checkpoints.

Tracks the phased build of Key Current against the V1 design spec
(`key-current-v1-design-spec.md`, §30 build order).

## Checkpoint 1C.1 — Perspective geometry cleanup ✅

Narrow layout-geometry fix; no new art, no Higgsfield credits spent, 1C
assets unchanged.

- **Deterministic geometry model:** new
  `keyCurrentLaneGeometry.ts` centralizes horizonY (0.315 — the plates' sea
  line), vanishing point (center), the gate travel band
  (gateFarY 0.355 → gateNearY 0.79), runner feet line (0.975), pillar
  overhang (1.15) and the near-gate width clamp, with derived helpers
  (`gateScaleAtProgress`, `laneWidthAtY`, `laneEdgesAtY`,
  `computeLanePolygon`).
- **Converging causeway:** the road is now a trapezoid whose edges run to
  the vanishing point (clip-path computed in px from the measured playfield
  via ResizeObserver). The scrolling Higgsfield cobble texture lives on a
  tilted plane *inside* the clip (foreshortening kept), with stone edge
  strokes drawn by SVG along the exact same lines — no more parallel
  platform look.
- **Gate/road alignment:** gate scale is no longer hand-tuned — it is
  `(y - horizonY) / (gateNearY - horizonY)`, so the gate footprint equals
  the road width (× pillar overhang) at every depth and shares the road's
  vanishing point. Upcoming gates queue on the horizon ridge (slightly
  larger than true perspective, per the mobile design target, so letters
  stay legible).
- **Grounding:** path-side grass/starfish are positioned from the computed
  road edges and shrink with the same depth factor; the runner's feet line
  (bottom 2.5% = geometry runnerFeetY) and pulsing ground shadow are
  unchanged and now documented as part of the model.

## Checkpoint 1C — Higgsfield visual-composition pass ✅

Goal: fix 1B's flat-approximation feel using Higgsfield-generated runtime
assets and a real 3D scene composition. No mechanics, curriculum, or backend
changes.

Delivered:

- **Higgsfield assets in the app** (see asset map): transparent gate art
  with code-overlaid letters, cobble causeway texture, and six transparent
  rear-view runner renders matching the mascot sheets.
- **Causeway:** replaced the flat clip-path trapezoid with a true
  3D-perspective plane (`rotateX`) mapped with the generated texture; the
  texture **scrolls toward the camera** so the runner visibly moves; horizon
  haze seats the causeway in the sea plane (no more awkward upward climb).
- **Gate:** premium generated art standing on the path; scales naturally
  from tiny-at-horizon (0.12) to full size at the player; letter overlay
  glows/pulses; cleared gates flash light through the doorway and dissolve;
  collision shake kept; future gates smaller/muted.
- **Background life:** slow parallax drift on the plate, twinkling water
  sparkles, drifting gulls, bubbles, foam haze — all reduced-motion aware.
- **Character:** in-game and selection art are now the generated mascot
  renders (bigger on screen, ground shadow pulses with the run bob); all six
  remain unlocked, selectable, cosmetic-only.
- **Landing:** Skills Sea badge over the title, selected-explorer preview on
  a sandy pedestal beside the roster grid (all six shown with real art).
- **HUD softening:** no bump/collision counter during Track A runs; summary
  shows gentle "practice bumps" wording (no "31 bonks" pressure).
- **Desktop framing:** during runs the page-level backdrop is blurred and
  dimmed so wide screens read as ambient depth, not a repeated plate; run
  column widened.

Deferred: asset optimization/downscaling, animated character frames (single
render + CSS motion for now), gate damaged states, Voice Help audio.

## Checkpoint 1B — Visual production pass ✅

Goal: bring the playable F/J prototype close to the supplied design targets
without blocking on sprite extraction. Mechanics from 1A untouched.

Delivered:

- **Scene:** far-background plates (desktop + mobile) used as the farthest
  layer; twinkling water sparkles, depth shading, foam, rising bubbles; wooden
  boardwalk replaced with a stone causeway (cobbles, rock borders, sunlit
  center, grass tufts, starfish) per the desktop/mobile refs.
- **Gate:** rebuilt in SVG from `key_current_gate_ref.png` — stone pillars
  with mossy caps and teal anchor banners, ornate gold arch with shell crest
  and blue gem, navy plank double doors, pulsing gold letter with glow; doors
  swing open on clear (open-gate ref); collision shake kept. Reads as a full
  path barrier. Skins now vary banner/coral accents.
- **Characters:** all six mascots (turtle, phoenix, owl, fox, boy, girl) are
  selectable and unlocked as hand-built rear-view SVGs matched to the v2
  sheets — identical gameplay behavior, cosmetic only. Species accents
  animate (wings, fox tail, braids); reduced motion disables them.
- **HUD:** ref-style deep-blue panels — round pause/music buttons, center
  "Home Base · Stage 1" panel with star progress bar, difficulty chip
  (⚡ Easy…), shell bonk counter. No coins/streak/score rails (safe-engagement
  rules).
- **Keyboard helper:** light frosted panel with "Press the matching letter to
  pass!" header, 3D white keycaps, green glowing target + blue stage keys
  (per refs), red wrong-key flash, green correct flash, left/right hand chips
  that light up with the target's side. True key placement preserved (the
  refs' wonky keyboard was intentionally not copied).
- **Landing/completion/pause/interlude:** premium sea panels + gold/blue
  buttons over the visible background plate; six-character picker grid.
- Minimal registry-driven `/skills` index page linking to the game.

Deferred: mascot sprite integration (needs RGBA + atlas data), gate damaged
states, background image optimization, Voice Help audio.

## Checkpoint 1A — Polished playable prototype ✅

Covers spec Phases 1–3 plus a first pass of Phase 4 visuals.

Delivered:

- Elevated third-person single-lane runner (CSS Skills Sea scene)
- Track A / Stage 1: F and J
- Guided Practice (predictable `F J F J F J J F`-style pattern)
- Proficiency Check (12 obstacles, balanced, max 2 repeats, re-randomized on
  replay)
- Physical keyboard input with `event.repeat` + held-key suppression
- Touch keyboard helper preserving true key positions (F left-center, J
  right-center, full silhouette rows)
- Correct key clears the gate (green flash + open animation); wrong pressed
  key flashes red while the correct target keeps glowing gold
- Harmless squash/bounce collision, decreasing intensity (900/700/500 ms),
  re-approach from a difficulty-based recovery distance
- Track A never hard-fails; completed letters survive collisions
- Countdown, pause/resume (incl. auto-pause on tab hide), restart, exit
- Stage completion summary with accuracy, bonks, XP preview, Try Faster
  offer (spec §15.5 rule), Replay with new pattern
- Four-step difficulty slider (Easy/Steady/Fast/Expert with bolt icons)
- Music: Piano-chill.mp3, loop, low volume, user-gesture start only,
  mute/unmute, pause/resume aware, stop+reset on completion/unmount/pagehide
- Voice Help stub: setting toggle + visible "Find F!" guidance text
- Skills runtime integration: `SkillsGameRuntimeShell`, begin/pause/resume/
  endRound, `createRoundResult`, `createPayloadPreview`,
  `SkillsRuntimeDebugPanel` (dev-only on completion), `previewOnly: true`
- Aggregate-only telemetry (counts/accuracy/input mode; no raw key streams)
- Local preview persistence via `progressAdapter` (settings, XP, stage best)
- Mobile portrait (~360px) and desktop 100% single-screen layouts

Explicitly out of scope this checkpoint (per instructions): Supabase writes,
migrations, `/api/skills`, assignments, dashboards, real Voice Help audio,
additional stages/tracks, three-collision restart (Tracks B–D rule).

## Checkpoint 2 - Track B Center Reach expansion

- Add Center Reach stages that build from home-row anchors.
- Keep Track A replayable and completed in local preview.
- Decide whether Track B introduces the later three-collision restart rule or
  remains guided for early testing.
- Defer transfer to the main project until Tracks A-D and the final V1
  closure audit are complete.

## Checkpoint 3 — Character & environment art integration

- Swap CSS character for extracted turtle frames (see asset map request)
- Unlock fox/owl/phoenix/kid as cosmetic characters
- Production Skills Sea background plates
- Gate skin art (base/damaged/open)

## Checkpoint 4 — Tracks B–D

- Three-collision restart + supportive restart screen
- Center Reach / Outer Reach stages
- Short Words (multi-letter obstacles are already supported by the engine;
  needs the vetted word library)

## Checkpoint 5 — Audio & accessibility completion

- Real Voice Help lines (letter/word audio or TTS integration decision)
- Per-event sound polish through the shared sound adapter
- Reduced-motion audit (basic support already wired to Healthy Play),
  contrast review, touch-target audit

## Checkpoint 6 — Platform integration

- Follow `key-current-migration-readiness.md` and
  `key-current-progress-data-contract.md`
- Real XP/progress writes via `/api/skills/*` in the main repo
- Play-limit integration (Healthy Play provider already wraps the game)

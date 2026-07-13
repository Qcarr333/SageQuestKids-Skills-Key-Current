# Key Current — Build Plan

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

## Checkpoint 2 — Track A content

- Stages 2–7 (D/K, S/L, ASDF, JKL, combined, review) using the existing
  stage/sequence engine (already generalized to N keys and multi-letter
  obstacles)
- Stage select + unlock flow (Track A map)
- Continue behavior for returning players
- Randomized Home Base Practice mode after Track A completion

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

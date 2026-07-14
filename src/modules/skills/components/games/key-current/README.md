# Key Current — game module

Single-lane, elevated third-person educational keyboard runner set in Skills
Sea. The character runs forward automatically; the learner clears letter
gates by pressing (desktop/Chromebook) or tapping (mobile/tablet) the correct
key before the character reaches them.

Design reference: `src/modules/skills/docs/games/key-current/key-current-v1-design-spec.md`

## Scope of this checkpoint

- Full Track A / Home Base V1:
  F/J, D/K, S/L, A/S/D/F, J/K/L, A/S/D/F/J/K/L, and Mixed Home Base Review
- Track B / Center Reach:
  F/G, J/H, F/R, J/U, F/T, J/Y, F/V, J/N, F/B, J/M, left/right center
  reach bridge groups, left/right center reach reviews, and mixed center
  reach review
- Track C / Outer Reach:
  D/C, D/E, D/E/C, S/X, S/W, S/W/X, A/Z, A/Q, A/Q/Z, K/I, K/,/I,
  L/O, L/./O, ;/P, left/right outer reach reviews, and mixed outer reach
  review
- Every Track A, Track B, and Track C stage has Guided Practice followed by a
  Proficiency Check
- Scalable Track A-D dashboard with compact progress rows, one expanded track,
  `Continue Adventure`, hidden duplicate start actions, and replay for
  unlocked/completed stages
- Bounded kid-safe sequence guard for generated letter sequences
- Physical keyboard + onscreen keyboard helper (both count input mode),
  including semicolon/shifted-colon, comma, and period support
- Visual keyboard bottom row includes `Z X C V B N M , .`
- Harmless bounce/retry collisions; Track A never hard-fails
- Track B and Track C use a supportive three-practice-bump restart state with
  Try Again and Make It Easier
- HUD labels use the actual current track name and track-local stage number
- Large current-stage key badge sets wrap into compact chips inside the
  landing settings panel
- Primary yellow landing/completion/retry actions receive focus so Enter can
  activate them outside active gameplay
- Old preview-only Track B completion IDs are filtered if they do not match
  the current stage shape; incompatible old Track B/C review progress is
  filtered while Track A progress and settings are preserved
- Runtime preview only (`previewOnly: true`), no Supabase, no `/api/skills`
- Local settings/XP/stage progress persistence through `progressAdapter`
  (localStorage stub)
- Track D remains future scope

## File map

| File | Responsibility |
| --- | --- |
| `KeyCurrentGame.tsx` | Orchestrator: phases, game loop (rAF), collisions, music, runtime integration |
| `KeyCurrentLanding.tsx` | Landing screen: character, difficulty slider, audio toggles, Track A-D progress dashboard |
| `KeyCurrentPlayfield.tsx` | Skills Sea scene (sky, sea, boardwalk lane) |
| `KeyCurrentObstacle.tsx` | Letter gates (coral/driftwood/energy skins), open/shake states |
| `KeyCurrentCharacter.tsx` | Generated rear-view runner art with opt-in in-game shadow |
| `KeyCurrentKeyboardHelper.tsx` | Positional onscreen keyboard, touch input, key feedback |
| `KeyCurrentHud.tsx` | Pause, run label, progress bar, difficulty bolts, music toggle |
| `KeyCurrentCompletion.tsx` | Stage summary, Try Faster/Replay, dev-only runtime debug panels |
| `keyCurrentTypes.ts` | Shared types |
| `keyCurrentTracks.ts` | Track/stage/difficulty/character definitions and generic progression helpers |
| `keyCurrentSequences.ts` | Guided + balanced proficiency sequence generators with local sequence safety guard |
| `keyCurrentScoring.ts` | First-attempt accuracy, completion tiers, XP proposal |
| `keyCurrentInput.ts` | Keyboard listener with held-key/repeat suppression |
| `keyCurrentAssets.ts` | Music + sprite-sheet manifest (usage status) |
| `keyCurrent.module.css` | Scene, gate, character and key animations |

## Engine notes

The active gate's approach is driven by a `requestAnimationFrame` loop that
writes a `--kc-progress` custom property (0 = horizon, 1 = at the character)
onto the obstacle element — no per-frame React re-renders. Pause stops the
loop; collision plays a squash/bounce, then the gate eases back to the
difficulty's re-approach distance and comes again. Completed letters survive
collisions.

Telemetry is aggregate-only (stage/track/run ids, selected character,
difficulty, counts, accuracy, input mode, practice bumps, proficiency status,
track completion status, failure mode, and restart reason when a Track B or
Track C three-bump restart occurs). No raw key streams, pointer trails, or
frame arrays are recorded.

## Moving to the main project

See `key-current-migration-readiness.md` in the docs folder. Short version:
copy this folder + assets + docs, keep the registry entry, point the route
wrapper at the module, and swap the `@/lib/gaming/*` preview stubs for the
main project's real services.

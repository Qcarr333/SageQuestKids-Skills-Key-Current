# Key Current — game module

Single-lane, elevated third-person educational keyboard runner set in Skills
Sea. The character runs forward automatically; the learner clears letter
gates by pressing (desktop/Chromebook) or tapping (mobile/tablet) the correct
key before the character reaches them.

Design reference: `src/modules/skills/docs/games/key-current/key-current-v1-design-spec.md`

## Scope of this checkpoint

- Track A / Stage 1 (F and J) only
- Guided Practice (predictable pattern) + Proficiency Check (balanced random)
- Physical keyboard + onscreen keyboard helper (both count input mode)
- Harmless bounce/retry collisions; Track A never hard-fails
- Runtime preview only (`previewOnly: true`), no Supabase, no `/api/skills`
- Local settings/XP persistence through `progressAdapter` (localStorage stub)

## File map

| File | Responsibility |
| --- | --- |
| `KeyCurrentGame.tsx` | Orchestrator: phases, game loop (rAF), collisions, music, runtime integration |
| `KeyCurrentLanding.tsx` | Landing screen: character, difficulty slider, audio toggles, how-to-play |
| `KeyCurrentPlayfield.tsx` | Skills Sea scene (sky, sea, boardwalk lane) |
| `KeyCurrentObstacle.tsx` | Letter gates (coral/driftwood/energy skins), open/shake states |
| `KeyCurrentCharacter.tsx` | CSS/SVG rear-view runner (mascot art pending extraction) |
| `KeyCurrentKeyboardHelper.tsx` | Positional onscreen keyboard, touch input, key feedback |
| `KeyCurrentHud.tsx` | Pause, run label, progress bar, difficulty bolts, music toggle |
| `KeyCurrentCompletion.tsx` | Stage summary, Try Faster/Replay, dev-only runtime debug panels |
| `keyCurrentTypes.ts` | Shared types |
| `keyCurrentTracks.ts` | Track/stage/difficulty/character definitions |
| `keyCurrentSequences.ts` | Guided + proficiency sequence generators |
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

Telemetry is aggregate-only (counts, accuracy, input mode). No raw key
streams, pointer trails, or frame arrays are recorded.

## Moving to the main project

See `key-current-migration-readiness.md` in the docs folder. Short version:
copy this folder + assets + docs, keep the registry entry, point the route
wrapper at the module, and swap the `@/lib/gaming/*` preview stubs for the
main project's real services.

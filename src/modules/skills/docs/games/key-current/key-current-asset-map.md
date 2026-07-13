# Key Current — Asset Map

Checkpoint: **1C.1 — perspective geometry cleanup** (assets unchanged from
1C). Inspected/generated: 2026-07-12.

## 1C.1 note — no Higgsfield usage

Checkpoint 1C.1 was a pure code/layout geometry fix (converging causeway,
gate/road alignment via `keyCurrentLaneGeometry.ts`). **Higgsfield was not
used and no credits were spent** — the existing 1C generated assets were
verified present and reused as-is; the cobble texture is now clipped to the
deterministic trapezoid instead of relying on a free-standing 3D plane.

## Higgsfield usage statement (1C)

Higgsfield MCP was used **actively and directly** this checkpoint:

1. The seven local Key Current references (gate sheet + six mascot v2
   sheets) were uploaded to Higgsfield via `media_upload` (presigned PUT +
   `media_confirm`).
2. Eight images were generated with `nano_banana_pro` using those uploads as
   image references: one blank-door gate, one top-down causeway texture, and
   six rear-view runner renders (one per mascot).
3. The gate and all six runners were processed with `remove_background`,
   producing true RGBA cutouts.
4. All eight results were exported to
   `src/modules/skills/assets/key-current/generated/` and are **used directly
   at runtime** (see table below).

**Unrelated media:** the account's media library contains two uploaded images
from other projects; they were ignored, never displayed into the app, never
downloaded. Only the seven Key Current uploads and their derived generations
were touched. No composed full-screen gameplay screenshot was generated or
imported — the app UI remains responsive React/CSS.

## Generated runtime assets (`generated/`) — Higgsfield, 1C

| Asset | Status | Notes |
| --- | --- | --- |
| `key-current-gate.png` | **Used directly** | 1024² RGBA gate (stone pillars, anchor banners, gold arch + shell crest, blank navy doors, coral, threshold). Letters are overlaid in code (crisp, localizable, word-ready). Source ref: `key_current_gate_ref.png`. |
| `key-current-causeway-texture.png` | **Used directly** | 1024² top-down cobble texture, mapped onto the 3D-perspective lane plane and scrolled toward the camera for forward motion. |
| `key-current-runner-{turtle,phoenix,owl,fox,boy,girl}.png` | **Used directly** | 896×1200 RGBA rear-view runner renders generated from each mascot v2 sheet; the in-game/selection character art for all six (cosmetic only, identical mechanics). |

Assets are ~0.7–1.5 MB each; an optimization/downscale pass is deferred.

## Higgsfield usage statement (1B, retained for history)

1B used only the local reference files as visual direction (no generation).
The unrelated media noted above was ignored then as well.

## Design-target references (`design-targets/`)

| Asset | Status | Notes |
| --- | --- | --- |
| `key_current_desktop_ref.png` | **Reference only** | Visual target for the desktop gameplay screen; UI recreated responsively in CSS/SVG/React. Elements that conflict with Sage Quest safety standards (coins, score/streak side rails, daily quests) were deliberately **not** copied. |
| `key_current_mobile_ref.png` | **Reference only** | Visual target for portrait gameplay; informed HUD compaction and helper styling. Its reduced keyboard layout was not copied — real key placement is preserved. |
| `key_current_gate_ref.png` | **Reference only** | Gate system sheet. The in-game gate is rebuilt in SVG from it: stone pillars, mossy caps, teal anchor banners, gold arch with shell crest + blue gem, navy plank doors, gold letter, doors-swing-open cleared state. Damaged states are deferred. |
| `key_current_far_background_desktop.png` | **Used directly** | Clean sea/sky/island plate (no path/gate). Farthest playfield layer on ≥sm screens and page backdrop. ~2.1 MB PNG — optimization pass deferred. |
| `key_current_far_background_mobile.png` | **Used directly** | Portrait plate; farthest layer on narrow screens. ~1.9 MB PNG — optimization deferred. |

The game does **not** depend on any composed screenshot: lane, gates,
character, HUD, keyboard helper, water sparkles, foam and particles are all
CSS/SVG/React on top of the background plate.

## Mascot v2 sheets (`mascots/[id]/`)

Header inspection: all six sheets are **1774×887 PNG, color type 2 (RGB, no
alpha)** — the transparency checkerboard is baked into the pixels — and every
companion `.atlas.json` is an **empty 0-byte file** (the turtle folder's
atlas is additionally misnamed `key-current-mascot-phoenix-v2.atlas.json`).
Frames sit on a cleaner grid than v1 (dedicated rear-run rows), but without
alpha or coordinates they still cannot be composited over the scene.

No extraction utility was built and no sheet is imported at runtime.
**Usage: Higgsfield image references** — each sheet drove the generation of
its mascot's transparent rear-view runner render (1C), which replaced the 1B
hand-built SVG interpretations in `KeyCurrentCharacter.tsx`.

| Sheet | Status | What the SVG borrows |
| --- | --- | --- |
| `turtle/key-current-mascot-turtle-v2.png` | Reference only | Green turtle, shell rim, tan pith hat w/ teal band, leather backpack, blue scarf |
| `phoenix/key-current-mascot-phoenix-v2.png` | Reference only | Flame crest above hat, orange wings w/ teal tips, plume tail |
| `owl/key-current-mascot-owl-v2.png` | Reference only | Round blue owl, folded wings, fan tail, cream speckles |
| `fox/key-current-mascot-fox-v2.png` | Reference only | Tall dark-tipped ears above the brim, bushy cream-tipped tail |
| `boy/key-current-mascot-boy-v2.png` | Reference only | Dark hair under hat, cream shirt, olive shorts, blue backpack, boots |
| `girl/key-current-mascot-girl-v2.png` | Reference only | Braids with scarf ties, tan/olive outfit, brown backpack, boots |

All six characters are **visible, selectable and unlocked**; they share
identical speed, hitbox, collision timing, score potential and difficulty
behavior (cosmetic only).

`addl_assets/reference/` holds the v1 sheets (superseded; reference archive).

## Audio (unchanged from 1A)

| Asset | Status |
| --- | --- |
| `audio/Piano-chill.mp3` | Used directly (loop, low volume, gesture-gated, stops on completion/unmount/pagehide) |
| `audio/Build-med.mp3`, `Build-fast.mp3`, `Follow-fast.mp3` | Deferred |

Sound effects remain soft WebAudio tones via the shared `soundAdapter` stub.
No voice MP3s were generated (Voice Help stays tabled; the toggle is labeled
as visual guidance).

## What would unblock direct mascot art

Same request as 1A, unchanged in spirit: background-removed RGBA frames (or
sheets) plus real atlas JSON (`{frame, x, y, w, h, anchorX, anchorY}`) with a
consistent anchor/scale across mascots. Rear-run loop + collision poses +
idle/celebrate per character. The empty `.atlas.json` files suggest this
pipeline is already planned — they just need data (and the turtle file
renamed).

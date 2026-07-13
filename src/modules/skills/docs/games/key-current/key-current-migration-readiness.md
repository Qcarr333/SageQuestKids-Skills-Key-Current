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

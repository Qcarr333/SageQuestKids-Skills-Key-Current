# Portable Skills Module Strategy

Purpose: strategy for moving the Skills module into the main project and for
future desktop, tablet, and mobile game redesign work. This is documentation
only; it does not authorize route migration, backend writes, dashboards, or game
redesign.

## 1. Portable Module Boundary

The Skills module should stay easy to transfer into the main project by keeping
its concerns grouped and avoiding hardcoded app-specific assumptions.

Current portable areas:

- `/components/skills/runtime`
- `/lib/skills/runtime`
- `/assets/skills`
- `/docs/skills-games/integration`
- current game components under `/components/gaming/[game]` for now
- current game routes under `/app/gaming/[game]` for now

Future migration target:

- Game routes can later move or alias to `/skills/[game]`.
- Portable game components should not depend on `/gaming` as a hardcoded
  product concept where avoidable.
- Game identity should come from canonical registry entries, not scattered
  strings.

Checkpoint 12K adds a portable transfer-package scaffold at:

```text
/skills/src/modules/skills
```

This scaffold is documentation/structure only. It is intended to map into the
main project as:

```text
/skills/src/modules/skills -> main-project/src/modules/skills
```

Current stable Skills files remain in their working locations. Checkpoint 12L
adds a copied mirror of the stable Memory Match module, shared runtime, shared
content layer, Skills assets, and integration docs into this transfer package
without changing live imports or routes.

## 2. Route Strategy

Current playable routes remain `/gaming/[game]`. No route migration is happening
now.

Future route target: `/skills/[game]`.

Checkpoint 12M begins that route strategy for Memory Match only:

- `/skills/memory-match` is the primary Skills route.
- `/gaming/memory-match` remains a temporary compatibility route.
- The new route is a thin root app wrapper importing from
  `/skills/src/modules/skills/components/games/memory-match`.
- Other games remain on their existing `/gaming/[game]` routes until explicitly
  scoped.

In the preferred main-project architecture, the future live route should stay in
the root app router, for example:

```text
main-project/app/skills/memory-match/page.tsx
```

That route should be a thin wrapper importing from:

```text
main-project/src/modules/skills/components/games/memory-match
```

Next.js will not automatically route from the transfer package path
`/skills/src/modules/skills/app`; a root app route must explicitly connect it.

The registry should eventually include both current and future routes so aliases
can be planned without breaking existing links. Game components should be
written so the route wrapper can move without rewriting core game logic.

Conceptual future registry shape:

- `moduleId`
- `gameKey`
- `title`
- `category`
- `currentRoute`
- `futureRoute`
- `componentFolder`
- `assetFolder`
- `aliases`
- `mobileSupportLevel`
- `preferredInputMode`

Do not implement this registry change until a route/registry checkpoint is
explicitly scoped.

## 3. Mobile And Online Functionality

The app should not be limited to PC/computer operation in 2026. Keyboard and
mouse may be the best educational experience for skill mastery, but
mobile/tablet access should remain functional where feasible.

All future game redesign/build packets must consider:

- desktop/laptop
- tablet
- mobile
- touch input
- mouse input
- keyboard input where educationally relevant
- responsive layout
- safe portrait/landscape behavior where practical
- no hover-only critical interactions
- large touch targets
- readable text on mobile
- no desktop-only assumptions for navigation

## 4. Best-Experience Messaging

Future Skills page copy guidance:

> For the best skill-building experience, use a keyboard and mouse when
> available. Many activities also support touch so learners can practice on
> tablets and mobile devices.

This is future page copy guidance only. Do not implement Skills page UI in this
strategy checkpoint.

## 5. Game Build Packet Requirements

Each future game-specific agent packet should include:

- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/portable-skills-module-strategy.md`
- the specific game component folder
- the specific game route folder
- the specific asset folder
- the game's initial/refinement prompt
- one completed pilot reference game
- mobile/touch expectations
- desktop keyboard/mouse expectations
- content/data expectations
- Supabase/future content table notes where relevant
- strict no-backend/no-route-migration rules unless explicitly scoped

## 6. Content/Data Portability

Hardcoded local game content is acceptable during local development, but games
should be structured so content banks can later move to Supabase or another
internal content database.

Examples:

- Memory Match card banks
- word banks
- puzzle banks
- grammar/category target banks
- difficulty/grade variants
- translatable labels
- randomized prompt values

Do not build content tables until a backend/content checkpoint is explicitly
scoped.

## 7. Main Project Platform Boundary

In the main project, shared platform services should live under `src/core/*`,
not inside the Skills module. Examples:

- auth
- billing
- entitlements
- analytics
- permissions
- feature flags
- shared API clients
- deployment and release gates

The Skills module should consume these through explicit adapters or props when a
future integration checkpoint scopes that work.

Future Reading, Math, and Code modules can follow the same pattern:

- `src/modules/reading/*`
- `src/modules/math/*`
- `src/modules/code/*`
- `src/modules/skills/*`

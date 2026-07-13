# Skills Game Build Packet Template

Use this template for one Skills game at a time. It keeps future Codex,
Copilot, and local-agent work aligned with the existing runtime pattern,
portable route/mobile strategy, and content/data strategy.

## 1. Packet Purpose

This packet prevents agents from inventing new architecture for each game.
Every game packet must clearly state the approved task type:

- Runtime integration only.
- Content expansion only.
- UI redesign only.
- Mobile/touch pass only.
- Accessibility pass only.
- Full game rebuild.
- Backend/Supabase integration, only if separately approved later.

## 2. Required Source Files

Every packet must reference:

- `/docs/skills-games/integration/runtime-pilot-index.md`
- `/lib/skills/runtime/README.md`
- `/docs/skills-games/integration/portable-skills-module-strategy.md`
- `/docs/skills-games/integration/skills-game-content-data-strategy.md`
- `/docs/skills-games/integration/Skills_Module_Integration_Contract.md` for future backend alignment only
- Target game component folder.
- Target game route folder.
- Target game asset folder.
- Target game initial prompt.
- Target game refinement prompt, if available.
- One completed pilot reference game:
  - Word Builder Farm for typing/keyboard games.
  - Memory Match for card/memory games.
  - Galaxy Click Command for pointer/click games.

## 3. Non-Negotiable Guardrails

- Preserve the current `/gaming/[game]` route unless route migration is
  explicitly scoped.
- Future route target is `/skills/[game]`, but do not migrate now.
- Keep game components portable.
- Keep assets under `/assets/skills` where possible.
- No API routes unless explicitly scoped.
- No Supabase writes unless explicitly scoped.
- No dashboard work unless explicitly scoped.
- No billing/auth changes unless explicitly scoped.
- No raw keystroke logs.
- No raw pointer trails.
- Store aggregate telemetry only.
- Debug panels must remain development-only.
- Runtime previews must remain `previewOnly` until production backend
  integration is approved.

## 4. Runtime Integration Checklist

- Confirm canonical `moduleId` and `gameKey` in the registry.
- Wrap with `SkillsGameRuntimeShell` if not already wrapped.
- Use `useSkillsGameRuntime()` inside the game body.
- Call `beginRound`, `pauseRound`, `resumeRound`, and `endRound`.
- Use `createPreviewMetadata`.
- Use `createRoundResult`.
- Use `createPayloadPreview`.
- Log `[skills-runtime-preview]`.
- Render `SkillsRuntimeDebugPanel` only after round end in development.
- Validate no `/api/skills`, Supabase, or `/rest/v1` traffic during local-only
  phases.

## 5. Content Expansion Checklist

- Move content out of UI/game loop where practical.
- Create or expand local TypeScript content banks.
- Include `gradeLevel`, `difficulty`, `skillCategory`, `locale`, `contentId`,
  `tags`, `contentType`, and `metadata`.
- Define minimum content volume by grade/difficulty.
- Add randomized selection from approved pools.
- Avoid immediate repeats.
- Provide a deterministic test seed strategy where practical.
- Include safe fallback content.
- Keep translatable display strings separate from scoring logic.
- Note future Supabase/internal database mapping.

## 6. Mobile/Tablet/Desktop Checklist

- Desktop/laptop support.
- Tablet support.
- Mobile support where feasible.
- Touch input support.
- Mouse input support.
- Keyboard input where educationally relevant.
- Large touch targets.
- No hover-only critical interactions.
- Responsive layout.
- Readable mobile text.
- Safe portrait/landscape behavior where practical.
- Best-experience copy guidance: keyboard and mouse are recommended when
  available, and touch is supported where practical.

## 7. UI/UX Redesign Checklist

- Modern Sage Quest Kids visual alignment.
- Child-friendly but credible edu-tech look.
- Clear start, pause, resume, end, and summary states.
- Clear grade/difficulty display.
- Clear feedback for correct/incorrect actions.
- Accessible focus states.
- Reduced-motion behavior.
- High-contrast/larger text readiness.
- Gameplay remains understandable without audio.
- Avoid visual clutter on mobile.

## 8. Accessibility Checklist

- Keyboard navigation where practical.
- Touch alternatives.
- ARIA labels/states for interactive elements.
- Visible focus states.
- Reduced motion.
- Sound-off usability.
- Color is not the only cue.
- Large targets or assist modes for pointer games.
- Drag/drop alternatives or simplified mode where practical.

## 9. Validation Checklist

Run for each completed game task:

- `cmd /c npm run lint`
- `cmd /c npm run build`
- `cmd /c npx tsc --noEmit --pretty false`
- Focused route smoke test for the target game.

For runtime-integrated games, confirm:

- Route loads.
- Start works.
- Pause/resume works.
- End round works.
- Normal summary appears.
- Debug panel is hidden before round end.
- Debug panel is visible after round end in development.
- `previewOnly` is true.
- Canonical `moduleId` and `gameKey` are present.
- `sessionId` and `roundId` exist.
- `soundPreference` and `reducedMotion` metadata exist.
- No backend, Supabase, or REST traffic appears.

## 10. Output Requirements For Agents

Each agent must report:

- Files changed.
- What was changed.
- What was not changed.
- Validation results.
- Screenshots or smoke-test notes if UI was touched.
- Known limitations.
- Whether the game remains portable.
- Whether mobile/touch expectations were addressed.
- Whether content was expanded or only prepared.
- Recommended next step.

## 11. First Games To Use This Packet

Recommended future uses:

- Math Key Quest as the fourth local runtime pilot.
- Code Keys Workshop as another keyboard-style pilot.
- Shakerz or Target Tracker as another pointer/click pilot.
- Memory Match as the first content expansion/redesign candidate because
  content depth is visibly limited.

Do not implement any of these games unless that checkpoint is explicitly
approved.

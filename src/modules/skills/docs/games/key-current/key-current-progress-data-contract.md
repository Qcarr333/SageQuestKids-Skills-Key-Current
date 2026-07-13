# Key Current — Progress / Data Contract (future Supabase needs)

Status: **contract-only**. This checkpoint performs **no Supabase writes, no
migrations, and no `/api/skills` calls**. The game emits `previewOnly: true`
payloads through the shared Skills runtime and persists a small local preview
via `progressAdapter` (localStorage stub). This document describes what the
main project will need when integration is scoped.

Alignment: follows `Skills_Module_Integration_Contract.md` (XP event +
progress upsert contracts, idempotency, RLS rules). Key Current adds no new
table requirements beyond those — only module-specific identifiers, metadata
fields, and two optional columns/tables noted below.

## Identifiers

| Field | Value |
| --- | --- |
| `moduleId` / `gameKey` | `key_current` |
| `lessonId` format | `key_current:{stageId}:{runType}` e.g. `key_current:track_a_stage_1_f_j:proficiency_check` |
| `stageId` format | `track_{a-d}_stage_{n}_{keys}` e.g. `track_a_stage_1_f_j` |
| `trackId` values | `track_a_home_base`, `track_b_center_reach`, `track_c_outer_reach`, `track_d_short_words` |
| `activityType` | `lesson_complete` (Guided Practice), `challenge_complete` (Proficiency Check) |
| `difficulty` values | `easy` \| `steady` \| `fast` \| `expert` |

## XP event payload (maps to `skills_xp_events`)

Standard contract fields are already emitted by the runtime preview
(`score`, `accuracy`, `durationMs`, `attempt`, `difficulty`, `xpProposed`,
`sessionId`, `idempotencyKey`). Key Current's `metadata` jsonb carries:

```json
{
  "stageId": "track_a_stage_1_f_j",
  "trackId": "track_a_home_base",
  "runType": "guided_practice | proficiency_check",
  "selectedCharacter": "tide_turtle",
  "difficulty": "easy",
  "inputMode": "keyboard | touch | mixed",
  "requiredInputs": 12,
  "correctFirstAttempts": 11,
  "incorrectInputs": 2,
  "collisions": 1,
  "obstaclesCleared": 12,
  "completionType": "completed | proficient | mastered",
  "xpProposed": 42,
  "accuracy": 92
}
```

All values are aggregates. **No raw keystroke streams, key timing arrays,
pointer trails, or frame data are ever sent** (FERPA/COPPA-aligned; matches
the integration contract's telemetry rules).

### Server-side validation guidance

- `xpProposed` is a hint; server computes final award. Client formula:
  base 20 (guided) / 30 (proficiency) + accuracy bonus (0–15) + difficulty
  bolts (1–4) − collision trim (≤6), clamped 5–60.
- Accuracy is **first-attempt accuracy**: correct-before-any-wrong-key ÷
  required inputs (spec §18.2).
- Idempotency key format comes from the shared runtime:
  `skills:key_current:{activityType}:lesson:{lessonId}:session:{sessionId}:attempt:{n}`.

## Progress upsert payload (maps to `skills_progress`)

Upsert by `(user_id, 'key_current', lessonId)`. Key Current statuses:

- `completed` — run finished
- `mastered` — ≥95% accuracy and 0 collisions

`proficient` (≥85%, ≤2 collisions) is carried in `metadata.completionType`
rather than the status enum, to stay compatible with the shared
`SkillProgressStatus` values.

## Saved player state Key Current needs (beyond per-lesson rows)

Per spec §19.1. Recommended home: a `metadata` jsonb on a per-module player
settings row, or the optional `skills_module_catalog`-adjacent
`skills_module_player_state` table if one is introduced platform-wide:

| Field | Type | Notes |
| --- | --- | --- |
| `selected_character` | text | cosmetic only (`tide_turtle`, later `ember_fox`, …) |
| `selected_difficulty` | text | persists between stages |
| `current_track` / `current_stage` | text | resume target for Continue |
| `completed_stages` | text[] | stage ids |
| `stage_best_accuracy` | jsonb | `{stageId: percent}` |
| `stage_mastery_status` | jsonb | `{stageId: completed\|proficient\|mastered}` |
| `highest_difficulty_completed` | text | for Try Faster offers |
| `voice_help_enabled` / `music_enabled` / `sfx_enabled` | boolean | audio settings persist between sessions |
| `input_mode_history` | text[] | which modes were used (aggregate, not events) |

In this checkpoint an equivalent shape is stored locally through
`progressAdapter` under `sqk-skills-progress-preview:key_current`.

## Save timing (spec §19.2)

Writes occur after: Guided Practice end, Proficiency Check end, stage
completion, settings changes, character/difficulty changes. **Never
mid-run** — no partial obstacle progress is persisted.

## Not required for Key Current V1

- New tables beyond the integration contract's `skills_xp_events` /
  `skills_progress` (+ optional player-state row)
- Leaderboards, streak-loss mechanics, purchase/currency columns
- Any raw-input telemetry columns

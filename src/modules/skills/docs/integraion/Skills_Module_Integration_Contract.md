# Skills Module Integration Contract (Codex Plan Mode)

## Executive Summary: Current Platform + Module Roadmap

This repository currently operates as a full reading and comprehension learning platform. The external Skills Module (keyboard/mouse gameplay) should integrate into this existing ecosystem rather than replace it.

### Current Core Platform (Already Built)
- **Reading/Comprehension Module:** AI-generated stories with grade-level/difficulty controls.
- **Story Generation API:** Story + question generation pipeline with parser markers and normalized question/answer structures.
- **Tutor Assistance:** Inline tutor chat support, tutoring endpoints, interaction logging, and feedback rollups.
- **WPM Mode:** Timed reading/WPM test flows with result tracking.
- **Comprehension Questions:** Structured reading questions, answer capture, and downstream scoring hooks.
- **Role Dashboards:** Student, Parent, Teacher dashboard routes with role-aware access and middleware gating.
- **Assignment Feature:** Teacher and Parent assignment workflows for student reading activities.
- **Gamification Foundation:** XP/rewards/milestones infrastructure already present in platform tables/routes.
- **Billing + Plans:** Stripe checkout/portal + plan tiers + usage gating + upsell surfaces.
- **Notifications + Analytics:** Notification APIs/channels and privacy-filtered analytics events.
- **Auth + Session Layer:** Supabase-backed auth/session restoration + role profile routing.

### Future Multi-Module Scope (Target State)
- **Skills/Games Module (near-term):** Keyboard and mouse modules with XP + progress + rewards.
- **Math Module (planned):** Math activity units with assignment support (teacher/parent assignable).
- **Coding Module (planned):** Intro coding activities with assignment support (teacher/parent assignable).
- **Unified Student Learning Hub:** Separate module screens with shared identity, XP, progress, and reward rollups.
- **Cross-Module Educator Views:** Teacher/parent visibility across reading + skills + math + coding progress.

### Integration Principle
All future modules should plug into a **shared identity, authorization, and progress infrastructure**:
- Identity from authenticated Supabase user context.
- Writes through server routes in this repo.
- Shared XP/reward semantics where possible.
- Module-specific telemetry retained without breaking existing FERPA/COPPA guardrails.

---

## Quick Interpretation Guide (What This Document Gives You)

Use this document as the single source of truth for external module handoff. It provides:
1. **What exists now** in the core project.
2. **What must be built externally** vs inside this repository.
3. **What payloads/routes/tables** are required for clean integration.
4. **How to keep auth, roles, XP, and rewards aligned** across modules.
5. **How Codex Plan agents should report integration decisions** for easy merge execution.

---

## Agent Connection Response Log (For Ongoing Codex Plan Sessions)

Use this section to capture each agent decision about connection points, blockers, and final implementation direction. Keep entries additive.

### Entry Template

```markdown
### Connection Entry <ID>
- Date:
- Agent/Session:
- Module Area: (skills|math|coding|shared)
- Connection Topic: (auth|route|schema|RLS|dashboard|assignment|analytics|billing)
- Current State Observed:
- Decision:
- Why This Decision:
- Files Affected / Proposed:
- DB Changes / Migrations:
- API Contract Impact:
- Risks:
- Validation Plan:
- Follow-up Owner:
- Status: (proposed|approved|implemented|validated)
```

### Response Expectations for Agents
- Always specify whether the decision is **contract-only** or **implemented in code**.
- Always identify whether change impacts **student-only** or also **teacher/parent views**.
- Always include rollback/reversal notes for schema or auth changes.
- Always map to at least one acceptance criterion from this contract.

### Working Log

#### Connection Entry 001
- Date: _TBD_
- Agent/Session: _TBD_
- Module Area: _skills_
- Connection Topic: _auth + xp events_
- Current State Observed: _TBD_
- Decision: _TBD_
- Why This Decision: _TBD_
- Files Affected / Proposed: _TBD_
- DB Changes / Migrations: _TBD_
- API Contract Impact: _TBD_
- Risks: _TBD_
- Validation Plan: _TBD_
- Follow-up Owner: _TBD_
- Status: _proposed_

## Purpose
This document defines the integration contract between the external Skills Module build (keyboard/mouse game modules) and the main `reading-pal-lab-frankenstein` app.

Goal: allow the external team to build quickly while guaranteeing clean, secure, low-risk integration into the existing auth, XP, rewards, analytics, and dashboard ecosystem.

---

## Integration Strategy

### Recommended Approach: Contract-First, Runtime-Coupled
- Build game logic/UI externally.
- Standardize all data exchange now (payloads, route contracts, IDs, result semantics).
- At integration time, **authenticate and authorize inside this repo** and write to Supabase via server routes.

### Why this approach
- Prevents auth/session drift between projects.
- Keeps user/role enforcement centralized.
- Avoids direct client writes from external module to privileged tables.
- Supports phased rollout with feature flags.

---

## System Boundaries

### External Skills Module Owns
- Game loop and gameplay scoring logic.
- Input telemetry normalization (keyboard/mouse events to game metrics).
- Frontend module state (`level`, `attempt`, `duration`, `accuracy`, etc.).
- UI events: completion, failure, retry, reward unlock animations.

### Main Project Owns
- User/session identity resolution (`getRouteUserContext`).
- Role checks (`student` writes, teacher/parent read views).
- XP ledger persistence (`xp_log` and related reward tables).
- Progress/reward aggregation for dashboard views.
- Data governance (RLS, privacy, FERPA/COPPA handling, auditability).

---

## Identity + Auth Contract

### Canonical User Identity
- Required: `user_id` from Supabase auth user (UUID).
- Never trust external provided `user_id` without server-side verification.
- Server routes must derive identity from authenticated session/bearer token.

### Required auth behavior
- Student gameplay write routes: `allowedRoles: ['student']`.
- Teacher/parent analytics routes: role-validated read-only routes.
- Service-role actions only inside backend route handlers where required.

### Required helper
- All game API routes in this repo should resolve auth via:
  - `src/lib/supabaseRouteClient.js` → `getRouteUserContext(...)`

---

## Data Contracts

## 1) XP Event Contract

### Event semantics
Each successful gameplay outcome should produce an idempotent XP event.

### Payload sent from module to app route
```json
{
  "moduleId": "keyboard_basics_v1",
  "activityType": "lesson_complete",
  "score": 87,
  "accuracy": 0.92,
  "durationMs": 123000,
  "attempt": 2,
  "difficulty": "medium",
  "xpProposed": 35,
  "sessionId": "3f8d8f5d-53d8-44dc-ae59-cb327f5b8d9e",
  "idempotencyKey": "skills:keyboard_basics_v1:lesson_4:user:{userId}:attempt:2"
}
```

### Server-side derived fields (do not trust client)
- `user_id`
- `awarded_xp` (final XP after validation/caps)
- `source` (e.g. `skills_module`)
- `created_at`

### Validation rules
- `moduleId`: required, known registry value.
- `activityType`: enum (`lesson_complete`, `challenge_complete`, `streak_bonus`, `milestone_bonus`).
- `xpProposed`: optional hint; server computes final.
- `idempotencyKey`: required for write endpoints.

---

## 2) Module Progress Contract

### Progress upsert payload
```json
{
  "moduleId": "mouse_precision_v1",
  "lessonId": "lesson_3",
  "status": "completed",
  "score": 74,
  "accuracy": 0.81,
  "durationMs": 98000,
  "attempt": 1,
  "maxCombo": 12,
  "mistakeCount": 6,
  "completedAt": "2026-05-24T18:44:00.000Z"
}
```

### Status enum
- `not_started`
- `in_progress`
- `completed`
- `mastered`

### Server behavior
- Upsert by `(user_id, module_id, lesson_id)`.
- Preserve best score and most recent completion metadata.
- Derive aggregate module progress for dashboard.

---

## API Contract (Main Repo)

## Student write/read endpoints

### `POST /api/skills/xp-events`
Creates XP event + optional reward trigger.

**Auth**: student required.  
**Idempotency**: required via `idempotencyKey`.  
**Response**:
```json
{
  "success": true,
  "awardedXp": 30,
  "totalXp": 1280,
  "level": 13,
  "newRewards": [
    {"type": "badge", "name": "Mouse Precision I"}
  ]
}
```

### `POST /api/skills/progress`
Upsert lesson/module progress.

**Auth**: student required.  
**Response**: normalized progress object + aggregate module completion.

### `GET /api/skills/progress?moduleId=...`
Returns progress for current student for one module or all modules.

### `GET /api/skills/rewards`
Returns skill-specific rewards and XP summary.

---

## Educator/Parent read endpoints (optional phase 2)

### `GET /api/skills/teacher/overview?studentId=...`
Teacher role required + relationship validation.

### `GET /api/skills/parent/overview?childId=...`
Parent role required + parent-child relationship validation.

---

## Supabase Schema Plan

## New tables (recommended)

### `skills_xp_events`
- `id` uuid pk
- `user_id` uuid not null
- `module_id` text not null
- `activity_type` text not null
- `score` numeric null
- `accuracy` numeric null
- `duration_ms` int null
- `attempt` int null
- `difficulty` text null
- `xp_proposed` int null
- `awarded_xp` int not null
- `source` text not null default `skills_module`
- `session_id` uuid null
- `idempotency_key` text not null unique
- `created_at` timestamptz default now()

Indexes:
- `(user_id, created_at desc)`
- `(module_id, created_at desc)`
- unique `(idempotency_key)`

### `skills_progress`
- `id` uuid pk
- `user_id` uuid not null
- `module_id` text not null
- `lesson_id` text not null
- `status` text not null
- `best_score` numeric null
- `latest_score` numeric null
- `best_accuracy` numeric null
- `latest_accuracy` numeric null
- `attempt_count` int default 1
- `total_duration_ms` bigint default 0
- `completed_at` timestamptz null
- `updated_at` timestamptz default now()

Unique:
- `(user_id, module_id, lesson_id)`

Indexes:
- `(user_id, module_id)`
- `(user_id, status)`

### Optional: `skills_module_catalog`
Module metadata registry (title, category, difficulty bands, xp caps).

---

## Relationship to Existing Tables
- Continue writing canonical XP to existing XP systems (`xp_log`) for platform-level gamification.
- `skills_xp_events` acts as event-level source-of-truth for module telemetry.
- Reward issuance can continue via existing `student_rewards` + `student_milestones` patterns.

---

## RLS + Security Requirements

## Required baseline
- Enable RLS on all new tables.
- Student policies scoped to `auth.uid() = user_id` for read/write where appropriate.
- Teacher/parent access via vetted server routes, not direct client table reads.
- Service role only used in API routes when relationship checks are enforced.

## Policy outline
- Student can `select/insert/update` own progress rows.
- Student can `select` own XP events.
- No direct `delete` for clients.
- Educator/parent read should remain route-mediated unless relationship-safe SQL policies are already in place.

---

## Idempotency + Replay Protection

## Required
- Every XP event write must include `idempotencyKey`.
- Backend enforces uniqueness and returns existing result if duplicate.
- Prevent duplicate XP awards from retries/reloads/offline replay.

## Recommended key format
`skills:{moduleId}:{activityType}:user:{userId}:session:{sessionId}:attempt:{attempt}`

---

## Dashboard Scope (Recommended)

## Student route
- `GET /dashboard/student/skills` (separate screen)

## UI blocks
- Overall skills progress (module completion %).
- XP earned from skills (today/week/all-time).
- Rewards earned (badges, streaks, milestones).
- Module cards (keyboard, mouse, upcoming modules).
- Recent activity timeline.

## Data requirements
- Aggregate progress per module.
- Recent XP events.
- Reward badges unlocked by skills module.

## Teacher/Parent visibility (phase 2)
- Class/child progress snapshot.
- At-risk signals (high attempt count + low accuracy).
- Skills mastery trend over time.

---

## Analytics + QA Instrumentation

## Must capture
- Session start/end.
- Lesson start/complete.
- Retry count.
- XP event accepted/rejected.
- Reward trigger outcomes.

## Privacy considerations
- Do not store raw keystrokes.
- Store aggregated metrics only (accuracy, reaction time buckets, completion rates).
- Route all analytics through existing privacy-safe helpers where applicable.

---

## External Team Handoff Checklist

Provide these artifacts when handing module into this repo:

1. **Module registry JSON**
   - module IDs, lesson IDs, difficulty bands, nominal XP ranges.
2. **API payload spec**
   - exact request/response examples for XP and progress endpoints.
3. **Scoring rules doc**
   - formula inputs and expected XP proposal behavior.
4. **Event dictionary**
   - all emitted game events and semantics.
5. **UI integration map**
   - route entry points and required props/state.
6. **Test vectors**
   - 5–10 canonical payloads including edge cases and duplicate submissions.
7. **Migration draft**
   - SQL for new tables/indexes/policies.

## Required Inputs From External Team (Execution Tracker)

Use this tracker to manage delivery readiness from the external module team before merge/integration.

| Input Item | Description | Required For | Format / Location | Owner | Due Date | Status | Notes |
|---|---|---|---|---|---|---|---|
| Module Registry | Canonical `moduleId`, `lessonId`, difficulty, XP range metadata | Schema seed + UI routing + validation | `modules/registry.json` (or equivalent) | External Team | _TBD_ | Not Started | Must match payload references exactly |
| XP Payload Samples | Real examples of event payloads from gameplay outcomes | API validation + idempotency tests | JSON samples in handoff bundle | External Team | _TBD_ | Not Started | Include success/fail/retry edge cases |
| Progress Payload Samples | Per-lesson progress update payload examples | Progress upsert route and dashboard cards | JSON samples in handoff bundle | External Team | _TBD_ | Not Started | Include `completed` and `mastered` paths |
| Scoring Rules Spec | XP proposal formula + modifiers (accuracy/time/streak) | Server-side XP normalization policy | Markdown or PDF | External Team | _TBD_ | Not Started | Required to avoid XP drift |
| Event Dictionary | All emitted gameplay events and trigger points | Analytics + QA instrumentation mapping | `events.md` | External Team | _TBD_ | Not Started | Include event names and field schema |
| UI Integration Map | Route entry points, module navigation, expected props | Frontend integration shell and wiring | Diagram + component map | External Team | _TBD_ | Not Started | Identify any shared components needed |
| Test Vectors | Deterministic test inputs and expected outputs | QA automation and regression checks | JSON + assertions doc | External Team | _TBD_ | Not Started | Include duplicate idempotency key case |
| Accessibility Notes | Keyboard-only flow, focus states, input alternatives | EDU compliance and QA acceptance | Accessibility checklist doc | External Team | _TBD_ | Not Started | Required for keyboard/mouse module quality |
| Telemetry Contract | Aggregated metrics only (no raw keystrokes) | Privacy audit and analytics pipeline | Metrics schema doc | External Team | _TBD_ | Not Started | Must align with FERPA/COPPA constraints |
| Reward Trigger Matrix | Conditions for badges/milestones from module outcomes | Rewards integration and dashboard summary | CSV/Markdown matrix | External Team | _TBD_ | Not Started | Map to existing reward types when possible |
| Assignment Compatibility Spec | How module activities map to assignable units | Teacher/parent assignment workflows | Assignment mapping doc | External Team + Core App Team | _TBD_ | Not Started | Required for multi-module assignment support |
| Build/Runtime Requirements | Node/package/tooling assumptions and environment requirements | Merge planning and CI compatibility | `README` section | External Team | _TBD_ | Not Started | Call out browser/input dependencies |

### Status Legend
- **Not Started:** Input not yet delivered.
- **In Progress:** Input partially delivered/review in flight.
- **Blocked:** Input cannot proceed until prerequisite is resolved.
- **Ready for Review:** Delivered and awaiting integration review.
- **Approved:** Reviewed and accepted for implementation.

---

## Codex Plan Agent Task Breakdown

## Phase A: Contract + Schema
1. Add SQL migration for `skills_xp_events`, `skills_progress`, indexes, RLS policies.
2. Add module catalog seed data.
3. Add shared types/interfaces for payload validation.

## Phase B: API
1. Implement `POST /api/skills/xp-events` with idempotency.
2. Implement `POST /api/skills/progress` upsert.
3. Implement `GET /api/skills/progress` and `GET /api/skills/rewards`.
4. Reuse `getRouteUserContext` and existing role checks.

## Phase C: UI
1. Add `/dashboard/student/skills` page.
2. Add module progress cards and rewards summary components.
3. Add recent skills activity feed.

## Phase D: Reliability + QA
1. Add API integration tests for auth/role/idempotency.
2. Add e2e flow: login → play module → XP write → dashboard update.
3. Add privacy audit checks for telemetry fields.

---

## Acceptance Criteria

- Student can complete a skills lesson and receive exactly one XP award per idempotency key.
- Skills progress updates are visible on `/dashboard/student/skills` within one refresh cycle.
- Rewards triggered by skills activities appear in existing rewards surfaces.
- Unauthorized users cannot write/read another student’s progress.
- No duplicate XP awards on retries/reloads.
- All new tables in exposed schemas have RLS enabled with explicit policies.

---

## What to Build Externally vs In-Repo

## Build externally now
- Gameplay, scoring engine, UI interactions, local state machine.
- Event emission adapter that calls contract routes.

## Build in this repo
- Authenticated API routes, persistence logic, idempotency, rewards integration.
- Dashboard routes/components and role-based visibility.
- Migrations/RLS and production observability.

---

## Immediate Next Step
Create a lightweight `skills-integration` feature slice in this repo with:
1. route stubs + payload validators,
2. SQL migration draft,
3. student skills dashboard shell.

This lets external module plug in quickly without rework.

---

## Appendix A: SQL Migration Draft (Supabase)

> Use this as a starter migration in `supabase/migrations/<timestamp>_skills_module_integration.sql`.
> Adjust table names/types to match any existing internal standards before applying.

```sql
-- Skills Module Integration Migration Draft
-- Phase: A (Contract + Schema)

begin;

-- 0) Extensions
create extension if not exists pgcrypto;

-- 1) Module catalog
create table if not exists public.skills_module_catalog (
   id uuid primary key default gen_random_uuid(),
   module_id text not null unique,
   title text not null,
   category text not null check (category in ('keyboard', 'mouse', 'mixed', 'other')),
   difficulty_min text null,
   difficulty_max text null,
   nominal_xp_min int not null default 5,
   nominal_xp_max int not null default 50,
   is_active boolean not null default true,
   metadata jsonb not null default '{}'::jsonb,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now()
);

create index if not exists idx_skills_module_catalog_active
   on public.skills_module_catalog (is_active);

-- 2) XP event ledger (idempotent)
create table if not exists public.skills_xp_events (
   id uuid primary key default gen_random_uuid(),
   user_id uuid not null references auth.users(id) on delete cascade,
   module_id text not null,
   lesson_id text null,
   activity_type text not null,
   score numeric null,
   accuracy numeric null,
   duration_ms int null,
   attempt int null,
   difficulty text null,
   xp_proposed int null,
   awarded_xp int not null,
   source text not null default 'skills_module',
   session_id uuid null,
   idempotency_key text not null,
   metadata jsonb not null default '{}'::jsonb,
   created_at timestamptz not null default now(),
   constraint uq_skills_xp_events_idempotency unique (idempotency_key)
);

create index if not exists idx_skills_xp_events_user_created
   on public.skills_xp_events (user_id, created_at desc);

create index if not exists idx_skills_xp_events_module_created
   on public.skills_xp_events (module_id, created_at desc);

-- 3) Per-lesson progress
create table if not exists public.skills_progress (
   id uuid primary key default gen_random_uuid(),
   user_id uuid not null references auth.users(id) on delete cascade,
   module_id text not null,
   lesson_id text not null,
   status text not null check (status in ('not_started','in_progress','completed','mastered')),
   best_score numeric null,
   latest_score numeric null,
   best_accuracy numeric null,
   latest_accuracy numeric null,
   attempt_count int not null default 1,
   total_duration_ms bigint not null default 0,
   max_combo int null,
   mistake_count int null,
   completed_at timestamptz null,
   metadata jsonb not null default '{}'::jsonb,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now(),
   constraint uq_skills_progress_user_module_lesson unique (user_id, module_id, lesson_id)
);

create index if not exists idx_skills_progress_user_module
   on public.skills_progress (user_id, module_id);

create index if not exists idx_skills_progress_user_status
   on public.skills_progress (user_id, status);

-- 4) Updated-at trigger helper
create or replace function public.set_updated_at_timestamp()
returns trigger
language plpgsql
as $$
begin
   new.updated_at = now();
   return new;
end;
$$;

drop trigger if exists trg_skills_module_catalog_updated_at on public.skills_module_catalog;
create trigger trg_skills_module_catalog_updated_at
before update on public.skills_module_catalog
for each row
execute function public.set_updated_at_timestamp();

drop trigger if exists trg_skills_progress_updated_at on public.skills_progress;
create trigger trg_skills_progress_updated_at
before update on public.skills_progress
for each row
execute function public.set_updated_at_timestamp();

-- 5) RLS enablement
alter table public.skills_module_catalog enable row level security;
alter table public.skills_xp_events enable row level security;
alter table public.skills_progress enable row level security;

-- 6) RLS policies: module catalog read-only for app users
drop policy if exists "skills_module_catalog_select" on public.skills_module_catalog;
create policy "skills_module_catalog_select"
on public.skills_module_catalog
for select
to anon, authenticated
using (is_active = true);

-- No direct client writes for module catalog
drop policy if exists "skills_module_catalog_no_write" on public.skills_module_catalog;
create policy "skills_module_catalog_no_write"
on public.skills_module_catalog
for all
to anon, authenticated
using (false)
with check (false);

-- 7) RLS policies: student owns own XP events
drop policy if exists "skills_xp_events_select_own" on public.skills_xp_events;
create policy "skills_xp_events_select_own"
on public.skills_xp_events
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "skills_xp_events_insert_own" on public.skills_xp_events;
create policy "skills_xp_events_insert_own"
on public.skills_xp_events
for insert
to authenticated
with check (auth.uid() = user_id);

-- Prevent direct update/delete from clients (server route with service role handles any mutations)
drop policy if exists "skills_xp_events_no_update_delete" on public.skills_xp_events;
create policy "skills_xp_events_no_update_delete"
on public.skills_xp_events
for update
to authenticated
using (false)
with check (false);

drop policy if exists "skills_xp_events_no_delete" on public.skills_xp_events;
create policy "skills_xp_events_no_delete"
on public.skills_xp_events
for delete
to authenticated
using (false);

-- 8) RLS policies: student owns own progress
drop policy if exists "skills_progress_select_own" on public.skills_progress;
create policy "skills_progress_select_own"
on public.skills_progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "skills_progress_insert_own" on public.skills_progress;
create policy "skills_progress_insert_own"
on public.skills_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "skills_progress_update_own" on public.skills_progress;
create policy "skills_progress_update_own"
on public.skills_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "skills_progress_no_delete" on public.skills_progress;
create policy "skills_progress_no_delete"
on public.skills_progress
for delete
to authenticated
using (false);

-- 9) Seed module catalog examples
insert into public.skills_module_catalog (module_id, title, category, difficulty_min, difficulty_max, nominal_xp_min, nominal_xp_max)
values
   ('keyboard_basics_v1', 'Keyboard Basics', 'keyboard', 'easy', 'medium', 10, 40),
   ('mouse_precision_v1', 'Mouse Precision', 'mouse', 'easy', 'hard', 10, 45)
on conflict (module_id) do update
set title = excluded.title,
      category = excluded.category,
      difficulty_min = excluded.difficulty_min,
      difficulty_max = excluded.difficulty_max,
      nominal_xp_min = excluded.nominal_xp_min,
      nominal_xp_max = excluded.nominal_xp_max,
      updated_at = now();

commit;
```

### Post-migration verification checklist
- Confirm all 3 tables show `RLS enabled` in Supabase table editor.
- Confirm policy list exists for each table.
- Execute a test as authenticated student: can read/write own progress, cannot access another user’s rows.
- Verify duplicate `idempotency_key` fails with unique constraint.

---

## Appendix B: API Route Stub Templates (Next.js App Router)

> Place under `src/app/api/skills/...`.
> These templates align with existing repo patterns (`getRouteUserContext`, role checks, normalized JSON responses).

## 1) `POST /api/skills/xp-events`

**File:** `src/app/api/skills/xp-events/route.js`

```javascript
import { NextResponse } from 'next/server';
import { getRouteUserContext } from '@/lib/supabaseRouteClient';

function validateXpPayload(payload) {
   const errors = [];
   if (!payload?.moduleId) errors.push('moduleId is required');
   if (!payload?.activityType) errors.push('activityType is required');
   if (!payload?.idempotencyKey) errors.push('idempotencyKey is required');
   return errors;
}

function computeAwardedXp(payload) {
   const proposed = Number(payload?.xpProposed ?? 0);
   if (!Number.isFinite(proposed)) return 0;
   return Math.max(0, Math.min(100, Math.round(proposed)));
}

export async function POST(request) {
   try {
      const context = await getRouteUserContext({ allowedRoles: ['student'], request });
      if (context.error) {
         return NextResponse.json({ success: false, error: context.error.message }, { status: context.error.status });
      }

      const { supabase, user, supabaseAdmin } = context;
      const writer = supabaseAdmin ?? supabase;
      const body = await request.json();

      const validationErrors = validateXpPayload(body);
      if (validationErrors.length > 0) {
         return NextResponse.json({ success: false, error: validationErrors.join(', ') }, { status: 400 });
      }

      const awardedXp = computeAwardedXp(body);

      const insertPayload = {
         user_id: user.id,
         module_id: body.moduleId,
         lesson_id: body.lessonId || null,
         activity_type: body.activityType,
         score: body.score ?? null,
         accuracy: body.accuracy ?? null,
         duration_ms: body.durationMs ?? null,
         attempt: body.attempt ?? null,
         difficulty: body.difficulty ?? null,
         xp_proposed: body.xpProposed ?? null,
         awarded_xp: awardedXp,
         source: 'skills_module',
         session_id: body.sessionId || null,
         idempotency_key: body.idempotencyKey,
         metadata: body.metadata || {},
      };

      const { data: inserted, error: insertError } = await writer
         .from('skills_xp_events')
         .insert(insertPayload)
         .select('id, awarded_xp, created_at')
         .single();

      if (insertError) {
         // Idempotency collision path: return previously created event
         if (insertError.code === '23505') {
            const { data: existing, error: existingError } = await writer
               .from('skills_xp_events')
               .select('id, awarded_xp, created_at')
               .eq('idempotency_key', body.idempotencyKey)
               .eq('user_id', user.id)
               .single();

            if (existingError || !existing) {
               return NextResponse.json({ success: false, error: 'Duplicate submission could not be resolved' }, { status: 409 });
            }

            return NextResponse.json({
               success: true,
               duplicate: true,
               eventId: existing.id,
               awardedXp: existing.awarded_xp,
               createdAt: existing.created_at,
            });
         }

         console.error('[skills/xp-events] insert error', insertError);
         return NextResponse.json({ success: false, error: 'Failed to record XP event' }, { status: 500 });
      }

      // Optional: mirror into existing xp_log table for platform-wide XP surfaces
      // await writer.from('xp_log').insert({ student_id: user.id, xp_value: awardedXp, source: 'skills_module' });

      return NextResponse.json({
         success: true,
         duplicate: false,
         eventId: inserted.id,
         awardedXp: inserted.awarded_xp,
         createdAt: inserted.created_at,
         newRewards: [],
      });
   } catch (error) {
      console.error('[skills/xp-events] unexpected error', error);
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
   }
}
```

## 2) `POST` + `GET /api/skills/progress`

**File:** `src/app/api/skills/progress/route.js`

```javascript
import { NextResponse } from 'next/server';
import { getRouteUserContext } from '@/lib/supabaseRouteClient';

const ALLOWED_STATUS = new Set(['not_started', 'in_progress', 'completed', 'mastered']);

function normalizeStatus(value) {
   const status = String(value || '').toLowerCase().trim();
   return ALLOWED_STATUS.has(status) ? status : 'in_progress';
}

export async function POST(request) {
   try {
      const context = await getRouteUserContext({ allowedRoles: ['student'], request });
      if (context.error) {
         return NextResponse.json({ success: false, error: context.error.message }, { status: context.error.status });
      }

      const { supabase, user, supabaseAdmin } = context;
      const writer = supabaseAdmin ?? supabase;
      const body = await request.json();

      if (!body?.moduleId || !body?.lessonId) {
         return NextResponse.json({ success: false, error: 'moduleId and lessonId are required' }, { status: 400 });
      }

      const payload = {
         user_id: user.id,
         module_id: body.moduleId,
         lesson_id: body.lessonId,
         status: normalizeStatus(body.status),
         latest_score: body.score ?? null,
         latest_accuracy: body.accuracy ?? null,
         best_score: body.score ?? null,
         best_accuracy: body.accuracy ?? null,
         attempt_count: Math.max(1, Number(body.attempt ?? 1)),
         total_duration_ms: Math.max(0, Number(body.durationMs ?? 0)),
         max_combo: body.maxCombo ?? null,
         mistake_count: body.mistakeCount ?? null,
         completed_at: body.completedAt ?? null,
         metadata: body.metadata || {},
      };

      const { data, error } = await writer
         .from('skills_progress')
         .upsert(payload, { onConflict: 'user_id,module_id,lesson_id' })
         .select('*')
         .single();

      if (error) {
         console.error('[skills/progress] upsert error', error);
         return NextResponse.json({ success: false, error: 'Failed to upsert progress' }, { status: 500 });
      }

      return NextResponse.json({ success: true, progress: data });
   } catch (error) {
      console.error('[skills/progress] POST unexpected error', error);
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
   }
}

export async function GET(request) {
   try {
      const context = await getRouteUserContext({ allowedRoles: ['student'], request });
      if (context.error) {
         return NextResponse.json({ success: false, error: context.error.message }, { status: context.error.status });
      }

      const { supabase, user } = context;
      const { searchParams } = new URL(request.url);
      const moduleId = searchParams.get('moduleId');

      let query = supabase
         .from('skills_progress')
         .select('*')
         .eq('user_id', user.id)
         .order('updated_at', { ascending: false });

      if (moduleId) {
         query = query.eq('module_id', moduleId);
      }

      const { data, error } = await query;
      if (error) {
         console.error('[skills/progress] GET error', error);
         return NextResponse.json({ success: false, error: 'Failed to load progress' }, { status: 500 });
      }

      return NextResponse.json({ success: true, progress: data || [] });
   } catch (error) {
      console.error('[skills/progress] GET unexpected error', error);
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
   }
}
```

## 3) `GET /api/skills/rewards`

**File:** `src/app/api/skills/rewards/route.js`

```javascript
import { NextResponse } from 'next/server';
import { getRouteUserContext } from '@/lib/supabaseRouteClient';

export async function GET(request) {
   try {
      const context = await getRouteUserContext({ allowedRoles: ['student'], request });
      if (context.error) {
         return NextResponse.json({ success: false, error: context.error.message }, { status: context.error.status });
      }

      const { supabase, user } = context;

      const [xpEventsResult, rewardsResult] = await Promise.all([
         supabase
            .from('skills_xp_events')
            .select('awarded_xp, created_at, module_id, activity_type')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(200),
         supabase
            .from('student_rewards')
            .select('id, reward_type, reward_name, reward_description, earned_at')
            .eq('student_id', user.id)
            .order('earned_at', { ascending: false })
            .limit(50),
      ]);

      if (xpEventsResult.error) {
         console.error('[skills/rewards] xp query error', xpEventsResult.error);
         return NextResponse.json({ success: false, error: 'Failed to load skills XP summary' }, { status: 500 });
      }

      const xpEvents = xpEventsResult.data || [];
      const skillsXpTotal = xpEvents.reduce((sum, row) => sum + Number(row.awarded_xp || 0), 0);

      return NextResponse.json({
         success: true,
         skillsXp: {
            total: skillsXpTotal,
            recentEvents: xpEvents.slice(0, 20),
         },
         rewards: rewardsResult.data || [],
      });
   } catch (error) {
      console.error('[skills/rewards] unexpected error', error);
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
   }
}
```

---

## Appendix C: Minimal Validator Shapes (Optional)

If you want runtime validation beyond manual checks, use a schema validator (e.g., `zod`) and place schemas in:

- `src/lib/skills/schemas.ts` (or `.js`)

Suggested schema names:
- `skillsXpEventSchema`
- `skillsProgressUpsertSchema`
- `skillsProgressQuerySchema`

---

## Appendix D: Integration Sequence for External Team

1. External module emits contract payloads only (no direct DB assumptions).
2. Main app receives via `/api/skills/*` routes.
3. Route validates + resolves `user_id` from auth context.
4. Route writes to `skills_progress` / `skills_xp_events`.
5. Rewards/XP rollups become available on `/dashboard/student/skills`.
6. External UI reads progress/rewards through route contracts.

This preserves security boundaries and minimizes rework during merge.
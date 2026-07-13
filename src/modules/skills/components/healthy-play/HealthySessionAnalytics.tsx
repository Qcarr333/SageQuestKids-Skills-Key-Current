'use client';

import React, { useMemo } from 'react';
import {
  type HealthyPlayActivityType,
  type HealthyPlayBreakStatus,
  type HealthyPlayCalmModeStatus,
  type HealthyPlayReminderStatus,
  type HealthyPlaySaveStatus,
  type HealthyPlaySessionState,
  type HealthyPlaySessionStatus,
  type HealthyPlayXPEfficiencyStatus,
  useHealthyPlay,
} from './HealthyPlayProvider';

/**
 * HealthySessionAnalytics
 *
 * Initial scope:
 * - /skills games only
 * - child-safe local session summary
 * - private healthy rhythm metrics
 * - active time vs idle time
 * - break count
 * - Calm Mode status
 * - XP efficiency status
 * - save/sync status
 *
 * This component is NOT:
 * - a production analytics dashboard
 * - a surveillance tool
 * - a parent dashboard
 * - a teacher dashboard
 * - a classroom roster
 * - a leaderboard
 * - a ranking report
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type HealthySessionAnalyticsMode =
  | 'logic-only'
  | 'compact-panel'
  | 'full-panel';

export type HealthySessionAnalyticsProps = {
  mode?: HealthySessionAnalyticsMode;
  className?: string;

  /**
   * Optional callback for routing derived analytics to parent components.
   * Keep this child-safe and private.
   */
  onAnalyticsChange?: (analytics: HealthySessionAnalyticsSnapshot) => void;

  /**
   * Show low-level state fields. Useful during development, but avoid exposing
   * raw state to young students unless it is simplified.
   */
  showDebugFields?: boolean;

  /**
   * Optional externally supplied activity counts from a game.
   * SessionTracker handles browser-level events; games can provide semantic counts here.
   */
  activityCounts?: Partial<Record<HealthyPlayActivityType, number>>;
};

export type HealthySessionAnalyticsSnapshot = {
  sessionId: string;
  currentModule: 'skills';
  currentGameKey?: string;

  activeTimeSeconds: number;
  idleTimeSeconds: number;
  dailyActiveSeconds: number;
  currentGameActiveSeconds: number;

  activeMinutes: number;
  idleMinutes: number;
  activeTimeLabel: string;
  idleTimeLabel: string;
  currentGameTimeLabel: string;

  activeRatio: number;
  idleRatio: number;

  breakCount: number;
  breakStatus: HealthyPlayBreakStatus;
  breakStatusLabel: string;
  lastBreakLabel: string;

  sessionStatus: HealthyPlaySessionStatus;
  sessionStatusLabel: string;

  reminderStatus: HealthyPlayReminderStatus;
  reminderStatusLabel: string;

  calmModeStatus: HealthyPlayCalmModeStatus;
  calmModeLabel: string;

  xpEfficiencyStatus: HealthyPlayXPEfficiencyStatus;
  xpEfficiencyLabel: string;
  xpEfficiencyMultiplier: number;

  saveStatus: HealthyPlaySaveStatus;
  saveStatusLabel: string;
  progressProtectionLabel: string;

  healthyRhythmStatus:
    | 'healthy'
    | 'nearing_break'
    | 'break_suggested'
    | 'restored'
    | 'extended_session';

  healthyRhythmLabel: string;
  healthyRhythmMessage: string;

  activityCounts: Partial<Record<HealthyPlayActivityType, number>>;
};

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  if (minutes <= 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;

  return `${minutes}m ${seconds}s`;
}

function formatClock(iso?: string) {
  if (!iso) return 'Not yet';

  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return 'Recently';
  }
}

function toRatio(part: number, total: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(1, part / total));
}

function getSessionStatusLabel(status: HealthyPlaySessionStatus) {
  switch (status) {
    case 'active':
      return 'Active learning';
    case 'idle':
      return 'Idle paused';
    case 'paused':
      return 'Paused';
    case 'in_break':
      return 'In a break';
    case 'summary':
      return 'Summary';
    case 'exited':
      return 'Exited';
    default:
      return 'Ready';
  }
}

function getReminderStatusLabel(status: HealthyPlayReminderStatus) {
  switch (status) {
    case 'queued':
      return 'Reminder queued';
    case 'visible':
      return 'Reminder visible';
    case 'dismissed':
      return 'Reminder dismissed';
    case 'snoozed':
      return 'Reminder snoozed';
    case 'accepted_break':
      return 'Break selected';
    case 'idle':
    default:
      return 'No reminder active';
  }
}

function getBreakStatusLabel(status: HealthyPlayBreakStatus) {
  switch (status) {
    case 'suggested':
      return 'Break suggested';
    case 'started':
      return 'Break started';
    case 'in_progress':
      return 'Break in progress';
    case 'complete':
      return 'Break complete';
    case 'resumed':
      return 'Back to learning';
    case 'none':
    default:
      return 'No break active';
  }
}

function getCalmModeLabel(status: HealthyPlayCalmModeStatus) {
  switch (status) {
    case 'active':
      return 'Calm Mode active';
    case 'suggested':
      return 'Calm Mode suggested';
    case 'off':
    default:
      return 'Calm Mode off';
  }
}

function getXPEfficiencyLabel(status: HealthyPlayXPEfficiencyStatus) {
  switch (status) {
    case 'gentle_slowdown':
      return 'Gentle slowdown';
    case 'long_session_slowdown':
      return 'Long-session slowdown';
    case 'extended_session':
      return 'Extended session';
    case 'restored_after_break':
      return 'Restored after break';
    case 'normal':
    default:
      return 'Normal';
  }
}

function getSaveStatusLabel(status: HealthyPlaySaveStatus) {
  switch (status) {
    case 'saving':
      return 'Saving';
    case 'saved':
      return 'Saved';
    case 'sync_later':
      return 'Sync later';
    case 'retrying':
      return 'Retrying';
    case 'failed_soft':
      return 'Protected locally';
    case 'idle':
    default:
      return 'Ready';
  }
}

function getProgressProtectionLabel(status: HealthyPlaySaveStatus) {
  switch (status) {
    case 'saved':
      return 'Progress saved';
    case 'sync_later':
      return 'Progress will sync when available';
    case 'retrying':
      return 'Retrying quietly';
    case 'failed_soft':
      return 'Progress is safe locally';
    case 'saving':
      return 'Saving quietly';
    case 'idle':
    default:
      return 'Progress protection ready';
  }
}

function getHealthyRhythm(
  state: HealthyPlaySessionState,
): Pick<
  HealthySessionAnalyticsSnapshot,
  'healthyRhythmStatus' | 'healthyRhythmLabel' | 'healthyRhythmMessage'
> {
  const activeMinutes = state.activeTimeSeconds / 60;

  if (state.xpEfficiencyStatus === 'restored_after_break') {
    return {
      healthyRhythmStatus: 'restored',
      healthyRhythmLabel: 'Rhythm restored',
      healthyRhythmMessage:
        'Nice reset. Breaks help your brain and body stay ready for learning.',
    };
  }

  if (activeMinutes >= 60 || state.xpEfficiencyStatus === 'extended_session') {
    return {
      healthyRhythmStatus: 'extended_session',
      healthyRhythmLabel: 'Extended session',
      healthyRhythmMessage:
        'You have practiced for a long time. A break or a different activity can help.',
    };
  }

  if (
    activeMinutes >= 30 ||
    state.breakStatus === 'suggested' ||
    state.xpEfficiencyStatus === 'long_session_slowdown'
  ) {
    return {
      healthyRhythmStatus: 'break_suggested',
      healthyRhythmLabel: 'Break suggested',
      healthyRhythmMessage:
        'A short stretch, water break, or eye rest can help your learning rhythm.',
    };
  }

  if (
    activeMinutes >= 20 ||
    state.xpEfficiencyStatus === 'gentle_slowdown'
  ) {
    return {
      healthyRhythmStatus: 'nearing_break',
      healthyRhythmLabel: 'Good time for balance',
      healthyRhythmMessage:
        'You are doing well. A gentle reminder may appear soon.',
    };
  }

  return {
    healthyRhythmStatus: 'healthy',
    healthyRhythmLabel: 'Healthy rhythm',
    healthyRhythmMessage:
      'Your learning rhythm looks balanced. Keep going at your pace.',
  };
}

export function buildHealthySessionAnalyticsSnapshot(
  state: HealthyPlaySessionState,
  activityCounts: Partial<Record<HealthyPlayActivityType, number>> = {},
): HealthySessionAnalyticsSnapshot {
  const totalObservedSeconds = state.activeTimeSeconds + state.idleTimeSeconds;
  const rhythm = getHealthyRhythm(state);

  return {
    sessionId: state.sessionId,
    currentModule: state.currentModule,
    currentGameKey: state.currentGameKey,

    activeTimeSeconds: state.activeTimeSeconds,
    idleTimeSeconds: state.idleTimeSeconds,
    dailyActiveSeconds: state.dailyActiveSeconds,
    currentGameActiveSeconds: state.currentGameActiveSeconds,

    activeMinutes: state.activeTimeSeconds / 60,
    idleMinutes: state.idleTimeSeconds / 60,
    activeTimeLabel: formatDuration(state.activeTimeSeconds),
    idleTimeLabel: formatDuration(state.idleTimeSeconds),
    currentGameTimeLabel: formatDuration(state.currentGameActiveSeconds),

    activeRatio: toRatio(state.activeTimeSeconds, totalObservedSeconds),
    idleRatio: toRatio(state.idleTimeSeconds, totalObservedSeconds),

    breakCount: state.breakCount,
    breakStatus: state.breakStatus,
    breakStatusLabel: getBreakStatusLabel(state.breakStatus),
    lastBreakLabel: formatClock(state.lastBreakAt),

    sessionStatus: state.sessionStatus,
    sessionStatusLabel: getSessionStatusLabel(state.sessionStatus),

    reminderStatus: state.reminderStatus,
    reminderStatusLabel: getReminderStatusLabel(state.reminderStatus),

    calmModeStatus: state.calmModeStatus,
    calmModeLabel: getCalmModeLabel(state.calmModeStatus),

    xpEfficiencyStatus: state.xpEfficiencyStatus,
    xpEfficiencyLabel: getXPEfficiencyLabel(state.xpEfficiencyStatus),
    xpEfficiencyMultiplier: state.xpEfficiencyMultiplier,

    saveStatus: state.saveStatus,
    saveStatusLabel: getSaveStatusLabel(state.saveStatus),
    progressProtectionLabel: getProgressProtectionLabel(state.saveStatus),

    healthyRhythmStatus: rhythm.healthyRhythmStatus,
    healthyRhythmLabel: rhythm.healthyRhythmLabel,
    healthyRhythmMessage: rhythm.healthyRhythmMessage,

    activityCounts,
  };
}

function StatCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-2xl shadow-sm"
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-600">{label}</p>
          <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{helper}</p>
        </div>
      </div>
    </article>
  );
}

function RatioBar({
  activeRatio,
  idleRatio,
}: {
  activeRatio: number;
  idleRatio: number;
}) {
  const activePercent = Math.round(activeRatio * 100);
  const idlePercent = Math.round(idleRatio * 100);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm font-bold text-slate-700">
        <span>Active vs idle</span>
        <span>{activePercent}% active</span>
      </div>

      <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-slate-100">
        <div
          className="bg-teal-600 transition-all"
          style={{ width: `${activePercent}%` }}
          aria-label={`${activePercent}% active time`}
        />
        <div
          className="bg-slate-300 transition-all"
          style={{ width: `${idlePercent}%` }}
          aria-label={`${idlePercent}% idle time`}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500">
        <span>Active learning counts</span>
        <span>Idle time pauses</span>
      </div>
    </div>
  );
}

function ActivityCountsList({
  activityCounts,
}: {
  activityCounts: Partial<Record<HealthyPlayActivityType, number>>;
}) {
  const entries = Object.entries(activityCounts).filter(([, value]) => Number(value) > 0);

  if (entries.length === 0) {
    return (
      <p className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-600">
        No detailed activity counts have been provided by this game yet.
      </p>
    );
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {entries.map(([activityType, count]) => (
        <div
          key={activityType}
          className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm"
        >
          <span className="font-bold text-slate-700">
            {activityType.replaceAll('_', ' ')}
          </span>
          <span className="font-black text-slate-950">{count}</span>
        </div>
      ))}
    </div>
  );
}

function GuardrailNote() {
  return (
    <aside className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-950 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-amber-700">
        Privacy + Trust
      </p>
      <p className="mt-1 text-sm leading-relaxed">
        Healthy Session Analytics is a private wellness summary. Do not use it for
        classroom rosters, rankings, public leaderboards, surveillance feeds, shame
        scores, or public comparison.
      </p>
    </aside>
  );
}

export function HealthySessionAnalytics({
  mode = 'compact-panel',
  className,
  onAnalyticsChange,
  showDebugFields = false,
  activityCounts = {},
}: HealthySessionAnalyticsProps) {
  const healthyPlay = useHealthyPlay();
  const { state, accessibilitySettings } = healthyPlay;

  const analytics = useMemo(() => {
    return buildHealthySessionAnalyticsSnapshot(state, activityCounts);
  }, [activityCounts, state]);

  React.useEffect(() => {
    onAnalyticsChange?.(analytics);
  }, [analytics, onAnalyticsChange]);

  if (mode === 'logic-only') return null;

  const isFull = mode === 'full-panel';

  return (
    <section
      className={[
        'rounded-[2rem] border border-slate-200 bg-slate-50 p-5 text-slate-950 shadow-xl',
        accessibilitySettings.highContrast ? 'border-2 border-slate-950' : '',
        accessibilitySettings.largerText ? 'text-lg' : '',
        className ?? '',
      ].join(' ')}
      aria-labelledby="healthy-session-analytics-title"
    >
      <header className="rounded-[1.75rem] bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-wide text-teal-700">
          Healthy Play
        </p>
        <h2
          id="healthy-session-analytics-title"
          className="mt-1 text-2xl font-black text-slate-950"
        >
          Healthy Session Analytics
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          A private, child-safe view of active learning, idle time, breaks, rhythm,
          Calm Mode, XP efficiency, and progress protection for the current Skills
          session.
        </p>
      </header>

      <div className="mt-5 rounded-[2rem] border border-teal-200 bg-teal-50 p-5 text-teal-950 shadow-sm">
        <div className="flex gap-4">
          <div
            aria-hidden="true"
            className={[
              'flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/80 text-3xl shadow-sm',
              accessibilitySettings.reducedMotion ? '' : 'animate-pulse',
            ].join(' ')}
          >
            {analytics.healthyRhythmStatus === 'restored' ? '🌤️' : '🌿'}
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-wide opacity-75">
              Healthy Rhythm
            </p>
            <h3 className="mt-1 text-xl font-black">
              {analytics.healthyRhythmLabel}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed opacity-85">
              {analytics.healthyRhythmMessage}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon="⏱️"
          label="Active learning"
          value={analytics.activeTimeLabel}
          helper="Only active Skills engagement counts."
        />
        <StatCard
          icon="⏸️"
          label="Idle excluded"
          value={analytics.idleTimeLabel}
          helper="Idle time pauses and does not pressure XP."
        />
        <StatCard
          icon="🎮"
          label="Current game time"
          value={analytics.currentGameTimeLabel}
          helper={analytics.currentGameKey ?? 'Current Skills game'}
        />
        <StatCard
          icon="🌿"
          label="Breaks taken"
          value={String(analytics.breakCount)}
          helper={`Break state: ${analytics.breakStatusLabel}`}
        />
        <StatCard
          icon="🌱"
          label="XP efficiency"
          value={analytics.xpEfficiencyLabel}
          helper={`${Math.round(analytics.xpEfficiencyMultiplier * 100)}% future XP efficiency`}
        />
        <StatCard
          icon="☁️"
          label="Progress"
          value={analytics.saveStatusLabel}
          helper={analytics.progressProtectionLabel}
        />
      </div>

      <div className="mt-5">
        <RatioBar
          activeRatio={analytics.activeRatio}
          idleRatio={analytics.idleRatio}
        />
      </div>

      {isFull && (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black">Activity counts</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Optional semantic activity counts reported by the current Skills game.
            </p>
            <div className="mt-4">
              <ActivityCountsList activityCounts={analytics.activityCounts} />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black">State recap</h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-3">
                <dt className="font-bold text-slate-600">Session</dt>
                <dd className="mt-1 font-black">{analytics.sessionStatusLabel}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <dt className="font-bold text-slate-600">Reminder</dt>
                <dd className="mt-1 font-black">{analytics.reminderStatusLabel}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <dt className="font-bold text-slate-600">Calm Mode</dt>
                <dd className="mt-1 font-black">{analytics.calmModeLabel}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <dt className="font-bold text-slate-600">Last break</dt>
                <dd className="mt-1 font-black">{analytics.lastBreakLabel}</dd>
              </div>
            </dl>
          </section>
        </div>
      )}

      {showDebugFields && (
        <details className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <summary className="cursor-pointer text-sm font-black text-slate-800">
            Developer state snapshot
          </summary>
          <pre className="mt-4 max-h-80 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-50">
            {JSON.stringify(analytics, null, 2)}
          </pre>
        </details>
      )}

      <div className="mt-5">
        <GuardrailNote />
      </div>
    </section>
  );
}

export default HealthySessionAnalytics;

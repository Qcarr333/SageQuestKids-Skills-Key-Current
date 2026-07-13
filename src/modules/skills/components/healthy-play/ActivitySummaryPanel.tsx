'use client';

import React, { useMemo } from 'react';
import {
  HEALTHY_PLAY_BUTTON_TEXT,
  type HealthyPlayBreakStatus,
  type HealthyPlayXPEfficiencyStatus,
  useHealthyPlay,
} from './HealthyPlayProvider';

/**
 * ActivitySummaryPanel
 *
 * Initial scope:
 * - /skills games only
 * - child-facing Healthy Play summary
 * - active learning recap
 * - breaks taken
 * - XP efficiency status
 * - progress protected / save status
 * - accessibility-aware presentation
 *
 * This panel should feel reflective, private, and supportive.
 * It is not a leaderboard, ranking, score report, classroom report, or parent dashboard.
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type ActivitySummaryPanelProps = {
  /**
   * Optional visible flag so parent screens can mount it conditionally.
   */
  visible?: boolean;

  /**
   * Optional className for the outer card.
   */
  className?: string;

  /**
   * Optional close behavior when this is rendered inside a modal/sheet.
   */
  onClose?: () => void;

  /**
   * Optional title override.
   */
  title?: string;

  /**
   * Optional subtitle override.
   */
  subtitle?: string;

  /**
   * Whether to show the detailed timing section.
   */
  showDetails?: boolean;

  /**
   * Whether to show the route action buttons.
   */
  showActions?: boolean;
};

type SummaryTone = 'healthy' | 'break' | 'calm' | 'xp' | 'save' | 'neutral';

type SummaryItem = {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: SummaryTone;
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

function getBreakLabel(status: HealthyPlayBreakStatus) {
  switch (status) {
    case 'started':
      return 'Break started';
    case 'in_progress':
      return 'Break in progress';
    case 'complete':
      return 'Break complete';
    case 'resumed':
      return 'Back to learning';
    case 'suggested':
      return 'Break suggested';
    case 'none':
    default:
      return 'No break active';
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

function getXPEfficiencyHelper(status: HealthyPlayXPEfficiencyStatus) {
  switch (status) {
    case 'gentle_slowdown':
      return 'XP gently slows during longer sessions. Breaks help your learning rhythm.';
    case 'long_session_slowdown':
      return 'You have practiced for a while. A break can help restore a healthy rhythm.';
    case 'extended_session':
      return 'Long sessions earn less future XP. Already-earned XP is safe.';
    case 'restored_after_break':
      return 'Nice reset. Your healthy rhythm is restored.';
    case 'normal':
    default:
      return 'Your current learning rhythm is healthy.';
  }
}

function getSaveLabel(saveStatus: string) {
  switch (saveStatus) {
    case 'saving':
      return 'Saving...';
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

function getSaveHelper(saveStatus: string) {
  switch (saveStatus) {
    case 'saving':
      return 'Progress is being saved quietly.';
    case 'saved':
      return 'Progress saved.';
    case 'sync_later':
      return 'Progress will sync when available.';
    case 'retrying':
      return 'Healthy Play is retrying quietly.';
    case 'failed_soft':
      return 'Progress is safe locally.';
    case 'idle':
    default:
      return 'Progress protection is available.';
  }
}

function getToneClasses(tone: SummaryTone) {
  switch (tone) {
    case 'healthy':
      return 'border-emerald-200 bg-emerald-50 text-emerald-950';
    case 'break':
      return 'border-teal-200 bg-teal-50 text-teal-950';
    case 'calm':
      return 'border-indigo-200 bg-indigo-50 text-indigo-950';
    case 'xp':
      return 'border-sky-200 bg-sky-50 text-sky-950';
    case 'save':
      return 'border-cyan-200 bg-cyan-50 text-cyan-950';
    case 'neutral':
    default:
      return 'border-slate-200 bg-slate-50 text-slate-950';
  }
}

function SummaryStatCard({ item }: { item: SummaryItem }) {
  return (
    <article
      className={[
        'rounded-3xl border p-4 shadow-sm',
        getToneClasses(item.tone),
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm"
        >
          {item.icon}
        </div>

        <div>
          <p className="text-sm font-bold opacity-75">{item.label}</p>
          <p className="mt-1 text-xl font-black leading-tight">{item.value}</p>
          <p className="mt-1 text-sm leading-relaxed opacity-80">{item.helper}</p>
        </div>
      </div>
    </article>
  );
}

type SummaryButtonProps = {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost';
};

function SummaryButton({
  children,
  onClick,
  variant = 'secondary',
}: SummaryButtonProps) {
  const variantClasses =
    variant === 'primary'
      ? 'bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500'
      : variant === 'ghost'
        ? 'bg-transparent text-slate-700 hover:bg-white/60 focus-visible:ring-slate-400'
        : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full px-4 py-2 text-sm font-bold shadow-sm transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variantClasses,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function HealthyRhythmMessage({
  xpStatus,
  breakCount,
  activeTimeSeconds,
}: {
  xpStatus: HealthyPlayXPEfficiencyStatus;
  breakCount: number;
  activeTimeSeconds: number;
}) {
  const activeMinutes = activeTimeSeconds / 60;

  let title = 'Healthy rhythm';
  let body = 'Nice work. Your progress is protected, and you can keep learning at your pace.';
  let icon = '🌿';

  if (xpStatus === 'restored_after_break') {
    title = 'Rhythm restored';
    body = 'Great reset. Breaks help your brain and body stay ready for learning.';
    icon = '🌤️';
  } else if (activeMinutes >= 60) {
    title = 'Long learning session';
    body = 'You have practiced for a long time. Trying a break or something different can help.';
    icon = '🧭';
  } else if (activeMinutes >= 30) {
    title = 'Good time for balance';
    body = 'You are doing well. A quick stretch, water break, or eye rest can help.';
    icon = '💧';
  } else if (breakCount > 0) {
    title = 'Nice balance';
    body = 'You practiced and made room for a healthy break.';
    icon = '🌱';
  }

  return (
    <section className="rounded-[2rem] border border-teal-200 bg-white/80 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-teal-50 text-3xl shadow-sm"
        >
          {icon}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-wide text-teal-700">
            Healthy Play Summary
          </p>
          <h3 className="mt-1 text-xl font-black text-slate-950">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-700">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ActivitySummaryPanel({
  visible = true,
  className,
  onClose,
  title = 'Your Healthy Play Summary',
  subtitle = 'A private recap of your Skills practice and healthy learning rhythm.',
  showDetails = true,
  showActions = true,
}: ActivitySummaryPanelProps) {
  const healthyPlay = useHealthyPlay();
  const { state, accessibilitySettings } = healthyPlay;

  const summaryItems = useMemo<SummaryItem[]>(() => {
    return [
      {
        label: 'Active learning',
        value: formatDuration(state.activeTimeSeconds),
        helper: 'Only active Skills practice counts.',
        icon: '⏱️',
        tone: 'healthy',
      },
      {
        label: 'Breaks taken',
        value: String(state.breakCount),
        helper:
          state.breakCount > 0
            ? `Last break: ${formatClock(state.lastBreakAt)}`
            : 'Breaks are available when you need them.',
        icon: '🌿',
        tone: 'break',
      },
      {
        label: 'Current break state',
        value: getBreakLabel(state.breakStatus),
        helper: 'Breaks preserve your game state.',
        icon: '🧘',
        tone: 'break',
      },
      {
        label: 'XP efficiency',
        value: getXPEfficiencyLabel(state.xpEfficiencyStatus),
        helper: getXPEfficiencyHelper(state.xpEfficiencyStatus),
        icon: '🌱',
        tone: 'xp',
      },
      {
        label: 'Calm Mode',
        value:
          state.calmModeStatus === 'active'
            ? 'Active'
            : state.calmModeStatus === 'suggested'
              ? 'Suggested'
              : 'Off',
        helper: 'Calm Mode changes presentation, not progress.',
        icon: '🌙',
        tone: 'calm',
      },
      {
        label: 'Progress',
        value: getSaveLabel(state.saveStatus),
        helper: getSaveHelper(state.saveStatus),
        icon: '☁️',
        tone: 'save',
      },
    ];
  }, [
    state.activeTimeSeconds,
    state.breakCount,
    state.breakStatus,
    state.calmModeStatus,
    state.lastBreakAt,
    state.saveStatus,
    state.xpEfficiencyStatus,
  ]);

  if (!visible) return null;

  return (
    <section
      className={[
        'rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur',
        accessibilitySettings.highContrast ? 'border-2 border-slate-950' : '',
        accessibilitySettings.largerText ? 'text-lg' : '',
        className ?? '',
      ].join(' ')}
      aria-labelledby="healthy-play-summary-title"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-teal-700">
            Healthy Play
          </p>
          <h2
            id="healthy-play-summary-title"
            className="mt-1 text-2xl font-black leading-tight text-slate-950"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">
            {subtitle}
          </p>
        </div>

        {onClose && (
          <SummaryButton variant="ghost" onClick={onClose}>
            {HEALTHY_PLAY_BUTTON_TEXT.done}
          </SummaryButton>
        )}
      </header>

      <div className="mt-5">
        <HealthyRhythmMessage
          xpStatus={state.xpEfficiencyStatus}
          breakCount={state.breakCount}
          activeTimeSeconds={state.activeTimeSeconds}
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {summaryItems.map((item) => (
          <SummaryStatCard key={item.label} item={item} />
        ))}
      </div>

      {showDetails && (
        <section className="mt-5 rounded-[2rem] border border-slate-200 bg-slate-50 p-4 text-slate-900">
          <h3 className="text-base font-black">Session details</h3>

          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <dt className="font-bold text-slate-600">Current game</dt>
              <dd className="mt-1 font-black">
                {state.currentGameKey ?? 'Skills game'}
              </dd>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <dt className="font-bold text-slate-600">Current game time</dt>
              <dd className="mt-1 font-black">
                {formatDuration(state.currentGameActiveSeconds)}
              </dd>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <dt className="font-bold text-slate-600">Idle time excluded</dt>
              <dd className="mt-1 font-black">
                {formatDuration(state.idleTimeSeconds)}
              </dd>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <dt className="font-bold text-slate-600">Last active</dt>
              <dd className="mt-1 font-black">{formatClock(state.lastActiveAt)}</dd>
            </div>
          </dl>
        </section>
      )}

      {showActions && (
        <footer className="mt-5 flex flex-wrap gap-2">
          <SummaryButton variant="primary" onClick={healthyPlay.resume}>
            {HEALTHY_PLAY_BUTTON_TEXT.resume}
          </SummaryButton>

          <SummaryButton onClick={healthyPlay.trySomethingElse}>
            {HEALTHY_PLAY_BUTTON_TEXT.trySomethingElse}
          </SummaryButton>

          <SummaryButton onClick={healthyPlay.returnToSkillsPage}>
            {HEALTHY_PLAY_BUTTON_TEXT.returnToSkillsPage}
          </SummaryButton>

          {state.calmModeStatus !== 'active' && (
            <SummaryButton onClick={healthyPlay.suggestCalmMode}>
              Want a calmer screen?
            </SummaryButton>
          )}
        </footer>
      )}

      <p className="mt-5 text-xs font-semibold leading-relaxed text-slate-500">
        This summary is private. No leaderboard, ranking, public comparison, or
        classroom roster is shown.
      </p>
    </section>
  );
}

export default ActivitySummaryPanel;

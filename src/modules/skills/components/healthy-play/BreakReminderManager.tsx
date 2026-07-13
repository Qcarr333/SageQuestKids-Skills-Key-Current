'use client';

import React, { useMemo } from 'react';
import {
  HEALTHY_PLAY_BUTTON_TEXT,
  type HealthyPlayBreakStatus,
  type HealthyPlayReminderLevel,
  type HealthyPlayReminderType,
  useHealthyPlay,
} from './HealthyPlayProvider';

/**
 * BreakReminderManager
 *
 * Initial scope:
 * - /skills games only
 * - child-facing break reminder decision layer
 * - soft reminder state display
 * - break suggestion state display
 * - snooze / remind-later support
 * - Calm Mode suggestion support
 * - cooldown / variety suggestion support
 *
 * This component can render a compact controller card for debug/admin-free
 * in-game use, or it can be used as a logic companion beside
 * WellnessPromptSystem.
 *
 * It must not become:
 * - a parent dashboard
 * - a teacher dashboard
 * - a hard lockout system
 * - a leaderboard/ranking system
 * - a punishment screen
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type BreakReminderManagerMode = 'logic-only' | 'compact-panel' | 'full-panel';

export type BreakReminderManagerProps = {
  /**
   * Controls whether this component renders UI.
   * - logic-only: returns null, but exposes derived state through callbacks
   * - compact-panel: small child-facing rhythm card
   * - full-panel: larger child-facing rhythm panel
   */
  mode?: BreakReminderManagerMode;

  /**
   * Optional callback when derived reminder state changes.
   */
  onReminderStateChange?: (state: BreakReminderDerivedState) => void;

  /**
   * Optional className for rendered panel.
   */
  className?: string;

  /**
   * Whether to show a small footer note about progress protection.
   */
  showProgressNote?: boolean;
};

export type BreakReminderDerivedState = {
  activeMinutes: number;
  idleMinutes: number;
  breakCount: number;
  breakStatus: HealthyPlayBreakStatus;
  reminderType?: HealthyPlayReminderType;
  reminderLevel?: HealthyPlayReminderLevel;
  shouldShowSoftReminder: boolean;
  shouldShowBreakSuggestion: boolean;
  shouldShowCooldownSuggestion: boolean;
  shouldSuggestCalmMode: boolean;
  isSnoozed: boolean;
  snoozedUntil?: string;
  title: string;
  message: string;
  icon: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
};

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  if (minutes <= 0) return `${remainingSeconds}s`;
  if (remainingSeconds === 0) return `${minutes}m`;

  return `${minutes}m ${remainingSeconds}s`;
}

function getReminderCopy(reminderType?: HealthyPlayReminderType): {
  title: string;
  message: string;
  icon: string;
} {
  switch (reminderType) {
    case 'hydration':
      return {
        title: 'Water break?',
        message: 'Nice focus. A sip of water can help you keep learning.',
        icon: '💧',
      };
    case 'eye_rest':
      return {
        title: 'Rest your eyes',
        message: 'Look away from the screen for a moment.',
        icon: '☁️',
      };
    case 'breathing':
      return {
        title: 'Take a calm breath',
        message: 'Try one slow breath before you continue.',
        icon: '🫧',
      };
    case 'hands':
      return {
        title: 'Relax your hands',
        message: 'Stretch your fingers and wrists for a moment.',
        icon: '🖐️',
      };
    case 'posture':
      return {
        title: 'Posture check',
        message: 'Sit tall and check your screen distance.',
        icon: '🪴',
      };
    case 'calm_focus':
      return {
        title: 'Want a calmer screen?',
        message: 'Calm Mode can soften colors and reduce extra motion.',
        icon: '🌙',
      };
    case 'xp_efficiency':
      return {
        title: 'Healthy learning rhythm',
        message: 'XP slows during long sessions. Breaks help your learning.',
        icon: '🌱',
      };
    case 'cooldown':
      return {
        title: 'Try something different?',
        message: 'You have practiced for a while. Variety can help.',
        icon: '🧭',
      };
    case 'stretch':
    default:
      return {
        title: 'Quick stretch?',
        message: 'Great work. Want a short stretch before you keep going?',
        icon: '🌿',
      };
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

function getSnoozeLabel(snoozedUntil?: string) {
  if (!snoozedUntil) return undefined;

  const until = new Date(snoozedUntil).getTime();
  const now = Date.now();
  if (until <= now) return undefined;

  const remainingMinutes = Math.ceil((until - now) / 1000 / 60);
  return `Reminder snoozed for about ${remainingMinutes}m`;
}

function buildDerivedState(options: {
  activeTimeSeconds: number;
  idleTimeSeconds: number;
  breakCount: number;
  breakStatus: HealthyPlayBreakStatus;
  reminderType?: HealthyPlayReminderType;
  reminderLevel?: HealthyPlayReminderLevel;
  reminderSnoozedUntil?: string;
  calmModeStatus: string;
}): BreakReminderDerivedState {
  const activeMinutes = options.activeTimeSeconds / 60;
  const idleMinutes = options.idleTimeSeconds / 60;
  const copy = getReminderCopy(options.reminderType);

  const snoozedUntil = options.reminderSnoozedUntil;
  const isSnoozed = Boolean(
    snoozedUntil && new Date(snoozedUntil).getTime() > Date.now(),
  );

  const shouldShowCooldownSuggestion =
    options.reminderLevel === 'cooldown' || options.reminderType === 'cooldown';

  const shouldShowBreakSuggestion =
    options.reminderLevel === 'break_suggestion' ||
    options.breakStatus === 'suggested' ||
    options.reminderType === 'xp_efficiency';

  const shouldShowSoftReminder =
    options.reminderLevel === 'soft' &&
    !shouldShowBreakSuggestion &&
    !shouldShowCooldownSuggestion;

  const shouldSuggestCalmMode =
    options.calmModeStatus !== 'active' && activeMinutes >= 30;

  return {
    activeMinutes,
    idleMinutes,
    breakCount: options.breakCount,
    breakStatus: options.breakStatus,
    reminderType: options.reminderType,
    reminderLevel: options.reminderLevel,
    shouldShowSoftReminder,
    shouldShowBreakSuggestion,
    shouldShowCooldownSuggestion,
    shouldSuggestCalmMode,
    isSnoozed,
    snoozedUntil,
    title: shouldShowBreakSuggestion
      ? 'Good time for a break'
      : shouldShowCooldownSuggestion
        ? 'Try a different activity?'
        : copy.title,
    message: shouldShowBreakSuggestion
      ? 'You have been learning for a while. A quick break can help your rhythm.'
      : shouldShowCooldownSuggestion
        ? 'You can keep playing, return to Skills, or try something else later.'
        : copy.message,
    icon: shouldShowBreakSuggestion
      ? '🌿'
      : shouldShowCooldownSuggestion
        ? '🧭'
        : copy.icon,
    primaryActionLabel: shouldShowCooldownSuggestion
      ? HEALTHY_PLAY_BUTTON_TEXT.trySomethingElse
      : HEALTHY_PLAY_BUTTON_TEXT.takeBreak,
    secondaryActionLabel: shouldShowCooldownSuggestion
      ? HEALTHY_PLAY_BUTTON_TEXT.returnToSkillsPage
      : HEALTHY_PLAY_BUTTON_TEXT.keepPlaying,
  };
}

function ManagerButton({
  children,
  onClick,
  variant = 'secondary',
}: {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const classes =
    variant === 'primary'
      ? 'bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500'
      : variant === 'ghost'
        ? 'bg-transparent text-slate-700 hover:bg-white/70 focus-visible:ring-slate-400'
        : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full px-4 py-2 text-sm font-bold shadow-sm transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        classes,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function ReminderMeter({
  activeTimeSeconds,
  breakSuggestionMinutes,
  cooldownSuggestionMinutes,
}: {
  activeTimeSeconds: number;
  breakSuggestionMinutes: number;
  cooldownSuggestionMinutes: number;
}) {
  const activeMinutes = activeTimeSeconds / 60;
  const percent = Math.min(
    100,
    Math.round((activeMinutes / cooldownSuggestionMinutes) * 100),
  );

  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-slate-600">
        <span>Active learning</span>
        <span>{formatDuration(activeTimeSeconds)}</span>
      </div>

      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white shadow-inner">
        <div
          className="h-full rounded-full bg-teal-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-2 grid grid-cols-3 text-[0.65rem] font-bold text-slate-500">
        <span>Start</span>
        <span className="text-center">Break around {breakSuggestionMinutes}m</span>
        <span className="text-right">Cooldown {cooldownSuggestionMinutes}m</span>
      </div>
    </div>
  );
}

export function BreakReminderManager({
  mode = 'compact-panel',
  onReminderStateChange,
  className,
  showProgressNote = true,
}: BreakReminderManagerProps) {
  const healthyPlay = useHealthyPlay();
  const { state, defaults, accessibilitySettings } = healthyPlay;

  const derived = useMemo(() => {
    return buildDerivedState({
      activeTimeSeconds: state.activeTimeSeconds,
      idleTimeSeconds: state.idleTimeSeconds,
      breakCount: state.breakCount,
      breakStatus: state.breakStatus,
      reminderType: state.reminderType,
      reminderLevel: state.reminderLevel,
      reminderSnoozedUntil: state.reminderSnoozedUntil,
      calmModeStatus: state.calmModeStatus,
    });
  }, [
    state.activeTimeSeconds,
    state.breakCount,
    state.breakStatus,
    state.calmModeStatus,
    state.idleTimeSeconds,
    state.reminderLevel,
    state.reminderSnoozedUntil,
    state.reminderType,
  ]);

  React.useEffect(() => {
    onReminderStateChange?.(derived);
  }, [derived, onReminderStateChange]);

  if (mode === 'logic-only') return null;

  const snoozeLabel = getSnoozeLabel(derived.snoozedUntil);
  const isFull = mode === 'full-panel';

  return (
    <section
      className={[
        'rounded-[2rem] border border-teal-200 bg-teal-50 p-5 text-teal-950 shadow-sm',
        accessibilitySettings.highContrast ? 'border-2 border-slate-950' : '',
        accessibilitySettings.largerText ? 'text-lg' : '',
        className ?? '',
      ].join(' ')}
      aria-labelledby="healthy-play-break-manager-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div
            aria-hidden="true"
            className={[
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-sm',
              accessibilitySettings.reducedMotion ? '' : 'animate-pulse',
            ].join(' ')}
          >
            {derived.icon}
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-wide opacity-75">
              Break Reminder Manager
            </p>
            <h2
              id="healthy-play-break-manager-title"
              className="mt-1 text-xl font-black leading-tight"
            >
              {derived.title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed opacity-85">
              {derived.message}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/75 px-4 py-3 text-right shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide opacity-70">
            Breaks
          </p>
          <p className="mt-1 text-2xl font-black">{derived.breakCount}</p>
        </div>
      </div>

      <div className="mt-5">
        <ReminderMeter
          activeTimeSeconds={state.activeTimeSeconds}
          breakSuggestionMinutes={defaults.breakSuggestionMinutes}
          cooldownSuggestionMinutes={defaults.cooldownSuggestionMinutesMin}
        />
      </div>

      {isFull && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide opacity-70">
              Break state
            </p>
            <p className="mt-1 text-sm font-black">
              {getBreakStatusLabel(derived.breakStatus)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide opacity-70">
              Reminder
            </p>
            <p className="mt-1 text-sm font-black">
              {derived.reminderType ?? 'None'}
            </p>
          </div>

          <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide opacity-70">
              Idle excluded
            </p>
            <p className="mt-1 text-sm font-black">
              {formatDuration(state.idleTimeSeconds)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide opacity-70">
              Snooze
            </p>
            <p className="mt-1 text-sm font-black">
              {snoozeLabel ?? 'Not snoozed'}
            </p>
          </div>
        </div>
      )}

      {snoozeLabel && (
        <p className="mt-4 rounded-2xl bg-white/75 p-3 text-sm font-semibold text-teal-900 shadow-sm">
          {snoozeLabel}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {derived.shouldShowCooldownSuggestion ? (
          <>
            <ManagerButton variant="primary" onClick={healthyPlay.trySomethingElse}>
              {HEALTHY_PLAY_BUTTON_TEXT.trySomethingElse}
            </ManagerButton>
            <ManagerButton onClick={healthyPlay.returnToSkillsPage}>
              {HEALTHY_PLAY_BUTTON_TEXT.returnToSkillsPage}
            </ManagerButton>
            <ManagerButton onClick={healthyPlay.keepPlaying}>
              {HEALTHY_PLAY_BUTTON_TEXT.keepPlaying}
            </ManagerButton>
          </>
        ) : (
          <>
            <ManagerButton variant="primary" onClick={healthyPlay.takeBreak}>
              {HEALTHY_PLAY_BUTTON_TEXT.takeBreak}
            </ManagerButton>
            <ManagerButton onClick={healthyPlay.keepPlaying}>
              {HEALTHY_PLAY_BUTTON_TEXT.keepPlaying}
            </ManagerButton>
            <ManagerButton onClick={() => healthyPlay.remindMeLater()}>
              {HEALTHY_PLAY_BUTTON_TEXT.remindMeLater}
            </ManagerButton>
          </>
        )}

        {derived.shouldSuggestCalmMode && state.calmModeStatus !== 'active' && (
          <ManagerButton variant="ghost" onClick={healthyPlay.suggestCalmMode}>
            Want a calmer screen?
          </ManagerButton>
        )}
      </div>

      {showProgressNote && (
        <p className="mt-4 text-xs font-semibold leading-relaxed opacity-70">
          Break reminders are supportive and optional. Your current Skills game
          state is preserved, and progress saves fail-soft.
        </p>
      )}
    </section>
  );
}

export default BreakReminderManager;

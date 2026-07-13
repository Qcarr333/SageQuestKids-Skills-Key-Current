'use client';

import React, { useMemo } from 'react';
import {
  HEALTHY_PLAY_DEFAULTS,
  type HealthyPlayDefaults,
  type HealthyPlayXPEfficiencyStatus,
  useHealthyPlay,
} from './HealthyPlayProvider';

/**
 * XPBalanceController
 *
 * Initial scope:
 * - /skills games only
 * - calculates XP efficiency for future XP awards
 * - discourages long grinding without punishment
 * - preserves already-earned XP
 * - supports break restoration and healthy rhythm messaging
 *
 * This component can be rendered near a Skills game, XP award flow, or shared
 * progress layer. It does not render coins, currency, rewards, leaderboards,
 * rankings, or public comparison UI.
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type XPBalanceTier =
  | 'healthy_rhythm'
  | 'gentle_slowdown'
  | 'long_session_slowdown'
  | 'extended_session'
  | 'restored_after_break';

export type XPBalanceResult = {
  baseXP: number;
  finalXPAward: number;
  xpEfficiencyMultiplier: number;
  xpEfficiencyStatus: HealthyPlayXPEfficiencyStatus;
  xpTier: XPBalanceTier;
  message: string;
  shouldSuggestBreak: boolean;
  shouldSuggestCooldown: boolean;
};

export type XPBalanceAwardRequest = {
  baseXP: number;
  reason?: string;
  gameKey?: string;
};

export type XPBalanceControllerProps = {
  /**
   * Optional base XP preview. This does not automatically award XP.
   */
  previewBaseXP?: number;

  /**
   * Whether to show a small child-facing XP rhythm panel.
   */
  showPanel?: boolean;

  /**
   * Whether the XP controller should actively calculate slowdown.
   */
  enabled?: boolean;

  /**
   * Optional defaults override. Keep defaults centralized where possible.
   */
  defaults?: HealthyPlayDefaults;

  /**
   * Called whenever an XP preview or award calculation is produced.
   */
  onXPCalculated?: (result: XPBalanceResult) => void;

  /**
   * Optional callback for the actual shared progress system.
   * This is where a Skills game or progress layer can receive final XP.
   */
  onAwardXP?: (result: XPBalanceResult, request: XPBalanceAwardRequest) => void | Promise<void>;

  className?: string;
};

function getTierFromStatus(status: HealthyPlayXPEfficiencyStatus): XPBalanceTier {
  switch (status) {
    case 'gentle_slowdown':
      return 'gentle_slowdown';
    case 'long_session_slowdown':
      return 'long_session_slowdown';
    case 'extended_session':
      return 'extended_session';
    case 'restored_after_break':
      return 'restored_after_break';
    case 'normal':
    default:
      return 'healthy_rhythm';
  }
}

function getStatusFromActiveMinutes(
  activeMinutes: number,
  defaults: HealthyPlayDefaults,
): {
  status: HealthyPlayXPEfficiencyStatus;
  tier: XPBalanceTier;
  multiplier: number;
} {
  if (activeMinutes < defaults.xpEfficiency.healthyRhythm.maxActiveMinutes) {
    return {
      status: 'normal',
      tier: 'healthy_rhythm',
      multiplier: defaults.xpEfficiency.healthyRhythm.multiplier,
    };
  }

  if (activeMinutes < defaults.xpEfficiency.gentleSlowdown.maxActiveMinutes) {
    return {
      status: 'gentle_slowdown',
      tier: 'gentle_slowdown',
      multiplier: defaults.xpEfficiency.gentleSlowdown.multiplier,
    };
  }

  if (activeMinutes < defaults.xpEfficiency.longSessionSlowdown.maxActiveMinutes) {
    return {
      status: 'long_session_slowdown',
      tier: 'long_session_slowdown',
      multiplier: defaults.xpEfficiency.longSessionSlowdown.multiplier,
    };
  }

  return {
    status: 'extended_session',
    tier: 'extended_session',
    multiplier: defaults.xpEfficiency.extendedSession.multiplierMin,
  };
}

function getXPBalanceMessage(status: HealthyPlayXPEfficiencyStatus) {
  switch (status) {
    case 'gentle_slowdown':
      return 'XP gently slows during longer sessions. Breaks help your learning rhythm.';
    case 'long_session_slowdown':
      return 'You have practiced for a while. A short break can help restore your rhythm.';
    case 'extended_session':
      return 'Long sessions earn less future XP. Your already-earned XP is safe.';
    case 'restored_after_break':
      return 'Nice reset. Your healthy rhythm is restored.';
    case 'normal':
    default:
      return 'Your learning rhythm is healthy.';
  }
}

function getTierLabel(tier: XPBalanceTier) {
  switch (tier) {
    case 'gentle_slowdown':
      return 'Gentle slowdown';
    case 'long_session_slowdown':
      return 'Long-session slowdown';
    case 'extended_session':
      return 'Extended session';
    case 'restored_after_break':
      return 'Restored after break';
    case 'healthy_rhythm':
    default:
      return 'Healthy rhythm';
  }
}

function formatPercent(multiplier: number) {
  return `${Math.round(multiplier * 100)}%`;
}

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  if (minutes <= 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;

  return `${minutes}m ${seconds}s`;
}

function getPanelTone(status: HealthyPlayXPEfficiencyStatus) {
  switch (status) {
    case 'restored_after_break':
      return 'border-emerald-200 bg-emerald-50 text-emerald-950';
    case 'extended_session':
      return 'border-violet-200 bg-violet-50 text-violet-950';
    case 'long_session_slowdown':
      return 'border-sky-200 bg-sky-50 text-sky-950';
    case 'gentle_slowdown':
      return 'border-teal-200 bg-teal-50 text-teal-950';
    case 'normal':
    default:
      return 'border-cyan-200 bg-cyan-50 text-cyan-950';
  }
}

export function calculateHealthyPlayXPBalance(options: {
  baseXP: number;
  activeTimeSeconds: number;
  breakStatus?: string;
  lastBreakAt?: string;
  defaults?: HealthyPlayDefaults;
  forceRestoredAfterBreak?: boolean;
  enabled?: boolean;
}): XPBalanceResult {
  const {
    baseXP,
    activeTimeSeconds,
    defaults = HEALTHY_PLAY_DEFAULTS,
    forceRestoredAfterBreak = false,
    enabled = true,
  } = options;

  if (!enabled) {
    return {
      baseXP,
      finalXPAward: Math.max(0, Math.round(baseXP)),
      xpEfficiencyMultiplier: 1,
      xpEfficiencyStatus: 'normal',
      xpTier: 'healthy_rhythm',
      message: 'XP efficiency is using normal progress.',
      shouldSuggestBreak: false,
      shouldSuggestCooldown: false,
    };
  }

  const activeMinutes = activeTimeSeconds / 60;

  let evaluated = getStatusFromActiveMinutes(activeMinutes, defaults);

  if (forceRestoredAfterBreak) {
    evaluated = {
      status: 'restored_after_break',
      tier: 'restored_after_break',
      multiplier: 1,
    };
  }

  const finalXPAward = Math.max(0, Math.round(baseXP * evaluated.multiplier));

  return {
    baseXP,
    finalXPAward,
    xpEfficiencyMultiplier: evaluated.multiplier,
    xpEfficiencyStatus: evaluated.status,
    xpTier: evaluated.tier,
    message: getXPBalanceMessage(evaluated.status),
    shouldSuggestBreak:
      evaluated.status === 'gentle_slowdown' ||
      evaluated.status === 'long_session_slowdown' ||
      evaluated.status === 'extended_session',
    shouldSuggestCooldown:
      activeMinutes >= defaults.cooldownSuggestionMinutesMin ||
      evaluated.status === 'extended_session',
  };
}

export function useXPBalanceController(options?: {
  enabled?: boolean;
  defaults?: HealthyPlayDefaults;
  onXPCalculated?: (result: XPBalanceResult) => void;
  onAwardXP?: (result: XPBalanceResult, request: XPBalanceAwardRequest) => void | Promise<void>;
}) {
  const healthyPlay = useHealthyPlay();
  const defaults = options?.defaults ?? HEALTHY_PLAY_DEFAULTS;
  const enabled = options?.enabled ?? true;

  return useMemo(() => {
    const previewXP = (baseXP: number): XPBalanceResult => {
      const providerResult = healthyPlay.calculateFinalXP(baseXP);
      const xpTier = getTierFromStatus(providerResult.xpEfficiencyStatus);

      const result: XPBalanceResult = {
        ...providerResult,
        xpTier,
        message: getXPBalanceMessage(providerResult.xpEfficiencyStatus),
        shouldSuggestBreak:
          providerResult.xpEfficiencyStatus !== 'normal' &&
          providerResult.xpEfficiencyStatus !== 'restored_after_break',
        shouldSuggestCooldown:
          healthyPlay.state.activeTimeSeconds / 60 >=
          defaults.cooldownSuggestionMinutesMin,
      };

      options?.onXPCalculated?.(result);
      return result;
    };

    const awardXP = async (request: XPBalanceAwardRequest) => {
      const result = previewXP(request.baseXP);
      await options?.onAwardXP?.(result, request);
      return result;
    };

    return {
      previewXP,
      awardXP,
      calculateXPBalance: (baseXP: number) =>
        calculateHealthyPlayXPBalance({
          baseXP,
          activeTimeSeconds: healthyPlay.state.activeTimeSeconds,
          breakStatus: healthyPlay.state.breakStatus,
          lastBreakAt: healthyPlay.state.lastBreakAt,
          defaults,
          forceRestoredAfterBreak:
            healthyPlay.state.xpEfficiencyStatus === 'restored_after_break',
          enabled,
        }),
    };
  }, [defaults, enabled, healthyPlay, options]);
}

function TierProgressBar({
  activeTimeSeconds,
  defaults,
}: {
  activeTimeSeconds: number;
  defaults: HealthyPlayDefaults;
}) {
  const activeMinutes = activeTimeSeconds / 60;
  const max = Math.max(defaults.xpEfficiency.longSessionSlowdown.maxActiveMinutes, 60);
  const percent = Math.min(100, Math.round((activeMinutes / max) * 100));

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

      <div className="mt-2 grid grid-cols-4 gap-1 text-[0.65rem] font-bold text-slate-500">
        <span>0m</span>
        <span>{defaults.xpEfficiency.healthyRhythm.maxActiveMinutes}m</span>
        <span>{defaults.xpEfficiency.gentleSlowdown.maxActiveMinutes}m</span>
        <span>{defaults.xpEfficiency.longSessionSlowdown.maxActiveMinutes}m+</span>
      </div>
    </div>
  );
}

export function XPBalanceController({
  previewBaseXP = 10,
  showPanel = true,
  enabled = true,
  defaults = HEALTHY_PLAY_DEFAULTS,
  onXPCalculated,
  onAwardXP,
  className,
}: XPBalanceControllerProps) {
  const healthyPlay = useHealthyPlay();
  const { state, accessibilitySettings } = healthyPlay;

  const preview = useMemo(() => {
    const result = calculateHealthyPlayXPBalance({
      baseXP: previewBaseXP,
      activeTimeSeconds: state.activeTimeSeconds,
      breakStatus: state.breakStatus,
      lastBreakAt: state.lastBreakAt,
      defaults,
      forceRestoredAfterBreak: state.xpEfficiencyStatus === 'restored_after_break',
      enabled,
    });

    onXPCalculated?.(result);
    return result;
  }, [
    defaults,
    enabled,
    onXPCalculated,
    previewBaseXP,
    state.activeTimeSeconds,
    state.breakStatus,
    state.lastBreakAt,
    state.xpEfficiencyStatus,
  ]);

  if (!showPanel) return null;

  return (
    <section
      className={[
        'rounded-[2rem] border p-5 shadow-sm',
        getPanelTone(preview.xpEfficiencyStatus),
        accessibilitySettings.highContrast ? 'border-2 border-slate-950' : '',
        accessibilitySettings.largerText ? 'text-lg' : '',
        className ?? '',
      ].join(' ')}
      aria-labelledby="healthy-play-xp-balance-title"
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
            {preview.xpEfficiencyStatus === 'restored_after_break' ? '🌤️' : '🌱'}
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-wide opacity-75">
              Healthy XP Rhythm
            </p>
            <h2
              id="healthy-play-xp-balance-title"
              className="mt-1 text-xl font-black leading-tight"
            >
              {getTierLabel(preview.xpTier)}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed opacity-85">
              {preview.message}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/75 px-4 py-3 text-right shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide opacity-70">
            XP Efficiency
          </p>
          <p className="mt-1 text-2xl font-black">
            {formatPercent(preview.xpEfficiencyMultiplier)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <TierProgressBar
          activeTimeSeconds={state.activeTimeSeconds}
          defaults={defaults}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide opacity-70">
            Base XP
          </p>
          <p className="mt-1 text-lg font-black">{preview.baseXP}</p>
        </div>

        <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide opacity-70">
            Final XP
          </p>
          <p className="mt-1 text-lg font-black">{preview.finalXPAward}</p>
        </div>

        <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide opacity-70">
            Earned XP
          </p>
          <p className="mt-1 text-sm font-bold">Never removed</p>
        </div>
      </div>

      {(preview.shouldSuggestBreak || preview.shouldSuggestCooldown) && (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={healthyPlay.takeBreak}
            className="rounded-full bg-teal-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Take a Break
          </button>

          {preview.shouldSuggestCooldown && (
            <button
              type="button"
              onClick={healthyPlay.trySomethingElse}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              Try Something Else
            </button>
          )}

          <button
            type="button"
            onClick={healthyPlay.keepPlaying}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Keep Playing
          </button>
        </div>
      )}

      <p className="mt-4 text-xs font-semibold leading-relaxed opacity-70">
        XP is learning progress, not currency. No coins, gems, wallets, stores,
        leaderboards, rankings, or public comparison are used.
      </p>
    </section>
  );
}

export default XPBalanceController;

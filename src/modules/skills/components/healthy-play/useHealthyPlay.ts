'use client';

import { useCallback, useMemo } from 'react';
import {
  HEALTHY_PLAY_BUTTON_TEXT,
  HEALTHY_PLAY_DEFAULTS,
  HEALTHY_PLAY_ROUTE_TARGETS,
  type HealthyPlayActivityEvent,
  type HealthyPlayActivityType,
  type HealthyPlayAccessibilitySettings,
  type HealthyPlayBreakStatus,
  type HealthyPlayCalmModeStatus,
  type HealthyPlayContextValue,
  type HealthyPlayDefaults,
  type HealthyPlayReminderLevel,
  type HealthyPlayReminderStatus,
  type HealthyPlayReminderType,
  type HealthyPlaySaveStatus,
  type HealthyPlaySessionState,
  type HealthyPlaySessionStatus,
  type HealthyPlaySoundPreference,
  type HealthyPlaySyncQueueStatus,
  type HealthyPlayXPEfficiencyStatus,
  useHealthyPlay as useHealthyPlayContext,
  useOptionalHealthyPlay,
} from './HealthyPlayProvider';

/**
 * useHealthyPlay
 *
 * Convenience hook layer for Healthy Play.
 *
 * Initial scope:
 * - /skills games only
 * - child-facing Healthy Play state helpers
 * - simple activity tracking helpers
 * - reminder/break/action helpers
 * - XP preview helpers
 * - route target helpers
 *
 * This file re-exports the provider hook and adds derived values so Skills games
 * can consume Healthy Play without duplicating status logic.
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type {
  HealthyPlayActivityEvent,
  HealthyPlayActivityType,
  HealthyPlayAccessibilitySettings,
  HealthyPlayBreakStatus,
  HealthyPlayCalmModeStatus,
  HealthyPlayContextValue,
  HealthyPlayDefaults,
  HealthyPlayReminderLevel,
  HealthyPlayReminderStatus,
  HealthyPlayReminderType,
  HealthyPlaySaveStatus,
  HealthyPlaySessionState,
  HealthyPlaySessionStatus,
  HealthyPlaySoundPreference,
  HealthyPlaySyncQueueStatus,
  HealthyPlayXPEfficiencyStatus,
};

export {
  HEALTHY_PLAY_BUTTON_TEXT,
  HEALTHY_PLAY_DEFAULTS,
  HEALTHY_PLAY_ROUTE_TARGETS,
  useOptionalHealthyPlay,
};

export type HealthyPlayDerivedState = {
  activeMinutes: number;
  idleMinutes: number;
  currentGameActiveMinutes: number;
  dailyActiveMinutes: number;

  activeTimeLabel: string;
  idleTimeLabel: string;
  currentGameActiveTimeLabel: string;
  dailyActiveTimeLabel: string;

  isActive: boolean;
  isIdle: boolean;
  isPaused: boolean;
  isInBreak: boolean;
  isSummary: boolean;

  hasVisibleReminder: boolean;
  hasSoftReminder: boolean;
  hasBreakSuggestion: boolean;
  hasCooldownSuggestion: boolean;
  isReminderSnoozed: boolean;
  reminderSnoozeRemainingMinutes: number;

  isCalmModeActive: boolean;
  isCalmModeSuggested: boolean;

  isXPNormal: boolean;
  isXPSlowed: boolean;
  isXPRestored: boolean;

  isSaving: boolean;
  isSaved: boolean;
  isSyncLater: boolean;
  progressProtectedLabel: string;

  shouldShowPrompt: boolean;
  shouldShowBreakPanel: boolean;
  shouldSuggestBreak: boolean;
  shouldSuggestCooldown: boolean;
  shouldSuggestCalmMode: boolean;

  routeTargets: typeof HEALTHY_PLAY_ROUTE_TARGETS;
  buttonText: typeof HEALTHY_PLAY_BUTTON_TEXT;
};

export type HealthyPlayActions = {
  trackTyping: (gameKey?: string) => void;
  trackMouseMovement: (gameKey?: string) => void;
  trackClicking: (gameKey?: string) => void;
  trackTracking: (gameKey?: string) => void;
  trackDragDrop: (gameKey?: string) => void;
  trackPuzzleInteraction: (gameKey?: string) => void;
  trackGameNavigation: (gameKey?: string) => void;
  trackPromptAnswer: (gameKey?: string) => void;
  trackPause: (gameKey?: string) => void;
  trackResume: (gameKey?: string) => void;
};

export type UseHealthyPlayReturn = HealthyPlayContextValue & {
  derived: HealthyPlayDerivedState;
  actions: HealthyPlayActions;

  /**
   * Convenience helper for a Skills game XP award.
   * This calculates future XP only. Already-earned XP is never removed.
   */
  previewXPAward: (baseXP: number) => {
    baseXP: number;
    finalXPAward: number;
    xpEfficiencyMultiplier: number;
    xpEfficiencyStatus: HealthyPlayXPEfficiencyStatus;
  };

  /**
   * Best-effort save helper for navigation actions.
   */
  preserveProgress: () => Promise<void>;
};

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  if (minutes <= 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;

  return `${minutes}m ${seconds}s`;
}

function getSnoozeRemainingMinutes(snoozedUntil?: string) {
  if (!snoozedUntil) return 0;

  const until = new Date(snoozedUntil).getTime();
  if (!Number.isFinite(until)) return 0;

  const remainingMs = until - Date.now();
  if (remainingMs <= 0) return 0;

  return Math.ceil(remainingMs / 1000 / 60);
}

function getProgressProtectedLabel(saveStatus: HealthyPlaySaveStatus) {
  switch (saveStatus) {
    case 'saving':
      return 'Saving quietly';
    case 'saved':
      return 'Progress saved';
    case 'sync_later':
      return 'Progress will sync when available';
    case 'retrying':
      return 'Retrying quietly';
    case 'failed_soft':
      return 'Progress is safe locally';
    case 'idle':
    default:
      return 'Progress protection ready';
  }
}

function buildActivityEvent(
  activityType: HealthyPlayActivityType,
  gameKey?: string,
): HealthyPlayActivityEvent {
  return {
    module: 'skills',
    gameKey,
    activityType,
    occurredAt: new Date().toISOString(),
  };
}

function buildDerivedState(
  state: HealthyPlaySessionState,
  defaults: HealthyPlayDefaults,
): HealthyPlayDerivedState {
  const activeMinutes = state.activeTimeSeconds / 60;
  const idleMinutes = state.idleTimeSeconds / 60;
  const currentGameActiveMinutes = state.currentGameActiveSeconds / 60;
  const dailyActiveMinutes = state.dailyActiveSeconds / 60;

  const reminderSnoozeRemainingMinutes = getSnoozeRemainingMinutes(
    state.reminderSnoozedUntil,
  );

  const hasVisibleReminder = state.reminderStatus === 'visible';
  const hasSoftReminder =
    hasVisibleReminder &&
    state.reminderLevel === 'soft' &&
    state.reminderType !== 'cooldown';

  const hasBreakSuggestion =
    hasVisibleReminder ||
    state.breakStatus === 'suggested' ||
    state.reminderLevel === 'break_suggestion';

  const hasCooldownSuggestion =
    state.reminderType === 'cooldown' ||
    state.reminderLevel === 'cooldown' ||
    activeMinutes >= defaults.cooldownSuggestionMinutesMin;

  const isInBreak =
    state.sessionStatus === 'in_break' ||
    state.breakStatus === 'started' ||
    state.breakStatus === 'in_progress' ||
    state.breakStatus === 'complete';

  const isXPSlowed =
    state.xpEfficiencyStatus === 'gentle_slowdown' ||
    state.xpEfficiencyStatus === 'long_session_slowdown' ||
    state.xpEfficiencyStatus === 'extended_session';

  return {
    activeMinutes,
    idleMinutes,
    currentGameActiveMinutes,
    dailyActiveMinutes,

    activeTimeLabel: formatDuration(state.activeTimeSeconds),
    idleTimeLabel: formatDuration(state.idleTimeSeconds),
    currentGameActiveTimeLabel: formatDuration(state.currentGameActiveSeconds),
    dailyActiveTimeLabel: formatDuration(state.dailyActiveSeconds),

    isActive: state.sessionStatus === 'active',
    isIdle: state.sessionStatus === 'idle',
    isPaused: state.sessionStatus === 'paused',
    isInBreak,
    isSummary: state.sessionStatus === 'summary',

    hasVisibleReminder,
    hasSoftReminder,
    hasBreakSuggestion,
    hasCooldownSuggestion,
    isReminderSnoozed: reminderSnoozeRemainingMinutes > 0,
    reminderSnoozeRemainingMinutes,

    isCalmModeActive: state.calmModeStatus === 'active',
    isCalmModeSuggested: state.calmModeStatus === 'suggested',

    isXPNormal: state.xpEfficiencyStatus === 'normal',
    isXPSlowed,
    isXPRestored: state.xpEfficiencyStatus === 'restored_after_break',

    isSaving: state.saveStatus === 'saving',
    isSaved: state.saveStatus === 'saved',
    isSyncLater: state.saveStatus === 'sync_later',
    progressProtectedLabel: getProgressProtectedLabel(state.saveStatus),

    shouldShowPrompt: hasVisibleReminder && !isInBreak,
    shouldShowBreakPanel: isInBreak,
    shouldSuggestBreak:
      activeMinutes >= defaults.breakSuggestionMinutes ||
      state.reminderLevel === 'break_suggestion' ||
      isXPSlowed,
    shouldSuggestCooldown: hasCooldownSuggestion,
    shouldSuggestCalmMode:
      state.calmModeStatus !== 'active' &&
      activeMinutes >= defaults.breakSuggestionMinutes,

    routeTargets: HEALTHY_PLAY_ROUTE_TARGETS,
    buttonText: HEALTHY_PLAY_BUTTON_TEXT,
  };
}

/**
 * Main Healthy Play hook for /skills games.
 *
 * Use this inside components wrapped by HealthyPlayProvider.
 */
export function useHealthyPlay(): UseHealthyPlayReturn {
  const healthyPlay = useHealthyPlayContext();

  const derived = useMemo(
    () => buildDerivedState(healthyPlay.state, healthyPlay.defaults),
    [healthyPlay.defaults, healthyPlay.state],
  );

  const trackByType = useCallback(
    (activityType: HealthyPlayActivityType, gameKey?: string) => {
      healthyPlay.trackActivity(buildActivityEvent(activityType, gameKey));
    },
    [healthyPlay],
  );

  const actions = useMemo<HealthyPlayActions>(
    () => ({
      trackTyping: (gameKey?: string) => trackByType('typing', gameKey),
      trackMouseMovement: (gameKey?: string) =>
        trackByType('mouse_movement', gameKey),
      trackClicking: (gameKey?: string) => trackByType('clicking', gameKey),
      trackTracking: (gameKey?: string) => trackByType('tracking', gameKey),
      trackDragDrop: (gameKey?: string) => trackByType('drag_drop', gameKey),
      trackPuzzleInteraction: (gameKey?: string) =>
        trackByType('puzzle_interaction', gameKey),
      trackGameNavigation: (gameKey?: string) =>
        trackByType('game_navigation', gameKey),
      trackPromptAnswer: (gameKey?: string) =>
        trackByType('prompt_answer', gameKey),
      trackPause: (gameKey?: string) => trackByType('pause', gameKey),
      trackResume: (gameKey?: string) => trackByType('resume', gameKey),
    }),
    [trackByType],
  );

  const previewXPAward = useCallback(
    (baseXP: number) => healthyPlay.calculateFinalXP(baseXP),
    [healthyPlay],
  );

  const preserveProgress = useCallback(async () => {
    await healthyPlay.saveState();
  }, [healthyPlay]);

  return {
    ...healthyPlay,
    derived,
    actions,
    previewXPAward,
    preserveProgress,
  };
}

/**
 * Optional hook for components that may render outside HealthyPlayProvider.
 * This returns null when no provider is present.
 */
export function useMaybeHealthyPlay(): UseHealthyPlayReturn | null {
  const healthyPlay = useOptionalHealthyPlay();

  const derived = useMemo(() => {
    if (!healthyPlay) return null;
    return buildDerivedState(healthyPlay.state, healthyPlay.defaults);
  }, [healthyPlay]);

  const trackByType = useCallback(
    (activityType: HealthyPlayActivityType, gameKey?: string) => {
      healthyPlay?.trackActivity(buildActivityEvent(activityType, gameKey));
    },
    [healthyPlay],
  );

  const actions = useMemo<HealthyPlayActions>(
    () => ({
      trackTyping: (gameKey?: string) => trackByType('typing', gameKey),
      trackMouseMovement: (gameKey?: string) =>
        trackByType('mouse_movement', gameKey),
      trackClicking: (gameKey?: string) => trackByType('clicking', gameKey),
      trackTracking: (gameKey?: string) => trackByType('tracking', gameKey),
      trackDragDrop: (gameKey?: string) => trackByType('drag_drop', gameKey),
      trackPuzzleInteraction: (gameKey?: string) =>
        trackByType('puzzle_interaction', gameKey),
      trackGameNavigation: (gameKey?: string) =>
        trackByType('game_navigation', gameKey),
      trackPromptAnswer: (gameKey?: string) =>
        trackByType('prompt_answer', gameKey),
      trackPause: (gameKey?: string) => trackByType('pause', gameKey),
      trackResume: (gameKey?: string) => trackByType('resume', gameKey),
    }),
    [trackByType],
  );

  const previewXPAward = useCallback(
    (baseXP: number) =>
      healthyPlay?.calculateFinalXP(baseXP) ?? {
        baseXP,
        finalXPAward: baseXP,
        xpEfficiencyMultiplier: 1,
        xpEfficiencyStatus: 'normal' as HealthyPlayXPEfficiencyStatus,
      },
    [healthyPlay],
  );

  const preserveProgress = useCallback(async () => {
    await healthyPlay?.saveState();
  }, [healthyPlay]);

  if (!healthyPlay || !derived) return null;

  return {
    ...healthyPlay,
    derived,
    actions,
    previewXPAward,
    preserveProgress,
  };
}

/**
 * Lightweight activity helper for Skills games.
 *
 * Example:
 * const { trackPuzzleInteraction } = useHealthyPlayActivity("word_builder_farm");
 * trackPuzzleInteraction();
 */
export function useHealthyPlayActivity(gameKey?: string) {
  const healthyPlay = useMaybeHealthyPlay();

  return useMemo(() => {
    const track = (activityType: HealthyPlayActivityType) => {
      healthyPlay?.trackActivity(buildActivityEvent(activityType, gameKey));
    };

    return {
      isHealthyPlayAvailable: Boolean(healthyPlay),

      trackTyping: () => track('typing'),
      trackMouseMovement: () => track('mouse_movement'),
      trackClicking: () => track('clicking'),
      trackTracking: () => track('tracking'),
      trackDragDrop: () => track('drag_drop'),
      trackPuzzleInteraction: () => track('puzzle_interaction'),
      trackGameNavigation: () => track('game_navigation'),
      trackPromptAnswer: () => track('prompt_answer'),
      trackPause: () => track('pause'),
      trackResume: () => track('resume'),
    };
  }, [gameKey, healthyPlay]);
}

/**
 * Helper for route buttons and prompt actions.
 */
export function useHealthyPlayActions() {
  const healthyPlay = useHealthyPlay();

  return useMemo(
    () => ({
      keepPlaying: healthyPlay.keepPlaying,
      takeBreak: healthyPlay.takeBreak,
      remindMeLater: healthyPlay.remindMeLater,
      resume: healthyPlay.resume,
      completeBreak: healthyPlay.completeBreak,
      enableCalmMode: healthyPlay.enableCalmMode,
      suggestCalmMode: healthyPlay.suggestCalmMode,
      returnToSkillsPage: healthyPlay.returnToSkillsPage,
      trySomethingElse: healthyPlay.trySomethingElse,
      saveState: healthyPlay.saveState,
      preserveProgress: healthyPlay.preserveProgress,
    }),
    [healthyPlay],
  );
}

export default useHealthyPlay;

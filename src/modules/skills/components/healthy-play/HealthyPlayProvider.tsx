'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/**
 * Healthy Play Provider
 *
 * Initial scope:
 * - /skills games only
 * - child-facing Healthy Play reminders
 * - active time tracking
 * - idle time exclusion
 * - break prompts
 * - Calm Mode
 * - XP efficiency balancing
 * - fail-soft local persistence
 *
 * Future scope:
 * - parent/teacher controls
 * - account-level Healthy Play preferences
 * - platform-wide Reading/Math/Coding integration
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type HealthyPlayModule = 'skills';

export type HealthyPlayActivityType =
  | 'typing'
  | 'mouse_movement'
  | 'clicking'
  | 'tracking'
  | 'drag_drop'
  | 'puzzle_interaction'
  | 'game_navigation'
  | 'prompt_answer'
  | 'pause'
  | 'resume';

export type HealthyPlaySessionStatus =
  | 'idle'
  | 'active'
  | 'paused'
  | 'in_break'
  | 'summary'
  | 'exited';

export type HealthyPlayReminderStatus =
  | 'idle'
  | 'queued'
  | 'visible'
  | 'dismissed'
  | 'snoozed'
  | 'accepted_break';

export type HealthyPlayReminderType =
  | 'stretch'
  | 'hydration'
  | 'eye_rest'
  | 'breathing'
  | 'hands'
  | 'posture'
  | 'calm_focus'
  | 'xp_efficiency'
  | 'cooldown';

export type HealthyPlayReminderLevel =
  | 'soft'
  | 'break_suggestion'
  | 'cooldown';

export type HealthyPlayBreakStatus =
  | 'none'
  | 'suggested'
  | 'started'
  | 'in_progress'
  | 'complete'
  | 'resumed';

export type HealthyPlayCalmModeStatus = 'off' | 'suggested' | 'active';

export type HealthyPlayXPEfficiencyStatus =
  | 'normal'
  | 'gentle_slowdown'
  | 'long_session_slowdown'
  | 'extended_session'
  | 'restored_after_break';

export type HealthyPlaySaveStatus =
  | 'idle'
  | 'saving'
  | 'saved'
  | 'sync_later'
  | 'retrying'
  | 'failed_soft';

export type HealthyPlaySyncQueueStatus =
  | 'empty'
  | 'queued'
  | 'retrying'
  | 'synced';

export type HealthyPlaySoundPreference = 'on' | 'quiet' | 'off';

export type HealthyPlayAccessibilitySettings = {
  reducedMotion: boolean;
  highContrast: boolean;
  soundPreference: HealthyPlaySoundPreference;
  largerText: boolean;
  quietBreaks: boolean;
  touchFriendlyControls: boolean;
};

export type HealthyPlayActivityEvent = {
  module?: HealthyPlayModule;
  gameKey?: string;
  activityType: HealthyPlayActivityType;
  occurredAt?: string;
};

export type HealthyPlaySessionState = {
  sessionId: string;
  currentModule: HealthyPlayModule;
  currentGameKey?: string;

  activeTimeSeconds: number;
  idleTimeSeconds: number;
  dailyActiveSeconds: number;
  currentGameActiveSeconds: number;
  lastActiveAt?: string;

  sessionStatus: HealthyPlaySessionStatus;

  reminderStatus: HealthyPlayReminderStatus;
  reminderType?: HealthyPlayReminderType;
  reminderLevel?: HealthyPlayReminderLevel;
  reminderSnoozedUntil?: string;
  repeatedReminderCount: number;

  breakStatus: HealthyPlayBreakStatus;
  breakCount: number;
  lastBreakAt?: string;

  calmModeStatus: HealthyPlayCalmModeStatus;
  xpEfficiencyStatus: HealthyPlayXPEfficiencyStatus;
  xpEfficiencyMultiplier: number;

  saveStatus: HealthyPlaySaveStatus;
  syncQueueStatus: HealthyPlaySyncQueueStatus;
};

export type HealthyPlayDefaults = {
  idleTimeoutSeconds: number;
  softReminderMinutes: number;
  breakSuggestionMinutes: number;
  xpEfficiencySlowdownMinutes: number;
  cooldownSuggestionMinutesMin: number;
  cooldownSuggestionMinutesMax: number;
  snoozeMinutesByGradeBand: {
    K_1: number;
    GRADE_2_3: number;
    GRADE_4_5: number;
  };
  xpEfficiency: {
    healthyRhythm: {
      maxActiveMinutes: number;
      multiplier: number;
    };
    gentleSlowdown: {
      maxActiveMinutes: number;
      multiplier: number;
    };
    longSessionSlowdown: {
      maxActiveMinutes: number;
      multiplier: number;
    };
    extendedSession: {
      minActiveMinutes: number;
      multiplierMin: number;
      multiplierMax: number;
    };
  };
};

export const HEALTHY_PLAY_DEFAULTS: HealthyPlayDefaults = {
  idleTimeoutSeconds: 90,

  softReminderMinutes: 20,
  breakSuggestionMinutes: 30,
  xpEfficiencySlowdownMinutes: 20,
  cooldownSuggestionMinutesMin: 45,
  cooldownSuggestionMinutesMax: 60,

  snoozeMinutesByGradeBand: {
    K_1: 5,
    GRADE_2_3: 7,
    GRADE_4_5: 10,
  },

  xpEfficiency: {
    healthyRhythm: {
      maxActiveMinutes: 20,
      multiplier: 1,
    },
    gentleSlowdown: {
      maxActiveMinutes: 40,
      multiplier: 0.85,
    },
    longSessionSlowdown: {
      maxActiveMinutes: 60,
      multiplier: 0.7,
    },
    extendedSession: {
      minActiveMinutes: 60,
      multiplierMin: 0.5,
      multiplierMax: 0.6,
    },
  },
};

export const HEALTHY_PLAY_BUTTON_TEXT = {
  keepPlaying: 'Keep Playing',
  takeBreak: 'Take a Break',
  remindMeLater: 'Remind Me Later',
  resume: 'Resume',
  trySomethingElse: 'Try Something Else',
  returnToSkillsPage: 'Return to Skills Page',
  makeItCalm: 'Yes, Make It Calm',
  saveSettings: 'Save Settings',
  done: 'Done',
  goToDashboard: 'Go to Dashboard', // future only, not initial child-facing build
} as const;

export const HEALTHY_PLAY_ROUTE_TARGETS = {
  trySomethingElse: 'SITE_MODULE_LANDING_PAGE', // future route placeholder
  returnToSkillsPage: '/skills',
  goToDashboard: null,
} as const;

const STORAGE_KEY = 'sage-quest-kids:healthy-play:skills-session';
const SETTINGS_STORAGE_KEY = 'sage-quest-kids:healthy-play:skills-settings';

const DEFAULT_ACCESSIBILITY_SETTINGS: HealthyPlayAccessibilitySettings = {
  reducedMotion: false,
  highContrast: false,
  soundPreference: 'on',
  largerText: false,
  quietBreaks: false,
  touchFriendlyControls: true,
};

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `healthy-play-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function minutesToMs(minutes: number) {
  return minutes * 60 * 1000;
}

function safeReadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson(key: string, value: unknown): boolean {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function buildInitialSessionState(gameKey?: string): HealthyPlaySessionState {
  return {
    sessionId: createSessionId(),
    currentModule: 'skills',
    currentGameKey: gameKey,

    activeTimeSeconds: 0,
    idleTimeSeconds: 0,
    dailyActiveSeconds: 0,
    currentGameActiveSeconds: 0,
    lastActiveAt: nowIso(),

    sessionStatus: 'active',

    reminderStatus: 'idle',
    reminderType: undefined,
    reminderLevel: undefined,
    reminderSnoozedUntil: undefined,
    repeatedReminderCount: 0,

    breakStatus: 'none',
    breakCount: 0,
    lastBreakAt: undefined,

    calmModeStatus: 'off',
    xpEfficiencyStatus: 'normal',
    xpEfficiencyMultiplier: 1,

    saveStatus: 'idle',
    syncQueueStatus: 'empty',
  };
}

function getXPEfficiency(
  activeMinutes: number,
  defaults: HealthyPlayDefaults,
): {
  status: HealthyPlayXPEfficiencyStatus;
  multiplier: number;
} {
  if (activeMinutes < defaults.xpEfficiency.healthyRhythm.maxActiveMinutes) {
    return { status: 'normal', multiplier: defaults.xpEfficiency.healthyRhythm.multiplier };
  }

  if (activeMinutes < defaults.xpEfficiency.gentleSlowdown.maxActiveMinutes) {
    return {
      status: 'gentle_slowdown',
      multiplier: defaults.xpEfficiency.gentleSlowdown.multiplier,
    };
  }

  if (activeMinutes < defaults.xpEfficiency.longSessionSlowdown.maxActiveMinutes) {
    return {
      status: 'long_session_slowdown',
      multiplier: defaults.xpEfficiency.longSessionSlowdown.multiplier,
    };
  }

  return {
    status: 'extended_session',
    multiplier: defaults.xpEfficiency.extendedSession.multiplierMin,
  };
}

function chooseReminderType(activeMinutes: number): HealthyPlayReminderType {
  if (activeMinutes >= HEALTHY_PLAY_DEFAULTS.cooldownSuggestionMinutesMin) return 'cooldown';
  if (activeMinutes >= HEALTHY_PLAY_DEFAULTS.xpEfficiencySlowdownMinutes) return 'xp_efficiency';

  const rotation: HealthyPlayReminderType[] = [
    'stretch',
    'hydration',
    'eye_rest',
    'breathing',
    'hands',
    'posture',
  ];

  return rotation[Math.floor(activeMinutes) % rotation.length] ?? 'stretch';
}

type SaveHealthyPlayStateFn = (
  state: HealthyPlaySessionState,
  accessibilitySettings: HealthyPlayAccessibilitySettings,
) => Promise<void>;

export type HealthyPlayProviderProps = {
  children: React.ReactNode;
  currentGameKey?: string;
  enabled?: boolean;
  defaults?: HealthyPlayDefaults;

  /**
   * Optional persistence integration point.
   *
   * Use this to wire Supabase later without making the provider depend on a
   * specific backend implementation.
   */
  onSaveState?: SaveHealthyPlayStateFn;

  /**
   * Called before routing to /skills or the future module landing page.
   * The parent app can use this to preserve the current game state.
   */
  onPreserveGameState?: () => Promise<void> | void;

  /**
   * Initial child-facing accessibility settings.
   */
  initialAccessibilitySettings?: Partial<HealthyPlayAccessibilitySettings>;

  /**
   * Optional router handlers. If omitted, the provider falls back to
   * window.location for /skills and no-op behavior for future routes.
   */
  onReturnToSkillsPage?: () => void;
  onTrySomethingElse?: () => void;
};

export type HealthyPlayContextValue = {
  state: HealthyPlaySessionState;
  defaults: HealthyPlayDefaults;
  accessibilitySettings: HealthyPlayAccessibilitySettings;
  enabled: boolean;

  trackActivity: (event: HealthyPlayActivityEvent) => void;

  keepPlaying: () => void;
  takeBreak: () => void;
  remindMeLater: (minutes?: number) => void;
  resume: () => void;
  completeBreak: () => void;

  enableCalmMode: () => void;
  suggestCalmMode: () => void;
  updateAccessibilitySettings: (
    nextSettings: Partial<HealthyPlayAccessibilitySettings>,
  ) => void;

  calculateFinalXP: (baseXP: number) => {
    baseXP: number;
    finalXPAward: number;
    xpEfficiencyMultiplier: number;
    xpEfficiencyStatus: HealthyPlayXPEfficiencyStatus;
  };

  saveState: () => Promise<void>;

  returnToSkillsPage: () => Promise<void>;
  trySomethingElse: () => Promise<void>;
};

const HealthyPlayContext = createContext<HealthyPlayContextValue | null>(null);

export function HealthyPlayProvider({
  children,
  currentGameKey,
  enabled = true,
  defaults = HEALTHY_PLAY_DEFAULTS,
  onSaveState,
  onPreserveGameState,
  initialAccessibilitySettings,
  onReturnToSkillsPage,
  onTrySomethingElse,
}: HealthyPlayProviderProps) {
  const [state, setState] = useState<HealthyPlaySessionState>(() => {
    const stored = safeReadJson<HealthyPlaySessionState | null>(STORAGE_KEY, null);

    if (stored?.currentModule === 'skills') {
      return {
        ...stored,
        currentGameKey: currentGameKey ?? stored.currentGameKey,
        sessionStatus: 'active',
        saveStatus: 'idle',
      };
    }

    return buildInitialSessionState(currentGameKey);
  });

  const [accessibilitySettings, setAccessibilitySettings] =
    useState<HealthyPlayAccessibilitySettings>(() => {
      const stored = safeReadJson<HealthyPlayAccessibilitySettings | null>(
        SETTINGS_STORAGE_KEY,
        null,
      );

      return {
        ...DEFAULT_ACCESSIBILITY_SETTINGS,
        ...stored,
        ...initialAccessibilitySettings,
      };
    });

  const lastTickRef = useRef<number>(Date.now());
  const lastActivityAtRef = useRef<number>(Date.now());
  const stateRef = useRef(state);
  const accessibilityRef = useRef(accessibilitySettings);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    accessibilityRef.current = accessibilitySettings;
  }, [accessibilitySettings]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      currentGameKey: currentGameKey ?? prev.currentGameKey,
    }));
  }, [currentGameKey]);

  const persistLocal = useCallback(
    (nextState: HealthyPlaySessionState, nextSettings = accessibilityRef.current) => {
      const stateSaved = safeWriteJson(STORAGE_KEY, nextState);
      const settingsSaved = safeWriteJson(SETTINGS_STORAGE_KEY, nextSettings);
      return stateSaved && settingsSaved;
    },
    [],
  );

  const saveState = useCallback(async () => {
    const currentState = stateRef.current;
    const currentSettings = accessibilityRef.current;

    setState((prev) => ({
      ...prev,
      saveStatus: 'saving',
    }));

    const localSaved = persistLocal(currentState, currentSettings);

    try {
      if (onSaveState) {
        await onSaveState(currentState, currentSettings);
      }

      setState((prev) => ({
        ...prev,
        saveStatus: localSaved ? 'saved' : 'sync_later',
        syncQueueStatus: localSaved ? 'synced' : 'queued',
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        saveStatus: 'sync_later',
        syncQueueStatus: 'queued',
      }));
    }
  }, [onSaveState, persistLocal]);

  const evaluateReminder = useCallback(
    (nextState: HealthyPlaySessionState): HealthyPlaySessionState => {
      if (!enabled) return nextState;
      if (nextState.sessionStatus === 'in_break') return nextState;

      const activeMinutes = nextState.activeTimeSeconds / 60;
      const isSnoozed =
        nextState.reminderSnoozedUntil &&
        new Date(nextState.reminderSnoozedUntil).getTime() > Date.now();

      if (isSnoozed || nextState.reminderStatus === 'visible') {
        return nextState;
      }

      let reminderLevel: HealthyPlayReminderLevel | undefined;

      if (activeMinutes >= defaults.cooldownSuggestionMinutesMin) {
        reminderLevel = 'cooldown';
      } else if (activeMinutes >= defaults.breakSuggestionMinutes) {
        reminderLevel = 'break_suggestion';
      } else if (activeMinutes >= defaults.softReminderMinutes) {
        reminderLevel = 'soft';
      }

      if (!reminderLevel) return nextState;

      const reminderType = chooseReminderType(activeMinutes);

      return {
        ...nextState,
        reminderStatus: 'visible',
        reminderType,
        reminderLevel,
        repeatedReminderCount: nextState.repeatedReminderCount + 1,
        breakStatus:
          reminderLevel === 'break_suggestion' ? 'suggested' : nextState.breakStatus,
      };
    },
    [defaults, enabled],
  );

  const updateXPEfficiency = useCallback(
    (nextState: HealthyPlaySessionState): HealthyPlaySessionState => {
      if (nextState.xpEfficiencyStatus === 'restored_after_break') {
        const lastBreak = nextState.lastBreakAt
          ? new Date(nextState.lastBreakAt).getTime()
          : 0;

        // Keep the restored state briefly, then return to time-based evaluation.
        if (Date.now() - lastBreak < minutesToMs(10)) {
          return {
            ...nextState,
            xpEfficiencyMultiplier: 1,
          };
        }
      }

      const activeMinutes = nextState.activeTimeSeconds / 60;
      const xp = getXPEfficiency(activeMinutes, defaults);

      return {
        ...nextState,
        xpEfficiencyStatus: xp.status,
        xpEfficiencyMultiplier: xp.multiplier,
      };
    },
    [defaults],
  );

  useEffect(() => {
    if (!enabled) return;

    const interval = window.setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastTickRef.current;
      lastTickRef.current = now;

      const elapsedSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
      if (elapsedSeconds <= 0) return;

      const idleForSeconds = Math.floor((now - lastActivityAtRef.current) / 1000);
      const isIdle = idleForSeconds >= defaults.idleTimeoutSeconds;

      setState((prev) => {
        if (prev.sessionStatus === 'paused' || prev.sessionStatus === 'in_break') {
          return prev;
        }

        let next: HealthyPlaySessionState = {
          ...prev,
          sessionStatus: isIdle ? 'idle' : 'active',
          idleTimeSeconds: isIdle
            ? prev.idleTimeSeconds + elapsedSeconds
            : prev.idleTimeSeconds,
          activeTimeSeconds: isIdle
            ? prev.activeTimeSeconds
            : prev.activeTimeSeconds + elapsedSeconds,
          dailyActiveSeconds: isIdle
            ? prev.dailyActiveSeconds
            : prev.dailyActiveSeconds + elapsedSeconds,
          currentGameActiveSeconds: isIdle
            ? prev.currentGameActiveSeconds
            : prev.currentGameActiveSeconds + elapsedSeconds,
        };

        next = updateXPEfficiency(next);
        next = evaluateReminder(next);

        persistLocal(next);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [defaults.idleTimeoutSeconds, enabled, evaluateReminder, persistLocal, updateXPEfficiency]);

  const trackActivity = useCallback((event: HealthyPlayActivityEvent) => {
    const occurredAt = event.occurredAt ?? nowIso();
    lastActivityAtRef.current = new Date(occurredAt).getTime();

    setState((prev) => ({
      ...prev,
      currentModule: 'skills',
      currentGameKey: event.gameKey ?? prev.currentGameKey,
      lastActiveAt: occurredAt,
      sessionStatus: prev.sessionStatus === 'in_break' ? prev.sessionStatus : 'active',
    }));
  }, []);

  const keepPlaying = useCallback(() => {
    setState((prev) => ({
      ...prev,
      reminderStatus: 'dismissed',
      reminderType: undefined,
      reminderLevel: undefined,
      breakStatus: prev.breakStatus === 'suggested' ? 'none' : prev.breakStatus,
      sessionStatus: 'active',
    }));
  }, []);

  const takeBreak = useCallback(() => {
    setState((prev) => ({
      ...prev,
      reminderStatus: 'accepted_break',
      breakStatus: 'started',
      sessionStatus: 'in_break',
    }));

    window.setTimeout(() => {
      setState((prev) =>
        prev.breakStatus === 'started'
          ? {
              ...prev,
              breakStatus: 'in_progress',
              sessionStatus: 'in_break',
            }
          : prev,
      );
    }, accessibilityRef.current.reducedMotion ? 0 : 300);
  }, []);

  const remindMeLater = useCallback(
    (minutes?: number) => {
      const snoozeMinutes = minutes ?? defaults.snoozeMinutesByGradeBand.GRADE_2_3;

      setState((prev) => ({
        ...prev,
        reminderStatus: 'snoozed',
        reminderType: undefined,
        reminderLevel: undefined,
        reminderSnoozedUntil: new Date(Date.now() + minutesToMs(snoozeMinutes)).toISOString(),
        breakStatus: prev.breakStatus === 'suggested' ? 'none' : prev.breakStatus,
        sessionStatus: 'active',
      }));
    },
    [defaults.snoozeMinutesByGradeBand.GRADE_2_3],
  );

  const completeBreak = useCallback(() => {
    setState((prev) => ({
      ...prev,
      breakStatus: 'complete',
      breakCount: prev.breakCount + 1,
      lastBreakAt: nowIso(),
      xpEfficiencyStatus: 'restored_after_break',
      xpEfficiencyMultiplier: 1,
      reminderStatus: 'dismissed',
      reminderType: undefined,
      reminderLevel: undefined,
    }));
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sessionStatus: 'active',
      breakStatus: prev.breakStatus === 'complete' ? 'resumed' : 'resumed',
      reminderStatus: 'dismissed',
      reminderType: undefined,
      reminderLevel: undefined,
      lastActiveAt: nowIso(),
    }));

    lastActivityAtRef.current = Date.now();
  }, []);

  const enableCalmMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      calmModeStatus: 'active',
      reminderStatus: prev.reminderType === 'calm_focus' ? 'dismissed' : prev.reminderStatus,
    }));
  }, []);

  const suggestCalmMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      calmModeStatus: prev.calmModeStatus === 'active' ? 'active' : 'suggested',
      reminderStatus: 'visible',
      reminderType: 'calm_focus',
      reminderLevel: 'soft',
    }));
  }, []);

  const updateAccessibilitySettings = useCallback(
    (nextSettings: Partial<HealthyPlayAccessibilitySettings>) => {
      setAccessibilitySettings((prev) => {
        const merged = {
          ...prev,
          ...nextSettings,
        };

        safeWriteJson(SETTINGS_STORAGE_KEY, merged);
        return merged;
      });

      setState((prev) => ({
        ...prev,
        saveStatus: 'idle',
      }));
    },
    [],
  );

  const calculateFinalXP = useCallback(
    (baseXP: number) => {
      const current = stateRef.current;
      const xp = getXPEfficiency(current.activeTimeSeconds / 60, defaults);

      const finalXPAward = Math.max(0, Math.round(baseXP * xp.multiplier));

      setState((prev) => ({
        ...prev,
        xpEfficiencyStatus: xp.status,
        xpEfficiencyMultiplier: xp.multiplier,
      }));

      return {
        baseXP,
        finalXPAward,
        xpEfficiencyMultiplier: xp.multiplier,
        xpEfficiencyStatus: xp.status,
      };
    },
    [defaults],
  );

  const preserveAndSave = useCallback(async () => {
    if (onPreserveGameState) {
      await onPreserveGameState();
    }

    await saveState();
  }, [onPreserveGameState, saveState]);

  const returnToSkillsPage = useCallback(async () => {
    await preserveAndSave();

    if (onReturnToSkillsPage) {
      onReturnToSkillsPage();
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.href = HEALTHY_PLAY_ROUTE_TARGETS.returnToSkillsPage;
    }
  }, [onReturnToSkillsPage, preserveAndSave]);

  const trySomethingElse = useCallback(async () => {
    await preserveAndSave();

    if (onTrySomethingElse) {
      onTrySomethingElse();
      return;
    }

    // Future route placeholder. Do not force a broken route.
    // Parent app can wire this when the Site Module Landing Page exists.
    setState((prev) => ({
      ...prev,
      reminderStatus: 'dismissed',
      reminderType: undefined,
      reminderLevel: undefined,
    }));
  }, [onTrySomethingElse, preserveAndSave]);

  const contextValue = useMemo<HealthyPlayContextValue>(
    () => ({
      state,
      defaults,
      accessibilitySettings,
      enabled,

      trackActivity,

      keepPlaying,
      takeBreak,
      remindMeLater,
      resume,
      completeBreak,

      enableCalmMode,
      suggestCalmMode,
      updateAccessibilitySettings,

      calculateFinalXP,
      saveState,

      returnToSkillsPage,
      trySomethingElse,
    }),
    [
      accessibilitySettings,
      calculateFinalXP,
      completeBreak,
      defaults,
      enableCalmMode,
      enabled,
      keepPlaying,
      remindMeLater,
      resume,
      returnToSkillsPage,
      saveState,
      state,
      suggestCalmMode,
      takeBreak,
      trackActivity,
      trySomethingElse,
      updateAccessibilitySettings,
    ],
  );

  return (
    <HealthyPlayContext.Provider value={contextValue}>
      {children}
    </HealthyPlayContext.Provider>
  );
}

export function useHealthyPlay() {
  const context = useContext(HealthyPlayContext);

  if (!context) {
    throw new Error('useHealthyPlay must be used within HealthyPlayProvider.');
  }

  return context;
}

export function useOptionalHealthyPlay() {
  return useContext(HealthyPlayContext);
}

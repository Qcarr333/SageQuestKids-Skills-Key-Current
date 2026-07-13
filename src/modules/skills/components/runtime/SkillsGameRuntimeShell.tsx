'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { HealthyPlayProvider } from '@/components/healthy-play/HealthyPlayProvider';
import { useHealthyPlay } from '@/components/healthy-play/useHealthyPlay';
import { requireSkillGameRegistryEntry } from '../../lib/runtime/skillsGameRegistry';
import { createSkillPayloadPreview } from '../../lib/runtime/skillsPayloadPreview';
import { createSkillRoundResult } from '../../lib/runtime/skillsRoundResultAdapter';
import { createSkillRuntimeId } from '../../lib/runtime/skillsRuntimeSession';
import type {
  SkillGameKey,
  SkillGameRegistryEntry,
  SkillPayloadPreview,
  SkillRoundResult,
  SkillRoundResultInput,
  SkillRoundResultMetadata,
} from '../../lib/runtime/skillsRuntimeTypes';
import type {
  HealthyPlayAccessibilitySettings,
  HealthyPlaySoundPreference,
} from '@/components/healthy-play/HealthyPlayProvider';

type SkillsRuntimeStatus = 'idle' | 'running' | 'paused' | 'ended';

type PreserveReason =
  | 'round_end'
  | 'pause'
  | 'resume'
  | 'navigation'
  | 'healthy_play'
  | 'manual';

type PreserveResult = {
  ok: boolean;
  reason: PreserveReason;
  preservedAt: string;
  error?: string;
};

type RuntimeRoundInput = Omit<
  SkillRoundResultInput,
  'gameKey' | 'sessionId' | 'roundId' | 'roundAttempt' | 'durationMs'
> &
  Partial<
    Pick<
      SkillRoundResultInput,
      'gameKey' | 'sessionId' | 'roundId' | 'roundAttempt' | 'durationMs'
    >
  >;

type SkillsGameRuntimeContextValue = {
  registryEntry: SkillGameRegistryEntry;
  moduleId: SkillGameKey;
  sessionId: string;
  roundId: string | null;
  roundAttempt: number;
  roundStartedAt: number | null;
  status: SkillsRuntimeStatus;
  lastPreserveResult: PreserveResult | null;
  beginRound: () => void;
  pauseRound: () => void;
  resumeRound: () => void;
  endRound: () => void;
  getRoundDurationMs: () => number;
  reducedMotion: boolean;
  highContrast: boolean;
  largerText: boolean;
  soundPreference: HealthyPlaySoundPreference;
  soundEnabled: boolean;
  quietSound: boolean;
  healthyPlayStatus: {
    activeTimeLabel: string;
    idleTimeLabel: string;
    xpEfficiencyMultiplier: number;
    xpEfficiencyStatus: string;
    progressProtectedLabel: string;
  };
  accessibilityDataAttributes: Record<string, string>;
  updateAccessibilityPreferences: (
    nextSettings: Partial<HealthyPlayAccessibilitySettings>,
  ) => void;
  setSoundPreference: (soundPreference: HealthyPlaySoundPreference) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  createPreviewMetadata: (
    metadata?: SkillRoundResultMetadata,
  ) => SkillRoundResultMetadata;
  createRoundResult: (input: RuntimeRoundInput) => SkillRoundResult;
  createPayloadPreview: (roundResult: SkillRoundResult) => SkillPayloadPreview;
  preserveProgress: (
    reason: PreserveReason,
    handler?: () => void | Promise<void>,
  ) => Promise<PreserveResult>;
};

const SkillsGameRuntimeContext =
  createContext<SkillsGameRuntimeContextValue | null>(null);

const DEFAULT_RUNTIME_ACCESSIBILITY: HealthyPlayAccessibilitySettings = {
  reducedMotion: false,
  highContrast: false,
  soundPreference: 'on',
  largerText: false,
  quietBreaks: false,
  touchFriendlyControls: true,
};

type SkillsGameRuntimeShellProps = {
  gameKey: SkillGameKey | string;
  children: ReactNode;
};

export function SkillsGameRuntimeShell({
  gameKey,
  children,
}: SkillsGameRuntimeShellProps) {
  const registryEntry = useMemo(
    () => requireSkillGameRegistryEntry(gameKey),
    [gameKey],
  );
  const [sessionId] = useState(() =>
    createSkillRuntimeId(`${registryEntry.moduleId}:session`),
  );
  const [roundId, setRoundId] = useState<string | null>(null);
  const [roundAttempt, setRoundAttempt] = useState(0);
  const [roundStartedAt, setRoundStartedAt] = useState<number | null>(null);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [pausedDurationMs, setPausedDurationMs] = useState(0);
  const [status, setStatus] = useState<SkillsRuntimeStatus>('idle');
  const [lastPreserveResult, setLastPreserveResult] =
    useState<PreserveResult | null>(null);

  const getRoundDurationMs = useCallback(() => {
    if (!roundStartedAt) return 0;
    const now = Date.now();
    const activePauseMs = pausedAt ? now - pausedAt : 0;
    return Math.max(0, now - roundStartedAt - pausedDurationMs - activePauseMs);
  }, [pausedAt, pausedDurationMs, roundStartedAt]);

  const beginRound = useCallback(() => {
    setRoundId(createSkillRuntimeId(`${registryEntry.moduleId}:round`));
    setRoundAttempt((attempt) => attempt + 1);
    setRoundStartedAt(Date.now());
    setPausedAt(null);
    setPausedDurationMs(0);
    setStatus('running');
    setLastPreserveResult(null);
  }, [registryEntry.moduleId]);

  const pauseRound = useCallback(() => {
    setStatus((current) => {
      if (current !== 'running') return current;
      setPausedAt(Date.now());
      return 'paused';
    });
  }, []);

  const resumeRound = useCallback(() => {
    setStatus((current) => {
      if (current !== 'paused') return current;
      const now = Date.now();
      setPausedDurationMs((duration) =>
        pausedAt ? duration + now - pausedAt : duration,
      );
      setPausedAt(null);
      return 'running';
    });
  }, [pausedAt]);

  const endRound = useCallback(() => {
    setStatus('ended');
    setPausedAt((currentPausedAt) => {
      if (currentPausedAt) {
        setPausedDurationMs((duration) => duration + Date.now() - currentPausedAt);
      }
      return null;
    });
  }, []);

  const createRoundResult = useCallback(
    (input: RuntimeRoundInput) =>
      createSkillRoundResult({
        ...input,
        gameKey: input.gameKey ?? registryEntry.moduleId,
        sessionId: input.sessionId ?? sessionId,
        roundId:
          input.roundId ??
          roundId ??
          createSkillRuntimeId(`${registryEntry.moduleId}:round`),
        roundAttempt: input.roundAttempt ?? Math.max(1, roundAttempt),
        durationMs: input.durationMs ?? getRoundDurationMs(),
      }),
    [
      getRoundDurationMs,
      registryEntry.moduleId,
      roundAttempt,
      roundId,
      sessionId,
    ],
  );

  const preserveProgress = useCallback(
    async (
      reason: PreserveReason,
      handler?: () => void | Promise<void>,
    ): Promise<PreserveResult> => {
      const preservedAt = new Date().toISOString();
      try {
        await handler?.();
        const result = { ok: true, reason, preservedAt };
        setLastPreserveResult(result);
        return result;
      } catch (error) {
        const result = {
          ok: false,
          reason,
          preservedAt,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        setLastPreserveResult(result);
        return result;
      }
    },
    [],
  );

  const runtimeCore = useMemo(
    () => ({
      registryEntry,
      moduleId: registryEntry.moduleId,
      sessionId,
      roundId,
      roundAttempt,
      roundStartedAt,
      status,
      lastPreserveResult,
      beginRound,
      pauseRound,
      resumeRound,
      endRound,
      getRoundDurationMs,
      createRoundResult,
      createPayloadPreview: createSkillPayloadPreview,
      preserveProgress,
    }),
    [
      beginRound,
      createRoundResult,
      endRound,
      getRoundDurationMs,
      lastPreserveResult,
      pauseRound,
      preserveProgress,
      registryEntry,
      resumeRound,
      roundAttempt,
      roundId,
      roundStartedAt,
      sessionId,
      status,
    ],
  );

  return (
    <HealthyPlayProvider
      currentGameKey={registryEntry.moduleId}
      initialAccessibilitySettings={DEFAULT_RUNTIME_ACCESSIBILITY}
      onPreserveGameState={async () => {
        await preserveProgress('healthy_play');
      }}
      onReturnToSkillsPage={() => undefined}
      onTrySomethingElse={() => undefined}
    >
      <SkillsGameRuntimeContextBridge runtimeCore={runtimeCore}>
        {children}
      </SkillsGameRuntimeContextBridge>
    </HealthyPlayProvider>
  );
}

function SkillsGameRuntimeContextBridge({
  runtimeCore,
  children,
}: {
  runtimeCore: Omit<
    SkillsGameRuntimeContextValue,
    | 'reducedMotion'
    | 'highContrast'
    | 'largerText'
    | 'soundPreference'
    | 'soundEnabled'
    | 'quietSound'
    | 'healthyPlayStatus'
    | 'accessibilityDataAttributes'
    | 'updateAccessibilityPreferences'
    | 'setSoundPreference'
    | 'setReducedMotion'
    | 'createPreviewMetadata'
  >;
  children: ReactNode;
}) {
  const healthyPlay = useHealthyPlay();
  const calmModeActive = healthyPlay.state.calmModeStatus === 'active';
  const reducedMotion =
    healthyPlay.accessibilitySettings.reducedMotion || calmModeActive;
  const highContrast = healthyPlay.accessibilitySettings.highContrast;
  const largerText = healthyPlay.accessibilitySettings.largerText;
  const quietSound =
    healthyPlay.accessibilitySettings.soundPreference === 'quiet' ||
    healthyPlay.accessibilitySettings.quietBreaks;
  const soundEnabled = healthyPlay.accessibilitySettings.soundPreference !== 'off';
  const accessibilityDataAttributes = useMemo(
    () => ({
      'data-healthy-play-reduced-motion': String(reducedMotion),
      'data-healthy-play-high-contrast': String(highContrast),
      'data-healthy-play-larger-text': String(largerText),
      'data-healthy-play-sound': soundEnabled
        ? quietSound
          ? 'quiet'
          : 'on'
        : 'off',
      'data-healthy-play-touch-friendly': String(
        healthyPlay.accessibilitySettings.touchFriendlyControls,
      ),
      'data-healthy-play-calm-mode': String(calmModeActive),
    }),
    [
      calmModeActive,
      healthyPlay.accessibilitySettings.touchFriendlyControls,
      highContrast,
      largerText,
      quietSound,
      reducedMotion,
      soundEnabled,
    ],
  );

  const updateAccessibilityPreferences = useCallback(
    (nextSettings: Partial<HealthyPlayAccessibilitySettings>) => {
      healthyPlay.updateAccessibilitySettings(nextSettings);
    },
    [healthyPlay],
  );

  const setSoundPreference = useCallback(
    (soundPreference: HealthyPlaySoundPreference) => {
      healthyPlay.updateAccessibilitySettings({ soundPreference });
    },
    [healthyPlay],
  );

  const setReducedMotion = useCallback(
    (reducedMotion: boolean) => {
      healthyPlay.updateAccessibilitySettings({ reducedMotion });
    },
    [healthyPlay],
  );

  const createPreviewMetadata = useCallback(
    (metadata: SkillRoundResultMetadata = {}): SkillRoundResultMetadata => ({
      ...metadata,
      soundPreference: healthyPlay.accessibilitySettings.soundPreference,
      quietSound,
      reducedMotion,
      highContrast,
      largerText,
      healthyPlayActiveTime: healthyPlay.derived.activeTimeLabel,
      xpEfficiencyMultiplier: healthyPlay.state.xpEfficiencyMultiplier,
      xpEfficiencyStatus: healthyPlay.state.xpEfficiencyStatus,
      localOnlyPreview: true,
    }),
    [
      healthyPlay.accessibilitySettings.soundPreference,
      healthyPlay.derived.activeTimeLabel,
      healthyPlay.state.xpEfficiencyMultiplier,
      healthyPlay.state.xpEfficiencyStatus,
      highContrast,
      largerText,
      quietSound,
      reducedMotion,
    ],
  );

  const value = useMemo<SkillsGameRuntimeContextValue>(
    () => ({
      ...runtimeCore,
      reducedMotion,
      highContrast,
      largerText,
      soundPreference: healthyPlay.accessibilitySettings.soundPreference,
      soundEnabled,
      quietSound,
      healthyPlayStatus: {
        activeTimeLabel: healthyPlay.derived.activeTimeLabel,
        idleTimeLabel: healthyPlay.derived.idleTimeLabel,
        xpEfficiencyMultiplier: healthyPlay.state.xpEfficiencyMultiplier,
        xpEfficiencyStatus: healthyPlay.state.xpEfficiencyStatus,
        progressProtectedLabel: healthyPlay.derived.progressProtectedLabel,
      },
      accessibilityDataAttributes,
      updateAccessibilityPreferences,
      setSoundPreference,
      setReducedMotion,
      createPreviewMetadata,
    }),
    [
      accessibilityDataAttributes,
      createPreviewMetadata,
      highContrast,
      healthyPlay.accessibilitySettings.soundPreference,
      healthyPlay.derived.activeTimeLabel,
      healthyPlay.derived.idleTimeLabel,
      healthyPlay.derived.progressProtectedLabel,
      healthyPlay.state.xpEfficiencyMultiplier,
      healthyPlay.state.xpEfficiencyStatus,
      largerText,
      quietSound,
      reducedMotion,
      runtimeCore,
      setReducedMotion,
      setSoundPreference,
      soundEnabled,
      updateAccessibilityPreferences,
    ],
  );

  return (
    <SkillsGameRuntimeContext.Provider value={value}>
      <div
        className="contents"
        data-skills-runtime-shell="local-preview"
        data-skills-module-id={runtimeCore.registryEntry.moduleId}
        data-skills-runtime-status={runtimeCore.status}
        {...accessibilityDataAttributes}
      >
        {children}
      </div>
    </SkillsGameRuntimeContext.Provider>
  );
}

export function useSkillsGameRuntime() {
  const context = useContext(SkillsGameRuntimeContext);

  if (!context) {
    throw new Error(
      'useSkillsGameRuntime must be used inside SkillsGameRuntimeShell.',
    );
  }

  return context;
}

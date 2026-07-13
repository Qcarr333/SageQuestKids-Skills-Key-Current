'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getUserGameProgress,
  saveUserGameProgress,
} from '../../../lib/adapters/progressAdapter';
import {
  playCompleteSound,
  playCorrectSound,
  playTryAgainSound,
} from '../../../lib/adapters/soundAdapter';
import { logSkillPayloadPreview } from '../../../lib/runtime/skillsPayloadPreview';
import {
  SkillsGameRuntimeShell,
  useSkillsGameRuntime,
} from '../../runtime/SkillsGameRuntimeShell';
import { KeyCurrentCharacter } from './KeyCurrentCharacter';
import { KeyCurrentCompletion } from './KeyCurrentCompletion';
import { KeyCurrentHud } from './KeyCurrentHud';
import { KeyCurrentKeyboardHelper } from './KeyCurrentKeyboardHelper';
import { KeyCurrentLanding } from './KeyCurrentLanding';
import { KeyCurrentObstacle } from './KeyCurrentObstacle';
import { KeyCurrentPlayfield } from './KeyCurrentPlayfield';
import { KEY_CURRENT_BACKGROUNDS, KEY_CURRENT_MUSIC } from './keyCurrentAssets';
import { useKeyCurrentKeyboardInput } from './keyCurrentInput';
import { summarizeRun } from './keyCurrentScoring';
import { buildRunObstacles, countRequiredInputs } from './keyCurrentSequences';
import {
  KEY_CURRENT_CHARACTERS,
  KEY_CURRENT_DIFFICULTIES,
  getCurrentStage,
  getCurrentTrack,
  getFirstIncompleteTrackAStage,
  getKeyCurrentCharacter,
  getKeyCurrentDifficulty,
  getNextStage,
  isTrackAComplete,
  isTrackAStageUnlocked,
} from './keyCurrentTracks';
import styles from './keyCurrent.module.css';
import type { SkillPayloadPreview } from '../../../lib/runtime/skillsRuntimeTypes';
import type { KeyCurrentInputSource } from './keyCurrentInput';
import type {
  KeyCurrentCharacterAnim,
  KeyCurrentKeyFlash,
  KeyCurrentObstacle as KeyCurrentObstacleData,
  KeyCurrentPhase,
  KeyCurrentRunStats,
  KeyCurrentRunSummary,
  KeyCurrentRunType,
  KeyCurrentSettings,
  KeyCurrentStage,
} from './keyCurrentTypes';

const GAME_KEY = 'key_current';

const DEFAULT_SETTINGS: KeyCurrentSettings = {
  musicEnabled: true,
  sfxEnabled: true,
  voiceHelpEnabled: true,
  difficulty: 'easy',
  characterId: 'turtle',
};

function createRunStats(runType: KeyCurrentRunType): KeyCurrentRunStats {
  return {
    runType,
    requiredInputs: 0,
    correctFirstAttempts: 0,
    incorrectInputs: 0,
    collisions: 0,
    obstaclesCleared: 0,
    usedKeyboard: false,
    usedTouch: false,
    durationMs: 0,
  };
}

export function KeyCurrentGame() {
  return (
    <SkillsGameRuntimeShell gameKey={GAME_KEY}>
      <KeyCurrentExperience />
    </SkillsGameRuntimeShell>
  );
}

function KeyCurrentExperience() {
  const runtime = useSkillsGameRuntime();
  const trackA = useMemo(() => getCurrentTrack('track_a_home_base'), []);
  const trackAStages = useMemo(() => trackA?.stages ?? [], [trackA]);

  /* ---------- settings + saved local preview progress ---------- */

  const [settings, setSettings] = useState<KeyCurrentSettings>(DEFAULT_SETTINGS);
  const [savedXp, setSavedXp] = useState(0);
  const [savedLevel, setSavedLevel] = useState(1);
  const [completedStageIds, setCompletedStageIds] = useState<string[]>([]);
  const [bestAccuracy, setBestAccuracy] = useState<Record<string, number>>({});
  const [currentStageId, setCurrentStageId] = useState(
    'track_a_stage_1_f_j',
  );
  const stage = useMemo(() => getCurrentStage(currentStageId), [currentStageId]);
  const trackAComplete = isTrackAComplete(completedStageIds);

  useEffect(() => {
    const progress = getUserGameProgress(GAME_KEY);
    const completed = progress.completedLessons.filter((stageId) =>
      trackAStages.some((trackStage) => trackStage.stageId === stageId),
    );
    const savedStageId =
      typeof progress.settings.currentStageId === 'string'
        ? progress.settings.currentStageId
        : null;
    const fallbackStage = getFirstIncompleteTrackAStage(completed);
    const savedStageIsUnlocked = savedStageId
      ? isTrackAStageUnlocked(savedStageId, completed)
      : false;

    setSavedXp(progress.xp);
    setSavedLevel(progress.level);
    setCompletedStageIds(completed);
    setBestAccuracy(progress.bestAccuracy);
    setCurrentStageId(
      savedStageId && savedStageIsUnlocked ? savedStageId : fallbackStage.stageId,
    );
    setSettings((current) => ({
      ...current,
      musicEnabled:
        typeof progress.settings.musicEnabled === 'boolean'
          ? progress.settings.musicEnabled
          : current.musicEnabled,
      sfxEnabled:
        typeof progress.settings.sfxEnabled === 'boolean'
          ? progress.settings.sfxEnabled
          : current.sfxEnabled,
      voiceHelpEnabled:
        typeof progress.settings.voiceHelpEnabled === 'boolean'
          ? progress.settings.voiceHelpEnabled
          : current.voiceHelpEnabled,
      difficulty:
        KEY_CURRENT_DIFFICULTIES.some((d) => d.id === progress.settings.difficulty)
          ? (progress.settings.difficulty as KeyCurrentSettings['difficulty'])
          : current.difficulty,
      // Old 1A saves used ids like 'tide_turtle'; fall back to the default.
      characterId: KEY_CURRENT_CHARACTERS.some(
        (c) => c.characterId === progress.settings.characterId,
      )
        ? (progress.settings.characterId as KeyCurrentSettings['characterId'])
        : current.characterId,
    }));
  }, [trackAStages]);

  const persistSettings = useCallback((next: KeyCurrentSettings) => {
    const progress = getUserGameProgress(GAME_KEY);
    saveUserGameProgress({
      ...progress,
      settings: {
        ...progress.settings,
        musicEnabled: next.musicEnabled,
        sfxEnabled: next.sfxEnabled,
        voiceHelpEnabled: next.voiceHelpEnabled,
        difficulty: next.difficulty,
        characterId: next.characterId,
      },
    });
  }, []);

  const persistCurrentStage = useCallback((stageId: string) => {
    const progress = getUserGameProgress(GAME_KEY);
    saveUserGameProgress({
      ...progress,
      settings: {
        ...progress.settings,
        currentStageId: stageId,
      },
    });
  }, []);

  const updateSettings = useCallback(
    (partial: Partial<KeyCurrentSettings>) => {
      setSettings((current) => {
        const next = { ...current, ...partial };
        persistSettings(next);
        return next;
      });
    },
    [persistSettings],
  );

  const difficulty = getKeyCurrentDifficulty(settings.difficulty);
  const character = getKeyCurrentCharacter(settings.characterId);

  /* ---------- run state ---------- */

  const [phase, setPhase] = useState<KeyCurrentPhase>('landing');
  const [runType, setRunType] = useState<KeyCurrentRunType>('guided_practice');
  const [obstacles, setObstacles] = useState<KeyCurrentObstacleData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [characterAnim, setCharacterAnim] =
    useState<KeyCurrentCharacterAnim>('idle');
  const [keyFlash, setKeyFlash] = useState<KeyCurrentKeyFlash | null>(null);
  const [countdownText, setCountdownText] = useState<string | null>(null);
  const [urgent, setUrgent] = useState(false);
  const [promptToken, setPromptToken] = useState(0);
  const [runSummaries, setRunSummaries] = useState<KeyCurrentRunSummary[]>([]);
  const [previews, setPreviews] = useState<SkillPayloadPreview[]>([]);

  /* ---------- engine refs (game loop reads these, never stale state) ---------- */

  const phaseRef = useRef(phase);
  const pausedRef = useRef(paused);
  const obstaclesRef = useRef(obstacles);
  const activeIndexRef = useRef(activeIndex);
  const runTypeRef = useRef(runType);
  const statsRef = useRef<KeyCurrentRunStats>(createRunStats('guided_practice'));
  const activeStageRef = useRef<KeyCurrentStage>(stage);
  const progressRef = useRef(0);
  const modeRef = useRef<'approach' | 'recover' | 'hold'>('hold');
  const inputLockedRef = useRef(false);
  const urgentRef = useRef(false);
  const flashTokenRef = useRef(0);
  const activeObstacleElRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const settingsRef = useRef(settings);

  phaseRef.current = phase;
  pausedRef.current = paused;
  obstaclesRef.current = obstacles;
  activeIndexRef.current = activeIndex;
  runTypeRef.current = runType;
  settingsRef.current = settings;

  const scheduleTimeout = useCallback((fn: () => void, ms: number) => {
    if (typeof window === 'undefined') return;
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
  }, []);

  const clearAllTimeouts = useCallback(() => {
    for (const id of timeoutsRef.current) window.clearTimeout(id);
    timeoutsRef.current = [];
  }, []);

  /* ---------- music (no autoplay: only started from user-gesture flows) ---------- */

  const stopMusic = useCallback((reset = false) => {
    const music = musicRef.current;
    if (!music) return;
    music.pause();
    if (reset) {
      try {
        music.currentTime = 0;
      } catch {
        // ignore: audio element may not be seekable yet
      }
    }
  }, []);

  const playMusic = useCallback(() => {
    if (!settingsRef.current.musicEnabled) return;
    if (typeof window === 'undefined') return;
    if (!musicRef.current) {
      const audio = new Audio(KEY_CURRENT_MUSIC.src);
      audio.loop = true;
      audio.volume = KEY_CURRENT_MUSIC.volume;
      musicRef.current = audio;
    }
    void musicRef.current.play().catch(() => {
      // Autoplay restrictions or missing codec support: music is optional.
    });
  }, []);

  useEffect(() => {
    // Stop and release music on unmount; also stop on pagehide.
    const handlePageHide = () => stopMusic(true);
    window.addEventListener('pagehide', handlePageHide);
    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      stopMusic(true);
      if (musicRef.current) {
        musicRef.current.src = '';
        musicRef.current = null;
      }
      clearAllTimeouts();
    };
  }, [stopMusic, clearAllTimeouts]);

  /* ---------- sfx helpers ---------- */

  const sfx = useCallback(
    (kind: 'correct' | 'tryAgain' | 'complete') => {
      if (!settingsRef.current.sfxEnabled || !runtime.soundEnabled) return;
      if (kind === 'correct') playCorrectSound();
      else if (kind === 'tryAgain') playTryAgainSound();
      else playCompleteSound();
    },
    [runtime.soundEnabled],
  );

  /* ---------- obstacle helpers ---------- */

  const patchObstacle = useCallback(
    (index: number, patch: Partial<KeyCurrentObstacleData>) => {
      setObstacles((current) => {
        const next = current.map((obstacle, i) =>
          i === index ? { ...obstacle, ...patch } : obstacle,
        );
        obstaclesRef.current = next;
        return next;
      });
    },
    [],
  );

  const applyProgressToDom = useCallback(() => {
    const el = activeObstacleElRef.current;
    if (el) {
      el.style.setProperty(
        '--kc-progress',
        String(Math.min(1, Math.max(0, progressRef.current))),
      );
    }
  }, []);

  const setActiveObstacleEl = useCallback(
    (node: HTMLDivElement | null) => {
      activeObstacleElRef.current = node;
      applyProgressToDom();
    },
    [applyProgressToDom],
  );

  /* ---------- collision ---------- */

  const handleCollision = useCallback(() => {
    const index = activeIndexRef.current;
    const obstacle = obstaclesRef.current[index];
    if (!obstacle) return;

    modeRef.current = 'hold';
    inputLockedRef.current = true;
    statsRef.current.collisions += 1;

    const collisionNumber = obstacle.collisions + 1;
    patchObstacle(index, { status: 'collided', collisions: collisionNumber });
    setCharacterAnim('collide');
    sfx('tryAgain');
    setUrgent(true);
    urgentRef.current = true;
    setPromptToken((token) => token + 1);

    // Spec 9.3: first bonk is the most comical, later ones get shorter.
    const impactMs = collisionNumber === 1 ? 900 : collisionNumber === 2 ? 700 : 500;

    scheduleTimeout(() => {
      // Track A is guided: never a fail state — bounce back and try again.
      patchObstacle(index, { status: 'approaching' });
      setCharacterAnim('run');
      inputLockedRef.current = false;
      modeRef.current = 'recover';
    }, impactMs);
  }, [patchObstacle, scheduleTimeout, sfx]);

  /* ---------- run completion ---------- */

  const finishRun = useCallback(() => {
    modeRef.current = 'hold';
    setCharacterAnim('celebrate');

    const stats = statsRef.current;
    const stageForRun = activeStageRef.current;
    stats.durationMs = runtime.getRoundDurationMs();
    runtime.endRound();
    stopMusic(false);

    const summary = summarizeRun(stats, getKeyCurrentDifficulty(settingsRef.current.difficulty));
    const isGuided = stats.runType === 'guided_practice';

    const roundResult = runtime.createRoundResult({
      activityType: isGuided ? 'lesson_complete' : 'challenge_complete',
      lessonId: `${GAME_KEY}:${stageForRun.stageId}:${stats.runType}`,
      status: summary.completionType === 'mastered' ? 'mastered' : 'completed',
      score: summary.accuracy,
      accuracy: summary.accuracy,
      accuracyFormat: 'percent',
      durationMs: stats.durationMs,
      difficulty: settingsRef.current.difficulty,
      xpProposed: summary.xpProposed,
      mistakeCount: stats.incorrectInputs,
      metadata: runtime.createPreviewMetadata({
        stageId: stageForRun.stageId,
        trackId: stageForRun.trackId,
        runType: stats.runType,
        selectedCharacter: settingsRef.current.characterId,
        difficulty: settingsRef.current.difficulty,
        inputMode: summary.inputMode,
        requiredInputs: stats.requiredInputs,
        correctFirstAttempts: stats.correctFirstAttempts,
        incorrectInputs: stats.incorrectInputs,
        collisions: stats.collisions,
        practiceBumps: stats.collisions,
        obstaclesCleared: stats.obstaclesCleared,
        completionType: summary.completionType,
        proficiencyStatus: summary.completionType,
        xpProposed: summary.xpProposed,
        accuracy: summary.accuracy,
        trackCompletionStatus:
          !isGuided && getNextStage(stageForRun.stageId) === null
            ? 'track_a_complete'
            : 'in_progress',
      }),
    });

    const preview = runtime.createPayloadPreview(roundResult);
    if (process.env.NODE_ENV === 'development') {
      logSkillPayloadPreview(preview);
    }

    setPreviews((current) => [...current, preview]);
    setRunSummaries((current) => {
      const next = [...current, summary];

      if (!isGuided) {
        // Stage complete: persist aggregate local preview progress.
        sfx('complete');
        const progress = getUserGameProgress(GAME_KEY);
        const stageXp = next.reduce((sum, run) => sum + run.xpProposed, 0);
        const stageAccuracy = Math.max(
          Number(progress.bestAccuracy[stageForRun.stageId] ?? 0),
          summary.accuracy,
        );
        const completedLessons = progress.completedLessons.includes(
          stageForRun.stageId,
        )
          ? progress.completedLessons
          : [...progress.completedLessons, stageForRun.stageId];
        const nextStage = getNextStage(stageForRun.stageId);
        const saved = saveUserGameProgress({
          ...progress,
          xp: progress.xp + stageXp,
          completedLessons,
          bestAccuracy: {
            ...progress.bestAccuracy,
            [stageForRun.stageId]: stageAccuracy,
          },
          settings: {
            ...progress.settings,
            currentStageId: nextStage?.stageId ?? stageForRun.stageId,
            trackAComplete: nextStage ? false : true,
          },
        });
        setSavedXp(saved.xp);
        setSavedLevel(saved.level);
        setCompletedStageIds(completedLessons);
        setBestAccuracy(saved.bestAccuracy);
        stopMusic(true);
      }

      return next;
    });

    scheduleTimeout(() => {
      setPhase(isGuided ? 'run_complete' : 'stage_complete');
      setCharacterAnim('idle');
    }, 900);
  }, [runtime, sfx, scheduleTimeout, stopMusic]);

  /* ---------- input ---------- */

  const handleGameKey = useCallback(
    (key: string, source: KeyCurrentInputSource) => {
      if (
        phaseRef.current !== 'running' ||
        pausedRef.current ||
        inputLockedRef.current
      ) {
        return;
      }

      const index = activeIndexRef.current;
      const obstacle = obstaclesRef.current[index];
      if (!obstacle || obstacle.status === 'cleared') return;

      const stats = statsRef.current;
      if (source === 'keyboard') stats.usedKeyboard = true;
      else stats.usedTouch = true;

      const target = obstacle.targetKeys[obstacle.completedCount];
      if (!target) return;

      flashTokenRef.current += 1;

      if (key === target) {
        if (!obstacle.hadWrongAttempt) {
          stats.correctFirstAttempts += 1;
        }

        setKeyFlash({ key, kind: 'correct', token: flashTokenRef.current });
        sfx('correct');
        setUrgent(false);
        urgentRef.current = false;

        const completedCount = obstacle.completedCount + 1;
        const isObstacleDone = completedCount >= obstacle.targetKeys.length;

        if (!isObstacleDone) {
          // Multi-letter obstacles (future stages): progress stays visible.
          patchObstacle(index, { completedCount, hadWrongAttempt: false });
          return;
        }

        stats.obstaclesCleared += 1;
        modeRef.current = 'hold'; // freeze position for the open animation
        patchObstacle(index, { completedCount, status: 'cleared' });

        const isLastObstacle = index + 1 >= obstaclesRef.current.length;
        scheduleTimeout(() => {
          patchObstacle(index, { status: 'removed' });
          if (isLastObstacle) {
            finishRun();
            return;
          }
          progressRef.current = 0;
          activeIndexRef.current = index + 1;
          setActiveIndex(index + 1);
          patchObstacle(index + 1, { status: 'approaching' });
          modeRef.current = 'approach';
          applyProgressToDom();
          setPromptToken((token) => token + 1);
        }, 460);
      } else {
        stats.incorrectInputs += 1;
        patchObstacle(index, { hadWrongAttempt: true });
        setKeyFlash({ key, kind: 'wrong', token: flashTokenRef.current });
        sfx('tryAgain');
        setUrgent(true);
        urgentRef.current = true;
        setPromptToken((token) => token + 1);
      }
    },
    [applyProgressToDom, finishRun, patchObstacle, scheduleTimeout, sfx],
  );

  useKeyCurrentKeyboardInput({
    enabled: phase === 'running' || phase === 'countdown',
    allowedKeys: stage.activeKeys,
    onKey: handleGameKey,
  });

  /* ---------- game loop ---------- */

  useEffect(() => {
    if (phase !== 'running' || paused) return;
    let raf = 0;
    let lastTs: number | null = null;
    const approachMs = difficulty.approachMs;
    const recoverTarget = difficulty.reapproachProgress;

    const tick = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min(64, ts - lastTs);
      lastTs = ts;

      if (modeRef.current === 'approach') {
        progressRef.current += dt / approachMs;
        if (progressRef.current >= 1) {
          progressRef.current = 1;
          applyProgressToDom();
          handleCollision();
        } else {
          applyProgressToDom();
          const nowUrgent = progressRef.current > 0.78;
          if (nowUrgent !== urgentRef.current) {
            urgentRef.current = nowUrgent;
            setUrgent(nowUrgent);
          }
        }
      } else if (modeRef.current === 'recover') {
        // Bounce-back: the gate eases away from the character again.
        progressRef.current -= dt / 550;
        if (progressRef.current <= recoverTarget) {
          progressRef.current = recoverTarget;
          modeRef.current = 'approach';
        }
        applyProgressToDom();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, paused, difficulty, applyProgressToDom, handleCollision]);

  /* ---------- starting runs ---------- */

  const startRun = useCallback(
    (type: KeyCurrentRunType, stageOverride?: KeyCurrentStage) => {
      clearAllTimeouts();
      const stageForRun = stageOverride ?? stage;
      activeStageRef.current = stageForRun;
      const runObstacles = buildRunObstacles(stageForRun, type);
      obstaclesRef.current = runObstacles;
      setObstacles(runObstacles);
      setActiveIndex(0);
      activeIndexRef.current = 0;
      statsRef.current = createRunStats(type);
      statsRef.current.requiredInputs = countRequiredInputs(runObstacles);
      progressRef.current = 0;
      modeRef.current = 'hold';
      inputLockedRef.current = false;
      setUrgent(false);
      urgentRef.current = false;
      setKeyFlash(null);
      setRunType(type);
      runTypeRef.current = type;
      setPaused(false);
      setCharacterAnim('run');
      setPhase('countdown');
      runtime.beginRound();
      playMusic();

      setCountdownText('Ready…');
      scheduleTimeout(() => setCountdownText('Go!'), 850);
      scheduleTimeout(() => {
        setCountdownText(null);
        modeRef.current = 'approach';
        setPhase('running');
        setPromptToken((token) => token + 1);
      }, 1500);
    },
    [clearAllTimeouts, playMusic, runtime, scheduleTimeout, stage],
  );

  const startStage = useCallback((stageOverride?: KeyCurrentStage) => {
    const stageForRun = stageOverride ?? stage;
    setCurrentStageId(stageForRun.stageId);
    persistCurrentStage(stageForRun.stageId);
    setRunSummaries([]);
    setPreviews([]);
    startRun('guided_practice', stageForRun);
  }, [persistCurrentStage, stage, startRun]);

  const selectStage = useCallback(
    (stageId: string) => {
      if (!isTrackAStageUnlocked(stageId, completedStageIds)) return;
      setCurrentStageId(stageId);
      persistCurrentStage(stageId);
    },
    [completedStageIds, persistCurrentStage],
  );

  const continueTrackA = useCallback(() => {
    const nextStage = getFirstIncompleteTrackAStage(completedStageIds);
    startStage(nextStage);
  }, [completedStageIds, startStage]);

  const continueAfterStage = useCallback(() => {
    const nextStage = getNextStage(activeStageRef.current.stageId);
    if (!nextStage) {
      setPhase('landing');
      return;
    }
    startStage(nextStage);
  }, [startStage]);

  const handleTryFaster = useCallback(() => {
    const order = KEY_CURRENT_DIFFICULTIES.map((d) => d.id);
    const currentIndex = order.indexOf(settingsRef.current.difficulty);
    const nextId = order[Math.min(order.length - 1, currentIndex + 1)];
    updateSettings({ difficulty: nextId });
    setRunSummaries([]);
    setPreviews([]);
    startStage();
  }, [startStage, updateSettings]);

  /* ---------- pause / resume / exit ---------- */

  const togglePause = useCallback(() => {
    if (phase !== 'running' && phase !== 'countdown') return;
    const next = !pausedRef.current;
    setPaused(next);
    if (next) {
      runtime.pauseRound();
      stopMusic(false);
    } else {
      runtime.resumeRound();
      playMusic();
    }
  }, [phase, playMusic, runtime, stopMusic]);

  useEffect(() => {
    const handleVisibility = () => {
      if (
        document.visibilityState === 'hidden' &&
        (phaseRef.current === 'running' || phaseRef.current === 'countdown') &&
        !pausedRef.current
      ) {
        setPaused(true);
        runtime.pauseRound();
        stopMusic(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, [runtime, stopMusic]);

  const exitToLanding = useCallback(() => {
    clearAllTimeouts();
    if (phaseRef.current === 'running' || phaseRef.current === 'countdown') {
      runtime.endRound();
    }
    stopMusic(true);
    modeRef.current = 'hold';
    setPaused(false);
    setCharacterAnim('idle');
    setCountdownText(null);
    setPhase('landing');
  }, [clearAllTimeouts, runtime, stopMusic]);

  const restartRun = useCallback(() => {
    startRun(runTypeRef.current);
  }, [startRun]);

  const toggleMusic = useCallback(() => {
    const next = !settingsRef.current.musicEnabled;
    updateSettings({ musicEnabled: next });
    if (!next) {
      stopMusic(false);
    } else if (
      (phaseRef.current === 'running' || phaseRef.current === 'countdown') &&
      !pausedRef.current
    ) {
      // Called from a click, so this satisfies user-gesture requirements.
      if (musicRef.current) void musicRef.current.play().catch(() => {});
      else {
        settingsRef.current = { ...settingsRef.current, musicEnabled: true };
        playMusic();
      }
    }
  }, [playMusic, stopMusic, updateSettings]);

  /* ---------- render helpers ---------- */

const activeObstacle = obstacles[activeIndex] ?? null;

// V1 visual simplification: hide future gates until the current gate clears.
// This prevents distant gates from floating above the horizon/perspective plane.
const upcoming1 = null;
const upcoming2 = null;
  const currentTarget =
    activeObstacle && activeObstacle.status !== 'cleared'
      ? activeObstacle.targetKeys[activeObstacle.completedCount] ?? null
      : null;

  const inRunPhases =
    phase === 'countdown' || phase === 'running' || phase === 'run_complete';

  const [isWideDesktop, setIsWideDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsWideDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const guidedSummary = runSummaries.find(
    (summary) => summary.runType === 'guided_practice',
  );

  return (
    <main
      className="relative min-h-dvh w-full overflow-x-hidden bg-gradient-to-b from-blue-700 via-sky-700 to-blue-950"
      {...runtime.accessibilityDataAttributes}
    >
      {/* Skills Sea plate behind every screen. During runs the page copy is
          blurred + dimmed so it reads as ambient depth around the playfield
          instead of a repeated image, with no dark empty side blocks. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 bg-cover bg-[center_30%] transition-[filter] duration-500 sm:hidden ${
          inRunPhases ? 'scale-105 blur-[7px] brightness-[0.62] saturate-[0.9]' : ''
        }`}
        style={{ backgroundImage: `url(${KEY_CURRENT_BACKGROUNDS.mobile.src})` }}
      />
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 hidden bg-cover bg-[center_30%] transition-[filter] duration-500 sm:block ${
          inRunPhases ? 'scale-105 blur-[7px] brightness-[0.62] saturate-[0.9]' : ''
        }`}
        style={{ backgroundImage: `url(${KEY_CURRENT_BACKGROUNDS.desktop.src})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-blue-950/55"
      />

      <p aria-live="polite" className="sr-only">
        {phase === 'running' && currentTarget
          ? `Find the letter ${currentTarget}`
          : ''}
      </p>

      {phase === 'landing' && (
        <div className="relative mx-auto flex min-h-dvh w-full max-w-4xl flex-col justify-center px-3 py-4">
          <KeyCurrentLanding
            stage={stage}
            stages={trackAStages}
            settings={settings}
            onUpdateSettings={updateSettings}
            onStart={() => startStage()}
            onContinue={continueTrackA}
            onSelectStage={selectStage}
            savedXp={savedXp}
            savedLevel={savedLevel}
            completedStageIds={completedStageIds}
            bestAccuracy={bestAccuracy}
            trackAComplete={trackAComplete}
          />
        </div>
      )}

      {inRunPhases && (
        <div className="relative mx-auto flex h-dvh w-full max-w-5xl flex-col gap-2 px-2 py-2 sm:px-4 sm:py-3">
          <KeyCurrentHud
            stage={stage}
            runType={runType}
            obstaclesCleared={obstacles.filter((o) => o.status === 'removed' || o.status === 'cleared').length}
            obstaclesTotal={obstacles.length}
            difficulty={difficulty}
            paused={paused}
            musicEnabled={settings.musicEnabled}
            onTogglePause={togglePause}
            onToggleMusic={toggleMusic}
          />

          <div className="relative min-h-0 flex-1">
            <KeyCurrentPlayfield paused={paused} reducedMotion={runtime.reducedMotion}>
              {activeObstacle && activeObstacle.status !== 'removed' && (
                <KeyCurrentObstacle
                  ref={setActiveObstacleEl}
                  obstacle={activeObstacle}
                  role="active"
                  urgent={urgent}
                />
              )}

              <KeyCurrentCharacter
                character={character}
                anim={characterAnim}
                showBonkStars={characterAnim === 'collide'}
                className={styles.character}
              />

              {/* Voice Help is a stub in this checkpoint: visible guidance text. */}
              {settings.voiceHelpEnabled &&
                phase === 'running' &&
                currentTarget && (
                  <div
                    key={promptToken}
                    className={`${styles.voicePrompt} absolute left-1/2 top-2 z-30 -translate-x-1/2 rounded-full border-2 border-amber-300/80 bg-slate-950/80 px-4 py-1.5 text-base font-black text-amber-200 sm:text-lg`}
                  >
                    🗣️ Find {currentTarget}!
                  </div>
                )}

              {countdownText && (
                <div className="absolute inset-0 z-40 grid place-items-center">
                  <span
                    key={countdownText}
                    className={`${styles.countdownText} text-6xl font-black text-white drop-shadow-[0_6px_12px_rgba(2,44,79,0.8)] sm:text-7xl`}
                  >
                    {countdownText}
                  </span>
                </div>
              )}

              {paused && (
                <div className="absolute inset-0 z-50 grid place-items-center bg-blue-950/55 p-4 backdrop-blur-[2px]">
                  <div className={`${styles.seaPanel} flex w-full max-w-xs flex-col gap-2 p-4`}>
                    <h2 className="text-center text-2xl font-black text-white">
                      Paused
                    </h2>
                    <button
                      type="button"
                      onClick={togglePause}
                      className={`${styles.goldButton} px-4 py-3 text-lg`}
                    >
                      ▶ Resume
                    </button>
                    <button
                      type="button"
                      onClick={restartRun}
                      className={`${styles.blueButton} px-4 py-3`}
                    >
                      🔁 Restart Run
                    </button>
                    <div className="grid grid-cols-3 gap-1.5 text-xs">
                      {(
                        [
                          ['🎵', 'musicEnabled'],
                          ['🔔', 'sfxEnabled'],
                          ['💬', 'voiceHelpEnabled'],
                        ] as const
                      ).map(([icon, settingKey]) => (
                        <button
                          key={settingKey}
                          type="button"
                          aria-pressed={settings[settingKey]}
                          onClick={() => {
                            if (settingKey === 'musicEnabled') toggleMusic();
                            else
                              updateSettings({
                                [settingKey]: !settings[settingKey],
                              });
                          }}
                          className={`rounded-lg border px-2 py-2 font-bold ${
                            settings[settingKey]
                              ? 'border-teal-300/60 bg-teal-500/25 text-teal-100'
                              : 'border-slate-500/40 bg-slate-800 text-slate-400'
                          }`}
                        >
                          {icon} {settings[settingKey] ? 'On' : 'Off'}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={exitToLanding}
                      className="rounded-xl border border-rose-300/40 bg-blue-950/70 px-4 py-2.5 text-sm font-bold text-rose-200 transition hover:bg-blue-900/70"
                    >
                      🏝️ Exit to Shore
                    </button>
                  </div>
                </div>
              )}

              {phase === 'run_complete' && guidedSummary && (
                <div className="absolute inset-0 z-50 grid place-items-center bg-blue-950/50 p-4 backdrop-blur-[2px]">
                  <div className={`${styles.seaPanel} flex w-full max-w-sm flex-col items-center gap-3 p-5 text-center`}>
                    <h2 className="text-2xl font-black text-teal-200">
                      Guided Practice complete! 🌊
                    </h2>
                    <p className="text-sm text-sky-100/85 tabular-nums">
                      Accuracy {guidedSummary.accuracy}% ·{' '}
                      {guidedSummary.stats.obstaclesCleared} gates opened
                      {guidedSummary.stats.collisions > 0 &&
                        ` · ${guidedSummary.stats.collisions} practice ${
                          guidedSummary.stats.collisions === 1 ? 'bump' : 'bumps'
                        }`}
                    </p>
                    <p className="text-sm font-semibold text-amber-200">
                      Ready to show what you know?
                    </p>
                    <button
                      type="button"
                      onClick={() => startRun('proficiency_check')}
                      className={`${styles.goldButton} w-full px-4 py-3 text-lg`}
                    >
                      ⭐ Start Proficiency Check
                    </button>
                    <button
                      type="button"
                      onClick={exitToLanding}
                      className="text-sm font-bold text-sky-200/80 underline-offset-2 hover:underline"
                    >
                      Take a break instead
                    </button>
                  </div>
                </div>
              )}
            </KeyCurrentPlayfield>
          </div>

          <KeyCurrentKeyboardHelper
            activeKeys={stage.activeKeys}
            targetKey={phase === 'running' && !paused ? currentTarget : null}
            keyFlash={keyFlash}
            onTouchKey={(key) => handleGameKey(key, 'touch')}
            compact={isWideDesktop}
            disabled={phase !== 'running' || paused}
          />
        </div>
      )}

      {phase === 'stage_complete' && (
        <div className="relative mx-auto flex min-h-dvh w-full max-w-4xl flex-col justify-center px-3 py-4">
          <KeyCurrentCompletion
            stage={stage}
            runSummaries={runSummaries}
            settings={settings}
            previews={previews}
            canTryFaster={settings.difficulty !== 'expert'}
            nextStage={getNextStage(stage.stageId)}
            trackAComplete={trackAComplete}
            onReplay={() => startStage()}
            onContinue={continueAfterStage}
            onTryFaster={handleTryFaster}
            onBackToShore={exitToLanding}
          />
        </div>
      )}
    </main>
  );
}

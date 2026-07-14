'use client';

import styles from './keyCurrent.module.css';
import type {
  KeyCurrentDifficulty,
  KeyCurrentRunType,
  KeyCurrentStage,
} from './keyCurrentTypes';

type KeyCurrentHudProps = {
  stage: KeyCurrentStage;
  trackName: string;
  runType: KeyCurrentRunType;
  obstaclesCleared: number;
  obstaclesTotal: number;
  difficulty: KeyCurrentDifficulty;
  paused: boolean;
  musicEnabled: boolean;
  onTogglePause: () => void;
  onToggleMusic: () => void;
};

const RUN_LABEL: Record<KeyCurrentRunType, string> = {
  guided_practice: 'Guided Practice',
  proficiency_check: 'Proficiency Check',
};

/*
 * Track A is guided practice: no fail state, so the HUD deliberately shows
 * no bump/collision counter during the run. Gentle "practice bumps" appear
 * only in the end-of-stage summary.
 */
export function KeyCurrentHud({
  stage,
  trackName,
  runType,
  obstaclesCleared,
  obstaclesTotal,
  difficulty,
  paused,
  musicEnabled,
  onTogglePause,
  onToggleMusic,
}: KeyCurrentHudProps) {
  const progressPercent =
    obstaclesTotal > 0 ? Math.round((obstaclesCleared / obstaclesTotal) * 100) : 0;

  return (
    <header className="flex w-full items-stretch gap-1.5 sm:gap-3">
      <button
        type="button"
        onClick={onTogglePause}
        aria-label={paused ? 'Resume the run' : 'Pause the run'}
        className={`${styles.hudButton} self-center`}
      >
        {paused ? '▶' : '⏸'}
      </button>

      <div className={`${styles.hudPanel} min-w-0 flex-1 px-3 py-1.5`}>
        <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-wider text-blue-100 sm:text-xs">
          <span className="truncate">
            {trackName} · Stage {stage.stageNumber}{' '}
            <span className="normal-case text-blue-200/85">
              — {RUN_LABEL[runType]}
            </span>
          </span>
          <span className="flex-none tabular-nums text-amber-300">
            {obstaclesCleared}/{obstaclesTotal}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="flex-none text-sm leading-none" aria-hidden>
            ⭐
          </span>
          <div
            className={styles.hudProgressTrack}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Gates opened this run"
          >
            <div
              className={styles.hudProgressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div
        className={`${styles.hudPanel} hidden flex-none items-center px-3 sm:flex`}
      >
        <span
          className={`rounded-lg px-2 py-1 text-xs font-black ${difficulty.accentClass}`}
          title={`Speed: ${difficulty.label}`}
        >
          ⚡ {difficulty.label}
        </span>
      </div>

      <button
        type="button"
        onClick={onToggleMusic}
        aria-label={musicEnabled ? 'Mute music' : 'Turn music on'}
        aria-pressed={musicEnabled}
        className={`${styles.hudButton} self-center`}
      >
        {musicEnabled ? '🎵' : '🔇'}
      </button>
    </header>
  );
}

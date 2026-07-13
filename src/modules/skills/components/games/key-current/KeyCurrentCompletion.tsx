'use client';

import { SkillsRuntimeDebugPanel } from '../../runtime/SkillsRuntimeDebugPanel';
import { KeyCurrentCharacter } from './KeyCurrentCharacter';
import {
  aggregateStageAccuracy,
  aggregateStageCollisions,
  aggregateStageXp,
  earnedTryFasterOffer,
} from './keyCurrentScoring';
import { getKeyCurrentCharacter } from './keyCurrentTracks';
import styles from './keyCurrent.module.css';
import type { SkillPayloadPreview } from '../../../lib/runtime/skillsRuntimeTypes';
import type {
  KeyCurrentRunSummary,
  KeyCurrentSettings,
  KeyCurrentStage,
} from './keyCurrentTypes';

type KeyCurrentCompletionProps = {
  stage: KeyCurrentStage;
  runSummaries: KeyCurrentRunSummary[];
  settings: KeyCurrentSettings;
  previews: SkillPayloadPreview[];
  canTryFaster: boolean;
  nextStage: KeyCurrentStage | null;
  trackAComplete: boolean;
  onReplay: () => void;
  onContinue: () => void;
  onTryFaster: () => void;
  onBackToShore: () => void;
};

const RUN_LABEL: Record<string, string> = {
  guided_practice: 'Guided Practice',
  proficiency_check: 'Proficiency Check',
};

const COMPLETION_LABEL: Record<string, { text: string; className: string }> = {
  completed: { text: 'Completed', className: 'bg-sky-400/25 text-sky-100' },
  proficient: { text: 'Proficient', className: 'bg-teal-400/25 text-teal-100' },
  mastered: { text: 'Mastered', className: 'bg-amber-400/30 text-amber-100' },
};

export function KeyCurrentCompletion({
  stage,
  runSummaries,
  settings,
  previews,
  canTryFaster,
  nextStage,
  trackAComplete,
  onReplay,
  onContinue,
  onTryFaster,
  onBackToShore,
}: KeyCurrentCompletionProps) {
  const accuracy = aggregateStageAccuracy(runSummaries);
  const collisions = aggregateStageCollisions(runSummaries);
  const xp = aggregateStageXp(runSummaries);
  const offerFaster = canTryFaster && earnedTryFasterOffer(runSummaries);
  const character = getKeyCurrentCharacter(settings.characterId);
  const showDebugPanels = process.env.NODE_ENV === 'development';

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-1 py-2">
      <div className="relative h-24 w-20">
        <KeyCurrentCharacter
          character={character}
          anim="celebrate"
          className="absolute inset-x-0 bottom-0"
        />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-black text-amber-200 sm:text-4xl">
          {trackAComplete ? 'Track A complete' : 'Home Base stage complete'}
        </h2>
        <p className="mt-1 text-sm text-sky-100/85">
          {stage.stageName} is complete. Forward progress stays open, and
          replay is always available.
        </p>
      </div>

      <dl className="grid w-full grid-cols-3 gap-2 text-center">
        <div className={`${styles.seaPanel} px-2 py-3`}>
          <dt className="text-[11px] font-bold uppercase tracking-widest text-teal-300">
            Accuracy
          </dt>
          <dd className="mt-1 text-2xl font-black text-white tabular-nums">
            {accuracy}%
          </dd>
        </div>
        <div className={`${styles.seaPanel} px-2 py-3`}>
          <dt className="text-[11px] font-bold uppercase tracking-widest text-teal-300">
            Practice bumps
          </dt>
          <dd className="mt-1 text-2xl font-black text-white tabular-nums">
            {collisions}
          </dd>
        </div>
        <div className={`${styles.seaPanel} px-2 py-3`}>
          <dt className="text-[11px] font-bold uppercase tracking-widest text-teal-300">
            XP preview
          </dt>
          <dd className="mt-1 text-2xl font-black text-amber-300 tabular-nums">
            +{xp}
          </dd>
        </div>
      </dl>

      <div className="flex w-full flex-col gap-2">
        {runSummaries.map((summary) => {
          const completion = COMPLETION_LABEL[summary.completionType];
          return (
            <div
              key={summary.runType}
              className={`${styles.seaPanel} flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm`}
            >
              <span className="font-bold text-sky-100">
                {RUN_LABEL[summary.runType]}
              </span>
              <span className="text-sky-100/75 tabular-nums">
                {summary.accuracy}% - {summary.stats.obstaclesCleared} gates
                {summary.stats.collisions > 0 &&
                  ` - ${summary.stats.collisions} ${
                    summary.stats.collisions === 1 ? 'bump' : 'bumps'
                  }`}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-black ${completion.className}`}
              >
                {completion.text}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-sky-100/70">
        Keys practiced:{' '}
        {stage.activeKeys.map((key) => (
          <span
            key={key}
            className="mx-0.5 inline-grid h-6 w-6 place-items-center rounded border border-amber-300/70 bg-amber-400/20 align-middle font-black text-amber-200"
          >
            {key}
          </span>
        ))}
      </p>

      <div className="flex w-full max-w-md flex-col gap-2">
        {!trackAComplete && nextStage && (
          <button
            type="button"
            onClick={onContinue}
            className={`${styles.goldButton} w-full px-6 py-3 text-lg`}
          >
            Continue to Stage {nextStage.stageNumber}
          </button>
        )}
        {trackAComplete && (
          <button
            type="button"
            onClick={onBackToShore}
            className={`${styles.goldButton} w-full px-6 py-3 text-lg`}
          >
            Return to Track A map
          </button>
        )}
        {offerFaster && (
          <button
            type="button"
            onClick={onTryFaster}
            className="w-full rounded-2xl border-2 border-purple-200 bg-gradient-to-b from-purple-300 to-purple-500 px-6 py-3 text-lg font-black text-purple-950 shadow-[inset_0_2px_0_rgba(250,245,255,0.6),0_5px_0_rgba(88,28,135,0.8),0_10px_20px_rgba(3,22,56,0.4)] transition hover:brightness-105 active:translate-y-1"
          >
            Try Faster
          </button>
        )}
        <button
          type="button"
          onClick={onReplay}
          className={`${styles.blueButton} w-full px-6 py-3 text-lg`}
        >
          Replay this stage
        </button>
        {!trackAComplete && (
          <button
            type="button"
            onClick={onBackToShore}
            className="w-full rounded-xl border border-cyan-200/35 bg-blue-950/65 px-6 py-3 text-sm font-black text-cyan-100 transition hover:bg-blue-900/75"
          >
            Back to Track A map
          </button>
        )}
      </div>

      <p className="text-center text-[11px] text-sky-100/60">
        Progress and XP remain local preview values. No backend writes are made.
      </p>

      {showDebugPanels && previews.length > 0 && (
        <div className="mt-2 flex w-full flex-col gap-3">
          {previews.map((preview) => (
            <SkillsRuntimeDebugPanel
              key={preview.roundResult.roundId}
              preview={preview}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import type {
  KeyCurrentCompletionType,
  KeyCurrentDifficulty,
  KeyCurrentInputMode,
  KeyCurrentRunStats,
  KeyCurrentRunSummary,
  KeyCurrentRunType,
} from './keyCurrentTypes';

/**
 * First-attempt accuracy, per the design spec:
 * required inputs entered correctly before any wrong key ÷ total required inputs.
 * Returned as a percent (0–100).
 */
export function calculateFirstAttemptAccuracy(stats: KeyCurrentRunStats): number {
  if (stats.requiredInputs <= 0) return 0;
  const ratio = stats.correctFirstAttempts / stats.requiredInputs;
  return Math.round(Math.min(1, Math.max(0, ratio)) * 100);
}

export function resolveCompletionType(
  accuracy: number,
  collisions: number,
): KeyCurrentCompletionType {
  if (accuracy >= 95 && collisions === 0) return 'mastered';
  if (accuracy >= 85 && collisions <= 2) return 'proficient';
  return 'completed';
}

export function resolveInputMode(stats: KeyCurrentRunStats): KeyCurrentInputMode {
  if (stats.usedKeyboard && stats.usedTouch) return 'mixed';
  if (stats.usedKeyboard) return 'keyboard';
  if (stats.usedTouch) return 'touch';
  return 'none';
}

/**
 * XP proposal. Accuracy dominates; difficulty adds only a small bonus and
 * collisions trim a little. The server owns the final award at integration
 * time — this value is a preview-only hint.
 */
export function proposeRunXp(input: {
  runType: KeyCurrentRunType;
  accuracy: number;
  collisions: number;
  difficulty: KeyCurrentDifficulty;
}): number {
  const base = input.runType === 'guided_practice' ? 20 : 30;
  const accuracyBonus = Math.round((input.accuracy / 100) * 15);
  const difficultyBonus = input.difficulty.bolts;
  const collisionTrim = Math.min(6, input.collisions * 2);

  return Math.max(5, Math.min(60, base + accuracyBonus + difficultyBonus - collisionTrim));
}

export function summarizeRun(
  stats: KeyCurrentRunStats,
  difficulty: KeyCurrentDifficulty,
): KeyCurrentRunSummary {
  const accuracy = calculateFirstAttemptAccuracy(stats);
  return {
    runType: stats.runType,
    stats,
    accuracy,
    xpProposed: proposeRunXp({
      runType: stats.runType,
      accuracy,
      collisions: stats.collisions,
      difficulty,
    }),
    completionType: resolveCompletionType(accuracy, stats.collisions),
    inputMode: resolveInputMode(stats),
  };
}

export function aggregateStageAccuracy(summaries: KeyCurrentRunSummary[]): number {
  const totals = summaries.reduce(
    (acc, summary) => ({
      correct: acc.correct + summary.stats.correctFirstAttempts,
      required: acc.required + summary.stats.requiredInputs,
    }),
    { correct: 0, required: 0 },
  );
  if (totals.required <= 0) return 0;
  return Math.round((totals.correct / totals.required) * 100);
}

export function aggregateStageCollisions(summaries: KeyCurrentRunSummary[]): number {
  return summaries.reduce((sum, summary) => sum + summary.stats.collisions, 0);
}

export function aggregateStageXp(summaries: KeyCurrentRunSummary[]): number {
  return summaries.reduce((sum, summary) => sum + summary.xpProposed, 0);
}

/** Spec 15.5: offer Try Faster after a clean stage. */
export function earnedTryFasterOffer(summaries: KeyCurrentRunSummary[]): boolean {
  const collisions = aggregateStageCollisions(summaries);
  const incorrect = summaries.reduce(
    (sum, summary) => sum + summary.stats.incorrectInputs,
    0,
  );
  return collisions === 0 && incorrect <= 1;
}

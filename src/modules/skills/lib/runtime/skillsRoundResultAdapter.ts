import { requireSkillGameRegistryEntry } from './skillsGameRegistry';
import {
  SkillRoundResult,
  SkillRoundResultInput,
} from './skillsRuntimeTypes';

function makeRuntimeId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}:${crypto.randomUUID()}`;
  }
  return `${prefix}:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
}

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function normalizeAccuracyToRatio(
  accuracy: number,
  format: SkillRoundResultInput['accuracyFormat'] = 'percent',
) {
  const ratio = format === 'ratio' ? accuracy : accuracy / 100;
  return Number(clampNumber(ratio, 0, 1).toFixed(4));
}

export function buildSkillLessonId(input: {
  moduleId: string;
  gradeLevel?: string;
  difficulty?: string;
  taskType?: string | number | boolean | string[] | number[] | null;
}) {
  const parts = [
    input.moduleId,
    input.gradeLevel,
    input.difficulty,
    typeof input.taskType === 'string' ? input.taskType : undefined,
  ]
    .filter(Boolean)
    .map((part) =>
      String(part)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, ''),
    );

  return parts.length > 1 ? parts.join(':') : `${input.moduleId}:lesson_preview`;
}

export function createSkillRoundResult(
  input: SkillRoundResultInput,
): SkillRoundResult {
  const registryEntry = requireSkillGameRegistryEntry(input.gameKey);
  const completedAt = input.completedAt ?? new Date().toISOString();
  const metadata = input.metadata ?? {};
  const difficulty = input.difficulty ?? 'grade_based';
  const lessonId =
    input.lessonId ??
    buildSkillLessonId({
      moduleId: registryEntry.moduleId,
      gradeLevel: input.gradeLevel,
      difficulty,
      taskType: metadata.taskType,
    });

  return {
    moduleId: registryEntry.moduleId,
    gameKey: registryEntry.gameKey,
    activityType: input.activityType ?? 'lesson_complete',
    lessonId,
    roundId: input.roundId ?? makeRuntimeId(`${registryEntry.moduleId}:round`),
    sessionId:
      input.sessionId ?? makeRuntimeId(`${registryEntry.moduleId}:session`),
    status: input.status ?? 'completed',
    score: Math.max(0, input.score),
    accuracy: normalizeAccuracyToRatio(input.accuracy, input.accuracyFormat),
    durationMs: Math.max(0, Math.round(input.durationMs ?? 0)),
    roundAttempt: Math.max(1, Math.round(input.roundAttempt ?? 1)),
    interactionAttempts: Math.max(
      0,
      Math.round(input.interactionAttempts ?? input.roundAttempt ?? 1),
    ),
    difficulty,
    xpProposed: Math.max(0, Math.round(input.xpProposed)),
    baseXP: Math.max(0, Math.round(input.baseXP ?? input.xpProposed)),
    maxCombo: input.maxCombo,
    bestStreak: input.bestStreak,
    mistakeCount:
      typeof input.mistakeCount === 'number'
        ? Math.max(0, Math.round(input.mistakeCount))
        : undefined,
    completedAt,
    gradeLevel: input.gradeLevel,
    metadata,
  };
}

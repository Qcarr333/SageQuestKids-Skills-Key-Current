import { requireSkillGameRegistryEntry } from './skillsGameRegistry';
import {
  SkillPayloadPreview,
  SkillProgressPreviewPayload,
  SkillRoundResult,
  SkillXpEventPreviewPayload,
} from './skillsRuntimeTypes';

export function createSkillsIdempotencyKey(roundResult: SkillRoundResult) {
  return [
    'skills',
    roundResult.moduleId,
    roundResult.activityType,
    `lesson:${roundResult.lessonId}`,
    `session:${roundResult.sessionId}`,
    `attempt:${roundResult.roundAttempt}`,
  ].join(':');
}

export function createSkillXpEventPreviewPayload(
  roundResult: SkillRoundResult,
): SkillXpEventPreviewPayload {
  return {
    previewOnly: true,
    moduleId: roundResult.moduleId,
    lessonId: roundResult.lessonId,
    activityType: roundResult.activityType,
    score: roundResult.score,
    accuracy: roundResult.accuracy,
    durationMs: roundResult.durationMs,
    attempt: roundResult.roundAttempt,
    difficulty: String(roundResult.difficulty),
    xpProposed: roundResult.xpProposed,
    sessionId: roundResult.sessionId,
    idempotencyKey: createSkillsIdempotencyKey(roundResult),
    metadata: {
      ...roundResult.metadata,
      previewSource: 'local_only',
      interactionAttempts: roundResult.interactionAttempts,
      baseXP: roundResult.baseXP,
      roundId: roundResult.roundId,
      gradeLevel: roundResult.gradeLevel,
    },
  };
}

export function createSkillProgressPreviewPayload(
  roundResult: SkillRoundResult,
): SkillProgressPreviewPayload {
  return {
    previewOnly: true,
    moduleId: roundResult.moduleId,
    lessonId: roundResult.lessonId,
    status: roundResult.status,
    score: roundResult.score,
    accuracy: roundResult.accuracy,
    durationMs: roundResult.durationMs,
    attempt: roundResult.roundAttempt,
    maxCombo: roundResult.maxCombo ?? roundResult.bestStreak,
    mistakeCount: roundResult.mistakeCount,
    completedAt: roundResult.completedAt,
    metadata: {
      ...roundResult.metadata,
      previewSource: 'local_only',
      interactionAttempts: roundResult.interactionAttempts,
      baseXP: roundResult.baseXP,
      roundId: roundResult.roundId,
      gradeLevel: roundResult.gradeLevel,
    },
  };
}

export function createSkillPayloadPreview(
  roundResult: SkillRoundResult,
): SkillPayloadPreview {
  return {
    previewOnly: true,
    registryEntry: requireSkillGameRegistryEntry(roundResult.moduleId),
    roundResult,
    xpEvent: createSkillXpEventPreviewPayload(roundResult),
    progress: createSkillProgressPreviewPayload(roundResult),
  };
}

export function logSkillPayloadPreview(preview: SkillPayloadPreview) {
  if (typeof console !== 'undefined') {
    console.info('[skills-runtime-preview]', preview);
  }
  return preview;
}

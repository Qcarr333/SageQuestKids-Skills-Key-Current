/**
 * Local preview implementation of the main-project gaming progress service.
 *
 * In the main Sage Quest Kids project this module is provided by
 * `src/lib/gaming/progress` and is backed by authenticated server routes.
 * In this portable Skills workspace it is a fail-soft localStorage stand-in
 * so games can exercise the `progressAdapter` contract without any backend
 * or Supabase writes.
 */

export type UserGameProgress = {
  gameKey: string;
  xp: number;
  level: number;
  completedLessons: string[];
  bestAccuracy: Record<string, number>;
  settings: Record<string, string | number | boolean>;
  updatedAt: string;
};

const STORAGE_PREFIX = 'sqk-skills-progress-preview';

function storageKey(gameKey: string) {
  return `${STORAGE_PREFIX}:${gameKey}`;
}

export function calculateLevelFromXP(xp: number): number {
  if (!Number.isFinite(xp) || xp <= 0) return 1;
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

function createEmptyProgress(gameKey: string): UserGameProgress {
  return {
    gameKey,
    xp: 0,
    level: 1,
    completedLessons: [],
    bestAccuracy: {},
    settings: {},
    updatedAt: new Date().toISOString(),
  };
}

export function getUserGameProgress(gameKey: string): UserGameProgress {
  if (typeof window === 'undefined') return createEmptyProgress(gameKey);

  try {
    const raw = window.localStorage.getItem(storageKey(gameKey));
    if (!raw) return createEmptyProgress(gameKey);
    const parsed = JSON.parse(raw) as Partial<UserGameProgress>;
    return {
      ...createEmptyProgress(gameKey),
      ...parsed,
      gameKey,
      level: calculateLevelFromXP(Number(parsed.xp ?? 0)),
    };
  } catch {
    return createEmptyProgress(gameKey);
  }
}

export function saveUserGameProgress(
  progress: UserGameProgress,
): UserGameProgress {
  const next: UserGameProgress = {
    ...progress,
    level: calculateLevelFromXP(progress.xp),
    updatedAt: new Date().toISOString(),
  };

  if (typeof window === 'undefined') return next;

  try {
    window.localStorage.setItem(
      storageKey(progress.gameKey),
      JSON.stringify(next),
    );
  } catch {
    // Fail-soft: preview persistence is best-effort only.
  }

  return next;
}

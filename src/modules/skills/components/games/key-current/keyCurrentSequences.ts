import type {
  KeyCurrentObstacle,
  KeyCurrentObstacleSkin,
  KeyCurrentRunType,
  KeyCurrentStage,
} from './keyCurrentTypes';

const OBSTACLE_SKINS: KeyCurrentObstacleSkin[] = [
  'coral_gate',
  'driftwood_gate',
  'energy_gate',
];

const KID_SAFE_BLOCKED_SUBSTRINGS = [
  'ASS',
  'BUTT',
  'DAMN',
  'HELL',
  'SEX',
  'XXX',
  'FAG',
  'DYKE',
  'SLUT',
  'WHORE',
  'BITCH',
  'PISS',
  'CRAP',
  'CUM',
  'DICK',
  'COCK',
  'PUSSY',
];

let obstacleIdCounter = 0;

function nextObstacleId() {
  obstacleIdCounter += 1;
  return `kc-obstacle-${obstacleIdCounter}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Guided Practice: predictable, gently structured order.
 * For a two-key stage like F/J this produces the spec's example shape:
 * F – J – F – J – F – J – J – F
 */
export function buildGuidedPracticeSequence(stage: KeyCurrentStage): string[] {
  return guardKidSafeSequence(buildGuidedPracticeSequenceUnsafe(stage), stage.activeKeys);
}

/**
 * Proficiency Check: balanced but less predictable order.
 * - every key appears an equal (±1) number of times
 * - no key repeats more than twice in a row
 * - regenerated (re-randomized) on every call, so replays differ
 */
export function buildProficiencySequence(stage: KeyCurrentStage): string[] {
  const keys = stage.activeKeys;
  const count = stage.proficiencyObstacleCount;

  const pool = ensureBalancedKeyCoverage(keys, count);

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (!hasLongRepeat(shuffled, 2) && isKidSafeSequence(shuffled)) {
      return shuffled;
    }
  }

  // Fallback: deterministic balanced alternation (still valid, just tamer).
  return guardKidSafeSequence(pool, keys);
}

export const buildProficiencyCheckSequence = buildProficiencySequence;

export function ensureBalancedKeyCoverage(keys: string[], count: number): string[] {
  const pool: string[] = [];
  for (let i = 0; i < count; i += 1) {
    pool.push(keys[i % keys.length]);
  }
  return pool;
}

export function generateReplaySequence(
  stage: KeyCurrentStage,
  runType: KeyCurrentRunType,
): string[] {
  return runType === 'guided_practice'
    ? buildGuidedPracticeSequence(stage)
    : buildProficiencySequence(stage);
}

function buildGuidedPracticeSequenceUnsafe(stage: KeyCurrentStage): string[] {
  const keys = stage.activeKeys;
  const count = stage.practiceObstacleCount;
  const sequence: string[] = [];

  for (let i = 0; i < count; i += 1) {
    sequence.push(keys[i % keys.length]);
  }

  // Break pure alternation near the end so the learner reads, not memorizes.
  if (keys.length >= 2 && count >= 4) {
    sequence[count - 2] = sequence[count - 3];
    sequence[count - 1] = keys[0] === sequence[count - 2] ? keys[1] : keys[0];
  }

  return sequence;
}

function isKidSafeSequence(sequence: string[]): boolean {
  const joined = sequence.join('');
  return !KID_SAFE_BLOCKED_SUBSTRINGS.some((blocked) => joined.includes(blocked));
}

function findBlockedIndex(sequence: string[]): number {
  const joined = sequence.join('');
  const match = KID_SAFE_BLOCKED_SUBSTRINGS.map((blocked) =>
    joined.includes(blocked) ? joined.indexOf(blocked) : -1,
  ).filter((index) => index >= 0);
  return match.length > 0 ? Math.min(...match) : -1;
}

function guardKidSafeSequence(sequence: string[], keys: string[]): string[] {
  if (isKidSafeSequence(sequence)) return sequence;

  let repaired = [...sequence];
  for (let attempt = 0; attempt < 32; attempt += 1) {
    repaired = repairKidSafeSequence(repaired, keys);
    if (isKidSafeSequence(repaired) && !hasLongRepeat(repaired, 2)) {
      return repaired;
    }
  }

  return buildDeterministicSafeSequence(repaired, keys);
}

function repairKidSafeSequence(sequence: string[], keys: string[]): string[] {
  const repaired = [...sequence];
  const blockedIndex = findBlockedIndex(repaired);
  if (blockedIndex < 0) return repaired;

  const swapFrom = Math.min(repaired.length - 1, blockedIndex + 1);
  const replacementIndex = repaired.findIndex(
    (key, index) =>
      index > swapFrom + 1 &&
      key !== repaired[swapFrom - 1] &&
      key !== repaired[swapFrom],
  );

  if (replacementIndex >= 0) {
    [repaired[swapFrom], repaired[replacementIndex]] = [
      repaired[replacementIndex],
      repaired[swapFrom],
    ];
    return repaired;
  }

  const replacement = keys.find(
    (key) => key !== repaired[swapFrom] && key !== repaired[swapFrom - 1],
  );
  if (replacement) repaired[swapFrom] = replacement;
  return repaired;
}

function ensureNoLongRepeat(sequence: string[]): string[] {
  const repaired = [...sequence];
  for (let i = 2; i < repaired.length; i += 1) {
    if (repaired[i] === repaired[i - 1] && repaired[i] === repaired[i - 2]) {
      const swapIndex = repaired.findIndex(
        (key, index) => index > i && key !== repaired[i],
      );
      if (swapIndex >= 0) {
        [repaired[i], repaired[swapIndex]] = [repaired[swapIndex], repaired[i]];
      }
    }
  }
  return repaired;
}

function buildDeterministicSafeSequence(sequence: string[], keys: string[]): string[] {
  const counts = new Map<string, number>();
  const keyOrder = keys.length > 0 ? keys : [...new Set(sequence)];
  keyOrder.forEach((key) => counts.set(key, 0));
  sequence.forEach((key) => counts.set(key, (counts.get(key) ?? 0) + 1));

  const repaired: string[] = [];
  for (let index = 0; index < sequence.length; index += 1) {
    const candidates = keyOrder
      .filter((key) => (counts.get(key) ?? 0) > 0)
      .sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));

    const safeCandidate =
      candidates.find((key) => {
        const next = [...repaired, key];
        return !hasLongRepeat(next, 2) && isKidSafeSequence(next);
      }) ??
      candidates.find((key) => isKidSafeSequence([...repaired, key])) ??
      candidates[0];

    if (!safeCandidate) break;
    repaired.push(safeCandidate);
    counts.set(safeCandidate, (counts.get(safeCandidate) ?? 1) - 1);
  }

  if (
    repaired.length === sequence.length &&
    isKidSafeSequence(repaired) &&
    !hasLongRepeat(repaired, 2)
  ) {
    return repaired;
  }

  let fallback = ensureBalancedKeyCoverage(keyOrder, sequence.length).filter(Boolean);
  for (let attempt = 0; attempt < 32; attempt += 1) {
    if (isKidSafeSequence(fallback) && !hasLongRepeat(fallback, 2)) {
      return fallback;
    }
    fallback = repairKidSafeSequence(fallback, keyOrder);
  }

  const lastChance: string[] = [];
  for (let index = 0; index < sequence.length; index += 1) {
    const candidate = keyOrder.find((key) => {
      const next = [...lastChance, key];
      return !hasLongRepeat(next, 2) && isKidSafeSequence(next);
    });
    if (candidate) lastChance.push(candidate);
  }

  return lastChance;
}

function hasLongRepeat(sequence: string[], maxRun: number) {
  let run = 1;
  for (let i = 1; i < sequence.length; i += 1) {
    run = sequence[i] === sequence[i - 1] ? run + 1 : 1;
    if (run > maxRun) return true;
  }
  return false;
}

export function buildRunObstacles(
  stage: KeyCurrentStage,
  runType: KeyCurrentRunType,
): KeyCurrentObstacle[] {
  const sequence = generateReplaySequence(stage, runType);

  return sequence.map((key, index) => ({
    id: nextObstacleId(),
    targetKeys: [key],
    completedCount: 0,
    status: index === 0 ? 'approaching' : 'pending',
    skin: OBSTACLE_SKINS[index % OBSTACLE_SKINS.length],
    collisions: 0,
    hadWrongAttempt: false,
  }));
}

export function countRequiredInputs(obstacles: KeyCurrentObstacle[]) {
  return obstacles.reduce((sum, obstacle) => sum + obstacle.targetKeys.length, 0);
}

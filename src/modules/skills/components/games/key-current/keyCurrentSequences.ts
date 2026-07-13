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
  const keys = stage.activeKeys;
  const count = stage.practiceObstacleCount;
  const sequence: string[] = [];

  for (let i = 0; i < count; i += 1) {
    sequence.push(keys[i % keys.length]);
  }

  // Break pure alternation near the end so the learner reads, not memorizes:
  // repeat the second key once, then finish on the first key.
  if (keys.length >= 2 && count >= 4) {
    sequence[count - 2] = sequence[count - 3];
    sequence[count - 1] = keys[0] === sequence[count - 2] ? keys[1] : keys[0];
  }

  return sequence;
}

/**
 * Proficiency Check: balanced but less predictable order.
 * - every key appears an equal (±1) number of times
 * - no key repeats more than twice in a row
 * - regenerated (re-randomized) on every call, so replays differ
 */
export function buildProficiencyCheckSequence(stage: KeyCurrentStage): string[] {
  const keys = stage.activeKeys;
  const count = stage.proficiencyObstacleCount;

  const pool: string[] = [];
  for (let i = 0; i < count; i += 1) {
    pool.push(keys[i % keys.length]);
  }

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (!hasLongRepeat(shuffled, 2)) {
      return shuffled;
    }
  }

  // Fallback: deterministic balanced alternation (still valid, just tamer).
  return pool;
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
  const sequence =
    runType === 'guided_practice'
      ? buildGuidedPracticeSequence(stage)
      : buildProficiencyCheckSequence(stage);

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

export type KeyCurrentRunType = 'guided_practice' | 'proficiency_check';

export type KeyCurrentInputMode = 'keyboard' | 'touch' | 'mixed' | 'none';

export type KeyCurrentDifficultyId = 'easy' | 'steady' | 'fast' | 'expert';

export type KeyCurrentDifficulty = {
  id: KeyCurrentDifficultyId;
  label: string;
  bolts: number;
  /** Full approach time for a fresh obstacle, in ms. */
  approachMs: number;
  /** Progress point (0..1) an obstacle resets to after a collision bounce. */
  reapproachProgress: number;
  /** Accent color classes for the difficulty selector. */
  accentClass: string;
};

export type KeyCurrentObstacleSkin = 'coral_gate' | 'driftwood_gate' | 'energy_gate';

export type KeyCurrentObstacleStatus =
  | 'pending'
  | 'approaching'
  | 'collided'
  | 'cleared'
  | 'removed';

export type KeyCurrentObstacle = {
  id: string;
  /** Required keys in order. Track A Stage 1 uses a single letter. */
  targetKeys: string[];
  targetKind?: 'key' | 'word';
  targetWord?: string;
  /** How many of targetKeys have been completed (survives collisions). */
  completedCount: number;
  status: KeyCurrentObstacleStatus;
  skin: KeyCurrentObstacleSkin;
  collisions: number;
  /** True once any wrong key was pressed while this obstacle was active. */
  hadWrongAttempt: boolean;
};

export type KeyCurrentStageFailureMode = 'guided' | 'three_collision';

export type KeyCurrentStageTargetKind = 'key' | 'word';

export type KeyCurrentStage = {
  stageId: string;
  trackId: string;
  stageName: string;
  stageNumber: number;
  targetKind?: KeyCurrentStageTargetKind;
  activeKeys: string[];
  wordBank?: string[];
  wordLengthLabel?: string;
  practiceObstacleCount: number;
  proficiencyObstacleCount: number;
  failureMode: KeyCurrentStageFailureMode;
  status: 'available' | 'coming_soon';
};

export type KeyCurrentTrack = {
  trackId: string;
  trackName: string;
  tagline: string;
  status: 'available' | 'coming_soon';
  stages: KeyCurrentStage[];
};

export type KeyCurrentCharacterId =
  | 'turtle'
  | 'phoenix'
  | 'owl'
  | 'fox'
  | 'boy'
  | 'girl';

export type KeyCurrentCharacter = {
  characterId: KeyCurrentCharacterId;
  name: string;
  description: string;
  /**
   * Palette used by the SVG renderer (rear-view runner). Matched to the v2
   * mascot sheets, which stay reference-only until transparent frames exist.
   */
  palette: {
    body: string;
    bodyShade: string;
    pack: string;
    packShade: string;
    accent: string;
    hat: string;
    hatBand: string;
    detail: string;
  };
};

export type KeyCurrentCharacterAnim = 'idle' | 'run' | 'collide' | 'celebrate';

export type KeyCurrentPhase =
  | 'landing'
  | 'countdown'
  | 'running'
  | 'run_complete'
  | 'restart'
  | 'stage_complete';

export type KeyCurrentSettings = {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  voiceHelpEnabled: boolean;
  difficulty: KeyCurrentDifficultyId;
  characterId: string;
};

export type KeyCurrentRunStats = {
  runType: KeyCurrentRunType;
  requiredInputs: number;
  correctFirstAttempts: number;
  incorrectInputs: number;
  collisions: number;
  obstaclesCleared: number;
  wordGatesCleared: number;
  totalWordGates: number;
  usedKeyboard: boolean;
  usedTouch: boolean;
  durationMs: number;
};

export type KeyCurrentCompletionType = 'completed' | 'proficient' | 'mastered';

export type KeyCurrentRunSummary = {
  runType: KeyCurrentRunType;
  stats: KeyCurrentRunStats;
  accuracy: number;
  xpProposed: number;
  completionType: KeyCurrentCompletionType;
  inputMode: KeyCurrentInputMode;
};

export type KeyCurrentKeyFlash = {
  key: string;
  kind: 'correct' | 'wrong';
  /** Increments so repeated flashes on the same key restart the animation. */
  token: number;
};

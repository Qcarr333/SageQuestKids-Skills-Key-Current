export type SkillGameCategory =
  | 'keyboard'
  | 'mouse'
  | 'drag_drop'
  | 'timing'
  | 'memory'
  | 'puzzle'
  | 'mixed'
  | 'support';

export type SkillGameImplementationStatus =
  | 'playable'
  | 'shared_support'
  | 'missing_runtime';

export type SkillGameKey =
  | 'typing_meteor_defense'
  | 'story_sort'
  | 'target_tracker_adventure'
  | 'word_builder_farm'
  | 'math_key_quest'
  | 'bug_trail_maze'
  | 'rhythm_row_typing'
  | 'code_keys_workshop'
  | 'galaxy_click_command'
  | 'circuit_builder_lab'
  | 'gravity_workshop'
  | 'discovery_trails'
  | 'word_storm'
  | 'memory_match'
  | 'cipher_quest'
  | 'droplets'
  | 'shakerz'
  | 'shape_shifter'
  | 'keyboard_expedition'
  | 'precision_painter_studio'
  | 'keyboard_coach'
  | 'key_current';

export type SkillActivityType =
  | 'lesson_complete'
  | 'challenge_complete'
  | 'streak_bonus'
  | 'milestone_bonus';

export type SkillProgressStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'mastered';

export type SkillDifficulty = 'easy' | 'medium' | 'hard' | 'grade_based';

export type SkillGameRegistryEntry = {
  moduleId: SkillGameKey;
  gameKey: SkillGameKey;
  title: string;
  route: string | null;
  componentFolder: string | null;
  assetFolder: string | null;
  aliases: string[];
  category: SkillGameCategory;
  status: SkillGameImplementationStatus;
  notes?: string;
};

export type SkillRoundResultMetadata = Record<
  string,
  string | number | boolean | string[] | number[] | null | undefined
>;

export type SkillRoundResult = {
  moduleId: SkillGameKey;
  gameKey: SkillGameKey;
  activityType: SkillActivityType;
  lessonId: string;
  roundId: string;
  sessionId: string;
  status: SkillProgressStatus;
  score: number;
  accuracy: number;
  durationMs: number;
  roundAttempt: number;
  interactionAttempts: number;
  difficulty: SkillDifficulty | string;
  xpProposed: number;
  baseXP: number;
  maxCombo?: number;
  bestStreak?: number;
  mistakeCount?: number;
  completedAt: string;
  gradeLevel?: string;
  metadata?: SkillRoundResultMetadata;
};

export type SkillRoundResultInput = {
  gameKey: SkillGameKey | string;
  activityType?: SkillActivityType;
  lessonId?: string;
  roundId?: string;
  sessionId?: string;
  status?: SkillProgressStatus;
  score: number;
  accuracy: number;
  accuracyFormat?: 'percent' | 'ratio';
  durationMs?: number;
  roundAttempt?: number;
  interactionAttempts?: number;
  difficulty?: SkillDifficulty | string;
  xpProposed: number;
  baseXP?: number;
  maxCombo?: number;
  bestStreak?: number;
  mistakeCount?: number;
  completedAt?: string;
  gradeLevel?: string;
  metadata?: SkillRoundResultMetadata;
};

export type SkillXpEventPreviewPayload = {
  previewOnly: true;
  moduleId: SkillGameKey;
  lessonId: string;
  activityType: SkillActivityType;
  score: number;
  accuracy: number;
  durationMs: number;
  attempt: number;
  difficulty: string;
  xpProposed: number;
  sessionId: string;
  idempotencyKey: string;
  metadata: SkillRoundResultMetadata;
};

export type SkillProgressPreviewPayload = {
  previewOnly: true;
  moduleId: SkillGameKey;
  lessonId: string;
  status: SkillProgressStatus;
  score: number;
  accuracy: number;
  durationMs: number;
  attempt: number;
  maxCombo?: number;
  mistakeCount?: number;
  completedAt: string;
  metadata: SkillRoundResultMetadata;
};

export type SkillPayloadPreview = {
  previewOnly: true;
  registryEntry: SkillGameRegistryEntry;
  roundResult: SkillRoundResult;
  xpEvent: SkillXpEventPreviewPayload;
  progress: SkillProgressPreviewPayload;
};

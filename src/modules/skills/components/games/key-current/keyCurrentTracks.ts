import type {
  KeyCurrentCharacter,
  KeyCurrentDifficulty,
  KeyCurrentDifficultyId,
  KeyCurrentStage,
  KeyCurrentTrack,
} from './keyCurrentTypes';

export const KEY_CURRENT_DIFFICULTIES: KeyCurrentDifficulty[] = [
  {
    id: 'easy',
    label: 'Easy',
    bolts: 1,
    approachMs: 9000,
    reapproachProgress: 0.3,
    accentClass: 'bg-emerald-400 text-emerald-950',
  },
  {
    id: 'steady',
    label: 'Steady',
    bolts: 2,
    approachMs: 7000,
    reapproachProgress: 0.35,
    accentClass: 'bg-lime-300 text-lime-950',
  },
  {
    id: 'fast',
    label: 'Fast',
    bolts: 3,
    approachMs: 5200,
    reapproachProgress: 0.4,
    accentClass: 'bg-orange-400 text-orange-950',
  },
  {
    id: 'expert',
    label: 'Expert',
    bolts: 4,
    approachMs: 3900,
    reapproachProgress: 0.45,
    accentClass: 'bg-purple-400 text-purple-950',
  },
];

export function getKeyCurrentDifficulty(
  id: KeyCurrentDifficultyId,
): KeyCurrentDifficulty {
  return (
    KEY_CURRENT_DIFFICULTIES.find((difficulty) => difficulty.id === id) ??
    KEY_CURRENT_DIFFICULTIES[0]
  );
}

export const TRACK_A_STAGE_1: KeyCurrentStage = {
  stageId: 'track_a_stage_1_f_j',
  trackId: 'track_a_home_base',
  stageName: 'F and J',
  stageNumber: 1,
  activeKeys: ['F', 'J'],
  practiceObstacleCount: 8,
  proficiencyObstacleCount: 12,
  failureMode: 'guided',
  status: 'available',
};

const TRACK_A_HOME_BASE_STAGES: KeyCurrentStage[] = [
  TRACK_A_STAGE_1,
  {
    stageId: 'track_a_stage_2_d_k',
    trackId: 'track_a_home_base',
    stageName: 'D and K',
    stageNumber: 2,
    activeKeys: ['D', 'K'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'guided',
    status: 'available',
  },
  {
    stageId: 'track_a_stage_3_s_l',
    trackId: 'track_a_home_base',
    stageName: 'S and L',
    stageNumber: 3,
    activeKeys: ['S', 'L'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'guided',
    status: 'available',
  },
  {
    stageId: 'track_a_stage_4_asdf',
    trackId: 'track_a_home_base',
    stageName: 'A S D F',
    stageNumber: 4,
    activeKeys: ['A', 'S', 'D', 'F'],
    practiceObstacleCount: 12,
    proficiencyObstacleCount: 16,
    failureMode: 'guided',
    status: 'available',
  },
  {
    stageId: 'track_a_stage_5_jkl',
    trackId: 'track_a_home_base',
    stageName: 'J K L',
    stageNumber: 5,
    activeKeys: ['J', 'K', 'L'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 12,
    failureMode: 'guided',
    status: 'available',
  },
  {
    stageId: 'track_a_stage_6_home_row',
    trackId: 'track_a_home_base',
    stageName: 'A S D F J K L',
    stageNumber: 6,
    activeKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L'],
    practiceObstacleCount: 14,
    proficiencyObstacleCount: 20,
    failureMode: 'guided',
    status: 'available',
  },
  {
    stageId: 'track_a_stage_7_review',
    trackId: 'track_a_home_base',
    stageName: 'Mixed Home Base Review',
    stageNumber: 7,
    activeKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L'],
    practiceObstacleCount: 14,
    proficiencyObstacleCount: 21,
    failureMode: 'guided',
    status: 'available',
  },
];

const TRACK_B_CENTER_REACH_STAGES: KeyCurrentStage[] = [
  {
    stageId: 'track_b_stage_1_f_g',
    trackId: 'track_b_center_reach',
    stageName: 'F and G',
    stageNumber: 1,
    activeKeys: ['F', 'G'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_2_j_h',
    trackId: 'track_b_center_reach',
    stageName: 'J and H',
    stageNumber: 2,
    activeKeys: ['J', 'H'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_3_r_u',
    trackId: 'track_b_center_reach',
    stageName: 'F and R',
    stageNumber: 3,
    activeKeys: ['F', 'R'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_4_t_y',
    trackId: 'track_b_center_reach',
    stageName: 'J and U',
    stageNumber: 4,
    activeKeys: ['J', 'U'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_5_v_n',
    trackId: 'track_b_center_reach',
    stageName: 'F and T',
    stageNumber: 5,
    activeKeys: ['F', 'T'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_6_b_m',
    trackId: 'track_b_center_reach',
    stageName: 'J and Y',
    stageNumber: 6,
    activeKeys: ['J', 'Y'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_7_f_v',
    trackId: 'track_b_center_reach',
    stageName: 'F and V',
    stageNumber: 7,
    activeKeys: ['F', 'V'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_8_j_n',
    trackId: 'track_b_center_reach',
    stageName: 'J and N',
    stageNumber: 8,
    activeKeys: ['J', 'N'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_9_f_b',
    trackId: 'track_b_center_reach',
    stageName: 'F and B',
    stageNumber: 9,
    activeKeys: ['F', 'B'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_10_j_m',
    trackId: 'track_b_center_reach',
    stageName: 'J and M',
    stageNumber: 10,
    activeKeys: ['J', 'M'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_11_f_t_v',
    trackId: 'track_b_center_reach',
    stageName: 'F T V',
    stageNumber: 11,
    activeKeys: ['F', 'T', 'V'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_12_j_n_u',
    trackId: 'track_b_center_reach',
    stageName: 'J N U',
    stageNumber: 12,
    activeKeys: ['J', 'N', 'U'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_13_f_b_r',
    trackId: 'track_b_center_reach',
    stageName: 'F B R',
    stageNumber: 13,
    activeKeys: ['F', 'B', 'R'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_14_j_m_y',
    trackId: 'track_b_center_reach',
    stageName: 'J M Y',
    stageNumber: 14,
    activeKeys: ['J', 'M', 'Y'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_15_left_center',
    trackId: 'track_b_center_reach',
    stageName: 'Left Center Reach Review',
    stageNumber: 15,
    activeKeys: ['F', 'G', 'R', 'T', 'V', 'B'],
    practiceObstacleCount: 14,
    proficiencyObstacleCount: 18,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_16_right_center',
    trackId: 'track_b_center_reach',
    stageName: 'Right Center Reach Review',
    stageNumber: 16,
    activeKeys: ['J', 'H', 'U', 'Y', 'N', 'M'],
    practiceObstacleCount: 14,
    proficiencyObstacleCount: 18,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_b_stage_17_center_review',
    trackId: 'track_b_center_reach',
    stageName: 'Mixed Center Reach Review',
    stageNumber: 17,
    activeKeys: ['F', 'G', 'R', 'T', 'V', 'B', 'J', 'H', 'U', 'Y', 'N', 'M'],
    practiceObstacleCount: 18,
    proficiencyObstacleCount: 24,
    failureMode: 'three_collision',
    status: 'available',
  },
];

const TRACK_C_OUTER_REACH_STAGES: KeyCurrentStage[] = [
  {
    stageId: 'track_c_stage_1_d_c',
    trackId: 'track_c_outer_reach',
    stageName: 'D and C',
    stageNumber: 1,
    activeKeys: ['D', 'C'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_2_d_e',
    trackId: 'track_c_outer_reach',
    stageName: 'D and E',
    stageNumber: 2,
    activeKeys: ['D', 'E'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_3_d_e_c',
    trackId: 'track_c_outer_reach',
    stageName: 'D E C',
    stageNumber: 3,
    activeKeys: ['D', 'E', 'C'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_4_s_x',
    trackId: 'track_c_outer_reach',
    stageName: 'S and X',
    stageNumber: 4,
    activeKeys: ['S', 'X'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_5_s_w',
    trackId: 'track_c_outer_reach',
    stageName: 'S and W',
    stageNumber: 5,
    activeKeys: ['S', 'W'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_6_s_w_x',
    trackId: 'track_c_outer_reach',
    stageName: 'S W X',
    stageNumber: 6,
    activeKeys: ['S', 'W', 'X'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_7_a_z',
    trackId: 'track_c_outer_reach',
    stageName: 'A and Z',
    stageNumber: 7,
    activeKeys: ['A', 'Z'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_8_a_q',
    trackId: 'track_c_outer_reach',
    stageName: 'A and Q',
    stageNumber: 8,
    activeKeys: ['A', 'Q'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_9_a_q_z',
    trackId: 'track_c_outer_reach',
    stageName: 'A Q Z',
    stageNumber: 9,
    activeKeys: ['A', 'Q', 'Z'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_10_k_i',
    trackId: 'track_c_outer_reach',
    stageName: 'K and I',
    stageNumber: 10,
    activeKeys: ['K', 'I'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_11_k_comma_i',
    trackId: 'track_c_outer_reach',
    stageName: 'K , I',
    stageNumber: 11,
    activeKeys: ['K', ',', 'I'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_12_l_o',
    trackId: 'track_c_outer_reach',
    stageName: 'L and O',
    stageNumber: 12,
    activeKeys: ['L', 'O'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_13_l_period_o',
    trackId: 'track_c_outer_reach',
    stageName: 'L . O',
    stageNumber: 13,
    activeKeys: ['L', '.', 'O'],
    practiceObstacleCount: 9,
    proficiencyObstacleCount: 15,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_14_semicolon_p',
    trackId: 'track_c_outer_reach',
    stageName: '; and P',
    stageNumber: 14,
    activeKeys: [';', 'P'],
    practiceObstacleCount: 8,
    proficiencyObstacleCount: 12,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_15_left_outer',
    trackId: 'track_c_outer_reach',
    stageName: 'Left Outer Reach Review',
    stageNumber: 15,
    activeKeys: ['A', 'S', 'D', 'Q', 'W', 'E', 'Z', 'X', 'C'],
    practiceObstacleCount: 14,
    proficiencyObstacleCount: 18,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_16_right_outer',
    trackId: 'track_c_outer_reach',
    stageName: 'Right Outer Reach Review',
    stageNumber: 16,
    activeKeys: ['K', 'L', ';', 'I', 'O', 'P', ',', '.'],
    practiceObstacleCount: 16,
    proficiencyObstacleCount: 20,
    failureMode: 'three_collision',
    status: 'available',
  },
  {
    stageId: 'track_c_stage_17_outer_review',
    trackId: 'track_c_outer_reach',
    stageName: 'Mixed Outer Reach Review',
    stageNumber: 17,
    activeKeys: ['A', 'S', 'D', 'Q', 'W', 'E', 'Z', 'X', 'C', 'K', 'L', ';', 'I', 'O', 'P', ',', '.'],
    practiceObstacleCount: 18,
    proficiencyObstacleCount: 24,
    failureMode: 'three_collision',
    status: 'available',
  },
];

export const KEY_CURRENT_TRACKS: KeyCurrentTrack[] = [
  {
    trackId: 'track_a_home_base',
    trackName: 'Home Base',
    tagline: 'Find your anchor keys on the home row.',
    status: 'available',
    stages: TRACK_A_HOME_BASE_STAGES,
  },
  {
    trackId: 'track_b_center_reach',
    trackName: 'Center Reach',
    tagline: 'Reach out from your anchors and return home.',
    status: 'available',
    stages: TRACK_B_CENTER_REACH_STAGES,
  },
  {
    trackId: 'track_c_outer_reach',
    trackName: 'Outer Reach',
    tagline: 'Explore the far corners of the keyboard.',
    status: 'available',
    stages: TRACK_C_OUTER_REACH_STAGES,
  },
  {
    trackId: 'track_d_short_words',
    trackName: 'Short Words',
    tagline: 'Put your keys together into little words.',
    status: 'coming_soon',
    stages: [],
  },
];

/**
 * Cosmetic characters — all six visible, selectable and unlocked (1B).
 * Every character shares identical speed, hitbox, collision timing, score
 * potential and difficulty behavior; only the SVG look differs. Palettes are
 * matched to the v2 mascot reference sheets in assets/key-current/mascots.
 */
export const KEY_CURRENT_CHARACTERS: KeyCurrentCharacter[] = [
  {
    characterId: 'turtle',
    name: 'Tide the Turtle',
    description: 'A steady explorer who loves the causeway.',
    palette: {
      body: '#8fc75a',
      bodyShade: '#6da33e',
      pack: '#9a6b3f',
      packShade: '#7c522d',
      accent: '#4f93b8',
      hat: '#cfa96e',
      hatBand: '#4a8a8f',
      detail: '#e7d29a',
    },
  },
  {
    characterId: 'phoenix',
    name: 'Flare the Phoenix',
    description: 'A warm little firebird with big wings.',
    palette: {
      body: '#ef8b3c',
      bodyShade: '#d96c22',
      pack: '#8a5a34',
      packShade: '#6e4526',
      accent: '#3e9d9a',
      hat: '#d9b374',
      hatBand: '#3e9d9a',
      detail: '#fcbf49',
    },
  },
  {
    characterId: 'owl',
    name: 'Pip the Owl',
    description: 'A curious night-sky navigator.',
    palette: {
      body: '#4e7bb5',
      bodyShade: '#3a5f95',
      pack: '#a4713d',
      packShade: '#82582e',
      accent: '#5a9a6f',
      hat: '#cfa96e',
      hatBand: '#3f7d6d',
      detail: '#f4e9c9',
    },
  },
  {
    characterId: 'fox',
    name: 'Ember the Fox',
    description: 'A quick-pawed trail scout.',
    palette: {
      body: '#e88a3a',
      bodyShade: '#c96d24',
      pack: '#8a5a34',
      packShade: '#6e4526',
      accent: '#3e9d8a',
      hat: '#d9b374',
      hatBand: '#3e9d8a',
      detail: '#f7ead2',
    },
  },
  {
    characterId: 'boy',
    name: 'Finn',
    description: 'An island adventurer with a trusty pack.',
    palette: {
      body: '#e8b48c',
      bodyShade: '#c98f66',
      pack: '#4b7ea8',
      packShade: '#3a638a',
      accent: '#3f7fae',
      hat: '#e3d3ac',
      hatBand: '#4b7ea8',
      detail: '#4a3324',
    },
  },
  {
    characterId: 'girl',
    name: 'Maya',
    description: 'A brave wayfinder with braids in the breeze.',
    palette: {
      body: '#e2a97e',
      bodyShade: '#c68a5e',
      pack: '#9a6b3f',
      packShade: '#7c522d',
      accent: '#3f8f8a',
      hat: '#d9c091',
      hatBand: '#3f8f8a',
      detail: '#5d3f28',
    },
  },
];

export function getKeyCurrentCharacter(characterId: string): KeyCurrentCharacter {
  return (
    KEY_CURRENT_CHARACTERS.find(
      (character) => character.characterId === characterId,
    ) ?? KEY_CURRENT_CHARACTERS[0]
  );
}

export function getCurrentTrack(trackId: string): KeyCurrentTrack | null {
  return KEY_CURRENT_TRACKS.find((track) => track.trackId === trackId) ?? null;
}

export function getCurrentStage(stageId: string): KeyCurrentStage {
  return (
    KEY_CURRENT_TRACKS.flatMap((track) => track.stages).find(
      (stage) => stage.stageId === stageId,
    ) ?? TRACK_A_STAGE_1
  );
}

export function getNextStage(stageId: string): KeyCurrentStage | null {
  const currentStage = getCurrentStage(stageId);
  const track = getCurrentTrack(currentStage.trackId);
  if (!track) return null;
  const index = track.stages.findIndex((stage) => stage.stageId === stageId);
  return index >= 0 ? track.stages[index + 1] ?? null : null;
}

export function getFirstIncompleteStage(
  trackId: string,
  completedStageIds: string[],
): KeyCurrentStage {
  const track = getCurrentTrack(trackId);
  const stages = track?.stages ?? [TRACK_A_STAGE_1];
  return (
    stages.find((stage) => !completedStageIds.includes(stage.stageId)) ??
    stages[stages.length - 1]
  );
}

export function isStageUnlocked(
  stageId: string,
  completedStageIds: string[],
): boolean {
  const stage = getCurrentStage(stageId);
  const track = getCurrentTrack(stage.trackId);
  if (!track) return false;
  if (!getAvailableTracks(completedStageIds).some((item) => item.trackId === track.trackId)) {
    return false;
  }
  const index = track.stages.findIndex((stage) => stage.stageId === stageId);
  if (index < 0) return false;
  if (index === 0) return true;
  return completedStageIds.includes(track.stages[index - 1].stageId);
}

export function isTrackComplete(
  trackId: string,
  completedStageIds: string[],
): boolean {
  const track = getCurrentTrack(trackId);
  return Boolean(
    track &&
      track.stages.length > 0 &&
      track.stages.every((stage) => completedStageIds.includes(stage.stageId)),
  );
}

export function getAvailableTracks(completedStageIds: string[]): KeyCurrentTrack[] {
  return KEY_CURRENT_TRACKS.filter((track) => {
    if (track.trackId === 'track_a_home_base') return true;
    if (track.trackId === 'track_b_center_reach') {
      return isTrackComplete('track_a_home_base', completedStageIds);
    }
    if (track.trackId === 'track_c_outer_reach') {
      return isTrackComplete('track_b_center_reach', completedStageIds);
    }
    return false;
  });
}

export function getFirstPlayableStageAcrossTracks(
  completedStageIds: string[],
): KeyCurrentStage {
  const availableTracks = getAvailableTracks(completedStageIds);
  for (const track of availableTracks) {
    if (!isTrackComplete(track.trackId, completedStageIds)) {
      return getFirstIncompleteStage(track.trackId, completedStageIds);
    }
  }
  const lastAvailableTrack = availableTracks[availableTracks.length - 1];
  return lastAvailableTrack
    ? getFirstIncompleteStage(lastAvailableTrack.trackId, completedStageIds)
    : TRACK_A_STAGE_1;
}

export const getFirstIncompleteTrackAStage = (
  completedStageIds: string[],
): KeyCurrentStage =>
  getFirstIncompleteStage('track_a_home_base', completedStageIds);

export const isTrackAStageUnlocked = (
  stageId: string,
  completedStageIds: string[],
): boolean => isStageUnlocked(stageId, completedStageIds);

export const isTrackAComplete = (completedStageIds: string[]): boolean =>
  isTrackComplete('track_a_home_base', completedStageIds);

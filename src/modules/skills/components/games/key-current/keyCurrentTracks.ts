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
  activeKeys: ['F', 'J'],
  practiceObstacleCount: 8,
  proficiencyObstacleCount: 12,
  failureMode: 'guided',
  status: 'available',
};

const TRACK_A_FUTURE_STAGES: KeyCurrentStage[] = [
  { stageName: 'D and K', activeKeys: ['D', 'K'], stageId: 'track_a_stage_2_d_k' },
  { stageName: 'S and L', activeKeys: ['S', 'L'], stageId: 'track_a_stage_3_s_l' },
  { stageName: 'A S D F', activeKeys: ['A', 'S', 'D', 'F'], stageId: 'track_a_stage_4_asdf' },
  { stageName: 'J K L', activeKeys: ['J', 'K', 'L'], stageId: 'track_a_stage_5_jkl' },
  {
    stageName: 'A S D F J K L',
    activeKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L'],
    stageId: 'track_a_stage_6_home_row',
  },
  {
    stageName: 'Home Base Review',
    activeKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L'],
    stageId: 'track_a_stage_7_review',
  },
].map((stage) => ({
  ...stage,
  trackId: 'track_a_home_base',
  practiceObstacleCount: 8,
  proficiencyObstacleCount: 12,
  failureMode: 'guided' as const,
  status: 'coming_soon' as const,
}));

export const KEY_CURRENT_TRACKS: KeyCurrentTrack[] = [
  {
    trackId: 'track_a_home_base',
    trackName: 'Home Base',
    tagline: 'Find your anchor keys on the home row.',
    status: 'available',
    stages: [TRACK_A_STAGE_1, ...TRACK_A_FUTURE_STAGES],
  },
  {
    trackId: 'track_b_center_reach',
    trackName: 'Center Reach',
    tagline: 'Reach out from your anchors and return home.',
    status: 'coming_soon',
    stages: [],
  },
  {
    trackId: 'track_c_outer_reach',
    trackName: 'Outer Reach',
    tagline: 'Explore the far corners of the keyboard.',
    status: 'coming_soon',
    stages: [],
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

export type FingerId =
  | 'left_pinky'
  | 'left_ring'
  | 'left_middle'
  | 'left_index'
  | 'right_index'
  | 'right_middle'
  | 'right_ring'
  | 'right_pinky'
  | 'thumb';

export const HOME_ROW_KEYS = ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';'];

export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const FINGER_MAP: Record<string, string> = {
  A: 'left pinky',
  S: 'left ring finger',
  D: 'left middle finger',
  F: 'left index finger',
  G: 'left index finger',
  H: 'right index finger',
  J: 'right index finger',
  K: 'right middle finger',
  L: 'right ring finger',
  ';': 'right pinky',
  Q: 'left pinky',
  W: 'left ring finger',
  E: 'left middle finger',
  R: 'left index finger',
  T: 'left index finger',
  Y: 'right index finger',
  U: 'right index finger',
  I: 'right middle finger',
  O: 'right ring finger',
  P: 'right pinky',
  Z: 'left pinky',
  X: 'left ring finger',
  C: 'left middle finger',
  V: 'left index finger',
  B: 'left index finger',
  N: 'right index finger',
  M: 'right index finger',
};

export type KeyboardTarget = {
  key: string;
  finger?: FingerId;
  hint?: string;
};

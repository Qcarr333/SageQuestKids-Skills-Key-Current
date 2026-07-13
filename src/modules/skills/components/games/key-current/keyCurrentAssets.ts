import pianoChillMp3 from '../../../audio/Piano-chill.mp3';
import farBackgroundDesktop from '../../../assets/key-current/design-targets/key_current_far_background_desktop.png';
import farBackgroundMobile from '../../../assets/key-current/design-targets/key_current_far_background_mobile.png';
import gateArt from '../../../assets/key-current/generated/key-current-gate.png';
import causewayTexture from '../../../assets/key-current/generated/key-current-causeway-texture.png';
import runnerTurtle from '../../../assets/key-current/generated/key-current-runner-turtle.png';
import runnerPhoenix from '../../../assets/key-current/generated/key-current-runner-phoenix.png';
import runnerOwl from '../../../assets/key-current/generated/key-current-runner-owl.png';
import runnerFox from '../../../assets/key-current/generated/key-current-runner-fox.png';
import runnerBoy from '../../../assets/key-current/generated/key-current-runner-boy.png';
import runnerGirl from '../../../assets/key-current/generated/key-current-runner-girl.png';
import type { StaticImageData } from 'next/image';
import type { KeyCurrentCharacterId } from './keyCurrentTypes';

/**
 * Asset manifest for Key Current (checkpoint 1C).
 *
 * Full inspection notes live in
 * `src/modules/skills/docs/games/key-current/key-current-asset-map.md`.
 */

export const KEY_CURRENT_MUSIC = {
  src: pianoChillMp3,
  label: 'Piano Chill',
  /** Kept low so it sits under gameplay, per audio guidance. */
  volume: 0.22,
} as const;

/**
 * Skills Sea far-background plates (sea, sky, islands only — no path or
 * gate). These are the two production backdrops from design-targets used
 * directly as the playfield's farthest layer; the lane, gates, character,
 * HUD and effects are composed on top in CSS/SVG per the 1B brief.
 */
export const KEY_CURRENT_BACKGROUNDS = {
  desktop: farBackgroundDesktop,
  mobile: farBackgroundMobile,
} as const;

/**
 * Higgsfield-generated runtime assets (checkpoint 1C). Produced with the
 * Higgsfield MCP from the LOCAL Key Current references only (gate sheet +
 * six mascot v2 sheets as image references), then background-removed to true
 * RGBA and exported to `assets/key-current/generated/`.
 */
export const KEY_CURRENT_GATE_ART = gateArt;

export const KEY_CURRENT_CAUSEWAY_TEXTURE = causewayTexture;

/** Rear-view runner render per mascot — all six cosmetic, mechanically identical. */
export const KEY_CURRENT_RUNNERS: Record<KeyCurrentCharacterId, StaticImageData> = {
  turtle: runnerTurtle,
  phoenix: runnerPhoenix,
  owl: runnerOwl,
  fox: runnerFox,
  boy: runnerBoy,
  girl: runnerGirl,
};

export type KeyCurrentAssetUsage =
  | 'used_directly'
  | 'reference_only'
  | 'requires_extraction'
  | 'deferred';

export type KeyCurrentAssetRecord = {
  id: string;
  file: string;
  usage: KeyCurrentAssetUsage;
  reason: string;
};

/** Design-target references (visual direction, not pasted into the app). */
export const KEY_CURRENT_DESIGN_TARGETS: KeyCurrentAssetRecord[] = [
  {
    id: 'desktop_ref',
    file: 'design-targets/key_current_desktop_ref.png',
    usage: 'reference_only',
    reason: 'Composed target screenshot; UI recreated responsively in code.',
  },
  {
    id: 'mobile_ref',
    file: 'design-targets/key_current_mobile_ref.png',
    usage: 'reference_only',
    reason: 'Composed target screenshot; UI recreated responsively in code.',
  },
  {
    id: 'gate_ref',
    file: 'design-targets/key_current_gate_ref.png',
    usage: 'reference_only',
    reason:
      'Gate system sheet (states, plaque, banners, crest); gate rebuilt as CSS/SVG.',
  },
  {
    id: 'far_background_desktop',
    file: 'design-targets/key_current_far_background_desktop.png',
    usage: 'used_directly',
    reason: 'Clean sea/sky/island plate; farthest playfield layer on wide screens.',
  },
  {
    id: 'far_background_mobile',
    file: 'design-targets/key_current_far_background_mobile.png',
    usage: 'used_directly',
    reason: 'Portrait plate; farthest playfield layer on narrow screens.',
  },
];

/**
 * v2 mascot sheets: better organized than v1 (clear rear-run rows), but all
 * six are 1774×887 RGB PNGs with NO alpha channel (checkerboard baked into
 * pixels) and every companion .atlas.json is an empty 0-byte file (the
 * turtle folder's atlas is also misnamed *phoenix*). They therefore remain
 * art-direction references; the six in-game characters are SVG renderers
 * matched to each sheet's design. No sheet is imported at runtime.
 */
export const KEY_CURRENT_MASCOT_SHEETS: KeyCurrentAssetRecord[] = [
  'turtle',
  'phoenix',
  'owl',
  'fox',
  'boy',
  'girl',
].map((mascot) => ({
  id: `mascot_${mascot}_v2`,
  file: `mascots/${mascot}/key-current-mascot-${mascot}-v2.png`,
  usage: 'reference_only',
  reason:
    'RGB without alpha + empty .atlas.json; used as the Higgsfield image reference to generate the transparent rear-view runner renders in generated/.',
}));

/** Runtime assets generated via Higgsfield MCP in checkpoint 1C. */
export const KEY_CURRENT_GENERATED_ASSETS: KeyCurrentAssetRecord[] = [
  {
    id: 'gate_art',
    file: 'generated/key-current-gate.png',
    usage: 'used_directly',
    reason:
      'Transparent RGBA gate (blank doors — letters overlaid in code); generated from key_current_gate_ref.png.',
  },
  {
    id: 'causeway_texture',
    file: 'generated/key-current-causeway-texture.png',
    usage: 'used_directly',
    reason: 'Top-down cobble texture mapped onto the 3D-perspective lane plane.',
  },
  ...(
    ['turtle', 'phoenix', 'owl', 'fox', 'boy', 'girl'] as const
  ).map((mascot) => ({
    id: `runner_${mascot}`,
    file: `generated/key-current-runner-${mascot}.png`,
    usage: 'used_directly' as const,
    reason: `Transparent rear-view runner render generated from the ${mascot} v2 sheet.`,
  })),
];

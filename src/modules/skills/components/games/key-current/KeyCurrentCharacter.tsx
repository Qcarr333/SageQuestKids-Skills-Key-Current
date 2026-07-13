'use client';

import Image from 'next/image';
import { KEY_CURRENT_RUNNERS } from './keyCurrentAssets';
import styles from './keyCurrent.module.css';
import type {
  KeyCurrentCharacter as KeyCurrentCharacterDef,
  KeyCurrentCharacterAnim,
} from './keyCurrentTypes';

type KeyCurrentCharacterProps = {
  character: KeyCurrentCharacterDef;
  anim: KeyCurrentCharacterAnim;
  /** Renders bonk stars during the collide animation. */
  showBonkStars?: boolean;
  className?: string;
  /** Loads the image eagerly (use for the in-run character). */
  priority?: boolean;
};

const ANIM_CLASS: Record<KeyCurrentCharacterAnim, string> = {
  idle: styles.characterIdle,
  run: styles.characterRun,
  collide: styles.characterCollide,
  celebrate: styles.characterCelebrate,
};

/**
 * The runner, rear view (elevated third-person camera).
 *
 * Checkpoint 1C: each mascot is a transparent render generated with the
 * Higgsfield MCP from its v2 reference sheet (see keyCurrentAssets.ts), so
 * the in-game character finally matches the mascot art direction. All six
 * are cosmetic only — identical wrapper, size, animations and collision
 * timing. Run bob / squash-and-recoil / celebrate stay CSS-driven.
 */
export function KeyCurrentCharacter({
  character,
  anim,
  showBonkStars = false,
  className,
  priority = false,
}: KeyCurrentCharacterProps) {
  const art = KEY_CURRENT_RUNNERS[character.characterId] ?? KEY_CURRENT_RUNNERS.turtle;

  return (
    <div
      className={`${ANIM_CLASS[anim]} ${className ?? ''}`}
      role="img"
      aria-label={`${character.name}, seen from behind, ${anim === 'collide' ? 'bouncing off a gate' : 'running along the path'}`}
    >
      <div className={styles.characterShadow} aria-hidden />
      <div className={styles.characterBody}>
        {showBonkStars && (
          <div className={styles.bonkStars} aria-hidden>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
          </div>
        )}
        <Image
          src={art}
          alt=""
          priority={priority}
          sizes="(min-width: 640px) 132px, 30vw"
          className="block h-auto w-full select-none drop-shadow-[0_4px_6px_rgba(3,22,56,0.35)]"
          draggable={false}
        />
      </div>
    </div>
  );
}

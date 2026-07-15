'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { KEY_CURRENT_GATE_ART } from './keyCurrentAssets';
import styles from './keyCurrent.module.css';
import type { KeyCurrentObstacle as KeyCurrentObstacleData } from './keyCurrentTypes';

type ObstacleRole = 'active' | 'upcoming1' | 'upcoming2';

type KeyCurrentObstacleProps = {
  obstacle: KeyCurrentObstacleData;
  role: ObstacleRole;
  /** Pulse the letter faster when the obstacle is close or after a miss. */
  urgent?: boolean;
};

const ROLE_CLASS: Record<ObstacleRole, string> = {
  active: '',
  upcoming1: styles.obstacleUpcoming1,
  upcoming2: styles.obstacleUpcoming2,
};

/**
 * Skills Sea letter gate, checkpoint 1C: the gate body is Higgsfield art
 * (generated from key_current_gate_ref.png, background-removed, doors left
 * BLANK) with the required letter overlaid in code so it stays crisp,
 * localizable and ready for future words. Position/scale on the lane plane
 * is still driven by `--kc-progress` through the forwarded ref — the far
 * gate starts tiny at the horizon and grows naturally as it approaches.
 *
 * Cleared gates flash light through the doorway and dissolve (the flat art
 * can't swing its doors; the burst reads as the gate opening for the runner).
 */
export const KeyCurrentObstacle = forwardRef<HTMLDivElement, KeyCurrentObstacleProps>(
  function KeyCurrentObstacle({ obstacle, role, urgent = false }, ref) {
    const isCleared = obstacle.status === 'cleared';
    const isCollided = obstacle.status === 'collided';
    const remainingTarget = obstacle.targetKeys[obstacle.completedCount] ?? null;
    const isMulti = obstacle.targetKeys.length > 1;
    const isWordGate = obstacle.targetKind === 'word';

    return (
      <div
        ref={ref}
        className={`${styles.obstacle} ${ROLE_CLASS[role]} ${
          urgent && role === 'active' ? styles.gateLetterUrgent : ''
        }`}
        data-obstacle-status={obstacle.status}
        aria-label={
          role === 'active' && remainingTarget
            ? `Gate ahead — press ${remainingTarget} to open it`
            : undefined
        }
      >
        <div className={isCollided ? styles.gateShake : ''}>
          <div className={`${styles.gateArtWrap} ${isCleared ? styles.gateOpenFx : ''}`}>
            <Image
              src={KEY_CURRENT_GATE_ART}
              alt=""
              priority={role === 'active'}
              sizes="(min-width: 640px) 350px, 62vw"
              className="block h-auto w-full select-none"
              draggable={false}
            />

            {!isCleared && remainingTarget && (
              <>
                <div className={styles.gateLetterGlow} aria-hidden />
                <div
                  className={`${styles.gateLetter} ${
                    isMulti ? styles.gateLetterMulti : ''
                  } ${isWordGate ? styles.gateWord : ''}`}
                  aria-hidden
                >
                  {obstacle.targetKeys.map((key, index) => (
                    <span
                      key={`${obstacle.id}-${index}`}
                      className={[
                        index < obstacle.completedCount ? styles.gateLetterDone : '',
                        isWordGate && index === obstacle.completedCount
                          ? styles.gateLetterCurrent
                          : '',
                      ].join(' ')}
                    >
                      {key}
                    </span>
                  ))}
                </div>
              </>
            )}

            {isCleared && <div className={styles.gateDoorFlash} aria-hidden />}
          </div>
        </div>

        {isCleared && (
          <div className={styles.gateSparkle} aria-hidden>
            ✨
          </div>
        )}
      </div>
    );
  },
);

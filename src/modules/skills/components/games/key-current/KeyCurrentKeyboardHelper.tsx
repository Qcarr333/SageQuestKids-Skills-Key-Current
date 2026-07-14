'use client';

import { KEYBOARD_ROWS, HOME_ROW_KEYS } from '../../keyboard/keymap';
import styles from './keyCurrent.module.css';
import type { KeyCurrentKeyFlash } from './keyCurrentTypes';

type KeyCurrentKeyboardHelperProps = {
  /** Keys taught by the current stage — rendered enlarged, in true position. */
  activeKeys: string[];
  /** The key the learner needs right now (glows green). */
  targetKey: string | null;
  /** Latest key flash (wrong = red on the pressed key, correct = green). */
  keyFlash: KeyCurrentKeyFlash | null;
  onTouchKey: (key: string) => void;
  /** Shorter helper on desktop where the physical keyboard is primary. */
  compact?: boolean;
  disabled?: boolean;
};

/** Keys F,G,T,V and left of them belong to the left hand. */
const LEFT_HAND_KEYS = new Set(['Q', 'W', 'E', 'R', 'T', 'A', 'S', 'D', 'F', 'G', 'Z', 'X', 'C', 'V', 'B']);

/**
 * Onscreen keyboard helper (1B styling pass).
 *
 * Full three-row silhouette so active keys keep their true keyboard position
 * (F left-of-center, J right-of-center — never re-centered). Every key is
 * tappable so a wrong touch gives the same red-flash feedback as a wrong
 * physical key press. Target = green glow, other stage keys = blue, matching
 * the design-target reference (whose wonky keyboard layout was intentionally
 * NOT copied).
 */
export function KeyCurrentKeyboardHelper({
  activeKeys,
  targetKey,
  keyFlash,
  onTouchKey,
  compact = false,
  disabled = false,
}: KeyCurrentKeyboardHelperProps) {
  const rowOffsets = [
    '',
    'translate-x-[0.25rem] sm:translate-x-3',
    '-translate-x-[0.75rem] sm:-translate-x-2',
  ];
  const targetSide =
    targetKey === null ? null : LEFT_HAND_KEYS.has(targetKey) ? 'left' : 'right';

  return (
    <section
      aria-label="Keyboard helper — tap a key or press it on your keyboard"
      className={`${styles.helperPanel} px-1 pb-2 pt-1.5 sm:px-4 sm:pb-3 sm:pt-2`}
    >
      <div className="mb-1 flex items-center justify-between gap-2 sm:mb-1.5">
        <span
          className={`${styles.handChip} ${styles.handChipLeft} ${
            targetSide === 'left' ? '' : 'opacity-40'
          }`}
        >
          🖐 Left hand
        </span>
        <p className="truncate text-center text-[11px] font-black tracking-wide text-blue-900 sm:text-sm">
          ⌨️ Press the matching letter to pass!
        </p>
        <span
          className={`${styles.handChip} ${styles.handChipRight} ${
            targetSide === 'right' ? '' : 'opacity-40'
          }`}
        >
          Right hand 🖐
        </span>
      </div>

      <div className="flex flex-col items-stretch gap-0.5 sm:gap-1.5">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div
            key={row.join('')}
            className={`flex justify-center gap-[2px] sm:gap-1.5 ${rowOffsets[rowIndex]}`}
          >
            {row.map((key) => {
              const isActive = activeKeys.includes(key);
              const isTarget = targetKey === key;
              const isHomeAnchor = HOME_ROW_KEYS.includes(key);
              const flashClass =
                keyFlash && keyFlash.key === key
                  ? keyFlash.kind === 'wrong'
                    ? styles.helperKeyWrongFlash
                    : styles.helperKeyCorrectFlash
                  : '';

              return (
                <button
                  key={isTarget || flashClass ? `${key}-${keyFlash?.token ?? 0}` : key}
                  type="button"
                  disabled={disabled}
                  onClick={() => onTouchKey(key)}
                  aria-label={
                    isTarget ? `${key} — this is the key you need!` : `${key} key`
                  }
                  className={[
                    styles.helperKey,
                    isActive ? styles.helperKeyActive : '',
                    isTarget ? styles.helperKeyTarget : '',
                    isHomeAnchor && !isActive ? styles.homeBump : '',
                    flashClass,
                    isActive
                      ? compact
                        ? 'h-9 min-w-8 flex-none px-0.5 text-lg sm:h-12 sm:min-w-14 sm:px-1 sm:text-2xl'
                        : 'h-10 min-w-8 flex-none px-0.5 text-xl sm:h-14 sm:min-w-16 sm:px-1 sm:text-3xl'
                      : compact
                        ? 'h-7 min-w-5 max-w-7 flex-1 text-[9px] sm:h-8 sm:min-w-6 sm:max-w-9 sm:text-xs'
                        : 'h-7 min-w-5 max-w-7 flex-1 text-[9px] sm:h-9 sm:min-w-6 sm:max-w-11 sm:text-xs',
                  ].join(' ')}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

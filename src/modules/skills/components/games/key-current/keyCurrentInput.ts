'use client';

import { useEffect, useRef } from 'react';

export type KeyCurrentInputSource = 'keyboard' | 'touch';

export function normalizeKeyCurrentKey(rawKey: string): string | null {
  if (rawKey.length !== 1) return null;
  const upper = rawKey.toUpperCase();
  return upper >= 'A' && upper <= 'Z' ? upper : null;
}

type UseKeyCurrentKeyboardInputOptions = {
  enabled: boolean;
  /** Keys the stage teaches; these get preventDefault to avoid page effects. */
  allowedKeys: string[];
  onKey: (key: string, source: KeyCurrentInputSource) => void;
};

/**
 * Physical keyboard listener with held-key suppression.
 *
 * - Only the initial key-down of a press counts (`event.repeat` ignored,
 *   plus a held-key set as a second guard for browsers with quirky repeat).
 * - Modifier combos (Ctrl/Alt/Meta) are ignored so browser shortcuts pass
 *   through untouched.
 * - Raw key streams are never recorded; the callback receives one
 *   normalized letter at a time and the game keeps aggregate counts only.
 */
export function useKeyCurrentKeyboardInput({
  enabled,
  allowedKeys,
  onKey,
}: UseKeyCurrentKeyboardInputOptions) {
  const heldKeysRef = useRef<Set<string>>(new Set());
  const onKeyRef = useRef(onKey);
  onKeyRef.current = onKey;

  const allowedKeysRef = useRef(allowedKeys);
  allowedKeysRef.current = allowedKeys;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const heldKeys = heldKeysRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      const key = normalizeKeyCurrentKey(event.key);
      if (!key) return;

      if (allowedKeysRef.current.includes(key)) {
        event.preventDefault();
      }

      if (event.repeat || heldKeys.has(key)) return;
      heldKeys.add(key);

      onKeyRef.current(key, 'keyboard');
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = normalizeKeyCurrentKey(event.key);
      if (key) heldKeys.delete(key);
    };

    const handleBlur = () => {
      heldKeys.clear();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      heldKeys.clear();
    };
  }, [enabled]);
}

'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  type HealthyPlayActivityType,
  useOptionalHealthyPlay,
} from './HealthyPlayProvider';

/**
 * SessionTracker
 *
 * Initial scope:
 * - /skills games only
 * - reports child-facing Skills activity into HealthyPlayProvider
 * - excludes idle/inactive time through provider idle detection
 *
 * Purpose:
 * This component attaches lightweight browser-level activity listeners and
 * reports activity to Healthy Play. It does not render UI.
 *
 * Recommended placement:
 *
 * <HealthyPlayProvider currentGameKey="keyboard_coach">
 *   <SessionTracker gameKey="keyboard_coach" />
 *   <SkillsGame />
 * </HealthyPlayProvider>
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

type BrowserActivityEventName =
  | 'keydown'
  | 'pointermove'
  | 'pointerdown'
  | 'click'
  | 'touchstart'
  | 'visibilitychange'
  | 'focus'
  | 'blur';

export type SessionTrackerProps = {
  /**
   * The active Skills game key.
   *
   * Examples:
   * - keyboard_coach
   * - discovery_trails
   * - word_storm
   * - target_tracker_adventure
   */
  gameKey?: string;

  /**
   * Whether SessionTracker should attach listeners.
   */
  enabled?: boolean;

  /**
   * Throttle browser activity events so pointer movement does not spam state.
   */
  throttleMs?: number;

  /**
   * Optional container to listen within. If omitted, listeners attach to window.
   */
  targetRef?: React.RefObject<HTMLElement | null>;

  /**
   * When true, pointer movement is reported as mouse_movement.
   * Keep this true for mouse-skill and tracking games.
   */
  trackPointerMovement?: boolean;

  /**
   * When true, clicks / pointerdown / touchstart are reported as clicking.
   */
  trackClicking?: boolean;

  /**
   * When true, keydown is reported as typing.
   */
  trackTyping?: boolean;

  /**
   * Optional callback for debugging or analytics within the app.
   * Do not use this for invasive behavioral data.
   */
  onActivityTracked?: (event: {
    activityType: HealthyPlayActivityType;
    gameKey?: string;
    occurredAt: string;
  }) => void;
};

const DEFAULT_THROTTLE_MS = 750;

function getActivityTypeFromEvent(
  eventName: BrowserActivityEventName,
): HealthyPlayActivityType | null {
  switch (eventName) {
    case 'keydown':
      return 'typing';

    case 'pointermove':
      return 'mouse_movement';

    case 'pointerdown':
    case 'click':
    case 'touchstart':
      return 'clicking';

    case 'focus':
      return 'resume';

    case 'blur':
      return 'pause';

    case 'visibilitychange':
      if (typeof document === 'undefined') return null;
      return document.visibilityState === 'visible' ? 'resume' : 'pause';

    default:
      return null;
  }
}

function shouldTrackActivityType(
  activityType: HealthyPlayActivityType,
  options: {
    trackPointerMovement: boolean;
    trackClicking: boolean;
    trackTyping: boolean;
  },
) {
  if (activityType === 'mouse_movement') return options.trackPointerMovement;
  if (activityType === 'clicking') return options.trackClicking;
  if (activityType === 'typing') return options.trackTyping;

  return true;
}

export function SessionTracker({
  gameKey,
  enabled = true,
  throttleMs = DEFAULT_THROTTLE_MS,
  targetRef,
  trackPointerMovement = true,
  trackClicking = true,
  trackTyping = true,
  onActivityTracked,
}: SessionTrackerProps) {
  const healthyPlay = useOptionalHealthyPlay();
  const lastTrackedAtRef = useRef<Record<HealthyPlayActivityType, number>>({
    typing: 0,
    mouse_movement: 0,
    clicking: 0,
    tracking: 0,
    drag_drop: 0,
    puzzle_interaction: 0,
    game_navigation: 0,
    prompt_answer: 0,
    pause: 0,
    resume: 0,
  });

  const trackingOptions = useMemo(
    () => ({
      trackPointerMovement,
      trackClicking,
      trackTyping,
    }),
    [trackClicking, trackPointerMovement, trackTyping],
  );

  useEffect(() => {
    if (!enabled) return;
    if (!healthyPlay) return;
    if (typeof window === 'undefined') return;

    const target = targetRef?.current ?? window;

    const reportActivity = (activityType: HealthyPlayActivityType) => {
  if (!shouldTrackActivityType(activityType, trackingOptions)) return;

  const now = Date.now();
  const lastTrackedAt = lastTrackedAtRef.current[activityType] ?? 0;

  const isPauseOrResume =
    activityType === 'pause' || activityType === 'resume';

  if (!isPauseOrResume && now - lastTrackedAt < throttleMs) {
    return;
  }

  lastTrackedAtRef.current[activityType] = now;

  const occurredAt = new Date(now).toISOString();

  healthyPlay.trackActivity({
    module: 'skills',
    gameKey,
    activityType,
    occurredAt,
  });

  onActivityTracked?.({
    activityType,
    gameKey,
    occurredAt,
  });
};

const reportBrowserActivity = (eventName: BrowserActivityEventName) => {
  const activityType = getActivityTypeFromEvent(eventName);
  if (!activityType) return;

  reportActivity(activityType);
};
    const eventNames: BrowserActivityEventName[] = [
      'keydown',
      'pointermove',
      'pointerdown',
      'click',
      'touchstart',
      'focus',
      'blur',
    ];

    const listeners = eventNames.map((eventName) => {
      const listener = () => reportBrowserActivity(eventName);

      target.addEventListener(eventName, listener, {
        passive: true,
      } as AddEventListenerOptions);

      return {
        eventName,
        listener,
      };
    });

    const visibilityListener = () => reportBrowserActivity('visibilitychange');
    document.addEventListener('visibilitychange', visibilityListener);

    // Mark the session active as soon as tracker mounts.
    reportActivity('resume');

    return () => {
      listeners.forEach(({ eventName, listener }) => {
        target.removeEventListener(eventName, listener);
      });

      document.removeEventListener('visibilitychange', visibilityListener);
    };
  }, [
    enabled,
    gameKey,
    healthyPlay,
    onActivityTracked,
    targetRef,
    throttleMs,
    trackingOptions,
  ]);

  return null;
}

export type TrackSkillActivityOptions = {
  gameKey?: string;
  activityType: HealthyPlayActivityType;
  occurredAt?: string;
};

/**
 * Hook for explicit game-level activity tracking.
 *
 * Use this when a Skills game has semantic activity events that browser
 * listeners cannot understand, such as:
 * - puzzle interaction
 * - drag/drop completion
 * - prompt answer
 * - game navigation
 * - tracking challenge completion
 */
export function useTrackSkillActivity() {
  const healthyPlay = useOptionalHealthyPlay();

  return useMemo(() => {
    return {
      trackSkillActivity: (options: TrackSkillActivityOptions) => {
        if (!healthyPlay) return;

        healthyPlay.trackActivity({
          module: 'skills',
          gameKey: options.gameKey,
          activityType: options.activityType,
          occurredAt: options.occurredAt ?? new Date().toISOString(),
        });
      },

      isHealthyPlayAvailable: Boolean(healthyPlay),
    };
  }, [healthyPlay]);
}

export default SessionTracker;

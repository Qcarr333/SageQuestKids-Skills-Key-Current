'use client';

import React, { useMemo } from 'react';
import {
  HEALTHY_PLAY_BUTTON_TEXT,
  type HealthyPlayReminderType,
  useHealthyPlay,
} from './HealthyPlayProvider';

/**
 * WellnessPromptSystem
 *
 * Initial scope:
 * - /skills games only
 * - child-facing wellness prompts
 * - soft reminders
 * - break suggestions
 * - XP efficiency message
 * - cooldown / variety suggestion
 * - Calm Mode suggestion
 *
 * This component renders the prompt layer driven by HealthyPlayProvider state.
 * It intentionally avoids parent/teacher controls and dashboard behavior.
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type WellnessPromptSystemProps = {
  /**
   * Optional className for the fixed prompt layer.
   */
  className?: string;

  /**
   * Show the prompt layer. Useful for tests or screens where prompts should be hidden.
   */
  visible?: boolean;

  /**
   * Position for toast-style soft reminders.
   */
  toastPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

  /**
   * Whether to show compact prompt text.
   */
  compact?: boolean;

  /**
   * Optional hook to open your app's full Healthy Play settings panel.
   */
  onOpenSettings?: () => void;
};

type PromptCopy = {
  eyebrow: string;
  title: string;
  body: string;
  icon: string;
  tone: 'soft' | 'break' | 'calm' | 'xp' | 'cooldown' | 'save';
};

const PROMPT_COPY: Record<HealthyPlayReminderType, PromptCopy> = {
  stretch: {
    eyebrow: 'Healthy Play',
    title: 'Great focus!',
    body: 'Want a quick stretch before you keep going?',
    icon: '🌿',
    tone: 'soft',
  },
  hydration: {
    eyebrow: 'Water Break',
    title: 'Nice work!',
    body: 'Want to grab some water?',
    icon: '💧',
    tone: 'soft',
  },
  eye_rest: {
    eyebrow: 'Eye Rest',
    title: 'Rest your eyes',
    body: 'Look away from the screen for a moment.',
    icon: '☁️',
    tone: 'soft',
  },
  breathing: {
    eyebrow: 'Breathing Break',
    title: 'Take a calm breath',
    body: 'Try one slow breath before you continue.',
    icon: '🫧',
    tone: 'soft',
  },
  hands: {
    eyebrow: 'Hand Rest',
    title: 'Relax your hands',
    body: 'Stretch your fingers and wrists for a moment.',
    icon: '🖐️',
    tone: 'soft',
  },
  posture: {
    eyebrow: 'Posture Reset',
    title: 'Sit tall',
    body: 'Check your posture and screen distance.',
    icon: '🪴',
    tone: 'soft',
  },
  calm_focus: {
    eyebrow: 'Calm Mode',
    title: 'Want a calmer screen?',
    body: 'We can soften colors and reduce extra motion.',
    icon: '🌙',
    tone: 'calm',
  },
  xp_efficiency: {
    eyebrow: 'Healthy Rhythm',
    title: 'XP slows during long sessions',
    body: 'Breaks help your learning. Already-earned XP is safe.',
    icon: '🌱',
    tone: 'xp',
  },
  cooldown: {
    eyebrow: 'Try Something Different',
    title: 'You have practiced a lot',
    body: 'Want to try something else or return to Skills?',
    icon: '🧭',
    tone: 'cooldown',
  },
};

function getPromptCopy(reminderType?: HealthyPlayReminderType): PromptCopy {
  if (!reminderType) {
    return {
      eyebrow: 'Healthy Play',
      title: 'Great work!',
      body: 'Want to take a quick healthy break?',
      icon: '🌿',
      tone: 'soft',
    };
  }

  return PROMPT_COPY[reminderType];
}

function getPositionClass(position: WellnessPromptSystemProps['toastPosition']) {
  switch (position) {
    case 'bottom-left':
      return 'bottom-4 left-4';
    case 'top-right':
      return 'right-4 top-4';
    case 'top-left':
      return 'left-4 top-4';
    case 'bottom-right':
    default:
      return 'bottom-4 right-4';
  }
}

function getToneClasses(tone: PromptCopy['tone']) {
  switch (tone) {
    case 'break':
      return 'border-emerald-200 bg-emerald-50 text-emerald-950';
    case 'calm':
      return 'border-indigo-200 bg-indigo-50 text-indigo-950';
    case 'xp':
      return 'border-sky-200 bg-sky-50 text-sky-950';
    case 'cooldown':
      return 'border-violet-200 bg-violet-50 text-violet-950';
    case 'save':
      return 'border-teal-200 bg-teal-50 text-teal-950';
    case 'soft':
    default:
      return 'border-cyan-200 bg-cyan-50 text-cyan-950';
  }
}

function getPrimaryButtonClasses(tone: PromptCopy['tone']) {
  switch (tone) {
    case 'calm':
      return 'bg-indigo-700 text-white hover:bg-indigo-800 focus-visible:ring-indigo-500';
    case 'xp':
      return 'bg-sky-700 text-white hover:bg-sky-800 focus-visible:ring-sky-500';
    case 'cooldown':
      return 'bg-violet-700 text-white hover:bg-violet-800 focus-visible:ring-violet-500';
    case 'break':
      return 'bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:ring-emerald-500';
    case 'soft':
    default:
      return 'bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500';
  }
}

type PromptButtonProps = {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost';
  tone: PromptCopy['tone'];
};

function PromptButton({
  children,
  onClick,
  variant = 'secondary',
  tone,
}: PromptButtonProps) {
  const variantClass =
    variant === 'primary'
      ? getPrimaryButtonClasses(tone)
      : variant === 'ghost'
        ? 'bg-transparent text-slate-700 hover:bg-white/60 focus-visible:ring-slate-400'
        : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full px-3 py-2 text-sm font-semibold shadow-sm transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variantClass,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function HealthyPlayToast({
  compact,
  toastPosition,
  onOpenSettings,
}: Required<Pick<WellnessPromptSystemProps, 'compact' | 'toastPosition'>> & {
  onOpenSettings?: () => void;
}) {
  const healthyPlay = useHealthyPlay();
  const { state, accessibilitySettings } = healthyPlay;

  const prompt = useMemo(() => getPromptCopy(state.reminderType), [state.reminderType]);

  const isCalmPrompt = state.reminderType === 'calm_focus';
  const isCooldownPrompt = state.reminderType === 'cooldown';
  const isXpPrompt = state.reminderType === 'xp_efficiency';
  const isBreakSuggestion = state.reminderLevel === 'break_suggestion';

  const tone: PromptCopy['tone'] = isBreakSuggestion ? 'break' : prompt.tone;

  return (
    <section
      role="status"
      aria-live="polite"
      className={[
        'fixed z-50 max-w-[calc(100vw-2rem)]',
        getPositionClass(toastPosition),
      ].join(' ')}
    >
      <div
        className={[
          'w-[min(24rem,calc(100vw-2rem))] rounded-3xl border p-4 shadow-xl backdrop-blur',
          accessibilitySettings.highContrast ? 'border-2 border-slate-950' : '',
          accessibilitySettings.largerText ? 'text-lg' : '',
          getToneClasses(tone),
        ].join(' ')}
      >
        <div className="flex gap-3">
          <div
            aria-hidden="true"
            className={[
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-2xl shadow-sm',
              accessibilitySettings.reducedMotion ? '' : 'animate-pulse',
            ].join(' ')}
          >
            {prompt.icon}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide opacity-75">
              {prompt.eyebrow}
            </p>
            <h2 className="mt-0.5 text-base font-bold leading-snug">
              {prompt.title}
            </h2>
            {!compact && (
              <p className="mt-1 text-sm leading-relaxed opacity-85">
                {prompt.body}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {isCalmPrompt ? (
            <>
              <PromptButton
                tone={tone}
                variant="primary"
                onClick={healthyPlay.enableCalmMode}
              >
                {HEALTHY_PLAY_BUTTON_TEXT.makeItCalm}
              </PromptButton>
              <PromptButton tone={tone} onClick={healthyPlay.keepPlaying}>
                {HEALTHY_PLAY_BUTTON_TEXT.keepPlaying}
              </PromptButton>
            </>
          ) : isCooldownPrompt ? (
            <>
              <PromptButton
                tone={tone}
                variant="primary"
                onClick={healthyPlay.trySomethingElse}
              >
                {HEALTHY_PLAY_BUTTON_TEXT.trySomethingElse}
              </PromptButton>
              <PromptButton tone={tone} onClick={healthyPlay.keepPlaying}>
                {HEALTHY_PLAY_BUTTON_TEXT.keepPlaying}
              </PromptButton>
              <PromptButton tone={tone} onClick={healthyPlay.returnToSkillsPage}>
                {HEALTHY_PLAY_BUTTON_TEXT.returnToSkillsPage}
              </PromptButton>
            </>
          ) : isXpPrompt || isBreakSuggestion ? (
            <>
              <PromptButton
                tone={tone}
                variant="primary"
                onClick={healthyPlay.takeBreak}
              >
                {HEALTHY_PLAY_BUTTON_TEXT.takeBreak}
              </PromptButton>
              <PromptButton tone={tone} onClick={healthyPlay.keepPlaying}>
                {HEALTHY_PLAY_BUTTON_TEXT.keepPlaying}
              </PromptButton>
              <PromptButton tone={tone} onClick={healthyPlay.trySomethingElse}>
                {HEALTHY_PLAY_BUTTON_TEXT.trySomethingElse}
              </PromptButton>
            </>
          ) : (
            <>
              <PromptButton
                tone={tone}
                variant="primary"
                onClick={healthyPlay.takeBreak}
              >
                {HEALTHY_PLAY_BUTTON_TEXT.takeBreak}
              </PromptButton>
              <PromptButton tone={tone} onClick={healthyPlay.keepPlaying}>
                {HEALTHY_PLAY_BUTTON_TEXT.keepPlaying}
              </PromptButton>
              <PromptButton tone={tone} onClick={() => healthyPlay.remindMeLater()}>
                {HEALTHY_PLAY_BUTTON_TEXT.remindMeLater}
              </PromptButton>
            </>
          )}

          {onOpenSettings && (
            <PromptButton tone={tone} variant="ghost" onClick={onOpenSettings}>
              Settings
            </PromptButton>
          )}
        </div>
      </div>
    </section>
  );
}

function BreakStatePanel() {
  const healthyPlay = useHealthyPlay();
  const { state, accessibilitySettings } = healthyPlay;

  const isComplete = state.breakStatus === 'complete';

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="healthy-play-break-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 p-4 backdrop-blur-sm"
    >
      <div
        className={[
          'w-full max-w-xl rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 shadow-2xl',
          accessibilitySettings.highContrast ? 'border-2 border-slate-950' : '',
          accessibilitySettings.largerText ? 'text-lg' : '',
        ].join(' ')}
      >
        <div className="flex items-start gap-4">
          <div
            aria-hidden="true"
            className={[
              'flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/80 text-4xl shadow-sm',
              accessibilitySettings.reducedMotion ? '' : 'animate-pulse',
            ].join(' ')}
          >
            {isComplete ? '🌤️' : '🌿'}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide opacity-75">
              Healthy Break
            </p>
            <h2
              id="healthy-play-break-title"
              className="mt-1 text-2xl font-bold leading-tight"
            >
              {isComplete ? 'Ready to keep learning?' : 'Take a calm moment'}
            </h2>
            <p className="mt-2 leading-relaxed opacity-85">
              {isComplete
                ? 'Your rhythm is restored. You can return safely or choose another activity.'
                : 'Stretch, sip water, rest your eyes, or take a slow breath. Your game state is protected.'}
            </p>
          </div>
        </div>

        {!isComplete && (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['Stretch', '🙆'],
              ['Water', '💧'],
              ['Eye Rest', '☁️'],
              ['Breathe', '🫧'],
              ['Move', '👣'],
              ['Hands', '🖐️'],
              ['Posture', '🪴'],
              ['Quiet', '🌙'],
            ].map(([label, icon]) => (
              <button
                type="button"
                key={label}
                className="rounded-2xl bg-white/80 p-3 text-center text-sm font-semibold shadow-sm ring-1 ring-emerald-100 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <span aria-hidden="true" className="block text-2xl">
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {!isComplete && (
            <PromptButton
              tone="break"
              variant="primary"
              onClick={healthyPlay.completeBreak}
            >
              Break Complete
            </PromptButton>
          )}
          <PromptButton tone="break" variant="primary" onClick={healthyPlay.resume}>
            {HEALTHY_PLAY_BUTTON_TEXT.resume}
          </PromptButton>
          <PromptButton tone="break" onClick={healthyPlay.trySomethingElse}>
            {HEALTHY_PLAY_BUTTON_TEXT.trySomethingElse}
          </PromptButton>
          <PromptButton tone="break" onClick={healthyPlay.returnToSkillsPage}>
            {HEALTHY_PLAY_BUTTON_TEXT.returnToSkillsPage}
          </PromptButton>
        </div>
      </div>
    </section>
  );
}

function SaveSyncStatusChip() {
  const { state } = useHealthyPlay();

  if (state.saveStatus === 'idle') return null;

  const label =
    state.saveStatus === 'saving'
      ? 'Saving...'
      : state.saveStatus === 'saved'
        ? 'Progress saved'
        : state.saveStatus === 'sync_later'
          ? 'Progress will sync later'
          : state.saveStatus === 'retrying'
            ? 'Retrying sync'
            : state.saveStatus === 'failed_soft'
              ? 'Progress is safe locally'
              : null;

  if (!label) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-950 shadow-lg">
      {label}
    </div>
  );
}

export function WellnessPromptSystem({
  className,
  visible = true,
  toastPosition = 'bottom-right',
  compact = false,
  onOpenSettings,
}: WellnessPromptSystemProps) {
  const healthyPlay = useHealthyPlay();
  const { state } = healthyPlay;

  if (!visible) return null;

  const shouldShowToast =
    state.reminderStatus === 'visible' &&
    state.sessionStatus !== 'in_break' &&
    state.breakStatus !== 'started' &&
    state.breakStatus !== 'in_progress' &&
    state.breakStatus !== 'complete';

  const shouldShowBreakPanel =
    state.sessionStatus === 'in_break' ||
    state.breakStatus === 'started' ||
    state.breakStatus === 'in_progress' ||
    state.breakStatus === 'complete';

  return (
    <div className={className}>
      {shouldShowToast && (
        <HealthyPlayToast
          compact={compact}
          toastPosition={toastPosition}
          onOpenSettings={onOpenSettings}
        />
      )}

      {shouldShowBreakPanel && <BreakStatePanel />}

      <SaveSyncStatusChip />
    </div>
  );
}

export default WellnessPromptSystem;

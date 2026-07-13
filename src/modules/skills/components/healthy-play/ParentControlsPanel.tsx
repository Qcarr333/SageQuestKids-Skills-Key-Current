'use client';

import React, { useMemo, useState } from 'react';
import {
  HEALTHY_PLAY_BUTTON_TEXT,
  HEALTHY_PLAY_DEFAULTS,
  type HealthyPlayAccessibilitySettings,
  type HealthyPlayDefaults,
  type HealthyPlaySoundPreference,
} from './HealthyPlayProvider';

/**
 * ParentControlsPanel
 *
 * Future-aligned reference component.
 *
 * IMPORTANT:
 * - Do not place this inside the initial child-facing /skills game UI.
 * - Do not expose adult controls to a child-facing account.
 * - Do not build parent/teacher dashboards in the first /skills Healthy Play build
 *   unless the app already has those routes.
 *
 * Initial Healthy Play build remains:
 * - /skills games only
 * - child-facing reminders
 * - break prompts
 * - Calm Mode
 * - XP efficiency
 * - simple child-facing settings
 * - summary/save/sync states
 *
 * Asset root:
 * /assets/skills/shared/healthy-play/
 */

export type HealthyPlayPreferenceScope =
  | 'account'
  | 'parent_child'
  | 'teacher_group'
  | 'learner'
  | 'skills_module'
  | 'specific_skill_game';

export type HealthyPlayOwnerRole =
  | 'parent'
  | 'teacher'
  | 'account_owner'
  | 'system_default';

export type HealthyPlayReminderStyle =
  | 'soft_toast'
  | 'side_panel'
  | 'break_card';

export type HealthyPlayReminderFrequency =
  | 'low'
  | 'moderate'
  | 'frequent';

export type HealthyPlayCalmModeDefault =
  | 'off'
  | 'suggested'
  | 'on';

export type HealthyPlayAdultOverrideStatus =
  | 'none'
  | 'active'
  | 'expired'
  | 'revoked';

export type HealthyPlaySettingsSaveStatus =
  | 'idle'
  | 'dirty'
  | 'saving'
  | 'saved'
  | 'sync_later'
  | 'retrying'
  | 'failed_soft';

export type HealthyPlayPreferences = {
  preferenceId?: string;
  scope: HealthyPlayPreferenceScope;
  ownerRole: HealthyPlayOwnerRole;
  appliesTo?: string;

  dailyActiveGuidance?: number;
  sessionLengthMinutes: number;
  softReminderMinutes: number;
  breakSuggestionMinutes: number;
  cooldownMinutes: number;

  reminderStyle: HealthyPlayReminderStyle;
  reminderFrequency: HealthyPlayReminderFrequency;
  snoozeMinutes: number;

  breakIntervals: {
    stretch: number;
    hydration: number;
    eyeRest: number;
    movement: number;
    hands: number;
    posture: number;
  };

  calmModeDefault: HealthyPlayCalmModeDefault;
  quietModeSchedule: {
    enabled: boolean;
    start?: string;
    end?: string;
  };

  reducedMotionDefault: boolean;
  soundPreference: HealthyPlaySoundPreference;
  largerTextDefault: boolean;
  highContrastDefault: boolean;
  quietBreaksDefault: boolean;

  xpEfficiencyEnabled: boolean;
  xpEfficiencyTiers: {
    normalMaxMinutes: number;
    gentleSlowdownMaxMinutes: number;
    longSessionMaxMinutes: number;
    extendedSessionMultiplier: number;
  };

  breakRestoresRhythm: boolean;
  accessibilityExceptions: Array<keyof HealthyPlayAccessibilitySettings | 'extendedSession'>;

  adultOverrideStatus: HealthyPlayAdultOverrideStatus;

  saveStatus: HealthyPlaySettingsSaveStatus;
  syncQueueStatus: 'empty' | 'queued' | 'retrying' | 'synced';
  updatedAt?: string;
};

export type ParentControlsPanelProps = {
  /**
   * Future adult role. This panel should not render editable controls for child mode.
   */
  ownerRole?: HealthyPlayOwnerRole;

  /**
   * Whether the current user is allowed to edit future adult Healthy Play settings.
   */
  canEdit?: boolean;

  /**
   * Optional initial preferences loaded from future parent/teacher settings.
   */
  initialPreferences?: Partial<HealthyPlayPreferences>;

  /**
   * Called when adult settings are saved.
   * Future integration point for Supabase/account settings.
   */
  onSavePreferences?: (preferences: HealthyPlayPreferences) => Promise<void> | void;

  /**
   * Optional close handler for dashboard/settings shell.
   */
  onClose?: () => void;

  /**
   * Render compact version for side-panel settings.
   */
  compact?: boolean;

  className?: string;
};

function buildDefaultPreferences(
  ownerRole: HealthyPlayOwnerRole,
  initial?: Partial<HealthyPlayPreferences>,
): HealthyPlayPreferences {
  return {
    preferenceId: initial?.preferenceId,
    scope: initial?.scope ?? 'skills_module',
    ownerRole,
    appliesTo: initial?.appliesTo,

    dailyActiveGuidance: initial?.dailyActiveGuidance ?? 30,
    sessionLengthMinutes: initial?.sessionLengthMinutes ?? 30,
    softReminderMinutes:
      initial?.softReminderMinutes ?? HEALTHY_PLAY_DEFAULTS.softReminderMinutes,
    breakSuggestionMinutes:
      initial?.breakSuggestionMinutes ?? HEALTHY_PLAY_DEFAULTS.breakSuggestionMinutes,
    cooldownMinutes:
      initial?.cooldownMinutes ?? HEALTHY_PLAY_DEFAULTS.cooldownSuggestionMinutesMin,

    reminderStyle: initial?.reminderStyle ?? 'soft_toast',
    reminderFrequency: initial?.reminderFrequency ?? 'moderate',
    snoozeMinutes: initial?.snoozeMinutes ?? 7,

    breakIntervals: {
      stretch: initial?.breakIntervals?.stretch ?? 20,
      hydration: initial?.breakIntervals?.hydration ?? 25,
      eyeRest: initial?.breakIntervals?.eyeRest ?? 20,
      movement: initial?.breakIntervals?.movement ?? 30,
      hands: initial?.breakIntervals?.hands ?? 20,
      posture: initial?.breakIntervals?.posture ?? 30,
    },

    calmModeDefault: initial?.calmModeDefault ?? 'suggested',
    quietModeSchedule: {
      enabled: initial?.quietModeSchedule?.enabled ?? false,
      start: initial?.quietModeSchedule?.start ?? '19:00',
      end: initial?.quietModeSchedule?.end ?? '07:00',
    },

    reducedMotionDefault: initial?.reducedMotionDefault ?? false,
    soundPreference: initial?.soundPreference ?? 'on',
    largerTextDefault: initial?.largerTextDefault ?? false,
    highContrastDefault: initial?.highContrastDefault ?? false,
    quietBreaksDefault: initial?.quietBreaksDefault ?? false,

    xpEfficiencyEnabled: initial?.xpEfficiencyEnabled ?? true,
    xpEfficiencyTiers: {
      normalMaxMinutes:
        initial?.xpEfficiencyTiers?.normalMaxMinutes ??
        HEALTHY_PLAY_DEFAULTS.xpEfficiency.healthyRhythm.maxActiveMinutes,
      gentleSlowdownMaxMinutes:
        initial?.xpEfficiencyTiers?.gentleSlowdownMaxMinutes ??
        HEALTHY_PLAY_DEFAULTS.xpEfficiency.gentleSlowdown.maxActiveMinutes,
      longSessionMaxMinutes:
        initial?.xpEfficiencyTiers?.longSessionMaxMinutes ??
        HEALTHY_PLAY_DEFAULTS.xpEfficiency.longSessionSlowdown.maxActiveMinutes,
      extendedSessionMultiplier:
        initial?.xpEfficiencyTiers?.extendedSessionMultiplier ??
        HEALTHY_PLAY_DEFAULTS.xpEfficiency.extendedSession.multiplierMin,
    },

    breakRestoresRhythm: initial?.breakRestoresRhythm ?? true,
    accessibilityExceptions: initial?.accessibilityExceptions ?? [],

    adultOverrideStatus: initial?.adultOverrideStatus ?? 'none',

    saveStatus: initial?.saveStatus ?? 'idle',
    syncQueueStatus: initial?.syncQueueStatus ?? 'empty',
    updatedAt: initial?.updatedAt,
  };
}

function clonePreferencesWithDirty(
  current: HealthyPlayPreferences,
  patch: Partial<HealthyPlayPreferences>,
): HealthyPlayPreferences {
  return {
    ...current,
    ...patch,
    saveStatus: 'dirty',
    updatedAt: new Date().toISOString(),
  };
}

function SectionCard({
  title,
  eyebrow,
  children,
  description,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-wide text-teal-700">
          {eyebrow}
        </p>
      )}
      <h3 className="mt-1 text-lg font-black text-slate-950">{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FieldLabel({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-800">{label}</span>
      {description && (
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
          {description}
        </span>
      )}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function NumberInput({
  value,
  min,
  max,
  step = 1,
  disabled,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="number"
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      onChange={(event) => {
        const next = Number(event.target.value);
        if (Number.isFinite(next)) {
          onChange(Math.max(min, Math.min(max, next)));
        }
      }}
      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-950 shadow-sm disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
    />
  );
}

function SelectInput<T extends string>({
  value,
  disabled,
  options,
  onChange,
}: {
  value: T;
  disabled?: boolean;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
}) {
  return (
    <select
      disabled={disabled}
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-950 shadow-sm disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function ToggleInput({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={[
        'inline-flex h-8 w-14 items-center rounded-full p-1 transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
        disabled ? 'cursor-not-allowed opacity-50' : '',
        checked ? 'bg-teal-700' : 'bg-slate-300',
      ].join(' ')}
    >
      <span
        className={[
          'h-6 w-6 rounded-full bg-white shadow transition',
          checked ? 'translate-x-6' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}

function SaveStatusBadge({ status }: { status: HealthyPlaySettingsSaveStatus }) {
  const label =
    status === 'dirty'
      ? 'Unsaved changes'
      : status === 'saving'
        ? 'Saving...'
        : status === 'saved'
          ? 'Saved'
          : status === 'sync_later'
            ? 'Sync later'
            : status === 'retrying'
              ? 'Retrying'
              : status === 'failed_soft'
                ? 'Saved locally'
                : 'Ready';

  return (
    <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-teal-800">
      {label}
    </span>
  );
}

function GuardrailPanel() {
  const guardrails = [
    'Future reference only',
    'Initial build remains /skills only',
    'No child-facing adult controls',
    'No parent dashboard in first build',
    'No teacher dashboard in first build',
    'No classroom rosters',
    'No rankings or leaderboards',
    'No surveillance feel',
    'No harsh lockouts',
    'No shame scores',
    'No coins / gems / cash',
    'No store / shop / wallet',
    'No accessibility penalty',
    'Save is fail-soft',
  ];

  return (
    <aside className="rounded-[2rem] border border-amber-200 bg-amber-50 p-5 text-amber-950 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-amber-700">
        Guardrails
      </p>
      <h3 className="mt-1 text-lg font-black">Adult settings boundary</h3>
      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
        {guardrails.map((guardrail) => (
          <li key={guardrail} className="flex gap-2">
            <span aria-hidden="true">✓</span>
            <span>{guardrail}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FutureScopeNotice() {
  return (
    <div className="rounded-[2rem] border border-violet-200 bg-violet-50 p-5 text-violet-950">
      <p className="text-xs font-black uppercase tracking-wide text-violet-700">
        Future-Aligned Component
      </p>
      <h3 className="mt-1 text-lg font-black">Not part of the initial child build</h3>
      <p className="mt-2 text-sm leading-relaxed">
        This panel documents how future parent/teacher Healthy Play settings can
        guide reminders, session length, breaks, Calm Mode, XP efficiency, and
        accessibility exceptions. Keep the first implementation focused on
        child-facing <code className="font-bold">/skills</code> Healthy Play.
      </p>
    </div>
  );
}

export function ParentControlsPanel({
  ownerRole = 'parent',
  canEdit = false,
  initialPreferences,
  onSavePreferences,
  onClose,
  compact = false,
  className,
}: ParentControlsPanelProps) {
  const [preferences, setPreferences] = useState<HealthyPlayPreferences>(() =>
    buildDefaultPreferences(ownerRole, initialPreferences),
  );

  const [saveError, setSaveError] = useState<string | null>(null);

  const editable = canEdit && ownerRole !== 'system_default';

  const roleLabel = useMemo(() => {
    switch (ownerRole) {
      case 'teacher':
        return 'Teacher View';
      case 'account_owner':
        return 'Account Owner View';
      case 'system_default':
        return 'System Defaults';
      case 'parent':
      default:
        return 'Parent View';
    }
  }, [ownerRole]);

  const patchPreferences = (patch: Partial<HealthyPlayPreferences>) => {
    setPreferences((current) => clonePreferencesWithDirty(current, patch));
  };

  const savePreferences = async () => {
    setSaveError(null);

    const next: HealthyPlayPreferences = {
      ...preferences,
      saveStatus: 'saving',
      updatedAt: new Date().toISOString(),
    };

    setPreferences(next);

    try {
      await onSavePreferences?.(next);

      setPreferences((current) => ({
        ...current,
        saveStatus: 'saved',
        syncQueueStatus: 'synced',
        updatedAt: new Date().toISOString(),
      }));
    } catch {
      setPreferences((current) => ({
        ...current,
        saveStatus: 'sync_later',
        syncQueueStatus: 'queued',
        updatedAt: new Date().toISOString(),
      }));

      setSaveError('Settings will sync later. Existing child progress remains safe.');
    }
  };

  return (
    <section
      className={[
        'rounded-[2rem] border border-slate-200 bg-slate-50 p-5 text-slate-950 shadow-xl',
        compact ? 'max-w-4xl' : 'w-full',
        className ?? '',
      ].join(' ')}
      aria-labelledby="healthy-play-parent-controls-title"
    >
      <header className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-teal-700">
            Healthy Play Settings
          </p>
          <h2
            id="healthy-play-parent-controls-title"
            className="mt-1 text-2xl font-black text-slate-950"
          >
            Parent / Teacher Controls
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            Future-aligned adult settings for Healthy Play. These settings guide
            healthy learning habits without surveillance, shame, rankings, or harsh
            lockouts.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-teal-800">
              {roleLabel}
            </span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-sky-800">
              /skills scoped
            </span>
            <SaveStatusBadge status={preferences.saveStatus} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {HEALTHY_PLAY_BUTTON_TEXT.done}
            </button>
          )}

          <button
            type="button"
            disabled={!editable || preferences.saveStatus === 'saving'}
            onClick={savePreferences}
            className="rounded-full bg-teal-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {HEALTHY_PLAY_BUTTON_TEXT.saveSettings}
          </button>
        </div>
      </header>

      {saveError && (
        <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-3 text-sm font-semibold text-cyan-950">
          {saveError}
        </div>
      )}

      {!editable && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-600">
          View-only mode. Future adult settings require an authorized parent,
          teacher, or account owner role.
        </div>
      )}

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <FutureScopeNotice />

          <div className="grid gap-5 lg:grid-cols-2">
            <SectionCard
              eyebrow="Guidance"
              title="Daily Active Learning"
              description="Adjust gentle daily guidance. This should guide, not surveil."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldLabel label="Daily guidance minutes">
                  <NumberInput
                    disabled={!editable}
                    min={5}
                    max={180}
                    value={preferences.dailyActiveGuidance ?? 30}
                    onChange={(value) =>
                      patchPreferences({ dailyActiveGuidance: value })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Session length minutes">
                  <NumberInput
                    disabled={!editable}
                    min={5}
                    max={90}
                    value={preferences.sessionLengthMinutes}
                    onChange={(value) =>
                      patchPreferences({ sessionLengthMinutes: value })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Soft reminder at">
                  <NumberInput
                    disabled={!editable}
                    min={5}
                    max={60}
                    value={preferences.softReminderMinutes}
                    onChange={(value) =>
                      patchPreferences({ softReminderMinutes: value })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Break suggestion at">
                  <NumberInput
                    disabled={!editable}
                    min={10}
                    max={90}
                    value={preferences.breakSuggestionMinutes}
                    onChange={(value) =>
                      patchPreferences({ breakSuggestionMinutes: value })
                    }
                  />
                </FieldLabel>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="Reminders"
              title="Reminder Style"
              description="Keep prompts calm, optional, and non-punitive."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <FieldLabel label="Reminder style">
                  <SelectInput<HealthyPlayReminderStyle>
                    disabled={!editable}
                    value={preferences.reminderStyle}
                    onChange={(value) => patchPreferences({ reminderStyle: value })}
                    options={[
                      { label: 'Soft Toast', value: 'soft_toast' },
                      { label: 'Side Panel', value: 'side_panel' },
                      { label: 'Break Card', value: 'break_card' },
                    ]}
                  />
                </FieldLabel>

                <FieldLabel label="Reminder frequency">
                  <SelectInput<HealthyPlayReminderFrequency>
                    disabled={!editable}
                    value={preferences.reminderFrequency}
                    onChange={(value) =>
                      patchPreferences({ reminderFrequency: value })
                    }
                    options={[
                      { label: 'Low', value: 'low' },
                      { label: 'Moderate', value: 'moderate' },
                      { label: 'Frequent', value: 'frequent' },
                    ]}
                  />
                </FieldLabel>

                <FieldLabel label="Snooze minutes">
                  <NumberInput
                    disabled={!editable}
                    min={3}
                    max={30}
                    value={preferences.snoozeMinutes}
                    onChange={(value) => patchPreferences({ snoozeMinutes: value })}
                  />
                </FieldLabel>

                <FieldLabel label="Cooldown suggestion at">
                  <NumberInput
                    disabled={!editable}
                    min={20}
                    max={120}
                    value={preferences.cooldownMinutes}
                    onChange={(value) =>
                      patchPreferences({ cooldownMinutes: value })
                    }
                  />
                </FieldLabel>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="Breaks"
              title="Break Intervals"
              description="Configure future break reminders. Prompts remain supportive and optional."
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ['Stretch', 'stretch'],
                  ['Hydration', 'hydration'],
                  ['Eye Rest', 'eyeRest'],
                  ['Movement', 'movement'],
                  ['Hands', 'hands'],
                  ['Posture', 'posture'],
                ].map(([label, key]) => (
                  <FieldLabel key={key} label={`${label} minutes`}>
                    <NumberInput
                      disabled={!editable}
                      min={5}
                      max={90}
                      value={
                        preferences.breakIntervals[
                          key as keyof HealthyPlayPreferences['breakIntervals']
                        ]
                      }
                      onChange={(value) =>
                        patchPreferences({
                          breakIntervals: {
                            ...preferences.breakIntervals,
                            [key]: value,
                          },
                        })
                      }
                    />
                  </FieldLabel>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="Calm"
              title="Calm Mode + Quiet Mode"
              description="Reduce stimulation without changing progress or XP fairness."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldLabel label="Calm Mode default">
                  <SelectInput<HealthyPlayCalmModeDefault>
                    disabled={!editable}
                    value={preferences.calmModeDefault}
                    onChange={(value) =>
                      patchPreferences({ calmModeDefault: value })
                    }
                    options={[
                      { label: 'Off', value: 'off' },
                      { label: 'Suggested', value: 'suggested' },
                      { label: 'On', value: 'on' },
                    ]}
                  />
                </FieldLabel>

                <FieldLabel label="Sound preference">
                  <SelectInput<HealthyPlaySoundPreference>
                    disabled={!editable}
                    value={preferences.soundPreference}
                    onChange={(value) =>
                      patchPreferences({ soundPreference: value })
                    }
                    options={[
                      { label: 'On', value: 'on' },
                      { label: 'Quiet', value: 'quiet' },
                      { label: 'Off', value: 'off' },
                    ]}
                  />
                </FieldLabel>

                <FieldLabel label="Quiet Mode schedule">
                  <ToggleInput
                    disabled={!editable}
                    checked={preferences.quietModeSchedule.enabled}
                    onChange={(checked) =>
                      patchPreferences({
                        quietModeSchedule: {
                          ...preferences.quietModeSchedule,
                          enabled: checked,
                        },
                      })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Quiet Breaks default">
                  <ToggleInput
                    disabled={!editable}
                    checked={preferences.quietBreaksDefault}
                    onChange={(checked) =>
                      patchPreferences({ quietBreaksDefault: checked })
                    }
                  />
                </FieldLabel>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="XP Balance"
              title="XP Efficiency"
              description="Discourage long grinding without removing earned progress."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldLabel label="XP efficiency enabled">
                  <ToggleInput
                    disabled={!editable}
                    checked={preferences.xpEfficiencyEnabled}
                    onChange={(checked) =>
                      patchPreferences({ xpEfficiencyEnabled: checked })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Break restores rhythm">
                  <ToggleInput
                    disabled={!editable}
                    checked={preferences.breakRestoresRhythm}
                    onChange={(checked) =>
                      patchPreferences({ breakRestoresRhythm: checked })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Normal max minutes">
                  <NumberInput
                    disabled={!editable}
                    min={5}
                    max={60}
                    value={preferences.xpEfficiencyTiers.normalMaxMinutes}
                    onChange={(value) =>
                      patchPreferences({
                        xpEfficiencyTiers: {
                          ...preferences.xpEfficiencyTiers,
                          normalMaxMinutes: value,
                        },
                      })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Extended session multiplier">
                  <NumberInput
                    disabled={!editable}
                    min={0.25}
                    max={1}
                    step={0.05}
                    value={preferences.xpEfficiencyTiers.extendedSessionMultiplier}
                    onChange={(value) =>
                      patchPreferences({
                        xpEfficiencyTiers: {
                          ...preferences.xpEfficiencyTiers,
                          extendedSessionMultiplier: value,
                        },
                      })
                    }
                  />
                </FieldLabel>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="Access"
              title="Accessibility Exceptions"
              description="Support needs stay private and should never reduce progress unfairly."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Reduced Motion', 'reducedMotionDefault'],
                  ['High Contrast', 'highContrastDefault'],
                  ['Larger Text', 'largerTextDefault'],
                  ['Quiet Breaks', 'quietBreaksDefault'],
                ].map(([label, key]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"
                  >
                    <span className="text-sm font-bold">{label}</span>
                    <ToggleInput
                      disabled={!editable}
                      checked={Boolean(
                        preferences[key as keyof HealthyPlayPreferences],
                      )}
                      onChange={(checked) =>
                        patchPreferences({
                          [key]: checked,
                        } as Partial<HealthyPlayPreferences>)
                      }
                    />
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="space-y-5">
          <GuardrailPanel />

          <aside className="rounded-[2rem] border border-sky-200 bg-sky-50 p-5 text-sky-950 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-sky-700">
              Future Behavior
            </p>
            <h3 className="mt-1 text-lg font-black">Settings influence</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-black">Daily guidance</dt>
                <dd className="text-sky-800">Adjusts healthy active-learning guidance.</dd>
              </div>
              <div>
                <dt className="font-black">Session length</dt>
                <dd className="text-sky-800">Adjusts future reminder timing.</dd>
              </div>
              <div>
                <dt className="font-black">Break intervals</dt>
                <dd className="text-sky-800">Controls stretch, water, and eye-rest prompts.</dd>
              </div>
              <div>
                <dt className="font-black">Calm Mode</dt>
                <dd className="text-sky-800">Reduces stimulation, not progress.</dd>
              </div>
              <div>
                <dt className="font-black">XP efficiency</dt>
                <dd className="text-sky-800">Discourages grinding without lost earned XP.</dd>
              </div>
              <div>
                <dt className="font-black">Adult override</dt>
                <dd className="text-sky-800">Future temporary exception control.</dd>
              </div>
            </dl>
          </aside>

          <aside className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Privacy + Trust
            </p>
            <h3 className="mt-1 text-lg font-black">Guidance, not surveillance</h3>
            <p className="mt-2 text-sm leading-relaxed">
              Healthy Play should collect only what is needed for wellness guidance.
              Do not show public rankings, classroom leaderboards, student comparisons,
              or surveillance-style reports.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ParentControlsPanel;

'use client';

import { useEffect, useMemo, useState } from 'react';
import { KeyCurrentCharacter } from './KeyCurrentCharacter';
import {
  KEY_CURRENT_CHARACTERS,
  KEY_CURRENT_DIFFICULTIES,
  getAvailableTracks,
  getCurrentTrack,
  getFirstPlayableStageAcrossTracks,
  getKeyCurrentCharacter,
  isStageUnlocked,
  isTrackComplete,
} from './keyCurrentTracks';
import styles from './keyCurrent.module.css';
import type {
  KeyCurrentDifficultyId,
  KeyCurrentSettings,
  KeyCurrentStage,
  KeyCurrentTrack,
} from './keyCurrentTypes';

type KeyCurrentLandingProps = {
  stage: KeyCurrentStage;
  tracks: KeyCurrentTrack[];
  settings: KeyCurrentSettings;
  onUpdateSettings: (next: Partial<KeyCurrentSettings>) => void;
  onStart: () => void;
  onContinue: () => void;
  onSelectStage: (stageId: string) => void;
  savedXp: number;
  savedLevel: number;
  completedStageIds: string[];
  bestAccuracy: Record<string, number>;
};

function SettingToggle({
  label,
  enabled,
  onToggle,
  icon,
  hint,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
  icon: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      title={hint}
      className={`flex min-h-11 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${
        enabled
          ? 'border-teal-300/70 bg-teal-500/25 text-teal-100'
          : 'border-slate-400/40 bg-slate-800/60 text-slate-400'
      }`}
    >
      <span>
        {icon} {label}
      </span>
      <span className="text-xs font-black uppercase">{enabled ? 'On' : 'Off'}</span>
    </button>
  );
}

function trackStateLabel(input: {
  track: KeyCurrentTrack;
  availableTrackIds: string[];
  completedStageIds: string[];
  currentTrackId: string;
}) {
  if (input.track.status === 'coming_soon') return 'Coming Later';
  if (!input.availableTrackIds.includes(input.track.trackId)) return 'Locked';
  if (isTrackComplete(input.track.trackId, input.completedStageIds)) return 'Complete';
  if (input.track.trackId === input.currentTrackId) return 'Current';
  return 'Unlocked';
}

function compactStageLabel(stage: KeyCurrentStage) {
  if (stage.targetKind === 'word') return stage.stageName;
  if (stage.stageName.toLowerCase().includes('mixed')) return 'Mixed Review';
  if (stage.activeKeys.length > 0) return stage.activeKeys.join(' ');
  return stage.stageName;
}

export function KeyCurrentLanding({
  stage,
  tracks,
  settings,
  onUpdateSettings,
  onStart,
  onContinue,
  onSelectStage,
  savedXp,
  savedLevel,
  completedStageIds,
  bestAccuracy,
}: KeyCurrentLandingProps) {
  const selectedCharacter = getKeyCurrentCharacter(settings.characterId);
  const selectedTrack = getCurrentTrack(stage.trackId);
  const stageCompleted = completedStageIds.includes(stage.stageId);
  const continueStage = getFirstPlayableStageAcrossTracks(completedStageIds);
  const showSecondaryStart =
    stageCompleted || stage.stageId !== continueStage.stageId;
  const isWordStage = stage.targetKind === 'word';
  const useCompactKeyBadges = stage.activeKeys.length >= 8;
  const availableTrackIds = useMemo(
    () => getAvailableTracks(completedStageIds).map((track) => track.trackId),
    [completedStageIds],
  );
  const [expandedTrackId, setExpandedTrackId] = useState(stage.trackId);

  useEffect(() => {
    setExpandedTrackId(stage.trackId);
  }, [stage.trackId]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-1 py-2 sm:gap-5">
      <div className="flex flex-col items-center text-center">
        <span className={styles.titleBadge}>🌊 Skills Sea · Keyboard Runner</span>
        <h1
          className={`${styles.titleWave} mt-2 text-5xl font-black tracking-tight sm:text-6xl`}
        >
          Key Current
        </h1>
        <p className="mt-2 text-sm font-bold text-sky-100 drop-shadow-[0_2px_4px_rgba(3,22,56,0.8)] sm:text-base">
          Ride the current and clear each gate by finding the right keys.
        </p>
      </div>

      <div className="grid w-full gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <section
          aria-label="Choose your explorer"
          className={`${styles.seaPanel} flex flex-col gap-2.5 p-3.5 sm:p-4`}
        >
          <p className="text-[11px] font-black uppercase tracking-widest text-teal-300">
            Choose your explorer
          </p>

          <div className="flex items-stretch gap-3">
            <div className="relative flex w-28 flex-none flex-col items-center justify-end rounded-xl border border-cyan-300/25 bg-gradient-to-b from-sky-500/30 to-blue-900/50 pb-2 pt-1 sm:w-32">
              <div className={styles.previewPedestal} aria-hidden />
              <KeyCurrentCharacter
                character={selectedCharacter}
                anim="idle"
                className="relative w-20 sm:w-24"
                priority
              />
              <p className="relative mt-1 max-w-full truncate px-1 text-center text-xs font-black text-amber-200">
                {selectedCharacter.name}
              </p>
            </div>

            <div
              className="grid min-w-0 flex-1 grid-cols-3 gap-1.5 sm:gap-2"
              role="radiogroup"
              aria-label="Explorers"
            >
              {KEY_CURRENT_CHARACTERS.map((character) => {
                const selected = character.characterId === settings.characterId;
                return (
                  <button
                    key={character.characterId}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      onUpdateSettings({ characterId: character.characterId })
                    }
                    aria-label={`Choose ${character.name}`}
                    className={`${styles.characterCard} ${
                      selected ? styles.characterCardSelected : ''
                    }`}
                  >
                    <KeyCurrentCharacter
                      character={character}
                      anim="idle"
                      className="w-10 sm:w-12"
                    />
                    <span className="max-w-full truncate px-0.5 text-[10px] font-black text-sky-100 sm:text-[11px]">
                      {character.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-center text-[10px] text-sky-200/75">
            {selectedCharacter.description} · All explorers are unlocked and cosmetic.
          </p>
        </section>

        <section
          aria-label="Current stage settings"
          className={`${styles.seaPanel} flex flex-col gap-3 p-3.5 sm:p-4`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-300">
                {selectedTrack?.trackName ?? 'Track'} · Stage {stage.stageNumber}
              </p>
              <p className="truncate text-xl font-black text-white">
                {stage.stageName}
              </p>
            </div>
            {isWordStage ? (
              <span className="max-w-[9rem] rounded-full border border-amber-200/60 bg-amber-300/20 px-3 py-1 text-right text-xs font-black uppercase text-amber-100 sm:max-w-[12rem]">
                {stage.wordLengthLabel ?? 'Words'}
              </span>
            ) : (
              <div
                className={`flex min-w-0 flex-wrap justify-end gap-1 ${
                  useCompactKeyBadges ? 'max-w-[9.5rem] sm:max-w-[13rem]' : 'flex-none'
                }`}
                aria-hidden
              >
                {stage.activeKeys.map((key) => (
                  <span
                    key={key}
                    className={`grid place-items-center rounded-lg border-2 border-amber-300 bg-gradient-to-b from-amber-100 to-amber-300 font-black text-amber-950 shadow-[0_4px_0_rgba(146,64,14,0.6)] ${
                      useCompactKeyBadges
                        ? 'h-7 min-w-7 px-1 text-sm'
                        : 'h-10 w-10 text-lg'
                    }`}
                  >
                    {key}
                  </span>
                ))}
              </div>
            )}
          </div>

          <fieldset>
            <legend className="mb-1.5 text-[11px] font-black uppercase tracking-widest text-sky-200/85">
              Speed
            </legend>
            <div
              className="grid grid-cols-4 gap-1 rounded-xl bg-slate-950/60 p-1"
              role="radiogroup"
              aria-label="Difficulty"
            >
              {KEY_CURRENT_DIFFICULTIES.map((difficulty) => {
                const selected = settings.difficulty === difficulty.id;
                return (
                  <button
                    key={difficulty.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      onUpdateSettings({
                        difficulty: difficulty.id as KeyCurrentDifficultyId,
                      })
                    }
                    className={`flex min-h-11 flex-col items-center justify-center rounded-lg px-1 py-1 text-[11px] font-black uppercase tracking-wide transition sm:text-xs ${
                      selected
                        ? difficulty.accentClass
                        : 'text-slate-400 hover:bg-slate-800/70'
                    }`}
                  >
                    <span aria-hidden>{'⚡'.repeat(difficulty.bolts)}</span>
                    {difficulty.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid grid-cols-3 gap-1.5">
            <SettingToggle
              icon="🎵"
              label="Music"
              enabled={settings.musicEnabled}
              onToggle={() =>
                onUpdateSettings({ musicEnabled: !settings.musicEnabled })
              }
            />
            <SettingToggle
              icon="🔔"
              label="Sounds"
              enabled={settings.sfxEnabled}
              onToggle={() => onUpdateSettings({ sfxEnabled: !settings.sfxEnabled })}
            />
            <SettingToggle
              icon="💬"
              label="Guide"
              hint="Visual guidance text; spoken Voice Help comes in a later checkpoint."
              enabled={settings.voiceHelpEnabled}
              onToggle={() =>
                onUpdateSettings({ voiceHelpEnabled: !settings.voiceHelpEnabled })
              }
            />
          </div>
        </section>
      </div>

      <div
        className={`grid w-full gap-2 ${
          showSecondaryStart ? 'sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]' : ''
        }`}
      >
        <button
          type="button"
          autoFocus
          onClick={onContinue}
          className={`${styles.goldButton} px-8 py-4 text-xl`}
        >
          Continue Adventure
        </button>
        {showSecondaryStart && (
          <button
            type="button"
            onClick={onStart}
            className={`${styles.blueButton} px-6 py-3 text-lg`}
          >
            {stageCompleted ? 'Replay Selected Stage' : 'Start Selected Stage'}
          </button>
        )}
      </div>

      <section
        aria-label="Track progress"
        className={`${styles.seaPanel} flex w-full flex-col gap-2 p-3.5 sm:p-4`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-teal-300">
              Adventure Progress
            </p>
            <p className="text-sm font-semibold text-sky-100/85">
              Open a track to replay stages or see what is next.
            </p>
          </div>
          <span className="rounded-full border border-cyan-200/40 bg-cyan-500/15 px-3 py-1 text-xs font-black uppercase text-cyan-100">
            Level {savedLevel} · {savedXp} XP preview
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {tracks.map((track) => {
            const total = track.stages.length;
            const completedCount = track.stages.filter((trackStage) =>
              completedStageIds.includes(trackStage.stageId),
            ).length;
            const progressPercent =
              total > 0 ? Math.round((completedCount / total) * 100) : 0;
            const expanded = expandedTrackId === track.trackId;
            const state = trackStateLabel({
              track,
              availableTrackIds,
              completedStageIds,
              currentTrackId: stage.trackId,
            });
            const trackPlayable = availableTrackIds.includes(track.trackId);
            const complete = state === 'Complete';

            return (
              <div
                key={track.trackId}
                className={`rounded-xl border p-2.5 ${
                  complete
                    ? 'border-teal-200/50 bg-teal-500/15'
                    : trackPlayable
                      ? 'border-amber-200/45 bg-slate-900/45'
                      : 'border-slate-500/25 bg-slate-950/35'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedTrackId(expanded ? stage.trackId : track.trackId)
                  }
                  className="flex w-full items-center justify-between gap-3 text-left"
                  aria-expanded={expanded}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-white">
                      {track.trackName}
                    </span>
                    <span className="block truncate text-xs font-semibold text-sky-100/70">
                      {track.tagline}
                    </span>
                  </span>
                  <span className="flex flex-none flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                        complete
                          ? 'bg-teal-300/25 text-teal-100'
                          : trackPlayable
                            ? 'bg-amber-300/25 text-amber-100'
                            : 'bg-slate-400/15 text-slate-400'
                      }`}
                    >
                      {state}
                    </span>
                    <span className="text-[11px] font-bold text-sky-100/70">
                      {total > 0 ? `${completedCount}/${total}` : 'Future'}
                    </span>
                  </span>
                </button>

                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-slate-950/70"
                  aria-hidden
                >
                  <div
                    className={`h-full rounded-full ${
                      complete
                        ? 'bg-teal-300'
                        : trackPlayable
                          ? 'bg-amber-300'
                          : 'bg-slate-600'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {expanded && track.stages.length > 0 && (
                  <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {track.stages.map((trackStage) => {
                      const completed = completedStageIds.includes(
                        trackStage.stageId,
                      );
                      const selected = trackStage.stageId === stage.stageId;
                      const unlocked = isStageUnlocked(
                        trackStage.stageId,
                        completedStageIds,
                      );
                      const stateText = completed
                        ? 'Completed'
                        : unlocked
                          ? selected
                            ? 'Current'
                            : 'Unlocked'
                          : 'Locked';
                      return (
                        <button
                          key={trackStage.stageId}
                          type="button"
                          disabled={!unlocked}
                          onClick={() => onSelectStage(trackStage.stageId)}
                          className={`min-h-16 rounded-lg border px-2.5 py-2 text-left transition ${
                            selected
                              ? 'border-amber-200 bg-amber-300/20 text-white'
                              : unlocked
                                ? 'border-cyan-200/30 bg-slate-900/55 text-sky-100 hover:bg-slate-800/75'
                                : 'border-slate-500/25 bg-slate-950/45 text-slate-500'
                          }`}
                        >
                          <span className="flex flex-wrap items-center gap-1.5 text-xs font-black sm:text-sm">
                            <span>
                              Stage {trackStage.stageNumber} —{' '}
                              {compactStageLabel(trackStage)} — {stateText}
                            </span>
                            {completed && bestAccuracy[trackStage.stageId] ? (
                              <span className="rounded-full bg-cyan-300/15 px-1.5 py-0.5 text-[10px] uppercase text-cyan-100">
                                Best {bestAccuracy[trackStage.stageId]}%
                              </span>
                            ) : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <details className={`${styles.seaPanel} w-full max-w-xl px-4 py-2 text-sm text-sky-100/90`}>
        <summary className="cursor-pointer font-bold text-cyan-200">
          How to play
        </summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>{selectedCharacter.name} runs down the causeway on their own.</li>
          <li>Each gate shows a letter. Press or tap that key before the gate arrives.</li>
          <li>Wrong key? No problem. The right key keeps glowing, and practice bumps are learning moments.</li>
        </ol>
      </details>
    </div>
  );
}

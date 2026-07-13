'use client';

import { KeyCurrentCharacter } from './KeyCurrentCharacter';
import {
  KEY_CURRENT_CHARACTERS,
  KEY_CURRENT_DIFFICULTIES,
  KEY_CURRENT_TRACKS,
  getKeyCurrentCharacter,
} from './keyCurrentTracks';
import styles from './keyCurrent.module.css';
import type {
  KeyCurrentDifficultyId,
  KeyCurrentSettings,
  KeyCurrentStage,
} from './keyCurrentTypes';

type KeyCurrentLandingProps = {
  stage: KeyCurrentStage;
  settings: KeyCurrentSettings;
  onUpdateSettings: (next: Partial<KeyCurrentSettings>) => void;
  onStart: () => void;
  savedXp: number;
  savedLevel: number;
  stageCompletedBefore: boolean;
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

export function KeyCurrentLanding({
  stage,
  settings,
  onUpdateSettings,
  onStart,
  savedXp,
  savedLevel,
  stageCompletedBefore,
}: KeyCurrentLandingProps) {
  const selectedCharacter = getKeyCurrentCharacter(settings.characterId);
  const trackA = KEY_CURRENT_TRACKS[0];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-1 py-2 sm:gap-5">
      <div className="flex flex-col items-center text-center">
        <span className={styles.titleBadge}>🌊 Skills Sea · Keyboard Runner</span>
        <h1
          className={`${styles.titleWave} mt-2 text-5xl font-black tracking-tight sm:text-6xl`}
        >
          Key Current
        </h1>
        <p className="mt-2 text-sm font-bold text-sky-100 drop-shadow-[0_2px_4px_rgba(3,22,56,0.8)] sm:text-base">
          Ride the current — clear the gates by finding the right keys!
        </p>
      </div>

      <div className="grid w-full gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Explorer picker: all six characters, all unlocked, cosmetic only */}
        <section
          aria-label="Choose your explorer"
          className={`${styles.seaPanel} flex flex-col gap-2.5 p-3.5 sm:p-4`}
        >
          <p className="text-[11px] font-black uppercase tracking-widest text-teal-300">
            Choose your explorer
          </p>

          <div className="flex items-stretch gap-3">
            {/* big selected preview on a sandy pedestal */}
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
              aria-label="Explorers — everyone runs the same, pick your favorite!"
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
            {selectedCharacter.description} · Every explorer runs exactly the same.
          </p>
        </section>

        {/* Stage + difficulty + audio */}
        <section
          aria-label="Today's stage"
          className={`${styles.seaPanel} flex flex-col gap-3 p-3.5 sm:p-4`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-300">
                {trackA.trackName} — Stage 1
              </p>
              <p className="truncate text-xl font-black text-white">
                Practice: {stage.activeKeys.join(' and ')}
              </p>
            </div>
            <div className="flex flex-none gap-1.5" aria-hidden>
              {stage.activeKeys.map((key) => (
                <span
                  key={key}
                  className="grid h-11 w-11 place-items-center rounded-lg border-2 border-amber-300 bg-gradient-to-b from-amber-100 to-amber-300 text-xl font-black text-amber-950 shadow-[0_4px_0_rgba(146,64,14,0.6)]"
                >
                  {key}
                </span>
              ))}
            </div>
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
              hint="Visual guidance text (Find F!) — spoken Voice Help comes in a later checkpoint."
              enabled={settings.voiceHelpEnabled}
              onToggle={() =>
                onUpdateSettings({ voiceHelpEnabled: !settings.voiceHelpEnabled })
              }
            />
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={onStart}
        className={`${styles.goldButton} w-full max-w-sm px-8 py-4 text-xl`}
      >
        {stageCompletedBefore ? '▶ Play Again' : '▶ Start Guided Practice'}
      </button>

      <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-semibold text-sky-100/90 drop-shadow-[0_1px_3px_rgba(3,22,56,0.8)]">
        <span>
          ⭐ Level {savedLevel} · {savedXp} XP (local preview)
        </span>
        <span>⌨️ Desktop: press the keys</span>
        <span>👆 Tablet/phone: tap the big keys</span>
      </div>

      <details className={`${styles.seaPanel} w-full max-w-xl px-4 py-2 text-sm text-sky-100/90`}>
        <summary className="cursor-pointer font-bold text-cyan-200">
          How to play
        </summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>{selectedCharacter.name} runs down the causeway on their own.</li>
          <li>Each gate shows a letter. Press (or tap) that key before the gate arrives.</li>
          <li>Wrong key? No problem — the right key keeps glowing. Bonks are harmless!</li>
        </ol>
      </details>
    </div>
  );
}

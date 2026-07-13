import type { ReactNode } from 'react';

type Props = {
  status: 'ready' | 'running' | 'paused' | 'ended';
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleMotion: () => void;
  children?: ReactNode;
};

export function GameControlRow({
  status,
  onStart,
  onPause,
  onResume,
  onEnd,
  soundOn,
  onToggleSound,
  reducedMotion,
  onToggleMotion,
  children,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {status !== 'running' && status !== 'paused' ? (
        <button type="button" onClick={onStart} className="min-h-11 rounded-xl bg-teal-600 px-4 py-2 font-semibold text-white outline-none transition focus-visible:ring-4 focus-visible:ring-teal-200">
          Start
        </button>
      ) : null}
      {status === 'running' && (
        <button type="button" onClick={onPause} className="min-h-11 rounded-xl bg-amber-500 px-4 py-2 font-semibold text-white outline-none transition focus-visible:ring-4 focus-visible:ring-amber-200">
          Pause
        </button>
      )}
      {status === 'paused' && (
        <button type="button" onClick={onResume} className="min-h-11 rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white outline-none transition focus-visible:ring-4 focus-visible:ring-sky-200">
          Resume
        </button>
      )}
      {(status === 'running' || status === 'paused') && (
        <button type="button" onClick={onEnd} className="min-h-11 rounded-xl bg-rose-600 px-4 py-2 font-semibold text-white outline-none transition focus-visible:ring-4 focus-visible:ring-rose-200">
          End Round
        </button>
      )}
      <button type="button" onClick={onToggleSound} className="min-h-11 rounded-xl bg-slate-700 px-4 py-2 font-semibold text-white outline-none transition focus-visible:ring-4 focus-visible:ring-slate-300">
        {soundOn ? 'Mute Sounds' : 'Unmute Sounds'}
      </button>
      <button type="button" onClick={onToggleMotion} className="min-h-11 rounded-xl bg-slate-700 px-4 py-2 font-semibold text-white outline-none transition focus-visible:ring-4 focus-visible:ring-slate-300">
        {reducedMotion ? 'Enable Motion' : 'Reduce Motion'}
      </button>
      {children}
    </div>
  );
}

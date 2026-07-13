'use client';

import { KeyboardTarget } from './keymap';

type Props = {
  targets: KeyboardTarget[];
  paused: boolean;
};

export function KeyboardCoachDock({ targets, paused }: Props) {
  if (paused || targets.length === 0) return null;

  const activeKey = targets[0]?.key?.toUpperCase() === ' ' ? 'SPACE' : targets[0]?.key?.toUpperCase();
  const nextKey = targets[1]?.key?.toUpperCase();

  return (
    <aside className="w-full rounded-2xl bg-slate-900/95 p-3 text-white shadow-2xl ring-1 ring-cyan-300/30" aria-live="polite">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">Keyboard Coach</h3>
        <span className="rounded bg-slate-700 px-2 py-1 text-xs">Guide</span>
      </div>
      <p className="mt-2 text-xs text-cyan-100">
        Target: <b>{activeKey ?? '-'}</b>
        {nextKey ? <span className="ml-2 text-sky-300">Next: {nextKey}</span> : null}
      </p>
    </aside>
  );
}

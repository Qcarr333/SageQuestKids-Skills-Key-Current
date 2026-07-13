'use client';

import type { SkillPayloadPreview } from '../../lib/runtime/skillsRuntimeTypes';

type SkillsRuntimeDebugPanelProps = {
  preview: SkillPayloadPreview;
};

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function getMetadataValue(
  preview: SkillPayloadPreview,
  key: string,
): string | number | boolean | null {
  const value =
    preview.roundResult.metadata?.[key] ??
    preview.xpEvent.metadata?.[key] ??
    preview.progress.metadata?.[key];

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }

  return null;
}

function DebugRow({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 break-words font-mono text-xs text-slate-950">
        {value === undefined || value === null ? 'n/a' : String(value)}
      </dd>
    </div>
  );
}

function DebugDetails({
  title,
  value,
}: {
  title: string;
  value: unknown;
}) {
  return (
    <details className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <summary className="cursor-pointer text-sm font-semibold text-slate-900">
        {title}
      </summary>
      <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
        {JSON.stringify(value, null, 2)}
      </pre>
    </details>
  );
}

export function SkillsRuntimeDebugPanel({
  preview,
}: SkillsRuntimeDebugPanelProps) {
  return (
    <section className="rounded-2xl border border-amber-300 bg-amber-50/95 p-4 text-slate-950 shadow">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-black">
            Development-only Skills Runtime Preview
          </h2>
          <p className="mt-1 text-xs text-slate-700">
            Local preview only. No backend request is made from this panel.
          </p>
        </div>
        <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-bold text-amber-950">
          previewOnly: {String(preview.previewOnly)}
        </span>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <DebugRow label="previewOnly" value={preview.previewOnly} />
        <DebugRow label="moduleId" value={preview.roundResult.moduleId} />
        <DebugRow label="gameKey" value={preview.roundResult.gameKey} />
        <DebugRow label="lessonId" value={preview.roundResult.lessonId} />
        <DebugRow label="sessionId" value={preview.roundResult.sessionId} />
        <DebugRow label="roundId" value={preview.roundResult.roundId} />
        <DebugRow label="roundAttempt" value={preview.roundResult.roundAttempt} />
        <DebugRow label="durationMs" value={preview.roundResult.durationMs} />
        <DebugRow label="score" value={preview.roundResult.score} />
        <DebugRow
          label="accuracy"
          value={formatPercent(preview.roundResult.accuracy)}
        />
        <DebugRow label="xpProposed" value={preview.roundResult.xpProposed} />
        <DebugRow
          label="soundPreference"
          value={getMetadataValue(preview, 'soundPreference')}
        />
        <DebugRow
          label="reducedMotion"
          value={getMetadataValue(preview, 'reducedMotion')}
        />
      </dl>

      <div className="mt-4 grid gap-3">
        <DebugDetails title="roundResult" value={preview.roundResult} />
        <DebugDetails title="xpEvent" value={preview.xpEvent} />
        <DebugDetails title="progress" value={preview.progress} />
        <DebugDetails title="registryEntry" value={preview.registryEntry} />
      </div>
    </section>
  );
}

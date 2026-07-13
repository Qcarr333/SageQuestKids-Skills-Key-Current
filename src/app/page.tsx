import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-gradient-to-b from-sky-800 via-cyan-900 to-slate-950 px-6 py-10 text-center">
      <p className="rounded-full bg-cyan-400/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-200">
        Sage Quest Kids — Skills Module Workspace
      </p>
      <h1 className="text-4xl font-black text-white sm:text-5xl">
        Skills Sea Games
      </h1>
      <p className="max-w-md text-sm text-sky-100/80">
        Portable Skills games under active development. Runtime is local
        preview only — no backend writes.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/skills/key-current"
          className="rounded-2xl bg-amber-400 px-8 py-4 text-lg font-black text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
        >
          Play Key Current →
        </Link>
        <Link
          href="/skills"
          className="rounded-2xl border border-cyan-300/50 bg-cyan-400/10 px-8 py-4 text-lg font-black text-cyan-100 transition hover:bg-cyan-400/20"
        >
          All Skills games
        </Link>
      </div>
    </main>
  );
}

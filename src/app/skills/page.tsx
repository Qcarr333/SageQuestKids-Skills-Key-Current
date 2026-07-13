import type { Metadata } from 'next';
import Link from 'next/link';
import { SKILLS_GAME_REGISTRY } from '@/modules/skills/lib/runtime/skillsGameRegistry';

export const metadata: Metadata = {
  title: 'Skills — Sage Quest Kids',
  description: 'Skill-building games in the Sage Quest Kids Skills module.',
};

/**
 * Minimal Skills index for this standalone workspace: registry-driven cards
 * for games that live under /skills/*. The main project keeps its own Skills
 * page — see key-current-migration-readiness.md for the exact card to add.
 */
export default function SkillsIndexPage() {
  // Only games whose components live in THIS workspace (other /skills/*
  // registry entries exist solely in the main project and would 404 here).
  const skillsGames = SKILLS_GAME_REGISTRY.filter(
    (entry) =>
      entry.status === 'playable' &&
      entry.route?.startsWith('/skills/') &&
      entry.componentFolder?.startsWith('src/modules/skills/'),
  );

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-gradient-to-b from-blue-700 via-sky-700 to-blue-950 px-6 py-10">
      <div className="text-center">
        <p className="rounded-full bg-cyan-400/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-200">
          Sage Quest Kids
        </p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
          Skills Games
        </h1>
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {skillsGames.map((game) => (
          <Link
            key={game.moduleId}
            href={game.route ?? '#'}
            className="group rounded-2xl border-2 border-blue-300/40 bg-blue-900/60 p-5 shadow-lg shadow-blue-950/50 backdrop-blur-sm transition hover:-translate-y-1 hover:border-amber-300/70"
          >
            <p className="text-2xl">{game.category === 'keyboard' ? '⌨️' : '🎮'}</p>
            <h2 className="mt-2 text-xl font-black text-white group-hover:text-amber-200">
              {game.title}
            </h2>
            <p className="mt-1 text-sm text-sky-100/80">
              {game.moduleId === 'key_current'
                ? 'Ride the Skills Sea current and open letter gates by finding the right keys.'
                : `Play ${game.title}.`}
            </p>
            <p className="mt-3 text-sm font-black text-amber-300">Play →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

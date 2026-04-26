import { LeaderboardTable } from "@/components/leaderboard-table";
import { fetchLeaderboard } from "@/lib/crackers";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const entries = await fetchLeaderboard().catch(() => []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cracker-500">
          Community
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-cracker-900 sm:text-5xl">
          Global leaderboard
        </h1>
        <p className="mt-2 max-w-xl text-sm text-cracker-600">
          Aggregated rankings from all users. Crackers are grouped by name —
          the more votes, the more reliable the score.
        </p>
      </header>

      <LeaderboardTable entries={entries} />

      <footer className="mt-12 text-center text-xs text-cracker-400">
        Built with Next.js + Supabase
      </footer>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { LeaderboardTable } from "./components/leaderboard-table";
import { fetchLeaderboard } from "@/lib/crackers";
import type { LeaderboardEntry } from "@/lib/schema";

export default function LeaderboardPage() {
  const { t } = useLocale();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboard()
      .then(setEntries)
      .catch(() => setEntries([]));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cracker-500">
          {t.leaderboard.tag}
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-cracker-900 sm:text-5xl">
          {t.leaderboard.title}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-cracker-600">
          {t.leaderboard.subtitle}
        </p>
      </header>

      <LeaderboardTable entries={entries} />

      <footer className="mt-12 text-center text-xs text-cracker-400">
        {t.leaderboard.footer}
      </footer>
    </main>
  );
}

"use client";

import type { LeaderboardEntry } from "@/lib/schema";
import { useLocale } from "./locale-provider";
import { RankBadge } from "./rank-badge";

type Props = { entries: LeaderboardEntry[] };

export function LeaderboardTable({ entries }: Props) {
  const { t } = useLocale();

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl bg-white/80 p-12 text-center shadow-soft ring-1 ring-cracker-200">
        <p className="text-sm font-medium text-cracker-700">
          {t.leaderboardTable.empty}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/80 shadow-soft ring-1 ring-cracker-200 backdrop-blur">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-cracker-50/60 text-xs uppercase tracking-wider text-cracker-600">
            <tr>
              <th className="w-12 px-4 py-3 text-center">
                {t.leaderboardTable.position}
              </th>
              <th className="w-full px-4 py-3">{t.leaderboardTable.cracker}</th>
              <th className="w-32 whitespace-nowrap px-4 py-3 text-center">
                {t.leaderboardTable.avgRank}
              </th>
              <th className="w-24 px-4 py-3 text-center">
                {t.leaderboardTable.votes}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cracker-100">
            {entries.map((entry, i) => (
              <tr
                key={entry.name}
                className="transition hover:bg-cracker-50/60"
              >
                <td className="px-4 py-3 text-center font-mono text-cracker-400">
                  {i + 1}
                </td>
                <td className="px-4 py-3 font-medium text-cracker-900">
                  {entry.name}
                </td>
                <td className="px-4 py-3 text-center">
                  <RankBadge rank={Number(entry.avg_rank)} />
                </td>
                <td className="px-4 py-3 text-center text-cracker-500">
                  {entry.vote_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

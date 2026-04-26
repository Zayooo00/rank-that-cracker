"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Cracker, SortDir, SortKey } from "@/lib/schema";
import { filterAndSortCrackers } from "@/lib/sort";
import { formatDate } from "@/lib/time";
import { RankBadge } from "../../components/rank-badge";

type Props = {
  crackers: readonly Cracker[];
  isLoading?: boolean;
  onDelete: (id: string) => void;
};

export function CrackerTable({ crackers, isLoading, onDelete }: Props) {
  const { t } = useLocale();
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () => filterAndSortCrackers(crackers, { query, sortKey, sortDir }),
    [crackers, query, sortKey, sortDir],
  );

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  return (
    <div className="rounded-2xl bg-white/80 shadow-soft ring-1 ring-cracker-200 backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-cracker-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-cracker-800">
          {t.table.title}
        </h2>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.table.searchPlaceholder}
          className="w-full rounded-lg border border-cracker-200 bg-white/90 px-3 py-1.5 text-sm text-cracker-900 placeholder:text-cracker-300 focus:border-cracker-500 focus:outline-none focus:ring-2 focus:ring-cracker-300 sm:w-72"
        />
      </div>

      {isLoading ? (
        <CrackerTableSkeleton />
      ) : crackers.length === 0 ? (
        <EmptyState />
      ) : visible.length === 0 ? (
        <div className="p-10 text-center text-sm text-cracker-500">
          {t.table.noMatch.replace("{query}", query)}
        </div>
      ) : (
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cracker-50/60 text-xs uppercase tracking-wider text-cracker-600">
              <tr>
                <th className="w-20 px-4 py-3">{t.table.photo}</th>
                <SortHeader
                  label={t.table.name}
                  active={sortKey === "name"}
                  dir={sortDir}
                  onClick={() => toggleSort("name")}
                />
                <SortHeader
                  label={t.table.rank}
                  active={sortKey === "rank"}
                  dir={sortDir}
                  onClick={() => toggleSort("rank")}
                  align="center"
                />
                <th className="px-4 py-3">{t.table.notes}</th>
                <SortHeader
                  label={t.table.added}
                  active={sortKey === "createdAt"}
                  dir={sortDir}
                  onClick={() => toggleSort("createdAt")}
                />
                <th className="w-16 px-4 py-3 text-right">&nbsp;</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cracker-100">
              {visible.map((c) => (
                <tr key={c.id} className="transition hover:bg-cracker-50/60">
                  <td className="px-4 py-3">
                    <Thumb src={c.imageUrl} alt={c.name} />
                  </td>
                  <td className="px-4 py-3 font-medium text-cracker-900">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <RankBadge rank={c.rank} />
                  </td>
                  <td className="max-w-xs px-4 py-3 text-cracker-600">
                    <span className="line-clamp-2">{c.notes || "—"}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-cracker-500">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onDelete(c.id)}
                      className="rounded-md px-2 py-1 text-xs font-medium text-cracker-500 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`${t.table.delete} ${c.name}`}
                    >
                      {t.table.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  align?: "left" | "center";
}) {
  return (
    <th
      className={`px-4 py-3 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1 uppercase tracking-wider transition hover:text-cracker-800 ${
          active ? "text-cracker-800" : "text-cracker-600"
        }`}
      >
        {label}
        <span
          className={`text-[10px] transition ${active ? "opacity-100" : "opacity-30"}`}
        >
          {active && dir === "asc" ? "▲" : "▼"}
        </span>
      </button>
    </th>
  );
}

function Thumb({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cracker-100 text-lg text-cracker-400">
        🍘
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      sizes="48px"
      className="h-12 w-12 rounded-lg object-cover ring-1 ring-cracker-200"
      unoptimized
    />
  );
}

export function CrackerTableSkeleton() {
  return (
    <div className="scrollbar-thin overflow-x-auto">
      <table className="w-full animate-pulse text-left text-sm">
        <thead className="bg-cracker-50/60 text-xs uppercase tracking-wider text-cracker-600">
          <tr>
            <th className="w-20 px-4 py-3">Photo</th>
            <th className="px-4 py-3">
              <span className="inline-flex items-center gap-1">
                Name <span className="text-[10px] opacity-20">▼</span>
              </span>
            </th>
            <th className="px-4 py-3 text-center">
              <span className="inline-flex items-center gap-1">
                Rank <span className="text-[10px] opacity-20">▼</span>
              </span>
            </th>
            <th className="px-4 py-3">Notes</th>
            <th className="px-4 py-3">
              <span className="inline-flex items-center gap-1">
                Added <span className="text-[10px] opacity-20">▼</span>
              </span>
            </th>
            <th className="w-16 px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-cracker-100">
          {[0, 1, 2, 3, 4].map((i) => (
            <tr key={i}>
              <td className="px-4 py-3">
                <div className="h-12 w-12 rounded-lg bg-cracker-100" />
              </td>
              <td className="px-4 py-3 font-medium">
                <div className="h-3.5 w-28 rounded bg-cracker-100" />
              </td>
              <td className="px-4 py-3 text-center">
                <div className="mx-auto h-[26px] w-12 rounded-md bg-cracker-100 ring-1 ring-cracker-200" />
              </td>
              <td className="max-w-xs px-4 py-3">
                <div className="h-3 w-48 rounded bg-cracker-50" />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="h-3 w-20 rounded bg-cracker-50" />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="ml-auto h-6 w-12 rounded-md bg-cracker-50" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState() {
  const { t } = useLocale();
  return (
    <div className="p-12 text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-cracker-100 text-2xl">
        🍘
      </div>
      <p className="text-sm font-medium text-cracker-700">{t.table.noYet}</p>
      <p className="mt-1 text-sm text-cracker-500">{t.table.noYetSub}</p>
    </div>
  );
}

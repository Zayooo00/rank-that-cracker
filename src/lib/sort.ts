import type { Cracker, SortDir, SortKey } from "./schema";

export function filterAndSortCrackers(
  crackers: readonly Cracker[],
  options: { query?: string; sortKey: SortKey; sortDir: SortDir },
): Cracker[] {
  const query = options.query?.trim().toLowerCase() ?? "";
  const filtered = query
    ? crackers.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          (c.notes ?? "").toLowerCase().includes(query),
      )
    : crackers;

  const sorted = [...filtered].sort((a, b) => {
    const cmp = compare(a, b, options.sortKey);
    return options.sortDir === "asc" ? cmp : -cmp;
  });
  return sorted;
}

function compare(a: Cracker, b: Cracker, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name);
    case "rank":
      return a.rank - b.rank;
    case "createdAt":
      return a.createdAt - b.createdAt;
  }
}

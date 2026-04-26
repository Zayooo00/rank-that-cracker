type Props = { rank: number };

export function RankBadge({ rank }: Props) {
  const tone =
    rank >= 8.5
      ? "bg-emerald-100 text-emerald-800 ring-emerald-200"
      : rank >= 6
        ? "bg-cracker-100 text-cracker-800 ring-cracker-200"
        : rank >= 3.5
          ? "bg-amber-100 text-amber-800 ring-amber-200"
          : "bg-rose-100 text-rose-800 ring-rose-200";

  return (
    <span
      className={`inline-flex min-w-[3rem] items-center justify-center rounded-md px-2 py-0.5 font-mono text-sm font-semibold ring-1 ${tone}`}
    >
      {rank.toFixed(1)}
    </span>
  );
}

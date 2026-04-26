import { useLocale } from "@/components/locale-provider";
import type { Cracker } from "@/lib/schema";

type Props = { crackers: readonly Cracker[] };

export function StatsBar({ crackers }: Props) {
  const { t } = useLocale();
  const count = crackers.length;
  const avg =
    count > 0 ? crackers.reduce((sum, c) => sum + c.rank, 0) / count : 0;
  const top =
    count > 0 ? [...crackers].sort((a, b) => b.rank - a.rank)[0] : undefined;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <StatCard label={t.stats.crackersRanked} value={count.toString()} />
      <StatCard
        label={t.stats.averageRank}
        value={count > 0 ? avg.toFixed(2) : "—"}
        suffix={count > 0 ? "/ 10" : undefined}
      />
      <StatCard
        label={t.stats.topOfStack}
        value={top?.name ?? "—"}
        suffix={top ? top.rank.toFixed(1) : undefined}
        mono={false}
      />
    </div>
  );
}

export function StatsBarSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl bg-white/70 p-4 shadow-soft ring-1 ring-cracker-200/70"
        >
          <div className="h-3 w-24 rounded bg-cracker-100" />
          <div className="mt-3 h-7 w-16 rounded bg-cracker-100" />
        </div>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  mono = true,
}: {
  label: string;
  value: string;
  suffix?: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 shadow-soft ring-1 ring-cracker-200/70 backdrop-blur">
      <div className="text-xs font-medium uppercase tracking-wider text-cracker-500">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <div
          className={`truncate text-2xl font-semibold text-cracker-800 ${mono ? "font-mono" : ""}`}
        >
          {value}
        </div>
        {suffix && <div className="text-sm text-cracker-500">{suffix}</div>}
      </div>
    </div>
  );
}

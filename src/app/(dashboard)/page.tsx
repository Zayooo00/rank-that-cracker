"use client";

import { AddCrackerForm } from "@/components/add-cracker-form";
import { CrackerTable } from "@/components/cracker-table";
import { StatsBar, StatsBarSkeleton } from "@/components/stats-bar";
import { useCrackers } from "@/hooks/use-crackers";

export default function DashboardPage() {
  const { crackers, isLoading, addCracker, deleteCracker } = useCrackers();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cracker-500">
          A very serious science
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-cracker-900 sm:text-5xl">
          Your rankings
        </h1>
        <p className="mt-2 max-w-xl text-sm text-cracker-600">
          Rate every cracker out of 10, jot down what made it great (or
          tragic), and build your personal leaderboard.
        </p>
      </header>

      <section className="mb-8">
        {isLoading ? <StatsBarSkeleton /> : <StatsBar crackers={crackers} />}
      </section>

      <section className="mb-8">
        <AddCrackerForm onAdd={addCracker} />
      </section>

      <section>
        <CrackerTable
          crackers={crackers}
          isLoading={isLoading}
          onDelete={deleteCracker}
        />
      </section>

      <footer className="mt-12 text-center text-xs text-cracker-400">
        Built with Next.js + Supabase
      </footer>
    </main>
  );
}

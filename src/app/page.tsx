"use client";

import { AddCrackerForm } from "@/components/add-cracker-form";
import { CrackerTable } from "@/components/cracker-table";
import { StatsBar } from "@/components/stats-bar";
import { useCrackers } from "@/hooks/use-crackers";

export default function HomePage() {
  const { crackers, addCracker, deleteCracker } = useCrackers();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cracker-500">
            A very serious science
          </p>
          <h1 className="mt-1 font-sans text-4xl font-bold tracking-tight text-cracker-900 sm:text-5xl">
            Rank That Cracker
          </h1>
          <p className="mt-2 max-w-xl text-sm text-cracker-600">
            Rate every cracker out of 10, jot down what made it great (or
            tragic), and build your personal leaderboard. Saved locally in your
            browser — no sign-up, no server.
          </p>
        </div>
      </header>

      <section className="mb-8">
        <StatsBar crackers={crackers} />
      </section>

      <section className="mb-8">
        <AddCrackerForm onAdd={addCracker} />
      </section>

      <section>
        <CrackerTable crackers={crackers} onDelete={deleteCracker} />
      </section>

      <footer className="mt-12 text-center text-xs text-cracker-400">
        Built with Next.js · Data stays in your browser (localStorage).
      </footer>
    </main>
  );
}

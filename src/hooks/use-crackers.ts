"use client";

import useSWR from "swr";
import { crackerInputSchema, type Cracker } from "@/lib/schema";
import { loadCrackers, newId, saveCrackers } from "@/lib/storage";

const SWR_KEY = "crackers";

type AddResult = { ok: true } | { ok: false; error: string };

export function useCrackers() {
  const { data, isLoading, mutate } = useSWR<Cracker[]>(
    SWR_KEY,
    () => loadCrackers(),
    { revalidateOnFocus: false, fallbackData: [] },
  );

  const crackers = data ?? [];

  async function addCracker(input: unknown): Promise<AddResult> {
    const parsed = crackerInputSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid cracker",
      };
    }
    const cracker: Cracker = {
      ...parsed.data,
      id: newId(),
      createdAt: Date.now(),
    };
    const next = [cracker, ...crackers];
    saveCrackers(next);
    await mutate(next, { revalidate: false });
    return { ok: true };
  }

  async function deleteCracker(id: string): Promise<void> {
    const next = crackers.filter((c) => c.id !== id);
    saveCrackers(next);
    await mutate(next, { revalidate: false });
  }

  return { crackers, isLoading, addCracker, deleteCracker };
}

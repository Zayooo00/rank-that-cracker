"use client";

import useSWR from "swr";
import { createClient } from "@/lib/supabase/client";
import { fetchCrackers, insertCracker, removeCracker } from "@/lib/crackers";
import { crackerInputSchema } from "@/lib/schema";

type AddResult = { ok: true } | { ok: false; error: string };

export function useCrackers() {
  const { data: crackers = [], isLoading, mutate } = useSWR(
    "crackers",
    fetchCrackers,
    { revalidateOnFocus: false },
  );

  async function addCracker(input: unknown): Promise<AddResult> {
    const parsed = crackerInputSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "Not signed in" };
    }

    try {
      const cracker = await insertCracker(parsed.data, user.id);
      await mutate((prev = []) => [cracker, ...prev], { revalidate: false });
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Failed to save cracker",
      };
    }
  }

  async function deleteCracker(id: string): Promise<void> {
    await mutate((prev = []) => prev.filter((c) => c.id !== id), {
      revalidate: false,
    });
    await removeCracker(id);
  }

  return { crackers, isLoading, addCracker, deleteCracker };
}

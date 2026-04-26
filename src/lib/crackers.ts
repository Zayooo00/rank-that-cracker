import { createClient } from "@/lib/supabase/client";
import { resizeImage } from "@/lib/image";
import type { Cracker, CrackerInput, LeaderboardEntry } from "@/lib/schema";

const BUCKET = "cracker-images";

export async function fetchCrackers(): Promise<Cracker[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("crackers")
    .select("id, name, rank, notes, image_path, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data.map(rowToCracker);
}

export async function insertCracker(
  input: CrackerInput,
  userId: string,
): Promise<Cracker> {
  const supabase = createClient();

  let imagePath: string | null = null;
  if (input.imageFile) {
    const resized = await resizeImage(input.imageFile);
    const path = `${userId}/${crypto.randomUUID()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, resized, { contentType: "image/jpeg", upsert: false });
    if (uploadError) {
      throw new Error(uploadError.message);
    }
    imagePath = path;
  }

  const { data, error } = await supabase
    .from("crackers")
    .insert({
      user_id: userId,
      name: input.name.trim(),
      rank: input.rank,
      notes: input.notes?.trim() || null,
      image_path: imagePath,
    })
    .select("id, name, rank, notes, image_path, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return rowToCracker(data);
}

export async function removeCracker(id: string): Promise<void> {
  const supabase = createClient();

  const { data: row } = await supabase
    .from("crackers")
    .select("image_path")
    .eq("id", id)
    .single();

  if (row?.image_path) {
    await supabase.storage.from(BUCKET).remove([row.image_path]);
  }

  const { error } = await supabase.from("crackers").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("global_leaderboard");
  if (error) {
    throw new Error(error.message);
  }
  return data as LeaderboardEntry[];
}

function rowToCracker(row: {
  id: string;
  name: string;
  rank: number;
  notes: string | null;
  image_path: string | null;
  created_at: string;
}): Cracker {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imageUrl =
    row.image_path && supabaseUrl
      ? `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${row.image_path}`
      : undefined;

  return {
    id: row.id,
    name: row.name,
    rank: Number(row.rank),
    notes: row.notes ?? undefined,
    imageUrl,
    createdAt: new Date(row.created_at).getTime(),
  };
}

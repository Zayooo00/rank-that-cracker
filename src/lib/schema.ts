import { z } from "zod";

export const crackerSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Name is required").max(80),
  rank: z.number().min(1).max(10),
  notes: z.string().trim().max(240).optional(),
  imageUrl: z.string().url().optional(),
  createdAt: z.number().int().positive(),
});

export const crackerInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  rank: z.number().min(1).max(10),
  notes: z.string().trim().max(240).optional(),
  imageFile: z.instanceof(File).optional(),
});

export const leaderboardEntrySchema = z.object({
  name: z.string(),
  avg_rank: z.coerce.number(),
  vote_count: z.coerce.number(),
});

export const sortKeySchema = z.enum(["name", "rank", "createdAt"]);
export const sortDirSchema = z.enum(["asc", "desc"]);

export type Cracker = z.infer<typeof crackerSchema>;
export type CrackerInput = z.infer<typeof crackerInputSchema>;
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;
export type SortKey = z.infer<typeof sortKeySchema>;
export type SortDir = z.infer<typeof sortDirSchema>;

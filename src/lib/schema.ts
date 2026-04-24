import { z } from "zod";

export const crackerSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Name is required").max(80),
  rank: z.number().min(1).max(10),
  notes: z.string().trim().max(240).optional(),
  imageDataUrl: z.string().optional(),
  createdAt: z.number().int().positive(),
});

export const crackerInputSchema = crackerSchema.omit({
  id: true,
  createdAt: true,
});

export const crackerListSchema = z.array(crackerSchema);

export type Cracker = z.infer<typeof crackerSchema>;
export type CrackerInput = z.infer<typeof crackerInputSchema>;

export const sortKeySchema = z.enum(["name", "rank", "createdAt"]);
export const sortDirSchema = z.enum(["asc", "desc"]);

export type SortKey = z.infer<typeof sortKeySchema>;
export type SortDir = z.infer<typeof sortDirSchema>;

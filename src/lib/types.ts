export type Cracker = {
  id: string;
  name: string;
  rank: number;
  notes?: string;
  imageDataUrl?: string;
  createdAt: number;
};

export type SortKey = "name" | "rank" | "createdAt";
export type SortDir = "asc" | "desc";

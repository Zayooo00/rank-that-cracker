"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CrackerInput } from "@/lib/schema";
import { fileToDataUrl } from "@/lib/storage";

type Props = {
  onAdd: (
    input: CrackerInput,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
};

export function AddCrackerForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [rank, setRank] = useState(7);
  const [notes, setNotes] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    try {
      setBusy(true);
      const url = await fileToDataUrl(file);
      setImageDataUrl(url);
    } catch {
      setError("Couldn't read that image. Try a JPG or PNG.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const result = await onAdd({
      name,
      rank,
      notes: notes.trim() || undefined,
      imageDataUrl,
    });
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setName("");
    setRank(7);
    setNotes("");
    setImageDataUrl(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/80 p-6 shadow-soft ring-1 ring-cracker-200 backdrop-blur"
    >
      <h2 className="mb-4 text-lg font-semibold text-cracker-800">
        Add a cracker
      </h2>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-cracker-700">
              Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ritz Original"
              className="w-full rounded-lg border border-cracker-200 bg-white/90 px-3 py-2 text-cracker-900 placeholder:text-cracker-300 focus:border-cracker-500 focus:outline-none focus:ring-2 focus:ring-cracker-300"
              maxLength={80}
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 flex items-center justify-between text-sm font-medium text-cracker-700">
              <span>Rank</span>
              <span className="rounded-md bg-cracker-100 px-2 py-0.5 font-mono text-cracker-800">
                {rank.toFixed(1)} / 10
              </span>
            </span>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              className="w-full accent-cracker-500"
            />
            <div className="mt-1 flex justify-between text-xs text-cracker-400">
              <span>meh</span>
              <span>legendary</span>
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-cracker-700">
              Notes{" "}
              <span className="font-normal text-cracker-400">(optional)</span>
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Buttery, crumbly, dangerously snackable."
              className="w-full resize-none rounded-lg border border-cracker-200 bg-white/90 px-3 py-2 text-cracker-900 placeholder:text-cracker-300 focus:border-cracker-500 focus:outline-none focus:ring-2 focus:ring-cracker-300"
              maxLength={240}
            />
          </label>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="relative h-32 w-32 overflow-hidden rounded-xl border-2 border-dashed border-cracker-300 bg-cracker-50">
            {imageDataUrl ? (
              <Image
                src={imageDataUrl}
                alt="Preview"
                fill
                sizes="128px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-center text-xs text-cracker-400">
                No photo yet
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="block w-50 text-xs text-cracker-600 file:mr-2 file:cursor-pointer file:rounded-md file:border-0 file:bg-cracker-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-cracker-800 hover:file:bg-cracker-200"
          />
          {imageDataUrl && (
            <button
              type="button"
              onClick={() => {
                setImageDataUrl(undefined);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs text-cracker-600 underline hover:text-cracker-800"
            >
              Remove image
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-cracker-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-cracker-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Saving..." : "Add cracker"}
        </button>
      </div>
    </form>
  );
}

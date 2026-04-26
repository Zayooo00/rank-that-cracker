"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "./locale-provider";

const signUpSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignUpForm() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = signUpSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      ...parsed.data,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    setDone(true);
  }

  async function handleGoogleSignUp() {
    setError(null);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (authError) {
      setError(authError.message);
    }
  }

  if (done) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="mb-4 text-4xl">✉️</div>
        <h2 className="mb-2 text-xl font-bold text-cracker-900">
          {t.signUp.checkInboxTitle}
        </h2>
        <p className="text-sm text-cracker-600">
          {t.signUp.checkInboxBody.replace("{email}", email)}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-1 text-2xl font-bold text-cracker-900">
        {t.signUp.title}
      </h1>
      <p className="mb-6 text-sm text-cracker-500">
        {t.signUp.haveAccount}{" "}
        <Link
          href="/sign-in"
          className="font-medium text-cracker-700 underline hover:text-cracker-900"
        >
          {t.signUp.signInLink}
        </Link>
      </p>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="mb-4 flex w-full items-center justify-center gap-3 rounded-lg border border-cracker-200 bg-white px-4 py-2.5 text-sm font-medium text-cracker-800 shadow-sm transition hover:bg-cracker-50 active:scale-[0.98]"
      >
        <GoogleIcon />
        {t.signUp.continueGoogle}
      </button>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-cracker-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-cracker-50 px-2 text-cracker-400">
            {t.signUp.orEmail}
          </span>
        </div>
      </div>

      <form onSubmit={handleEmailSignUp} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-cracker-700">
            {t.signUp.email}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-cracker-200 bg-white px-3 py-2 text-cracker-900 placeholder:text-cracker-300 focus:border-cracker-500 focus:outline-none focus:ring-2 focus:ring-cracker-300"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-cracker-700">
            {t.signUp.password}
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-lg border border-cracker-200 bg-white px-3 py-2 text-cracker-900 placeholder:text-cracker-300 focus:border-cracker-500 focus:outline-none focus:ring-2 focus:ring-cracker-300"
          />
        </label>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-cracker-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cracker-700 active:scale-[0.98] disabled:opacity-60"
        >
          {busy ? t.signUp.creating : t.signUp.submit}
        </button>
      </form>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

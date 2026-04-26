"use client";

import Link from "next/link";
import { useLocale } from "./locale-provider";
import { LanguageSwitcher } from "./language-switcher";

type Props = { email: string | null };

export function SiteNav({ email }: Props) {
  const { t } = useLocale();

  return (
    <header className="border-b px-4 py-3 border-cracker-200/60 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/dashboard"
          className="text-sm font-bold tracking-tight text-cracker-900 hover:text-cracker-700"
        >
          🍘 Rank That Cracker
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/leaderboard"
            className="mr-1 hidden text-cracker-600 transition hover:text-cracker-900 sm:inline"
          >
            {t.nav.globalLeaderboard}
          </Link>

          <LanguageSwitcher />

          {email ? (
            <>
              <div
                className="flex h-7 w-7 items-center justify-center rounded-md bg-cracker-100 text-xs font-bold text-cracker-700 ring-1 ring-cracker-200"
                title={email}
              >
                {email[0].toUpperCase()}
              </div>
              <form action="/auth/sign-out" method="post">
                <button
                  type="submit"
                  className="rounded-md border border-cracker-200 px-3 py-1.5 text-xs font-medium text-cracker-700 transition hover:bg-cracker-50"
                >
                  {t.nav.signOut}
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-md bg-cracker-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cracker-700"
            >
              {t.nav.signIn}
            </Link>
          )}
        </nav>
      </div>

      <div className="mx-auto max-w-5xl sm:hidden">
        <Link
          href="/leaderboard"
          className="text-sm text-cracker-600 transition hover:text-cracker-900"
        >
          {t.nav.globalLeaderboard}
        </Link>
      </div>
    </header>
  );
}

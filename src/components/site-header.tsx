import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-cracker-200/60 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-cracker-900 hover:text-cracker-700"
        >
          Rank That Cracker
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/leaderboard"
            className="text-cracker-600 transition hover:text-cracker-900"
          >
            Global Leaderboard
          </Link>

          {user ? (
            <>
              <div
                className="flex h-7 w-7 items-center justify-center rounded-md bg-cracker-100 text-xs font-bold text-cracker-700 ring-1 ring-cracker-200"
                title={user.email ?? undefined}
              >
                {(user.email ?? "?")[0].toUpperCase()}
              </div>
              <form action="/auth/sign-out" method="post">
                <button
                  type="submit"
                  className="rounded-md border border-cracker-200 px-3 py-1.5 text-xs font-medium text-cracker-700 transition hover:bg-cracker-50"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-md bg-cracker-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cracker-700"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

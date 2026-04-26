# Rank That Cracker

Rate crackers out of 10. Build your personal leaderboard. Settle the debate once and for all.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-green?logo=supabase) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## Features

- **Sign in** — Google OAuth or email + password
- **Personal dashboard** — your own ranked list, visible only to you (RLS enforced)
- **Add crackers** — name, rank 1–10, optional notes, optional photo (resized + stored in Supabase Storage)
- **Sortable table** — sort by name, rank, or date; search by name or notes
- **Global leaderboard** — community aggregation grouped by cracker name, publicly visible
- **Color-coded rank badges** — green for legends, red for the ones you regret buying

## Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev) + [TypeScript](https://typescriptlang.org)
- [Supabase](https://supabase.com) — Postgres + Auth + Storage
- [SWR](https://swr.vercel.app) for client-side data fetching
- [Zod](https://zod.dev) for runtime validation
- [Tailwind CSS 3](https://tailwindcss.com)
- [Prettier](https://prettier.io) + ESLint

## Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and run the contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql). This creates the `crackers` table, RLS policies, the `global_leaderboard` function, and the `cracker-images` storage bucket.
3. Go to **Authentication → Providers → Google** and enable Google OAuth. You'll need a Google Cloud OAuth client ID and secret ([guide](https://supabase.com/docs/guides/auth/social-login/auth-google)).
4. Add your site URL to **Authentication → URL Configuration → Redirect URLs**: `http://localhost:3000/auth/callback` for dev, and your Vercel URL for production.
5. Copy your project URL and anon key from **Project Settings → API** into `.env.local`:

```bash
cp .env.local.example .env.local
# then fill in the two values
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
2. Add the two environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings.
3. Hit **Deploy**.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (CI) |

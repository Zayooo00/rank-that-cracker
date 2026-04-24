# Rank That Cracker

Rate crackers out of 10. Build your personal leaderboard. Settle the debate once and for all.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## Features

- **Add crackers** — name, rank on a 1–10 scale (half-point steps), optional notes, optional photo
- **Photo upload** — images are resized client-side and stored as base64; no file storage needed
- **Live dashboard** — total count, average rank, and current champion update instantly
- **Sortable table** — sort by name, rank, or date added in either direction
- **Search** — filter by cracker name or notes
- **Color-coded rank badges** — green for legends, red for the ones you regret buying
- **No account, no server** — everything lives in your browser's localStorage

## Stack

- [Next.js 15](https://nextjs.org) (App Router, static export)
- [React 19](https://react.dev)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS 3](https://tailwindcss.com)
- [SWR](https://swr.vercel.app) for state management
- [Zod](https://zod.dev) for runtime validation
- [Prettier](https://prettier.io) + ESLint

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (CI) |

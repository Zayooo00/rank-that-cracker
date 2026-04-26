-- Rank That Cracker — initial schema
-- Run this in the Supabase SQL editor (or via the Supabase CLI) once per project.

-- ---------------------------------------------------------------------------
-- crackers table
-- ---------------------------------------------------------------------------

create table if not exists public.crackers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null check (length(name) between 1 and 80),
  rank numeric(3, 1) not null check (rank between 1 and 10),
  notes text check (notes is null or length(notes) <= 240),
  image_path text,
  created_at timestamptz not null default now()
);

create index if not exists crackers_user_id_idx on public.crackers (user_id);
create index if not exists crackers_name_lower_idx
  on public.crackers (lower(trim(name)));

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------

alter table public.crackers enable row level security;

drop policy if exists "Users select own crackers" on public.crackers;
create policy "Users select own crackers"
  on public.crackers for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users insert own crackers" on public.crackers;
create policy "Users insert own crackers"
  on public.crackers for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users update own crackers" on public.crackers;
create policy "Users update own crackers"
  on public.crackers for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users delete own crackers" on public.crackers;
create policy "Users delete own crackers"
  on public.crackers for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Global leaderboard (aggregated across all users, public)
-- Uses security definer so it can read across all users' rows even though
-- direct SELECT on public.crackers is restricted by RLS to row owners.
-- ---------------------------------------------------------------------------

create or replace function public.global_leaderboard()
returns table (
  name text,
  avg_rank numeric,
  vote_count bigint
)
language sql
security definer
set search_path = public
as $$
  select
    initcap((array_agg(c.name order by c.created_at asc))[1]) as name,
    round(avg(c.rank)::numeric, 2) as avg_rank,
    count(*)::bigint as vote_count
  from public.crackers c
  group by lower(trim(c.name))
  order by avg(c.rank) desc, count(*) desc
$$;

revoke all on function public.global_leaderboard() from public;
grant execute on function public.global_leaderboard() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage bucket for cracker images
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('cracker-images', 'cracker-images', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can view cracker images" on storage.objects;
create policy "Anyone can view cracker images"
  on storage.objects for select
  to public
  using (bucket_id = 'cracker-images');

drop policy if exists "Users upload to own folder" on storage.objects;
create policy "Users upload to own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'cracker-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users delete own files" on storage.objects;
create policy "Users delete own files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'cracker-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

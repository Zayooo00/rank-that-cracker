import { createClient } from "@/lib/supabase/server";
import { SiteNav } from "./site-header";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SiteNav email={user?.email ?? null} />;
}

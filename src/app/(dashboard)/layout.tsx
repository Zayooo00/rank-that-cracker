import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header-server";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?next=/dashboard");
  }

  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}

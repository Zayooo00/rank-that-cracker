import { redirect } from "next/navigation";

export default function RootDashboardRedirectPage() {
  redirect("/dashboard");
}

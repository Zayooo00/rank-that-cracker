import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rank That Cracker",
  description:
    "Rate, rank, and remember every cracker you've ever crunched. No sign-up required.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "pl" ? "pl" : "en";

  return (
    <html lang={locale}>
      <body className="min-h-full font-sans antialiased">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rank That Cracker",
  description:
    "Rate, rank, and remember every cracker you've ever crunched. No sign-up required.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <Link
        href="/"
        className="mb-10 text-2xl font-bold tracking-tight text-cracker-900 hover:text-cracker-700"
      >
        🍘 Rank That Cracker
      </Link>
      <div className="w-full max-w-sm rounded-2xl bg-white/80 p-8 shadow-soft ring-1 ring-cracker-200 backdrop-blur">
        {children}
      </div>
    </div>
  );
}

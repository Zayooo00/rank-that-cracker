export function formatDate(
  timestamp: number,
  locale?: string | string[],
): string {
  return new Date(timestamp).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

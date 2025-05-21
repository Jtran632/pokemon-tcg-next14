export function absoluteUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.port ?? 3000}`;
}
export async function getSets() {
  const a = fetch("https://api.pokemontcg.io/v2/sets", {
    next: { revalidate: 3600 },
  });
  return (await a).json();
}
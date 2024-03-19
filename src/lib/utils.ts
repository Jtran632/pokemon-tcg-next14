export function absoluteUrl() {
  if (typeof window !== "undefined") return "/api/trpc";
  if (process.env.VERCEL_URL) 
    return `https://${process.env.VERCEL_URL}/api/trpc`;
  return `http://localhost:${process.env.port ?? 3000}/api/trpc`;
}

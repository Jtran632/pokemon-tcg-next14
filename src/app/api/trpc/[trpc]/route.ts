import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "@/server/api/routers/posts";
import { type NextRequest } from "next/server";
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: postRouter,
    //@ts-ignore
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };

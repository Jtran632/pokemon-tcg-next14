import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "@/server/api/routers/posts";
import { type NextRequest } from "next/server";
import { createContext } from "@/server/trpc/server";
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: postRouter,
    createContext,
  });

export { handler as GET, handler as POST };

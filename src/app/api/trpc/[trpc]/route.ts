import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "@/server/api/routers/posts";
import { type NextRequest } from "next/server";
import { headers } from "next/headers";
import { cache } from "react";
import { createTRPCContext } from "@/server/api/trpc";
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: postRouter,
    createContext,
  });

export { handler as GET, handler as POST };

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "../../../../server/api/routers/posts";
import { type NextRequest } from "next/server";
export const maxDuration = 60;
import { db } from "@/server";
import { getSession } from "next-auth/react";

import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const headers = opts.req.headers;
  const session = await getSession();
  return {
    headers,
    db,
    session,
  };
};
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: postRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };

import { db } from "@/server";
import { initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession({ req: opts.req });
  return {
    headers: opts.req.headers,
    db: db,
    session,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
t.procedure.use((opts) => {
  opts.ctx;
  return opts.next();
});

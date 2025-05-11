"use client";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "@/server/api/routers/posts";
import { type NextRequest } from "next/server";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Session } from "next-auth";
import { Sql } from "postgres";
export const maxDuration = 60;
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: postRouter,
    createContext: function (): {
      headers: Headers;
      db: PostgresJsDatabase<typeof import("../../../../db/schema")> & {
        $client: Sql<{}>;
      };
      session: Session | null;
    } {
      throw new Error("Function not implemented.");
    },
  });

export { handler as GET, handler as POST };

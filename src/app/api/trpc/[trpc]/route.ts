"use client";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "@/server/api/routers/posts";
import { type NextRequest } from "next/server";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Session } from "next-auth";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: postRouter,
    createContext: function (): {
      headers: Headers;
      db: PostgresJsDatabase<typeof import("../../../../db/schema")>;
      session: Session | null;
    } {
      throw new Error("Function not implemented.");
    },
  });

export { handler as GET, handler as POST };

"use client";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "../../../../../server/api/routers/posts";
import { type NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../../../db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../auth";

export const maxDuration = 60;

const client = postgres(process.env.DATABASE_URL!);
const db = Object.assign(drizzle(client, { schema }), { $client: client });

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: postRouter,
    createContext: async () => {
      const session = await getServerSession(authOptions);
      return {
        headers: req.headers,
        db,
        session,
      };
    },
  });

export { handler as GET, handler as POST };
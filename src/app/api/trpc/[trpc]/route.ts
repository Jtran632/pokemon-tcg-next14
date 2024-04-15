import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { postRouter } from "@/server/api/routers/posts";
import { type NextRequest } from "next/server";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Session } from "next-auth";
import { absoluteUrl } from "@/lib/utils";
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: absoluteUrl() + "/api/trpc",
    req,
    router: postRouter,
    createContext: function ():
      | {
          headers: Headers;
          db: PostgresJsDatabase<typeof import("../../../../db/schema")>;
          session: Session | null;
        }
      | Promise<{
          headers: Headers;
          db: PostgresJsDatabase<typeof import("../../../../db/schema")>;
          session: Session | null;
        }> {
      throw new Error("Function not implemented.");
    },
  });

export { handler as GET, handler as POST };

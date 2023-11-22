import { users, favCards } from "@/db/schema";
import { publicProcedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { z } from "zod";
const connectionString = process.env.DATABASE_URL as string;
const client = postgres(connectionString);
const db = drizzle(client);
migrate(db, { migrationsFolder: "drizzle" });
export const appRouter = router({
  getFavs: publicProcedure.query(async () => {
    return await db.select().from(favCards);
  }),
  addFav: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(favCards).values({ imageUrl: opts.input });
  }),
  delFav: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.delete(favCards).where(eq(favCards.imageUrl, opts.input));
  }),
});

export type AppRouter = typeof appRouter;

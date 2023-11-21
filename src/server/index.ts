import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { favCards, todos } from "@/db/schema";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "drizzle" });
export const appRouter = router({
  getFavs: publicProcedure.query(async () => {
    return await db.select().from(favCards).all();
  }),
  addFav: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(favCards).values({ imageUrl: opts.input }).run();
  }),
  delFav: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.delete(favCards).where(eq(favCards.imageUrl, opts.input)).run();
  }),
});

export type AppRouter = typeof appRouter;

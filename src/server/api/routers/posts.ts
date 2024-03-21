import { publicProcedure, createTRPCRouter } from "@/server/trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/server";
import { favCards } from "@/db/schema";
export const appRouter = createTRPCRouter({
  getFavs: publicProcedure.query(async () => {
    return await db.select().from(favCards);
  }),
  addFav: publicProcedure
    .input(z.object({ id: z.string(), imageUrl: z.string() }))
    .mutation(
      async (opts: {
        input: {
          id: string;
          imageUrl: string;
        };
      }) => {
        await db
          .insert(favCards)
          .values({ cardId: opts.input.id, imageUrl: opts.input.imageUrl });
      }
    ),
  delFav: publicProcedure
    .input(z.string())
    .mutation(async (opts: { input: string }) => {
      await db.delete(favCards).where(eq(favCards.imageUrl, opts.input));
    }),
});

export type AppRouter = typeof appRouter;

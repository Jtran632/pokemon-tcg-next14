import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "@/server";
import { users, favCards } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts: { input: { text: string } }) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, input))
      .limit(1);
    return user;
  }),
  getFavs: publicProcedure
    .input(z.string())
    .query(async (opts: { input: string }) => {
      const favs = await db
        .select()
        .from(favCards)
        .where(eq(favCards.userId, opts.input));
      return z
        .array(
          z.object({
            id: z.number(),
            cardId: z.string(),
            imageUrl: z.string(),
            userId: z.string(),
          })
        )
        .parse(favs);
    }),
  getUserFavs: publicProcedure
    .input(z.string())
    .query(async (opts: { input: string }) => {
      return await db
        .select()
        .from(favCards)
        .where(eq(favCards.userId, opts.input));
    }),
  addFav: publicProcedure
    .input(
      z.object({
        id: z.string(),
        imageUrl: z.string(),
        userId: z.string(),
      })
    )
    .mutation(
      async (opts: {
        input: { id: string; imageUrl: string; userId: string };
      }) => {
        await db.insert(favCards).values({
          cardId: opts.input.id,
          imageUrl: opts.input.imageUrl,
          userId: opts.input.userId,
        });
      }
    ),
  delFav: publicProcedure
    .input(z.object({ imageUrl: z.string(), userId: z.string() }))
    .mutation(async (opts: { input: { imageUrl: string; userId: string } }) => {
      await db
        .delete(favCards)
        .where(
          and(
            eq(favCards.imageUrl, opts.input.imageUrl),
            eq(favCards.userId, opts.input.userId)
          )
        );
    }),
});

export type AppRouter = typeof postRouter;

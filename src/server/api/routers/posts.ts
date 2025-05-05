import { publicProcedure, createTRPCRouter } from "../trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/server";
import { favCards, users } from "@/db/schema";

export const postRouter = createTRPCRouter({
  // addUser: publicProcedure
  //   .input(z.object({ email: z.string(), password: z.string() }))
  //   .mutation(
  //     async (opts: {
  //       input: {
  //         email: string;
  //         password: string;
  //       };
  //     }) => {
  //       await db
  //         .insert(users)
  //         .values({ email: opts.input.email, password: opts.input.password });
  //     }
  //   ),
  getUser: publicProcedure
    .input(z.string())
    .query(async (opts: { input: string }) => {
      return await db.select().from(users).where(eq(users.email, opts.input));
    }),
  getFavs: publicProcedure
    .input(z.string())
    .query(async (opts: { input: string }) => {
      return await db
        .select()
        .from(favCards)
        .where(eq(favCards.userId, opts.input));
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
        input: {
          id: string;
          imageUrl: string;
          userId: string;
        };
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
            eq(favCards.userId, opts.input.userId),
            eq(favCards.imageUrl, opts.input.imageUrl)
          )
        );
    }),
});

export type PostRouter = typeof postRouter;

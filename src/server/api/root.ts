import { z } from "zod";
import { postRouter } from "./routers/posts";
import { createTRPCRouter, createCallerFactory, publicProcedure } from "./trpc";
export const appRouter = createTRPCRouter({
  post: postRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

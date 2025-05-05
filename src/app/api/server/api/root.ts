import { postRouter } from "./routers/posts";
import { createTRPCRouter } from "./trpc";
import { createCallerFactory } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

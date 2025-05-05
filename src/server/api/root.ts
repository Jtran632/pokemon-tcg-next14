import { postRouter } from "./routers/posts";
import { createTRPCRouter } from "../api/trpc";
import { createCallerFactory } from "../../server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server/api/routers/posts";

export const trpc = createTRPCReact<AppRouter>({});

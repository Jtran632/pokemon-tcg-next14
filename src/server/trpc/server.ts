import "server-only"; // <-- ensure this file cannot be imported from the client
// import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
// import { createTRPCContext } from "@/server/api/trpc";
import { makeQueryClient } from "@/app/_trpc/query-client";
import { postRouter } from "../api/routers/posts";
// import { createTRPCClient, httpLink } from "@trpc/client";
// import SuperJSON from "superjson";
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
// const createContext = async () => {
//   const headers = new Headers(); // Replace with the actual headers
//   return createTRPCContext({ headers });
// };

import { createCaller } from "../api/root";
import { db } from "..";
// import type { AppRouter } from "../api/routers/posts";
// export const trpc = createTRPCOptionsProxy<AppRouter>({
//   ctx: createContext,
//   router: postRouter,
//   queryClient: getQueryClient,
//   client: createTRPCClient<AppRouter>({
//     links: [
//       httpLink({
//         url: "http://localhost:3000/api/trpc",
//         transformer: SuperJSON,
//       }),
//     ],
//   }),
// });
const context = {
  router: postRouter,
  session: null,
  headers: new Headers(),
  req: null,
  db: db,
};
//when creating a caller send down context instead of appRouter/postRouter so that typing won't be an issuea
export const caller = createCaller(context);

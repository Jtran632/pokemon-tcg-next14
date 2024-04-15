import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "../api/root";
import { createTRPCContext } from "../api/trpc";

export const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});
// @ts-ignore
export const api = createCaller(createContext);

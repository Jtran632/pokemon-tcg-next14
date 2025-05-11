"use server";

import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "../api/root";
import { createTRPCContext } from "../api/trpc";

export const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");
  return createTRPCContext({
    headers: heads,
  });
});
// @ts-ignore
export const api = createCaller(createContext);

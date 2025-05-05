import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "../api/root";
import { createTRPCContext } from "../api/trpc";

export const createContext = cache(async () => {
  const heads = await headers();
  const headerInstance = new Headers(heads);
  headerInstance.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: headerInstance,
  });
});

export const api = createCaller(createContext);

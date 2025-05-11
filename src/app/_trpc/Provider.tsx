"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./client";
import { absoluteUrl } from "@/lib/utils";
import SuperJSON from "superjson";
let token: string = "";
export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        loggerLink(),
        httpBatchLink({
          url: absoluteUrl(),
          headers() {
            return {
              Authorization: token,
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_httpBatchStreamLink, loggerLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./client";
import { absoluteUrl } from "@/lib/utils";
import SuperJSON from "superjson";
let token: string;
export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        unstable_httpBatchStreamLink({
          url: absoluteUrl(),
          headers() {
            return {
              Authorization: token,
            };
          },
        }),
      ],
      transformer: SuperJSON,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, loggerLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./client";
import { absoluteUrl } from "@/lib/utils";
import SuperJSON from "superjson";
export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        httpLink({
          url: absoluteUrl(),
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

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client"; // Updated import
import { useState } from "react";
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
        httpBatchLink({
          // Updated to use httpBatchLink
          url: absoluteUrl(),
          headers() {
            const token = localStorage.getItem("authToken");
            return {
              Authorization: token ? `Bearer ${token}` : "",
            };
          },
          transformer: SuperJSON,
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

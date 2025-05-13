"use client";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink, createTRPCClient } from "@trpc/client";
import { useState } from "react";
import SuperJSON from "superjson";
import type { AppRouter } from "@/server/api/routers/posts";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { makeQueryClient } from "./query-client";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let browserQueryClient: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: getUrl(),
        }),
      ],
    })
  );
  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {props.children}
    </TRPCProvider>
  );
}

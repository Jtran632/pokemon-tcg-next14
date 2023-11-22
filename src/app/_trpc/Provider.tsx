'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink, loggerLink } from "@trpc/client"
import React, { useState } from 'react'
import { trpc } from './client'

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                loggerLink(),
                httpBatchLink({
                    url: "/api/trpc",
                    // url: "https://pokemon-tcg-next13.vercel.app/api/trpc",
                    // url: "http://localhost:3000/api/trpc",
                })
            ]
        })
    )
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
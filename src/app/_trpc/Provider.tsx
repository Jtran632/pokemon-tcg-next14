'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpLink, loggerLink } from "@trpc/client"
import React, { useState } from 'react'
import { trpc } from './client'
import { absoluteUrl } from "@/lib/utils"
export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                loggerLink(),
                httpLink({
                    url: absoluteUrl("/api/trpc")
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
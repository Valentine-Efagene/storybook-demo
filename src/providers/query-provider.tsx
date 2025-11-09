'use client'

import { DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function QueryProvider({ children, dehydratedState }: { children: ReactNode, dehydratedState?: DehydratedState }) {
    // Placed in a state, because just using the query client directly, 
    // a new instance would be created on every render, which is bad. 
    // React Query's client must be singleton-like during a session.
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000, // 1 minute default
                gcTime: 5 * 60 * 1000, // 5 minutes garbage collection default
                refetchOnWindowFocus: false, // Don't refetch on window focus for better UX
                retry: (failureCount, error: any) => {
                    // Don't retry on 4xx errors
                    if (error?.status >= 400 && error?.status < 500) {
                        return false
                    }
                    return failureCount < 3
                },
            },
            mutations: {
                retry: 1, // Only retry mutations once on failure
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    )
}

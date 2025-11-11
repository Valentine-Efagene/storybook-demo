import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { ApiResponse } from "@/types/common"
import { fetchProperties } from "@/lib/api"
import { createPropertiesQueryKey } from "@/lib/query-keys"
import { PaginatedPropertyResponseBody, PropertyQueryParams } from "@/types/property"

/**
 * Custom hook for fetching users with pagination and filtering
 * 
 * This hook encapsulates the user fetching logic and can be reused
 * across components while maintaining consistent query keys and behavior.
 */
export function useProperties(initialParams: PropertyQueryParams) {
    const searchParams = useSearchParams()

    // Extract current params from URL or use initial values (ensure no undefined)
    const offset = searchParams.get("offset") ?? initialParams.offset ?? "0"
    const search = searchParams.get("search") ?? initialParams.search ?? null
    const from = searchParams.get("from") ?? initialParams.from ?? null
    const to = searchParams.get("to") ?? initialParams.to ?? null
    const limit = searchParams.get("limit") ?? initialParams.limit ?? "20"
    const status = searchParams.get("status") ?? initialParams.status ?? null

    // Consistent query key that matches server-side prefetch
    const queryKey = createPropertiesQueryKey(offset, search, from, limit, status, to)

    return useQuery<ApiResponse<PaginatedPropertyResponseBody>>({
        queryKey,
        queryFn: () => fetchProperties({
            offset,
            search,
            from,
            to,
            limit,
            status,
        }),
        staleTime: 5 * 60 * 1000, // 5 minutes - longer staleTime for better navigation experience
        gcTime: 10 * 60 * 1000,  // 10 minutes garbage collection - keep data longer in memory
    })
}
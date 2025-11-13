"use client"

import { useQuery } from "@tanstack/react-query"
import { ApiResponse } from "@/types/common"
import { fetchProperties } from "@/lib/api"
import { getPropertiesQueryKey } from "@/lib/query-keys"
import { PaginatedPropertyResponseBody, PropertyQueryParams } from "@/types/property"

/**
 * Custom hook for fetching properties with pagination and filtering
 * 
 * This hook encapsulates the property fetching logic and can be reused
 * across components while maintaining consistent query keys and behavior.
 */
export function useProperties(currentParams: PropertyQueryParams) {
    // Use the passed currentParams directly instead of extracting from URL again
    const queryKey = getPropertiesQueryKey(currentParams)

    return useQuery<ApiResponse<PaginatedPropertyResponseBody>>({
        queryKey,
        queryFn: () => fetchProperties({
            offset: currentParams.offset,
            search: currentParams.search,
            from: currentParams.from,
            to: currentParams.to,
            limit: currentParams.limit,
            status: currentParams.status,
        }),
        staleTime: 5 * 60 * 1000, // 5 minutes - longer staleTime for better navigation experience
        gcTime: 10 * 60 * 1000,  // 10 minutes garbage collection - keep data longer in memory
    })
}
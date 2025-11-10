import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { ApiResponse } from "@/types/common"
import { PaginatedUserResponseBody, UserQueryParams } from "@/types/user"
import { fetchUsers } from "@/lib/api"
import { createUsersQueryKey } from "@/lib/query-keys"

/**
 * Custom hook for fetching users with pagination and filtering
 * 
 * This hook encapsulates the user fetching logic and can be reused
 * across components while maintaining consistent query keys and behavior.
 */
export function useUsers(initialParams: UserQueryParams) {
    const searchParams = useSearchParams()

    // Extract current params from URL or use initial values (ensure no undefined)
    const offset = searchParams.get("offset") ?? initialParams.offset ?? "0"
    const search = searchParams.get("search") ?? initialParams.search ?? null
    const from = searchParams.get("from") ?? initialParams.from ?? null
    const to = searchParams.get("to") ?? initialParams.to ?? null
    const limit = searchParams.get("limit") ?? initialParams.limit ?? "20"

    // Consistent query key that matches server-side prefetch
    const queryKey = createUsersQueryKey(offset, search, from, limit)

    return useQuery<ApiResponse<PaginatedUserResponseBody>>({
        queryKey,
        queryFn: () => fetchUsers({
            offset,
            search,
            from,
            to,
            limit,
        }),
        staleTime: 2 * 60 * 1000, // 2 minutes for user data
        gcTime: 5 * 60 * 1000,   // 5 minutes garbage collection
    })
}
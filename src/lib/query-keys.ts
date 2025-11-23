import { PropertyQueryParams, PropertyStatus } from "@/types/property"
import { QUERY_KEYS, UserQueryParams } from "@/types/user"

/**
 * Pure utility functions for generating query keys
 * These can be used in both server and client components
 */

/**
 * Generate query key for users list
 * Used for both server-side prefetching and client-side queries
 */
export function getUsersQueryKey(params: UserQueryParams) {
    return [
        QUERY_KEYS.USERS,
        params.offset,
        params.search,
        params.from,
        params.limit,
        params.contributionStatus,
        params.to
    ]
}

/**
 * Generate query key with current URL parameters
 * Used when you have individual parameter values
 */
export function createUsersQueryKey(
    offset: string | null,
    search: string | null,
    from: string | null,
    limit: string | null,
    contributionStatus: string | null,
    to: string | null
) {
    return [
        QUERY_KEYS.USERS,
        offset,
        search,
        from,
        limit,
        contributionStatus,
        to
    ]
}

export function getPropertiesQueryKey(params: PropertyQueryParams) {
    return [
        QUERY_KEYS.PROPERTIES,
        params.offset,
        params.search,
        params.from,
        params.limit,
        params.to,
        params.status
    ]
}

export function createPropertiesQueryKey({
    offset,
    search,
    from,
    limit,
    to,
    status
}: {
    offset: string | null,
    search: string | null,
    from: string | null,
    limit: string | null,
    to: string | null,
    status: PropertyStatus | null
}) {
    return [
        QUERY_KEYS.PROPERTIES,
        offset,
        search,
        from,
        limit,
        to,
        status,
    ]
}

/**
 * Generate query key for plans
 * Plans are static data that rarely changes
 */
export function getPlansQueryKey() {
    return [QUERY_KEYS.PLANS] as const
}
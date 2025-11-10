"use client"

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS, TokenMetadata, User } from '@/types/user'
import { getCurrentUserFromSession } from '@/actions/user-session'

// Client-side function to get user data from local storage or other client-side storage
function getClientUserData(): {
    name?: string
    email?: string
    avatar?: string
    initials?: string
    firstName?: string
    lastName?: string
} | null {
    if (typeof window === 'undefined') return null

    try {
        const userData = localStorage.getItem('currentUser')
        return userData ? JSON.parse(userData) : null
    } catch {
        return null
    }
}

export interface UseGetCurrentUserFromSessionOptions {
    /**
     * Enable the query. Set to false to disable automatic fetching
     */
    enabled?: boolean

    /**
     * How often to refetch user data (in milliseconds)
     * Default: 5 minutes
     */
    refetchInterval?: number

    /**
     * Return format for the user data
     * - 'display': Returns simplified user object for UI components (default)
     * - 'full': Returns complete User object for authorization
     */
    format?: 'display' | 'full'
}

/**
 * Hook to get current user session data
 * 
 * This hook fetches the current user's information from their session
 * by extracting the user ID from the JWT token and calling fetchUserById.
 * 
 * @param options Configuration options for the hook
 * @returns React Query result with user data
 * 
 * @example
 * ```tsx
 * // For UI components (default)
 * function UserProfile() {
 *   const { data: user, isLoading, error } = useGetCurrentUserFromSession()
 *   
 *   if (isLoading) return <div>Loading...</div>
 *   if (error) return <div>Error loading user</div>
 *   if (!user) return <div>Not logged in</div>
 *   
 *   return <ProfileDropdown user={user} />
 * }
 * 
 * // For authorization (full user object)
 * function useAuth() {
 *   const { data: user } = useGetCurrentUserFromSession({ format: 'full' })
 *   return { user, isAdmin: user?.roles.includes('admin') }
 * }
 * ```
 */
export function useGetCurrentUserFromSession<T extends 'display' | 'full' = 'display'>(
    options: UseGetCurrentUserFromSessionOptions & { format?: T } = {} as any
) {
    const {
        enabled = true,
        refetchInterval = 5 * 60 * 1000, // 5 minutes
        format = 'display' as T
    } = options

    type ReturnType = T extends 'full' ? User | null : {
        name?: string
        email?: string
        avatar?: string
        initials?: string
        firstName?: string
        lastName?: string
    } | null

    return useQuery<ReturnType>({
        queryKey: [QUERY_KEYS.USER, 'session', format],
        queryFn: async (): Promise<ReturnType> => {
            // Try client-side data first for immediate UI response
            const clientData = getClientUserData()

            try {
                // Fetch user data from session/API
                const { displayUser, fullUser } = await getCurrentUserFromSession()

                // Update client-side storage if we got fresh data
                if (displayUser && typeof window !== 'undefined') {
                    localStorage.setItem('currentUser', JSON.stringify(displayUser))
                }

                // Return based on requested format
                const sessionUser = format === 'full' ? fullUser : displayUser
                return (sessionUser || (format === 'display' ? clientData : null)) as ReturnType
            } catch (error) {
                console.error('Error fetching user from session:', error)
                // Fallback to client data if server call fails
                return (format === 'display' ? clientData : null) as ReturnType
            }
        },
        enabled,
        staleTime: refetchInterval / 2, // Consider data fresh for half the refetch interval
        gcTime: refetchInterval * 2, // Keep in cache for twice the refetch interval
        refetchInterval: refetchInterval,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
            // Don't retry on authentication errors
            if (error?.message?.includes('authentication') ||
                error?.message?.includes('401')) {
                return false
            }
            // Retry up to 2 times for other errors
            return failureCount < 2
        },
        meta: {
            errorMessage: 'Failed to load user session data'
        }
    })
}

/**
 * Hook specifically for getting full user object (for authorization)
 */
export function useGetFullUserFromSession(options: Omit<UseGetCurrentUserFromSessionOptions, 'format'> = {}) {
    return useGetCurrentUserFromSession({ ...options, format: 'full' })
}

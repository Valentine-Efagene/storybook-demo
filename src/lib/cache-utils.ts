import { revalidatePath } from 'next/cache'

/**
 * Utility functions for managing server-side cache invalidation
 * Note: Using revalidatePath as revalidateTag API has changed in Next.js 16
 */

/**
 * Invalidate properties page cache
 */
export async function invalidatePropertiesCache() {
    try {
        revalidatePath('/properties')
    } catch (error) {
        console.warn('Cache invalidation failed:', error)
    }
}

/**
 * Invalidate specific properties query cache
 */
export async function invalidatePropertiesQuery(params: any) {
    try {
        // Invalidate the properties page which will refresh all queries
        revalidatePath('/properties')
    } catch (error) {
        console.warn('Cache invalidation failed:', error)
    }
}

/**
 * Invalidate all API cache by revalidating layout
 */
export async function invalidateAllApiCache() {
    try {
        revalidatePath('/', 'layout')
    } catch (error) {
        console.warn('Cache invalidation failed:', error)
    }
}

/**
 * Invalidate user-related cache
 */
export async function invalidateUserCache() {
    try {
        revalidatePath('/users')
    } catch (error) {
        console.warn('Cache invalidation failed:', error)
    }
}

/**
 * Invalidate user profile cache  
 */
export async function invalidateUserProfileCache() {
    try {
        revalidatePath('/profile')
        // Also invalidate any pages that might show user profile info
        revalidatePath('/settings')
        revalidatePath('/account')
    } catch (error) {
        console.warn('Cache invalidation failed:', error)
    }
}

/**
 * Invalidate user orders cache
 */
export async function invalidateUserOrdersCache() {
    try {
        revalidatePath('/orders')
    } catch (error) {
        console.warn('Cache invalidation failed:', error)
    }
}

/**
 * Invalidate user tickets cache
 */
export async function invalidateUserTicketsCache() {
    try {
        revalidatePath('/tickets')
    } catch (error) {
        console.warn('Cache invalidation failed:', error)
    }
}
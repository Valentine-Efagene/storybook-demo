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
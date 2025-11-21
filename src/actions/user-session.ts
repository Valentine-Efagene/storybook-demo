"use server"

import { cookies } from 'next/headers'
import * as jose from 'jose'
import { fetchCurrentUser, fetchUserById } from '@/lib/api'
import { User } from '@/types/user'

// Server action to get current user from session
export async function getCurrentUserFromSession(): Promise<{
    displayUser: {
        name?: string
        email?: string
        avatar?: string
        initials?: string
    } | null
    fullUser: User | null
}> {
    try {
        // Get the access token from cookies
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value


        if (!accessToken) {
            return { displayUser: null, fullUser: null }
        }

        // Decode JWT to get user ID
        const payload = jose.decodeJwt(accessToken)
        const userId = payload.sub || payload.user_id || payload.id

        if (!userId) {
            console.error('No user ID found in JWT payload')
            return { displayUser: null, fullUser: null }
        }

        // Convert userId to number if it's a string
        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId as number

        if (isNaN(userIdNumber)) {
            console.error('Invalid user ID in JWT payload:', userId)
            return { displayUser: null, fullUser: null }
        }

        // Fetch user by ID using the existing API function
        const response = await fetchCurrentUser()

        if (response.status !== 200 || !response.body) {
            console.error('Failed to fetch user by ID:', response.statusCode)
            return { displayUser: null, fullUser: null }
        }

        const { user } = response.body
        // Transform User type to component-compatible format for ProfileDropdown
        const name = user.first_name && user.last_name ?
            `${user.first_name} ${user.last_name}`.trim() :
            user.first_name || user.last_name || undefined

        const initials = name ?
            name.split(' ')
                .map(part => part.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2)
            : undefined

        const displayUser = {
            name,
            email: user.email || undefined,
            avatar: user.avatar || undefined,
            initials
        }

        return {
            displayUser,
            fullUser: user
        }
    } catch (error) {
        console.error('Error fetching current user from session:', error)
        return { displayUser: null, fullUser: null }
    }
}

// Server action to get just the user ID from the session
export async function getCurrentUserIdFromSession(): Promise<number | null> {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value

        if (!accessToken) {
            return null
        }

        // Decode JWT to get user ID
        const payload = jose.decodeJwt(accessToken)
        const userId = payload.sub || payload.user_id || payload.id

        if (!userId) {
            return null
        }

        // Convert userId to number if it's a string
        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId as number

        return isNaN(userIdNumber) ? null : userIdNumber
    } catch (error) {
        console.error('Error getting user ID from session:', error)
        return null
    }
} 
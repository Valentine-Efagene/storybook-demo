"use server"

/**
 * Secure API Client - Server Actions Only
 * All API calls go through server actions, tokens never touch client
 */

import { ApiResponse } from "@/types/common"
import { cookies } from "next/headers"
import { QueryHelper } from "./helpers/QueryHelper"
import { PaginatedUserResponseBody, TokenMetadata, User } from "@/types/user"
import EnvironmentHelper from "./helpers/EnvironmentHelper"
import * as jose from "jose";
import { PaginatedPropertyResponseBody } from "@/types/property"

async function getServerToken(): Promise<string | null> {
    const cookieStore = await cookies()
    return cookieStore.get('accessToken')?.value ?? null
}

// Server action for making authenticated API calls
export async function authenticatedFetch<T>(
    endpoint: string,
    params: Record<string, string> = {},
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const accessToken = await getServerToken()

    if (!accessToken) {
        throw new Error('No authentication token available')
    }

    const parsed: TokenMetadata = jose.decodeJwt(accessToken);

    if (!accessToken) {
        throw new Error('No authentication token available')
    }

    const url = QueryHelper.buildQueryUrl(endpoint, {
        user_id: parsed.user_id?.toString() ?? '',
        ...params,
    })

    console.log({ url })
    const response = await fetch(`${EnvironmentHelper.API_BASE_URL}${url}`, {
        ...options,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
            'user_id': parsed.user_id?.toString() ?? '',
        },
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    const data: ApiResponse<T> = await response.json()
    return data
}

// Server action for file uploads
export async function authenticatedUpload(
    endpoint: string,
    formData: FormData
): Promise<ApiResponse<any>> {
    const accessToken = await getServerToken()

    if (!accessToken) {
        throw new Error('No authentication token available')
    }

    const response = await fetch(`${EnvironmentHelper.API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    })

    if (!response.ok) {
        throw new Error(`Upload Error: ${response.status}`)
    }

    return response.json()
}

// Example server actions for common operations
export async function fetchUserProfile() {
    return authenticatedFetch<any>('/profile')
}

export async function updateUserProfile(data: FormData) {
    return authenticatedUpload('/auth/profile', data)
}

export async function fetchUserTickets(page: number = 1) {
    return authenticatedFetch<any>(`/tickets?page=${page}`)
}

export async function fetchEvents(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return authenticatedFetch<any>(`/events${queryString ? `?${queryString}` : ''}`)
}

export async function fetchUserOrders(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return authenticatedFetch<any>(`/orders${queryString ? `?${queryString}` : ''}`)
}

// Admin Dashboard Server Actions
export async function fetchUsers(params: any = {}) {
    const baseUrl = '/onboarding/filter-users'
    const data = await authenticatedFetch<PaginatedUserResponseBody>(baseUrl, params)
    return data
}

export async function fetchProperties(params: any = {}) {
    const baseUrl = '/propy/filter-properties'
    const data = await authenticatedFetch<PaginatedPropertyResponseBody>(baseUrl, params)
    return data
}

export async function fetchUserById(userId: number) {
    const baseUrl = '/onboarding/get-user'
    return authenticatedFetch<{ user: User }>(baseUrl, { id: userId.toString() })
}
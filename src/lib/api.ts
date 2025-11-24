"use server"

/**
 * Secure API Client - Server Actions Only
 * All API calls go through server actions, tokens never touch client
 */

import { ApiResponse, PresignedPost } from "@/types/common"
import { cookies } from "next/headers"
import { QueryHelper } from "./helpers/QueryHelper"
import { PaginatedUserResponseBody, TokenMetadata, User } from "@/types/user"
import EnvironmentHelper from "./helpers/EnvironmentHelper"
import * as jose from "jose";
import { PaginatedPropertyResponseBody, Plan, Property } from "@/types/property"

async function getServerToken(): Promise<string | null> {
    const cookieStore = await cookies()
    return cookieStore.get('accessToken')?.value ?? null
}

// Server action for making authenticated API calls
export async function authenticatedFetch<T>(
    endpoint: string,
    params: Record<string, string> = {},
    options: RequestInit = {},
    cacheOptions?: { revalidate?: number }
): Promise<ApiResponse<T>> {
    const accessToken = await getServerToken()

    if (!accessToken) {
        throw new Error('No authentication token available')
    }

    // const parsed: TokenMetadata = jose.decodeJwt(accessToken);

    if (!accessToken) {
        throw new Error('No authentication token available')
    }

    const url = QueryHelper.buildQueryUrl(endpoint, {
        // user_id: parsed.user_id?.toString() ?? '',
        ...params,
    })

    const finalUrl = `${EnvironmentHelper.API_BASE_URL}${url}`

    const response = await fetch(finalUrl, {
        ...options,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
            // 'user_id': parsed.user_id?.toString() ?? '',
        },
        next: {
            revalidate: cacheOptions?.revalidate ?? 60 // Default 60 seconds cache
        }
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    const data: ApiResponse<T> = await response.json()
    return data
}

export async function getPresignedPost(key: string) {
    const endpoint = `${EnvironmentHelper.API_BASE_URL}/uploader/document/create-presigned-post`
    const accessToken = await getServerToken()

    if (!accessToken) {
        throw new Error('No authentication token available')
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ key }),
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    const data: ApiResponse<PresignedPost> = await response.json()
    return data
}

export async function uploadToS3(
    file: Blob,
    presignedPost: PresignedPost
) {
    const formData = new FormData()

    // S3 requires fields in specific order - add them in the order AWS expects
    // Policy and signature-related fields should come before the file
    const orderedFields: (keyof PresignedPost['fields'])[] = [
        'X-Amz-Algorithm',
        'X-Amz-Credential',
        'X-Amz-Date',
        'Policy',
        'X-Amz-Signature',
        'key',
        'Content-Type'
    ]

    // Append fields in correct order
    orderedFields.forEach(fieldName => {
        if (presignedPost.fields[fieldName]) {
            formData.append(fieldName, presignedPost.fields[fieldName])
        }
    })

    // Append any remaining fields not in the ordered list
    for (const [key, value] of Object.entries(presignedPost.fields)) {
        if (!orderedFields.includes(key as keyof PresignedPost['fields'])) {
            formData.append(key, value)
        }
    }

    // Append the file LAST - this is critical for S3
    formData.append('file', file)

    const response = await fetch(presignedPost.url, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Upload Error ${response.status}: ${errorText}`)
    }

    // Construct the full S3 URL correctly
    const uploadedUrl = presignedPost.url.endsWith('/')
        ? presignedPost.url + presignedPost.fields.key
        : presignedPost.url + '/' + presignedPost.fields.key

    return uploadedUrl
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
    return authenticatedFetch<any>('/profile', {}, {}, {
        revalidate: 300 // Cache user profile for 5 minutes
    })
}

export async function updateUserProfile(data: FormData) {
    return authenticatedUpload('/auth/profile', data)
}

export async function fetchPlans() {
    return authenticatedFetch<{ plans: Plan[] }>(`/property/plans`, {}, {}, {
        revalidate: 120 // Cache user plans for 2 minutes
    })
}

export async function fetchEvents(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return authenticatedFetch<any>(`/events${queryString ? `?${queryString}` : ''}`, {}, {}, {
        revalidate: 240 // Cache events for 4 minutes
    })
}

export async function fetchUserOrders(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return authenticatedFetch<any>(`/orders${queryString ? `?${queryString}` : ''}`, {}, {}, {
        revalidate: 180 // Cache user orders for 3 minutes
    })
}

// Admin Dashboard Server Actions
export async function fetchUsers(params: any = {}) {
    const baseUrl = '/onboarding/filter-users'
    const data = await authenticatedFetch<PaginatedUserResponseBody>(
        baseUrl,
        params,
        {},
        {
            revalidate: 180 // Cache for 3 minutes since user data changes moderately
        }
    )
    return data
}

export async function fetchPropertyById(id: string) {
    const baseUrl = `/property/${id}`
    const params = { id }
    const data = await authenticatedFetch<{ property: Property }>(
        baseUrl,
        params,
        {},
        {
            revalidate: 300 // Cache for 5 minutes since properties change less frequently
        }
    )
    return data
}

export async function fetchProperties(params: any = {}) {
    const baseUrl = '/property/'
    const data = await authenticatedFetch<PaginatedPropertyResponseBody>(
        baseUrl,
        params,
        {},
        {
            revalidate: 300 // Cache for 5 minutes since properties change less frequently
        }
    )
    return data
}

export async function fetchUserById(userId: number) {
    const baseUrl = '/onboarding/get-user'
    return authenticatedFetch<{ user: User }>(baseUrl, { id: userId.toString() }, {}, {
        revalidate: 600 // Cache individual user data for 10 minutes (changes rarely)
    })
}

export async function fetchCurrentUser() {
    const baseUrl = '/auth/me'
    return authenticatedFetch<{ user: User }>(baseUrl, {}, {}, {
        revalidate: 600 // Cache individual user data for 10 minutes (changes rarely)
    })
}
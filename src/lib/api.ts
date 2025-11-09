"use server"

/**
 * Secure API Client - Server Actions Only
 * All API calls go through server actions, tokens never touch client
 */

import { ApiResponse } from "@/types/common"
import { cookies } from "next/headers"

async function getServerToken(): Promise<string | null> {
    const cookieStore = await cookies()
    return cookieStore.get('accessToken')?.value ?? null
}

// Server action for making authenticated API calls
export async function authenticatedFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const accessToken = await getServerToken()

    if (!accessToken) {
        throw new Error('No authentication token available')
    }

    const response = await fetch(`${process.env.VITE_API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
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

    const response = await fetch(`${process.env.VITE_API_BASE_URL}${endpoint}`, {
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
    return authenticatedFetch<any>('/auth/profile')
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
    const queryString = new URLSearchParams(params).toString()
    return authenticatedFetch<any>(`/users${queryString ? `?${queryString}` : ''}`)
}

export async function fetchUserById(userId: number) {
    return authenticatedFetch<any>(`/users/${userId}`)
}

export async function fetchRoles() {
    return authenticatedFetch<any>('/roles')
}

// Staff Dashboard Server Actions  
export async function fetchTicketCategories(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return authenticatedFetch<any>(`/ticket-categories${queryString ? `?${queryString}` : ''}`)
}

export async function deleteTicketCategory(id: number) {
    return authenticatedFetch<any>(`/ticket-categories/${id}`, { method: 'DELETE' })
}

export async function deleteEventMedia(id: number) {
    return authenticatedFetch<any>(`/events/media/${id}`, { method: 'DELETE' })
}

export async function setEventDisplayImage(eventId: number, mediaId: number) {
    return authenticatedFetch<any>(`/events/${eventId}/display-image`, {
        method: 'POST',
        body: JSON.stringify({ mediaId }),
    })
}

export async function updateEventStatus(eventId: number, status: string) {
    return authenticatedFetch<any>(`/events/${eventId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    })
}

export async function fetchOwnTickets(params: any = {}) {
    const queryString = new URLSearchParams(params).toString()
    return authenticatedFetch<any>(`/tickets${queryString ? `?${queryString}` : ''}`)
}

export async function reassignTicket(ticketId: number, data: any) {
    return authenticatedFetch<any>(`/tickets/${ticketId}/reassign`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}
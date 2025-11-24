"use client"

import { ApiResponse } from "@/types/common"
import { toast } from "sonner"

interface TokenRefreshResponse {
    success: boolean
    accessToken?: string
    refreshToken?: string
    error?: string
}

interface TokenInfo {
    isExpired: boolean
    timeUntilExpiry: number
    shouldRefresh: boolean
}

class ClientTokenManager {
    private refreshPromise: Promise<TokenRefreshResponse> | null = null
    private statusCheckInterval: NodeJS.Timeout | null = null
    private refreshInterval: NodeJS.Timeout | null = null
    private readonly STATUS_CHECK_INTERVAL = 30 * 1000 // Check status every 30 seconds
    private readonly REFRESH_INTERVAL = 20 * 60 * 1000 // Refresh every 20 minutes
    private tokenInfo: TokenInfo = { isExpired: false, timeUntilExpiry: 0, shouldRefresh: false }
    private callbacks: Set<() => void> = new Set()
    private hasShownExpiredToast = false

    constructor() {
        this.startTokenManagement()
    }

    private isPublicRoute(): boolean {
        if (typeof window === 'undefined') return false

        const publicRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password']
        return publicRoutes.some(route => window.location.pathname === route)
    }

    private startTokenManagement() {
        // Only run in browser and not on public routes
        if (typeof window === 'undefined' || this.isPublicRoute()) return

        // Initial status check
        this.checkTokenStatus()

        // Regular status checks to detect expiry
        this.statusCheckInterval = setInterval(() => {
            // Skip checks if we're now on a public route
            if (this.isPublicRoute()) return
            this.checkTokenStatus()
        }, this.STATUS_CHECK_INTERVAL)

        // Proactive token refresh every 20 minutes
        this.refreshInterval = setInterval(() => {
            // Skip refresh if we're now on a public route
            if (this.isPublicRoute()) return
            this.performProactiveRefresh()
        }, this.REFRESH_INTERVAL)
    }

    private async checkTokenStatus() {
        // Don't check token status on public routes
        if (this.isPublicRoute()) return

        try {
            // Get token info from server endpoint
            const tokenInfo = await this.getTokenInfoFromServer()

            this.tokenInfo = tokenInfo
            this.notifyCallbacks()

            // If token is expired, logout with toast
            if (tokenInfo.isExpired && !this.hasShownExpiredToast) {
                this.handleTokenExpiry()
                return
            }

            // Reset toast flag if token is valid again
            if (!tokenInfo.isExpired) {
                this.hasShownExpiredToast = false
            }

        } catch (error) {
            console.error('Token status check failed:', error)
        }
    }

    private async performProactiveRefresh() {
        // Don't refresh on public routes
        if (this.isPublicRoute()) return

        try {
            console.log('Performing scheduled token refresh...')
            const result = await this.refreshToken()

            if (result.success) {
                console.log('Scheduled token refresh successful')
                // Show success toast (only in development)
                if (process.env.NODE_ENV === 'development') {
                    toast.success("Token refreshed successfully", {
                        duration: 2000,
                        position: "bottom-right",
                    })
                }
                // Update status after successful refresh
                await this.checkTokenStatus()
            } else {
                console.error('Scheduled token refresh failed:', result.error)
                // Show error toast for failed refresh
                toast.error("Failed to refresh session", {
                    duration: 3000,
                    position: "top-right",
                })
            }
        } catch (error) {
            console.error('Scheduled token refresh error:', error)
            toast.error("Session refresh error", {
                duration: 3000,
                position: "top-right",
            })
        }
    }

    private handleTokenExpiry() {
        this.hasShownExpiredToast = true

        // Show toast notification using shadcn toast
        toast.error("Session expired. Redirecting to login...", {
            duration: 2000,
            position: "top-right",
        })

        // Redirect to signin after a short delay to allow toast to be seen
        setTimeout(() => {
            window.location.href = '/signin'
        }, 2000)
    }

    private async getTokenInfoFromServer(): Promise<TokenInfo> {
        try {
            // Call Next.js API route which has access to HttpOnly cookies
            const response = await fetch('/api/auth/status', {
                method: 'GET',
                credentials: 'include', // Send HttpOnly cookies to our own API route
            })

            if (!response.ok) {
                return { isExpired: true, timeUntilExpiry: 0, shouldRefresh: false }
            }

            const data = await response.json()
            return data
        } catch (error) {
            return { isExpired: true, timeUntilExpiry: 0, shouldRefresh: false }
        }
    }

    private async refreshToken(): Promise<TokenRefreshResponse> {
        // Prevent multiple simultaneous refresh attempts
        if (this.refreshPromise) {
            return this.refreshPromise
        }

        this.refreshPromise = this.performTokenRefresh()

        try {
            return await this.refreshPromise
        } finally {
            this.refreshPromise = null
        }
    }

    private async performTokenRefresh(): Promise<TokenRefreshResponse> {
        try {
            // Call Next.js API route which handles token refresh server-side
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include', // Send HttpOnly cookies to our own API route
            })

            if (!response.ok) {
                if (response.status === 401) {
                    // Refresh token is invalid/expired
                    this.handleTokenExpiry()
                    return { success: false, error: 'Refresh token expired' }
                }
                throw new Error('Token refresh failed')
            }

            const data: ApiResponse<{ token: string }> = await response.json()

            console.log('Token refreshed successfully')

            // Update token info after successful refresh
            await this.checkTokenStatus()

            return {
                success: true,
                accessToken: data.body.token,
                refreshToken: data.body.token
            }
        } catch (error) {
            console.error('Token refresh error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    }

    private notifyCallbacks() {
        this.callbacks.forEach(callback => {
            try {
                callback()
            } catch (error) {
                console.error('Error in token status callback:', error)
            }
        })
    }

    public subscribe(callback: () => void) {
        this.callbacks.add(callback)
        return () => this.callbacks.delete(callback)
    }

    public async forceRefresh(): Promise<TokenRefreshResponse> {
        return this.refreshToken()
    }

    public isTokenExpired(): boolean {
        return this.tokenInfo.isExpired
    }

    public getTokenTimeUntilExpiry(): number {
        return this.tokenInfo.timeUntilExpiry
    }

    public cleanup() {
        if (this.statusCheckInterval) {
            clearInterval(this.statusCheckInterval)
            this.statusCheckInterval = null
        }

        if (this.refreshInterval) {
            clearInterval(this.refreshInterval)
            this.refreshInterval = null
        }

        this.callbacks.clear()
        this.hasShownExpiredToast = false
    }

    public stopTokenManagement() {
        this.cleanup()
    }

    public restartTokenManagement() {
        this.cleanup()
        this.startTokenManagement()
    }
}

// Singleton instance
let tokenManager: ClientTokenManager | null = null

export function getTokenManager(): ClientTokenManager {
    if (typeof window === 'undefined') {
        // Return a no-op manager for SSR
        return {
            forceRefresh: () => Promise.resolve({ success: false }),
            isTokenExpired: () => false,
            getTokenTimeUntilExpiry: () => 0,
            subscribe: () => () => { },
            cleanup: () => { },
            stopTokenManagement: () => { },
            restartTokenManagement: () => { }
        } as any
    }

    if (!tokenManager) {
        tokenManager = new ClientTokenManager()
    }

    return tokenManager
}

// Hook for React components
export function useTokenManager() {
    return getTokenManager()
}

// Cleanup function for app unmount
export function cleanupTokenManager() {
    if (tokenManager) {
        tokenManager.cleanup()
        tokenManager = null
    }
}

// Logout function that cleans up token manager
export async function logoutUser() {
    try {
        // Stop token management immediately
        if (tokenManager) {
            tokenManager.stopTokenManagement()
        }

        // Call logout API route
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Send HttpOnly cookies to our own API route
        })

        // Clean up token manager
        cleanupTokenManager()

        // Redirect to signin
        window.location.href = '/signin'
    } catch (error) {
        console.error('Logout error:', error)
        // Still redirect even if API call fails
        window.location.href = '/signin'
    }
}
"use client"

import { ApiResponse } from "@/types/common"
import { IAuthData } from "@/types/user"

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
    private checkInterval: NodeJS.Timeout | null = null
    private readonly CHECK_INTERVAL = 30 * 1000 // Check every 30 seconds
    private tokenInfo: TokenInfo = { isExpired: true, timeUntilExpiry: 0, shouldRefresh: false }
    private callbacks: Set<() => void> = new Set()

    constructor() {
        this.startTokenCheck()
    }

    private startTokenCheck() {
        // Only run in browser
        if (typeof window === 'undefined') return

        this.checkInterval = setInterval(() => {
            this.checkAndRefreshToken()
        }, this.CHECK_INTERVAL)

        // Initial check
        this.checkAndRefreshToken()
    }

    private async checkAndRefreshToken() {
        try {
            // Get token info from server endpoint (since we can't read HTTP-only cookies)
            const tokenInfo = await this.getTokenInfoFromServer()

            this.tokenInfo = tokenInfo
            this.notifyCallbacks()

            // If token should be refreshed, do it
            if (tokenInfo.shouldRefresh && !this.refreshPromise) {
                console.log('Token expiring soon, refreshing...')
                await this.refreshToken()
            }
        } catch (error) {
            console.error('Token check failed:', error)
            // On error, assume token is expired
            this.tokenInfo = { isExpired: true, timeUntilExpiry: 0, shouldRefresh: false }
            this.notifyCallbacks()
        }
    }

    private async getTokenInfoFromServer(): Promise<TokenInfo> {
        try {
            const response = await fetch('/api/auth/status', {
                method: 'GET',
                credentials: 'include',
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
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies
            })

            if (!response.ok) {
                if (response.status === 401) {
                    // Refresh token is invalid/expired, redirect to login
                    window.location.href = '/signin'
                    return { success: false, error: 'Refresh token expired' }
                }
                throw new Error('Token refresh failed')
            }

            const data = await response.json()

            console.log('Token refreshed successfully')

            // Update token info after successful refresh
            await this.checkAndRefreshToken()

            return {
                success: true,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }
        } catch (error) {
            console.error('Token refresh error:', error)

            // On refresh failure, redirect to login
            window.location.href = '/signin'

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
        if (this.checkInterval) {
            clearInterval(this.checkInterval)
            this.checkInterval = null
        }
        this.callbacks.clear()
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
            cleanup: () => { }
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
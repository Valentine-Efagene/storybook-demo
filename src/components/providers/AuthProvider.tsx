"use client"

import { useEffect } from 'react'
import { getTokenManager, cleanupTokenManager } from '@/lib/client-auth'

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    useEffect(() => {
        // Initialize token manager
        const tokenManager = getTokenManager()

        // Cleanup on unmount
        return () => {
            cleanupTokenManager()
        }
    }, [])

    return <>{children}</>
}
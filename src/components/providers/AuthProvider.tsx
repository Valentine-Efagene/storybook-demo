"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getTokenManager, cleanupTokenManager } from '@/lib/client-auth'

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const pathname = usePathname()

    useEffect(() => {
        // Initialize token manager
        const tokenManager = getTokenManager()

        // Cleanup on unmount
        return () => {
            cleanupTokenManager()
        }
    }, [])

    useEffect(() => {
        // Handle route changes
        const publicRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password']
        const isPublicRoute = publicRoutes.includes(pathname)
        
        const tokenManager = getTokenManager()
        
        if (isPublicRoute) {
            // Stop token management on public routes
            tokenManager.stopTokenManagement?.()
        } else {
            // Restart token management on protected routes
            tokenManager.restartTokenManagement?.()
        }
    }, [pathname])

    return <>{children}</>
}
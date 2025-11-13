"use client"

import { useEffect, useState } from 'react'
import { useTokenManager } from '@/lib/client-auth'
import { Badge } from '@/components/ui/badge'

export function TokenStatus() {
    const tokenManager = useTokenManager()
    const [timeUntilExpiry, setTimeUntilExpiry] = useState<number>(0)
    const [isExpired, setIsExpired] = useState<boolean>(false)

    useEffect(() => {
        const updateStatus = () => {
            setTimeUntilExpiry(tokenManager.getTokenTimeUntilExpiry())
            setIsExpired(tokenManager.isTokenExpired())
        }

        // Update immediately
        updateStatus()

        // Subscribe to token status changes
        const unsubscribe = tokenManager.subscribe(updateStatus)

        // Also update every second for real-time countdown
        const interval = setInterval(updateStatus, 1000)

        return () => {
            unsubscribe()
            clearInterval(interval)
        }
    }, [tokenManager])

    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
        return null
    }

    const formatTime = (seconds: number) => {
        if (seconds <= 0) return '0:00'
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const handleForceRefresh = async () => {
        try {
            await tokenManager.forceRefresh()
        } catch (error) {
            console.error('Manual refresh failed:', error)
        }
    }

    const getStatusVariant = () => {
        if (isExpired) return 'destructive'
        if (timeUntilExpiry <= 300) return 'secondary' // Warning if less than 5 minutes
        return 'default'
    }

    const getStatusText = () => {
        if (isExpired) return 'Expired'
        if (timeUntilExpiry <= 300) return 'Expiring Soon'
        return 'Valid'
    }

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-white border rounded-lg shadow-lg text-sm z-50 min-w-[200px]">
            <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-medium">Token Status:</span>
                <Badge variant={getStatusVariant()}>
                    {getStatusText()}
                </Badge>
            </div>

            <div className="text-gray-600 mb-3">
                {isExpired ? (
                    <span className="text-red-600">Token has expired</span>
                ) : (
                    <span>Expires in: <strong>{formatTime(timeUntilExpiry)}</strong></span>
                )}
            </div>

            <button
                onClick={handleForceRefresh}
                className="w-full px-3 py-1.5 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                disabled={isExpired}
            >
                {isExpired ? 'Expired' : 'Force Refresh'}
            </button>
        </div>
    )
}
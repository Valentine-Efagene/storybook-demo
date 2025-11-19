"use client"

import React from "react"
import { AbilityProvider } from "@/lib/ability/AbilityContext"
import { AuthProvider } from "@/components/providers/AuthProvider"
import { User } from "@/types/user"

interface ProvidersClientWrapperProps {
    user?: Pick<User, 'id' | 'roles'> | null
    children: React.ReactNode
}

export default function ProvidersClientWrapper({ user, children }: ProvidersClientWrapperProps) {
    const minimalUser = user ?? { id: 0, roles: [] }

    return (
        <AbilityProvider user={minimalUser}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AbilityProvider>
    )
}

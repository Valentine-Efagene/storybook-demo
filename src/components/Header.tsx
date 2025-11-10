"use client"

import { Breadcrumbs } from "./Breadcrumbs"
import { ProfileDropdown } from "./ProfileDropdown"
import { SidebarTrigger } from "./ui/sidebar"
import { useGetCurrentUserFromSession } from "@/hooks/useGetCurrentUserFromSession"
import { useMemo } from "react"

export function Header() {
    const { data: user, isLoading, error } = useGetCurrentUserFromSession()

    // Memoize the profile dropdown component to ensure consistent rendering
    // and avoid hydration mismatches
    const profileComponent = useMemo(() => {
        if (isLoading) {
            return <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
        }

        if (error) {
            // Fallback user data for error state
            return (
                <ProfileDropdown
                    user={{
                        name: "User",
                        email: "user@example.com",
                        initials: "U"
                    }}
                />
            )
        }

        // Normal state with actual user data
        return <ProfileDropdown user={user || undefined} />
    }, [user, isLoading, error])

    return (
        <header className="flex items-center justify-between px-4 py-4 border-b">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumbs />
            </div>
            {profileComponent}
        </header>
    )
}

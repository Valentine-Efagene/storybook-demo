"use client"

import { Breadcrumbs } from "./Breadcrumbs"
import { ProfileDropdown } from "./ProfileDropdown"
import { SidebarTrigger } from "./ui/sidebar"
import { useGetCurrentUserFromSession } from "@/hooks/useGetCurrentUserFromSession"

export function Header() {
    const { data: user, isLoading, error } = useGetCurrentUserFromSession()

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumbs />
            </div>

            {/* Show ProfileDropdown with loading and error states */}
            {isLoading ? (
                <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
            ) : error ? (
                <ProfileDropdown user={{
                    name: "User",
                    email: "user@example.com",
                    initials: "U"
                }} />
            ) : (
                <ProfileDropdown user={user || undefined} />
            )}
        </header>
    )
}

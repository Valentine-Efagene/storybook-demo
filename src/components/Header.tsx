"use client"

import { Breadcrumbs } from "./Breadcrumbs"
import { ProfileDropdown } from "./ProfileDropdown"
import { SidebarTrigger } from "./ui/sidebar"

export function Header() {
    // Mock user data - replace with actual user data from your auth system
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://github.com/shadcn.png", // Optional: remove for initials fallback
        initials: "JD"
    }

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumbs />
            </div>
            <ProfileDropdown user={user} />
        </header>
    )
}

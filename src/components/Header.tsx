"use client"

import { Breadcrumbs } from "./Breadcrumbs"
import { SidebarTrigger } from "./ui/sidebar"

export function Header() {
    return (
        <div className="flex items-center">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumbs />
            </div>
        </div>
    )
}

"use client"

import type { Route } from "next";
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

const tabs: {
    name: string;
    href: Route;
}[] = [
        { name: "Profile", href: "/settings" },
        { name: "Account", href: "/settings/plan-management" },
        { name: "Notifications", href: "/settings/legal-documents" },
    ]

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const segment = useSelectedLayoutSegment()

    return (
        <div>
            <div className="flex space-x-4 border-b mb-4 pt-4 px-4 sm:pl-[70px]">
                {tabs.map((tab) => {
                    const active =
                        (segment === null && tab.href === "/settings") ||
                        tab.href.endsWith(`/${segment}`)
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`pb-2 ${active
                                ? "border-b-2 border-primary-text text-primary-text font-sm"
                                : "text-secondary-text hover:text-gray-800"
                                }`}
                        >
                            {tab.name}
                        </Link>
                    )
                })}
            </div>

            <div className="px-[70px] py-6">{children}</div>
        </div>
    )
}

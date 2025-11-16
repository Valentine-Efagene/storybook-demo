"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import type { Route } from "next";

export default function PropertyTabsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { id } = useParams()
    const pathname = usePathname()

    const tabs: { name: string; href: Route }[] = [
        { name: "Subscribers", href: `/properties/${id}` as Route },
        { name: "Transactions", href: `/properties/${id}/transactions` as Route },
        { name: "Property Details", href: `/properties/${id}/property-details` as Route },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex space-x-4 border-b pt-4 px-4 sm:pl-8">
                {tabs.map((tab) => {
                    const active =
                        pathname == tab.href

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
                    );
                })}
            </div>

            <div className="p-8">
                {children}
            </div>
        </div>
    );
}

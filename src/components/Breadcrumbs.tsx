"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Breadcrumbs() {
    const pathname = usePathname()
    const pathnames = pathname.split("/").filter(Boolean)

    if (pathname.includes('signin')) {
        return null
    }

    if (pathname.length <= 1) {
        return null
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {pathnames.map((segment, index) => {
                    const to = "/" + pathnames.slice(0, index + 1).join("/")
                    const isLast = index === pathnames.length - 1

                    return (
                        <span key={to} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="capitalize">
                                        {segment.replace(/-/g, " ")}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={{ pathname: to }} className="capitalize">
                                            {segment.replace(/-/g, " ")}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </span>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb >
    )
}
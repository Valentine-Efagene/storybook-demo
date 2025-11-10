import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "lucide-react"

export function UsersTableSkeleton() {
    return (
        <div className="rounded-lg border">
            {/* Table Header */}
            <div className="border-b bg-muted/50">
                <div className="flex h-12 items-center px-4">
                    <div className="flex-1">
                        <Skeleton className="h-4 w-16" /> {/* "Name" header */}
                    </div>
                    <div className="flex-1">
                        <Skeleton className="h-4 w-32" /> {/* "Contribution Status" header */}
                    </div>
                    <div className="flex-1">
                        <Skeleton className="h-4 w-24" /> {/* "Date Joined" header */}
                    </div>
                </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex h-16 items-center px-4">
                        {/* User Info */}
                        <div className="flex flex-1 items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-32" /> {/* Name */}
                                <Skeleton className="h-3 w-48" /> {/* Email */}
                            </div>
                        </div>

                        {/* Contribution Status */}
                        <div className="flex-1">
                            <Skeleton className="h-6 w-20 rounded-full" /> {/* Status badge */}
                        </div>

                        {/* Date Joined */}
                        <div className="flex-1">
                            <Skeleton className="h-4 w-24" /> {/* Date */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function UsersPageSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-4 py-12 px-12">
            {/* Header with Search and Filters - Skeleton placeholders */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="w-lg">
                    {/* Search Input Skeleton */}
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="flex gap-4 items-center">
                    {/* Date Filter Button Skeleton */}
                    <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-8" />
                    </div>

                    {/* Status Filter Skeleton */}
                    <Skeleton className="h-10 w-48 rounded-md" />
                </div>
            </div>

            {/* Table Skeleton */}
            <div>
                <UsersTableSkeleton />
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" /> {/* "Show" text */}
                    <Skeleton className="h-9 w-20" /> {/* Page size select */}
                    <Skeleton className="h-4 w-32" /> {/* "entries" text */}
                </div>

                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32" /> {/* "Page X of Y" */}
                    <div className="flex gap-1">
                        <Skeleton className="h-9 w-9" /> {/* Previous button */}
                        <Skeleton className="h-9 w-9" /> {/* Page 1 */}
                        <Skeleton className="h-9 w-9" /> {/* Page 2 */}
                        <Skeleton className="h-9 w-9" /> {/* Next button */}
                    </div>
                </div>
            </div>
        </div>
    )
}
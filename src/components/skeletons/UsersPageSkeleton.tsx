import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown } from "lucide-react"
import { FormSearchInput } from "@/components/form/FormSearchInput"
import { MultiSelect } from "@/components/form/MultiSelect"

const CONTRIBUTION_STATUS_OPTIONS = [
    { label: "ongoing", value: "ongoing" },
    { label: "not-started", value: "not-started" },
    { label: "completed", value: "completed" },
]

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
            {/* Header with Search and Filters - Load instantly */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="w-lg">
                    <FormSearchInput
                        placeholder="Filter emails..."
                        disabled
                        defaultValue=""
                    />
                </div>
                <div className="flex gap-4 items-center">
                    {/* Date Filter Button */}
                    <Button variant="subtle" disabled>
                        <Calendar className="h-4 w-4" />
                        <span>Date</span>
                    </Button>

                    {/* Status Filter */}
                    <MultiSelect
                        options={CONTRIBUTION_STATUS_OPTIONS}
                        selected={[]}
                        onSelectionChange={() => { }}
                        placeholder="Filter by status..."
                        disabled
                    />
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
import { Skeleton } from "@/components/ui/skeleton"
import { PropertySkeleton } from "./PropertySkeleton"

export function PropertiesPageSkeleton() {
    return (
        <div className="min-h-screen bg-background p-6 space-y-6">
            {/* Page Header */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" /> {/* Page title */}
                        <Skeleton className="h-5 w-64" /> {/* Page subtitle */}
                    </div>
                    <Skeleton className="h-10 w-32" /> {/* Add property button */}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Skeleton className="h-10 w-full" /> {/* Search input */}
                    <Skeleton className="h-10 w-full" /> {/* Location filter */}
                    <Skeleton className="h-10 w-full" /> {/* Price filter */}
                    <Skeleton className="h-10 w-full" /> {/* Property type filter */}
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" /> {/* Active filter 1 */}
                    <Skeleton className="h-8 w-20" /> {/* Active filter 2 */}
                    <Skeleton className="h-8 w-12" /> {/* Clear filters */}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-20" /> {/* Stat label */}
                            <Skeleton className="h-4 w-4 rounded" /> {/* Icon */}
                        </div>
                        <Skeleton className="h-7 w-16" /> {/* Stat value */}
                        <Skeleton className="h-3 w-24" /> {/* Stat change */}
                    </div>
                ))}
            </div>

            {/* View Toggle and Sort */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-24" /> {/* Results count */}
                    <div className="flex gap-1">
                        <Skeleton className="h-8 w-8" /> {/* Grid view */}
                        <Skeleton className="h-8 w-8" /> {/* List view */}
                    </div>
                </div>
                <Skeleton className="h-9 w-32" /> {/* Sort dropdown */}
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <PropertySkeleton key={index} />
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-6">
                <Skeleton className="h-10 w-32" /> {/* Load more button */}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-6">
                <Skeleton className="h-5 w-32" /> {/* Page info */}
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" /> {/* Previous */}
                    <Skeleton className="h-9 w-8" /> {/* Page 1 */}
                    <Skeleton className="h-9 w-8" /> {/* Page 2 */}
                    <Skeleton className="h-9 w-8" /> {/* Page 3 */}
                    <Skeleton className="h-9 w-20" /> {/* Next */}
                </div>
            </div>
        </div>
    )
}
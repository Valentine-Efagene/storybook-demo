import { Skeleton } from "@/components/ui/skeleton"

export function PropertySkeleton() {
    return (
        <div className="bg-white rounded-lg border p-6 space-y-4">
            {/* Property Image */}
            <Skeleton className="w-full h-48 rounded-lg" />

            {/* Property Header */}
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-3/4" /> {/* Property title */}
                        <Skeleton className="h-4 w-1/2" /> {/* Property location */}
                    </div>
                    <Skeleton className="h-8 w-16" /> {/* Status badge */}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-24" /> {/* Price */}
                    <Skeleton className="h-4 w-16" /> {/* Per month/year */}
                </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" /> {/* Bed icon */}
                    <Skeleton className="h-4 w-8" /> {/* Bed count */}
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" /> {/* Bath icon */}
                    <Skeleton className="h-4 w-8" /> {/* Bath count */}
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" /> {/* Area icon */}
                    <Skeleton className="h-4 w-16" /> {/* Area size */}
                </div>
            </div>

            {/* Property Tags */}
            <div className="flex gap-2 flex-wrap">
                <Skeleton className="h-6 w-16 rounded-full" /> {/* Tag 1 */}
                <Skeleton className="h-6 w-20 rounded-full" /> {/* Tag 2 */}
                <Skeleton className="h-6 w-14 rounded-full" /> {/* Tag 3 */}
            </div>

            {/* Property Description */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
            </div>

            {/* Property Footer */}
            <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" /> {/* Agent avatar */}
                    <Skeleton className="h-4 w-24" /> {/* Agent name */}
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" /> {/* Contact button */}
                    <Skeleton className="h-9 w-16" /> {/* View button */}
                </div>
            </div>
        </div>
    )
}
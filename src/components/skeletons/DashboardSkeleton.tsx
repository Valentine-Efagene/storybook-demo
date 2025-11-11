import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-background p-12 flex flex-col gap-8">
            {/* Welcome Message Skeleton */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" /> {/* Welcome title */}
                        <Skeleton className="h-5 w-96" /> {/* Subtitle */}
                    </div>
                </div>
            </div>

            {/* Dashboard Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Stat Cards */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg border p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-20" /> {/* Card title */}
                            <Skeleton className="h-5 w-5 rounded" /> {/* Icon */}
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-16" /> {/* Main number */}
                            <Skeleton className="h-4 w-24" /> {/* Subtitle/change */}
                        </div>
                    </div>
                ))}

                {/* Chart Card */}
                <div className="bg-white rounded-lg border p-6 space-y-4 md:col-span-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-32" /> {/* Chart title */}
                        <Skeleton className="h-8 w-24" /> {/* Chart controls */}
                    </div>
                    <div className="space-y-3">
                        {/* Chart bars */}
                        <div className="flex items-end gap-2 h-32">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className={`flex-1 rounded-t`}
                                    style={{ height: `${Math.random() * 80 + 20}%` }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <Skeleton key={index} className="h-4 w-8" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activity Feed Card */}
                <div className="bg-white rounded-lg border p-6 space-y-4 md:col-span-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-28" /> {/* Activity title */}
                        <Skeleton className="h-8 w-20" /> {/* View all button */}
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-full" /> {/* Activity text */}
                                    <Skeleton className="h-3 w-20" /> {/* Time */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Actions Card */}
                <div className="bg-white rounded-lg border p-6 space-y-4">
                    <Skeleton className="h-6 w-24" /> {/* Title */}
                    <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8 rounded" /> {/* Icon */}
                                <Skeleton className="h-4 w-full" /> {/* Action text */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-lg border p-6 space-y-4">
                    <Skeleton className="h-6 w-20" /> {/* Title */}
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-16" /> {/* Label */}
                                    <Skeleton className="h-4 w-12" /> {/* Percentage */}
                                </div>
                                <Skeleton className="h-2 w-full rounded-full" /> {/* Progress bar */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-white rounded-lg border p-6 space-y-4">
                    <Skeleton className="h-6 w-24" /> {/* Title */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-20" /> {/* Label */}
                            <Skeleton className="h-4 w-12" /> {/* Value */}
                        </div>
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-24" /> {/* Label */}
                            <Skeleton className="h-4 w-16" /> {/* Value */}
                        </div>
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-16" /> {/* Label */}
                            <Skeleton className="h-4 w-20" /> {/* Value */}
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between font-medium">
                            <Skeleton className="h-5 w-12" /> {/* Total label */}
                            <Skeleton className="h-5 w-16" /> {/* Total value */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
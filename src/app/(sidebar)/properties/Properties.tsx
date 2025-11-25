"use client"

import { PropertyQueryParams } from "@/types/property"
import { Suspense, useCallback } from "react"
import { PropertiesFilters } from "./PropertiesFilters"
import { UsersPageSkeleton } from "@/components/skeletons/UsersPageSkeleton"
import { PropertiesGrid } from "./PropertiesGrid"
import { useSearchParams, useRouter } from "next/navigation"

interface Props {
    initialQparams: PropertyQueryParams
}

export function Properties({ initialQparams }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const limit = searchParams.get("limit") ?? initialQparams.limit ?? "20"

    const updateParams = useCallback((newParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('limit', limit ?? '')
        Object.entries(newParams).forEach(([key, value]) => {
            if (!value || value.length < 1) {
                params.delete(key)
            } else {
                params.set(key, value)
            }
        })

        router.push(`?${params.toString()}`)
    }, [searchParams, limit, router])

    return (
        <div className="flex flex-1 flex-col gap-4 pt-4 pb-12 sm:px-12 px-4">
            <PropertiesFilters
                initialQparams={initialQparams}
                onUpdateParams={updateParams}
            />
            {/* Filters load instantly - no Suspense needed */}
            {/* Only the table and pagination are wrapped in Suspense */}
            <Suspense fallback={<UsersPageSkeleton />}>
                <PropertiesGrid initialQparams={initialQparams} />
            </Suspense>
        </div>
    )
}
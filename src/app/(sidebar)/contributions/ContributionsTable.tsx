"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, Suspense } from "react"
import { UserQueryParams } from "@/types/user"
import { ContributionsFilters } from "./ContributionsFilters"
import { ContributionsTableWithData } from "./ContributionsTableWithData"
import { UsersPageSkeleton } from "@/components/skeletons/UsersPageSkeleton"

interface Props {
    initialQparams: UserQueryParams
}

export function ContributionsTable({ initialQparams }: Props) {
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
        <div className="flex flex-1 flex-col gap-4 py-12 px-12">
            {/* Filters load instantly - no Suspense needed */}
            <ContributionsFilters
                initialQparams={initialQparams}
                onUpdateParams={updateParams}
            />

            {/* Only the table and pagination are wrapped in Suspense */}
            <Suspense fallback={<UsersPageSkeleton />}>
                <ContributionsTableWithData initialQparams={initialQparams} />
            </Suspense>
        </div>
    )
}
"use client"

import useToastRawError from "@/hooks/useToastRawError"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useCallback } from "react"
import { Pagination } from "@/components/ui/pagination"
import { UsersTableSkeleton } from "@/components/skeletons/UsersPageSkeleton"
import { EmptyProperty } from "./EmptyProperty"
import { SearchXIcon } from "lucide-react"
import { PropertyQueryParams, PropertyStatus } from "@/types/property"
import PropertyCard from "./PropertyCard"
import { useProperties } from "./useProperties"

interface Props {
    initialQparams: PropertyQueryParams
}

export function PropertiesGrid({ initialQparams }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const offset = searchParams.get("offset") ?? initialQparams.offset ?? "0"
    const search = searchParams.get("search") ?? initialQparams.search ?? null
    const from = searchParams.get("from") ?? initialQparams.from ?? null
    const to = searchParams.get("to") ?? initialQparams.to ?? null
    const status = searchParams.get("status") ?? initialQparams.status ?? null
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

    const onOffsetChange = useCallback((offset: number) =>
        updateParams({ offset: `${offset}` }),
        [updateParams]
    )

    // Create current query params for useProperties hook - must match PropertyQueryParams structure exactly
    const currentParams: PropertyQueryParams = {
        offset,
        search,
        from,
        limit,
        to,
        status: status as PropertyStatus | null
    }

    const { data: paginatedData, isFetching: isLoading, isError, error } = useProperties(currentParams)

    useToastRawError({ isError, error })

    const tableDisplay = useMemo(() => {
        if (isLoading) {
            return <UsersTableSkeleton />
        }

        if (!paginatedData || paginatedData.body.properties.length === 0) {
            return <EmptyProperty
                message="No Property found"
                description="Couldn&apos;t find any property(s) matching
your search."
                icon={SearchXIcon}
            />
        }

        return (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] min-h-[calc(100vh-20rem)] gap-4">
                {paginatedData?.body.properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        )
    }, [paginatedData, isLoading])

    return (
        <>
            <div>
                {tableDisplay}
            </div>
            <Pagination
                currentPage={Math.floor((paginatedData?.body.offset ?? 0) / Number(limit)) + 1}
                totalItems={paginatedData?.body.total_count ?? 0}
                itemsPerPage={Number(limit)}
                onPageChange={(page) => onOffsetChange((page - 1) * Number(limit))}
                onPageSizeChange={(pageSize) => {
                    onOffsetChange(0)
                    updateParams({ limit: pageSize.toString() })
                }}
            />
        </>
    )
}
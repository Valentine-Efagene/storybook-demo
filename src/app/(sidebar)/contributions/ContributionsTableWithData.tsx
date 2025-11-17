"use client"

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { UserQueryParams } from "@/types/user"
import useToastRawError from "@/hooks/useToastRawError"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useCallback } from "react"
import { Pagination } from "@/components/ui/pagination"
import { useUsers } from "@/hooks/useUsers"
import { UsersTableSkeleton } from "@/components/skeletons/UsersPageSkeleton"
import { EmptyContributions } from "./EmptyContributions"
import { SearchXIcon } from "lucide-react"
import ContributionsRow from "./ContributionsRow"

interface Props {
    initialQparams: UserQueryParams
}

export function ContributionsTableWithData({ initialQparams }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const offset = searchParams.get("offset") ?? initialQparams.offset ?? "0"
    const search = searchParams.get("search") ?? initialQparams.search ?? null
    const from = searchParams.get("from") ?? initialQparams.from ?? null
    const to = searchParams.get("to") ?? initialQparams.to ?? null
    const limit = searchParams.get("limit") ?? initialQparams.limit ?? "20"

    // Get contribution status from URL params (comma-separated values)
    const contributionStatusParam = searchParams.get("contributionStatus") ?? ""
    const contributionStatus = contributionStatusParam
        ? contributionStatusParam.split(",").filter(Boolean)
        : []

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

    // Create current query params for useUsers hook
    const currentParams = {
        offset,
        search,
        from,
        to,
        limit,
        contributionStatus: contributionStatus.length > 0 ? contributionStatus.join(",") : null
    }

    const { data: paginatedData, isFetching: isLoading, isError, error } = useUsers(currentParams)

    useToastRawError({ isError, error })

    const tableDisplay = useMemo(() => {
        if (isLoading) {
            return <UsersTableSkeleton />
        }

        if (!paginatedData || paginatedData.body.users.length === 0) {
            return <EmptyContributions
                message="No user found"
                description="Couldn&apos;t find any user(s) matching
your search."
                icon={SearchXIcon}
            />
        }

        return (
            <div className="rounded-lg border min-h-[calc(100vh-20rem)] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-16rem-3rem-2rem)] overflow-x-auto">
                <Table>
                    <TableHeader className="bg-tertiary-bg">
                        <TableRow>
                            <TableHead><span className="pl-4">Name</span></TableHead>
                            <TableHead>Contribution Status</TableHead>
                            <TableHead>Date Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData?.body.users.map((user) => (
                            <ContributionsRow key={user.id} data={user} />
                        ))}
                    </TableBody>
                </Table>
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
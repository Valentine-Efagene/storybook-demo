"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PaginatedUserResponseBody, QUERY_KEYS, UserQueryParams } from "@/types/user"
import UserRow from "./UserRow"
import { ApiResponse } from "@/types/common"
import useToastRawError from "@/hooks/useToastRawError"
import { fetchUsers } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilterIcon } from "lucide-react"
import { DateRangePicker } from "@/components/form/DateRangePicker"
import TableWrapper from "@/components/TableWrapper"
import CenteredLoader from "@/components/CenteredLoader"
import { FormSearchInput } from "@/components/form/FormSearchInput"

interface Props {
    data?: ApiResponse<PaginatedUserResponseBody>,
    initialQparams: UserQueryParams
}

export function UserTable({ data, initialQparams }: Props) {
    const searchParams = useSearchParams()
    const offset = searchParams.get("offset") ?? initialQparams.offset ?? "0"
    const search = searchParams.get("search") ?? initialQparams.search
    const from = searchParams.get("from") ?? initialQparams.from
    const to = searchParams.get("to") ?? initialQparams.to
    const limit = searchParams.get("limit") ?? initialQparams.limit

    const router = useRouter();

    const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(() => {
        if (!from || !to) return undefined

        const fromDate = new Date(from)
        const toDate = new Date(to)

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) return undefined

        return { from: fromDate, to: toDate }
    })

    const handleApplyFilters = () => {
        updateParams({
            page: "1",
            from: tempDateRange?.from?.toISOString() ?? "",
            to: tempDateRange?.to?.toISOString() ?? "",
        })
    }

    const updateParams = (newParams: Record<string, string>) => {
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
    }

    const onSearchChange = (value: string) => updateParams({ offset: '0', search: value })
    const onOffsetChange = (offset: number) => updateParams({ offset: `${offset}` })

    const { data: paginatedData, isLoading, isError, error } = useQuery<ApiResponse<PaginatedUserResponseBody>>({
        queryKey: [QUERY_KEYS.USERS, 'admin', offset, search, from, to],
        queryFn: () => fetchUsers({
            offset,
            search,
            from,
            to
        }),
        staleTime: 2 * 60 * 1000, // 2 minutes for user data
        gcTime: 5 * 60 * 1000,   // 5 minutes garbage collection
    })

    useToastRawError({ isError, error })

    const display = useMemo(() => {
        if (isLoading) {
            return <CenteredLoader size="md" />
        }

        if (!paginatedData || paginatedData.body.users.length === 0) {
            return <div className="text-center p-8">No users found.</div>
        }

        return (
            <TableWrapper className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><span className="pl-4">Name</span></TableHead>
                            <TableHead>Contribution Status</TableHead>
                            <TableHead>Date Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData?.body.users.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableWrapper>
        )
    }, [paginatedData, isLoading])

    return (
        <div className="flex flex-1 flex-col gap-4 py-12 px-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="w-lg">
                    <FormSearchInput
                        placeholder="Filter emails..."
                        defaultValue={search ? search : undefined}
                        onChange={(e) => onSearchChange(e.target.value)}
                    /></div>
                <div className="flex gap-4 items-center">
                    {/* Filter dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <FilterIcon className="mr-2 h-4 w-4" />
                                Filters
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-4 space-y-4 w-[300px]" align="end">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Date Range</p>
                                <DateRangePicker
                                    date={tempDateRange}
                                    onChange={setTempDateRange}
                                />
                            </div>
                            <Button className="w-full" onClick={handleApplyFilters}>
                                Apply Filters
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {display}
        </div>
    )
}

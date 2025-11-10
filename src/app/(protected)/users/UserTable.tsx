"use client"

import {
    Table,
    TableBody,
    TableCaption,
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
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, FilterIcon } from "lucide-react"
import { DateRangePicker } from "@/components/form/DateRangePicker"

interface Props {
    data?: ApiResponse<PaginatedUserResponseBody>,
    initialQparams: UserQueryParams
}

export function UserTable({ data, initialQparams }: Props) {
    const searchParams = useSearchParams()
    const page = searchParams.get("page") ?? initialQparams.page
    const search = searchParams.get("search") ?? initialQparams.search
    const from = searchParams.get("from") ?? initialQparams.from
    const to = searchParams.get("to") ?? initialQparams.to

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
        Object.entries(newParams).forEach(([key, value]) => {
            if (!value || value.length < 1) {
                params.delete(key)
            } else {
                params.set(key, value)
            }
        })

        router.push(`?${params.toString()}`)
    }

    const onSearchChange = (value: string) => updateParams({ page: '1', search: value })
    const onPageChange = (page: number) => updateParams({ page: `${page}` })

    const { data: paginatedData, isLoading, isError, error } = useQuery<ApiResponse<PaginatedUserResponseBody>>({
        queryKey: [QUERY_KEYS.USERS, 'admin', page, search, from, to],
        queryFn: () => fetchUsers({
            page,
            search,
            from,
            to
        }),
        staleTime: 2 * 60 * 1000, // 2 minutes for user data
        gcTime: 5 * 60 * 1000,   // 5 minutes garbage collection
    })

    useToastRawError({ isError, error })

    return (
        <div>
            <div className="flex items-center py-4 justify-between flex-wrap gap-4">
                <Input
                    placeholder="Filter emails..."
                    defaultValue={search ? search : undefined}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            if (e.currentTarget.value.trim() === search) {
                                return
                            }

                            onSearchChange(e.currentTarget.value);
                        }
                    }}
                    className="max-w-xs"
                />
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
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
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
        </div>
    )
}

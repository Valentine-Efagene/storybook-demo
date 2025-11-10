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
import { PaginatedUserResponseBody, UserQueryParams } from "@/types/user"
import UserRow from "./UserRow"
import { ApiResponse } from "@/types/common"
import useToastRawError from "@/hooks/useToastRawError"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState, useCallback } from "react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, ChevronDown, FilterIcon } from "lucide-react"
import { DateRangePicker } from "@/components/form/DateRangePicker"
import TableWrapper from "@/components/TableWrapper"
import CenteredLoader from "@/components/CenteredLoader"
import { FormSearchInput } from "@/components/form/FormSearchInput"
import { Pagination } from "@/components/ui/pagination"
import { useUsers } from "@/hooks/useUsers"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { FieldGroup } from "@/components/ui/field"
import { FormLabel } from "@/components/form/FormLabel"
import { DatePicker } from "@/components/form/DatePicker"
import FormError from "@/components/form/FormError"
import { format } from "date-fns"
import { FormGroup } from "@/components/form/FormGroup"
import { MultiSelect } from "@/components/form/MultiSelect"

interface Props {
    data?: ApiResponse<PaginatedUserResponseBody>,
    initialQparams: UserQueryParams
}

const CONTRIBUTION_STATUS_OPTIONS = [
    { label: "ongoing", value: "ongoing" },
    { label: "not-started", value: "not-started" },
    { label: "completed", value: "completed" },
]

export function UserTable({ data, initialQparams }: Props) {
    const searchParams = useSearchParams()
    const offset = searchParams.get("offset") ?? initialQparams.offset ?? "0"
    const search = searchParams.get("search") ?? initialQparams.search
    const from = searchParams.get("from") ?? initialQparams.from
    const to = searchParams.get("to") ?? initialQparams.to
    const limit = searchParams.get("limit") ?? initialQparams.limit

    // Get contribution status from URL params (comma-separated values)
    const contributionStatusParam = searchParams.get("contributionStatus") ?? ""
    const contributionStatus = contributionStatusParam
        ? contributionStatusParam.split(",").filter(Boolean)
        : []

    const router = useRouter();

    const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(() => {
        if (!from || !to) return undefined

        const fromDate = new Date(from)
        const toDate = new Date(to)

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) return undefined

        return { from: fromDate, to: toDate }
    })

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

    const handleApplyFilters = useCallback(() => {
        updateParams({
            page: "1",
            from: tempDateRange?.from?.toISOString() ?? "",
            to: tempDateRange?.to?.toISOString() ?? "",
        })
    }, [updateParams, tempDateRange])

    const onSearchChange = useCallback((value: string) =>
        updateParams({ offset: '0', search: value }),
        [updateParams]
    )

    const onContributionStatusChange = useCallback((selected: string[]) => {
        updateParams({
            offset: '0',
            contributionStatus: selected.length > 0 ? selected.join(",") : ""
        })
    }, [updateParams])

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


    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<{
        date_from: string;
        date_to: string;
    }>({
        defaultValues: {
            date_from: from ?? "",
            date_to: to ?? "",
        }
    });

    const dateFrom = useWatch({ control, name: "date_from" })

    const onSubmit: SubmitHandler<{
        date_from: string;
        date_to: string;
    }> = (data) => {
        if (data.date_from && data.date_to) {
            const fromDate = new Date(data.date_from);
            const toDate = new Date(data.date_to);

            if (fromDate > toDate) {
                setError("date_to", {
                    type: "manual",
                    message: "From date cannot be after to date",
                });

                return
            }
        }

        updateParams({
            offset: "0",
            from: data.date_from ?? "",
            to: data.date_to ?? "",
        });
    }

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
                        onDebouncedChange={onSearchChange}
                    /></div>
                <div className="flex gap-4 items-center">
                    {/* Filter dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="subtle">
                                <Calendar className="h-4 w-4" />
                                <span>Date</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-4 space-y-4 w-[300px]" align="end">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">Date Range</p>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="grid gap-4 sm:gap-2 sm:grid-cols-2">
                                        {/* Date From */}
                                        <FormGroup>
                                            <FormLabel>Start Date</FormLabel>
                                            <Controller
                                                name="date_from"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        maxDate={new Date()}
                                                        date={field.value ? new Date(field.value) : undefined}
                                                        onChange={(date) =>
                                                            field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                                        }
                                                    />
                                                )}
                                            />
                                        </FormGroup>

                                        {/* Date To */}
                                        <FormGroup>
                                            <FormLabel>End Date</FormLabel>
                                            <Controller
                                                name="date_to"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        minDate={dateFrom ? new Date(dateFrom) : undefined}
                                                        date={field.value ? new Date(field.value) : undefined}
                                                        onChange={(date) =>
                                                            field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                                        }
                                                    />
                                                )}
                                            />
                                        </FormGroup>
                                    </div>
                                    <Button className="w-full" onClick={handleApplyFilters}>
                                        Apply
                                    </Button>
                                </form>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <MultiSelect
                        options={CONTRIBUTION_STATUS_OPTIONS}
                        selected={contributionStatus}
                        onSelectionChange={onContributionStatusChange}
                        placeholder="Filter by status..."
                    />
                </div>
            </div>
            <div>
                {display}
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
        </div>
    )
}

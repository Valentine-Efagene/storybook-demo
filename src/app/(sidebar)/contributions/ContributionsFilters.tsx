"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "lucide-react"
import { FormSearchInput } from "@/components/form/FormSearchInput"
import { MultiSelect } from "@/components/form/MultiSelect"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { FormLabel } from "@/components/form/FormLabel"
import { DatePicker } from "@/components/form/DatePicker"
import { format } from "date-fns"
import { FormGroup } from "@/components/form/FormGroup"
import { UserQueryParams } from "@/types/user"

interface Props {
    initialQparams: UserQueryParams
    onUpdateParams: (newParams: Record<string, string>) => void
}

const CONTRIBUTION_STATUS_OPTIONS = [
    { label: "ongoing", value: "ongoing" },
    { label: "not-started", value: "not-started" },
    { label: "completed", value: "completed" },
]

export function ContributionsFilters({ initialQparams, onUpdateParams }: Props) {
    const searchParams = useSearchParams()

    const search = searchParams.get("search") ?? initialQparams.search ?? null
    const from = searchParams.get("from") ?? initialQparams.from ?? null
    const to = searchParams.get("to") ?? initialQparams.to ?? null

    // Get contribution status from URL params (comma-separated values)
    const contributionStatusParam = searchParams.get("contributionStatus") ?? ""
    const contributionStatus = contributionStatusParam
        ? contributionStatusParam.split(",").filter(Boolean)
        : []

    // Use a consistent date for server/client to avoid hydration mismatches
    const today = useMemo(() => new Date(), [])

    const onSearchChange = useCallback((value: string) =>
        onUpdateParams({ offset: '0', search: value }),
        [onUpdateParams]
    )

    const onContributionStatusChange = useCallback((selected: string[]) => {
        onUpdateParams({
            offset: '0',
            contributionStatus: selected.length > 0 ? selected.join(",") : ""
        })
    }, [onUpdateParams])

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

        onUpdateParams({
            offset: "0",
            from: data.date_from ?? "",
            to: data.date_to ?? "",
        });
    }

    return (
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="w-full sm:w-lg">
                <FormSearchInput
                    placeholder="Filter emails..."
                    defaultValue={search ? search : undefined}
                    onDebouncedChange={onSearchChange}
                />
            </div>
            <div className="flex gap-4 items-center">
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
                                                    maxDate={today}
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
                                <Button className="w-full" type="submit">
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
    )
}
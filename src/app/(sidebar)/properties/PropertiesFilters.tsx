"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"
import { FormSearchInput } from "@/components/form/FormSearchInput"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { FormLabel } from "@/components/form/FormLabel"
import { DatePicker } from "@/components/form/DatePicker"
import { format } from "date-fns"
import { FormGroup } from "@/components/form/FormGroup"
import { PropertyQueryParams, PropertyStatus, PropertyType } from "@/types/property"
import Tab from "@/components/Tab"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Order } from "@/types/common"

interface Props {
    initialQparams: PropertyQueryParams
    onUpdateParams: (newParams: Record<string, string>) => void
}

const COMPLETION_STATUS_OPTIONS = [
    { value: 'under_construction', label: 'Under Construction' },
    { value: 'completed', label: 'Completed' },
];

const ORDER_OPTIONS = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
];

const TYPE_OPTIONS: {
    value: PropertyType | '';
    label: string;
}[] = [
        { value: 'condominium', label: 'Condominium' },
        { value: 'fully_detached_duplex', label: 'Fully Detached Duplex' },
        { value: 'semi_detached_duplex', label: 'Semi Detached Duplex' },
        { value: 'detached_bungalows', label: 'Detached Bungalows' },
        { value: 'apartments', label: 'Apartments' },
        { value: 'flats', label: 'Flats' },
        { value: 'terraces', label: 'Terraces' },
        { value: 'maisonette', label: 'Maisonette' },
        { value: 'penthouse', label: 'Penthouse' },
        { value: 'terrace_bungalows', label: 'Terrace Bungalows' },
        { value: 'semi_detached_bungalow', label: 'Semi Detached Bungalow' },
        { value: 'terrace_duplex', label: 'Terrace Duplex' },
    ];

export function PropertiesFilters({ initialQparams, onUpdateParams }: Props) {
    const searchParams = useSearchParams()

    const search = searchParams.get("search") ?? initialQparams.search ?? undefined
    const from = searchParams.get("from") ?? initialQparams.from ?? undefined
    const to = searchParams.get("to") ?? initialQparams.to ?? undefined
    const status = searchParams.get("status") ?? initialQparams.status ?? undefined
    const completion_status = searchParams.get("completion_status") ?? initialQparams.completion_status ?? undefined
    const type = (searchParams.get("type") ?? initialQparams.type ?? undefined) as PropertyType | undefined
    const order = (searchParams.get("order") ?? initialQparams.order ?? undefined) as Order | undefined

    // Use a consistent date for server/client to avoid hydration mismatches
    const today = useMemo(() => new Date(), [])

    const onSearchChange = useCallback((value: string) =>
        onUpdateParams({ offset: '0', search: value }),
        [onUpdateParams]
    )

    const onStatusChange = useCallback((value: PropertyStatus) => {
        onUpdateParams({
            offset: '0',
            status: value ?? ''
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
        order: 'asc' | 'desc' | undefined;
        completion_status: string | undefined;
        type: string | undefined;
    }>({
        defaultValues: {
            date_from: from ?? "",
            date_to: to ?? "",
            order: order ?? undefined,
            completion_status: completion_status ?? undefined,
            type: type ?? undefined,
        }
    });

    const dateFrom = useWatch({ control, name: "date_from" })

    const onSubmit: SubmitHandler<{
        date_from: string;
        date_to: string;
        order: 'asc' | 'desc' | undefined;
        completion_status: string | undefined;
        type: string | undefined;
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
            order: data.order ?? "",
            completion_status: data.completion_status ?? "",
            type: data.type ?? "",
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="border-b flex items-center justify-between">
                <Tab
                    className="mb-[-10px]"
                    items={[
                        { value: "", label: "All Properties" },
                        { value: "allocated", label: "Allocated" },
                        { value: "unallocated", label: "Unallocated" },
                    ]}
                    value={status || ""}
                    onValueChange={(value) => onStatusChange(value as PropertyStatus)}
                />
                <Button asChild className="self-end mb-2">
                    <Link href="/properties/create">Add Property</Link>
                </Button>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="w-lg">
                    <FormSearchInput
                        className=""
                        placeholder="Filter emails..."
                        defaultValue={search ? search : undefined}
                        onDebouncedChange={onSearchChange}
                    />
                </div>
                <div className="flex gap-4 items-center">
                    {/* Filter dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="subtle">
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-4 space-y-4 w-[300px]" align="end">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">Date Range</p>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="grid gap-4 sm:gap-2 sm:grid-cols-1">
                                        <FormGroup>
                                            <FormLabel>Completion Status</FormLabel>
                                            <Controller
                                                name="completion_status"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select property type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {COMPLETION_STATUS_OPTIONS.map(option => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Type</FormLabel>
                                            <Controller
                                                name="type"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select property type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {TYPE_OPTIONS.map(option => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Order</FormLabel>
                                            <Controller
                                                name="order"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select order" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ORDER_OPTIONS.map(option => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </FormGroup>
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
                </div>
            </div>
        </div>
    )
}
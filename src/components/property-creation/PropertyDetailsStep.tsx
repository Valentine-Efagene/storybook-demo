"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { propertyDetailsFormSchema, type PropertyDetailsFormInputs, type PropertyDetailsFormData } from "@/lib/schemas/property"

interface PropertyDetailsStepProps {
    defaultValues?: Partial<PropertyDetailsFormInputs>
    onSubmit: (data: PropertyDetailsFormData) => void
    onNext: () => void
    onValidationChange?: (isValid: boolean) => void
}

export function PropertyDetailsStep({
    defaultValues,
    onSubmit,
    onNext,
    onValidationChange
}: PropertyDetailsStepProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PropertyDetailsFormInputs>({
        resolver: zodResolver(propertyDetailsFormSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            type: "apartment",
            description: "",
            bedrooms: undefined,
            bathrooms: undefined,
            squareFeet: undefined,
            address: "",
            city: "",
            state: "",
            price: 0,
            priceType: "sale",
            status: "available",
            ...defaultValues,
        },
    })

    const handleFormSubmit = (data: PropertyDetailsFormInputs) => {
        // Data is already in the correct format, no transformation needed
        onSubmit(data as PropertyDetailsFormData)
        onNext()
    }

    // Notify parent of validation status changes
    React.useEffect(() => {
        onValidationChange?.(isValid)
    }, [isValid, onValidationChange])

    return (
        <div className="max-w-4xl space-y-8">
            <form id="property-details-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Property Title *</Label>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="title"
                                            placeholder="Enter property title"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Property Type</Label>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="apartment">Apartment</SelectItem>
                                                <SelectItem value="house">House</SelectItem>
                                                <SelectItem value="condo">Condominium</SelectItem>
                                                <SelectItem value="townhouse">Townhouse</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.type && (
                                    <p className="text-sm text-destructive">{errors.type.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        id="description"
                                        placeholder="Enter property description"
                                        rows={4}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bedrooms">Bedrooms</Label>
                                <Controller
                                    name="bedrooms"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="bedrooms"
                                            type="number"
                                            placeholder="0"
                                            min={0}
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                field.onChange(value === "" ? undefined : Number(value))
                                            }}
                                        />
                                    )}
                                />
                                {errors.bedrooms && (
                                    <p className="text-sm text-destructive">{errors.bedrooms.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bathrooms">Bathrooms</Label>
                                <Controller
                                    name="bathrooms"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="bathrooms"
                                            type="number"
                                            placeholder="0"
                                            min="0"
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                field.onChange(value === "" ? undefined : Number(value))
                                            }}
                                        />
                                    )}
                                />
                                {errors.bathrooms && (
                                    <p className="text-sm text-destructive">{errors.bathrooms.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="squareFeet">Square Feet</Label>
                                <Controller
                                    name="squareFeet"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="squareFeet"
                                            type="number"
                                            placeholder="0"
                                            min="0"
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                field.onChange(value === "" ? undefined : Number(value))
                                            }}
                                        />
                                    )}
                                />
                                {errors.squareFeet && (
                                    <p className="text-sm text-destructive">{errors.squareFeet.message}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address">Address *</Label>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="address"
                                        placeholder="Enter full address"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.address && (
                                <p className="text-sm text-destructive">{errors.address.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City *</Label>
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="city"
                                            placeholder="Enter city"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.city && (
                                    <p className="text-sm text-destructive">{errors.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State *</Label>
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="state"
                                            placeholder="Enter state"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.state && (
                                    <p className="text-sm text-destructive">{errors.state.message}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price *</Label>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                field.onChange(value === "" ? 0 : Number(value))
                                            }}
                                        />
                                    )}
                                />
                                {errors.price && (
                                    <p className="text-sm text-destructive">{errors.price.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priceType">Price Type</Label>
                                <Controller
                                    name="priceType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select pricing" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sale">For Sale</SelectItem>
                                                <SelectItem value="rent">For Rent</SelectItem>
                                                <SelectItem value="lease">For Lease</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.priceType && (
                                    <p className="text-sm text-destructive">{errors.priceType.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Property Status</Label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="sold">Sold</SelectItem>
                                            <SelectItem value="rented">Rented</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.status && (
                                <p className="text-sm text-destructive">{errors.status.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Hidden submit button - form submission is handled by parent */}
                <Button type="submit" className="hidden">
                    Submit
                </Button>
            </form>
        </div>
    )
}
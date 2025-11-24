"use client"

import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import TextEditor from "@/components/form/TextEditor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CompletePropertyFormData } from "@/lib/schemas/property"
import NumberInput from "../form/NumberInput"
import { BlockRadio, BlockRadioOption } from "@/components/form/BlockRadio"

interface PropertyDetailsStepProps {
    control: Control<CompletePropertyFormData>
    errors: FieldErrors<CompletePropertyFormData>
    watch: UseFormWatch<CompletePropertyFormData>
}

// Completion status options for BlockRadio
const completionStatusOptions: BlockRadioOption[] = [
    {
        value: 'under_construction',
        label: 'Under Construction',
    },
    {
        value: 'completed',
        label: 'Move-in Ready',
    },
]

export function PropertyDetailsStep({
    control,
    errors,
    watch
}: PropertyDetailsStepProps) {
    const currency = watch("currency");

    return (
        <form className="space-y-8 max-w-4xl mx-auto">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Property Details
                </h2>
            </div>
            {/* Basic Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 w-full">
                    {/* Completion Status Section */}
                    <div className="space-y-4">
                        <Label>Completion Status</Label>
                        <Controller
                            name="completion_status"
                            control={control}
                            render={({ field }) => (
                                <BlockRadio
                                    className="w-full grid grid-cols-2"
                                    options={completionStatusOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    name="completion_status"
                                    orientation="horizontal"
                                />
                            )}
                        />
                        {errors.completion_status && (
                            <p className="text-sm text-red-600">{errors.completion_status.message}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="title">Property Title</Label>
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
                                <p className="text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="type">Property Type</Label>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="condo">Condo</SelectItem>
                                            <SelectItem value="townhouse">Townhouse</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.type && (
                                <p className="text-sm text-red-600">{errors.type.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextEditor
                                        onChange={field.onChange}
                                        defaultValue={field.value}
                                    />
                                )}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Property Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <Controller
                                name="bedrooms"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select bedrooms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Bedroom</SelectItem>
                                            <SelectItem value="2">2 Bedrooms</SelectItem>
                                            <SelectItem value="3">3 Bedrooms</SelectItem>
                                            <SelectItem value="4">4 Bedrooms</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.bedrooms && (
                                <p className="text-sm text-red-600">{errors.bedrooms.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bathrooms">Bathrooms</Label>
                            <Controller
                                name="bathrooms"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select bathrooms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Bathroom</SelectItem>
                                            <SelectItem value="2">2 Bathrooms</SelectItem>
                                            <SelectItem value="3">3 Bathrooms</SelectItem>
                                            <SelectItem value="4">4 Bathrooms</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.bathrooms && (
                                <p className="text-sm text-red-600">{errors.bathrooms.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="location"
                                        placeholder="Enter location"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.location && (
                                <p className="text-sm text-red-600">{errors.location.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
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
                                    <p className="text-sm text-red-600">{errors.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
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
                                    <p className="text-sm text-red-600">{errors.state.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Pricing & Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <NumberInput
                                        id="price"
                                        min={0}
                                        unitLeft={currency == "NGN" ? "₦" : currency == "USD" ? "$" : undefined}
                                        unitRight={currency}
                                        placeholder="Enter price"
                                        {...field}
                                        onChange={(value) => field.onChange(Number(value))}
                                    />
                                )}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-600">{errors.price.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Controller
                                name="currency"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.currency && (
                                <p className="text-sm text-red-600">{errors.currency.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
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
                                <p className="text-sm text-red-600">{errors.status.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
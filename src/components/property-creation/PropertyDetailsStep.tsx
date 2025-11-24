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
import { PropertyType } from "@/types/property"

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
        value: 'move_in_ready',
        label: 'Move-in Ready',
    },
]

const PROPERTY_TYPE_OPTIONS: { label: string, value: PropertyType | '' }[] = [
    {
        value: 'bungalow',
        label: 'Bungalow',
    },
    {
        value: 'apartments',
        label: 'Apartments',
    },
    {
        value: 'condominium',
        label: 'Condominium',
    },
]

export function PropertyDetailsStep({
    control,
    errors,
    watch
}: PropertyDetailsStepProps) {

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
                        {/* <div className="md:col-span-2 space-y-2">
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
                        </div> */}

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
                                            {PROPERTY_TYPE_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
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

                        <div className="space-y-2">
                            <Label htmlFor="no_of_units_available">Available Units</Label>
                            <Controller
                                name="no_of_units_available"
                                control={control}
                                render={({ field }) => (
                                    <NumberInput
                                        id="no_of_units_available"
                                        min={1}
                                        unitRight={"Units"}
                                        placeholder="xx"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.no_of_units_available && (
                                <p className="text-sm text-red-600">{errors.no_of_units_available.message}</p>
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
                                        unitLeft={"₦"}
                                        unitRight={"NGN"}
                                        placeholder="Enter price"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-600">{errors.price.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
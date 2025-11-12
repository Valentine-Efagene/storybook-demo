import React from "react"
import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CompletePropertyFormData } from "@/lib/schemas/property"

interface PropertyDetailsStepProps {
    control: Control<CompletePropertyFormData>
    errors: FieldErrors<CompletePropertyFormData>
    watch: UseFormWatch<CompletePropertyFormData>
}

export function PropertyDetailsStep({
    control,
    errors,
    watch
}: PropertyDetailsStepProps) {
    return (
        <form className="space-y-8 max-w-4xl mx-auto">
            {/* Basic Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        
                        <div className="space-y-2">
                            <Label htmlFor="type">Property Type</Label>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
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
                                    <Textarea
                                        id="description"
                                        placeholder="Enter property description"
                                        rows={4}
                                        {...field}
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
                                    <Input
                                        id="bedrooms"
                                        type="number"
                                        min="0"
                                        placeholder="Number of bedrooms"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
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
                                    <Input
                                        id="bathrooms"
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        placeholder="Number of bathrooms"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                )}
                            />
                            {errors.bathrooms && (
                                <p className="text-sm text-red-600">{errors.bathrooms.message}</p>
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
                                        min="0"
                                        placeholder="Total square feet"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                )}
                            />
                            {errors.squareFeet && (
                                <p className="text-sm text-red-600">{errors.squareFeet.message}</p>
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
                            <Label htmlFor="address">Street Address</Label>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="address"
                                        placeholder="Enter street address"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.address && (
                                <p className="text-sm text-red-600">{errors.address.message}</p>
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
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        placeholder="Enter price"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                )}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-600">{errors.price.message}</p>
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
                                            <SelectValue placeholder="Select price type" />
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
                                <p className="text-sm text-red-600">{errors.priceType.message}</p>
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
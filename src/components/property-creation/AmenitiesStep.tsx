"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { amenitiesSchema, type AmenitiesFormData } from "@/lib/schemas/property"

const amenitiesList = [
    'Parking', 'Pool', 'Gym', 'Balcony', 'Garden', 'Air Conditioning',
    'Elevator', 'Security', 'Laundry', 'Storage', 'Playground', 'Rooftop Deck'
]

interface AmenitiesStepProps {
    defaultValues?: Partial<AmenitiesFormData>
    onSubmit: (data: AmenitiesFormData) => void
    onNext: () => void
}

export function AmenitiesStep({
    defaultValues,
    onSubmit,
    onNext
}: AmenitiesStepProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AmenitiesFormData>({
        resolver: zodResolver(amenitiesSchema),
        defaultValues: {
            amenities: [],
            ...defaultValues,
        },
    })

    const handleFormSubmit = (data: AmenitiesFormData) => {
        onSubmit(data)
        onNext()
    }

    return (
        <div className="max-w-4xl space-y-8">
            <form id="amenities-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Property Features & Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Select all amenities and features available at this property.
                            </p>

                            <Controller
                                name="amenities"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {amenitiesList.map((amenity) => {
                                                const isSelected = field.value?.includes(amenity) || false
                                                const toggleAmenity = () => {
                                                    const currentAmenities = field.value || []
                                                    const newAmenities = isSelected
                                                        ? currentAmenities.filter((a) => a !== amenity)
                                                        : [...currentAmenities, amenity]
                                                    field.onChange(newAmenities)
                                                }

                                                return (
                                                    <div
                                                        key={amenity}
                                                        className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                                        onClick={toggleAmenity}
                                                    >
                                                        <Checkbox
                                                            id={`amenity-${amenity}`}
                                                            checked={isSelected}
                                                            onCheckedChange={toggleAmenity}
                                                        />
                                                        <label
                                                            htmlFor={`amenity-${amenity}`}
                                                            className="text-sm font-medium cursor-pointer"
                                                        >
                                                            {amenity}
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {field.value && field.value.length > 0 && (
                                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                                <h4 className="text-sm font-medium text-blue-900 mb-2">
                                                    Selected Amenities ({field.value.length})
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {field.value.map((amenity: string) => (
                                                        <span
                                                            key={amenity}
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs"
                                                        >
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            />

                            {errors.amenities && (
                                <p className="text-sm text-destructive">{errors.amenities.message}</p>
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
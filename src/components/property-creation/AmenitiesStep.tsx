"use client"

import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompletePropertyFormData } from "@/lib/schemas/property"
import { PillCheckboxGroup } from "@/components/form/PillCheckbox"

const amenitiesList = [
    'Parking', 'Pool', 'Gym', 'Balcony', 'Garden', 'Air Conditioning',
    'Elevator', 'Security', 'Laundry', 'Storage', 'Playground', 'Rooftop Deck'
]

interface AmenitiesStepProps {
    control: Control<CompletePropertyFormData>
    errors: FieldErrors<CompletePropertyFormData>
    watch: UseFormWatch<CompletePropertyFormData>
}

export function AmenitiesStep({
    control,
    errors,
    watch
}: AmenitiesStepProps) {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Property Amenities *</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Controller
                        name="amenities"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Select all amenities that apply to this property. You must select at least one amenity.
                                </p>
                                <PillCheckboxGroup
                                    options={amenitiesList}
                                    value={field.value || []}
                                    onChange={field.onChange}
                                    size="md"
                                    variant="outline"
                                    className="justify-start"
                                />
                            </div>
                        )}
                    />
                    {errors.amenities && (
                        <p className="text-sm text-red-600">{errors.amenities.message}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
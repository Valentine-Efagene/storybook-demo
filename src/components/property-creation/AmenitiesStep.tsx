import React from "react"
import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CompletePropertyFormData } from "@/lib/schemas/property"

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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {amenitiesList.map((amenity) => {
                                    const isChecked = field.value?.includes(amenity) || false

                                    return (
                                        <div key={amenity} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={amenity}
                                                checked={isChecked}
                                                onCheckedChange={(checked) => {
                                                    const currentValue = field.value || []
                                                    if (checked) {
                                                        field.onChange([...currentValue, amenity])
                                                    } else {
                                                        field.onChange(currentValue.filter(item => item !== amenity))
                                                    }
                                                }}
                                            />
                                            <Label
                                                htmlFor={amenity}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {amenity}
                                            </Label>
                                        </div>
                                    )
                                })}
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
import React from "react"
import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompletePropertyFormData } from "@/lib/schemas/property"
import { CardCheckboxGroup, Option } from "@/components/form/CardCheckbox"

const availablePlans: Option[] = [
    {
        id: 'basic',
        name: 'Anchor Plan',
        description: 'Homebuyer would pay 20% upfront to secure the property, get a provisional allocation, and spread the remaining 80% over 24-36 months.',
    },
    {
        id: 'premium',
        name: 'EquityBridge Plan',
        description: 'Homebuyer would pay 15% to secure a unit, build up to 30%, and complete payment through a mortgage with optional RSA support.',
    },
    {
        id: 'professional',
        name: 'Ignite Plan',
        description: 'Homebuyer would pay 15% over 6 months to get allocation, build up to 30%, and complete payment via mortgage with optional RSA support.'
    }
]

interface PlansStepProps {
    control: Control<CompletePropertyFormData>
    errors: FieldErrors<CompletePropertyFormData>
    watch: UseFormWatch<CompletePropertyFormData>
}

export function PlansStep({
    control,
    errors,
    watch
}: PlansStepProps) {
    return (
        <div className="space-y-8 max-w-xl mx-auto">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Contribution Plans
                </h2>
                <p className="text-gray-600 mt-1">
                    Select which contribution plans are available for this property.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Choose Your Listing Plan *</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Controller
                        name="plans"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Select the plan that best fits your needs. You can choose multiple plans for different features and marketing approaches.
                                </p>
                                <CardCheckboxGroup
                                    orientation="vertical"
                                    options={availablePlans}
                                    value={field.value || []}
                                    onChange={field.onChange}
                                    allowMultiple={true}
                                />
                            </div>
                        )}
                    />
                    {errors.plans && (
                        <p className="text-sm text-red-600">{errors.plans.message}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
import React from "react"
import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompletePropertyFormData } from "@/lib/schemas/property"
import { CardCheckboxGroup, Option } from "@/components/form/CardCheckbox"
import { fetchPlans } from "@/lib/api"
import { Plan } from "@/types/property"
import { useQuery } from "@tanstack/react-query"
import { getPlansQueryKey } from "@/lib/query-keys"

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
    const {
        data: plansResponse,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: getPlansQueryKey(),
        queryFn: fetchPlans,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    })

    console.log({ plansResponse })

    // Convert API plans to Option format for CardCheckboxGroup
    const plans: Option[] = React.useMemo(() => {
        const plansData = plansResponse?.body?.plans
        if (!plansData) return []

        return plansData.map((plan: Plan) => ({
            id: plan.id.toString(),
            name: plan.name || '',
            description: `${plan.downpayment_percent}% down payment${plan.allow_mortgage ? ', mortgage available' : ''}${plan.allow_downpayment ? ', flexible payment terms' : ''}`
        }))
    }, [plansResponse])
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
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <span className="ml-2 text-gray-600">Loading plans...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <p className="text-red-600 mb-2">
                                {error instanceof Error ? error.message : 'Failed to load plans'}
                            </p>
                            <button
                                onClick={() => refetch()}
                                className="text-primary hover:underline text-sm"
                            >
                                Try again
                            </button>
                        </div>
                    ) : (
                        <Controller
                            name="plans"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        Select the contribution plans available for this property. You can choose multiple plans to offer buyers different payment options.
                                    </p>
                                    <CardCheckboxGroup
                                        orientation="vertical"
                                        options={plans}
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        allowMultiple={true}
                                    />
                                </div>
                            )}
                        />
                    )}
                    {errors.plans && (
                        <p className="text-sm text-red-600">{errors.plans.message}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
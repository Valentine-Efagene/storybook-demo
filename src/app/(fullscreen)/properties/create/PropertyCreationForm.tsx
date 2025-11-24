"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PropertyDetailsStep } from "@/components/property-creation/PropertyDetailsStep"
import { GalleryStep } from "@/components/property-creation/GalleryStep"
import { AmenitiesStep } from "@/components/property-creation/AmenitiesStep"
import { PlansStep } from "@/components/property-creation/PlansStep"
import { ReviewStep } from "@/components/property-creation/ReviewStep"
import { completePropertySchema, type CompletePropertyFormData } from "@/lib/schemas/property"
import { StepsSidebar, type Step } from "@/components/form/StepsSidebar"
import { useServerMutation } from "@/hooks/useServerMutation"
import { createProperty } from "./actions"
import { QUERY_KEYS } from "@/types/user"

const STEPS: Step[] = [
    {
        id: 1, name: 'Property Details', description: 'Basic information and location',
        fields: [
            'title',
            'type',
            'description',
            'bedrooms',
            'bathrooms',
            'location',
            'city',
            'state',
            'price',
            'no_of_units_available',
            'completion_status']
    },
    { id: 2, name: 'Gallery', description: 'Upload display image (required)', fields: ['displayImage', 'model3dImages', 'floorPlanImages', 'aerialImages'] },
    { id: 3, name: 'Amenities', description: 'Select at least one amenity', fields: ['amenities'] },
    { id: 4, name: 'Plans', description: 'Choose your listing plan', fields: ['plans'] },
    { id: 5, name: 'Review', description: 'Review and submit', fields: [] }
]

export function PropertyCreationForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const router = useRouter()

    const form = useForm<CompletePropertyFormData>({
        resolver: zodResolver(completePropertySchema),
        mode: "onChange",
        defaultValues: {
            type: "bungalow",
            description: "",
            bedrooms: 1,
            bathrooms: 1,
            location: "",
            price: undefined,
            completion_status: "move_in_ready",
            no_of_units_available: 0,
            media: [],
            three_d_walkthroughs: [],
            floor_plans: [],
            amenities: [],
            plans: [],
        }
    })

    const { control, trigger, formState: { errors }, watch, handleSubmit } = form

    // Validation state for each step
    const [stepValidation, setStepValidation] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    })

    const canNavigateToStep = (step: number) => {
        if (step === 1) return true
        if (step === 2) return stepValidation[1]
        if (step === 3) return stepValidation[1] && stepValidation[2]
        if (step === 4) return stepValidation[1] && stepValidation[2] && stepValidation[3]
        if (step === 5) return stepValidation[1] && stepValidation[2] && stepValidation[3] && stepValidation[4]
        return false
    }

    const validateCurrentStep = async () => {
        const currentStepData = STEPS.find(step => step.id === currentStep)
        if (!currentStepData) return false

        const fieldsToValidate = currentStepData.fields
        if (fieldsToValidate.length === 0) return true

        console.log(`Validating step ${currentStep} fields:`, fieldsToValidate)
        const isValid = await trigger(fieldsToValidate as any)
        console.log(`Step ${currentStep} validation result:`, isValid)

        if (isValid) {
            setStepValidation(prev => ({ ...prev, [currentStep]: true }))
        }
        return isValid
    }

    const nextStep = async () => {
        const isValid = await validateCurrentStep()
        if (isValid) {
            const nextStepNumber = currentStep + 1
            if (nextStepNumber <= STEPS.length) {
                setCurrentStep(nextStepNumber)
            }
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const goToStep = (step: number) => {
        if (canNavigateToStep(step)) {
            setCurrentStep(step)
        }
    }

    const propertyCreationMutation = useServerMutation(createProperty, {
        setError: form.setError,
        mutationKey: [QUERY_KEYS.PROPERTIES],
        invalidateQueries: [
            [QUERY_KEYS.PROPERTIES],
        ],
        onSuccess: (data) => {
            form.reset()
        },
        redirectTo: "/properties",
        showSuccessToast: true,
    })

    const handleFinalSubmit = async (data: CompletePropertyFormData) => {
        propertyCreationMutation.mutate(data)
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/properties"
                        className="flex items-center gap-2 text-primary-text hover:text-gray-900 rounded-full bg-tertiary-bg p-3"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <p className="text-sm text-primary-text">
                        Add Property
                    </p>
                </div>
                <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => router.push('/properties')}
                    className="ml-auto"
                >
                    Cancel
                </Button>
            </div>
            <div className="flex flex-row flex-1">
                {/* Left Sidebar Navigation */}
                <StepsSidebar
                    steps={STEPS}
                    currentStep={currentStep}
                    stepValidation={stepValidation}
                    errors={errors}
                    onStepClick={goToStep}
                    canNavigateToStep={canNavigateToStep}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col sm:mt-8 mb-20">
                    {/* Step Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        {currentStep === 1 && (
                            <PropertyDetailsStep
                                control={control}
                                errors={errors}
                                watch={watch}
                            />
                        )}
                        {currentStep === 2 && (
                            <GalleryStep
                                control={control}
                                errors={errors}
                                watch={watch}
                            />
                        )}
                        {currentStep === 3 && (
                            <AmenitiesStep
                                control={control}
                                errors={errors}
                                watch={watch}
                            />
                        )}
                        {currentStep === 4 && (
                            <PlansStep
                                control={control}
                                errors={errors}
                                watch={watch}
                            />
                        )}
                        {currentStep === 5 && (
                            <ReviewStep formData={watch()} />
                        )}
                    </div>
                    {/* Actions */}
                    <div className="p-6 max-w-xl mx-auto w-full border-gray-200 space-y-3">
                        <div className="grid gap-2 grid-cols-2">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="w-full"
                            >
                                Previous
                            </Button>
                            {currentStep === STEPS.length ? (
                                <Button
                                    onClick={handleSubmit(handleFinalSubmit)}
                                    disabled={!stepValidation[4] || propertyCreationMutation.isLoading}
                                    className="w-full"
                                    loading={propertyCreationMutation.isLoading}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Create Property
                                </Button>
                            ) : (
                                <Button
                                    onClick={nextStep}
                                    className="w-full"
                                >
                                    Next
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
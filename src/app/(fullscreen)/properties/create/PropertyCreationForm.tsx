"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save, X, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { PropertyDetailsStep } from "@/components/property-creation/PropertyDetailsStep"
import { GalleryStep } from "@/components/property-creation/GalleryStep"
import { AmenitiesStep } from "@/components/property-creation/AmenitiesStep"
import { PlansStep } from "@/components/property-creation/PlansStep"
import { ReviewStep } from "@/components/property-creation/ReviewStep"
import { completePropertySchema, type CompletePropertyFormData } from "@/lib/schemas/property"

const STEPS = [
    { id: 1, name: 'Property Details', description: 'Basic information and location', fields: ['title', 'type', 'description', 'bedrooms', 'bathrooms', 'squareFeet', 'address', 'city', 'state', 'price', 'currency', 'status'] },
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
            title: "",
            type: "house",
            description: "",
            bedrooms: 1,
            bathrooms: 1,
            location: "",
            city: "",
            state: "",
            price: 1,
            currency: "NGN",
            status: "available",
            completion_status: "completed",
            media: [],
            model3dImages: [],
            floorPlanImages: [],
            aerialImages: [],
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

    const getStepStatus = (step: number) => {
        if (currentStep === step) return 'current'
        if (stepValidation[step as keyof typeof stepValidation]) return 'completed'
        if (canNavigateToStep(step)) return 'accessible'
        return 'disabled'
    }

    const hasStepErrors = (step: number) => {
        const stepData = STEPS.find(s => s.id === step)
        if (!stepData) return false

        return stepData.fields.some(field => {
            return errors[field as keyof typeof errors]
        })
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

    const handleFinalSubmit = async (data: CompletePropertyFormData) => {
        console.log('Complete form data:', data)
        router.push('/properties')
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
                <div className="hidden sm:flex w-80 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
                    {/* Steps Navigation */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <nav className="space-y-2">
                            {STEPS.map((step) => {
                                const status = getStepStatus(step.id)
                                const isClickable = canNavigateToStep(step.id)
                                const hasErrors = hasStepErrors(step.id)

                                return (
                                    <div
                                        key={step.id}
                                        className={cn(
                                            "flex items-start gap-3 p-3 rounded-lg transition-colors",
                                            isClickable ? "cursor-pointer" : "cursor-not-allowed",
                                            status === 'current'
                                                ? hasErrors
                                                    ? "bg-red-50 border border-red-200"
                                                    : "bg-blue-50 border border-blue-200"
                                                : status === 'completed'
                                                    ? "bg-green-50 border border-green-200 hover:bg-green-100"
                                                    : status === 'accessible'
                                                        ? "hover:bg-gray-50"
                                                        : "opacity-50"
                                        )}
                                        onClick={() => isClickable && goToStep(step.id)}
                                    >
                                        <div className={cn(
                                            "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                                            status === 'current'
                                                ? hasErrors
                                                    ? "bg-red-600 text-white"
                                                    : "bg-blue-600 text-white"
                                                : status === 'completed'
                                                    ? "bg-green-600 text-white"
                                                    : status === 'accessible'
                                                        ? "bg-gray-300 text-gray-600"
                                                        : "bg-gray-200 text-gray-400"
                                        )}>
                                            {status === 'completed' ? (
                                                <Check className="w-3 h-3" />
                                            ) : (
                                                step.id
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-sm font-medium",
                                                status === 'current'
                                                    ? hasErrors
                                                        ? "text-red-900"
                                                        : "text-blue-900"
                                                    : status === 'completed'
                                                        ? "text-green-900"
                                                        : status === 'accessible'
                                                            ? "text-gray-900"
                                                            : "text-gray-400"
                                            )}>
                                                {step.name}
                                            </p>
                                            <p className={cn(
                                                "text-xs",
                                                status === 'disabled' ? "text-gray-400" : "text-gray-600"
                                            )}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </nav>
                    </div>
                </div>

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
                                    disabled={!stepValidation[4]}
                                    className="w-full"
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
"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save, X, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { PropertyDetailsStep } from "@/components/property-creation/PropertyDetailsStep"
import { GalleryStep } from "@/components/property-creation/GalleryStep"
import { AmenitiesStep } from "@/components/property-creation/AmenitiesStep"
import { ReviewStep } from "@/components/property-creation/ReviewStep"
import { completePropertySchema, type CompletePropertyFormData } from "@/lib/schemas/property"

const STEPS = [
    { id: 1, name: 'Property Details', description: 'Basic information and location', fields: ['title', 'type', 'description', 'bedrooms', 'bathrooms', 'squareFeet', 'address', 'city', 'state', 'price', 'priceType', 'status'] },
    { id: 2, name: 'Gallery', description: 'Upload property images', fields: ['displayImage', 'model3dImages', 'floorPlanImages', 'aerialImages'] },
    { id: 3, name: 'Amenities', description: 'Features and facilities', fields: ['amenities'] },
    { id: 4, name: 'Review', description: 'Review and submit', fields: [] }
]

export default function CreatePropertyPage() {
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
            squareFeet: 1,
            address: "",
            city: "",
            state: "",
            price: 1,
            priceType: "sale",
            status: "available",
            displayImage: undefined,
            model3dImages: [],
            floorPlanImages: [],
            aerialImages: [],
            amenities: [],
        }
    })

    const { control, trigger, formState: { errors }, watch, handleSubmit } = form

    // Validation state for each step
    const [stepValidation, setStepValidation] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
    })

    const canNavigateToStep = (step: number) => {
        if (step === 1) return true
        if (step === 2) return stepValidation[1]
        if (step === 3) return stepValidation[1] && stepValidation[2]
        if (step === 4) return stepValidation[1] && stepValidation[2] && stepValidation[3]
        return false
    }

    const getStepStatus = (step: number) => {
        if (currentStep === step) return 'current'
        if (stepValidation[step as keyof typeof stepValidation]) return 'completed'
        if (canNavigateToStep(step)) return 'accessible'
        return 'disabled'
    }

    const validateCurrentStep = async () => {
        const currentStepData = STEPS.find(step => step.id === currentStep)
        if (!currentStepData) return false

        const fieldsToValidate = currentStepData.fields
        if (fieldsToValidate.length === 0) return true

        const isValid = await trigger(fieldsToValidate as any)
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
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Sidebar Navigation */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <Link
                        href="/properties"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Properties
                    </Link>
                    <h1 className="text-xl font-semibold text-gray-900">
                        Create New Property
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Step {currentStep} of {STEPS.length}
                    </p>
                </div>

                {/* Steps Navigation */}
                <div className="flex-1 p-6">
                    <nav className="space-y-2">
                        {STEPS.map((step) => {
                            const status = getStepStatus(step.id)
                            const isClickable = canNavigateToStep(step.id)

                            return (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex items-start gap-3 p-3 rounded-lg transition-colors",
                                        isClickable ? "cursor-pointer" : "cursor-not-allowed",
                                        status === 'current'
                                            ? "bg-blue-50 border border-blue-200"
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
                                            ? "bg-blue-600 text-white"
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
                                                ? "text-blue-900"
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

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 space-y-3">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="flex-1"
                        >
                            Previous
                        </Button>
                        {currentStep === STEPS.length ? (
                            <Button
                                onClick={handleSubmit(handleFinalSubmit)}
                                disabled={!stepValidation[3]}
                                className="flex-1"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Create Property
                            </Button>
                        ) : (
                            <Button
                                onClick={nextStep}
                                className="flex-1"
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/properties')}
                        className="w-full"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Step Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {STEPS[currentStep - 1].name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {STEPS[currentStep - 1].description}
                    </p>
                </div>

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
                        <ReviewStep formData={watch()} />
                    )}
                </div>
            </div>
        </div>
    )
}
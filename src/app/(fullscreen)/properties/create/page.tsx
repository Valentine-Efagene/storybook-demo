"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save, X, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { PropertyDetailsStep } from "@/components/property-creation/PropertyDetailsStep"
import { GalleryStep } from "@/components/property-creation/GalleryStep"
import { AmenitiesStep } from "@/components/property-creation/AmenitiesStep"
import { ReviewStep } from "@/components/property-creation/ReviewStep"
import type {
    PropertyDetailsFormData,
    GalleryFormData,
    AmenitiesFormData,
    CompletePropertyFormData
} from "@/lib/schemas/property"

const STEPS = [
    { id: 1, name: 'Property Details', description: 'Basic information and location' },
    { id: 2, name: 'Gallery', description: 'Upload property images' },
    { id: 3, name: 'Amenities', description: 'Features and facilities' },
    { id: 4, name: 'Review', description: 'Review and submit' }
]

export default function CreatePropertyPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form data for each step
    const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsFormData | null>(null)
    const [galleryData, setGalleryData] = useState<GalleryFormData | null>(null)
    const [amenitiesData, setAmenitiesData] = useState<AmenitiesFormData | null>(null)

    // Track validation status for current step
    const [isCurrentStepValid, setIsCurrentStepValid] = useState(false)

    const handleNext = () => {
        // For Property Details step, trigger form validation
        if (currentStep === 1) {
            const form = document.getElementById('property-details-form') as HTMLFormElement
            if (form) {
                form.requestSubmit()
            }
        }
        // For Gallery step, trigger form validation  
        else if (currentStep === 2) {
            const form = document.getElementById('gallery-form') as HTMLFormElement
            if (form) {
                form.requestSubmit()
            }
        }
        // For Amenities step, trigger form validation
        else if (currentStep === 3) {
            const form = document.getElementById('amenities-form') as HTMLFormElement
            if (form) {
                form.requestSubmit()
            }
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleStepClick = (stepId: number) => {
        // Only allow navigation to completed steps or the next step
        if (stepId <= currentStep || isStepComplete(stepId - 1)) {
            setCurrentStep(stepId)
        }
    }

    const handlePropertyDetailsSubmit = (data: PropertyDetailsFormData) => {
        setPropertyDetails(data)
        handleStepNext()
    }

    const handleGallerySubmit = (data: GalleryFormData) => {
        setGalleryData(data)
        handleStepNext()
    }

    const handleAmenitiesSubmit = (data: AmenitiesFormData) => {
        setAmenitiesData(data)
        handleStepNext()
    }

    const handleStepNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleFinalSubmit = async () => {
        if (!propertyDetails) return

        setIsSubmitting(true)

        // Combine all form data
        const completeData: CompletePropertyFormData = {
            ...propertyDetails,
            displayImage: galleryData?.displayImage,
            model3dImages: galleryData?.model3dImages || [],
            floorPlanImages: galleryData?.floorPlanImages || [],
            aerialImages: galleryData?.aerialImages || [],
            amenities: amenitiesData?.amenities || [],
        }

        // TODO: Implement property creation logic
        console.log("Creating property...", completeData)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            router.push('/properties')
        }, 2000)
    }

    const handleCancel = () => {
        router.push('/properties')
    }

    const isStepComplete = (stepId: number) => {
        if (stepId === 1) {
            return propertyDetails !== null
        }
        if (stepId === 2) {
            return galleryData !== null
        }
        if (stepId === 3) {
            return amenitiesData !== null
        }
        return false
    }

    const canProceed = () => {
        if (currentStep === 4) {
            return propertyDetails !== null
        }
        if (currentStep === 1) {
            return isCurrentStepValid
        }
        return true // Other steps are optional
    }

    // Get complete form data for review step
    const getCompleteFormData = (): CompletePropertyFormData | null => {
        if (!propertyDetails) return null

        return {
            ...propertyDetails,
            displayImage: galleryData?.displayImage,
            model3dImages: galleryData?.model3dImages || [],
            floorPlanImages: galleryData?.floorPlanImages || [],
            aerialImages: galleryData?.aerialImages || [],
            amenities: amenitiesData?.amenities || [],
        }
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
                        {STEPS.map((step) => (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                                    currentStep === step.id
                                        ? "bg-blue-50 border border-blue-200"
                                        : "hover:bg-gray-50",
                                    step.id < currentStep && "bg-green-50 border border-green-200"
                                )}
                                onClick={() => handleStepClick(step.id)}
                            >
                                <div className={cn(
                                    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                                    currentStep === step.id
                                        ? "bg-blue-600 text-white"
                                        : step.id < currentStep
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-300 text-gray-600"
                                )}>
                                    {step.id < currentStep ? (
                                        <Check className="w-3 h-3" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        "text-sm font-medium",
                                        currentStep === step.id
                                            ? "text-blue-900"
                                            : step.id < currentStep
                                                ? "text-green-900"
                                                : "text-gray-900"
                                    )}>
                                        {step.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 space-y-3">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="flex-1"
                        >
                            Previous
                        </Button>
                        {currentStep === STEPS.length ? (
                            <Button
                                onClick={handleFinalSubmit}
                                disabled={isSubmitting || !canProceed()}
                                className="flex-1"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {isSubmitting ? 'Creating...' : 'Create Property'}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="flex-1"
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleCancel}
                        disabled={isSubmitting}
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
                            defaultValues={propertyDetails || undefined}
                            onSubmit={handlePropertyDetailsSubmit}
                            onNext={handleStepNext}
                            onValidationChange={setIsCurrentStepValid}
                        />
                    )}
                    {currentStep === 2 && (
                        <GalleryStep
                            defaultValues={galleryData || undefined}
                            onSubmit={handleGallerySubmit}
                            onNext={handleStepNext}
                        />
                    )}
                    {currentStep === 3 && (
                        <AmenitiesStep
                            defaultValues={amenitiesData || undefined}
                            onSubmit={handleAmenitiesSubmit}
                            onNext={handleStepNext}
                        />
                    )}
                    {currentStep === 4 && getCompleteFormData() && (
                        <ReviewStep formData={getCompleteFormData()!} />
                    )}
                </div>
            </div>
        </div>
    )
}
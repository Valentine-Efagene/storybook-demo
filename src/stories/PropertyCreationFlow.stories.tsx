import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { PropertyDetailsStep } from '@/components/property-creation/PropertyDetailsStep'
import { AmenitiesStep } from '@/components/property-creation/AmenitiesStep'
import { ReviewStep } from '@/components/property-creation/ReviewStep'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type {
    PropertyDetailsFormData,
    AmenitiesFormData,
    CompletePropertyFormData
} from '@/lib/schemas/property'

const PropertyCreationFlow = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsFormData | null>(null)
    const [amenitiesData, setAmenitiesData] = useState<AmenitiesFormData | null>(null)

    // Simplified steps (excluding Gallery step to avoid FilePicker issues in Storybook)
    const steps = [
        { id: 1, name: 'Property Details', description: 'Basic information and location' },
        { id: 2, name: 'Amenities', description: 'Features and facilities' },
        { id: 3, name: 'Review', description: 'Review and submit' }
    ]

    const handlePropertyDetailsSubmit = (data: PropertyDetailsFormData) => {
        setPropertyDetails(data)
        setCurrentStep(2)
    }

    const handleAmenitiesSubmit = (data: AmenitiesFormData) => {
        setAmenitiesData(data)
        setCurrentStep(3)
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const getCompleteFormData = (): CompletePropertyFormData | null => {
        if (!propertyDetails) return null

        return {
            ...propertyDetails,
            // Mock empty image data for Storybook
            displayImage: undefined,
            model3dImages: [],
            floorPlanImages: [],
            aerialImages: [],
            amenities: amenitiesData?.amenities || [],
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Progress Indicator */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Property Creation Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {step.id}
                                </div>
                                <div className="ml-2">
                                    <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-900' : 'text-gray-600'
                                        }`}>
                                        {step.name}
                                    </div>
                                    <div className="text-xs text-gray-500">{step.description}</div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`ml-4 w-12 h-0.5 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-gray-600">
                        Step {currentStep} of {steps.length}: {steps[currentStep - 1].description}
                    </div>
                </CardContent>
            </Card>

            {/* Step Content */}
            <div className="mb-6">
                {currentStep === 1 && (
                    <PropertyDetailsStep
                        defaultValues={propertyDetails || undefined}
                        onSubmit={handlePropertyDetailsSubmit}
                        onNext={() => setCurrentStep(2)}
                    />
                )}
                {currentStep === 2 && (
                    <AmenitiesStep
                        defaultValues={amenitiesData || undefined}
                        onSubmit={handleAmenitiesSubmit}
                        onNext={() => setCurrentStep(3)}
                    />
                )}
                {currentStep === 3 && getCompleteFormData() && (
                    <ReviewStep formData={getCompleteFormData()!} />
                )}
            </div>

            {/* Navigation */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                        </Button>
                        {currentStep < steps.length ? (
                            <Button onClick={handleNext} disabled={!propertyDetails && currentStep > 1}>
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        ) : (
                            <Button onClick={() => alert('Property creation completed!')}>
                                Create Property
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const meta: Meta<typeof PropertyCreationFlow> = {
    title: 'Property Creation/Complete Flow',
    component: PropertyCreationFlow,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Complete property creation flow showing all steps with navigation and progress tracking. This demonstrates how all the individual step components work together in the full user journey.',
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive complete property creation flow. Navigate through all steps to see how the form data flows between components.',
            },
        },
    },
}
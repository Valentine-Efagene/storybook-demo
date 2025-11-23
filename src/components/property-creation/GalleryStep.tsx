import React from "react"
import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompletePropertyFormData } from "@/lib/schemas/property"
import { CustomFilePicker } from "@/components/form/CustomFilePicker"

interface GalleryStepProps {
    control: Control<CompletePropertyFormData>
    errors: FieldErrors<CompletePropertyFormData>
    watch: UseFormWatch<CompletePropertyFormData>
}

export function GalleryStep({
    control,
    errors,
    watch
}: GalleryStepProps) {
    const [fileErrors, setFileErrors] = React.useState<Record<string, string>>({})

    const handleFileError = (fieldName: string, error: string) => {
        setFileErrors(prev => ({ ...prev, [fieldName]: error }))
        // Clear error after 5 seconds
        setTimeout(() => {
            setFileErrors(prev => {
                const { [fieldName]: _, ...rest } = prev
                return rest
            })
        }, 5000)
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Gallery
                </h2>
            </div>
            {/* Display Image */}
            <Card>
                <CardHeader>
                    <CardTitle>Display Image *</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Controller
                        name="media"
                        control={control}
                        render={({ field }) => {
                            return <CustomFilePicker
                                files={field.value || []}
                                onFilesChange={field.onChange}
                                allowMultiple={true}
                                maxFiles={10}
                                maxFileSize={10}
                                allowedTypes={['image/*']}
                                label="Upload property media"
                                description="Upload multiple images showing different angles and details"
                                showPreview={true}
                                showFileSize={true}
                                accept="image/*"
                                onError={(error) => handleFileError('media', error)}
                            />
                        }}
                    />
                    {(errors.media || fileErrors.media) && (
                        <p className="text-sm text-red-600">
                            {errors.media?.message || fileErrors.media}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* 3D Model Images */}
            <Card>
                <CardHeader>
                    <CardTitle>3D Model Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Controller
                        name="model3dImages"
                        control={control}
                        render={({ field }) => (
                            <CustomFilePicker
                                files={field.value || []}
                                onFilesChange={field.onChange}
                                allowMultiple={true}
                                maxFiles={10}
                                maxFileSize={10}
                                allowedTypes={['image/*']}
                                label="Upload 3D model images"
                                description="Upload multiple images showing different angles and details"
                                showPreview={true}
                                showFileSize={true}
                                accept="image/*"
                                onError={(error) => handleFileError('model3dImages', error)}
                            />
                        )}
                    />
                    {(errors.model3dImages || fileErrors.model3dImages) && (
                        <p className="text-sm text-red-600">
                            {errors.model3dImages?.message || fileErrors.model3dImages}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Floor Plan Images */}
            <Card>
                <CardHeader>
                    <CardTitle>Floor Plan Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Controller
                        name="floorPlanImages"
                        control={control}
                        render={({ field }) => (
                            <CustomFilePicker
                                files={field.value || []}
                                onFilesChange={field.onChange}
                                allowMultiple={true}
                                maxFiles={5}
                                maxFileSize={10}
                                allowedTypes={['image/*']}
                                label="Upload floor plan images"
                                description="Upload floor plans and layout diagrams"
                                showPreview={true}
                                showFileSize={true}
                                accept="image/*"
                                onError={(error) => handleFileError('floorPlanImages', error)}
                            />
                        )}
                    />
                    {(errors.floorPlanImages || fileErrors.floorPlanImages) && (
                        <p className="text-sm text-red-600">
                            {errors.floorPlanImages?.message || fileErrors.floorPlanImages}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Aerial Images */}
            <Card>
                <CardHeader>
                    <CardTitle>Aerial Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Controller
                        name="aerialImages"
                        control={control}
                        render={({ field }) => (
                            <CustomFilePicker
                                files={field.value || []}
                                onFilesChange={field.onChange}
                                allowMultiple={true}
                                maxFiles={8}
                                maxFileSize={10}
                                allowedTypes={['image/*']}
                                label="Upload aerial images"
                                description="Upload aerial views and exterior shots"
                                showPreview={true}
                                showFileSize={true}
                                accept="image/*"
                                onError={(error) => handleFileError('aerialImages', error)}
                            />
                        )}
                    />
                    {(errors.aerialImages || fileErrors.aerialImages) && (
                        <p className="text-sm text-red-600">
                            {errors.aerialImages?.message || fileErrors.aerialImages}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
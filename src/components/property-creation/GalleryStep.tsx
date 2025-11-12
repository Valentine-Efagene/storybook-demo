import React from "react"
import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompletePropertyFormData } from "@/lib/schemas/property"
import FilePicker from "@/components/form/FilePicker/FilePicker"

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
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Display Image */}
            <Card>
                <CardHeader>
                    <CardTitle>Display Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Controller
                        name="displayImage"
                        control={control}
                        render={({ field }) => (
                            <FilePicker
                                allowMultiple={false}
                                acceptedFileTypes={['image/*']}
                                labelIdle='Drag & Drop display image or <span class="filepond--label-action">Browse</span>'
                                files={field.value ? [field.value] : []}
                                onupdatefiles={(fileItems: any) => {
                                    const files = fileItems.map((item: any) => item.file)
                                    field.onChange(files[0] || undefined)
                                }}
                            />
                        )}
                    />
                    {errors.displayImage && (
                        <p className="text-sm text-red-600">{errors.displayImage.message}</p>
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
                            <FilePicker
                                allowMultiple={true}
                                acceptedFileTypes={['image/*']}
                                labelIdle='Drag & Drop 3D model images or <span class="filepond--label-action">Browse</span>'
                                files={field.value || []}
                                onupdatefiles={(fileItems: any) => {
                                    const files = fileItems.map((item: any) => item.file)
                                    field.onChange(files)
                                }}
                            />
                        )}
                    />
                    {errors.model3dImages && (
                        <p className="text-sm text-red-600">{errors.model3dImages.message}</p>
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
                            <FilePicker
                                allowMultiple={true}
                                acceptedFileTypes={['image/*']}
                                labelIdle='Drag & Drop floor plan images or <span class="filepond--label-action">Browse</span>'
                                files={field.value || []}
                                onupdatefiles={(fileItems: any) => {
                                    const files = fileItems.map((item: any) => item.file)
                                    field.onChange(files)
                                }}
                            />
                        )}
                    />
                    {errors.floorPlanImages && (
                        <p className="text-sm text-red-600">{errors.floorPlanImages.message}</p>
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
                            <FilePicker
                                allowMultiple={true}
                                acceptedFileTypes={['image/*']}
                                labelIdle='Drag & Drop aerial images or <span class="filepond--label-action">Browse</span>'
                                files={field.value || []}
                                onupdatefiles={(fileItems: any) => {
                                    const files = fileItems.map((item: any) => item.file)
                                    field.onChange(files)
                                }}
                            />
                        )}
                    />
                    {errors.aerialImages && (
                        <p className="text-sm text-red-600">{errors.aerialImages.message}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
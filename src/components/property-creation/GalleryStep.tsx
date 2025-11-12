"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { gallerySchema, type GalleryFormData } from "@/lib/schemas/property"
import FilePicker from "@/components/form/FilePicker/FilePicker"

interface GalleryStepProps {
    defaultValues?: Partial<GalleryFormData>
    onSubmit: (data: GalleryFormData) => void
    onNext: () => void
}

export function GalleryStep({
    defaultValues,
    onSubmit,
    onNext
}: GalleryStepProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<GalleryFormData>({
        resolver: zodResolver(gallerySchema),
        defaultValues: {
            displayImage: undefined,
            model3dImages: [],
            floorPlanImages: [],
            aerialImages: [],
            ...defaultValues,
        },
    })

    // Watch form values for FilePicker files prop
    const displayImage = watch("displayImage")
    const model3dImages = watch("model3dImages")
    const floorPlanImages = watch("floorPlanImages")
    const aerialImages = watch("aerialImages")

    const handleFormSubmit = (data: GalleryFormData) => {
        onSubmit(data)
        onNext()
    }

    return (
        <div className="max-w-4xl space-y-8">
            <form id="gallery-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                {/* Display Image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Main Display Image</CardTitle>
                        <p className="text-sm text-gray-600">
                            Upload the primary image that will represent this property
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Controller
                            name="displayImage"
                            control={control}
                            render={({ field }) => (
                                <FilePicker
                                    allowMultiple={false}
                                    maxFiles={1}
                                    acceptedFileTypes={['image/*']}
                                    maxFileSize="10MB"
                                    labelIdle='Drag & Drop main display image or <span class="filepond--label-action">Browse</span>'
                                    files={displayImage ? [displayImage] : []}
                                    onupdatefiles={(fileItems) => {
                                        const file = fileItems[0]?.file || undefined
                                        field.onChange(file)
                                    }}
                                    imagePreviewHeight={200}
                                    imageCropAspectRatio="16:9"
                                    imageResizeTargetWidth={800}
                                    imageResizeTargetHeight={450}
                                    stylePanelLayout="compact circle"
                                />
                            )}
                        />
                        {errors.displayImage && (
                            <p className="text-sm text-destructive mt-2">{errors.displayImage.message}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Floor Plan Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Floor Plans</CardTitle>
                        <p className="text-sm text-gray-600">
                            Upload floor plan images showing the layout of the property
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Controller
                            name="floorPlanImages"
                            control={control}
                            render={({ field }) => (
                                <FilePicker
                                    allowMultiple={true}
                                    allowReorder={true}
                                    maxFiles={10}
                                    acceptedFileTypes={['image/*']}
                                    maxFileSize="10MB"
                                    labelIdle='Drag & Drop floor plan images or <span class="filepond--label-action">Browse</span>'
                                    files={floorPlanImages || []}
                                    onupdatefiles={(fileItems) => {
                                        const files = fileItems.map(fileItem => fileItem.file)
                                        field.onChange(files)
                                    }}
                                    imagePreviewHeight={150}
                                    imageCropAspectRatio="4:3"
                                    imageResizeTargetWidth={800}
                                    imageResizeTargetHeight={600}
                                    stylePanelLayout="compact circle"
                                />
                            )}
                        />
                        {errors.floorPlanImages && (
                            <p className="text-sm text-destructive mt-2">{errors.floorPlanImages.message}</p>
                        )}
                    </CardContent>
                </Card>

                {/* 3D Model Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>3D Model & Renderings</CardTitle>
                        <p className="text-sm text-gray-600">
                            Upload 3D model renders, virtual tours, or architectural renderings
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Controller
                            name="model3dImages"
                            control={control}
                            render={({ field }) => (
                                <FilePicker
                                    allowMultiple={true}
                                    allowReorder={true}
                                    maxFiles={15}
                                    acceptedFileTypes={['image/*']}
                                    maxFileSize="10MB"
                                    labelIdle='Drag & Drop 3D renders or <span class="filepond--label-action">Browse</span>'
                                    files={model3dImages || []}
                                    onupdatefiles={(fileItems) => {
                                        const files = fileItems.map(fileItem => fileItem.file)
                                        field.onChange(files)
                                    }}
                                    imagePreviewHeight={150}
                                    imageCropAspectRatio="16:9"
                                    imageResizeTargetWidth={1200}
                                    imageResizeTargetHeight={675}
                                    stylePanelLayout="compact circle"
                                />
                            )}
                        />
                        {errors.model3dImages && (
                            <p className="text-sm text-destructive mt-2">{errors.model3dImages.message}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Aerial Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aerial & Exterior Views</CardTitle>
                        <p className="text-sm text-gray-600">
                            Upload aerial photos, drone shots, or exterior views of the property
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Controller
                            name="aerialImages"
                            control={control}
                            render={({ field }) => (
                                <FilePicker
                                    allowMultiple={true}
                                    allowReorder={true}
                                    maxFiles={10}
                                    acceptedFileTypes={['image/*']}
                                    maxFileSize="10MB"
                                    labelIdle='Drag & Drop aerial images or <span class="filepond--label-action">Browse</span>'
                                    files={aerialImages || []}
                                    onupdatefiles={(fileItems) => {
                                        const files = fileItems.map(fileItem => fileItem.file)
                                        field.onChange(files)
                                    }}
                                    imagePreviewHeight={150}
                                    imageCropAspectRatio="16:9"
                                    imageResizeTargetWidth={1200}
                                    imageResizeTargetHeight={675}
                                    stylePanelLayout="compact circle"
                                />
                            )}
                        />
                        {errors.aerialImages && (
                            <p className="text-sm text-destructive mt-2">{errors.aerialImages.message}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Hidden submit button - form submission is handled by parent */}
                <Button type="submit" className="hidden">
                    Submit
                </Button>
            </form>
        </div>
    )
}
"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { gallerySchema, type GalleryFormData } from "@/lib/schemas/property"
import { useState } from "react"

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
    const [selectedFiles, setSelectedFiles] = useState<File[]>(defaultValues?.images || [])

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<GalleryFormData>({
        resolver: zodResolver(gallerySchema),
        defaultValues: {
            images: [],
            ...defaultValues,
        },
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        setSelectedFiles(files)
        setValue("images", files)
    }

    const handleFormSubmit = (data: GalleryFormData) => {
        onSubmit(data)
        onNext()
    }

    const removeFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index)
        setSelectedFiles(newFiles)
        setValue("images", newFiles)
    }

    return (
        <div className="max-w-4xl space-y-8">
            <form id="gallery-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Property Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* File Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                                <div className="space-y-4">
                                    <div className="text-gray-500">
                                        <svg className="mx-auto h-16 w-16" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Upload property images</h3>
                                        <p className="text-gray-600">Click to upload images or drag and drop</p>
                                        <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB each</p>
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload">
                                            <Button type="button" size="lg" asChild>
                                                <span>Choose Files</span>
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Selected Files Preview */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Selected Images ({selectedFiles.length})</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="relative group">
                                                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <div className="text-center p-2">
                                                        <svg className="h-8 w-8 text-gray-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-xs text-gray-600 truncate">{file.name}</p>
                                                        <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {errors.images && (
                                <p className="text-sm text-destructive">{errors.images.message}</p>
                            )}
                        </div>
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
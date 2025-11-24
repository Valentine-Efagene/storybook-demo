"use client"

import { Badge } from "@/components/ui/badge"
import type { CompletePropertyFormData } from "@/lib/schemas/property"
import HtmlContent from "../HtmlContent"
import PropertyHelper from "@/lib/helpers/PropertyHelper"
import ImageCarousel from "@/components/ImageCarousel"
import { useEffect, useState } from "react"
import FormatHelper from "@/lib/helpers/FormatHelper"
import {
    Bath,
    Bed,
    Check,
    HammerIcon,
    House,
    LucideProps,
    MapPin,
    Tag,
    FileImage,
} from "lucide-react"
import { PropertyCompletionStatus } from "@/types/property"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { createFilePreview } from "../form/CustomFilePicker/utils"
import StringHelper from "@/lib/helpers/StringHelper"

interface ReviewStepProps {
    formData: CompletePropertyFormData
}

export function ReviewStep({ formData }: ReviewStepProps) {
    const formatPrice = (price: number) => {
        return FormatHelper.nairaFormatter.format(price)
    }

    const finishingIcon: Record<PropertyCompletionStatus, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
        move_in_ready: House,
        under_construction: HammerIcon,
    }

    // Create stable preview URLs for File objects using useState and useEffect
    const [previewImages, setPreviewImages] = useState<Array<{ url: string }>>([])

    useEffect(() => {
        const createPreviewImages = async () => {
            // Clean up previous URLs before creating new ones
            previewImages.forEach(({ url }) => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url)
                }
            })

            const allImageFiles = PropertyHelper.getImagesFromFormData(formData)
            if (allImageFiles.length === 0) {
                setPreviewImages([])
                return
            }

            try {
                const imagePromises = allImageFiles.map(async (file) => ({
                    url: await createFilePreview(file)
                }))
                const images = await Promise.all(imagePromises)
                setPreviewImages(images)
            } catch (error) {
                console.error('Failed to create preview images:', error)
                setPreviewImages([])
            }
        }

        createPreviewImages()

        // Cleanup function for component unmount
        return () => {
            setPreviewImages(prev => {
                prev.forEach(({ url }) => {
                    if (url.startsWith('blob:')) {
                        URL.revokeObjectURL(url)
                    }
                })
                return []
            })
        }
    }, [formData.media, formData.floor_plans, formData.three_d_walkthroughs])

    const FinishingIconComponent = formData.completion_status
        ? finishingIcon[formData.completion_status] || House
        : House

    return (
        <div className="max-w-4xl mx-auto space-y-6 flex flex-col">
            {/* Header Section */}
            <div className="space-y-2 pb-6">
                <h1 className="text-3xl font-bold text-gray-900">Review Your Property Listing</h1>
                <p className="text-lg text-gray-600">
                    Please review all information below to ensure accuracy before submitting your property listing.
                </p>
            </div>

            {/* Image Carousel - Hero Section */}
            {previewImages.length > 0 && (
                <div className="p-4 border rounded-lg shadow-2xs">
                    <div className="relative">
                        <ImageCarousel
                            images={previewImages}
                            height={400}
                            width={600}
                        />
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2 text-white">
                                <FileImage className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {previewImages.length} Image{previewImages.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {/* Main Property Details */}
                <div className="space-y-6">
                    {/* Property Overview */}
                    <div className="p-6 border p-6 rounded-lg shadow-2xs text-sm">
                        <div className="space-y-4">
                            {/* Title and Address */}
                            {/* <div>
                                <h2 className="text-sm font-normal text-primary-text mb-2">
                                    {formData.title}
                                </h2>
                                <div className="flex items-start gap-2 text-secondary-text">
                                    <MapPin className="w-5 h-5 mt-0.5" />
                                    <address className="not-italic text-sm font-normal">
                                        {formData.location}<br />
                                        {formData.city}, {formData.state}
                                    </address>
                                </div>
                            </div> */}

                            <div className="flex items-center gap-2">
                                <span className="text-xl font-semibold text-primary-text">
                                    {formatPrice(formData.price)}
                                </span>
                            </div>

                            {/* Property Type and Status */}
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="px-3 py-1">
                                    {StringHelper.stripUnderscores(formData.type)}
                                </Badge>
                                {formData.completion_status && (
                                    <Badge
                                        variant={formData.completion_status === 'move_in_ready' ? 'default' : 'outline'}
                                        className="px-3 py-1"
                                    >
                                        {formData.completion_status === 'under_construction'
                                            ? 'Under Construction'
                                            : 'Move-in Ready'}
                                    </Badge>
                                )}
                            </div>
                            {/* Property Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {formData.bedrooms !== undefined && (
                                    <div className="border border-primary-border shadow-[0px_1px_2px_rgba(230,230,217,0.5)] rounded-md flex flex-col gap-4 p-4 items-start">
                                        <div className="flex items-center gap-2">
                                            <FinishingIconComponent className="w-6 h-6 text-brand-border" />
                                        </div>
                                        <div className="text-sm text-primary-text font-medium">{formData.completion_status}</div>
                                    </div>
                                )}

                                {formData.bathrooms !== undefined && (
                                    <div className="border border-primary-border shadow-[0px_1px_2px_rgba(230,230,217,0.5)] rounded-md flex flex-col gap-4 p-4 items-start">
                                        <div className="flex items-center gap-2">
                                            <Bath className="w-6 h-6 text-brand-border" />
                                        </div>
                                        <div className="text-sm text-primary-text font-medium">{formData.bathrooms} Baths</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Description */}
                    {formData.description && (
                        <div className="flex flex-col gap-2">
                            <h3 className="flex text-primary-text font-medium text-sm items-center gap-2">
                                Property Description
                            </h3>
                            <div className="prose max-w-none text-sm text-primary-text rounded-lg border p-4 shadow-2xs">
                                <HtmlContent htmlString={formData.description} />
                            </div>
                        </div>
                    )}

                    {/* Amenities */}
                    {formData.amenities && formData.amenities.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <h3 className="flex text-primary-text font-medium text-sm items-center gap-2">
                                Amenities
                            </h3>
                            <div className="flex flex-wrap gap-2 border rounded-lg p-4 shadow-2xs">
                                {formData.amenities.map((amenity) => (
                                    <Badge key={amenity} variant="outline">
                                        {amenity}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Plans */}
                    {formData.plans && formData.plans.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <h3 className="flex text-primary-text font-medium text-sm items-center gap-2">
                                <Tag className="w-5 h-5" />
                                Available Plans
                            </h3>
                            <div className="grid grid-cols-1 gap-2 border rounded-lg shadow-2xs">
                                {formData.plans.map((plan, index) => (
                                    <div key={index} className="flex items-center gap-2 p-3">
                                        <div className="p-1">
                                            <Check className="w-4 h-4 text-primary-text" />
                                        </div>
                                        <span className="font-medium text-gray-900">{plan}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
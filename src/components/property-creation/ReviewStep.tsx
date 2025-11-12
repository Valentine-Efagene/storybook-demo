"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CompletePropertyFormData } from "@/lib/schemas/property"
import HtmlContent from "../HtmlContent"
import PropertyHelper from "@/lib/helpers/PropertyHelper"
import ImageHelper from "@/lib/helpers/ImageHelper"
import ImageCarousel from "@/components/ImageCarousel"
import { useEffect, useState, useMemo, JSX } from "react"
import FormatHelper from "@/lib/helpers/FormatHelper"
import { Bath, Bed, Check, Hammer, HammerIcon, House, LucideProps } from "lucide-react"
import { PropertyFinishStatus } from "@/types/property"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface ReviewStepProps {
    formData: CompletePropertyFormData
}

export function ReviewStep({ formData }: ReviewStepProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }

    const finishingIcon: Record<PropertyFinishStatus, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
        semi_finished: HammerIcon,
        finished: House
    }

    const formatPriceType = (type: string) => {
        switch (type) {
            case 'sale':
                return 'For Sale'
            case 'rent':
                return 'For Rent'
            case 'lease':
                return 'For Lease'
            default:
                return type
        }
    }

    const formatPropertyType = (type: string) => {
        switch (type) {
            case 'apartment':
                return 'Apartment'
            case 'house':
                return 'House'
            case 'condo':
                return 'Condominium'
            case 'townhouse':
                return 'Townhouse'
            default:
                return type
        }
    }

    const formatStatus = (status: string) => {
        switch (status) {
            case 'available':
                return 'Available'
            case 'pending':
                return 'Pending'
            case 'sold':
                return 'Sold'
            case 'rented':
                return 'Rented'
            default:
                return status
        }
    }

    // Create stable preview URLs for File objects using useMemo
    const previewImages = useMemo(() => {
        const allImageFiles = PropertyHelper.getImagesFromFormData(formData)
        return allImageFiles.map(file => ({
            url: URL.createObjectURL(file)
        }))
    }, [formData.displayImage, formData.floorPlanImages, formData.model3dImages, formData.aerialImages])

    // Cleanup URLs when component unmounts or dependencies change
    useEffect(() => {
        return () => {
            previewImages.forEach(({ url }) => URL.revokeObjectURL(url))
        }
    }, [previewImages])

    const FinishingIconComponent = finishingIcon[formData.finishing_status ?? 'semi_finished']

    return (
        <div className="max-w-4xl space-y-8">
            {/* Image Carousel - First item */}
            {previewImages.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Property Images</CardTitle>
                        <p className="text-sm text-primary-text">
                            Preview of all uploaded images for your property listing.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ImageCarousel
                            images={previewImages}
                            height={300}
                            width={400}
                        />
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Review Property Details</CardTitle>
                    <p className="text-sm text-primary-text">
                        Please review all the information below before submitting your property listing.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {/* Basic Information */}
                        <div>
                            <h3 className="font-normal text-sm text-primary-text mb-4">{formData.title}</h3>
                            <address className="not-italic text-sm text-secondary-text">
                                {formData.address}<br />
                                {formData.city}, {formData.state}
                            </address>
                        </div>
                        <div className="font-semibold text-2xl text-primary-text">{FormatHelper.nairaFormatter.format(formData.price)}</div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="border rounded-md flex flex-col gap-4 p-4 items-start">
                                <div className="flex items-center gap-2">
                                    <FinishingIconComponent className="w-5 h-5 text-primary-text" />
                                </div>
                                <div className="text-sm text-primary-text">{formData.finishing_status}</div>
                            </div>
                            <div className="border rounded-md flex flex-col gap-4 p-4 items-start">
                                <div className="flex items-center gap-2">
                                    <Bed className="w-5 h-5 text-primary-text" />
                                </div>
                                <div className="text-sm text-primary-text">{formData.bedrooms} Beds</div>
                            </div>
                            <div className="border rounded-md flex flex-col gap-4 p-4 items-start">
                                <div className="flex items-center gap-2">
                                    <Bath className="w-5 h-5 text-primary-text" />
                                </div>
                                <div className="text-sm text-primary-text">{formData.bathrooms} Baths</div>
                            </div>
                        </div>
                        <div className="rounded-lg p-4">
                            {formData.amenities && formData.amenities.length > 0 && (
                                <div className="mt-4">
                                    <dt className="text-primary-text font-medium mb-2">Amenities:</dt>
                                    <dd className="text-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {formData.amenities.map((amenity) => (
                                                <Badge key={amenity} variant="outline">
                                                    {amenity}
                                                </Badge>
                                            ))}
                                        </div>
                                    </dd>
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-primary-text font-medium mb-2">Available Plans</div>
                            <div className="">
                                {formData.plans && formData.plans.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        {formData.plans.map((plan, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <Check className="w-4 h-4" />
                                                <div className="font-medium text-primary-text">{plan}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-primary-text">No plans available.</p>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            {formData.description && (
                                <div className="mt-4">
                                    <dt className="text-primary-text font-medium mb-2">Description</dt>
                                    <dd className="text-sm bg-white p-3 rounded border">
                                        <HtmlContent htmlString={formData.description} />
                                    </dd>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
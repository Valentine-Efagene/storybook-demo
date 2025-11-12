"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CompletePropertyFormData } from "@/lib/schemas/property"
import HtmlContent from "../HtmlContent"
import PropertyHelper from "@/lib/helpers/PropertyHelper"
import ImageHelper from "@/lib/helpers/ImageHelper"
import ImageCarousel from "@/components/ImageCarousel"
import { useEffect, useState, useMemo } from "react"

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

    return (
        <div className="max-w-4xl space-y-8">
            {/* Image Carousel - First item */}
            {previewImages.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Property Images</CardTitle>
                        <p className="text-sm text-gray-600">
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
                    <p className="text-sm text-gray-600">
                        Please review all the information below before submitting your property listing.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {/* Basic Information */}
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-4">Basic Information</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <dt className="text-gray-600 font-medium">Title:</dt>
                                        <dd className="mt-1">{formData.title || 'Not specified'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600 font-medium">Type:</dt>
                                        <dd className="mt-1">{formatPropertyType(formData.type) || 'Not specified'}</dd>
                                    </div>
                                    {formData.bedrooms && (
                                        <div>
                                            <dt className="text-gray-600 font-medium">Bedrooms:</dt>
                                            <dd className="mt-1">{formData.bedrooms}</dd>
                                        </div>
                                    )}
                                    {formData.bathrooms && (
                                        <div>
                                            <dt className="text-gray-600 font-medium">Bathrooms:</dt>
                                            <dd className="mt-1">{formData.bathrooms}</dd>
                                        </div>
                                    )}
                                    {formData.squareFeet && (
                                        <div>
                                            <dt className="text-gray-600 font-medium">Square Feet:</dt>
                                            <dd className="mt-1">{formData.squareFeet.toLocaleString()} sq ft</dd>
                                        </div>
                                    )}
                                    <div>
                                        <dt className="text-gray-600 font-medium">Status:</dt>
                                        <dd className="mt-1">
                                            <Badge variant="outline">
                                                {formatStatus(formData.status)}
                                            </Badge>
                                        </dd>
                                    </div>
                                </dl>

                                {formData.description && (
                                    <div className="mt-4">
                                        <dt className="text-gray-600 font-medium mb-2">Description:</dt>
                                        <dd className="text-sm bg-white p-3 rounded border">
                                            <HtmlContent htmlString={formData.description} />
                                        </dd>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-4">Location</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <address className="not-italic text-sm">
                                    {formData.address}<br />
                                    {formData.city}, {formData.state}
                                </address>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-4">Pricing</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatPrice(formData.price)}
                                    </span>
                                    <Badge variant="secondary">
                                        {formatPriceType(formData.priceType)}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-4">Images</h3>
                            <div className="space-y-4">
                                {/* Display Image */}
                                {formData.displayImage && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Main Display Image</h4>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="truncate">{formData.displayImage.name}</span>
                                            <span className="text-gray-500 ml-2">
                                                {(formData.displayImage.size / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Floor Plan Images */}
                                {formData.floorPlanImages && formData.floorPlanImages.length > 0 && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                                            Floor Plans ({formData.floorPlanImages.length})
                                        </h4>
                                        <div className="space-y-1">
                                            {formData.floorPlanImages.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between text-sm">
                                                    <span className="truncate">{file.name}</span>
                                                    <span className="text-gray-500 ml-2">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3D Model Images */}
                                {formData.model3dImages && formData.model3dImages.length > 0 && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                                            3D Models & Renderings ({formData.model3dImages.length})
                                        </h4>
                                        <div className="space-y-1">
                                            {formData.model3dImages.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between text-sm">
                                                    <span className="truncate">{file.name}</span>
                                                    <span className="text-gray-500 ml-2">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Aerial Images */}
                                {formData.aerialImages && formData.aerialImages.length > 0 && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                                            Aerial & Exterior Views ({formData.aerialImages.length})
                                        </h4>
                                        <div className="space-y-1">
                                            {formData.aerialImages.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between text-sm">
                                                    <span className="truncate">{file.name}</span>
                                                    <span className="text-gray-500 ml-2">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* No Images Message */}
                                {!formData.displayImage &&
                                    (!formData.floorPlanImages || formData.floorPlanImages.length === 0) &&
                                    (!formData.model3dImages || formData.model3dImages.length === 0) &&
                                    (!formData.aerialImages || formData.aerialImages.length === 0) && (
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-sm text-gray-600">No images uploaded</p>
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Amenities */}
                        {formData.amenities && formData.amenities.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                                    Amenities & Features
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex flex-wrap gap-2">
                                        {formData.amenities.map((amenity) => (
                                            <Badge key={amenity} variant="outline">
                                                {amenity}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
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
import {
    Bath,
    Bed,
    Check,
    Hammer,
    HammerIcon,
    House,
    LucideProps,
    MapPin,
    Square,
    Tag,
    FileImage,
    Calendar
} from "lucide-react"
import { PropertyFinishStatus } from "@/types/property"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface ReviewStepProps {
    formData: CompletePropertyFormData
}

export function ReviewStep({ formData }: ReviewStepProps) {
    const formatPrice = (price: number) => {
        if (formData.currency === 'USD') {
            return FormatHelper.dollarFormatter.format(price)
        } else {
            return FormatHelper.nairaFormatter.format(price)
        }
    }

    const finishingIcon: Record<PropertyFinishStatus, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
        semi_finished: HammerIcon,
        finished: House
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
        return allImageFiles.map((file) => ({
            url: URL.createObjectURL(file)
        }))
    }, [formData.displayImage, formData.floorPlanImages, formData.model3dImages, formData.aerialImages])

    // Cleanup URLs when component unmounts or dependencies change
    useEffect(() => {
        return () => {
            previewImages.forEach(({ url }) => {
                URL.revokeObjectURL(url)
            })
        }
    }, [previewImages])

    const FinishingIconComponent = finishingIcon[formData.finishing_status ?? 'semi_finished']

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-2 pb-6">
                <h1 className="text-3xl font-bold text-gray-900">Review Your Property Listing</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Please review all information below to ensure accuracy before submitting your property listing.
                </p>
            </div>

            {/* Image Carousel - Hero Section */}
            {previewImages.length > 0 && (
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
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
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Property Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Property Overview */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {/* Title and Address */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {formData.title}
                                    </h2>
                                    <div className="flex items-start gap-2 text-gray-600">
                                        <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                                        <address className="not-italic">
                                            {formData.address}<br />
                                            {formData.city}, {formData.state}
                                        </address>
                                    </div>
                                </div>

                                {/* Property Type and Status */}
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className="px-3 py-1">
                                        {formatPropertyType(formData.type)}
                                    </Badge>
                                    <Badge
                                        variant={formData.status === 'available' ? 'default' : 'outline'}
                                        className="px-3 py-1"
                                    >
                                        {formatStatus(formData.status)}
                                    </Badge>
                                </div>

                                {/* Property Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    {formData.bedrooms !== undefined && (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Bed className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500">Bedrooms</div>
                                                <div className="font-semibold text-gray-900">{formData.bedrooms}</div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.bathrooms !== undefined && (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <Bath className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500">Bathrooms</div>
                                                <div className="font-semibold text-gray-900">{formData.bathrooms}</div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.squareFeet !== undefined && (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Square className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500">Sq Feet</div>
                                                <div className="font-semibold text-gray-900">{formData.squareFeet?.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.finishing_status && (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <FinishingIconComponent className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500">Finish</div>
                                                <div className="font-semibold text-gray-900 capitalize">
                                                    {formData.finishing_status.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    {formData.description && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileImage className="w-5 h-5" />
                                    Property Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <HtmlContent htmlString={formData.description} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Amenities */}
                    {formData.amenities && formData.amenities.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Check className="w-5 h-5" />
                                    Amenities & Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {formData.amenities.map((amenity) => (
                                        <div key={amenity} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-gray-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Plans */}
                    {formData.plans && formData.plans.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="w-5 h-5" />
                                    Available Plans
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {formData.plans.map((plan, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                                            <div className="p-1 bg-blue-100 rounded">
                                                <Check className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">{plan}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar - Price and Actions */}
                <div className="space-y-6">
                    {/* Price Card */}
                    <Card className="sticky top-6">
                        <CardContent className="p-6">
                            <div className="text-center space-y-4">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">
                                        {formatPrice(formData.price)}
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="text-sm text-gray-600 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Property Type:</span>
                                            <span className="font-medium">{formatPropertyType(formData.type)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Status:</span>
                                            <span className="font-medium">{formatStatus(formData.status)}</span>
                                        </div>
                                        {formData.bedrooms !== undefined && (
                                            <div className="flex justify-between">
                                                <span>Bedrooms:</span>
                                                <span className="font-medium">{formData.bedrooms}</span>
                                            </div>
                                        )}
                                        {formData.bathrooms !== undefined && (
                                            <div className="flex justify-between">
                                                <span>Bathrooms:</span>
                                                <span className="font-medium">{formData.bathrooms}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Listing Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Images uploaded</span>
                                <span className="font-medium">{previewImages.length}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Amenities</span>
                                <span className="font-medium">{formData.amenities?.length || 0}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Plans</span>
                                <span className="font-medium">{formData.plans?.length || 0}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Description</span>
                                <span className="font-medium">{formData.description ? 'Added' : 'Not added'}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
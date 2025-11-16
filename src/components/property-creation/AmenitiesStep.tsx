"use client"

import { Control, FieldErrors, UseFormWatch, Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompletePropertyFormData } from "@/lib/schemas/property"
import { PillCheckboxGroup } from "@/components/form/PillCheckbox"

const amenitiesList: {
    category: string;
    amenities: string[]
}[] = [
        {
            category: 'Finishing',
            amenities: [
                'High-Quality Flooring (e.g., Porcelain Tiles, Laminate)',
                'Fitted Kitchen Cabinets',
                'Fitted Wardrobes in Bedrooms',
                'Quality Sanitary Wares & Fittings',
                'POP Ceilings',
            ]
        },
        {
            category: 'Technology',
            amenities: [
                'Smart Home Ready Wiring',
                'Pre-installed Air Conditioning Conduit/Piping',
                'Intercom/Video Doorbell System',
            ]
        },
        {
            category: 'Design',
            amenities: [
                'Large Windows for Natural Light',
                'Dedicated Laundry Area/Space',
                'Balcony/Private Terrace',
            ]
        },
        {
            category: 'Security & Safety',
            amenities: [
                'Controlled Access/Gate Pass System',
                'CCTV Surveillance',
                '24/7 Security (Manned Gate & Patrols)',
                'Perimeter Fencing',
            ]
        },
        {
            category: 'Utilities & Infrastructure',
            amenities: [
                'Guaranteed Water Supply (Borehole/Treatment Plant)',
                'Dedicated Power Supply (Generators/Inverters/Solar)',
                'Ample Parking Spaces',
                'Central Sewage/Waste Management System',
                'Paved Road Network',
                'Street Lighting',
            ]
        },
        {
            category: 'Recreation & Lifestyle',
            amenities: [
                'Children\'s Play Area / Park',
                'Clubhouse',
                'Swimming Pool',
                'Fitness Center / Gym',
                'Basketball/Tennis Court'
            ]
        },
        {
            category: 'Connectivity',
            amenities: [
                'Pre-wired Fiber Optic Internet (FTTH)'
            ],
        },
        {
            category: 'Title Documentation',
            amenities: [
                'C of O',
                'R of O',
                'Governor\'s Consent'
            ]
        },
    ]

interface AmenitiesStepProps {
    control: Control<CompletePropertyFormData>
    errors: FieldErrors<CompletePropertyFormData>
    watch: UseFormWatch<CompletePropertyFormData>
}

export function AmenitiesStep({
    control,
    errors,
    watch
}: AmenitiesStepProps) {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Amenities
                </h2>
            </div>
            <Card>
                <CardContent className="space-y-6">
                    <Controller
                        name="amenities"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-6">
                                {amenitiesList.map((group) =>
                                    <div key={group.category} className="space-y-2">
                                        <h3 className="text-sm font-normal text-gray-800">{group.category}</h3>
                                        <PillCheckboxGroup
                                            options={group.amenities}
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            size="sm"
                                            variant="outline"
                                            className="justify-start"
                                        />
                                    </div>
                                )}
                            </div>)}
                    />
                    {errors.amenities && (
                        <p className="text-sm text-red-600">{errors.amenities.message}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
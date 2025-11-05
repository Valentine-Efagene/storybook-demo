import React from 'react';
import { Button } from '@/components/ui/button';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export function ThreeVariantDemo() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">Three Custom Button Variants</h1>
                <p className="text-gray-600 max-w-2xl">
                    All three button variants implement exact CSS specifications with proper dimensions, colors, shadows, and border radius.
                </p>
            </div>

            {/* Primary Gradient Button */}
            <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold">Primary (Custom Gradient)</h2>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Button>
                            Primary Action
                        </Button>
                        <p className="text-xs text-gray-500">
                            Gradient: #049DC8 → #0082B5 | Shadow: rgba(8,140,193,0.32) | 400px wide
                        </p>
                    </div>
                    <div className="space-y-1">
                        <Button icon={<CheckIcon />}>
                            With Icon
                        </Button>
                        <p className="text-xs text-gray-500">
                            Icon support with proper spacing
                        </p>
                    </div>
                </div>
            </div>

            {/* Outline Button */}
            <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold">Secondary (Outline)</h2>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Button variant="outline" size="outline-lg">
                            Secondary Action
                        </Button>
                        <p className="text-xs text-gray-500">
                            Border: #026993 | Shadow: #B0D0FD | 82px wide
                        </p>
                    </div>
                    <div className="space-y-1">
                        <Button variant="outline" size="outline-lg" icon={<CheckIcon />}>
                            With Icon
                        </Button>
                        <p className="text-xs text-gray-500">
                            Blue border with light blue shadow
                        </p>
                    </div>
                </div>
            </div>

            {/* Subtle Button */}
            <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold">Tertiary (Subtle)</h2>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Button variant="subtle" size="subtle-lg">
                            Subtle Action
                        </Button>
                        <p className="text-xs text-gray-500">
                            Border: #DAE6E7 | Shadow: rgba(8,140,193,0.03) | 82px wide
                        </p>
                    </div>
                    <div className="space-y-1">
                        <Button variant="subtle" size="subtle-lg" icon={<CheckIcon />}>
                            With Icon
                        </Button>
                        <p className="text-xs text-gray-500">
                            Light gray border with minimal shadow
                        </p>
                    </div>
                </div>
            </div>

            {/* All Together */}
            <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold">All Three Together</h2>
                <div className="flex gap-4 items-center justify-center flex-wrap">
                    <Button>
                        Primary
                    </Button>
                    <Button variant="outline" size="outline-lg">
                        Secondary
                    </Button>
                    <Button variant="subtle" size="subtle-lg">
                        Subtle
                    </Button>
                </div>
                <p className="text-sm text-gray-600 max-w-lg mx-auto">
                    Perfect for action hierarchies: primary for main actions, outline for secondary actions, and subtle for tertiary actions.
                </p>
            </div>

            {/* State Variations */}
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-semibold text-center mb-6">All States</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <h3 className="font-medium text-center">Primary States</h3>
                        <div className="space-y-2">
                            <Button className="w-full">Normal</Button>
                            <Button className="w-full" disabled>Disabled</Button>
                            <Button className="w-full" loading>Loading</Button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-medium text-center">Outline States</h3>
                        <div className="space-y-2">
                            <Button variant="outline" size="outline-lg" className="w-full">Normal</Button>
                            <Button variant="outline" size="outline-lg" className="w-full" disabled>Disabled</Button>
                            <Button variant="outline" size="outline-lg" className="w-full" loading>Loading</Button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-medium text-center">Subtle States</h3>
                        <div className="space-y-2">
                            <Button variant="subtle" size="subtle-lg" className="w-full">Normal</Button>
                            <Button variant="subtle" size="subtle-lg" className="w-full" disabled>Disabled</Button>
                            <Button variant="subtle" size="subtle-lg" className="w-full" loading>Loading</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
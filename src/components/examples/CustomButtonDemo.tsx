import React from 'react';
import { Button } from '@/components/ui/button';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export function CustomButtonDemo() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">Custom Button Implementations</h1>
                <p className="text-gray-600">
                    Both buttons implement the exact CSS specifications provided
                </p>
            </div>

            {/* Primary Custom Button */}
            <div className="space-y-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">Primary Button (Custom Gradient)</h2>
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Background: linear-gradient(180deg, #049DC8 0%, #0082B5 100%)<br />
                        Shadow: 0px 2px 6px rgba(8, 140, 193, 0.32)<br />
                        Border-radius: 12px | Width: 400px | Height: 36px
                    </p>
                    <Button size="custom">
                        Custom Gradient Button
                    </Button>
                    <Button size="custom" icon={<CheckIcon />}>
                        With Icon
                    </Button>
                </div>
            </div>

            {/* Outline Button */}
            <div className="space-y-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">Outline Button (Custom Border)</h2>
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Background: #FFFFFF | Border: 1px solid #026993<br />
                        Shadow: 0px 1px 2px #B0D0FD<br />
                        Border-radius: 12px | Width: 82px | Height: 36px
                    </p>
                    <Button variant="outline" size="outline-lg">
                        Outline
                    </Button>
                    <Button variant="outline" size="outline-lg" icon={<CheckIcon />}>
                        <span className="sr-only">Check</span>
                    </Button>
                </div>
            </div>

            {/* Subtle Button */}
            <div className="space-y-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">Subtle Button (Minimal Style)</h2>
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Background: #FFFFFF | Border: 1px solid #DAE6E7<br />
                        Shadow: 0px 2px 2px rgba(8, 140, 193, 0.03)<br />
                        Border-radius: 12px | Width: 82px | Height: 36px
                    </p>
                    <Button variant="subtle" size="subtle-lg">
                        Subtle
                    </Button>
                    <Button variant="subtle" size="subtle-lg" icon={<CheckIcon />}>
                        <span className="sr-only">Check</span>
                    </Button>
                </div>
            </div>

            {/* Comparison */}
            <div className="space-y-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">Side by Side Comparison</h2>
                <div className="flex gap-4 items-center justify-center flex-wrap">
                    <Button size="custom">
                        Primary Action
                    </Button>
                    <Button variant="outline" size="outline-lg">
                        Secondary
                    </Button>
                    <Button variant="subtle" size="subtle-lg">
                        Subtle
                    </Button>
                </div>
            </div>

            {/* States Demo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="text-center space-y-4">
                    <h3 className="font-medium">Custom Gradient States</h3>
                    <div className="space-y-2">
                        <Button size="custom">Normal</Button>
                        <Button size="custom" disabled>Disabled</Button>
                        <Button size="custom" loading>Loading</Button>
                    </div>
                </div>
                <div className="text-center space-y-4">
                    <h3 className="font-medium">Outline States</h3>
                    <div className="space-y-2">
                        <Button variant="outline" size="outline-lg">Normal</Button>
                        <Button variant="outline" size="outline-lg" disabled>Disabled</Button>
                        <Button variant="outline" size="outline-lg" loading>Loading</Button>
                    </div>
                </div>
                <div className="text-center space-y-4">
                    <h3 className="font-medium">Subtle States</h3>
                    <div className="space-y-2">
                        <Button variant="subtle" size="subtle-lg">Normal</Button>
                        <Button variant="subtle" size="subtle-lg" disabled>Disabled</Button>
                        <Button variant="subtle" size="subtle-lg" loading>Loading</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
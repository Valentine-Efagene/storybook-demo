import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Simplified GalleryStep component for Storybook (without FilePicker dependencies)
const StorybookGalleryStep = ({ onSubmit, onNext }: any) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit?.({
            displayImage: new File([''], 'display.jpg'),
            floorPlanImages: [],
            model3dImages: [],
            aerialImages: [],
        })
        onNext?.()
    }

    return (
        <div className="max-w-4xl space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Display Image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Main Display Image</CardTitle>
                        <p className="text-sm text-gray-600">
                            Upload the primary image that will represent this property
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div className="space-y-4">
                                <div className="text-gray-500">
                                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Display Image Upload</h3>
                                    <p className="text-gray-600">Single file upload (mocked in Storybook)</p>
                                </div>
                            </div>
                        </div>
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
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div className="space-y-4">
                                <div className="text-gray-500">
                                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Floor Plan Images</h3>
                                    <p className="text-gray-600">Multiple file upload (mocked in Storybook)</p>
                                </div>
                            </div>
                        </div>
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
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div className="space-y-4">
                                <div className="text-gray-500">
                                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">3D Model Images</h3>
                                    <p className="text-gray-600">Multiple file upload (mocked in Storybook)</p>
                                </div>
                            </div>
                        </div>
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
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div className="space-y-4">
                                <div className="text-gray-500">
                                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Aerial Images</h3>
                                    <p className="text-gray-600">Multiple file upload (mocked in Storybook)</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Hidden submit button */}
                <Button type="submit" className="hidden">
                    Submit
                </Button>
            </form>
        </div>
    )
}

const meta: Meta<typeof StorybookGalleryStep> = {
    title: 'Property Creation/GalleryStep',
    component: StorybookGalleryStep,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Gallery step for property creation showing the layout and structure of file upload sections. This is a Storybook-optimized version that shows the UI without FilePond dependencies.',
            },
        },
    },
    argTypes: {
        onSubmit: { action: 'form submitted' },
        onNext: { action: 'next clicked' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        onSubmit: fn(),
        onNext: fn(),
    },
}

export const Layout: Story = {
    args: {
        onSubmit: fn(),
        onNext: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows the visual layout and structure of all four image upload sections.',
            },
        },
    },
}
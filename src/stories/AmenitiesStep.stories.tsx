import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { AmenitiesStep } from '@/components/property-creation/AmenitiesStep'

const meta: Meta<typeof AmenitiesStep> = {
    title: 'Property Creation/AmenitiesStep',
    component: AmenitiesStep,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Third step of property creation form for selecting available amenities and features of the property.',
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

export const WithSelectedAmenities: Story = {
    args: {
        defaultValues: {
            amenities: ['Parking', 'Pool', 'Gym', 'Air Conditioning', 'Security'],
        },
        onSubmit: fn(),
        onNext: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'Amenities step with several amenities pre-selected to show the selection state and summary display.',
            },
        },
    },
}

export const LuxuryProperty: Story = {
    args: {
        defaultValues: {
            amenities: [
                'Parking',
                'Pool',
                'Gym',
                'Air Conditioning',
                'Elevator',
                'Security',
                'Storage',
                'Rooftop Deck'
            ],
        },
        onSubmit: fn(),
        onNext: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'Example of a luxury property with premium amenities selected.',
            },
        },
    },
}

export const BasicProperty: Story = {
    args: {
        defaultValues: {
            amenities: ['Parking', 'Laundry'],
        },
        onSubmit: fn(),
        onNext: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'Example of a basic property with minimal amenities.',
            },
        },
    },
}

export const EmptyState: Story = {
    args: {
        defaultValues: {
            amenities: [],
        },
        onSubmit: fn(),
        onNext: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'Amenities step with no amenities selected, showing the empty state.',
            },
        },
    },
}
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PropertyDetailsStep } from '@/components/property-creation/PropertyDetailsStep'

const meta: Meta<typeof PropertyDetailsStep> = {
    title: 'Property Creation/PropertyDetailsStep',
    component: PropertyDetailsStep,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'First step of property creation form for entering basic property information, location, and pricing details.',
            },
        },
    },
    argTypes: {
        onSubmit: { action: 'form submitted' },
        onNext: { action: 'next clicked' },
        onValidationChange: { action: 'validation changed' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        onSubmit: fn(),
        onNext: fn(),
        onValidationChange: fn(),
    },
}

export const WithDefaultValues: Story = {
    args: {
        defaultValues: {
            title: 'Beautiful Downtown Apartment',
            type: 'apartment',
            description: 'A stunning 2-bedroom apartment in the heart of downtown with modern amenities and city views.',
            bedrooms: 2,
            bathrooms: 2,
            squareFeet: 1200,
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            price: 450000,
            priceType: 'sale',
            status: 'available',
        },
        onSubmit: fn(),
        onNext: fn(),
        onValidationChange: fn(),
    },
}

export const RentalProperty: Story = {
    args: {
        defaultValues: {
            title: 'Modern Rental House',
            type: 'house',
            description: 'Spacious family home with backyard and garage.',
            bedrooms: 3,
            bathrooms: 2,
            squareFeet: 1800,
            address: '456 Oak Avenue',
            city: 'Austin',
            state: 'TX',
            price: 2500,
            priceType: 'rent',
            status: 'available',
        },
        onSubmit: fn(),
        onNext: fn(),
        onValidationChange: fn(),
    },
}

export const PendingCondo: Story = {
    args: {
        defaultValues: {
            title: 'Luxury Condo with Ocean View',
            type: 'condo',
            description: 'Premium condo with breathtaking ocean views and resort-style amenities.',
            bedrooms: 2,
            bathrooms: 2,
            squareFeet: 1400,
            address: '789 Beach Boulevard',
            city: 'Miami',
            state: 'FL',
            price: 750000,
            priceType: 'sale',
            status: 'pending',
        },
        onSubmit: fn(),
        onNext: fn(),
        onValidationChange: fn(),
    },
}
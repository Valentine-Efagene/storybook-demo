import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ReviewStep } from '@/components/property-creation/ReviewStep'
import type { CompletePropertyFormData } from '@/lib/schemas/property'

// Create mock files for image previews
const createMockFile = (name: string, size: number = 1024 * 1024): File => {
    const blob = new Blob(['mock image content'], { type: 'image/jpeg' })
    Object.defineProperty(blob, 'name', { value: name })
    Object.defineProperty(blob, 'size', { value: size })
    return blob as File
}

const meta: Meta<typeof ReviewStep> = {
    title: 'Property Creation/ReviewStep',
    component: ReviewStep,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Final step of property creation form that displays a comprehensive review of all entered property information before submission.',
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const completeFormData: CompletePropertyFormData = {
    title: 'Beautiful Downtown Apartment',
    type: 'apartment',
    description: 'A stunning 2-bedroom apartment in the heart of downtown with modern amenities, floor-to-ceiling windows, and breathtaking city views. This unit features hardwood floors throughout, a gourmet kitchen with stainless steel appliances, and an open-concept living space perfect for entertaining.',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    address: '123 Main Street, Unit 15B',
    city: 'New York',
    state: 'NY',
    price: 450000,
    priceType: 'sale',
    status: 'available',
    displayImage: createMockFile('main-living-room.jpg', 2.5 * 1024 * 1024),
    floorPlanImages: [
        createMockFile('floor-plan-main.jpg', 1.8 * 1024 * 1024),
        createMockFile('floor-plan-dimensions.jpg', 1.6 * 1024 * 1024),
    ],
    model3dImages: [
        createMockFile('3d-render-living.jpg', 3.2 * 1024 * 1024),
        createMockFile('3d-render-kitchen.jpg', 2.8 * 1024 * 1024),
        createMockFile('3d-render-bedroom.jpg', 2.4 * 1024 * 1024),
    ],
    aerialImages: [
        createMockFile('building-exterior.jpg', 4.1 * 1024 * 1024),
        createMockFile('neighborhood-aerial.jpg', 3.8 * 1024 * 1024),
    ],
    amenities: ['Parking', 'Pool', 'Gym', 'Air Conditioning', 'Elevator', 'Security', 'Rooftop Deck'],
}

export const Default: Story = {
    args: {
        formData: completeFormData,
    },
}

export const RentalProperty: Story = {
    args: {
        formData: {
            title: 'Modern Rental House',
            type: 'house',
            description: 'Spacious 3-bedroom family home with backyard, garage, and modern kitchen. Located in a quiet neighborhood with great schools nearby.',
            bedrooms: 3,
            bathrooms: 2,
            squareFeet: 1800,
            address: '456 Oak Avenue',
            city: 'Austin',
            state: 'TX',
            price: 2500,
            priceType: 'rent',
            status: 'available',
            displayImage: createMockFile('house-front.jpg', 2.1 * 1024 * 1024),
            floorPlanImages: [
                createMockFile('house-floor-plan.jpg', 1.5 * 1024 * 1024),
            ],
            model3dImages: [],
            aerialImages: [
                createMockFile('house-aerial.jpg', 3.5 * 1024 * 1024),
            ],
            amenities: ['Parking', 'Garden', 'Laundry', 'Storage'],
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Review step for a rental house with basic amenities and fewer images.',
            },
        },
    },
}

export const LuxuryCondo: Story = {
    args: {
        formData: {
            title: 'Luxury Condo with Ocean View',
            type: 'condo',
            description: 'Premium oceanfront condo with breathtaking views, resort-style amenities, and high-end finishes throughout.',
            bedrooms: 2,
            bathrooms: 2,
            squareFeet: 1400,
            address: '789 Beach Boulevard, Penthouse 1',
            city: 'Miami',
            state: 'FL',
            price: 750000,
            priceType: 'sale',
            status: 'pending',
            displayImage: createMockFile('ocean-view-living.jpg', 4.2 * 1024 * 1024),
            floorPlanImages: [
                createMockFile('penthouse-floor-plan.jpg', 2.2 * 1024 * 1024),
                createMockFile('balcony-layout.jpg', 1.9 * 1024 * 1024),
            ],
            model3dImages: [
                createMockFile('3d-ocean-view.jpg', 5.1 * 1024 * 1024),
                createMockFile('3d-master-suite.jpg', 4.8 * 1024 * 1024),
                createMockFile('3d-kitchen-luxury.jpg', 4.3 * 1024 * 1024),
                createMockFile('3d-balcony-sunset.jpg', 6.2 * 1024 * 1024),
            ],
            aerialImages: [
                createMockFile('building-beachfront.jpg', 7.1 * 1024 * 1024),
                createMockFile('beach-aerial-view.jpg', 6.8 * 1024 * 1024),
                createMockFile('sunset-aerial.jpg', 5.9 * 1024 * 1024),
            ],
            amenities: [
                'Parking',
                'Pool',
                'Gym',
                'Balcony',
                'Air Conditioning',
                'Elevator',
                'Security',
                'Storage',
                'Playground',
                'Rooftop Deck'
            ],
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Review step for a luxury condo with extensive amenities and comprehensive image gallery.',
            },
        },
    },
}

export const MinimalProperty: Story = {
    args: {
        formData: {
            title: 'Cozy Studio Apartment',
            type: 'apartment',
            description: 'Compact and efficient studio in downtown area.',
            bedrooms: 0,
            bathrooms: 1,
            squareFeet: 450,
            address: '321 City Street, #3A',
            city: 'Portland',
            state: 'OR',
            price: 180000,
            priceType: 'sale',
            status: 'available',
            displayImage: createMockFile('studio-main.jpg', 1.2 * 1024 * 1024),
            floorPlanImages: [],
            model3dImages: [],
            aerialImages: [],
            amenities: ['Laundry'],
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Review step for a minimal property with basic information and single image.',
            },
        },
    },
}
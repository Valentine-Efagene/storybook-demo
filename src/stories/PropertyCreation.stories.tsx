import type { Meta } from '@storybook/nextjs-vite'

const meta: Meta = {
    title: 'Property Creation',
    parameters: {
        docs: {
            description: {
                component: `
# Property Creation Components

This section contains all the components used in the property creation flow. Each step is designed to work independently while maintaining consistent state management through React Hook Form.

## Components Overview

- **PropertyDetailsStep**: Collects basic property information including title, type, description, location, and pricing
- **GalleryStep**: Handles image uploads with separate categories for display image, floor plans, 3D models, and aerial views with our custom file picker
- **AmenitiesStep**: Manages selection of property amenities and features
- **ReviewStep**: Displays a comprehensive summary of all entered data before submission
- **Complete Flow**: Shows how PropertyDetailsStep, AmenitiesStep, and ReviewStep work together (simplified for Storybook)

## Key Features

- ✅ **Consistent State Management**: All components use React Hook Form exclusively, no additional React state
- ✅ **Controller Pattern**: All form fields use the Controller component for better flexibility
- ✅ **Real-time Validation**: Zod schemas provide instant feedback and type safety
- ✅ **File Upload Integration**: Custom file picker components with drag & drop, image preview, and validation
- ✅ **Responsive Design**: All components work seamlessly across different screen sizes
- ✅ **TypeScript Support**: Full type safety with proper TypeScript interfaces

## Usage Pattern

Each step component follows the same pattern:
1. Receives \`defaultValues\` for pre-populating data
2. Uses \`onSubmit\` callback to pass validated data to parent
3. Calls \`onNext\` to trigger navigation to the next step
4. Manages its own form state with React Hook Form and Controller components

## Architecture Benefits

- **Single Source of Truth**: Form state is managed exclusively by React Hook Form
- **Performance Optimized**: No unnecessary re-renders from duplicate state management
- **Maintainable**: Clear separation of concerns and consistent patterns
- **Scalable**: Easy to add new fields or modify existing ones
        `,
            },
        },
    },
}

export default meta

// This is just a documentation page, no actual stories
export const Documentation = () => null
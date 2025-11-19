import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PropertyActionsExample } from '@/components/examples/PropertyActionsExample'
import { AbilityProvider } from '@/lib/ability/AbilityContext'
import { defineAbilityFor } from '@/lib/ability/ability.factory'

const meta: Meta<typeof PropertyActionsExample> = {
    title: 'Examples/PropertyActionsExample',
    component: PropertyActionsExample,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        property: {
            control: 'object',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample property data
const sampleProperty = {
    id: 1,
    title: 'Beautiful Downtown Apartment',
    poster_id: 123,
    status: 'available' as const,
    __type: 'Property' as const,
}

const allocatedProperty = {
    id: 2,
    title: 'Luxury Villa',
    poster_id: 456,
    status: 'allocated' as const,
    __type: 'Property' as const,
}

// Story wrapper that provides AbilityProvider context
const StoryWrapper = ({ user, children }: { user: any; children: React.ReactNode }) => {
    const ability = defineAbilityFor(user)
    return (
        <AbilityProvider user={user}>
            <div className="w-96">
                {children}
            </div>
        </AbilityProvider>
    )
}

export const AdminUser: Story = {
    args: {
        property: sampleProperty,
    },
    render: ({ property }) => (
        <StoryWrapper user={{ id: 999, roles: ['admin'] }}>
            <PropertyActionsExample property={property || sampleProperty} />
        </StoryWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Admin user can see all actions (edit and delete) for any property.',
            },
        },
    },
}

export const PropertyOwner: Story = {
    args: {
        property: sampleProperty,
    },
    render: ({ property }) => (
        <StoryWrapper user={{ id: 123, roles: ['user'] }}>
            <PropertyActionsExample property={property || sampleProperty} />
        </StoryWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Property owner (poster_id matches user id) can edit their own property.',
            },
        },
    },
}

export const RegularUser: Story = {
    args: {
        property: sampleProperty,
    },
    render: ({ property }) => (
        <StoryWrapper user={{ id: 789, roles: ['user'] }}>
            <PropertyActionsExample property={property || sampleProperty} />
        </StoryWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Regular user can only view properties they don\'t own.',
            },
        },
    },
}

export const GuestUser: Story = {
    args: {
        property: sampleProperty,
    },
    render: ({ property }) => (
        <StoryWrapper user={{ id: 0, roles: [] }}>
            <PropertyActionsExample property={property || sampleProperty} />
        </StoryWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Guest user (no roles) can only view properties.',
            },
        },
    },
}

export const AllocatedPropertyAdmin: Story = {
    args: {
        property: allocatedProperty,
    },
    render: ({ property }) => (
        <StoryWrapper user={{ id: 999, roles: ['admin'] }}>
            <PropertyActionsExample property={property || allocatedProperty} />
        </StoryWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Even admin users cannot delete allocated properties (global rule).',
            },
        },
    },
}

export const AllocatedPropertyOwner: Story = {
    args: {
        property: allocatedProperty,
    },
    render: ({ property }) => (
        <StoryWrapper user={{ id: 456, roles: ['user'] }}>
            <PropertyActionsExample property={property || allocatedProperty} />
        </StoryWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Property owner can edit but not delete allocated properties.',
            },
        },
    },
}

export const NoAccessUser: Story = {
    args: {
        property: sampleProperty,
    },
    render: ({ property }) => (
        <StoryWrapper user={null}>
            <PropertyActionsExample property={property || sampleProperty} />
        </StoryWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'User with no valid session gets a "no access" message.',
            },
        },
    },
}
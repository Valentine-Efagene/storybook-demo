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
    render: () => (
        <StoryWrapper user={{ id: 1, roles: ['admin'] }}>
            <PropertyActionsExample property={sampleProperty} />
        </StoryWrapper>
    ),
}

export const SalesUser: Story = {
    render: () => (
        <StoryWrapper user={{ id: 2, roles: ['sales'] }}>
            <PropertyActionsExample property={sampleProperty} />
        </StoryWrapper>
    ),
}

export const SupportUser: Story = {
    render: () => (
        <StoryWrapper user={{ id: 3, roles: ['support'] }}>
            <PropertyActionsExample property={sampleProperty} />
        </StoryWrapper>
    ),
}

export const FinanceUser: Story = {
    render: () => (
        <StoryWrapper user={{ id: 4, roles: ['finance'] }}>
            <PropertyActionsExample property={sampleProperty} />
        </StoryWrapper>
    ),
}

export const MortgageOperator: Story = {
    render: () => (
        <StoryWrapper user={{ id: 5, roles: ['mortgage_operator'] }}>
            <PropertyActionsExample property={sampleProperty} />
        </StoryWrapper>
    ),
}

export const DisplayUser: Story = {
    render: () => (
        <StoryWrapper user={{ id: 6, roles: ['user'] }}>
            <PropertyActionsExample property={sampleProperty} />
        </StoryWrapper>
    ),
}

export const GuestUserNoAccess: Story = {
    render: () => (
        <StoryWrapper user={{ id: 0, roles: [] }}>
            <PropertyActionsExample property={sampleProperty} />
        </StoryWrapper>
    ),
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
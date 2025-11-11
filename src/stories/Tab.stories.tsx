import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import Tab, { PropertyStatusTab } from '../components/Tab'

const meta: Meta<typeof Tab> = {
    title: 'Components/Tab',
    component: Tab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: { type: 'radio' },
            options: ['default', 'outline', 'pills'],
        },
        showCounts: {
            control: { type: 'boolean' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Template for interactive stories
function TabTemplate(args: any) {
    const [value, setValue] = useState(args.value || args.items[0]?.value || 'all')

    return (
        <div className="w-full max-w-md">
            <Tab {...args} value={value} onValueChange={setValue} />
            <p className="mt-4 text-sm text-muted-foreground">
                Selected: <strong>{value}</strong>
            </p>
        </div>
    )
}

function PropertyStatusTabTemplate(args: any) {
    const [value, setValue] = useState('all')

    return (
        <div className="w-full max-w-lg">
            <PropertyStatusTab {...args} value={value} onValueChange={setValue} />
            <p className="mt-4 text-sm text-muted-foreground">
                Selected Status: <strong>{value}</strong>
            </p>
        </div>
    )
}

// Basic Tab Stories
export const Default: Story = {
    render: TabTemplate,
    args: {
        items: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
        ],
    },
}

export const WithCounts: Story = {
    render: TabTemplate,
    args: {
        items: [
            { value: 'all', label: 'All', count: 124 },
            { value: 'active', label: 'Active', count: 89 },
            { value: 'inactive', label: 'Inactive', count: 35 },
            { value: 'draft', label: 'Draft', count: 12 },
        ],
        showCounts: true,
    },
}

export const SmallSize: Story = {
    render: TabTemplate,
    args: {
        items: [
            { value: 'today', label: 'Today', count: 23 },
            { value: 'week', label: 'This Week', count: 156 },
            { value: 'month', label: 'This Month', count: 892 },
        ],
        size: 'sm',
        showCounts: true,
    },
}

export const LargeSize: Story = {
    render: TabTemplate,
    args: {
        items: [
            { value: 'overview', label: 'Overview' },
            { value: 'analytics', label: 'Analytics' },
            { value: 'reports', label: 'Reports' },
        ],
        size: 'lg',
    },
}

export const OutlineVariant: Story = {
    render: TabTemplate,
    args: {
        items: [
            { value: 'pending', label: 'Pending', count: 8 },
            { value: 'approved', label: 'Approved', count: 45 },
            { value: 'rejected', label: 'Rejected', count: 3 },
        ],
        variant: 'outline',
        showCounts: true,
    },
}

export const PillsVariant: Story = {
    render: TabTemplate,
    args: {
        items: [
            { value: 'design', label: 'Design' },
            { value: 'development', label: 'Development' },
            { value: 'testing', label: 'Testing' },
            { value: 'deployment', label: 'Deployment' },
        ],
        variant: 'pills',
    },
}

export const WithDisabledTab: Story = {
    render: TabTemplate,
    args: {
        items: [
            { value: 'published', label: 'Published', count: 42 },
            { value: 'draft', label: 'Draft', count: 7 },
            { value: 'archived', label: 'Archived', count: 15, disabled: true },
        ],
        showCounts: true,
    },
}

// Property Status Specific Stories
export const PropertyStatus: Story = {
    render: PropertyStatusTabTemplate,
    args: {
    },
}

export const PropertyStatusNoCounts: Story = {
    render: PropertyStatusTabTemplate,
    args: {},
}

// Usage Examples
export const UsageExample: Story = {
    render: () => {
        const [activeTab, setActiveTab] = useState('available')

        return (
            <div className="w-full space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Property Filter Example</h3>
                    <PropertyStatusTab
                        value={activeTab}
                        onValueChange={setActiveTab}
                        counts={{
                            all: 156,
                            available: 89,
                            rented: 52,
                            maintenance: 12,
                            draft: 3,
                        }}
                    />
                </div>

                <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm">
                        Showing properties with status: <strong>{activeTab}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        This would filter your properties list based on the selected status.
                    </p>
                </div>
            </div>
        )
    },
}
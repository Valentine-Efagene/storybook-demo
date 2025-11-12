import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { CardCheckbox, CardCheckboxGroup, Option } from '@/components/form/CardCheckbox'

const meta: Meta<typeof CardCheckbox> = {
    title: 'Form/Card Checkbox',
    component: CardCheckbox,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the card is selected'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the card is disabled'
        }
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample plans for stories
const samplePlans: Option[] = [
    {
        id: 'basic',
        name: 'Basic Plan',
        description: 'Perfect for getting started with essential features and functionality.',
    },
    {
        id: 'premium',
        name: 'Premium Plan',
        description: 'Enhanced features and priority support for growing businesses.',
    },
    {
        id: 'enterprise',
        name: 'Enterprise Plan',
        description: 'Complete solution with unlimited features and dedicated support.',
    }
]

const freePlan: Option = {
    id: 'free',
    name: 'Free Plan',
    description: 'Get started at no cost with basic features to explore our platform.',
}

// Single card examples
export const Default: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(args.checked ?? false)

        return (
            <div className="max-w-md">
                <CardCheckbox
                    {...args}
                    plan={samplePlans[0]}
                    checked={checked}
                    onCheckedChange={setChecked}
                />
            </div>
        )
    }
}

export const Checked: Story = {
    args: {
        checked: true,
    },
    render: (args) => {
        const [checked, setChecked] = useState(args.checked ?? true)

        return (
            <div className="max-w-md">
                <CardCheckbox
                    {...args}
                    plan={samplePlans[1]}
                    checked={checked}
                    onCheckedChange={setChecked}
                />
            </div>
        )
    }
}

export const Recommended: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(args.checked ?? false)

        return (
            <div className="max-w-md">
                <CardCheckbox
                    {...args}
                    plan={samplePlans[1]} // Premium plan has recommended: true
                    checked={checked}
                    onCheckedChange={setChecked}
                />
            </div>
        )
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => {
        return (
            <div className="max-w-md">
                <CardCheckbox
                    {...args}
                    plan={samplePlans[0]}
                    checked={false}
                    onCheckedChange={() => { }}
                />
            </div>
        )
    }
}

export const FreePlan: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(args.checked ?? false)

        return (
            <div className="max-w-md">
                <CardCheckbox
                    {...args}
                    plan={freePlan}
                    checked={checked}
                    onCheckedChange={setChecked}
                />
            </div>
        )
    }
}

// Group examples
export const PlanSelection: Story = {
    render: () => {
        const [selectedPlans, setSelectedPlans] = useState<string[]>(['premium'])

        return (
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Choose Your Plan</h3>
                    <p className="text-gray-600 text-sm mb-6">
                        Select the plan that best fits your needs. You can upgrade or downgrade at any time.
                    </p>

                    <CardCheckboxGroup
                        options={samplePlans}
                        value={selectedPlans}
                        onChange={setSelectedPlans}
                        allowMultiple={false}
                    />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Selected Plan:</h4>
                    <p className="text-sm text-gray-600">
                        {selectedPlans.length > 0
                            ? samplePlans.find(p => p.id === selectedPlans[0])?.name || 'Unknown'
                            : 'None selected'
                        }
                    </p>
                </div>
            </div>
        )
    }
}

export const MultipleSelection: Story = {
    render: () => {
        const [selectedPlans, setSelectedPlans] = useState<string[]>(['basic', 'premium'])

        return (
            <div className="space-y-6 max-w-5xl">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Multiple Plans</h3>
                    <p className="text-gray-600 text-sm mb-6">
                        You can select multiple plans to combine features and benefits.
                    </p>

                    <CardCheckboxGroup
                        options={samplePlans}
                        value={selectedPlans}
                        onChange={setSelectedPlans}
                        allowMultiple={true}
                    />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Selected Plans:</h4>
                    <p className="text-sm text-gray-600">
                        {selectedPlans.length > 0
                            ? selectedPlans.map(id =>
                                samplePlans.find(p => p.id === id)?.name
                            ).filter(Boolean).join(', ')
                            : 'None selected'
                        }
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Total: {selectedPlans.length} plan(s) selected
                    </p>
                </div>
            </div>
        )
    }
}

export const PropertyListingPlans: Story = {
    render: () => {
        const [selectedPlans, setSelectedPlans] = useState<string[]>([])

        const propertyPlans: Option[] = [
            {
                id: 'basic-listing',
                name: 'Basic Listing',
                description: 'Get your property listed with essential features for maximum visibility.',
            },
            {
                id: 'premium-listing',
                name: 'Premium Listing',
                description: 'Stand out from the competition with enhanced features and priority placement.',
            },
            {
                id: 'professional',
                name: 'Professional Package',
                description: 'Complete marketing solution with professional services and maximum exposure.',
            }
        ]

        return (
            <div className="space-y-6 max-w-6xl">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Property Listing Plans</h3>
                    <p className="text-gray-600 text-sm mb-6">
                        Choose the right plan to showcase your property and attract qualified buyers or renters.
                    </p>

                    <CardCheckboxGroup
                        options={propertyPlans}
                        value={selectedPlans}
                        onChange={setSelectedPlans}
                        allowMultiple={true}
                    />
                </div>
            </div>
        )
    }
}

export const CompactCards: Story = {
    render: () => {
        const [selectedPlan, setSelectedPlan] = useState<string[]>(['starter'])

        const compactPlans: Option[] = [
            {
                id: 'starter',
                name: 'Starter',
                description: 'Perfect for individuals just getting started.',
            },
            {
                id: 'professional',
                name: 'Professional',
                description: 'Best for growing teams and businesses.',
            }
        ]

        return (
            <div className="space-y-4 max-w-2xl">
                <h3 className="text-lg font-semibold">Compact Plan Selection</h3>

                <CardCheckboxGroup
                    options={compactPlans}
                    value={selectedPlan}
                    onChange={setSelectedPlan}
                    allowMultiple={false}
                />

                <div className="text-sm text-gray-600">
                    Selected: {compactPlans.find(p => p.id === selectedPlan[0])?.name || 'None'}
                </div>
            </div>
        )
    }
}

export const InteractiveDemo: Story = {
    render: () => {
        const [plans, setPlans] = useState<string[]>([])
        const [allowMultiple, setAllowMultiple] = useState(true)

        return (
            <div className="space-y-6 max-w-4xl">
                {/* Controls */}
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={allowMultiple}
                            onChange={(e) => {
                                setAllowMultiple(e.target.checked)
                                if (!e.target.checked) {
                                    // If switching to single selection, keep only first selected
                                    setPlans(plans.slice(0, 1))
                                }
                            }}
                        />
                        <span className="text-sm">Allow multiple selection</span>
                    </label>
                </div>

                {/* Cards */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        {allowMultiple ? 'Select Multiple Plans' : 'Select One Plan'}
                    </h3>

                    <CardCheckboxGroup
                        options={samplePlans}
                        value={plans}
                        onChange={setPlans}
                        allowMultiple={allowMultiple}
                    />
                </div>

                {/* Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm">
                        <div><strong>Selection mode:</strong> {allowMultiple ? 'Multiple' : 'Single'}</div>
                        <div><strong>Selected:</strong> {plans.join(', ') || 'None'}</div>
                        <div><strong>Count:</strong> {plans.length}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export const OrientationExamples: Story = {
    render: () => {
        const [verticalSelection, setVerticalSelection] = useState<string[]>(['basic'])
        const [horizontalSelection, setHorizontalSelection] = useState<string[]>(['premium'])

        return (
            <div className="space-y-8 max-w-6xl">
                {/* Vertical Orientation (Default) */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Vertical Orientation (Default)</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Cards arranged in a responsive grid layout - ideal for comparing multiple options.
                    </p>
                    
                    <CardCheckboxGroup
                        options={samplePlans}
                        value={verticalSelection}
                        onChange={setVerticalSelection}
                        orientation="vertical"
                        allowMultiple={false}
                    />

                    <div className="text-sm text-gray-600">
                        Selected: {verticalSelection.length > 0 ? samplePlans.find(p => p.id === verticalSelection[0])?.name : 'None'}
                    </div>
                </div>

                {/* Horizontal Orientation */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Horizontal Orientation</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Cards arranged in a horizontal row with flex wrap - great for side-by-side comparison.
                    </p>
                    
                    <CardCheckboxGroup
                        options={samplePlans}
                        value={horizontalSelection}
                        onChange={setHorizontalSelection}
                        orientation="horizontal"
                        allowMultiple={false}
                    />

                    <div className="text-sm text-gray-600">
                        Selected: {horizontalSelection.length > 0 ? samplePlans.find(p => p.id === horizontalSelection[0])?.name : 'None'}
                    </div>
                </div>

                {/* Compact comparison */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Compact Horizontal Layout</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Horizontal layout works well with fewer options for inline selection.
                    </p>
                    
                    <CardCheckboxGroup
                        options={[samplePlans[0], samplePlans[1]]}
                        value={horizontalSelection}
                        onChange={setHorizontalSelection}
                        orientation="horizontal"
                        allowMultiple={true}
                    />
                </div>
            </div>
        )
    }
}
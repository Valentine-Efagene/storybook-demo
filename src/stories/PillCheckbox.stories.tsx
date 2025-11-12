import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { PillCheckbox, PillCheckboxGroup } from '@/components/form/PillCheckbox'

const meta: Meta<typeof PillCheckbox> = {
    title: 'Form/Pill Checkbox',
    component: PillCheckbox,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the pill checkbox'
        },
        variant: {
            control: 'select', 
            options: ['default', 'outline'],
            description: 'Visual style variant'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled'
        },
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked'
        }
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Single pill checkbox examples
export const Default: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(args.checked || false)
        
        return (
            <PillCheckbox
                {...args}
                checked={checked}
                onCheckedChange={setChecked}
            />
        )
    },
    args: {
        id: 'default-pill',
        label: 'Swimming Pool',
        checked: false,
        size: 'md',
        variant: 'default'
    }
}

export const Outline: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(args.checked || false)
        
        return (
            <PillCheckbox
                {...args}
                checked={checked}
                onCheckedChange={setChecked}
            />
        )
    },
    args: {
        id: 'outline-pill',
        label: 'Air Conditioning',
        checked: false,
        size: 'md',
        variant: 'outline'
    }
}

export const Checked: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(args.checked ?? true)
        
        return (
            <PillCheckbox
                {...args}
                checked={checked}
                onCheckedChange={(newChecked) => setChecked(newChecked)}
            />
        )
    },
    args: {
        id: 'checked-pill',
        label: 'Parking Available',
        checked: true,
        size: 'md',
        variant: 'default'
    }
}

export const Disabled: Story = {
    args: {
        id: 'disabled-pill',
        label: 'Disabled Option',
        checked: false,
        disabled: true,
        size: 'md',
        variant: 'default',
        onCheckedChange: () => {}
    }
}

export const Sizes: Story = {
    render: () => {
        const [checkedStates, setCheckedStates] = useState({
            small: false,
            medium: false,
            large: false
        })

        const updateChecked = (key: keyof typeof checkedStates, checked: boolean) => {
            setCheckedStates(prev => ({ ...prev, [key]: checked }))
        }

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Different Sizes</h3>
                <div className="flex items-center gap-4">
                    <PillCheckbox
                        id="small-pill"
                        label="Small"
                        checked={checkedStates.small}
                        onCheckedChange={(checked) => updateChecked('small', checked)}
                        size="sm"
                        variant="outline"
                    />
                    <PillCheckbox
                        id="medium-pill"
                        label="Medium"
                        checked={checkedStates.medium}
                        onCheckedChange={(checked) => updateChecked('medium', checked)}
                        size="md"
                        variant="outline"
                    />
                    <PillCheckbox
                        id="large-pill"
                        label="Large"
                        checked={checkedStates.large}
                        onCheckedChange={(checked) => updateChecked('large', checked)}
                        size="lg"
                        variant="outline"
                    />
                </div>
            </div>
        )
    }
}

export const Variants: Story = {
    render: () => {
        const [checkedStates, setCheckedStates] = useState({
            default: false,
            outline: false
        })

        const updateChecked = (key: keyof typeof checkedStates, checked: boolean) => {
            setCheckedStates(prev => ({ ...prev, [key]: checked }))
        }

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Style Variants</h3>
                <div className="flex items-center gap-4">
                    <PillCheckbox
                        id="default-variant"
                        label="Default Style"
                        checked={checkedStates.default}
                        onCheckedChange={(checked) => updateChecked('default', checked)}
                        variant="default"
                    />
                    <PillCheckbox
                        id="outline-variant"
                        label="Outline Style"
                        checked={checkedStates.outline}
                        onCheckedChange={(checked) => updateChecked('outline', checked)}
                        variant="outline"
                    />
                </div>
            </div>
        )
    }
}

// Group examples
export const PropertyAmenities: Story = {
    render: () => {
        const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Parking', 'Air Conditioning'])
        
        const amenities = [
            'Parking', 'Swimming Pool', 'Gym', 'Balcony', 'Garden', 'Air Conditioning',
            'Elevator', 'Security', 'Laundry', 'Storage', 'Playground', 'Rooftop Deck',
            'Concierge', 'Pet Friendly', 'Bike Storage', 'WiFi'
        ]

        return (
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Property Amenities</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Select all amenities that apply to this property
                    </p>
                    
                    <PillCheckboxGroup
                        options={amenities}
                        value={selectedAmenities}
                        onChange={setSelectedAmenities}
                        variant="outline"
                        size="md"
                    />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Selected Amenities:</h4>
                    <p className="text-sm text-gray-600">
                        {selectedAmenities.length > 0 ? selectedAmenities.join(', ') : 'None selected'}
                    </p>
                </div>
            </div>
        )
    }
}

export const CompactGroup: Story = {
    render: () => {
        const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Fast', 'Secure'])
        
        const features = ['Fast', 'Secure', 'Reliable', 'Modern', 'Eco-friendly', 'Premium']

        return (
            <div className="space-y-4 max-w-2xl">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Product Features</h3>
                    
                    <PillCheckboxGroup
                        options={features}
                        value={selectedFeatures}
                        onChange={setSelectedFeatures}
                        variant="default"
                        size="sm"
                    />
                </div>

                <div className="text-sm text-gray-600">
                    Selected: {selectedFeatures.length} of {features.length} features
                </div>
            </div>
        )
    }
}

export const InteractiveExample: Story = {
    render: () => {
        const [settings, setSettings] = useState<string[]>(['Notifications', 'Auto-save'])
        const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
        const [variant, setVariant] = useState<'default' | 'outline'>('outline')
        
        const options = ['Notifications', 'Auto-save', 'Dark mode', 'Analytics', 'Backups', 'Two-factor auth']

        return (
            <div className="space-y-6 max-w-3xl">
                {/* Controls */}
                <div className="flex gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Size</label>
                        <select 
                            value={size} 
                            onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg')}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value="sm">Small</option>
                            <option value="md">Medium</option>
                            <option value="lg">Large</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Variant</label>
                        <select 
                            value={variant} 
                            onChange={(e) => setVariant(e.target.value as 'default' | 'outline')}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value="default">Default</option>
                            <option value="outline">Outline</option>
                        </select>
                    </div>
                </div>

                {/* Pills */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                    <PillCheckboxGroup
                        options={options}
                        value={settings}
                        onChange={setSettings}
                        variant={variant}
                        size={size}
                    />
                </div>

                {/* Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm">
                        <div><strong>Size:</strong> {size}</div>
                        <div><strong>Variant:</strong> {variant}</div>
                        <div><strong>Selected:</strong> {settings.join(', ') || 'None'}</div>
                    </div>
                </div>
            </div>
        )
    }
}
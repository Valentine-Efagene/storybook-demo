import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { BlockRadio, BlockRadioOption } from '@/components/form/BlockRadio';

const meta = {
    title: 'Form/BlockRadio',
    component: BlockRadio,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A radio group component styled as button-like blocks with round notches on the left side. Perfect for selecting between multiple exclusive options with a modern, accessible design.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        options: {
            description: 'Array of options for the radio group',
            table: {
                type: { summary: 'BlockRadioOption[]' }
            }
        },
        value: {
            control: 'text',
            description: 'Currently selected value',
            table: {
                type: { summary: 'string' }
            }
        },
        onChange: {
            action: 'onChange',
            description: 'Callback when selection changes',
            table: {
                type: { summary: '(value: string) => void' }
            }
        },
        name: {
            control: 'text',
            description: 'HTML name attribute for radio group',
            table: {
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the entire radio group is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Size variant of the radio blocks',
            table: {
                type: { summary: "'sm' | 'md' | 'lg'" },
                defaultValue: { summary: "'md'" }
            }
        },
        orientation: {
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
            description: 'Layout orientation of the radio blocks',
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: "'vertical'" }
            }
        }
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof BlockRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const basicOptions: BlockRadioOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
];

const detailedOptions: BlockRadioOption[] = [
    {
        value: 'basic',
        label: 'Basic Plan',
        description: 'Perfect for getting started with essential features'
    },
    {
        value: 'pro',
        label: 'Professional Plan',
        description: 'Advanced features for growing businesses'
    },
    {
        value: 'enterprise',
        label: 'Enterprise Plan',
        description: 'Full-featured solution for large organizations'
    }
];

const completionStatusOptions: BlockRadioOption[] = [
    {
        value: 'under_construction',
        label: 'Under Construction',
        description: 'Property is currently being built'
    },
    {
        value: 'completed',
        label: 'Completed',
        description: 'Property is ready for immediate occupancy'
    },
    {
        value: 'off_plan',
        label: 'Off Plan',
        description: 'Property is in planning/pre-construction phase'
    }
];

// Basic stories
export const Default: Story = {
    args: {
        options: basicOptions,
        name: 'basic-radio',
        value: 'option1'
    },
};

export const WithDescriptions: Story = {
    args: {
        options: detailedOptions,
        name: 'detailed-radio',
        value: 'pro'
    },
};

export const Horizontal: Story = {
    args: {
        options: basicOptions,
        name: 'horizontal-radio',
        orientation: 'horizontal',
        value: 'option2'
    },
};

// Size variants
export const Small: Story = {
    args: {
        options: detailedOptions,
        name: 'small-radio',
        size: 'sm',
        value: 'basic'
    },
};

export const Medium: Story = {
    args: {
        options: detailedOptions,
        name: 'medium-radio',
        size: 'md',
        value: 'pro'
    },
};

export const Large: Story = {
    args: {
        options: detailedOptions,
        name: 'large-radio',
        size: 'lg',
        value: 'enterprise'
    },
};

// States
export const Disabled: Story = {
    args: {
        options: basicOptions,
        name: 'disabled-radio',
        disabled: true,
        value: 'option1'
    },
};

export const SomeDisabled: Story = {
    args: {
        options: [
            { value: 'available', label: 'Available Option' },
            { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
            { value: 'available2', label: 'Another Available Option' },
            { value: 'disabled2', label: 'Disabled Option 2', disabled: true }
        ],
        name: 'some-disabled-radio',
        value: 'available'
    },
};

// Interactive examples
export const Interactive: Story = {
    render: (args) => {
        const [selectedValue, setSelectedValue] = useState<string>('basic');

        return (
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Select a Plan</h3>
                    <BlockRadio
                        {...args}
                        value={selectedValue}
                        onChange={setSelectedValue}
                    />
                </div>
                <div className="p-4 bg-muted rounded-lg">
                    <strong>Selected:</strong> {selectedValue}
                </div>
            </div>
        );
    },
    args: {
        options: detailedOptions,
        name: 'interactive-radio'
    },
};

export const CompletionStatus: Story = {
    render: (args) => {
        const [selectedValue, setSelectedValue] = useState<string>('completed');

        return (
            <div className="space-y-4 max-w-md">
                <div>
                    <h3 className="text-lg font-semibold mb-1">Property Completion Status</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Select the current construction status of the property
                    </p>
                    <BlockRadio
                        {...args}
                        value={selectedValue}
                        onChange={setSelectedValue}
                    />
                </div>
                <div className="p-4 bg-muted rounded-lg">
                    <strong>Current Status:</strong> {selectedValue.replace('_', ' ')}
                </div>
            </div>
        );
    },
    args: {
        options: completionStatusOptions,
        name: 'completion-status'
    },
};

// Layout examples
export const HorizontalLayout: Story = {
    args: {
        options: basicOptions,
        name: 'layout-demo'
    },
    render: () => (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium mb-2">Small Horizontal</h4>
                <BlockRadio
                    options={basicOptions}
                    name="horizontal-small"
                    orientation="horizontal"
                    size="sm"
                    value="option2"
                    onChange={fn()}
                />
            </div>
            <div>
                <h4 className="font-medium mb-2">Medium Horizontal</h4>
                <BlockRadio
                    options={basicOptions}
                    name="horizontal-medium"
                    orientation="horizontal"
                    size="md"
                    value="option1"
                    onChange={fn()}
                />
            </div>
            <div>
                <h4 className="font-medium mb-2">Large Horizontal</h4>
                <BlockRadio
                    options={basicOptions}
                    name="horizontal-large"
                    orientation="horizontal"
                    size="lg"
                    value="option3"
                    onChange={fn()}
                />
            </div>
        </div>
    ),
};

// Comparison with different content
export const ContentVariations: Story = {
    args: {
        options: basicOptions,
        name: 'content-demo'
    },
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-medium mb-3">Short Labels</h4>
                <BlockRadio
                    options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                        { value: 'maybe', label: 'Maybe' }
                    ]}
                    name="short-labels"
                    value="yes"
                    onChange={fn()}
                />
            </div>
            <div>
                <h4 className="font-medium mb-3">Long Labels with Descriptions</h4>
                <BlockRadio
                    options={[
                        {
                            value: 'immediately',
                            label: 'Available Immediately',
                            description: 'Property is ready for move-in within 1-2 weeks'
                        },
                        {
                            value: 'soon',
                            label: 'Available Soon',
                            description: 'Property will be ready within 1-3 months'
                        },
                        {
                            value: 'future',
                            label: 'Future Availability',
                            description: 'Property completion expected in 6+ months'
                        }
                    ]}
                    name="long-labels"
                    value="immediately"
                    onChange={fn()}
                />
            </div>
        </div>
    ),
};
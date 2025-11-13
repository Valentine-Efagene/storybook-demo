import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ToggleCheckbox from '@/components/form/ToggleCheckbox';

const meta = {
    title: 'Form/ToggleCheckbox',
    component: ToggleCheckbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A toggle switch component built on top of shadcn\'s Switch component. Provides a modern toggle interface with custom green styling and multiple size variants.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the toggle is checked/on',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        onChange: {
            action: 'onChange',
            description: 'Callback function called when the toggle state changes',
            table: {
                type: { summary: '(checked: boolean) => void' }
            }
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the toggle is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        required: {
            control: 'boolean',
            description: 'Whether the toggle is required',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Size variant of the toggle',
            table: {
                type: { summary: "'sm' | 'md' | 'lg'" },
                defaultValue: { summary: "'md'" }
            }
        },
        id: {
            control: 'text',
            description: 'HTML id attribute',
            table: {
                type: { summary: 'string' }
            }
        },
        name: {
            control: 'text',
            description: 'HTML name attribute',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: 'text',
            description: 'HTML value attribute',
            table: {
                type: { summary: 'string' }
            }
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof ToggleCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        checked: false,
        onChange: fn(),
    },
};

// Simple test to ensure component renders
export const SimpleTest: Story = {
    render: () => (
        <div className="p-4 border border-gray-200 rounded">
            <p className="mb-2 text-sm">Testing ToggleCheckbox:</p>
            <ToggleCheckbox
                checked={false}
                onChange={(checked) => console.log('Toggle changed:', checked)}
            />
        </div>
    ),
};

// Checked state
export const Checked: Story = {
    args: {
        checked: true,
    },
};

// Disabled states
export const Disabled: Story = {
    args: {
        checked: false,
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true,
    },
};

// Size variants
export const Small: Story = {
    args: {
        checked: true,
        size: 'sm',
    },
};

export const Medium: Story = {
    args: {
        checked: true,
        size: 'md',
    },
};

export const Large: Story = {
    args: {
        checked: true,
        size: 'lg',
    },
};

// With form attributes
export const WithFormAttributes: Story = {
    args: {
        checked: false,
        id: 'toggle-1',
        name: 'settings-toggle',
        value: 'enabled',
        required: true,
    },
};

// Interactive example with label
export const WithLabel: Story = {
    render: (args) => (
        <div className="flex items-center space-x-2" >
            <ToggleCheckbox {...args} id="toggle-with-label" />
            <label htmlFor="toggle-with-label" className="text-sm font-medium cursor-pointer" >
                Enable notifications
            </ label >
        </div>
    ),
    args: {
        checked: false,
    },
};

// Multiple toggles showcase
export const MultipleToggles: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h4 className="text-sm font-medium">Email notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <ToggleCheckbox checked={true} onChange={fn()} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h4 className="text-sm font-medium">Push notifications</h4>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                </div>
                <ToggleCheckbox checked={false} onChange={fn()} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                <div>
                    <h4 className="text-sm font-medium">SMS notifications</h4>
                    <p className="text-sm text-gray-500">Currently unavailable</p>
                </div>
                <ToggleCheckbox checked={false} disabled={true} onChange={fn()} />
            </div>
        </div>
    ),
};

// Size comparison
export const SizeComparison: Story = {
    render: () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <span className="w-16 text-sm">Small:</span>
                <ToggleCheckbox size="sm" checked={true} onChange={fn()} />
                <ToggleCheckbox size="sm" checked={false} onChange={fn()} />
            </div>
            <div className="flex items-center space-x-4">
                <span className="w-16 text-sm">Medium:</span>
                <ToggleCheckbox size="md" checked={true} onChange={fn()} />
                <ToggleCheckbox size="md" checked={false} onChange={fn()} />
            </div>
            <div className="flex items-center space-x-4">
                <span className="w-16 text-sm">Large:</span>
                <ToggleCheckbox size="lg" checked={true} onChange={fn()} />
                <ToggleCheckbox size="lg" checked={false} onChange={fn()} />
            </div>
        </div>
    ),
};
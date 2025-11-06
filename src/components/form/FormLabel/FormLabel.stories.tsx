import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormLabel } from './FormLabel';

const meta = {
    title: 'Form/FormLabel',
    component: FormLabel,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isRequired: {
            control: { type: 'boolean' },
        },
        children: {
            control: { type: 'text' },
        },
    },
} satisfies Meta<typeof FormLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Email Address',
    },
};

export const Required: Story = {
    args: {
        children: 'Email Address',
        isRequired: true,
    },
};

export const LongLabel: Story = {
    args: {
        children: 'Preferred Communication Method for Marketing Updates',
        isRequired: true,
    },
};

// Showcase different states
export const LabelStates: Story = {
    args: {
        children: 'Demo Label',
    },
    render: () => {
        return (
            <div className="space-y-4 p-4 max-w-md">
                <h3 className="text-lg font-semibold">Form Label States</h3>

                <div className="space-y-3">
                    <div>
                        <FormLabel>Optional Field</FormLabel>
                        <input
                            type="text"
                            placeholder="Not required"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <FormLabel isRequired>Required Field</FormLabel>
                        <input
                            type="text"
                            placeholder="This field is required"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <FormLabel isRequired>Long Field Name That Might Wrap</FormLabel>
                        <input
                            type="text"
                            placeholder="Long label example"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>
        );
    },
};
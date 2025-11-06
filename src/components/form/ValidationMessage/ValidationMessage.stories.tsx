import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ValidationMessage } from './ValidationMessage';

const meta = {
    title: 'Form/ValidationMessage',
    component: ValidationMessage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['error', 'success', 'info'],
        },
        showIcon: {
            control: { type: 'boolean' },
        },
        children: {
            control: { type: 'text' },
        },
    },
} satisfies Meta<typeof ValidationMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Error: Story = {
    args: {
        type: 'error',
        children: 'This field is required',
    },
};

export const Success: Story = {
    args: {
        type: 'success',
        children: 'Email address is valid',
    },
};

export const Info: Story = {
    args: {
        type: 'info',
        children: 'This information will help us personalize your experience',
    },
};

export const WithoutIcon: Story = {
    args: {
        type: 'error',
        showIcon: false,
        children: 'Error message without icon',
    },
};

export const LongMessage: Story = {
    args: {
        type: 'error',
        children: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
    },
};

// Showcase all types
export const AllTypes: Story = {
    args: {
        children: 'Demo message',
    },
    render: () => {
        return (
            <div className="space-y-4 p-4 max-w-md">
                <h3 className="text-lg font-semibold">Validation Message Types</h3>

                <div className="space-y-3">
                    <div>
                        <h4 className="text-sm font-medium mb-1">Error Messages</h4>
                        <ValidationMessage type="error">
                            This field is required
                        </ValidationMessage>
                        <ValidationMessage type="error">
                            Password must be at least 8 characters
                        </ValidationMessage>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-1">Success Messages</h4>
                        <ValidationMessage type="success">
                            Email address is valid
                        </ValidationMessage>
                        <ValidationMessage type="success">
                            Password meets all requirements
                        </ValidationMessage>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-1">Info Messages</h4>
                        <ValidationMessage type="info">
                            We'll use this to send you updates
                        </ValidationMessage>
                        <ValidationMessage type="info">
                            This information is optional
                        </ValidationMessage>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-1">Without Icons</h4>
                        <ValidationMessage type="error" showIcon={false}>
                            Error without icon
                        </ValidationMessage>
                        <ValidationMessage type="success" showIcon={false}>
                            Success without icon
                        </ValidationMessage>
                    </div>
                </div>
            </div>
        );
    },
};
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { FormInput } from './FormInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const meta = {
    title: 'Form/FormInput',
    component: FormInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: { type: 'text' },
        },
        error: {
            control: { type: 'text' },
        },
        helperText: {
            control: { type: 'text' },
        },
        placeholder: {
            control: { type: 'text' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
        isRequired: {
            control: { type: 'boolean' },
        },
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number', 'tel', 'url'],
        },
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof FormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic States
export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Full Name',
        placeholder: 'Enter your full name',
    },
};

export const Required: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        isRequired: true,
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Username',
        placeholder: 'Enter username',
        helperText: 'Must be at least 3 characters long',
    },
};

export const WithError: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        value: 'invalid-email',
        error: 'Please enter a valid email address',
        isRequired: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Field',
        placeholder: 'This field is disabled',
        disabled: true,
        value: 'Cannot edit this',
    },
};

// Input Types
export const EmailInput: Story = {
    args: {
        label: 'Email Address',
        type: 'email',
        placeholder: 'user@example.com',
        helperText: 'We will never share your email',
    },
};

export const PasswordInput: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        isRequired: true,
    },
};

export const NumberInput: Story = {
    args: {
        label: 'Age',
        type: 'number',
        placeholder: '25',
        min: 0,
        max: 150,
    },
};

// Validation States Showcase
export const ValidationStates: Story = {
    render: () => {
        return (
            <div className="space-y-6 p-6 max-w-md">
                <h3 className="text-lg font-semibold mb-4">Form Input States</h3>

                {/* Normal State */}
                <FormInput
                    label="Normal State"
                    placeholder="Enter text..."
                    helperText="This is a normal input field"
                />

                {/* Focused State */}
                <FormInput
                    label="Required Field"
                    placeholder="Enter required information"
                    isRequired={true}
                    helperText="This field is required"
                />

                {/* Error State */}
                <FormInput
                    label="Error State"
                    placeholder="Enter valid email"
                    value="invalid-email"
                    error="Please enter a valid email address"
                    isRequired={true}
                />

                {/* Disabled State */}
                <FormInput
                    label="Disabled State"
                    placeholder="Cannot edit"
                    value="Read-only value"
                    disabled={true}
                />
            </div>
        );
    },
};

// React Hook Form Integration
export const ReactHookFormExample: Story = {
    render: () => {
        const {
            register,
            handleSubmit,
            formState: { errors },
            watch,
        } = useForm({
            defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                age: '',
                password: '',
            },
        });

        const onSubmit = (data: any) => {
            alert('Form submitted: ' + JSON.stringify(data, null, 2));
        };

        const formData = watch();

        return (
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-6">React Hook Form Integration</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput
                        label="First Name"
                        placeholder="Enter your first name"
                        isRequired={true}
                        error={errors.firstName?.message}
                        {...register('firstName', {
                            required: 'First name is required',
                            minLength: {
                                value: 2,
                                message: 'First name must be at least 2 characters',
                            },
                        })}
                    />

                    <FormInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        isRequired={true}
                        error={errors.lastName?.message}
                        {...register('lastName', {
                            required: 'Last name is required',
                            minLength: {
                                value: 2,
                                message: 'Last name must be at least 2 characters',
                            },
                        })}
                    />

                    <FormInput
                        label="Email Address"
                        type="email"
                        placeholder="user@example.com"
                        isRequired={true}
                        error={errors.email?.message}
                        helperText="We'll use this for account notifications"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />

                    <FormInput
                        label="Age"
                        type="number"
                        placeholder="25"
                        error={errors.age?.message}
                        {...register('age', {
                            required: 'Age is required',
                            min: {
                                value: 18,
                                message: 'Must be at least 18 years old',
                            },
                            max: {
                                value: 120,
                                message: 'Must be less than 120 years old',
                            },
                        })}
                    />

                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="Enter a secure password"
                        isRequired={true}
                        error={errors.password?.message}
                        helperText="Minimum 8 characters with letters and numbers"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)/,
                                message: 'Password must contain both letters and numbers',
                            },
                        })}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Submit Form
                    </button>
                </form>

                {/* Form Data Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Current Form Data:</h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        );
    },
};

// Size Variants
export const SizeVariants: Story = {
    render: () => {
        return (
            <div className="space-y-6 p-6 max-w-md">
                <h3 className="text-lg font-semibold mb-4">Input Sizes</h3>

                <FormInput
                    label="Small Input"
                    placeholder="Small size"
                    className="h-8 text-sm"
                />

                <FormInput
                    label="Default Input"
                    placeholder="Default size"
                />

                <FormInput
                    label="Large Input"
                    placeholder="Large size"
                    className="h-12 text-base"
                />
            </div>
        );
    },
};

// Different Input Types
export const InputTypes: Story = {
    render: () => {
        return (
            <div className="space-y-4 p-6 max-w-md">
                <h3 className="text-lg font-semibold mb-4">Input Types</h3>

                <FormInput
                    label="Text Input"
                    type="text"
                    placeholder="Enter text"
                />

                <FormInput
                    label="Email Input"
                    type="email"
                    placeholder="user@example.com"
                />

                <FormInput
                    label="Password Input"
                    type="password"
                    placeholder="Password"
                />

                <FormInput
                    label="Number Input"
                    type="number"
                    placeholder="123"
                />

                <FormInput
                    label="Phone Input"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                />

                <FormInput
                    label="URL Input"
                    type="url"
                    placeholder="https://example.com"
                />
            </div>
        );
    },
};
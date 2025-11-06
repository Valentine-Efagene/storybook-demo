import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { FormTextarea } from '../components/form/FormTextarea/FormTextarea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

const meta = {
    title: 'Form/FormTextarea',
    component: FormTextarea,
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
        rows: {
            control: { type: 'number' },
        },
        cols: {
            control: { type: 'number' },
        },
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof FormTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic States
export const Default: Story = {
    args: {
        placeholder: 'Enter your message...',
        rows: 4,
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Message',
        placeholder: 'Enter your message here',
        rows: 4,
    },
};

export const Required: Story = {
    args: {
        label: 'Comments',
        placeholder: 'Please provide your feedback',
        isRequired: true,
        rows: 4,
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Description',
        placeholder: 'Describe your project in detail',
        helperText: 'Minimum 50 characters required',
        rows: 5,
    },
};

export const WithError: Story = {
    args: {
        label: 'Message',
        placeholder: 'Enter your message',
        value: 'Too short',
        error: 'Message must be at least 10 characters long',
        isRequired: true,
        rows: 4,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Field',
        placeholder: 'This field is disabled',
        disabled: true,
        value: 'This content cannot be edited',
        rows: 3,
    },
};

export const LargeTextarea: Story = {
    args: {
        label: 'Long Form Content',
        placeholder: 'Write your essay here...',
        helperText: 'Maximum 2000 characters',
        rows: 8,
    },
};

export const SmallTextarea: Story = {
    args: {
        label: 'Short Note',
        placeholder: 'Quick note...',
        rows: 2,
    },
};

// Interactive Examples
export const InteractiveTextarea: Story = {
    render: (args) => {
        const [message, setMessage] = useState('');

        return (
            <div className="space-y-4 p-4 max-w-md">
                <div>
                    <FormTextarea
                        {...args}
                        label="Interactive Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        helperText={`${message.length}/500 characters`}
                        rows={5}
                    />
                </div>
                <div className="text-sm text-gray-600">
                    <strong>Current content:</strong>
                    <div className="mt-2 p-2 bg-gray-50 rounded border">
                        {message || '(empty)'}
                    </div>
                </div>
            </div>
        );
    },
};

// Validation States Showcase
export const ValidationStates: Story = {
    args: {
        children: 'Demo textarea',
    },
    render: () => {
        return (
            <div className="space-y-6 p-6 max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Textarea Validation States</h3>

                {/* Normal State */}
                <FormTextarea
                    label="Normal State"
                    placeholder="Enter your text..."
                    helperText="This is a normal textarea field"
                    rows={3}
                />

                {/* Required State */}
                <FormTextarea
                    label="Required Field"
                    placeholder="This field is required"
                    isRequired={true}
                    helperText="This field must be filled out"
                    rows={3}
                />

                {/* Error State */}
                <FormTextarea
                    label="Error State"
                    placeholder="Enter at least 20 characters"
                    value="Too short text"
                    error="Text must be at least 20 characters long"
                    isRequired={true}
                    rows={4}
                />

                {/* Disabled State */}
                <FormTextarea
                    label="Disabled State"
                    placeholder="Cannot edit"
                    value="This content is read-only and cannot be modified by the user."
                    disabled={true}
                    rows={3}
                />
            </div>
        );
    },
};

// React Hook Form Integration
export const ReactHookFormExample: Story = {
    args: {
        children: 'Demo textarea',
    },
    render: () => {
        const {
            register,
            handleSubmit,
            formState: { errors },
            watch,
        } = useForm({
            defaultValues: {
                title: '',
                description: '',
                feedback: '',
                bio: '',
            },
        });

        const onSubmit = (data: any) => {
            alert('Form submitted: ' + JSON.stringify(data, null, 2));
        };

        const formData = watch();

        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-6">React Hook Form Integration</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormTextarea
                        label="Project Title"
                        placeholder="Enter a brief title for your project"
                        isRequired={true}
                        error={errors.title?.message}
                        rows={2}
                        {...register('title', {
                            required: 'Project title is required',
                            minLength: {
                                value: 5,
                                message: 'Title must be at least 5 characters',
                            },
                            maxLength: {
                                value: 100,
                                message: 'Title must be less than 100 characters',
                            },
                        })}
                    />

                    <FormTextarea
                        label="Project Description"
                        placeholder="Describe your project in detail..."
                        isRequired={true}
                        error={errors.description?.message}
                        helperText="Provide a comprehensive description of your project goals and requirements"
                        rows={6}
                        {...register('description', {
                            required: 'Project description is required',
                            minLength: {
                                value: 50,
                                message: 'Description must be at least 50 characters',
                            },
                            maxLength: {
                                value: 2000,
                                message: 'Description must be less than 2000 characters',
                            },
                        })}
                    />

                    <FormTextarea
                        label="Additional Feedback"
                        placeholder="Any additional comments or feedback..."
                        error={errors.feedback?.message}
                        helperText="Optional field for any extra information"
                        rows={4}
                        {...register('feedback', {
                            maxLength: {
                                value: 500,
                                message: 'Feedback must be less than 500 characters',
                            },
                        })}
                    />

                    <FormTextarea
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        error={errors.bio?.message}
                        helperText="Brief personal or professional biography"
                        rows={4}
                        {...register('bio', {
                            maxLength: {
                                value: 300,
                                message: 'Bio must be less than 300 characters',
                            },
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Submit Form
                    </Button>
                </form>

                {/* Form Data Preview */}
                <div className="mt-8 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Current Form Data:</h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-40">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        );
    },
};

// Different Sizes
export const SizeVariants: Story = {
    args: {
        children: 'Demo textarea',
    },
    render: () => {
        return (
            <div className="space-y-6 p-6 max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Textarea Sizes</h3>

                <FormTextarea
                    label="Small Textarea (2 rows)"
                    placeholder="Small textarea for brief input"
                    rows={2}
                />

                <FormTextarea
                    label="Medium Textarea (4 rows)"
                    placeholder="Medium textarea for moderate input"
                    rows={4}
                />

                <FormTextarea
                    label="Large Textarea (8 rows)"
                    placeholder="Large textarea for extensive input"
                    rows={8}
                />

                <FormTextarea
                    label="Auto-resizing Textarea"
                    placeholder="This textarea can resize based on content"
                    className="resize-y min-h-20 max-h-40"
                    helperText="You can resize this textarea vertically"
                />
            </div>
        );
    },
};

// Character Counter Example
export const CharacterCounter: Story = {
    args: {
        children: 'Demo textarea',
    },
    render: () => {
        const [content, setContent] = useState('');
        const maxLength = 280;
        const remaining = maxLength - content.length;

        return (
            <div className="space-y-4 p-6 max-w-md">
                <h3 className="text-lg font-semibold mb-4">Character Counter Example</h3>

                <FormTextarea
                    label="Tweet-like Message"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={maxLength}
                    error={remaining < 0 ? `Exceeded by ${Math.abs(remaining)} characters` : undefined}
                    helperText={remaining >= 0 ? `${remaining} characters remaining` : undefined}
                    rows={4}
                    isRequired={true}
                />

                <div className={`text-sm ${remaining < 0 ? 'text-red-600' : remaining < 20 ? 'text-yellow-600' : 'text-gray-600'}`}>
                    {content.length}/{maxLength} characters
                </div>
            </div>
        );
    },
};
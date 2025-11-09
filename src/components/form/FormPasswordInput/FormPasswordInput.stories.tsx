import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { FormPasswordInput } from './FormPasswordInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const meta = {
    title: 'Form/FormPasswordInput',
    component: FormPasswordInput,
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
        showToggle: {
            control: { type: 'boolean' },
        },
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof FormPasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic States
export const Default: Story = {
    args: {
        placeholder: 'Enter your password',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
    },
};

export const Required: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        isRequired: true,
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'New Password',
        placeholder: 'Create a strong password',
        helperText: 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
    },
};

export const WithError: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        error: 'Password must be at least 8 characters long',
        value: 'weak',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Password (Disabled)',
        placeholder: 'Cannot edit password',
        disabled: true,
        helperText: 'Password editing is currently disabled',
    },
};

export const WithoutToggle: Story = {
    args: {
        label: 'Security Code',
        placeholder: 'Enter security code',
        showToggle: false,
        helperText: 'This field cannot be revealed',
    },
};

export const LongHelperText: Story = {
    args: {
        label: 'Master Password',
        placeholder: 'Enter your master password',
        helperText: 'Your master password should be unique, complex, and memorable. It will be used to encrypt all your other passwords and should never be shared with anyone.',
    },
};

// Interactive Example
export const InteractivePassword: Story = {
    render: (args) => {
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const passwordsMatch = password === confirmPassword;
        const isStrong = password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);

        return (
            <div className="space-y-4 p-4 max-w-md">
                <FormPasswordInput
                    {...args}
                    label="New Password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={password && !isStrong ? 'Password must contain uppercase, lowercase, number and special character' : undefined}
                    helperText={!password ? 'Password must be at least 8 characters' : undefined}
                />

                <FormPasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={confirmPassword && !passwordsMatch ? 'Passwords do not match' : undefined}
                />

                {/* Password Strength Indicator */}
                {password && (
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Password Strength:</div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`h-2 flex-1 rounded ${password.length >= level * 2
                                            ? level <= 2 ? 'bg-red-400' : level === 3 ? 'bg-yellow-400' : 'bg-green-400'
                                            : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="text-xs text-gray-600">
                            Strength: {
                                password.length < 4 ? 'Very Weak' :
                                    password.length < 6 ? 'Weak' :
                                        password.length < 8 ? 'Fair' :
                                            isStrong ? 'Strong' : 'Good'
                            }
                        </div>
                    </div>
                )}

                {/* Validation Summary */}
                <div className="text-xs bg-gray-50 p-3 rounded border">
                    <div className="font-medium mb-2">Validation Status:</div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className={password.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                                {password.length >= 8 ? '✓' : '✗'}
                            </span>
                            <span>At least 8 characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={passwordsMatch && confirmPassword ? 'text-green-600' : 'text-red-600'}>
                                {passwordsMatch && confirmPassword ? '✓' : '✗'}
                            </span>
                            <span>Passwords match</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={isStrong ? 'text-green-600' : 'text-red-600'}>
                                {isStrong ? '✓' : '✗'}
                            </span>
                            <span>Strong password criteria</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};

// Password Field Variations
export const PasswordVariations: Story = {
    args: {
        label: 'Demo password',
    },
    render: () => {
        return (
            <div className="space-y-6 p-6 max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Password Input Variations</h3>

                {/* Standard Password */}
                <FormPasswordInput
                    label="Current Password"
                    placeholder="Enter current password"
                    helperText="Enter your existing password"
                />

                {/* New Password */}
                <FormPasswordInput
                    label="New Password"
                    placeholder="Create new password"
                    isRequired={true}
                    helperText="Must be at least 8 characters long"
                />

                {/* Confirm Password */}
                <FormPasswordInput
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    isRequired={true}
                />

                {/* Error State */}
                <FormPasswordInput
                    label="Password with Error"
                    placeholder="Invalid password"
                    value="123"
                    error="Password is too short"
                />

                {/* Disabled State */}
                <FormPasswordInput
                    label="Disabled Password"
                    placeholder="Cannot be edited"
                    disabled={true}
                    value="••••••••"
                    helperText="This field is read-only"
                />

                {/* Without Toggle */}
                <FormPasswordInput
                    label="Security PIN"
                    placeholder="Enter 4-digit PIN"
                    showToggle={false}
                    helperText="PIN cannot be revealed for security"
                />
            </div>
        );
    },
};

// Eye Toggle Behavior
export const ToggleBehavior: Story = {
    args: {
        label: 'Demo password',
    },
    render: () => {
        const [passwords, setPasswords] = useState({
            password1: 'MySecretPassword123!',
            password2: 'AnotherPassword456@',
            password3: '',
        });

        const updatePassword = (key: keyof typeof passwords, value: string) => {
            setPasswords(prev => ({ ...prev, [key]: value }));
        };

        return (
            <div className="space-y-6 p-6 max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Eye Toggle Functionality</h3>

                <FormPasswordInput
                    label="Pre-filled Password"
                    placeholder="Password..."
                    value={passwords.password1}
                    onChange={(e) => updatePassword('password1', e.target.value)}
                    helperText="Click the eye icon to toggle visibility"
                />

                <FormPasswordInput
                    label="Another Password Field"
                    placeholder="Different password..."
                    value={passwords.password2}
                    onChange={(e) => updatePassword('password2', e.target.value)}
                    helperText="Each field maintains its own visibility state"
                />

                <FormPasswordInput
                    label="Empty Password Field"
                    placeholder="Type to see toggle behavior"
                    value={passwords.password3}
                    onChange={(e) => updatePassword('password3', e.target.value)}
                    helperText="Toggle works with any content"
                />

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Toggle Features:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Independent state for each password field</li>
                        <li>• Accessible keyboard navigation</li>
                        <li>• Screen reader announcements</li>
                        <li>• Visual feedback on hover/focus</li>
                        <li>• Toggles between text/password input types</li>
                    </ul>
                </div>
            </div>
        );
    },
};

// React Hook Form Integration
export const ReactHookFormExample: Story = {
    args: {
        label: 'Demo password',
    },
    render: () => {
        const schema = z.object({
            currentPassword: z.string().min(1, 'Current password is required'),
            newPassword: z.string()
                .min(8, 'Password must be at least 8 characters')
                .regex(/[A-Z]/, 'Password must contain an uppercase letter')
                .regex(/[a-z]/, 'Password must contain a lowercase letter')
                .regex(/[0-9]/, 'Password must contain a number')
                .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
            confirmPassword: z.string(),
        }).refine((data) => data.newPassword === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });

        const {
            register,
            handleSubmit,
            formState: { errors },
            watch,
            reset,
        } = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
        });

        const onSubmit = (data: any) => {
            alert('Password changed successfully!\n' + JSON.stringify(data, null, 2));
        };

        const formData = watch();

        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Change Password</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormPasswordInput
                        label="Current Password"
                        placeholder="Enter current password"
                        {...register('currentPassword')}
                        error={errors.currentPassword?.message}
                        isRequired={true}
                    />

                    <FormPasswordInput
                        label="New Password"
                        placeholder="Create new password"
                        {...register('newPassword')}
                        error={errors.newPassword?.message}
                        helperText="Must contain uppercase, lowercase, number, and special character"
                        isRequired={true}
                    />

                    <FormPasswordInput
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                        isRequired={true}
                    />

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Change Password
                        </button>

                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {/* Form Data Preview */}
                <div className="mt-8 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Form State:</h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                        {JSON.stringify({
                            currentPassword: formData.currentPassword ? '••••••••' : '',
                            newPassword: formData.newPassword ? '••••••••' : '',
                            confirmPassword: formData.confirmPassword ? '••••••••' : '',
                        }, null, 2)}
                    </pre>
                </div>
            </div>
        );
    },
};

// Accessibility Features
export const AccessibilityShowcase: Story = {
    args: {
        label: 'Demo password',
    },
    render: () => {
        const [password, setPassword] = useState('DemoPassword123!');

        return (
            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Interactive Example */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Interactive Example</h3>
                        <FormPasswordInput
                            label="Accessible Password Field"
                            placeholder="Type or use existing content"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText="Try using keyboard navigation and screen readers"
                            isRequired={true}
                        />
                    </div>

                    {/* Accessibility Features List */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">A11Y Features</h3>
                        <div className="space-y-4">
                            <div className="bg-green-50 border border-green-200 p-3 rounded">
                                <h4 className="font-medium text-green-900 text-sm mb-1">🎯 ARIA Labels</h4>
                                <p className="text-xs text-green-700">
                                    Toggle button has descriptive aria-label that changes based on state
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                                <h4 className="font-medium text-blue-900 text-sm mb-1">⌨️ Keyboard Support</h4>
                                <p className="text-xs text-blue-700">
                                    Full keyboard navigation with Tab and Space/Enter for toggle
                                </p>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 p-3 rounded">
                                <h4 className="font-medium text-purple-900 text-sm mb-1">🔍 Focus Management</h4>
                                <p className="text-xs text-purple-700">
                                    Clear focus indicators and logical tab order
                                </p>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 p-3 rounded">
                                <h4 className="font-medium text-orange-900 text-sm mb-1">📢 Screen Readers</h4>
                                <p className="text-xs text-orange-700">
                                    Proper field labeling and error announcements
                                </p>
                            </div>

                            <div className="bg-pink-50 border border-pink-200 p-3 rounded">
                                <h4 className="font-medium text-pink-900 text-sm mb-1">🎨 High Contrast</h4>
                                <p className="text-xs text-pink-700">
                                    Icons and colors meet WCAG contrast requirements
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
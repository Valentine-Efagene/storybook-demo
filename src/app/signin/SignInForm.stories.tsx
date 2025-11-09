import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SignInForm } from './SignInForm';
import { Toaster } from 'sonner';

const meta = {
    title: 'Forms/SignInForm',
    component: SignInForm,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A sign-in form component with email and password fields, built with React Hook Form and Zod validation.',
            },
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Story />
                <Toaster />
            </div>
        ),
    ],
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default sign-in form
export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default sign-in form with email and password fields.',
            },
        },
    },
};

// Form with different backgrounds
export const OnWhiteBackground: Story = {
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <Story />
                <Toaster />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Sign-in form displayed on a white background.',
            },
        },
    },
};

export const OnDarkBackground: Story = {
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <Story />
                <Toaster />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Sign-in form displayed on a dark background.',
            },
        },
    },
};

// Mobile responsive view
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        docs: {
            description: {
                story: 'Sign-in form optimized for mobile devices.',
            },
        },
    },
};

// Tablet responsive view
export const Tablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
        docs: {
            description: {
                story: 'Sign-in form displayed on tablet-sized screens.',
            },
        },
    },
};

// Form states documentation
export const FormStates: Story = {
    render: () => (
        <div className="space-y-8 max-w-4xl">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Sign-In Form States</h2>
                <p className="text-gray-600">
                    Different states and validation scenarios for the sign-in form.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Default State */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Default State</h3>
                    <SignInForm />
                </div>

                {/* With Instructions */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Usage Instructions</h3>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h4 className="font-medium mb-3">How to use:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                            <li>Enter your email address (5-32 characters)</li>
                            <li>Enter your password (8-100 characters)</li>
                            <li>Click Submit to sign in</li>
                            <li>Use Reset to clear the form</li>
                        </ol>

                        <h4 className="font-medium mt-4 mb-3">Validation:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            <li>Email must be 5-32 characters long</li>
                            <li>Password must be 8-100 characters long</li>
                            <li>Both fields are required</li>
                            <li>Real-time validation feedback</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    ),
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-gray-50 p-8">
                <Story />
                <Toaster />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Overview of form states and usage instructions.',
            },
        },
    },
};

// Authentication flow context
export const AuthenticationFlow: Story = {
    render: () => (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Authentication Flow</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Complete authentication experience showing the sign-in form in the context
                    of a typical user authentication flow.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                        1
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Access Sign-In</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        User navigates to the sign-in page from the landing page or after being redirected.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-xs font-mono">GET /signin</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                        2
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Fill Form</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        User enters credentials with real-time validation feedback.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <SignInForm />
                    </div>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                        3
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Successful sign-in redirects to dashboard or intended destination.
                    </p>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <div className="text-green-800 text-sm font-medium">✓ Signed in successfully</div>
                        <p className="text-xs text-green-600 mt-1">Redirecting to dashboard...</p>
                    </div>
                </div>
            </div>
        </div>
    ),
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-white p-8">
                <Story />
                <Toaster />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Complete authentication flow showing the sign-in form in context.',
            },
        },
    },
};

// Accessibility showcase
export const Accessibility: Story = {
    render: () => (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
                <p className="text-gray-600">
                    The sign-in form includes comprehensive accessibility features for users with assistive technologies.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Interactive Form</h3>
                    <SignInForm />
                </div>

                {/* Accessibility Features */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">A11Y Features</h3>
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">🎯 Form Labels</h4>
                            <p className="text-sm text-blue-700">
                                All form fields have proper labels associated with aria-labelledby and for attributes.
                            </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">⚠️ Error Handling</h4>
                            <p className="text-sm text-green-700">
                                Validation errors are announced to screen readers using aria-invalid and error descriptions.
                            </p>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                            <h4 className="font-medium text-purple-900 mb-2">⌨️ Keyboard Navigation</h4>
                            <p className="text-sm text-purple-700">
                                Full keyboard navigation support with logical tab order and focus management.
                            </p>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                            <h4 className="font-medium text-orange-900 mb-2">🔤 Autocomplete</h4>
                            <p className="text-sm text-orange-700">
                                Form fields include appropriate autocomplete attributes for better UX.
                            </p>
                        </div>

                        <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                            <h4 className="font-medium text-pink-900 mb-2">📱 Touch Targets</h4>
                            <p className="text-sm text-pink-700">
                                Interactive elements meet minimum size requirements for mobile accessibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-gray-50 p-8">
                <Story />
                <Toaster />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility features built into the sign-in form.',
            },
        },
    },
};

// Component integration example
export const IntegrationExample: Story = {
    render: () => (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Integration Example</h2>
                <p className="text-gray-600">
                    How the sign-in form integrates with a complete authentication layout.
                </p>
            </div>

            {/* Mock Authentication Page Layout */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-900 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded"></div>
                            <h1 className="text-xl font-semibold">Your App</h1>
                        </div>
                        <nav className="hidden md:flex gap-6">
                            <a href="#" className="text-gray-300 hover:text-white">Home</a>
                            <a href="#" className="text-gray-300 hover:text-white">About</a>
                            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Information */}
                    <div className="bg-blue-50 p-8 lg:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Welcome Back!
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Sign in to access your dashboard and manage your account.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <span className="text-gray-700">Secure authentication</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <span className="text-gray-700">Real-time validation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <span className="text-gray-700">Responsive design</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <SignInForm />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 px-8 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                        <p>&copy; 2025 Your App. All rights reserved.</p>
                        <div className="flex gap-4 mt-2 md:mt-0">
                            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-900">Terms of Service</a>
                            <a href="#" className="hover:text-gray-900">Help</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
                <Story />
                <Toaster />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Complete page layout showing how the sign-in form integrates with surrounding content.',
            },
        },
    },
};
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import PhoneNumberInput from './PhoneNumberInput';
import { useState } from 'react';
import type { Value } from 'react-phone-number-input';
import { CircleAlert } from 'lucide-react';

const meta = {
    title: 'Form/PhoneNumberInput',
    component: PhoneNumberInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: {
                type: 'text',
            },
        },
        placeholder: {
            control: {
                type: 'text',
            },
        },
        disabled: {
            control: {
                type: 'boolean',
            },
        },
        onChange: {
            action: 'phone-changed',
        },
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Enter phone number',
        style: {
            background: '#FFFFFF',
            border: '1px solid #DAE6E7',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
        },
    },
}; export const WithValue: Story = {
    args: {
        placeholder: 'Enter phone number',
        // Using type assertion to handle the E164Number branded type
        value: '+2348123456789' as Value,
        style: {
            background: '#FFFFFF',
            border: '1px solid #DAE6E7',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
        },
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Enter phone number',
        value: '+2348123456789' as Value,
        disabled: true,
    },
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Your phone number here...',
    },
};

export const CustomClassName: Story = {
    args: {
        placeholder: 'Custom styled input',
        className: 'border-2 border-blue-500 rounded-lg',
    },
};

export const InlineStyles: Story = {
    args: {
        placeholder: 'With inline styles',
        style: {
            borderColor: '#10b981',
            borderWidth: '2px',
            borderRadius: '8px',
        },
    },
};

// Interactive Examples
export const Interactive: Story = {
    render: (args) => {
        const [phoneNumber, setPhoneNumber] = useState<Value | undefined>();

        return (
            <div className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Phone Number
                    </label>
                    <PhoneNumberInput
                        {...args}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="text-sm text-gray-600">
                    Current value: {phoneNumber || '(empty)'}
                </div>
            </div>
        );
    },
};

// Validation States
export const ValidationStates: Story = {
    render: () => {
        return (
            <div className="space-y-6 p-4">
                <h3 className="text-lg font-semibold">Validation States</h3>

                {/* Default State */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Default State
                    </label>
                    <PhoneNumberInput
                        placeholder="Enter phone number"
                        style={{
                            background: '#FFFFFF',
                            border: '1px solid #DAE6E7',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
                        }}
                    />
                    <p className="mt-1 text-sm text-gray-600">
                        Normal state with standard styling
                    </p>
                </div>                {/* Valid State */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Valid Phone Number
                    </label>
                    <PhoneNumberInput
                        value={'+2348123456789' as Value}
                        style={{
                            background: '#FFFFFF',
                            border: '1px solid #DAE6E7',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
                        }}
                    />
                    <p className="mt-1 text-sm text-green-600">
                        ✓ Valid phone number format
                    </p>
                </div>

                {/* Invalid/Error State - Your specified CSS */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Invalid Phone Number (Error State)
                    </label>
                    <div
                        className="w-[285px]"
                        style={{
                            height: '38px'
                        }}
                    >
                        <PhoneNumberInput
                            value={'+234812' as Value}
                            style={{
                                border: '2px solid #C6190D',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
                                width: '285px',
                                height: '38px',
                            }}
                        />
                    </div>
                    <p className="mt-1 text-sm text-red-600">
                        <span className="text-xs mt-0.5"><CircleAlert className="w-4 h-4" /></span> <span>Phone number is incomplete or invalid</span>
                    </p>
                </div>                {/* Disabled State */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Disabled State
                    </label>
                    <PhoneNumberInput
                        value={'+2348123456789' as Value}
                        disabled={true}
                        className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Field is disabled
                    </p>
                </div>
            </div>
        );
    },
};

// Form Integration Example
export const FormExample: Story = {
    render: () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            phoneNumber: undefined as Value | undefined
        });

        const [errors, setErrors] = useState<Record<string, string>>({});

        const validatePhone = (phone?: Value) => {
            if (!phone) return 'Phone number is required';
            if (phone.length < 10) return 'Phone number is too short';
            return '';
        };

        const handlePhoneChange = (phone?: Value) => {
            setFormData(prev => ({ ...prev, phoneNumber: phone }));
            const error = validatePhone(phone);
            setErrors(prev => ({ ...prev, phoneNumber: error }));
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const phoneError = validatePhone(formData.phoneNumber);
            if (phoneError) {
                setErrors(prev => ({ ...prev, phoneNumber: phoneError }));
                return;
            }
            alert('Form submitted successfully!');
        };

        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Contact Form</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Phone Number
                        </label>
                        <PhoneNumberInput
                            value={formData.phoneNumber}
                            onChange={handlePhoneChange}
                            placeholder="Enter your phone number"
                            className="w-full"
                            style={errors.phoneNumber ? {
                                border: '2px solid #C6190D',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
                            } : {
                                background: '#FFFFFF',
                                border: '1px solid #DAE6E7',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
                            }}
                        />
                        {errors.phoneNumber && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.phoneNumber}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Form Data:</h4>
                    <pre className="text-xs text-gray-600">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        );
    },
};

// Country Showcase
export const CountryShowcase: Story = {
    render: () => {
        return (
            <div className="space-y-6 p-4">
                <h3 className="text-lg font-semibold">International Phone Numbers</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Nigeria (+234)
                        </label>
                        <PhoneNumberInput value={'+2348123456789' as Value} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            United States (+1)
                        </label>
                        <PhoneNumberInput value={'+15551234567' as Value} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            United Kingdom (+44)
                        </label>
                        <PhoneNumberInput value={'+447911123456' as Value} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Germany (+49)
                        </label>
                        <PhoneNumberInput value={'+4915112345678' as Value} />
                    </div>
                </div>
            </div>
        );
    },
};

// Size Variants
export const SizeVariants: Story = {
    render: () => {
        return (
            <div className="space-y-6 p-4">
                <h3 className="text-lg font-semibold">Size Variants</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Small (32px height)
                        </label>
                        <PhoneNumberInput
                            placeholder="Small input"
                            style={{ height: '32px', fontSize: '14px' }}
                            className="text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Medium (38px height) - Default
                        </label>
                        <PhoneNumberInput
                            placeholder="Medium input"
                            style={{ height: '38px' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Large (44px height)
                        </label>
                        <PhoneNumberInput
                            placeholder="Large input"
                            style={{ height: '44px', fontSize: '16px' }}
                            className="text-base"
                        />
                    </div>
                </div>
            </div>
        );
    },
};
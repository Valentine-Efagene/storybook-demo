import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { FormSwitch } from './FormSwitch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

const meta = {
    title: 'Form/FormSwitch',
    component: FormSwitch,
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
        disabled: {
            control: { type: 'boolean' },
        },
        isRequired: {
            control: { type: 'boolean' },
        },
        labelPosition: {
            control: { type: 'select' },
            options: ['left', 'right'],
        },
        checked: {
            control: { type: 'boolean' },
        },
    },
    args: {
        onCheckedChange: fn(),
    },
} satisfies Meta<typeof FormSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic States
export const Default: Story = {
    args: {
        label: 'Enable notifications',
    },
};

export const Checked: Story = {
    args: {
        label: 'Enable notifications',
        checked: true,
    },
};

export const Required: Story = {
    args: {
        label: 'Accept terms and conditions',
        isRequired: true,
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Enable dark mode',
        helperText: 'Switch between light and dark themes',
    },
};

export const WithError: Story = {
    args: {
        label: 'Accept privacy policy',
        error: 'You must accept the privacy policy to continue',
        isRequired: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Premium feature',
        disabled: true,
        helperText: 'This feature is not available on your current plan',
    },
};

export const DisabledChecked: Story = {
    args: {
        label: 'System setting',
        disabled: true,
        checked: true,
        helperText: 'This setting is managed by your administrator',
    },
};

export const LabelLeft: Story = {
    args: {
        label: 'Enable notifications',
        labelPosition: 'left',
        helperText: 'Label positioned to the left of the switch',
    },
};

// Interactive Example
export const InteractiveSwitch: Story = {
    render: (args) => {
        const [isChecked, setIsChecked] = useState(false);

        return (
            <div className="space-y-4 p-4 max-w-md">
                <FormSwitch
                    {...args}
                    label="Interactive Switch"
                    checked={isChecked}
                    onCheckedChange={setIsChecked}
                    helperText="Click to toggle this switch"
                />

                <div className="text-sm text-gray-600">
                    <strong>Current state:</strong> {isChecked ? 'ON' : 'OFF'}
                </div>

                <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm">
                        Switch is currently <strong>{isChecked ? 'enabled' : 'disabled'}</strong>
                    </p>
                </div>
            </div>
        );
    },
};

// Validation States Showcase
export const ValidationStates: Story = {
    args: {
        label: 'Demo switch',
    },
    render: () => {
        return (
            <div className="space-y-6 p-6 max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Switch States</h3>

                {/* Normal State */}
                <FormSwitch
                    label="Normal Switch"
                    helperText="This is a normal switch in default state"
                />

                {/* Checked State */}
                <FormSwitch
                    label="Checked Switch"
                    checked={true}
                    helperText="This switch is currently enabled"
                />

                {/* Required State */}
                <FormSwitch
                    label="Required Switch"
                    isRequired={true}
                    helperText="This switch must be enabled to proceed"
                />

                {/* Error State */}
                <FormSwitch
                    label="Error Switch"
                    error="This switch must be enabled"
                    isRequired={true}
                />

                {/* Disabled State */}
                <FormSwitch
                    label="Disabled Switch"
                    disabled={true}
                    helperText="This switch is currently unavailable"
                />

                {/* Disabled Checked State */}
                <FormSwitch
                    label="Disabled Checked Switch"
                    disabled={true}
                    checked={true}
                    helperText="This switch is enabled but cannot be changed"
                />
            </div>
        );
    },
};

// Label Positions
export const LabelPositions: Story = {
    args: {
        label: 'Demo switch',
    },
    render: () => {
        return (
            <div className="space-y-6 p-6 max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Label Positions</h3>

                <FormSwitch
                    label="Label on Right (Default)"
                    labelPosition="right"
                    helperText="Label appears to the right of the switch"
                />

                <FormSwitch
                    label="Label on Left"
                    labelPosition="left"
                    helperText="Label appears to the left of the switch"
                />

                <FormSwitch
                    label="Long Label Text That Might Wrap to Multiple Lines"
                    labelPosition="right"
                    helperText="Testing how long labels behave"
                />

                <FormSwitch
                    label="Long Label Text That Might Wrap to Multiple Lines"
                    labelPosition="left"
                    helperText="Testing how long labels behave with left positioning"
                />
            </div>
        );
    },
};

// React Hook Form Integration
export const ReactHookFormExample: Story = {
    args: {
        label: 'Demo switch',
    },
    render: () => {
        const {
            register,
            handleSubmit,
            formState: { errors },
            watch,
            setValue,
        } = useForm({
            defaultValues: {
                notifications: false,
                marketing: false,
                analytics: true,
                terms: false,
                newsletter: false,
            },
        });

        const onSubmit = (data: any) => {
            alert('Form submitted: ' + JSON.stringify(data, null, 2));
        };

        const formData = watch();

        return (
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Settings & Preferences</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormSwitch
                        label="Push Notifications"
                        helperText="Receive push notifications on your device"
                        checked={formData.notifications}
                        onCheckedChange={(checked) => setValue('notifications', checked)}
                    />

                    <FormSwitch
                        label="Marketing Emails"
                        helperText="Receive promotional emails and offers"
                        checked={formData.marketing}
                        onCheckedChange={(checked) => setValue('marketing', checked)}
                    />

                    <FormSwitch
                        label="Analytics & Performance"
                        helperText="Help us improve by sharing usage data"
                        checked={formData.analytics}
                        onCheckedChange={(checked) => setValue('analytics', checked)}
                    />

                    <FormSwitch
                        label="Newsletter Subscription"
                        helperText="Receive our weekly newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setValue('newsletter', checked)}
                    />

                    <FormSwitch
                        label="Accept Terms & Conditions"
                        isRequired={true}
                        error={!formData.terms ? 'You must accept the terms to continue' : undefined}
                        checked={formData.terms}
                        onCheckedChange={(checked) => setValue('terms', checked)}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!formData.terms}
                    >
                        Save Preferences
                    </Button>
                </form>

                {/* Form Data Preview */}
                <div className="mt-8 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Current Settings:</h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        );
    },
};

// Settings Panel Example
export const SettingsPanel: Story = {
    args: {
        label: 'Demo switch',
    },
    render: () => {
        const [settings, setSettings] = useState({
            darkMode: false,
            autoSave: true,
            notifications: true,
            soundEffects: false,
            autoUpdate: true,
        });

        const updateSetting = (key: keyof typeof settings, value: boolean) => {
            setSettings(prev => ({ ...prev, [key]: value }));
        };

        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Application Settings</h3>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Appearance</h4>
                        <FormSwitch
                            label="Dark Mode"
                            helperText="Use dark theme for better low-light viewing"
                            checked={settings.darkMode}
                            onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                        />
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Editor</h4>
                        <div className="space-y-4">
                            <FormSwitch
                                label="Auto Save"
                                helperText="Automatically save your work every few seconds"
                                checked={settings.autoSave}
                                onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Notifications</h4>
                        <div className="space-y-4">
                            <FormSwitch
                                label="Push Notifications"
                                helperText="Show desktop notifications for important events"
                                checked={settings.notifications}
                                onCheckedChange={(checked) => updateSetting('notifications', checked)}
                            />

                            <FormSwitch
                                label="Sound Effects"
                                helperText="Play sounds for notifications and actions"
                                checked={settings.soundEffects}
                                onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Updates</h4>
                        <FormSwitch
                            label="Automatic Updates"
                            helperText="Download and install updates automatically"
                            checked={settings.autoUpdate}
                            onCheckedChange={(checked) => updateSetting('autoUpdate', checked)}
                        />
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                        Settings are saved automatically and will take effect immediately.
                    </p>
                </div>
            </div>
        );
    },
};
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ToggleCheckbox from '@/components/form/ToggleCheckbox';

const meta = {
    title: 'Test/ToggleCheckbox',
    component: ToggleCheckbox,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ToggleCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    render: () => {
        console.log('Rendering ToggleCheckbox...');
        return (
            <div style={{ padding: '20px', border: '1px solid red' }}>
                <h3>ToggleCheckbox Test</h3>
                <ToggleCheckbox
                    checked={true}
                    onChange={(checked) => console.log('Changed:', checked)}
                />
                <p>If you see this text but no toggle, the component has an issue.</p>
            </div>
        );
    }
};

export const WithSwitch: Story = {
    render: () => {
        const { Switch } = require('@/components/ui/switch');
        return (
            <div style={{ padding: '20px', border: '1px solid blue' }}>
                <h3>Direct Switch Test</h3>
                <Switch
                    checked={true}
                    onCheckedChange={(checked: boolean) => console.log('Switch changed:', checked)}
                />
                <p>Testing direct Switch component.</p>
            </div>
        );
    }
};
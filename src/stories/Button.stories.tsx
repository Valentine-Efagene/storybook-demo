
import { Button } from '@/components/ui/button';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

// Icons for examples
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states including loading and icon support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'custom', 'destructive', 'outline', 'subtle', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'custom', 'outline-lg', 'subtle-lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables the button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the button take full width of its container'
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to text'
    },
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const OutlineBasic: Story = {
  args: {
    variant: 'outline',
    size: 'outline-lg',
    children: 'Outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic outline button without any extra styling.'
      }
    }
  }
};

export const SubtleBasic: Story = {
  args: {
    variant: 'subtle',
    size: 'subtle-lg',
    children: 'Subtle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic subtle button without any extra styling.'
      }
    }
  }
};

export const DiagnosticTest: Story = {
  render: () => (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <h3 style={{ marginBottom: '10px' }}>Diagnostic Test - Raw Buttons</h3>
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <button
          style={{
            background: 'linear-gradient(180deg, #049DC8 0%, #0082B5 100%)',
            boxShadow: '0px 2px 6px rgba(8, 140, 193, 0.32)',
            borderRadius: '12px',
            padding: '8px 20px',
            border: 'none',
            color: 'white',
            width: '400px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Raw CSS Custom Button
        </button>

        <Button size="custom">
          React Component Custom Button
        </Button>

        <button
          style={{
            background: '#FFFFFF',
            border: '1px solid #026993',
            boxShadow: '0px 1px 2px #B0D0FD',
            borderRadius: '12px',
            padding: '8px 20px',
            color: '#026993',
            width: '82px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Raw Outline
        </button>

        <Button variant="outline" size="outline-lg">
          React Outline
        </Button>

        <button
          style={{
            background: '#FFFFFF',
            border: '1px solid #DAE6E7',
            boxShadow: '0px 2px 2px rgba(8, 140, 193, 0.03)',
            borderRadius: '12px',
            padding: '8px 20px',
            color: '#374151',
            width: '82px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Raw Subtle
        </button>

        <Button variant="subtle" size="subtle-lg">
          React Subtle
        </Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Diagnostic test comparing raw CSS buttons with React components to identify styling issues.'
      }
    }
  }
};

export const OutlineVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline">Default Outline</Button>
      <Button variant="outline" size="outline-lg">Large Outline</Button>
      <Button variant="outline" size="outline-lg" disabled>Disabled Outline</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outline button variants with the custom blue border, white background, and light blue shadow styling.'
      }
    }
  }
};

export const SubtleVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="subtle">Default Subtle</Button>
      <Button variant="subtle" size="subtle-lg">Large Subtle</Button>
      <Button variant="subtle" size="subtle-lg" disabled>Disabled Subtle</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Subtle button variants with light gray border, white background, and minimal shadow styling.'
      }
    }
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button size="custom">Custom</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="outline" size="outline-lg">Outline Large</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="subtle" size="subtle-lg">Subtle Large</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together, including custom outline and subtle variants.'
      }
    }
  }
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="custom">Custom Size</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes including the custom size with specific dimensions.'
      }
    }
  }
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button icon={<HeartIcon />} iconPosition="left">
        Like
      </Button>
      <Button icon={<DownloadIcon />} iconPosition="right" variant="outline">
        Download
      </Button>
      <Button size="custom" icon={<HeartIcon />}>
        Custom with Icon
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons in different positions.'
      }
    }
  }
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button loading size="custom">Loading Custom</Button>
      <Button loading variant="outline">Loading Outline</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons in loading state with spinner animation.'
      }
    }
  }
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button size="icon" variant="default">
        <HeartIcon />
      </Button>
      <Button size="icon-sm" variant="outline">
        <DownloadIcon />
      </Button>
      <Button size="icon-lg" variant="secondary">
        <HeartIcon />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons in different sizes.'
      }
    }
  }
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled size="custom">Disabled Custom</Button>
      <Button disabled variant="outline">Disabled Outline</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons in disabled state.'
      }
    }
  }
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth size="custom">Full Width Custom</Button>
      <Button fullWidth variant="outline">Full Width Outline</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons that take the full width of their container.'
      }
    }
  }
};

export const CustomVariantsShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Custom Button Variants</h2>
        <p className="text-sm text-gray-600">Three custom implementations with exact CSS specifications</p>
      </div>

      {/* Primary Gradient */}
      <div className="space-y-3">
        <h3 className="text-md font-medium">Primary (Custom Gradient)</h3>
        <div className="flex gap-4 items-center">
          <Button size="custom">Primary Action</Button>
          <div className="text-xs text-gray-500">
            400px × 36px | Gradient: #049DC8 → #0082B5
          </div>
        </div>
      </div>

      {/* Outline */}
      <div className="space-y-3">
        <h3 className="text-md font-medium">Secondary (Outline)</h3>
        <div className="flex gap-4 items-center">
          <Button variant="outline" size="outline-lg">Secondary</Button>
          <div className="text-xs text-gray-500">
            82px × 36px | Border: #026993 | Shadow: #B0D0FD
          </div>
        </div>
      </div>

      {/* Subtle */}
      <div className="space-y-3">
        <h3 className="text-md font-medium">Tertiary (Subtle)</h3>
        <div className="flex gap-4 items-center">
          <Button variant="subtle" size="subtle-lg">Tertiary</Button>
          <div className="text-xs text-gray-500">
            82px × 36px | Border: #DAE6E7 | Minimal shadow
          </div>
        </div>
      </div>

      {/* All Together */}
      <div className="space-y-3">
        <h3 className="text-md font-medium">Button Hierarchy</h3>
        <div className="flex gap-4 items-center">
          <Button size="custom">Primary</Button>
          <Button variant="outline" size="outline-lg">Secondary</Button>
          <Button variant="subtle" size="subtle-lg">Subtle</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Showcase of all three custom button variants with their specifications and proper hierarchy.'
      }
    }
  }
};

export const Interactive: Story = {
  args: {
    size: 'custom',
    children: 'Click Me!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example of the custom gradient button. Try clicking to see the hover and active states.'
      }
    }
  }
};

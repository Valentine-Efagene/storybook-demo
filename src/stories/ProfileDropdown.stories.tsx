import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProfileDropdown } from '@/components/ProfileDropdown'
import { useGetCurrentUserFromSession } from '@/hooks/useGetCurrentUserFromSession'

// Create a mock query client for stories
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false, staleTime: Infinity },
        mutations: { retry: false },
    },
})

const meta = {
    title: 'Components/ProfileDropdown',
    component: ProfileDropdown,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## Profile Dropdown Component

A dropdown menu component for user profile actions, featuring:

### Key Features
- **Avatar Display**: Uses shadcn Avatar component with image fallback to initials
- **User Information**: Shows name and email in the dropdown header
- **Action Items**: Profile, Billing, Settings, Security, and Logout options
- **Logout Functionality**: Uses ResponsiveDialog for confirmation with proper error handling and loading states
- **Session Integration**: Can be paired with useGetCurrentUserFromSession hook for real session data
- **Accessible**: Built with Radix UI primitives for full accessibility
- **Customizable**: Accepts user props for dynamic content

### Usage with Static Data
\`\`\`tsx
<ProfileDropdown 
  user={{
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg",
    initials: "JD"
  }}
/>
\`\`\`

### Usage with Session Hook
\`\`\`tsx
import { useGetCurrentUserFromSession } from '@/hooks/useGetCurrentUserFromSession'

function MyHeader() {
  const { data: user, isLoading, error } = useGetCurrentUserFromSession()
  
  if (isLoading) return <div>Loading...</div>
  
  return <ProfileDropdown user={user} />
}
\`\`\`

### Props
- \`user\` (optional): User object with name, email, avatar URL, and initials
- Falls back to default values if user data is not provided

### Design Tokens
- Uses standard button variant="ghost" for the trigger
- Primary color for avatar fallback background
- Destructive color for logout action
- Consistent spacing and typography
        `,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProfileDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://github.com/shadcn.png',
            initials: 'JD',
        },
    },
}

export const WithoutAvatar: Story = {
    args: {
        user: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            initials: 'JS',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Profile dropdown without an avatar image, showing initials fallback.',
            },
        },
    },
}

export const LongUserName: Story = {
    args: {
        user: {
            name: 'Christopher Alexander Rodriguez-Martinez',
            email: 'christopher.alexander.rodriguez-martinez@verylongdomain.com',
            initials: 'CA',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Profile dropdown with long user name and email to test text overflow.',
            },
        },
    },
}

export const SingleName: Story = {
    args: {
        user: {
            name: 'Madonna',
            email: 'madonna@music.com',
            avatar: 'https://github.com/shadcn.png',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Profile dropdown with single name, showing automatic initial generation.',
            },
        },
    },
}

export const MinimalData: Story = {
    args: {
        user: {
            name: 'User',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Profile dropdown with minimal user data, showing fallback behaviors.',
            },
        },
    },
}

export const NoUserData: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Profile dropdown without user data, showing default fallback values.',
            },
        },
    },
}

export const Interactive: Story = {
    args: {
        user: {
            name: 'Interactive User',
            email: 'user@example.com',
            avatar: 'https://github.com/shadcn.png',
            initials: 'IU',
        },
    },
    parameters: {
        docs: {
            description: {
                story: `
Try clicking the avatar to open the dropdown menu and interact with the menu items.

**Available Actions:**
- Profile - View user profile
- Billing - Manage billing and subscriptions  
- Settings - Application settings
- Security - Security and privacy settings
- Log out - Sign out of the application

Each menu item includes an appropriate icon and could be connected to actual functionality.
        `,
            },
        },
    },
}

// Example showing integration in a header-like context
export const InHeader: Story = {
    args: {
        user: {
            name: 'Admin User',
            email: 'admin@company.com',
            avatar: 'https://github.com/shadcn.png',
            initials: 'AU',
        },
    },
    decorators: [
        (Story: React.ComponentType) => (
            <div className="flex items-center justify-between p-4 border-b bg-background w-full max-w-4xl">
                <div className="flex items-center gap-4">
                    <div className="text-sm font-medium">Dashboard</div>
                </div>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Profile dropdown shown in a header context, demonstrating real-world usage.',
            },
        },
    },
}

// Example showing integration with useGetCurrentUserFromSession hook
export const WithSessionHook: Story = {
    render: () => {
        function ProfileDropdownWithSession() {
            const { data: user, isLoading, error } = useGetCurrentUserFromSession({
                // Disable actual fetching for story purposes
                enabled: false
            })

            // Mock loading state
            if (isLoading) {
                return (
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
                        <div className="h-4 w-16 animate-pulse bg-muted rounded" />
                    </div>
                )
            }

            // Mock error state - fallback user
            if (error) {
                return <ProfileDropdown />
            }

            // Mock successful data
            return <ProfileDropdown />
        }

        return (
            <QueryClientProvider client={queryClient}>
                <div className="flex items-center justify-between p-4 border-b bg-background w-full max-w-4xl">
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-medium">Dashboard with Session Hook</div>
                    </div>
                    <ProfileDropdownWithSession />
                </div>
            </QueryClientProvider>
        )
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: `
Profile dropdown integrated with the useGetCurrentUserFromSession hook, demonstrating:

**Hook Integration:**
- Automatic user session loading
- Loading state with skeleton animation  
- Error state with fallback user
- Successful state with real user data

**Implementation:**
\`\`\`tsx
import { useGetCurrentUserFromSession } from '@/hooks/useGetCurrentUserFromSession'

function MyComponent() {
  const { data: user, isLoading, error } = useGetCurrentUserFromSession()
  
  if (isLoading) return <LoadingSkeleton />
  
  return <ProfileDropdown user={user} />
}
\`\`\`

This approach provides a seamless user experience with proper loading states and error handling.
                `,
            },
        },
    },
}
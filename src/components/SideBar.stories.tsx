import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AppSidebar } from './SideBar';
import { SidebarProvider } from '@/components/ui/sidebar';

const meta = {
    title: 'Components/AppSidebar',
    component: AppSidebar,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'The main application sidebar with navigation menu, logo, and support section.',
            },
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="flex h-screen">
                <SidebarProvider>
                    <Story />
                    {/* Mock main content area */}
                    <div className="flex-1 p-6 bg-gray-50">
                        <h2 className="text-2xl font-bold mb-4">Main Content Area</h2>
                        <p className="text-gray-600">
                            This is where the main application content would be displayed.
                            The sidebar provides navigation to different sections of the app.
                        </p>
                        <div className="mt-6 p-4 bg-white rounded-lg shadow">
                            <h3 className="font-semibold mb-2">Sample Content</h3>
                            <p className="text-sm text-gray-600">
                                Click on the sidebar items to navigate through the application.
                                The sidebar is collapsible and responsive.
                            </p>
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        ),
    ],
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default sidebar
export const Default: Story = {};

// Sidebar with different states for documentation
export const SidebarStates: Story = {
    render: () => <AppSidebar />,
    parameters: {
        docs: {
            description: {
                story: 'The default sidebar showing all navigation items, logo, and footer support section.',
            },
        },
    },
};

// Sidebar with custom content wrapper showing responsive behavior
export const ResponsiveLayout: Story = {
    decorators: [
        (Story) => (
            <div className="flex h-screen">
                <SidebarProvider>
                    <Story />
                    <div className="flex-1 overflow-auto">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h3 className="font-semibold text-lg mb-2">Properties</h3>
                                    <p className="text-gray-600 mb-4">Manage your property listings and details.</p>
                                    <div className="text-2xl font-bold text-blue-600">24</div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h3 className="font-semibold text-lg mb-2">Contributions</h3>
                                    <p className="text-gray-600 mb-4">Track your financial contributions.</p>
                                    <div className="text-2xl font-bold text-green-600">$12,450</div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h3 className="font-semibold text-lg mb-2">Saved Items</h3>
                                    <p className="text-gray-600 mb-4">View your bookmarked properties.</p>
                                    <div className="text-2xl font-bold text-purple-600">8</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">P</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">New property added</p>
                                                <p className="text-sm text-gray-600">Modern apartment in downtown area</p>
                                            </div>
                                            <div className="text-sm text-gray-500">2 hours ago</div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 font-semibold">C</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">Contribution processed</p>
                                                <p className="text-sm text-gray-600">Monthly contribution of $500</p>
                                            </div>
                                            <div className="text-sm text-gray-500">1 day ago</div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-purple-600 font-semibold">S</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">Property saved</p>
                                                <p className="text-sm text-gray-600">Luxury villa by the beach</p>
                                            </div>
                                            <div className="text-sm text-gray-500">3 days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Sidebar with a realistic dashboard layout showing how it integrates with main content.',
            },
        },
    },
};

// Mobile responsive view
export const MobileView: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        docs: {
            description: {
                story: 'Sidebar behavior on mobile devices. The sidebar can be collapsed or expanded as needed.',
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="flex h-screen w-full">
                <SidebarProvider>
                    <Story />
                    <div className="flex-1 p-4 bg-gray-50">
                        <h2 className="text-xl font-bold mb-4">Mobile Layout</h2>
                        <p className="text-gray-600 text-sm">
                            On mobile devices, the sidebar can be toggled to save screen space.
                        </p>
                        <div className="mt-4 p-4 bg-white rounded-lg shadow">
                            <h3 className="font-semibold mb-2">Responsive Design</h3>
                            <p className="text-sm text-gray-600">
                                The sidebar adapts to different screen sizes automatically.
                            </p>
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        ),
    ],
};

// Sidebar with navigation states
export const NavigationStates: Story = {
    render: () => <AppSidebar />,
    decorators: [
        (Story) => (
            <div className="flex h-screen">
                <SidebarProvider>
                    <Story />
                    <div className="flex-1 p-6 bg-gray-50">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-bold mb-6">Navigation Overview</h1>

                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4">Available Sections</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                                <span className="text-blue-600 text-sm">🏠</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Home</p>
                                                <p className="text-sm text-gray-600">Main dashboard and overview</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                                <span className="text-green-600 text-sm">🏢</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Properties</p>
                                                <p className="text-sm text-gray-600">Manage property listings and details</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                                <span className="text-red-600 text-sm">❤️</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Saved</p>
                                                <p className="text-sm text-gray-600">Your bookmarked properties</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                                                <span className="text-yellow-600 text-sm">💰</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Contribution</p>
                                                <p className="text-sm text-gray-600">Financial contributions and payments</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                                                <span className="text-purple-600 text-sm">⚙️</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Settings</p>
                                                <p className="text-sm text-gray-600">Account and application settings</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4">Support</h2>
                                    <p className="text-gray-600 mb-4">
                                        Need help? Access our support resources through the footer section of the sidebar.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <span>❓</span>
                                        <span>Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Overview of all navigation items and their purposes in the application.',
            },
        },
    },
};

// Dark theme example (if supported)
export const WithDarkBackground: Story = {
    decorators: [
        (Story) => (
            <div className="flex h-screen bg-gray-900">
                <SidebarProvider>
                    <Story />
                    <div className="flex-1 p-6 bg-gray-900 text-white">
                        <h2 className="text-2xl font-bold mb-4">Dark Theme Layout</h2>
                        <p className="text-gray-300 mb-6">
                            Sidebar appearance with dark background theme.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Content Area</h3>
                                <p className="text-sm text-gray-400">
                                    Main application content with dark theme styling.
                                </p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Navigation</h3>
                                <p className="text-sm text-gray-400">
                                    Sidebar maintains readability in dark environments.
                                </p>
                            </div>
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Sidebar appearance when used with dark theme backgrounds.',
            },
        },
    },
};

// Component anatomy showcase
export const ComponentAnatomy: Story = {
    render: () => <AppSidebar />,
    decorators: [
        (Story) => (
            <div className="flex h-screen">
                <SidebarProvider>
                    <div className="relative">
                        <Story />
                        {/* Annotation overlays */}
                        <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-20 left-4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-20 left-4 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1 p-6 bg-gray-50">
                        <h1 className="text-3xl font-bold mb-6">Sidebar Component Anatomy</h1>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium">Header Section</p>
                                    <p className="text-sm text-gray-600">Contains the application logo and branding</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium">Navigation Menu</p>
                                    <p className="text-sm text-gray-600">Main navigation items with icons and labels</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium">Footer Section</p>
                                    <p className="text-sm text-gray-600">Support link and additional options</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Technical Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h3 className="font-medium mb-2">Components Used:</h3>
                                    <ul className="space-y-1 text-gray-600">
                                        <li>• Sidebar (Root)</li>
                                        <li>• SidebarHeader</li>
                                        <li>• SidebarContent</li>
                                        <li>• SidebarGroup</li>
                                        <li>• SidebarMenu</li>
                                        <li>• SidebarFooter</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Navigation Items:</h3>
                                    <ul className="space-y-1 text-gray-600">
                                        <li>• Home (Dashboard)</li>
                                        <li>• Properties (Listings)</li>
                                        <li>• Saved (Bookmarks)</li>
                                        <li>• Contribution (Payments)</li>
                                        <li>• Settings (Preferences)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Visual breakdown of the sidebar component structure and its sections.',
            },
        },
    },
};
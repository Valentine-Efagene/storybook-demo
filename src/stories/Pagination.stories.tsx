import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Pagination } from '@/components/ui/pagination'
import { useState } from 'react'

const meta = {
    title: 'UI/Pagination',
    component: Pagination,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        currentPage: {
            control: { type: 'number', min: 1 },
        },
        totalItems: {
            control: { type: 'number', min: 0 },
        },
        itemsPerPage: {
            control: { type: 'number', min: 1 },
        },
        pageSizeOptions: {
            control: { type: 'object' },
        },
    },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// Default pagination
export const Default: Story = {
    args: {
        currentPage: 1,
        totalItems: 100,
        itemsPerPage: 10,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// With different page sizes
export const DifferentPageSizes: Story = {
    args: {
        currentPage: 2,
        totalItems: 100,
        itemsPerPage: 20,
        pageSizeOptions: [5, 10, 20, 50],
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// Large dataset
export const LargeDataset: Story = {
    args: {
        currentPage: 5,
        totalItems: 1250,
        itemsPerPage: 25,
        pageSizeOptions: [10, 25, 50, 100],
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// Small dataset
export const SmallDataset: Story = {
    args: {
        currentPage: 1,
        totalItems: 8,
        itemsPerPage: 10,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// No items
export const NoItems: Story = {
    args: {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// Without page size selector
export const WithoutPageSizeSelector: Story = {
    args: {
        currentPage: 3,
        totalItems: 100,
        itemsPerPage: 10,
        showPageSizeSelector: false,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// Last page
export const LastPage: Story = {
    args: {
        currentPage: 10,
        totalItems: 100,
        itemsPerPage: 10,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// Single page
export const SinglePage: Story = {
    args: {
        currentPage: 1,
        totalItems: 5,
        itemsPerPage: 10,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
}

// Interactive Demo
export const InteractiveDemo: Story = {
    args: {
        currentPage: 1,
        totalItems: 157,
        itemsPerPage: 10,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
    render: () => {
        const [currentPage, setCurrentPage] = useState(1)
        const [itemsPerPage, setItemsPerPage] = useState(10)
        const totalItems = 157 // Odd number to test edge cases

        return (
            <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Interactive Pagination Demo</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Try changing the page size and navigating between pages to see how the component behaves.
                    </p>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(newPageSize) => {
                            setItemsPerPage(newPageSize)
                            // Adjust current page if necessary
                            const newTotalPages = Math.ceil(totalItems / newPageSize)
                            if (currentPage > newTotalPages && newTotalPages > 0) {
                                setCurrentPage(newTotalPages)
                            }
                        }}
                    />
                </div>

                <div className="text-sm space-y-1">
                    <div><strong>Current State:</strong></div>
                    <div>Page: {currentPage}</div>
                    <div>Items per page: {itemsPerPage}</div>
                    <div>Total items: {totalItems}</div>
                    <div>Total pages: {Math.ceil(totalItems / itemsPerPage)}</div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'This interactive demo shows how the pagination component works in practice. You can change the page size and navigate between pages.',
            },
        },
    },
}

// Real-world table example
export const TableExample: Story = {
    args: {
        currentPage: 1,
        totalItems: 23,
        itemsPerPage: 5,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
    render: () => {
        const [currentPage, setCurrentPage] = useState(1)
        const [itemsPerPage, setItemsPerPage] = useState(5)

        // Mock data
        const users = Array.from({ length: 23 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            role: ['Admin', 'User', 'Editor'][i % 3],
        }))

        const totalItems = users.length
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const currentUsers = users.slice(startIndex, endIndex)

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Users Table with Pagination</h3>

                {/* Table */}
                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-3 font-medium">Name</th>
                                <th className="text-left p-3 font-medium">Email</th>
                                <th className="text-left p-3 font-medium">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                                user.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    pageSizeOptions={[5, 10, 20]}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(newPageSize) => {
                        setItemsPerPage(newPageSize)
                        // Adjust current page if necessary
                        const newTotalPages = Math.ceil(totalItems / newPageSize)
                        if (currentPage > newTotalPages && newTotalPages > 0) {
                            setCurrentPage(newTotalPages)
                        }
                    }}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'A realistic example showing how the pagination component would be used with a data table.',
            },
        },
    },
}

// Edge cases
export const EdgeCases: Story = {
    args: {
        currentPage: 1,
        totalItems: 100,
        itemsPerPage: 10,
        onPageChange: fn(),
        onPageSizeChange: fn(),
    },
    render: () => {
        const [scenario, setScenario] = useState('normal')
        const [currentPage, setCurrentPage] = useState(1)
        const [itemsPerPage, setItemsPerPage] = useState(10)

        const scenarios = {
            normal: { totalItems: 100, description: 'Normal case with 100 items' },
            empty: { totalItems: 0, description: 'No items to display' },
            single: { totalItems: 1, description: 'Only 1 item' },
            exact: { totalItems: 20, description: 'Exactly 2 pages (20 items, 10 per page)' },
            partial: { totalItems: 15, description: 'Partial last page (15 items, 10 per page)' },
            large: { totalItems: 10000, description: 'Large dataset (10,000 items)' },
        }

        const currentScenario = scenarios[scenario as keyof typeof scenarios]

        return (
            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Edge Cases Testing</h3>

                    <div className="flex flex-wrap gap-2">
                        {Object.entries(scenarios).map(([key, value]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setScenario(key)
                                    setCurrentPage(1)
                                }}
                                className={`px-3 py-1 rounded text-sm ${scenario === key
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {value.description}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 border rounded-lg">
                    <div className="mb-4 text-sm text-gray-600">
                        <strong>Current scenario:</strong> {currentScenario.description}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={currentScenario.totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(newPageSize) => {
                            setItemsPerPage(newPageSize)
                            setCurrentPage(1)
                        }}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Test various edge cases and scenarios to ensure the pagination component handles them correctly.',
            },
        },
    },
}
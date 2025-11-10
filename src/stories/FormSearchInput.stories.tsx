import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { FormSearchInput } from '@/components/form/FormSearchInput/FormSearchInput'
import { useState } from 'react'

const meta = {
    title: 'Form/FormSearchInput',
    component: FormSearchInput,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        searchIconPosition: {
            control: { type: 'radio' },
            options: ['left', 'right'],
        },
        debounceMs: {
            control: { type: 'number', min: 0, max: 2000, step: 100 },
        },
    },
} satisfies Meta<typeof FormSearchInput>

export default meta
type Story = StoryObj<typeof meta>

// Basic search input
export const Default: Story = {
    args: {
        placeholder: 'Search...',
        onChange: fn(),
        onDebouncedChange: fn(),
    },
}

// With label and helper text
export const WithLabel: Story = {
    args: {
        label: 'Search Users',
        helperText: 'Type to search for users by name or email',
        placeholder: 'Enter name or email...',
        onChange: fn(),
        onDebouncedChange: fn(),
    },
}

// With error state
export const WithError: Story = {
    args: {
        label: 'Search Query',
        error: 'Search query must be at least 3 characters long',
        placeholder: 'Enter search query...',
        onChange: fn(),
        onDebouncedChange: fn(),
    },
}

// Required field
export const Required: Story = {
    args: {
        label: 'Required Search',
        isRequired: true,
        helperText: 'This field is required',
        placeholder: 'Enter required search term...',
        onChange: fn(),
        onDebouncedChange: fn(),
    },
}

// Search icon on the right
export const RightIcon: Story = {
    args: {
        label: 'Search with Right Icon',
        searchIconPosition: 'right',
        placeholder: 'Search...',
        onChange: fn(),
        onDebouncedChange: fn(),
    },
}

// Without clear button
export const NoClearButton: Story = {
    args: {
        label: 'No Clear Button',
        showClearButton: false,
        placeholder: 'Search without clear...',
        onChange: fn(),
        onDebouncedChange: fn(),
    },
}

// Debounced Search Demo
export const DebouncedDemo: Story = {
    render: () => {
        const [searchValue, setSearchValue] = useState('')
        const [debouncedValue, setDebouncedValue] = useState('')
        const [apiCallCount, setApiCallCount] = useState(0)

        const handleChange = (value: string) => {
            setSearchValue(value)
        }

        const handleDebouncedChange = (value: string) => {
            setDebouncedValue(value)
            setApiCallCount(prev => prev + 1)
            console.log('API call triggered with:', value)
        }

        const handleClear = () => {
            setSearchValue('')
            setDebouncedValue('')
        }

        return (
            <div className="space-y-6 max-w-md">
                <FormSearchInput
                    label="Debounced Search Demo"
                    placeholder="Type to see debouncing in action..."
                    value={searchValue}
                    onChange={handleChange}
                    onDebouncedChange={handleDebouncedChange}
                    onClear={handleClear}
                    debounceMs={500}
                    helperText="API calls are debounced by 500ms"
                />

                <div className="space-y-2 p-4 bg-gray-50 rounded-lg text-sm">
                    <div>
                        <strong>Immediate value:</strong> "{searchValue}"
                    </div>
                    <div>
                        <strong>Debounced value:</strong> "{debouncedValue}"
                    </div>
                    <div>
                        <strong>API calls made:</strong> {apiCallCount}
                    </div>
                    <div className="text-gray-600">
                        Try typing quickly - the API call count will only increase after you stop typing for 500ms.
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates the debounced functionality. The immediate value updates on every keystroke, while the debounced value (which would trigger API calls) only updates after the user stops typing for the specified delay.',
            },
        },
    },
}

// Different debounce delays
export const CustomDebounce: Story = {
    render: () => {
        const [fastValue, setFastValue] = useState('')
        const [slowValue, setSlowValue] = useState('')
        const [fastCount, setFastCount] = useState(0)
        const [slowCount, setSlowCount] = useState(0)

        return (
            <div className="space-y-6 max-w-md">
                <FormSearchInput
                    label="Fast Debounce (100ms)"
                    placeholder="Quick response..."
                    value={fastValue}
                    onChange={setFastValue}
                    onDebouncedChange={(value) => {
                        setFastCount(prev => prev + 1)
                        console.log('Fast API call:', value)
                    }}
                    debounceMs={100}
                />

                <FormSearchInput
                    label="Slow Debounce (1000ms)"
                    placeholder="Slower response..."
                    value={slowValue}
                    onChange={setSlowValue}
                    onDebouncedChange={(value) => {
                        setSlowCount(prev => prev + 1)
                        console.log('Slow API call:', value)
                    }}
                    debounceMs={1000}
                />

                <div className="p-4 bg-gray-50 rounded-lg text-sm space-y-1">
                    <div>Fast API calls: {fastCount}</div>
                    <div>Slow API calls: {slowCount}</div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Compare different debounce delays. The first input responds quickly (100ms) while the second takes longer (1000ms) to trigger API calls.',
            },
        },
    },
}

// Real-world usage example
export const UserSearch: Story = {
    render: () => {
        const [query, setQuery] = useState('')
        const [isLoading, setIsLoading] = useState(false)
        const [results, setResults] = useState<string[]>([])

        // Mock API call
        const searchUsers = async (searchQuery: string) => {
            if (!searchQuery.trim()) {
                setResults([])
                return
            }

            setIsLoading(true)

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500))

            // Mock search results
            const mockUsers = [
                'John Doe',
                'Jane Smith',
                'Alice Johnson',
                'Bob Wilson',
                'Carol Brown',
                'David Miller',
                'Eva Davis',
                'Frank Garcia'
            ]

            const filtered = mockUsers.filter(user =>
                user.toLowerCase().includes(searchQuery.toLowerCase())
            )

            setResults(filtered)
            setIsLoading(false)
        }

        const handleDebouncedSearch = (searchQuery: string) => {
            searchUsers(searchQuery)
        }

        const handleClear = () => {
            setQuery('')
            setResults([])
            setIsLoading(false)
        }

        return (
            <div className="space-y-4 max-w-md">
                <FormSearchInput
                    label="Search Users"
                    placeholder="Type to search users..."
                    value={query}
                    onChange={setQuery}
                    onDebouncedChange={handleDebouncedSearch}
                    onClear={handleClear}
                    debounceMs={300}
                    helperText="Search results update automatically as you type"
                />

                {isLoading && (
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                        Searching...
                    </div>
                )}

                {!isLoading && results.length > 0 && (
                    <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-700">
                            Found {results.length} users:
                        </div>
                        <ul className="space-y-1">
                            {results.map((user, index) => (
                                <li
                                    key={index}
                                    className="text-sm p-2 bg-gray-50 rounded border hover:bg-gray-100 cursor-pointer"
                                >
                                    {user}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!isLoading && query && results.length === 0 && (
                    <div className="text-sm text-gray-500">
                        No users found for "{query}"
                    </div>
                )}
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'A realistic example showing how the debounced search input would be used for searching users. The search is triggered 300ms after the user stops typing, with loading states and results display.',
            },
        },
    },
}
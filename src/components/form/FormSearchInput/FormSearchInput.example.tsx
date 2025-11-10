import React, { useState } from 'react'
import { FormSearchInput } from '@/components/form/FormSearchInput/FormSearchInput'
import { useDebouncedSearch } from '@/hooks/useDebounce'

// Mock user search function (replace with your actual API call)
async function searchUsers(query: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Mock data - replace with actual API call
    const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
        // ... more users
    ]

    return mockUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    )
}

export function UserSearchExample() {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')

    // This function will be called after the user stops typing (debounced)
    const handleDebouncedSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([])
            setIsLoading(false)
            return
        }

        try {
            setIsLoading(true)
            setError('')

            const results = await searchUsers(query)
            setSearchResults(results)
        } catch (err) {
            setError('Failed to search users. Please try again.')
            setSearchResults([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (value: string) => {
        setSearchQuery(value)

        // Show loading state immediately when user types
        if (value.trim() && !isLoading) {
            setIsLoading(true)
        }
    }

    const handleClear = () => {
        setSearchQuery('')
        setSearchResults([])
        setIsLoading(false)
        setError('')
    }

    return (
        <div className="w-full max-w-md space-y-4">
            <FormSearchInput
                label="Search Users"
                placeholder="Type to search users..."
                value={searchQuery}
                onChange={handleInputChange}
                onDebouncedChange={handleDebouncedSearch}
                onClear={handleClear}
                debounceMs={300} // Wait 300ms after user stops typing
                helperText="Search by name or email address"
                error={error}
            />

            {/* Loading indicator */}
            {isLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                    Searching...
                </div>
            )}

            {/* Search results */}
            {!isLoading && searchResults.length > 0 && (
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">
                        Found {searchResults.length} users:
                    </div>
                    <ul className="space-y-1">
                        {searchResults.map((user) => (
                            <li
                                key={user.id}
                                className="p-2 bg-gray-50 rounded border hover:bg-gray-100 cursor-pointer"
                            >
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No results */}
            {!isLoading && searchQuery && searchResults.length === 0 && !error && (
                <div className="text-sm text-gray-500">
                    No users found for "{searchQuery}"
                </div>
            )}
        </div>
    )
}

// Alternative approach using the useDebouncedSearch hook
export function UserSearchWithHook() {
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const {
        searchValue,
        setSearchValue,
        isDebouncing,
        clearSearch
    } = useDebouncedSearch('', async (query: string) => {
        if (!query.trim()) {
            setSearchResults([])
            setIsLoading(false)
            return
        }

        try {
            setIsLoading(true)
            const results = await searchUsers(query)
            setSearchResults(results)
        } catch (error) {
            console.error('Search failed:', error)
            setSearchResults([])
        } finally {
            setIsLoading(false)
        }
    }, 300)

    return (
        <div className="w-full max-w-md space-y-4">
            <FormSearchInput
                label="Search Users (with Hook)"
                placeholder="Type to search users..."
                value={searchValue}
                onChange={setSearchValue}
                onClear={clearSearch}
                showClearButton={true}
                helperText={isDebouncing ? "Searching..." : "Search by name or email"}
            />

            {/* Rest of the component similar to above */}
            {/* ... */}
        </div>
    )
}
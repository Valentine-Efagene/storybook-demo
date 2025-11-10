import { useEffect, useState } from 'react'

/**
 * Custom hook for debouncing values
 * 
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 * 
 * @example
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState('')
 * const debouncedQuery = useDebounce(searchQuery, 300)
 * 
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     // Make API call with debouncedQuery
 *     searchAPI(debouncedQuery)
 *   }
 * }, [debouncedQuery])
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

/**
 * Custom hook for debounced search functionality
 * 
 * @param initialValue - Initial search value
 * @param onSearch - Callback function called with the debounced search value
 * @param delay - The debounce delay in milliseconds (default: 300)
 * @returns Object with search value, setter, and helper functions
 * 
 * @example
 * ```tsx
 * const { searchValue, setSearchValue, isDebouncing, clearSearch } = useDebouncedSearch(
 *   '',
 *   (query) => {
 *     // Make API call
 *     searchUsers(query)
 *   },
 *   300
 * )
 * ```
 */
export function useDebouncedSearch(
    initialValue: string = '',
    onSearch: (value: string) => void,
    delay: number = 300
) {
    const [searchValue, setSearchValue] = useState(initialValue)
    const debouncedValue = useDebounce(searchValue, delay)
    const [isDebouncing, setIsDebouncing] = useState(false)

    // Track if we're currently debouncing
    useEffect(() => {
        if (searchValue !== debouncedValue) {
            setIsDebouncing(true)
        } else {
            setIsDebouncing(false)
        }
    }, [searchValue, debouncedValue])

    // Call the search function when debounced value changes
    useEffect(() => {
        onSearch(debouncedValue)
    }, [debouncedValue, onSearch])

    const clearSearch = () => {
        setSearchValue('')
    }

    return {
        searchValue,
        setSearchValue,
        debouncedValue,
        isDebouncing,
        clearSearch,
    }
}